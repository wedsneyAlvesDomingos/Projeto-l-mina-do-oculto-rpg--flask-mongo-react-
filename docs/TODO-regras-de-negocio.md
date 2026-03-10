# TODO — Regras de Negócio · Fichas Automatizadas (Lâmina do Oculto)

> Documento fragmentado de tarefas derivadas de `regras-negocio-fichas-automatizadas.md`.  
> Cada seção agrupa TODOs por módulo/camada; cada item indica **prioridade**, **arquivo(s) alvo** e **critério de aceite**.

---

## Legenda de Prioridade

| Tag | Significado |
|-----|-------------|
| 🔴 P0 | Bloqueante — impede a ficha de funcionar |
| 🟠 P1 | Essencial — funcionalidade core incompleta |
| 🟡 P2 | Importante — enriquece automação |
| 🟢 P3 | Desejável — qualidade / DX |
| ⚪ P4 | Futuro — pode ser adiado |

---

## MÓDULO 1 — Catálogo de Espécies (`especies.js`)

### Estado Atual
- 14 espécies + sub-raças com descrições em prosa.
- `humano` já recebeu campos mecânicos (`pvBase`, `velocidadeBase`, `tamanho`, `resistencias`, `vulnerabilidades`, `imunidades`).
- Demais espécies **não possuem** stats estruturados; toda informação mecânica está embutida no texto da `descricao`.

### TODOs

- [x] 🔴 **TODO-ESP-001** · Adicionar stats base a TODAS as 14 espécies  
  **Arquivos:** `frontend/src/data/constants/especies.js`  
  **Campos obrigatórios por espécie:**  
  `pvBase` (int), `velocidadeBase` (float, metros), `tamanho` (enum: minusculo/pequeno/medio/grande/enorme),  
  `resistencias[]`, `vulnerabilidades[]`, `imunidades[]` (strings com tipo de dano ou condição)  
  **Valores a extrair do livro** (`docs/Lâmina do Oculto 0.5.txt`):  
  - `elfo` → pvBase: 10, velocidadeBase: 6, tamanho: medio  
  - `anao` → pvBase: 12, velocidadeBase: 4.5, tamanho: medio  
  - `feerico` → varia por sub-raça (gnomo: pequeno/4.5m, pixie: minusculo/4.5m terra + 7.5m voo, etc.)  
  - `draconiano` → varia por sub-raça (meioDragao: grande, meioWyvern: medio/6m, etc.)  
  - `meioElfo` → pvBase: 10, velocidadeBase: 6, tamanho: medio  
  - `meioDemonio` → pvBase: 10, velocidadeBase: 6, tamanho: medio  
  - `meioCelestial` → pvBase: 10, velocidadeBase: 6, tamanho: medio  
  - `meioGenio` → pvBase: 10, velocidadeBase: 6, tamanho: medio  
  - `meioTroll` → pvBase: 12, velocidadeBase: 6, tamanho: grande  
  - `bestial` → varia por sub-raça  
  - `halfling` → pvBase: 8, velocidadeBase: 4.5, tamanho: pequeno  
  - `troll` → pvBase: 14, velocidadeBase: 6, tamanho: grande  
  - `constructo` → pvBase: 10, velocidadeBase: varia, tamanho: medio  
  **Aceite:** Todas as espécies têm campos numéricos populados; `getEspecie('X').pvBase` nunca retorna `undefined`.

- [x] 🔴 **TODO-ESP-002** · Adicionar stats mecânicos a TODAS as sub-raças  
  **Arquivos:** `frontend/src/data/constants/especies.js`  
  **Campos por sub-raça (dentro de `obrigatorias[]`):**  
  ```js
  {
    id, nome, descricao,
    // ── Overrides/adições mecânicas ──
    visaoNoEscuro: { alcance: 9, tipo: 'meiaLuz' } | null,
    velocidadeOverride: null | float,       // se diferente da base
    velocidadeVoo: null | float,
    resistencias: [],
    vulnerabilidades: [],
    imunidades: [],
    armasNaturais: [ { nome, dano, tipoDano } ] | [],
    habilidadesEspeciais: [
      { nome, descricao, usosMax: int|null, cooldown: string|null, custoAcoes: int|null, custoMagia: int|null }
    ],
    bonusHabilidades: { habilidade: valor } | {},
    proficienciasGanhas: [] | [],
    flags: {
      semDescansoEquipamento: bool,
      semComida: bool,
      semAgua: bool,
      descansoReduzido: { longo: hours, curto: 'padrao' } | null
    }
  }
  ```
  **Sub-raças a enriquecer (48 total):** humano(3), elfo(3), anao(3), feerico(7), draconiano(5), meioElfo(3), meioDemonio(3), meioCelestial(3), meioGenio(4), meioTroll(3), bestial(5), halfling(3), troll(3), constructo(4)  
  **Aceite:** Cada sub-raça tem objeto `habilidadesEspeciais` parseável pela engine; nenhum efeito mecânico está somente em prosa.

- [x] 🟠 **TODO-ESP-003** · Criar função `getEstatisticasEspecie(especieId, subracaId)`  
  **Arquivos:** `frontend/src/data/constants/especies.js`  
  **Comportamento:** Retorna bloco consolidado com merge de stats base da espécie + overrides da sub-raça.  
  ```js
  // Exemplo de retorno:
  {
    pvBase: 10,
    velocidadeBase: 12,    // override de elfo selvagem
    velocidadeVoo: null,
    tamanho: 'medio',
    visaoNoEscuro: { alcance: 18, tipo: 'meiaLuz' },
    resistencias: [],
    vulnerabilidades: [],
    imunidades: [],
    armasNaturais: [],
    habilidadesEspeciais: [...],
    bonusHabilidades: {},
    proficienciasGanhas: [],
    flags: {}
  }
  ```
  **Aceite:** Função exportada e testável; usada no pipeline de cálculo.

- [ ] 🟡 **TODO-ESP-004** · Exportar `getEstatisticasEspecie` via `index.js`  
  **Arquivos:** `frontend/src/data/constants/index.js`

---

## MÓDULO 2 — Regalias (`regalias.js`)

### Estado Atual
- 8 regalias de aprendiz + `guardarPonto` + 3 regalias opcionais (Psíquico, Vampiro, Mutante).
- Todas as descrições são **texto corrido** sem efeitos parseáveis.
- Não existe campo `bonusHabilidades`, `proficienciasGanhas`, `habilidadesGanhas` ou `custos` estruturados.

