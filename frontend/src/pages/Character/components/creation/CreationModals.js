import React from 'react';
import {
    Box, Typography, Modal, Button, FormControl, FormLabel,
    FormGroup, RadioGroup, FormControlLabel, Radio, Checkbox,
    ListItemText, Grid, Card, CardHeader, CardContent,
} from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '500px',
    overflowY: 'scroll',
    width: '50%',
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 2,
};

// ============================================================
// GroupAssignmentModal — Amnésico (escolha de grupos)
// ============================================================
export const GroupAssignmentModal = ({
    open, setOpen,
    allValues, group1, setGroup1, group2, setGroup2,
    handleGroupChange,
}) => (
    <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
            <Typography variant="h6">Atribuição de Pontos</Typography>
            <Box component="form" mt={2}>
                <FormControl component="fieldset" margin="normal">
                    <FormLabel component="legend">Grupo 1 (+2 pontos cada, até 2)</FormLabel>
                    <FormGroup>
                        {Object.keys(allValues).map(key => (
                            <FormControlLabel
                                key={key}
                                control={
                                    <Checkbox
                                        checked={group1.includes(key)}
                                        disabled={group2.find(hab => hab === key)}
                                        onChange={handleGroupChange(setGroup1, group1, 2)}
                                        value={key}
                                    />
                                }
                                label={`${key} (${allValues[key]})`}
                            />
                        ))}
                    </FormGroup>
                </FormControl>

                <FormControl component="fieldset" margin="normal">
                    <FormLabel component="legend">Grupo 2 (+1 ponto cada, até 2)</FormLabel>
                    <FormGroup>
                        {Object.keys(allValues).map(key => (
                            <FormControlLabel
                                key={key}
                                control={
                                    <Checkbox
                                        disabled={group1.find(hab => hab === key)}
                                        checked={group2.includes(key)}
                                        onChange={handleGroupChange(setGroup2, group2, 1)}
                                        value={key}
                                    />
                                }
                                label={`${key} (${allValues[key]})`}
                            />
                        ))}
                    </FormGroup>
                </FormControl>

                <Box mt={3} textAlign="right">
                    <Button variant="outlined" onClick={() => setOpen(false)}>
                        Fechar
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => { setOpen(false); }}
                        sx={{ ml: 2 }}
                        disabled={group1.length === 0 && group2.length === 0}
                    >
                        Confirmar
                    </Button>
                </Box>
            </Box>
        </Box>
    </Modal>
);

