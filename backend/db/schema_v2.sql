-- =============================================================================
-- SCHEMA V2 — Lâmina do Oculto RPG
-- Substitui os arquivos JS (15.500 linhas) por tabelas relacionais + JSONB.
-- Versão de regras: 0.5
-- =============================================================================
-- DESIGN PHILOSOPHY
--   • Catálogo imutável (catalog_*): dados do livro de regras.
--   • Estado de personagem (character_*): dados de cada ficha.
--   • "Habilidade" unificada em catalog_abilities + ability_effects:
--       passiva (só bônus), ativa (custo + efeito), escalável (scaling_rules).
--   • Regalias mapeadas em catalog_regalias com relação N-N a abilities.
--   • Todos os JSONB são estruturados e comentados (ver seção JSONB SCHEMAS).
-- =============================================================================

-- ─────────────────────────────────────────────────────────────────────────────
-- 0. EXTENSÕES E CONFIGURAÇÕES
-- ─────────────────────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "pgcrypto";   -- gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "unaccent";   -- buscas sem acento
CREATE EXTENSION IF NOT EXISTS "pg_trgm";   -- índices GIN para busca por similaridade de texto

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. USUÁRIOS
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
    id                  SERIAL PRIMARY KEY,
    name                TEXT        NOT NULL UNIQUE,
    email               TEXT        NOT NULL UNIQUE,
    password            TEXT        NOT NULL,
    email_confirmed     BOOLEAN     NOT NULL DEFAULT FALSE,
    confirmation_token  TEXT,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. CATÁLOGO DE HABILIDADES (35 habilidades do sistema)
