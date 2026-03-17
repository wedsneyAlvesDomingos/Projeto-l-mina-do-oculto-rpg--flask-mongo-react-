"""
test_api.py — Testes de integração dos endpoints v2 (Flask test client + DB real)
==================================================================================
Verifica: status HTTP, estrutura do JSON, contagem de registros, filtros.
"""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'app'))

import pytest
import json


# =============================================================================
# GET /api/v2/catalogs  (all-in-one)
# =============================================================================
class TestAllCatalogs:
    def test_status_200(self, client):
        r = client.get('/api/v2/catalogs')
        assert r.status_code == 200

    def test_chaves_presentes(self, client):
        data = client.get('/api/v2/catalogs').get_json()
        for chave in ('skills', 'proficiencias', 'especies', 'condicoes',
                      'items', 'abilities', 'classes', 'regalias',
                      'arvores', 'profissoes'):
            assert chave in data, f"Chave '{chave}' ausente no response"

    def test_todas_listas(self, client):
        data = client.get('/api/v2/catalogs').get_json()
        for chave, valor in data.items():
            assert isinstance(valor, list), f"'{chave}' deve ser lista, é {type(valor)}"


# =============================================================================
# GET /api/v2/catalogs/skills
# =============================================================================
class TestSkills:
    def test_status_200(self, client):
        assert client.get('/api/v2/catalogs/skills').status_code == 200

    def test_tem_35_habilidades(self, client):
        data = client.get('/api/v2/catalogs/skills').get_json()
        assert len(data) == 35

    def test_estrutura_item(self, client):
        item = client.get('/api/v2/catalogs/skills').get_json()[0]
        for campo in ('id', 'slug', 'nome', 'categoria'):
            assert campo in item, f"Campo '{campo}' ausente"

    def test_filtro_categoria_fisico(self, client):
        data = client.get('/api/v2/catalogs/skills?categoria=fisico').get_json()
        assert len(data) == 8
        assert all(d['categoria'] == 'fisico' for d in data)

    def test_filtro_categoria_arcana(self, client):
        data = client.get('/api/v2/catalogs/skills?categoria=arcana').get_json()
        assert len(data) == 6

    @pytest.mark.parametrize("cat, count", [
        ('fisico', 8), ('exploracao', 8), ('conhecimento', 7),
        ('arcana', 6), ('social', 6),
    ])
    def test_contagem_por_categoria(self, client, cat, count):
        data = client.get(f'/api/v2/catalogs/skills?categoria={cat}').get_json()
        assert len(data) == count, f"categoria={cat}: esperado {count}, obtido {len(data)}"


# =============================================================================
# GET /api/v2/catalogs/proficiencias
# =============================================================================
class TestProficiencias:
    def test_status_200(self, client):
        assert client.get('/api/v2/catalogs/proficiencias').status_code == 200

    def test_tem_15_proficiencias(self, client):
        data = client.get('/api/v2/catalogs/proficiencias').get_json()
        assert len(data) == 15

    def test_estrutura_item(self, client):
        item = client.get('/api/v2/catalogs/proficiencias').get_json()[0]
        assert 'slug' in item
        assert 'nome' in item


# =============================================================================
# GET /api/v2/catalogs/species
# =============================================================================
class TestEspecies:
    def test_status_200(self, client):
        assert client.get('/api/v2/catalogs/species').status_code == 200

    def test_tem_14_especies(self, client):
        data = client.get('/api/v2/catalogs/species').get_json()
        assert len(data) == 14

    def test_tem_subespecies(self, client):
        data = client.get('/api/v2/catalogs/species').get_json()
        total_subs = sum(len(e.get('subespecies', [])) for e in data)
        assert total_subs == 15

    def test_sem_subespecies_param(self, client):
        data = client.get('/api/v2/catalogs/species?subespecies=false').get_json()
        # quando subespecies=false, campo pode não estar presente ou ser vazio
        for e in data:
            assert e.get('subespecies', []) == []

    def test_estrutura_especie(self, client):
        e = client.get('/api/v2/catalogs/species').get_json()[0]
        for campo in ('id', 'slug', 'nome', 'pvBase', 'velocidadeBase'):
            assert campo in e, f"Campo '{campo}' ausente"

    def test_pv_base_positivo(self, client):
        data = client.get('/api/v2/catalogs/species').get_json()
        for e in data:
            assert e['pvBase'] > 0


# =============================================================================
# GET /api/v2/catalogs/conditions
# =============================================================================
class TestCondicoes:
    def test_status_200(self, client):
        assert client.get('/api/v2/catalogs/conditions').status_code == 200

    def test_tem_31_condicoes(self, client):
        data = client.get('/api/v2/catalogs/conditions').get_json()
        assert len(data) == 31

    def test_estrutura_item(self, client):
        item = client.get('/api/v2/catalogs/conditions').get_json()[0]
        for campo in ('id', 'slug', 'nome', 'categoria'):
            assert campo in item

    def test_filtro_categoria_controle(self, client):
        data = client.get('/api/v2/catalogs/conditions?categoria=controle').get_json()
        assert len(data) > 0
        assert all(d['categoria'] == 'controle' for d in data)

    def test_filtro_categoria_dano(self, client):
        data = client.get('/api/v2/catalogs/conditions?categoria=dano_continuo').get_json()
        assert len(data) > 0


