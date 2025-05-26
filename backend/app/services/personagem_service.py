from datetime import datetime
from sqlalchemy.exc import SQLAlchemyError
from models.models import Personagem

class PersonagemService:
    def __init__(self, db):
        self.db = db

    def criar_personagem(self, user_id, nome_personagem, genero, idade, descricao, classe, nivel, 
                         habilidades=None, condicoes=None,
                         proficiencias=None, regalias_de_especie=None, regalias_de_aprendiz=None, 
                         regalias_de_classe=None, regalias_de_especialization=None,
                         regalias_de_profissao=None, equipamentos=None):
        # Define valores padrão
        habilidades = habilidades or []
        condicoes = condicoes or {}
        proficiencias = proficiencias or []
        regalias_de_especie = regalias_de_especie or []
        regalias_de_aprendiz = regalias_de_aprendiz or {}
        regalias_de_classe = regalias_de_classe or {}
        regalias_de_especialization = regalias_de_especialization or {}
        regalias_de_profissao = regalias_de_profissao or []
        equipamentos = equipamentos or []

        personagem = Personagem(
            user_id=user_id,
            nome_personagem=nome_personagem,
            genero=genero,
            idade=idade,
            descricao=descricao,
            classe=classe,
            nivel=nivel,
            habilidades=habilidades,
            condicoes=condicoes,
            proficiencias=proficiencias,
            regalias_de_especie=regalias_de_especie,
            regalias_de_aprendiz=regalias_de_aprendiz,
            regalias_de_classe=regalias_de_classe,
            regalias_de_especialization=regalias_de_especialization,
            regalias_de_profissao=regalias_de_profissao,
            equipamentos=equipamentos,
            criado_em=datetime.utcnow(),
            atualizado_em=datetime.utcnow()
        )

        try:
            self.db.session.add(personagem)
            self.db.session.commit()
            return {'personagem_id': personagem.id}, 201
        except SQLAlchemyError as e:
            self.db.session.rollback()
            raise

    def obter_personagem_por_id(self, personagem_id):
        personagem = Personagem.query.get(personagem_id)
        if personagem:
            return personagem.to_dict()
        return None

    def atualizar_personagem(self, personagem_id, novos_dados):
        personagem = Personagem.query.get(personagem_id)
        if not personagem:
            return False
        for key, value in novos_dados.items():
            if hasattr(personagem, key):
                setattr(personagem, key, value)
        personagem.atualizado_em = datetime.utcnow()
        try:
            self.db.session.commit()
            return True
        except SQLAlchemyError:
            self.db.session.rollback()
            return False

    def deletar_personagem(self, personagem_id):
        personagem = Personagem.query.get(personagem_id)
        if not personagem:
            return False
        try:
            self.db.session.delete(personagem)
            self.db.session.commit()
            return True
        except SQLAlchemyError:
            self.db.session.rollback()
            return False