### TODOs

- [x] ✅ **TODO-REG-001** · Adicionar efeitos mecânicos estruturados a cada regalia de aprendiz  
  **Arquivos:** `frontend/src/data/constants/regalias.js`  
  **Campos a adicionar em cada objeto de `regaliasDeAprendiz[]`:**  
  ```js
  {
    id, nome, descricao,
    bonusHabilidades: { habilidade: pontos },      // ex: combatente → { forca: 1 } ou { fortitude: 1 } ou { destreza: 1 }
    escolhasHabilidades: [                          // quando o jogador escolhe entre opções
      { grupo: ['forca','fortitude','destreza'], pontos: 1 },
      { grupo: ['ccc','cad'], pontos: 1 }
    ],
    proficienciasGanhas: ['armas_marciais','armaduras_leves','armaduras_medias','escudo_simples'],
    habilidadesGanhas: [
      {
        nome: 'Recuperar Fôlego',
        descricao: '...',
        tipo: 'ativa',
        custoAcoes: 3,        // turno completo
        custoMagia: 2,
        efeito: { curaHP: 4 },
        efeitoOpcional: { custoMagiaExtra: 2, curaEstamina: 4 }
      }
    ]
  }
  ```
  **Regalias a cobrir:** combatente, novico, iniciado, feiticeiro, diplomata, explorador, academico  
  **Aceite:** Cada regalia de aprendiz possui `bonusHabilidades` ou `escolhasHabilidades`; sistema pode auto-aplicar bônus sem parsear prosa.

- [x] ✅ **TODO-REG-002** · Adicionar efeitos mecânicos às regalias opcionais  
  **Arquivos:** `frontend/src/data/constants/regalias.js`  
  **Regalias opcionais a cobrir:**  
  - Psíquico (4 opções: Telecinese, Telepatia, Precognição, Controle Mental)  
  - Vampiro/Wight/Draugr (3 opções: Drenagem de Vida, Transformação Noturna, Hipnose)  
  - Mutante (10 mutações: Pele Escamosa, Olhos Multifacetados, Boca Abissal, Membros Desproporcionais, Cauda Serpentina, Garras Retráteis, Chifres Torcidos, Exoesqueleto Ósseo, Pernas de Aranha, Braços Tentaculares)  
  **Campos por opção:**  
  ```js
  {
    nome, descricao,
    efeitos: {
      bonusDefesa: int | null,
      bonusAtaque: int | null,
      armasNaturais: [{ nome, dano, tipoDano }] | null,
      resistencias: [] | null,
      velocidadeExtra: float | null,
      visaoNoEscuro: {} | null,
      habilidadesAtivas: [{ nome, custoAcoes, custoMagia, cooldown, efeito }]
    }
  }
  ```
  **Aceite:** Todas as 17 opções possuem objeto `efeitos` parseável.

- [x] ✅ **TODO-REG-003** · Criar funções de resolução de regalia  
  **Arquivos:** `frontend/src/data/constants/regalias.js`  
  **Funções necessárias:**  
  - `aplicarRegaliaAprendiz(fichaState, regaliaId, escolhas)` → retorna delta de stats  
  - `aplicarRegaliaOpcional(fichaState, tipo, opcaoNome)` → retorna delta de stats  
  - `validarPreRequisitosRegalia(fichaState, regaliaId)` → boolean + mensagem de erro  
  **Aceite:** Funções exportadas e testáveis.

- [x] ✅ **TODO-REG-004** · Mapear regalias de CLASSES PRIMÁRIAS (níveis 3+)  
  **Arquivos:** `frontend/src/data/constants/regalias.js` (ou novo arquivo `classesAvancadas.js`)  
  **Contexto:** O livro (`Lâmina do Oculto 0.5.txt`) contém classes primárias após nível 3 com regalias próprias que **ainda não existem** no código.  
  **Aceite:** Todas as classes primárias e especializações do livro estão catalogadas com `id`, pré-requisitos, efeitos mecânicos.

- [x] ✅ **TODO-REG-005** · Exportar novas funções via `index.js`  
  **Arquivos:** `frontend/src/data/constants/index.js`

---

## MÓDULO 3 — Condições e Efeitos (`condicoes.js`)

### Estado Atual
- 32 condições definidas com `id`, `descricao`, `cor`, `categoria`.
- Apenas ~40% possuem `penalidades {}` parcialmente preenchido.
- Faltam: flags mecânicas (`semAcoes`, `semMovimento`, `semReacoes`), efeitos periódicos (`danoInicio/FimTurno`), regras de stack, e funções engine `aplicarCondicao`/`removerCondicao`.

### TODOs

- [x] 🔴 **TODO-CON-001** · Completar `penalidades` e adicionar `flags` a TODAS as 32 condições  
  **Arquivos:** `frontend/src/data/constants/condicoes.js`  
  **Campos obrigatórios por condição:**  
  ```js
  {
    id, descricao, duracao, cor, categoria,
    penalidades: {
      defesa: int | null,
      ataques: int | null,
      testes: int | null,
      velocidade: int | 'metade' | 0 | null,
      percepcao: int | null
    },
    flags: {
      semAcoes: bool,
      semReacoes: bool,
      semMovimento: bool,
      semConcentracao: bool,
      desvantagemAtaques: bool,
      vantagemContraAlvo: bool,
      criticoReduzido: int | null  // reduz margem de crítico contra o alvo
    },
    danoRecorrente: {
      valor: string | null,        // ex: '2', '1d4', '1d6'
      tipo: string | null,         // ex: 'sangramento', 'fogo', 'veneno'
      momento: 'inicioTurno' | 'fimTurno' | null
    },
    stackRegra: 'substitui' | 'acumula' | 'maiorValor' | 'maiorDuracao' | null,
    cura: string | null            // como remover: 'acao_aliado', 'teste_fortitude', 'descanso_curto', etc.
  }
  ```
  **Condições que precisam de atenção urgente:**  
  | Condição | Faltando |
  |---|---|
  | Atordoado | flags: semAcoes, semReacoes, semMovimento, criticoReduzido: 1 |
  | Cego | flags: desvantagemAtaques, vantagemContraAlvo |
  | Dominado | flags: semAcoes (próprias) |
  | Enfeitiçado | flags: semAcoes |
  | Invisível | flags: vantagemAtaques, desvantagemContraAlvo |
  | Petrificado | flags: semAcoes, semMovimento, semReacoes, imuneADano |
  | Devagar | penalidades: velocidade: 'metade' |
  | Sangrando | danoRecorrente: { valor: '2', tipo: 'sangramento', momento: 'inicioTurno' } |
  | Queimando 1/2/3 | danoRecorrente com valores crescentes |
  | Envenenado | danoRecorrente + penalidades |
  | Congelando | flags: semMovimento (progressivo) |
  | À Beira da Morte | flags: semAcoes, semMovimento, regra especial de testes |
  **Aceite:** Todas as 32 condições têm `penalidades`, `flags` e `danoRecorrente` preenchidos; nenhum campo mecânico é `undefined`.