// ============================================================
// ProfessionSelectionModal — Artesão (seleção de profissão)
// ============================================================
export const ProfessionSelectionModal = ({
    modalAberto, setModalAberto,
    profissoes, allowedProfissoes,
    selectedIdModal, handleToggleArte,
    professionReg, handleSaveArte,
}) => (
    <Modal open={modalAberto}>
        <Box sx={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%', maxWidth: 900,
            bgcolor: 'background.paper',
            boxShadow: 24, p: 4, borderRadius: 2
        }}>
            <Typography variant="h6" gutterBottom>
                Selecione uma habilidade da profissão
            </Typography>

            <Grid container spacing={2}>
                {profissoes
                    .filter(prof => allowedProfissoes.includes(prof.nome))
                    .map((prof) => (
                        <Grid item xs={12} md={6} key={prof.nome}>
                            <Card
                                variant={selectedIdModal?.startsWith(prof.nome + '::') ? 'outlined' : 'elevation'}
                                sx={{
                                    borderBottom: '6px solid #7B3311',
                                    height: '320px',
                                    overflowY: 'scroll',
                                    background: '#EDEDED',
                                    borderColor: selectedIdModal?.startsWith(prof.nome + '::') ? 'primary.main' : undefined
                                }}
                            >
                                <CardHeader title={prof.nome} subheader={`Ambiente: ${prof.ambiente || prof.ambienteEmprego}`} />
                                <CardContent>
                                    {prof.habilidades
                                        .filter(hab => {
                                            const nome = hab.nome;
                                            const nivelMatch = nome.match(/Nível (\d+)/i);
                                            if (nivelMatch && parseInt(nivelMatch[1], 10) >= 2) return false;
                                            const plusMatch = nome.match(/\+(\d+)/);
                                            if (plusMatch && parseInt(plusMatch[1], 10) >= 2) return false;
                                            return true;
                                        })
                                        .map((hab) => {
                                            const id = `${prof.nome}::${hab.nome}`;
                                            return (
                                                <Box key={id} mb={1}>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                onChange={() => handleToggleArte(prof.nome, hab.nome)}
                                                                checked={selectedIdModal === id}
                                                                disabled={hab.nome === professionReg.habilidades}
                                                            />
                                                        }
                                                        label={
                                                            <Box>
                                                                <Typography variant="subtitle2" component="div">
                                                                    {hab.nome}
                                                                </Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {hab.descricao}
                                                                </Typography>
                                                            </Box>
                                                        }
                                                    />
                                                </Box>
                                            );
                                        })}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
            </Grid>

            <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
                <Button onClick={() => setModalAberto(false)} variant="outlined">
                    Fechar
                </Button>
                <Button
                    onClick={handleSaveArte}
                    variant="contained"
                    color="primary"
                    disabled={!selectedIdModal}
                >
                    Confirmar
                </Button>
            </Box>
        </Box>
    </Modal>
);

// ============================================================
// MutationModal — Mutação (Circense / Espécie)
// ============================================================
export const MutationModal = ({
    openMutatioModal, setOpenMutatioModal,
    mutacaoData, disableMutationOpt, handleSelect,
}) => (
    <Modal open={openMutatioModal} onClose={() => setOpenMutatioModal(false)}>
        <Box
            sx={{
                backgroundColor: 'white',
                p: 3,
                m: 'auto',
                mt: 5,
                borderRadius: 2,
                maxWidth: 600,
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: 24,
            }}
        >
            <Typography variant="h5" gutterBottom>
                {mutacaoData.tipo}
            </Typography>

            <Typography variant="body1" gutterBottom>
                <strong>Descrição:</strong> {mutacaoData.descricao}
            </Typography>

            <Typography variant="body2" color="error" gutterBottom>
                <strong>Penalidade:</strong> {mutacaoData.penalidade}
            </Typography>

            <Typography variant="h6" mt={2}>
                Escolha uma Mutação:
            </Typography>

            <RadioGroup>
                {mutacaoData.opcoes.map((opcao, index) => (
                    <FormControlLabel
                        key={index}
                        value={opcao.nome}
                        disabled={disableMutationOpt === opcao.nome}
                        control={<Radio />}
                        label={
                            <ListItemText
                                primary={opcao.nome}
                                secondary={opcao.descricao}
                            />
                        }
                        onClick={() => {
                            handleSelect(opcao.nome);
                        }}
                    />
                ))}
            </RadioGroup>

            <Box mt={3} textAlign="right">
                <Button variant="outlined" onClick={() => setOpenMutatioModal(false)}>
                    Fechar
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        setOpenMutatioModal(false);
                    }}
                    sx={{ ml: 2 }}
                >
                    Confirmar
                </Button>
            </Box>
        </Box>
    </Modal>
);

