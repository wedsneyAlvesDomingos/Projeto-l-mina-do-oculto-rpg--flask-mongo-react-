/**
 * Regras do Sistema Lâmina do Oculto
 * Ref: Livro LDO 0.5 (docs/Lâmina do Oculto 0.5.txt)
 * 
 * Este arquivo contém funções e constantes para as mecânicas do jogo.
 * Inclui: Vantagem/Desvantagem, Dinheiro, Bônus/Penalidades, Itens Mágicos,
 * Vulnerabilidade/Resistência, Armadilhas, Rituais, Luz/Visão, Descanso,
 * Iniciativa, Defesa, Velocidade, Acerto, Dano, Ações, Combate
 * 
 * Auditado em TODO-RUL-001 contra o livro v0.5
 */

// Import para lookup de peso em equipamentos
import { getPesoItem } from './equipamentos';

// ============================================================================
// CONSTANTES FUNDAMENTAIS DE COMBATE
// ============================================================================

/**
 * Uma rodada dura 6 segundos no tempo da história
 * Todos os participantes agem em turnos dentro de uma rodada
 */
export const DURACAO_RODADA_SEGUNDOS = 6;

/**
 * Número de ações que um personagem pode realizar por turno
 */
export const ACOES_POR_TURNO = 3;

/**
 * Campo de visão em graus (cone)
 */
export const CAMPO_VISAO_GRAUS = 100;

/**
 * Distância máxima de visão em luz completa (metros)
 */
export const DISTANCIA_VISAO_LUZ_COMPLETA = 500;

/**
 * Alcance de ameaça padrão para corpo a corpo (metros)
 */
export const ALCANCE_AMEACA_PADRAO = 1.5;

/**
 * Alcance de ameaça com armas de haste (metros)
 */
export const ALCANCE_AMEACA_HASTE = 3;

/**
 * Alcance máximo de ameaça com habilidades especiais (metros)
 */
export const ALCANCE_AMEACA_MAXIMO = 4.5;

// ============================================================================
// SISTEMA DE INICIATIVA
// ============================================================================

/**
 * Bônus de Iniciativa = Agilidade + Percepção
 * Ref: LDO 0.5, seção Iniciativa
 * @param {number} agilidade - Valor de Agilidade
 * @param {number} percepcao - Valor de Percepção
 * @returns {number} Bônus de iniciativa
 */
export const calcularBonusIniciativa = (agilidade = 0, percepcao = 0) => {
    return agilidade + percepcao;
};

/**
 * Rola iniciativa para um personagem
 * @param {number} agilidade - Valor de Agilidade
 * @param {number} percepcao - Valor de Percepção
 * @param {number} bonusAdicional - Bônus adicional de regalias/itens
 * @returns {object} { rolagem, bonus, total }
 */
export const rolarIniciativa = (agilidade = 0, percepcao = 0, bonusAdicional = 0) => {
    const rolagem = Math.floor(Math.random() * 20) + 1;
    const bonus = calcularBonusIniciativa(agilidade, percepcao) + bonusAdicional;
    const total = rolagem + bonus;
    
    return {
        rolagem,
        bonus,
        bonusAgilidade: agilidade,
        bonusPercepcao: percepcao,
        bonusAdicional,
        total,
        descricao: `Iniciativa: ${rolagem} + ${bonus} = ${total}`
    };
};

/**
 * Ordena participantes por iniciativa (maior para menor)
 * Em caso de empate, maior bônus de iniciativa vai primeiro
 * @param {Array} participantes - Array de { id, nome, total, bonus }
 * @returns {Array} Participantes ordenados
 */
export const ordenarPorIniciativa = (participantes) => {
    return [...participantes].sort((a, b) => {
        if (b.total !== a.total) return b.total - a.total;
        if (b.bonus !== a.bonus) return b.bonus - a.bonus;
        // Mesmo valor e bônus: ordem original (decisão do mestre)
        return 0;
    });
};

// ============================================================================
// SISTEMA DE DEFESA
// ============================================================================

/**
 * Tabela de bônus de defesa por pontos de Agilidade
 * Ref: LDO 0.5, seção Defesa
 * Fórmulas:
 *   Sem armadura:       7 + bônusAgilidade
 *   Leve/Média:         7 + bônusAgilidade + armadura.bonusDefesa + escudo
 *   Pesada:             armadura.defesa + escudo  (armadura.defesa JÁ inclui base 7)
 */
export const BONUS_DEFESA_AGILIDADE = {
    0: 3,   // 0 pontos em Agilidade = +3 de defesa
    3: 4,   // 3 pontos em Agilidade = +4 de defesa
    6: 5,   // 6 pontos em Agilidade = +5 de defesa
    9: 6,   // 9 pontos em Agilidade = +6 de defesa (interpolado)
    12: 7   // 12 pontos em Agilidade (máx) = +7 de defesa
};

/**
 * Calcula o bônus de defesa baseado na Agilidade
 * @param {number} agilidade - Valor de Agilidade
 * @returns {number} Bônus de defesa
 */
export const calcularBonusDefesaAgilidade = (agilidade) => {
    if (agilidade >= 12) return 7;
    if (agilidade >= 9) return 6;
    if (agilidade >= 6) return 5;
    if (agilidade >= 3) return 4;
    return 3;
};

/**
 * Calcula o valor de defesa total
 * @param {object} params - Parâmetros de defesa
 * @param {number} params.agilidade - Valor de Agilidade
 * @param {number} params.defesaArmadura - Valor da armadura
 * @param {number} params.defesaEscudo - Valor do escudo
 * @param {boolean} params.armaduraPesada - Se usa armadura pesada
 * @param {boolean} params.temProficienciaEscudo - Se tem proficiência em escudo
 * @param {number} params.bonusAdicional - Bônus de magias/itens
 * @returns {object} { defesaTotal, componentes, formula }
 */
export const calcularDefesaTotal = ({ 
    agilidade = 0, 
    defesaArmadura = 0, 
    defesaEscudo = 0, 
    armaduraPesada = false,
    temProficienciaEscudo = true,
    bonusAdicional = 0 
}) => {
    const escudoEfetivo = temProficienciaEscudo ? defesaEscudo : 0;
    const bonusAgilidadeValor = calcularBonusDefesaAgilidade(agilidade);
    
    let defesaTotal;
    let formula;
    let componentes;
    
    if (armaduraPesada) {
        // Armaduras pesadas: defesa absoluta + escudo (base 7 já inclusa em defesaArmadura)
        // Ref: LDO 0.5 — "Valor de Defesa = armadura pesada + escudo"
        defesaTotal = defesaArmadura + escudoEfetivo + bonusAdicional;
        formula = `${defesaArmadura} (armadura) + ${escudoEfetivo} (escudo)${bonusAdicional > 0 ? ` + ${bonusAdicional} (bônus)` : ''}`;
        componentes = {
            base: 0,
            agilidade: 0,
            armadura: defesaArmadura,
            escudo: escudoEfetivo,
            bonus: bonusAdicional
        };
    } else {
        // Armaduras leves/médias: 7 + Bônus Agilidade + Armadura + Escudo
        // Ref: LDO 0.5 — "Valor de Defesa = 7 + bônus de Agilidade + armadura + escudo"
        defesaTotal = 7 + bonusAgilidadeValor + defesaArmadura + escudoEfetivo + bonusAdicional;
        formula = `7 (base) + ${bonusAgilidadeValor} (agilidade) + ${defesaArmadura} (armadura) + ${escudoEfetivo} (escudo)${bonusAdicional > 0 ? ` + ${bonusAdicional} (bônus)` : ''}`;
        componentes = {
            base: 7,
            agilidade: bonusAgilidadeValor,
            armadura: defesaArmadura,
            escudo: escudoEfetivo,
            bonus: bonusAdicional
        };
    }
    
    return { defesaTotal, componentes, formula, armaduraPesada };
};

// ============================================================================
// SISTEMA DE VELOCIDADE DE MOVIMENTO
// ============================================================================

/**
 * Tabela de aumento de velocidade por Agilidade
 */
export const BONUS_VELOCIDADE_AGILIDADE = {
    3: 1.5,   // 3 pontos = +1.5m
    6: 3,     // 6 pontos = +3m
    9: 4.5,   // 9 pontos = +4.5m
    12: 6     // 12 pontos (máx) = +6m
};

/**
 * Penalidade de velocidade por armadura pesada
 */
export const PENALIDADE_VELOCIDADE_ARMADURA_PESADA = 1.5;

/**
 * Calcula a velocidade de movimento total
 * @param {number} velocidadeBaseEspecie - Velocidade base da espécie (metros)
 * @param {number} agilidade - Valor de Agilidade
 * @param {boolean} armaduraPesada - Se usa armadura pesada
 * @param {number} bonusAdicional - Bônus de magias/itens
 * @returns {object} { velocidadeTotal, componentes }
 */
export const calcularVelocidadeMovimento = (velocidadeBaseEspecie = 9, agilidade = 0, armaduraPesada = false, bonusAdicional = 0) => {
    // Calcular bônus de agilidade
    // Ref: LDO 0.5 — Agilidade 3→+1.5m, 6→+3m, 9→+4.5m, 12→+6m
    let bonusAgilidade = 0;
    if (agilidade >= 12) bonusAgilidade = 6;
    else if (agilidade >= 9) bonusAgilidade = 4.5;
    else if (agilidade >= 6) bonusAgilidade = 3;
    else if (agilidade >= 3) bonusAgilidade = 1.5;
    
    // Penalidade de armadura pesada
    const penalidadeArmadura = armaduraPesada ? PENALIDADE_VELOCIDADE_ARMADURA_PESADA : 0;
    
    const velocidadeTotal = Math.max(0, velocidadeBaseEspecie + bonusAgilidade - penalidadeArmadura + bonusAdicional);
    
    return {
        velocidadeTotal,
        velocidadeBase: velocidadeBaseEspecie,
        bonusAgilidade,
        penalidadeArmadura,
        bonusAdicional,
        velocidadeEsgueirar: Math.max(0, velocidadeTotal - 1.5),
        velocidadeDispara: velocidadeTotal * 4,
        descricao: `${velocidadeBaseEspecie}m (base) + ${bonusAgilidade}m (agilidade)${penalidadeArmadura > 0 ? ` - ${penalidadeArmadura}m (armadura pesada)` : ''} = ${velocidadeTotal}m`
    };
};

// ============================================================================
// SISTEMA DE ACERTO
// ============================================================================

/**
 * Calcula resultado de um ataque
 * Ref: LDO 0.5, seção Combate — Acerto, Crítico e Overshoot
 * Pipeline: d20 + habilidade de combate → compara com Defesa do alvo
 *   > Defesa = acerto, = Defesa = acerto parcial (dano ÷ 2), < Defesa = erro
 *   Nat 1 = falha crítica, Nat 20 (ou >= margemCritico) = crítico (dano × 2)
 *   Superar por +10: +1d4 | +15: +2 | +20: +3
 * @param {number} rolagemD20 - Valor rolado no d20
 * @param {number} bonusAcerto - Bônus total de acerto
 * @param {number} defesaAlvo - Valor de defesa do alvo
 * @param {number} margemCritico - Margem de acerto crítico (padrão 20)
 * @returns {object} Resultado do ataque
 */
export const calcularResultadoAtaque = (rolagemD20, bonusAcerto, defesaAlvo, margemCritico = 20) => {
    const totalAcerto = rolagemD20 + bonusAcerto;
    const diferenca = totalAcerto - defesaAlvo;
    
    // Verificar crítico natural
    const isCriticoNatural = rolagemD20 >= margemCritico;
    const isFalhaCritica = rolagemD20 === 1;
    
    let resultado;
    let multiplicadorDano = 1;
    let bonusDano = 0;
    
    if (isFalhaCritica) {
        resultado = 'falha_critica';
        multiplicadorDano = 0;
    } else if (isCriticoNatural) {
        resultado = 'acerto_critico';
        multiplicadorDano = 2; // Dano dobrado
    } else if (totalAcerto > defesaAlvo) {
        resultado = 'acerto';
        // Bônus por superar defesa (overshoot)
        // Ref: LDO 0.5 — "+10: +1d4 dano | +15: +2 dano | +20: +3 dano"
        if (diferenca >= 20) {
            bonusDano = 3;
        } else if (diferenca >= 15) {
            bonusDano = 2;
        } else if (diferenca >= 10) {
            bonusDano = Math.floor(Math.random() * 4) + 1; // 1d4
        }
    } else if (totalAcerto === defesaAlvo) {
        resultado = 'acerto_parcial'; // Dano reduzido pela metade
        multiplicadorDano = 0.5;
    } else {
        resultado = 'erro';
        multiplicadorDano = 0;
    }
    
    return {
        rolagemD20,
        bonusAcerto,
        totalAcerto,
        defesaAlvo,
        diferenca,
        resultado,
        multiplicadorDano,
        bonusDanoPorDiferenca: bonusDano,
        isCriticoNatural,
        isFalhaCritica,
        margemCritico,
        descricao: getDescricaoResultadoAtaque(resultado, totalAcerto, defesaAlvo, bonusDano)
    };
};