- [ ] 🟠 **TODO-CON-002** · Criar funções `aplicarCondicao` e `removerCondicao`  
  **Arquivos:** `frontend/src/data/constants/condicoes.js`  
  ```js
  /**
   * @param {Object} fichaState - estado atual da ficha
   * @param {string} condicaoId - id da condição
   * @param {Object} opcoes - { fonte, duracao, intensidade }
   * @returns {Object} novo fichaState com condição aplicada e modificadores recalculados
   */
  export const aplicarCondicao = (fichaState, condicaoId, opcoes) => { ... }
  
  /**
   * @param {Object} fichaState - estado atual da ficha
   * @param {string} condicaoId - id da condição a remover
   * @returns {Object} novo fichaState com condição removida e modificadores recalculados
   */
  export const removerCondicao = (fichaState, condicaoId) => { ... }
  ```
  **Aceite:** Funções exportadas; aplicar Atordoado reduz defesa em 2, seta semAcoes=true; remover restaura.

- [ ] 🟠 **TODO-CON-003** · Criar função `processarEfeitosDeRodada(fichaState, momento)`  
  **Arquivos:** `frontend/src/data/constants/condicoes.js`  
  **Comportamento:** Para cada condição ativa com `danoRecorrente` no `momento` indicado, aplica o dano; decrementa duração; remove se expirou.  
  **Aceite:** Sangrando causa 2 de dano por turno; Queimando 2 causa 2d4; condições com duração em rodadas decrementam.

- [ ] 🟡 **TODO-CON-004** · Implementar lógica de `À Beira da Morte`  
  **Arquivos:** `frontend/src/data/constants/condicoes.js`  
  **Regras:** 3 testes por rodada; 3 sucessos = estabiliza; 3 falhas = morte; dano enquanto à beira = falha automática; cura tira do estado.  
  **Aceite:** Função `processarTesteDeMorte(fichaState)` retorna novo estado com contadores atualizados.

- [ ] 🟢 **TODO-CON-005** · Exportar novas funções via `index.js`  
  **Arquivos:** `frontend/src/data/constants/index.js`

---

## MÓDULO 4 — Equipamentos (`equipamentos.js`)

### Estado Atual
- Armaduras (pesadas/médias/leves), escudos e armas (simples/marciais/exóticas) já existem com `name`, `price`, `dano`, `critico`, `tipo`, `peso`.
- ~30% das armas marciais/exóticas **já têm** `tipoDano`, `alcance`, `propriedades[]`.
- ~70% das armas NÃO têm esses campos consistentemente.
- Nenhuma arma tem: `maos` (1 ou 2), `categoriaProf` (qual proficiência precisa), `efeitosEspeciais[]` estruturados.

### TODOs

- [x] 🔴 **TODO-EQP-001** · Padronizar campos em TODAS as armas (simples, marciais, exóticas)  
  **Arquivos:** `frontend/src/data/constants/equipamentos.js`  
  **Campos obrigatórios por arma:**  
  ```js
  {
    name, description, price, peso, tipo,
    dano: '1d8',                          // dado de dano base
    tipoDano: 'cortante' | 'perfurante' | 'impacto' | 'fogo' | etc.,
    critico: 20 | 19 | 18,                // margem de acerto crítico
    alcance: 'corpo-a-corpo' | '9/36 m' | '24/120 m' | etc.,
    maos: 1 | 2 | '1ou2',                 // versatil = '1ou2'
    categoriaProf: 'simples' | 'marcial' | 'exotica' | 'arma_fogo',
    propriedades: ['leve','pesada','arremessável','recarga','versatil', ...],
    efeitosEspeciais: [                    // efeitos únicos da arma
      { gatilho: 'critico' | 'acerto' | 'sempre', efeito: string, mecanica: {} }
    ] | []
  }
  ```
  **Aceite:** Nenhuma arma com `tipoDano: undefined` ou `maos: undefined`.

- [x] 🟠 **TODO-EQP-002** · Padronizar campos em armaduras e escudos  
  **Arquivos:** `frontend/src/data/constants/equipamentos.js`  
  **Campos obrigatórios:**  
  ```js
  // Armadura pesada
  { name, defesa: int, penalidade: { velocidade: float, furtividade: int }, categoriaProf: 'pesada', peso, price }
  // Armadura média/leve
  { name, bonusDefesa: int, categoriaProf: 'media'|'leve', peso, price }
  // Escudo
  { name, bonusDefesa: int, categoriaProf: 'escudo_simples'|'escudo_torre', peso, price }
  ```
  **Aceite:** Todos os itens de defesa têm `categoriaProf` preenchida.

- [ ] 🟠 **TODO-EQP-003** · Criar função `calcularDefesaComEquipamento(baseDefesa, agilidadeBonus, equipamento)`  
  **Arquivos:** `frontend/src/data/constants/equipamentos.js` ou `regras.js`  
  **Regras:**  
  - Leve/Média: `7 + bonusAgilidade + bonusArmadura + bonusEscudo`  
  - Pesada: `defesaArmadura + bonusEscudo` (sem agilidade, sem base 7)  
  - Sem armadura: `7 + bonusAgilidade`  
  **Aceite:** Função determinística, testável.

- [ ] 🟡 **TODO-EQP-004** · Adicionar sistema de desgaste de arma/armadura  
  **Arquivos:** `frontend/src/data/constants/equipamentos.js`  
  **Regras:** Falha crítica (1 no d20) pode causar desgaste; acerto crítico do oponente pode danificar armadura.  
  **Campos:** `durabilidadeMax`, `durabilidadeAtual` no inventário (não no catálogo).

