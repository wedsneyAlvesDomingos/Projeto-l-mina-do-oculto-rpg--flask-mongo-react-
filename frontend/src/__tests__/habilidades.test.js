/**
 * Testes unitários — habilidades.js
 * TODO-TST-001 · Fase 5
 *
 * Cobertura: funções de cálculo, custo de distribuição, validação de distribuição,
 * marcos, helpers, atributos derivados.
 */
import {
    calcularPontosDeVida,
    calcularEstamina,
    calcularIniciativa,
    calcularBonusVelocidade,
    calcularPontosDeMagia,
    calcularCapacidadeDeCarga,
    calcularTempoRespiracao,
    calcularCuraKitMedico,
    calcularAtributosDerivados,
    calcularBonusHabilidade,
    calcularNivel,
    calcularPontosRegaliaTotal,
    calcularCustoHabilidade,
    calcularCustoDistribuicaoTotal,
    validarDistribuicaoHabilidades,
    PONTOS_HABILIDADE_NIVEL_1,
    PONTOS_PROFICIENCIA_EXTRA,
    MAX_PONTOS_POR_HABILIDADE,
    TABELA_XP_POR_NIVEL,
    // Dados
    gruposHabilidades,
    todasHabilidades,
    habilidadesIniciais,
    // Helpers
    getHabilidade,
    getHabilidadeDescricao,
    getHabilidadesPorCategoria,
    getMarcosHabilidade,
    getMarcosAtingidos,
} from '../data/constants/habilidades';

// ============================================================================
// calcularPontosDeVida
// ============================================================================
describe('calcularPontosDeVida', () => {
    test('base 10 + fortitude 0 = 10', () => {
        expect(calcularPontosDeVida(10, 0)).toBe(10);
    });

    test('base 10 + fortitude 5 = 20', () => {
        expect(calcularPontosDeVida(10, 5)).toBe(20);
    });

    test('base 12 (anão) + fortitude 8 = 28', () => {
        expect(calcularPontosDeVida(12, 8)).toBe(28);
    });

    test('base 15 (troll) + fortitude 15 = 45', () => {
        expect(calcularPontosDeVida(15, 15)).toBe(45);
    });

    test('base 9 + fortitude 1 = 11', () => {
        expect(calcularPontosDeVida(9, 1)).toBe(11);
    });
});

// ============================================================================
// calcularEstamina
// ============================================================================
describe('calcularEstamina', () => {
    test('atletismo 0 → 10', () => {
        expect(calcularEstamina(0)).toBe(10);
    });

    test('atletismo 5 → 15', () => {
        expect(calcularEstamina(5)).toBe(15);
    });

    test('atletismo 9 → 19 (sem bônus)', () => {
        expect(calcularEstamina(9)).toBe(19);
    });

    test('atletismo 10 → 25 (com bônus +5 do marco)', () => {
        expect(calcularEstamina(10)).toBe(25);
    });

    test('atletismo 15 → 30', () => {
        expect(calcularEstamina(15)).toBe(30);
    });
});

// ============================================================================
// calcularIniciativa
// ============================================================================
describe('calcularIniciativa', () => {
    test('agilidade 0 + percepção 0 = 0', () => {
        expect(calcularIniciativa(0, 0)).toBe(0);
    });

    test('agilidade 5 + percepção 3 = 8', () => {
        expect(calcularIniciativa(5, 3)).toBe(8);
    });

    test('agilidade 12 + percepção 12 = 24', () => {
        expect(calcularIniciativa(12, 12)).toBe(24);
    });
});

// ============================================================================
// calcularBonusVelocidade
// ============================================================================
describe('calcularBonusVelocidade', () => {
    test('agilidade 0 → 0m', () => {
        expect(calcularBonusVelocidade(0)).toBe(0);
    });

    test('agilidade 2 → 0m (abaixo do limiar)', () => {
        expect(calcularBonusVelocidade(2)).toBe(0);
    });

    test('agilidade 3 → +1.5m', () => {
        expect(calcularBonusVelocidade(3)).toBe(1.5);
    });

    test('agilidade 5 → +1.5m (entre limiares)', () => {
        expect(calcularBonusVelocidade(5)).toBe(1.5);
    });

    test('agilidade 6 → +3m', () => {
        expect(calcularBonusVelocidade(6)).toBe(3);
    });

    test('agilidade 9 → +4.5m', () => {
        expect(calcularBonusVelocidade(9)).toBe(4.5);
    });

    test('agilidade 12 → +6m (máximo)', () => {
        expect(calcularBonusVelocidade(12)).toBe(6);
    });

    test('agilidade 15 → +6m (acima do máximo, cap)', () => {
        expect(calcularBonusVelocidade(15)).toBe(6);
    });
});

