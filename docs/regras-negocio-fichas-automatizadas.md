# Regras de Negócio — Fichas Automatizadas (Lâmina do Oculto)

## 1) Objetivo
Definir, de forma implementável, as regras de negócio para criação, validação, evolução e uso de fichas automatizadas no sistema LDO, cobrindo:
- espécies e subespécies;
- antecedentes;
- habilidades e proficiências;
- profissões;
- classes e especializações;
- regalias;
- itens/equipamentos;
- condições, efeitos secundários, resistências e vulnerabilidades;
- combate, descanso e progressão.

---

## 2) Fontes canônicas de regra
A aplicação deve considerar como fonte de verdade, em ordem:
1. Documento de sistema: [docs/Lâmina do Oculto 0.5.txt](docs/L%C3%A2mina%20do%20Oculto%200.5.txt)
2. Catálogos estruturados do frontend:
   - [frontend/src/data/constants/especies.js](frontend/src/data/constants/especies.js)
   - [frontend/src/data/constants/antecedentes.js](frontend/src/data/constants/antecedentes.js)
   - [frontend/src/data/constants/habilidades.js](frontend/src/data/constants/habilidades.js)
   - [frontend/src/data/constants/proficiencias.js](frontend/src/data/constants/proficiencias.js)
   - [frontend/src/data/constants/profissoes.js](frontend/src/data/constants/profissoes.js)
   - [frontend/src/data/constants/regalias.js](frontend/src/data/constants/regalias.js)
   - [frontend/src/data/constants/equipamentos.js](frontend/src/data/constants/equipamentos.js)
   - [frontend/src/data/constants/condicoes.js](frontend/src/data/constants/condicoes.js)
   - [frontend/src/data/constants/regras.js](frontend/src/data/constants/regras.js)

Se houver conflito entre catálogo e texto oficial, usar o texto oficial e abrir tarefa de sincronização de catálogo.

---

## 3) Princípios obrigatórios
- Toda regra deve ser **data-driven** (catálogo + motor de regras), sem “if hardcoded” por nome de personagem.
- Toda alteração de ficha deve gerar **trilha de auditoria** (`quem`, `quando`, `origem`, `antes/depois`).
- Cálculos devem ser **determinísticos** para o mesmo estado e os mesmos dados de entrada.
- Regras temporárias (efeitos/condições) devem registrar duração em:
  - rodadas;
  - turnos;
  - tempo real (min/hora);
  - ou até evento (“até descanso curto”, “até final do próximo turno”).

---

## 4) Modelo de domínio (conceitual)
### 4.1 Entidades
- `Character` (ficha)
- `CharacterProgression` (nível, XP, pontos)
- `CharacterSection` (blocos JSON flexíveis)
- `Catalog*` (espécies, classes, regalias, itens etc.)
- `CharacterEffect` (condições, buffs, debuffs)
- `InventoryEntry` (item + quantidade + estado)
- `RuleEvent` (evento do motor)

### 4.2 Identificadores canônicos
Todos os catálogos devem ter `id_slug` estável (ex.: `especie.humano`, `classe.combatente`, `regalia.determinacao_humana`) para evitar dependência de texto exibido.

---

## 5) Estrutura mínima de dados da ficha
A ficha final precisa armazenar, no mínimo:

1. Identidade
- nome, idade, gênero, descrição, imagem.

2. Construção
- espécie e subespécie;
- antecedente;
- classe base (aprendiz), classe primária e especialização (quando existir);
- profissões adquiridas;
- regalias escolhidas;
- proficiências e níveis;
- equipamentos (inventário + equipado).

3. Recursos
- PV atual/máximo;
- PM atual/máximo;
- Estamina atual/máxima;
- moeda (ouro, prata, cobre etc.).

4. Estado dinâmico
- condições ativas;
- efeitos temporários;
- cooldowns;
- usos por descanso/dia;
- desgaste de arma/armadura;
- log de eventos.

---

## 6) Pipeline de cálculo da ficha (ordem obrigatória)
A engine deve recalcular com a seguinte precedência:

1. Base de espécie/subespécie
2. Atributos e habilidades distribuídos
3. Antecedente
4. Classe Aprendiz
5. Classe primária + especialização
6. Profissão(ões)
7. Proficiências
8. Regalias (espécie, classe, profissão, opcionais)
9. Equipamentos equipados
10. Condições e efeitos temporários
11. Regras de contexto (combate, terreno, visão, surpresa etc.)

Regra de desempate de bônus/penalidade:
- para **acerto e defesa**, aplicar apenas o maior bônus/penalidade relevante (conforme regra textual);
- demais efeitos continuam cumulativos quando permitido.

---

## 7) Regras de criação de personagem
### RN-CR-001 — Nível inicial
Personagem inicia no nível 1 com os pontos e restrições definidas pelo sistema.

