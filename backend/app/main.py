from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os

app = Flask(__name__)
CORS(app)

# Configuração do aplicativo
app.config.from_object('config.Config')

# Configuração do MongoDB com tratamento de exceções
try:
    client = MongoClient(app.config['MONGO_URI'])
    db = client.get_database()
    print(f"Conectado ao banco de dados: {db.name}")
except Exception as e:
    print(f"Erro ao conectar ao MongoDB: {str(e)}")
    db = None

@app.route('/db')
def index():
   if db is not None:
        return f"Conectado ao banco de dados: {db.name}"
   if db is None:
        return "Erro ao conectar ao banco de dados", 500

@app.route('/')
def hello_world():
    return jsonify({"message": "Bem vindo ao Lamina do oculto RPG!!"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5055, debug=True)
