from flask import Flask, request, jsonify, make_response
from flask_mail import Mail
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from services.user_service import UserService
from services.personagem_service import PersonagemService
from services.rule_engine import calcular_ficha_completa, validar_regalias, simular_acao
from catalogs import HABILIDADES, PROFICIENCIAS, CONDICOES, ESPECIES as ESPECIES_CATALOGO
import os
import traceback

app = Flask(__name__)
CORS(app)

app.config.from_object('config.Config')
app.config['MAIL_DEFAULT_SENDER'] = 'laminadoocultol@gmail.com'

db = SQLAlchemy(app)

mail = Mail(app)
mail.init_app(app)

# URL do frontend usada nos links dos e-mails — lida do env, nunca hardcoded
mail_sender_url = app.config.get('FRONTEND_URL', 'http://localhost:5009')

with app.app_context():
    db.create_all()
    # Migração: adiciona coluna avatar se não existir (sem Alembic)
    with db.engine.connect() as conn:
        conn.execute(text("ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar TEXT;"))
        conn.commit()
    user_service = UserService(db.engine, mail, app.config['SECRET_KEY'], mail_sender_url)
    personagem_service = PersonagemService(db)


@app.route('/users/<int:user_id>/personagens', methods=['POST'])
def create_personagem(user_id):
    try:
        data = request.get_json() or {}
        nome_personagem = data.get('nome_personagem') or data.get('name')
        nivel = data.get('nivel') or data.get('nível') or data.get('level')

        if not nome_personagem or not nivel:
            return jsonify({'error': 'Campos obrigatórios ausentes'}), 400

        resultado, status = personagem_service.criar_personagem(user_id=user_id, data=data)

        if status == 400:
            return jsonify(resultado), 400

        return jsonify({
            'message': 'Personagem criado com sucesso!',
            'personagem_id': resultado.get('personagem_id')
        }), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/personagens/<int:user_id>', methods=['GET'])
def get_personagens_por_user(user_id):
    try:
        service = PersonagemService(db)
        personagens = service.obter_personagens_por_user_id(user_id)
        
        
        return jsonify(personagens), 200

    except ValueError as ve:
        return make_response(jsonify({"error": str(ve)}), 400)

    except Exception as e:
        traceback.print_exc()   # <— vai exibir linha a linha do erro
        return make_response(jsonify({"error": "Erro interno no servidor"}), 500)

@app.route('/personagens/<int:personagem_id>', methods=['PUT'])
def update_personagem(personagem_id):
    try:
        data = request.get_json() or {}
        
        if not data:
            return jsonify({'error': 'Nenhum dado fornecido para atualização'}), 400

        service = PersonagemService(db)
        success = service.atualizar_personagem(personagem_id, data)
        
        # Verificar se retornou erros de validação (dict com 'erros')
        if isinstance(success, dict) and 'erros' in success:
            return jsonify({'error': 'Validação falhou', 'erros': success['erros']}), 400

        if success:
            personagem_atualizado = service.obter_personagem_por_id(personagem_id)
            return jsonify({
                'message': 'Personagem atualizado com sucesso!',
                'personagem': personagem_atualizado
            }), 200
        else:
            return jsonify({'error': 'Personagem não encontrado'}), 404

    except ValueError as ve:
        return make_response(jsonify({"error": str(ve)}), 400)

    except Exception as e:
        traceback.print_exc()
        return make_response(jsonify({"error": "Erro interno no servidor", "details": str(e)}), 500)

@app.route('/personagens/<int:personagem_id>', methods=['DELETE'])
def delete_personagem(personagem_id):
    try:
        service = PersonagemService(db)
        success = service.deletar_personagem(personagem_id)
        if success:
            return jsonify({'message': 'Personagem removido com sucesso!'}), 200
        else:
            return jsonify({'error': 'Personagem não encontrado'}), 404
    except Exception as e:
        traceback.print_exc()
        return make_response(jsonify({"error": "Erro interno no servidor", "details": str(e)}), 500)

