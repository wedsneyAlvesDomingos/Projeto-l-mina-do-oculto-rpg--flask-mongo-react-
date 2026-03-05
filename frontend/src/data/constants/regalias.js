/**
 * Dados centralizados de Regalias do sistema Lâmina do Oculto
 * Este arquivo contém as regalias de aprendiz e regalias opcionais.
 * Usado em: criarPersonagem.js, Wiki/classes
 */

// ============================================================================
// REGALIAS DE APRENDIZ (Classes iniciais)
// ============================================================================

export const regaliasDeAprendiz = [
    {
        id: 'combatente',
        nome: 'Combatente Aprendiz',
        descricao: `1 ponto em Força, Fortitude ou Destreza.
1 ponto em Combate Corpo a Corpo ou Combate À Distância.
Proficiência em Armas Marciais, Armaduras Leves e Médias, e Escudo Simples.
Habilidade: Recuperar Fôlego – Ação de turno completo para recuperar 4 PV (custa 2 Magia). Pode recuperar também 4 Estamina por mais 2 Magia.`
    },
    {
        id: 'novico',
        nome: 'Noviço(a) Aprendiz',
        descricao: `1 ponto em Teologia, Arcanismo ou Medicina.
1 ponto em Combate Arcano, Corpo a Corpo ou Distância.
Milagres: 
- Abençoar Água: sagrada por 1h, usada para encantar arma ou causar 1d12 em mortos-vivos.
- Facilitar Cura: cura até 4d6 PV de até 2 criaturas (10 min, 2 Magia).
- Tocha Sagrada: ilumina e cega mortos-vivos no 1º turno.`
    },
    {
        id: 'iniciado',
        nome: 'Iniciado(a) Aprendiz',
        descricao: `1 ponto em Arcanismo, Ritualismo ou Arcanatec.
1 ponto em Combate Arcano.
Magias:
- Míssil Arcano: 1d4 por míssil (2 Magia cada, até 5).
- Detectar Magia: detecta e identifica magia (2–6 Magia).
- Iluminação Arcana: cria luz por 1h (1 Magia).`
    },
    {
        id: 'feiticeiro',
        nome: 'Feiticeiro(a) Aprendiz',
        descricao: `1 ponto em Ocultismo ou Ritualismo.
1 ponto em Combate Arcano.
Feitiços:
- Orbe Caótico: 2d6 de dano de elemento aleatório (2 Magia).
- Azaralhar: alvo atordoado até próximo turno (4 Magia + chance).
- Luz Guia: cria luz por 1h (1 Magia).`
    },
    {
        id: 'diplomata',
        nome: 'Diplomata Aprendiz',
        descricao: `2 pontos em Persuasão ou Enganação.
1 ponto em Negociação.
2 pontos em Sedução e Intimidação.
Habilidade: Barganhar – negociação com serviços (não mercadorias), 1x por pessoa/semana.
Rolamento define desconto: 5% com sucesso moderado, maiores descontos com rolagens maiores.`
    },
    {
        id: 'explorador',
        nome: 'Explorador Aprendiz',
        descricao: `2 pontos em Rastreamento ou Investigação.
1 ponto em Sobrevivência e Navegação.
2 Pontos em Percepção ou Furtividade.
Proficiente com Ferramentas de ladrão.
Aprende a Habilidade:
Visão para abrigo:
Um explorador aprendiz consegue procurar um abrigo natural para proteger dos elementos. Se for calor demais que possa causar exaustão ele consegue achar um lugar para refrescar ou isolar do calor, ou então se for frio demais um abrigo quente para não sofrer com a temperatura. A chance de sucesso é de 100%. E se não houver abrigos naturais, ele pode criar um com elementos locais, mesmo se não tiver itens de acampamento. Além disso, um explorador aprendiz tem um bônus de + 2 em testes de sobrevivência para achar comida e água caso exista.`
    },
    {
        id: 'academico',
        nome: 'Acadêmico Aprendiz',
        descricao: `2 pontos em História ou Intuição
1 ponto em Jurisprudência e Teologia
2 Pontos em Medicina ou Natureza
Aprende a Habilidade:
Já li sobre isso:
Um acadêmico tem +2 em qualquer rolamento de conhecimento. Um acadêmico também recebe + 3 em testes de persuasão que o ajude a entrar em uma biblioteca, templo ou centro acadêmico com conhecimento registrado de alguma forma.`
    },
    {
        id: 'guardarPonto',
        nome: 'Guardar ponto',
        descricao: `Guarda este ponto de regalia para o próximo nível`
    }
];

// ============================================================================
// REGALIAS OPCIONAIS (Espécies Variantes)
// ============================================================================