/**
 * Gera descrição do resultado do ataque
 */
const getDescricaoResultadoAtaque = (resultado, total, defesa, bonus) => {
    switch (resultado) {
        case 'falha_critica':
            return `💀 FALHA CRÍTICA! (${total} vs ${defesa})`;
        case 'acerto_critico':
            return `🎯 ACERTO CRÍTICO! Dano dobrado! (${total} vs ${defesa})`;
        case 'acerto':
            return `✓ Acerto! (${total} vs ${defesa})${bonus > 0 ? ` +${bonus} dano bônus` : ''}`;
        case 'acerto_parcial':
            return `↓ Acerto parcial! Dano reduzido pela metade (${total} = ${defesa})`;
        case 'erro':
            return `✗ Erro! (${total} vs ${defesa})`;
        default:
            return `${total} vs ${defesa}`;
    }
};

/**
 * Calcula dano final de um ataque
 * @param {number} danoBase - Dano base do ataque
 * @param {object} resultadoAtaque - Resultado de calcularResultadoAtaque
 * @param {number} bonusAtributo - Bônus de Força/Destreza
 * @param {number} bonusAdicional - Outros bônus de dano
 * @returns {object} { danoFinal, componentes }
 */
export const calcularDanoFinal = (danoBase, resultadoAtaque, bonusAtributo = 0, bonusAdicional = 0) => {
    if (resultadoAtaque.multiplicadorDano === 0) {
        return {
            danoFinal: 0,
            danoBase,
            bonusAtributo,
            bonusAdicional,
            bonusPorDiferenca: 0,
            multiplicador: 0,
            descricao: 'Sem dano (erro)'
        };
    }
    
    const subTotal = danoBase + bonusAtributo + bonusAdicional;
    const danoAposMultiplicador = Math.floor(subTotal * resultadoAtaque.multiplicadorDano);
    const danoFinal = danoAposMultiplicador + resultadoAtaque.bonusDanoPorDiferenca;
    
    return {
        danoFinal: Math.max(1, danoFinal), // Mínimo 1 de dano
        danoBase,
        bonusAtributo,
        bonusAdicional,
        bonusPorDiferenca: resultadoAtaque.bonusDanoPorDiferenca,
        multiplicador: resultadoAtaque.multiplicadorDano,
        isCritico: resultadoAtaque.isCriticoNatural,
        descricao: resultadoAtaque.isCriticoNatural 
            ? `(${subTotal} × 2) + ${resultadoAtaque.bonusDanoPorDiferenca} = ${danoFinal} (CRÍTICO!)`
            : `${danoBase} + ${bonusAtributo} + ${bonusAdicional} = ${danoFinal}`
    };
};

// ============================================================================
// SISTEMA ELEMENTAL DE DANO
// ============================================================================

/**
 * Matriz de interações elementais
 * Ref: LDO 0.5, seção Elementos
 * forte = dano dobrado, fraco = metade do dano
 */
export const INTERACOES_ELEMENTAIS = {
    fogo: {
        forte: ['terra'],
        fraco: ['gelo', 'fogo'],
        descricao: 'Fogo é forte contra Terra, fraco contra Gelo e Fogo'
    },
    gelo: {
        forte: ['fogo'],
        fraco: ['raio'],
        neutro: ['gelo'], // Gelo contra gelo não tem penalidade
        descricao: 'Gelo é forte contra Fogo, fraco contra Raio'
    },
    raio: {
        forte: ['gelo'],
        fraco: ['terra', 'raio'],
        descricao: 'Raio é forte contra Gelo, fraco contra Terra e Raio'
    },
    terra: {
        forte: ['raio'],
        fraco: ['fogo', 'terra'],
        descricao: 'Terra é forte contra Raio, fraco contra Fogo e Terra'
    },
    sombrio: {
        forte: ['fogo', 'gelo', 'raio', 'terra'],
        fraco: ['sagrado', 'sombrio'],
        descricao: 'Sombrio é forte contra elementos básicos, fraco contra Sagrado'
    },
    sagrado: {
        forte: ['sombrio', 'necrotico'],
        fraco: ['fogo', 'gelo', 'raio', 'terra'],
        imune: ['sagrado'], // Sagrado contra sagrado = 0 dano
        descricao: 'Sagrado é forte contra Sombrio/Necrótico, fraco contra elementos básicos'
    },
    necrotico: {
        forte: ['fogo', 'gelo', 'raio', 'terra', 'sombrio'],
        fraco: ['sagrado'],
        cura: ['necrotico'], // Necrótico contra necrótico = cura
        descricao: 'Necrótico é forte contra todos exceto Sagrado, cura alvos necróticos'
    },
    arcano: {
        neutro: true, // Sempre dano normal
        descricao: 'Arcano não tem força nem fraqueza específica'
    },
    // Tipos físicos (sem interação elemental especial)
    cortante: { neutro: true, descricao: 'Dano físico cortante' },
    perfurante: { neutro: true, descricao: 'Dano físico perfurante' },
    contundente: { neutro: true, descricao: 'Dano físico contundente' },
    impacto: { neutro: true, descricao: 'Dano de impacto (combate desarmado)' }
};

/**
 * Calcula dano considerando interação elemental
 * @param {number} danoBase - Dano base
 * @param {string} tipoAtaque - Tipo de dano do ataque
 * @param {string} elementoAlvo - Elemento do alvo (se houver)
 * @returns {object} { danoFinal, modificador, descricao }
 */
export const calcularDanoElemental = (danoBase, tipoAtaque, elementoAlvo = null) => {
    if (!elementoAlvo || !tipoAtaque) {
        return { danoFinal: danoBase, modificador: 'normal', multiplicador: 1, descricao: '' };
    }
    
    const tipoLower = tipoAtaque.toLowerCase();
    const alvoLower = elementoAlvo.toLowerCase();
    const interacao = INTERACOES_ELEMENTAIS[tipoLower];
    
    if (!interacao || interacao.neutro === true) {
        return { danoFinal: danoBase, modificador: 'normal', multiplicador: 1, descricao: '' };
    }
    
    // Verificar imunidade (ex: sagrado vs sagrado)
    if (interacao.imune?.includes(alvoLower)) {
        return {
            danoFinal: 0,
            modificador: 'imune',
            multiplicador: 0,
            descricao: `${tipoAtaque} é anulado por ${elementoAlvo}`
        };
    }
    
    // Verificar cura (ex: necrótico vs necrótico)
    if (interacao.cura?.includes(alvoLower)) {
        return {
            danoFinal: -danoBase, // Negativo indica cura
            modificador: 'cura',
            multiplicador: -1,
            descricao: `${tipoAtaque} cura alvos ${elementoAlvo}!`
        };
    }
    
    // Verificar força
    if (interacao.forte?.includes(alvoLower)) {
        return {
            danoFinal: danoBase * 2,
            modificador: 'forte',
            multiplicador: 2,
            descricao: `${tipoAtaque} é FORTE contra ${elementoAlvo}! (×2)`
        };
    }
    
    // Verificar fraqueza
    if (interacao.fraco?.includes(alvoLower)) {
        return {
            danoFinal: Math.floor(danoBase / 2),
            modificador: 'fraco',
            multiplicador: 0.5,
            descricao: `${tipoAtaque} é fraco contra ${elementoAlvo} (÷2)`
        };
    }
    
    // Neutro específico (como gelo vs gelo)
    if (interacao.neutro?.includes(alvoLower)) {
        return { danoFinal: danoBase, modificador: 'neutro', multiplicador: 1, descricao: '' };
    }
    
    return { danoFinal: danoBase, modificador: 'normal', multiplicador: 1, descricao: '' };
};

// ============================================================================
// DANO DE QUEDA
// ============================================================================

/**
 * Tabela de dano por queda
 * Ref: LDO 0.5, seção Queda
 * Cada 3m = incremento de dano progressivo
 */
export const TABELA_DANO_QUEDA = [
    { altura: 3, dano: 1 },
    { altura: 6, dano: 2 },
    { altura: 9, dano: 4 },
    { altura: 12, dano: 6 },
    { altura: 15, dano: 8 },
    { altura: 18, dano: 10 },
    { altura: 21, dano: 13 },
    { altura: 24, dano: 16 },
    { altura: 27, dano: 20 },
    { altura: 30, dano: 24 },
    // Continua progressivamente...
    { altura: 450, dano: 300 } // Máximo
];

/**
 * Calcula dano de queda baseado na altura
 * @param {number} alturaMetros - Altura da queda em metros
 * @param {boolean} atenuado - Se usou reação para atenuar (metade do dano)
 * @param {boolean} sucessoAcrobacia - Se passou no teste de acrobacia
 * @returns {object} { dano, atenuado, descricao }
 */
export const calcularDanoQueda = (alturaMetros, atenuado = false, sucessoAcrobacia = false) => {
    if (alturaMetros < 3) {
        return { dano: 0, atenuado: false, descricao: 'Queda de menos de 3m - sem dano' };
    }
    
    // Fórmula aproximada: a cada 3m, dano aumenta progressivamente
    // Simplificando: dano ≈ (altura/3) * fator progressivo
    let danoBase;
    
    if (alturaMetros <= 30) {
        // Usar tabela direta para alturas comuns
        const entrada = TABELA_DANO_QUEDA.find(e => alturaMetros <= e.altura);
        danoBase = entrada?.dano || Math.floor(alturaMetros / 3) * 2;
    } else {
        // Para alturas maiores: progressão ~2/3 da altura (máximo 300)
        danoBase = Math.min(300, Math.floor(alturaMetros * 0.67));
    }
    
    let danoFinal = danoBase;
    let descricao = `Queda de ${alturaMetros}m`;
    
    if (atenuado && sucessoAcrobacia) {
        danoFinal = Math.max(Math.floor(danoBase / 2), 1); // Mínimo 1d4 -> 1 ponto
        descricao += ` (atenuado: ${danoFinal} dano)`;
    } else {
        descricao += ` = ${danoFinal} dano`;
    }
    
    return {
        dano: danoFinal,
        danoOriginal: danoBase,
        atenuado: atenuado && sucessoAcrobacia,
        altura: alturaMetros,
        descricao
    };
};

// ============================================================================
// SISTEMA DE COBERTURA
// ============================================================================

export const TIPOS_COBERTURA = {
    NENHUMA: {
        id: 'nenhuma',
        nome: 'Sem Cobertura',
        bonusDefesa: 0,
        bloqueiaAtaques: false,
        descricao: 'Nenhuma proteção contra ataques à distância'
    },
    MEIA: {
        id: 'meia',
        nome: 'Meia Cobertura',
        bonusDefesa: 1,
        bloqueiaAtaques: false,
        descricao: 'Protege metade do corpo (+1 defesa)'
    },
    TRES_QUARTOS: {
        id: 'tres_quartos',
        nome: 'Cobertura de ¾',
        bonusDefesa: 2,
        bloqueiaAtaques: false,
        descricao: 'Protege ¾ do corpo (+2 defesa)'
    },
    TOTAL: {
        id: 'total',
        nome: 'Cobertura Total',
        bonusDefesa: 0,
        bloqueiaAtaques: true,
        obscurecido: true,
        descricao: 'Protege todo o corpo (não pode ser alvejado por ataques à distância)'
    }
};

/**
 * Calcula modificador de defesa por cobertura
 * @param {string} tipoCobertura - ID do tipo de cobertura
 * @returns {object} { bonusDefesa, bloqueiaAtaques, descricao }
 */
export const calcularBonusCobertura = (tipoCobertura) => {
    const cobertura = TIPOS_COBERTURA[tipoCobertura?.toUpperCase()] || TIPOS_COBERTURA.NENHUMA;
    return {
        bonusDefesa: cobertura.bonusDefesa,
        bloqueiaAtaques: cobertura.bloqueiaAtaques,
        obscurecido: cobertura.obscurecido || false,
        descricao: cobertura.descricao,
        nome: cobertura.nome
    };
};

// ============================================================================
// SISTEMA DE AÇÕES
// ============================================================================

/**
 * Categorias de ações disponíveis no sistema
 */
export const CATEGORIAS_ACOES = {
    PADRAO: 'padrao',           // Custa 1 ação
    TURNO_COMPLETO: 'turno_completo', // Custa 3 ações (turno inteiro)
    DUAS_ACOES: 'duas_acoes',   // Custa 2 ações
    LIVRE: 'livre',             // Não conta como ação
    REACAO: 'reacao',           // Usada em resposta
    MOVIMENTO: 'movimento'      // Ação de movimento
};

/**
 * Lista completa de ações do sistema
 */