- [ ] 🟡 **TODO-EQP-005** · Adicionar itens gerais, kits, munição, acampamento  
  **Arquivos:** `frontend/src/data/constants/equipamentos.js`  
  **Contexto:** O livro contém listas de itens não-combate (kit médico, kit de acampamento, ferramentas, tochas, etc.) que não estão no catálogo.  
  **Aceite:** Pelo menos os itens referenciados em regalias e profissões estão catalogados.

- [ ] 🟢 **TODO-EQP-006** · Exportar novas funções via `index.js`  
  **Arquivos:** `frontend/src/data/constants/index.js`

---

## MÓDULO 5 — Antecedentes (`antecedentes.js`)

### Estado Atual
- ~50 antecedentes com `nome`, `descricao`, `habilidades[]`.
- O campo `habilidades[]` contém **strings de texto** como `"2 pontos em Teologia e História"`, **não parseáveis** pela engine.

### TODOs

- [x] 🔴 **TODO-ANT-001** · Converter `habilidades[]` de texto para objetos estruturados  
  **Arquivos:** `frontend/src/data/constants/antecedentes.js`  
  **Formato alvo:**  
  ```js
  {
    nome: 'ABENÇOADO',
    descricao: '...',
    habilidades: [ ... ],  // manter texto para exibição
    bonusEstruturado: [
      { habilidade: 'teologia', pontos: 2 },
      { habilidade: 'historia', pontos: 2 },
      { habilidade: 'intuicao', pontos: 2 },
      { habilidade: 'ritualismo', pontos: -1 },
      { habilidade: 'ocultismo', pontos: -1 }
    ],
    escolhasLivres: 0       // para antecedentes como AMNÉSICO que dão "habilidade escolhida"
  }
  ```
  **Antecedentes com escolhas livres:** AMNÉSICO (4 escolhas), e outros que dizem "habilidade à escolha".  
  **Aceite:** `getAntecedente('ABENÇOADO').bonusEstruturado` retorna array parseável; nenhum bônus mecânico está somente em string.

- [ ] 🟠 **TODO-ANT-002** · Criar função `aplicarAntecedente(fichaState, antecedenteNome, escolhas)`  
  **Arquivos:** `frontend/src/data/constants/antecedentes.js`  
  **Comportamento:** Distribui os pontos do `bonusEstruturado` + resolve `escolhasLivres` com base em parâmetro `escolhas`.  
  **Aceite:** Função exportada, testável, retorna delta de habilidades.

- [ ] 🟢 **TODO-ANT-003** · Exportar novas funções via `index.js`  
  **Arquivos:** `frontend/src/data/constants/index.js`

---

## MÓDULO 6 — Habilidades e Marcos (`habilidades.js`)

### Estado Atual
- 5 categorias de habilidades (fisico, exploração, conhecimento, arcana, social) completamente catalogadas.
- Funções de cálculo existentes: `calcularPontosDeVida`, `calcularEstamina`, `calcularIniciativa`, `calcularPontosDeMagia`, etc.
- Marcos (milestones) no nível 10 estão definidos com objetos `bonus`.
- Falta: função de cálculo de bônus de habilidade (valor → bonus), tabela de conversão valor→modificador.

### TODOs

- [ ] 🟠 **TODO-HAB-001** · Criar tabela/função `calcularBonusHabilidade(valor)`  
  **Arquivos:** `frontend/src/data/constants/habilidades.js`  
  **Regra do sistema:** O livro define faixas de bônus baseadas no valor total da habilidade (ex: 0-2 → +0, 3-5 → +1, 6-8 → +2, etc.).  
  **Aceite:** Função exportada; `calcularBonusHabilidade(7)` retorna valor correto conforme livro.

- [ ] 🟠 **TODO-HAB-002** · Validar limites de distribuição de pontos  
  **Arquivos:** `frontend/src/data/constants/habilidades.js`  
  **Regras:** Valor máximo por habilidade por nível; pontos totais disponíveis por nível; não pode ser negativo por distribuição (só por antecedente).  
  **Aceite:** `validarDistribuicaoHabilidades(nivel, distribuicao)` retorna true/false + erros.

- [ ] 🟡 **TODO-HAB-003** · Verificar se `calcularPontosDeVida` e demais funções estão alinhadas com o livro  
  **Arquivos:** `frontend/src/data/constants/habilidades.js`  
  **Fórmulas a cruzar:**  
  - PV = `pvBase(especie)` + `fortitude * 2` + bônus → ✅ implementada como `calcularPontosDeVida(base, fort)`  
  - Estamina = 10 + atletismo → ✅  
  - PM = basePorRegalia + arcanismo → ✅  
  - Iniciativa = agilidade + percepcao → ✅  
  **Aceite:** Toda fórmula testada contra exemplos do livro.

- [ ] 🟢 **TODO-HAB-004** · Exportar novas funções via `index.js`  
  **Arquivos:** `frontend/src/data/constants/index.js`

---

## MÓDULO 7 — Proficiências (`proficiencias.js`)

### Estado Atual
- 15 proficiências com níveis progressivos e descrições.
- `proficienciasIniciais` disponível (todo zerado).
- Faltam: efeitos mecânicos por nível (o que cada nível desbloqueia mecanicamente), validação de pré-requisitos.

### TODOs

- [ ] 🟠 **TODO-PRO-001** · Adicionar efeitos mecânicos por nível de proficiência  
  **Arquivos:** `frontend/src/data/constants/proficiencias.js`  
  **Formato alvo em cada `niveis[]`:**  
  ```js
  {
    nivel: 1,
    descricao: '...',
    efeitos: {
      desbloqueia: ['armas_simples', 'armaduras_leves'],   // o que libera
      bonusAtaque: 0,
      bonusDefesa: 0,
      bonusHabilidade: {}
    }
  }
  ```
  **Proficiências críticas:** `armas_armaduras` (3 níveis), `ferramentas_ladrao` (5 níveis), `armas_fogo` (2 níveis), `anti_conjuradores` (3 níveis).  
  **Aceite:** `getProficiencia('armas_armaduras').niveis[0].efeitos` retorna objeto parseável.

- [ ] 🟡 **TODO-PRO-002** · Criar função `possuiProficiencia(fichaState, profId, nivelMinimo)`  
  **Arquivos:** `frontend/src/data/constants/proficiencias.js`  
  **Aceite:** Função usada em validação de equipamento e regalias.

