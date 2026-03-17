/**
 * characterSheet.js — Ficha de Personagem (refatorada)
 *
 * Todo o estado, callbacks e dados derivados vivem em useCharacterSheet().
 * A renderização é dividida em componentes leves que recebem props.
 *
 * Antes: ~4 230 linhas · Agora: ~300 linhas
 */
import React from 'react';
import AppFooter from '../../componentes/Footer/Footer';
import {
    Box, Paper, Typography, Snackbar, Alert, Tabs, Tab,
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import InventoryIcon from '@mui/icons-material/Inventory';
import StarIcon from '@mui/icons-material/Star';
import CasinoIcon from '@mui/icons-material/Casino';
import './char.css';

/* ── Hook central ───────────────────────────────────── */
import useCharacterSheet, { DADOS_DISPONIVEIS } from './useCharacterSheet';

/* ── Componentes de seção ───────────────────────────── */
import CharacterHeader from './components/CharacterHeader';
import CombatVitalSection from './components/CombatVitalSection';
import EquipamentosSection from './components/EquipamentosSection';
import HabilidadesSection from './components/HabilidadesSection';
import ProficienciasSection from './components/ProficienciasSection';
import RegaliasSection from './components/RegaliasSection';
import ConditionsPanel from './components/ConditionsPanel';
import DiceResultDisplay from './components/DiceResultDisplay';
import DiceHistorySidebar from './components/DiceHistorySidebar';
import DescansoPanel from './components/DescansoPanel';

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
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--surface-default)' }}>
            {/* Overlays / Modais */}
            <DiceResultDisplay diceResult={h.diceResult} onClose={() => h.setDiceResult(null)} />

            <DescansoPanel
                open={h.descansoModalOpen}
                onClose={() => h.setDescansoModalOpen(false)}
                onDescansoCurto={h.aplicarDescansoCurto}
                onDescansoLongo={h.aplicarDescansoLongo}
            />

            {/* Conteúdo Principal */}
            <Box sx={{ display: 'flex', flex: 1 }}>
            {/* Conteúdo Principal interno */}
            <Box sx={{ flex: 1, p: { xs: 1, sm: 2, md: 3 }, minWidth: 0 }}>
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

                {/* Vitais & Combate (componente unificado) */}
                <CombatVitalSection
                    character={h.character}
                    editMode={h.editMode}
                    statsDerivados={h.statsDerivados}
                    sectionStyle={h.sectionStyle}
                    cardHeaderStyle={h.cardHeaderStyle}
                    updateField={h.updateField}
                    baseUrl={h.baseUrl}
                    setCharacter={h.setCharacter}
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
                    aplicarDescansoCurto={h.aplicarDescansoCurto}
                    aplicarDescansoLongo={h.aplicarDescansoLongo}
                />

                {/* Tabs */}
                <Paper sx={{ ...h.sectionStyle, mb: 0, borderRadius: '12px 12px 0 0', borderBottom: 'none' }}>
                    <Tabs
                        value={h.activeTab}
                        onChange={h.handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        allowScrollButtonsMobile
                        sx={{
                            minHeight: 40,
                            '& .MuiTab-root': {
                                fontFamily: '"Esteban", serif', fontWeight: 'bold', color: 'var(--text-primary)',
                                minWidth: { xs: 60, sm: 90 },
                                px: { xs: 0.75, sm: 1.5 },
                                fontSize: { xs: '10px', sm: 'inherit' },
                                minHeight: 40,
                                py: 0.5,
                            },
                            '& .Mui-selected': { color: '#BB8130 !important' },
                            '& .MuiTabs-indicator': { backgroundColor: 'var(--panel-border)' },
                            '& .MuiSvgIcon-root': { color: 'inherit', fontSize: { xs: '18px', sm: '20px' } },
                            '& .MuiTabs-flexContainer': { justifyContent: { sm: 'space-around' } },
                        }}
                    >
                        <Tab className="esteban" icon={<FitnessCenterIcon />} iconPosition="start" label="Habilidades" />
                        <Tab className="esteban" icon={<AutoAwesomeIcon />} iconPosition="start" label="Proficiências" />
                        <Tab className="esteban" icon={<InventoryIcon />} iconPosition="start" label="Equipamentos" />
                        <Tab className="esteban" icon={<StarIcon />} iconPosition="start" label="Regalias" />
                    </Tabs>
                </Paper>

                {/* Conteúdo das Tabs */}
                <Box sx={{ mb: 2 }}>
                {h.activeTab === 0 && (
                    <HabilidadesSection character={h.character} editMode={h.editMode} sectionStyle={{ ...h.sectionStyle, mb: 0, borderRadius: '0 0 12px 12px', borderTop: 'none' }} cardHeaderStyle={h.cardHeaderStyle} updateField={h.updateField} rollSkillCheck={h.rollSkillCheck} baseUrl={h.baseUrl} setCharacter={h.setCharacter} />
                )}
                {h.activeTab === 1 && (
                    <ProficienciasSection character={h.character} editMode={h.editMode} sectionStyle={{ ...h.sectionStyle, mb: 0, borderRadius: '0 0 12px 12px', borderTop: 'none' }} cardHeaderStyle={h.cardHeaderStyle} updateField={h.updateField} />
                )}
                {h.activeTab === 2 && (
                    <EquipamentosSection
                        character={h.character}
                        editMode={h.editMode}
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
                        rollAttackWithAdvantage={h.rollAttackWithAdvantage}
                        isAcuidadeWeapon={h.isAcuidadeWeapon}
                        hasAcuidadeRegalia={h.hasAcuidadeRegalia}
                        sectionStyle={{ ...h.sectionStyle, mb: 0, borderRadius: '0 0 12px 12px', borderTop: 'none' }}
                    />
                )}
                {h.activeTab === 3 && (
                    <RegaliasSection character={h.character} editMode={h.editMode} sectionStyle={{ ...h.sectionStyle, mb: 0, borderRadius: '0 0 12px 12px', borderTop: 'none' }} cardHeaderStyle={h.cardHeaderStyle} updateField={h.updateField} baseUrl={h.baseUrl} setCharacter={h.setCharacter} statsDerivados={h.statsDerivados} setDiceHistory={h.setDiceHistory} salvarHistoricoRolagens={h.salvarHistoricoRolagens} />
                )}
                </Box>

                {/* Condições */}
                <ConditionsPanel
                    character={h.character}
                    nivelLuz={h.nivelLuz}
                    sectionStyle={h.sectionStyle}
                    cardHeaderStyle={h.cardHeaderStyle}
                    saveConditions={h.saveConditions}
                    condicoesModificadores={h.condicoesModificadores}
                />

                {/* Footer */}
                <Box sx={{
                    background: 'linear-gradient(135deg, #162A22 0%, #40150A 100%)',
                    borderRadius: '12px', p: 2, mt: 3,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 0.5, sm: 0 }, flexWrap: 'wrap',
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
            </Box>{/* end flex row */}

            <AppFooter />
        </Box>
    );
};

export default CharacterSheet;
