from datetime import datetime
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadSignature
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
# Importa o User do models.model (adaptar o import conforme seu projeto)
from models.models import User
from flask_mail import Message


class UserService:
    def __init__(self, db_engine, mail, secret_key, mail_sender_url):
        self.engine = db_engine
        self.mail = mail
        self.s = URLSafeTimedSerializer(secret_key)
        self.mail_sender_url = mail_sender_url

    def create_user(self, name, email, password):
        token = self.s.dumps(email, salt='email-confirm')
        hashed = generate_password_hash(password)

        user = User(
            name=name,
            email=email,
            password=hashed,
            email_confirmed=False,
            confirmation_token=token,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )

        with Session(self.engine) as session:
            session.add(user)
            try:
                session.commit()
            except IntegrityError as e:
                session.rollback()
                # Detecção de erro de chave duplicada por constraint do banco
                # Ajuste as mensagens de erro conforme as mensagens do seu banco
                if 'users_name_key' in str(e.orig) or 'UNIQUE constraint failed: users.name' in str(e.orig):
                    raise ValueError("Nome já existe")
                if 'users_email_key' in str(e.orig) or 'UNIQUE constraint failed: users.email' in str(e.orig):
                    raise ValueError("E-mail já existe")
                raise

        confirm_url = f"{self.mail_sender_url}/confirmarEmail/{token}"
        msg = Message('Confirme seu e-mail', recipients=[email])
        msg.body = f"Clique no link para confirmar seu e-mail: {confirm_url}"
        self.mail.send(msg)

        return {'user_id': user._id}, 201

    def confirm_email(self, token):
        try:
            email = self.s.loads(token, salt='email-confirm', max_age=3600)
        except SignatureExpired:
            # Token expirado: opcionalmente remover usuário não confirmado aqui
            return False
        except BadSignature:
            return False

        with Session(self.engine) as session:
            user = session.query(User).filter_by(email=email).first()
            if not user:
                return False
            if not user.email_confirmed:
                user.email_confirmed = True
                user.confirmation_token = None
                user.updated_at = datetime.utcnow()
                session.commit()
            return True

    def login_user(self, identifier, password):
        with Session(self.engine) as session:
            user = session.query(User).filter(
                (User.email == identifier) | (User.name == identifier)
            ).first()
            if user and check_password_hash(user.password, password):
                if not user.email_confirmed:
                    raise ValueError("E-mail não confirmado")
                return {
                    'id': user._id,
                    'name': user.name,
                    'email': user.email,
                }
        return None