---

## MÓDULO 8 — Profissões (`profissoes.js`)

### Estado Atual
- 14 profissões completamente catalogadas com `habilidades[]`, cada uma custando 1 ponto de regalia.
- Herbalista inclui poções, venenos (animais, plantas, monstros) com custos e efeitos.
- Formato parcialmente estruturado — `criminoso`, `mercador`, `explorador`, `academico` já têm campo `efeitos[]`.
- Restante (ferreiro, alfaiate, joalheiro, inventor, carpinteiro, arcanista, cozinheiro, soldadoDeAluguel) NÃO têm `efeitos[]`.

### TODOs

- [ ] 🟠 **TODO-JOB-001** · Adicionar campo `efeitos[]` às profissões restantes  
  **Arquivos:** `frontend/src/data/constants/profissoes.js`  
  **Profissões sem `efeitos[]`:** ferreiro, alfaiate, artista (parcial), joalheiro, inventor, carpinteiro, arcanista, cozinheiro, soldadoDeAluguel  
  **Formato:** Mesmo dos que já têm: `efeitos: ["texto parseável do efeito mecânico"]`  
  **Aceite:** Toda habilidade de profissão tem array `efeitos[]` preenchido.

- [ ] 🟡 **TODO-JOB-002** · Padronizar campos de metadados em todas as profissões  
  **Arquivos:** `frontend/src/data/constants/profissoes.js`  
  **Campos inconsistentes:**  
  - `ferreiro` usa `ambiente` e `rendimento`, mas `criminoso` usa `ambienteEmprego` e `rendaPorDia`  
  - Unificar para: `ambienteEmprego`, `rendaPorDia`, `chanceDeRisco`, `beneficiosFixos[]`  
  **Aceite:** Todas as 14 profissões usam os mesmos nomes de campo.

- [ ] 🟡 **TODO-JOB-003** · Adicionar efeitos estruturados a poções e venenos  
  **Arquivos:** `frontend/src/data/constants/profissoes.js`  
  **Formato alvo para poções:**  
  ```js
  {
    nome, magica, alquimia, efeito, duracao, custo,
    efeitoMecanico: {
      curaHP: int | null,
      vidaTemporaria: int | null,
      bonusDefesa: int | null,
      condicaoAplicada: string | null,
      condicaoRemovida: string | null,
      modificadorVelocidade: 'dobro' | null,
      acoesExtras: int | null
    }
  }
  ```
  **Aceite:** `getPocao('cura').efeitoMecanico.curaHP` retorna 10.

---

## MÓDULO 9 — Regras de Cálculo (`regras.js`)

### Estado Atual
- Arquivo mais completo do projeto (2123 linhas, 78 exports).
- Contém: combate, iniciativa, defesa, velocidade, acerto, dano, elementos, ações, queda, cobertura, montarias, vantagem/desvantagem, moedas, bônus, itens mágicos, armadilhas, rituais, luz, descanso, tamanho, carga.
- Funções de cálculo existem para os principais fluxos.
- Falta: validação cruzada com o livro para cada fórmula.

### TODOs

- [ ] 🟠 **TODO-RUL-001** · Auditar e cruzar TODAS as fórmulas de `regras.js` com o livro  
  **Arquivos:** `frontend/src/data/constants/regras.js` vs `docs/Lâmina do Oculto 0.5.txt`  
  **Fórmulas a verificar:**  
  | Fórmula | Função no código | Seção do livro |
  |---|---|---|
  | Defesa leve/média | `calcularDefesaTotal()` | Linhas 100-130 |
  | Defesa pesada | `calcularDefesaTotal()` | Linhas 100-130 |
  | Acerto | `calcularResultadoAtaque()` | Linhas 60-80 |
  | Dano + modificadores | `calcularDanoFinal()` | Linhas 80-100 |
  | Velocidade + armadura | `calcularVelocidadeMovimento()` | Linhas 130-150 |
  | Interação elemental | `INTERACOES_ELEMENTAIS` + `calcularDanoElemental()` | Linhas 80-100 |
  | Dano de queda | `calcularDanoQueda()` | Seção queda |
  | Carga por tamanho | `CAPACIDADE_CARGA` | Seção carga |
  **Aceite:** Cada fórmula tem comentário com número de página/seção do livro que a fundamenta.

- [ ] 🟠 **TODO-RUL-002** · Adicionar função `resolverAcaoCompleta(ator, alvo, acao, contexto)`  
  **Arquivos:** `frontend/src/data/constants/regras.js`  
  **Comportamento:** Pipeline completo de resolução de ação: valida custo → rola acerto → aplica vantagem/desvantagem → verifica crítico → calcula dano → aplica resistências/vulnerabilidades → aplica efeitos secundários → retorna resultado.  
  **Aceite:** Função encapsula todo o fluxo de combate em uma chamada.

- [ ] 🟡 **TODO-RUL-003** · Adicionar tabela de XP por nível e função `calcularNivel(xp)`  
  **Arquivos:** `frontend/src/data/constants/regras.js`  
  **Aceite:** `calcularNivel(300)` retorna nível correto conforme tabela do livro.

- [ ] 🟡 **TODO-RUL-004** · Adicionar regras de descanso completas  
  **Arquivos:** `frontend/src/data/constants/regras.js`  
  **Regras:**  
  - Descanso curto (30 min): recupera X PV, X Estamina, X PM conforme regras  
  - Descanso longo (8h): recupera tudo; consome ração/água; exige condições de abrigo  
  - Efeitos que expiram em descanso curto/longo  
  **Aceite:** `processarDescanso(fichaState, 'curto')` retorna ficha com recursos recalculados e condições expiradas.

---

## MÓDULO 10 — Backend / Motor de Regras

### Estado Atual
- `PersonagemService` é CRUD puro: cria, lê, atualiza, deleta, sem NENHUMA validação de regra.
- `models.py` tem tabelas para conditions, skills, proficiencies, regalias, inventory — mas sem lógica de negócio.
- Schema SQL completo com 12 tabelas.
- Não existe: `rule_engine`, validação de pré-requisitos, cálculo server-side.

### TODOs

