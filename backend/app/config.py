import os

class Config:
    MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/mongoLDO')
    SECRET_KEY = os.environ.get('SECRET_KEY') 
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = 'laminadooculto@gmail.com'
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD') 
    MAIL_DEFAULT_SENDER = '"Lâmina do oculto"<laminadooculto@gmail.com>'