export const regaliasOpcionais = {
    regalias_opcionais: [
        {
            tipo: "Psíquico",
            custo: 2,
            descricao: "Escolha um dos seguintes poderes psíquicos para começar:",
            opcoes: [
                {
                    nome: "Telecinese",
                    descricao: "O personagem tem a habilidade de mover objetos com a mente. O personagem consegue mover até um objeto de até 5 quilos que esteja em um alcance de até 30 metros de distância. O movimento não é veloz e não pode realizar ataques com armas com essa habilidade. Além disso, 3 vezes ao dia o personagem pode usar a sua reação para empurrar, 3 metros para a direção a sua escolha, uma criatura que se aproxime dele em uma distância de 3 metros."
                },
                {
                    nome: "Telepatia",
                    descricao: "Ler pensamentos e se comunicar mentalmente com outras pessoas. O personagem consegue manter conversas telepáticas com criaturas que a possa entender em até 27 metros de distância. Além disso, o jogador pode escolher tentar ler a mente, com 70% chance de sucesso, de alguém que possa ver em até 18 metros de distância. O jogador com sucesso em sua tentativa consegue ler os pensamentos superficiais do alvo, como o que ele está pensando no exato momento, contra a sua vontade."
                },
                {
                    nome: "Precognição",
                    descricao: "Consegue ter vislumbres do futuro, gerando flashes de eventos que ainda estão por acontecer. O jogador pode escolher passar em um teste de habilidade, desviar de um ataque certeiro ou acertar um ataque uma vez por dia, pois ele já sabia que aquilo ia acontecer e como."
                },
                {
                    nome: "Controle Mental",
                    descricao: "Capacidade de influenciar suavemente a mente dos outros, fazendo sugestões. O jogador ganha +2 em todos os rolamentos da aba social e uma vez por dia pode transformar esse bônus em um +10."
                }
            ]
        },
        {
            tipo: "Vampiro / Wight / Draugr",
            custo: 2,
            descricao: "Ao escolher ser um morto vivo, o personagem não pode ser curado por milagres. Escolha um dos seguintes poderes de mortos vivos para começar com (A habilidade Drenagem de Vida pode ser escolhido por qualquer tipo de morto vivo):",
            observacao: "Não pode ser curado por milagres.",
            opcoes: [
                {
                    nome: "Drenagem de Vida",
                    descricao: "O personagem pode sugar a energia vital de outras criaturas para se fortalecer. O jogador pode escolher, como uma ação, realizar um ataque de combate corpo a corpo e sugar a vitalidade de um alvo, causando 1d8 de dano necrótico e o curando em 5 pontos, ou realizar uma versão mais fraca à distância, causando apenas 1d4 de dano necrótico e curando em 3, com alcance de 9m. Essa habilidade pode ser utilizada até 3 vezes por descanso longo."
                },
                {
                    nome: "Transformação Noturna",
                    descricao: "Ganha poderes especiais durante a noite, como aumento de força, velocidade ou poderes sombrios. Um personagem morto vivo recebe 1,5 de bônus de velocidade movimento a noite. Sua capacidade de carga aumenta, como se fosse um tamanho maior na tabela, durante a noite. O personagem consegue escalar paredes sem a necessidade de testes ou redução de velocidade e ganha +3 em testes de furtividade à noite."
                },
                {
                    nome: "Hipnose",
                    descricao: "Hipnotiza suas vítimas com seu olhar ou voz, exercendo influência sobre elas. O personagem consegue utilizar as magias Hipnose e Voz de Comando uma vez cada por dia e sem custo de mana."
                }
            ]
        },
        {
            tipo: "Mutante",
            custo: 2,
            descricao: "Uma criatura que sofreu de alguma forma uma exposição a um efeito que mudou permanentemente sua aparência e fisionomia é considerada um mutante. O mutante tem uma penalidade de -2 em todos os testes da aba social, exceto intimidação, sempre que que tiver a mutação visível. Todos sabem que o personagem possui mutações, a não ser que o personagem a mantenha contida dentro de roupas, máscaras e afins. Ao escolher ser um mutante é necessário escolher apenas uma das opções abaixo:",
            penalidade: "-2 em testes da aba social (exceto Intimidação) com mutação visível.",
            opcoes: [
                {
                    nome: "Pele Escamosa",
                    descricao: "A pele do personagem se torna grossa e escamosa, fornecendo uma defesa natural a cortes e arranhões. A base do valor de defesa para o personagem sem armadura é de 10 ao invés de 7."
                },
                {
                    nome: "Olhos Multifacetados",
                    descricao: "Os olhos do personagem se multiplicam e adquirem uma aparência insectóide, concedendo visão ampliada e a capacidade de enxergar no escuro. Visão no escuro, e meia luz, com alcance de 27 metros e bônus de +2 em testes de percepção que envolvam visão. Além disso possui visão 360°"
                },
                {
                    nome: "Boca Abissal",
                    descricao: "A boca do personagem se expande, revelando uma mandíbula cheia de dentes afiados, permitindo ataques mordedores poderosos. Recebe uma arma natural com dano perfurante 1d10 + valor de força. Recebe +2 em testes de atletismo para agarrar um alvo com os dentes."
                },
                {
                    nome: "Membros Desproporcionais",
                    descricao: "Os membros do personagem se alongam ou encurtam, concedendo versatilidade. Aumentam o alcance de ameaça em 1,5 metros ou reduz a criatura em um tamanho na escala, com um mínimo de minúsculo."
                },
                {
                    nome: "Cauda Serpentina",
                    descricao: "Uma cauda serpentina cresce na parte inferior do corpo do personagem, permitindo uma maior capacidade de equilíbrio e agilidade em movimentos. O personagem ganha um bônus de +5 em testes de acrobacia para se equilibrar e consegue usar sua cauda para se segurar em beiradas, galhos e outros que possam ser enrolados por ela, deixando assim suas mãos livres. A cauda pode ser usada para segurar objetos mas não realizar ataques ou defender de ataques."
                },
                {
                    nome: "Garras Retráteis",
                    descricao: "O personagem desenvolve garras afiadas em suas mãos ou pés, fornecendo ataques mais letais e a habilidade de escalar superfícies verticais. Recebe uma arma natural com dano cortante 1d6 + valor de destreza. O personagem tem a capacidade de escalar superfícies verticais sem custo extra de movimento e sem necessidade de ferramentas extras."
                },
                {
                    nome: "Chifres Torcidos",
                    descricao: "Chifres retorcidos e sinuosos crescem na cabeça do personagem, conferindo maior resistência física e a capacidade de empurrar objetos pesados. O personagem recebe +2 em testes de atletismo para se manter em pé ou derrubar um alvo. Recebe uma arma natural com dano de impacto 1d6 + valor de força."
                },
                {
                    nome: "Exoesqueleto Ósseo",
                    descricao: "O corpo do personagem é envolvido por um exoesqueleto ósseo, tornando-o mais resistente a cortes. Se torna resistente ao dano cortante, porém se torna vulnerável ao dano de impacto. O exoesqueleto também aumenta a base do valor de defesa de 7 para 12."
                },
                {
                    nome: "Pernas de Aranha",
                    descricao: "O personagem desenvolve pernas extras semelhantes às de uma aranha, permitindo maior mobilidade e a habilidade de escalar paredes. Pode escalar sem gastar movimento extra e ganha um bônus de 1.5 metros no valor de velocidade. Ganha um bônus de +5 em testes de atletismo para agarrar e para não ser derrubado."
                },
                {
                    nome: "Braços Tentaculares",
                    descricao: "Braços adicionais em forma de tentáculos crescem no corpo do personagem, fornecendo uma vantagem de alcance em combate e a habilidade de agarrar objetos a distância. Recebe 1.5 metros a mais em seu alcance de ameaça e +2 em testes de atletismo para agarrar outra criatura."
                }
            ]
        }
    ]
};