- [ ] 🟠 **TODO-BE-001** · Criar módulo `backend/app/services/rule_engine.py`  
  **Comportamento:** Motor de regras server-side que espelha a lógica do frontend. Valida toda mutação de personagem antes de persistir.  
  **Funções mínimas:**  
  - `validar_criacao(data)` → erros ou OK  
  - `validar_evolucao(personagem_atual, mudancas)` → erros ou OK  
  - `calcular_ficha_completa(personagem)` → stats derivados  
  **Aceite:** `criar_personagem` chama `validar_criacao` antes de persistir; dados inválidos retornam 400.

- [ ] 🟠 **TODO-BE-002** · Adicionar validação de regalia no backend  
  **Arquivos:** `backend/app/services/rule_engine.py`  
  **Regras:**  
  - Nível 1: 4 pontos (1 espécie + 1 classe + 1 profissão + 1 livre)  
  - Nível 2: +4 pontos  
  - Nível 3+: +2 por nível  
  - Verificar pré-requisitos, custo, incompatibilidades  
  **Aceite:** Backend rejeita compra de regalia sem pontos suficientes ou sem pré-requisitos.

- [ ] 🟠 **TODO-BE-003** · Sincronizar catálogos do frontend com tabelas do banco  
  **Arquivos:** `backend/db/schema.sql`, novo script de seed  
  **Contexto:** Tabelas `items`, `skills`, `conditions`, `proficiencies`, `regalias` existem mas estão **vazias**. Os dados vivem apenas no frontend JS.  
  **Opções:**  
  1. Script de seed que lê os JS e popula o banco  
  2. Backend expõe API de catálogos que lê do frontend build  
  3. Mover fonte de verdade para JSON compartilhado  
  **Aceite:** Dados de catálogo acessíveis pelo backend para validação.

- [ ] 🟡 **TODO-BE-004** · Adicionar `character_effects` para estado dinâmico  
  **Arquivos:** `backend/db/schema.sql`, `backend/app/models/models.py`  
  ```sql
  CREATE TABLE character_effects (
    id SERIAL PRIMARY KEY,
    character_id INTEGER NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
    effect_type TEXT NOT NULL,          -- 'condicao', 'buff', 'debuff', 'dot', 'hot'
    source TEXT,                         -- origem do efeito
    data JSONB DEFAULT '{}'::jsonb,      -- penalidades, flags, danoRecorrente
    remaining_rounds INTEGER,
    remaining_uses INTEGER,
    expires_on_rest TEXT,                -- 'curto', 'longo', null
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  ```
  **Aceite:** Condições ativas do personagem persistem entre sessões.

- [ ] 🟡 **TODO-BE-005** · Adicionar endpoint de simulação de ação  
  **Arquivos:** `backend/app/main.py`  
  ```
  POST /api/personagem/{id}/simular-acao
  Body: { acao, alvo_id, contexto }
  Response: { resultado, recursos_consumidos, efeitos_gerados }
  ```
  **Aceite:** Frontend pode resolver ações via API sem lógica local duplicada.

- [ ] 🟡 **TODO-BE-006** · Adicionar trilha de auditoria  
  **Arquivos:** `backend/db/schema.sql`, `backend/app/models/models.py`  
  ```sql
  CREATE TABLE character_audit_log (
    id SERIAL PRIMARY KEY,
    character_id INTEGER NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    action TEXT NOT NULL,
    before_state JSONB,
    after_state JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  ```
  **Aceite:** Toda mutação de personagem gera registro no log.

- [ ] ⚪ **TODO-BE-007** · Versionar regras (`rule_version = 0.5`)  
  **Contexto:** Para migração futura quando sair versão 0.6+ do livro.  
  **Aceite:** Campo `rule_version` no personagem; engine seleciona fórmulas pela versão.

---

## MÓDULO 11 — Frontend / UI de Ficha

### Estado Atual
- `criarPersonagem.js` (3492 linhas): Formulário funcional com tabs, seleção de espécie/classe/antecedente, distribuição de pontos.
- `characterSheet.js` (4458 linhas): Ficha de visualização/edição com componentes extraídos (`CharacterHeader`, `VitalStatsSection`, `EquipamentosSection`, `QuickCombatPanel`).
- Ambos importam dos constants via `index.js`.
- Falta: ligação com cálculos automáticos (PV, PM, defesa, etc.), aplicação de condições na UI, UI de compra de regalia com validação.

### TODOs

- [ ] 🟠 **TODO-UI-001** · Conectar `criarPersonagem.js` ao pipeline de cálculo  
  **Arquivos:** `frontend/src/pages/Character/criarPersonagem.js`  
  **Comportamento:** Ao selecionar espécie + sub-raça → auto-calcular PV base, velocidade, resistências. Ao selecionar antecedente → auto-aplicar bônus de habilidades. Ao selecionar regalia → auto-aplicar bônus.  
  **Aceite:** Campos PV, velocidade, defesa atualizam em tempo real conforme seleções.

- [ ] 🟠 **TODO-UI-002** · Conectar `characterSheet.js` ao pipeline de cálculo  
  **Arquivos:** `frontend/src/pages/Character/characterSheet.js`  
  **Comportamento:** Stats derivados são recalculados a cada mutação (equip item, subir nível, aplicar condição).  
  **Aceite:** Equipar armadura pesada recalcula defesa; aplicar condição Atordoado mostra -2 defesa.

- [ ] 🟡 **TODO-UI-003** · Criar UI de gerenciamento de condições ativas  
  **Arquivos:** `frontend/src/pages/Character/components/`  
  **Comportamento:** Lista condições ativas com duração restante; botão para aplicar/remover; indicadores visuais de penalidades.  
  **Aceite:** Player pode aplicar "Atordoado" e ver penalidades refletidas na ficha.

- [ ] 🟡 **TODO-UI-004** · Criar UI de compra de regalias com validação  
  **Arquivos:** `frontend/src/pages/Character/components/`  
  **Comportamento:** Mostrar regalias disponíveis, custo, pré-requisitos; bloquear compra inválida; mostrrar árvore de progressão.  
  **Aceite:** Botão "comprar" desabilitado se sem pontos ou sem pré-requisitos.

- [ ] ⚪ **TODO-UI-005** · Refatorar `criarPersonagem.js` (3492 linhas → componentes)  
  **Contexto:** Arquivo monolítico que dificulta manutenção. Extrair em componentes por tab/seção.  
  **Aceite:** Nenhum componente acima de 500 linhas.

