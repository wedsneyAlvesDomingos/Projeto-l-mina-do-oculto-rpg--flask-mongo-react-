import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TableHead,
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    List,
    ListItem,
    ListItemText,
    Chip,
    IconButton,
    Button,
    Snackbar,
    Alert,
    Card,
    CardContent,
    CardHeader,
    Tabs,
    Tab,
    InputAdornment,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Tooltip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import InventoryIcon from '@mui/icons-material/Inventory';
import StarIcon from '@mui/icons-material/Star';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BoltIcon from '@mui/icons-material/Bolt';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ShieldIcon from '@mui/icons-material/Shield';
import SpeedIcon from '@mui/icons-material/Speed';
import CasinoIcon from '@mui/icons-material/Casino';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import HotelIcon from '@mui/icons-material/Hotel';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import "./char.css";
import UIcon from "../../assets/images/userIcon.png";

// Importações centralizadas de dados
import { 
    especiesMap, 
    condicoesDisponiveis, 
    proficiencias as proficienciasData, 
    getProficiencia,
    getRegaliaAprendiz,
    getRegaliaAprendizPorNome,
    getRegaliaOpcional,
    getOpcaoRegalia,
    // Funções de cálculo de stats derivados
    calcularPontosDeVida,
    calcularEstamina,
    calcularPontosDeMagia,
    calcularCuraKitMedico,
    calcularTempoRespiracao,
    // Regras do sistema
    calcularVantagemDesvantagem,
    rolarComVantagemDesvantagem,
    cobreParaMoedas,
    moedasParaCobre,
    formatarMoedas,
    realizarTransacao,
    calcularDanoComModificadores,
    TIPOS_DANO,
    calcularDescansosCurto,
    calcularDescansoLongo,
    verificarRequisitosDescansoLongo,
    calcularPenalidadeLuz,
    NIVEIS_LUZ,
    LIMITES_ITENS_MAGICOS,
    verificarLimiteItensMagicos,
    // Sistema de Tamanho e Carga
    TAMANHOS,
    determinarTamanho,
    calcularCapacidadeCarga,
    calcularCargaAtual,
    verificarStatusCarga,
    calcularDanoArmaPorTamanho,
    getInformacoesCarga,
    // Novas regras de combate
    DURACAO_RODADA_SEGUNDOS,
    ACOES_POR_TURNO,
    CAMPO_VISAO_GRAUS,
    ALCANCE_AMEACA_PADRAO,
    calcularBonusIniciativa,
    calcularBonusDefesaAgilidade,
    calcularDefesaTotal,
    calcularVelocidadeMovimento,
    calcularResultadoAtaque,
    calcularDanoFinal,
    INTERACOES_ELEMENTAIS,
    calcularDanoElemental,
    TIPOS_COBERTURA,
    ACOES,
    getAcoesPadrao,
    getAcoesMovimento,
    getReacoes,
    getAcoesLivres,
    TABELA_DANO_QUEDA,
    calcularDanoQueda,
} from '../../data/constants';

// Componente de condições extraído
import ConditionsPanel from './components/ConditionsPanel';

// Componentes modularizados (para uso futuro na refatoração completa)
// import {
//     CharacterHeader as ModularHeader,
//     VitalStatsSection as ModularVitalStats,
//     QuickCombatPanel as ModularCombatPanel,
//     EquipamentosSection as ModularEquipamentos,
// } from './components';

// Componente de Input controlado que evita re-renders excessivos
const EditableField = React.memo(({ value, onChange, type = 'text', label, fullWidth, multiline, rows, size, InputProps, sx, inputProps }) => {
    const [localValue, setLocalValue] = useState(value);
    
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleBlur = () => {
        if (localValue !== value) {
            onChange(localValue);
        }
    };

    const handleChange = (e) => {
        const newValue = type === 'number' ? (e.target.value === '' ? '' : Number(e.target.value)) : e.target.value;
        setLocalValue(newValue);
    };

    return (
        <TextField
            type={type}
            label={label}
            fullWidth={fullWidth}
            multiline={multiline}
            rows={rows}
            size={size}
            value={localValue ?? ''}
            onChange={handleChange}
            onBlur={handleBlur}
            InputProps={InputProps}
            sx={sx}
            inputProps={inputProps}
        />
    );
});