export const ACOES = {
    // === AÇÕES PADRÃO (1 ação) ===
    ATACAR: {
        id: 'atacar',
        nome: 'Atacar',
        categoria: CATEGORIAS_ACOES.PADRAO,
        custo: 1,
        descricao: 'Realizar um ataque com arma ou desarmado',
        regras: [
            'Cada criatura pode atacar apenas uma vez por ação',
            'A partir da segunda ação "atacar" no mesmo turno, os ataques têm desvantagem',
            'Superar defesa em +10: +1d4 dano | +15: +2 dano | +20: +3 dano'
        ]
    },
    AGARRAR: {
        id: 'agarrar',
        nome: 'Agarrar',
        categoria: CATEGORIAS_ACOES.PADRAO,
        custo: 1,
        descricao: 'Tentar agarrar um oponente',
        teste: 'Força vs Força do adversário',
        regras: [
            'Sucesso coloca o alvo na condição Agarrado',
            'Agarrado: velocidade 0, ataques contra ele têm vantagem',
            'Falhas consecutivas no mesmo turno: -2 cumulativo',
            'Não pode agarrar criaturas 2 tamanhos maiores'
        ]
    },
    BUSCAR: {
        id: 'buscar',
        nome: 'Buscar',
        categoria: CATEGORIAS_ACOES.PADRAO,
        custo: 1,
        descricao: 'Localizar visualmente um objeto, rota ou criatura',
        teste: 'Percepção'
    },
    BUSCAR_COBERTURA: {
        id: 'buscar_cobertura',
        nome: 'Buscar Cobertura',
        categoria: CATEGORIAS_ACOES.PADRAO,
        custo: 1,
        descricao: 'Abrigar-se atrás de obstáculos para proteção',
        regras: [
            'Cobertura Total: obscurecido, não pode ser alvejado',
            'Cobertura ¾: +2 defesa',
            'Meia Cobertura: +1 defesa'
        ]
    },
    COMANDAR_ANIMAL: {
        id: 'comandar_animal',
        nome: 'Comandar Animal',
        categoria: CATEGORIAS_ACOES.PADRAO,
        custo: 1,
        descricao: 'Ordenar a um companheiro animal'
    },
    DISTRAIR: {
        id: 'distrair',
        nome: 'Distrair',
        categoria: CATEGORIAS_ACOES.PADRAO,
        custo: 1,
        descricao: 'Distrair um inimigo para ajudar aliados',
        teste: 'Enganação/Persuasão/Performance vs Intuição do alvo',
        efeito: 'Alvo sofre -2 em testes de ataque e percepção até fim do próximo turno'
    },
    DERRUBAR: {
        id: 'derrubar',
        nome: 'Derrubar',
        categoria: CATEGORIAS_ACOES.PADRAO,
        custo: 1,
        descricao: 'Tentar derrubar um oponente',
        teste: 'Força ou Destreza vs Força ou Destreza do adversário',
        regras: [
            'Sucesso coloca o alvo na condição Deitado',
            'Falhas consecutivas: -1 cumulativo',
            'Não pode derrubar criaturas 2x maiores ou com mais de 2 pernas'
        ]
    },
    DESARMAR: {
        id: 'desarmar',
        nome: 'Desarmar',
        categoria: CATEGORIAS_ACOES.PADRAO,
        custo: 1,
        descricao: 'Tentar fazer o oponente soltar sua arma',
        teste: 'Destreza vs Destreza do adversário',
        regras: ['Não funciona contra armas naturais ou presas ao corpo']
    },
    EMPURRAR: {
        id: 'empurrar',
        nome: 'Empurrar',
        categoria: CATEGORIAS_ACOES.PADRAO,
        custo: 1,
        descricao: 'Empurrar um oponente 1,5m para trás ou lado',
        teste: 'Força vs Força do adversário',
        regras: [
            'Falhas consecutivas: -2 cumulativo',
            'Não pode empurrar criaturas 2 tamanhos maiores ou enraizadas'
        ]
    },
    ESCAPAR: {
        id: 'escapar',
        nome: 'Escapar',
        categoria: CATEGORIAS_ACOES.PADRAO,
        custo: 1,
        descricao: 'Escapar de um agarrão ou restrição',
        teste: 'Acrobacia ou Atletismo vs Força do agarrador ou DC do efeito'
    },
    ESCONDER: {
        id: 'esconder',
        nome: 'Esconder',
        categoria: CATEGORIAS_ACOES.PADRAO,
        custo: 1,
        descricao: 'Esconder-se enquanto obscurecido',
        teste: 'Furtividade (DC definido pelo mestre)',
        regras: [
            'Precisa estar obscurecido ou fora do campo de visão',
            'Tentativas adicionais: -1 cumulativo'
        ]
    },
    ESCONDER_OBJETO: {
        id: 'esconder_objeto',
        nome: 'Esconder Objeto',
        categoria: CATEGORIAS_ACOES.PADRAO,
        custo: 1,
        descricao: 'Esconder um objeto em sua pessoa',
        teste: 'Furtividade (DC definido pelo mestre)',
        regras: [
            'Se for arma e sucesso: +1 acerto no próximo ataque, alvo fica Surpreso',
            'Tentativas adicionais: -1 cumulativo'
        ]
    },
    ESGUEIRAR: {
        id: 'esgueirar',
        nome: 'Esgueirar',
        categoria: CATEGORIAS_ACOES.PADRAO,
        custo: 1,
        descricao: 'Mover-se silenciosamente enquanto obscurecido',
        regras: ['Penalidade de -1,5m na velocidade de movimento']
    },
    FINTAR: {
        id: 'fintar',
        nome: 'Fintar',
        categoria: CATEGORIAS_ACOES.PADRAO,
        custo: 1,
        descricao: 'Enganar oponente para ganhar vantagem no ataque',
        teste: 'Enganação DC 12',
        regras: [
            'Sucesso: vantagem no próximo ataque corpo a corpo',
            'Apenas 1 finta por rodada',
            'Vantagem aumenta +1 dado por inimigo adicional a 1,5m'
        ]
    },
    FURTAR: {
        id: 'furtar',
        nome: 'Furtar',
        categoria: CATEGORIAS_ACOES.PADRAO,
        custo: 1,
        descricao: 'Furtar um item visível de outra criatura',
        teste: 'Destreza vs Percepção do alvo',
        requisito: 'Precisa estar escondido ou obscurecido'
    },
    INTERAGIR: {
        id: 'interagir',
        nome: 'Interagir',
        categoria: CATEGORIAS_ACOES.PADRAO,
        custo: 1,
        descricao: 'Interagir com um objeto simples',
        exemplos: ['Sacar/guardar arma', 'Abrir porta', 'Tomar poção', 'Ativar item']
    },
    INTIMIDAR: {
        id: 'intimidar',
        nome: 'Intimidar',
        categoria: CATEGORIAS_ACOES.PADRAO,
        custo: 1,
        descricao: 'Intimidar um inimigo',
        teste: 'Intimidação vs Intuição do alvo',
        efeito: 'Alvo fica Aterrorizado até fim do próximo turno'
    },
    LEVANTAR: {
        id: 'levantar',
        nome: 'Levantar',
        categoria: CATEGORIAS_ACOES.PADRAO,
        custo: 1,
        descricao: 'Levantar do chão'
    },
    LER_AMBIENTE: {
        id: 'ler_ambiente',
        nome: 'Ler Ambiente',
        categoria: CATEGORIAS_ACOES.PADRAO,
        custo: 1,
        descricao: 'Compreender situação ou detectar emoções',
        teste: 'Intuição vs Habilidade Social do alvo (Enganação, Persuasão, etc.)'
    },
    MONTAR: {
        id: 'montar',
        nome: 'Montar',
        categoria: CATEGORIAS_ACOES.PADRAO,
        custo: 1,
        descricao: 'Montar em uma montaria ou veículo'
    },
    PEDIR: {
        id: 'pedir',
        nome: 'Pedir',
        categoria: CATEGORIAS_ACOES.PADRAO,
        custo: 1,
        descricao: 'Pedir um item de um aliado'
    },
    PERFORMAR: {
        id: 'performar',
        nome: 'Performar',
        categoria: CATEGORIAS_ACOES.PADRAO,
        custo: 1,
        descricao: 'Realizar uma performance artística',
        teste: 'Performance',
        efeitos: [
            '5-9: +1 no próximo d20 do aliado',
            '10-14: vantagem',
            '15-19: vantagem +1',
            '20-24: vantagem +2',
            '25-29: vantagem +3',
            '30+: vantagem x2 +3'
        ]
    },
    RECORDAR_CONHECIMENTO: {
        id: 'recordar_conhecimento',
        nome: 'Recordar Conhecimento',
        categoria: CATEGORIAS_ACOES.PADRAO,
        custo: 1,
        descricao: 'Lembrar informações relevantes',
        teste: 'História/Ocultismo/Teologia/Religião/Tecnologia/Jurisprudência/Arcanismo'
    },

    // === AÇÕES DE 2 AÇÕES ===
    ABRIR_FECHADURA: {
        id: 'abrir_fechadura',
        nome: 'Abrir Fechadura',
        categoria: CATEGORIAS_ACOES.DUAS_ACOES,
        custo: 2,
        descricao: 'Arrombar uma fechadura',
        requisito: 'Proficiência com kit de arrombamento'
    },
    PREPARAR: {
        id: 'preparar',
        nome: 'Preparar',
        categoria: CATEGORIAS_ACOES.DUAS_ACOES,
        custo: 2,
        descricao: 'Preparar uma ação com gatilho',
        regras: ['Se o gatilho ocorrer até seu próximo turno, a ação é usada']
    },

    // === AÇÕES DE TURNO COMPLETO (3 ações) ===
    PRIMEIROS_SOCORROS: {
        id: 'primeiros_socorros',
        nome: 'Primeiros Socorros',
        categoria: CATEGORIAS_ACOES.TURNO_COMPLETO,
        custo: 3,
        descricao: 'Estabilizar criatura À Beira da Morte',
        requisito: 'Kit de médico ou herbalista'
    },
    TRATAR_VENENO: {
        id: 'tratar_veneno',
        nome: 'Tratar Veneno',
        categoria: CATEGORIAS_ACOES.TURNO_COMPLETO,
        custo: 3,
        descricao: 'Aplicar antídoto em criatura Envenenada',
        requisito: 'Frasco de antídoto adequado'
    },
    DISPARADA: {
        id: 'disparada',
        nome: 'Disparada',
        categoria: CATEGORIAS_ACOES.TURNO_COMPLETO,
        custo: 3,
        descricao: 'Correr 4x a velocidade de movimento',
        regras: ['Pode impor penalidades em esquivar ou outras ações']
    },
    DESABILITAR_DISPOSITIVO: {
        id: 'desabilitar_dispositivo',
        nome: 'Desabilitar/Habilitar Dispositivo',
        categoria: CATEGORIAS_ACOES.TURNO_COMPLETO,
        custo: 3,
        descricao: 'Desativar armadilha ou trabalhar em dispositivo complexo'
    },

    // === AÇÕES LIVRES ===
    DEITAR: {
        id: 'deitar',
        nome: 'Deitar',
        categoria: CATEGORIAS_ACOES.LIVRE,
        custo: 0,
        descricao: 'Deitar no chão (condição Deitado)'
    },
    SOLTAR: {
        id: 'soltar',
        nome: 'Soltar',
        categoria: CATEGORIAS_ACOES.LIVRE,
        custo: 0,
        descricao: 'Soltar um objeto (cai até 1,5m da criatura)'
    },
    ADIAR_TURNO: {
        id: 'adiar_turno',
        nome: 'Adiar Turno',
        categoria: CATEGORIAS_ACOES.LIVRE,
        custo: 0,
        descricao: 'Adiar turno para o fim da iniciativa',
        regras: ['Retorna à posição original na próxima rodada']
    },

    // === REAÇÕES ===
    ATENUAR_QUEDA: {
        id: 'atenuar_queda',
        nome: 'Atenuar Queda',
        categoria: CATEGORIAS_ACOES.REACAO,
        custo: 0,
        descricao: 'Reduzir dano de queda pela metade (mín 1d4)',
        teste: 'Acrobacia (DC definido pelo mestre)',
        regras: ['Precisa estar consciente']
    },
    AJUDAR: {
        id: 'ajudar',
        nome: 'Ajudar',
        categoria: CATEGORIAS_ACOES.REACAO,
        custo: 0,
        descricao: 'Ajudar aliado em teste de habilidade (não ataque)',
        regras: [
            'Precisa ter pelo menos 1 ponto na habilidade',
            'Normalmente concede +1 no rolamento'
        ]
    },
    AGARRAR_SE: {
        id: 'agarrar_se',
        nome: 'Agarrar-se',
        categoria: CATEGORIAS_ACOES.REACAO,
        custo: 0,
        descricao: 'Tentar se agarrar a algo para evitar queda',
        teste: 'Atletismo ou Agilidade (reflexo)'
    },

    // === AÇÕES DE MOVIMENTO ===
    ANDAR_CORRER: {
        id: 'andar_correr',
        nome: 'Andar/Correr',
        categoria: CATEGORIAS_ACOES.MOVIMENTO,
        custo: 1,
        descricao: 'Mover até a velocidade de movimento'
    },
    CONDUZIR_MONTARIA: {
        id: 'conduzir_montaria',
        nome: 'Conduzir Montaria',
        categoria: CATEGORIAS_ACOES.MOVIMENTO,
        custo: 1,
        descricao: 'Mover montaria até sua velocidade'
    },
    VOAR: {
        id: 'voar',
        nome: 'Voar',
        categoria: CATEGORIAS_ACOES.MOVIMENTO,
        custo: 1,
        descricao: 'Voar até a velocidade de voo',
        requisito: 'Capacidade de voo'
    },
    RECUAR_CUIDADOSAMENTE: {
        id: 'recuar_cuidadosamente',
        nome: 'Recuar Cuidadosamente',
        categoria: CATEGORIAS_ACOES.MOVIMENTO,
        custo: 1,
        descricao: 'Recuar 1,5m sem provocar ataque de oportunidade'
    },
    ESCALAR: {
        id: 'escalar',
        nome: 'Escalar',
        categoria: CATEGORIAS_ACOES.MOVIMENTO,
        custo: 1,
        descricao: 'Escalar até metade da velocidade',
        teste: 'Atletismo (se difícil)'
    },
    NADAR: {
        id: 'nadar',
        nome: 'Nadar',
        categoria: CATEGORIAS_ACOES.MOVIMENTO,
        custo: 1,
        descricao: 'Nadar até metade da velocidade',
        teste: 'Atletismo (se difícil)'
    },
    RASTEJAR: {
        id: 'rastejar',
        nome: 'Rastejar',
        categoria: CATEGORIAS_ACOES.MOVIMENTO,
        custo: 1,
        descricao: 'Rastejar até 1/3 da velocidade (deitado)'
    },
    SALTAR: {
        id: 'saltar',
        nome: 'Saltar',
        categoria: CATEGORIAS_ACOES.MOVIMENTO,
        custo: 1,
        descricao: 'Saltar horizontal ou vertical',
        regras: [
            'Horizontal: até metade do Atletismo em metros (mín 2m)',
            'Vertical: até 1/3 do Atletismo em metros (mín 1m)'
        ]
    },
    ATRAVESSAR_ACROBATICAMENTE: {
        id: 'atravessar_acrobaticamente',
        nome: 'Atravessar Acrobaticamente',
        categoria: CATEGORIAS_ACOES.MOVIMENTO,
        custo: 1,
        descricao: 'Atravessar superfícies difíceis',
        teste: 'Acrobacia (DC definido pelo mestre)'
    }
};