- [ ] ⚪ **TODO-UI-006** · Refatorar `characterSheet.js` (4458 linhas → componentes)  
  **Contexto:** Mesma situação. Já existe início de extração com `CharacterHeader`, etc.  
  **Aceite:** Nenhum componente acima de 500 linhas.

---

## MÓDULO 12 — Classes Primárias e Especializações (Novo Catálogo)

### Estado Atual
- O livro (`Lâmina do Oculto 0.5.txt`, 7367 linhas) contém classes primárias e especializações que NÃO existem em nenhum arquivo do código.
- Apenas classes de Aprendiz estão catalogadas em `regalias.js`.
- Não existe sequer o arquivo para classes avançadas.

### TODOs

- [x] 🔴 **TODO-CLS-001** · Ler e catalogar TODAS as classes primárias do livro  
  **Arquivos:** Novo `frontend/src/data/constants/classesAvancadas.js`  
  **Contexto:** Ler `docs/Lâmina do Oculto 0.5.txt` das seções de classes e extrair para formato estruturado.  
  **Formato:**  
  ```js
  export const classesPrimarias = [
    {
      id: 'guerreiro',
      nome: 'Guerreiro',
      preRequisitos: { classeAprendiz: 'combatente', nivelMinimo: 3, habilidadesMinimas: { ccc: 3 } },
      descricao: '...',
      regalias: [
        { id: 'golpe_poderoso', nome: '...', custo: 1, efeitos: {...} }
      ],
      especializacoes: [
        {
          id: 'campiao',
          nome: 'Campeão',
          preRequisitos: { nivelMinimo: 5 },
          regalias: [...]
        }
      ]
    }
  ];
  ```
  **Aceite:** Cada classe do livro tem entrada catalogada com pré-requisitos, regalias e especializações.

- [ ] 🟠 **TODO-CLS-002** · Integrar classes primárias no pipeline de cálculo  
  **Aceite:** Pipeline aceita `classePrimaria` no cálculo e aplica regalias corretamente.

- [x] 🟡 **TODO-CLS-003** · Adicionar exports ao `index.js`  
  **Arquivos:** `frontend/src/data/constants/index.js`

---

## MÓDULO 13 — Testes Automatizados

### Estado Atual
- `setupTests.js` existe mas está vazio (apenas boilerplate do CRA).
- Nenhum teste de unidade ou integração implementado.

### TODOs

- [ ] 🟡 **TODO-TST-001** · Criar testes unitários para funções de cálculo (`habilidades.js`)  
  **Arquivo:** `frontend/src/__tests__/habilidades.test.js`  
  **Cobertura:** `calcularPontosDeVida`, `calcularEstamina`, `calcularIniciativa`, `calcularPontosDeMagia`, `calcularBonusVelocidade`  
  **Aceite:** 100% de cobertura nas funções de cálculo.

- [ ] 🟡 **TODO-TST-002** · Criar testes unitários para `regras.js`  
  **Arquivo:** `frontend/src/__tests__/regras.test.js`  
  **Cobertura:** `calcularDefesaTotal`, `calcularResultadoAtaque`, `calcularDanoFinal`, `calcularDanoElemental`, `calcularVantagemDesvantagem`  
  **Aceite:** Cada fórmula testada com pelo menos 3 cenários (normal, edge case, crítico).

- [ ] 🟡 **TODO-TST-003** · Criar testes unitários para condições (`condicoes.js`)  
  **Arquivo:** `frontend/src/__tests__/condicoes.test.js`  
  **Cobertura:** `aplicarCondicao`, `removerCondicao`, `processarEfeitosDeRodada`

- [ ] 🟡 **TODO-TST-004** · Criar testes de integração do pipeline completo  
  **Arquivo:** `frontend/src/__tests__/pipeline.test.js`  
  **Cenários:**  
  1. Criar humano Prodígio + antecedente Abençoado + combatente → validar PV, PM, defesa, velocidade  
  2. Equipar armadura pesada completa → validar defesa muda para fórmula pesada  
  3. Aplicar condição Atordoado → validar penalidades → remover → validar restauração  
  4. Resolver ataque com vantagem + elemento fogo contra alvo com resistência fogo  

- [ ] ⚪ **TODO-TST-005** · Criar testes de backend para `rule_engine.py`  
  **Arquivo:** `backend/tests/test_rule_engine.py`

---

## MÓDULO 14 — Dados Compartilhados / Contrato Frontend↔Backend

### Estado Atual
- Toda a fonte de verdade de catálogos está SOMENTE no frontend (JS).
- Backend não tem acesso a regras — apenas faz CRUD.
- `character_sections` (JSONB) armazena dados flexíveis, mas sem schema enforcement.

### TODOs

- [ ] 🟠 **TODO-DAT-001** · Definir formato JSON canônico de ficha completa  
  **Arquivo:** Novo `docs/schema-ficha.json` (JSON Schema)  
  **Campos mínimos:**  
  ```json
  {
    "identidade": { "nome", "especie", "subespecie", "antecedente", "classeAprendiz", "classePrimaria", "especializacao", "nivel", "xp" },
    "habilidades": { "fortitude": int, "forca": int, ... },
    "recursos": { "pvAtual": int, "pvMax": int, "pmAtual": int, "pmMax": int, "estaminaAtual": int, "estaminaMax": int },
    "defesa": { "base": int, "armadura": int, "escudo": int, "agilidade": int, "total": int },
    "proficiencias": { "armas_armaduras": int, ... },
    "regalias": [{ "id", "fonte", "escolhas" }],
    "inventario": [{ "itemId", "quantidade", "equipado", "slot" }],
    "condicoesAtivas": [{ "condicaoId", "fonte", "duracaoRestante" }],
    "moedas": { "ouro": int, "prata": int, "cobre": int }
  }
  ```
  **Aceite:** Documento JSON Schema publicado; frontend e backend produzem/consomem o mesmo formato.

- [ ] 🟡 **TODO-DAT-002** · Criar script de seed para popular tabelas de catálogo do banco  
  **Arquivos:** `backend/scripts/seed_catalogs.py`  
  **Comportamento:** Lê os arquivos JS de constants (ou versão JSON exportada), insere nas tabelas `items`, `skills`, `conditions`, `proficiencies`, `regalias`.  
  **Aceite:** Após rodar seed, backend pode consultar catálogo diretamente do banco.

