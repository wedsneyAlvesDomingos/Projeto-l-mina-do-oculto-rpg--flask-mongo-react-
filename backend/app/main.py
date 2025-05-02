from flask import Flask, request, jsonify
from flask_mail import Mail
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
from bson import ObjectId
from datetime import datetime
from services.user_service import UserService
from services.personagem_service import PersonagemService
import os

app = Flask(__name__)
CORS(app)

app.config.from_object('config.Config')
app.config['MAIL_DEFAULT_SENDER'] = 'laminadoocultol@gmail.com'

try:
    client = MongoClient(app.config['MONGO_URI'])
    db = client.get_database()
    print(f"Conectado ao banco de dados: {db.name}")
except Exception as e:
    print(f"Erro ao conectar ao MongoDB: {str(e)}")
    db = None

mail = Mail(app)
mail.init_app(app)

user_service = UserService(db, mail, app.config['SECRET_KEY'])

personagem_service = PersonagemService(db)

@app.route('/users/<user_id>/personagens', methods=['POST'])
def create_personagem(user_id):
    try:
        data = request.get_json()

        nome_personagem = data.get('nome_personagem')
        classe = data.get('classe')
        nivel = data.get('nível')

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

        return jsonify({'message': 'Personagem criado com sucesso!', 'id': personagem_id}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/users', methods=['POST'])
def create_user():
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')

        if not all([name, email, password]):
            return jsonify({'error': 'Todos os campos são obrigatórios'}), 400
        
                # Verifica se já existe um usuário com o mesmo e-mail
        if db.users.find_one({'email': email}):
            return {'error': 'E-mail já cadastrado.'}, 400

        # Verifica se já existe um usuário com o mesmo nome de usuário
        if db.users.find_one({'name': name}):
            return {'error': 'Nome de usuário já cadastrado.'}, 400

        mail_sender_url = "http://192.168.0.169:5003"

        result, status = user_service.create_user(name, email, password, mail_sender_url)

        if status != 201:
            return jsonify(result), status  # Erros como e-mail ou nome duplicado

        return jsonify({
            'message': 'Usuário criado. Verifique seu e-mail para confirmar.',
            'user_id': result.get('user_id')
        }), 201

    except Exception as e:
        return jsonify({'error': 'Erro interno do servidor', 'details': str(e)}), 500

@app.route('/confirm_email', methods=['POST'])
def confirm_email():
    try:
        data = request.get_json()
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
            return jsonify({'error': 'Invalid JSON format'}), 400
        
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400

        user = user_service.login_user(email, password)
        
        if user:
            return jsonify({'message': 'Login successful', 'user': user}), 200
        else:
            return jsonify({'error': 'Invalid email or password'}), 401

    except ValueError as ve:
        return jsonify({'error': f'Invalid data: {str(ve)}'}), 400

    except KeyError as ke:
        return jsonify({'error': f'Missing key: {str(ke)}'}), 400

    except ConnectionError:
        return jsonify({'error': 'Authentication service unavailable'}), 503

    except Exception as e:
        return jsonify({'error': f'An unexpected error occurred: {str(e)}'}), 500


@app.route('/db')
def index():
   if db is not None:
        return f"Conectado ao banco de dados: {db.name}"
   return "Erro ao conectar ao banco de dados", 500

@app.route('/')
def hello_world():
    return jsonify({"message": "Bem vindo ao Lamina do oculto RPG!!"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5055, debug=True)