@app.route('/users', methods=['POST'])
def create_user():
    try:
        # Verifica se os dados foram enviados no formato JSON
        if not request.is_json:
            return jsonify({'error': 'Requisição deve conter um corpo JSON válido'}), 400

        data = request.get_json()

        if data is None:
            return jsonify({'error': 'Corpo da requisição JSON está vazio ou mal formatado'}), 400

        # Coleta os dados
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')

        # Verifica se os campos obrigatórios foram fornecidos
        missing_fields = []
        if not name:
            missing_fields.append('name')
        if not email:
            missing_fields.append('email')
        if not password:
            missing_fields.append('password')

        if missing_fields:
            return jsonify({'error': f'Campos obrigatórios ausentes: {", ".join(missing_fields)}'}), 400

        # Tenta criar o usuário
        result, status = user_service.create_user(name, email, password)

        # Se houver erro na criação do usuário, como e-mail já existente
        if status != 201:
            # Espera-se que o serviço retorne uma mensagem amigável em 'result'
            return jsonify({'error': result.get('error', 'Erro ao criar usuário')}), status

        # Sucesso
        return jsonify({
            'message': 'Usuário criado. Verifique seu e-mail para confirmar.',
            'user_id': result.get('user_id')
        }), 201

    except ValueError as ve:
        return jsonify({'error': 'Valor inválido fornecido', 'details': str(ve)}), 400
    except KeyError as ke:
        return jsonify({'error': 'Chave esperada não encontrada no JSON', 'missing_key': str(ke)}), 400
    except ConnectionError:
        return jsonify({'error': 'Erro de conexão com o serviço de email ou banco de dados'}), 503
    except TypeError as te:
        return jsonify({'error': 'Erro de tipo nos dados fornecidos', 'details': str(te)}), 400
    except Exception as e:
        return jsonify({
            'error': 'Erro interno do servidor',
            'details': str(e),
            'sugestao': 'Verifique se o e-mail já está em uso ou se há falha na comunicação com o serviço de email'
        }), 500



@app.route('/confirm_email', methods=['POST'])
def confirm_email():
    try:
        data = request.get_json() or {}
        token = data.get('token')
        if not token:
            return jsonify({'message': 'Token não fornecido.'}), 400

        if user_service.confirm_email(token):
            return jsonify({'message': 'Email confirmado com sucesso!'}), 200
        else:
            return jsonify({'message': 'Token inválido ou expirado.'}), 400

    except Exception as e:
        return jsonify({'message': str(e)}), 400


@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Formato JSON inválido'}), 400

        email = data.get('email')
        password = data.get('password')
        if not email or not password:
            return jsonify({'error': 'Email e senha são obrigatórios'}), 400

        user = user_service.login_user(email, password)
        if user:
            return jsonify({'message': 'Login realizado com sucesso', 'user': user}), 200
        else:
            return jsonify({'error': 'Email ou senha inválidos'}), 401

    except ValueError as ve:
        return jsonify({'error': f'Dados inválidos: {ve}'}), 400
    except KeyError as ke:
        return jsonify({'error': f'Chave ausente: {ke}'}), 400
    except ConnectionError:
        return jsonify({'error': 'Serviço de autenticação indisponível'}), 503
    except Exception as e:
        # Log do erro para debug
        app.logger.error(f"Erro ao criar usuário: {str(e)}")
        return jsonify({
            'error': 'Erro interno do servidor',
            'details': str(e),
            'sugestao': 'Verifique a configuração do email e duplicidade de dados'
        }), 500


# ── Perfil de Usuário ──────────────────────────────────────────────────────────

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """Retorna dados públicos do usuário (sem senha)."""
    try:
        user = user_service.get_user(user_id)
        if not user:
            return jsonify({'error': 'Usuário não encontrado'}), 404
        return jsonify(user), 200
    except Exception as e:
        app.logger.error(f"Erro ao buscar usuário {user_id}: {e}")
        return jsonify({'error': 'Erro interno do servidor', 'details': str(e)}), 500


@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    """Atualiza nome e/ou avatar do usuário."""
    try:
        data = request.get_json() or {}
        name   = data.get('name')
        avatar = data.get('avatar')

        if not name and avatar is None:
            return jsonify({'error': 'Nenhum campo para atualizar'}), 400

        updated = user_service.update_profile(user_id, name=name, avatar=avatar)
        if not updated:
            return jsonify({'error': 'Usuário não encontrado'}), 404
        return jsonify(updated), 200

    except ValueError as ve:
        return jsonify({'error': str(ve)}), 409
    except Exception as e:
        app.logger.error(f"Erro ao atualizar usuário {user_id}: {e}")
        return jsonify({'error': 'Erro interno do servidor', 'details': str(e)}), 500


@app.route('/users/<int:user_id>/password', methods=['PUT'])
def update_password(user_id):
    """Atualiza a senha do usuário após verificar a senha atual."""
    try:
        data = request.get_json() or {}
        current_password = data.get('current_password')
        new_password     = data.get('new_password')

        if not current_password or not new_password:
            return jsonify({'error': 'Senha atual e nova senha são obrigatórias'}), 400

        if len(new_password) < 6:
            return jsonify({'error': 'A nova senha deve ter no mínimo 6 caracteres'}), 400

        ok = user_service.update_password(user_id, current_password, new_password)
        if not ok:
            return jsonify({'error': 'Usuário não encontrado'}), 404
        return jsonify({'message': 'Senha atualizada com sucesso'}), 200

    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400
    except Exception as e:
        app.logger.error(f"Erro ao atualizar senha do usuário {user_id}: {e}")
        return jsonify({'error': 'Erro interno do servidor', 'details': str(e)}), 500


