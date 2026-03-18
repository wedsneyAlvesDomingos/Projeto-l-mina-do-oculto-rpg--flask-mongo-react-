/**
 * CharCreationPage — Composição principal para criação de personagem
 * Refatorado por UI-005 (Fase 4): Hook + componentes isolados
 * Original: ~3 582 linhas → ~280 linhas (composição pura)
 */
import React from 'react';
import AppFooter from '../../componentes/Footer/Footer';
import dayjs from 'dayjs';
import {
    Box, Tabs, Tab, Typography, Paper, Stack, Chip,
    Button, Snackbar, Alert,
} from '@mui/material';

import useCharCreation, { mutacaoData } from './useCharCreation';
import {
    BasicInfoTab,
    SpeciesTab,
    SkillsTab,
    ProficienciesTab,
    BackgroundTab,
    ApprenticeTab,
    ProfessionTab,
    EquipmentShopTab,
    GroupAssignmentModal,
    ProfessionSelectionModal,
    MutationModal,
    AttributeChoiceModals,
    AntecedenteChoiceModal,
} from './components/creation';

import './char.css';

// ============================================================
// TabPanel (mantido como componente local leve)
// ============================================================
function TabPanel({ children, value, index, ...other }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`character-tabpanel-${index}`}
            aria-labelledby={`character-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

// ============================================================
// NavigationButtons (composição local simples)
// ============================================================
function NavigationButtons({ tabIndex, setTabIndex, handleCriarPersonagem }) {
    const handleNext = () => { if (tabIndex < 7) setTabIndex(prev => prev + 1); };
    const handlePrevious = () => { if (tabIndex > 0) setTabIndex(prev => prev - 1); };

    return (
        <Stack direction="row" spacing={2} alignItems="center"
            sx={{ display: 'flex', justifyContent: 'center', py: '1', my: 4 }}>
            {tabIndex > 0 && (
                <Button variant="outline" className="navagationButtons" onClick={handlePrevious}>
                    Anterior
                </Button>
            )}
            {tabIndex < 7 && (
                <Button variant="outline" className="navagationButtons" onClick={handleNext}>
                    Próximo
                </Button>
            )}
            <Button variant="contained" id="criarCharButtom" onClick={handleCriarPersonagem}>
                Finalizar
            </Button>
        </Stack>
    );
}

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================
const CharCreationPage = () => {
    const h = useCharCreation();

    return (
        <Box sx={{ width: '100%', minHeight: '900px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', m: 'auto' }}>
            <Box sx={{ width: { xs: '95%', md: '90%' }, mx: 'auto' }}>
                <Typography variant="h4" className="MainTitleC" sx={{ mt: 4 }}>
                    Criação de personagem
                </Typography>

                <NavigationButtons
                    tabIndex={h.tabIndex}
                    setTabIndex={h.setTabIndex}
                    handleCriarPersonagem={h.handleCriarPersonagem}
                />

                {/* Painel de Stats Derivados — atualiza em tempo real (UI-001) */}
                <Paper sx={{ p: 2, mb: 2, borderTop: '3px solid #162A22' }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: '#162A22' }}>
                        📊 Stats Calculados (tempo real)
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        <Chip label={`❤️ PV: ${h.statsDerivados.pvMax}`}  />
                        <Chip label={`⚡ Estamina: ${h.statsDerivados.estaminaMax}`}  />
                        <Chip label={`🔮 PM: ${h.statsDerivados.pmMax}`} />
                        <Chip label={`🛡️ Defesa: ${h.statsDerivados.defesaTotal}`} />
                        <Chip label={`🏃 Vel: ${h.statsDerivados.velTotal}m`} />
                        <Chip label={`⚔️ Iniciativa: ${h.statsDerivados.iniciativa}`} />
                        <Chip label={`🎒 Carga: ${h.statsDerivados.cargaMax}kg`} />
                    </Stack>
                </Paper>

                {/* ============ TABS ============ */}
                <Tabs value={h.tabIndex} onChange={h.handleTabChange}
                    variant="scrollable" scrollButtons="auto" aria-label="character creation tabs">
                    <Tab className="tabs" label="Informações Básicas" id="character-tab-0" aria-controls="character-tabpanel-0" />
                    <Tab className="tabs" label="Espécie" id="character-tab-4" aria-controls="character-tabpanel-3" />
                    <Tab className="tabs" label="Habilidades" id="character-tab-1" aria-controls="character-tabpanel-1" />
                    <Tab className="tabs" label="Proficiências" id="character-tab-3" aria-controls="character-tabpanel-2" />
                    <Tab className="tabs" label="Antecedente" id="character-tab-1" aria-controls="character-tabpanel-1" />
                    <Tab className="tabs" label="Aprendiz" id="character-tab-5" aria-controls="character-tabpanel-4" />
                    <Tab className="tabs" label="Profissão" id="character-tab-6" aria-controls="character-tabpanel-5" />
                    <Tab className="tabs" label="Equipamentos" id="character-tab-7" aria-controls="character-tabpanel-6" />
                </Tabs>

                <Box>
                    {/* Tab 0 — Info Básica */}
                    <TabPanel value={h.tabIndex} index={0}>
                        <BasicInfoTab
                            charName={h.charName} setCharName={h.setCharName}
                            age={h.age} setAge={h.setAge}
                            gender={h.gender} setGender={h.setGender}
                            altura={h.altura} setAltura={h.setAltura}
                            charDiscription={h.charDiscription} setCharDiscription={h.setCharDiscription}
                            image={h.image}
                            handleDrop={h.handleDrop} handleDragOver={h.handleDragOver}
                            handleButtonClick={h.handleButtonClick} handleFileChange={h.handleFileChange}
                            fileInputRef={h.fileInputRef}
                            formErrors={h.formErrors}
                        />
                    </TabPanel>

                    {/* Tab 1 — Espécie */}
                    <TabPanel value={h.tabIndex} index={1}>
                        <SpeciesTab
                            especieSelecionada={h.especieSelecionada}
                            handleSpeciesChange={h.handleSpeciesChange}
                            regaliaEscolhida={h.regaliaEscolhida}
                            setRegaliaEscolhida={h.setRegaliaEscolhida}
                            disableMutationOptModal={h.disableMutationOptModal}
                            especieSelecionadaLista={h.especieSelecionadaLista}
                            racas={h.racas}
                            regaliasOpcionais={h.regaliasOpcionais}
                        />
                    </TabPanel>

                    {/* Tab 2 — Habilidades */}
                    <TabPanel value={h.tabIndex} index={2}>
                        <SkillsTab
                            allValues={h.allValues} setAllValues={h.setAllValues}
                            autoIncrementedValues={h.autoIncrementedValues}
                            setAutoIncrementedValues={h.setAutoIncrementedValues}
                            checkedGroups={h.checkedGroups} setCheckedGroups={h.setCheckedGroups}
                            checkedOrder={h.checkedOrder} setCheckedOrder={h.setCheckedOrder}
                            MAX_POINTS={h.MAX_POINTS}
                            calculateCustoEscalonado={h.calculateCustoEscalonado}
                            grupos={h.grupos}
                        />
                    </TabPanel>

                    {/* Tab 3 — Proficiências */}
                    <TabPanel value={h.tabIndex} index={3}>
                        <ProficienciesTab
                            proficiencias={h.proficiencias}
                            values={h.values}
                            handleProficienciaChange={h.handleProficienciaChange}
                            remainingProfPoints={h.remainingProfPoints}
                        />
                    </TabPanel>

                    {/* Tab 4 — Antecedente */}
                    <TabPanel value={h.tabIndex} index={4}>
                        <BackgroundTab
                            antecedentes={h.antecedentes}
                            antecedenteSelecionado={h.antecedenteSelecionado}
                            handleAntecedenteChange={h.handleAntecedenteChange}
                        />
                    </TabPanel>

                    {/* Tab 5 — Aprendiz */}
                    <TabPanel value={h.tabIndex} index={5}>
                        <ApprenticeTab
                            regaliasDeAprendiz={h.regaliasDeAprendiz}
                            RegaliasDeAprendiz={h.RegaliasDeAprendiz}
                            handleRegaliaChange={h.handleRegaliaChange}
                        />
                    </TabPanel>

                    {/* Tab 6 — Profissão */}
                    <TabPanel value={h.tabIndex} index={6}>
                        <ProfessionTab
                            profissoes={h.profissoes}
                            selectedId={h.selectedId}
                            handleToggle={h.handleToggle}
                            professionRegAntecedente={h.professionRegAntecedente}
                        />
                    </TabPanel>

                    {/* Tab 7 — Equipamentos */}
                    <TabPanel value={h.tabIndex} index={7}>
                        <EquipmentShopTab
                            categories={h.categories}
                            selectedItems={h.selectedItems}
                            selectedItemsBG={h.selectedItemsBG}
                            handleChangeShop={h.handleChangeShop}
                            handleRemove={h.handleRemove}
                            totalSpent={h.totalSpent}
                            goldLimit={h.goldLimit}
                            inicialMoney={h.inicialMoney}
                        />
                    </TabPanel>
                </Box>

                {/* ============ MODAIS ============ */}
                <GroupAssignmentModal
                    open={h.open} setOpen={h.setOpen}
                    allValues={h.allValues}
                    group1={h.group1} setGroup1={h.setGroup1}
                    group2={h.group2} setGroup2={h.setGroup2}
                    handleGroupChange={h.handleGroupChange}
                />

                <ProfessionSelectionModal
                    modalAberto={h.modalAberto} setModalAberto={h.setModalAberto}
                    profissoes={h.profissoes}
                    allowedProfissoes={h.allowedProfissoes}
                    selectedIdModal={h.selectedIdModal}
                    handleToggleArte={h.handleToggleArte}
                    professionReg={h.professionReg}
                    handleSaveArte={h.handleSaveArte}
                />

                <MutationModal
                    openMutatioModal={h.openMutatioModal}
                    setOpenMutatioModal={h.setOpenMutatioModal}
                    mutacaoData={mutacaoData}
                    disableMutationOpt={h.disableMutationOpt}
                    handleSelect={h.handleSelect}
                />

                <AntecedenteChoiceModal
                    open={h.antecedenteChoiceModalOpen}
                    onClose={() => h.setAntecedenteChoiceModalOpen(false)}
                    antecedente={h.antecedenteSelecionado}
                    onConfirm={h.handleAntecedenteChoiceConfirm}
                />

                <AttributeChoiceModals
                    openForcaOuDex={h.openForcaOuDex} setOpenForcaOuDex={h.setOpenForcaOuDex}
                    setOpen={h.setOpen}
                    selectedAttribute={h.selectedAttribute} setSelectedAttribute={h.setSelectedAttribute}
                    setAutoIncrementedValueByName={h.setAutoIncrementedValueByName}
                    openForcaOuDexOuFortitude={h.openForcaOuDexOuFortitude} setOpenForcaOuDexOuFortitude={h.setOpenForcaOuDexOuFortitude}
                    selectedAttributeCombatente={h.selectedAttributeCombatente} setSelectedAttributeCombatente={h.setSelectedAttributeCombatente}
                    selectedAttributeCombatente2={h.selectedAttributeCombatente2} setSelectedAttributeCombatente2={h.setSelectedAttributeCombatente2}
                    handleRegaliaChange={h.handleRegaliaChange}
                    openNovicoChoices={h.openNovicoChoices} setOpenNovicoChoices={h.setOpenNovicoChoices}
                    selectedAttributeNovico={h.selectedAttributeNovico} setSelectedAttributeNovico={h.setSelectedAttributeNovico}
                    selectedAttributeNovico2={h.selectedAttributeNovico2} setSelectedAttributeNovico2={h.setSelectedAttributeNovico2}
                    openIniciadoChoices={h.openIniciadoChoices} setOpenIniciadoChoices={h.setOpenIniciadoChoices}
                    selectedAttributeIniciado={h.selectedAttributeIniciado} setSelectedAttributeIniciado={h.setSelectedAttributeIniciado}
                    selectedAttributeIniciado2={h.selectedAttributeIniciado2} setSelectedAttributeIniciado2={h.setSelectedAttributeIniciado2}
                    openFeiticeiroChoices={h.openFeiticeiroChoices} setOpenFeiticeiroChoices={h.setOpenFeiticeiroChoices}
                    selectedAttributeFeiticeiro={h.selectedAttributeFeiticeiro} setSelectedAttributeFeiticeiro={h.setSelectedAttributeFeiticeiro}
                    selectedAttributeFeiticeiro2={h.selectedAttributeFeiticeiro2} setSelectedAttributeFeiticeiro2={h.setSelectedAttributeFeiticeiro2}
                    openDiplomataChoices={h.openDiplomataChoices} setOpenDiplomataChoices={h.setOpenDiplomataChoices}
                    selectedAttributeDiplomata={h.selectedAttributeDiplomata} setSelectedAttributeDiplomata={h.setSelectedAttributeDiplomata}
                    openExploradorChoices={h.openExploradorChoices} setOpenExploradorChoices={h.setOpenExploradorChoices}
                    selectedAttributeExplorador={h.selectedAttributeExplorador} setSelectedAttributeExplorador={h.setSelectedAttributeExplorador}
                    selectedAttributeExplorador2={h.selectedAttributeExplorador2} setSelectedAttributeExplorador2={h.setSelectedAttributeExplorador2}
                    openAcademicoChoices={h.openAcademicoChoices} setOpenAcademicoChoices={h.setOpenAcademicoChoices}
                    selectedAttributeAcademico={h.selectedAttributeAcademico} setSelectedAttributeAcademico={h.setSelectedAttributeAcademico}
                    selectedAttributeAcademico2={h.selectedAttributeAcademico2} setSelectedAttributeAcademico2={h.setSelectedAttributeAcademico2}
                    openProfEsgrimaOuArmadura={h.openProfEsgrimaOuArmadura} setOpenProfEsgrimaOuArmadura={h.setOpenProfEsgrimaOuArmadura}
                    selectedProfModal={h.selectedProfModal} setSelectedProfModal={h.setSelectedProfModal}
                    setAutoIncrementedProfByName={h.setAutoIncrementedProfByName}
                />
            </Box>

            {/* Snackbar para feedback de ações */}
            <Snackbar
                open={h.snackbar.open}
                autoHideDuration={6000}
                onClose={() => h.setSnackbar({ ...h.snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => h.setSnackbar({ ...h.snackbar, open: false })}
                    severity={h.snackbar.severity}
                    sx={{ width: '100%' }}
                    variant="filled"
                >
                    {h.snackbar.message}
                </Alert>
            </Snackbar>

            {/* Footer */}
            <AppFooter />
        </Box>
    );
};

export default CharCreationPage;