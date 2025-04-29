from flask_mail import Message
from itsdangerous import URLSafeTimedSerializer
from werkzeug.security import generate_password_hash, check_password_hash

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

        confirm_url = f"{mail_sender_url}/confirm_email/{token}"
        msg = Message('Confirme seu e-mail',
                      sender=mail_sender_url,
                      recipients=[email])
        msg.body = f"Clique no link para confirmar seu e-mail: {confirm_url}"
        self.mail.send(msg)

        return user_id

    def confirm_email(self, token):
        try:
            email = self.s.loads(token, salt='email-confirm', max_age=3600)
            result = self.db.users.update_one({'email': email}, {'$set': {'email_confirmed': True}})
            return result.modified_count > 0
        except Exception as e:
            raise ValueError(str(e))

    def login_user(self, name, password):
        user = self.db.users.find_one({'name': name})
        if user and check_password_hash(user['password'], password):
            return {'id': str(user['_id']), 'name': user['name'], 'email': user['email']}
        return None