// ============================================================================
// calcularPontosDeMagia
// ============================================================================
describe('calcularPontosDeMagia', () => {
    test('arcanismo 0, base 0 → 0', () => {
        expect(calcularPontosDeMagia(0, 0)).toBe(0);
    });

    test('arcanismo 5, base 0 → 5', () => {
        expect(calcularPontosDeMagia(5, 0)).toBe(5);
    });

    test('arcanismo 5, base 3 → 8', () => {
        expect(calcularPontosDeMagia(5, 3)).toBe(8);
    });

    test('arcanismo 10, base 0 → 15 (bônus +5 do marco)', () => {
        expect(calcularPontosDeMagia(10, 0)).toBe(15);
    });

    test('arcanismo 10, base 5 → 20', () => {
        expect(calcularPontosDeMagia(10, 5)).toBe(20);
    });
});

// ============================================================================
// calcularCapacidadeDeCarga
// ============================================================================
describe('calcularCapacidadeDeCarga', () => {
    test('forca 5, medio → 25kg', () => {
        expect(calcularCapacidadeDeCarga(5, 'medio')).toBe(25);
    });

    test('forca 5, pequeno → 12.5kg', () => {
        expect(calcularCapacidadeDeCarga(5, 'pequeno')).toBe(12.5);
    });

    test('forca 5, grande → 50kg', () => {
        expect(calcularCapacidadeDeCarga(5, 'grande')).toBe(50);
    });

    test('forca 10, medio → 80kg (bônus +30 do marco)', () => {
        // 10*5*1 = 50 + 10*3 = 30 → 80
        expect(calcularCapacidadeDeCarga(10, 'medio')).toBe(80);
    });

    test('forca 0, medio → 0kg', () => {
        expect(calcularCapacidadeDeCarga(0, 'medio')).toBe(0);
    });
});

// ============================================================================
// calcularTempoRespiracao
// ============================================================================
describe('calcularTempoRespiracao', () => {
    test('fortitude 0 → mínimo 1 minuto', () => {
        expect(calcularTempoRespiracao(0)).toBe(1);
    });

    test('fortitude 5 → 5 minutos', () => {
        expect(calcularTempoRespiracao(5)).toBe(5);
    });
});

// ============================================================================
// calcularCuraKitMedico
// ============================================================================
describe('calcularCuraKitMedico', () => {
    test('medicina 0 → 0 (abaixo do mínimo)', () => {
        expect(calcularCuraKitMedico(0)).toBe(0);
    });

    test('medicina 4 → 0 (abaixo do limiar 5)', () => {
        expect(calcularCuraKitMedico(4)).toBe(0);
    });

    test('medicina 5 → 5', () => {
        expect(calcularCuraKitMedico(5)).toBe(5);
    });

    test('medicina 10 → 10', () => {
        expect(calcularCuraKitMedico(10)).toBe(10);
    });
});

// ============================================================================
// calcularAtributosDerivados
// ============================================================================
describe('calcularAtributosDerivados', () => {
    test('calcula todos os derivados a partir de habilidades base', () => {
        const habs = { fortitude: 4, forca: 6, agilidade: 9, atletismo: 5, percepcao: 7, arcanismo: 3 };
        const dadosBase = { vidaBase: 10, magiaBase: 2, tamanho: 'medio' };
        const result = calcularAtributosDerivados(habs, dadosBase);

        expect(result.pontosDeVida).toBe(18);       // 10 + 4*2
        expect(result.estamina).toBe(15);            // 10 + 5
        expect(result.iniciativa).toBe(16);          // 9 + 7
        expect(result.bonusVelocidade).toBe(4.5);    // agilidade 9
        expect(result.pontosDeMagia).toBe(5);        // 2 + 3
    });
});

