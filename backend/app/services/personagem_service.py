# services/personagem_service.py

from datetime import datetime
from bson import ObjectId

class PersonagemService:
    def __init__(self, db):
        self.collection = db['personagens']

    def criar_personagem(self, user_id, nome_personagem, classe, nivel, habilidades=None, condicoes=None,
                         proficiencias=None, regalias_de_especie=None, regalias_de_classe=None, 
                         regalias_de_profissao=None, equipamentos=None):
        
        personagem = {
            "_id": ObjectId(),
            "user_id": ObjectId(user_id),
            "nome_personagem": nome_personagem,
            "classe": classe,
            "nível": nivel,
            "habilidades": habilidades if habilidades else [],
            "condições": condicoes if condicoes else {},
            "proficiencias": proficiencias if proficiencias else [],
            "regalias_de_especie": regalias_de_especie if regalias_de_especie else [],
            "regalias_de_classe": regalias_de_classe if regalias_de_classe else [],
            "regalias_de_profissão": regalias_de_profissao if regalias_de_profissao else [],
            "equipamentos": equipamentos if equipamentos else [],
            "criado_em": datetime.utcnow(),
            "atualizado_em": datetime.utcnow()
        }

        try:
            result = self.collection.insert_one(personagem)
            return str(result.inserted_id)
        except Exception as e:
            raise Exception(f"Erro ao criar personagem: {str(e)}")

    def obter_personagem_por_id(self, personagem_id):
        try:
            personagem = self.collection.find_one({"_id": ObjectId(personagem_id)})
            if personagem:
                return personagem
            else:
                return None
        except Exception as e:
            raise Exception(f"Erro ao obter personagem: {str(e)}")

    def atualizar_personagem(self, personagem_id, novos_dados):
        try:
            novos_dados["atualizado_em"] = datetime.utcnow()
            result = self.collection.update_one({"_id": ObjectId(personagem_id)}, {"$set": novos_dados})
            if result.matched_count == 1:
                return True
            else:
                return False
        except Exception as e:
            raise Exception(f"Erro ao atualizar personagem: {str(e)}")

    def deletar_personagem(self, personagem_id):
        try:
            result = self.collection.delete_one({"_id": ObjectId(personagem_id)})
            if result.deleted_count == 1:
                return True
            else:
                return False
        except Exception as e:
            raise Exception(f"Erro ao deletar personagem: {str(e)}")