/**
 * Obtém ações por categoria
 * @param {string} categoria - Categoria de ação
 * @returns {Array} Array de ações da categoria
 */
export const getAcoesPorCategoria = (categoria) => {
    return Object.values(ACOES).filter(acao => acao.categoria === categoria);
};

/**
 * Obtém todas as ações padrão (1 ação)
 */
export const getAcoesPadrao = () => getAcoesPorCategoria(CATEGORIAS_ACOES.PADRAO);

/**
 * Obtém todas as ações de movimento
 */
export const getAcoesMovimento = () => getAcoesPorCategoria(CATEGORIAS_ACOES.MOVIMENTO);

/**
 * Obtém todas as reações
 */
export const getReacoes = () => getAcoesPorCategoria(CATEGORIAS_ACOES.REACAO);

/**
 * Obtém todas as ações livres
 */
export const getAcoesLivres = () => getAcoesPorCategoria(CATEGORIAS_ACOES.LIVRE);

// ============================================================================
// COMBATE MONTADO
// ============================================================================

/**
 * Verifica se pode montar uma criatura
 * @param {string} tamanhoMontador - Tamanho do montador
 * @param {string} tamanhoMontaria - Tamanho da montaria
 * @returns {boolean} Se pode montar
 */
export const podeMontarCriatura = (tamanhoMontador, tamanhoMontaria) => {
    const ordem = ['minusculo', 'pequeno', 'medio', 'grande', 'muito_grande', 'gigante', 'colossal'];
    const indexMontador = ordem.indexOf(tamanhoMontador);
    const indexMontaria = ordem.indexOf(tamanhoMontaria);
    
    // Montador não pode ser maior que a montaria
    return indexMontador <= indexMontaria;
};

/**
 * Calcula DC para controlar montaria não treinada
 * @param {number} tentativas - Número de tentativas no combate atual
 * @returns {number} DC do teste de Lidar com Animais
 */
export const calcularDCMontariaNaoTreinada = (tentativas = 0) => {
    return 10 + tentativas;
};

// ============================================================================
// VANTAGEM E DESVANTAGEM
// ============================================================================

/**
 * Calcula quantos d20 devem ser rolados e se pega o maior ou menor resultado
 * Ref: LDO 0.5, seção Vantagem/Desvantagem
 *   Vantagens acumulam (cada vantagem = +1 dado extra, pega maior)
 *   Desvantagem NÃO acumula (sempre 2d20, pega menor)
 * @param {number} vantagens - Número de vantagens
 * @param {number} desvantagens - Número de desvantagens
 * @returns {object} { dados: número de d20s, tipo: 'vantagem'|'desvantagem'|'normal' }
 */
export const calcularVantagemDesvantagem = (vantagens = 0, desvantagens = 0) => {
    const diferenca = vantagens - desvantagens;
    
    if (diferenca === 0) {
        return { dados: 1, tipo: 'normal', descricao: 'Rolamento normal (1d20)' };
    } else if (diferenca > 0) {
        // Vantagem: rola 1 + número de vantagens líquidas
        const numDados = 1 + diferenca;
        return { 
            dados: numDados, 
            tipo: 'vantagem', 
            descricao: `Vantagem ${diferenca > 1 ? (diferenca === 2 ? 'dupla' : diferenca === 3 ? 'tripla' : `x${diferenca}`) : ''} (${numDados}d20, pega o maior)`
        };
    } else {
        // Desvantagem: rola 2d20 e pega o menor (desvantagem não acumula como vantagem)
        return { 
            dados: 2, 
            tipo: 'desvantagem', 
            descricao: 'Desvantagem (2d20, pega o menor)'
        };
    }
};

/**
 * Rola dados com vantagem ou desvantagem
 * @param {number} vantagens - Número de vantagens
 * @param {number} desvantagens - Número de desvantagens
 * @param {number} bonus - Bônus a adicionar ao resultado
 * @returns {object} Resultado da rolagem
 */
export const rolarComVantagemDesvantagem = (vantagens = 0, desvantagens = 0, bonus = 0) => {
    const config = calcularVantagemDesvantagem(vantagens, desvantagens);
    const rolagens = [];
    
    for (let i = 0; i < config.dados; i++) {
        rolagens.push(Math.floor(Math.random() * 20) + 1);
    }
    
    let resultado;
    if (config.tipo === 'vantagem') {
        resultado = Math.max(...rolagens);
    } else if (config.tipo === 'desvantagem') {
        resultado = Math.min(...rolagens);
    } else {
        resultado = rolagens[0];
    }
    
    const total = resultado + bonus;
    const isCritico = resultado === 20;
    const isFalha = resultado === 1;
    
    return {
        rolagens,
        resultadoBase: resultado,
        bonus,
        total,
        tipo: config.tipo,
        descricao: config.descricao,
        isCritico,
        isFalha,
        isCriticoNatural: isCritico,
        isFalhaCritica: isFalha
    };
};

// ============================================================================
// SISTEMA DE DINHEIRO
// ============================================================================

export const MOEDAS = {
    PLATINA: { nome: 'Platina', sigla: 'M.P.', valorEmCobre: 1000 },
    OURO: { nome: 'Ouro', sigla: 'M.O.', valorEmCobre: 100 },
    PRATA: { nome: 'Prata', sigla: 'M.P.', valorEmCobre: 10 },
    COBRE: { nome: 'Cobre', sigla: 'M.C.', valorEmCobre: 1 }
};

export const TAXA_CONVERSAO = 10;

/**
 * Converte um valor total em cobre para moedas otimizadas
 * @param {number} cobreTotal - Valor total em moedas de cobre
 * @returns {object} { platina, ouro, prata, cobre }
 */
export const cobreParaMoedas = (cobreTotal) => {
    let restante = Math.floor(cobreTotal);
    
    const platina = Math.floor(restante / 1000);
    restante %= 1000;
    
    const ouro = Math.floor(restante / 100);
    restante %= 100;
    
    const prata = Math.floor(restante / 10);
    restante %= 10;
    
    const cobre = restante;
    
    return { platina, ouro, prata, cobre };
};

/**
 * Converte moedas para valor total em cobre
 * @param {object} moedas - { platina, ouro, prata, cobre }
 * @returns {number} Valor total em cobre
 */
export const moedasParaCobre = (moedas) => {
    const { platina = 0, ouro = 0, prata = 0, cobre = 0 } = moedas;
    return (platina * 1000) + (ouro * 100) + (prata * 10) + cobre;
};

/**
 * Formata moedas para exibição
 * @param {object} moedas - { platina, ouro, prata, cobre }
 * @returns {string} String formatada (ex: "2 M.O. 5 M.P. 3 M.C.")
 */
export const formatarMoedas = (moedas) => {
    const { platina = 0, ouro = 0, prata = 0, cobre = 0 } = moedas;
    const partes = [];
    
    if (platina > 0) partes.push(`${platina} M.P.`);
    if (ouro > 0) partes.push(`${ouro} M.O.`);
    if (prata > 0) partes.push(`${prata} M.Pr.`);
    if (cobre > 0) partes.push(`${cobre} M.C.`);
    
    return partes.length > 0 ? partes.join(' ') : '0 M.C.';
};

/**
 * Realiza uma transação (compra/venda)
 * @param {object} carteira - Moedas atuais { platina, ouro, prata, cobre }
 * @param {number} custo - Custo em cobre
 * @param {string} tipo - 'compra' ou 'venda'
 * @returns {object} { sucesso, novaCarteira, mensagem }
 */
export const realizarTransacao = (carteira, custo, tipo = 'compra') => {
    const cobreAtual = moedasParaCobre(carteira);
    
    if (tipo === 'compra') {
        if (cobreAtual < custo) {
            return {
                sucesso: false,
                novaCarteira: carteira,
                mensagem: `Dinheiro insuficiente. Você tem ${formatarMoedas(carteira)} mas precisa de ${formatarMoedas(cobreParaMoedas(custo))}`
            };
        }
        const novoTotal = cobreAtual - custo;
        return {
            sucesso: true,
            novaCarteira: cobreParaMoedas(novoTotal),
            mensagem: `Compra realizada! Restam ${formatarMoedas(cobreParaMoedas(novoTotal))}`
        };
    } else {
        const novoTotal = cobreAtual + custo;
        return {
            sucesso: true,
            novaCarteira: cobreParaMoedas(novoTotal),
            mensagem: `Venda realizada! Você agora tem ${formatarMoedas(cobreParaMoedas(novoTotal))}`
        };
    }
};

// ============================================================================
// BÔNUS E PENALIDADES DE ACERTO/DEFESA
// ============================================================================

export const FONTES_BONUS = ['manobras', 'magias', 'condicoes', 'milagres', 'feiticaria'];

/**
 * Calcula o bônus total considerando apenas o maior de cada fonte
 * @param {object} bonusPorFonte - { manobras: [], magias: [], condicoes: [], milagres: [], feiticaria: [] }
 * @returns {object} { total, detalhes }
 */
export const calcularBonusTotal = (bonusPorFonte) => {
    const detalhes = {};
    let total = 0;
    
    FONTES_BONUS.forEach(fonte => {
        const valores = bonusPorFonte[fonte] || [];
        if (valores.length > 0) {
            const maiorBonus = Math.max(...valores.filter(v => v > 0), 0);
            if (maiorBonus > 0) {
                detalhes[fonte] = maiorBonus;
                total += maiorBonus;
            }
        }
    });
    
    return { total, detalhes };
};

/**
 * Calcula a penalidade total considerando apenas a maior de cada fonte
 * @param {object} penalidadePorFonte - { manobras: [], magias: [], condicoes: [], milagres: [], feiticaria: [] }
 * @returns {object} { total, detalhes }
 */
export const calcularPenalidadeTotal = (penalidadePorFonte) => {
    const detalhes = {};
    let total = 0;
    
    FONTES_BONUS.forEach(fonte => {
        const valores = penalidadePorFonte[fonte] || [];
        if (valores.length > 0) {
            // Penalidades são valores negativos ou positivos representando redução
            const maiorPenalidade = Math.max(...valores.map(Math.abs), 0);
            if (maiorPenalidade > 0) {
                detalhes[fonte] = maiorPenalidade;
                total += maiorPenalidade;
            }
        }
    });
    
    return { total, detalhes };
};

/**
 * Calcula bônus/penalidade usando regra opcional (apenas o maior/menor geral)
 * @param {number[]} bonus - Array de todos os bônus
 * @param {number[]} penalidades - Array de todas as penalidades
 * @returns {object} { bonus, penalidade }
 */
export const calcularBonusPenalidadeOpcional = (bonus = [], penalidades = []) => {
    const maiorBonus = bonus.length > 0 ? Math.max(...bonus) : 0;
    const maiorPenalidade = penalidades.length > 0 ? Math.max(...penalidades.map(Math.abs)) : 0;
    
    return {
        bonus: maiorBonus,
        penalidade: maiorPenalidade,
        resultadoFinal: maiorBonus - maiorPenalidade
    };
};

// ============================================================================
// ITENS MÁGICOS - LIMITES DE EQUIPAMENTO
// ============================================================================

