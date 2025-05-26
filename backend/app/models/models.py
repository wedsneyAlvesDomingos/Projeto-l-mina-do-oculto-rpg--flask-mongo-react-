from datetime import datetime
from sqlalchemy import (
    Column, Integer, String, Boolean, DateTime, ForeignKey, JSON, Text
)
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    _id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    email_confirmed = Column(Boolean, default=False, nullable=False)
    confirmation_token = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    personagens = relationship('Personagem', back_populates='user', cascade='all, delete-orphan')

class Personagem(Base):
    __tablename__ = 'personagens'

    _id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users._id'), nullable=False)
    nome_personagem = Column(String, nullable=False)
    genero = Column(String, nullable=True)
    idade = Column(Integer, nullable=True)
    descricao = Column(Text, nullable=True)
    classe = Column(String, nullable=True)
    nivel = Column(Integer, nullable=True)

    habilidades = Column(JSON, default=[])
    condicoes = Column(JSON, default={})
    proficiencias = Column(JSON, default=[])
    regalias_de_especie = Column(JSON, default=[])
    regalias_de_aprendiz = Column(JSON, default={})
    regalias_de_classe = Column(JSON, default={})
    regalias_de_especialization = Column(JSON, default={})
    regalias_de_profissao = Column(JSON, default=[])
    equipamentos = Column(JSON, default=[])

    criado_em = Column(DateTime, default=datetime.utcnow, nullable=False)
    atualizado_em = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    user = relationship('User', back_populates='personagens')
