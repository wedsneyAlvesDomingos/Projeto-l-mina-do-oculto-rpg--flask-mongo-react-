from datetime import datetime
from sqlalchemy import (
    Column, Integer, String, Boolean, DateTime, ForeignKey, JSON, Text
)
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
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
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    pontos_de_regalia = Column(Integer, nullable=False)
    image = Column(String, nullable=False)
    nome_personagem = Column(String, nullable=False)
    genero = Column(String, nullable=True)
    dinheiro = Column(String, nullable=True)
    idade = Column(Integer, nullable=True)
    descricao = Column(Text, nullable=True)
    classe = Column(String, nullable=True)
    nivel = Column(Integer, nullable=True)
    antecedente = Column(JSON, default={})
    habilidades = Column(JSON, default=[])
    condicoes = Column(JSON, default={})
    proficiencias = Column(JSON, default=[])
    especie = Column(String, nullable=False)
    regalias_de_especie = Column(JSON, default=[])
    regalias_de_aprendiz = Column(JSON, default={})
    regalias_de_classe = Column(JSON, default={})
    regalias_de_especialization = Column(JSON, default={})
    regalias_de_profissao = Column(JSON, default=[])
    equipamentos = Column(JSON, default=[])

    criado_em = Column(DateTime, default=datetime.utcnow, nullable=False)
    atualizado_em = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    user = relationship('User', back_populates='personagens')

    def to_dict(self):
        """
        Retorna um dicionário serializável para JSON com os atributos do personagem.
        """
        return {
            "id": self.id,
            "pontos_de_regalia": self.pontos_de_regalia,
            "user_id": self.user_id,
            "image": self.image,
            "nome_personagem": self.nome_personagem,
            "dinheiro": self.dinheiro,
            "genero": self.genero,
            "idade": self.idade,
            "descricao": self.descricao,
            "classe": self.classe,
            "nivel": self.nivel,
            "antecedente": self.antecedente,
            "habilidades": self.habilidades,
            "condicoes": self.condicoes,
            "proficiencias": self.proficiencias,
            "especie": self.especie,
            "regalias_de_especie": self.regalias_de_especie,
            "regalias_de_aprendiz": self.regalias_de_aprendiz,
            "regalias_de_classe": self.regalias_de_classe,
            "regalias_de_especialization": self.regalias_de_especialization,
            "regalias_de_profissao": self.regalias_de_profissao,
            "equipamentos": self.equipamentos,
            "criado_em": self.criado_em.isoformat() if isinstance(self.criado_em, datetime) else self.criado_em,
            "atualizado_em": self.atualizado_em.isoformat() if isinstance(self.atualizado_em, datetime) else self.atualizado_em,
        }