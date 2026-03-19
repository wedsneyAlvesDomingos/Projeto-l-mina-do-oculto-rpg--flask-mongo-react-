/**
 * useCharacterSheet.js
 * Hook central que encapsula TODO o estado e callbacks da ficha de personagem.
 * Extraído de characterSheet.js para manter o componente principal sob 500 linhas.
 *
 * Integração v2:
 * - Condições: POST/DELETE /api/v2/personagens/{id}/condicoes
 * - Descanso:  POST /api/v2/personagens/{id}/descanso
 * - Ficha:     GET  /api/v2/personagens/{id}/ficha  (stats derivados do backend)
 */
import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import {
    aplicarCondicaoV2,
    removerCondicaoV2,
    realizarDescansoV2,
    fetchFicha,
    listarSnapshots,
    restaurarSnapshot,
    fetchPersonagens,
    atualizarPersonagem,
} from '../../services/apiV2';
import {
    calcularPontosDeVida,
    calcularEstamina,
    calcularPontosDeMagia,
    calcularCuraKitMedico,
    calcularTempoRespiracao,
    calcularVantagemDesvantagem,
    cobreParaMoedas,
    calcularDescansosCurto,
    calcularDescansoLongo,
    calcularPenalidadeLuz,
    calcularCapacidadeCarga,
    calcularCargaAtual,
    verificarStatusCarga,
    calcularBonusIniciativa,
    calcularBonusDefesaAgilidade,
    calcularDefesaTotal,
    calcularVelocidadeMovimento,
    calcularModificadoresCondicoes,
    calcularNivel,
    TABELA_XP_POR_NIVEL,
    calcularPontosRegaliaTotal,
} from '../../data/constants';
import { calcularPenalidadesForcaArmadura } from '../../data/constants/equipamentos';

/* Dados constantes para seletor de dados */
export const DADOS_DISPONIVEIS = [
    { valor: 2, nome: 'd2' },
    { valor: 3, nome: 'd3' },
    { valor: 4, nome: 'd4' },
    { valor: 6, nome: 'd6' },
    { valor: 8, nome: 'd8' },
    { valor: 10, nome: 'd10' },
    { valor: 12, nome: 'd12' },
    { valor: 20, nome: 'd20' },
    { valor: 100, nome: 'd100' },
];

