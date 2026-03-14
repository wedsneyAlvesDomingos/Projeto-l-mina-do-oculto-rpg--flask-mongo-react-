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
                session.refresh(user)  # Garante que o user está atualizado no contexto da sessão
                user_id = user.id     # Pega o ID enquanto a sessão ainda está aberta
            except IntegrityError as e:
                session.rollback()
                if 'users_name_key' in str(e.orig) or 'UNIQUE constraint failed: users.name' in str(e.orig):
                    raise ValueError("Nome já existe")
                if 'users_email_key' in str(e.orig) or 'UNIQUE constraint failed: users.email' in str(e.orig):
                    raise ValueError("E-mail já existe")
                raise

        confirm_url = f"{self.mail_sender_url}/confirmarEmail/{token}"
        msg = Message('Confirme seu e-mail', recipients=[email])
        msg.body = f"Clique no link para confirmar seu e-mail: {confirm_url}"
        self.mail.send(msg)

        return {'user_id': user_id}, 201


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
                    'id': user.id,
                    'name': user.name,
                    'email': user.email,
                    'avatar': user.avatar,
                }
        return None

    # ── Perfil ────────────────────────────────────────────────────────────────

    def get_user(self, user_id):
        """Retorna dados públicos do usuário (sem senha)."""
        with Session(self.engine) as session:
            user = session.query(User).filter_by(id=user_id).first()
            if not user:
                return None
            return {
                'id': user.id,
                'name': user.name,
                'email': user.email,
                'avatar': user.avatar,
                'created_at': user.created_at.isoformat() if user.created_at else None,
            }

    def update_profile(self, user_id, name=None, avatar=None):
        """Atualiza nome e/ou avatar. Levanta ValueError se nome já existir."""
        with Session(self.engine) as session:
            user = session.query(User).filter_by(id=user_id).first()
            if not user:
                return None

            if name and name != user.name:
                conflict = session.query(User).filter(
                    User.name == name, User.id != user_id
                ).first()
                if conflict:
                    raise ValueError("Nome já está em uso por outro usuário")
                user.name = name

            if avatar is not None:
                user.avatar = avatar

            user.updated_at = datetime.utcnow()
            try:
                session.commit()
                session.refresh(user)
            except IntegrityError:
                session.rollback()
                raise ValueError("Nome já está em uso por outro usuário")

            return {
                'id': user.id,
                'name': user.name,
                'email': user.email,
                'avatar': user.avatar,
            }

    def update_password(self, user_id, current_password, new_password):
        """
        Atualiza a senha após verificar a senha atual.
        Levanta ValueError se a senha atual estiver incorreta.
        """
        with Session(self.engine) as session:
            user = session.query(User).filter_by(id=user_id).first()
            if not user:
                return None

            if not check_password_hash(user.password, current_password):
                raise ValueError("Senha atual incorreta")

            user.password = generate_password_hash(new_password)
            user.updated_at = datetime.utcnow()
            session.commit()
            return True

    # ── Recuperação de senha ───────────────────────────────────────────────────

    def request_password_reset(self, email, mail_sender_url):
        """
        Gera token de redefinição e envia e-mail.
        Sempre retorna True (não revela se o e-mail existe, por segurança).
        """
        with Session(self.engine) as session:
            user = session.query(User).filter_by(email=email).first()
            if not user or not user.email_confirmed:
                return True  # silencioso — não revela se e-mail existe

            token = self.s.dumps(email, salt='password-reset')

            reset_url = f"{mail_sender_url}/redefinirSenha/{token}"

            msg = Message('Redefinição de Senha — Lâmina do Oculto', recipients=[email])
            msg.html = open(
                __file__.replace('user_service.py', '') +
                '../templates/reset_password.html'
            ).read().replace('{{ reset_url }}', reset_url)
            self.mail.send(msg)

        return True

    def reset_password_with_token(self, token, new_password):
        """
        Valida o token (máx 1h) e aplica a nova senha.
        Levanta ValueError se token inválido/expirado.
        """
        try:
            email = self.s.loads(token, salt='password-reset', max_age=3600)
        except SignatureExpired:
            raise ValueError("O link expirou. Solicite um novo.")
        except BadSignature:
            raise ValueError("Link inválido.")

        with Session(self.engine) as session:
            user = session.query(User).filter_by(email=email).first()
            if not user:
                raise ValueError("Usuário não encontrado.")

            user.password = generate_password_hash(new_password)
            user.updated_at = datetime.utcnow()
            session.commit()

        return True