-- ─────────────────────────────────────────────────────────────────────────────
-- Ref: frontend/src/data/constants/habilidades.js
CREATE TABLE IF NOT EXISTS catalog_skills (
    id              SERIAL PRIMARY KEY,
    slug            TEXT        NOT NULL UNIQUE,   -- 'fortitude', 'combate_corpo_a_corpo'
    display_name    TEXT        NOT NULL,           -- 'Fortitude', 'Combate Corpo a Corpo'
    categoria       TEXT        NOT NULL,           -- 'fisico'|'exploracao'|'conhecimento'|'arcana'|'social'
    descricao       TEXT,
    descricao_completa TEXT,
    formula_calculo TEXT,                           -- ex: 'PV = Base Espécie + (Fortitude × 2)'
    usos_comuns     TEXT[],
    -- Marcos de habilidade: [{nivel, descricao, bonus:{...}}]
    marcos          JSONB       NOT NULL DEFAULT '[]'::jsonb,
    rule_version    TEXT        NOT NULL DEFAULT '0.5'
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. CATÁLOGO DE PROFICIÊNCIAS
-- ─────────────────────────────────────────────────────────────────────────────
-- Ref: frontend/src/data/constants/proficiencias.js
CREATE TABLE IF NOT EXISTS catalog_proficiencias (
    id              SERIAL PRIMARY KEY,
    slug            TEXT        NOT NULL UNIQUE,   -- 'armas_marciais', 'kit_arrombamento'
    display_name    TEXT        NOT NULL,
    categoria       TEXT,                          -- 'combate'|'ferramenta'|'idioma'|'veiculo'|'outro'
    descricao       TEXT,
    rule_version    TEXT        NOT NULL DEFAULT '0.5'
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 4. CATÁLOGO DE ESPÉCIES
-- ─────────────────────────────────────────────────────────────────────────────
-- Ref: frontend/src/data/constants/especies.js
CREATE TABLE IF NOT EXISTS catalog_especies (
    id                  SERIAL PRIMARY KEY,
    slug                TEXT        NOT NULL UNIQUE,   -- 'humano', 'elfo', 'anao'
    display_name        TEXT        NOT NULL,
    pv_base             INTEGER     NOT NULL DEFAULT 10,
    velocidade_base     NUMERIC(4,1) NOT NULL DEFAULT 6.0,
    tamanho             TEXT        NOT NULL DEFAULT 'medio',
    -- ['cortante','fogo','necrotico',...]
    resistencias        TEXT[]      NOT NULL DEFAULT '{}',
    vulnerabilidades    TEXT[]      NOT NULL DEFAULT '{}',
    imunidades          TEXT[]      NOT NULL DEFAULT '{}',
    descricao           TEXT,
    rule_version        TEXT        NOT NULL DEFAULT '0.5'
);

-- Sub-raças obrigatórias de cada espécie
CREATE TABLE IF NOT EXISTS catalog_subespecies (
    id                  SERIAL PRIMARY KEY,
    especie_id          INTEGER     NOT NULL REFERENCES catalog_especies(id) ON DELETE CASCADE,
    slug                TEXT        NOT NULL,
    display_name        TEXT        NOT NULL,
    descricao           TEXT,
    visao_no_escuro_m   INTEGER,                   -- metros de visão no escuro (NULL = sem)
    velocidade_override NUMERIC(4,1),              -- substitui velocidade base se preenchido
    velocidade_voo_m    NUMERIC(4,1),
    defesa_base_override INTEGER,                  -- ex: Pele Escamosa muda de 7 para 10
    resistencias        TEXT[]      NOT NULL DEFAULT '{}',
    vulnerabilidades    TEXT[]      NOT NULL DEFAULT '{}',
    imunidades          TEXT[]      NOT NULL DEFAULT '{}',
    armas_naturais      JSONB       NOT NULL DEFAULT '[]'::jsonb,
    -- [{nome, dano, tipoDano, alcance, bonus}]
    flags               JSONB       NOT NULL DEFAULT '{}'::jsonb,
    -- {semCuraMilagre, penalidadeSocial, excecaoPenalidade, escalarSemTeste, ...}
    bonus_habilidades   JSONB       NOT NULL DEFAULT '{}'::jsonb,
    -- {fortitude: 1, percepcao: 2, ...}
    proficiencias_ganhas TEXT[]     NOT NULL DEFAULT '{}',
    CONSTRAINT uq_subesp_slug UNIQUE (especie_id, slug),
    rule_version        TEXT        NOT NULL DEFAULT '0.5'
);

-- Regalias opcionais de espécie (ex: Humano → Determinação Humana, Pantaneiro)
-- Cada espécie tem uma lista de regalias no catálogo geral (catalog_regalias)
-- ligadas por especie_id. Ver seção 10.

-- ─────────────────────────────────────────────────────────────────────────────
-- 5. CATÁLOGO DE ANTECEDENTES (Backgrounds)
-- ─────────────────────────────────────────────────────────────────────────────
-- Ref: frontend/src/data/constants/antecedentes.js
CREATE TABLE IF NOT EXISTS catalog_antecedentes (
    id                      SERIAL PRIMARY KEY,
    slug                    TEXT    NOT NULL UNIQUE,
    display_name            TEXT    NOT NULL,
    descricao               TEXT,
    -- [{habilidade: 'fortitude', pontos: 2}, ...]
    bonus_habilidades       JSONB   NOT NULL DEFAULT '[]'::jsonb,
    -- [{grupo: ['historia','intuicao'], pontos: 2}]
    escolhas_habilidades    JSONB   NOT NULL DEFAULT '[]'::jsonb,
    -- [{proficiencia: 'linguas_antigas', pontos: 1}]
    proficiencias_ganhas    JSONB   NOT NULL DEFAULT '[]'::jsonb,
    -- [{grupo: ['arqueologia','lideranca'], pontos: 1}]
    escolhas_proficiencias  JSONB   NOT NULL DEFAULT '[]'::jsonb,
    itens_iniciais          TEXT[]  NOT NULL DEFAULT '{}',
    moedas_extra            INTEGER NOT NULL DEFAULT 0,
    escolhas_livres         INTEGER NOT NULL DEFAULT 0,
    rule_version            TEXT    NOT NULL DEFAULT '0.5'
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 6. CATÁLOGO DE CONDIÇÕES
-- ─────────────────────────────────────────────────────────────────────────────
-- Ref: frontend/src/data/constants/condicoes.js
CREATE TABLE IF NOT EXISTS catalog_condicoes (
    id                  SERIAL PRIMARY KEY,
    slug                TEXT    NOT NULL UNIQUE,  -- 'atordoado', 'beira_morte'
    display_name        TEXT    NOT NULL,
    categoria           TEXT    NOT NULL,         -- 'incapacitante'|'fisica'|'mental'|'magica'|'ambiente'|'progressiva'
    cor_hex             TEXT,
    descricao           TEXT,
    duracao_padrao      TEXT,                     -- texto descritivo para UI
    -- {defesa, ataques, testes, velocidade, percepcao} (int ou 'metade' ou null)
    penalidades         JSONB   NOT NULL DEFAULT '{}'::jsonb,
    -- {semAcoes, semReacoes, semMovimento, semConcentracao,
    --  desvantagemAtaques, vantagemContraAlvo, vantagemAtaques,
    --  desvantagemContraAlvo, imuneADano, criticoReduzido}
    flags               JSONB   NOT NULL DEFAULT '{}'::jsonb,
    -- {valor: '1d4', tipo: 'necrotico', momento: 'inicio_turno'}
    dano_recorrente     JSONB   NOT NULL DEFAULT '{}'::jsonb,
    stack_regra         TEXT,                     -- 'substitui'|'acumula'|'maiorValor'|'maiorDuracao'
    cura                TEXT,                     -- 'fim_duracao'|'magia_cura'|'teste_acrobacia_ou_forca'|...
    -- slugs de condições aplicadas implicitamente
    condicoes_implicitas TEXT[]  NOT NULL DEFAULT '{}',
    -- Para progressivas: [{nivel, nome, descricao, penalidades, flags, condicaoAplicada, ...}]
    niveis_detalhes     JSONB   NOT NULL DEFAULT '[]'::jsonb,
    niveis_total        INTEGER DEFAULT 1,
    rule_version        TEXT    NOT NULL DEFAULT '0.5'
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 7. CATÁLOGO DE ITENS / EQUIPAMENTOS
-- ─────────────────────────────────────────────────────────────────────────────
-- Ref: frontend/src/data/constants/equipamentos.js  (armas, armaduras, escudos, itens)
CREATE TABLE IF NOT EXISTS catalog_items (
    id              SERIAL PRIMARY KEY,
    slug            TEXT        NOT NULL UNIQUE,
    display_name    TEXT        NOT NULL,
    categoria       TEXT        NOT NULL,  -- 'arma'|'armadura_leve'|'armadura_media'|'armadura_pesada'|'escudo'|'item_geral'|'pocao'|'veiculo'|'montaria'
    subcategoria    TEXT,                  -- 'marcial'|'simples'|'exotica'|'arma_de_fogo' (armas)
    descricao       TEXT,
    peso_kg         NUMERIC(6,2) DEFAULT 0,
    preco_mo        INTEGER     DEFAULT 0, -- Moedas de Ouro
    rule_version    TEXT        NOT NULL DEFAULT '0.5',

    -- ── ARMAS ──────────────────────────────────────────────────────────────
    dano            TEXT,                  -- '1d8', '2d6'
    dano_secundario TEXT,                  -- '1d10' (versátil segunda mão)
    tipo_dano       TEXT,                  -- 'cortante'|'perfurante'|'impacto'|'fogo'|...
    critico_margem  INTEGER     DEFAULT 20,
    alcance_texto   TEXT,                  -- '9/36 m', 'corpo-a-corpo'
    maos            TEXT,                  -- '1'|'2'|'1ou2'
    prof_requerida  TEXT,                  -- slug de catalog_proficiencias
    propriedades    TEXT[]      NOT NULL DEFAULT '{}',
    -- [{gatilho, efeito, mecanica}]
    efeitos_especiais JSONB     NOT NULL DEFAULT '[]'::jsonb,

    -- ── ARMADURAS / ESCUDOS ─────────────────────────────────────────────────
    defesa          INTEGER,               -- para armaduras pesadas (valor absoluto)
    bonus_defesa    INTEGER,               -- para leves/médias/escudos (bônus)
    forca_minima    INTEGER,               -- para pesadas
    -- {velocidade: -1.5, furtividade: -3}
    penalidade      JSONB       NOT NULL DEFAULT '{}'::jsonb,

    -- ── ITENS GERAIS / KITS ─────────────────────────────────────────────────
    usos_max        INTEGER,
    -- [{tipo, valor, descricao}]
    efeitos_uso     JSONB       NOT NULL DEFAULT '[]'::jsonb
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 8. CATÁLOGO DE HABILIDADES ATIVAS/PASSIVAS (motor central de regalias)
-- ─────────────────────────────────────────────────────────────────────────────
-- Uma "ability" é qualquer coisa utilizável ou passiva que uma regalia/espécie
-- /profissão/classe concede. É o coração do sistema.
CREATE TABLE IF NOT EXISTS catalog_abilities (
    id              SERIAL PRIMARY KEY,
    slug            TEXT        NOT NULL UNIQUE,
    display_name    TEXT        NOT NULL,
    descricao       TEXT,
    rule_version    TEXT        NOT NULL DEFAULT '0.5',

    -- Classificação
    tipo            TEXT        NOT NULL DEFAULT 'ativa',
    -- 'ativa'|'passiva'|'reacao'|'magia'|'milagre'|'feitico'|'ritual'
    subtipo         TEXT,
    -- 'dano'|'cura'|'controle'|'buff'|'debuff'|'utilitario'|'invocacao'

    -- ── CUSTO DE USO ───────────────────────────────────────────────────────
    custo_acoes     INTEGER,               -- 0=livre, 1, 2, 3=turno completo
    custo_magia     INTEGER     DEFAULT 0,
    custo_estamina  INTEGER     DEFAULT 0,
    custo_pv        INTEGER     DEFAULT 0, -- ex: Martírio (converte PV em PM)
    tempo_execucao  TEXT,                  -- '10 minutos', '1 hora' (fora de combate)
    requer_foco     BOOLEAN     DEFAULT FALSE,
    requer_mao_livre BOOLEAN    DEFAULT FALSE,

    -- ── ALCANCE / ÁREA ─────────────────────────────────────────────────────
    alcance_m       NUMERIC(6,1),          -- metros (NULL = corpo-a-corpo)
    -- {tipo:'cone'|'esfera'|'linha'|'cubo', distancia, raio, angulo, largura}
    area            JSONB       NOT NULL DEFAULT '{}'::jsonb,

    -- ── DURAÇÃO ────────────────────────────────────────────────────────────
    duracao_texto   TEXT,                  -- '1 hora', '5 rodadas', 'fim do turno'
    duracao_tipo    TEXT,                  -- 'rodadas'|'turnos'|'minutos'|'horas'|'permanente'|'ate_descanso_curto'|'ate_descanso_longo'
    duracao_valor   INTEGER,

    -- ── COOLDOWN ───────────────────────────────────────────────────────────
    cooldown_tipo   TEXT,                  -- 'dia'|'descanso_curto'|'descanso_longo'|'combate'|'semana'|'por_pessoa'
    cooldown_valor  INTEGER     DEFAULT 1, -- vezes antes de recarregar

    -- ── EFEITOS PRINCIPAIS ─────────────────────────────────────────────────
    -- Flexível — qualquer combinação dos campos abaixo pode estar presente:
    -- {
    --   curaHP: '4' | '1d6+2' | 'fortitude',    -- cura PV
    --   curaEstamina: '4' | '2d4',                -- cura PE
    --   recuperarMagia: '8' | '1d6+1',           -- recupera PM
    --   dano: '2d8', tipoDano: 'arcano',          -- dano
    --   condicao: 'atordoado',                    -- aplica condição
    --   duracao: 'ate_proximo_turno',
    --   chanceSucesso: 40,                        -- % de sucesso (30, 50, etc.)
    --   bonusDefesa: 2,
    --   bonusDano: 'fortitude' | 1,
    --   vantagemAtaques: true,
    --   desvantagemAtaquesContra: true,
    --   pvTemporario: 2,
    --   velocidadeExtra: 1.5,
    --   alcanceExtra: 1.5,
    --   protegerAliado: true, reducaoDano: 'metade',
    --   misseisPorCast: 1, misseisMax: 5,
    --   luzCompleta: 3, meiaLuz: 3,
    --   resistencias: ['magico','nao_magico'],
    --   removerCondicao: ['envenenado','congelando'],
    --   converterHPParaMagia: true, razao:'1:1', maximo: 5,
    --   reRolagemD20: true,
    --   forcarFuga: true, chanceSucesso: 80,
    --   encantarArma: {duracao, propriedade, custoMagiaPorFrasco},
    --   tabelaElemento: {1:'fogo', 2:'gelo', ...},
    --   tabelaDesconto: [{rolagem, desconto, resultado}]
    -- }
    efeito          JSONB       NOT NULL DEFAULT '{}'::jsonb,

    -- ── EFEITO OPCIONAL (custo extra para upgrade) ─────────────────────────
    -- {custoMagiaExtra, custoEstaminaExtra, curaEstamina, curaHP, alcance, ...}
    efeito_opcional JSONB       NOT NULL DEFAULT '{}'::jsonb,

    -- ── ESCALAMENTO ────────────────────────────────────────────────────────
    -- Qualquer combinação:
    -- {
    --   bonusChancePorMagiaExtra: 5,      -- +5% por PM gasto a mais
    --   bonusChancePorEstaminaExtra: 5,   -- +5% por PE gasto a mais
    --   bonusChancePor2Magia: 5,          -- +5% a cada 2 PM extras
    --   bonusChancePor3Magia: 5,          -- +5% a cada 3 PM extras
    --   custoMagiaPorMissilExtra: 2,      -- +2 PM por míssil extra
    --   custoMagiaPorEsferaExtra: 2,
    --   custoEstaminaRepetirMesmoTurno: 1,-- +1 PE para repetir na mesma rodada
    --   custoEstaminaPorD6Extra: 2,       -- +2 PE por 1d6 extra
    --   custoMagiaPorMinutoExtra: 4,
    --   custoMagiaPorTurnoExtra: 6,
    --   bonusCuraPor2Magia: '1d6',        -- +1d6 cura por 2 PM
    --   bonusDanoPor2Magia: '1d8',
    --   bonusDanoPor3Magia: '1d8',
    --   rodadasExtraPor2Magia: 1,
    --   alvosExtraPor3Magia: 1,
    --   por2Magia: {pvTemporario:2, bonusDefesa:1}
    -- }
    escalamento     JSONB       NOT NULL DEFAULT '{}'::jsonb,

    -- ── RESTRIÇÕES / LIMITES ───────────────────────────────────────────────
    limite_acumulo  INTEGER,               -- máximo de usos simultâneos (ex: esferas)
    restricao_texto TEXT,                  -- 'Não funciona com broquel'
    condicao_ativacao TEXT,                -- 'apenas 1 inimigo no alcance corpo a corpo'
    requer_arma_tipo TEXT,                 -- 'haste', 'distancia', 'desarmado'
    -- Passivos: {vantagemAtaqueFlanqueando, combateDesarmadoTreinado, danoDesarmado, ...}
    passivos        JSONB       NOT NULL DEFAULT '{}'::jsonb
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 9. CATÁLOGO DE PROFISSÕES
-- ─────────────────────────────────────────────────────────────────────────────
-- Ref: frontend/src/data/constants/profissoes.js
CREATE TABLE IF NOT EXISTS catalog_profissoes (
    id                  SERIAL PRIMARY KEY,
    slug                TEXT    NOT NULL UNIQUE,  -- 'ferreiro', 'criminoso'
    display_name        TEXT    NOT NULL,
    descricao           TEXT,
    ambiente_emprego    TEXT,
    renda_por_dia_mo    INTEGER DEFAULT 0,
    chance_risco        TEXT,                     -- '10% de ser pego'
    beneficios_fixos    TEXT[]  NOT NULL DEFAULT '{}',
    -- Sistemas especiais como tabelas de rolagem
    sistemas_especiais  JSONB   NOT NULL DEFAULT '{}'::jsonb,
    rule_version        TEXT    NOT NULL DEFAULT '0.5'
);

-- Habilidades/regalias da profissão (sequência de nível 1, 2, 3...)
CREATE TABLE IF NOT EXISTS catalog_profissao_habilidades (
    id              SERIAL PRIMARY KEY,
    profissao_id    INTEGER NOT NULL REFERENCES catalog_profissoes(id) ON DELETE CASCADE,
    ordem           INTEGER NOT NULL DEFAULT 1,  -- nível/ordem de compra
    custo_regalia   INTEGER NOT NULL DEFAULT 1,
    display_name    TEXT    NOT NULL,
    descricao       TEXT,
    -- [{texto}] lista de efeitos em texto
    efeitos_texto   TEXT[]  NOT NULL DEFAULT '{}',
    -- Ligação ao catalog_abilities (quando houver ability estruturada)
    ability_id      INTEGER REFERENCES catalog_abilities(id) ON DELETE SET NULL,
    rule_version    TEXT    NOT NULL DEFAULT '0.5'
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 10. CATÁLOGO DE REGALIAS (coração do sistema)
-- ─────────────────────────────────────────────────────────────────────────────
-- Uma regalia é uma "carta" comprável pelo personagem. Ela pode:
--   - conceder bonus_habilidades fixas
--   - conceder escolhas de habilidades
--   - conceder proficiências
--   - habilitar 1..N abilities (catalog_abilities)
--   - ser passiva (só dados) ou ativa (tem ability)
--   - ter pré-requisitos (nivel, atributo, outra regalia)
--   - pertencer a: aprendiz | especie | profissao | classe_primaria | avulsa | especializacao
--
-- Ref: frontend/src/data/constants/regalias.js (todo o arquivo)

CREATE TABLE IF NOT EXISTS catalog_regalias (
    id                  SERIAL PRIMARY KEY,
    slug                TEXT        NOT NULL UNIQUE,
    display_name        TEXT        NOT NULL,
    descricao           TEXT,
    regalia_tipo        TEXT        NOT NULL,
    -- 'aprendiz'|'especie'|'especie_opcional'|'profissao'|'classe_primaria'|'avulsa'|'especializacao'
    rule_version        TEXT        NOT NULL DEFAULT '0.5',

    -- ── CUSTO ──────────────────────────────────────────────────────────────
    custo               INTEGER     NOT NULL DEFAULT 1,

    -- ── VÍNCULO COM CLASSE/ESPÉCIE/PROFISSÃO ───────────────────────────────
    especie_id          INTEGER     REFERENCES catalog_especies(id)  ON DELETE SET NULL,
    classe_id           INTEGER,   -- FK adicionada via ALTER TABLE após catalog_classes
    -- Para avulsas e árvores: classe primária dona
    profissao_id        INTEGER     REFERENCES catalog_profissoes(id) ON DELETE SET NULL,

    -- ── BÔNUS CONCEDIDOS ───────────────────────────────────────────────────
    -- {fortitude: 1, combate_corpo_a_corpo: 2, ...}
    bonus_habilidades   JSONB       NOT NULL DEFAULT '{}'::jsonb,
    -- [{grupo: ['destreza','forca'], pontos: 1}]
    escolhas_habilidades JSONB      NOT NULL DEFAULT '[]'::jsonb,
    proficiencias_ganhas TEXT[]     NOT NULL DEFAULT '{}',
    -- {pv: 2, estamina: 4, magia: 4}
    bonus_recursos      JSONB       NOT NULL DEFAULT '{}'::jsonb,

    -- ── POR REGALIA COMPRADA (para aprendiz/classes) ───────────────────────
    -- {pv: 2, estamina: 4, magia: 4}  — bonus cumulativo por ponto gasto
    bonus_por_regalia   JSONB       NOT NULL DEFAULT '{}'::jsonb,

    -- ── PRÉ-REQUISITOS ─────────────────────────────────────────────────────
    -- {
    --   nivelMinimo: 3,
    --   regaliaAprendiz: 'combatente',
    --   regaliasNecessarias: ['combatente.combate_defensivo_1'],
    --   habilidadeMinima: {slug:'combate_corpo_a_corpo', valor:5},
    --   proficienciaNecessaria: 'armaduras_pesadas',
    --   regaliaIncompativel: ['feiticeiro_aprendiz'],
    --   classeMinima: {classe:'combatente_primario', regalias:10}
    -- }
    pre_requisitos      JSONB       NOT NULL DEFAULT '{}'::jsonb,

    -- ── FLAGS ESPECIAIS ────────────────────────────────────────────────────
    -- {semCuraMilagre, penalidadeSocial, excecaoPenalidade, observacao}
    flags               JSONB       NOT NULL DEFAULT '{}'::jsonb,

    -- ── OPÇÕES MUTUAMENTE EXCLUSIVAS ───────────────────────────────────────
    -- Para regalias tipo "escolha 1 de N" (ex: Psíquico, Vampiro/Wight...)
    -- [{nome, descricao, ability_slug, efeitos:{...}}]
    opcoes_exclusivas   JSONB       NOT NULL DEFAULT '[]'::jsonb,

    -- ── PASSIVOS DIRETOS (sem ability) ─────────────────────────────────────
    -- {vantagemAtaqueFlanqueando, bonusDefesaOverride, escalarSemTeste, ...}
    passivos            JSONB       NOT NULL DEFAULT '{}'::jsonb
);

-- Tabela de relação N-N: regalia → abilities que ela concede
CREATE TABLE IF NOT EXISTS catalog_regalia_abilities (
    id              SERIAL PRIMARY KEY,
    regalia_id      INTEGER NOT NULL REFERENCES catalog_regalias(id) ON DELETE CASCADE,
    ability_id      INTEGER NOT NULL REFERENCES catalog_abilities(id) ON DELETE CASCADE,
    condicional     TEXT,    -- ex: 'nivel_arvore_3' — quando esta ability é liberada
    CONSTRAINT uq_regalia_ability UNIQUE (regalia_id, ability_id)
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 11. CATÁLOGO DE CLASSES
-- ─────────────────────────────────────────────────────────────────────────────
-- Ref: classesAvancadas.js + regalias.js (classesPrimarias + regaliasDeAprendiz)
CREATE TABLE IF NOT EXISTS catalog_classes (
    id                          SERIAL PRIMARY KEY,
    slug                        TEXT    NOT NULL UNIQUE,  -- 'combatente_primario', 'novico_aprendiz'
    display_name                TEXT    NOT NULL,
    tipo                        TEXT    NOT NULL,         -- 'aprendiz'|'primaria'|'especializacao'
    aprendiz_slug               TEXT,                     -- aprendiz necessário para primária
    descricao                   TEXT,
    descricao_curta             TEXT,
    icone                       TEXT,
    cor_tema                    TEXT,
    -- {pv: 4, estamina: 2, magia: 0} por regalia comprada
    bonus_por_regalia           JSONB   NOT NULL DEFAULT '{}'::jsonb,
    -- Habilidade automática ao entrar na classe (ex: 'Implacável', 'Magus')
    habilidade_classe_nome      TEXT,
    habilidade_classe_descricao TEXT,
    habilidade_classe_efeito    JSONB   NOT NULL DEFAULT '{}'::jsonb,
    rule_version                TEXT    NOT NULL DEFAULT '0.5'
);

-- Para classes primárias: quais especializações elas desbloqueiam
CREATE TABLE IF NOT EXISTS catalog_classe_especializacoes (
    id                  SERIAL PRIMARY KEY,
    classe_id           INTEGER NOT NULL REFERENCES catalog_classes(id) ON DELETE CASCADE,
    especializacao_id   INTEGER NOT NULL REFERENCES catalog_classes(id) ON DELETE CASCADE,
    -- Requisito de regalias nesta classe para desbloquear a especialização
    min_regalias_propria INTEGER NOT NULL DEFAULT 10,
    -- Requisitos em outras classes (para especializações mistas)
    -- [{classe_slug: 'novico_primario', min_regalias: 3}]
    outras_classes_req  JSONB   NOT NULL DEFAULT '[]'::jsonb,
    CONSTRAINT uq_classe_espec UNIQUE (classe_id, especializacao_id)
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 12. CATÁLOGO DE ÁRVORES DE REGALIA
-- ─────────────────────────────────────────────────────────────────────────────
-- Cada classe primária tem N árvores de regalia com 3 níveis sequenciais.
-- Ex: Combatente → Combate Direto (nível 1, 2, 3)
CREATE TABLE IF NOT EXISTS catalog_arvores_regalia (
    id          SERIAL PRIMARY KEY,
    slug        TEXT    NOT NULL UNIQUE,  -- 'combatente.combate_direto'
    display_name TEXT   NOT NULL,         -- 'Combate Direto'
    classe_id   INTEGER NOT NULL REFERENCES catalog_classes(id) ON DELETE CASCADE,
    rule_version TEXT   NOT NULL DEFAULT '0.5'
);

-- Cada nível da árvore é uma regalia do catalog_regalias
-- Relacionamento: nivel da árvore → regalia
CREATE TABLE IF NOT EXISTS catalog_arvore_niveis (
    id              SERIAL PRIMARY KEY,
    arvore_id       INTEGER NOT NULL REFERENCES catalog_arvores_regalia(id) ON DELETE CASCADE,
    nivel           INTEGER NOT NULL DEFAULT 1,  -- 1, 2 ou 3
    regalia_id      INTEGER NOT NULL REFERENCES catalog_regalias(id) ON DELETE CASCADE,
    -- Pré-requisito automático: nível anterior deve estar comprado
    -- (enforçado por rule_engine, não por FK aqui)
    CONSTRAINT uq_arvore_nivel UNIQUE (arvore_id, nivel)
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 13. PERSONAGENS (fichas)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS characters (
    id                  SERIAL      PRIMARY KEY,
    user_id             INTEGER     NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rule_version        TEXT        NOT NULL DEFAULT '0.5',
    name                TEXT        NOT NULL,
    gender              TEXT,
    age                 INTEGER,
    description         TEXT,
    image               TEXT,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- ── IDENTIDADE DE CONSTRUÇÃO ───────────────────────────────────────────
    especie_id          INTEGER     REFERENCES catalog_especies(id)      ON DELETE SET NULL,
    subespecie_id       INTEGER     REFERENCES catalog_subespecies(id)   ON DELETE SET NULL,
    antecedente_id      INTEGER     REFERENCES catalog_antecedentes(id)  ON DELETE SET NULL,
    classe_aprendiz_id  INTEGER     REFERENCES catalog_classes(id)       ON DELETE SET NULL,
    classe_primaria_id  INTEGER     REFERENCES catalog_classes(id)       ON DELETE SET NULL,
    especializacao_id   INTEGER     REFERENCES catalog_classes(id)       ON DELETE SET NULL,

    -- ── PROGRESSÃO ─────────────────────────────────────────────────────────
    level               INTEGER     NOT NULL DEFAULT 1,
    experience          INTEGER     NOT NULL DEFAULT 0,
    regalia_points_total INTEGER    NOT NULL DEFAULT 4,
    regalia_points_spent INTEGER    NOT NULL DEFAULT 0,

    -- ── RECURSOS ATUAIS ────────────────────────────────────────────────────
    pv_atual            INTEGER,    -- NULL = cheio (calculado no login)
    pm_atual            INTEGER,
    pe_atual            INTEGER,

    -- ── BÔNUS DE REGALIA PARA RECURSOS (calculado ao comprar regalias) ─────
    pv_bonus_regalias   INTEGER     NOT NULL DEFAULT 0,
    pm_bonus_regalias   INTEGER     NOT NULL DEFAULT 0,
    pe_bonus_regalias   INTEGER     NOT NULL DEFAULT 0,

    -- ── ESTADO DINÂMICO ────────────────────────────────────────────────────
    nivel_cansaco       INTEGER     NOT NULL DEFAULT 0,  -- 0 a 6
    rodada_atual        INTEGER     NOT NULL DEFAULT 0,
    turno_atual         INTEGER     NOT NULL DEFAULT 0,
    ultimo_descanso_curto  TIMESTAMPTZ,
    ultimo_descanso_longo  TIMESTAMPTZ,

    -- ── MOEDAS ─────────────────────────────────────────────────────────────
    moedas_ouro         INTEGER     NOT NULL DEFAULT 0,
    moedas_prata        INTEGER     NOT NULL DEFAULT 0,
    moedas_cobre        INTEGER     NOT NULL DEFAULT 0,

    -- ── DADOS DERIVADOS CACHEADOS (recalculados pelo backend) ──────────────
    -- {pvMax, pmMax, peMax, defesaTotal, velocidadeTotal, iniciativa, cargaMax, ...}
    derivados           JSONB       NOT NULL DEFAULT '{}'::jsonb
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 14. HABILIDADES DO PERSONAGEM (35 skills distribuídas)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS character_skills (
    id              SERIAL  PRIMARY KEY,
    character_id    INTEGER NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
    skill_id        INTEGER NOT NULL REFERENCES catalog_skills(id) ON DELETE CASCADE,
    valor           INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT uq_char_skill UNIQUE (character_id, skill_id)
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 15. PROFICIÊNCIAS DO PERSONAGEM
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS character_proficiencias (
    id                  SERIAL  PRIMARY KEY,
    character_id        INTEGER NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
    proficiencia_id     INTEGER NOT NULL REFERENCES catalog_proficiencias(id) ON DELETE CASCADE,
    nivel               INTEGER NOT NULL DEFAULT 0,   -- pontos investidos
    origem              TEXT,                         -- 'especie'|'antecedente'|'classe'|'regalia'|'manual'
    CONSTRAINT uq_char_prof UNIQUE (character_id, proficiencia_id)
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 16. REGALIAS DO PERSONAGEM
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS character_regalias (
    id              SERIAL      PRIMARY KEY,
    character_id    INTEGER     NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
    regalia_id      INTEGER     NOT NULL REFERENCES catalog_regalias(id) ON DELETE CASCADE,
    -- Para regalias com opcoes_exclusivas: qual opção foi escolhida
    opcao_escolhida TEXT,
    -- Para regalias de árvore: nível (1, 2, 3)
    nivel_arvore    INTEGER,
    -- Para regalias de aprendiz: quantas vezes foi comprada
    quantidade      INTEGER     NOT NULL DEFAULT 1,
    comprado_em     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_char_regalia UNIQUE (character_id, regalia_id, opcao_escolhida)
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 17. ABILITIES ATIVAS DO PERSONAGEM (habilidades adquiridas via regalias)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS character_abilities (
    id              SERIAL      PRIMARY KEY,
    character_id    INTEGER     NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
    ability_id      INTEGER     NOT NULL REFERENCES catalog_abilities(id) ON DELETE CASCADE,
    -- Controle de uso (cooldown)
    usos_restantes  INTEGER,                          -- NULL = sem limite
    ultimo_uso_rodada INTEGER,                        -- para cooldown por rodada
    ultimo_uso_at   TIMESTAMPTZ,                      -- para cooldown por hora/dia
    CONSTRAINT uq_char_ability UNIQUE (character_id, ability_id)
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 18. CONDIÇÕES ATIVAS DO PERSONAGEM
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS character_effects (
    id                  SERIAL      PRIMARY KEY,
    character_id        INTEGER     NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
    condicao_id         INTEGER     REFERENCES catalog_condicoes(id) ON DELETE SET NULL,
    -- Para efeitos sem catálogo (buffs/debuffs de habilidades)
    effect_slug         TEXT,
    display_name        TEXT,
    nivel               INTEGER     NOT NULL DEFAULT 1,
    fonte_tipo          TEXT,       -- 'habilidade'|'ataque'|'item'|'condicao'|'manual'
    fonte_slug          TEXT,       -- slug da fonte (ability_slug, item_slug, etc.)
    aplicada_em         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expira_em           TIMESTAMPTZ,
    duracao_tipo        TEXT,       -- 'rodadas'|'turnos'|'horas'|'ate_descanso_curto'|'ate_descanso_longo'|'permanente'
    duracao_valor       INTEGER,
    rodada_aplicacao    INTEGER,    -- rodada em que foi aplicada (para contagem)
    -- Snapshot do efeito no momento da aplicação (para resolver sem FK)
    snapshot            JSONB       NOT NULL DEFAULT '{}'::jsonb
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 19. INVENTÁRIO DO PERSONAGEM
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS character_inventory (
    id              SERIAL      PRIMARY KEY,
    character_id    INTEGER     NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
    item_id         INTEGER     REFERENCES catalog_items(id) ON DELETE SET NULL,
    -- Para itens customizados/improvisados não no catálogo
    item_nome_custom TEXT,
    quantidade      INTEGER     NOT NULL DEFAULT 1,
    equipado        BOOLEAN     NOT NULL DEFAULT FALSE,
    slot            TEXT,       -- 'armadura'|'escudo'|'arma_principal'|'arma_secundaria'|'acessorio'
    -- Modificadores/refinamentos do item específico
    bonus_dano      INTEGER     DEFAULT 0,
    bonus_acerto    INTEGER     DEFAULT 0,
    bonus_defesa    INTEGER     DEFAULT 0,
    durabilidade    INTEGER,
    -- Dados extras (poções com cargas, armas carregadas, etc.)
    extra            JSONB      NOT NULL DEFAULT '{}'::jsonb
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 20. PROFISSÕES DO PERSONAGEM
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS character_profissoes (
    id                  SERIAL  PRIMARY KEY,
    character_id        INTEGER NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
    profissao_id        INTEGER NOT NULL REFERENCES catalog_profissoes(id) ON DELETE CASCADE,
    CONSTRAINT uq_char_profissao UNIQUE (character_id, profissao_id)
);

-- Habilidades de profissão compradas pelo personagem
CREATE TABLE IF NOT EXISTS character_profissao_habilidades (
    id                      SERIAL  PRIMARY KEY,
    character_id            INTEGER NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
    profissao_habilidade_id INTEGER NOT NULL REFERENCES catalog_profissao_habilidades(id) ON DELETE CASCADE,
    CONSTRAINT uq_char_prof_hab UNIQUE (character_id, profissao_habilidade_id)
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 21. LOG DE AUDITORIA
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS character_audit_log (
    id              BIGSERIAL   PRIMARY KEY,
    character_id    INTEGER     NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
    user_id         INTEGER     REFERENCES users(id) ON DELETE SET NULL,
    action          TEXT        NOT NULL,  -- 'create'|'update'|'delete'|'use_ability'|'rest'|'level_up'|'buy_regalia'
    before_state    JSONB,
    after_state     JSONB,
    metadata        JSONB       NOT NULL DEFAULT '{}'::jsonb,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 22. SEÇÕES FLEXÍVEIS (retrocompatibilidade com schema v1)
-- ─────────────────────────────────────────────────────────────────────────────
-- Mantém compatibilidade com o sistema de CharacterSection existente.
-- Novas fichas não precisam usar, mas fichas existentes continuam funcionando.
CREATE TABLE IF NOT EXISTS character_sections (
    id              SERIAL      PRIMARY KEY,
    character_id    INTEGER     NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
    section_key     TEXT        NOT NULL,
    data            JSONB       NOT NULL DEFAULT '{}'::jsonb,
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_char_section UNIQUE (character_id, section_key)
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 23. ÍNDICES DE PERFORMANCE
-- ─────────────────────────────────────────────────────────────────────────────

-- Catálogos (lidos frequentemente, escrita raramente)
CREATE INDEX IF NOT EXISTS idx_catalog_skills_slug          ON catalog_skills(slug);
CREATE INDEX IF NOT EXISTS idx_catalog_regalias_slug        ON catalog_regalias(slug);
CREATE INDEX IF NOT EXISTS idx_catalog_regalias_tipo        ON catalog_regalias(regalia_tipo);
CREATE INDEX IF NOT EXISTS idx_catalog_regalias_classe      ON catalog_regalias(classe_id);
CREATE INDEX IF NOT EXISTS idx_catalog_regalias_especie     ON catalog_regalias(especie_id);
CREATE INDEX IF NOT EXISTS idx_catalog_abilities_slug       ON catalog_abilities(slug);
CREATE INDEX IF NOT EXISTS idx_catalog_abilities_tipo       ON catalog_abilities(tipo);
CREATE INDEX IF NOT EXISTS idx_catalog_arvore_niveis_arvore ON catalog_arvore_niveis(arvore_id);
CREATE INDEX IF NOT EXISTS idx_catalog_items_categoria      ON catalog_items(categoria);
CREATE INDEX IF NOT EXISTS idx_catalog_condicoes_categoria  ON catalog_condicoes(categoria);

-- Estado de personagem (lidos a cada request de ficha)
CREATE INDEX IF NOT EXISTS idx_char_user_id                 ON characters(user_id);
CREATE INDEX IF NOT EXISTS idx_char_skills_character        ON character_skills(character_id);
CREATE INDEX IF NOT EXISTS idx_char_regalias_character      ON character_regalias(character_id);
CREATE INDEX IF NOT EXISTS idx_char_abilities_character     ON character_abilities(character_id);
CREATE INDEX IF NOT EXISTS idx_char_effects_character       ON character_effects(character_id);
CREATE INDEX IF NOT EXISTS idx_char_effects_expira          ON character_effects(expira_em)
    WHERE expira_em IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_char_inventory_character     ON character_inventory(character_id);
CREATE INDEX IF NOT EXISTS idx_char_inventory_equipado      ON character_inventory(character_id, equipado)
    WHERE equipado = TRUE;

-- Auditoria (consultas por personagem e por ação)
CREATE INDEX IF NOT EXISTS idx_audit_character              ON character_audit_log(character_id);
CREATE INDEX IF NOT EXISTS idx_audit_action                 ON character_audit_log(action);
CREATE INDEX IF NOT EXISTS idx_audit_created               ON character_audit_log(created_at DESC);

-- Busca por texto nos catálogos (compatível com unaccent)
CREATE INDEX IF NOT EXISTS idx_catalog_regalias_name_trgm   ON catalog_regalias USING gin(display_name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_catalog_abilities_name_trgm  ON catalog_abilities USING gin(display_name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_catalog_items_name_trgm      ON catalog_items     USING gin(display_name gin_trgm_ops);

-- ─────────────────────────────────────────────────────────────────────────────
-- 24. VIEWS AUXILIARES
-- ─────────────────────────────────────────────────────────────────────────────

-- Ficha completa de um personagem (join das principais tabelas)
CREATE OR REPLACE VIEW vw_character_sheet AS
SELECT
    c.id,
    c.user_id,
    c.name,
    c.gender,
    c.age,
    c.description,
    c.image,
    c.rule_version,
    c.level,
    c.experience,
    c.regalia_points_total,
    c.regalia_points_spent,
    (c.regalia_points_total - c.regalia_points_spent) AS regalia_points_available,
    c.pv_atual,
    c.pm_atual,
    c.pe_atual,
    c.pv_bonus_regalias,
    c.pm_bonus_regalias,
    c.pe_bonus_regalias,
    c.nivel_cansaco,
    c.moedas_ouro,
    c.moedas_prata,
    c.moedas_cobre,
    c.derivados,
    -- Espécie
    esp.slug        AS especie_slug,
    esp.display_name AS especie_nome,
    esp.pv_base,
    esp.velocidade_base,
    esp.tamanho,
    esp.resistencias    AS especie_resistencias,
    esp.vulnerabilidades AS especie_vulnerabilidades,
    esp.imunidades      AS especie_imunidades,
    -- Subespécie
    sub.slug        AS subespecie_slug,
    sub.display_name AS subespecie_nome,
    sub.visao_no_escuro_m,
    sub.defesa_base_override,
    sub.flags       AS subespecie_flags,
    sub.bonus_habilidades AS subespecie_bonus_habs,
    -- Antecedente
    ant.slug        AS antecedente_slug,
    ant.display_name AS antecedente_nome,
    -- Classes
    cap.slug        AS classe_aprendiz_slug,
    cap.display_name AS classe_aprendiz_nome,
    cpp.slug        AS classe_primaria_slug,
    cpp.display_name AS classe_primaria_nome,
    cesp.slug       AS especializacao_slug,
    cesp.display_name AS especializacao_nome
FROM characters c
LEFT JOIN catalog_especies    esp  ON esp.id  = c.especie_id
LEFT JOIN catalog_subespecies sub  ON sub.id  = c.subespecie_id
LEFT JOIN catalog_antecedentes ant ON ant.id  = c.antecedente_id
LEFT JOIN catalog_classes     cap  ON cap.id  = c.classe_aprendiz_id
LEFT JOIN catalog_classes     cpp  ON cpp.id  = c.classe_primaria_id
LEFT JOIN catalog_classes     cesp ON cesp.id = c.especializacao_id;

-- Condições ativas (não expiradas)
CREATE OR REPLACE VIEW vw_active_effects AS
SELECT
    ce.*,
    cc.display_name AS condicao_nome,
    cc.penalidades,
    cc.flags AS condicao_flags,
    cc.dano_recorrente
FROM character_effects ce
LEFT JOIN catalog_condicoes cc ON cc.id = ce.condicao_id
WHERE ce.expira_em IS NULL OR ce.expira_em > NOW();

-- Itens equipados
CREATE OR REPLACE VIEW vw_equipped_items AS
SELECT
    ci.*,
    it.display_name,
    it.categoria,
    it.dano,
    it.tipo_dano,
    it.defesa,
    it.bonus_defesa,
    it.forca_minima,
    it.penalidade,
    it.propriedades,
    it.efeitos_especiais,
    (ci.bonus_defesa + COALESCE(it.bonus_defesa, 0)) AS defesa_total_item
FROM character_inventory ci
JOIN catalog_items it ON it.id = ci.item_id
WHERE ci.equipado = TRUE;

-- ─────────────────────────────────────────────────────────────────────────────
-- 25. FUNÇÕES AUXILIARES
-- ─────────────────────────────────────────────────────────────────────────────

-- Calcula pontos de regalia disponíveis para um nível
CREATE OR REPLACE FUNCTION calc_pontos_regalia(nivel INTEGER)
RETURNS INTEGER LANGUAGE SQL IMMUTABLE AS $$
    SELECT CASE
        WHEN nivel <= 0 THEN 0
        WHEN nivel = 1 THEN 4
        WHEN nivel = 2 THEN 8
        ELSE 8 + (nivel - 2) * 2
    END;
$$;

-- Calcula nível de cansaço + penalidades
CREATE OR REPLACE FUNCTION get_penalidades_cansaco(nivel_cansaco INTEGER)
RETURNS JSONB LANGUAGE SQL IMMUTABLE AS $$
    SELECT CASE nivel_cansaco
        WHEN 0 THEN '{"velocidade":0,"testes":0,"semAcoes":false,"morte":false}'::jsonb
        WHEN 1 THEN '{"velocidade":-1.5,"testes":0,"semAcoes":false,"morte":false}'::jsonb
        WHEN 2 THEN '{"velocidade":-1.5,"testes":-1,"semAcoes":false,"morte":false}'::jsonb
        WHEN 3 THEN '{"velocidade":-3.0,"testes":-2,"semAcoes":false,"morte":false}'::jsonb
        WHEN 4 THEN '{"velocidade":-3.0,"testes":-3,"semAcoes":false,"morte":false}'::jsonb
        WHEN 5 THEN '{"velocidade":0,"testes":0,"semAcoes":true,"morte":false}'::jsonb
        ELSE        '{"velocidade":0,"testes":0,"semAcoes":true,"morte":true}'::jsonb
    END;
$$;

-- Trigger: atualiza updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

CREATE TRIGGER trg_characters_updated_at
    BEFORE UPDATE ON characters
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_sections_updated_at
    BEFORE UPDATE ON character_sections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─────────────────────────────────────────────────────────────────────────────
-- 26. CONSTRAINTS DE INTEGRIDADE ADICIONAIS
-- ─────────────────────────────────────────────────────────────────────────────

-- Nível entre 1 e 20
ALTER TABLE characters
    ADD CONSTRAINT chk_char_level
    CHECK (level BETWEEN 1 AND 20);

-- Cansaço entre 0 e 6
ALTER TABLE characters
    ADD CONSTRAINT chk_char_cansaco
    CHECK (nivel_cansaco BETWEEN 0 AND 6);

-- Recursos não negativos
ALTER TABLE characters
    ADD CONSTRAINT chk_char_pv_atual    CHECK (pv_atual IS NULL OR pv_atual >= 0);
ALTER TABLE characters
    ADD CONSTRAINT chk_char_pm_atual    CHECK (pm_atual IS NULL OR pm_atual >= 0);
ALTER TABLE characters
    ADD CONSTRAINT chk_char_pe_atual    CHECK (pe_atual IS NULL OR pe_atual >= 0);

-- Pontos gastos não podem exceder os disponíveis
ALTER TABLE characters
    ADD CONSTRAINT chk_char_regalia_points
    CHECK (regalia_points_spent <= regalia_points_total);

-- Tipo de regalia válido
ALTER TABLE catalog_regalias
    ADD CONSTRAINT chk_regalia_tipo
    CHECK (regalia_tipo IN (
        'aprendiz','especie','especie_opcional','profissao',
        'classe_primaria','avulsa','especializacao'
    ));

-- Tipo de ability válido
ALTER TABLE catalog_abilities
    ADD CONSTRAINT chk_ability_tipo
    CHECK (tipo IN ('ativa','passiva','reacao','magia','milagre','feitico','ritual'));

-- Tipo de classe válido
ALTER TABLE catalog_classes
    ADD CONSTRAINT chk_classe_tipo
    CHECK (tipo IN ('aprendiz','primaria','especializacao'));

-- Tamanho de espécie válido
ALTER TABLE catalog_especies
    ADD CONSTRAINT chk_especie_tamanho
    CHECK (tamanho IN ('minusculo','pequeno','medio','grande','muito_grande','gigante','colossal'));

-- ─────────────────────────────────────────────────────────────────────────────
-- 27. FOREIGN KEYS DIFERIDAS (resolvem referências circulares)
-- ─────────────────────────────────────────────────────────────────────────────

-- catalog_regalias → catalog_classes  (definida após catalog_classes)
ALTER TABLE catalog_regalias
    ADD CONSTRAINT fk_regalias_classe
    FOREIGN KEY (classe_id) REFERENCES catalog_classes(id) ON DELETE SET NULL;

-- Índices JSONB adicionais recomendados para o rule_engine
CREATE INDEX IF NOT EXISTS idx_regalias_prereq_gin      ON catalog_regalias  USING GIN (pre_requisitos);
CREATE INDEX IF NOT EXISTS idx_abilities_efeito_gin     ON catalog_abilities USING GIN (efeito);
CREATE INDEX IF NOT EXISTS idx_abilities_escalamento_gin ON catalog_abilities USING GIN (escalamento);
CREATE INDEX IF NOT EXISTS idx_characters_derivados_gin  ON characters        USING GIN (derivados);
CREATE INDEX IF NOT EXISTS idx_effects_snapshot_gin      ON character_effects USING GIN (snapshot);

-- ─────────────────────────────────────────────────────────────────────────────
-- FIM DO SCHEMA v2
-- Para seed dos dados: execute backend/scripts/seed_catalogs.py
-- Documentação completa: docs/schema-database.md
-- ─────────────────────────────────────────────────────────────────────────────
