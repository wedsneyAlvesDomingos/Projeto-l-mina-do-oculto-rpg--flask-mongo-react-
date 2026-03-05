import React from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    TextField,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Chip,
    Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BoltIcon from '@mui/icons-material/Bolt';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ShieldIcon from '@mui/icons-material/Shield';
import SpeedIcon from '@mui/icons-material/Speed';
import CasinoIcon from '@mui/icons-material/Casino';
import { useCharacter } from './CharacterContext';
import { calcularVelocidadeMovimento, calcularDefesaTotal, calcularBonusIniciativa } from '../../../data/constants/index';

const VitalStatsSection = () => {
    const {
        character,
        editMode,
        sectionStyle,
        cardHeaderStyle,
        updateField,
        armaduraEquipada,
        escudoEquipado,
        rollDice,
        rollAttackWithAdvantage,
    } = useCharacter();

    if (!character) return null;

    // Cálculos baseados nas regras do RPG
    const habilidades = character.habilidades || {};
    const fortitude = habilidades['Fortitude'] || 0;
    const agilidade = habilidades['Agilidade'] || 0;
    const percepcao = habilidades['Percepção'] || 0;
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

    // Cálculo de Velocidade usando função centralizada
    // Detectar armadura pesada pelo campo tipo, pela categoria, ou pela presença do campo 'defesa' sem 'bonusDefesa'
    const armaduraPesada = armaduraEquipada?.tipo?.toLowerCase() === 'pesada' || 
                          armaduraEquipada?.category?.toLowerCase().includes('pesada') ||
                          (armaduraEquipada?.defesa >= 10 && !armaduraEquipada?.bonusDefesa) || 
                          false;
    
    const velocidadeInfo = calcularVelocidadeMovimento(
        especieBaseVelocidade, 
        agilidade, 
        armaduraPesada
    );
    const velocidade = velocidadeInfo.velocidadeTotal;

    // Cálculo de Defesa usando itens equipados
    let defesaArmadura = 0;
    if (armaduraPesada) {
        defesaArmadura = armaduraEquipada?.defesa || 0;
    } else {
        defesaArmadura = armaduraEquipada?.bonusDefesa || armaduraEquipada?.defesa || 0;
    }
    
    const defesaEscudo = escudoEquipado?.bonusDefesa || escudoEquipado?.defesa || 0;
    
    // Verificar proficiência em escudo
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
    const defesa = defesaInfo.defesaTotal;

    // Cálculo de Iniciativa: Agilidade + Percepção (regra oficial)
    const bonusIniciativa = calcularBonusIniciativa(agilidade, percepcao);
    const iniciativa = character.iniciativa || bonusIniciativa;

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
                            editMode={editMode}
                            updateField={updateField}
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
                            editMode={editMode}
                            updateField={updateField}
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
                            editMode={editMode}
                            updateField={updateField}
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
                            editMode={editMode}
                            updateField={updateField}
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
                            editMode={editMode}
                            updateField={updateField}
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
                            editMode={editMode}
                            updateField={updateField}
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
                        <AttackBox
                            label="Corpo a Corpo"
                            bonus={corpoACorpo}
                            color="#7B3311"
                            bgColor="#f5ebe3"
                            onClick={() => rollAttackWithAdvantage(corpoACorpo, 'Corpo a Corpo')}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <AttackBox
                            label="À Distância"
                            bonus={distancia}
                            color="#454E30"
                            bgColor="#e8eae5"
                            onClick={() => rollAttackWithAdvantage(distancia, 'À Distância')}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <AttackBox
                            label="Arcano"
                            bonus={arcano}
                            color="#162A22"
                            bgColor="#e3e7e5"
                            onClick={() => rollAttackWithAdvantage(arcano, 'Arcano')}
                        />
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
                <CombatRulesAccordion />
            </Box>
        </Paper>
    );
};

// Sub-componente StatBox
const StatBox = ({ icon, label, atual, max, color, bgColor, fieldAtual, fieldMax, editMode, updateField }) => {
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

// Sub-componente SingleStatBox
const SingleStatBox = ({ icon, label, value, color, bgColor, field, parseFunc = parseInt, editMode, updateField }) => {
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

// Sub-componente AttackBox
const AttackBox = ({ label, bonus, color, bgColor, onClick }) => (
    <Paper 
        onClick={onClick}
        sx={{ 
            p: 2, 
            textAlign: 'center', 
            backgroundColor: bgColor, 
            borderLeft: `4px solid ${color}`,
            cursor: 'pointer',
            transition: 'all 0.2s',
            '&:hover': { transform: 'scale(1.02)', boxShadow: 4 }
        }}
    >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <CasinoIcon sx={{ color: color, fontSize: 20 }} />
            <Typography className="esteban" sx={{ fontSize: '12px', color: color }}>{label}</Typography>
        </Box>
        <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: '20px', color: color }}>
            d20 +{bonus}
        </Typography>
    </Paper>
);

// Sub-componente de Regras de Combate
const CombatRulesAccordion = () => (
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
);

export default VitalStatsSection;
