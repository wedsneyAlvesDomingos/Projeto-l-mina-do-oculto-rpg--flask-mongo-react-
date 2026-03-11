/**
 * characterSheet.js — Ficha de Personagem (refatorada)
 *
 * Todo o estado, callbacks e dados derivados vivem em useCharacterSheet().
 * A renderização é dividida em componentes leves que recebem props.
 *
 * Antes: ~4 230 linhas · Agora: ~300 linhas
 */
import React from 'react';
import {
    Box, Paper, Typography, Button, Snackbar, Alert, Tabs, Tab,
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import InventoryIcon from '@mui/icons-material/Inventory';
import StarIcon from '@mui/icons-material/Star';
import HotelIcon from '@mui/icons-material/Hotel';
import CasinoIcon from '@mui/icons-material/Casino';
import './char.css';

/* ── Hook central ───────────────────────────────────── */
import useCharacterSheet, { DADOS_DISPONIVEIS } from './useCharacterSheet';

/* ── Componentes de seção ───────────────────────────── */
import CharacterHeader from './components/CharacterHeader';
import VitalStatsSection from './components/VitalStatsSection';
import QuickCombatPanel from './components/QuickCombatPanel';
import EquipamentosSection from './components/EquipamentosSection';
import HabilidadesSection from './components/HabilidadesSection';
import ProficienciasSection from './components/ProficienciasSection';
import RegaliasSection from './components/RegaliasSection';
import ConditionsPanel from './components/ConditionsPanel';
import CapacidadeCargaPanel from './components/CapacidadeCargaPanel';
import CombatSettingsPanel from './components/CombatSettingsPanel';
import DiceResultDisplay from './components/DiceResultDisplay';
import DiceHistorySidebar from './components/DiceHistorySidebar';
import DescansoPanel from './components/DescansoPanel';
import CombatRulesModal from './components/CombatRulesModal';

/* ═══════════════════════════════════════════════════════
   Componente Principal
   ═══════════════════════════════════════════════════════ */
const CharacterSheet = () => {
    const h = useCharacterSheet();          // "h" = hook bag

    /* ── Guardas de carregamento ───────────────────── */
    if (h.loading) {
        return (
            <Box textAlign="center" mt={4}>
                <Typography className="esteban" variant="h6">Carregando ficha do personagem...</Typography>
            </Box>
        );
    }
    if (!h.character) {
        return (
            <Box textAlign="center" mt={4}>
                <Typography className="esteban" variant="h6">Personagem não encontrado.</Typography>
            </Box>
        );
    }

    /* ── Render ─────────────────────────────────────── */
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f3eb' }}>
            {/* Overlays / Modais */}
            <DiceResultDisplay diceResult={h.diceResult} onClose={() => h.setDiceResult(null)} />

            <DescansoPanel
                open={h.descansoModalOpen}
                onClose={() => h.setDescansoModalOpen(false)}
                onDescansoCurto={h.aplicarDescansoCurto}
                onDescansoLongo={h.aplicarDescansoLongo}
            />

            <CombatRulesModal
                open={h.combatRulesModalOpen}
                onClose={() => h.setCombatRulesModalOpen(false)}
            />

            {/* Conteúdo Principal */}
            <Box sx={{ flex: 1, p: 3, minWidth: 0 }}>
                {/* Header */}
                <CharacterHeader
                    character={h.character}
                    editMode={h.editMode}
                    setEditMode={h.setEditMode}
                    sectionStyle={h.sectionStyle}
                    cardHeaderStyle={h.cardHeaderStyle}
                    updateField={h.updateField}
                    handleSave={h.handleSave}
                    handleCancel={h.handleCancel}
                    atualizarMoeda={h.atualizarMoeda}
                    fileInputRef={h.fileInputRef}
                    handleImageDrop={h.handleImageDrop}
                    handleDragOver={h.handleDragOver}
                    handleImageButtonClick={h.handleImageButtonClick}
                    handleImageFileChange={h.handleImageFileChange}
                />

                {/* Vitais & Combate */}
                <VitalStatsSection
                    character={h.character}
                    editMode={h.editMode}
                    statsDerivados={h.statsDerivados}
                    sectionStyle={h.sectionStyle}
                    cardHeaderStyle={h.cardHeaderStyle}
                    updateField={h.updateField}
                    rollDice={h.rollDice}
                    rollAttackWithAdvantage={h.rollAttackWithAdvantage}
                />

                {/* Combate Rápido */}
                <QuickCombatPanel
                    character={h.character}
                    statsDerivados={h.statsDerivados}
                    armasEquipadas={h.armasEquipadas}
                    armaduraEquipada={h.armaduraEquipada}
                    escudoEquipado={h.escudoEquipado}
                    equiparArma={h.equiparArma}
                    equiparArmadura={h.equiparArmadura}
                    equiparEscudo={h.equiparEscudo}
                    rollDice={h.rollDice}
                    rollAttackWithAdvantage={h.rollAttackWithAdvantage}
                    rollSkillCheck={h.rollSkillCheck}
                    rollWeaponDamage={h.rollWeaponDamage}
                />

                {/* Configurações de Combate */}
                <CombatSettingsPanel
                    vantagens={h.vantagens}
                    setVantagens={h.setVantagens}
                    desvantagens={h.desvantagens}
                    setDesvantagens={h.setDesvantagens}
                    nivelLuz={h.nivelLuz}
                    setNivelLuz={h.setNivelLuz}
                    dadoSelecionado={h.dadoSelecionado}
                    setDadoSelecionado={h.setDadoSelecionado}
                    quantidadeDados={h.quantidadeDados}
                    setQuantidadeDados={h.setQuantidadeDados}
                    diceRolling={h.diceRolling}
                    onRollCustom={h.rollCustomDice}
                    onRollD20={h.rollD20ComVantagem}
                    getPenalidadeLuzAtual={h.getPenalidadeLuzAtual}
                    DADOS_DISPONIVEIS={DADOS_DISPONIVEIS}
                />

                {/* Capacidade de Carga */}
                <CapacidadeCargaPanel character={h.character} />

                {/* Botões de Descanso e Regras */}
                <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                    <Button
                        variant="contained"
                        startIcon={<HotelIcon />}
                        onClick={h.aplicarDescansoCurto}
                        sx={{ backgroundColor: '#454E30', '&:hover': { backgroundColor: '#2F3C29' } }}
                    >
                        Descanso Curto
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<HotelIcon />}
                        onClick={h.aplicarDescansoLongo}
                        sx={{ backgroundColor: '#162A22', '&:hover': { backgroundColor: '#0d1a15' } }}
                    >
                        Descanso Longo
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => h.setCombatRulesModalOpen(true)}
                        sx={{ borderColor: '#756A34', color: '#756A34' }}
                    >
                        📜 Regras de Combate
                    </Button>
                </Box>

                {/* Tabs */}
                <Paper sx={{ ...h.sectionStyle, mb: 2 }}>
                    <Tabs
                        value={h.activeTab}
                        onChange={h.handleTabChange}
                        variant="fullWidth"
                        sx={{
                            '& .MuiTab-root': { fontFamily: '"Esteban", serif', fontWeight: 'bold', color: '#40150A' },
                            '& .Mui-selected': { color: '#BB8130 !important' },
                            '& .MuiTabs-indicator': { backgroundColor: '#756A34' },
                            '& .MuiSvgIcon-root': { color: 'inherit' },
                        }}
                    >
                        <Tab className="esteban" icon={<FitnessCenterIcon />} label="Habilidades" />
                        <Tab className="esteban" icon={<AutoAwesomeIcon />} label="Proficiências" />
                        <Tab className="esteban" icon={<InventoryIcon />} label="Equipamentos" />
                        <Tab className="esteban" icon={<StarIcon />} label="Regalias" />
                    </Tabs>
                </Paper>

                {/* Conteúdo das Tabs */}
                {h.activeTab === 0 && (
                    <HabilidadesSection character={h.character} editMode={h.editMode} sectionStyle={h.sectionStyle} cardHeaderStyle={h.cardHeaderStyle} updateField={h.updateField} rollSkillCheck={h.rollSkillCheck} />
                )}
                {h.activeTab === 1 && (
                    <ProficienciasSection character={h.character} editMode={h.editMode} sectionStyle={h.sectionStyle} cardHeaderStyle={h.cardHeaderStyle} updateField={h.updateField} />
                )}
                {h.activeTab === 2 && (
                    <EquipamentosSection
                        character={h.character}
                        editMode={h.editMode}
                        sectionStyle={h.sectionStyle}
                        cardHeaderStyle={h.cardHeaderStyle}
                        updateField={h.updateField}
                        armasEquipadas={h.armasEquipadas}
                        armaduraEquipada={h.armaduraEquipada}
                        escudoEquipado={h.escudoEquipado}
                        equiparArma={h.equiparArma}
                        equiparArmadura={h.equiparArmadura}
                        desequiparArmadura={h.desequiparArmadura}
                        equiparEscudo={h.equiparEscudo}
                        desequiparEscudo={h.desequiparEscudo}
                        rollDice={h.rollDice}
                        rollWeaponDamage={h.rollWeaponDamage}
                        isAcuidadeWeapon={h.isAcuidadeWeapon}
                        hasAcuidadeRegalia={h.hasAcuidadeRegalia}
                    />
                )}
                {h.activeTab === 3 && (
                    <RegaliasSection character={h.character} editMode={h.editMode} sectionStyle={h.sectionStyle} cardHeaderStyle={h.cardHeaderStyle} updateField={h.updateField} />
                )}

                {/* Condições */}
                <ConditionsPanel
                    character={h.character}
                    nivelLuz={h.nivelLuz}
                    sectionStyle={h.sectionStyle}
                    cardHeaderStyle={h.cardHeaderStyle}
                    saveConditions={h.saveConditions}
                />

                {/* Footer */}
                <Box sx={{
                    background: 'linear-gradient(135deg, #162A22 0%, #40150A 100%)',
                    borderRadius: '12px', p: 2, mt: 3,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap',
                }}>
                    <Typography className="esteban" sx={{ color: 'white', fontSize: '12px' }}>
                        <strong>Criado em:</strong> {h.character.criado_em ? new Date(h.character.criado_em).toLocaleString('pt-BR') : 'N/A'}
                    </Typography>
                    <Typography className="esteban" sx={{ color: 'white', fontSize: '12px' }}>
                        <strong>Atualizado em:</strong> {h.character.atualizado_em ? new Date(h.character.atualizado_em).toLocaleString('pt-BR') : 'N/A'}
                    </Typography>
                </Box>
            </Box>

            {/* Sidebar — Histórico de Rolagens */}
            <Box sx={{ width: '320px', flexShrink: 0, p: 2, pl: 0, display: { xs: 'none', lg: 'block' } }}>
                <DiceHistorySidebar diceHistory={h.diceHistory} onClear={() => h.setDiceHistory([])} />
            </Box>

            {/* Snackbar */}
            <Snackbar
                open={h.snackbar.open}
                autoHideDuration={4000}
                onClose={() => h.setSnackbar({ ...h.snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity={h.snackbar.severity} onClose={() => h.setSnackbar({ ...h.snackbar, open: false })}>
                    {h.snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default CharacterSheet;