# =============================================================================
# GET /api/v2/catalogs/items
# =============================================================================
class TestItems:
    def test_status_200(self, client):
        assert client.get('/api/v2/catalogs/items').status_code == 200

    def test_tem_48_itens(self, client):
        data = client.get('/api/v2/catalogs/items').get_json()
        assert len(data) == 48

    def test_estrutura_item(self, client):
        item = client.get('/api/v2/catalogs/items').get_json()[0]
        for campo in ('id', 'slug', 'nome', 'categoria'):
            assert campo in item

    def test_filtro_categoria_arma(self, client):
        data = client.get('/api/v2/catalogs/items?categoria=arma').get_json()
        armas_simples  = client.get('/api/v2/catalogs/items?subcategoria=arma_simples').get_json()
        armas_marciais = client.get('/api/v2/catalogs/items?subcategoria=arma_marcial').get_json()
        assert len(data) == len(armas_simples) + len(armas_marciais)

    def test_filtro_subcategoria_armadura_leve(self, client):
        data = client.get('/api/v2/catalogs/items?subcategoria=armadura_leve').get_json()
        assert len(data) > 0

    def test_armas_tem_dano(self, client):
        armas = client.get('/api/v2/catalogs/items?categoria=arma').get_json()
        for arma in armas:
            assert arma.get('dano') is not None, f"Arma {arma['slug']} sem campo dano"


# =============================================================================
# GET /api/v2/catalogs/abilities
# =============================================================================
class TestAbilities:
    def test_status_200(self, client):
        assert client.get('/api/v2/catalogs/abilities').status_code == 200

    def test_tem_15_abilities(self, client):
        data = client.get('/api/v2/catalogs/abilities').get_json()
        assert len(data) == 15

    def test_estrutura_item(self, client):
        item = client.get('/api/v2/catalogs/abilities').get_json()[0]
        for campo in ('id', 'slug', 'nome', 'tipo'):
            assert campo in item

    def test_filtro_tipo_passiva(self, client):
        data = client.get('/api/v2/catalogs/abilities?tipo=passiva').get_json()
        assert len(data) > 0
        assert all(d['tipo'] == 'passiva' for d in data)


# =============================================================================
# GET /api/v2/catalogs/classes
# =============================================================================
class TestClasses:
    def test_status_200(self, client):
        assert client.get('/api/v2/catalogs/classes').status_code == 200

    def test_tem_18_classes(self, client):
        data = client.get('/api/v2/catalogs/classes').get_json()
        assert len(data) == 18

    def test_estrutura_item(self, client):
        item = client.get('/api/v2/catalogs/classes').get_json()[0]
        for campo in ('id', 'slug', 'nome', 'tipo'):
            assert campo in item

    def test_filtro_tipo_aprendiz(self, client):
        data = client.get('/api/v2/catalogs/classes?tipo=aprendiz').get_json()
        assert len(data) > 0
        assert all(d['tipo'] == 'aprendiz' for d in data)

    def test_filtro_tipo_primaria(self, client):
        data = client.get('/api/v2/catalogs/classes?tipo=primaria').get_json()
        assert len(data) > 0


# =============================================================================
# GET /api/v2/catalogs/regalias
# =============================================================================
class TestRegalias:
    def test_status_200(self, client):
        assert client.get('/api/v2/catalogs/regalias').status_code == 200

    def test_tem_31_regalias(self, client):
        data = client.get('/api/v2/catalogs/regalias').get_json()
        assert len(data) == 31

    def test_estrutura_item(self, client):
        item = client.get('/api/v2/catalogs/regalias').get_json()[0]
        for campo in ('id', 'slug', 'nome', 'tipo', 'custo'):
            assert campo in item

    def test_custo_positivo(self, client):
        data = client.get('/api/v2/catalogs/regalias').get_json()
        for r in data:
            assert r['custo'] >= 1

    def test_filtro_tipo_aprendiz(self, client):
        data = client.get('/api/v2/catalogs/regalias?tipo=aprendiz').get_json()
        assert len(data) == 7
        assert all(d['tipo'] == 'aprendiz' for d in data)


# =============================================================================
# GET /api/v2/catalogs/arvores
# =============================================================================
class TestArvores:
    def test_status_200(self, client):
        assert client.get('/api/v2/catalogs/arvores').status_code == 200

    def test_tem_8_arvores(self, client):
        data = client.get('/api/v2/catalogs/arvores').get_json()
        assert len(data) == 8

    def test_estrutura_arvore(self, client):
        arv = client.get('/api/v2/catalogs/arvores').get_json()[0]
        for campo in ('id', 'slug', 'nome'):
            assert campo in arv
        assert 'niveis' in arv

    def test_cada_arvore_tem_3_niveis(self, client):
        data = client.get('/api/v2/catalogs/arvores').get_json()
        for arv in data:
            assert len(arv['niveis']) == 3, (
                f"Árvore '{arv['slug']}' tem {len(arv['niveis'])} níveis, esperado 3"
            )

    def test_niveis_ordenados(self, client):
        data = client.get('/api/v2/catalogs/arvores').get_json()
        for arv in data:
            niveis = [n['nivel'] for n in arv['niveis']]
            assert niveis == sorted(niveis)


# =============================================================================
# GET /api/v2/catalogs/profissoes
# =============================================================================
class TestProfissoes:
    def test_status_200(self, client):
        assert client.get('/api/v2/catalogs/profissoes').status_code == 200

    def test_tem_5_profissoes(self, client):
        data = client.get('/api/v2/catalogs/profissoes').get_json()
        assert len(data) == 5

    def test_estrutura_item(self, client):
        item = client.get('/api/v2/catalogs/profissoes').get_json()[0]
        for campo in ('id', 'slug', 'nome'):
            assert campo in item


# =============================================================================
# Rotas básicas (smoke tests)
# =============================================================================
class TestSmoke:
    def test_root(self, client):
        r = client.get('/')
        assert r.status_code == 200
        data = r.get_json()
        assert 'message' in data

    def test_db_check(self, client):
        r = client.get('/db')
        assert r.status_code == 200

    def test_404_unknown_route(self, client):
        r = client.get('/rota/inexistente/xyz')
        assert r.status_code == 404