// ============================================================================
// FUNÇÕES AUXILIARES
// ============================================================================

/**
 * Busca uma regalia de aprendiz pelo id
 * @param {string} id - ID da regalia
 * @returns {Object|null} Regalia encontrada ou null
 */
export const getRegaliaAprendiz = (id) => {
    return regaliasDeAprendiz.find(r => r.id === id) || null;
};

/**
 * Busca uma regalia de aprendiz pelo nome
 * @param {string} nome - Nome da regalia
 * @returns {Object|null} Regalia encontrada ou null
 */
export const getRegaliaAprendizPorNome = (nome) => {
    return regaliasDeAprendiz.find(r => 
        r.nome.toLowerCase().includes(nome.toLowerCase())
    ) || null;
};

/**
 * Lista regalias de aprendiz para select/dropdown
 * @returns {Array} Array de objetos {value, label}
 */
export const getRegaliasAprendizParaSelect = () => {
    return regaliasDeAprendiz.map(r => ({
        value: r.id,
        label: r.nome
    }));
};

/**
 * Busca um tipo de regalia opcional pelo tipo
 * @param {string} tipo - Tipo da regalia (Psíquico, Vampiro, Mutante)
 * @returns {Object|null} Regalia opcional encontrada ou null
 */
export const getRegaliaOpcional = (tipo) => {
    return regaliasOpcionais.regalias_opcionais.find(r => 
        r.tipo.toLowerCase().includes(tipo.toLowerCase())
    ) || null;
};

/**
 * Busca uma opção específica dentro de uma regalia opcional
 * @param {string} tipo - Tipo da regalia
 * @param {string} nomeOpcao - Nome da opção
 * @returns {Object|null} Opção encontrada ou null
 */
export const getOpcaoRegalia = (tipo, nomeOpcao) => {
    const regalia = getRegaliaOpcional(tipo);
    if (!regalia) return null;
    
    return regalia.opcoes.find(o => 
        o.nome.toLowerCase().includes(nomeOpcao.toLowerCase())
    ) || null;
};

/**
 * Lista todas as mutações disponíveis
 * @returns {Array} Array de opções de mutação
 */
export const getMutacoes = () => {
    const mutante = getRegaliaOpcional('Mutante');
    return mutante ? mutante.opcoes : [];
};

/**
 * Lista os tipos de regalias opcionais
 * @returns {Array} Array de objetos {value, label, custo}
 */
export const getTiposRegaliasOpcionais = () => {
    return regaliasOpcionais.regalias_opcionais.map(r => ({
        value: r.tipo,
        label: r.tipo,
        custo: r.custo,
        penalidade: r.penalidade || null
    }));
};

export default { regaliasDeAprendiz, regaliasOpcionais };
