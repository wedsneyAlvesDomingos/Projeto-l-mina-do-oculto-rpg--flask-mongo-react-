from flask import Flask, jsonify
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/')
def hello_world():
    return jsonify({"message": "Bem vindo ao Lamina do oculto RPG!!"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
