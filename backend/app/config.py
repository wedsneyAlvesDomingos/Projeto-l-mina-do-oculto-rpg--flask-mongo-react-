import os

class Config:
    # Ambiente do Flask
    FLASK_ENV = os.getenv('FLASK_ENV', 'production')

    # Chave secreta da aplicação
    SECRET_KEY = os.getenv('SECRET_KEY', 'your_secret_key')

    # Configuração do PostgreSQL
    POSTGRES_USER = os.getenv('POSTGRES_USER', 'your_user')
    POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD', 'your_password')
    POSTGRES_DB = os.getenv('POSTGRES_DB', 'your_database')
    POSTGRES_HOST = os.getenv('POSTGRES_HOST', 'localhost')
    POSTGRES_PORT = os.getenv('POSTGRES_PORT', '5432')

    SQLALCHEMY_DATABASE_URI = (
        f"postgresql://"
        f"{POSTGRES_USER}:{POSTGRES_PASSWORD}@"
        f"{POSTGRES_HOST}:{POSTGRES_PORT}/"
        f"{POSTGRES_DB}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Se ainda estiver usando MongoDB
    MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/mongoLDO')

    # Configuração de e-mail
    MAIL_SERVER = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
    MAIL_PORT = int(os.getenv('MAIL_PORT', 587))
    MAIL_USE_TLS = os.getenv('MAIL_USE_TLS', 'True').lower() in ('true', '1', 'yes')
    MAIL_USERNAME = os.getenv('MAIL_USERNAME', 'laminadooculto@gmail.com')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD')
    MAIL_DEFAULT_SENDER = os.getenv(
        'MAIL_DEFAULT_SENDER',
        '"Lâmina do oculto" <laminadooculto@gmail.com>'
    )

    # Endereço para o front-end React
    LISTEN_ADDRESS = os.getenv('REACT_APP_LISTEN_ADDRESS', 'http://localhost')