// ============================================================================
// calcularBonusHabilidade
// ============================================================================
describe('calcularBonusHabilidade', () => {
    test('contexto direto retorna o valor bruto', () => {
        expect(calcularBonusHabilidade(8, 'direto')).toBe(8);
    });

    test('contexto defesa: agilidade 0 → bônus 3', () => {
        expect(calcularBonusHabilidade(0, 'defesa')).toBe(3);
    });

    test('contexto defesa: agilidade 6 → bônus 5', () => {
        expect(calcularBonusHabilidade(6, 'defesa')).toBe(5);
    });

    test('contexto defesa: agilidade 12 → bônus 7', () => {
        expect(calcularBonusHabilidade(12, 'defesa')).toBe(7);
    });

    test('contexto velocidade: agilidade 0 → 0m', () => {
        expect(calcularBonusHabilidade(0, 'velocidade')).toBe(0);
    });

    test('contexto velocidade: agilidade 9 → 4.5m', () => {
        expect(calcularBonusHabilidade(9, 'velocidade')).toBe(4.5);
    });
});

// ============================================================================
// calcularNivel
// ============================================================================
describe('calcularNivel', () => {
    test('0 XP → nível 1', () => {
        expect(calcularNivel(0).nivel).toBe(1);
    });

    test('150 XP → nível 2', () => {
        expect(calcularNivel(150).nivel).toBe(2);
    });

    test('149 XP → nível 1', () => {
        expect(calcularNivel(149).nivel).toBe(1);
    });

    test('46000 XP → nível 20', () => {
        expect(calcularNivel(46000).nivel).toBe(20);
    });

    test('100000 XP → nível 20 (cap)', () => {
        expect(calcularNivel(100000).nivel).toBe(20);
    });

    test('retorna xpFaltando correto', () => {
        const r = calcularNivel(100);
        expect(r.nivel).toBe(1);
        expect(r.xpFaltando).toBe(50); // 150 - 100
    });
});

// ============================================================================
// calcularPontosRegaliaTotal
// ============================================================================
describe('calcularPontosRegaliaTotal', () => {
    test('nível 0 → 0', () => {
        expect(calcularPontosRegaliaTotal(0)).toBe(0);
    });

    test('nível 1 → 4', () => {
        expect(calcularPontosRegaliaTotal(1)).toBe(4);
    });

    test('nível 2 → 8', () => {
        expect(calcularPontosRegaliaTotal(2)).toBe(8);
    });

    test('nível 3 → 10', () => {
        expect(calcularPontosRegaliaTotal(3)).toBe(10);
    });

    test('nível 20 → 44', () => {
        expect(calcularPontosRegaliaTotal(20)).toBe(44);
    });
});

// ============================================================================
// calcularCustoHabilidade (custo escalonado)
// ============================================================================
describe('calcularCustoHabilidade', () => {
    test('valor 0 → custo 0', () => {
        expect(calcularCustoHabilidade(0)).toBe(0);
    });

    test('valor 1 → custo 1', () => {
        expect(calcularCustoHabilidade(1)).toBe(1);
    });

    test('valor 4 → custo 4 (4×1pt)', () => {
        expect(calcularCustoHabilidade(4)).toBe(4);
    });

    test('valor 5 → custo 6 (4×1 + 1×2)', () => {
        expect(calcularCustoHabilidade(5)).toBe(6);
    });

    test('valor 6 → custo 9 (4×1 + 1×2 + 1×3)', () => {
        expect(calcularCustoHabilidade(6)).toBe(9);
    });

    test('valor 7 → custo 13 (4 + 2 + 3 + 4)', () => {
        expect(calcularCustoHabilidade(7)).toBe(13);
    });

    test('valor 10 → custo 25 (4 + 2 + 3 + 4×4 = 25)', () => {
        expect(calcularCustoHabilidade(10)).toBe(25);
    });

    test('valor 15 (máximo) → custo 45', () => {
        // 4 + 2 + 3 + 9×4 = 45
        expect(calcularCustoHabilidade(15)).toBe(45);
    });
});

