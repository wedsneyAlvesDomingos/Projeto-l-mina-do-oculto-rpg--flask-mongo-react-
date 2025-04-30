from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from flask_mail import Message
from itsdangerous import URLSafeTimedSerializer
from werkzeug.security import generate_password_hash, check_password_hash
from pymongo import MongoClient
from flask_mail import Mail


app = Flask(__name__)
CORS(app)
app.config.from_object('config.Config')
app.config['MAIL_DEFAULT_SENDER'] = 'seu_email@gmail.com'
mail = Mail(app)
mail.init_app(app)
try:
    client = MongoClient(app.config['MONGO_URI'])
    db = client.get_database()
    print(f"Conectado ao banco de dados: {db.name}")
except Exception as e:
    print(f"Erro ao conectar ao MongoDB: {str(e)}")
    db = None

class UserService:
    def __init__(self, db, mail, secret_key):
        self.db = db
        self.mail = mail
        self.s = URLSafeTimedSerializer(secret_key)

    def create_user(self, name, email, password, mail_sender_url):
        hashed_password = generate_password_hash(password)
        token = self.s.dumps(email, salt='email-confirm')

        user_data = {
            'name': name,
            'email': email,
            'password': hashed_password,
            'email_confirmed': False,
            'confirmation_token': token
        }

        user_id = self.db.users.insert_one(user_data).inserted_id

        confirm_url = f"{mail_sender_url}/confirmarEmail/{token}"
        msg = Message('Confirme seu e-mail', recipients=[email])
        msg.body = f"Clique no link para confirmar seu e-mail: {confirm_url}"
        self.mail.send(msg)

        return {'user_id': str(user_id)}, 201


    def confirm_email(self, token):
        try:
            # Decodificar o token e extrair o e-mail
            email = self.s.loads(token, salt='email-confirm', max_age=3600)

            # Buscar o usuário no banco de dados
            user = self.db.users.find_one({'email': email})
            if not user:
                return False
            
            # Se o e-mail já foi confirmado, retorna True
            if user.get('email_confirmed', False):
                return True

            # Atualiza o status do e-mail para confirmado
            self.db.users.update_one(
                {'email': email},
                {'$set': {'email_confirmed': True}}
            )

            # Recarrega o usuário para verificar se a atualização foi realizada
            updated_user = self.db.users.find_one({'email': email})
            if updated_user and updated_user.get('email_confirmed', False):
                return True
            
            return False

        except Exception as e:
            raise ValueError(str(e))
    def login_user(self, name, password):
        user = self.db.users.find_one({'name': name})
        if user and check_password_hash(user['password'], password):
            if not user.get('email_confirmed', False):
                raise ValueError("Email not confirmed")
            return {
                'id': str(user['_id']),
                'name': user['name'],
                'email': user['email'],
                'email_confirmed': True
            }
        return None