export const LIMITES_ITENS_MAGICOS = {
    acessorios: 3,
    armas: 2,
    armadura: 1,
    escudo: 1
};

/**
 * Verifica se pode equipar mais um item mágico de determinado tipo
 * @param {object} equipados - { acessorios: [], armas: [], armadura: object, escudo: object }
 * @param {string} tipo - Tipo do item a equipar
 * @returns {object} { podeEquipar, mensagem }
 */
export const verificarLimiteItensMagicos = (equipados, tipo) => {
    const limite = LIMITES_ITENS_MAGICOS[tipo];
    
    if (tipo === 'armadura' || tipo === 'escudo') {
        const atual = equipados[tipo];
        if (atual && atual.magico) {
            return {
                podeEquipar: false,
                mensagem: `Você já possui uma ${tipo} mágica equipada.`
            };
        }
    } else {
        const atuais = equipados[tipo] || [];
        const magicos = atuais.filter(item => item.magico);
        if (magicos.length >= limite) {
            return {
                podeEquipar: false,
                mensagem: `Limite de ${limite} ${tipo} mágicos atingido.`
            };
        }
    }
    
    return { podeEquipar: true, mensagem: '' };
};

/**
 * Verifica bônus de arcanatec nível 10 (item mágico extra)
 * @param {number} arcanatec - Valor da habilidade Arcanatec
 * @returns {object} Limites ajustados
 */
export const getLimitesComArcanatec = (arcanatec) => {
    const limites = { ...LIMITES_ITENS_MAGICOS };
    if (arcanatec >= 10) {
        limites.acessorios += 1; // +1 item mágico extra
    }
    return limites;
};

// ============================================================================
// VULNERABILIDADE E RESISTÊNCIA
// ============================================================================

export const TIPOS_DANO = [
    'cortante', 'perfurante', 'contundente', 'fogo', 'gelo', 'eletrico',
    'acido', 'veneno', 'necrotico', 'radiante', 'psiquico', 'arcano',
    'sagrado', 'profano', 'sonico', 'forca'
];

/**
 * Calcula o dano final considerando vulnerabilidades e resistências
 * @param {number} danoBase - Dano base do ataque
 * @param {string} tipoDano - Tipo de dano
 * @param {string[]} vulnerabilidades - Tipos de dano a que é vulnerável
 * @param {string[]} resistencias - Tipos de dano a que é resistente
 * @param {string[]} imunidades - Tipos de dano a que é imune
 * @returns {object} { danoFinal, modificador, descricao }
 */
export const calcularDanoComModificadores = (danoBase, tipoDano, vulnerabilidades = [], resistencias = [], imunidades = []) => {
    const tipoLower = tipoDano.toLowerCase();
    
    // Imunidade tem prioridade
    if (imunidades.map(i => i.toLowerCase()).includes(tipoLower)) {
        return {
            danoFinal: 0,
            modificador: 'imune',
            descricao: `Imune a dano ${tipoDano}`,
            danoOriginal: danoBase
        };
    }
    
    // Vulnerabilidade (dobra o dano)
    if (vulnerabilidades.map(v => v.toLowerCase()).includes(tipoLower)) {
        return {
            danoFinal: danoBase * 2,
            modificador: 'vulneravel',
            descricao: `Vulnerável a ${tipoDano} (dano dobrado)`,
            danoOriginal: danoBase
        };
    }
    
    // Resistência (metade do dano)
    if (resistencias.map(r => r.toLowerCase()).includes(tipoLower)) {
        return {
            danoFinal: Math.floor(danoBase / 2),
            modificador: 'resistente',
            descricao: `Resistente a ${tipoDano} (dano reduzido pela metade)`,
            danoOriginal: danoBase
        };
    }
    
    // Dano normal
    return {
        danoFinal: danoBase,
        modificador: 'normal',
        descricao: '',
        danoOriginal: danoBase
    };
};

// ============================================================================
// ARMADILHAS
// ============================================================================

/**
 * Testa se evitou uma armadilha
 * @param {number} valorHabilidade - Valor em Atletismo, Acrobacia ou Agilidade
 * @param {number} dificuldade - Dificuldade da armadilha
 * @param {string} tipoTeste - 'atletismo', 'acrobacia' ou 'agilidade'
 * @param {number} bonus - Bônus adicional (ex: de equipamentos)
 * @returns {object} Resultado do teste
 */
export const testeEvitarArmadilha = (valorHabilidade, dificuldade, tipoTeste, bonus = 0) => {
    const rolagem = Math.floor(Math.random() * 20) + 1;
    const total = rolagem + valorHabilidade + bonus;
    const sucesso = total >= dificuldade;
    
    return {
        rolagem,
        valorHabilidade,
        bonus,
        total,
        dificuldade,
        sucesso,
        tipoTeste,
        descricao: sucesso 
            ? `Sucesso! Você evitou a armadilha (${total} vs ${dificuldade})`
            : `Falha! Você não conseguiu evitar a armadilha (${total} vs ${dificuldade})`
    };
};

/**
 * Testa para detectar uma armadilha
 * @param {number} habilidadeArmadilhas - Valor na habilidade Armadilhas
 * @param {number} dificuldade - Dificuldade para detectar
 * @param {number} bonus - Bônus adicional
 * @returns {object} Resultado do teste
 */
export const testeDetectarArmadilha = (habilidadeArmadilhas, dificuldade, bonus = 0) => {
    const rolagem = Math.floor(Math.random() * 20) + 1;
    const total = rolagem + habilidadeArmadilhas + bonus;
    const sucesso = total >= dificuldade;
    
    return {
        rolagem,
        habilidadeArmadilhas,
        bonus,
        total,
        dificuldade,
        sucesso,
        descricao: sucesso 
            ? `Você detectou uma armadilha! (${total} vs ${dificuldade})`
            : `Você não detectou nenhuma armadilha (${total} vs ${dificuldade})`
    };
};

/**
 * Calcula dano reduzido de armadilha (para marco de Armadilhas 10)
 * @param {number} dano - Dano da armadilha
 * @param {number} habilidadeArmadilhas - Valor na habilidade
 * @returns {number} Dano final
 */
export const calcularDanoArmadilha = (dano, habilidadeArmadilhas) => {
    if (habilidadeArmadilhas >= 10) {
        return Math.floor(dano / 2);
    }
    return dano;
};

// ============================================================================
// RITUAIS
// ============================================================================

export const CHANCE_FALHA_RITUAL = 5; // 5% de chance de falha base

/**
 * Realiza um ritual
 * @param {number} participantes - Número de participantes
 * @param {boolean} efeitoPerpetuo - Se busca efeito perpétuo
 * @returns {object} Resultado do ritual
 */
export const realizarRitual = (participantes = 1, efeitoPerpetuo = false) => {
    // Efeitos perpétuos sempre têm chance de falha
    const temChanceFalha = efeitoPerpetuo || participantes < 2;
    
    let sucesso = true;
    let rolagem = null;
    
    if (temChanceFalha) {
        // Rolar d20, falha em 1 (5%)
        rolagem = Math.floor(Math.random() * 20) + 1;
        sucesso = rolagem > 1;
    }
    
    // Bônus de vida temporária por participante adicional além do segundo
    const participantesExtras = Math.max(0, participantes - 2);
    const vidaTemporaria = participantesExtras * 5;
    
    return {
        sucesso,
        rolagem,
        chanceFalhaEliminada: participantes >= 2 && !efeitoPerpetuo,
        vidaTemporaria,
        duracaoVidaTemporaria: '1 hora',
        participantes,
        descricao: sucesso
            ? `Ritual bem-sucedido!${vidaTemporaria > 0 ? ` Todos os participantes ganham ${vidaTemporaria} pontos de vida temporária por 1 hora.` : ''}`
            : `O ritual falhou! (rolagem: ${rolagem})`
    };
};

// ============================================================================
// LUZ E VISÃO
// ============================================================================

export const NIVEIS_LUZ = {
    COMPLETA: { nome: 'Luz Completa', penalidade: 0 },
    MEIA_LUZ: { nome: 'Meia Luz', penalidade: 1 },
    ESCURIDAO: { nome: 'Escuridão', penalidade: 'cego' }
};

export const HABILIDADES_AFETADAS_LUZ = [
    'combate_corpo_a_corpo', 'combate_a_distancia', 'combate_arcano',
    'investigacao', 'rastreamento', 'percepcao'
];

/**
 * Calcula penalidade por iluminação
 * @param {string} nivelLuz - 'completa', 'meia_luz' ou 'escuridao'
 * @param {boolean} temVisaoNoEscuro - Se tem visão no escuro
 * @param {number} alcanceVisaoNoEscuro - Alcance da visão no escuro em metros
 * @param {number} distanciaAlvo - Distância até o alvo em metros
 * @returns {object} { penalidade, condicaoCego, nivelEfetivo }
 */
export const calcularPenalidadeLuz = (nivelLuz, temVisaoNoEscuro = false, alcanceVisaoNoEscuro = 0, distanciaAlvo = 0) => {
    const nivel = nivelLuz.toLowerCase().replace(' ', '_');
    
    if (nivel === 'completa' || nivel === 'luz_completa') {
        return { penalidade: 0, condicaoCego: false, nivelEfetivo: 'Luz Completa' };
    }
    
    if (temVisaoNoEscuro) {
        const dentroDoAlcance = distanciaAlvo <= alcanceVisaoNoEscuro;
        
        if (nivel === 'meia_luz') {
            // Com visão no escuro, meia luz = luz completa
            return { penalidade: 0, condicaoCego: false, nivelEfetivo: 'Luz Completa (visão no escuro)' };
        }
        
        if (nivel === 'escuridao' || nivel === 'escuridão') {
            if (dentroDoAlcance) {
                // Com visão no escuro na escuridão = meia luz
                return { penalidade: 1, condicaoCego: false, nivelEfetivo: 'Meia Luz (visão no escuro)' };
            }
            // Fora do alcance da visão no escuro
            return { penalidade: 0, condicaoCego: true, nivelEfetivo: 'Cego (fora do alcance da visão no escuro)' };
        }
    }
    
    if (nivel === 'meia_luz') {
        return { penalidade: 1, condicaoCego: false, nivelEfetivo: 'Meia Luz' };
    }
    
    if (nivel === 'escuridao' || nivel === 'escuridão') {
        return { penalidade: 0, condicaoCego: true, nivelEfetivo: 'Cego (escuridão)' };
    }
    
    return { penalidade: 0, condicaoCego: false, nivelEfetivo: nivel };
};

// ============================================================================
// DESCANSO
// ============================================================================

export const INTERVALO_DESCANSO_CURTO = 6; // horas entre descansos curtos
export const INTERVALO_DESCANSO_LONGO = 20; // horas entre descansos longos
export const DURACAO_DESCANSO_CURTO = 1; // horas
export const DURACAO_DESCANSO_LONGO = 6; // horas

/**
 * Calcula recuperação de descanso curto
 * Ref: LDO 0.5, seção Descanso — Curto: 1/3 PV, 1/2 Estamina, 1/2 Magia
 * @param {object} stats - { vidaMax, vidaAtual, estaminaMax, estaminaAtual, magiaMax, magiaAtual }
 * @returns {object} Valores recuperados
 */
export const calcularDescansosCurto = (stats) => {
    const { vidaMax, vidaAtual, estaminaMax, estaminaAtual, magiaMax, magiaAtual } = stats;
    
    const vidaRecuperada = Math.min(Math.floor(vidaMax / 3), vidaMax - vidaAtual);
    const estaminaRecuperada = Math.min(Math.floor(estaminaMax / 2), estaminaMax - estaminaAtual);
    const magiaRecuperada = Math.min(Math.floor(magiaMax / 2), magiaMax - magiaAtual);
    
    return {
        vidaRecuperada,
        estaminaRecuperada,
        magiaRecuperada,
        novaVida: vidaAtual + vidaRecuperada,
        novaEstamina: estaminaAtual + estaminaRecuperada,
        novaMagia: magiaAtual + magiaRecuperada,
        descricao: `Descanso curto: +${vidaRecuperada} PV, +${estaminaRecuperada} Estamina, +${magiaRecuperada} Magia`
    };
};

/**
 * Calcula recuperação de descanso longo
 * Ref: LDO 0.5, seção Descanso — Longo: Recuperação total + -1 nível cansaço
 * @param {object} stats - { vidaMax, estaminaMax, magiaMax, nivelCansaco }
 * @returns {object} Valores recuperados
 */
export const calcularDescansoLongo = (stats) => {
    const { vidaMax, estaminaMax, magiaMax, nivelCansaco = 0 } = stats;
    
    return {
        novaVida: vidaMax,
        novaEstamina: estaminaMax,
        novaMagia: magiaMax,
        novoNivelCansaco: Math.max(0, nivelCansaco - 1),
        cansacoRemovido: nivelCansaco > 0 ? 1 : 0,
        descricao: `Descanso longo: Recuperação total! ${nivelCansaco > 0 ? 'Nível de cansaço reduzido em 1.' : ''}`
    };
};

/**
 * Verifica se pode fazer descanso
 * @param {number} horasDesdeUltimoDescanso - Horas desde o último descanso do tipo
 * @param {string} tipoDescanso - 'curto' ou 'longo'
 * @returns {object} { podeDescansar, horasRestantes }
 */
