from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
from bson import ObjectId
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

app.config.from_object('config.Config')

try:
    client = MongoClient(app.config['MONGO_URI'])
    db = client.get_database()
    print(f"Conectado ao banco de dados: {db.name}")
except Exception as e:
    print(f"Erro ao conectar ao MongoDB: {str(e)}")
    db = None

class UserService:
    @staticmethod
    def create_user(name, email, password):
        hashed_password = generate_password_hash(password)
        user_data = {
            'name': name,
            'email': email,
            'password': hashed_password
        }
        user_id = db.users.insert_one(user_data).inserted_id
        return user_id

    @staticmethod
    def login_user(name, password):
        user = db.users.find_one({'name': name})
        if user and check_password_hash(user['password'], password):
            return {'id': str(user['_id']), 'name': user['name'], 'email': user['email']}
        return None


class PersonagemService:
    def __init__(self, db):
        self.collection = db['personagens']

    def criar_personagem(self, user_id, nome_personagem, classe, nivel, habilidades=None, condicoes=None,
                         proficiencias=None, regalias_de_especie=None, regalias_de_classe=None, 
                         regalias_de_profissao=None, equipamentos=None):
        
        personagem = {
            "_id": ObjectId(),
            "user_id": ObjectId(user_id),
            "nome_personagem": nome_personagem,
            "classe": classe,
            "nível": nivel,
            "habilidades": habilidades if habilidades else [],
            "condições": condicoes if condicoes else {},
            "proficiencias": proficiencias if proficiencias else [],
            "regalias_de_especie": regalias_de_especie if regalias_de_especie else [],
            "regalias_de_classe": regalias_de_classe if regalias_de_classe else [],
            "regalias_de_profissão": regalias_de_profissao if regalias_de_profissao else [],
            "equipamentos": equipamentos if equipamentos else [],
            "criado_em": datetime.utcnow(),
            "atualizado_em": datetime.utcnow()
        }

        try:
            result = self.collection.insert_one(personagem)
            return str(result.inserted_id)
        except Exception as e:
            raise Exception(f"Erro ao criar personagem: {str(e)}")

    def obter_personagem_por_id(self, personagem_id):
        try:
            personagem = self.collection.find_one({"_id": ObjectId(personagem_id)})
            if personagem:
                return personagem
            else:
                return None
        except Exception as e:
            raise Exception(f"Erro ao obter personagem: {str(e)}")

    def atualizar_personagem(self, personagem_id, novos_dados):
        try:
            novos_dados["atualizado_em"] = datetime.utcnow()
            result = self.collection.update_one({"_id": ObjectId(personagem_id)}, {"$set": novos_dados})
            if result.matched_count == 1:
                return True
            else:
                return False
        except Exception as e:
            raise Exception(f"Erro ao atualizar personagem: {str(e)}")

    def deletar_personagem(self, personagem_id):
        try:
            result = self.collection.delete_one({"_id": ObjectId(personagem_id)})
            if result.deleted_count == 1:
                return True
            else:
                return False
        except Exception as e:
            raise Exception(f"Erro ao deletar personagem: {str(e)}")


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
        regalias_de_classe = data.get('regalias_de_classe', [])
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
            regalias_de_classe=regalias_de_classe,
            regalias_de_profissao=regalias_de_profissao,
            equipamentos=equipamentos
        )

        return jsonify({'message': 'Personagem criado com sucesso!', 'id': personagem_id}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return jsonify({'error': 'Name, email, and password are required'}), 400

    try:
        user_id = UserService.create_user(name, email, password)
        return jsonify({'id': str(user_id), 'name': name, 'email': email}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500


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

        user = UserService.login_user(email, password)
        
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