# ── Recuperação de senha ───────────────────────────────────────────────────────

@app.route('/forgot-password', methods=['POST'])
def forgot_password():
    """
    Recebe e-mail e envia link de redefinição.
    Retorna sempre 200 para não revelar se o e-mail existe (segurança).
    """
    try:
        data = request.get_json() or {}
        email = (data.get('email') or '').strip().lower()
        if not email:
            return jsonify({'error': 'E-mail é obrigatório'}), 400

        user_service.request_password_reset(email, mail_sender_url)
        return jsonify({'message': 'Se esse e-mail estiver cadastrado, você receberá as instruções em breve.'}), 200

    except Exception as e:
        app.logger.error(f"Erro ao solicitar redefinição de senha: {e}")
        return jsonify({'error': 'Erro interno do servidor'}), 500


@app.route('/reset-password', methods=['POST'])
def reset_password():
    """Valida token e aplica nova senha."""
    try:
        data = request.get_json() or {}
        token        = data.get('token')
        new_password = data.get('new_password')

        if not token or not new_password:
            return jsonify({'error': 'Token e nova senha são obrigatórios'}), 400

        if len(new_password) < 6:
            return jsonify({'error': 'A senha deve ter no mínimo 6 caracteres'}), 400

        user_service.reset_password_with_token(token, new_password)
        return jsonify({'message': 'Senha redefinida com sucesso!'}), 200

    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400
    except Exception as e:
        app.logger.error(f"Erro ao redefinir senha: {e}")
        return jsonify({'error': 'Erro interno do servidor'}), 500


@app.route('/personagens/<int:personagem_id>/calcular', methods=['GET'])
def calcular_personagem(personagem_id):
    """Endpoint que retorna a ficha com todos os stats derivados calculados."""
    try:
        service = PersonagemService(db)
        personagem = service.obter_personagem_por_id(personagem_id)
        if not personagem:
            return jsonify({'error': 'Personagem não encontrado'}), 404

        ficha_completa = calcular_ficha_completa(personagem)
        return jsonify(ficha_completa), 200

    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': 'Erro ao calcular ficha', 'details': str(e)}), 500


@app.route('/personagens/<int:personagem_id>/validar-regalias', methods=['GET'])
def validar_regalias_personagem(personagem_id):
    """Endpoint que valida as regalias do personagem."""
    try:
        service = PersonagemService(db)
        personagem = service.obter_personagem_por_id(personagem_id)
        if not personagem:
            return jsonify({'error': 'Personagem não encontrado'}), 404

        erros = validar_regalias(personagem)
        if erros:
            return jsonify({'valid': False, 'erros': erros}), 200
        return jsonify({'valid': True, 'erros': []}), 200

    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': 'Erro ao validar regalias', 'details': str(e)}), 500


@app.route('/api/catalogos', methods=['GET'])
def get_catalogos():
    """Endpoint que retorna todos os catálogos do sistema para sincronização."""
    return jsonify({
        'habilidades': HABILIDADES,
        'proficiencias': PROFICIENCIAS,
        'condicoes': CONDICOES,
        'especies': ESPECIES_CATALOGO,
    }), 200


@app.route('/api/personagem/<int:personagem_id>/simular-acao', methods=['POST'])
def simular_acao_personagem(personagem_id):
    """
    Endpoint de simulação de ações (teste, ataque, descanso).
    Recebe o tipo de ação e parâmetros, retorna o resultado da resolução.
    
    Body JSON:
    - { "tipo": "teste", "habilidade": "forca", "cd": 15, "bonus": 0 }
    - { "tipo": "ataque", "habilidade_acerto": "combate_corpo_a_corpo",
        "habilidade_dano": "forca", "arma_dano": "1d8", "alvo_defesa": 14 }
    - { "tipo": "descanso_curto" }
    - { "tipo": "descanso_longo" }
    """
    try:
        acao = request.get_json() or {}
        if not acao.get('tipo'):
            return jsonify({'error': 'Campo "tipo" é obrigatório.'}), 400

        service = PersonagemService(db)
        personagem = service.obter_personagem_por_id(personagem_id)
        if not personagem:
            return jsonify({'error': 'Personagem não encontrado'}), 404

        resultado = simular_acao(personagem, acao)
        return jsonify(resultado), 200

    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': 'Erro ao simular ação', 'details': str(e)}), 500


@app.route('/db')
def index():
    return "Conectado ao banco de dados PostgreSQL", 200


@app.route('/')
def hello_world():
    return jsonify({"message": "Bem vindo ao Lamina do oculto RPG!!"}), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5055, debug=True)