export const verificarPodeDescansar = (horasDesdeUltimoDescanso, tipoDescanso) => {
    const intervalo = tipoDescanso === 'longo' ? INTERVALO_DESCANSO_LONGO : INTERVALO_DESCANSO_CURTO;
    const podeDescansar = horasDesdeUltimoDescanso >= intervalo;
    
    return {
        podeDescansar,
        horasRestantes: podeDescansar ? 0 : intervalo - horasDesdeUltimoDescanso,
        intervaloNecessario: intervalo
    };
};

/**
 * Calcula nível de cansaço por falta de descanso
 * @param {number} horasSemDescansoLongo - Horas sem descanso longo
 * @returns {object} { nivelCansaco, descricao }
 */
export const calcularCansacoPorFaltaDeDescanso = (horasSemDescansoLongo) => {
    // A cada 48 horas (2 dias) sem descanso longo, ganha um nível de cansaço
    const diasSemDescanso = horasSemDescansoLongo / 24;
    const periodosDe2Dias = Math.floor(diasSemDescanso / 2);
    
    // Primeiro período de 2 dias = nível 1, depois aumenta
    const nivelCansaco = Math.max(0, periodosDe2Dias);
    
    return {
        nivelCansaco,
        diasSemDescanso: Math.floor(diasSemDescanso),
        descricao: nivelCansaco > 0 
            ? `Cansado (nível ${nivelCansaco}) - ${Math.floor(diasSemDescanso)} dias sem descanso longo`
            : 'Descansado'
    };
};

// ============================================================================
// REQUISITOS DE DESCANSO
// ============================================================================

export const REQUISITOS_DESCANSO = {
    longo: {
        equipamentoAcampamento: true, // saco de dormir
        racaoDiaria: 1,
        aguaLitros: 1,
        ambienteSeguroSubstitui: ['equipamentoAcampamento']
    },
    curto: {
        equipamentoAcampamento: false,
        racaoDiaria: 0,
        aguaLitros: 0
    }
};

/**
 * Verifica se tem requisitos para descanso longo
 * @param {object} recursos - { temEquipamentoAcampamento, racoes, aguaLitros, emAmbienteSeguro }
 * @returns {object} { podeDescansar, requisitosAtendidos, requisitosNaoAtendidos }
 */
export const verificarRequisitosDescansoLongo = (recursos) => {
    const { temEquipamentoAcampamento = false, racoes = 0, aguaLitros = 0, emAmbienteSeguro = false } = recursos;
    
    const requisitosAtendidos = [];
    const requisitosNaoAtendidos = [];
    
    // Equipamento de acampamento ou ambiente seguro
    if (temEquipamentoAcampamento || emAmbienteSeguro) {
        requisitosAtendidos.push(emAmbienteSeguro ? 'Ambiente seguro' : 'Equipamento de acampamento');
    } else {
        requisitosNaoAtendidos.push('Equipamento de acampamento ou ambiente seguro');
    }
    
    // Ração
    if (racoes >= 1) {
        requisitosAtendidos.push('Ração diária');
    } else {
        requisitosNaoAtendidos.push('Ração diária (mínimo 1)');
    }
    
    // Água
    if (aguaLitros >= 1) {
        requisitosAtendidos.push('Água (1 litro)');
    } else {
        requisitosNaoAtendidos.push('Água (mínimo 1 litro)');
    }
    
    return {
        podeDescansar: requisitosNaoAtendidos.length === 0,
        requisitosAtendidos,
        requisitosNaoAtendidos
    };
};

// ============================================================================
// NÍVEIS DE CANSAÇO (7 tiers cumulativos)
// ============================================================================

/**
 * Tabela de penalidades cumulativas por nível de cansaço
 * Ref: LDO 0.5, seção "Cansaço"
 *
 * Cada nível adiciona (cumulativamente) penalidades em ataques, testes de
 * habilidade e velocidade. A partir do nível 5 o personagem desmaia, e
 * no nível 7 morre.
 */
export const NIVEIS_CANSACO = [
    {
        nivel: 0,
        nome: 'Descansado',
        penalidades: { ataques: 0, testes: 0, velocidade: 0 },
        flags: { desmaiado: false, morte: false },
        descricao: 'Sem penalidades.'
    },
    {
        nivel: 1,
        nome: 'Cansado (Leve)',
        penalidades: { ataques: -1, testes: -1, velocidade: 0 },
        flags: { desmaiado: false, morte: false },
        descricao: '-1 em ataques e testes de habilidade.'
    },
    {
        nivel: 2,
        nome: 'Cansado (Moderado)',
        penalidades: { ataques: -2, testes: -2, velocidade: -1.5 },
        flags: { desmaiado: false, morte: false },
        descricao: '-2 em ataques e testes, -1.5m velocidade.'
    },
    {
        nivel: 3,
        nome: 'Cansado (Severo)',
        penalidades: { ataques: -3, testes: -3, velocidade: -3 },
        flags: { desmaiado: false, morte: false },
        descricao: '-3 em ataques e testes, -3m velocidade.'
    },
    {
        nivel: 4,
        nome: 'Cansado (Crítico)',
        penalidades: { ataques: -4, testes: -4, velocidade: -4.5 },
        flags: { desmaiado: false, morte: false },
        descricao: '-4 em ataques e testes, -4.5m velocidade. Vida máxima reduzida pela metade.'
    },
    {
        nivel: 5,
        nome: 'Exausto',
        penalidades: { ataques: -5, testes: -5, velocidade: -6 },
        flags: { desmaiado: true, morte: false },
        descricao: '-5 em ataques e testes, -6m velocidade. O personagem desmaia.'
    },
    {
        nivel: 6,
        nome: 'Exausto (Crítico)',
        penalidades: { ataques: -6, testes: -6, velocidade: -7.5 },
        flags: { desmaiado: true, morte: false },
        descricao: '-6 em ataques e testes, -7.5m velocidade. Permanece desmaiado.'
    },
    {
        nivel: 7,
        nome: 'Morte por Exaustão',
        penalidades: { ataques: -7, testes: -7, velocidade: -9 },
        flags: { desmaiado: true, morte: true },
        descricao: 'O personagem morre de exaustão.'
    }
];

/**
 * Retorna as penalidades cumulativas para um dado nível de cansaço.
 * @param {number} nivel - Nível de cansaço (0-7)
 * @returns {Object} Objeto do NIVEIS_CANSACO ou nível 0 se inválido
 */
export const getPenalidadesCansaco = (nivel) => {
    const n = Math.max(0, Math.min(7, nivel));
    return NIVEIS_CANSACO[n];
};

// ============================================================================
// PROCESSAMENTO COMPLETO DE DESCANSO
// ============================================================================

/**
 * Processa um descanso completo, aplicando todas as mecânicas:
 * - Verifica cooldown (intervalo entre descansos)
 * - Verifica requisitos materiais (descanso longo: ração + água + saco de dormir/abrigo)
 * - Calcula e aplica recuperação de PV, estamina e magia
 * - Remove condições que expiram neste tipo de descanso
 * - Reduz nível de cansaço (descanso longo: -1 nível)
 * - Consome recursos (ração, água)
 * - Atualiza timestamps
 *
 * Ref: LDO 0.5, seções "Descanso Curto" e "Descanso Longo"
 *
 * @param {Object} fichaState - Estado atual da ficha, com pelo menos:
 *   {
 *     vidaAtual, vidaMax, estaminaAtual, estaminaMax, magiaAtual, magiaMax,
 *     nivelCansaco, condicoesAtivas: [{nome, cura, ...}],
 *     recursos: { racoes, aguaLitros, temEquipamentoAcampamento },
 *     timestamps: { ultimoDescansoCurto, ultimoDescansoLongo },
 *     emAmbienteSeguro
 *   }
 * @param {'curto'|'longo'} tipo - Tipo de descanso
 * @param {Object} [opcoes] - Opções extras
 * @param {boolean} [opcoes.ignorarCooldown=false] - Ignora intervalo (para mestre)
 * @param {boolean} [opcoes.ignorarRequisitos=false] - Ignora req. materiais (para mestre)
 * @param {number} [opcoes.horaAtualMs=Date.now()] - Timestamp atual em ms
 * @returns {{
 *   sucesso: boolean,
 *   motivo?: string,
 *   novoState: Object,
 *   resumo: {
 *     tipo: string,
 *     vidaRecuperada: number,
 *     estaminaRecuperada: number,
 *     magiaRecuperada: number,
 *     cansacoReduzido: number,
 *     condicoesRemovidas: string[],
 *     recursosConsumidos: Object,
 *     descricao: string
 *   }
 * }}
 */
export const processarDescanso = (fichaState, tipo, opcoes = {}) => {
    const {
        ignorarCooldown = false,
        ignorarRequisitos = false,
        horaAtualMs = Date.now()
    } = opcoes;

    const state = JSON.parse(JSON.stringify(fichaState)); // deep clone
    const log = [];
    const condicoesRemovidas = [];
    const recursosConsumidos = {};

    // --- 1. Verificar cooldown ---
    if (!ignorarCooldown) {
        const tsKey = tipo === 'longo' ? 'ultimoDescansoLongo' : 'ultimoDescansoCurto';
        const ultimoDescanso = state.timestamps?.[tsKey] || 0;
        const horasDesde = (horaAtualMs - ultimoDescanso) / (1000 * 60 * 60);
        const check = verificarPodeDescansar(horasDesde, tipo);

        if (!check.podeDescansar) {
            return {
                sucesso: false,
                motivo: `Faltam ${check.horasRestantes.toFixed(1)}h para poder fazer descanso ${tipo}. Intervalo: ${check.intervaloNecessario}h.`,
                novoState: fichaState,
                resumo: null
            };
        }
    }

    // --- 2. Verificar requisitos materiais (apenas descanso longo) ---
    if (tipo === 'longo' && !ignorarRequisitos) {
        const recursos = state.recursos || {};
        const check = verificarRequisitosDescansoLongo({
            temEquipamentoAcampamento: recursos.temEquipamentoAcampamento || false,
            racoes: recursos.racoes || 0,
            aguaLitros: recursos.aguaLitros || 0,
            emAmbienteSeguro: state.emAmbienteSeguro || false
        });

        if (!check.podeDescansar) {
            return {
                sucesso: false,
                motivo: `Requisitos não atendidos: ${check.requisitosNaoAtendidos.join(', ')}.`,
                novoState: fichaState,
                resumo: null
            };
        }
    }

    // --- 3. Calcular recuperação ---
    let vidaRecuperada = 0;
    let estaminaRecuperada = 0;
    let magiaRecuperada = 0;
    let cansacoReduzido = 0;

    if (tipo === 'curto') {
        const rec = calcularDescansosCurto({
            vidaMax: state.vidaMax || 0,
            vidaAtual: state.vidaAtual || 0,
            estaminaMax: state.estaminaMax || 0,
            estaminaAtual: state.estaminaAtual || 0,
            magiaMax: state.magiaMax || 0,
            magiaAtual: state.magiaAtual || 0
        });
        vidaRecuperada = rec.vidaRecuperada;
        estaminaRecuperada = rec.estaminaRecuperada;
        magiaRecuperada = rec.magiaRecuperada;
        state.vidaAtual = rec.novaVida;
        state.estaminaAtual = rec.novaEstamina;
        state.magiaAtual = rec.novaMagia;
    } else {
        // Descanso longo: recuperação total
        const rec = calcularDescansoLongo({
            vidaMax: state.vidaMax || 0,
            estaminaMax: state.estaminaMax || 0,
            magiaMax: state.magiaMax || 0,
            nivelCansaco: state.nivelCansaco || 0
        });
        vidaRecuperada = rec.novaVida - (state.vidaAtual || 0);
        estaminaRecuperada = rec.novaEstamina - (state.estaminaAtual || 0);
        magiaRecuperada = rec.novaMagia - (state.magiaAtual || 0);
        cansacoReduzido = rec.cansacoRemovido;
        state.vidaAtual = rec.novaVida;
        state.estaminaAtual = rec.novaEstamina;
        state.magiaAtual = rec.novaMagia;
        state.nivelCansaco = rec.novoNivelCansaco;
    }

    // --- 4. Remover condições que expiram neste descanso ---
    if (Array.isArray(state.condicoesAtivas)) {
        const before = state.condicoesAtivas.length;
        state.condicoesAtivas = state.condicoesAtivas.filter(cond => {
            const cura = cond.cura || '';
            const expira =
                (tipo === 'curto' && (cura === 'descanso_curto' || cura === 'descanso_ambos')) ||
                (tipo === 'longo' && (cura === 'descanso_longo' || cura === 'descanso_curto' || cura === 'descanso_ambos'));
            if (expira) {
                condicoesRemovidas.push(cond.nome || cond.id || 'Condição');
            }
            return !expira;
        });
        if (condicoesRemovidas.length > 0) {
            log.push(`Condições removidas: ${condicoesRemovidas.join(', ')}`);
        }
    }

    // --- 5. Remover vida temporária (descanso longo esvazia) ---
    if (tipo === 'longo') {
        state.vidaTemporaria = 0;
    }

    // --- 6. Consumir recursos (descanso longo) ---
    if (tipo === 'longo' && !ignorarRequisitos) {
        if (state.recursos) {
            if (state.recursos.racoes > 0) {
                state.recursos.racoes = Math.max(0, (state.recursos.racoes || 0) - 1);
                recursosConsumidos.racoes = 1;
            }
            if (state.recursos.aguaLitros > 0) {
                state.recursos.aguaLitros = Math.max(0, (state.recursos.aguaLitros || 0) - 1);
                recursosConsumidos.aguaLitros = 1;
            }
        }
    }

    // --- 7. Atualizar timestamps ---
    if (!state.timestamps) state.timestamps = {};
    if (tipo === 'curto') {
        state.timestamps.ultimoDescansoCurto = horaAtualMs;
    } else {
        state.timestamps.ultimoDescansoLongo = horaAtualMs;
        // Descanso longo também reseta cooldown de curto
        state.timestamps.ultimoDescansoCurto = horaAtualMs;
    }

    // --- 8. Montar resumo ---
    const partes = [];
    if (vidaRecuperada > 0)     partes.push(`+${vidaRecuperada} PV`);
    if (estaminaRecuperada > 0) partes.push(`+${estaminaRecuperada} Estamina`);
    if (magiaRecuperada > 0)    partes.push(`+${magiaRecuperada} Magia`);
    if (cansacoReduzido > 0)    partes.push(`-1 nível de cansaço`);
    if (condicoesRemovidas.length > 0)
        partes.push(`${condicoesRemovidas.length} condição(ões) removida(s)`);

    const descricao = `Descanso ${tipo}: ${partes.length > 0 ? partes.join(', ') : 'Nenhuma mudança.'}`;

    return {
        sucesso: true,
        novoState: state,
        resumo: {
            tipo,
            vidaRecuperada,
            estaminaRecuperada,
            magiaRecuperada,
            cansacoReduzido,
            condicoesRemovidas,
            recursosConsumidos,
            descricao
        }
    };
};

