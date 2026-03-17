# Schema do Banco de Dados — Lâmina do Oculto v0.5

> Referência completa para o `schema_v2.sql`. Descreve cada tabela, seus JSONB
> fields, o mapeamento dos arquivos JS originais e as regras de seed.

---

## Índice

1. [Visão Geral](#1-visão-geral)
2. [Diagrama de Dependências](#2-diagrama-de-dependências)
3. [Catálogos](#3-catálogos)
4. [Tabelas de Personagem](#4-tabelas-de-personagem)
5. [Schemas JSONB Detalhados](#5-schemas-jsonb-detalhados)
6. [Mapeamento JS → SQL](#6-mapeamento-js--sql)
7. [Ordem de Seed](#7-ordem-de-seed)
8. [Consultas de Exemplo](#8-consultas-de-exemplo)

---

## 1. Visão Geral

O banco substitui ~15.500 linhas de JavaScript em 6 arquivos (`regalias.js`,
`especies.js`, `condicoes.js`, `equipamentos.js`, `profissoes.js`,
`antecedentes.js`) por tabelas relacionais PostgreSQL com campos JSONB para
dados heterogêneos.

### Princípios de Design

| Princípio | Decisão |
|-----------|---------|
| Regalias complexas vs simples | Mesma tabela `catalog_regalias`, campos JSONB nulos para passivas simples |
| Abilities unificadas | `catalog_abilities` cobre: passiva, ativa, reação, magia, milagre, feitiço, ritual |
| Escalamento heterogêneo | JSONB `escalamento` — nunca normalizar (cada ability tem shape único) |
| Árvores de regalia | `catalog_arvores_regalia` + `catalog_arvore_niveis` + `catalog_regalias` (N-N) |
| Condições progressivas | `catalog_condicoes.niveis_detalhes` JSONB array (evita join extra para 90% dos casos) |
| Estado de personagem | Tabelas `character_*` — nunca misturar com catálogos |
| Cache de derivados | `characters.derivados` JSONB — recalculado pelo backend a cada mudança significativa |

---

## 2. Diagrama de Dependências

```
users
  └── characters
        ├── catalog_especies
        │     └── catalog_subespecies
        ├── catalog_antecedentes
        ├── catalog_classes (aprendiz / primaria / especializacao)
        │     ├── catalog_arvores_regalia
        │     │     └── catalog_arvore_niveis
        │     │           └── catalog_regalias
        │     │                 └── catalog_regalia_abilities
        │     │                       └── catalog_abilities
        │     └── catalog_classe_especializacoes
        ├── character_skills ──── catalog_skills
        ├── character_proficiencias ──── catalog_proficiencias
        ├── character_regalias ──── catalog_regalias
        ├── character_abilities ──── catalog_abilities
        ├── character_effects ──── catalog_condicoes
        ├── character_inventory ──── catalog_items
        ├── character_profissoes ──── catalog_profissoes
        │     └── character_profissao_habilidades ──── catalog_profissao_habilidades
        └── character_audit_log
```

---

## 3. Catálogos

### 3.1 `catalog_skills` — Habilidades do Sistema

35 habilidades distribuídas em 5 categorias:

| Categoria | Habilidades |
|-----------|-------------|
| `fisico` | fortitude, forca, agilidade, combate_corpo_a_corpo, combate_distancia, combate_desarmado, manha, presença |
| `exploracao` | acrobacia, furtividade, percepcao, atletismo, sobrevivencia, ladinagem, pilotagem, adestramento |
| `conhecimento` | historia, medicina, natureza, tecnologia, investigacao, crime, misticismo |
| `arcana` | arcanismo, controle_magico, testes_magicos, magia_ofensiva, magia_defensiva, rituais |
| `social` | persuasao, enganacao, intimidacao, intuicao, performance, lideranca |

**Campo `marcos` JSONB:**
```json
[
  { "nivel": 3, "descricao": "Pode usar Furtividade em combate sem penalidade", "bonus": {} },
  { "nivel": 5, "descricao": "Vantagem em testes de Furtividade em ambiente urbano", "bonus": {} }
]
```

---

### 3.2 `catalog_regalias` — Regalias (coração do sistema)

#### Regalias Simples (passiva sem ability)
```sql
INSERT INTO catalog_regalias (slug, display_name, regalia_tipo, custo, descricao,
    bonus_habilidades) VALUES
('combate_acuidade', 'Combate com Arma de Acuidade', 'avulsa', 1,
 'Usa Destreza (Agilidade) em vez de Força para ataques com armas leves ou de arremesso.',
 '{"combate_corpo_a_corpo": 1}'::jsonb);
```

#### Regalias de Árvore (3 níveis sequenciais)
```sql
-- A regalia de nível 1 é inserida normalmente em catalog_regalias.
-- A árvore referencia as 3 regalias por catalog_arvore_niveis.
```

#### Regalias com Opções Exclusivas (ex: Psíquico)
```json
{
  "opcoes_exclusivas": [
    {
      "slug": "telecinese",
      "nome": "Telecinese",
      "descricao": "Pode mover objetos à distância com a mente.",
      "ability_slug": "telecinese_ativa",
      "efeitos": { "alcance": 9, "cargaKg": 10 }
    },
    {
      "slug": "telepatia",
      "nome": "Telepatia",
      "descricao": "Pode ler e enviar pensamentos.",
      "ability_slug": "telepatia_ativa"
    }
  ]
}
```

#### Campo `pre_requisitos` JSONB completo
```json
{
  "nivelMinimo": 3,
  "regaliaAprendiz": "combatente",
  "regaliasNecessarias": ["combatente.combate_defensivo_1"],
  "habilidadeMinima": { "slug": "combate_corpo_a_corpo", "valor": 5 },
  "proficienciaNecessaria": "armaduras_pesadas",
  "regaliaIncompativel": ["feiticeiro_aprendiz"],
  "classeMinima": { "classe": "combatente_primario", "regalias": 10 }
}
```

---

### 3.3 `catalog_abilities` — Abilities Universais

#### Passiva simples
```sql
INSERT INTO catalog_abilities (slug, display_name, tipo, descricao,
    passivos) VALUES
('combate_desarmado_treinado', 'Combate Desarmado Treinado', 'passiva',
 'Seus ataques desarmados causam 1d4 de dano e são considerados armas marciais.',
 '{"combateDesarmadoTreinado": true, "danoDesarmado": "1d4"}'::jsonb);
```

#### Ativa com escala (Voz de Comando)
```sql
INSERT INTO catalog_abilities (slug, display_name, tipo,
    custo_acoes, custo_magia, duracao_texto, alcance_m,
    efeito, escalamento) VALUES
('voz_de_comando', 'Voz de Comando', 'milagre',
 1, 2, '1 rodada', 9.0,
 '{"condicao": "amedrontado", "chanceSucesso": 50}'::jsonb,
 '{"bonusChancePor2Magia": 5}'::jsonb);
```

#### Ativa com efeito opcional (Recuperar Fôlego)
```sql
INSERT INTO catalog_abilities (slug, display_name, tipo,
    custo_acoes, custo_estamina,
    efeito, efeito_opcional, cooldown_tipo, cooldown_valor) VALUES
('recuperar_folego', 'Recuperar Fôlego', 'ativa',
 1, 1,
 '{"curaEstamina": "2d4"}'::jsonb,
 '{"custoEstaminaExtra": 1, "curaHP": "2d4"}'::jsonb,
 'descanso_curto', 1);
```

#### Ativa com múltiplos escalamentos (Mísseis Mágicos)
```sql
INSERT INTO catalog_abilities (slug, display_name, tipo,
    custo_acoes, custo_magia, alcance_m,
    efeito, escalamento) VALUES
('misseis_magicos', 'Mísseis Mágicos', 'magia',
 1, 2, 30.0,
 '{"misseisPorCast": 1, "dano": "1d6+3", "tipoDano": "arcano"}'::jsonb,
 '{"custoMagiaPorMissilExtra": 2, "misseisMax": 5}'::jsonb);
```

---

### 3.4 `catalog_condicoes` — Condições

#### Campo `flags` JSONB
```json
{
  "semAcoes": false,
  "semReacoes": false,
  "semMovimento": false,
  "semConcentracao": false,
  "desvantagemAtaques": false,
  "vantagemContraAlvo": false,
  "vantagemAtaques": false,
  "desvantagemContraAlvo": false,
  "imuneADano": false,
  "criticoReduzido": false
}
```

#### Campo `niveis_detalhes` JSONB (condições progressivas)
```json
[
  {
    "nivel": 1,
    "nome": "Levemente Cansado",
    "descricao": "Velocidade reduzida.",
    "penalidades": { "velocidade": -1.5 },
    "flags": {},
    "danoRecorrente": null,
    "acoesReduzidas": 0
  },
  {
    "nivel": 3,
    "nome": "Exausto",
    "descricao": "Severamente debilitado.",
    "penalidades": { "velocidade": -3.0, "testes": -2 },
    "flags": {},
    "danoRecorrente": null,
    "acoesReduzidas": 1
  },
  {
    "nivel": 5,
    "nome": "Incapacitado pelo Cansaço",
    "descricao": "Não pode agir.",
    "penalidades": {},
    "flags": { "semAcoes": true },
    "danoRecorrente": null,
    "acoesReduzidas": 3
  }
]
```

---

### 3.5 `catalog_items` — Equipamentos

#### Arma (exemplo: Espada Longa)
```sql
INSERT INTO catalog_items (slug, display_name, categoria, subcategoria,
    dano, tipo_dano, critico_margem, alcance_texto, maos,
    prof_requerida, propriedades, peso_kg, preco_mo) VALUES
('espada_longa', 'Espada Longa', 'arma', 'marcial',
 '1d8', 'cortante', 19, 'corpo-a-corpo', '1ou2',
 'armas_marciais', ARRAY['versatil'], 1.5, 15);
```

#### Armadura Pesada (exemplo: Cota de Malha)
```sql
INSERT INTO catalog_items (slug, display_name, categoria,
    defesa, forca_minima, penalidade, peso_kg, preco_mo) VALUES
('cota_de_malha', 'Cota de Malha', 'armadura_pesada',
 14, 3, '{"velocidade": -1.5, "furtividade": -3}'::jsonb, 25, 75);
```

---

### 3.6 `catalog_classes` — Classes

#### Exemplo: Combatente Primário
```sql
INSERT INTO catalog_classes (slug, display_name, tipo, aprendiz_slug,
    bonus_por_regalia, habilidade_classe_nome, habilidade_classe_descricao,
    habilidade_classe_efeito) VALUES
('combatente_primario', 'Combatente', 'primaria', 'combatente_aprendiz',
 '{"pv": 4, "estamina": 4, "magia": 0}'::jsonb,
 'Implacável',
 'Uma vez por turno, ao acertar um ataque, você pode gastar 2 PE para acertar um segundo ataque gratuitamente.',
 '{"tipo": "reacao_ataque", "custoPE": 2, "ataqueBonus": true}'::jsonb);
```

#### Especialização Mista (exemplo: Monge)
```sql
INSERT INTO catalog_classe_especializacoes
    (classe_id, especializacao_id, min_regalias_propria, outras_classes_req)
SELECT
    (SELECT id FROM catalog_classes WHERE slug = 'combatente_primario'),
    (SELECT id FROM catalog_classes WHERE slug = 'monge'),
    7,
    '[{"classe_slug": "novico_primario", "min_regalias": 3}]'::jsonb;
```

---

## 4. Tabelas de Personagem

### 4.1 `characters` — Campo `derivados` JSONB

Calculado pelo `rule_engine.py` a cada mudança e cacheado:

```json
{
  "pvMax": 42,
  "pmMax": 18,
  "peMax": 24,
  "defesaTotal": 13,
  "velocidadeTotal": 7.5,
  "iniciativa": 4,
  "cargaMax": 45,
  "alcanceCombate": 1.5,
  "bonusAtaqueMelee": 3,
  "bonusAtaqueDistancia": 2,
  "resistencias": ["cortante"],
  "imunidades": [],
  "vulnerabilidades": [],
  "penalidades": {
    "cansaco": { "velocidade": 0, "testes": 0 },
    "armadura": { "furtividade": -3 }
  }
}
```

### 4.2 `character_effects` — Campo `snapshot` JSONB

Snapshot do efeito no momento da aplicação (para resolver sem depender de FK):

```json
{
  "penalidades": { "defesa": -2, "ataques": -1 },
  "flags": { "desvantagemAtaques": true },
  "danoRecorrente": { "valor": "1d6", "tipo": "fogo", "momento": "inicio_turno" }
}
```

---

## 5. Schemas JSONB Detalhados

### `catalog_abilities.efeito`

| Campo | Tipo | Descrição | Exemplo |
|-------|------|-----------|---------|
| `curaHP` | string | Expressão de cura de PV | `"2d6+fortitude"` |
| `curaEstamina` | string | Expressão de cura de PE | `"2d4"` |
| `recuperarMagia` | string | PM recuperados | `"1d6+1"` |
| `pvTemporario` | integer | PV temporários | `4` |
| `dano` | string | Expressão de dano | `"2d8"` |
| `tipoDano` | string | Tipo de dano | `"necrotico"` |
| `chanceSucesso` | integer | % base de sucesso | `50` |
| `condicao` | string | Slug da condição aplicada | `"atordoado"` |
| `duracao` | string | Duração em texto | `"ate_proximo_turno"` |
| `bonusDefesa` | integer | Bônus de defesa | `2` |
| `vantagemAtaques` | boolean | Vantagem em ataques | `true` |
| `bonusDano` | string\|int | Bônus de dano | `"fortitude"` ou `2` |
| `misseisPorCast` | integer | Mísseis por lançamento | `1` |
| `misseisMax` | integer | Máximo de mísseis | `5` |
| `resistencias` | array | Resistências temporárias | `["magico","fogo"]` |
| `removerCondicao` | array | Condições removidas | `["envenenado"]` |
| `forcarFuga` | boolean | Força o alvo a fugir | `true` |
| `alcanceExtra` | number | Metros extras de alcance | `1.5` |
| `velocidadeExtra` | number | Metros extras de velocidade | `1.5` |
| `luzCompleta` | integer | Raio de luz plena (m) | `6` |
| `meiaLuz` | integer | Raio de meia-luz (m) | `6` |
| `converterHPParaMagia` | boolean | Ativa conversão PV→PM | `true` |
| `razao` | string | Razão de conversão | `"1:1"` |
| `maximo` | integer | Máximo de conversão | `5` |
| `reRolagemD20` | boolean | Permite rerolar d20 | `true` |
| `encantarArma` | object | Encantamento temporário | `{"duracao":"1h","propriedade":"flamejante"}` |
| `tabelaElemento` | object | Tabela de elementos aleatórios | `{"1":"fogo","2":"gelo","3":"raio"}` |
| `tabelaDesconto` | array | Tabela de descontos | `[{"rolagem":"1-10","desconto":0},...]` |

### `catalog_abilities.escalamento`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `bonusChancePorMagiaExtra` | int | +N% por PM gasto além do base |
| `bonusChancePorEstaminaExtra` | int | +N% por PE extra |
| `bonusChancePor2Magia` | int | +N% a cada 2 PM extras |
| `bonusChancePor3Magia` | int | +N% a cada 3 PM extras |
| `custoMagiaPorMissilExtra` | int | Custo em PM por míssil adicional |
| `custoMagiaPorEsferaExtra` | int | Custo em PM por esfera adicional |
| `custoEstaminaRepetirMesmoTurno` | int | Custo extra em PE para repetir na mesma rodada |
| `custoEstaminaPorD6Extra` | int | Custo em PE por 1d6 extra de dano |
| `bonusCuraPor2Magia` | string | Expressão de cura extra a cada 2 PM |
| `bonusDanoPor2Magia` | string | Expressão de dano extra a cada 2 PM |
| `bonusDanoPor3Magia` | string | Expressão de dano extra a cada 3 PM |
| `rodadasExtraPor2Magia` | int | Rodadas extras por 2 PM |
| `alvosExtraPor3Magia` | int | Alvos extras por 3 PM |
| `por2Magia` | object | Bundle de bônus por 2 PM `{pvTemporario:2, bonusDefesa:1}` |
| `custoMagiaPorMinutoExtra` | int | PM por minuto extra de duração |
| `custoMagiaPorTurnoExtra` | int | PM por turno extra |
| `custoMagiaSegundaArma` | int | PM para segunda arma receber o efeito |

---

## 6. Mapeamento JS → SQL

### `regalias.js`

| Estrutura JS | Tabela SQL |
|-------------|------------|
| `regaliasDeAprendiz.combatente` | `catalog_regalias` (tipo=`aprendiz`) + `catalog_regalia_abilities` |
| `regaliasDeAprendiz.*.habilidadesGanhas` | `catalog_abilities` + `catalog_regalia_abilities` |
| `regaliasDeAprendiz.*.escolhasHabilidades` | `catalog_regalias.escolhas_habilidades` JSONB |
| `regaliasDeAprendiz.*.bonusPorRegalia` | `catalog_regalias.bonus_por_regalia` JSONB |
| `regaliasOpcionais.psiquico` | `catalog_regalias` (tipo=`especie_opcional`) com `opcoes_exclusivas` JSONB |
| `regaliasOpcionais.vampiro` | `catalog_regalias` (tipo=`especie_opcional`) por subespécie vampiro |
| `regaliasOpcionais.mutante` | `catalog_regalias` (tipo=`especie_opcional`) por subespécie mutante |
| `classesPrimarias.*.arvoresRegalia` | `catalog_arvores_regalia` + `catalog_arvore_niveis` |
| `classesPrimarias.*.arvoresRegalia[].niveis[*]` | `catalog_regalias` (tipo=`classe_primaria`) + `catalog_regalia_abilities` |
| `classesPrimarias.*.regaliasAvulsas` | `catalog_regalias` (tipo=`avulsa`) |
| `classesPrimarias.*.habilidadeClasse` | `catalog_classes.habilidade_classe_*` |
| `classesPrimarias.*.habilidadeClasse.subHabilidades` | `catalog_abilities` vinculadas via `catalog_regalia_abilities` |
| `especializacoes.*` | `catalog_classes` (tipo=`especializacao`) + `catalog_classe_especializacoes` |

### `especies.js`

| Estrutura JS | Tabela SQL |
|-------------|------------|
| `especies.*` | `catalog_especies` |
| `especies.*.obrigatorias` | `catalog_subespecies` |
| `especies.*.obrigatorias[].habilidadesEspeciais` | `catalog_abilities` vinculadas à subespécie via `catalog_regalia_abilities` |
| `especies.*.regalias` | `catalog_regalias` (tipo=`especie`, `especie_id=X`) |

### `condicoes.js`

| Estrutura JS | Tabela SQL |
|-------------|------------|
| `condicoes.*` | `catalog_condicoes` |
| `condicoes.*.penalidades` | `catalog_condicoes.penalidades` JSONB |
| `condicoes.*.flags` | `catalog_condicoes.flags` JSONB |
| `condicoes.*.danoRecorrente` | `catalog_condicoes.dano_recorrente` JSONB |
| `condicoes.*.niveisDetalhes` | `catalog_condicoes.niveis_detalhes` JSONB array |
| `condicoes.*.condicoesImplicitas` | `catalog_condicoes.condicoes_implicitas` TEXT[] |

### `equipamentos.js`

| Estrutura JS | Tabela SQL |
|-------------|------------|
| `armadurasPesadas` | `catalog_items` (categoria=`armadura_pesada`) |
| `armadurasMedias` | `catalog_items` (categoria=`armadura_media`) |
| `armadurasLeves` | `catalog_items` (categoria=`armadura_leve`) |
| `escudos` | `catalog_items` (categoria=`escudo`) |
| `armasSimples` | `catalog_items` (categoria=`arma`, subcategoria=`simples`) |
| `armasMarciais` | `catalog_items` (categoria=`arma`, subcategoria=`marcial`) |
| `armasExoticas` | `catalog_items` (categoria=`arma`, subcategoria=`exotica`) |
| `arm.efeitosEspeciais` | `catalog_items.efeitos_especiais` JSONB |
| `arm.penalidade` | `catalog_items.penalidade` JSONB |

### `profissoes.js`

| Estrutura JS | Tabela SQL |
|-------------|------------|
| `profissoes.*` | `catalog_profissoes` |
| `profissoes.*.habilidades` | `catalog_profissao_habilidades` |
| `profissoes.*.sistemasEspeciais` | `catalog_profissoes.sistemas_especiais` JSONB |

### `antecedentes.js`

| Estrutura JS | Tabela SQL |
|-------------|------------|
| `antecedentes.*` | `catalog_antecedentes` |
| `ant.bonusEstruturado` | `catalog_antecedentes.bonus_habilidades` JSONB |
| `ant.escolhasHabilidades` | `catalog_antecedentes.escolhas_habilidades` JSONB |
| `ant.proficienciasGanhas` | `catalog_antecedentes.proficiencias_ganhas` JSONB |
| `ant.itensIniciais` | `catalog_antecedentes.itens_iniciais` TEXT[] |

### `classesAvancadas.js`

| Estrutura JS | Tabela SQL |
|-------------|------------|
| `classeEspecializacaoMap.*` | `catalog_classes` (tipo=`especializacao`) |
| `classeEspecializacaoMap.*.pura` (req 10) | `catalog_classe_especializacoes` (min_regalias_propria=10) |
| `classeEspecializacaoMap.*.mista` (ex: monge) | `catalog_classe_especializacoes` (min_regalias_propria=7, outras_classes_req=[{novico,3}]) |

---

## 7. Ordem de Seed

Execute os seeds nesta ordem para respeitar as FKs:

```
1. catalog_skills           (35 rows — habilidades.js)
2. catalog_proficiencias    (15 rows — proficiencias.js)
3. catalog_condicoes        (20+ rows — condicoes.js)
4. catalog_especies         (14 rows — especies.js)
5. catalog_subespecies      (40+ rows — especies.js)
6. catalog_antecedentes     (30+ rows — antecedentes.js)
7. catalog_items            (60+ rows — equipamentos.js)
8. catalog_classes          (26 rows: 7 aprendiz + 4 primaria + 17 espec — classesAvancadas.js)
9. catalog_abilities        (200+ rows — todas as fontes)
10. catalog_regalias        (150+ rows — regalias.js, especies.js)
11. catalog_regalia_abilities (N-N links)
12. catalog_arvores_regalia  (25+ árvores — regalias.js classesPrimarias)
13. catalog_arvore_niveis    (75+ rows — 3 por árvore)
14. catalog_profissoes       (10+ rows — profissoes.js)
15. catalog_profissao_habilidades (30+ rows — profissoes.js)
16. catalog_classe_especializacoes (17 rows — classesAvancadas.js)
```

### Script de seed recomendado

```
backend/scripts/seed_catalogs.py   ← já existe, estender com novos catálogos
```

Cada seção do seed deve verificar conflitos com `ON CONFLICT (slug) DO UPDATE`.

---

## 8. Consultas de Exemplo

### Ficha completa de um personagem
```sql
SELECT * FROM vw_character_sheet WHERE id = :char_id;
```

### Todas as abilities de um personagem (via regalias)
```sql
SELECT DISTINCT a.*
FROM character_regalias cr
JOIN catalog_regalia_abilities cra ON cra.regalia_id = cr.regalia_id
JOIN catalog_abilities a ON a.id = cra.ability_id
WHERE cr.character_id = :char_id;
```

### Regalias disponíveis para uma classe primária
```sql
SELECT r.*
FROM catalog_regalias r
WHERE r.classe_id = (SELECT id FROM catalog_classes WHERE slug = 'combatente_primario')
  AND r.regalia_tipo IN ('classe_primaria', 'avulsa')
ORDER BY r.custo, r.display_name;
```

### Árvore de regalias de uma classe
```sql
SELECT
    arv.display_name AS arvore,
    an.nivel,
    r.slug,
    r.display_name,
    r.custo,
    r.descricao
FROM catalog_arvores_regalia arv
JOIN catalog_arvore_niveis an ON an.arvore_id = arv.id
JOIN catalog_regalias r ON r.id = an.regalia_id
WHERE arv.classe_id = (SELECT id FROM catalog_classes WHERE slug = :classe_slug)
ORDER BY arv.display_name, an.nivel;
```

### Condições ativas de um personagem com efeito de cansaço
```sql
SELECT
    ce.nivel,
    cc.display_name,
    cc.penalidades,
    cc.flags,
    cc.dano_recorrente,
    get_penalidades_cansaco(c.nivel_cansaco) AS cansaco_penalidades
FROM character_effects ce
JOIN catalog_condicoes cc ON cc.id = ce.condicao_id
JOIN characters c ON c.id = ce.character_id
WHERE ce.character_id = :char_id
  AND (ce.expira_em IS NULL OR ce.expira_em > NOW());
```

### Itens equipados com stats totais
```sql
SELECT * FROM vw_equipped_items WHERE character_id = :char_id;
```

### Verificar prerequisitos de regalia
```sql
SELECT
    r.slug,
    r.pre_requisitos,
    -- quantas regalias o personagem tem na classe primária
    (
        SELECT COUNT(*)
        FROM character_regalias cr2
        JOIN catalog_regalias r2 ON r2.id = cr2.regalia_id
        WHERE cr2.character_id = :char_id
          AND r2.classe_id = c.id
    ) AS regalias_na_classe
FROM catalog_regalias r
LEFT JOIN catalog_classes c ON c.id = r.classe_id
WHERE r.slug = :regalia_slug;
```

---

## Notas de Implementação

### Por que JSONB para `efeito` e `escalamento`?

Cada habilidade tem uma shape única. Por exemplo:

- `Recuperar Fôlego`: `{curaEstamina: "2d4"}` + efeito_opcional `{custoEstaminaExtra:1, curaHP: "2d4"}`
- `Mísseis Mágicos`: `{misseisPorCast:1, dano:"1d6+3", tipoDano:"arcano"}` + escalamento `{custoMagiaPorMissilExtra:2, misseisMax:5}`
- `Implacável` (Combatente): `{tipo:"reacao_ataque", custoPE:2, ataqueBonus:true}`

Normalizar esses campos criaria ~40 colunas nulas em 95% das linhas — o que é
pior que JSONB com um índice GIN nos campos mais consultados.

### Índices GIN para JSONB críticos
```sql
CREATE INDEX ON catalog_abilities USING GIN (efeito);
CREATE INDEX ON catalog_abilities USING GIN (escalamento);
CREATE INDEX ON catalog_regalias  USING GIN (pre_requisitos);
CREATE INDEX ON characters        USING GIN (derivados);
```

### Validação no Backend (rule_engine.py)
O backend valida `pre_requisitos` JSONB — o banco não usa CHECK CONSTRAINT aqui
porque a lógica é polimórfica e depende do estado do personagem.
