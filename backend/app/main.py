from flask import Flask, request, jsonify, make_response
from flask_mail import Mail
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from services.user_service import UserService
from services.personagem_service import PersonagemService
import os
import traceback

app = Flask(__name__)
CORS(app)

app.config.from_object('config.Config')
app.config['MAIL_DEFAULT_SENDER'] = 'laminadoocultol@gmail.com'

db = SQLAlchemy(app)

mail = Mail(app)
mail.init_app(app)

url = os.getenv('REACT_APP_LISTEN_ADDRESS', 'http://localhost')
mail_sender_url = f"{url}:5003"

with app.app_context():
    db.create_all()
    user_service = UserService(db.engine, mail, app.config['SECRET_KEY'], mail_sender_url)
    personagem_service = PersonagemService(db)


@app.route('/users/<int:user_id>/personagens', methods=['POST'])
def create_personagem(user_id):
    try:
        data = request.get_json() or {}

        nome_personagem = data.get('nome_personagem')
        classe = data.get('classe')
        nivel = data.get('nível')
        genero = data.get('genero')
        idade = data.get('idade')
        descricao = data.get('descricao')
        habilidades = data.get('habilidades', {})
        condicoes = data.get('condições', {})
        proficiencias = data.get('proficiencias', [])
        especie= data.get('especie')
        regalias_de_especie = data.get('regalias_de_especie', [])
        regalias_de_aprendiz = data.get('regalias_de_aprendiz', {})
        regalias_de_classe = data.get('regalias_de_classe', {})
        regalias_de_especialization = data.get('regalias_de_especialization', {})
        regalias_de_profissao = data.get('regalias_de_profissao', [])
        equipamentos = data.get('equipamentos', [])

        if not nome_personagem or not nivel:
            return jsonify({'error': 'Campos obrigatórios ausentes'}), 400

        personagem_id = personagem_service.criar_personagem(
            user_id=user_id,
            nome_personagem=nome_personagem,
            classe=classe,
            idade=idade,
            genero=genero,
            descricao=descricao,
            nivel=nivel,
            habilidades=habilidades,
            condicoes=condicoes,
            proficiencias=proficiencias,
            especie=especie,
            regalias_de_especie=regalias_de_especie,
            regalias_de_aprendiz=regalias_de_aprendiz,
            regalias_de_classe=regalias_de_classe,
            regalias_de_especialization=regalias_de_especialization,
            regalias_de_profissao=regalias_de_profissao,
            equipamentos=equipamentos
        )

        return jsonify({
            'message': 'Personagem criado com sucesso!',
            'id': personagem_id
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



@app.route('/db')
def index():
    return "Conectado ao banco de dados PostgreSQL", 200


@app.route('/')
def hello_world():
    return jsonify({"message": "Bem vindo ao Lamina do oculto RPG!!"}), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5055, debug=True)