// ============================================================================
// SISTEMA DE TAMANHO
// ============================================================================

/**
 * Categorias de tamanho baseadas em altura (em centímetros)
 * Ref: LDO 0.5, seção Tamanho de Criaturas
 */
export const TAMANHOS = {
    MINUSCULO: {
        id: 'minusculo',
        nome: 'Minúsculo',
        alturaMin: 0,
        alturaMax: 60,
        descricao: '0 a 60 cm'
    },
    PEQUENO: {
        id: 'pequeno',
        nome: 'Pequeno',
        alturaMin: 61,
        alturaMax: 130,
        descricao: '61 a 130 cm'
    },
    MEDIO: {
        id: 'medio',
        nome: 'Médio',
        alturaMin: 131,
        alturaMax: 220,
        descricao: '131 a 220 cm'
    },
    GRANDE: {
        id: 'grande',
        nome: 'Grande',
        alturaMin: 221,
        alturaMax: 350,
        descricao: '221 a 350 cm'
    },
    MUITO_GRANDE: {
        id: 'muito_grande',
        nome: 'Muito Grande',
        alturaMin: 351,
        alturaMax: 600,
        descricao: '351 a 600 cm'
    },
    GIGANTE: {
        id: 'gigante',
        nome: 'Gigante',
        alturaMin: 601,
        alturaMax: 1200,
        descricao: '601 a 1200 cm'
    },
    COLOSSAL: {
        id: 'colossal',
        nome: 'Colossal',
        alturaMin: 1201,
        alturaMax: Infinity,
        descricao: 'maior que 1201 cm'
    }
};

/**
 * Configuração de capacidade de carga por tamanho
 * Ref: LDO 0.5, seção Capacidade de Carga
 */
export const CAPACIDADE_CARGA = {
    minusculo: { multiplicador: 1, minimo: 1, descricao: 'Igual o valor de força em quilos (mínimo de 1)' },
    pequeno: { multiplicador: 10, minimo: 20, descricao: '10x valor de força em quilos (mínimo de 20)' },
    medio: { multiplicador: 25, minimo: 50, descricao: '25x valor de força em quilos (mínimo de 50)' },
    grande: { multiplicador: 50, minimo: 100, descricao: '50x valor de força em quilos (mínimo de 100)' },
    muito_grande: { multiplicador: 70, minimo: 200, descricao: '70x valor de força em quilos (mínimo de 200)' },
    gigante: { multiplicador: 150, minimo: 300, descricao: '150x valor de força em quilos (mínimo de 300)' },
    colossal: { multiplicador: 300, minimo: 800, descricao: '300x valor de força em quilos (mínimo de 800)' }
};

/**
 * Modificadores de arma por tamanho
 */
export const MODIFICADORES_ARMA_TAMANHO = {
    minusculo: { 
        modificador: -2, 
        tipo: 'penalidade',
        descricao: 'Armas adaptadas -2 de dano (mínimo de 1)',
        custoMultiplicador: 0.5,
        custoDescricao: 'Metade do preço'
    },
    pequeno: { 
        modificador: -1, 
        tipo: 'penalidade',
        descricao: 'Armas adaptadas -1 de dano (mínimo de 1)',
        custoMultiplicador: 1,
        custoDescricao: 'Preço normal'
    },
    medio: { 
        modificador: 0, 
        tipo: 'padrao',
        descricao: 'Armas padrão',
        custoMultiplicador: 1,
        custoDescricao: 'Preço normal'
    },
    grande: { 
        modificador: 0, 
        tipo: 'padrao',
        descricao: 'Armas padrão',
        custoMultiplicador: 1,
        custoDescricao: 'Preço normal'
    },
    muito_grande: { 
        modificador: 1, 
        tipo: 'bonus',
        descricao: 'Armas adaptadas +1 de dano',
        custoMultiplicador: 2,
        custoDescricao: 'Dobro do preço'
    },
    gigante: { 
        modificador: '1d8', 
        tipo: 'bonus_dado',
        descricao: 'Armas adaptadas +1d8 de dano',
        custoMultiplicador: 2,
        custoDescricao: 'Dobro do preço'
    },
    colossal: { 
        modificador: 6, 
        tipo: 'bonus',
        descricao: 'Armas adaptadas +6 de dano',
        custoMultiplicador: 2,
        custoDescricao: 'Dobro do preço'
    }
};

/**
 * Determina a categoria de tamanho baseada na altura em centímetros
 * @param {number} alturaCm - Altura em centímetros
 * @returns {object} Categoria de tamanho
 */
export const determinarTamanho = (alturaCm) => {
    if (alturaCm <= 60) return TAMANHOS.MINUSCULO;
    if (alturaCm <= 130) return TAMANHOS.PEQUENO;
    if (alturaCm <= 220) return TAMANHOS.MEDIO;
    if (alturaCm <= 350) return TAMANHOS.GRANDE;
    if (alturaCm <= 600) return TAMANHOS.MUITO_GRANDE;
    if (alturaCm <= 1200) return TAMANHOS.GIGANTE;
    return TAMANHOS.COLOSSAL;
};

/**
 * Calcula a capacidade de carga máxima baseada no tamanho e força
 * @param {string} tamanhoId - ID do tamanho ('minusculo', 'pequeno', etc.)
 * @param {number} forca - Valor de força do personagem
 * @returns {object} { capacidadeMaxima, descricao, tamanho }
 */
export const calcularCapacidadeCarga = (tamanhoId, forca) => {
    const config = CAPACIDADE_CARGA[tamanhoId] || CAPACIDADE_CARGA.medio;
    const calculado = forca * config.multiplicador;
    const capacidadeMaxima = Math.max(calculado, config.minimo);
    
    return {
        capacidadeMaxima,
        capacidadeCalculada: calculado,
        minimoGarantido: config.minimo,
        multiplicador: config.multiplicador,
        descricao: config.descricao,
        tamanhoId
    };
};

/**
 * Calcula a carga atual baseada nos itens do inventário
 * @param {Array} itens - Array de itens no inventário
 * @returns {object} { cargaTotal, itensComPeso }
 */
export const calcularCargaAtual = (itens = []) => {
    let cargaTotal = 0;
    const itensComPeso = [];
    
    itens.forEach(item => {
        const nomeItem = item.name || item.nome;
        // Tenta pegar peso do item, senão faz lookup no catálogo
        let peso = item.peso || item.weight;
        if (peso === undefined || peso === null) {
            peso = getPesoItem(nomeItem);
        }
        peso = peso || 0;
        
        const quantidade = item.quantidade || item.quantity || 1;
        const pesoTotal = peso * quantidade;
        
        cargaTotal += pesoTotal;
        
        if (peso > 0) {
            itensComPeso.push({
                nome: nomeItem,
                pesoUnitario: peso,
                quantidade,
                pesoTotal
            });
        }
    });
    
    return {
        cargaTotal,
        itensComPeso,
        totalItens: itens.length
    };
};

/**
 * Verifica o status de carga do personagem
 * @param {number} cargaAtual - Peso atual carregado
 * @param {number} capacidadeMaxima - Capacidade máxima de carga
 * @returns {object} { status, porcentagem, penalidade, descricao }
 */
export const verificarStatusCarga = (cargaAtual, capacidadeMaxima) => {
    const porcentagem = (cargaAtual / capacidadeMaxima) * 100;
    
    if (porcentagem <= 50) {
        return {
            status: 'leve',
            cor: '#454E30',
            porcentagem,
            penalidade: 0,
            descricao: 'Carga Leve - Sem penalidades',
            icone: '🏃'
        };
    } else if (porcentagem <= 75) {
        return {
            status: 'moderada',
            cor: '#BB8130',
            porcentagem,
            penalidade: 0,
            descricao: 'Carga Moderada - Sem penalidades',
            icone: '🚶'
        };
    } else if (porcentagem <= 100) {
        return {
            status: 'pesada',
            cor: '#931C4A',
            porcentagem,
            penalidade: -1,
            descricao: 'Carga Pesada - Penalidade de -1 em testes de Agilidade e Furtividade',
            icone: '🐢'
        };
    } else {
        return {
            status: 'sobrecarregado',
            cor: '#40150A',
            porcentagem,
            penalidade: -3,
            descricao: 'Sobrecarregado! Velocidade reduzida pela metade, -3 em testes físicos',
            icone: '⚠️'
        };
    }
};

/**
 * Calcula o modificador de dano de arma baseado no tamanho
 * @param {string} tamanhoId - ID do tamanho
 * @param {string} danoBase - Dano base da arma (ex: "1d8")
 * @param {boolean} isArmaCultural - Se a arma é cultural da espécie (não sofre penalidade)
 * @returns {object} { danoFinal, modificador, descricao }
 */
export const calcularDanoArmaPorTamanho = (tamanhoId, danoBase, isArmaCultural = false) => {
    // Armas culturais não sofrem modificação
    if (isArmaCultural) {
        return {
            danoFinal: danoBase,
            modificador: 0,
            modificadorTexto: '',
            descricao: 'Arma cultural - sem modificação de tamanho',
            custoMultiplicador: 1
        };
    }
    
    const config = MODIFICADORES_ARMA_TAMANHO[tamanhoId] || MODIFICADORES_ARMA_TAMANHO.medio;
    
    // Se o modificador é um dado (como "1d8" para gigante)
    if (config.tipo === 'bonus_dado') {
        return {
            danoFinal: `${danoBase} + ${config.modificador}`,
            modificador: config.modificador,
            modificadorTexto: `+${config.modificador}`,
            descricao: config.descricao,
            custoMultiplicador: config.custoMultiplicador
        };
    }
    
    // Modificador numérico
    let modificadorTexto = '';
    if (config.modificador > 0) {
        modificadorTexto = `+${config.modificador}`;
    } else if (config.modificador < 0) {
        modificadorTexto = `${config.modificador}`;
    }
    
    return {
        danoFinal: config.modificador !== 0 ? `${danoBase} ${modificadorTexto}` : danoBase,
        modificador: config.modificador,
        modificadorTexto,
        descricao: config.descricao,
        custoMultiplicador: config.custoMultiplicador,
        danoMinimo: config.tipo === 'penalidade' ? 1 : null
    };
};

/**
 * Calcula o custo de uma arma adaptada para o tamanho
 * @param {number} precoBase - Preço base da arma
 * @param {string} tamanhoId - ID do tamanho
 * @param {boolean} isArmaCultural - Se a arma é cultural
 * @returns {object} { precoFinal, multiplicador, descricao }
 */
export const calcularCustoArmaAdaptada = (precoBase, tamanhoId, isArmaCultural = false) => {
    if (isArmaCultural) {
        return {
            precoFinal: precoBase,
            multiplicador: 1,
            descricao: 'Arma cultural - preço normal'
        };
    }
    
    const config = MODIFICADORES_ARMA_TAMANHO[tamanhoId] || MODIFICADORES_ARMA_TAMANHO.medio;
    const precoFinal = precoBase * config.custoMultiplicador;
    
    return {
        precoFinal,
        multiplicador: config.custoMultiplicador,
        descricao: config.custoDescricao
    };
};

