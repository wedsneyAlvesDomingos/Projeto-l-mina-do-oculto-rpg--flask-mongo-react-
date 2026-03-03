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
import "./char.css";

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
                setDiceHistory(prev => [result, ...prev.slice(0, 9)]);
                setDiceRolling(false);
            }
        }, 80);
    }, []);

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

    // Rolar teste de habilidade
    const rollSkillCheck = useCallback((skillBonus, skillName) => {
        rollDice(20, 1, skillBonus, `Teste de ${skillName}`);
    }, [rollDice]);

    // Função para salvar condições no backend
    const saveConditions = useCallback(async (newCondicoes) => {
        if (!character?.id) return;
        try {
            const response = await fetch(`${baseUrl}/personagens/${character.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...character, condicoes: newCondicoes }),
            });

            if (!response.ok) throw new Error('Erro ao salvar condições');
            
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
            setSnackbar({ open: true, message: 'Erro ao salvar condições', severity: 'error' });
        }
    }, [baseUrl, character]);

    const especiesMap = {
        'meioDemonio': 'Meio Demônio',
        'humano': 'Humano',
        'elfo': 'Elfo',
        'anao': 'Anão',
        'feerico': 'Feérico',
        'draconiano': 'Draconiano',
        'meioElfo': 'Meio Elfo',
        'meioGenio': 'Meio Gênio',
        'meioCelestial': 'Meio Celestial',
        'meioTroll': 'Meio Troll',
        'bestial': 'Bestial',
        'troll': 'Troll',
        'constructo': 'Constructo',
        'halfling': 'Halfling',
    };

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

            if (!response.ok) throw new Error('Erro ao salvar personagem');

            const data = await response.json();
            setOriginalCharacter(JSON.parse(JSON.stringify(character)));
            setEditMode(false);
            setSnackbar({ open: true, message: 'Personagem salvo com sucesso!', severity: 'success' });
        } catch (error) {
            console.error(error);
            setSnackbar({ open: true, message: 'Erro ao salvar personagem', severity: 'error' });
        }
    }, [character, originalCharacter, baseUrl]);

    const handleCancel = useCallback(() => {
        setCharacter(JSON.parse(JSON.stringify(originalCharacter)));
        setEditMode(false);
    }, [originalCharacter]);

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

    // Componente de exibição do resultado da rolagem de dados
    const DiceResultDisplay = () => {
        if (!diceResult) return null;

        const getBgColor = () => {
            if (diceResult.isCriticalHit) return 'linear-gradient(135deg, #ffd700 0%, #ff8c00 100%)';
            if (diceResult.isCriticalFail) return 'linear-gradient(135deg, #8b0000 0%, #ff0000 100%)';
            return 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)';
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
                    border: diceResult.isCriticalHit ? '3px solid gold' : diceResult.isCriticalFail ? '3px solid darkred' : 'none'
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
                    <Chip label="🎯 CRÍTICO!" sx={{ backgroundColor: '#ffd700', color: '#000', fontWeight: 'bold', mb: 1 }} />
                )}
                {diceResult.isCriticalFail && (
                    <Chip label="💀 FALHA CRÍTICA!" sx={{ backgroundColor: '#ff0000', color: '#fff', fontWeight: 'bold', mb: 1 }} />
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
    const DiceHistoryPanel = () => (
        <Accordion sx={{ mb: 2, backgroundColor: '#f5f5f5' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className="esteban" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 'bold', color: '#40150A' }}>
                    <CasinoIcon /> Histórico de Rolagens ({diceHistory.length})
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {diceHistory.length === 0 ? (
                    <Typography variant="body2" sx={{ color: '#666' }}>Nenhuma rolagem realizada ainda.</Typography>
                ) : (
                    <Box sx={{ maxHeight: 200, overflowY: 'auto' }}>
                        {diceHistory.map((roll, idx) => (
                            <Box key={idx} sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center',
                                p: 1,
                                borderBottom: '1px solid #e0e0e0',
                                backgroundColor: roll.isCriticalHit ? '#fff8e1' : roll.isCriticalFail ? '#ffebee' : 'transparent'
                            }}>
                                <Box>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                        {roll.label || 'Rolagem'}
                                        {roll.isCriticalHit && ' 🎯'}
                                        {roll.isCriticalFail && ' 💀'}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#666' }}>
                                        {roll.quantity}d{roll.sides}{roll.bonus !== 0 && (roll.bonus > 0 ? `+${roll.bonus}` : roll.bonus)}
                                    </Typography>
                                </Box>
                                <Box sx={{ textAlign: 'right' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: roll.isCriticalHit ? '#ff8f00' : roll.isCriticalFail ? '#d32f2f' : '#1976d2' }}>
                                        {roll.total}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#999' }}>{roll.timestamp}</Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                )}
            </AccordionDetails>
        </Accordion>
    );

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
                            <IconButton onClick={handleSave} sx={{ color: '#4caf50' }}>
                                <SaveIcon />
                            </IconButton>
                            <IconButton onClick={handleCancel} sx={{ color: '#f44336' }}>
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
                                    src={character.image || '/default-avatar.png'}
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
                            {/* Dinheiro */}
                            <Grid item xs={6} md={4}>
                                {editMode ? (
                                    <EditableField
                                        fullWidth
                                        type="number"
                                        label="Dinheiro (M.O)"
                                        value={character.dinheiro || 0}
                                        onChange={(val) => updateField('dinheiro', val)}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">M.O</InputAdornment>,
                                        }}
                                    />
                                ) : (
                                    <Box sx={{ background: '#BB8130', borderRadius: 2, p: 1, textAlign: 'center' }}>
                                        <Typography className="esteban" sx={{ color: 'white', fontSize: '12px' }}>Dinheiro</Typography>
                                        <Typography className="esteban" sx={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>
                                            {parseFloat(character.dinheiro || 0).toFixed(2)} M.O
                                        </Typography>
                                    </Box>
                                )}
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
                                        <Typography className="esteban" sx={{ color: '#666', fontSize: '12px' }}>Classe</Typography>
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
                                        <Typography className="esteban" sx={{ color: '#666', fontSize: '12px' }}>Espécie</Typography>
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
                                        <Typography className="esteban" sx={{ color: '#666', fontSize: '12px' }}>Gênero</Typography>
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
                                        <Typography className="esteban" sx={{ color: '#666', fontSize: '12px' }}>Idade</Typography>
                                        <Typography className="esteban" sx={{ fontWeight: 'bold' }}>
                                            {character.idade} anos
                                        </Typography>
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );

    // Componente de Atributos Vitais e Combate
    const VitalStatsSection = () => {
        // Cálculos baseados nas regras do RPG
        const habilidades = character.habilidades || {};
        const fortitude = habilidades['Fortitude'] || 0;
        const agilidade = habilidades['Agilidade'] || 0;
        const arcanismo = habilidades['Arcanismo'] || 0;
        const atletismo = habilidades['Atletismo'] || 0;
        const corpoACorpo = habilidades['Combate Corpo a Corpo'] || 0;
        const distancia = habilidades['Combate a Distância'] || 0;
        const arcano = habilidades['Combate Arcano'] || 0;

        // Buscar valores base da espécie (valores padrão se não definidos)
        const especieBaseVida = character.pv_base_especie || 10;
        const especieBaseVelocidade = character.velocidade_base_especie || 9;
        
        // Buscar bônus de regalia de classe
        const regaliaClasseVida = character.pv_regalia_classe || 0;
        const regaliaClasseMagia = character.pm_regalia_classe || 0;
        const regaliaClasseEstamina = character.pe_regalia_classe || 0;

        // Cálculo de PV: Base Espécie + Regalia de Classe + (2 * Fortitude)
        const pvCalculado = especieBaseVida + regaliaClasseVida + (2 * fortitude);
        const pvAtual = character.pv_atual !== undefined ? character.pv_atual : pvCalculado;

        // Cálculo de PM: Regalia de Classe + Arcanismo
        const pmCalculado = regaliaClasseMagia + arcanismo;
        const pmAtual = character.pm_atual !== undefined ? character.pm_atual : pmCalculado;

        // Cálculo de PE: Regalia de Classe + Atletismo
        const peCalculado = regaliaClasseEstamina + atletismo;
        const peAtual = character.pe_atual !== undefined ? character.pe_atual : peCalculado;

        // Cálculo de Velocidade: Base Espécie + Bônus de Agilidade (+1,5m a cada 3 pts, máx +6m)
        const bonusVelocidade = Math.min(Math.floor(agilidade / 3) * 1.5, 6);
        const velocidadeCalculada = especieBaseVelocidade + bonusVelocidade;
        const velocidade = character.velocidade || velocidadeCalculada;

        // Buscar armadura e escudo dos equipamentos
        const equipamentos = character.equipamentos || [];
        const armadura = equipamentos.find(e => e.category?.includes('Armadura'));
        const escudo = equipamentos.find(e => e.category?.includes('Escudo'));
        const defesaArmadura = armadura?.defesa || 0;
        const defesaEscudo = escudo?.defesa || 0;
        const armaduraPesada = armadura?.category?.includes('Pesada');

        // Cálculo de Defesa
        // Leve/Média: 7 + Bônus de Agilidade + Armadura + Escudo
        // Pesada: Armadura + Escudo (Sem base 7, não usa agilidade)
        const defesaCalculada = armaduraPesada 
            ? defesaArmadura + defesaEscudo
            : 7 + agilidade + defesaArmadura + defesaEscudo;
        const defesa = character.defesa || defesaCalculada;

        // Iniciativa (baseada em agilidade + bônus)
        const iniciativa = character.iniciativa || agilidade;

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
                                icon={<FavoriteIcon sx={{ color: '#e53935', fontSize: 28 }} />}
                                label="VIDA (PV)"
                                atual={pvAtual}
                                max={pvCalculado}
                                color="#e53935"
                                bgColor="#ffebee"
                                fieldAtual="pv_atual"
                                fieldMax="pv_base_especie"
                            />
                        </Grid>
                        <Grid item xs={6} sm={4} md={2}>
                            <StatBox
                                icon={<BoltIcon sx={{ color: '#ff9800', fontSize: 28 }} />}
                                label="ESTAMINA (PE)"
                                atual={peAtual}
                                max={peCalculado}
                                color="#ff9800"
                                bgColor="#fff3e0"
                                fieldAtual="pe_atual"
                                fieldMax="pe_regalia_classe"
                            />
                        </Grid>
                        <Grid item xs={6} sm={4} md={2}>
                            <StatBox
                                icon={<AutoFixHighIcon sx={{ color: '#7c4dff', fontSize: 28 }} />}
                                label="MAGIA (PM)"
                                atual={pmAtual}
                                max={pmCalculado}
                                color="#7c4dff"
                                bgColor="#ede7f6"
                                fieldAtual="pm_atual"
                                fieldMax="pm_regalia_classe"
                            />
                        </Grid>
                        <Grid item xs={6} sm={4} md={2}>
                            <SingleStatBox
                                icon={<ShieldIcon sx={{ color: '#1976d2', fontSize: 28 }} />}
                                label="DEFESA"
                                value={defesa}
                                color="#1976d2"
                                bgColor="#e3f2fd"
                                field="defesa"
                            />
                        </Grid>
                        <Grid item xs={6} sm={4} md={2}>
                            <SingleStatBox
                                icon={<SpeedIcon sx={{ color: '#00897b', fontSize: 28 }} />}
                                label="VELOCIDADE"
                                value={`${velocidade}m`}
                                color="#00897b"
                                bgColor="#e0f2f1"
                                field="velocidade"
                                parseFunc={parseFloat}
                            />
                        </Grid>
                        <Grid item xs={6} sm={4} md={2}>
                            <SingleStatBox
                                icon={<CasinoIcon sx={{ color: '#5d4037', fontSize: 28 }} />}
                                label="INICIATIVA"
                                value={`+${iniciativa}`}
                                color="#5d4037"
                                bgColor="#efebe9"
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
                                onClick={() => rollAttack(corpoACorpo, 'Corpo a Corpo')}
                                sx={{ 
                                    p: 2, 
                                    textAlign: 'center', 
                                    backgroundColor: '#fff8e1', 
                                    borderLeft: '4px solid #ff8f00',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    '&:hover': { transform: 'scale(1.02)', boxShadow: 4 }
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                    <CasinoIcon sx={{ color: '#ff8f00', fontSize: 20 }} />
                                    <Typography className="esteban" sx={{ fontSize: '12px', color: '#666' }}>Corpo a Corpo</Typography>
                                </Box>
                                <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: '20px', color: '#ff8f00' }}>
                                    d20 +{corpoACorpo}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper 
                                onClick={() => rollAttack(distancia, 'À Distância')}
                                sx={{ 
                                    p: 2, 
                                    textAlign: 'center', 
                                    backgroundColor: '#e8f5e9', 
                                    borderLeft: '4px solid #43a047',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    '&:hover': { transform: 'scale(1.02)', boxShadow: 4 }
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                    <CasinoIcon sx={{ color: '#43a047', fontSize: 20 }} />
                                    <Typography className="esteban" sx={{ fontSize: '12px', color: '#666' }}>À Distância</Typography>
                                </Box>
                                <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: '20px', color: '#43a047' }}>
                                    d20 +{distancia}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper 
                                onClick={() => rollAttack(arcano, 'Arcano')}
                                sx={{ 
                                    p: 2, 
                                    textAlign: 'center', 
                                    backgroundColor: '#ede7f6', 
                                    borderLeft: '4px solid #7c4dff',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    '&:hover': { transform: 'scale(1.02)', boxShadow: 4 }
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                    <CasinoIcon sx={{ color: '#7c4dff', fontSize: 20 }} />
                                    <Typography className="esteban" sx={{ fontSize: '12px', color: '#666' }}>Arcano</Typography>
                                </Box>
                                <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: '20px', color: '#7c4dff' }}>
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
                            backgroundColor: '#efebe9', 
                            borderLeft: '4px solid #5d4037',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            mb: 2,
                            '&:hover': { transform: 'scale(1.01)', boxShadow: 4 }
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                            <CasinoIcon sx={{ color: '#5d4037', fontSize: 20 }} />
                            <Typography className="esteban" sx={{ fontWeight: 'bold', color: '#5d4037' }}>
                                Rolar Iniciativa: d20 +{iniciativa}
                            </Typography>
                        </Box>
                    </Paper>

                    {/* Regras de Combate Resumidas */}
                    <Accordion sx={{ backgroundColor: '#fafafa', mt: 2 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className="esteban" sx={{ fontWeight: 'bold', color: '#40150A' }}>
                                📜 Regras de Combate (Referência Rápida)
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography className="esteban" variant="subtitle2" sx={{ fontWeight: 'bold', color: '#e53935' }}>
                                            🎯 Acerto Crítico (Nat 20)
                                        </Typography>
                                        <Typography className="esteban" variant="body2">
                                            Dano total é dobrado.
                                        </Typography>
                                    </Box>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography className="esteban" variant="subtitle2" sx={{ fontWeight: 'bold', color: '#f44336' }}>
                                            ❌ Falha Crítica (Nat 1)
                                        </Typography>
                                        <Typography className="esteban" variant="body2">
                                            Acumula desgaste na arma (penalidades após 5, 10 e 20 falhas).
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography className="esteban" variant="subtitle2" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
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
                                    <Typography className="esteban" variant="subtitle2" sx={{ fontWeight: 'bold', color: '#5d4037', mb: 1 }}>
                                        📊 Fórmulas de Cálculo
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        <Chip label="PV = Base Espécie + Regalia + (2×Fortitude)" size="small" sx={{ backgroundColor: '#ffcdd2' }} />
                                        <Chip label="PM = Regalia + Arcanismo" size="small" sx={{ backgroundColor: '#e1bee7' }} />
                                        <Chip label="PE = Regalia + Atletismo" size="small" sx={{ backgroundColor: '#ffe0b2' }} />
                                        <Chip label="Defesa (Leve/Média) = 7 + Agi + Armadura + Escudo" size="small" sx={{ backgroundColor: '#bbdefb' }} />
                                        <Chip label="Defesa (Pesada) = Armadura + Escudo (Sem base 7)" size="small" sx={{ backgroundColor: '#90caf9' }} />
                                        <Chip label="Velocidade = Base + (1,5m a cada 3 Agi, máx +6m)" size="small" sx={{ backgroundColor: '#b2dfdb' }} />
                                    </Box>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Paper>
        );
    };

    // Componente de Descrição e Antecedente
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
                                            backgroundColor: hab.includes('-') ? '#f44336' : '#4caf50',
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
                    <Typography className="esteban" variant="body2" sx={{ color: '#666', mb: 2, textAlign: 'center' }}>
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
                                        backgroundColor: value !== 0 ? '#f0f7f0' : '#fafafa',
                                        border: '1px solid #e0e0e0',
                                        cursor: editMode ? 'default' : 'pointer',
                                        transition: 'all 0.2s',
                                        '&:hover': editMode ? {} : { 
                                            transform: 'scale(1.05)', 
                                            boxShadow: 3,
                                            backgroundColor: value !== 0 ? '#e3f2e3' : '#f0f0f0'
                                        }
                                    }}
                                >
                                    <Typography className="esteban" variant="body2" sx={{ 
                                        textAlign: 'center', 
                                        fontSize: '11px',
                                        mb: 0.5,
                                        color: '#666'
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
                                            <CasinoIcon sx={{ fontSize: 14, color: '#666' }} />
                                            <Chip
                                                label={value >= 0 ? `+${value}` : value}
                                                size="small"
                                                sx={{
                                                    backgroundColor: value > 0 ? '#4caf50' : value < 0 ? '#f44336' : '#9e9e9e',
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
                                <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    p: 1,
                                    borderRadius: 1,
                                    backgroundColor: value !== 0 ? '#f0f7f0' : '#fafafa'
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
                                                backgroundColor: value > 0 ? '#4caf50' : value < 0 ? '#f44336' : '#9e9e9e',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                minWidth: '45px'
                                            }}
                                        />
                                    )}
                                </Box>
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
                        <Accordion key={categoria} defaultExpanded sx={{ mb: 1, backgroundColor: '#fafafa' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className="esteban" variant="subtitle1" sx={{ fontWeight: 'bold', color: '#40150A' }}>
                                    {categoria} ({items.length})
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    {items.map((item, idx) => {
                                        const globalIndex = equipamentos.findIndex(e => e.key === item.key);
                                        return (
                                            <Grid item xs={12} md={6} lg={4} key={item.key || idx}>
                                                <Paper sx={{ p: 2, borderLeft: '4px solid #756A34' }}>
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
                                                                <Typography className="esteban" variant="body2" sx={{ color: '#666', mt: 0.5 }}>
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
                                                                                backgroundColor: '#ff6f00', 
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
                                                                            backgroundColor: '#1565c0', 
                                                                            color: 'white',
                                                                            cursor: 'pointer',
                                                                            '&:hover': { transform: 'scale(1.05)' }
                                                                        }}
                                                                        onClick={() => rollDice(20, 1, parseInt(item.ataque) || 0, `Ataque com ${item.name}`)}
                                                                        title="Rolar ataque"
                                                                    />
                                                                )}
                                                                {item.critico && <Chip size="small" label={`Crítico: ${item.critico}`} color="warning" />}
                                                                {item.defesa && <Chip size="small" label={`🛡️ Defesa: +${item.defesa}`} color="primary" />}
                                                                {item.price && <Chip size="small" label={`${item.price} M.O`} variant="outlined" />}
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
                        <Typography className="esteban" sx={{ textAlign: 'center', color: '#666' }}>
                            Nenhum equipamento cadastrado.
                        </Typography>
                    )}
                </CardContent>
            </Card>
        );
    };

    // Componente de Regalias
    const RegaliasSection = () => {
        const renderRegaliasAprendiz = () => {
            const regalias = character.regalias_de_aprendiz?.RegaliasDeAprendizSelecionada || {};
            if (Object.keys(regalias).length === 0) return null;

            return (
                <Box sx={{ mb: 2 }}>
                    <Typography className="esteban" variant="subtitle1" sx={{ fontWeight: 'bold', color: '#40150A', mb: 1 }}>
                        Regalias de Aprendiz
                    </Typography>
                    <Grid container spacing={2}>
                        {Object.entries(regalias).map(([key, regalia]) => (
                            <Grid item xs={12} md={6} key={key}>
                                <Paper sx={{ p: 2, backgroundColor: '#f0f7f0', borderLeft: '4px solid #4caf50' }}>
                                    <Typography className="esteban" variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                        {regalia.nome}
                                    </Typography>
                                    <Typography className="esteban" variant="body2" sx={{ mt: 1, whiteSpace: 'pre-line' }}>
                                        {regalia.descricao}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            );
        };

        const renderRegaliasEspecie = () => {
            const regalias = character.regalias_de_especie || [];
            const validRegalias = regalias.filter(r => r && r.especie);
            if (validRegalias.length === 0) return null;

            return (
                <Box sx={{ mb: 2 }}>
                    <Typography className="esteban" variant="subtitle1" sx={{ fontWeight: 'bold', color: '#40150A', mb: 1 }}>
                        Regalias de Espécie
                    </Typography>
                    {validRegalias.map((regalia, idx) => (
                        <Paper key={idx} sx={{ p: 2, mb: 1, backgroundColor: '#fff3e0', borderLeft: '4px solid #ff9800' }}>
                            <Typography className="esteban" variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                {regalia.especie}
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                                {regalia.regalias?.map((r, i) => (
                                    <Chip key={i} label={r} size="small" sx={{ backgroundColor: '#ff9800', color: 'white' }} />
                                ))}
                            </Box>
                        </Paper>
                    ))}
                </Box>
            );
        };

        const renderRegaliasProfissao = () => {
            const regalias = character.regalias_de_profissao || [];
            const validRegalias = regalias.filter(r => r && r.nome);
            if (validRegalias.length === 0) return null;

            return (
                <Box sx={{ mb: 2 }}>
                    <Typography className="esteban" variant="subtitle1" sx={{ fontWeight: 'bold', color: '#40150A', mb: 1 }}>
                        Regalias de Profissão
                    </Typography>
                    {validRegalias.map((regalia, idx) => (
                        <Paper key={idx} sx={{ p: 2, mb: 1, backgroundColor: '#e3f2fd', borderLeft: '4px solid #2196f3' }}>
                            <Typography className="esteban" variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                {regalia.nome}
                            </Typography>
                            <Typography className="esteban" variant="body2" sx={{ mt: 0.5 }}>
                                {regalia.habilidades}
                            </Typography>
                        </Paper>
                    ))}
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

                    {/* Regalias de Classe */}
                    {character.regalias_de_classe && Object.keys(character.regalias_de_classe).length > 0 && (
                        <Box sx={{ mb: 2 }}>
                            <Typography className="esteban" variant="subtitle1" sx={{ fontWeight: 'bold', color: '#40150A', mb: 1 }}>
                                Regalias de Classe
                            </Typography>
                            <Paper sx={{ p: 2, backgroundColor: '#fce4ec', borderLeft: '4px solid #e91e63' }}>
                                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                                    {JSON.stringify(character.regalias_de_classe, null, 2)}
                                </pre>
                            </Paper>
                        </Box>
                    )}
                </CardContent>
            </Card>
        );
    };

    // Lista de condições disponíveis no sistema
    const condicoesDisponiveis = {
        'Atordoado': {
            descricao: 'Não pode se mover, reagir, conjurar magias, usar feitiços. Defesa -2.',
            duracao: '1 rodada',
            penalidades: { defesa: -2 },
            cor: '#e53935'
        },
        'Cego': {
            descricao: 'Não consegue ver. Testes de atacar, investigar, rastrear, perceber e ler sofrem -3.',
            duracao: '2 rodadas',
            penalidades: { testes: -3 },
            cor: '#424242'
        },
        'Cansado (Leve)': {
            descricao: '-1 em todas as jogadas de ataque e habilidade.',
            nivel: 1,
            penalidades: { ataque: -1, habilidade: -1 },
            cor: '#ff9800'
        },
        'Cansado (Moderado)': {
            descricao: '-2 em ataques/habilidade. -1,5m velocidade.',
            nivel: 2,
            penalidades: { ataque: -2, habilidade: -2, velocidade: -1.5 },
            cor: '#f57c00'
        },
        'Cansado (Sufocante)': {
            descricao: '-3 em ataques/habilidade. -1,5m velocidade.',
            nivel: 3,
            penalidades: { ataque: -3, habilidade: -3, velocidade: -1.5 },
            cor: '#ef6c00'
        },
        'Cansado (Avassalador)': {
            descricao: '-4 em ataques/habilidade. -1,5m velocidade.',
            nivel: 4,
            penalidades: { ataque: -4, habilidade: -4, velocidade: -1.5 },
            cor: '#e65100'
        },
        'Cansado (Esmagador)': {
            descricao: '-5 em ataques/habilidade. -3m velocidade.',
            nivel: 5,
            penalidades: { ataque: -5, habilidade: -5, velocidade: -3 },
            cor: '#d84315'
        },
        'Cansado (Exaustivo)': {
            descricao: '-6 em ataques/habilidade. -3m velocidade.',
            nivel: 6,
            penalidades: { ataque: -6, habilidade: -6, velocidade: -3 },
            cor: '#bf360c'
        },
        'Cansado (Desesperador)': {
            descricao: '-7 em ataques/habilidade. -4,5m velocidade. 3 dano/rodada em combate.',
            nivel: 7,
            penalidades: { ataque: -7, habilidade: -7, velocidade: -4.5, dano: 3 },
            cor: '#8b0000'
        },
        'Envenenado': {
            descricao: 'Sofre dano de veneno a cada turno. Efeitos dependem do tipo de veneno.',
            duracao: 'Variável',
            cor: '#4caf50'
        },
        'Restringido': {
            descricao: 'Movimento zero. Desvantagem em ataques. Perde 1 ação/turno.',
            duracao: '2 rodadas',
            penalidades: { movimento: 0 },
            cor: '#795548'
        },
        'Deitado': {
            descricao: '-1 acerto. Inimigos: +1 corpo a corpo, -1 à distância contra você.',
            penalidades: { acerto: -1 },
            cor: '#607d8b'
        },
        'Incapacitado': {
            descricao: 'Cai deitado e fica atordoado.',
            duracao: '2 rodadas',
            penalidades: { defesa: -2 },
            cor: '#9c27b0'
        },
        'Surdo': {
            descricao: '-5 em percepção (som). Se também cego: -10 adicional em habilidades.',
            penalidades: { percepcao: -5 },
            cor: '#673ab7'
        },
        'Sangrando': {
            descricao: '2 dano no início do turno. Cura: Medicina 12 ou magia.',
            penalidades: { dano: 2 },
            cor: '#c62828'
        },
        'Paralisado': {
            descricao: 'Atordoado + corpo travado. Ataques corpo a corpo têm vantagem.',
            duracao: '2 rodadas',
            penalidades: { defesa: -2 },
            cor: '#3f51b5'
        },
        'Aterrorizado': {
            descricao: '-1 em todos os testes. Deve fugir da fonte de terror.',
            duracao: '2 rodadas',
            penalidades: { testes: -1 },
            cor: '#311b92'
        },
        'À Beira da Morte': {
            descricao: 'Incapacitado. Faz testes de morte (d20: 10+ sucesso, 9- falha).',
            cor: '#212121'
        },
        'Congelando': {
            descricao: 'Progressivo: -velocidade, desvantagem, -ações. 9ª: Atordoado. 20ª: Morte.',
            niveis: 20,
            cor: '#00bcd4'
        },
        'Queimando (Nível 1)': {
            descricao: '1d4 dano/rodada. Apagar: água, rolar no chão.',
            penalidades: { dano: '1d4' },
            cor: '#ff5722'
        },
        'Queimando (Nível 2)': {
            descricao: '1d6 dano/rodada. Apagar: água, rolar no chão.',
            penalidades: { dano: '1d6' },
            cor: '#f44336'
        },
        'Queimando (Nível 3)': {
            descricao: '2d6 dano/rodada. Apagar: água, rolar no chão.',
            penalidades: { dano: '2d6' },
            cor: '#d32f2f'
        },
        'Queimando (Lava Parcial)': {
            descricao: '6d6 dano/rodada.',
            penalidades: { dano: '6d6' },
            cor: '#b71c1c'
        },
        'Queimando (Lava Total)': {
            descricao: '12d6 dano/rodada.',
            penalidades: { dano: '12d6' },
            cor: '#880e0e'
        },
        'Obscurecido': {
            descricao: 'Não pode ser alvo de habilidades que exijam visão. +1 acerto e furtividade.',
            penalidades: { acerto: 1, furtividade: 1 },
            cor: '#37474f'
        },
        'Escondido': {
            descricao: 'Obscurecido + vantagem em ataques. Ataque fora de combate: Surpreso.',
            cor: '#263238'
        },
        'Surpreso': {
            descricao: 'Não age/reage. Defesa -2. Crítico em 1 número abaixo.',
            penalidades: { defesa: -2 },
            cor: '#ffeb3b'
        },
        'Devagar': {
            descricao: 'Metade do movimento. 1 ataque/ação. +1 ação de custo em tudo.',
            cor: '#9e9e9e'
        }
    };

    // Componente de Condições
    const CondicoesSection = () => {
        const condicoes = character.condicoes || {};
        const hasCondicoes = Object.keys(condicoes).length > 0;
        const [showConditionPicker, setShowConditionPicker] = useState(false);
        const [selectedConditionInfo, setSelectedConditionInfo] = useState(null);

        const toggleCondition = (conditionName) => {
            const newCondicoes = { ...condicoes };
            if (newCondicoes[conditionName]) {
                delete newCondicoes[conditionName];
            } else {
                newCondicoes[conditionName] = true;
            }
            saveConditions(newCondicoes);
        };

        const setConditionLevel = (conditionName, level) => {
            const newCondicoes = { ...condicoes };
            if (level === 0 || level === '') {
                delete newCondicoes[conditionName];
            } else {
                newCondicoes[conditionName] = level;
            }
            saveConditions(newCondicoes);
        };

        return (
            <Card sx={{ ...sectionStyle, mt: 2 }}>
                <CardHeader
                    sx={{ ...cardHeaderStyle, background: hasCondicoes ? 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)' : cardHeaderStyle.background }}
                    title={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <Typography className="esteban" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                ⚠️ Condições Ativas ({Object.keys(condicoes).length})
                            </Typography>
                            <IconButton 
                                onClick={() => setShowConditionPicker(!showConditionPicker)}
                                sx={{ color: 'white' }}
                                title={showConditionPicker ? "Fechar lista" : "Gerenciar condições"}
                            >
                                {showConditionPicker ? <CancelIcon /> : <EditIcon />}
                            </IconButton>
                        </Box>
                    }
                />
                <CardContent>
                    {/* Condições Ativas */}
                    {hasCondicoes ? (
                        <Box sx={{ mb: showConditionPicker ? 3 : 0 }}>
                            <Typography className="esteban" variant="subtitle2" sx={{ fontWeight: 'bold', color: '#d32f2f', mb: 1 }}>
                                Condições Atuais:
                            </Typography>
                            <Grid container spacing={1}>
                                {Object.entries(condicoes).map(([key, value]) => {
                                    const condInfo = condicoesDisponiveis[key] || {};
                                    return (
                                        <Grid item xs={12} sm={6} md={4} key={key}>
                                            <Paper 
                                                sx={{ 
                                                    p: 1.5, 
                                                    backgroundColor: condInfo.cor || '#f44336',
                                                    color: 'white',
                                                    borderRadius: 2,
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s',
                                                    '&:hover': { transform: 'scale(1.02)', boxShadow: 3 }
                                                }}
                                                onClick={() => setSelectedConditionInfo(selectedConditionInfo === key ? null : key)}
                                            >
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: '14px' }}>
                                                        {key} {typeof value === 'number' && value > 1 ? `(${value})` : ''}
                                                    </Typography>
                                                    <IconButton 
                                                        size="small" 
                                                        onClick={(e) => { e.stopPropagation(); toggleCondition(key); }}
                                                        sx={{ color: 'white', p: 0.5 }}
                                                    >
                                                        <CancelIcon fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                                {selectedConditionInfo === key && (
                                                    <Box sx={{ mt: 1, pt: 1, borderTop: '1px solid rgba(255,255,255,0.3)' }}>
                                                        <Typography variant="body2" sx={{ fontSize: '12px', opacity: 0.9 }}>
                                                            {condInfo.descricao}
                                                        </Typography>
                                                        {condInfo.duracao && (
                                                            <Typography variant="caption" sx={{ display: 'block', mt: 0.5, opacity: 0.7 }}>
                                                                Duração padrão: {condInfo.duracao}
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                )}
                                            </Paper>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Box>
                    ) : (
                        <Typography className="esteban" sx={{ textAlign: 'center', color: '#4caf50', mb: showConditionPicker ? 2 : 0 }}>
                            ✓ Nenhuma condição ativa
                        </Typography>
                    )}

                    {/* Seletor de Condições */}
                    {showConditionPicker && (
                        <Box sx={{ mt: 2 }}>
                            <Divider sx={{ mb: 2 }} />
                            <Typography className="esteban" variant="subtitle1" sx={{ fontWeight: 'bold', color: '#40150A', mb: 2 }}>
                                📋 Adicionar/Remover Condições
                            </Typography>
                            <Typography className="esteban" variant="body2" sx={{ color: '#666', mb: 2, fontStyle: 'italic' }}>
                                💡 Lembrete: Apenas a maior penalidade ou bônus de acerto/defesa é aplicada. Outros efeitos são cumulativos.
                            </Typography>
                            <Grid container spacing={1}>
                                {Object.entries(condicoesDisponiveis).map(([name, info]) => {
                                    const isActive = condicoes[name] !== undefined;
                                    const hasLevels = name.includes('Congelando');
                                    
                                    return (
                                        <Grid item xs={12} sm={6} md={4} lg={3} key={name}>
                                            <Paper 
                                                sx={{ 
                                                    p: 1.5,
                                                    backgroundColor: isActive ? info.cor : '#f5f5f5',
                                                    color: isActive ? 'white' : '#333',
                                                    borderRadius: 2,
                                                    border: `2px solid ${isActive ? info.cor : '#e0e0e0'}`,
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s',
                                                    '&:hover': { 
                                                        borderColor: info.cor,
                                                        transform: 'scale(1.02)',
                                                        boxShadow: 2
                                                    }
                                                }}
                                                onClick={() => !hasLevels && toggleCondition(name)}
                                            >
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                    <Box sx={{ flex: 1 }}>
                                                        <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: '13px' }}>
                                                            {isActive ? '✓ ' : ''}{name}
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ fontSize: '11px', opacity: 0.8, mt: 0.5 }}>
                                                            {info.descricao}
                                                        </Typography>
                                                    </Box>
                                                    {hasLevels && (
                                                        <TextField
                                                            type="number"
                                                            size="small"
                                                            value={condicoes[name] || ''}
                                                            onChange={(e) => setConditionLevel(name, parseInt(e.target.value) || 0)}
                                                            onClick={(e) => e.stopPropagation()}
                                                            sx={{ 
                                                                width: '50px', 
                                                                ml: 1,
                                                                '& .MuiInputBase-input': { 
                                                                    textAlign: 'center',
                                                                    padding: '4px',
                                                                    color: isActive ? 'white' : 'inherit'
                                                                }
                                                            }}
                                                            inputProps={{ min: 0, max: 20 }}
                                                            placeholder="Rd"
                                                        />
                                                    )}
                                                </Box>
                                                {info.duracao && (
                                                    <Typography variant="caption" sx={{ display: 'block', mt: 0.5, opacity: 0.6, fontSize: '10px' }}>
                                                        ⏱️ {info.duracao}
                                                    </Typography>
                                                )}
                                            </Paper>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Box>
                    )}
                </CardContent>
            </Card>
        );
    };

    return (
        <Box sx={{ p: 3, maxWidth: '1400px', margin: '0 auto', minHeight: '100vh' }}>
            {/* Componente de resultado de dado flutuante */}
            <DiceResultDisplay />

            {/* Header com info do personagem */}
            <CharacterHeader />

            {/* Atributos Vitais e Combate */}
            <VitalStatsSection />

            {/* Histórico de Rolagens */}
            <DiceHistoryPanel />

            {/* Descrição e Antecedente */}
            <DescriptionSection />

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
            <CondicoesSection />

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