// ============================================================================
// calcularCustoDistribuicaoTotal
// ============================================================================
describe('calcularCustoDistribuicaoTotal', () => {
    test('distribuição vazia → 0', () => {
        expect(calcularCustoDistribuicaoTotal({})).toBe(0);
    });

    test('duas habilidades a 4 → 8', () => {
        expect(calcularCustoDistribuicaoTotal({ forca: 4, agilidade: 4 })).toBe(8);
    });

    test('uma a 5 + uma a 4 → 10', () => {
        expect(calcularCustoDistribuicaoTotal({ forca: 5, agilidade: 4 })).toBe(10);
    });
});

// ============================================================================
// validarDistribuicaoHabilidades
// ============================================================================
describe('validarDistribuicaoHabilidades', () => {
    test('distribuição vazia com 2 grupos é válida (com aviso de pontos restantes)', () => {
        const r = validarDistribuicaoHabilidades(1, {}, ['fisico', 'social']);
        expect(r.valido).toBe(true);
        expect(r.avisos.length).toBeGreaterThan(0);
        expect(r.detalhes.pontosRestantes).toBe(PONTOS_HABILIDADE_NIVEL_1);
    });

    test('grupo inválido gera erro', () => {
        const r = validarDistribuicaoHabilidades(1, {}, ['fisico', 'invalido']);
        expect(r.valido).toBe(false);
        expect(r.erros.some(e => e.includes('inválidos'))).toBe(true);
    });

    test('3 grupos no nível 1 gera erro (máximo 2)', () => {
        const r = validarDistribuicaoHabilidades(1, {}, ['fisico', 'social', 'arcana']);
        expect(r.valido).toBe(false);
        expect(r.erros.some(e => e.includes('Máximo de 2'))).toBe(true);
    });

    test('3 grupos no nível 7 é válido', () => {
        const r = validarDistribuicaoHabilidades(7, {}, ['fisico', 'social', 'arcana']);
        expect(r.valido).toBe(true);
    });

    test('exceder pontos disponíveis gera erro', () => {
        // valor 15 custa 45 pontos → acima dos 40 disponíveis
        const r = validarDistribuicaoHabilidades(1, { fortitude: 15 }, ['fisico', 'social']);
        expect(r.valido).toBe(false);
        expect(r.erros.some(e => e.includes('excede'))).toBe(true);
    });

    test('valor total acima de 15 (distribuição + bônus grupo) gera erro', () => {
        // fortitude em grupo fisico ganha +1; se distribuir 15, total = 16 > MAX
        const r = validarDistribuicaoHabilidades(1, { fortitude: 15 }, ['fisico', 'social']);
        expect(r.erros.some(e => e.includes('excede o máximo de 15'))).toBe(true);
    });

    test('habilidade desconhecida gera erro', () => {
        const r = validarDistribuicaoHabilidades(1, { naoExiste: 5 }, ['fisico', 'social']);
        expect(r.valido).toBe(false);
        expect(r.erros.some(e => e.includes('desconhecida'))).toBe(true);
    });

    test('valor negativo gera erro', () => {
        const r = validarDistribuicaoHabilidades(1, { forca: -1 }, ['fisico', 'social']);
        expect(r.valido).toBe(false);
        expect(r.erros.some(e => e.includes('negativo'))).toBe(true);
    });

    test('distribuição válida completa com 40 pontos', () => {
        // 10 habilidades a 4 = custo 10×4 = 40 pts exatos
        const dist = {};
        const habs = ['fortitude', 'forca', 'agilidade', 'atletismo',
            'percepcao', 'furtividade', 'arcanismo', 'historia', 'enganacao', 'destreza'];
        habs.forEach(h => { dist[h] = 4; });
        const r = validarDistribuicaoHabilidades(1, dist, ['fisico', 'social']);
        expect(r.valido).toBe(true);
        expect(r.detalhes.custoTotal).toBe(40);
        expect(r.detalhes.pontosRestantes).toBe(0);
    });

    test('pontos de proficiência: gastos corretos', () => {
        const r = validarDistribuicaoHabilidades(1, {}, ['fisico', 'social'], {
            pontosProficienciaGastos: 4
        });
        expect(r.valido).toBe(true);
        expect(r.detalhes.pontosProficiencia.proficienciasObtidas).toBe(2);
        expect(r.detalhes.pontosProficiencia.restantes).toBe(0);
    });

    test('pontos de proficiência: excesso gera erro', () => {
        const r = validarDistribuicaoHabilidades(1, {}, ['fisico', 'social'], {
            pontosProficienciaGastos: 5
        });
        expect(r.valido).toBe(false);
        expect(r.erros.some(e => e.includes('proficiência'))).toBe(true);
    });

    test('bônus de grupo aparece nos detalhes', () => {
        const r = validarDistribuicaoHabilidades(1, { fortitude: 3 }, ['fisico', 'social']);
        expect(r.detalhes.porHabilidade.fortitude.bonusGrupo).toBe(1);
        expect(r.detalhes.porHabilidade.fortitude.total).toBe(4);
    });

    test('pontosExtraRegalias aumenta o teto disponível', () => {
        // 15 custa 45, mas com 5 pts extra (40+5=45) deve funcionar
        const r = validarDistribuicaoHabilidades(1, { fortitude: 14 }, ['social', 'exploracao'], {
            pontosExtraRegalias: 1 // 40+1=41, custo de 14 = 4+2+3+4*8 = 41
        });
        expect(r.valido).toBe(true);
    });
});