/**
 * Retorna informações completas sobre carga do personagem
 * @param {number} alturaCm - Altura em centímetros
 * @param {number} forca - Valor de força
 * @param {Array} itens - Itens no inventário
 * @returns {object} Informações completas de carga
 */
export const getInformacoesCarga = (alturaCm, forca, itens = []) => {
    const tamanho = determinarTamanho(alturaCm);
    const capacidade = calcularCapacidadeCarga(tamanho.id, forca);
    const cargaAtual = calcularCargaAtual(itens);
    const status = verificarStatusCarga(cargaAtual.cargaTotal, capacidade.capacidadeMaxima);
    
    return {
        tamanho,
        capacidade,
        cargaAtual,
        status,
        resumo: {
            altura: alturaCm,
            categoriaTamanho: tamanho.nome,
            forca,
            cargaAtualKg: cargaAtual.cargaTotal,
            capacidadeMaximaKg: capacidade.capacidadeMaxima,
            porcentagemUso: status.porcentagem,
            statusCarga: status.status,
            penalidade: status.penalidade
        }
    };
};

// ============================================================================
// MOTOR DE RESOLUÇÃO DE AÇÃO COMPLETA (TODO-RUL-002)
// ============================================================================

/**
 * Resolve o pipeline completo de uma ação de ataque corpo-a-corpo ou à distância.
 *
 * Pipeline:
 *   1. Validar custo de ação (verificar ações restantes)
 *   2. Aplicar penalidade de ataque múltiplo (2ª ação "atacar" no turno = desvantagem)
 *   3. Rolar d20 com vantagem/desvantagem
 *   4. Somar habilidade de combate + bônus
 *   5. Comparar com Defesa do alvo → acerto/parcial/erro/crítico/falha crítica
 *   6. Calcular dano base (arma + atributo)
 *   7. Aplicar multiplicador (crítico ×2, parcial ×0.5)
 *   8. Calcular bônus overshoot (+10: 1d4, +15: +2, +20: +3)
 *   9. Aplicar interação elemental
 *   10. Aplicar resistência/vulnerabilidade/imunidade do alvo
 *   11. Compilar resultado final com log narrativo
 *
 * Ref: LDO 0.5, seções Combate, Acerto, Dano, Elementos
 *
 * @param {Object} ator — atacante
 *   { nome, habilidadeCombate: number, forca: number, destreza: number,
 *     acoesRestantes: number, ataquesFeitosNoTurno: number,
 *     vantagensExtras: number, desvantagensExtras: number,
 *     bonusAcertoAdicional: number, bonusDanoAdicional: number }
 * @param {Object} alvo — defensor
 *   { nome, defesa: number, elementoAlvo?: string,
 *     vulnerabilidades?: string[], resistencias?: string[], imunidades?: string[] }
 * @param {Object} arma — arma utilizada
 *   { nome, dano: string, tipoDano: string, critico?: number, alcance?: string }
 * @param {Object} [contexto={}] — modificadores contextuais
 *   { coberturaAlvo?: string, nivelLuz?: string, arremesso?: boolean }
 * @returns {Object} resultado completo do ataque
 */
export const resolverAcaoCompleta = (ator, alvo, arma, contexto = {}) => {
    const log = [];
    const erros = [];

    // --- 1. Validar custo ---
    const custoAcao = 1;
    if ((ator.acoesRestantes || 3) < custoAcao) {
        return { sucesso: false, erros: ['Sem ações restantes para atacar'], log: [] };
    }

    // --- 2. Penalidade de ataque múltiplo ---
    // Ref: LDO 0.5 — "A partir da segunda ação atacar no mesmo turno, desvantagem"
    const ataquesFeitosNoTurno = ator.ataquesFeitosNoTurno || 0;
    let desvantagensPorMultiplo = 0;
    if (ataquesFeitosNoTurno >= 1) {
        desvantagensPorMultiplo = 1;
        log.push(`⚠️ ${ataquesFeitosNoTurno + 1}º ataque no turno — desvantagem aplicada`);
    }

    // --- 3. Calcular vantagens/desvantagens totais ---
    const vantagensTotal = ator.vantagensExtras || 0;
    let desvantagensTotal = (ator.desvantagensExtras || 0) + desvantagensPorMultiplo;

    // Cobertura do alvo
    if (contexto.coberturaAlvo) {
        const cob = calcularBonusCobertura(contexto.coberturaAlvo);
        if (cob.bloqueiaAtaques) {
            return { sucesso: false, erros: ['Alvo em cobertura total — não pode ser alvejado'], log };
        }
    }

    // Iluminação
    if (contexto.nivelLuz) {
        const luz = calcularPenalidadeLuz(
            contexto.nivelLuz,
            contexto.temVisaoNoEscuro || false,
            contexto.alcanceVisaoNoEscuro || 0,
            contexto.distanciaAlvo || 0
        );
        if (luz.condicaoCego) {
            desvantagensTotal += 1;
            log.push(`🌑 Cego por escuridão — desvantagem aplicada`);
        } else if (luz.penalidade > 0) {
            log.push(`🌗 Meia-luz — ${luz.penalidade > 0 ? '-' + luz.penalidade + ' em testes afetados' : ''}`);
        }
    }

    // --- 4. Rolar acerto ---
    const rolagemInfo = rolarComVantagemDesvantagem(vantagensTotal, desvantagensTotal, 0);
    const rolagemD20 = rolagemInfo.resultadoBase;

    // Bônus de acerto = habilidade de combate + extras
    const bonusAcerto = (ator.habilidadeCombate || 0) + (ator.bonusAcertoAdicional || 0);

    // Cobertura extra na defesa
    let defesaEfetiva = alvo.defesa || 10;
    if (contexto.coberturaAlvo) {
        const cob = calcularBonusCobertura(contexto.coberturaAlvo);
        defesaEfetiva += cob.bonusDefesa;
        if (cob.bonusDefesa > 0) log.push(`🛡️ Alvo com ${cob.nome}: +${cob.bonusDefesa} defesa`);
    }

    // Margem de crítico (base 20, pode ser reduzida por regalias/proficiências)
    const margemCritico = arma.critico || 20;

    // --- 5. Resolver acerto vs defesa ---
    const resultadoAcerto = calcularResultadoAtaque(rolagemD20, bonusAcerto, defesaEfetiva, margemCritico);

    log.push(`🎲 Rolagem: ${rolagemInfo.descricao}`);
    log.push(`⚔️ Acerto: ${rolagemD20} + ${bonusAcerto} = ${resultadoAcerto.totalAcerto} vs Defesa ${defesaEfetiva}`);
    log.push(`📋 Resultado: ${resultadoAcerto.descricao}`);

    // Se errou, retornar
    if (resultadoAcerto.multiplicadorDano === 0) {
        return {
            sucesso: true,
            acertou: false,
            resultado: resultadoAcerto.resultado,
            rolagem: rolagemInfo,
            acerto: resultadoAcerto,
            dano: null,
            log,
            erros,
            acoesGastas: custoAcao
        };
    }

    // --- 6. Calcular dano base ---
    const danoArmaBase = _rolarDadoDano(arma.dano || '0');
    const isDistancia = arma.alcance && arma.alcance !== 'corpo-a-corpo';
    const bonusAtributo = (isDistancia && !contexto.arremesso)
        ? (ator.destreza || 0)
        : (ator.forca || 0);
    const bonusDanoExtra = ator.bonusDanoAdicional || 0;

    // --- 7. Aplicar multiplicador (crítico/parcial) ---
    const subTotalDano = danoArmaBase + bonusAtributo + bonusDanoExtra;
    const danoAposMultiplicador = Math.floor(subTotalDano * resultadoAcerto.multiplicadorDano);

    // --- 8. Overshoot bonus (já calculado em resultadoAcerto)
    const danoComOvershoot = danoAposMultiplicador + resultadoAcerto.bonusDanoPorDiferenca;

    log.push(`💥 Dano: ${danoArmaBase} (arma) + ${bonusAtributo} (atributo)${bonusDanoExtra > 0 ? ` + ${bonusDanoExtra} (extra)` : ''}`);
    if (resultadoAcerto.multiplicadorDano !== 1) {
        log.push(`   × ${resultadoAcerto.multiplicadorDano} (${resultadoAcerto.isCriticoNatural ? 'CRÍTICO' : 'parcial'})`);
    }
    if (resultadoAcerto.bonusDanoPorDiferenca > 0) {
        log.push(`   + ${resultadoAcerto.bonusDanoPorDiferenca} (overshoot +${resultadoAcerto.diferenca})`);
    }

    // --- 9. Interação elemental ---
    let danoFinal = danoComOvershoot;
    let modificadorElemental = null;
    if (arma.tipoDano && alvo.elementoAlvo) {
        const elemResult = calcularDanoElemental(danoFinal, arma.tipoDano, alvo.elementoAlvo);
        if (elemResult.modificador !== 'normal') {
            danoFinal = elemResult.danoFinal;
            modificadorElemental = elemResult;
            log.push(`🔥 Elemental: ${elemResult.descricao}`);
        }
    }

    // --- 10. Resistência/vulnerabilidade/imunidade ---
    let modificadorResistencia = null;
    if (arma.tipoDano) {
        const resResult = calcularDanoComModificadores(
            danoFinal,
            arma.tipoDano,
            alvo.vulnerabilidades || [],
            alvo.resistencias || [],
            alvo.imunidades || []
        );
        if (resResult.modificador !== 'normal') {
            danoFinal = resResult.danoFinal;
            modificadorResistencia = resResult;
            log.push(`🛡️ Modificador: ${resResult.descricao}`);
        }
    }

    // Dano mínimo = 1 (exceto imunidade)
    if (danoFinal > 0) danoFinal = Math.max(1, danoFinal);

    log.push(`💀 Dano final: ${danoFinal}`);

    // --- 11. Retornar resultado completo ---
    return {
        sucesso: true,
        acertou: true,
        resultado: resultadoAcerto.resultado,
        rolagem: rolagemInfo,
        acerto: resultadoAcerto,
        dano: {
            base: danoArmaBase,
            bonusAtributo,
            bonusDanoExtra,
            multiplicador: resultadoAcerto.multiplicadorDano,
            overshoot: resultadoAcerto.bonusDanoPorDiferenca,
            elemental: modificadorElemental,
            resistencia: modificadorResistencia,
            final: danoFinal
        },
        log,
        erros,
        acoesGastas: custoAcao,
        novoAtaquesFeitosNoTurno: ataquesFeitosNoTurno + 1
    };
};

/**
 * Resolve um teste de habilidade simples (não-combate).
 * Ref: LDO 0.5, seção Testes de Habilidade
 *   Teste = d20 + valor da habilidade + bônus vs DC
 *
 * @param {number} valorHabilidade — valor total na habilidade testada
 * @param {number} dificuldade — DC do teste
 * @param {Object} [opcoes={}] — { vantagens, desvantagens, bonus }
 * @returns {Object} resultado do teste
 */
export const resolverTesteHabilidade = (valorHabilidade, dificuldade, opcoes = {}) => {
    const { vantagens = 0, desvantagens = 0, bonus = 0 } = opcoes;

    const rolagemInfo = rolarComVantagemDesvantagem(vantagens, desvantagens, 0);
    const rolagemD20 = rolagemInfo.resultadoBase;
    const total = rolagemD20 + valorHabilidade + bonus;
    const sucesso = total >= dificuldade;
    const diferenca = total - dificuldade;

    // Gradação do resultado
    let grau;
    if (rolagemD20 === 20) grau = 'sucesso_critico';
    else if (rolagemD20 === 1) grau = 'falha_critica';
    else if (diferenca >= 10) grau = 'sucesso_excepcional';
    else if (sucesso) grau = 'sucesso';
    else if (diferenca >= -5) grau = 'falha_parcial';
    else grau = 'falha';

    return {
        rolagemD20,
        valorHabilidade,
        bonus,
        total,
        dificuldade,
        sucesso,
        diferenca,
        grau,
        rolagem: rolagemInfo,
        descricao: `${rolagemD20} + ${valorHabilidade}${bonus ? ` + ${bonus}` : ''} = ${total} vs DC ${dificuldade} → ${sucesso ? 'Sucesso' : 'Falha'}${grau.includes('critico') || grau.includes('excepcional') ? ` (${grau.replace('_', ' ')})` : ''}`
    };
};

/**
 * Rola dano a partir de notação de dados (ex: "2d6", "1d8+2")
 * @private
 */
const _rolarDadoDano = (notacao) => {
    if (typeof notacao === 'number') return notacao;
    if (!notacao || notacao === '0') return 0;

    // Parse: NdX ou NdX+Y
    const match = notacao.match(/^(\d+)?d(\d+)(?:\s*\+\s*(\d+))?$/);
    if (!match) {
        const num = parseInt(notacao, 10);
        return isNaN(num) ? 0 : num;
    }

    const qtd = parseInt(match[1], 10) || 1;
    const lados = parseInt(match[2], 10);
    const fixo = parseInt(match[3], 10) || 0;

    let total = fixo;
    for (let i = 0; i < qtd; i++) {
        total += Math.floor(Math.random() * lados) + 1;
    }
    return total;
};