### RN-CR-002 — Pontos de Regalia iniciais
No nível 1, iniciar com 4 pontos de regalia, com travas:
- 1 ponto obrigatório em regalia de espécie;
- 1 ponto obrigatório em regalia de classe Aprendiz;
- 1 ponto obrigatório em regalia de profissão;
- 1 ponto livre.

### RN-CR-003 — Evolução de pontos
- nível 2: +4 pontos de regalia;
- do nível 3 em diante: +2 por nível.

### RN-CR-004 — Pré-requisito de classe primária
Só pode selecionar classe primária a partir do nível 3 e com pré-requisitos de Aprendiz satisfeitos.

### RN-CR-005 — Validação de compra de regalia
Compra de regalia deve validar:
- custo;
- pré-requisitos;
- incompatibilidades;
- ordem obrigatória quando existir árvore sequencial.

---

## 8) Regras de cálculo principais
### RN-CA-001 — Iniciativa
`iniciativa = agilidade + percepção` (+ modificadores situacionais).

### RN-CA-002 — Pontos de Vida
`PV max = base_da_espécie + 2 * fortitude + bônus de regalias/efeitos`.

### RN-CA-003 — Pontos de Magia
`PM max = base_por_regalia/classe + arcanismo + bônus`.

### RN-CA-004 — Estamina
`Estamina max = base_por_regalia/classe + atletismo + bônus`.

### RN-CA-005 — Defesa
Usar regra de armadura leve/média/pesada conforme sistema e proficiência.

### RN-CA-006 — Acerto
`d20 + habilidade de combate aplicável + bônus contextuais`.

### RN-CA-007 — Dano físico
Após acerto válido, aplicar dado da arma + atributo aplicável (força/destreza) + bônus.

### RN-CA-008 — Crítico e falha crítica
Aplicar regras de margem crítica, dano, desgaste de arma/armadura e penalidades acumuladas.

### RN-CA-009 — Elementos
Aplicar matriz de interação elemental (forte/fraco/neutro), incluindo exceções (ex.: sagrado/sombrio/necrótico/arcano).

### RN-CA-010 — Movimento
Velocidade final = base da espécie + modificadores de habilidade/regalia/equipamento/terreno.

---

## 9) Regras de combate e turno
### RN-CB-001 — Ações por turno
Padrão de 3 ações por turno, salvo regalia/condição que altere.

### RN-CB-002 — Reações
1 reação por rodada por padrão, salvo exceções explícitas.

### RN-CB-003 — Ordem de turno
Iniciativa ordenada do maior para o menor. Empates seguem regra definida pela mesa/sistema.

### RN-CB-004 — Ações (padrão, movimento, turno completo, livre)
Cada ação deve consumir custo correto e validar pré-requisitos.

### RN-CB-005 — Ataque de oportunidade
Disparar evento quando alvo sai de alcance de ameaça e atacante for elegível.

### RN-CB-006 — Surpresa, obscurecido, escondido
Aplicar penalidades/benefícios de ataque, defesa e crítica conforme condição.

---

## 10) Condições e efeitos secundários
### RN-EF-001 — Estrutura padronizada de efeito
Todo efeito deve ter:
- `id`;
- `fonte`;
- `tipo` (condição, buff, debuff, dot, hot, utilitário);
- `alvos`;
- `modificadores`;
- `stack_rule`;
- `duracao`;
- `evento_expiracao`.

### RN-EF-002 — Stacking
Implementar política por condição:
- substitui;
- acumula;
- mantém maior valor;
- mantém maior duração.

### RN-EF-003 — Condições do sistema
Implementar todas as condições listadas no sistema (ex.: atordoado, cego, envenenado, restringido, deitado, incapacitado, surdo, sangrando, paralisado, aterrorizado, à beira da morte, congelando, queimando, obscurecido, escondido, surpreso, devagar etc.).

### RN-EF-004 — À Beira da Morte
Controlar testes de morte/sucesso/falha, estabilização e morte definitiva por limite de falhas.

### RN-EF-005 — Dano periódico
Efeitos como sangramento/veneno devem processar no início/fim do turno conforme definição do efeito.

---

## 11) Regalias, classes, especializações, profissões e itens
### RN-CT-001 — Catálogo completo obrigatório
A engine deve carregar e validar todos os registros existentes nos catálogos de:
- classes (incluindo Aprendiz e primárias);
- especializações;
- profissões;
- regalias;
- espécies/subespécies;
- itens/equipamentos;
- condições.

### RN-CT-002 — Sem “lista estática no código”
Não duplicar catálogo em múltiplos arquivos. Definir única origem por domínio e usar `id_slug`.

### RN-CT-003 — Pré-requisitos compostos
Regalias devem aceitar expressões de requisito:
- nível mínimo;
- atributo mínimo;
- possuir outra regalia;
- possuir proficiência;
- tipo de espécie/classe;
- recurso mínimo (PM/Estamina).

### RN-CT-004 — Custos e recursos
Toda ação/regalia/habilidade ativa deve validar e consumir recurso correto (ação, PM, Estamina, usos por dia/descanso).

