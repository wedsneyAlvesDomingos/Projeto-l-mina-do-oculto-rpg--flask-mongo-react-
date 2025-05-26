from flask import Flask, request, jsonify
from flask_mail import Mail
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from services.user_service import UserService
from services.personagem_service import PersonagemService
import os

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
        regalias_de_especie = data.get('regalias_de_especie', [])
        regalias_de_aprendiz = data.get('regalias_de_aprendiz', {})
        regalias_de_classe = data.get('regalias_de_classe', {})
        regalias_de_especialization = data.get('regalias_de_especialization', {})
        regalias_de_profissao = data.get('regalias_de_profissao', [])
        equipamentos = data.get('equipamentos', [])

        if not nome_personagem or not classe or not nivel:
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


@app.route('/users', methods=['POST'])
def create_user():
    try:
        data = request.get_json() or {}
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')

        if not all([name, email, password]):
            return jsonify({'error': 'Todos os campos são obrigatórios'}), 400

        result, status = user_service.create_user(name, email, password)

        if status != 201:
            return jsonify(result), status

        return jsonify({
            'message': 'Usuário criado. Verifique seu e-mail para confirmar.',
            'user_id': result.get('user_id')
        }), 201

    except Exception as e:
        return jsonify({'error': 'Erro interno do servidor', 'details': str(e)}), 500


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
        return jsonify({'error': f'Erro inesperado: {e}'}), 500


@app.route('/db')
def index():
    return "Conectado ao banco de dados PostgreSQL", 200


@app.route('/')
def hello_world():
    return jsonify({"message": "Bem vindo ao Lamina do oculto RPG!!"}), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5055, debug=True)