// ============================================================
// AttributeChoiceModals — Todos os modais de escolha de atributo
// ============================================================
export const AttributeChoiceModals = ({
    // Força ou Destreza (antecedente)
    openForcaOuDex, setOpenForcaOuDex, setOpen,
    selectedAttribute, setSelectedAttribute,
    setAutoIncrementedValueByName,
    // Combatente (regalia)
    openForcaOuDexOuFortitude, setOpenForcaOuDexOuFortitude,
    selectedAttributeCombatente, setSelectedAttributeCombatente,
    selectedAttributeCombatente2, setSelectedAttributeCombatente2,
    handleRegaliaChange,
    // Noviço
    openNovicoChoices, setOpenNovicoChoices,
    selectedAttributeNovico, setSelectedAttributeNovico,
    selectedAttributeNovico2, setSelectedAttributeNovico2,
    // Iniciado
    openIniciadoChoices, setOpenIniciadoChoices,
    selectedAttributeIniciado, setSelectedAttributeIniciado,
    selectedAttributeIniciado2, setSelectedAttributeIniciado2,
    // Feiticeiro
    openFeiticeiroChoices, setOpenFeiticeiroChoices,
    selectedAttributeFeiticeiro, setSelectedAttributeFeiticeiro,
    selectedAttributeFeiticeiro2, setSelectedAttributeFeiticeiro2,
    // Diplomata
    openDiplomataChoices, setOpenDiplomataChoices,
    selectedAttributeDiplomata, setSelectedAttributeDiplomata,
    // Explorador
    openExploradorChoices, setOpenExploradorChoices,
    selectedAttributeExplorador, setSelectedAttributeExplorador,
    selectedAttributeExplorador2, setSelectedAttributeExplorador2,
    // Acadêmico
    openAcademicoChoices, setOpenAcademicoChoices,
    selectedAttributeAcademico, setSelectedAttributeAcademico,
    selectedAttributeAcademico2, setSelectedAttributeAcademico2,
    // Proficiência Esgrima/Armadura (antecedente)
    openProfEsgrimaOuArmadura, setOpenProfEsgrimaOuArmadura,
    selectedProfModal, setSelectedProfModal,
    setAutoIncrementedProfByName,
}) => (
    <>
        {/* Força ou Destreza (antecedente) */}
        <Modal open={openForcaOuDex} onClose={() => setOpenForcaOuDex(false)}>
            <Box sx={style}>
                <Typography variant="h6">Atribuir Ponto</Typography>
                <Box component="form" mt={2}>
                    <FormControl component="fieldset" margin="normal">
                        <FormLabel component="legend">Escolha um atributo para aumentar em +1 ponto</FormLabel>
                        <RadioGroup
                            value={selectedAttribute}
                            onChange={(e) => { setSelectedAttribute(e.target.value); }}
                        >
                            <FormControlLabel value="Força" control={<Radio />} label="Força " />
                            <FormControlLabel value="Destreza" control={<Radio />} label="Destreza " />
                        </RadioGroup>
                    </FormControl>
                    <Box mt={3} textAlign="right">
                        <Button variant="outlined" onClick={() => setOpen(false)}>Fechar</Button>
                        <Button
                            variant="contained"
                            onClick={() => {
                                if (selectedAttribute) {
                                    setAutoIncrementedValueByName(selectedAttribute, 1);
                                    setOpenForcaOuDex(false);
                                }
                            }}
                            sx={{ ml: 2 }}
                        >
                            Confirmar
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>

        {/* Combatente (regalia) */}
        <Modal open={openForcaOuDexOuFortitude} onClose={() => setOpenForcaOuDexOuFortitude(false)}>
            <Box sx={style}>
                <Typography variant="h6">Atribuir Ponto</Typography>
                <Box component="form" mt={2}>
                    <FormControl component="fieldset" margin="normal" sx={{ m: 2 }}>
                        <FormLabel component="legend">Escolha um atributo para aumentar em +1 ponto</FormLabel>
                        <RadioGroup
                            value={selectedAttributeCombatente}
                            onChange={(e) => { setSelectedAttributeCombatente(e.target.value); }}
                        >
                            <FormControlLabel value="Força" control={<Radio />} label="Força " />
                            <FormControlLabel value="Destreza" control={<Radio />} label="Destreza " />
                            <FormControlLabel value="Fortitude" control={<Radio />} label="Fortitude " />
                        </RadioGroup>
                    </FormControl>
                    <FormControl component="fieldset" margin="normal" sx={{ m: 2 }}>
                        <FormLabel component="legend">Escolha um atributo para aumentar em +1 ponto</FormLabel>
                        <RadioGroup
                            value={selectedAttributeCombatente2}
                            onChange={(e) => { setSelectedAttributeCombatente2(e.target.value); }}
                        >
                            <FormControlLabel value="Combate Corpo a Corpo" control={<Radio />} label="Combate Corpo a Corpo " />
                            <FormControlLabel value="Combate a Distância" control={<Radio />} label="Combate a Distância " />
                        </RadioGroup>
                    </FormControl>
                    <Box mt={3} textAlign="right">
                        <Button variant="outlined" onClick={() => { setOpenForcaOuDexOuFortitude(false); handleRegaliaChange('combatente'); }}>Fechar</Button>
                        <Button
                            variant="contained"
                            onClick={() => {
                                if (selectedAttributeCombatente && selectedAttributeCombatente2) {
                                    setAutoIncrementedValueByName(selectedAttributeCombatente, 1);
                                    setAutoIncrementedValueByName(selectedAttributeCombatente2, 1);
                                    setOpenForcaOuDexOuFortitude(false);
                                }
                            }}
                            sx={{ ml: 2 }}
                        >
                            Confirmar
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>

        {/* Noviço */}
        <Modal open={openNovicoChoices} onClose={() => setOpenNovicoChoices(false)}>
            <Box sx={style}>
                <Typography variant="h6">Atribuir Ponto</Typography>
                <Box component="form" mt={2}>
                    <FormControl component="fieldset" margin="normal" sx={{ m: 2 }}>
                        <FormLabel component="legend">Escolha um atributo para aumentar em +1 ponto</FormLabel>
                        <RadioGroup
                            value={selectedAttributeNovico}
                            onChange={(e) => { setSelectedAttributeNovico(e.target.value); }}
                        >
                            <FormControlLabel value="Teologia" control={<Radio />} label="Teologia " />
                            <FormControlLabel value="Arcanismo" control={<Radio />} label="Arcanismo " />
                            <FormControlLabel value="Medicina" control={<Radio />} label="Medicina " />
                        </RadioGroup>
                    </FormControl>
                    <FormControl component="fieldset" margin="normal" sx={{ m: 2 }}>
                        <FormLabel component="legend">Escolha um atributo para aumentar em +1 ponto</FormLabel>
                        <RadioGroup
                            value={selectedAttributeNovico2}
                            onChange={(e) => { setSelectedAttributeNovico2(e.target.value); }}
                        >
                            <FormControlLabel value="Combate Corpo a Corpo" control={<Radio />} label="Combate Corpo a Corpo " />
                            <FormControlLabel value="Combate a Distância" control={<Radio />} label="Combate a Distância " />
                            <FormControlLabel value="Combate Arcano" control={<Radio />} label="Combate Arcano " />
                        </RadioGroup>
                    </FormControl>
                    <Box mt={3} textAlign="right">
                        <Button variant="outlined" onClick={() => { setOpenNovicoChoices(false); handleRegaliaChange('novico'); }}>Fechar</Button>
                        <Button
                            variant="contained"
                            onClick={() => {
                                if (selectedAttributeNovico && selectedAttributeNovico2) {
                                    setAutoIncrementedValueByName(selectedAttributeNovico, 1);
                                    setAutoIncrementedValueByName(selectedAttributeNovico2, 1);
                                    setOpenNovicoChoices(false);
                                }
                            }}
                            sx={{ ml: 2 }}
                        >
                            Confirmar
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>

        {/* Iniciado */}
        <Modal open={openIniciadoChoices} onClose={() => setOpenIniciadoChoices(false)}>
            <Box sx={style}>
                <Typography variant="h6">Atribuir Ponto</Typography>
                <Box component="form" mt={2}>
                    <FormControl component="fieldset" margin="normal" sx={{ m: 2 }}>
                        <FormLabel component="legend">Escolha um atributo para aumentar em +1 ponto</FormLabel>
                        <RadioGroup
                            value={selectedAttributeIniciado}
                            onChange={(e) => { setSelectedAttributeIniciado(e.target.value); }}
                        >
                            <FormControlLabel value="Ritualismo" control={<Radio />} label="Ritualismo " />
                            <FormControlLabel value="Arcanismo" control={<Radio />} label="Arcanismo " />
                            <FormControlLabel value="Arcanatec" control={<Radio />} label="Medicina " />
                        </RadioGroup>
                    </FormControl>
                    <FormControl component="fieldset" margin="normal" sx={{ m: 2 }}>
                        <FormLabel component="legend">Escolha um atributo para aumentar em +1 ponto</FormLabel>
                        <RadioGroup
                            value={selectedAttributeIniciado2}
                            onChange={(e) => { setSelectedAttributeIniciado2(e.target.value); }}
                        >
                            <FormControlLabel value="Combate Arcano" control={<Radio />} label="Combate Arcano " />
                        </RadioGroup>
                    </FormControl>
                    <Box mt={3} textAlign="right">
                        <Button variant="outlined" onClick={() => { setOpenIniciadoChoices(false); handleRegaliaChange('iniciado'); }}>Fechar</Button>
                        <Button
                            variant="contained"
                            onClick={() => {
                                if (selectedAttributeIniciado && selectedAttributeIniciado2) {
                                    setAutoIncrementedValueByName(selectedAttributeIniciado, 1);
                                    setAutoIncrementedValueByName(selectedAttributeIniciado2, 1);
                                    setOpenIniciadoChoices(false);
                                }
                            }}
                            sx={{ ml: 2 }}
                        >
                            Confirmar
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>

        {/* Feiticeiro */}
        <Modal open={openFeiticeiroChoices} onClose={() => setOpenFeiticeiroChoices(false)}>
            <Box sx={style}>
                <Typography variant="h6">Atribuir Ponto</Typography>
                <Box component="form" mt={2}>
                    <FormControl component="fieldset" margin="normal" sx={{ m: 2 }}>
                        <FormLabel component="legend">Escolha um atributo para aumentar em +1 ponto</FormLabel>
                        <RadioGroup
                            value={selectedAttributeFeiticeiro}
                            onChange={(e) => { setSelectedAttributeFeiticeiro(e.target.value); }}
                        >
                            <FormControlLabel value="Ritualismo" control={<Radio />} label="Ritualismo " />
                            <FormControlLabel value="Ocultismo" control={<Radio />} label="Ocultismo" />
                        </RadioGroup>
                    </FormControl>
                    <FormControl component="fieldset" margin="normal" sx={{ m: 2 }}>
                        <FormLabel component="legend">Escolha um atributo para aumentar em +1 ponto</FormLabel>
                        <RadioGroup
                            value={selectedAttributeFeiticeiro2}
                            onChange={(e) => { setSelectedAttributeFeiticeiro2(e.target.value); }}
                        >
                            <FormControlLabel value="Combate Arcano" control={<Radio />} label="Combate Arcano " />
                        </RadioGroup>
                    </FormControl>
                    <Box mt={3} textAlign="right">
                        <Button variant="outlined" onClick={() => { setOpenFeiticeiroChoices(false); handleRegaliaChange('feiticeiro'); }}>Fechar</Button>
                        <Button
                            variant="contained"
                            onClick={() => {
                                if (selectedAttributeFeiticeiro && selectedAttributeFeiticeiro2) {
                                    setAutoIncrementedValueByName(selectedAttributeFeiticeiro, 1);
                                    setAutoIncrementedValueByName(selectedAttributeFeiticeiro2, 1);
                                    setOpenFeiticeiroChoices(false);
                                }
                            }}
                            sx={{ ml: 2 }}
                        >
                            Confirmar
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>

        {/* Diplomata */}
        <Modal open={openDiplomataChoices} onClose={() => setOpenDiplomataChoices(false)}>
            <Box sx={style}>
                <Typography variant="h6">Atribuir Ponto</Typography>
                <Box component="form" mt={2}>
                    <FormControl component="fieldset" margin="normal" sx={{ m: 2 }}>
                        <FormLabel component="legend">Escolha um atributo para aumentar em +2 pontos</FormLabel>
                        <RadioGroup
                            value={selectedAttributeDiplomata}
                            onChange={(e) => { setSelectedAttributeDiplomata(e.target.value); }}
                        >
                            <FormControlLabel value="Persuasão" control={<Radio />} label="Persuasão " />
                            <FormControlLabel value="Enganação" control={<Radio />} label="Enganação" />
                        </RadioGroup>
                    </FormControl>
                    <FormControl component="fieldset" margin="normal" sx={{ m: 2 }}>
                        <FormLabel component="legend">+2 pontos em:</FormLabel>
                        <RadioGroup>
                            <FormControlLabel checked value="Sedução" control={<Radio />} label="Sedução " />
                            <FormControlLabel checked value="Negociação" control={<Radio />} label="Negociação" />
                        </RadioGroup>
                    </FormControl>
                    <FormControl component="fieldset" margin="normal" sx={{ m: 2 }}>
                        <FormLabel component="legend"> +1 ponto em:</FormLabel>
                        <RadioGroup>
                            <FormControlLabel checked value="Intimidação" control={<Radio />} label="Intimidação " />
                        </RadioGroup>
                    </FormControl>
                    <Box mt={3} textAlign="right">
                        <Button variant="outlined" onClick={() => { setOpenDiplomataChoices(false); handleRegaliaChange('diplomata'); }}>Fechar</Button>
                        <Button
                            variant="contained"
                            onClick={() => {
                                if (selectedAttributeDiplomata) {
                                    setAutoIncrementedValueByName(selectedAttributeDiplomata, 2);
                                    setAutoIncrementedValueByName('Negociação', 1);
                                    setAutoIncrementedValueByName('Sedução', 2);
                                    setAutoIncrementedValueByName('Intimidação', 2);
                                    setOpenDiplomataChoices(false);
                                }
                            }}
                            sx={{ ml: 2 }}
                        >
                            Confirmar
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>

        {/* Explorador */}
        <Modal open={openExploradorChoices} onClose={() => setOpenExploradorChoices(false)}>
            <Box sx={style}>
                <Typography variant="h6">Atribuir Ponto</Typography>
                <Box component="form" mt={2}>
                    <FormControl component="fieldset" margin="normal" sx={{ m: 2 }}>
                        <FormLabel component="legend">Escolha um atributo para aumentar em +2 pontos</FormLabel>
                        <RadioGroup
                            value={selectedAttributeExplorador}
                            onChange={(e) => { setSelectedAttributeExplorador(e.target.value); }}
                        >
                            <FormControlLabel value="Rastreamento" control={<Radio />} label="Rastreamento " />
                            <FormControlLabel value="Investigação" control={<Radio />} label="Investigação" />
                        </RadioGroup>
                    </FormControl>
                    <FormControl component="fieldset" margin="normal" sx={{ m: 2 }}>
                        <FormLabel component="legend">Escolha um atributo para aumentar em +2 pontos :</FormLabel>
                        <RadioGroup
                            value={selectedAttributeExplorador2}
                            onChange={(e) => { setSelectedAttributeExplorador2(e.target.value); }}
                        >
                            <FormControlLabel value="Percepção" control={<Radio />} label="Percepção" />
                            <FormControlLabel value="Furtividade" control={<Radio />} label="Furtividade" />
                        </RadioGroup>
                    </FormControl>
                    <FormControl component="fieldset" margin="normal" sx={{ m: 2 }}>
                        <FormLabel component="legend"> +1 ponto em:</FormLabel>
                        <RadioGroup>
                            <FormControlLabel checked value="Sobrevivência" control={<Radio />} label="Sobrevivência " />
                            <FormControlLabel checked value="Navegação" control={<Radio />} label="Navegação " />
                        </RadioGroup>
                    </FormControl>
                    <Box mt={3} textAlign="right">
                        <Button variant="outlined" onClick={() => { setOpenExploradorChoices(false); handleRegaliaChange('explorador'); }}>Fechar</Button>
                        <Button
                            variant="contained"
                            onClick={() => {
                                if (selectedAttributeExplorador) {
                                    setAutoIncrementedValueByName(selectedAttributeExplorador, 2);
                                    setAutoIncrementedValueByName(selectedAttributeExplorador2, 2);
                                    setAutoIncrementedValueByName('Sobrevivência', 1);
                                    setAutoIncrementedValueByName('Navegação', 1);
                                    setOpenExploradorChoices(false);
                                }
                            }}
                            sx={{ ml: 2 }}
                        >
                            Confirmar
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>

        {/* Acadêmico */}
        <Modal open={openAcademicoChoices} onClose={() => setOpenAcademicoChoices(false)}>
            <Box sx={style}>
                <Typography variant="h6">Atribuir Ponto</Typography>
                <Box component="form" mt={2}>
                    <FormControl component="fieldset" margin="normal" sx={{ m: 2 }}>
                        <FormLabel component="legend">Escolha um atributo para aumentar em +2 ponto</FormLabel>
                        <RadioGroup
                            value={selectedAttributeAcademico}
                            onChange={(e) => { setSelectedAttributeAcademico(e.target.value); }}
                        >
                            <FormControlLabel value="História" control={<Radio />} label="História" />
                            <FormControlLabel value="Intuição" control={<Radio />} label="Intuição" />
                        </RadioGroup>
                    </FormControl>
                    <FormControl component="fieldset" margin="normal" sx={{ m: 2 }}>
                        <FormLabel component="legend">+1 pontos em:</FormLabel>
                        <RadioGroup>
                            <FormControlLabel checked value="Jurisprudência (Política e leis)" control={<Radio />} label="Jurisprudência (Política e leis)" />
                            <FormControlLabel checked value="Teologia" control={<Radio />} label="Teologia" />
                        </RadioGroup>
                    </FormControl>
                    <FormControl component="fieldset" margin="normal" sx={{ m: 2 }}>
                        <FormLabel component="legend">Escolha um atributo para aumentar em +2 pontos :</FormLabel>
                        <RadioGroup
                            value={selectedAttributeAcademico2}
                            onChange={(e) => { setSelectedAttributeAcademico2(e.target.value); }}
                        >
                            <FormControlLabel value="Medicina" control={<Radio />} label="Medicina" />
                            <FormControlLabel value="Natureza" control={<Radio />} label="Natureza" />
                        </RadioGroup>
                    </FormControl>
                    <Box mt={3} textAlign="right">
                        <Button variant="outlined" onClick={() => { setOpenAcademicoChoices(false); handleRegaliaChange('academico'); }}>Fechar</Button>
                        <Button
                            variant="contained"
                            onClick={() => {
                                if (selectedAttributeAcademico) {
                                    setAutoIncrementedValueByName(selectedAttributeAcademico, 2);
                                    setAutoIncrementedValueByName(selectedAttributeAcademico2, 2);
                                    setAutoIncrementedValueByName('Jurisprudência (Política e leis)', 1);
                                    setAutoIncrementedValueByName('Teologia', 1);
                                    setOpenAcademicoChoices(false);
                                }
                            }}
                            sx={{ ml: 2 }}
                        >
                            Confirmar
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>

        {/* Proficiência Esgrima ou Armadura */}
        <Modal open={openProfEsgrimaOuArmadura} onClose={() => setOpenProfEsgrimaOuArmadura(false)}>
            <Box sx={style}>
                <Typography variant="h6">Atribuir Ponto</Typography>
                <Box component="form" mt={2}>
                    <FormControl component="fieldset" margin="normal">
                        <FormLabel component="legend">Escolha uma proficiência para aumentar em +1 ponto</FormLabel>
                        <RadioGroup
                            value={selectedProfModal}
                            onChange={(e) => { setSelectedProfModal(e.target.value); }}
                        >
                            <FormControlLabel value="Maestria em Armaduras e Escudos" control={<Radio />} label="Maestria em Armaduras e Escudos " />
                            <FormControlLabel value="Proficiência em Esgrima" control={<Radio />} label="Proficiência em Esgrima " />
                        </RadioGroup>
                    </FormControl>
                    <Box mt={3} textAlign="right">
                        <Button variant="outlined" onClick={() => setOpen(false)}>Fechar</Button>
                        <Button
                            variant="contained"
                            onClick={() => {
                                if (selectedProfModal) {
                                    setAutoIncrementedProfByName(selectedProfModal, 1);
                                    setOpenProfEsgrimaOuArmadura(false);
                                }
                            }}
                            sx={{ ml: 2 }}
                        >
                            Confirmar
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    </>
);
