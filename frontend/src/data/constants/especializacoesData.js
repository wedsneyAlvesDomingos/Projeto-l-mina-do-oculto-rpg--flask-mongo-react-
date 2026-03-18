// ============================================================================
// ESPECIALIZAÇÕES — Dados completos com regalias e habilidades
// ============================================================================

const especializacoesData = [
    // =====================================================================
    // ──── DO COMBATENTE ────
    // =====================================================================

    // ─── CAVALEIRO ───
    {
        id: 'cavaleiro',
        nome: 'Cavaleiro(a)',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { combatente_primario: 10 } },
        bonusPorRegalia: { pv: 6, estamina: 3, magia: 1 },
        descricao: 'Especialização em combate montado, liderança e proteção.',
        regaliaObrigatoria: {
            custo: 2,
            escolhasHabilidades: [
                { grupo: ['forca', 'fortitude', 'agilidade'], pontos: 1 },
                { grupo: ['combateCorpoACorpo', 'combateADistancia'], pontos: 1 }
            ],
            bonusHabilidades: { jurisprudencia: 2, conducaoTerrestre: 2 },
            escolhasBonusHabilidades: [{ grupo: ['persuasao', 'intimidacao'], pontos: 2 }],
            proficienciasGanhas: ['armaduras_pesadas', 'escudo_simples', 'escudo_pesado', 'escudo_duelo'],
            habilidadeClasse: {
                nome: 'Juramento de Honra',
                descricao: 'Ao se tornar cavaleiro, o personagem faz um juramento de honra e lealdade a alguém ou causa que queira servir. Um cavaleiro executando seu juramento ao entrar na condição À Beira da Morte não para de agir até que morra completamente ou seja incapacitado por outros meios.',
                tipo: 'passiva'
            }
        },
        regaliasAvulsas: [
            {
                id: 'cav_intervencao', nome: 'Intervenção', custo: 1, tipo: 'reacao',
                descricao: 'Quando um inimigo passar a 1,5m de distância, pode usar sua reação para impedir que ele prossiga, parando completamente sua ação de movimento. 60% de chance de sucesso.',
                custoEstamina: 4,
                efeito: { chanceSucesso: 60, condicao: 'Movimento impedido' },
                escalamento: { bonusChancePorEstaminaExtra: 5 }
            },
            {
                id: 'cav_combate_montado', nome: 'Combate Montado', custo: 1, tipo: 'passiva',
                descricao: 'Vantagem no rolamento de ataque quando luta em cima de uma montaria. Pode forçar um ataque a acertá-lo ao invés da montaria. Recebe 2d4 PV temporários toda rodada que a montaria estiver com todos os PV.'
            },
            {
                id: 'cav_aparar', nome: 'Aparar', custo: 1, tipo: 'reacao',
                descricao: 'Ao receber um ataque, antes do rolamento ser resolvido, aumenta o Valor de Defesa em 2 pontos neste ataque. Pode repetir na mesma rodada a 2 PE por uso adicional.',
                custoEstamina: 0,
                efeito: { bonusDefesa: 2 },
                escalamento: { custoEstaminaRepetirMesmoTurno: 2 }
            },
            {
                id: 'cav_levantar_moral', nome: 'Levantar Moral', custo: 1, tipo: 'ativa',
                descricao: 'Encoraja aliados em raio de 9m. Aliados encorajados ficam imunes a condição Aterrorizado e seu próximo rolamento de Combate tem vantagem.',
                custoAcoes: 1, custoEstamina: 5
            },
            {
                id: 'cav_liderar_ataque', nome: 'Liderar Ataque', custo: 1, tipo: 'ativa',
                descricao: 'Ao realizar um ataque, faz com que um aliado realize um ataque ao mesmo tempo como reação.',
                custoEstamina: 4
            },
            {
                id: 'cav_ripostar', nome: 'Ripostar', custo: 1, tipo: 'reacao',
                descricao: 'Quando uma criatura hostil erra um ataque corpo a corpo contra um aliado a até 3m, pode usar reação para contra-atacar. +4 PE por tentativa extra na mesma rodada.',
                custoEstamina: 4,
                escalamento: { custoEstaminaRepetirMesmoTurno: 4 }
            },
            {
                id: 'cav_fortaleza', nome: 'Fortaleza', custo: 2, tipo: 'ativa',
                descricao: 'Assume postura defensiva como parte de ação atacar (apenas um ataque). -2 acerto mas +3 Valor de Defesa até fim da rodada. +2 PE por turno adicional.',
                custoEstamina: 4, efeito: { bonusDefesa: 3 },
                escalamento: { custoEstaminaRepetirMesmoTurno: 2 }
            },
            {
                id: 'cav_desafio', nome: 'Desafio', custo: 1, tipo: 'ativa',
                descricao: 'Grita um desafio para criaturas (até valor de Intimidação) em até 6m. Todas devem atacá-lo ou não conseguem atacar ninguém nessa rodada.',
                custoAcoes: 1, custoEstamina: 1
            },
            {
                id: 'cav_vontade_inabalavel', nome: 'Vontade Inabalável', custo: 2, tipo: 'reacao',
                descricao: 'Passiva: -10% na chance de sucesso de tentativas de encantá-lo ou amedrontá-lo. Ativa: Reação para reduzir em mais 10% as chances.',
                custoEstamina: 3
            },
            {
                id: 'cav_golpe_heroico', nome: 'Golpe Heroico', custo: 3, tipo: 'ativa',
                descricao: 'Investida heroica: ataca todos os inimigos a 1,5m de um aliado que consiga alcançar. Causa dano da arma + atributo + 1d8, empurra 1,5m. -4 Valor de Defesa até o próximo turno.',
                custoAcoes: 2, custoEstamina: 3,
                efeito: { dano: '1d8', tipoDano: 'fisico' }
            },
            {
                id: 'cav_atropelar', nome: 'Atropelar', custo: 3, tipo: 'ativa',
                descricao: 'Apenas montado. Avança 18m causando 5d4 pontos de dano em todos os inimigos no caminho, 50% de chance de derrubá-los.',
                custoAcoes: 2, custoEstamina: 6,
                efeito: { dano: '5d4', tipoDano: 'impacto', chanceSucesso: 50, condicao: 'Derrubado' }
            }
        ]
    },

    // ─── CAÇADOR ───
    {
        id: 'cacador',
        nome: 'Caçador(a)',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { combatente_primario: 10 } },
        bonusPorRegalia: { pv: 5, estamina: 4, magia: 1 },
        descricao: 'Especialização em rastreamento, companheiro animal e combate natural.',
        regaliaObrigatoria: {
            custo: 2,
            escolhasHabilidades: [
                { grupo: ['forca', 'agilidade', 'destreza'], pontos: 1 },
                { grupo: ['combateCorpoACorpo', 'combateADistancia'], pontos: 1 }
            ],
            bonusHabilidades: { percepcao: 2, sobrevivencia: 2, armadilhas: 2, natureza: 2, rastreamento: 2 },
            habilidadeClasse: {
                nome: 'Capacidade de Adestrar Animais',
                descricao: 'Pode adestrar animais (teste Lidar com Animais, dificuldade 10 ou metade do PV da criatura). Animal adestrado é companheiro e age no turno do caçador. Bônus +5 em Medicina para tratar o companheiro. Companheiro ganha PV extra = 2× nível do caçador.',
                tipo: 'passiva'
            }
        },
        regaliasAvulsas: [
            {
                id: 'cac_ataque_veloz', nome: 'Ataque Veloz', custo: 1, tipo: 'ativa',
                descricao: 'Pode realizar um ataque a mais ao tomar ação de atacar. Apenas uma vez por ação.',
                custoEstamina: 1
            },
            {
                id: 'cac_concentracao', nome: 'Concentração', custo: 1, tipo: 'passiva',
                descricao: 'Aumenta o acerto em 2 pontos durante 10 rodadas. Custa 6 pontos de estâmina.',
                custoEstamina: 6
            },
            {
                id: 'cac_ataque_oportunidade', nome: 'Ataque de Oportunidade', custo: 2, tipo: 'reacao',
                descricao: 'Pode realizar ataque quando uma criatura sair da área de ameaça, ou atacar um aliado dentro do alcance.',
                custoEstamina: 2
            },
            {
                id: 'cac_trabalho_equipe', nome: 'Trabalho em Equipe', custo: 1, tipo: 'ativa',
                descricao: 'Ao atacar, comanda o Companheiro Animal para atacar junto sem gastar ação. Ao sofrer ataque, caçador e companheiro podem se auxiliar (+2 VD, até 3m de distância).',
                custoEstamina: 6
            },
            {
                id: 'cac_conexao_primitiva', nome: 'Conexão Primitiva', custo: 1, tipo: 'ativa',
                descricao: 'Compartilha sentidos com o companheiro animal, podendo ver e ouvir pelos sentidos dele simultaneamente. Dura 1 hora.',
                custoEstamina: 1
            },
            {
                id: 'cac_corpo_adaptativo', nome: 'Corpo Adaptativo', custo: 1, tipo: 'reacao',
                descricao: 'Passiva: Não se perde em ambientes naturais, até 1 mês sem comida e 10 dias sem água. Ativa: Reação ao receber dano de fogo ou gelo para reduzir pela metade.',
                custoEstamina: 4
            },
            {
                id: 'cac_instinto_cacador', nome: 'Instinto Caçador', custo: 2, tipo: 'ativa',
                descricao: 'Passiva: Vantagem em Rastreamento e Percepção ao perseguir. Ativa: Marca uma criatura visível. Enquanto marcada, sabe onde está (mesmo invisível). +1d6 dano extra. Dura 10 min.',
                custoAcoes: 1, custoEstamina: 1,
                efeito: { dano: '1d6', tipoDano: 'fisico' }
            },
            {
                id: 'cac_debilitar', nome: 'Debilitar', custo: 1, tipo: 'ativa',
                descricao: 'Ao atacar, reduz o movimento do inimigo pela metade. Pode reduzir a zero por +2 PE adicionais.',
                custoEstamina: 2,
                escalamento: { custoEstaminaRepetirMesmoTurno: 2 }
            },
            {
                id: 'cac_olho_aguia', nome: 'Olho de Águia', custo: 1, tipo: 'ativa',
                descricao: 'Ao atacar a distância, ignora meia cobertura. Pode ignorar 3/4 de cobertura por +1 PE.',
                custoEstamina: 1
            },
            {
                id: 'cac_chuva_ataques', nome: 'Chuva de Ataques', custo: 2, tipo: 'ativa',
                descricao: 'Ataca repetidamente em cone de 60°, 1,5m de altura e 27m de distância. Atinge todas as criaturas na área. Dano da arma + atributo + 1d10 por 1,5m² da criatura.',
                custoAcoes: 1, custoEstamina: 2,
                efeito: { dano: '1d10', tipoDano: 'fisico' }
            },
            {
                id: 'cac_expurgo', nome: 'Expurgo', custo: 3, tipo: 'ativa',
                descricao: 'Gira com golpes rápidos acertando todas as criaturas escolhidas em seu alcance de ameaça. Dano da arma + atributo + 1d10 em cada criatura.',
                custoAcoes: 2, custoEstamina: 5,
                efeito: { dano: '1d10', tipoDano: 'fisico' }
            },
            {
                id: 'cac_adestrar_dragao', nome: 'Adestrar Dragão', custo: 2, tipo: 'passiva',
                descricao: 'Pode adestrar dragões e transformá-los em seu Companheiro Animal.'
            },
            {
                id: 'cac_recuperar_folego', nome: 'Recuperar Fôlego Maior', custo: 1, tipo: 'ativa',
                descricao: 'Recupera 3d8 PV e 6 PE.',
                custoAcoes: 2, custoMagia: 1,
                efeito: { curaHP: '3d8' }
            }
        ]
    },

    // ─── ASSASSINO ───
    {
        id: 'assassino',
        nome: 'Assassino(a)',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { combatente_primario: 10 } },
        bonusPorRegalia: { pv: 4, estamina: 6, magia: 0 },
        descricao: 'Especialização em furtividade, venenos e dano preciso.',
        regaliaObrigatoria: {
            custo: 2,
            escolhasHabilidades: [
                { grupo: ['destreza', 'forca'], pontos: 1 },
                { grupo: ['combateCorpoACorpo', 'combateADistancia'], pontos: 1 }
            ],
            bonusHabilidades: { furtividade: 2, alquimia: 2, enganacao: 2, acrobacia: 2 },
            proficienciasGanhas: ['katares', 'presas_serpente', 'espada_laminas_duplas', 'katanas', 'armas_acuidade'],
            habilidadeClasse: {
                nome: 'Produção de Venenos',
                descricao: 'Consegue produzir venenos como um profissional herbalista com as três regalias de produção de veneno. Se já possuir, escolha outras regalias de qualquer profissão.',
                tipo: 'passiva'
            }
        },
        regaliasAvulsas: [
            {
                id: 'ass_bomba_fumaca', nome: 'Bomba de Fumaça', custo: 1, tipo: 'ativa',
                descricao: 'Arremessa bomba que cria névoa de 6m de raio. Fica obscurecido, +2 VD, vantagem em furtividade e +3m de movimento. Dura até fim do turno.',
                custoAcoes: 1, custoEstamina: 2
            },
            {
                id: 'ass_arma_secundaria', nome: 'Treinamento com Arma Secundária', custo: 1, tipo: 'passiva',
                descricao: 'Pré-requisito: Combate com duas armas. Não custa estâmina para duas armas e a segunda não precisa ser leve. A arma primária pode ser pesada.',
                preRequisitos: { regalia: 'combate_duas_armas' }
            },
            {
                id: 'ass_envenenar_arma', nome: 'Envenenar Arma', custo: 1, tipo: 'ativa',
                descricao: 'Como parte da ação atacar, aplica veneno na arma até fim do turno. Dano adicional depende do veneno.',
                custoEstamina: 4
            },
            {
                id: 'ass_golpe_hemorragico', nome: 'Golpe Hemorrágico', custo: 1, tipo: 'ativa',
                descricao: 'Ataca em ponto de alta circulação. Margem de crítico aumenta em 2 pontos e aplica condição Sangrando se causar dano.',
                custoAcoes: 1, custoEstamina: 4,
                efeito: { condicao: 'Sangrando' }
            },
            {
                id: 'ass_mesclar_sombras', nome: 'Mesclar-se às Sombras', custo: 1, tipo: 'ativa',
                descricao: 'Torna-se invisível em ambientes parcial ou completamente escuros. Engana visão noturna e sensors de vibração. Acaba se atacar ou entrar em luz completa.',
                custoAcoes: 2, custoEstamina: 3
            },
            {
                id: 'ass_esquiva_perfeita', nome: 'Esquiva Perfeita', custo: 2, tipo: 'reacao',
                descricao: 'Reduz dano de ataque em área pela metade. Pode gastar +4 PE para reduzir todo o dano. 1× ao dia completa sem custo.',
                custoEstamina: 2
            },
            {
                id: 'ass_executar', nome: 'Executar', custo: 2, tipo: 'ativa',
                descricao: 'Golpe preciso em ponto vital: -3 na margem de crítico, +1d8 dano. Se alvo sangrando: crítico automático e +3d8 dano adicional antes do crítico.',
                custoAcoes: 2, custoEstamina: 5,
                efeito: { dano: '1d8', tipoDano: 'fisico' }
            },
            {
                id: 'ass_ataque_oportunidade', nome: 'Ataque de Oportunidade', custo: 1, tipo: 'reacao',
                descricao: 'Pode atacar quando criatura sair da área de ameaça ou atacar aliado no alcance.',
                custoEstamina: 1
            },
            {
                id: 'ass_troco', nome: 'Troco', custo: 1, tipo: 'reacao',
                descricao: 'Quando inimigo erra ataque corpo a corpo, contra-ataca com vantagem no acerto. 1×/turno, +3 PE por uso extra.',
                custoEstamina: 2,
                escalamento: { custoEstaminaRepetirMesmoTurno: 3 }
            },
            {
                id: 'ass_finta_rapida', nome: 'Finta Rápida', custo: 1, tipo: 'ativa',
                descricao: 'Ataque com finta: vantagem no rolamento de ataque. Se acertar, aplica condição Devagar até o próximo turno.',
                custoAcoes: 1, custoEstamina: 5,
                efeito: { condicao: 'Devagar' }
            },
            {
                id: 'ass_mestre_flanco', nome: 'Mestre do Flanco', custo: 1, tipo: 'passiva',
                descricao: 'Pré-requisito: Combate de Emboscada. Ao lutar com inimigo na distância de ameaça de um aliado, todo ataque causa 1d6 dano adicional.',
                preRequisitos: { regalia: 'combate_emboscada' }
            },
            {
                id: 'ass_furia_laminas', nome: 'Fúria de Lâminas', custo: 2, tipo: 'ativa',
                descricao: 'Sequência de golpes = valor de Agilidade (contam como um ataque). Cada golpe que acerta soma +1d8 dano extra.',
                custoAcoes: 2, custoEstamina: 10,
                efeito: { dano: '1d8', tipoDano: 'cortante' }
            }
        ]
    },

    // ─── BÁRBARO ───
    {
        id: 'barbaro',
        nome: 'Bárbaro(a)',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { combatente_primario: 10 } },
        bonusPorRegalia: { pv: 8, estamina: 2, magia: 0 },
        descricao: 'Especialização em fúria, resistência e combate brutal.',
        regaliaObrigatoria: {
            custo: 2,
            escolhasHabilidades: [
                { grupo: ['forca', 'destreza'], pontos: 1 },
                { grupo: ['combateCorpoACorpo', 'fortitude'], pontos: 1 }
            ],
            bonusHabilidades: { atletismo: 2, agilidade: 2, intimidacao: 2 },
            proficienciasGanhas: ['espada_taurica', 'machado_taurico', 'machado_anao', 'montante_cinetico', 'manopla_espinhos'],
            habilidadeClasse: {
                nome: 'Estado Enfurecido',
                descricao: 'Ao entrar nesse estado: +1 acerto, +2 dano com ataques de força, +2 Atletismo (não afeta PE). Penalidade de -2 em conhecimentos. Dura enquanto em combate ou grande esforço (sai após 5 rodadas sem atacar/sofrer dano/atletismo). Custa 4 PE.',
                tipo: 'ativa',
                custoEstamina: 4
            }
        },
        regaliasAvulsas: [
            {
                id: 'bar_couraca', nome: 'Couraça', custo: 1, tipo: 'passiva',
                descricao: 'Se não usar armadura, soma o valor de Fortitude ao Valor de Defesa (máximo +8).'
            },
            {
                id: 'bar_impeto_furioso', nome: 'Ímpeto Furioso', custo: 1, tipo: 'passiva',
                descricao: 'Quando entrar no estado Enfurecido, fica imune a ser Encantado ou Amedrontado. Custa 4 PE.',
                custoEstamina: 4
            },
            {
                id: 'bar_ataque_veloz', nome: 'Ataque Veloz', custo: 1, tipo: 'ativa',
                descricao: 'Pode realizar um ataque a mais na ação de atacar. Apenas uma vez por ação.',
                custoEstamina: 2
            },
            {
                id: 'bar_forca_superior', nome: 'Força Superior', custo: 2, tipo: 'passiva',
                descricao: 'Pré-requisito: 6 pontos em Força. Pode manipular armas de duas mãos em uma única mão.',
                preRequisitos: { habilidade: { forca: 6 } }
            },
            {
                id: 'bar_forca_excessiva', nome: 'Força Excessiva', custo: 2, tipo: 'ativa',
                descricao: 'Pré-requisito: 10 em Força e Força Superior. Manipula duas armas de duas mãos, uma em cada mão. Apenas durante estado Enfurecido.',
                custoAcoes: 1, custoEstamina: 10,
                preRequisitos: { habilidade: { forca: 10 }, regalia: 'bar_forca_superior' }
            },
            {
                id: 'bar_urro_amedrontador', nome: 'Urro Amedrontador', custo: 1, tipo: 'ativa',
                descricao: 'Ruge para criaturas em até 6m. 50% de chance de ficarem Aterrorizadas até fim do próximo turno.',
                custoAcoes: 1, custoEstamina: 5,
                efeito: { chanceSucesso: 50, condicao: 'Aterrorizado' },
                escalamento: { bonusChancePorEstaminaExtra: 5 }
            },
            {
                id: 'bar_dizimar', nome: 'Dizimar', custo: 2, tipo: 'ativa',
                descricao: 'Ataque giratório na área de ameaça: dano da arma + atributo + 1d6 em todos os inimigos, aplica Sangrando. Pode girar novamente por +8 PE.',
                custoAcoes: 2, custoEstamina: 10,
                efeito: { dano: '1d6', tipoDano: 'fisico', condicao: 'Sangrando' }
            },
            {
                id: 'bar_golpe_imprudente', nome: 'Golpe Imprudente', custo: 1, tipo: 'ativa',
                descricao: 'Ganha vantagem em todos os rolamentos de ataque neste turno. Em retorno, todos os ataques contra o bárbaro até o próximo turno têm vantagem.',
                custoAcoes: 1, custoEstamina: 2
            },
            {
                id: 'bar_ferocidade', nome: 'Ferocidade', custo: 1, tipo: 'passiva',
                descricao: 'Quando acerto crítico ou reduzir inimigo a 0 PV no turno, pode realizar uma ação Atacar adicional. Máximo 1× por turno.'
            },
            {
                id: 'bar_furia_implacavel', nome: 'Fúria Implacável', custo: 1, tipo: 'reacao',
                descricao: 'Pré-requisito: Enfurecido. Ao ser reduzido a 0 PV e entrar em À Beira da Morte, continua lutando normalmente até morrer ou ser curado. Custa todos os PE restantes.',
                preRequisitos: { estado: 'enfurecido' }
            },
            {
                id: 'bar_bater_escudo', nome: 'Bater com Escudo', custo: 1, tipo: 'ativa',
                descricao: 'Pré-requisito: Enfurecido e Combate Defensivo. Usa escudo como arma: 1d6 dano de impacto.',
                preRequisitos: { estado: 'enfurecido', regalia: 'combate_defensivo' },
                efeito: { dano: '1d6', tipoDano: 'impacto' }
            },
            {
                id: 'bar_avanco_implacavel', nome: 'Avanço Implacável', custo: 1, tipo: 'ativa',
                descricao: 'Pré-requisitos: Enfurecido e Bater com Escudo. Avança 9m em linha reta com escudo. Empurra alvos. Múltiplos alvos se chocam: 2d8 dano. Se terminar em parede: 4d8 dano adicional.',
                custoAcoes: 2, custoEstamina: 4,
                preRequisitos: { estado: 'enfurecido', regalia: 'bar_bater_escudo' },
                efeito: { dano: '2d8', tipoDano: 'impacto' }
            }
        ]
    },

    // =====================================================================
    // ──── DO NOVIÇO ────
    // =====================================================================

    // ─── SACERDOTE ───
    {
        id: 'sacerdote',
        nome: 'Sacerdote',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { novico_primario: 10 } },
        bonusPorRegalia: { pv: 4, estamina: 0, magia: 6 },
        descricao: 'Especialização em cura avançada, ressurreição e proteção divina.',
        regaliaObrigatoria: {
            custo: 2,
            escolhasHabilidades: [
                { grupo: ['arcanismo', 'fortitude'], pontos: 1 },
                { grupo: ['combateArcano', 'arcanismo'], pontos: 1 }
            ],
            bonusHabilidades: { medicina: 2, teologia: 2, intuicao: 2, percepcao: 2 },
            habilidadeClasse: {
                nome: 'Cura Maior',
                descricao: 'Milagre: Cura 3d4 PV de até 5 aliados em até 18m. Custa 1 PM. +1d4 PV para cada 2 PM adicionais. 1× sem custo por descanso longo.',
                tipo: 'milagre',
                custoAcoes: 1, custoMagia: 1,
                efeito: { curaHP: '3d4' },
                escalamento: { bonusCuraPor2Magia: '1d4' }
            }
        },
        regaliasAvulsas: [
            {
                id: 'sac_cura_estendida', nome: 'Cura Maior Estendida', custo: 1, tipo: 'passiva',
                descricao: 'Quando conjura Cura Maior, a cura se repete no turno seguinte nos alvos afetados.'
            },
            {
                id: 'sac_cura_melhorada', nome: 'Cura Maior Melhorada', custo: 1, tipo: 'passiva',
                descricao: 'Ao realizar Cura Maior, pode aplicar o efeito de Abençoar nas criaturas escolhidas.'
            },
            {
                id: 'sac_abencoar_melhorado', nome: 'Abençoar Arma Melhorado', custo: 1, tipo: 'ativa',
                descricao: 'Pré-requisito: Abençoar Arma. Abençoa até 5 armas, muda dano para Sagrado por 10 rodadas. +1d4 dano.',
                custoAcoes: 1, custoMagia: 1,
                preRequisitos: { regalia: 'abencoar_arma' },
                efeito: { dano: '1d4', tipoDano: 'sagrado' }
            },
            {
                id: 'sac_sacrificio', nome: 'Sacrifício', custo: 1, tipo: 'ativa',
                descricao: 'Coloca a si mesmo À Beira da Morte e consome metade da mana (mínimo 10) para salvar aliados À Beira da Morte. Chance de 5% por pessoa salva de voltar com 2d10 PV e PM.',
                custoAcoes: 1,
                efeito: { chanceSucesso: 5, curaHP: '2d10' }
            },
            {
                id: 'sac_ressuscitar', nome: 'Ressuscitar', custo: 1, tipo: 'ativa',
                descricao: 'Restaura criatura morta (até 10 min da morte) com 10 PV, porém com Cansado 4. 1× por dia por criatura.',
                custoAcoes: 1, custoMagia: 10,
                efeito: { curaHP: 10 }
            },
            {
                id: 'sac_restauracao_maior', nome: 'Restauração Maior', custo: 1, tipo: 'ativa',
                descricao: 'Toca o alvo e remove por completo: Envenenado, um nível de Congelado, Queimando e um nível de Cansado.',
                custoAcoes: 1, custoMagia: 10
            },
            {
                id: 'sac_critico_guiado', nome: 'Crítico Guiado', custo: 1, tipo: 'reacao',
                descricao: 'Aumenta a margem de crítico de uma criatura em até 18m em +2, num ataque.',
                custoMagia: 5
            },
            {
                id: 'sac_empatia', nome: 'Empatia', custo: 1, tipo: 'ativa',
                descricao: 'Cria ligação com aliado e divide dor e dano recebido por ele. Define quantos pontos quer absorver.',
                custoAcoes: 1, custoMagia: 2
            },
            {
                id: 'sac_silencio', nome: 'Silêncio', custo: 1, tipo: 'ativa',
                descricao: 'Impede todos os alvos em 3m de raio (até 90 pés de alcance) de usar manobras, magias, feitiços ou milagres até fim do próximo turno.',
                custoAcoes: 1, custoMagia: 5
            },
            {
                id: 'sac_clemencia', nome: 'Clemência', custo: 1, tipo: 'ativa',
                descricao: 'Abençoa todos aliados em até 9m com Abençoar e marca todos inimigos com Marca Divina.',
                custoAcoes: 1, custoMagia: 10
            }
        ]
    },

    // ─── EXORCISTA ───
    {
        id: 'exorcista',
        nome: 'Exorcista',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { novico_primario: 10 } },
        bonusPorRegalia: { pv: 5, estamina: 0, magia: 5 },
        descricao: 'Especialização em purificação, dano sagrado e combate contra corruptores.',
        regaliaObrigatoria: {
            custo: 2,
            escolhasHabilidades: [
                { grupo: ['combateArcano', 'arcanismo'], pontos: 1 },
                { grupo: ['combateArcano', 'ocultismo'], pontos: 1 }
            ],
            bonusHabilidades: { ritualismo: 2, teologia: 2, historia: 2 },
            habilidadeClasse: {
                nome: 'Purificar Corruptores',
                descricao: 'Milagre: Purifica corruptores em raio de 9m. Mortos-vivos e demônios sofrem 2d10 de dano e perdem uma ação no próximo turno. Custa 3 PM.',
                tipo: 'milagre',
                custoAcoes: 2, custoMagia: 3,
                efeito: { dano: '2d10', tipoDano: 'sagrado' }
            }
        },
        regaliasAvulsas: [
            {
                id: 'exo_julgar_alma', nome: 'Julgar Alma', custo: 1, tipo: 'milagre',
                descricao: 'Criatura fica cega, surda e restringida até fim do turno. Depois, 30% de chance de sofrer 5d10 dano. +5% por 5 PM extras.',
                custoAcoes: 1, custoMagia: 5,
                efeito: { dano: '5d10', tipoDano: 'sagrado', chanceSucesso: 30, condicao: 'Cego, Surdo, Restringido' },
                escalamento: { bonusChancePorMagiaExtra: 1 }
            },
            {
                id: 'exo_explosao_sagrada', nome: 'Explosão Sagrada', custo: 1, tipo: 'passiva',
                descricao: 'Ao conjurar Chama Sagrada, explode o alvo e todos a até 6m. Dano normal na área. +1d8 dano extra em mortos-vivos.'
            },
            {
                id: 'exo_marca_julgamento', nome: 'Marca do Julgamento', custo: 1, tipo: 'passiva',
                descricao: 'Marca Divina causa dano inicial e pode causar dano toda rodada ao conjurar qualquer milagre (sem ação extra). +1d8 em mortos-vivos e demônios.'
            },
            {
                id: 'exo_combate', nome: 'Exorcista de Combate', custo: 2, tipo: 'passiva',
                descricao: '+1 Fortitude, +1 Agilidade, +2 C. Corpo a Corpo ou Distância, +1 Força ou Destreza. Proficiência com todas as armas simples/marciais, escudos e armaduras.',
                bonusHabilidades: { fortitude: 1, agilidade: 1 },
                proficienciasGanhas: ['armas_simples', 'armas_marciais', 'escudos', 'armaduras']
            },
            {
                id: 'exo_esfera_completa', nome: 'Esfera Divina Completa', custo: 1, tipo: 'milagre',
                descricao: 'Acumula até 5 esferas sagradas por vez (dura 1h). Projeta luz 3m, protege contra controle mental (-10% chance/esfera). 2 PM por esfera.',
                custoAcoes: 2, custoMagia: 2
            },
            {
                id: 'exo_atirar_esfera', nome: 'Atirar Esfera Divina', custo: 2, tipo: 'milagre',
                descricao: 'Pré-requisito: Esfera Divina, Teologia 4, Ocultismo 4. Atira esferas divinas: 2d10 dano por esfera, +1d10 em corruptores. 4 PM por esfera.',
                custoAcoes: 2, custoMagia: 4,
                preRequisitos: { habilidade: { teologia: 4, ocultismo: 4 } },
                efeito: { dano: '2d10', tipoDano: 'sagrado' }
            },
            {
                id: 'exo_protecao_sombrio', nome: 'Proteção contra o Sombrio', custo: 2, tipo: 'ativa',
                descricao: 'Área protetora de 18m de raio: desvantagem em ataques de corruptores. +1 C. Arcano por aliado protegido.',
                custoAcoes: 1, custoMagia: 5
            },
            {
                id: 'exo_oracao_reflexao', nome: 'Oração de Reflexão', custo: 2, tipo: 'milagre',
                descricao: 'Pré-requisito: Esfera Divina. Gira esferas para defesa: ao receber ataque causa 1d8 dano por esfera no atacante. Dura 5 turnos.',
                custoAcoes: 2, custoMagia: 10,
                preRequisitos: { regalia: 'esfera_divina' },
                efeito: { dano: '1d8', tipoDano: 'sagrado' }
            },
            {
                id: 'exo_lente_melhorada', nome: 'Lente Investigativa Melhorada', custo: 1, tipo: 'passiva',
                descricao: 'Aumenta alcance de Lente Investigativa em 6m, +10 min duração. Causa 1d4 dano/rodada a mortos-vivos e demônios na área. Ilumina área escura.'
            },
            {
                id: 'exo_arma_divina', nome: 'Arma Divina', custo: 1, tipo: 'milagre',
                descricao: 'Invoca arma divina astral flutuante a 1,5m. Move até 9m como ação. Causa 1d12 dano. Dura 10 rodadas.',
                custoAcoes: 1, custoMagia: 6,
                efeito: { dano: '1d12', tipoDano: 'sagrado' }
            }
        ]
    },

    // =====================================================================
    // ──── ESPECIALIZAÇÕES MISTAS ────
    // =====================================================================

    // ─── MONGE ───
    {
        id: 'monge',
        nome: 'Monge',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { combatente_primario: 7, novico_primario: 3 } },
        bonusPorRegalia: { pv: 4, estamina: 4, magia: 2 },
        descricao: 'Especialização em ki, chakras e combate desarmado.',
        regaliaObrigatoria: {
            custo: 2,
            escolhasHabilidades: [
                { grupo: ['forca', 'destreza'], pontos: 1 },
                { grupo: ['combateCorpoACorpo', 'fortitude'], pontos: 1 }
            ],
            bonusHabilidades: { atletismo: 2, agilidade: 2, acrobacia: 2 },
            proficienciasGanhas: ['lanca_mola', 'manopla_espinhos'],
            habilidadeClasse: {
                nome: 'Canalizar Ki',
                descricao: 'Ação livre: ao canalizar ki sem armadura pesada, ganha +2 VD e vantagem em Percepção. Dura 1 minuto, renovável. Custa 3 PM.',
                tipo: 'ativa',
                custoAcoes: 0, custoMagia: 3
            }
        },
        regaliasAvulsas: [
            {
                id: 'mon_chakra_base', nome: 'Abrir Chakra da Base', custo: 1, tipo: 'passiva',
                descricao: 'Ao canalizar ki: resistente a envenenado, resistente a dano de terra, -5% chance de efeitos de controle mental.'
            },
            {
                id: 'mon_chakra_abdominal', nome: 'Abrir Chakra Abdominal', custo: 1, tipo: 'passiva',
                descricao: 'Ao canalizar ki: impossível ser derrubado, resistente a dano de gelo, +3m de velocidade de movimento.'
            },
            {
                id: 'mon_chakra_plexo', nome: 'Abrir Chakra do Plexo Solar', custo: 1, tipo: 'passiva',
                descricao: 'Ao canalizar ki: resistente a dano sombrio e fogo, -5% chance de efeitos de controle mental.'
            },
            {
                id: 'mon_chakra_coracao', nome: 'Abrir Chakra do Coração', custo: 1, tipo: 'passiva',
                descricao: 'Ao canalizar ki: vantagem em acrobacia para escapar agarramentos, resistente a dano de ar, terreno difícil não afeta movimento.'
            },
            {
                id: 'mon_chakra_garganta', nome: 'Abrir Chakra da Garganta', custo: 1, tipo: 'passiva',
                descricao: 'Ao canalizar ki: vantagem dupla em testes Sociais, vantagem em intuição, imune a surdo, impossível silenciar.'
            },
            {
                id: 'mon_chakra_terceiro_olho', nome: 'Abrir Chakra do Terceiro Olho', custo: 1, tipo: 'passiva',
                descricao: 'Ao canalizar ki: vê através de ilusões até 12m, lê lábios até 100m, imune a cego.'
            },
            {
                id: 'mon_chakra_coroa', nome: 'Abrir Chakra da Coroa', custo: 1, tipo: 'passiva',
                descricao: 'Pré-requisito: Todos os chakras abertos. Vantagem dupla em Conhecimento, imune a amedrontado. Pode criar projeção astral até 100m.',
                preRequisitos: { regalia: 'todos_chakras' }
            },
            {
                id: 'mon_ataque_veloz', nome: 'Ataque Veloz', custo: 1, tipo: 'ativa',
                descricao: 'Pode realizar ataque extra na ação de atacar. 1×/ação.',
                custoEstamina: 2
            },
            {
                id: 'mon_furia_ataques', nome: 'Fúria de Ataques', custo: 2, tipo: 'ativa',
                descricao: 'Ao usar ação atacar, pode atacar novamente. Combinável com Ataque Veloz.',
                custoEstamina: 2
            },
            {
                id: 'mon_corpo_fechado', nome: 'Corpo Fechado', custo: 1, tipo: 'ativa',
                descricao: 'Posição defensiva meditativa: imune a todas condições e resistente a todo dano (só na rodada). Ao sair: +2 PE, +1 PM, +3d8 PV. CD: 1 min.',
                custoAcoes: 3, custoEstamina: 2, custoMagia: 1,
                efeito: { curaHP: '3d8' }
            },
            {
                id: 'mon_fortalecer_fisico', nome: 'Fortalecer Físico', custo: 2, tipo: 'passiva',
                descricao: 'Ao canalizar ki: +2 em Força, Destreza, C. Corpo a Corpo, Agilidade e Acrobacia (pode ultrapassar 15).'
            },
            {
                id: 'mon_fluir_agua', nome: 'Fluir como Água, Golpear como Pedra', custo: 2, tipo: 'passiva',
                descricao: '+4 acerto em ataques desarmados e +1 defesa sem armadura pesada.'
            },
            {
                id: 'mon_ataque_oportunidade', nome: 'Ataque de Oportunidade', custo: 2, tipo: 'reacao',
                descricao: 'Pode atacar quando criatura sair da área de ameaça ou atacar aliado no alcance.',
                custoEstamina: 2
            },
            {
                id: 'mon_desviar_projeteis', nome: 'Desviar Projéteis', custo: 1, tipo: 'reacao',
                descricao: 'Ao ser acertado por projétil, teste de Acrobacia (dificuldade = acerto do ataque). Sucesso: sem dano. 19-20: arremessa de volta até 9m.',
                custoEstamina: 5
            }
        ]
    },

    // ─── INQUISIDOR ───
    {
        id: 'inquisidor',
        nome: 'Inquisidor',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { combatente_primario: 5, novico_primario: 5 } },
        bonusPorRegalia: { pv: 5, estamina: 3, magia: 2 },
        descricao: 'Especialização em combate divino, armadura de fé e punição sagrada.',
        regaliaObrigatoria: {
            custo: 2,
            escolhasHabilidades: [
                { grupo: ['combateArcano', 'arcanismo'], pontos: 1 },
                { grupo: ['combateArcano', 'combateCorpoACorpo'], pontos: 1 }
            ],
            bonusHabilidades: { ritualismo: 2, teologia: 2, conducaoTerrestre: 2 },
            habilidadeClasse: {
                nome: 'Punição e Purificação',
                descricao: 'Passiva: Todo ataque físico ganha +1d4 dano sagrado. Ativa: Ao acertar ataque físico, causa 2d10 dano sagrado extra. Custa 5 PM.',
                tipo: 'ativa',
                custoMagia: 5,
                efeito: { dano: '2d10', tipoDano: 'sagrado' }
            }
        },
        regaliasAvulsas: [
            {
                id: 'inq_armadura_fe', nome: 'Armadura de Fé', custo: 3, tipo: 'milagre',
                descricao: 'Conjura armadura completa de energia sagrada (média mas protege como pesada). VD 20, com escudo 23. Dura 8h.',
                custoAcoes: 3, custoMagia: 15
            },
            {
                id: 'inq_armamento_divino', nome: 'Armamento Divino', custo: 1, tipo: 'milagre',
                descricao: 'Conjura arma simples/marcial de energia sagrada. Dano igual à original + 1d6 extra sagrado. Dura 1h.',
                custoAcoes: 1, custoMagia: 5,
                efeito: { dano: '1d6', tipoDano: 'sagrado' }
            },
            {
                id: 'inq_ascensao_celeste', nome: 'Ascensão Celeste', custo: 2, tipo: 'milagre',
                descricao: 'Recebe asas com velocidade de voo igual à de movimento. Dura 10 rodadas.',
                custoAcoes: 1, custoMagia: 8
            },
            {
                id: 'inq_montaria_celeste', nome: 'Montaria Celeste', custo: 2, tipo: 'milagre',
                descricao: 'Conjura montaria divina com 9m de movimento, dura 8h, não cansa. Montado: carrega o dobro e vantagem no acerto.',
                custoAcoes: 2, custoMagia: 7
            },
            {
                id: 'inq_aparar', nome: 'Aparar', custo: 1, tipo: 'reacao',
                descricao: 'Ao receber ataque, +2 VD neste ataque. Com armadura de fé: +3 VD. Pode repetir a +2 PE.',
                custoEstamina: 2,
                efeito: { bonusDefesa: 2 },
                escalamento: { custoEstaminaRepetirMesmoTurno: 2 }
            },
            {
                id: 'inq_cruzada_implacavel', nome: 'Cruzada Implacável', custo: 2, tipo: 'ativa',
                descricao: 'Apenas montado em Montaria Celeste. Avança 12m causando 2d6 dano sagrado em todos os inimigos, 30% de empurrá-los.',
                custoAcoes: 1, custoEstamina: 4,
                efeito: { dano: '2d6', tipoDano: 'sagrado', chanceSucesso: 30, condicao: 'Empurrado' }
            },
            {
                id: 'inq_bater_escudo', nome: 'Bater com Escudo', custo: 1, tipo: 'passiva',
                descricao: 'Pré-requisito: Armadura de Fé e Combate Defensivo. Escudo como arma secundária: 1d8 dano sagrado.',
                preRequisitos: { regalia: ['inq_armadura_fe', 'combate_defensivo'] },
                efeito: { dano: '1d8', tipoDano: 'sagrado' }
            },
            {
                id: 'inq_marca_punicao', nome: 'Marca da Punição', custo: 2, tipo: 'passiva',
                descricao: 'Marca Divina causa dano inicial e novamente toda rodada ao acertar ataque físico. Dobro de dano em mortos-vivos e demônios. +1d6 com armamento divino.'
            },
            {
                id: 'inq_empatia_combate', nome: 'Empatia de Combate', custo: 1, tipo: 'ativa',
                descricao: 'Cria ligação em combate para dividir dano do aliado (mínimo 1). Com armadura de fé: recebe apenas metade do dano dividido.',
                custoAcoes: 1, custoMagia: 2
            },
            {
                id: 'inq_guerreiro_fe', nome: 'Guerreiro da Fé', custo: 3, tipo: 'passiva',
                descricao: 'Imune a envenenado, resistente a dano sagrado, imune a doenças. Armamento Divino e Montaria Celeste 1×/dia grátis. Armadura de Fé e Ascensão Celeste: primeira conjuração custa 3 PM.'
            }
        ]
    },

    // ─── PROFANO ───
    {
        id: 'profano',
        nome: 'Profano',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { feiticeiro_primario: 5, novico_primario: 5 } },
        bonusPorRegalia: { pv: 3, estamina: 0, magia: 7 },
        descricao: 'Especialização em magia necrótica, corrupção divina e heresia.',
        restricoes: ['deidade_maligna_ou_neutra'],
        regaliaObrigatoria: {
            custo: 2,
            escolhasHabilidades: [
                { grupo: ['ocultismo', 'ritualismo'], pontos: 1 },
                { grupo: ['combateArcano', 'arcanismo'], pontos: 1 }
            ],
            bonusHabilidades: { teologia: 2, intuicao: 2, historia: 2, medicina: 2 },
            proficienciasGanhas: ['escudos'],
            habilidadeClasse: {
                nome: 'Ovelha Perdida',
                descricao: 'Milagres de dano sagrado passam a causar dano necrótico. Ao cometer atos de heresia contra deuses bons, recebe runas no braço (até 3) usáveis como runas de feiticeiro.',
                tipo: 'passiva'
            }
        },
        regaliasAvulsas: [
            {
                id: 'pro_amaldicoar_arma', nome: 'Amaldiçoar Arma Melhorado', custo: 1, tipo: 'ativa',
                descricao: 'Pré-requisito: Abençoar Arma. Amaldiçoa até 5 armas: dano muda para Necrótico por 10 rodadas, +1d4 dano.',
                custoAcoes: 1, custoMagia: 1,
                efeito: { dano: '1d4', tipoDano: 'necrotico' }
            },
            {
                id: 'pro_empatia_maliciosa', nome: 'Empatia Maliciosa', custo: 1, tipo: 'ativa',
                descricao: 'Liga-se a um alvo (50% chance se involuntário). Todo dano do profano pode ser dividido pela metade com o alvo. Alvo involuntário: rola 1d4 para divisão.',
                custoAcoes: 1, custoMagia: 8,
                efeito: { chanceSucesso: 50 }
            },
            {
                id: 'pro_turbilhao_gritos', nome: 'Turbilhão de Gritos', custo: 1, tipo: 'milagre',
                descricao: 'Grita injúrias: alvo fica Surdo, Mudo e impossibilitado de usar habilidades até fim do próximo turno.',
                custoAcoes: 1, custoMagia: 6,
                efeito: { condicao: 'Surdo, Mudo, Silenciado' }
            },
            {
                id: 'pro_manchar_alma', nome: 'Manchar Alma', custo: 2, tipo: 'feitico',
                descricao: '60% de chance de cegar, surdir e restringir alvo até fim do turno. Depois: 30% de 6d10 dano necrótico, senão 2d10. +5% por 2 PM extras.',
                custoAcoes: 3, custoMagia: 10,
                efeito: { dano: '6d10', tipoDano: 'necrotico', chanceSucesso: 60, condicao: 'Cego, Surdo, Restringido' },
                escalamento: { bonusChancePor2Magia: 5 }
            },
            {
                id: 'pro_protecao_sagrado', nome: 'Proteção contra o Sagrado', custo: 1, tipo: 'ativa',
                descricao: 'Área protetora de 9m de raio: -4 acerto para celestiais e divinos, -2 para outros. +1 C. Arcano por aliado protegido.',
                custoAcoes: 1, custoMagia: 7
            },
            {
                id: 'pro_lente_melhorada', nome: 'Lente Investigativa Melhorada', custo: 1, tipo: 'passiva',
                descricao: '+6m alcance, +10 min duração. Área iluminada em meia luz, criaturas destacadas. Mentiras infligem 1d6 dano sagrado.'
            },
            {
                id: 'pro_asas', nome: 'Asas', custo: 1, tipo: 'ativa',
                descricao: 'Pré-requisito: Elixir Padrão. Ao tomar elixir, asas aparecem com velocidade de voo = velocidade de movimento.',
                custoMagia: 4
            },
            {
                id: 'pro_confusao', nome: 'Confusão', custo: 1, tipo: 'feitico',
                descricao: 'Cria 10 cópias de si em até 9m. Criaturas que passam ou atacam cópias: 50% de atordoar por 1 turno. Pode trocar posição com cópia até 18m. Dura 10 rodadas.',
                custoAcoes: 1, custoMagia: 5,
                efeito: { chanceSucesso: 50, condicao: 'Atordoado' },
                escalamento: { bonusChancePorMagiaExtra: 1 }
            },
            {
                id: 'pro_fantoche_carne', nome: 'Fantoche de Carne', custo: 2, tipo: 'ritual',
                descricao: 'Ritual 10 min: Anima pequena criatura com espírito. Ataca com C. Arcano, Ritualismo×2 PV, 1+ Ocultismo dano necrótico. +2 PV por PM extra.',
                custoMagia: 5, tempoExecucao: '10 minutos'
            },
            {
                id: 'pro_necroanimacao', nome: 'Necroanimação', custo: 3, tipo: 'ritual',
                descricao: 'Pré-requisito: Fantoche de Carne. Ritual 1h: Reanima ser de tamanho grande ou menor como morto-vivo. Incapaz de usar milagres.',
                custoMagia: 25, tempoExecucao: '1 hora',
                preRequisitos: { regalia: 'pro_fantoche_carne' }
            }
        ]
    },

    // =====================================================================
    // ──── DO INICIADO ────
    // =====================================================================

    // ─── MAGO ───
    {
        id: 'mago',
        nome: 'Mago(a)',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { iniciado_primario: 10 } },
        bonusPorRegalia: { pv: 4, estamina: 0, magia: 5 },
        descricao: 'Especialização em magia avançada, evocação e teletransporte.',
        regaliaObrigatoria: {
            custo: 2,
            escolhasHabilidades: [
                { grupo: ['combateArcano', 'arcanismo'], pontos: 1 },
                { grupo: ['arcanismo', 'fortitude'], pontos: 1 }
            ],
            bonusHabilidades: { arcanismo: 1, fortitude: 1, agilidade: 1 },
            proficienciasGanhas: ['armaduras_medias', 'escudo_simples'],
            habilidadeClasse: {
                nome: 'Míssil Mágico Aprimorado',
                descricao: 'Soma o valor de Arcanismo ao ataque de Míssil Mágico, adicionado por míssil.',
                tipo: 'passiva'
            }
        },
        regaliasAvulsas: [
            {
                id: 'mag_alta_frequencia', nome: 'Alta Frequência', custo: 1, tipo: 'magia',
                descricao: 'Ponto a até 18m gera som de imenso volume. Destrói vidros/cerâmica a 9m. 3d10 dano em criaturas na área. +1d10 por 3 PM extras.',
                custoAcoes: 2, custoMagia: 6,
                efeito: { dano: '3d10', tipoDano: 'arcano' },
                escalamento: { bonusDanoPor3Magia: '1d10' }
            },
            {
                id: 'mag_grande_mao', nome: 'Grande Mão', custo: 2, tipo: 'magia',
                descricao: 'Mão enorme de tamanho médio, levanta até 500kg. Alcance 30m, dura 10 rodadas. Pode atacar/empurrar: 1d10 + Arcanismo dano.',
                custoAcoes: 2, custoMagia: 7,
                efeito: { dano: '1d10', tipoDano: 'arcano' }
            },
            {
                id: 'mag_conjuracao_combate', nome: 'Conjuração de Combate', custo: 1, tipo: 'passiva',
                descricao: 'Pode começar magia de 2+ ações num turno e terminar no próximo, permitindo duas magias de 2+ ações entre turnos consecutivos.'
            },
            {
                id: 'mag_globo_protecao', nome: 'Globo de Proteção', custo: 2, tipo: 'reacao',
                descricao: 'Esfera densa de energia arcana: imune a dano/efeitos externos (mas não afeta o exterior). 50 PV, dura até fim do próximo turno. +25 PV por 10 PM.',
                custoMagia: 10
            },
            {
                id: 'mag_parede_espadas', nome: 'Parede de Espadas', custo: 2, tipo: 'magia',
                descricao: 'Parede de 1,5m espessura, 6m altura, até 21m comprimento (linha/círculo/quadrado). Criaturas no caminho: 4d10 dano e empurradas.',
                custoAcoes: 2, custoMagia: 12,
                efeito: { dano: '4d10', tipoDano: 'cortante' }
            },
            {
                id: 'mag_azagaia_arcana', nome: 'Azagaia Arcana', custo: 2, tipo: 'magia',
                descricao: 'Projétil até 42m: 2d10 + Arcanismo dano. +10 dano por 6 PM extras.',
                custoAcoes: 2, custoMagia: 6,
                efeito: { dano: '2d10', tipoDano: 'arcano' }
            },
            {
                id: 'mag_deslocar_terreno', nome: 'Deslocar Terreno', custo: 1, tipo: 'magia',
                descricao: 'Copia terreno em 18m de raio e flutua 1m acima. Translúcido, terreno difícil (metade do movimento). O mago anda normalmente.',
                custoAcoes: 2, custoMagia: 10
            },
            {
                id: 'mag_tempestade_arcana', nome: 'Tempestade Arcana', custo: 2, tipo: 'magia',
                descricao: 'Área de 18m de raio centrada no mago. 10 rodadas: 70% de Congelando. Cada turno dentro: 50% nível extra Congelando. 8d6 dano/turno se congelado.',
                custoAcoes: 2, custoMagia: 10,
                efeito: { dano: '8d6', tipoDano: 'gelo', chanceSucesso: 70, condicao: 'Congelando' }
            },
            {
                id: 'mag_meteoro_arcano', nome: 'Meteoro Arcano', custo: 2, tipo: 'magia',
                descricao: 'Pré-requisitos: Explosão Arcana, Conjuração de Combate. Impacto de meteoro: 6m de raio, 8d10 + Arcanismo dano. 60% Queimando nível 3. +10 PM por explosão extra.',
                custoAcoes: 4, custoMagia: 10,
                preRequisitos: { regalia: ['esfera_arcana', 'mag_conjuracao_combate'] },
                efeito: { dano: '8d10', tipoDano: 'arcano', chanceSucesso: 60, condicao: 'Queimando 3' }
            },
            {
                id: 'mag_teletransporte_tatico', nome: 'Teletransporte Tático', custo: 1, tipo: 'magia',
                descricao: 'Teletransporta o mago até 18m em lugar visível.',
                custoAcoes: 1, custoMagia: 2
            }
        ]
    },

    // ─── PROFESSOR ───
    {
        id: 'professor',
        nome: 'Professor(a)',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { iniciado_primario: 10 } },
        bonusPorRegalia: { pv: 3, estamina: 0, magia: 6 },
        descricao: 'Especialização em construtos arcanos, suporte e magias versáteis.',
        regaliaObrigatoria: {
            custo: 2,
            escolhasHabilidades: [
                { grupo: ['arcanismo', 'tecnologia'], pontos: 1 },
                { grupo: ['combateArcano', 'destreza'], pontos: 1 }
            ],
            bonusHabilidades: { historia: 1, alquimia: 1, arcanismo: 1 },
            habilidadeClasse: {
                nome: 'Ajudante de Laboratório',
                descricao: 'Magia (3 ações): Cria constructo pequeno com PV = 3× nível. Pode conjurar magias pela posição dele até 50m. Velocidade 4,5m, VD 10. Um por vez. Custa 10 PM. +5 PV por 5 PM extras.',
                tipo: 'magia',
                custoAcoes: 3, custoMagia: 10
            }
        },
        regaliasAvulsas: [
            {
                id: 'pro_escultor_magias', nome: 'Escultor de Magias', custo: 1, tipo: 'reacao',
                descricao: 'Ao conjurar magia não-dano: dobrar duração, OU metade do custo PM, OU dobrar alvos. 5×/dia.',
                cooldown: '5× por dia'
            },
            {
                id: 'pro_conjuracao_multipla', nome: 'Conjuração Múltipla', custo: 2, tipo: 'passiva',
                descricao: 'Pode conjurar mais magias não-dano no mesmo turno, usando reação para +1 ação. Até 4 ações de magias. 5×/dia.'
            },
            {
                id: 'pro_roque', nome: 'Roque', custo: 1, tipo: 'ativa',
                descricao: 'Troca de lugar com ajudante por teletransporte (até 50m). 5×/dia.',
                custoAcoes: 1, cooldown: '5× por dia'
            },
            {
                id: 'pro_ajudante_melhorado', nome: 'Ajudante Melhorado', custo: 1, tipo: 'passiva',
                descricao: 'Pode conjurar constructo médio ou menor com aparência humanoide. PV aumentam para 4× nível.'
            },
            {
                id: 'pro_teletransporte', nome: 'Teletransporte', custo: 1, tipo: 'magia',
                descricao: 'Teletransporta criaturas em 3m de raio para lugar familiar. Até 10km: 80% sucesso. Até 100km: 50%. Falha: 1d100 × 10m em direção aleatória.',
                custoAcoes: 4, custoMagia: 15,
                efeito: { chanceSucesso: 80 }
            },
            {
                id: 'pro_voar', nome: 'Voar', custo: 2, tipo: 'magia',
                descricao: 'Alvo pode voar com o dobro da velocidade de movimento. Dura 100 turnos (10 min).',
                custoAcoes: 1, custoMagia: 8
            },
            {
                id: 'pro_invisibilidade', nome: 'Invisibilidade', custo: 1, tipo: 'magia',
                descricao: 'Torna a si ou criatura tocada invisível (Obscurecida) por até 10 min. Acaba se causar dano.',
                custoAcoes: 1, custoMagia: 8
            },
            {
                id: 'pro_ajudante_combate', nome: 'Ajudante de Combate', custo: 2, tipo: 'passiva',
                descricao: 'Pré-requisito: Ajudante Melhorado. Constructo médio com PV = 5× nível, pode usar armas simples, escudo e armaduras. Velocidade 6m.',
                preRequisitos: { regalia: 'pro_ajudante_melhorado' }
            },
            {
                id: 'pro_atirador_arcano', nome: 'Atirador Arcano', custo: 1, tipo: 'passiva',
                descricao: 'Dobra alcance das magias. Se acertar alvo com magia de acerto, dano acerta outro alvo a 1,5m do original.'
            },
            {
                id: 'pro_laboratorio_expansao', nome: 'Laboratório em Expansão', custo: 2, tipo: 'passiva',
                descricao: 'Pode conjurar dois ajudantes ao invés de um, pelo custo base de apenas um.'
            }
        ]
    },

    // ─── CAVALEIRO ARCANO ───
    {
        id: 'cavaleiro_arcano',
        nome: 'Cavaleiro(a) Arcano',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { iniciado_primario: 5, combatente_primario: 5 } },
        bonusPorRegalia: { pv: 5, estamina: 2, magia: 3 },
        descricao: 'Especialização em combate mágico-marcial, armas arcanas e teletransporte tático.',
        regaliaObrigatoria: {
            custo: 2,
            escolhasHabilidades: [
                { grupo: ['arcanismo', 'atletismo'], pontos: 1 },
                { grupo: ['combateCorpoACorpo', 'combateADistancia', 'combateArcano'], pontos: 1 }
            ],
            bonusHabilidades: { alquimia: 2, arcanatec: 2, acrobacia: 2 },
            proficienciasGanhas: ['vara_relampago', 'armaduras_pesadas', 'escudos', 'espada_laminas_duplas'],
            habilidadeClasse: {
                nome: 'Aptidão para Combate Arcano + Ligação Arcana',
                descricao: 'Abjuração, evolução e invocação custam -1 PM (mín 1). Ligação Arcana: sintoniza até 3 armas/objetos (ritual 1h cada) para guardar/pegar de dimensão de bolso. 1 objeto como ação livre, depois 1 ação por interação.',
                tipo: 'passiva'
            }
        },
        regaliasAvulsas: [
            {
                id: 'ca_ataque_conjurativo', nome: 'Ataque Conjurativo', custo: 2, tipo: 'ativa',
                descricao: 'Ao atacar a 1,5m: pode conjurar magia de até 2 ações. Alvo da magia = alvo do ataque ou o próprio cavaleiro. Magia de área centralizada no alvo.',
                custoAcoes: 1, custoEstamina: 5
            },
            {
                id: 'ca_contingencia', nome: 'Contingência', custo: 1, tipo: 'ativa',
                descricao: 'Conjura magia de ilusão/abjuração e define gatilho. Se ocorrer em até (Arcanismo) dias, a magia se ativa.',
                custoAcoes: 2, custoEstamina: 2, custoMagia: 2
            },
            {
                id: 'ca_arma_arcana_melhor', nome: 'Arma Arcana Melhorada', custo: 1, tipo: 'passiva',
                descricao: 'Arma Arcana: escolhe estilo de combate compatível. Custo reduz de 10 para 5 PM, segunda arma custa +2 PM.'
            },
            {
                id: 'ca_armadura_arcana_melhor', nome: 'Armadura Arcana Melhorada', custo: 1, tipo: 'ativa',
                descricao: 'Ao conjurar Armadura Arcana, pode usar Recuperar Fôlego com as mesmas ações. (Fortitude)×/dia.'
            },
            {
                id: 'ca_ataque_fortalecido', nome: 'Ataque Fortalecido', custo: 2, tipo: 'passiva',
                descricao: 'Ao sacar arma via Ligação Arcana, primeiro ataque causa dano dobrado. 1×/ação atacar. Custa 1 PM. +5 PE para tirar -5 no acerto.',
                custoMagia: 1
            },
            {
                id: 'ca_cambio_arcano', nome: 'Câmbio Arcano', custo: 1, tipo: 'ativa',
                descricao: 'Entrega/pega objeto de criatura voluntária via Ligação Arcana (ação livre, alcance 5× Arcanismo m). Pode gastar 5 PM e 1 ação para trocar de lugar.',
                custoAcoes: 1, custoMagia: 5
            },
            {
                id: 'ca_carapaca_arcana', nome: 'Carapaça Arcana', custo: 2, tipo: 'reacao',
                descricao: 'Ao receber ataque com escudo equipado: levanta escudo + barreira protetiva de 20 PV temporários até fim do próximo turno.'
            },
            {
                id: 'ca_anti_conjuracao', nome: 'Combate Anti-Conjuração', custo: 2, tipo: 'passiva',
                descricao: 'Se criatura conjurar magia/feitiço/milagre/maldição no alcance de ameaça, ataque de oportunidade via reação. Se acertar, interrompe a conjuração.',
                custoEstamina: 10, custoMagia: 2
            },
            {
                id: 'ca_ataque_veloz_arcano', nome: 'Ataque Veloz com Armas Arcanas', custo: 1, tipo: 'ativa',
                descricao: 'Ataque extra na ação atacar, apenas com armas de Ligação Arcana ou Arma Arcana. 1×/ação.',
                custoEstamina: 1
            },
            {
                id: 'ca_flash', nome: 'Flash', custo: 2, tipo: 'magia',
                descricao: 'Teletransporte até 2× Arcanismo metros para ponto visível. Se alcançar oponente, ataque gratuito: dano da arma + 2× Arcanismo dano arcano. Segundo uso no turno: 3× custos mas +10 acerto.',
                custoAcoes: 1, custoMagia: 2, custoEstamina: 2
            },
            {
                id: 'ca_golpe_final', nome: 'Golpe Final', custo: 2, tipo: 'magia',
                descricao: 'Move até 2× velocidade e ataca: +Arcanismo no acerto. Dano normal + 1d12 arcano por PM gasto (máx 10 PM).',
                custoAcoes: 3, custoEstamina: 5,
                efeito: { dano: '1d12', tipoDano: 'arcano' }
            }
        ]
    },

    // ─── ERUDITO ───
    {
        id: 'erudito',
        nome: 'Erudito',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { iniciado_primario: 5, novico_primario: 5 } },
        bonusPorRegalia: { pv: 4, estamina: 0, magia: 6 },
        descricao: 'Especialização em engenharia divina, energia sagrada e sabedoria mista.',
        regaliaObrigatoria: {
            custo: 2,
            escolhasHabilidades: [
                { grupo: ['arcanismo', 'combateArcano'], pontos: 1 },
                { grupo: ['teologia', 'arcanatec'], pontos: 1 }
            ],
            bonusHabilidades: { ocultismo: 2, jurisprudencia: 2, ritualismo: 2 },
            habilidadeClasse: {
                nome: 'Engenharia do Divino',
                descricao: 'Ao conjurar milagre, acumula energia sagrada (1 ponto/milagre). Usos: 3 pontos = +2 VD por 1h; 2 pontos = cura 5 PV (reação); 1 ponto + 3 ações = repete último milagre em forma simples.',
                tipo: 'passiva'
            }
        },
        regaliasAvulsas: [
            {
                id: 'eru_manto_divino', nome: 'Manto Divino', custo: 1, tipo: 'magia',
                descricao: 'Manto protetivo em até 6m: terreno sagrado, -1 PM em magias/milagres (mín 1), +5 PV temporários, imune a clima. Dura 6h. Pode conjurar como ritual 1h (sem PV temp).',
                custoAcoes: 1, custoMagia: 10
            },
            {
                id: 'eru_santuario_multiplo', nome: 'Santuário Múltiplo', custo: 2, tipo: 'reacao',
                descricao: 'Ao ver aliado(s) sofrer ataque (antes do rolamento), conjura Santuário em um ou mais (máx Arcanismo). Dura até fim da rodada.',
                custoMagia: 5
            },
            {
                id: 'eru_evocacao_divino', nome: 'Evocação do Divino', custo: 1, tipo: 'passiva',
                descricao: 'Magias de evocação: gasta até 2 pontos de energia sagrada por turno para +1d6 dano arcano cada. 1 PM muda dano para sagrado.'
            },
            {
                id: 'eru_engenharia2', nome: 'Engenharia do Divino 2', custo: 2, tipo: 'passiva',
                descricao: 'Milagres podem causar dano arcano ao invés de sagrado. Pode executar sem custo (ritual 10 min): Lente Investigativa, Abençoar Arma, Esfera Divina, Armadura Arcana e mais.'
            },
            {
                id: 'eru_templo', nome: 'Templo de Adoração e Conhecimento', custo: 3, tipo: 'ritual',
                descricao: 'Ritual 10 min (10 M.O.): Conjura templo indestrutível de 10000m³ com biblioteca. Apenas convidados entram. Dura 8h. 1h de oração cura 50 PV a todos e remove todas condições.',
                tempoExecucao: '10 minutos'
            },
            {
                id: 'eru_teletransporte', nome: 'Teletransporte Tático', custo: 1, tipo: 'magia',
                descricao: 'Teletransporta o erudito até 9m em lugar visível.',
                custoAcoes: 1, custoMagia: 2
            },
            {
                id: 'eru_atirador_arcano', nome: 'Atirador Arcano', custo: 1, tipo: 'passiva',
                descricao: 'Dobra o alcance de magias e milagres.'
            },
            {
                id: 'eru_critico_guiado', nome: 'Crítico Guiado', custo: 1, tipo: 'reacao',
                descricao: 'Uma reação faz com que um ataque seja um crítico automático.',
                custoMagia: 10
            },
            {
                id: 'eru_atirar_esfera', nome: 'Atirar Esfera Divina', custo: 2, tipo: 'milagre',
                descricao: 'Pré-requisito: Esfera Divina, Teologia 4, Ocultismo 4. Atira esferas: 2d10 dano sagrado/esfera, dobro em mortos-vivos/demônios. 3 PM por esfera.',
                custoAcoes: 2, custoMagia: 3,
                preRequisitos: { habilidade: { teologia: 4, ocultismo: 4 } },
                efeito: { dano: '2d10', tipoDano: 'sagrado' }
            },
            {
                id: 'eru_invisibilidade', nome: 'Invisibilidade', custo: 2, tipo: 'magia',
                descricao: 'Torna a si ou criatura tocada invisível (Obscurecida) por até 10 min. Acaba se causar dano.',
                custoAcoes: 1, custoMagia: 10
            },
            {
                id: 'eru_silencio', nome: 'Silêncio', custo: 1, tipo: 'ativa',
                descricao: 'Impede o alvo de usar magia, feitiço ou milagre até fim do próximo turno.',
                custoAcoes: 1, custoMagia: 5
            }
        ]
    },

    // ─── INVOCADOR ───
    {
        id: 'invocador',
        nome: 'Invocador',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { iniciado_primario: 5, feiticeiro_primario: 5 } },
        bonusPorRegalia: { pv: 3, estamina: 0, magia: 7 },
        descricao: 'Especialização em invocações, elementais e invocações de combate.',
        regaliaObrigatoria: {
            custo: 2,
            escolhasHabilidades: [
                { grupo: ['ritualismo', 'arcanismo'], pontos: 1 },
                { grupo: ['ocultismo', 'natureza'], pontos: 1 }
            ],
            bonusHabilidades: { tecnologia: 2, teologia: 2, lidar_com_animais: 2, historia: 2 },
            proficienciasGanhas: ['conducao_terrestre', 'conducao_aquatica', 'conducao_exotica'],
            habilidadeClasse: {
                nome: 'Mestre de Invocações',
                descricao: 'Todas invocações ganham + Ritualismo PV temporários. Criaturas invocadas podem ser sacrificadas para causar Ritualismo + Arcanismo dano em 3m de área.',
                tipo: 'passiva'
            }
        },
        regaliasAvulsas: [
            {
                id: 'inv_furia_natural', nome: 'Fúria Natural', custo: 2, tipo: 'feitico',
                descricao: 'Anima árvore/arbusto: 50 PV, VD 9, velocidade 4,5m, +10 acerto, 2d10 dano terra. Dura (Ocultismo) turnos. +5 rodadas por 7 PM extras.',
                custoAcoes: 2, custoMagia: 10,
                efeito: { dano: '2d10', tipoDano: 'terra' }
            },
            {
                id: 'inv_companheiro_elemental', nome: 'Companheiro Elemental', custo: 1, tipo: 'ritual',
                descricao: 'Ritual 10 min (20 M.O.): Conjura criatura pequena. Escolha elemento para imunidade. Cada elemento dá habilidade especial.',
                tempoExecucao: '10 minutos'
            },
            {
                id: 'inv_grande_mao', nome: 'Grande Mão', custo: 2, tipo: 'magia',
                descricao: 'Mão enorme média, levanta até 500kg, alcance 30m, dura 10 rodadas. Ataca/empurra: 1d10 + Arcanismo dano.',
                custoAcoes: 2, custoMagia: 5,
                efeito: { dano: '1d10', tipoDano: 'arcano' }
            },
            {
                id: 'inv_runa_armazenamento', nome: 'Runa de Armazenamento', custo: 2, tipo: 'feitico',
                descricao: 'Cria runa que guarda invocação/criatura voluntária em dimensão de bolso por até 24h. Duração da invocação pausa dentro. +1 uso por 5 PM.',
                custoMagia: 5, tempoExecucao: '1 minuto'
            },
            {
                id: 'inv_rito_elemental', nome: 'Rito Elemental', custo: 1, tipo: 'passiva',
                descricao: 'Ao invocar espíritos/fantoches, pode imbuí-los com um dos 5 elementos. Ataques causam Ritualismo como dano do elemento. Se não tinha ataque, ganha um (usa C. Arcano).'
            },
            {
                id: 'inv_montaria_elemental', nome: 'Montaria Elemental', custo: 1, tipo: 'ritual',
                descricao: 'Ritual 10 min (20 M.O.): Conjura montaria grande/muito grande exótica. Elemento escolhido dá habilidade especial.',
                tempoExecucao: '10 minutos'
            },
            {
                id: 'inv_roque', nome: 'Roque', custo: 1, tipo: 'ativa',
                descricao: 'Troca de lugar com invocação por teletransporte (até 50m). Usos/dia = valor de Arcanismo.',
                custoAcoes: 1
            },
            {
                id: 'inv_invocacao_inanimada', nome: 'Invocação Inanimada Arcana', custo: 3, tipo: 'magia',
                descricao: 'Invoca objeto inanimado que caiba em 3m³ (deve ter visto antes). Se apenas leu sobre: 70% sucesso.',
                custoAcoes: 2, custoMagia: 5,
                efeito: { chanceSucesso: 70 }
            },
            {
                id: 'inv_espirito_protecao', nome: 'Espírito de Proteção', custo: 1, tipo: 'ativa',
                descricao: 'Ritual 10 min + Ação em combate: espírito protetor gira ao redor. +2 VD, +10 PV temp, ataque oportunidade 2d10 arcano, ataques alcançam 3m.',
                custoAcoes: 1,
                efeito: { bonusDefesa: 2 }
            },
            {
                id: 'inv_duplicata', nome: 'Invocar Duplicata', custo: 2, tipo: 'magia',
                descricao: 'Cópia controlável com 1 PV, até 300m. Conjura magias/feitiços pela posição dela. Dura 1h. +10 PM para duplicar outra criatura (1 min, copia habilidades).',
                custoAcoes: 2, custoMagia: 10
            }
        ]
    },

    // =====================================================================
    // ──── DO FEITICEIRO ────
    // =====================================================================

    // ─── METAMORFO ───
    {
        id: 'metamorfo',
        nome: 'Metamorfo',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { feiticeiro_primario: 10 } },
        bonusPorRegalia: { pv: 7, estamina: 0, magia: 3 },
        descricao: 'Especialização em formas licantrópicas, elixires e metamorfose animal.',
        regaliaObrigatoria: {
            custo: 2,
            escolhasHabilidades: [
                { grupo: ['lidar_com_animais', 'arcanismo'], pontos: 1 },
                { grupo: ['combateArcano', 'sobrevivencia'], pontos: 1 }
            ],
            bonusHabilidades: { natureza: 1, fortitude: 1, alquimia: 1 },
            proficienciasGanhas: ['conducao_exotica', 'conducao_terrestre', 'conducao_aquatica'],
            habilidadeClasse: {
                nome: 'Metamorfose Base',
                descricao: 'Comunica com animais (eles respondem somaticamente). Criar elixires custa metade dos PM (arredondando para cima). Pode usar até 2 metamorfoses não-licantrópicas por elixir. Em forma licantropo mantém habilidades e pode usar equipamentos.',
                tipo: 'passiva'
            }
        },
        regaliasAvulsas: [
            {
                id: 'met_asas', nome: 'Asas', custo: 1, tipo: 'ativa',
                descricao: 'Ao tomar elixir, asas aparecem como efeito adicional. Velocidade de voo = velocidade de movimento. Dura enquanto elixir.',
                custoMagia: 2
            },
            {
                id: 'met_musculatura', nome: 'Musculatura Monstruosa', custo: 2, tipo: 'ativa',
                descricao: 'Ao tomar elixir, músculos mudam: +4 Força (pode ultrapassar 15). Dura enquanto elixir.',
                custoMagia: 4
            },
            {
                id: 'met_cauda', nome: 'Cauda', custo: 1, tipo: 'ativa',
                descricao: 'Ao tomar elixir, ganha cauda: arma natural 1d8 + Força concussivo, ou pode segurar arma/escudo. Dura enquanto elixir.',
                custoMagia: 4,
                efeito: { dano: '1d8', tipoDano: 'concussivo' }
            },
            {
                id: 'met_lobo', nome: 'Licantropia Lobo', custo: 2, tipo: 'ativa',
                descricao: 'Híbrido lobo: visão 18m no escuro, +3m movimentação, resistência cortante/perfurante/concussivo. Garras/mordida 1d12 dano. Vantagem percepção cheiro/som. Dura 2h.',
                custoAcoes: 2, custoMagia: 10,
                efeito: { dano: '1d12', tipoDano: 'cortante' }
            },
            {
                id: 'met_urso', nome: 'Licantropia Urso', custo: 3, tipo: 'ativa',
                descricao: 'Híbrido urso: visão 9m, +1,5m movimentação, resistências, +20 PV, tamanho maior. Garras/mordida 3d4 dano. Dura 2h.',
                custoAcoes: 2, custoMagia: 10,
                efeito: { dano: '3d4', tipoDano: 'cortante' }
            },
            {
                id: 'met_javali', nome: 'Licantropia Javali', custo: 2, tipo: 'ativa',
                descricao: 'Híbrido javali: visão 3m, +4,5m movimentação, resistências, +10 PV, presas 2d6 perfurante. Dura 2h.',
                custoAcoes: 2, custoMagia: 10,
                efeito: { dano: '2d6', tipoDano: 'perfurante' }
            },
            {
                id: 'met_pantera', nome: 'Licantropia Pantera', custo: 2, tipo: 'ativa',
                descricao: 'Híbrido pantera: visão 36m, +7,5m movimentação, resistências, +10 furtividade, garras/mordida 3d8 dano. Dura 2h.',
                custoAcoes: 2, custoMagia: 10,
                efeito: { dano: '3d8', tipoDano: 'cortante' }
            },
            {
                id: 'met_crocodilo', nome: 'Licantropia Crocodilo', custo: 2, tipo: 'ativa',
                descricao: 'Híbrido crocodilo: visão 6m, resistências, +5 VD, dobro velocidade na água, 2h subaquático, mordida 2d10 perfurante. Dura 2h.',
                custoAcoes: 2, custoMagia: 10,
                efeito: { dano: '2d10', tipoDano: 'perfurante' }
            },
            {
                id: 'met_aguia', nome: 'Licantropia Águia', custo: 3, tipo: 'ativa',
                descricao: 'Híbrido águia: visão 12m, +3m, resistências, voo com dobro velocidade, garras 1d20 perfurante. Ataque em voo sem oportunidade. Dura 2h.',
                custoAcoes: 2, custoMagia: 10,
                efeito: { dano: '1d20', tipoDano: 'perfurante' }
            },
            {
                id: 'met_cobra', nome: 'Licantropia Cobra', custo: 2, tipo: 'ativa',
                descricao: 'Híbrido cobra: visão 6m, +1,5m, resistências. Mordida com 50% chance 1d10 veneno extra. Fossetas loreais detectam criaturas vivas. Mordida 2d4 perfurante. Dura 2h.',
                custoAcoes: 2, custoMagia: 10,
                efeito: { dano: '2d4', tipoDano: 'perfurante', chanceSucesso: 50 }
            },
            {
                id: 'met_salamandra', nome: 'Licantropia Salamandra', custo: 3, tipo: 'ativa',
                descricao: 'Híbrido salamandra: visão 6m, +1,5m, resistências. Chamas (1d6 fogo a 1,5m), +2 dano fogo nos ataques, +2d8 PV, escala paredes naturais. Vulnerável a gelo. Dura 2h.',
                custoAcoes: 2, custoMagia: 10,
                efeito: { dano: '1d6', tipoDano: 'fogo' }
            },
            {
                id: 'met_virar_animal', nome: 'Virar Animal', custo: 2, tipo: 'ativa',
                descricao: 'Vira animal grande ou menor por (nível) horas. Mantém PV e ganha PV temporários = Fortitude.',
                custoAcoes: 1
            }
        ]
    },

    // ─── ELEMENTALISTA ───
    {
        id: 'elementalista',
        nome: 'Elementalista',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { feiticeiro_primario: 10 } },
        bonusPorRegalia: { pv: 3, estamina: 0, magia: 6 },
        descricao: 'Especialização em controle elemental avançado e magia de área devastadora.',
        regaliaObrigatoria: {
            custo: 2,
            escolhasHabilidades: [
                { grupo: ['natureza', 'arcanismo'], pontos: 1 },
                { grupo: ['combateArcano', 'ritualismo'], pontos: 1 }
            ],
            bonusHabilidades: { natureza: 1, alquimia: 1, conducaoExotica: 1 },
            habilidadeClasse: {
                nome: 'Dominar Elemento Avançado',
                descricao: 'Versão melhorada de Dominar Elemento. Vento empurra criaturas médias 3m. Terra: abre 1m³ em rocha/turno. Fogo: cria chama na mão (1h) que causa 1d6 (2 PM). Água: controla 10m³. Eletricidade: mantém faísca na mão, 1d8 corpo a corpo.',
                tipo: 'feitico',
                custoAcoes: 1
            }
        },
        regaliasAvulsas: [
            {
                id: 'ele_montaria', nome: 'Montaria Elemental', custo: 1, tipo: 'ritual',
                descricao: 'Ritual 10 min (20 M.O.): Conjura montaria grande/muito grande exótica. Elemento dá habilidade especial (Fogo: sopro 2d6, Raio: avanço 10m, Ar: voo, Terra: detecção 36m, Água: respiração).',
                tempoExecucao: '10 minutos'
            },
            {
                id: 'ele_companheiro', nome: 'Companheiro Elemental', custo: 1, tipo: 'ritual',
                descricao: 'Ritual 10 min (20 M.O.): Criatura pequena com elemento imune. Cada elemento dá habilidade especial diferente.',
                tempoExecucao: '10 minutos'
            },
            {
                id: 'ele_ataque_multiplo', nome: 'Ataque Elemental Múltiplo', custo: 2, tipo: 'feitico',
                descricao: 'Dispara 3 jatos de um ou mais elementos: cada 2d10 dano. 40% de aplicar efeito conforme elemento (Água: sangramento, Terra: atordoado, Gelo/Fogo: condição, Ar: cego/surdo).',
                custoAcoes: 2, custoMagia: 6,
                efeito: { dano: '2d10', tipoDano: 'elemental', chanceSucesso: 40 }
            },
            {
                id: 'ele_armadura_melhor', nome: 'Armadura Elemental Melhorada', custo: 2, tipo: 'feitico',
                descricao: 'Armadura com PV temp = Arcanismo + Ocultismo. Retaliação automática 3d4 dano do elemento a cada ataque corpo a corpo recebido.',
                custoAcoes: 2, custoMagia: 10,
                efeito: { dano: '3d4', tipoDano: 'elemental' }
            },
            {
                id: 'ele_nevasca', nome: 'Nevasca', custo: 2, tipo: 'feitico',
                descricao: 'Domo de 6m raio: Devagar, 3d6 dano ao entrar/início turno. 70% Congelado/rodada. Dura (Arcanismo) rodadas.',
                custoAcoes: 2, custoMagia: 10,
                efeito: { dano: '3d6', tipoDano: 'gelo', chanceSucesso: 70, condicao: 'Congelado' }
            },
            {
                id: 'ele_pilar_chamas', nome: 'Pilar de Chamas', custo: 2, tipo: 'feitico',
                descricao: 'Coluna de 12m altura, 3m raio: 9d4 dano fogo ao entrar/início. Pode mover 3m/ação. 60% Queimando. Dura (Arcanismo) rodadas.',
                custoAcoes: 2, custoMagia: 10,
                efeito: { dano: '9d4', tipoDano: 'fogo', chanceSucesso: 60, condicao: 'Queimando' }
            },
            {
                id: 'ele_tempestade_raios', nome: 'Tempestade de Raios', custo: 2, tipo: 'feitico',
                descricao: 'Área 4,5m raio, 90m: 6d6 dano raio ao entrar/início. 20% paralizado. +2d6 em armaduras metálicas. Dura (Arcanismo) rodadas.',
                custoAcoes: 2, custoMagia: 10,
                efeito: { dano: '6d6', tipoDano: 'raio', chanceSucesso: 20, condicao: 'Paralizado' }
            },
            {
                id: 'ele_terremoto', nome: 'Terremoto', custo: 2, tipo: 'feitico',
                descricao: 'Área 9m raio, 60m: 3d6 dano terra ao entrar/início. 20% Restringido. Terreno difícil causa 1d6/1,5m. Dura (Arcanismo) rodadas.',
                custoAcoes: 2, custoMagia: 10,
                efeito: { dano: '3d6', tipoDano: 'terra', chanceSucesso: 20, condicao: 'Restringido' }
            },
            {
                id: 'ele_furacao', nome: 'Furacão', custo: 2, tipo: 'feitico',
                descricao: 'Área 4,5m raio, 30m: 3d10+6 dano impacto ao entrar/início. 40% Surdo e Devagar. Dura (Arcanismo) rodadas.',
                custoAcoes: 2, custoMagia: 10,
                efeito: { dano: '3d10+6', tipoDano: 'impacto', chanceSucesso: 40, condicao: 'Surdo, Devagar' }
            },
            {
                id: 'ele_espinho_gelo', nome: 'Espinho de Gelo', custo: 1, tipo: 'feitico',
                descricao: 'Enorme espinho de gelo do chão: 5d6 dano gelo + 5d6 perfurante, até 9m.',
                custoAcoes: 2, custoMagia: 10,
                efeito: { dano: '5d6', tipoDano: 'gelo' }
            },
            {
                id: 'ele_lanca_chamas', nome: 'Lança-Chamas', custo: 1, tipo: 'feitico',
                descricao: 'Cone de 18m, 60°: 5d4 dano fogo, aplica Queimando.',
                custoAcoes: 2, custoMagia: 8,
                efeito: { dano: '5d4', tipoDano: 'fogo', condicao: 'Queimando' }
            },
            {
                id: 'ele_eletrocutar', nome: 'Eletrocutar', custo: 1, tipo: 'feitico',
                descricao: 'Energiza a mão: ao tocar inimigo causa 3d10+7 dano. 20% de paralisar.',
                custoAcoes: 2, custoMagia: 8,
                efeito: { dano: '3d10+7', tipoDano: 'raio', chanceSucesso: 20, condicao: 'Paralizado' }
            },
            {
                id: 'ele_esmagar_corrente', nome: 'Esmagar com Corrente', custo: 1, tipo: 'feitico',
                descricao: 'Ar esmagador em 1,5m raio: 2d6 impacto + 5d4 corte. 20% Deitado.',
                custoAcoes: 2, custoMagia: 8,
                efeito: { dano: '5d4', tipoDano: 'corte', chanceSucesso: 20, condicao: 'Deitado' }
            },
            {
                id: 'ele_estalagmite', nome: 'Estalagmite de Cristal', custo: 1, tipo: 'feitico',
                descricao: 'Estalagmite atirada até 18m: 3d6 perfurante + 2d10 terra.',
                custoAcoes: 2, custoMagia: 8,
                efeito: { dano: '2d10', tipoDano: 'terra' }
            }
        ]
    },

    // ─── XAMÃ ───
    {
        id: 'xama',
        nome: 'Xamã',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { feiticeiro_primario: 10 } },
        bonusPorRegalia: { pv: 3, estamina: 0, magia: 7 },
        descricao: 'Especialização em necromancia, espíritos e controle de mortos-vivos.',
        regaliaObrigatoria: {
            custo: 2,
            escolhasHabilidades: [
                { grupo: ['ritualismo', 'ocultismo'], pontos: 2 },
                { grupo: ['combateArcano', 'destreza'], pontos: 1 }
            ],
            bonusHabilidades: { natureza: 2, intuicao: 2, sobrevivencia: 2 },
            habilidadeClasse: {
                nome: 'Ciclo Sem Fim',
                descricao: 'Pré-requisito: Espiritomancia. Quando criatura não-humanoide de tamanho médio ou menor morre em até 9m (com Espiritomancia ativo): 50% de um espírito possuir o corpo. Retorna como morto-vivo com 2× Ocultismo PV, ataques 1d8 necrótico.',
                tipo: 'passiva',
                efeito: { chanceSucesso: 50 }
            }
        },
        regaliasAvulsas: [
            {
                id: 'xam_sacrificio', nome: 'Sacrifício', custo: 1, tipo: 'feitico',
                descricao: 'Explode um fantoche/invocação: Ocultismo + 1d12 dano necrótico em 3m de raio.',
                custoAcoes: 1, custoMagia: 6,
                efeito: { dano: '1d12', tipoDano: 'necrotico' }
            },
            {
                id: 'xam_banquete', nome: 'Banquete Mórbido', custo: 1, tipo: 'ativa',
                descricao: 'Consome um morto-vivo seu. Recupera PV = Ocultismo + Ritualismo. Sem custo de magia.',
                custoAcoes: 2
            },
            {
                id: 'xam_amigos', nome: 'Amigos do Outro Lado', custo: 1, tipo: 'reacao',
                descricao: 'Ao fazer teste de Conhecimento, contata espírito para +10 no teste. Se Ritualismo > 5: sem custo material.',
                custoMagia: 5
            },
            {
                id: 'xam_fantoche_carne', nome: 'Fantoche de Carne', custo: 2, tipo: 'ritual',
                descricao: 'Ritual 10 min: Anima criatura com espírito. PV = Ritualismo × 2. Ataques 1d4 + Ocultismo necrótico. +2 PV por PM extra.',
                custoMagia: 5, tempoExecucao: '10 minutos'
            },
            {
                id: 'xam_matilha', nome: 'Matilha Carniceira', custo: 2, tipo: 'feitico',
                descricao: 'Invoca Cão Zumbi a até 6m. PV = 3× nível, VD = 7 + Ritualismo. Mordida e garra: dano = Ocultismo. 1 cão por ação.',
                custoAcoes: 1, custoMagia: 5
            },
            {
                id: 'xam_aparicao', nome: 'Aparição Assombrada', custo: 1, tipo: 'feitico',
                descricao: 'Espírito grande a até 18m: criaturas em 12m têm 50% de Aterrorizado. +5% por 2 PM extras.',
                custoAcoes: 1, custoMagia: 4,
                efeito: { chanceSucesso: 50, condicao: 'Aterrorizado' },
                escalamento: { bonusChancePor2Magia: 5 }
            },
            {
                id: 'xam_ciclo_aprimorado', nome: 'Ciclo Sem Fim Aprimorado', custo: 1, tipo: 'passiva',
                descricao: 'Pré-requisito: Ciclo Sem Fim. Alcance 12m, 10% chance, qualquer criatura. Retorna com metade dos PV. Tamanho médio ou menor.',
                preRequisitos: { regalia: 'ciclo_sem_fim' }
            },
            {
                id: 'xam_ciclo_supremo', nome: 'Ciclo Sem Fim Supremo', custo: 2, tipo: 'passiva',
                descricao: 'Pré-requisito: Ciclo Aprimorado. 20% chance em 6m, sem limite de tamanho. Metade PV e metade PM. Pode lançar feitiços do original ou do feiticeiro.',
                preRequisitos: { regalia: 'xam_ciclo_aprimorado' }
            },
            {
                id: 'xam_festim', nome: 'Festim Macabro', custo: 2, tipo: 'feitico',
                descricao: 'Espíritos em 6m ao redor por 10 rodadas: 3d6 dano ao entrar/início. 50% Aterrorizado. Terreno difícil (dobro movimento). +2d6 por 5 PM extras.',
                custoAcoes: 2, custoMagia: 10,
                efeito: { dano: '3d6', tipoDano: 'necrotico', chanceSucesso: 50, condicao: 'Aterrorizado' }
            },
            {
                id: 'xam_necroanimacao', nome: 'Necroanimação', custo: 1, tipo: 'ritual',
                descricao: 'Pré-requisito: Fantoche de Carne. Ritual 1h: Reanima ser grande ou menor. Possuído por espírito, incapaz de milagres. Mesmos status de quando vivo.',
                custoMagia: 10, tempoExecucao: '1 hora',
                preRequisitos: { regalia: 'xam_fantoche_carne' }
            },
            {
                id: 'xam_terreno', nome: 'Terreno Apodrecido', custo: 1, tipo: 'feitico',
                descricao: 'Amaldiçoa solo 12m raio a 100m: metade do movimento, 1d4 necrótico/1,5m caminhado. +1d4 por 7 PM extras.',
                custoAcoes: 2, custoMagia: 7,
                efeito: { dano: '1d4', tipoDano: 'necrotico' }
            },
            {
                id: 'xam_maestria', nome: 'Maestria Necrótica', custo: 1, tipo: 'passiva',
                descricao: 'Todos mortos-vivos invocados passam a causar +1d10 dano necrótico adicional.'
            },
            {
                id: 'xam_praga', nome: 'Praga', custo: 1, tipo: 'feitico',
                descricao: 'Enxame de criaturas peçonhentas avança em alvo até 72m: 4d6 dano, 75% Devagar e Cego por 5 turnos. +1d6 por 2 PM extras.',
                custoAcoes: 2, custoMagia: 5,
                efeito: { dano: '4d6', tipoDano: 'necrotico', chanceSucesso: 75, condicao: 'Devagar, Cego' }
            }
        ]
    },

    // ─── BRUXO ───
    {
        id: 'bruxo',
        nome: 'Bruxo(a)',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { feiticeiro_primario: 10 } },
        bonusPorRegalia: { pv: 2, estamina: 0, magia: 8 },
        descricao: 'Especialização em familiar, natureza, ilusões e contratos.',
        regaliaObrigatoria: {
            custo: 2,
            escolhasHabilidades: [
                { grupo: ['lidar_com_animais', 'arcanismo'], pontos: 1 },
                { grupo: ['combateArcano', 'ocultismo'], pontos: 1 }
            ],
            bonusHabilidades: { natureza: 1, alquimia: 1, enganacao: 1, conducaoExotica: 1 },
            habilidadeClasse: {
                nome: 'Invocação de Familiar',
                descricao: 'Ritual 1h: Invoca familiar com PV = metade do bruxo, acerto = Ocultismo, VD = Ritualismo + Arcanismo, 2d6 dano sombrio. Controle até 200m. Pode conjurar maldições da posição dele. Pode sacrificá-lo (reação): +20 PV +10 PM, mas perde invocação até descanso longo.',
                tipo: 'ritual',
                tempoExecucao: '1 hora'
            }
        },
        regaliasAvulsas: [
            {
                id: 'bru_fotossintese', nome: 'Fotossíntese', custo: 1, tipo: 'ritual',
                descricao: 'Ritual 1 min ao ar livre: Recupera 4d10 PV e 2d6 PM. 1×/dia (2× com Ritualismo > 10 e sem custo).',
                tempoExecucao: '1 minuto',
                efeito: { curaHP: '4d10' }
            },
            {
                id: 'bru_dedo_verde', nome: 'Dedo Verde', custo: 1, tipo: 'feitico',
                descricao: 'Acelera plantas em 18m raio (até 72m): terreno difícil. +3 PM extras: espinhos 1d6/1,5m movido.',
                custoAcoes: 2, custoMagia: 2
            },
            {
                id: 'bru_furia_natural', nome: 'Fúria Natural', custo: 2, tipo: 'feitico',
                descricao: 'Anima árvore/arbusto: 50 PV, VD 9, 4,5m velocidade, +10 acerto, 2d10 terra. Dura Ocultismo+1 turnos. Vulnerável a corte de machado.',
                custoAcoes: 2, custoMagia: 10,
                efeito: { dano: '2d10', tipoDano: 'terra' }
            },
            {
                id: 'bru_amizade_animal', nome: 'Amizade Animal', custo: 1, tipo: 'feitico',
                descricao: 'Encanta animal para obedecer ordens (não perigo direto). Comunica em idioma escolhido. +10 PM: corrupta em abominação (dobro PV, +1d12 necrótico).',
                custoAcoes: 1, custoMagia: 2
            },
            {
                id: 'bru_alucinacao', nome: 'Alucinação', custo: 2, tipo: 'feitico',
                descricao: 'Área 18m de raio com ilusões realistas. Teste para descobrir: 7+Ocultismo+Arcanismo (ou 10+ se terreno real). Falha: 50% Preso na ilusão. Dura 24h. +12h por 6 PM extras.',
                custoAcoes: 3, custoMagia: 6,
                efeito: { chanceSucesso: 50 }
            },
            {
                id: 'bru_confusao', nome: 'Confusão', custo: 1, tipo: 'feitico',
                descricao: 'Cria 10 cópias em até 9m. Criaturas que passam/atacam cópias: 30% atordoado. Pode trocar posição com cópia até 18m. Dura 10 rodadas.',
                custoAcoes: 1, custoMagia: 5,
                efeito: { chanceSucesso: 30, condicao: 'Atordoado' },
                escalamento: { bonusChancePorMagiaExtra: 1 }
            },
            {
                id: 'bru_contrato', nome: 'Contrato', custo: 1, tipo: 'ritual',
                descricao: 'Ritual 1 min (10 M.O.): Contrato com criatura voluntária. Opções: Dividir Vitalidade (dobram PV, vulneráveis), Conceder Poder (metade PM), ou Fantoche (controla após morte).',
                tempoExecucao: '1 minuto'
            },
            {
                id: 'bru_bola_cristal', nome: 'Bola de Cristal', custo: 1, tipo: 'ativa',
                descricao: 'Marca criatura a até 3m por 7 dias (30% percebe). Observa onde está e o que faz, 10 min/dia. 5 PM por observação.',
                custoAcoes: 1, custoMagia: 5,
                efeito: { chanceSucesso: 70 }
            },
            {
                id: 'bru_dedo_podre', nome: 'Dedo Podre', custo: 2, tipo: 'feitico',
                descricao: 'Toca humanóide: 5% de 12d12 dano necrótico, senão 12d4. +5% por 3 PM extras.',
                custoAcoes: 3, custoMagia: 12,
                efeito: { dano: '12d4', tipoDano: 'necrotico', chanceSucesso: 5 },
                escalamento: { bonusChancePor3Magia: 5 }
            },
            {
                id: 'bru_familiar_maior', nome: 'Invocação de Familiar Maior', custo: 1, tipo: 'ritual',
                descricao: 'Invoca monstro pequeno (ou 2 minúsculos): PV = dobro do bruxo, +10 acerto, VD 15, 1d12 dano. Controle até 200m.',
                tempoExecucao: '10 minutos'
            }
        ]
    },

    // ─── CAÇADOR DE DEMÔNIOS ───
    {
        id: 'cacador_demonios',
        nome: 'Caçador(a) de Demônios',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { feiticeiro_primario: 3, combatente_primario: 7 } },
        bonusPorRegalia: { pv: 3, estamina: 3, magia: 4 },
        descricao: 'Especialização em caça a corruptores, votos de caçada e combate sombrio.',
        regaliaObrigatoria: {
            custo: 2,
            escolhasHabilidades: [
                { grupo: ['combateArcano', 'fortitude'], pontos: 1 },
                { grupo: ['combateCorpoACorpo', 'combateADistancia'], pontos: 1 }
            ],
            bonusHabilidades: { teologia: 2, ocultismo: 2, ritualismo: 2, medicina: 2 },
            proficienciasGanhas: ['katanas', 'espada_diapasao', 'presa_serpente', 'montante_cinetico', 'armaduras_leves', 'armaduras_medias', 'armaduras_pesadas', 'escudos', 'conducao_exotica', 'kit_arrombamento'],
            habilidadeClasse: {
                nome: 'Rastreador Profano + Voto de Caçada',
                descricao: 'Passiva: Vantagem em investigação/rastreamento/percepção contra corruptores, fadas e celestiais. Ativa (10 PM): Vantagem dupla por 12h. Voto de Caçada (1 Ação, 5 PM): Marca criatura, ela fica vulnerável a seus ataques por 1 rodada, mas sofre 1d8 dano por ataque.',
                tipo: 'ativa',
                custoAcoes: 1, custoMagia: 5,
                efeito: { dano: '1d8', tipoDano: 'sombrio' }
            }
        },
        regaliasAvulsas: [
            {
                id: 'cd_sobreviver', nome: 'Sobreviver a Caçada', custo: 1, tipo: 'ativa',
                descricao: 'Após marcar com Voto de Caçada, usa ação para reduzir dano autoinfligido de 1d8 para 1d4.',
                custoAcoes: 1
            },
            {
                id: 'cd_corrida_fim', nome: 'Corrida contra o Fim', custo: 1, tipo: 'passiva',
                descricao: 'Pode realizar ataque extra contra criatura marcada pelo Voto. 1×/ação.',
                custoEstamina: 2
            },
            {
                id: 'cd_ataque_vampirico', nome: 'Ataque Vampírico', custo: 1, tipo: 'passiva',
                descricao: 'Uma vez por turno ao atacar, pode gastar 1 PM para recuperar 1d6 PV.',
                custoMagia: 1,
                efeito: { curaHP: '1d6' }
            },
            {
                id: 'cd_lado_sombrio', nome: 'Lado Sombrio', custo: 2, tipo: 'ritual',
                descricao: 'Meditação 1 min: ataques e armadura ganham propriedade sombria. Ataques neutros contra corruptores. Dura 8h.',
                custoMagia: 4, tempoExecucao: '1 minuto'
            },
            {
                id: 'cd_ataque_oportunidade', nome: 'Ataque de Oportunidade', custo: 2, tipo: 'reacao',
                descricao: 'Ataca quando criatura sair da área de ameaça ou atacar aliado no alcance.',
                custoEstamina: 2
            },
            {
                id: 'cd_recuperar_folego', nome: 'Recuperar Fôlego Maior', custo: 1, tipo: 'ativa',
                descricao: 'Todas as ações do turno: recupera 8 PV e 6 PE.',
                custoAcoes: 3, custoMagia: 4,
                efeito: { curaHP: 8 }
            },
            {
                id: 'cd_arma_secundaria', nome: 'Treinamento com Arma Secundária', custo: 1, tipo: 'passiva',
                descricao: 'Pré-requisito: Combate com duas armas. Não custa PE para duas armas e segunda não precisa ser leve.',
                preRequisitos: { regalia: 'combate_duas_armas' }
            },
            {
                id: 'cd_aparar', nome: 'Aparar', custo: 1, tipo: 'reacao',
                descricao: 'Antes do rolamento, +2 VD neste ataque. Pode repetir a +2 PE.',
                custoEstamina: 2,
                efeito: { bonusDefesa: 2 },
                escalamento: { custoEstaminaRepetirMesmoTurno: 2 }
            },
            {
                id: 'cd_festim', nome: 'Festim Macabro', custo: 3, tipo: 'feitico',
                descricao: 'Espíritos em 6m por 3 rodadas: 7 dano ao entrar/início. 50% Aterrorizado. +2 dano por 5 PM extras.',
                custoAcoes: 2, custoMagia: 10,
                efeito: { chanceSucesso: 50, condicao: 'Aterrorizado' }
            },
            {
                id: 'cd_bater_escudo', nome: 'Bater com Escudo', custo: 1, tipo: 'passiva',
                descricao: 'Pré-requisito: Lado Sombrio, Combate Defensivo. Escudo como arma secundária: 3 dano sagrado.',
                preRequisitos: { regalia: ['cd_lado_sombrio', 'combate_defensivo'] }
            },
            {
                id: 'cd_lado_irrestrito', nome: 'Lado Sombrio Irrestrito', custo: 2, tipo: 'ativa',
                descricao: 'Durante Lado Sombrio: explode escuridão interna. 2d10 sombrio em 1,5m, +1d6 sombrio nos ataques, +1 VD, resistente a armas não elementais/mágicas. Vulnerável a sagrado. Dura 1 min.',
                custoAcoes: 2, custoMagia: 8,
                efeito: { dano: '2d10', tipoDano: 'sombrio' }
            },
            {
                id: 'cd_corte_sombras', nome: 'Corte das Sombras', custo: 2, tipo: 'feitico',
                descricao: 'Corte negro em linha até 12m: 5d10 dano sombrio no alvo, metade em criaturas na linha.',
                custoAcoes: 2, custoMagia: 8,
                efeito: { dano: '5d10', tipoDano: 'sombrio' }
            },
            {
                id: 'cd_ataque_conjurativo', nome: 'Ataque Conjurativo', custo: 2, tipo: 'ativa',
                descricao: 'Ao atacar a 1,5m: conjura feitiço de até 2 ações. Magia de área centralizada no alvo (afeta todos, inclusive a si).',
                custoAcoes: 1, custoEstamina: 5
            }
        ]
    }
];

export default especializacoesData;