export default function useCharacterSheet() {
    /* ── Parâmetros ─────────────────────────────────── */
    const params  = useMemo(() => new URLSearchParams(window.location.search), []);
    const characterId = params.get('id');
    const baseUrl = process.env.REACT_APP_LISTEN_ADDRESS;
    const user    = useMemo(() => JSON.parse(localStorage.getItem('user') || '{}'), []);
    const userId  = user?.id;

    /* ── Estado principal ───────────────────────────── */
    const [character, setCharacter]           = useState(null);
    const [originalCharacter, setOriginalCharacter] = useState(null);
    const [editMode, setEditMode]             = useState(false);
    const [activeTab, setActiveTab]           = useState(0);
    const [snackbar, setSnackbar]             = useState({ open: false, message: '', severity: 'success' });
    const [loading, setLoading]               = useState(true);
    const [erro, setErro]                     = useState('');

    /* ── Vantagem / Desvantagem / Luz ───────────────── */
    const [vantagens, setVantagens]           = useState(0);
    const [desvantagens, setDesvantagens]     = useState(0);
    const [nivelLuz, setNivelLuz]             = useState('completa');

    /* ── Snapshots de evolução ──────────────────────── */
    const [levelSnapshots, setLevelSnapshots] = useState([]);

    /* ── Modais ─────────────────────────────────────── */
    const [dinheiroModalOpen, setDinheiroModalOpen]     = useState(false);
    const [descansoModalOpen, setDescansoModalOpen]     = useState(false);

    /* ── Equipamento ────────────────────────────────── */
    const [armasEquipadas, setArmasEquipadas]       = useState([null, null]);
    const [armaduraEquipada, setArmaduraEquipada]   = useState(null);
    const [escudoEquipado, setEscudoEquipado]       = useState(null);

    /* ── Dados ──────────────────────────────────────── */
    const [dadoSelecionado, setDadoSelecionado]     = useState(20);
    const [quantidadeDados, setQuantidadeDados]     = useState(1);
    const [diceResult, setDiceResult]               = useState(null);
    const [diceRolling, setDiceRolling]             = useState(false);
    const [diceHistory, setDiceHistory]             = useState([]);

    /* ── Ref imagem ─────────────────────────────────── */
    const fileInputRef = useRef(null);

    /* ═══════════════════════════════════════════════════
       CALLBACKS — Imagem
       ═══════════════════════════════════════════════════ */
    const processFile = useCallback((file) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => setCharacter(prev => prev ? { ...prev, image: reader.result } : prev);
            reader.readAsDataURL(file);
        }
    }, []);
    const handleImageDrop        = useCallback((e) => { e.preventDefault(); processFile(e.dataTransfer.files[0]); }, [processFile]);
    const handleDragOver         = useCallback((e) => e.preventDefault(), []);
    const handleImageButtonClick = useCallback(() => fileInputRef.current?.click(), []);
    const handleImageFileChange  = useCallback((e) => processFile(e.target.files?.[0]), [processFile]);

    /* ═══════════════════════════════════════════════════
       CALLBACKS — Persistência
       ═══════════════════════════════════════════════════ */
    const salvarHistoricoRolagens = useCallback(async (novoHistorico) => {
        try {
            await atualizarPersonagem(character?.id, { ...character, historico_rolagens: novoHistorico.slice(0, 50) });
        } catch (err) { console.error('Erro ao salvar histórico:', err); }
    }, [character]);

    const salvarMoedas = useCallback(async (novasMoedas) => {
        if (!character?.id) return;
        try {
            await atualizarPersonagem(character.id, { ...character, moedas: novasMoedas });
        } catch (err) { console.error('Erro ao salvar moedas:', err); }
    }, [character]);

    const atualizarMoeda = useCallback((tipo, valor) => {
        if (!character) return;
        const novasMoedas = { ...(character.moedas || {}), [tipo]: parseInt(valor) || 0 };
        setCharacter(prev => ({ ...prev, moedas: novasMoedas }));
        salvarMoedas(novasMoedas);
    }, [character, salvarMoedas]);

    /* ═══════════════════════════════════════════════════
       CALLBACKS — Rolagem de dados
       ═══════════════════════════════════════════════════ */
    const rollDice = useCallback((sides, quantity = 1, bonus = 0, label = '') => {
        setDiceRolling(true);
        let animationCount = 0;
        const animationInterval = setInterval(() => {
            const tempResults = [];
            for (let i = 0; i < quantity; i++) tempResults.push(Math.floor(Math.random() * sides) + 1);
            setDiceResult({
                rolls: tempResults, total: tempResults.reduce((a, b) => a + b, 0) + bonus,
                sides, quantity, bonus, label, isAnimating: true
            });
            animationCount++;
            if (animationCount >= 10) {
                clearInterval(animationInterval);
                const finalResults = [];
                for (let i = 0; i < quantity; i++) finalResults.push(Math.floor(Math.random() * sides) + 1);
                const total = finalResults.reduce((a, b) => a + b, 0) + bonus;
                const result = {
                    rolls: finalResults, total, sides, quantity, bonus, label, isAnimating: false,
                    isCriticalHit: sides === 20 && quantity === 1 && finalResults[0] === 20,
                    isCriticalFail: sides === 20 && quantity === 1 && finalResults[0] === 1,
                    timestamp: new Date().toLocaleTimeString()
                };
                setDiceResult(result);
                const novoHistorico = [result, ...diceHistory.slice(0, 49)];
                setDiceHistory(novoHistorico);
                salvarHistoricoRolagens(novoHistorico);
                setDiceRolling(false);
            }
        }, 80);
    }, [diceHistory, salvarHistoricoRolagens]);

    const rollD20ComVantagem = useCallback((bonus = 0, label = '', numVantagens = 0, numDesvantagens = 0) => {
        setDiceRolling(true);
        const config = calcularVantagemDesvantagem(numVantagens, numDesvantagens);
        let animationCount = 0;
        const animationInterval = setInterval(() => {
            const tempResults = [];
            for (let i = 0; i < config.dados; i++) tempResults.push(Math.floor(Math.random() * 20) + 1);
            const tempResult = config.tipo === 'vantagem' ? Math.max(...tempResults)
                : config.tipo === 'desvantagem' ? Math.min(...tempResults) : tempResults[0];
            setDiceResult({
                rolls: tempResults, total: tempResult + bonus, sides: 20,
                quantity: config.dados, bonus,
                label: `${label} ${config.tipo !== 'normal' ? `(${config.tipo})` : ''}`,
                isAnimating: true, tipoRolagem: config.tipo
            });
            animationCount++;
            if (animationCount >= 10) {
                clearInterval(animationInterval);
                const finalResults = [];
                for (let i = 0; i < config.dados; i++) finalResults.push(Math.floor(Math.random() * 20) + 1);
                const finalResult = config.tipo === 'vantagem' ? Math.max(...finalResults)
                    : config.tipo === 'desvantagem' ? Math.min(...finalResults) : finalResults[0];
                const total = finalResult + bonus;
                const result = {
                    rolls: finalResults, resultadoEscolhido: finalResult, total, sides: 20,
                    quantity: config.dados, bonus,
                    label: `${label} ${config.tipo !== 'normal' ? `(${config.tipo})` : ''}`,
                    isAnimating: false,
                    isCriticalHit: finalResult === 20, isCriticalFail: finalResult === 1,
                    tipoRolagem: config.tipo, descricaoRolagem: config.descricao,
                    timestamp: new Date().toLocaleTimeString()
                };
                setDiceResult(result);
                const novoHistorico = [result, ...diceHistory.slice(0, 49)];
                setDiceHistory(novoHistorico);
                salvarHistoricoRolagens(novoHistorico);
                setDiceRolling(false);
            }
        }, 80);
    }, [diceHistory, salvarHistoricoRolagens]);

    const rollCustomDice = useCallback(() => {
        if (diceRolling) return;
        setDiceRolling(true);
        let rollCount = 0;
        const totalDice = quantidadeDados;
        const animationInterval = setInterval(() => {
            const animatedRolls = [];
            for (let i = 0; i < totalDice; i++) animatedRolls.push(Math.floor(Math.random() * dadoSelecionado) + 1);
            setDiceResult({ total: animatedRolls.reduce((a, b) => a + b, 0), label: `Rolando ${totalDice}d${dadoSelecionado}...`, rolls: animatedRolls, critical: false });
            rollCount++;
            if (rollCount >= 15) {
                clearInterval(animationInterval);
                const finalRolls = [];
                for (let i = 0; i < totalDice; i++) finalRolls.push(Math.floor(Math.random() * dadoSelecionado) + 1);
                const total = finalRolls.reduce((a, b) => a + b, 0);
                const result = {
                    total, label: `${totalDice}d${dadoSelecionado}`, rolls: finalRolls,
                    critical: total === totalDice * dadoSelecionado,
                    criticalFail: total === totalDice && dadoSelecionado >= 4,
                    sides: dadoSelecionado, quantity: totalDice, bonus: 0,
                    timestamp: new Date().toLocaleTimeString()
                };
                setDiceResult(result);
                const novoHistorico = [result, ...diceHistory.slice(0, 49)];
                setDiceHistory(novoHistorico);
                salvarHistoricoRolagens(novoHistorico);
                setDiceRolling(false);
            }
        }, 60);
    }, [diceRolling, dadoSelecionado, quantidadeDados, diceHistory, salvarHistoricoRolagens]);

    /* ═══════════════════════════════════════════════════       MEMO — Modificadores de Condições para Rolamentos
       ═══════════════════════════════════════════════════════ */
    const condicoesModificadores = useMemo(() => {
        if (!character) return {
            modificadores: { defesa: 0, ataques: 0, testes: 0, percepcao: 0 },
            velocidade: { reducao: 0, metade: false, zero: false },
            flags: {}, vantagensAtaque: 0, desvantagensAtaque: 0, resumoTexto: [],
        };
        const condicoesBase = character.condicoes || {};
        // Adicionar condições ambientais (ex: Cego por escuridão)
        const merged = { ...condicoesBase };
        if (nivelLuz === 'escuridao' && !character.visao_no_escuro) {
            merged['Cego'] = true;
        }
        return calcularModificadoresCondicoes(merged);
    }, [character, nivelLuz]);

    /* ═══════════════════════════════════════════════════════       CALLBACKS — Helpers de combate
       ═══════════════════════════════════════════════════ */
    const getPenalidadeLuzAtual = useCallback(() => {
        const temVisaoNoEscuro = character?.visao_no_escuro || false;
        const alcanceVisao = character?.alcance_visao_no_escuro || 0;
        return calcularPenalidadeLuz(nivelLuz, temVisaoNoEscuro, alcanceVisao, 0);
    }, [nivelLuz, character?.visao_no_escuro, character?.alcance_visao_no_escuro]);

    const parseDiceString = useCallback((diceString) => {
        const match = diceString.match(/(\d+)?d(\d+)([+-]\d+)?/i);
        if (match) return { quantity: parseInt(match[1]) || 1, sides: parseInt(match[2]), bonus: parseInt(match[3]) || 0 };
        return null;
    }, []);

    const rollFromString = useCallback((diceString, label = '') => {
        const parsed = parseDiceString(diceString);
        if (parsed) rollDice(parsed.sides, parsed.quantity, parsed.bonus, label);
    }, [parseDiceString, rollDice]);

    const hasAcuidadeRegalia = useCallback(() => {
        const regaliasClasse = character?.regalias_de_classe || {};
        const regaliasTexto = JSON.stringify(regaliasClasse).toLowerCase();
        return regaliasTexto.includes('acuidade') || regaliasTexto.includes('armas de acuidade');
    }, [character?.regalias_de_classe]);

    const isAcuidadeWeapon = useCallback((item) => {
        if (!item) return false;
        const name = (item.name || '').toLowerCase();
        const category = (item.category || '').toLowerCase();
        const tags = (item.tags || []).map(t => t.toLowerCase());
        const acuidadeKeywords = ['adaga', 'dagger', 'rapieira', 'rapier', 'espada curta', 'shortsword',
            'sabre', 'florete', 'estilete', 'faca', 'punhal', 'acuidade', 'leve', 'finesse'];
        return acuidadeKeywords.some(kw => name.includes(kw) || category.includes(kw) || tags.includes(kw)) || item.acuidade === true;
    }, []);

    const getDamageBonus = useCallback((item) => {
        const habilidades = character?.habilidades || {};
        const forca = habilidades['Força'] || 0;
        const destreza = habilidades['Destreza'] || 0;
        if (isAcuidadeWeapon(item) && hasAcuidadeRegalia()) return { bonus: destreza, atributo: 'Destreza' };
        return { bonus: forca, atributo: 'Força' };
    }, [character?.habilidades, isAcuidadeWeapon, hasAcuidadeRegalia]);

    const rollWeaponDamage = useCallback((damageString, weaponName, isCritical = false, item = null) => {
        const parsed = parseDiceString(damageString);
        if (parsed) {
            const multiplier = isCritical ? 2 : 1;
            const { bonus: attrBonus, atributo } = getDamageBonus(item);
            const totalBonus = (parsed.bonus + attrBonus) * multiplier;
            rollDice(parsed.sides, parsed.quantity * multiplier, totalBonus,
                `Dano ${weaponName} (+${attrBonus} ${atributo})${isCritical ? ' (CRÍTICO!)' : ''}`);
        }
    }, [parseDiceString, rollDice, getDamageBonus]);

    const rollSkillCheck = useCallback((skillBonus, skillName) => {
        const luzInfo = getPenalidadeLuzAtual();
        let bonusTotal = skillBonus;
        const habilidadesAfetadasLuz = ['combate_corpo_a_corpo', 'combate_a_distancia', 'combate_arcano',
            'investigacao', 'rastreamento', 'percepcao', 'Combate Corpo a Corpo', 'Combate a Distância',
            'Combate Arcano', 'Investigação', 'Rastreamento', 'Percepção'];
        const nomeNormalizado = skillName.toLowerCase().replace(/\s+/g, '_');
        if (habilidadesAfetadasLuz.some(h => h.toLowerCase().replace(/\s+/g, '_') === nomeNormalizado || h === skillName)) {
            bonusTotal -= luzInfo.penalidade;
        }

        // Aplicar penalidades/bônus de condições
        const modCond = condicoesModificadores.modificadores;
        bonusTotal += modCond.testes;
        // Percepção recebe penalidade adicional de percepcao (Cego: -5, Surdo: -5)
        const isPercepcao = nomeNormalizado === 'percepcao' || nomeNormalizado === 'percepção'
            || skillName === 'Percepção';
        if (isPercepcao && modCond.percepcao !== 0) {
            bonusTotal += modCond.percepcao;
        }

        // Construir label com info de condições
        const condParts = [];
        if (modCond.testes !== 0) condParts.push(`${modCond.testes > 0 ? '+' : ''}${modCond.testes} cond`);
        if (isPercepcao && modCond.percepcao !== 0) condParts.push(`${modCond.percepcao > 0 ? '+' : ''}${modCond.percepcao} per`);
        const condLabel = condParts.length > 0 ? ` [${condParts.join(', ')}]` : '';
        const luzLabel = luzInfo.penalidade > 0 ? ` (-${luzInfo.penalidade} luz)` : '';

        if (luzInfo.condicaoCego) {
            rollD20ComVantagem(bonusTotal, `Teste de ${skillName} (Cego)${condLabel}`, vantagens, desvantagens + 1);
        } else {
            rollD20ComVantagem(bonusTotal, `Teste de ${skillName}${luzLabel}${condLabel}`, vantagens, desvantagens);
        }
    }, [vantagens, desvantagens, getPenalidadeLuzAtual, rollD20ComVantagem, condicoesModificadores]);

    const rollAttackWithAdvantage = useCallback((attackBonus, attackType) => {
        const luzInfo = getPenalidadeLuzAtual();
        let bonusTotal = attackBonus - luzInfo.penalidade;

        // Aplicar penalidades/bônus de condições nos ataques
        bonusTotal += condicoesModificadores.modificadores.ataques;

        // Vantagem/Desvantagem de condições (ex: Invisível→vantagem, Cego→desvantagem)
        let vantagensFinal = vantagens + condicoesModificadores.vantagensAtaque;
        let desvantagensFinal = desvantagens + condicoesModificadores.desvantagensAtaque;

        // Construir label com info de condições
        const condParts = [];
        const modAtq = condicoesModificadores.modificadores.ataques;
        if (modAtq !== 0) condParts.push(`${modAtq > 0 ? '+' : ''}${modAtq} cond`);
        if (condicoesModificadores.vantagensAtaque > 0) condParts.push('vant. cond');
        if (condicoesModificadores.desvantagensAtaque > 0) condParts.push('desv. cond');
        const condLabel = condParts.length > 0 ? ` [${condParts.join(', ')}]` : '';
        const luzLabel = luzInfo.penalidade > 0 ? ` (-${luzInfo.penalidade} luz)` : '';

        if (luzInfo.condicaoCego) {
            rollD20ComVantagem(bonusTotal, `Ataque ${attackType} (Cego)${condLabel}`, vantagensFinal, desvantagensFinal + 1);
        } else {
            rollD20ComVantagem(bonusTotal, `Ataque ${attackType}${luzLabel}${condLabel}`, vantagensFinal, desvantagensFinal);
        }
    }, [vantagens, desvantagens, getPenalidadeLuzAtual, rollD20ComVantagem, condicoesModificadores]);

    /* ═══════════════════════════════════════════════════
       CALLBACKS — Condições & Equipar/Desequipar
       ═══════════════════════════════════════════════════ */
    /**
     * saveConditions — Sincroniza a lista de condições com o backend.
     *
     * Estratégia v2:
     *  • Para cada condição nova (não estava antes) → POST /api/v2/personagens/{id}/condicoes
     *  • Para cada condição removida (estava antes, não está mais) → DELETE /api/v2/personagens/{id}/condicoes/{slug}
     * Se o backend v2 falhar (ex: slug desconhecido), faz fallback para PUT v1
     * para garantir que o frontend não perde estado.
     */
    const saveConditions = useCallback(async (newCondicoes) => {
        if (!character?.id) return;

        const oldCondicoes = character.condicoes || {};
        const oldSlugs = new Set(Object.keys(oldCondicoes));
        const newSlugs = new Set(Object.keys(newCondicoes));

        const toAdd    = [...newSlugs].filter(s => !oldSlugs.has(s));
        const toRemove = [...oldSlugs].filter(s => !newSlugs.has(s));

        let v2Success = true;

        try {
            // Aplicar novas condições via v2
            for (const slug of toAdd) {
                await aplicarCondicaoV2(character.id, slug, { userId: userId || 0 });
            }
            // Remover condições via v2
            for (const slug of toRemove) {
                await removerCondicaoV2(character.id, slug, userId || 0);
            }
        } catch (err) {
            console.warn('[saveConditions] v2 falhou, usando fallback PUT v1:', err.message);
            v2Success = false;
        }

        // Fallback: PUT v1 para garantir sincronização de estado
        if (!v2Success || (toAdd.length === 0 && toRemove.length === 0)) {
            try {
                await atualizarPersonagem(character.id, { ...character, condicoes: newCondicoes });
            } catch (error) {
                const msg = error.message || 'Erro ao salvar condições';
                const friendly = /inválid[oa]/i.test(msg) ? 'Condição inválida selecionada'
                    : /não encontrado/i.test(msg) ? 'Personagem não encontrado. Recarregue a página'
                    : msg;
                console.error(error);
                setSnackbar({ open: true, message: friendly, severity: 'error' });
                return;
            }
        }

        setCharacter(prev => ({ ...prev, condicoes: newCondicoes }));
        setOriginalCharacter(prev => ({ ...prev, condicoes: newCondicoes }));
        const condCount = Object.keys(newCondicoes).length;
        setSnackbar({ open: true, message: condCount > 0 ? `Condições atualizadas (${condCount} ativa${condCount > 1 ? 's' : ''})` : 'Condições removidas', severity: 'success' });
    }, [character, userId]);

    const updateField = useCallback((path, value) => {
        setCharacter(prev => {
            if (!prev) return prev;
            const newChar = { ...prev };
            const keys = path.split('.');
            let obj = newChar;
            for (let i = 0; i < keys.length - 1; i++) { obj[keys[i]] = obj[keys[i]] ? { ...obj[keys[i]] } : {}; obj = obj[keys[i]]; }
            /* Proficiências, habilidades e pontos de regalia nunca devem ficar abaixo de 0 */
            if ((keys[0] === 'proficiencias' || keys[0] === 'habilidades' || keys[0] === 'pontos_de_regalia') && typeof value === 'number') {
                value = Math.max(0, value);
            }
            obj[keys[keys.length - 1]] = value;
            return newChar;
        });
    }, []);

    const equiparArma = useCallback(async (arma, slot) => {
        const novasArmas = [...armasEquipadas]; novasArmas[slot] = arma; setArmasEquipadas(novasArmas);
        try {
            await atualizarPersonagem(character.id, { ...character, armas_equipadas: novasArmas });
            setCharacter(prev => ({ ...prev, armas_equipadas: novasArmas }));
        } catch (err) { console.error('Erro ao salvar arma equipada:', err); }
    }, [armasEquipadas, character]);

    const desequiparArma = useCallback(async (slot) => {
        const novasArmas = [...armasEquipadas]; novasArmas[slot] = null; setArmasEquipadas(novasArmas);
        try {
            await atualizarPersonagem(character.id, { ...character, armas_equipadas: novasArmas });
            setCharacter(prev => ({ ...prev, armas_equipadas: novasArmas }));
        } catch (err) { console.error('Erro ao desequipar arma:', err); }
    }, [armasEquipadas, character]);

    const equiparArmadura = useCallback(async (armadura) => {
        setArmaduraEquipada(armadura);
        try {
            await atualizarPersonagem(character.id, { ...character, armadura_equipada: armadura });
            setCharacter(prev => ({ ...prev, armadura_equipada: armadura }));
        } catch (err) { console.error('Erro ao salvar armadura:', err); }
    }, [character]);

    const desequiparArmadura = useCallback(async () => {
        setArmaduraEquipada(null);
        try {
            await atualizarPersonagem(character.id, { ...character, armadura_equipada: null });
            setCharacter(prev => ({ ...prev, armadura_equipada: null }));
        } catch (err) { console.error('Erro ao desequipar armadura:', err); }
    }, [character]);

    const equiparEscudo = useCallback(async (escudo) => {
        setEscudoEquipado(escudo);
        try {
            await atualizarPersonagem(character.id, { ...character, escudo_equipado: escudo });
            setCharacter(prev => ({ ...prev, escudo_equipado: escudo }));
        } catch (err) { console.error('Erro ao salvar escudo:', err); }
    }, [character]);

    const desequiparEscudo = useCallback(async () => {
        setEscudoEquipado(null);
        try {
            await atualizarPersonagem(character.id, { ...character, escudo_equipado: null });
            setCharacter(prev => ({ ...prev, escudo_equipado: null }));
        } catch (err) { console.error('Erro ao desequipar escudo:', err); }
    }, [character]);

    /* ═══════════════════════════════════════════════════
       CALLBACKS — Save / Cancel / Tab
       ═══════════════════════════════════════════════════ */
    const handleSave = useCallback(async () => {
        const validationPatterns = {
            nome: /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/,
            descricao: /^[\s\S]{0,2000}$/,
        };
        if (character.nome && !validationPatterns.nome.test(character.nome)) {
            setSnackbar({ open: true, message: 'Nome inválido. Use apenas letras, espaços, hífens e apóstrofos (2-50 caracteres)', severity: 'error' }); return;
        }
        if (character.descricao && !validationPatterns.descricao.test(character.descricao)) {
            setSnackbar({ open: true, message: 'Descrição muito longa (máximo 2000 caracteres)', severity: 'error' }); return;
        }
        if (JSON.stringify(character) === JSON.stringify(originalCharacter)) {
            setEditMode(false); setSnackbar({ open: true, message: 'Nenhuma alteração detectada', severity: 'info' }); return;
        }
        // Sanitizar habilidades — remover chaves vazias
        const charToSave = { ...character };
        if (charToSave.habilidades) {
            charToSave.habilidades = Object.fromEntries(
                Object.entries(charToSave.habilidades).filter(([k]) => k && k.trim() !== '')
            );
        }
        try {
            await atualizarPersonagem(character.id, charToSave);
            setOriginalCharacter(JSON.parse(JSON.stringify(character)));
            setEditMode(false);
            setSnackbar({ open: true, message: 'Personagem salvo com sucesso!', severity: 'success' });
        } catch (error) {
            const msg = error.message || 'Erro ao salvar personagem';
            const friendly = /nome.*já.*existe/i.test(msg) ? 'Este nome de personagem já está em uso'
                : /inválid[oa]/i.test(msg) ? 'Dados inválidos. Verifique os campos preenchidos'
                : /não encontrado/i.test(msg) ? 'Personagem não encontrado. Recarregue a página'
                : /permissão|autorização/i.test(msg) ? 'Você não tem permissão para editar este personagem'
                : msg;
            console.error(error);
            setSnackbar({ open: true, message: friendly, severity: 'error' });
        }
    }, [character, originalCharacter]);

    const handleCancel = useCallback(() => {
        setCharacter(JSON.parse(JSON.stringify(originalCharacter)));
        setEditMode(false);
    }, [originalCharacter]);

    const handleTabChange = useCallback((_event, newValue) => setActiveTab(newValue), []);

    /* ═══════════════════════════════════════════════════
       ESTILOS compartilhados
       ═══════════════════════════════════════════════════ */
    const sectionStyle = useMemo(() => ({
        borderRight: '2px solid #756A34', borderLeft: '2px solid #756A34',
        borderRadius: '12px', backgroundColor: 'var(--surface-paper)', mb: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    }), []);

    const cardHeaderStyle = useMemo(() => ({
        background: 'linear-gradient(135deg, #162A22 0%, #40150A 100%)',
        color: 'white', borderRadius: '12px 12px 0 0', py: 1,
    }), []);

    /* ═══════════════════════════════════════════════════
       PIPELINE CENTRALIZADO — Stats Derivados
       ═══════════════════════════════════════════════════ */
    const statsDerivados = useMemo(() => {
        if (!character) return null;
        const habs = character.habilidades || {};
        const fortitude = habs['Fortitude'] || 0;
        const agilidade = habs['Agilidade'] || 0;
        const percepcao = habs['Percepção'] || 0;
        const arcanismo = habs['Arcanismo'] || 0;
        const atletismo = habs['Atletismo'] || 0;
        const forca     = habs['Força'] || 0;
        const medicina  = habs['Medicina'] || 0;

        const especieBaseVida = character.pv_base_especie || 10;
        const especieBaseVelocidade = character.velocidade_base_especie || 9;
        const regaliaClasseVida     = character.pv_regalia_classe || 0;
        const regaliaClasseMagia    = character.pm_regalia_classe || 0;
        const regaliaClasseEstamina = character.pe_regalia_classe || 0;

        const pvMax = calcularPontosDeVida(especieBaseVida, fortitude) + regaliaClasseVida;
        const peMax = calcularEstamina(atletismo) + regaliaClasseEstamina;
        const pmMax = calcularPontosDeMagia(arcanismo) + regaliaClasseMagia;

        const armaduraPesada = armaduraEquipada?.tipo?.toLowerCase() === 'pesada' ||
            armaduraEquipada?.category?.toLowerCase().includes('pesada') ||
            (armaduraEquipada?.defesa >= 10 && !armaduraEquipada?.bonusDefesa) || false;
        let defesaArmadura = armaduraPesada ? (armaduraEquipada?.defesa || 0) : (armaduraEquipada?.bonusDefesa || armaduraEquipada?.defesa || 0);
        const defesaEscudo = escudoEquipado?.bonusDefesa || escudoEquipado?.defesa || 0;

        const proficiencias = character.proficiencias;
        const temProficienciaEscudo = Array.isArray(proficiencias)
            ? proficiencias.includes('Escudos')
            : (typeof proficiencias === 'object' && proficiencias !== null)
                ? Object.keys(proficiencias).some(k => k.toLowerCase().includes('escudo'))
                : true;

        const defesaInfo = calcularDefesaTotal({ agilidade, defesaArmadura, defesaEscudo, armaduraPesada, temProficienciaEscudo });
        let defesaTotal = defesaInfo.defesaTotal;
        const bonusDefAgi = calcularBonusDefesaAgilidade(agilidade);
        const velocidadeInfo = calcularVelocidadeMovimento(especieBaseVelocidade, agilidade, armaduraPesada);
        let velocidadeTotal = velocidadeInfo.velocidadeTotal;
        const iniciativa = calcularBonusIniciativa(agilidade, percepcao);

        // Penalidade extra de forca abaixo do requisito da armadura
        const penalidadesForca = calcularPenalidadesForcaArmadura(forca, armaduraEquipada);
        if (!penalidadesForca.atendido) {
            velocidadeTotal = Math.max(0, velocidadeTotal + penalidadesForca.penalidadeVelocidadeExtra);
        }

        // Aplicar modificadores de condições à defesa e velocidade
        if (condicoesModificadores) {
            defesaTotal += condicoesModificadores.modificadores.defesa;
            if (condicoesModificadores.velocidade.zero) {
                velocidadeTotal = 0;
            } else {
                if (condicoesModificadores.velocidade.metade) {
                    velocidadeTotal = Math.floor(velocidadeTotal / 2);
                }
                if (condicoesModificadores.velocidade.reducao < 0) {
                    velocidadeTotal = Math.max(0, velocidadeTotal + condicoesModificadores.velocidade.reducao);
                }
            }
        }
        const tamanho = character.tamanho || 'medio';
        const cargaMax = calcularCapacidadeCarga(tamanho, forca);
        const cargaAtual = calcularCargaAtual(character.equipamentos || []);
        const statusCarga = verificarStatusCarga(cargaAtual, cargaMax);
        const curaKit = calcularCuraKitMedico(medicina);
        const respiracao = calcularTempoRespiracao(fortitude);

        // Ler valor atual: prioriza campo direto, fallback para recursos.*, depois max
        const recursos = character.recursos || {};
        const pvAtual = character.pv_atual ?? recursos.pv_atual ?? pvMax;
        const peAtual = character.pe_atual ?? recursos.estamina_atual ?? recursos.pe_atual ?? peMax;
        const pmAtual = character.pm_atual ?? recursos.pm_atual ?? pmMax;

        return {
            pvMax, peMax, pmMax,
            pvAtual, peAtual, pmAtual,
            // Fontes de cálculo para breakdown
            especieBaseVida, regaliaClasseVida, regaliaClasseEstamina, regaliaClasseMagia,
            defesaTotal, bonusDefAgi, defesaArmadura, defesaEscudo, armaduraPesada,
            defesaComponentes: defesaInfo.componentes, defesaFormula: defesaInfo.formula,
            velocidadeTotal, velocidadeInfo, iniciativa,
            cargaMax, cargaAtual, statusCarga, curaKit, respiracao,
            fortitude, agilidade, percepcao, arcanismo, atletismo, forca, medicina,
            penalidadesForca
        };
    }, [character, armaduraEquipada, escudoEquipado, condicoesModificadores]);

    /* ═══════════════════════════════════════════════════
       CALLBACKS — Descanso (dependem de statsDerivados)
       ═══════════════════════════════════════════════════ */
    /**
     * aplicarDescansoCurto — Delega ao backend v2 (descanso=curto).
     * Fallback: cálculo local se v2 não disponível.
     */
    const aplicarDescansoCurto = useCallback(async () => {
        if (!character || !statsDerivados) return;
        try {
            const resultado = await realizarDescansoV2(character.id, 'curto', userId || 0);
            // Backend retorna os novos valores exatos
            setCharacter(prev => ({
                ...prev,
                pv_atual: resultado.pv?.depois ?? prev.pv_atual,
                pe_atual: resultado.pe?.depois ?? prev.pe_atual,
                pm_atual: resultado.pm?.depois ?? prev.pm_atual,
            }));
            const pvRec = resultado.pv?.recuperado ?? 0;
            const peRec = resultado.pe?.recuperado ?? 0;
            const desc = `Descanso curto: recuperou ${pvRec > 0 ? `${pvRec} PV, ` : ''}${peRec} PE`;
            setSnackbar({ open: true, message: desc, severity: 'success' });
        } catch (err) {
            console.warn('[aplicarDescansoCurto] v2 falhou, usando fallback local:', err.message);
            // Fallback local
            const stats = { vidaMax: statsDerivados.pvMax, vidaAtual: statsDerivados.pvAtual, estaminaMax: statsDerivados.peMax, estaminaAtual: statsDerivados.peAtual, magiaMax: statsDerivados.pmMax, magiaAtual: statsDerivados.pmAtual };
            const recuperacao = calcularDescansosCurto(stats);
            setCharacter(prev => ({ ...prev, pv_atual: recuperacao.novaVida, pe_atual: recuperacao.novaEstamina, pm_atual: recuperacao.novaMagia }));
            setSnackbar({ open: true, message: recuperacao.descricao, severity: 'success' });
        }
        setDescansoModalOpen(false);
    }, [character, statsDerivados, userId]);

    /**
     * aplicarDescansoLongo — Delega ao backend v2 (descanso=longo).
     * Fallback: cálculo local se v2 não disponível.
     */
    const aplicarDescansoLongo = useCallback(async () => {
        if (!character || !statsDerivados) return;
        try {
            const resultado = await realizarDescansoV2(character.id, 'longo', userId || 0);
            setCharacter(prev => ({
                ...prev,
                pv_atual: resultado.pv?.depois ?? prev.pv_atual,
                pe_atual: resultado.pe?.depois ?? prev.pe_atual,
                pm_atual: resultado.pm?.depois ?? prev.pm_atual,
                nivel_cansaco: resultado.cansaco?.depois ?? prev.nivel_cansaco,
            }));
            const pvRec = resultado.pv?.recuperado ?? 0;
            const pmRec = resultado.pm?.recuperado ?? 0;
            const peRec = resultado.pe?.recuperado ?? 0;
            const desc = `Descanso longo: recuperou ${pvRec} PV, ${peRec} PE, ${pmRec} PM`;
            setSnackbar({ open: true, message: desc, severity: 'success' });
        } catch (err) {
            console.warn('[aplicarDescansoLongo] v2 falhou, usando fallback local:', err.message);
            // Fallback local
            const stats = { vidaMax: statsDerivados.pvMax, estaminaMax: statsDerivados.peMax, magiaMax: statsDerivados.pmMax, nivelCansaco: character.nivel_cansaco || 0 };
            const recuperacao = calcularDescansoLongo(stats);
            setCharacter(prev => ({ ...prev, pv_atual: recuperacao.novaVida, pe_atual: recuperacao.novaEstamina, pm_atual: recuperacao.novaMagia, nivel_cansaco: recuperacao.novoNivelCansaco }));
            setSnackbar({ open: true, message: recuperacao.descricao, severity: 'success' });
        }
        setDescansoModalOpen(false);
    }, [character, statsDerivados, userId]);

    /* ═══════════════════════════════════════════════════
       EFEITO — Carregar personagem
       ═══════════════════════════════════════════════════ */
    useEffect(() => {
        if (!userId) return;
        setLoading(true);
        fetchPersonagens(userId)
            .then(data => {
                const personagem = data.find(char => char.id === parseInt(characterId));
                if (personagem) {
                    setCharacter(personagem);
                    setOriginalCharacter(JSON.parse(JSON.stringify(personagem)));
                    if (personagem.armas_equipadas) setArmasEquipadas(personagem.armas_equipadas);
                    if (personagem.armadura_equipada) setArmaduraEquipada(personagem.armadura_equipada);
                    if (personagem.escudo_equipado) setEscudoEquipado(personagem.escudo_equipado);
                    if (personagem.historico_rolagens) setDiceHistory(personagem.historico_rolagens);
                    if (!personagem.moedas && personagem.dinheiro !== undefined) {
                        const totalCobre = Math.round((parseFloat(personagem.dinheiro) || 0) * 100);
                        setCharacter(prev => ({
                            ...prev,
                            moedas: { platina: Math.floor(totalCobre / 1000), ouro: Math.floor((totalCobre % 1000) / 100), prata: Math.floor((totalCobre % 100) / 10), cobre: totalCobre % 10 }
                        }));
                    }
                } else { console.warn('Personagem não encontrado para o ID:', characterId); }
                setLoading(false);
            })
            .catch(error => { console.error(error); setErro(error.message); setLoading(false); });
    }, [userId, characterId]);

    /* ═══════════════════════════════════════════════════
       EFEITO — Carregar snapshots de evolução
       ═══════════════════════════════════════════════════ */
    useEffect(() => {
        if (!character?.id) return;
        listarSnapshots(character.id)
            .then(setLevelSnapshots)
            .catch(err => console.warn('Erro ao carregar snapshots:', err.message));
    }, [character?.id]);

    /* ═══════════════════════════════════════════════════
       CALLBACK — Subir nível instantâneo (+XP mínimo)
       ═══════════════════════════════════════════════════ */
    const handleLevelUp = useCallback(async () => {
        if (!character?.id) return;
        const nivelAtual = character.nivel || 1;
        if (nivelAtual >= 20) {
            setSnackbar({ open: true, message: 'O personagem já está no nível máximo (20)!', severity: 'warning' });
            return { success: false };
        }
        const xpNecessario = TABELA_XP_POR_NIVEL[nivelAtual - 1]; // XP para alcançar nivelAtual+1
        const novoNivel = nivelAtual + 1;
        const charAtualizado = { ...character, experiencia: xpNecessario, nivel: novoNivel };
        try {
            await atualizarPersonagem(character.id, charAtualizado);
            setCharacter(charAtualizado);
            setOriginalCharacter(JSON.parse(JSON.stringify(charAtualizado)));
            // Recarregar snapshots
            const snaps = await listarSnapshots(character.id);
            setLevelSnapshots(snaps);
            const pontosAntes = calcularPontosRegaliaTotal(nivelAtual);
            const pontosDepois = calcularPontosRegaliaTotal(novoNivel);
            return { success: true, novoNivel, pontosGanhos: pontosDepois - pontosAntes, pontosTotal: pontosDepois };
        } catch (err) {
            setSnackbar({ open: true, message: err.message || 'Erro ao subir de nível', severity: 'error' });
            return { success: false };
        }
    }, [character]);

    /* ═══════════════════════════════════════════════════
       CALLBACK — Regredir nível (restaurar snapshot)
       ═══════════════════════════════════════════════════ */
    const handleRegressLevel = useCallback(async (nivelAlvo) => {
        if (!character?.id) return;
        try {
            const resultado = await restaurarSnapshot(character.id, nivelAlvo, userId || 0);
            if (resultado.personagem) {
                setCharacter(resultado.personagem);
                setOriginalCharacter(JSON.parse(JSON.stringify(resultado.personagem)));
                // Recarregar snapshots após regressão
                const snaps = await listarSnapshots(character.id);
                setLevelSnapshots(snaps);
                setSnackbar({ open: true, message: `Personagem regredido para antes do nível ${nivelAlvo} com sucesso!`, severity: 'success' });
            }
        } catch (err) {
            setSnackbar({ open: true, message: err.message || 'Erro ao regredir nível', severity: 'error' });
        }
    }, [character?.id, userId]);

    /* ═══════════════════════════════════════════════════
       RETORNO — tudo que o componente precisa
       ═══════════════════════════════════════════════════ */
    return {
        // Identidade
        characterId, baseUrl, userId,
        // Estado principal
        character, setCharacter, originalCharacter, editMode, setEditMode,
        activeTab, setActiveTab, snackbar, setSnackbar, loading, erro,
        // Vantagem / Luz
        vantagens, setVantagens, desvantagens, setDesvantagens,
        nivelLuz, setNivelLuz,
        // Modais
        dinheiroModalOpen, setDinheiroModalOpen,
        descansoModalOpen, setDescansoModalOpen,
        // Equipamento
        armasEquipadas, armaduraEquipada, escudoEquipado,
        equiparArma, desequiparArma, equiparArmadura, desequiparArmadura,
        equiparEscudo, desequiparEscudo,
        // Dados
        dadoSelecionado, setDadoSelecionado, quantidadeDados, setQuantidadeDados,
        diceResult, setDiceResult, diceRolling, diceHistory, setDiceHistory,
        rollDice, rollD20ComVantagem, rollCustomDice,
        rollFromString, parseDiceString,
        rollAttackWithAdvantage, rollSkillCheck, rollWeaponDamage,
        hasAcuidadeRegalia, isAcuidadeWeapon, getDamageBonus,
        salvarHistoricoRolagens,
        // Imagem
        fileInputRef, handleImageDrop, handleDragOver, handleImageButtonClick, handleImageFileChange,
        // CRUD
        updateField, handleSave, handleCancel, handleTabChange,
        atualizarMoeda, saveConditions,
        // Descanso
        aplicarDescansoCurto, aplicarDescansoLongo,
        getPenalidadeLuzAtual,
        // Estilos & Derivados
        sectionStyle, cardHeaderStyle, statsDerivados,
        // Condições — modificadores aplicados aos rolamentos
        condicoesModificadores,
        // Constantes
        DADOS_DISPONIVEIS,
        // Snapshots de evolução
        levelSnapshots, handleRegressLevel, handleLevelUp,
    };
}
