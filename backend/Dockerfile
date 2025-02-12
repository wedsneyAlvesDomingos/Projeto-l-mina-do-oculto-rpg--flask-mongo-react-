# Usando a imagem base do Python 3.8 Alpine
FROM python:3.8-alpine

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando as dependências do projeto
COPY requirements.txt .

# Instalando as dependências
RUN pip install --no-cache-dir -r requirements.txt

# Copiando o código da aplicação
COPY . .

# Expondo a porta da aplicação
EXPOSE 5055

# Comando para rodar a aplicação
CMD ["python", "app/main.py"]