// ============================================================================
// Dados e helpers
// ============================================================================
describe('Dados estruturais', () => {
    test('existem 5 grupos de habilidades', () => {
        expect(gruposHabilidades).toHaveLength(5);
    });

    test('existem 35 habilidades no total', () => {
        expect(todasHabilidades).toHaveLength(35);
    });

    test('habilidadesIniciais contém todas as 35 chaves com valor 0', () => {
        expect(Object.keys(habilidadesIniciais)).toHaveLength(35);
        Object.values(habilidadesIniciais).forEach(v => expect(v).toBe(0));
    });

    test('TABELA_XP_POR_NIVEL tem 20 entradas', () => {
        expect(TABELA_XP_POR_NIVEL).toHaveLength(20);
    });
});

describe('Helpers', () => {
    test('getHabilidade por key', () => {
        const hab = getHabilidade('fortitude');
        expect(hab).not.toBeNull();
        expect(hab.title).toBe('Fortitude');
    });

    test('getHabilidade por nome', () => {
        const hab = getHabilidade('Fortitude');
        expect(hab).not.toBeNull();
        expect(hab.key).toBe('fortitude');
    });

    test('getHabilidade inexistente → null', () => {
        expect(getHabilidade('naoexiste')).toBeNull();
    });

    test('getHabilidadeDescricao retorna descrição', () => {
        const desc = getHabilidadeDescricao('fortitude');
        expect(desc).toBeTruthy();
        expect(typeof desc).toBe('string');
    });

    test('getHabilidadesPorCategoria fisico retorna 8 habilidades', () => {
        expect(getHabilidadesPorCategoria('fisico')).toHaveLength(8);
    });

    test('getMarcosHabilidade retorna marcos', () => {
        const marcos = getMarcosHabilidade('fortitude');
        expect(marcos.length).toBeGreaterThan(0);
        expect(marcos[0].nivel).toBe(10);
    });

    test('getMarcosAtingidos filtra por valor', () => {
        expect(getMarcosAtingidos('fortitude', 5)).toHaveLength(0);
        expect(getMarcosAtingidos('fortitude', 10)).toHaveLength(1);
    });
});

// ============================================================================
// Constantes
// ============================================================================
describe('Constantes', () => {
    test('PONTOS_HABILIDADE_NIVEL_1 = 40', () => {
        expect(PONTOS_HABILIDADE_NIVEL_1).toBe(40);
    });

    test('PONTOS_PROFICIENCIA_EXTRA = 4', () => {
        expect(PONTOS_PROFICIENCIA_EXTRA).toBe(4);
    });

    test('MAX_PONTOS_POR_HABILIDADE = 15', () => {
        expect(MAX_PONTOS_POR_HABILIDADE).toBe(15);
    });
});