- [ ] ⚪ **TODO-DAT-003** · Migrar fonte de verdade para JSON compartilhado (opcional)  
  **Contexto:** Extrair dados de JS para arquivos `.json` na raiz (`/shared/data/`), importados tanto pelo frontend quanto backend.  
  **Aceite:** Single source of truth acessível por ambas as camadas.

---

## Ordem de Execução Recomendada

### Fase 1 — Dados Estruturados (Fundação)
> Sem dados parseáveis, nenhuma automação funciona.

| Ordem | TODO | Módulo | Prioridade |
|-------|------|--------|------------|
| 1 | TODO-ESP-001 | Espécies | 🔴 P0 |
| 2 | TODO-ESP-002 | Espécies Sub-raças | 🔴 P0 |
| 3 | TODO-CON-001 | Condições completas | 🔴 P0 |
| 4 | TODO-REG-001 | Regalias aprendiz | 🔴 P0 |
| 5 | TODO-REG-002 | Regalias opcionais | 🔴 P0 |
| 6 | TODO-ANT-001 | Antecedentes | 🔴 P0 |
| 7 | TODO-EQP-001 | Armas padronizadas | 🔴 P0 |
| 8 | TODO-EQP-002 | Armaduras padronizadas | 🟠 P1 |
| 9 | TODO-CLS-001 | Classes primárias | 🔴 P0 |

### Fase 2 — Funções de Cálculo (Motor)
> Transformar dados em cálculos automáticos.

| Ordem | TODO | Módulo | Prioridade |
|-------|------|--------|------------|
| 10 | TODO-ESP-003 | getEstatisticasEspecie | 🟠 P1 |
| 11 | TODO-HAB-001 | Bônus de habilidade | 🟠 P1 |
| 12 | TODO-CON-002 | aplicarCondicao | 🟠 P1 |
| 13 | TODO-CON-003 | processarEfeitosDeRodada | 🟠 P1 |
| 14 | TODO-REG-003 | Resolução de regalia | 🟠 P1 |
| 15 | TODO-ANT-002 | aplicarAntecedente | 🟠 P1 |
| 16 | TODO-EQP-003 | calcularDefesaComEquipamento | 🟠 P1 |
| 17 | TODO-RUL-001 | Auditoria de fórmulas | 🟠 P1 |
| 18 | TODO-RUL-002 | resolverAcaoCompleta | 🟠 P1 |
| 19 | TODO-PRO-001 | Proficiências mecânicas | 🟠 P1 |

### Fase 3 — Integração (Ponta a ponta)
> Conectar dados + motor ao frontend e backend.

| Ordem | TODO | Módulo | Prioridade |
|-------|------|--------|------------|
| 20 | TODO-DAT-001 | Schema JSON canônico | 🟠 P1 |
| 21 | TODO-BE-001 | rule_engine.py | 🟠 P1 |
| 22 | TODO-BE-002 | Validação regalia backend | 🟠 P1 |
| 23 | TODO-BE-003 | Sync catálogos | 🟠 P1 |
| 24 | TODO-UI-001 | Pipeline na criação | 🟠 P1 |
| 25 | TODO-UI-002 | Pipeline na ficha | 🟠 P1 |

### Fase 4 — Enriquecimento e Qualidade
> Completude e robustez.

| Ordem | TODO | Módulo | Prioridade |
|-------|------|--------|------------|
| 26 | TODO-JOB-001 | Efeitos profissões | 🟠 P1 |
| 27 | TODO-JOB-002 | Padronizar campos | 🟡 P2 |
| 28 | TODO-JOB-003 | Poções mecânicas | 🟡 P2 |
| 29 | TODO-HAB-002 | Validar distribuição | 🟠 P1 |
| 30 | TODO-CON-004 | Beira da morte | 🟡 P2 |
| 31 | TODO-RUL-003 | Tabela XP | 🟡 P2 |
| 32 | TODO-RUL-004 | Descanso completo | 🟡 P2 |
| 33 | TODO-EQP-004 | Desgaste | 🟡 P2 |
| 34 | TODO-EQP-005 | Itens gerais | 🟡 P2 |
| 35 | TODO-PRO-002 | possuiProficiencia | 🟡 P2 |
| 36 | TODO-BE-004 | character_effects | 🟡 P2 |
| 37 | TODO-BE-005 | Endpoint simulação | 🟡 P2 |
| 38 | TODO-REG-004 | Classes primárias regalias | 🟡 P2 |

### Fase 5 — Testes e Polish
| Ordem | TODO | Módulo | Prioridade |
|-------|------|--------|------------|
| 39 | TODO-TST-001 | Testes habilidades | 🟡 P2 |
| 40 | TODO-TST-002 | Testes regras | 🟡 P2 |
| 41 | TODO-TST-003 | Testes condições | 🟡 P2 |
| 42 | TODO-TST-004 | Testes integração | 🟡 P2 |
| 43 | TODO-UI-003 | UI condições | 🟡 P2 |
| 44 | TODO-UI-004 | UI regalias | 🟡 P2 |
| 45 | TODO-BE-006 | Auditoria | 🟡 P2 |
| 46 | TODO-UI-005 | Refatorar criação | ⚪ P4 |
| 47 | TODO-UI-006 | Refatorar ficha | ⚪ P4 |
| 48 | TODO-BE-007 | Versionar regras | ⚪ P4 |
| 49 | TODO-DAT-002 | Seed catálogos | 🟡 P2 |
| 50 | TODO-DAT-003 | JSON compartilhado | ⚪ P4 |

### Exports (executar após cada módulo)
| TODO | Depende de |
|------|-----------|
| TODO-ESP-004 | ESP-003 |
| TODO-REG-005 | REG-003 |
| TODO-CON-005 | CON-002 |
| TODO-EQP-006 | EQP-003 |
| TODO-ANT-003 | ANT-002 |
| TODO-HAB-004 | HAB-001 |
| TODO-CLS-003 | CLS-001 |

---

## Contagem Final

| Prioridade | Quantidade |
|------------|-----------|
| 🔴 P0 (Bloqueante) | 9 |
| 🟠 P1 (Essencial) | 17 |
| 🟡 P2 (Importante) | 18 |
| 🟢 P3 (Desejável) | 1 |
| ⚪ P4 (Futuro) | 5 |
| **Total** | **50** |
