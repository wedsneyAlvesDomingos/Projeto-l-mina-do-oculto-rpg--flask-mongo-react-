import os

class Config:
    MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/mongoLDO')
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'chave-secreta-para-tokens'
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = 'laminadoocultol@gmail.com'
    MAIL_PASSWORD = 'bokislad1277406'