const CharacterSheet = () => {
    const params = new URLSearchParams(window.location.search);
    const valor = params.get('id');
    const [character, setCharacter] = useState(null);
    const [originalCharacter, setOriginalCharacter] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [loading, setLoading] = useState(true);
    const baseUrl = process.env.REACT_APP_LISTEN_ADDRESS;
    const [erro, setErro] = useState('');
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    // Estados para sistema de vantagem/desvantagem
    const [vantagens, setVantagens] = useState(0);
    const [desvantagens, setDesvantagens] = useState(0);
    
    // Estados para sistema de luz
    const [nivelLuz, setNivelLuz] = useState('completa');
    
    // Estados para sistema de dinheiro (modal de conversão)
    const [dinheiroModalOpen, setDinheiroModalOpen] = useState(false);
    const [moedas, setMoedas] = useState({ platina: 0, ouro: 0, prata: 0, cobre: 0 });
    
    // Estados para sistema de descanso
    const [descansoModalOpen, setDescansoModalOpen] = useState(false);
    
    // Estado para modal de regras de combate
    const [combatRulesModalOpen, setCombatRulesModalOpen] = useState(false);
    
    // Estados para itens equipados
    const [armasEquipadas, setArmasEquipadas] = useState([null, null]); // Até 2 armas
    const [armaduraEquipada, setArmaduraEquipada] = useState(null);
    const [escudoEquipado, setEscudoEquipado] = useState(null);
    
    // Estados para rolagem de dados customizada
    const [dadoSelecionado, setDadoSelecionado] = useState(20);
    const [quantidadeDados, setQuantidadeDados] = useState(1);

    // Ref para o input de arquivo de imagem
    const fileInputRef = useRef(null);

    // Funções para upload de imagem (igual à criação de personagem)
    const processFile = useCallback((file) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                setCharacter(prev => prev ? { ...prev, image: reader.result } : prev);
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const handleImageDrop = useCallback((e) => {
        e.preventDefault();
        processFile(e.dataTransfer.files[0]);
    }, [processFile]);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
    }, []);

    const handleImageButtonClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleImageFileChange = useCallback((e) => {
        processFile(e.target.files[0]);
    }, [processFile]);

    // Estados para o sistema de rolagem de dados
    const [diceResult, setDiceResult] = useState(null);
    const [diceRolling, setDiceRolling] = useState(false);
    const [diceHistory, setDiceHistory] = useState([]);

    // Função para salvar histórico de rolagens (definida antes de rollDice)
    const salvarHistoricoRolagens = useCallback(async (novoHistorico) => {
        try {
            await fetch(`${baseUrl}/personagens/${character.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...character, historico_rolagens: novoHistorico.slice(0, 50) }),
            });
        } catch (error) {
            console.error('Erro ao salvar histórico de rolagens:', error);
        }
    }, [character, baseUrl]);

    // Função para salvar moedas no banco
    const salvarMoedas = useCallback(async (novasMoedas) => {
        if (!character?.id) return;
        try {
            await fetch(`${baseUrl}/personagens/${character.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...character, moedas: novasMoedas }),
            });
        } catch (error) {
            console.error('Erro ao salvar moedas:', error);
        }
    }, [character, baseUrl]);

    // Função para atualizar moeda específica e salvar
    const atualizarMoeda = useCallback((tipo, valor) => {
        if (!character) return;
        const novasMoedas = {
            ...(character.moedas || {}),
            [tipo]: parseInt(valor) || 0
        };
        setCharacter(prev => ({ ...prev, moedas: novasMoedas }));
        salvarMoedas(novasMoedas);
    }, [character, salvarMoedas]);

    // Função para rolar dados
    const rollDice = useCallback((sides, quantity = 1, bonus = 0, label = '') => {
        setDiceRolling(true);
        
        // Animação de rolagem
        let animationCount = 0;
        const animationInterval = setInterval(() => {
            const tempResults = [];
            for (let i = 0; i < quantity; i++) {
                tempResults.push(Math.floor(Math.random() * sides) + 1);
            }
            setDiceResult({
                rolls: tempResults,
                total: tempResults.reduce((a, b) => a + b, 0) + bonus,
                sides,
                quantity,
                bonus,
                label,
                isAnimating: true
            });
            animationCount++;
            if (animationCount >= 10) {
                clearInterval(animationInterval);
                
                // Resultado final
                const finalResults = [];
                for (let i = 0; i < quantity; i++) {
                    finalResults.push(Math.floor(Math.random() * sides) + 1);
                }
                const total = finalResults.reduce((a, b) => a + b, 0) + bonus;
                const isCriticalHit = sides === 20 && quantity === 1 && finalResults[0] === 20;
                const isCriticalFail = sides === 20 && quantity === 1 && finalResults[0] === 1;
                
                const result = {
                    rolls: finalResults,
                    total,
                    sides,
                    quantity,
                    bonus,
                    label,
                    isAnimating: false,
                    isCriticalHit,
                    isCriticalFail,
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

    // Função para rolar d20 com vantagem/desvantagem
    const rollD20ComVantagem = useCallback((bonus = 0, label = '', numVantagens = 0, numDesvantagens = 0) => {
        setDiceRolling(true);
        
        const config = calcularVantagemDesvantagem(numVantagens, numDesvantagens);
        
        let animationCount = 0;
        const animationInterval = setInterval(() => {
            const tempResults = [];
            for (let i = 0; i < config.dados; i++) {
                tempResults.push(Math.floor(Math.random() * 20) + 1);
            }
            const tempResult = config.tipo === 'vantagem' 
                ? Math.max(...tempResults) 
                : config.tipo === 'desvantagem' 
                    ? Math.min(...tempResults) 
                    : tempResults[0];
            
            setDiceResult({
                rolls: tempResults,
                total: tempResult + bonus,
                sides: 20,
                quantity: config.dados,
                bonus,
                label: `${label} ${config.tipo !== 'normal' ? `(${config.tipo})` : ''}`,
                isAnimating: true,
                tipoRolagem: config.tipo
            });
            
            animationCount++;
            if (animationCount >= 10) {
                clearInterval(animationInterval);
                
                const finalResults = [];
                for (let i = 0; i < config.dados; i++) {
                    finalResults.push(Math.floor(Math.random() * 20) + 1);
                }
                
                const finalResult = config.tipo === 'vantagem' 
                    ? Math.max(...finalResults) 
                    : config.tipo === 'desvantagem' 
                        ? Math.min(...finalResults) 
                        : finalResults[0];
                
                const total = finalResult + bonus;
                const isCriticalHit = finalResult === 20;
                const isCriticalFail = finalResult === 1;
                
                const result = {
                    rolls: finalResults,
                    resultadoEscolhido: finalResult,
                    total,
                    sides: 20,
                    quantity: config.dados,
                    bonus,
                    label: `${label} ${config.tipo !== 'normal' ? `(${config.tipo})` : ''}`,
                    isAnimating: false,
                    isCriticalHit,
                    isCriticalFail,
                    tipoRolagem: config.tipo,
                    descricaoRolagem: config.descricao,
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

    // Função para converter dinheiro entre moedas
    const converterDinheiro = useCallback((dinheiroOuro) => {
        const totalCobre = Math.round(dinheiroOuro * 100); // Ouro para cobre
        return cobreParaMoedas(totalCobre);
    }, []);

    // Função para aplicar descanso curto
    const aplicarDescansoCurto = useCallback(() => {
        if (!character || !statsDerivados) return;
        
        const stats = {
            vidaMax: statsDerivados.pvMax,
            vidaAtual: statsDerivados.pvAtual,
            estaminaMax: statsDerivados.peMax,
            estaminaAtual: statsDerivados.peAtual,
            magiaMax: statsDerivados.pmMax,
            magiaAtual: statsDerivados.pmAtual
        };
        
        const recuperacao = calcularDescansosCurto(stats);
        
        setCharacter(prev => ({
            ...prev,
            pv_atual: recuperacao.novaVida,
            pe_atual: recuperacao.novaEstamina,
            pm_atual: recuperacao.novaMagia
        }));
        
        setSnackbar({ 
            open: true, 
            message: recuperacao.descricao, 
            severity: 'success' 
        });
        setDescansoModalOpen(false);
    }, [character, statsDerivados]);

    // Função para aplicar descanso longo
    const aplicarDescansoLongo = useCallback(() => {
        if (!character || !statsDerivados) return;
        
        const stats = {
            vidaMax: statsDerivados.pvMax,
            estaminaMax: statsDerivados.peMax,
            magiaMax: statsDerivados.pmMax,
            nivelCansaco: character.nivel_cansaco || 0
        };
        
        const recuperacao = calcularDescansoLongo(stats);
        
        setCharacter(prev => ({
            ...prev,
            pv_atual: recuperacao.novaVida,
            pe_atual: recuperacao.novaEstamina,
            pm_atual: recuperacao.novaMagia,
            nivel_cansaco: recuperacao.novoNivelCansaco
        }));
        
        setSnackbar({ 
            open: true, 
            message: recuperacao.descricao, 
            severity: 'success' 
        });
        setDescansoModalOpen(false);
    }, [character]);

    // Função para calcular penalidade de luz atual
    const getPenalidadeLuzAtual = useCallback(() => {
        const temVisaoNoEscuro = character?.visao_no_escuro || false;
        const alcanceVisao = character?.alcance_visao_no_escuro || 0;
        return calcularPenalidadeLuz(nivelLuz, temVisaoNoEscuro, alcanceVisao, 0);
    }, [nivelLuz, character?.visao_no_escuro, character?.alcance_visao_no_escuro]);

    // Função para parsear string de dado (ex: "2d6+3")
    const parseDiceString = useCallback((diceString) => {
        const match = diceString.match(/(\d+)?d(\d+)([+-]\d+)?/i);
        if (match) {
            const quantity = parseInt(match[1]) || 1;
            const sides = parseInt(match[2]);
            const bonus = parseInt(match[3]) || 0;
            return { quantity, sides, bonus };
        }
        return null;
    }, []);

    // Função para rolar dado a partir de string
    const rollFromString = useCallback((diceString, label = '') => {
        const parsed = parseDiceString(diceString);
        if (parsed) {
            rollDice(parsed.sides, parsed.quantity, parsed.bonus, label);
        }
    }, [parseDiceString, rollDice]);

    // Rolar ataque (d20 + bônus)
    const rollAttack = useCallback((attackBonus, attackType) => {
        rollDice(20, 1, attackBonus, `Ataque ${attackType}`);
    }, [rollDice]);

    // Verificar se tem regalia de combate com armas de acuidade
    const hasAcuidadeRegalia = useCallback(() => {
        const regaliasClasse = character?.regalias_de_classe || {};
        // Verificar em diferentes estruturas possíveis de regalias
        const regaliasTexto = JSON.stringify(regaliasClasse).toLowerCase();
        return regaliasTexto.includes('acuidade') || regaliasTexto.includes('armas de acuidade');
    }, [character?.regalias_de_classe]);

    // Verificar se arma é de acuidade (leves, rápidas, precisas)
    const isAcuidadeWeapon = useCallback((item) => {
        if (!item) return false;
        const name = (item.name || '').toLowerCase();
        const category = (item.category || '').toLowerCase();
        const tags = (item.tags || []).map(t => t.toLowerCase());
        
        // Armas típicas de acuidade: adagas, rapieiras, espadas curtas, etc.
        const acuidadeKeywords = ['adaga', 'dagger', 'rapieira', 'rapier', 'espada curta', 'shortsword', 
            'sabre', 'florete', 'estilete', 'faca', 'punhal', 'acuidade', 'leve', 'finesse'];
        
        return acuidadeKeywords.some(keyword => 
            name.includes(keyword) || category.includes(keyword) || tags.includes(keyword)
        ) || item.acuidade === true;
    }, []);

    // Obter bônus de dano baseado na arma e regalias
    const getDamageBonus = useCallback((item) => {
        const habilidades = character?.habilidades || {};
        const forca = habilidades['Força'] || 0;
        const destreza = habilidades['Destreza'] || 0;
        
        // Se a arma é de acuidade E o personagem tem a regalia, usa Destreza
        if (isAcuidadeWeapon(item) && hasAcuidadeRegalia()) {
            return { bonus: destreza, atributo: 'Destreza' };
        }
        
        // Caso contrário, usa Força para armas corpo a corpo
        return { bonus: forca, atributo: 'Força' };
    }, [character?.habilidades, isAcuidadeWeapon, hasAcuidadeRegalia]);

    // Rolar dano de arma (com bônus de Força ou Destreza)
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

    // Rolar teste de habilidade com vantagem/desvantagem e penalidade de luz
    const rollSkillCheck = useCallback((skillBonus, skillName) => {
        // Aplicar penalidade de luz para habilidades afetadas
        const luzInfo = getPenalidadeLuzAtual();
        let bonusTotal = skillBonus;
        
        // Habilidades afetadas pela luz
        const habilidadesAfetadasLuz = ['combate_corpo_a_corpo', 'combate_a_distancia', 'combate_arcano',
            'investigacao', 'rastreamento', 'percepcao', 'Combate Corpo a Corpo', 'Combate a Distância',
            'Combate Arcano', 'Investigação', 'Rastreamento', 'Percepção'];
        
        const nomeNormalizado = skillName.toLowerCase().replace(/\s+/g, '_');
        if (habilidadesAfetadasLuz.some(h => h.toLowerCase().replace(/\s+/g, '_') === nomeNormalizado || h === skillName)) {
            bonusTotal -= luzInfo.penalidade;
        }
        
        // Se estiver cego, rola com desvantagem
        if (luzInfo.condicaoCego) {
            rollD20ComVantagem(bonusTotal, `Teste de ${skillName} (Cego)`, vantagens, desvantagens + 1);
        } else {
            rollD20ComVantagem(bonusTotal, `Teste de ${skillName}${luzInfo.penalidade > 0 ? ` (-${luzInfo.penalidade} luz)` : ''}`, vantagens, desvantagens);
        }
    }, [vantagens, desvantagens, getPenalidadeLuzAtual, rollD20ComVantagem]);

    // Rolar ataque com vantagem/desvantagem
    const rollAttackWithAdvantage = useCallback((attackBonus, attackType) => {
        const luzInfo = getPenalidadeLuzAtual();
        let bonusTotal = attackBonus - luzInfo.penalidade;
        
        if (luzInfo.condicaoCego) {
            rollD20ComVantagem(bonusTotal, `Ataque ${attackType} (Cego)`, vantagens, desvantagens + 1);
        } else {
            rollD20ComVantagem(bonusTotal, `Ataque ${attackType}${luzInfo.penalidade > 0 ? ` (-${luzInfo.penalidade} luz)` : ''}`, vantagens, desvantagens);
        }
    }, [vantagens, desvantagens, getPenalidadeLuzAtual, rollD20ComVantagem]);

    // Função para salvar condições no backend
    const saveConditions = useCallback(async (newCondicoes) => {
        if (!character?.id) return;
        try {
            const response = await fetch(`${baseUrl}/personagens/${character.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...character, condicoes: newCondicoes }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.message || errorData.error || 'Erro ao salvar condições';
                
                // Análise de erro com regex
                if (/inválid[oa]/i.test(errorMessage)) {
                    throw new Error('Condição inválida selecionada');
                } else if (/não encontrado/i.test(errorMessage)) {
                    throw new Error('Personagem não encontrado. Recarregue a página');
                }
                
                throw new Error(errorMessage);
            }
            
            // Atualiza o estado local
            setCharacter(prev => ({ ...prev, condicoes: newCondicoes }));
            setOriginalCharacter(prev => ({ ...prev, condicoes: newCondicoes }));
            
            const condCount = Object.keys(newCondicoes).length;
            setSnackbar({ 
                open: true, 
                message: condCount > 0 ? `Condições atualizadas (${condCount} ativa${condCount > 1 ? 's' : ''})` : 'Condições removidas', 
                severity: 'success' 
            });
        } catch (error) {
            console.error(error);
            setSnackbar({ open: true, message: error.message || 'Erro ao salvar condições', severity: 'error' });
        }
    }, [baseUrl, character]);

    // especiesMap agora importado de ../../data/constants

    useEffect(() => {
        if (!userId) return;
        setLoading(true);
        fetch(`${baseUrl}/personagens/${userId}`)
            .then(response => {
                if (!response.ok) throw new Error('Erro ao buscar personagens');
                return response.json();
            })
            .then(data => {
                const personagem = data.find(char => char.id === parseInt(valor));
                if (personagem) {
                    setCharacter(personagem);
                    setOriginalCharacter(JSON.parse(JSON.stringify(personagem)));
                    // Inicializar itens equipados do personagem
                    if (personagem.armas_equipadas) {
                        setArmasEquipadas(personagem.armas_equipadas);
                    }
                    if (personagem.armadura_equipada) {
                        setArmaduraEquipada(personagem.armadura_equipada);
                    }
                    if (personagem.escudo_equipado) {
                        setEscudoEquipado(personagem.escudo_equipado);
                    }
                    // Inicializar histórico de rolagens
                    if (personagem.historico_rolagens) {
                        setDiceHistory(personagem.historico_rolagens);
                    }
                    // Converter dinheiro antigo para sistema de moedas se necessário
                    if (!personagem.moedas && personagem.dinheiro !== undefined) {
                        const dinheiroOuro = parseFloat(personagem.dinheiro) || 0;
                        const totalCobre = Math.round(dinheiroOuro * 100);
                        const moedas = {
                            platina: Math.floor(totalCobre / 1000),
                            ouro: Math.floor((totalCobre % 1000) / 100),
                            prata: Math.floor((totalCobre % 100) / 10),
                            cobre: totalCobre % 10
                        };
                        setCharacter(prev => ({ ...prev, moedas }));
                    }
                } else {
                    console.warn("Personagem não encontrado para o ID:", valor);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setErro(error.message);
                setLoading(false);
            });
    }, [userId, valor, baseUrl]);

    const handleSave = useCallback(async () => {
        // Validação com regex dos campos editáveis
        const validationPatterns = {
            nome: /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/,
            descricao: /^[\s\S]{0,2000}$/,
            idade: /^(1[0-9]|[2-9][0-9]|[1-9][0-9]{2}|1000)$/,
            dinheiro: /^\d+(\.\d{1,2})?$/
        };

        // Validar nome
        if (character.nome && !validationPatterns.nome.test(character.nome)) {
            setSnackbar({ 
                open: true, 
                message: 'Nome inválido. Use apenas letras, espaços, hífens e apóstrofos (2-50 caracteres)', 
                severity: 'error' 
            });
            return;
        }

        // Validar descrição
        if (character.descricao && !validationPatterns.descricao.test(character.descricao)) {
            setSnackbar({ 
                open: true, 
                message: 'Descrição muito longa (máximo 2000 caracteres)', 
                severity: 'error' 
            });
            return;
        }

        // Verifica se houve alterações
        const hasChanges = JSON.stringify(character) !== JSON.stringify(originalCharacter);
        
        if (!hasChanges) {
            setEditMode(false);
            setSnackbar({ open: true, message: 'Nenhuma alteração detectada', severity: 'info' });
            return;
        }

        try {
            const response = await fetch(`${baseUrl}/personagens/${character.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(character),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.message || errorData.error || 'Erro ao salvar personagem';
                
                // Análise de erro com regex para mensagens específicas
                if (/nome.*já.*existe/i.test(errorMessage)) {
                    throw new Error('Este nome de personagem já está em uso');
                } else if (/inválid[oa]/i.test(errorMessage)) {
                    throw new Error('Dados inválidos. Verifique os campos preenchidos');
                } else if (/não encontrado/i.test(errorMessage)) {
                    throw new Error('Personagem não encontrado. Recarregue a página');
                } else if (/permissão|autorização/i.test(errorMessage)) {
                    throw new Error('Você não tem permissão para editar este personagem');
                }
                
                throw new Error(errorMessage);
            }

            const data = await response.json();
            setOriginalCharacter(JSON.parse(JSON.stringify(character)));
            setEditMode(false);
            setSnackbar({ open: true, message: 'Personagem salvo com sucesso!', severity: 'success' });
        } catch (error) {
            console.error(error);
            setSnackbar({ open: true, message: error.message || 'Erro ao salvar personagem', severity: 'error' });
        }
    }, [character, originalCharacter, baseUrl]);

    const handleCancel = useCallback(() => {
        setCharacter(JSON.parse(JSON.stringify(originalCharacter)));
        setEditMode(false);
    }, [originalCharacter]);

    // Funções para equipar/desequipar itens
    const equiparArma = useCallback(async (arma, slot) => {
        const novasArmas = [...armasEquipadas];
        novasArmas[slot] = arma;
        setArmasEquipadas(novasArmas);
        
        // Salvar no banco
        try {
            await fetch(`${baseUrl}/personagens/${character.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...character, armas_equipadas: novasArmas }),
            });
            setCharacter(prev => ({ ...prev, armas_equipadas: novasArmas }));
        } catch (error) {
            console.error('Erro ao salvar arma equipada:', error);
        }
    }, [armasEquipadas, character, baseUrl]);

    const desequiparArma = useCallback(async (slot) => {
        const novasArmas = [...armasEquipadas];
        novasArmas[slot] = null;
        setArmasEquipadas(novasArmas);
        
        try {
            await fetch(`${baseUrl}/personagens/${character.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...character, armas_equipadas: novasArmas }),
            });
            setCharacter(prev => ({ ...prev, armas_equipadas: novasArmas }));
        } catch (error) {
            console.error('Erro ao desequipar arma:', error);
        }
    }, [armasEquipadas, character, baseUrl]);

    const equiparArmadura = useCallback(async (armadura) => {
        setArmaduraEquipada(armadura);
        
        try {
            await fetch(`${baseUrl}/personagens/${character.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...character, armadura_equipada: armadura }),
            });
            setCharacter(prev => ({ ...prev, armadura_equipada: armadura }));
        } catch (error) {
            console.error('Erro ao salvar armadura equipada:', error);
        }
    }, [character, baseUrl]);

    const desequiparArmadura = useCallback(async () => {
        setArmaduraEquipada(null);
        
        try {
            await fetch(`${baseUrl}/personagens/${character.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...character, armadura_equipada: null }),
            });
            setCharacter(prev => ({ ...prev, armadura_equipada: null }));
        } catch (error) {
            console.error('Erro ao desequipar armadura:', error);
        }
    }, [character, baseUrl]);

    const equiparEscudo = useCallback(async (escudo) => {
        setEscudoEquipado(escudo);
        
        try {
            await fetch(`${baseUrl}/personagens/${character.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...character, escudo_equipado: escudo }),
            });
            setCharacter(prev => ({ ...prev, escudo_equipado: escudo }));
        } catch (error) {
            console.error('Erro ao salvar escudo equipado:', error);
        }
    }, [character, baseUrl]);

    const desequiparEscudo = useCallback(async () => {
        setEscudoEquipado(null);
        
        try {
            await fetch(`${baseUrl}/personagens/${character.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...character, escudo_equipado: null }),
            });
            setCharacter(prev => ({ ...prev, escudo_equipado: null }));
        } catch (error) {
            console.error('Erro ao desequipar escudo:', error);
        }
    }, [character, baseUrl]);

    const updateField = useCallback((path, value) => {
        setCharacter(prev => {
            if (!prev) return prev;
            const newChar = { ...prev };
            const keys = path.split('.');
            let obj = newChar;
            
            // Navegar e criar cópias superficiais apenas dos objetos necessários
            for (let i = 0; i < keys.length - 1; i++) {
                const key = keys[i];
                obj[key] = obj[key] ? { ...obj[key] } : {};
                obj = obj[key];
            }
            
            obj[keys[keys.length - 1]] = value;
            return newChar;
        });
    }, []);

    const handleTabChange = useCallback((event, newValue) => {
        setActiveTab(newValue);
    }, []);

    const sectionStyle = useMemo(() => ({
        borderRight: '2px solid #756A34',
        borderLeft: '2px solid #756A34',
        borderRadius: '12px',
        backgroundColor: '#fcfcfcee',
        mb: 2,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    }), []);

    const cardHeaderStyle = useMemo(() => ({
        background: 'linear-gradient(135deg, #162A22 0%, #40150A 100%)',
        color: 'white',
        borderRadius: '12px 12px 0 0',
        py: 1,
    }), []);

    // ============================================================================
    // PIPELINE CENTRALIZADO DE STATS DERIVADOS
    // Recalcula automaticamente quando character, armadura ou escudo mudam
    // ============================================================================
    const statsDerivados = useMemo(() => {
        if (!character) return null;

        const habs = character.habilidades || {};
        const fortitude   = habs['Fortitude'] || 0;
        const agilidade   = habs['Agilidade'] || 0;
        const percepcao   = habs['Percepção'] || 0;
        const arcanismo   = habs['Arcanismo'] || 0;
        const atletismo   = habs['Atletismo'] || 0;
        const forca       = habs['Força'] || 0;
        const medicina    = habs['Medicina'] || 0;

        // Valores base da espécie
        const especieBaseVida = character.pv_base_especie || 10;
        const especieBaseVelocidade = character.velocidade_base_especie || 9;

        // Bônus de regalia de classe
        const regaliaClasseVida     = character.pv_regalia_classe || 0;
        const regaliaClasseMagia    = character.pm_regalia_classe || 0;
        const regaliaClasseEstamina = character.pe_regalia_classe || 0;

        // --- Recursos ---
        const pvMax = calcularPontosDeVida(especieBaseVida, fortitude) + regaliaClasseVida;
        const peMax = calcularEstamina(atletismo) + regaliaClasseEstamina;
        const pmMax = calcularPontosDeMagia(arcanismo) + regaliaClasseMagia;

        // --- Defesa ---
        const armaduraPesada = armaduraEquipada?.tipo?.toLowerCase() === 'pesada' ||
                               armaduraEquipada?.category?.toLowerCase().includes('pesada') ||
                               (armaduraEquipada?.defesa >= 10 && !armaduraEquipada?.bonusDefesa) ||
                               false;

        let defesaArmadura = 0;
        if (armaduraPesada) {
            defesaArmadura = armaduraEquipada?.defesa || 0;
        } else {
            defesaArmadura = armaduraEquipada?.bonusDefesa || armaduraEquipada?.defesa || 0;
        }
        const defesaEscudo = escudoEquipado?.bonusDefesa || escudoEquipado?.defesa || 0;

        const proficiencias = character.proficiencias;
        const temProficienciaEscudo = Array.isArray(proficiencias)
            ? proficiencias.includes('Escudos')
            : (typeof proficiencias === 'object' && proficiencias !== null)
                ? Object.keys(proficiencias).some(k => k.toLowerCase().includes('escudo'))
                : true;

        const defesaInfo = calcularDefesaTotal({
            agilidade,
            defesaArmadura,
            defesaEscudo,
            armaduraPesada,
            temProficienciaEscudo
        });
        const defesaTotal = defesaInfo.defesaTotal;
        const bonusDefAgi = calcularBonusDefesaAgilidade(agilidade);

        // --- Velocidade ---
        const velocidadeInfo = calcularVelocidadeMovimento(
            especieBaseVelocidade,
            agilidade,
            armaduraPesada
        );
        const velocidadeTotal = velocidadeInfo.velocidadeTotal;

        // --- Iniciativa ---
        const iniciativa = calcularBonusIniciativa(agilidade, percepcao);

        // --- Carga ---
        const tamanho = character.tamanho || 'medio';
        const cargaMax = calcularCapacidadeCarga(forca, tamanho);
        const cargaAtual = calcularCargaAtual(character.equipamentos || []);
        const statusCarga = verificarStatusCarga(cargaAtual, cargaMax);

        // --- Utilitários ---
        const curaKit = calcularCuraKitMedico(medicina);
        const respiracao = calcularTempoRespiracao(fortitude);

        return {
            // Recursos
            pvMax, peMax, pmMax,
            pvAtual: character.pv_atual !== undefined ? character.pv_atual : pvMax,
            peAtual: character.pe_atual !== undefined ? character.pe_atual : peMax,
            pmAtual: character.pm_atual !== undefined ? character.pm_atual : pmMax,
            // Defesa
            defesaTotal, bonusDefAgi, defesaArmadura, defesaEscudo, armaduraPesada,
            defesaComponentes: defesaInfo.componentes,
            defesaFormula: defesaInfo.formula,
            // Velocidade
            velocidadeTotal, velocidadeInfo,
            // Iniciativa
            iniciativa,
            // Carga
            cargaMax, cargaAtual, statusCarga,
            // Utilitários
            curaKit, respiracao,
            // Habilidades diretas (para referência rápida)
            fortitude, agilidade, percepcao, arcanismo, atletismo, forca, medicina
        };
    }, [character, armaduraEquipada, escudoEquipado]);

    // Componente de exibição do resultado da rolagem de dados
    const DiceResultDisplay = () => {
        if (!diceResult) return null;

        const getBgColor = () => {
            if (diceResult.isCriticalHit) return 'linear-gradient(135deg, #BB8130 0%, #AB6422 100%)';
            if (diceResult.isCriticalFail) return 'linear-gradient(135deg, #5B1F0F 0%, #931C4A 100%)';
            return 'linear-gradient(135deg, #162A22 0%, #2F3C29 100%)';
        };

        return (
            <Paper 
                elevation={8} 
                sx={{ 
                    position: 'fixed',
                    top: 100,
                    right: 20,
                    zIndex: 1000,
                    p: 3,
                    borderRadius: 3,
                    background: getBgColor(),
                    color: 'white',
                    minWidth: '200px',
                    animation: diceResult.isAnimating ? 'shake 0.1s infinite' : 'none',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    border: diceResult.isCriticalHit ? '3px solid #BB8130' : diceResult.isCriticalFail ? '3px solid #931C4A' : 'none'
                }}
            >
                <Typography variant="caption" sx={{ opacity: 0.8, display: 'block', mb: 1 }}>
                    {diceResult.label || 'Rolagem'}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <CasinoIcon sx={{ fontSize: 40, animation: diceResult.isAnimating ? 'spin 0.2s infinite linear' : 'none' }} />
                    <Typography variant="h3" sx={{ fontWeight: 'bold', fontFamily: 'monospace' }}>
                        {diceResult.total}
                    </Typography>
                </Box>

                {diceResult.isCriticalHit && (
                    <Chip label="🎯 CRÍTICO!" sx={{ backgroundColor: '#BB8130', color: '#fff', fontWeight: 'bold', mb: 1 }} />
                )}
                {diceResult.isCriticalFail && (
                    <Chip label="💀 FALHA CRÍTICA!" sx={{ backgroundColor: '#931C4A', color: '#fff', fontWeight: 'bold', mb: 1 }} />
                )}

                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {diceResult.quantity}d{diceResult.sides}
                    {diceResult.bonus !== 0 && (diceResult.bonus > 0 ? `+${diceResult.bonus}` : diceResult.bonus)}
                </Typography>
                
                {diceResult.rolls && diceResult.rolls.length > 1 && (
                    <Typography variant="caption" sx={{ display: 'block', opacity: 0.7 }}>
                        [{diceResult.rolls.join(', ')}]
                    </Typography>
                )}

                <IconButton 
                    size="small" 
                    onClick={() => setDiceResult(null)}
                    sx={{ position: 'absolute', top: 4, right: 4, color: 'white' }}
                >
                    <CancelIcon fontSize="small" />
                </IconButton>
            </Paper>
        );
    };

    // Componente de histórico de rolagens
    // Sidebar de Histórico de Rolagens (estilo chat)
    const DiceHistorySidebar = () => (
        <Paper sx={{ 
            position: 'sticky', 
            top: 16, 
            height: 'calc(100vh - 120px)', 
            display: 'flex', 
            flexDirection: 'column',
            backgroundColor: '#f8f7f4',
            border: '2px solid #756A34',
            borderRadius: 2,
            overflow: 'hidden'
        }}>
            {/* Header */}
            <Box sx={{ 
                p: 1.5, 
                backgroundColor: '#40150A', 
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: 1
            }}>
                <CasinoIcon />
                <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: '14px' }}>
                    Histórico de Rolagens
                </Typography>
                <Typography variant="caption" sx={{ ml: 'auto', backgroundColor: '#756A34', px: 1, borderRadius: 1 }}>
                    {diceHistory.length}
                </Typography>
            </Box>
            
            {/* Lista de rolagens estilo chat */}
            <Box sx={{ 
                flex: 1, 
                overflowY: 'auto', 
                p: 1,
                display: 'flex',
                flexDirection: 'column-reverse',
                gap: 1
            }}>
                {diceHistory.length === 0 ? (
                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        height: '100%',
                        color: '#756A34' 
                    }}>
                        <Typography variant="body2" sx={{ fontStyle: 'italic', textAlign: 'center' }}>
                            🎲 Nenhuma rolagem<br />ainda realizada
                        </Typography>
                    </Box>
                ) : (
                    [...diceHistory].reverse().map((roll, idx) => (
                        <Paper 
                            key={idx} 
                            elevation={1}
                            sx={{ 
                                p: 1.5, 
                                borderRadius: 2,
                                backgroundColor: roll.isCriticalHit ? '#faf3e8' : roll.isCriticalFail ? '#fae8ed' : '#ffffff',
                                borderLeft: `4px solid ${roll.isCriticalHit ? '#BB8130' : roll.isCriticalFail ? '#931C4A' : '#756A34'}`,
                                animation: idx === diceHistory.length - 1 ? 'fadeIn 0.3s ease-in' : 'none',
                                '@keyframes fadeIn': {
                                    from: { opacity: 0, transform: 'translateY(-10px)' },
                                    to: { opacity: 1, transform: 'translateY(0)' }
                                }
                            }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ 
                                        fontWeight: 'bold', 
                                        fontSize: '13px', 
                                        color: '#40150A',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5
                                    }}>
                                        {roll.label || 'Rolagem'}
                                        {roll.isCriticalHit && <span>🎯</span>}
                                        {roll.isCriticalFail && <span>💀</span>}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#5B1F0F' }}>
                                        {roll.quantity}d{roll.sides}
                                        {roll.bonus !== 0 && (roll.bonus > 0 ? `+${roll.bonus}` : roll.bonus)}
                                    </Typography>
                                </Box>
                                <Box sx={{ textAlign: 'right' }}>
                                    <Typography sx={{ 
                                        fontWeight: 'bold', 
                                        fontSize: '20px', 
                                        lineHeight: 1,
                                        color: roll.isCriticalHit ? '#BB8130' : roll.isCriticalFail ? '#931C4A' : '#162A22' 
                                    }}>
                                        {roll.total}
                                    </Typography>
                                </Box>
                            </Box>
                            <Typography variant="caption" sx={{ color: '#756A34', fontSize: '10px' }}>
                                {roll.timestamp}
                            </Typography>
                        </Paper>
                    ))
                )}
            </Box>
            
            {/* Footer com limpar */}
            {diceHistory.length > 0 && (
                <Box sx={{ p: 1, borderTop: '1px solid #756A3466', textAlign: 'center' }}>
                    <Button
                        size="small"
                        onClick={() => {
                            setDiceHistory([]);
                            salvarHistoricoRolagens([]);
                        }}
                        sx={{ color: '#5B1F0F', fontSize: '11px' }}
                    >
                        Limpar Histórico
                    </Button>
                </Box>
            )}
        </Paper>
    );

    // Componente de painel de configurações de combate (Vantagem/Desvantagem, Luz)
    // Lista de todos os dados disponíveis
    const DADOS_DISPONIVEIS = [
        { valor: 2, nome: 'd2' },
        { valor: 3, nome: 'd3' },
        { valor: 4, nome: 'd4' },
        { valor: 6, nome: 'd6' },
        { valor: 8, nome: 'd8' },
        { valor: 10, nome: 'd10' },
        { valor: 12, nome: 'd12' },
        { valor: 20, nome: 'd20' },
        { valor: 100, nome: 'd100' }
    ];

    // Função para rolar dado customizado
    const rollCustomDice = useCallback(() => {
        if (diceRolling) return;
        
        setDiceRolling(true);
        let rollCount = 0;
        const maxRolls = 15;
        const totalDice = quantidadeDados;
        
        const animationInterval = setInterval(() => {
            const animatedRolls = [];
            for (let i = 0; i < totalDice; i++) {
                animatedRolls.push(Math.floor(Math.random() * dadoSelecionado) + 1);
            }
            setDiceResult({
                total: animatedRolls.reduce((a, b) => a + b, 0),
                label: `Rolando ${totalDice}d${dadoSelecionado}...`,
                rolls: animatedRolls,
                critical: false
            });
            rollCount++;
            
            if (rollCount >= maxRolls) {
                clearInterval(animationInterval);
                
                const finalRolls = [];
                for (let i = 0; i < totalDice; i++) {
                    finalRolls.push(Math.floor(Math.random() * dadoSelecionado) + 1);
                }
                const total = finalRolls.reduce((a, b) => a + b, 0);
                const maxPossible = totalDice * dadoSelecionado;
                const minPossible = totalDice;
                
                const result = {
                    total,
                    label: `${totalDice}d${dadoSelecionado}`,
                    rolls: finalRolls,
                    critical: total === maxPossible,
                    criticalFail: total === minPossible && dadoSelecionado >= 4,
                    sides: dadoSelecionado,
                    quantity: totalDice,
                    bonus: 0,
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

    const CombatSettingsPanel = () => {
        const vantagemInfo = calcularVantagemDesvantagem(vantagens, desvantagens);
        const luzInfo = getPenalidadeLuzAtual();
        
        return (
            <Paper sx={{ mb: 2, p: 2, backgroundColor: '#f5f3eb', border: '2px solid #40150A', borderRadius: 2 }}>
                <Typography className="esteban" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 'bold', color: '#40150A', mb: 2 }}>
                    ⚔️ Configurações de Combate
                </Typography>
                
                <Grid container spacing={2}>
                    {/* Vantagem e Desvantagem */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" sx={{ color: '#40150A', fontWeight: 'bold', mb: 1 }}>
                            Vantagem / Desvantagem
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" sx={{ color: '#454E30' }}>Vantagens:</Typography>
                                <IconButton size="small" onClick={() => setVantagens(Math.max(0, vantagens - 1))} disabled={vantagens === 0}>
                                    <Typography>-</Typography>
                                </IconButton>
                                <Chip label={vantagens} color="success" size="small" />
                                <IconButton size="small" onClick={() => setVantagens(vantagens + 1)}>
                                    <Typography>+</Typography>
                                </IconButton>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" sx={{ color: '#931C4A' }}>Desvantagens:</Typography>
                                <IconButton size="small" onClick={() => setDesvantagens(Math.max(0, desvantagens - 1))} disabled={desvantagens === 0}>
                                    <Typography>-</Typography>
                                </IconButton>
                                <Chip label={desvantagens} color="error" size="small" />
                                <IconButton size="small" onClick={() => setDesvantagens(desvantagens + 1)}>
                                    <Typography>+</Typography>
                                </IconButton>
                            </Box>
                        </Box>
                        <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#5B1F0F', fontStyle: 'italic' }}>
                            {vantagemInfo.descricao}
                        </Typography>
                    </Grid>
                    
                    {/* Nível de Luz */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" sx={{ color: '#40150A', fontWeight: 'bold', mb: 1 }}>
                            Iluminação Atual
                        </Typography>
                        <FormControl size="small" sx={{ minWidth: 200 }}>
                            <Select
                                value={nivelLuz}
                                onChange={(e) => setNivelLuz(e.target.value)}
                                sx={{ backgroundColor: 'white' }}
                            >
                                <MenuItem value="completa">
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <WbSunnyIcon sx={{ color: '#BB8130' }} /> Luz Completa
                                    </Box>
                                </MenuItem>
                                <MenuItem value="meia_luz">
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <NightsStayIcon sx={{ color: '#756A34' }} /> Meia Luz (-1 em testes)
                                    </Box>
                                </MenuItem>
                                <MenuItem value="escuridao">
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <NightsStayIcon sx={{ color: '#40150A' }} /> Escuridão (Cego)
                                    </Box>
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#5B1F0F', fontStyle: 'italic' }}>
                            {luzInfo.nivelEfetivo}
                            {luzInfo.penalidade > 0 && ` • Penalidade: -${luzInfo.penalidade}`}
                            {luzInfo.condicaoCego && ' • Condição: Cego'}
                        </Typography>
                    </Grid>
                    
                    {/* Rolagem Customizada de Dados */}
                    <Grid item xs={12}>
                        <Divider sx={{ my: 1 }} />
                        <Typography variant="subtitle2" sx={{ color: '#40150A', fontWeight: 'bold', mb: 1 }}>
                            🎲 Rolagem de Dados
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                            {/* Quantidade de dados */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2">Qtd:</Typography>
                                <IconButton size="small" onClick={() => setQuantidadeDados(Math.max(1, quantidadeDados - 1))} disabled={quantidadeDados <= 1}>
                                    <Typography>-</Typography>
                                </IconButton>
                                <Chip label={quantidadeDados} size="small" sx={{ minWidth: 32 }} />
                                <IconButton size="small" onClick={() => setQuantidadeDados(Math.min(20, quantidadeDados + 1))} disabled={quantidadeDados >= 20}>
                                    <Typography>+</Typography>
                                </IconButton>
                            </Box>
                            
                            {/* Seletor de dado */}
                            <FormControl size="small" sx={{ minWidth: 100 }}>
                                <Select
                                    value={dadoSelecionado}
                                    onChange={(e) => setDadoSelecionado(e.target.value)}
                                    sx={{ backgroundColor: 'white' }}
                                >
                                    {DADOS_DISPONIVEIS.map(dado => (
                                        <MenuItem key={dado.valor} value={dado.valor}>
                                            {dado.nome}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            
                            {/* Botão de rolagem */}
                            <Button
                                variant="contained"
                                startIcon={<CasinoIcon />}
                                onClick={rollCustomDice}
                                disabled={diceRolling}
                                sx={{ 
                                    backgroundColor: '#162A22',
                                    '&:hover': { backgroundColor: '#0d1a15' }
                                }}
                            >
                                Rolar {quantidadeDados}d{dadoSelecionado}
                            </Button>
                            
                            {/* Botão de d20 com vantagem/desvantagem */}
                            <Button
                                variant="outlined"
                                startIcon={<CasinoIcon />}
                                onClick={() => rollD20ComVantagem(0, 'Teste d20', vantagens, desvantagens)}
                                disabled={diceRolling}
                                sx={{ 
                                    borderColor: vantagemInfo.tipo === 'vantagem' ? '#454E30' : 
                                                 vantagemInfo.tipo === 'desvantagem' ? '#931C4A' : '#162A22',
                                    color: vantagemInfo.tipo === 'vantagem' ? '#454E30' : 
                                           vantagemInfo.tipo === 'desvantagem' ? '#931C4A' : '#162A22',
                                    '&:hover': { 
                                        borderColor: vantagemInfo.tipo === 'vantagem' ? '#2F3C29' : 
                                                     vantagemInfo.tipo === 'desvantagem' ? '#5B1F0F' : '#0d1a15',
                                        backgroundColor: 'rgba(22, 42, 34, 0.08)'
                                    }
                                }}
                            >
                                d20 {vantagemInfo.tipo !== 'normal' && `(${vantagemInfo.dados}d20)`}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        );
    };

    // Componente de Referência de Regras de Combate (Modal)
    const CombatRulesModal = () => {
        const [expandedSection, setExpandedSection] = React.useState(null);
        
        const acoesPadrao = getAcoesPadrao();
        const acoesMovimento = getAcoesMovimento();
        const reacoes = getReacoes();
        const acoesLivres = getAcoesLivres();
        
        const toggleSection = (section) => {
            setExpandedSection(expandedSection === section ? null : section);
        };
        
        return (
            <Dialog 
                open={combatRulesModalOpen} 
                onClose={() => setCombatRulesModalOpen(false)} 
                maxWidth="lg" 
                fullWidth
                PaperProps={{ sx: { maxHeight: '90vh' } }}
            >
                <DialogTitle sx={{ backgroundColor: '#756A34', color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
                    📜 Regras Completas de Combate
                </DialogTitle>
                <DialogContent sx={{ p: 2, backgroundColor: '#f8f7f4' }}>
                    {/* Regras Básicas de Turno */}
                    <Box sx={{ mb: 2, p: 2, backgroundColor: '#f0efe9', borderRadius: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#40150A', mb: 1 }}>
                            ⏱️ Turno e Rodada
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <Typography variant="body2" sx={{ color: '#5B1F0F' }}>
                                    <strong>Rodada:</strong> {DURACAO_RODADA_SEGUNDOS} segundos
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography variant="body2" sx={{ color: '#5B1F0F' }}>
                                    <strong>Ações por turno:</strong> {ACOES_POR_TURNO}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography variant="body2" sx={{ color: '#5B1F0F' }}>
                                    <strong>Campo de visão:</strong> {CAMPO_VISAO_GRAUS}° (cone)
                                </Typography>
                            </Grid>
                        </Grid>
                        <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#756A34', fontStyle: 'italic' }}>
                            Todos os personagens agem em seus turnos durante uma rodada. O turno termina após usar suas ações.
                        </Typography>
                    </Box>
                    
                    {/* Regras de Acerto */}
                    <Box sx={{ mb: 2, p: 2, backgroundColor: '#f0efe9', borderRadius: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#40150A', mb: 1 }}>
                            🎯 Sistema de Acerto
                        </Typography>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body2" sx={{ color: '#5B1F0F' }}>
                                    <strong>Acerto:</strong> d20 + Perícia de Combate ≥ Defesa do alvo
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#5B1F0F' }}>
                                    <strong>Empate:</strong> Dano reduzido pela metade
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body2" sx={{ color: '#5B1F0F' }}>
                                    <strong>Crítico:</strong> Natural 20 = dano ×2
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#931C4A' }}>
                                    <strong>Falha Crítica:</strong> Natural 1 = erro automático
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider sx={{ my: 1 }} />
                        <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#454E30' }}>
                            Bônus por superar defesa:
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 0.5 }}>
                            <Chip label="+10 acima: +1d4 dano" size="small" sx={{ backgroundColor: '#e8eae5' }} />
                            <Chip label="+15 acima: +2 dano" size="small" sx={{ backgroundColor: '#e8eae5' }} />
                            <Chip label="+20 acima: +3 dano" size="small" sx={{ backgroundColor: '#e8eae5' }} />
                        </Box>
                    </Box>
                    
                    {/* Sistema de Cobertura */}
                    <Box sx={{ mb: 2, p: 2, backgroundColor: '#f0efe9', borderRadius: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#40150A', mb: 1 }}>
                            🛡️ Cobertura
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            {Object.values(TIPOS_COBERTURA).map((cob) => (
                                <Tooltip key={cob.id} title={cob.descricao}>
                                    <Chip 
                                        label={`${cob.nome} ${cob.bonusDefesa > 0 ? `(+${cob.bonusDefesa})` : cob.bloqueiaAtaques ? '(bloqueia)' : ''}`}
                                        size="small"
                                        sx={{ 
                                            backgroundColor: cob.bloqueiaAtaques ? '#162A22' : cob.bonusDefesa > 0 ? '#454E30' : '#756A34',
                                            color: 'white'
                                        }}
                                    />
                                </Tooltip>
                            ))}
                        </Box>
                    </Box>
                    
                    {/* Alcance de Ameaça */}
                    <Box sx={{ mb: 2, p: 2, backgroundColor: '#f0efe9', borderRadius: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#40150A', mb: 1 }}>
                            ⚔️ Alcance de Ameaça (Corpo a Corpo)
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <Chip label={`Padrão: ${ALCANCE_AMEACA_PADRAO}m`} size="small" sx={{ backgroundColor: '#f5ebe3' }} />
                            <Chip label="Haste: 3m" size="small" sx={{ backgroundColor: '#f5ebe3' }} />
                            <Chip label="Com habilidades: até 4.5m" size="small" sx={{ backgroundColor: '#f5ebe3' }} />
                        </Box>
                    </Box>
                    
                    {/* Tabela de Dano de Queda */}
                    <Accordion 
                        expanded={expandedSection === 'queda'} 
                        onChange={() => toggleSection('queda')}
                        sx={{ mb: 1, backgroundColor: '#f5f3eb' }}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontWeight: 'bold', color: '#40150A' }}>
                                📉 Dano de Queda
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={1}>
                                {TABELA_DANO_QUEDA.slice(0, 10).map((entry) => (
                                    <Grid item xs={6} sm={3} key={entry.altura}>
                                        <Typography variant="body2" sx={{ color: '#5B1F0F' }}>
                                            {entry.altura}m = <strong>{entry.dano}</strong> dano
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
                            <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#756A34' }}>
                                Reação "Atenuar Queda": teste de Acrobacia para reduzir dano pela metade (mín 1d4)
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    
                    {/* Ações Padrão */}
                    <Accordion 
                        expanded={expandedSection === 'padrao'} 
                        onChange={() => toggleSection('padrao')}
                        sx={{ mb: 1, backgroundColor: '#f5f3eb' }}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontWeight: 'bold', color: '#40150A' }}>
                                ▶️ Ações Padrão (1 ação) - {acoesPadrao.length} ações
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List dense sx={{ py: 0 }}>
                                {acoesPadrao.map((acao) => (
                                    <ListItem key={acao.id} sx={{ 
                                        py: 0.5, 
                                        borderBottom: '1px solid #e0e0e0',
                                        '&:last-child': { borderBottom: 'none' }
                                    }}>
                                        <ListItemText
                                            primary={
                                                <Typography sx={{ fontWeight: 'bold', fontSize: '13px', color: '#40150A' }}>
                                                    {acao.nome}
                                                </Typography>
                                            }
                                            secondary={
                                                <Box>
                                                    <Typography variant="body2" sx={{ color: '#5B1F0F', fontSize: '12px' }}>
                                                        {acao.descricao}
                                                    </Typography>
                                                    {acao.teste && (
                                                        <Typography variant="caption" sx={{ color: '#756A34', fontStyle: 'italic' }}>
                                                            Teste: {acao.teste}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </AccordionDetails>
                    </Accordion>
                    
                    {/* Ações de Movimento */}
                    <Accordion 
                        expanded={expandedSection === 'movimento'} 
                        onChange={() => toggleSection('movimento')}
                        sx={{ mb: 1, backgroundColor: '#f5f3eb' }}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontWeight: 'bold', color: '#40150A' }}>
                                🏃 Ações de Movimento (1 ação) - {acoesMovimento.length} ações
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List dense sx={{ py: 0 }}>
                                {acoesMovimento.map((acao) => (
                                    <ListItem key={acao.id} sx={{ 
                                        py: 0.5, 
                                        borderBottom: '1px solid #e0e0e0',
                                        '&:last-child': { borderBottom: 'none' }
                                    }}>
                                        <ListItemText
                                            primary={
                                                <Typography sx={{ fontWeight: 'bold', fontSize: '13px', color: '#40150A' }}>
                                                    {acao.nome}
                                                </Typography>
                                            }
                                            secondary={
                                                <Box>
                                                    <Typography variant="body2" sx={{ color: '#5B1F0F', fontSize: '12px' }}>
                                                        {acao.descricao}
                                                    </Typography>
                                                    {acao.teste && (
                                                        <Typography variant="caption" sx={{ color: '#756A34', fontStyle: 'italic' }}>
                                                            Teste: {acao.teste}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </AccordionDetails>
                    </Accordion>
                    
                    {/* Reações */}
                    <Accordion 
                        expanded={expandedSection === 'reacao'} 
                        onChange={() => toggleSection('reacao')}
                        sx={{ mb: 1, backgroundColor: '#f5f3eb' }}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontWeight: 'bold', color: '#40150A' }}>
                                ⚡ Reações (1 por rodada) - {reacoes.length} reações
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List dense sx={{ py: 0 }}>
                                {reacoes.map((acao) => (
                                    <ListItem key={acao.id} sx={{ 
                                        py: 0.5, 
                                        borderBottom: '1px solid #e0e0e0',
                                        backgroundColor: '#faf8f5',
                                        '&:last-child': { borderBottom: 'none' }
                                    }}>
                                        <ListItemText
                                            primary={
                                                <Typography sx={{ fontWeight: 'bold', fontSize: '13px', color: '#BB8130' }}>
                                                    ⚡ {acao.nome}
                                                </Typography>
                                            }
                                            secondary={
                                                <Box>
                                                    <Typography variant="body2" sx={{ color: '#5B1F0F', fontSize: '12px' }}>
                                                        {acao.descricao}
                                                    </Typography>
                                                    {acao.teste && (
                                                        <Typography variant="caption" sx={{ color: '#756A34', fontStyle: 'italic' }}>
                                                            Teste: {acao.teste}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                            <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#756A34' }}>
                                Apenas 1 reação por rodada, a menos que uma regalia permita o contrário.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    
                    {/* Ações Livres */}
                    <Accordion 
                        expanded={expandedSection === 'livre'} 
                        onChange={() => toggleSection('livre')}
                        sx={{ backgroundColor: '#f5f3eb' }}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontWeight: 'bold', color: '#40150A' }}>
                                ✨ Ações Livres (sem custo) - {acoesLivres.length} ações
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List dense sx={{ py: 0 }}>
                                {acoesLivres.map((acao) => (
                                    <ListItem key={acao.id} sx={{ 
                                        py: 0.5, 
                                        borderBottom: '1px dashed #d0d0d0',
                                        '&:last-child': { borderBottom: 'none' }
                                    }}>
                                        <ListItemText
                                            primary={
                                                <Typography sx={{ fontWeight: 'bold', fontSize: '13px', color: '#454E30' }}>
                                                    ✨ {acao.nome}
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography variant="body2" sx={{ color: '#5B1F0F', fontSize: '12px' }}>
                                                    {acao.descricao}
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </AccordionDetails>
                    </Accordion>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#f0efe9' }}>
                    <Button onClick={() => setCombatRulesModalOpen(false)} sx={{ color: '#40150A' }}>
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    // Componente de painel de descanso
    const DescansoPanel = () => (
        <Dialog open={descansoModalOpen} onClose={() => setDescansoModalOpen(false)} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ backgroundColor: '#162A22', color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
                <HotelIcon /> Sistema de Descanso
            </DialogTitle>
            <DialogContent sx={{ pt: 3 }}>
                <Typography variant="body2" sx={{ mb: 3, color: '#5B1F0F' }}>
                    Escolha o tipo de descanso para recuperar seus recursos.
                </Typography>
                
                <Grid container spacing={2}>
                    {/* Descanso Curto */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 2, backgroundColor: '#f5f3eb', height: '100%' }}>
                            <Typography variant="h6" sx={{ color: '#454E30', fontWeight: 'bold', mb: 1 }}>
                                Descanso Curto
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2, color: '#5B1F0F' }}>
                                Duração: 1 hora<br/>
                                Intervalo: a cada 6 horas
                            </Typography>
                            <Typography variant="caption" sx={{ display: 'block', mb: 2, color: '#756A34' }}>
                                Recupera:<br/>
                                • 1/3 dos Pontos de Vida<br/>
                                • 1/2 da Estamina<br/>
                                • 1/2 dos Pontos de Magia
                            </Typography>
                            <Button 
                                variant="contained" 
                                fullWidth 
                                onClick={aplicarDescansoCurto}
                                sx={{ backgroundColor: '#454E30' }}
                            >
                                Descansar (Curto)
                            </Button>
                        </Paper>
                    </Grid>
                    
                    {/* Descanso Longo */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 2, backgroundColor: '#f5f3eb', height: '100%' }}>
                            <Typography variant="h6" sx={{ color: '#162A22', fontWeight: 'bold', mb: 1 }}>
                                Descanso Longo
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2, color: '#5B1F0F' }}>
                                Duração: 6 horas de sono<br/>
                                Intervalo: a cada 20 horas
                            </Typography>
                            <Typography variant="caption" sx={{ display: 'block', mb: 2, color: '#756A34' }}>
                                Recupera:<br/>
                                • Todos os Pontos de Vida<br/>
                                • Toda a Estamina<br/>
                                • Todos os Pontos de Magia<br/>
                                • -1 nível de Cansaço
                            </Typography>
                            <Typography variant="caption" sx={{ display: 'block', mb: 2, color: '#931C4A' }}>
                                Requer: Saco de dormir (ou ambiente seguro), 1 ração e 1L de água
                            </Typography>
                            <Button 
                                variant="contained" 
                                fullWidth 
                                onClick={aplicarDescansoLongo}
                                sx={{ backgroundColor: '#162A22' }}
                            >
                                Descansar (Longo)
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setDescansoModalOpen(false)}>Fechar</Button>
            </DialogActions>
        </Dialog>
    );

    // Componente de Capacidade de Carga
    const CapacidadeCargaPanel = () => {
        const habilidades = character.habilidades || {};
        const forca = habilidades['Força'] || 0;
        const alturaCm = character.altura || 170;
        const equipamentos = character.equipamentos || [];
        
        // Calcular informações de carga
        const infoCarga = getInformacoesCarga(alturaCm, forca, equipamentos);
        const { tamanho, capacidade, cargaAtual, status } = infoCarga;
        
        // Modificador de arma por tamanho
        const modArma = calcularDanoArmaPorTamanho(tamanho.id, '1d8', false);
        
        return (
            <Paper sx={{ p: 2, mb: 2, backgroundColor: '#f5f3eb', border: `2px solid ${status.cor}`, borderRadius: 2 }}>
                <Typography className="esteban" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 'bold', color: '#40150A', mb: 2 }}>
                    📦 Capacidade de Carga
                </Typography>
                
                <Grid container spacing={2}>
                    {/* Informações de Tamanho */}
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 1.5, backgroundColor: '#fff', borderRadius: 1 }}>
                            <Typography variant="subtitle2" sx={{ color: '#40150A', fontWeight: 'bold', mb: 1 }}>
                                📏 Tamanho
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <Chip 
                                    label={tamanho.nome} 
                                    sx={{ backgroundColor: '#162A22', color: 'white', fontWeight: 'bold' }} 
                                />
                                <Typography variant="body2" sx={{ color: '#5B1F0F' }}>
                                    ({tamanho.descricao})
                                </Typography>
                            </Box>
                            <Typography variant="caption" sx={{ color: '#756A34', display: 'block' }}>
                                Altura: {alturaCm} cm • Força: {forca}
                            </Typography>
                        </Paper>
                    </Grid>
                    
                    {/* Barra de Carga */}
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 1.5, backgroundColor: '#fff', borderRadius: 1 }}>
                            <Typography variant="subtitle2" sx={{ color: '#40150A', fontWeight: 'bold', mb: 1 }}>
                                {status.icone} Carga Atual
                            </Typography>
                            <Box sx={{ mb: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: status.cor }}>
                                        {cargaAtual.cargaTotal.toFixed(1)} kg
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#5B1F0F' }}>
                                        / {capacidade.capacidadeMaxima} kg
                                    </Typography>
                                </Box>
                                <Box sx={{ 
                                    width: '100%', 
                                    height: 10, 
                                    backgroundColor: '#e0e0e0', 
                                    borderRadius: 5,
                                    overflow: 'hidden'
                                }}>
                                    <Box sx={{ 
                                        width: `${Math.min(status.porcentagem, 100)}%`, 
                                        height: '100%', 
                                        backgroundColor: status.cor,
                                        transition: 'width 0.3s'
                                    }} />
                                </Box>
                                <Typography variant="caption" sx={{ color: status.cor, fontWeight: 'bold', display: 'block', mt: 0.5 }}>
                                    {status.porcentagem.toFixed(0)}% - {status.descricao}
                                </Typography>
                            </Box>
                            {status.penalidade !== 0 && (
                                <Chip 
                                    label={`Penalidade: ${status.penalidade}`} 
                                    size="small" 
                                    sx={{ backgroundColor: status.cor, color: 'white' }} 
                                />
                            )}
                        </Paper>
                    </Grid>
                    
                    {/* Modificador de Armas */}
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 1.5, backgroundColor: '#fff', borderRadius: 1 }}>
                            <Typography variant="subtitle2" sx={{ color: '#40150A', fontWeight: 'bold', mb: 1 }}>
                                ⚔️ Armas por Tamanho
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#5B1F0F', mb: 1 }}>
                                {modArma.descricao}
                            </Typography>
                            {modArma.custoMultiplicador !== 1 && (
                                <Chip 
                                    label={modArma.custoMultiplicador === 0.5 ? 'Metade do preço' : 'Dobro do preço'} 
                                    size="small" 
                                    sx={{ 
                                        backgroundColor: modArma.custoMultiplicador === 0.5 ? '#454E30' : '#931C4A', 
                                        color: 'white' 
                                    }} 
                                />
                            )}
                        </Paper>
                    </Grid>
                    
                    {/* Lista de Itens com Peso (se houver) */}
                    {cargaAtual.itensComPeso.length > 0 && (
                        <Grid item xs={12}>
                            <Accordion sx={{ backgroundColor: '#fafafa' }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#40150A' }}>
                                        📋 Detalhes dos Itens ({cargaAtual.itensComPeso.length} itens com peso)
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                        {cargaAtual.itensComPeso.map((item, idx) => (
                                            <Box 
                                                key={idx} 
                                                sx={{ 
                                                    display: 'flex', 
                                                    justifyContent: 'space-between', 
                                                    p: 0.5, 
                                                    backgroundColor: idx % 2 === 0 ? '#f5f5f5' : 'white',
                                                    borderRadius: 1
                                                }}
                                            >
                                                <Typography variant="body2">
                                                    {item.nome} {item.quantidade > 1 && `(x${item.quantidade})`}
                                                </Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#5B1F0F' }}>
                                                    {item.pesoTotal.toFixed(1)} kg
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    )}
                </Grid>
            </Paper>
        );
    };

    // Componente de botão de rolagem
    const DiceButton = ({ diceString, label, color = 'primary', size = 'small', fullRoll = false, bonus = 0, icon = null }) => (
        <IconButton
            size={size}
            onClick={() => {
                if (fullRoll) {
                    rollDice(20, 1, bonus, label);
                } else {
                    rollFromString(diceString, label);
                }
            }}
            disabled={diceRolling}
            sx={{
                backgroundColor: `${color}.main`,
                color: 'white',
                '&:hover': { backgroundColor: `${color}.dark` },
                animation: diceRolling ? 'pulse 0.3s infinite' : 'none',
                ml: 0.5
            }}
            title={fullRoll ? `Rolar d20+${bonus}` : `Rolar ${diceString}`}
        >
            {icon || <CasinoIcon fontSize="small" />}
        </IconButton>
    );

    if (loading) {
        return (
            <Box textAlign="center" mt={4}>
                <Typography className="esteban" variant="h6">Carregando ficha do personagem...</Typography>
            </Box>
        );
    }

    if (!character) {
        return (
            <Box textAlign="center" mt={4}>
                <Typography className="esteban" variant="h6">Personagem não encontrado.</Typography>
            </Box>
        );
    }

    // Componente de Cabeçalho do Personagem
    const CharacterHeader = () => (
        <Paper elevation={4} sx={{ ...sectionStyle, mb: 3, overflow: 'hidden' }}>
            <Box sx={cardHeaderStyle}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2 }}>
                    <Typography className="esteban" variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PersonIcon /> Informações do Personagem
                    </Typography>
                    {!editMode ? (
                        <IconButton onClick={() => setEditMode(true)} sx={{ color: 'white' }}>
                            <EditIcon />
                        </IconButton>
                    ) : (
                        <Box>
                            <IconButton onClick={handleSave} sx={{ color: '#454E30' }}>
                                <SaveIcon />
                            </IconButton>
                            <IconButton onClick={handleCancel} sx={{ color: '#931C4A' }}>
                                <CancelIcon />
                            </IconButton>
                        </Box>
                    )}
                </Box>
            </Box>
            <Box sx={{ p: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                        {editMode ? (
                            <Box
                                onDrop={handleImageDrop}
                                onDragOver={handleDragOver}
                                sx={{
                                    border: '2px dashed #BB8130',
                                    borderRadius: 2,
                                    padding: 2,
                                    textAlign: 'center',
                                    bgcolor: '#756A3422',
                                    position: 'relative',
                                    minHeight: '200px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    '&:hover': {
                                        bgcolor: '#756A3444',
                                        borderColor: '#40150A'
                                    }
                                }}
                                onClick={handleImageButtonClick}
                            >
                                <Typography className="esteban" variant="body2" sx={{ mb: 1, color: '#40150A' }}>
                                    Arraste e solte uma imagem aqui
                                </Typography>
                                <Typography className="esteban" variant="body2" sx={{ color: '#BB8130', fontWeight: 'bold' }}>
                                    ou clique para selecionar
                                </Typography>
                                
                                {/* Input escondido para seleção por botão */}
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleImageFileChange}
                                    style={{ display: 'none' }}
                                />

                                {character.image && (
                                    <Box
                                        component="img"
                                        src={character.image}
                                        alt="Imagem do personagem"
                                        sx={{ 
                                            mt: 2, 
                                            maxWidth: '100%', 
                                            maxHeight: '250px',
                                            borderRadius: 1,
                                            border: '2px solid #BB8130'
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                )}
                            </Box>
                        ) : (
                            <Box sx={{ textAlign: 'center' }}>
                                <img
                                    src={character.image || UIcon}
                                    alt="Character"
                                    style={{
                                        width: '250px',
                                        height: '250px',
                                        border: '3px solid #BB8130',
                                        borderRadius: '10%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </Box>
                        )}
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Grid container spacing={2}>
                            {/* Nome */}
                            <Grid item xs={12} md={6}>
                                {editMode ? (
                                    <EditableField
                                        fullWidth
                                        label="Nome do Personagem"
                                        value={character.nome_personagem || ''}
                                        onChange={(val) => updateField('nome_personagem', val)}
                                    />
                                ) : (
                                    <Typography className="esteban" variant="h4" sx={{ color: '#40150A', fontWeight: 'bold' }}>
                                        {character.nome_personagem}
                                    </Typography>
                                )}
                            </Grid>
                            {/* Nível */}
                            <Grid item xs={6} md={2}>
                                {editMode ? (
                                    <EditableField
                                        fullWidth
                                        type="number"
                                        label="Nível"
                                        value={character.nivel || 1}
                                        onChange={(val) => updateField('nivel', parseInt(val) || 1)}
                                    />
                                ) : (
                                    <Box sx={{ background: '#756A34', borderRadius: 2, p: 1, textAlign: 'center' }}>
                                        <Typography className="esteban" sx={{ color: 'white', fontSize: '12px' }}>Nível</Typography>
                                        <Typography className="esteban" sx={{ color: 'white', fontWeight: 'bold', fontSize: '24px' }}>
                                            {character.nivel}
                                        </Typography>
                                    </Box>
                                )}
                            </Grid>
                            {/* Sistema de Moedas Separadas - Sempre Editável */}
                            <Grid item xs={12} md={4}>
                                <Box sx={{ backgroundColor: '#f5ede4', borderRadius: 2, p: 1.5, border: '1px solid #BB8130' }}>
                                    <Typography className="esteban" sx={{ color: '#40150A', fontSize: '12px', fontWeight: 'bold', mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <LocalAtmIcon fontSize="small" /> Moedas
                                    </Typography>
                                    <Grid container spacing={1}>
                                        {/* Platina */}
                                        <Grid item xs={6} sm={3}>
                                            <Box sx={{ textAlign: 'center', p: 0.5, backgroundColor: '#e0e5e0', borderRadius: 1 }}>
                                                <Typography variant="caption" sx={{ color: '#5B1F0F', display: 'block', fontSize: '10px' }}>Platina</Typography>
                                                <TextField
                                                    type="number"
                                                    size="small"
                                                    variant="standard"
                                                    value={character.moedas?.platina || 0}
                                                    onChange={(e) => atualizarMoeda('platina', e.target.value)}
                                                    InputProps={{
                                                        disableUnderline: false,
                                                        sx: { color: '#756A34 !important' }
                                                    }}
                                                    inputProps={{ 
                                                        min: 0, 
                                                        style: { textAlign: 'center', fontWeight: 'bold', color: '#756A34', fontSize: '16px' } 
                                                    }}
                                                    sx={{ 
                                                        width: '60px',
                                                        '& input': { color: '#756A34 !important' },
                                                        '& .MuiInput-underline:before': { borderBottomColor: 'transparent' },
                                                        '& .MuiInput-underline:hover:before': { borderBottomColor: '#756A34 !important' },
                                                        '& .MuiInput-underline:after': { borderBottomColor: '#756A34' }
                                                    }}
                                                />
                                            </Box>
                                        </Grid>
                                        {/* Ouro */}
                                        <Grid item xs={6} sm={3}>
                                            <Box sx={{ textAlign: 'center', p: 0.5, backgroundColor: '#f5ebe3', borderRadius: 1 }}>
                                                <Typography variant="caption" sx={{ color: '#5B1F0F', display: 'block', fontSize: '10px' }}>Ouro</Typography>
                                                <TextField
                                                    type="number"
                                                    size="small"
                                                    variant="standard"
                                                    value={character.moedas?.ouro || 0}
                                                    onChange={(e) => atualizarMoeda('ouro', e.target.value)}
                                                    InputProps={{
                                                        disableUnderline: false,
                                                        sx: { color: '#BB8130 !important' }
                                                    }}
                                                    inputProps={{ 
                                                        min: 0, 
                                                        style: { textAlign: 'center', fontWeight: 'bold', color: '#BB8130', fontSize: '16px' } 
                                                    }}
                                                    sx={{ 
                                                        width: '60px',
                                                        '& input': { color: '#BB8130 !important' },
                                                        '& .MuiInput-underline:before': { borderBottomColor: 'transparent' },
                                                        '& .MuiInput-underline:hover:before': { borderBottomColor: '#BB8130 !important' },
                                                        '& .MuiInput-underline:after': { borderBottomColor: '#BB8130' }
                                                    }}
                                                />
                                            </Box>
                                        </Grid>
                                        {/* Prata */}
                                        <Grid item xs={6} sm={3}>
                                            <Box sx={{ textAlign: 'center', p: 0.5, backgroundColor: '#e8e8e8', borderRadius: 1 }}>
                                                <Typography variant="caption" sx={{ color: '#5B1F0F', display: 'block', fontSize: '10px' }}>Prata</Typography>
                                                <TextField
                                                    type="number"
                                                    size="small"
                                                    variant="standard"
                                                    value={character.moedas?.prata || 0}
                                                    onChange={(e) => atualizarMoeda('prata', e.target.value)}
                                                    InputProps={{
                                                        disableUnderline: false,
                                                        sx: { color: '#666 !important' }
                                                    }}
                                                    inputProps={{ 
                                                        min: 0, 
                                                        style: { textAlign: 'center', fontWeight: 'bold', color: '#666', fontSize: '16px' } 
                                                    }}
                                                    sx={{ 
                                                        width: '60px',
                                                        '& input': { color: '#666 !important' },
                                                        '& .MuiInput-underline:before': { borderBottomColor: 'transparent' },
                                                        '& .MuiInput-underline:hover:before': { borderBottomColor: '#666 !important' },
                                                        '& .MuiInput-underline:after': { borderBottomColor: '#666' }
                                                    }}
                                                />
                                            </Box>
                                        </Grid>
                                        {/* Cobre */}
                                        <Grid item xs={6} sm={3}>
                                            <Box sx={{ textAlign: 'center', p: 0.5, backgroundColor: '#f0dcc8', borderRadius: 1 }}>
                                                <Typography variant="caption" sx={{ color: '#5B1F0F', display: 'block', fontSize: '10px' }}>Cobre</Typography>
                                                <TextField
                                                    type="number"
                                                    size="small"
                                                    variant="standard"
                                                    value={character.moedas?.cobre || 0}
                                                    onChange={(e) => atualizarMoeda('cobre', e.target.value)}
                                                    InputProps={{
                                                        disableUnderline: false,
                                                        sx: { color: '#8B4513 !important' }
                                                    }}
                                                    inputProps={{ 
                                                        min: 0, 
                                                        style: { textAlign: 'center', fontWeight: 'bold', color: '#8B4513', fontSize: '16px' } 
                                                    }}
                                                    sx={{ 
                                                        width: '60px',
                                                        '& input': { color: '#8B4513 !important' },
                                                        '& .MuiInput-underline:before': { borderBottomColor: 'transparent' },
                                                        '& .MuiInput-underline:hover:before': { borderBottomColor: '#8B4513 !important' },
                                                        '& .MuiInput-underline:after': { borderBottomColor: '#8B4513' }
                                                    }}
                                                />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#756A34', textAlign: 'center', fontSize: '10px' }}>
                                        Total: {((character.moedas?.platina || 0) * 1000 + (character.moedas?.ouro || 0) * 100 + (character.moedas?.prata || 0) * 10 + (character.moedas?.cobre || 0)) / 100} M.O
                                    </Typography>
                                </Box>
                            </Grid>
                            {/* Classe */}
                            <Grid item xs={6} md={3}>
                                {editMode ? (
                                    <EditableField
                                        fullWidth
                                        label="Classe"
                                        value={character.classe || ''}
                                        onChange={(val) => updateField('classe', val)}
                                    />
                                ) : (
                                    <Box>
                                        <Typography className="esteban" sx={{ color: '#5B1F0F', fontSize: '12px' }}>Classe</Typography>
                                        <Typography className="esteban" sx={{ fontWeight: 'bold' }}>
                                            {character.classe || 'Aprendiz'}
                                        </Typography>
                                    </Box>
                                )}
                            </Grid>
                            {/* Espécie */}
                            <Grid item xs={6} md={3}>
                                {editMode ? (
                                    <FormControl fullWidth>
                                        <InputLabel>Espécie</InputLabel>
                                        <Select
                                            value={character.especie || ''}
                                            label="Espécie"
                                            onChange={(e) => updateField('especie', e.target.value)}
                                        >
                                            {Object.entries(especiesMap).map(([key, value]) => (
                                                <MenuItem key={key} value={key}>{value}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                ) : (
                                    <Box>
                                        <Typography className="esteban" sx={{ color: '#5B1F0F', fontSize: '12px' }}>Espécie</Typography>
                                        <Typography className="esteban" sx={{ fontWeight: 'bold' }}>
                                            {especiesMap[character.especie] || character.especie}
                                        </Typography>
                                    </Box>
                                )}
                            </Grid>
                            {/* Gênero */}
                            <Grid item xs={6} md={3}>
                                {editMode ? (
                                    <FormControl fullWidth>
                                        <InputLabel>Gênero</InputLabel>
                                        <Select
                                            value={character.genero || ''}
                                            label="Gênero"
                                            onChange={(e) => updateField('genero', e.target.value)}
                                        >
                                            <MenuItem value="Masculino">Masculino</MenuItem>
                                            <MenuItem value="Feminino">Feminino</MenuItem>
                                            <MenuItem value="Outro">Outro</MenuItem>
                                        </Select>
                                    </FormControl>
                                ) : (
                                    <Box>
                                        <Typography className="esteban" sx={{ color: '#5B1F0F', fontSize: '12px' }}>Gênero</Typography>
                                        <Typography className="esteban" sx={{ fontWeight: 'bold' }}>
                                            {character.genero}
                                        </Typography>
                                    </Box>
                                )}
                            </Grid>
                            {/* Idade */}
                            <Grid item xs={6} md={3}>
                                {editMode ? (
                                    <EditableField
                                        fullWidth
                                        type="number"
                                        label="Idade"
                                        value={character.idade || 0}
                                        onChange={(val) => updateField('idade', parseInt(val) || 0)}
                                    />
                                ) : (
                                    <Box>
                                        <Typography className="esteban" sx={{ color: '#5B1F0F', fontSize: '12px' }}>Idade</Typography>
                                        <Typography className="esteban" sx={{ fontWeight: 'bold' }}>
                                            {character.idade} anos
                                        </Typography>
                                    </Box>
                                )}
                            </Grid>
                            {/* Altura */}
                            <Grid item xs={6} md={3}>
                                {editMode ? (
                                    <EditableField
                                        fullWidth
                                        type="number"
                                        label="Altura (cm)"
                                        value={character.altura || 170}
                                        onChange={(val) => updateField('altura', parseInt(val) || 170)}
                                        inputProps={{ min: 1, max: 5000 }}
                                    />
                                ) : (
                                    <Tooltip 
                                        title={
                                            <Box>
                                                <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                                                    Tamanho: {determinarTamanho(character.altura || 170).nome}
                                                </Typography>
                                                <Typography variant="caption" sx={{ display: 'block' }}>
                                                    {determinarTamanho(character.altura || 170).descricao}
                                                </Typography>
                                            </Box>
                                        }
                                        arrow
                                    >
                                        <Box sx={{ cursor: 'help' }}>
                                            <Typography className="esteban" sx={{ color: '#5B1F0F', fontSize: '12px' }}>Altura</Typography>
                                            <Typography className="esteban" sx={{ fontWeight: 'bold' }}>
                                                {character.altura || 170} cm
                                                <Chip 
                                                    label={determinarTamanho(character.altura || 170).nome} 
                                                    size="small" 
                                                    sx={{ ml: 1, fontSize: '10px', height: '18px', backgroundColor: '#f5ebe3' }} 
                                                />
                                            </Typography>
                                        </Box>
                                    </Tooltip>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                
                {/* Accordions de Antecedente e Descrição dentro do Header */}
                <Box sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        {/* Antecedente Accordion */}
                        <Grid item xs={12} md={6}>
                            <Accordion sx={{ backgroundColor: '#f5f3eb', borderLeft: '4px solid #AB6422' }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className="esteban" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 'bold', color: '#40150A' }}>
                                        <HistoryEduIcon fontSize="small" /> Antecedente: {character.antecedente?.nome || 'Não definido'}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ backgroundColor: '#faf8f5' }}>
                                    {editMode ? (
                                        <>
                                            <EditableField
                                                fullWidth
                                                label="Nome do Antecedente"
                                                value={character.antecedente?.nome || ''}
                                                onChange={(val) => updateField('antecedente.nome', val)}
                                                sx={{ mb: 2 }}
                                            />
                                            <EditableField
                                                fullWidth
                                                multiline
                                                rows={4}
                                                label="Descrição do Antecedente"
                                                value={character.antecedente?.descricao || ''}
                                                onChange={(val) => updateField('antecedente.descricao', val)}
                                            />
                                        </>
                                    ) : (
                                        <Typography className="esteban" variant="body2" sx={{ 
                                            wordBreak: 'break-word', 
                                            lineHeight: 1.6,
                                            color: '#5B1F0F'
                                        }}>
                                            {character.antecedente?.descricao || 'Sem descrição'}
                                        </Typography>
                                    )}
                                    {character.antecedente?.habilidades && character.antecedente.habilidades.length > 0 && (
                                        <Box sx={{ mt: 2 }}>
                                            <Typography className="esteban" variant="subtitle2" sx={{ color: '#40150A', mb: 1, fontWeight: 'bold' }}>
                                                Habilidades do Antecedente:
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {character.antecedente.habilidades.map((hab, idx) => (
                                                    <Chip key={idx} label={hab} size="small" sx={{ 
                                                        backgroundColor: hab.includes('-') ? '#931C4A' : '#454E30',
                                                        color: 'white'
                                                    }} />
                                                ))}
                                            </Box>
                                        </Box>
                                    )}
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        
                        {/* Descrição do Personagem Accordion */}
                        <Grid item xs={12} md={6}>
                            <Accordion sx={{ backgroundColor: '#f5f3eb', borderLeft: '4px solid #162A22' }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className="esteban" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 'bold', color: '#40150A' }}>
                                        <PersonIcon fontSize="small" /> Descrição do Personagem
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ backgroundColor: '#faf8f5' }}>
                                    {editMode ? (
                                        <EditableField
                                            fullWidth
                                            multiline
                                            rows={6}
                                            label="Descrição"
                                            value={character.descricao || ''}
                                            onChange={(val) => updateField('descricao', val)}
                                        />
                                    ) : (
                                        <Typography className="esteban" variant="body2" sx={{ 
                                            wordBreak: 'break-word', 
                                            lineHeight: 1.6,
                                            color: '#5B1F0F'
                                        }}>
                                            {character.descricao || 'Sem descrição'}
                                        </Typography>
                                    )}
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Paper>
    );

    // Componente de Atributos Vitais e Combate
    const VitalStatsSection = () => {
        if (!statsDerivados) return null;

        // Usar pipeline centralizado — recalculado automaticamente via useMemo
        const {
            pvMax: pvCalculado, peMax: peCalculado, pmMax: pmCalculado,
            pvAtual, peAtual, pmAtual,
            defesaTotal: defesa, velocidadeTotal: velocidade, iniciativa,
            agilidade, percepcao
        } = statsDerivados;

        // Habilidades de combate (ainda lidas diretamente para os chips de acerto)
        const habilidades = character.habilidades || {};
        const corpoACorpo = habilidades['Combate Corpo a Corpo'] || 0;
        const distancia = habilidades['Combate a Distância'] || 0;
        const arcano = habilidades['Combate Arcano'] || 0;

        const StatBox = ({ icon, label, atual, max, color, bgColor, fieldAtual, fieldMax }) => {
            const [localAtual, setLocalAtual] = React.useState(atual);
            const [localMax, setLocalMax] = React.useState(max);
            
            React.useEffect(() => { setLocalAtual(atual); }, [atual]);
            React.useEffect(() => { setLocalMax(max); }, [max]);
            
            return (
                <Paper sx={{ 
                    p: 2, 
                    borderRadius: 3, 
                    background: bgColor,
                    border: `2px solid ${color}`,
                    textAlign: 'center',
                    minWidth: '120px',
                    boxShadow: `0 4px 12px ${color}33`
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                        {icon}
                    </Box>
                    <Typography className="esteban" sx={{ color: color, fontSize: '11px', fontWeight: 'bold', mb: 0.5 }}>
                        {label}
                    </Typography>
                    {editMode ? (
                        <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                            <TextField
                                type="number"
                                size="small"
                                value={localAtual}
                                onChange={(e) => setLocalAtual(e.target.value)}
                                onBlur={() => updateField(fieldAtual, parseInt(localAtual) || 0)}
                                sx={{ width: '50px' }}
                                inputProps={{ style: { textAlign: 'center', padding: '4px' } }}
                            />
                            <Typography sx={{ color: color }}>/</Typography>
                            <TextField
                                type="number"
                                size="small"
                                value={localMax}
                                onChange={(e) => setLocalMax(e.target.value)}
                                onBlur={() => updateField(fieldMax, parseInt(localMax) || 0)}
                                sx={{ width: '50px' }}
                                inputProps={{ style: { textAlign: 'center', padding: '4px' } }}
                            />
                        </Box>
                    ) : (
                        <Typography className="esteban" sx={{ color: color, fontWeight: 'bold', fontSize: '24px' }}>
                            {atual} <span style={{ fontSize: '14px' }}>/ {max}</span>
                        </Typography>
                    )}
                </Paper>
            );
        };

        const SingleStatBox = ({ icon, label, value, color, bgColor, field, parseFunc = parseInt }) => {
            const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^\d.-]/g, '')) || 0 : value;
            const [localValue, setLocalValue] = React.useState(numericValue);
            
            React.useEffect(() => { setLocalValue(numericValue); }, [numericValue]);
            
            return (
                <Paper sx={{ 
                    p: 2, 
                    borderRadius: 3, 
                    background: bgColor,
                    border: `2px solid ${color}`,
                    textAlign: 'center',
                    minWidth: '100px',
                    boxShadow: `0 4px 12px ${color}33`
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                        {icon}
                    </Box>
                    <Typography className="esteban" sx={{ color: color, fontSize: '11px', fontWeight: 'bold', mb: 0.5 }}>
                        {label}
                    </Typography>
                    {editMode ? (
                        <TextField
                            type="number"
                            size="small"
                            value={localValue}
                            onChange={(e) => setLocalValue(e.target.value)}
                            onBlur={() => updateField(field, parseFunc(localValue) || 0)}
                            sx={{ width: '60px' }}
                            inputProps={{ style: { textAlign: 'center', padding: '4px' } }}
                        />
                    ) : (
                        <Typography className="esteban" sx={{ color: color, fontWeight: 'bold', fontSize: '24px' }}>
                            {value}
                        </Typography>
                    )}
                </Paper>
            );
        };

        return (
            <Paper elevation={4} sx={{ ...sectionStyle, mb: 3, overflow: 'hidden' }}>
                <Box sx={cardHeaderStyle}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2 }}>
                        <Typography className="esteban" variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CasinoIcon /> Atributos Vitais & Combate
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ p: 3 }}>
                    {/* Linha de Atributos Vitais */}
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid item xs={12}>
                            <Typography className="esteban" variant="subtitle1" sx={{ fontWeight: 'bold', color: '#40150A', mb: 2 }}>
                                Pontos Vitais
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={4} md={2}>
                            <StatBox
                                icon={<FavoriteIcon sx={{ color: '#931C4A', fontSize: 28 }} />}
                                label="VIDA (PV)"
                                atual={pvAtual}
                                max={pvCalculado}
                                color="#931C4A"
                                bgColor="#f8e8ed"
                                fieldAtual="pv_atual"
                                fieldMax="pv_base_especie"
                            />
                        </Grid>
                        <Grid item xs={6} sm={4} md={2}>
                            <StatBox
                                icon={<BoltIcon sx={{ color: '#AB6422', fontSize: 28 }} />}
                                label="ESTAMINA (PE)"
                                atual={peAtual}
                                max={peCalculado}
                                color="#AB6422"
                                bgColor="#f5ede4"
                                fieldAtual="pe_atual"
                                fieldMax="pe_regalia_classe"
                            />
                        </Grid>
                        <Grid item xs={6} sm={4} md={2}>
                            <StatBox
                                icon={<AutoFixHighIcon sx={{ color: '#454E30', fontSize: 28 }} />}
                                label="MAGIA (PM)"
                                atual={pmAtual}
                                max={pmCalculado}
                                color="#454E30"
                                bgColor="#e8eae5"
                                fieldAtual="pm_atual"
                                fieldMax="pm_regalia_classe"
                            />
                        </Grid>
                        <Grid item xs={6} sm={4} md={2}>
                            <SingleStatBox
                                icon={<ShieldIcon sx={{ color: '#2F3C29', fontSize: 28 }} />}
                                label="DEFESA"
                                value={defesa}
                                color="#2F3C29"
                                bgColor="#e5e8e4"
                                field="defesa"
                            />
                        </Grid>
                        <Grid item xs={6} sm={4} md={2}>
                            <SingleStatBox
                                icon={<SpeedIcon sx={{ color: '#756A34', fontSize: 28 }} />}
                                label="VELOCIDADE"
                                value={`${velocidade}m`}
                                color="#756A34"
                                bgColor="#edecd8"
                                field="velocidade"
                                parseFunc={parseFloat}
                            />
                        </Grid>
                        <Grid item xs={6} sm={4} md={2}>
                            <SingleStatBox
                                icon={<CasinoIcon sx={{ color: '#5B1F0F', fontSize: 28 }} />}
                                label="INICIATIVA"
                                value={`+${iniciativa}`}
                                color="#5B1F0F"
                                bgColor="#ebe5e3"
                                field="iniciativa"
                            />
                        </Grid>
                    </Grid>

                    {/* Seção de Bônus de Acerto */}
                    <Divider sx={{ my: 2 }} />
                    <Typography className="esteban" variant="subtitle1" sx={{ fontWeight: 'bold', color: '#40150A', mb: 2 }}>
                        Bônus de Acerto (D20 + Perícia) - Clique para rolar
                    </Typography>
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={4}>
                            <Paper 
                                onClick={() => rollAttackWithAdvantage(corpoACorpo, 'Corpo a Corpo')}
                                sx={{ 
                                    p: 2, 
                                    textAlign: 'center', 
                                    backgroundColor: '#f5ebe3', 
                                    borderLeft: '4px solid #7B3311',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    '&:hover': { transform: 'scale(1.02)', boxShadow: 4 }
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                    <CasinoIcon sx={{ color: '#7B3311', fontSize: 20 }} />
                                    <Typography className="esteban" sx={{ fontSize: '12px', color: '#5B1F0F' }}>Corpo a Corpo</Typography>
                                </Box>
                                <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: '20px', color: '#7B3311' }}>
                                    d20 +{corpoACorpo}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper 
                                onClick={() => rollAttackWithAdvantage(distancia, 'À Distância')}
                                sx={{ 
                                    p: 2, 
                                    textAlign: 'center', 
                                    backgroundColor: '#e8eae5', 
                                    borderLeft: '4px solid #454E30',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    '&:hover': { transform: 'scale(1.02)', boxShadow: 4 }
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                    <CasinoIcon sx={{ color: '#454E30', fontSize: 20 }} />
                                    <Typography className="esteban" sx={{ fontSize: '12px', color: '#2F3C29' }}>À Distância</Typography>
                                </Box>
                                <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: '20px', color: '#454E30' }}>
                                    d20 +{distancia}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper 
                                onClick={() => rollAttackWithAdvantage(arcano, 'Arcano')}
                                sx={{ 
                                    p: 2, 
                                    textAlign: 'center', 
                                    backgroundColor: '#e3e7e5', 
                                    borderLeft: '4px solid #162A22',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    '&:hover': { transform: 'scale(1.02)', boxShadow: 4 }
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                    <CasinoIcon sx={{ color: '#162A22', fontSize: 20 }} />
                                    <Typography className="esteban" sx={{ fontSize: '12px', color: '#2F3C29' }}>Arcano</Typography>
                                </Box>
                                <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: '20px', color: '#162A22' }}>
                                    d20 +{arcano}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>

                    {/* Rolagem de Iniciativa */}
                    <Paper 
                        onClick={() => rollDice(20, 1, iniciativa, 'Iniciativa')}
                        sx={{ 
                            p: 2, 
                            textAlign: 'center', 
                            backgroundColor: '#ebe5e3', 
                            borderLeft: '4px solid #5B1F0F',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            mb: 2,
                            '&:hover': { transform: 'scale(1.01)', boxShadow: 4 }
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                            <CasinoIcon sx={{ color: '#5B1F0F', fontSize: 20 }} />
                            <Typography className="esteban" sx={{ fontWeight: 'bold', color: '#5B1F0F' }}>
                                Rolar Iniciativa: d20 +{iniciativa}
                            </Typography>
                        </Box>
                    </Paper>

                    {/* Regras de Combate Resumidas */}
                    <Accordion sx={{ backgroundColor: '#f5f3eb', mt: 2 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className="esteban" sx={{ fontWeight: 'bold', color: '#40150A' }}>
                                📜 Regras de Combate (Referência Rápida)
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography className="esteban" variant="subtitle2" sx={{ fontWeight: 'bold', color: '#BB8130' }}>
                                            🎯 Acerto Crítico (Nat 20)
                                        </Typography>
                                        <Typography className="esteban" variant="body2">
                                            Dano total é dobrado.
                                        </Typography>
                                    </Box>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography className="esteban" variant="subtitle2" sx={{ fontWeight: 'bold', color: '#931C4A' }}>
                                            ❌ Falha Crítica (Nat 1)
                                        </Typography>
                                        <Typography className="esteban" variant="body2">
                                            Acumula desgaste na arma (penalidades após 5, 10 e 20 falhas).
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography className="esteban" variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2F3C29' }}>
                                            🛡️ Resultado do Confronto
                                        </Typography>
                                        <Typography className="esteban" variant="body2">
                                            • Acerto {'>'} Defesa: <strong>Dano Total</strong><br/>
                                            • Acerto = Defesa: <strong>Metade do Dano</strong><br/>
                                            • Acerto {'<'} Defesa: <strong>Erro (Dano Zero)</strong>
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider sx={{ my: 1 }} />
                                    <Typography className="esteban" variant="subtitle2" sx={{ fontWeight: 'bold', color: '#5B1F0F', mb: 1 }}>
                                        📊 Fórmulas de Cálculo
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        <Chip label="PV = Base Espécie + Regalia + (2×Fortitude)" size="small" sx={{ backgroundColor: '#f8e8ed', color: '#40150A' }} />
                                        <Chip label="PM = Regalia + Arcanismo" size="small" sx={{ backgroundColor: '#e8eae5', color: '#40150A' }} />
                                        <Chip label="PE = Regalia + Atletismo" size="small" sx={{ backgroundColor: '#f5ede4', color: '#40150A' }} />
                                        <Chip label="Defesa (Leve/Média) = 7 + Agi + Armadura + Escudo" size="small" sx={{ backgroundColor: '#e5e8e4', color: '#40150A' }} />
                                        <Chip label="Defesa (Pesada) = Armadura + Escudo (Sem base 7)" size="small" sx={{ backgroundColor: '#d5dbd4', color: '#40150A' }} />
                                        <Chip label="Velocidade = Base + (1,5m a cada 3 Agi, máx +6m)" size="small" sx={{ backgroundColor: '#edecd8', color: '#40150A' }} />
                                    </Box>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Paper>
        );
    };

    // Componente de Acesso Rápido de Combate (Armas e Habilidades)
    const QuickCombatPanel = () => {
        if (!statsDerivados) return null;

        const habilidades = character.habilidades || {};
        const equipamentos = character.equipamentos || [];
        
        // Filtrar armas, armaduras e escudos dos equipamentos
        const armasDisponiveis = equipamentos.filter(e => 
            e.dano || 
            e.category?.toLowerCase().includes('arma') ||
            e.category?.toLowerCase().includes('weapon')
        );
        
        const armadurasDisponiveis = equipamentos.filter(e => 
            e.category?.toLowerCase().includes('armadura') ||
            e.defesa !== undefined ||
            e.bonusDefesa !== undefined ||
            e.tipo?.toLowerCase().includes('leve') ||
            e.tipo?.toLowerCase().includes('media') ||
            e.tipo?.toLowerCase().includes('pesada')
        ).filter(e => !e.category?.toLowerCase().includes('escudo'));
        
        const escudosDisponiveis = equipamentos.filter(e => 
            e.category?.toLowerCase().includes('escudo') ||
            e.category?.toLowerCase().includes('shield')
        );
        
        // Usar pipeline centralizado em vez de recalcular
        const { armaduraPesada, defesaArmadura, defesaEscudo } = statsDerivados;
        const defesaInfo = {
            defesaTotal: statsDerivados.defesaTotal,
            componentes: statsDerivados.defesaComponentes,
            formula: statsDerivados.defesaFormula,
            bonusAgilidade: statsDerivados.bonusDefAgi
        };
        
        // Habilidades de combate relevantes
        const habilidadesCombate = [
            { nome: 'Combate Corpo a Corpo', valor: habilidades['Combate Corpo a Corpo'] || 0, cor: '#7B3311' },
            { nome: 'Combate a Distância', valor: habilidades['Combate a Distância'] || 0, cor: '#454E30' },
            { nome: 'Combate Arcano', valor: habilidades['Combate Arcano'] || 0, cor: '#162A22' }
        ];
        
        // Outras habilidades úteis em combate
        const habilidadesUteis = [
            { nome: 'Atletismo', valor: habilidades['Atletismo'] || 0 },
            { nome: 'Acrobacia', valor: habilidades['Acrobacia'] || 0 },
            { nome: 'Furtividade', valor: habilidades['Furtividade'] || 0 },
            { nome: 'Percepção', valor: habilidades['Percepção'] || 0 },
            { nome: 'Intuição', valor: habilidades['Intuição'] || 0 }
        ];

        return (
            <Paper sx={{ mb: 2, backgroundColor: '#f8f7f4', border: '2px solid #7B3311', borderRadius: 2, overflow: 'hidden' }}>
                <Box sx={{ p: 2, backgroundColor: '#7B3311', color: 'white' }}>
                    <Typography className="esteban" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 'bold' }}>
                        ⚔️ Combate Rápido
                    </Typography>
                </Box>
                
                <Box sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                        {/* Defesa Calculada */}
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2, backgroundColor: '#e5e8e4', borderLeft: '4px solid #2F3C29', mb: 2 }}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} sm={3}>
                                        <Box sx={{ textAlign: 'center' }}>
                                            <Typography variant="caption" sx={{ color: '#5B1F0F' }}>DEFESA TOTAL</Typography>
                                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2F3C29' }}>
                                                {defesaInfo.defesaTotal}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={9}>
                                        <Typography variant="caption" sx={{ color: '#5B1F0F', display: 'block' }}>
                                            {armaduraPesada 
                                                ? `Armadura Pesada: ${defesaArmadura} | Escudo: +${defesaEscudo}`
                                                : `Base: 7 | Agilidade: +${defesaInfo.bonusAgilidade || 0} | Armadura: +${defesaArmadura} | Escudo: +${defesaEscudo}`
                                            }
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                                            {armaduraEquipada && (
                                                <Chip size="small" label={`🛡️ ${armaduraEquipada.name}`} sx={{ backgroundColor: '#d5dbd4' }} />
                                            )}
                                            {escudoEquipado && (
                                                <Chip size="small" label={`🔰 ${escudoEquipado.name}`} sx={{ backgroundColor: '#d5dbd4' }} />
                                            )}
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        
                        {/* Equipamentos - Sistema de Equipar */}
                        <Grid item xs={12}>
                            <Accordion sx={{ backgroundColor: '#f5f3eb', mb: 1 }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography sx={{ fontWeight: 'bold', color: '#40150A' }}>
                                        🎒 Equipar Itens
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={2}>
                                        {/* Arma Slot 1 */}
                                        <Grid item xs={12} sm={6} md={3}>
                                            <FormControl fullWidth size="small">
                                                <InputLabel>Arma Principal</InputLabel>
                                                <Select
                                                    value={armasEquipadas[0]?.name || ''}
                                                    label="Arma Principal"
                                                    onChange={(e) => {
                                                        const arma = armasDisponiveis.find(a => a.name === e.target.value);
                                                        equiparArma(arma || null, 0);
                                                    }}
                                                >
                                                    <MenuItem value="">Nenhuma</MenuItem>
                                                    {armasDisponiveis.map((arma, idx) => (
                                                        <MenuItem key={idx} value={arma.name}>{arma.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        {/* Arma Slot 2 */}
                                        <Grid item xs={12} sm={6} md={3}>
                                            <FormControl fullWidth size="small">
                                                <InputLabel>Arma Secundária</InputLabel>
                                                <Select
                                                    value={armasEquipadas[1]?.name || ''}
                                                    label="Arma Secundária"
                                                    onChange={(e) => {
                                                        const arma = armasDisponiveis.find(a => a.name === e.target.value);
                                                        equiparArma(arma || null, 1);
                                                    }}
                                                >
                                                    <MenuItem value="">Nenhuma</MenuItem>
                                                    {armasDisponiveis.map((arma, idx) => (
                                                        <MenuItem key={idx} value={arma.name}>{arma.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        {/* Armadura */}
                                        <Grid item xs={12} sm={6} md={3}>
                                            <FormControl fullWidth size="small">
                                                <InputLabel>Armadura</InputLabel>
                                                <Select
                                                    value={armaduraEquipada?.name || ''}
                                                    label="Armadura"
                                                    onChange={(e) => {
                                                        const arm = armadurasDisponiveis.find(a => a.name === e.target.value);
                                                        equiparArmadura(arm || null);
                                                    }}
                                                >
                                                    <MenuItem value="">Nenhuma</MenuItem>
                                                    {armadurasDisponiveis.map((arm, idx) => (
                                                        <MenuItem key={idx} value={arm.name}>{arm.name} (+{arm.defesa || 0})</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        {/* Escudo */}
                                        <Grid item xs={12} sm={6} md={3}>
                                            <FormControl fullWidth size="small">
                                                <InputLabel>Escudo</InputLabel>
                                                <Select
                                                    value={escudoEquipado?.name || ''}
                                                    label="Escudo"
                                                    onChange={(e) => {
                                                        const esc = escudosDisponiveis.find(a => a.name === e.target.value);
                                                        equiparEscudo(esc || null);
                                                    }}
                                                >
                                                    <MenuItem value="">Nenhum</MenuItem>
                                                    {escudosDisponiveis.map((esc, idx) => (
                                                        <MenuItem key={idx} value={esc.name}>{esc.name} (+{esc.defesa || 0})</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        
                        {/* Armas Equipadas */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#40150A', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                🗡️ Armas Equipadas
                            </Typography>
                            {(armasEquipadas[0] || armasEquipadas[1]) ? (
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    {armasEquipadas.filter(Boolean).map((arma, idx) => (
                                        <Paper key={idx} sx={{ 
                                            p: 1.5, 
                                            backgroundColor: '#f5ebe3', 
                                            borderLeft: '4px solid #7B3311',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 0.5
                                        }}>
                                            <Typography sx={{ fontWeight: 'bold', fontSize: '14px', color: '#40150A' }}>
                                                {arma.name}
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                                                {arma.dano && (
                                                    <>
                                                        <Button
                                                            size="small"
                                                            variant="contained"
                                                            startIcon={<CasinoIcon />}
                                                            onClick={() => rollWeaponDamage(arma.dano, arma.name, false, arma)}
                                                            sx={{ 
                                                                backgroundColor: '#931C4A', 
                                                                fontSize: '11px',
                                                                '&:hover': { backgroundColor: '#7a1640' }
                                                            }}
                                                        >
                                                            Dano: {arma.dano}
                                                        </Button>
                                                        <Button
                                                            size="small"
                                                            variant="outlined"
                                                            onClick={() => rollWeaponDamage(arma.dano, arma.name, true, arma)}
                                                            sx={{ 
                                                                borderColor: '#7B3311', 
                                                                color: '#7B3311',
                                                                fontSize: '11px'
                                                            }}
                                                        >
                                                            💀 CRIT
                                                        </Button>
                                                    </>
                                                )}
                                                {arma.ataque && (
                                                    <Button
                                                        size="small"
                                                        variant="contained"
                                                        startIcon={<CasinoIcon />}
                                                        onClick={() => rollDice(20, 1, parseInt(arma.ataque) || 0, `Ataque com ${arma.name}`)}
                                                        sx={{ 
                                                            backgroundColor: '#162A22', 
                                                            fontSize: '11px',
                                                            '&:hover': { backgroundColor: '#0d1a15' }
                                                        }}
                                                    >
                                                        Ataque: +{arma.ataque}
                                                    </Button>
                                                )}
                                                {arma.critico && (
                                                    <Typography variant="caption" sx={{ color: '#BB8130' }}>
                                                        Crit: {arma.critico}
                                                    </Typography>
                                                )}
                                            </Box>
                                        </Paper>
                                    ))}
                                </Box>
                            ) : (
                                <Typography variant="body2" sx={{ color: '#756A34', fontStyle: 'italic' }}>
                                    Nenhuma arma equipada. Adicione armas em Equipamentos.
                                </Typography>
                            )}
                        </Grid>
                        
                        {/* Habilidades de Combate e Testes Rápidos */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#40150A', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                🎯 Testes Rápidos
                            </Typography>
                            
                            {/* Habilidades de Combate Principais */}
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="caption" sx={{ color: '#5B1F0F', fontWeight: 'bold' }}>
                                    Ataques:
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 0.5 }}>
                                    {habilidadesCombate.map((hab, idx) => (
                                        <Button
                                            key={idx}
                                            size="small"
                                            variant="contained"
                                            startIcon={<CasinoIcon />}
                                            onClick={() => rollAttackWithAdvantage(hab.valor, hab.nome)}
                                            sx={{ 
                                                backgroundColor: hab.cor, 
                                                fontSize: '11px',
                                                '&:hover': { filter: 'brightness(0.9)' }
                                            }}
                                        >
                                            {hab.nome.replace('Combate ', '')}: +{hab.valor}
                                        </Button>
                                    ))}
                                </Box>
                            </Box>
                            
                            {/* Outras Habilidades Úteis */}
                            <Box>
                                <Typography variant="caption" sx={{ color: '#5B1F0F', fontWeight: 'bold' }}>
                                    Outros Testes:
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
                                    {habilidadesUteis.map((hab, idx) => (
                                        <Button
                                            key={idx}
                                            size="small"
                                            variant="outlined"
                                            onClick={() => rollSkillCheck(hab.valor, hab.nome)}
                                            sx={{ 
                                                borderColor: '#756A34', 
                                                color: '#40150A',
                                                fontSize: '10px',
                                                py: 0.25,
                                                '&:hover': { backgroundColor: '#f5f3eb' }
                                            }}
                                        >
                                            {hab.nome}: +{hab.valor}
                                        </Button>
                                    ))}
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        );
    };

    // Componente de Descrição e Antecedente (mantido para compatibilidade)
    const DescriptionSection = () => (
        <Grid container spacing={2} sx={{ mb: 2 }}>
            {/* Antecedente */}
            <Grid item xs={12} md={6}>
                <Card sx={sectionStyle}>
                    <CardHeader
                        sx={cardHeaderStyle}
                        title={
                            <Typography className="esteban" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <HistoryEduIcon /> Antecedente: {character.antecedente?.nome || 'Não definido'}
                            </Typography>
                        }
                    />
                    <CardContent>
                        {editMode ? (
                            <>
                                <EditableField
                                    fullWidth
                                    label="Nome do Antecedente"
                                    value={character.antecedente?.nome || ''}
                                    onChange={(val) => updateField('antecedente.nome', val)}
                                    sx={{ mb: 2 }}
                                />
                                <EditableField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    label="Descrição do Antecedente"
                                    value={character.antecedente?.descricao || ''}
                                    onChange={(val) => updateField('antecedente.descricao', val)}
                                />
                            </>
                        ) : (
                            <Typography className="esteban descriptionBox" sx={{ 
                                wordBreak: 'break-word', 
                                maxHeight: '200px', 
                                overflowY: 'auto',
                                lineHeight: 1.6
                            }}>
                                {character.antecedente?.descricao || 'Sem descrição'}
                            </Typography>
                        )}
                        {character.antecedente?.habilidades && character.antecedente.habilidades.length > 0 && (
                            <Box sx={{ mt: 2 }}>
                                <Typography className="esteban" variant="subtitle2" sx={{ color: '#40150A', mb: 1 }}>
                                    Habilidades do Antecedente:
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {character.antecedente.habilidades.map((hab, idx) => (
                                        <Chip key={idx} label={hab} size="small" sx={{ 
                                            backgroundColor: hab.includes('-') ? '#931C4A' : '#454E30',
                                            color: 'white'
                                        }} />
                                    ))}
                                </Box>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </Grid>
            {/* Descrição do Personagem */}
            <Grid item xs={12} md={6}>
                <Card sx={sectionStyle}>
                    <CardHeader
                        sx={cardHeaderStyle}
                        title={
                            <Typography className="esteban" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PersonIcon /> Descrição do Personagem
                            </Typography>
                        }
                    />
                    <CardContent>
                        {editMode ? (
                            <EditableField
                                fullWidth
                                multiline
                                rows={6}
                                label="Descrição"
                                value={character.descricao || ''}
                                onChange={(val) => updateField('descricao', val)}
                            />
                        ) : (
                            <Typography className="esteban descriptionBox" sx={{ 
                                wordBreak: 'break-word', 
                                maxHeight: '200px', 
                                overflowY: 'auto',
                                lineHeight: 1.6
                            }}>
                                {character.descricao || 'Sem descrição'}
                            </Typography>
                        )}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );

    // Componente de Habilidades
    const HabilidadesSection = () => {
        const habilidades = character.habilidades || {};

        return (
            <Card sx={sectionStyle}>
                <CardHeader
                    sx={cardHeaderStyle}
                    title={
                        <Typography className="esteban" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <FitnessCenterIcon /> Habilidades
                        </Typography>
                    }
                />
                <CardContent>
                    <Typography className="esteban" variant="body2" sx={{ color: '#5B1F0F', mb: 2, textAlign: 'center' }}>
                        💡 Clique em uma habilidade para rolar um teste (d20 + modificador)
                    </Typography>
                    <Grid container spacing={2}>
                        {Object.entries(habilidades).map(([key, value]) => (
                            <Grid item xs={6} sm={4} md={3} lg={2} key={key}>
                                <Box 
                                    onClick={() => !editMode && rollSkillCheck(value, key)}
                                    sx={{ 
                                        display: 'flex', 
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        p: 1,
                                        borderRadius: 1,
                                        backgroundColor: value !== 0 ? '#edecd8' : '#f5f3eb',
                                        border: '1px solid #756A3466',
                                        cursor: editMode ? 'default' : 'pointer',
                                        transition: 'all 0.2s',
                                        '&:hover': editMode ? {} : { 
                                            transform: 'scale(1.05)', 
                                            boxShadow: 3,
                                            backgroundColor: value !== 0 ? '#e0dfc4' : '#edecd8'
                                        }
                                    }}
                                >
                                    <Typography className="esteban" variant="body2" sx={{ 
                                        textAlign: 'center', 
                                        fontSize: '11px',
                                        mb: 0.5,
                                        color: '#5B1F0F'
                                    }}>
                                        {key}
                                    </Typography>
                                    {editMode ? (
                                        <EditableField
                                            type="number"
                                            size="small"
                                            value={value}
                                            onChange={(val) => updateField(`habilidades.${key}`, parseInt(val) || 0)}
                                            sx={{ width: '60px' }}
                                            inputProps={{ style: { textAlign: 'center', padding: '4px' } }}
                                        />
                                    ) : (
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <CasinoIcon sx={{ fontSize: 14, color: '#5B1F0F' }} />
                                            <Chip
                                                label={value >= 0 ? `+${value}` : value}
                                                size="small"
                                                sx={{
                                                    backgroundColor: value > 0 ? '#454E30' : value < 0 ? '#931C4A' : '#756A34',
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    minWidth: '45px'
                                                }}
                                            />
                                        </Box>
                                    )}
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>
        );
    };

    // Componente de Proficiências
    const ProficienciasSection = () => {
        const proficiencias = character.proficiencias || {};

        // Função para gerar tooltip de níveis
        const getNivelTooltip = (key, currentValue) => {
            const profData = getProficiencia(key);
            if (!profData || !profData.niveis) {
                return `Nível atual: ${currentValue}`;
            }

            return (
                <Box sx={{ p: 1, maxWidth: 350 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, borderBottom: '1px solid rgba(255,255,255,0.3)', pb: 0.5 }}>
                        {profData.nome}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, opacity: 0.9 }}>
                        {profData.descricao}
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 0.5 }}>
                        Níveis:
                    </Typography>
                    {profData.niveis.map(({ nivel, descricao }) => (
                        <Box 
                            key={nivel} 
                            sx={{ 
                                mb: 0.5, 
                                pl: 1,
                                borderLeft: currentValue >= nivel ? '2px solid #BB8130' : '2px solid rgba(255,255,255,0.2)',
                                opacity: currentValue >= nivel ? 1 : 0.6
                            }}
                        >
                            <Typography variant="caption" sx={{ fontWeight: currentValue >= nivel ? 'bold' : 'normal' }}>
                                Nível {nivel}: {descricao}
                            </Typography>
                        </Box>
                    ))}
                    {currentValue === 0 && (
                        <Typography variant="caption" sx={{ color: '#ffb74d', display: 'block', mt: 1 }}>
                            ⚠️ Nenhum nível adquirido
                        </Typography>
                    )}
                </Box>
            );
        };

        return (
            <Card sx={{ ...sectionStyle, mt: 2 }}>
                <CardHeader
                    sx={cardHeaderStyle}
                    title={
                        <Typography className="esteban" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AutoAwesomeIcon /> Proficiências
                        </Typography>
                    }
                />
                <CardContent>
                    <Grid container spacing={1}>
                        {Object.entries(proficiencias).map(([key, value]) => (
                            <Grid item xs={12} sm={6} md={4} key={key}>
                                <Tooltip 
                                    title={getNivelTooltip(key, value)} 
                                    placement="top" 
                                    arrow
                                    enterDelay={300}
                                    componentsProps={{
                                        tooltip: {
                                            sx: {
                                                bgcolor: 'rgba(22, 42, 34, 0.95)',
                                                '& .MuiTooltip-arrow': {
                                                    color: 'rgba(22, 42, 34, 0.95)',
                                                },
                                                maxWidth: 400,
                                            },
                                        },
                                    }}
                                >
                                    <Box sx={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'center',
                                        p: 1,
                                        borderRadius: 1,
                                        backgroundColor: value !== 0 ? '#edecd8' : '#f5f3eb',
                                        cursor: 'help',
                                        '&:hover': {
                                            backgroundColor: value !== 0 ? '#e5e4d0' : '#edebe3'
                                        }
                                    }}>
                                        <Typography className="esteban" variant="body2" sx={{ flex: 1 }}>
                                            {key.replace(/_/g, ' ')}
                                        </Typography>
                                        {editMode ? (
                                            <EditableField
                                                type="number"
                                                size="small"
                                                value={value}
                                                onChange={(val) => updateField(`proficiencias.${key}`, parseInt(val) || 0)}
                                                sx={{ width: '70px' }}
                                                inputProps={{ style: { textAlign: 'center' } }}
                                            />
                                        ) : (
                                            <Chip
                                                label={value >= 0 ? `+${value}` : value}
                                                size="small"
                                                sx={{
                                                    backgroundColor: value > 0 ? '#454E30' : value < 0 ? '#931C4A' : '#756A34',
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    minWidth: '45px'
                                                }}
                                            />
                                        )}
                                    </Box>
                                </Tooltip>
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>
        );
    };

    // Componente de Equipamentos
    const EquipamentosSection = () => {
        const equipamentos = character.equipamentos || [];

        const categorias = {};
        equipamentos.forEach(item => {
            const cat = item.category || 'Outros';
            if (!categorias[cat]) categorias[cat] = [];
            categorias[cat].push(item);
        });

        const handleRemoveEquipamento = (index) => {
            const newEquipamentos = [...equipamentos];
            newEquipamentos.splice(index, 1);
            updateField('equipamentos', newEquipamentos);
        };

        const handleUpdateEquipamento = (index, field, value) => {
            const newEquipamentos = [...equipamentos];
            newEquipamentos[index] = { ...newEquipamentos[index], [field]: value };
            updateField('equipamentos', newEquipamentos);
        };

        // Funções auxiliares para verificar se item está equipado
        const isArmaEquipada = (item) => {
            return armasEquipadas.some(arma => arma && arma.name === item.name);
        };

        const isArmaduraEquipada = (item) => {
            return armaduraEquipada && armaduraEquipada.name === item.name;
        };

        const isEscudoEquipado = (item) => {
            return escudoEquipado && escudoEquipado.name === item.name;
        };

        // Verificar tipo de item
        const isArma = (item) => {
            return item.dano || 
                item.category?.toLowerCase().includes('arma') ||
                item.category?.toLowerCase().includes('weapon');
        };

        const isArmadura = (item) => {
            return (item.category?.toLowerCase().includes('armadura') || 
                item.defesa !== undefined || 
                item.bonusDefesa !== undefined ||
                item.tipo?.toLowerCase().includes('leve') ||
                item.tipo?.toLowerCase().includes('media') ||
                item.tipo?.toLowerCase().includes('pesada')) &&
                !item.category?.toLowerCase().includes('escudo');
        };

        const isEscudo = (item) => {
            return item.category?.toLowerCase().includes('escudo') ||
                item.category?.toLowerCase().includes('shield');
        };

        // Função para equipar/desequipar item
        const handleEquiparItem = (item) => {
            // DEBUG: Ver qual tipo está sendo detectado
            console.log('=== DEBUG EQUIPAR ===');
            console.log('Item:', item);
            console.log('isEscudo:', isEscudo(item));
            console.log('isArmadura:', isArmadura(item));
            console.log('isArma:', isArma(item));
            
            // IMPORTANTE: Verificar escudo primeiro, depois armadura, depois arma
            // Isso evita que armaduras sejam detectadas como armas
            if (isEscudo(item)) {
                console.log('-> Equipando como ESCUDO');
                if (isEscudoEquipado(item)) {
                    desequiparEscudo();
                } else {
                    equiparEscudo(item);
                }
            } else if (isArmadura(item)) {
                console.log('-> Equipando como ARMADURA');
                if (isArmaduraEquipada(item)) {
                    desequiparArmadura();
                } else {
                    equiparArmadura(item);
                }
            } else if (isArma(item)) {
                console.log('-> Equipando como ARMA');
                if (isArmaEquipada(item)) {
                    // Desequipar
                    const slot = armasEquipadas.findIndex(a => a && a.name === item.name);
                    if (slot !== -1) equiparArma(null, slot);
                } else {
                    // Equipar no primeiro slot vazio, ou slot 0 se ambos ocupados
                    const slotVazio = armasEquipadas.findIndex(a => !a);
                    equiparArma(item, slotVazio !== -1 ? slotVazio : 0);
                }
            } else {
                console.log('-> Item não é equipável');
            }
        };

        // Verificar se item é equipável e se está equipado
        // IMPORTANTE: Mesma ordem que handleEquiparItem (escudo > armadura > arma)
        const getEquipStatus = (item) => {
            if (isEscudo(item)) return { equipavel: true, equipado: isEscudoEquipado(item), tipo: 'escudo' };
            if (isArmadura(item)) return { equipavel: true, equipado: isArmaduraEquipada(item), tipo: 'armadura' };
            if (isArma(item)) return { equipavel: true, equipado: isArmaEquipada(item), tipo: 'arma' };
            return { equipavel: false, equipado: false, tipo: null };
        };

        return (
            <Card sx={{ ...sectionStyle, mt: 2 }}>
                <CardHeader
                    sx={cardHeaderStyle}
                    title={
                        <Typography className="esteban" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <InventoryIcon /> Equipamentos ({equipamentos.length})
                        </Typography>
                    }
                />
                <CardContent>
                    {Object.entries(categorias).map(([categoria, items]) => (
                        <Accordion key={categoria} defaultExpanded sx={{ mb: 1, backgroundColor: '#f5f3eb' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className="esteban" variant="subtitle1" sx={{ fontWeight: 'bold', color: '#40150A' }}>
                                    {categoria} ({items.length})
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    {items.map((item, idx) => {
                                        const globalIndex = equipamentos.findIndex(e => e.key === item.key);
                                        const equipStatus = getEquipStatus(item);
                                        return (
                                            <Grid item xs={12} md={6} lg={4} key={item.key || idx}>
                                                <Paper sx={{ 
                                                    p: 2, 
                                                    borderLeft: equipStatus.equipado ? '4px solid #2F3C29' : '4px solid #756A34',
                                                    backgroundColor: equipStatus.equipado ? '#e8f0e8' : 'inherit',
                                                    transition: 'all 0.2s ease'
                                                }}>
                                                    {editMode ? (
                                                        <>
                                                            <EditableField
                                                                fullWidth
                                                                size="small"
                                                                label="Nome"
                                                                value={item.name || ''}
                                                                onChange={(val) => handleUpdateEquipamento(globalIndex, 'name', val)}
                                                                sx={{ mb: 1 }}
                                                            />
                                                            <EditableField
                                                                fullWidth
                                                                size="small"
                                                                type="number"
                                                                label="Quantidade"
                                                                value={item.quantity || 1}
                                                                onChange={(val) => handleUpdateEquipamento(globalIndex, 'quantity', parseInt(val) || 1)}
                                                                sx={{ mb: 1 }}
                                                            />
                                                            <IconButton 
                                                                size="small" 
                                                                color="error"
                                                                onClick={() => handleRemoveEquipamento(globalIndex)}
                                                            >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Typography className="esteban" variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                                                {item.name} {item.quantity > 1 && `(x${item.quantity})`}
                                                            </Typography>
                                                            {item.description && (
                                                                <Typography className="esteban" variant="body2" sx={{ color: '#5B1F0F', mt: 0.5 }}>
                                                                    {item.description}
                                                                </Typography>
                                                            )}
                                                            <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                                                                {/* Botões de rolagem para armas */}
                                                                {item.dano && (
                                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                                        <Chip 
                                                                            size="small" 
                                                                            label={`🎲 Dano: ${item.dano}${isAcuidadeWeapon(item) && hasAcuidadeRegalia() ? ' (Acuidade)' : ''}`} 
                                                                            color="error"
                                                                            onClick={() => rollWeaponDamage(item.dano, item.name, false, item)}
                                                                            sx={{ cursor: 'pointer', '&:hover': { transform: 'scale(1.05)' } }}
                                                                            title={`Clique para rolar dano + ${isAcuidadeWeapon(item) && hasAcuidadeRegalia() ? 'Destreza' : 'Força'}`}
                                                                        />
                                                                        <Chip 
                                                                            size="small" 
                                                                            label="💀 CRIT"
                                                                            sx={{ 
                                                                                backgroundColor: '#7B3311', 
                                                                                color: 'white',
                                                                                cursor: 'pointer',
                                                                                '&:hover': { transform: 'scale(1.05)' }
                                                                            }}
                                                                            onClick={() => rollWeaponDamage(item.dano, item.name, true, item)}
                                                                            title="Rolar dano crítico (dobrado)"
                                                                        />
                                                                    </Box>
                                                                )}
                                                                {item.ataque && (
                                                                    <Chip 
                                                                        size="small" 
                                                                        label={`🎯 Ataque: d20+${item.ataque}`}
                                                                        sx={{ 
                                                                            backgroundColor: '#162A22', 
                                                                            color: 'white',
                                                                            cursor: 'pointer',
                                                                            '&:hover': { transform: 'scale(1.05)' }
                                                                        }}
                                                                        onClick={() => rollDice(20, 1, parseInt(item.ataque) || 0, `Ataque com ${item.name}`)}
                                                                        title="Rolar ataque"
                                                                    />
                                                                )}
                                                                {item.critico && <Chip size="small" label={`Crítico: ${item.critico}`} color="warning" />}
                                                                {(item.defesa || item.bonusDefesa) && (
                                                                    <Chip 
                                                                        size="small" 
                                                                        label={item.tipo?.toLowerCase() === 'pesada' 
                                                                            ? `🛡️ Defesa: ${item.defesa}` 
                                                                            : `🛡️ Defesa: +${item.bonusDefesa || item.defesa}`
                                                                        } 
                                                                        color="primary" 
                                                                    />
                                                                )}
                                                                {item.price && <Chip size="small" label={`${item.price} M.O`} variant="outlined" />}
                                                                
                                                                {/* Botão Equipar/Desequipar e Chip Equipado */}
                                                                {equipStatus.equipavel && (
                                                                    <>
                                                                        {equipStatus.equipado ? (
                                                                            <Chip 
                                                                                size="small" 
                                                                                label="✓ Equipado"
                                                                                onDelete={() => handleEquiparItem(item)}
                                                                                sx={{ 
                                                                                    backgroundColor: '#2F3C29', 
                                                                                    color: 'white',
                                                                                    fontWeight: 'bold',
                                                                                    '& .MuiChip-deleteIcon': { color: 'white' }
                                                                                }}
                                                                            />
                                                                        ) : (
                                                                            <Button
                                                                                size="small"
                                                                                variant="outlined"
                                                                                onClick={() => handleEquiparItem(item)}
                                                                                sx={{ 
                                                                                    borderColor: '#756A34', 
                                                                                    color: '#40150A',
                                                                                    fontSize: '11px',
                                                                                    py: 0.25,
                                                                                    minWidth: 'auto'
                                                                                }}
                                                                            >
                                                                                Equipar
                                                                            </Button>
                                                                        )}
                                                                    </>
                                                                )}
                                                            </Box>
                                                        </>
                                                    )}
                                                </Paper>
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                    {equipamentos.length === 0 && (
                        <Typography className="esteban" sx={{ textAlign: 'center', color: '#5B1F0F' }}>
                            Nenhum equipamento cadastrado.
                        </Typography>
                    )}
                </CardContent>
            </Card>
        );
    };

    // Componente de Regalias com Accordions
    const RegaliasSection = () => {
        // Estado para controlar quais accordions estão abertos
        const [expandedAccordions, setExpandedAccordions] = useState({});

        const handleAccordionChange = (panel) => (event, isExpanded) => {
            setExpandedAccordions(prev => ({
                ...prev,
                [panel]: isExpanded
            }));
        };

        // Função para buscar descrição completa da regalia
        const getDescricaoRegalia = (regalia) => {
            // Tentar buscar nos dados centralizados
            if (regalia.id) {
                const regaliaData = getRegaliaAprendiz(regalia.id);
                if (regaliaData) return regaliaData.descricao;
            }
            if (regalia.nome) {
                const regaliaData = getRegaliaAprendizPorNome(regalia.nome);
                if (regaliaData) return regaliaData.descricao;
            }
            return regalia.descricao || 'Descrição não disponível';
        };

        // Função para buscar descrição de regalia de espécie (variante)
        const getDescricaoRegaliaEspecie = (nomeRegalia) => {
            // Verificar em Psíquico, Vampiro, Mutante
            for (const tipo of ['Psíquico', 'Vampiro', 'Mutante']) {
                const opcao = getOpcaoRegalia(tipo, nomeRegalia);
                if (opcao) return opcao.descricao;
            }
            return null;
        };

        const renderRegaliasAprendiz = () => {
            const regalias = character.regalias_de_aprendiz?.RegaliasDeAprendizSelecionada || {};
            if (Object.keys(regalias).length === 0) return null;

            return (
                <Box sx={{ mb: 2 }}>
                    <Typography className="esteban" variant="subtitle1" sx={{ fontWeight: 'bold', color: '#40150A', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <StarIcon fontSize="small" sx={{ color: '#454E30' }} /> Regalias de Aprendiz
                    </Typography>
                    {Object.entries(regalias).map(([key, regalia]) => {
                        const panelId = `aprendiz-${key}`;
                        const descricao = getDescricaoRegalia(regalia);
                        
                        return (
                            <Accordion 
                                key={key}
                                expanded={expandedAccordions[panelId] || false}
                                onChange={handleAccordionChange(panelId)}
                                sx={{ 
                                    mb: 1, 
                                    backgroundColor: '#e8eae5',
                                    '&:before': { display: 'none' },
                                    borderLeft: '4px solid #454E30',
                                    borderRadius: '4px !important',
                                }}
                            >
                                <AccordionSummary 
                                    expandIcon={<ExpandMoreIcon sx={{ color: '#454E30' }} />}
                                    sx={{ 
                                        '&:hover': { backgroundColor: '#dfe1dc' },
                                        minHeight: '48px',
                                        '& .MuiAccordionSummary-content': { margin: '8px 0' }
                                    }}
                                >
                                    <Typography className="esteban" sx={{ fontWeight: 'bold', color: '#2F3C29' }}>
                                        {regalia.nome}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ backgroundColor: '#f5f6f3', borderTop: '1px solid #c5c8c1' }}>
                                    <Typography className="esteban" variant="body2" sx={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                                        {descricao}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        );
                    })}
                </Box>
            );
        };

        const renderRegaliasEspecie = () => {
            const regalias = character.regalias_de_especie || [];
            const validRegalias = regalias.filter(r => r && r.especie);
            if (validRegalias.length === 0) return null;

            return (
                <Box sx={{ mb: 2 }}>
                    <Typography className="esteban" variant="subtitle1" sx={{ fontWeight: 'bold', color: '#40150A', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <StarIcon fontSize="small" sx={{ color: '#AB6422' }} /> Regalias de Espécie
                    </Typography>
                    {validRegalias.map((regalia, idx) => {
                        const panelId = `especie-${idx}`;
                        
                        return (
                            <Accordion 
                                key={idx}
                                expanded={expandedAccordions[panelId] || false}
                                onChange={handleAccordionChange(panelId)}
                                sx={{ 
                                    mb: 1, 
                                    backgroundColor: '#f5ede4',
                                    '&:before': { display: 'none' },
                                    borderLeft: '4px solid #AB6422',
                                    borderRadius: '4px !important',
                                }}
                            >
                                <AccordionSummary 
                                    expandIcon={<ExpandMoreIcon sx={{ color: '#AB6422' }} />}
                                    sx={{ 
                                        '&:hover': { backgroundColor: '#efe5d8' },
                                        minHeight: '48px',
                                        '& .MuiAccordionSummary-content': { margin: '8px 0' }
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                                        <Typography className="esteban" sx={{ fontWeight: 'bold', color: '#8B4513' }}>
                                            {regalia.especie}
                                        </Typography>
                                        <Chip 
                                            label={`${regalia.regalias?.length || 0} regalia(s)`} 
                                            size="small" 
                                            sx={{ backgroundColor: '#AB6422', color: 'white', fontSize: '0.7rem' }} 
                                        />
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails sx={{ backgroundColor: '#faf6f0', borderTop: '1px solid #ddd3c4' }}>
                                    {regalia.regalias?.map((r, i) => {
                                        const descricaoEspecie = getDescricaoRegaliaEspecie(r);
                                        return (
                                            <Box key={i} sx={{ mb: 1.5, pb: 1.5, borderBottom: i < regalia.regalias.length - 1 ? '1px dashed #ddd3c4' : 'none' }}>
                                                <Typography className="esteban" variant="subtitle2" sx={{ fontWeight: 'bold', color: '#8B4513' }}>
                                                    • {r}
                                                </Typography>
                                                {descricaoEspecie && (
                                                    <Typography className="esteban" variant="body2" sx={{ mt: 0.5, pl: 2, whiteSpace: 'pre-line', color: '#5c4033' }}>
                                                        {descricaoEspecie}
                                                    </Typography>
                                                )}
                                            </Box>
                                        );
                                    })}
                                </AccordionDetails>
                            </Accordion>
                        );
                    })}
                </Box>
            );
        };

        const renderRegaliasProfissao = () => {
            const regalias = character.regalias_de_profissao || [];
            const validRegalias = regalias.filter(r => r && r.nome);
            if (validRegalias.length === 0) return null;

            return (
                <Box sx={{ mb: 2 }}>
                    <Typography className="esteban" variant="subtitle1" sx={{ fontWeight: 'bold', color: '#40150A', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <StarIcon fontSize="small" sx={{ color: '#2F3C29' }} /> Regalias de Profissão
                    </Typography>
                    {validRegalias.map((regalia, idx) => {
                        const panelId = `profissao-${idx}`;
                        
                        return (
                            <Accordion 
                                key={idx}
                                expanded={expandedAccordions[panelId] || false}
                                onChange={handleAccordionChange(panelId)}
                                sx={{ 
                                    mb: 1, 
                                    backgroundColor: '#e5e8e4',
                                    '&:before': { display: 'none' },
                                    borderLeft: '4px solid #2F3C29',
                                    borderRadius: '4px !important',
                                }}
                            >
                                <AccordionSummary 
                                    expandIcon={<ExpandMoreIcon sx={{ color: '#2F3C29' }} />}
                                    sx={{ 
                                        '&:hover': { backgroundColor: '#dde0da' },
                                        minHeight: '48px',
                                        '& .MuiAccordionSummary-content': { margin: '8px 0' }
                                    }}
                                >
                                    <Typography className="esteban" sx={{ fontWeight: 'bold', color: '#2F3C29' }}>
                                        {regalia.nome}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ backgroundColor: '#f2f4f1', borderTop: '1px solid #c8cbc5' }}>
                                    <Typography className="esteban" variant="body2" sx={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                                        <strong>Habilidade:</strong> {regalia.habilidades}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        );
                    })}
                </Box>
            );
        };

        const renderRegaliasClasse = () => {
            const regaliasClasse = character.regalias_de_classe;
            if (!regaliasClasse || Object.keys(regaliasClasse).length === 0) return null;

            return (
                <Box sx={{ mb: 2 }}>
                    <Typography className="esteban" variant="subtitle1" sx={{ fontWeight: 'bold', color: '#40150A', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <StarIcon fontSize="small" sx={{ color: '#931C4A' }} /> Regalias de Classe
                    </Typography>
                    {Object.entries(regaliasClasse).map(([className, classData], idx) => {
                        const panelId = `classe-${idx}`;
                        const regaliasArray = Array.isArray(classData) ? classData : 
                                              (typeof classData === 'object' ? Object.values(classData) : [classData]);
                        
                        return (
                            <Accordion 
                                key={idx}
                                expanded={expandedAccordions[panelId] || false}
                                onChange={handleAccordionChange(panelId)}
                                sx={{ 
                                    mb: 1, 
                                    backgroundColor: '#f8e8ed',
                                    '&:before': { display: 'none' },
                                    borderLeft: '4px solid #931C4A',
                                    borderRadius: '4px !important',
                                }}
                            >
                                <AccordionSummary 
                                    expandIcon={<ExpandMoreIcon sx={{ color: '#931C4A' }} />}
                                    sx={{ 
                                        '&:hover': { backgroundColor: '#f2dce4' },
                                        minHeight: '48px',
                                        '& .MuiAccordionSummary-content': { margin: '8px 0' }
                                    }}
                                >
                                    <Typography className="esteban" sx={{ fontWeight: 'bold', color: '#931C4A' }}>
                                        {className.replace(/_/g, ' ')}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ backgroundColor: '#fdf5f8', borderTop: '1px solid #e8c8d4' }}>
                                    {regaliasArray.map((regalia, i) => {
                                        const regaliaObj = typeof regalia === 'object' ? regalia : { nome: regalia };
                                        return (
                                            <Box key={i} sx={{ mb: 1.5, pb: 1.5, borderBottom: i < regaliasArray.length - 1 ? '1px dashed #e8c8d4' : 'none' }}>
                                                <Typography className="esteban" variant="subtitle2" sx={{ fontWeight: 'bold', color: '#7a1640' }}>
                                                    • {regaliaObj.nome || String(regalia)}
                                                </Typography>
                                                {regaliaObj.descricao && (
                                                    <Typography className="esteban" variant="body2" sx={{ mt: 0.5, pl: 2, whiteSpace: 'pre-line', color: '#5c3344' }}>
                                                        {regaliaObj.descricao}
                                                    </Typography>
                                                )}
                                            </Box>
                                        );
                                    })}
                                </AccordionDetails>
                            </Accordion>
                        );
                    })}
                </Box>
            );
        };

        return (
            <Card sx={{ ...sectionStyle, mt: 2 }}>
                <CardHeader
                    sx={cardHeaderStyle}
                    title={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <Typography className="esteban" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <StarIcon /> Regalias
                            </Typography>
                            <Chip 
                                label={`Pontos: ${character.pontos_de_regalia || 0}`} 
                                sx={{ backgroundColor: '#BB8130', color: 'white' }}
                            />
                        </Box>
                    }
                />
                <CardContent>
                    {editMode && (
                        <EditableField
                            type="number"
                            label="Pontos de Regalia"
                            value={character.pontos_de_regalia || 0}
                            onChange={(val) => updateField('pontos_de_regalia', parseInt(val) || 0)}
                            sx={{ mb: 2 }}
                        />
                    )}
                    {renderRegaliasAprendiz()}
                    {renderRegaliasEspecie()}
                    {renderRegaliasProfissao()}
                    {renderRegaliasClasse()}
                </CardContent>
            </Card>
        );
    };

    // CondicoesSection foi extraído para o componente ConditionsPanel
    // Importado como <ConditionsPanel /> acima

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f3eb' }}>
            {/* Componente de resultado de dado flutuante */}
            <DiceResultDisplay />
            
            {/* Modal de Descanso */}
            <DescansoPanel />
            
            {/* Modal de Regras de Combate */}
            <CombatRulesModal />

            {/* Conteúdo Principal */}
            <Box sx={{ flex: 1, p: 3, minWidth: 0 }}>
                {/* Header com info do personagem (inclui Antecedente e Descrição em accordions) */}
                <CharacterHeader />

                {/* Atributos Vitais e Combate */}
                <VitalStatsSection />
                
                {/* Acesso Rápido de Combate - Armas e Habilidades */}
                <QuickCombatPanel />
                
                {/* Configurações de Combate (Vantagem/Desvantagem, Luz) */}
                <CombatSettingsPanel />
                
                {/* Capacidade de Carga */}
                <CapacidadeCargaPanel />
                
                {/* Botões de Descanso e Regras */}
                <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                    <Button
                        variant="contained"
                        startIcon={<HotelIcon />}
                        onClick={aplicarDescansoCurto}
                        sx={{ backgroundColor: '#454E30', '&:hover': { backgroundColor: '#2F3C29' } }}
                    >
                        Descanso Curto
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<HotelIcon />}
                        onClick={aplicarDescansoLongo}
                        sx={{ backgroundColor: '#162A22', '&:hover': { backgroundColor: '#0d1a15' } }}
                    >
                        Descanso Longo
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => setCombatRulesModalOpen(true)}
                        sx={{ borderColor: '#756A34', color: '#756A34' }}
                    >
                        📜 Regras de Combate
                    </Button>
                </Box>

                {/* Tabs para organização */}
                <Paper sx={{ ...sectionStyle, mb: 2 }}>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        variant="fullWidth"
                        sx={{
                            '& .MuiTab-root': {
                                fontFamily: '"Esteban", serif',
                                fontWeight: 'bold',
                                color: '#40150A',
                            },
                            '& .Mui-selected': {
                                color: '#BB8130 !important',
                            },
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#756A34',
                            },
                            '& .MuiSvgIcon-root': {
                                color: 'inherit',
                            }
                        }}
                    >
                        <Tab className="esteban" icon={<FitnessCenterIcon />} label="Habilidades" />
                        <Tab className="esteban" icon={<AutoAwesomeIcon />} label="Proficiências" />
                        <Tab className="esteban" icon={<InventoryIcon />} label="Equipamentos" />
                        <Tab className="esteban" icon={<StarIcon />} label="Regalias" />
                    </Tabs>
                </Paper>

                {/* Conteúdo das Tabs */}
                {activeTab === 0 && <HabilidadesSection />}
                {activeTab === 1 && <ProficienciasSection />}
                {activeTab === 2 && <EquipamentosSection />}
                {activeTab === 3 && <RegaliasSection />}

                {/* Condições */}
                <ConditionsPanel
                    character={character}
                    nivelLuz={nivelLuz}
                    sectionStyle={sectionStyle}
                    cardHeaderStyle={cardHeaderStyle}
                    saveConditions={saveConditions}
                />

                {/* Footer com datas */}
                <Box sx={{ 
                    background: 'linear-gradient(135deg, #162A22 0%, #40150A 100%)', 
                    borderRadius: '12px', 
                    p: 2, 
                    mt: 3,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}>
                    <Typography className="esteban" sx={{ color: 'white', fontSize: '12px' }}>
                        <strong>Criado em:</strong> {character.criado_em ? new Date(character.criado_em).toLocaleString('pt-BR') : 'N/A'}
                    </Typography>
                    <Typography className="esteban" sx={{ color: 'white', fontSize: '12px' }}>
                        <strong>Atualizado em:</strong> {character.atualizado_em ? new Date(character.atualizado_em).toLocaleString('pt-BR') : 'N/A'}
                    </Typography>
                </Box>
            </Box>

            {/* Sidebar Direita - Histórico de Rolagens */}
            <Box sx={{ 
                width: '320px', 
                flexShrink: 0, 
                p: 2, 
                pl: 0,
                display: { xs: 'none', lg: 'block' }
            }}>
                <DiceHistorySidebar />
            </Box>

            {/* Snackbar para feedback */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default CharacterSheet;
