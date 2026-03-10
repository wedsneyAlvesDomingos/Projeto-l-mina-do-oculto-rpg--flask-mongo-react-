from datetime import datetime
from sqlalchemy import (
    Column, Integer, String, Boolean, DateTime, ForeignKey, Text, UniqueConstraint
)
from sqlalchemy.dialects.postgresql import JSONB
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
    __tablename__ = 'characters'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    name = Column(String, nullable=False)
    race = Column(String, nullable=True)
    character_class = Column(String, nullable=True)
    level = Column(Integer, nullable=True)
    experience = Column(Integer, default=0, nullable=True)
    regalia_points = Column(Integer, nullable=True)
    image = Column(String, nullable=True)
    gender = Column(String, nullable=True)
    age = Column(Integer, nullable=True)
    description = Column(Text, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    user = relationship('User', back_populates='personagens')
    sections = relationship('CharacterSection', back_populates='character', cascade='all, delete-orphan')
    attributes = relationship('CharacterAttribute', back_populates='character', cascade='all, delete-orphan')
    inventory = relationship('CharacterInventory', back_populates='character', cascade='all, delete-orphan')
    skills = relationship('CharacterSkill', back_populates='character', cascade='all, delete-orphan')
    conditions = relationship('CharacterCondition', back_populates='character', cascade='all, delete-orphan')
    proficiencies = relationship('CharacterProficiency', back_populates='character', cascade='all, delete-orphan')
    regalias = relationship('CharacterRegalia', back_populates='character', cascade='all, delete-orphan')

    def to_dict(self):
        """
        Retorna um dicionário serializável para JSON com os atributos do personagem
        (compatível com o front atual).
        """
        data = {
            "id": self.id,
            "user_id": self.user_id,
            "pontos_de_regalia": self.regalia_points,
            "nome_personagem": self.name,
            "image": self.image,
            "genero": self.gender,
            "idade": self.age,
            "descricao": self.description,
            "classe": self.character_class,
            "nivel": self.level,
            "especie": self.race,
            "criado_em": self.created_at.isoformat() if isinstance(self.created_at, datetime) else self.created_at,
            "atualizado_em": self.updated_at.isoformat() if isinstance(self.updated_at, datetime) else self.updated_at,
        }

        for section in self.sections:
            data[section.section_key] = section.data

        return data


class AttributeDefinition(Base):
    __tablename__ = 'attribute_definitions'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    slug = Column(String, nullable=False, unique=True)
    type = Column(String, nullable=False)
    extra_data = Column(JSONB, default={})

    attributes = relationship('CharacterAttribute', back_populates='definition', cascade='all, delete-orphan')


class CharacterAttribute(Base):
    __tablename__ = 'character_attributes'
    __table_args__ = (UniqueConstraint('character_id', 'attribute_id', name='uq_character_attribute'),)

    id = Column(Integer, primary_key=True, autoincrement=True)
    character_id = Column(Integer, ForeignKey('characters.id'), nullable=False)
    attribute_id = Column(Integer, ForeignKey('attribute_definitions.id'), nullable=False)
    current_value = Column(Integer, nullable=True)
    max_value = Column(Integer, nullable=True)

    character = relationship('Personagem', back_populates='attributes')
    definition = relationship('AttributeDefinition', back_populates='attributes')


class Item(Base):
    __tablename__ = 'items'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String, nullable=True)
    extra_data = Column(JSONB, default={})

    inventories = relationship('CharacterInventory', back_populates='item', cascade='all, delete-orphan')


class CharacterInventory(Base):
    __tablename__ = 'character_inventory'

    id = Column(Integer, primary_key=True, autoincrement=True)
    character_id = Column(Integer, ForeignKey('characters.id'), nullable=False)
    item_id = Column(Integer, ForeignKey('items.id'), nullable=True)
    quantity = Column(Integer, default=1, nullable=False)
    equipped = Column(Boolean, default=False, nullable=False)
    slot = Column(String, nullable=True)
    extra_data = Column(JSONB, default={})

    character = relationship('Personagem', back_populates='inventory')
    item = relationship('Item', back_populates='inventories')


class Skill(Base):
    __tablename__ = 'skills'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    type = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    extra_data = Column(JSONB, default={})

    characters = relationship('CharacterSkill', back_populates='skill', cascade='all, delete-orphan')


class CharacterSkill(Base):
    __tablename__ = 'character_skills'

    id = Column(Integer, primary_key=True, autoincrement=True)
    character_id = Column(Integer, ForeignKey('characters.id'), nullable=False)
    skill_id = Column(Integer, ForeignKey('skills.id'), nullable=True)
    level = Column(Integer, nullable=True)
    extra_data = Column(JSONB, default={})

    character = relationship('Personagem', back_populates='skills')
    skill = relationship('Skill', back_populates='characters')


class Condition(Base):
    __tablename__ = 'conditions'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    extra_data = Column(JSONB, default={})

    characters = relationship('CharacterCondition', back_populates='condition', cascade='all, delete-orphan')


class CharacterCondition(Base):
    __tablename__ = 'character_conditions'

    id = Column(Integer, primary_key=True, autoincrement=True)
    character_id = Column(Integer, ForeignKey('characters.id'), nullable=False)
    condition_id = Column(Integer, ForeignKey('conditions.id'), nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)
    extra_data = Column(JSONB, default={})

    character = relationship('Personagem', back_populates='conditions')
    condition = relationship('Condition', back_populates='characters')


class Proficiency(Base):
    __tablename__ = 'proficiencies'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    extra_data = Column(JSONB, default={})

    characters = relationship('CharacterProficiency', back_populates='proficiency', cascade='all, delete-orphan')


class CharacterProficiency(Base):
    __tablename__ = 'character_proficiencies'

    id = Column(Integer, primary_key=True, autoincrement=True)
    character_id = Column(Integer, ForeignKey('characters.id'), nullable=False)
    proficiency_id = Column(Integer, ForeignKey('proficiencies.id'), nullable=True)
    level = Column(Integer, nullable=True)
    extra_data = Column(JSONB, default={})

    character = relationship('Personagem', back_populates='proficiencies')
    proficiency = relationship('Proficiency', back_populates='characters')


class Regalia(Base):
    __tablename__ = 'regalias'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    type = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    extra_data = Column(JSONB, default={})

    characters = relationship('CharacterRegalia', back_populates='regalia', cascade='all, delete-orphan')


class CharacterRegalia(Base):
    __tablename__ = 'character_regalias'

    id = Column(Integer, primary_key=True, autoincrement=True)
    character_id = Column(Integer, ForeignKey('characters.id'), nullable=False)
    regalia_id = Column(Integer, ForeignKey('regalias.id'), nullable=True)
    source_type = Column(String, nullable=True)
    extra_data = Column(JSONB, default={})

    character = relationship('Personagem', back_populates='regalias')
    regalia = relationship('Regalia', back_populates='characters')


class CharacterSection(Base):
    __tablename__ = 'character_sections'
    __table_args__ = (UniqueConstraint('character_id', 'section_key', name='uq_character_section'),)

    id = Column(Integer, primary_key=True, autoincrement=True)
    character_id = Column(Integer, ForeignKey('characters.id'), nullable=False)
    section_key = Column(String, nullable=False)
    data = Column(JSONB, default={})

    character = relationship('Personagem', back_populates='sections')