### RN-CT-005 — Cooldowns
Registrar timestamp/rodada de último uso e impedir uso fora da janela válida.

---

## 12) Itens, inventário e economia
### RN-IT-001 — Inventário
Cada item deve ter:
- categoria;
- peso;
- tipo de dano/defesa (quando aplicável);
- propriedade de proficiência;
- valor monetário;
- raridade/tags.

### RN-IT-002 — Carga
Carga total do inventário impacta deslocamento conforme regras de força/tamanho e modificadores.

### RN-IT-003 — Equipado vs carregado
Apenas itens equipados aplicam bônus de combate/defesa/efeito contínuo (salvo exceções explícitas).

### RN-IT-004 — Desgaste
Implementar desgaste de arma/armadura por falhas/sucessos críticos quando previsto.

### RN-IT-005 — Conversão monetária
Aplicar taxa oficial de conversão entre moedas.

---

## 13) Descanso, recuperação e recarga
### RN-DS-001 — Descanso curto
Recupera recursos conforme regra específica de classe/regalia/item.

### RN-DS-002 — Descanso longo
Recupera recursos diários e reinicia usos por dia.

### RN-DS-003 — Efeitos por descanso
Cada efeito define se expira em descanso curto, longo, ambos ou nunca.

---

## 14) Motor de regras orientado a eventos
Eventos mínimos:
- `onCharacterCreate`
- `onBeforeBuyRegalia` / `onAfterBuyRegalia`
- `onTurnStart` / `onTurnEnd`
- `onActionDeclared` / `onActionResolved`
- `onAttackRoll` / `onDamageApply`
- `onConditionApply` / `onConditionExpire`
- `onShortRest` / `onLongRest`
- `onLevelUp`

Cada evento executa validadores e calculadoras em cadeia.

---

## 15) Contratos de API (mínimo recomendado)
### POST criação de ficha
Entrada:
- identificação;
- espécie/subespécie;
- antecedente;
- distribuição inicial;
- escolhas obrigatórias iniciais.

Saída:
- ficha consolidada;
- lista de pendências de escolha;
- log de validação.

### PUT evolução/edição
Entrada:
- deltas de escolhas;
- nível/XP;
- inventário;
- efeitos ativos.

Saída:
- ficha recalculada;
- erros de regra (se houver).

### POST simulação de ação
Entrada:
- contexto de combate;
- ator/alvo;
- ação declarada.

Saída:
- resultado da resolução;
- recursos consumidos;
- efeitos gerados.

---

## 16) Regras de validação (checklist para backend)
- impedir recurso negativo (`PV`, `PM`, `Estamina` < 0);
- impedir compra sem ponto/custo;
- impedir escolha sem pré-requisito;
- impedir uso em cooldown;
- impedir duplicação de regalia não cumulativa;
- impedir equipar item incompatível com proficiência/tamanho;
- recalcular ficha integral após cada mutação relevante.

---

## 17) Testes obrigatórios
### 17.1 Testes de unidade
- fórmulas de PV/PM/Estamina/Defesa/Acerto/Dano;
- interação elemental;
- condição e duração;
- compra de regalia com e sem pré-requisito.

### 17.2 Testes de integração
- fluxo completo de criação nível 1;
- subida de nível 1 → 3 com desbloqueio de classe primária;
- combate com aplicação de condição + descanso + expiração.

### 17.3 Testes de regressão de catálogo
Sempre que catálogo mudar, revalidar:
- IDs únicos;
- pré-requisitos válidos;
- referências cruzadas existentes.

---

## 18) Estratégia de implementação imediata no projeto
1. Unificar leitura de catálogos do frontend em contrato consumível pelo backend.
2. Criar módulo de `rule-engine` no backend para cálculo centralizado.
3. Persistir estado dinâmico de efeitos em `character_sections` (ou tabela dedicada).
4. Expor endpoint de simulação para a UI de ficha e combate rápido.
5. Versionar regra (`rule_version = 0.5`) para migração futura.

---

## 19) Critérios de aceite
Este documento é considerado atendido quando a aplicação:
1. cria ficha válida com regras obrigatórias de nível 1;
2. bloqueia escolhas inválidas por pré-requisito/custo;
3. calcula automaticamente atributos derivados e recursos;
4. resolve ação de combate com consumo de ação/recurso/efeitos;
5. aplica e expira condições corretamente;
6. suporta todas as categorias de catálogo: classes, especializações, itens, regalias e efeitos secundários.

---

## 20) Observação final
Para garantir cobertura de “tudo mais” sem perda de regra textual, toda entrada do documento [docs/Lâmina do Oculto 0.5.txt](docs/L%C3%A2mina%20do%20Oculto%200.5.txt) deve existir em formato estruturado (`JSON`) com `id_slug`, `tags`, `pré-requisitos`, `efeitos` e `metadados de duração/custo`. Sem essa normalização, a automação ficará parcial.