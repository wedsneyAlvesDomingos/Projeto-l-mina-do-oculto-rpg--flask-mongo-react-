import React, { useState, useCallback, useRef } from 'react';
import dayjs from 'dayjs';
import { Avatar, List, ListItem, ListItemText, Box, Container, Card, CardHeader, CardContent, Tabs, Tab, Typography, Paper, Tooltip, Grid, TextField, Button, FormControl, FormLabel, FormGroup, RadioGroup, FormControlLabel, Radio, InputLabel, Select, MenuItem, Stack, Divider, Chip, Modal, ListItemButton, Snackbar, Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UIcon from '../../assets/images/userIcon.png';
import './char.css';
import Checkbox from '@mui/material/Checkbox';

// Importações centralizadas de dados
import {
    habilidadesFisico as fisico,
    habilidadesExploracao as exploracao,
    habilidadesConhecimento as conhecimento,
    habilidadesArcana as arcana,
    habilidadesSocial as social,
    gruposHabilidades as grupos,
    proficiencias,
    profissoes,
    racas,
    regaliasDeAprendiz,
    regaliasOpcionais,
    categories,
    antecedentes
} from '../../data/constants';

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
function TabPanel({ children, value, index, ...other }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`character-tabpanel-${index}`}
            aria-labelledby={`character-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const CharCreationPage = () => {
    const navigate = useNavigate();
    const [selectedAttribute, setSelectedAttribute] = useState('');
    const [selectedAttributeCombatente, setSelectedAttributeCombatente] = useState('');
    const [selectedAttributeCombatente2, setSelectedAttributeCombatente2] = useState('');
    const [selectedAttributeNovico, setSelectedAttributeNovico] = useState('');
    const [selectedAttributeNovico2, setSelectedAttributeNovico2] = useState('');
    const [selectedAttributeIniciado, setSelectedAttributeIniciado] = useState('');
    const [selectedAttributeIniciado2, setSelectedAttributeIniciado2] = useState('');
    const [selectedAttributeFeiticeiro, setSelectedAttributeFeiticeiro] = useState('');
    const [selectedAttributeFeiticeiro2, setSelectedAttributeFeiticeiro2] = useState('');
    const [selectedAttributeDiplomata, setSelectedAttributeDiplomata] = useState('');
    const [selectedAttributeExplorador, setSelectedAttributeExplorador] = useState('');
    const [selectedAttributeExplorador2, setSelectedAttributeExplorador2] = useState('');
    const [selectedAttributeAcademico, setSelectedAttributeAcademico] = useState('');
    const [selectedAttributeAcademico2, setSelectedAttributeAcademico2] = useState('');
    const [selectedProfModal, setSelectedProfModal] = useState('');
    const baseUrl = process.env.REACT_APP_LISTEN_ADDRESS;
    const [inicialMoney, setInicialMoney] = useState(450);
    const [finallMoney, setFinallMoney] = useState('0');
    var goldLimit = inicialMoney || 450;
    const [open, setOpen] = useState(false);
    const [openForcaOuDex, setOpenForcaOuDex] = useState(false);
    const [openForcaOuDexOuFortitude, setOpenForcaOuDexOuFortitude] = useState(false);
    const [openNovicoChoices, setOpenNovicoChoices] = useState(false);
    const [openDiplomataChoices, setOpenDiplomataChoices] = useState(false);
    const [openFeiticeiroChoices, setOpenFeiticeiroChoices] = useState(false);
    const [openIniciadoChoices, setOpenIniciadoChoices] = useState(false);
    const [openExploradorChoices, setOpenExploradorChoices] = useState(false);
    const [openAcademicoChoices, setOpenAcademicoChoices] = useState(false);
    const [openProfEsgrimaOuArmadura, setOpenProfEsgrimaOuArmadura] = useState(false);
    const [group1, setGroup1] = useState([]);
    const [group2, setGroup2] = useState([]);
    const MAX_POINTS = 40;
    const MAX_PROF_POINTS = 4;
    const [age, setAge] = React.useState(18);
    const [altura, setAltura] = React.useState(170);
    const [tabIndex, setTabIndex] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedItemsBG, setSelectedItemsBG] = useState([]);
    const [image, setImage] = useState(null);
    const [especieSelecionada, setEspecieSelecionada] = useState('humano');
    const [selectedId, setSelectedId] = React.useState('');
    const [selectedIdModal, setSelectedIdModal] = React.useState('');
    const [RegaliasDeAprendiz, setRegaliasDeAprendiz] = useState([]);
    const [RegaliasDeAprendizSelecionada, setRegaliasDeAprendizSelecionada] = useState({});
    const [RegaliaComprada, setRegaliaComprada] = useState('');
    const [regaliaEscolhida, setRegaliaEscolhida] = React.useState('');
    const [charName, setCharName] = React.useState('');
    const [charDiscription, setCharDiscription] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [values, setValues] = React.useState(
        proficiencias.reduce((acc, prof) => ({ ...acc, [prof.nome]: 0 }), {})
    );
    const [valuesPoints, setValuesPoints] = React.useState(
        proficiencias.reduce((acc, prof) => ({ ...acc, [prof.nome]: 0 }), {})
    );
    const defaultValues = {
        Acrobacia: 0,
        Agilidade: 0,
        Alquimia: 0,
        Arcanatec: 0,
        Arcanismo: 0,
        Armadilhas: 0,
        Atletismo: 0,
        "Combate Arcano": 0,
        "Combate Corpo a Corpo": 0,
        "Combate a Distância": 0,
        Destreza: 0,
        Enganação: 0,
        Fortitude: 0,
        Força: 0,
        Furtividade: 0,
        História: 0,
        Intimidação: 0,
        Intuição: 0,
        Investigação: 0,
        "Jurisprudência (Política e leis)": 0,
        "Lidar com animais": 0,
        Medicina: 0,
        Natureza: 0,
        Navegação: 0,
        Negociação: 0,
        Ocultismo: 0,
        Percepção: 0,
        Performance: 0,
        Persuasão: 0,
        Rastreamento: 0,
        Ritualismo: 0,
        Sedução: 0,
        Sobrevivência: 0,
        Tecnologia: 0,
        Teologia: 0,
    };
    const [allValues, setAllValues] = React.useState(defaultValues);
    const [autoIncrementedValues, setAutoIncrementedValues] = React.useState(defaultValues);
    const [autoIncrementedProfValues, setAutoIncrementedProfValues] = React.useState(proficiencias.reduce((acc, prof) => ({ ...acc, [prof.nome]: 0 }), {}))
    const [checkedGroups, setCheckedGroups] = React.useState({});
    const [checkedOrder, setCheckedOrder] = React.useState([]);
    const [professionReg, setProfessionReg] = React.useState([]);
    const [professionRegAntecedente, setProfessionRegAntecedente] = React.useState([]);
    const [mensagem, setMensagem] = React.useState('');
    const [antecedenteSelecionado, setAntecedenteSelecionado] = useState(null);
    const [chosenAntecedentes, setChosenAntecedentes] = useState(new Set());
    const [modalAberto, setModalAberto] = React.useState(false);
    const [especieSelecionadaLista, setEspecieSelecionadaLista] = useState([]);
    const [openMutatioModal, setOpenMutatioModal] = useState(false);
    const [pontosDeRegalia, setPontosDeRegalia] = useState(0);
    
    // Estados para validação e feedback
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    
    // Regex para validação
    const validationPatterns = {
        nome: /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/,
        descricao: /^[\s\S]{0,2000}$/,
        idade: /^(1[0-9]|[2-9][0-9]|[1-9][0-9]{2}|1000)$/,
        dinheiro: /^\d+(\.\d{1,2})?$/
    };

    const mutacaoData = {
        "tipo": "Mutante",
        "custo": 2,
        "descricao": 'Uma criatura que sofreu de alguma forma uma exposição a um efeito que mudou permanentemente sua aparência e fisionomia é considerada um mutante. O mutante tem uma penalidade de -2 em todos os testes da aba social, exceto intimidação, sempre que que tiver a mutação visível. Todos sabem que o personagem possui mutações, a não ser que o personagem a mantenha contida dentro de roupas, máscaras e afins. Ao escolher ser um mutante é necessário escolher apenas uma das opções abaixo:',
        "penalidade": "-2 em testes da aba social (exceto Intimidação) com mutação visível.",
        "opcoes": [
            {
                "nome": "Pele Escamosa",
                "descricao": "A pele do personagem se torna grossa e escamosa, fornecendo uma defesa natural a cortes e arranhões. A base do valor de defesa para o personagem sem armadura é de 10 ao invés de 7."
            },
            {
                "nome": "Olhos Multifacetados",
                "descricao": "Os olhos do personagem se multiplicam e adquirem uma aparência insectóide, concedendo visão ampliada e a capacidade de enxergar no escuro. Visão no escuro, e meia luz, com alcance de 27 metros e bônus de +2 em testes de percepção que envolvam visão. Além disso possui visão 360°"
            },
            {
                "nome": "Boca Abissal",
                "descricao": "A boca do personagem se expande, revelando uma mandíbula cheia de dentes afiados, permitindo ataques mordedores poderosos. Recebe uma arma natural com dano perfurante  1d10 + valor de força. Recebe +2 em testes de atletismo para agarrar um alvo com os dentes."
            },
            {
                "nome": "Membros Desproporcionais",
                "descricao": "Os membros do personagem se alongam ou encurtam, concedendo versatilidade. Aumentam o alcance de ameaça em 1,5 metros ou reduz a criatura em um tamanho na escala, com um mínimo de minúsculo."
            },
            {
                "nome": "Cauda Serpentina",
                "descricao": "Uma cauda serpentina cresce na parte inferior do corpo do personagem, permitindo uma maior capacidade de equilíbrio e agilidade em movimentos.o personagem ganha um bônus de +5 em testes de acrobacia para se equilibrar e consegue usar sua cauda para se segurar em beiradas, galhos e outros que possam ser enrolados por ela, deixando assim suas mãos livres. A calda pode ser usada para segurar objetos mas não realizar ataques ou defender de ataques."
            },
            {
                "nome": "Garras Retráteis",
                "descricao": "O personagem desenvolve garras afiadas em suas mãos ou pés, fornecendo ataques mais letais e a habilidade de escalar superfícies verticais. Recebe uma arma natural com dano cortante   1d6 + valor de destreza. O personagem tem a capacidade de escalar superfícies verticais sem custo extra de movimento e sem necessidade de ferramentas extras."
            },
            {
                "nome": "Chifres Torcidos",
                "descricao": "Chifres retorcidos e sinuosos crescem na cabeça do personagem, conferindo maior resistência física e a capacidade de empurrar objetos pesados. O personagem recebe +2 em testes de atletismo para se manter em pé ou derrubar um alvo. Recebe uma arma natural com dano de impacto  1d6 + valor de força."
            },
            {
                "nome": "Exoesqueleto Ósseo",
                "descricao": "O corpo do personagem é envolvido por um exoesqueleto ósseo, tornando-o mais resistente a cortes. Se torna resistente ao dano cortante, porém se torna vulnerável ao dano de impacto. O exoesqueleto também aumenta a base do valor de defesa de 7 para 12."
            },
            {
                "nome": "Pernas de Aranha",
                "descricao": "O personagem desenvolve pernas extras semelhantes às de uma aranha, permitindo maior mobilidade e a habilidade de escalar paredes. Pode escalar sem gastar movimento extra e ganha um bônus de 1.5 metros no valor de velocidade. Ganha um bônus de +5 em testes de atletismo para agarrar e para não ser derrubado."
            },
            {
                "nome": "Braços Tentaculares",
                "descricao": "Braços adicionais em forma de tentáculos crescem no corpo do personagem, fornecendo uma vantagem de alcance em combate e a habilidade de agarrar objetos a distância. Recebe 1.5 metros a mais em seu alcance de ameaça e +2 em testes de atletismo para agarrar outra criatura."
            }
        ]
    }
    var disableMutationOpt;
    if (regaliaEscolhida.regalias) {
        disableMutationOpt = regaliaEscolhida.regalias[0];
    } else {
        disableMutationOpt = null;
    }
    var disableMutationOptModal;
    if (especieSelecionadaLista.regalias) {
        disableMutationOptModal = especieSelecionadaLista.regalias[0];
    } else {
        disableMutationOptModal = null;
    }
    const handleSelect = (nomeMutacao) => {
        setEspecieSelecionadaLista(
            { especie: racas[especieSelecionada].nome, regalias: [nomeMutacao] }
        );

        setOpen(false);
        console.log(disableMutationOptModal);

    };
    const setAutoIncrementedValueByName = (attributeName, increment) => {
        setAutoIncrementedValues(prev => ({
            ...prev,
            [attributeName]: (prev[attributeName] || 0) + increment,
        }));
        setAllValues(prev => {
            const previousAuto = autoIncrementedValues[attributeName] || 0;
            const currentManual = Math.max(0, (prev[attributeName] || 0) - previousAuto);
            return {
                ...prev,
                [attributeName]: currentManual + (previousAuto + increment),
            };
        });
        console.log('Incremento aplicado em', attributeName, increment);
    };
    const removeAutoIncrementedValueByName = (attributeName, increment) => {
        setAutoIncrementedValues(prev => ({
            ...prev,
            [attributeName]: (prev[attributeName] || 0) - increment,
        }));
        setAllValues(prev => {
            const previousAuto = autoIncrementedValues[attributeName] || 0;
            const currentManual = Math.max(0, (prev[attributeName] || 0) - previousAuto);
            return {
                ...prev,
                [attributeName]: currentManual + (previousAuto - increment),
            };
        });
    };
    const removeAutoIncrementedProfByName = (profName, increment) => {
        setAutoIncrementedProfValues(prev => ({
            ...prev,
            [profName]: (prev[profName] || 0) - increment,
        }));
        setValues(prev => {
            const previousAuto = autoIncrementedValues[profName] || 0;
            const currentManual = Math.max(0, (prev[profName] || 0) - previousAuto);
            return {
                ...prev,
                [profName]: currentManual + (previousAuto - increment),
            };
        });

    };
    const setAutoIncrementedProfByName = (profName, increment) => {
        setAutoIncrementedProfValues(prev => ({
            ...prev,
            [profName]: (prev[profName] || 0) + increment,
        }));
        setValues(prev => {
            const previousAuto = autoIncrementedValues[profName] || 0;
            const currentManual = Math.max(0, (prev[profName] || 0) - previousAuto);
            return {
                ...prev,
                [profName]: currentManual + (previousAuto + increment),
            };
        });
        console.log('Incremento de proficiência aplicado em', profName, increment);
        console.log(values);

    };
    const clearGroups = (groups, groupSetters, increment) => {
        groups.forEach((group, index) => {
            group.forEach(value => {
                removeAutoIncrementedValueByName(value, increment);
            });
            groupSetters[index]([]); // limpa o grupo
        });
        console.log(group1, group2);

    };
    const handleNavigateToCharPage = useCallback(() => {
        navigate("/character");
    }, [navigate]);
    const handleAntecedenteChange = (antecedente) => {
        if (antecedenteSelecionado?.nome === antecedente.nome) {
            setChosenAntecedentes(prev => {
                const newSet = new Set(prev);
                newSet.delete(antecedente);
                return newSet;
            });
            switch (antecedente.nome) {
                case 'ABENÇOADO':
                    removeAutoIncrementedValueByName('Teologia', 2);
                    removeAutoIncrementedValueByName('História', 2);
                    removeAutoIncrementedValueByName('Intuição', 2);
                    removeAutoIncrementedValueByName('Ritualismo', -1);
                    removeAutoIncrementedValueByName('Ocultismo', -1);

                    break;
                case 'ACADÊMICO':
                    removeAutoIncrementedValueByName('Natureza', 2);
                    removeAutoIncrementedValueByName('História', 2);
                    removeAutoIncrementedValueByName('Jurisprudência (Política e leis)', 1);
                    removeAutoIncrementedProfByName('Proficiência em Línguas Antigas', 1);
                    break;
                case 'ACÓLITO':
                    removeAutoIncrementedValueByName('Teologia', 2);
                    removeAutoIncrementedValueByName('Jurisprudência (Política e leis)', 2);
                    handleRemoveBG({ name: "Símbolo santo", price: 0.7 });
                    removeAutoIncrementedValueByName('História', 1);
                    removeAutoIncrementedValueByName('Intuição', 1);
                    break;
                case 'ACROBATA':

                    removeAutoIncrementedValueByName('Acrobacia', 2);
                    removeAutoIncrementedValueByName('Performance', 2);
                    removeAutoIncrementedValueByName('Destreza', 1);
                    removeAutoIncrementedValueByName('Agilidade', 1);
                    break;
                case 'ADESTRADOR DE ANIMAIS':
                    removeAutoIncrementedValueByName('Intuição', 2);
                    removeAutoIncrementedValueByName('Lidar com animais', 2);
                    removeAutoIncrementedValueByName('Natureza', 1);
                    removeAutoIncrementedValueByName('Armadilhas', 1);
                    break;
                case 'AMALDIÇOADO':
                    removeAutoIncrementedValueByName('Percepção', 2);
                    removeAutoIncrementedValueByName('Ocultismo', 2);
                    removeAutoIncrementedValueByName('Intimidação', 2);
                    removeAutoIncrementedValueByName('Ritualismo', 2);
                    setAutoIncrementedValueByName('Intuição', 1);
                    setAutoIncrementedValueByName('Persuasão', 1);
                    break;
                case 'AMNÉSICO':
                    clearGroups([group2], [setGroup2], 1);
                    clearGroups([group1], [setGroup1], 2);
                    break;
                case 'ARQUEOLOGISTA':
                    removeAutoIncrementedValueByName('História', 2);
                    removeAutoIncrementedValueByName('Navegação', 2);
                    removeAutoIncrementedValueByName('Investigação', 1);
                    removeAutoIncrementedProfByName('Proficiência em Arqueologia', 1);
                    break;
                case 'ARTESÃO':
                    removeAutoIncrementedValueByName('Natureza', 2);
                    removeAutoIncrementedValueByName('Percepção', 2);
                    removeAutoIncrementedValueByName('Negociação', 1);
                    handleRemoveBG("Kits", {
                        name: "Kit de Ferramentas",
                        description: "Contém martelo, chave de fenda, alicate e outros itens úteis para consertar e construir objetos.",
                        price: 25
                    }, 1)
                    setModalAberto(true);

                    break;
                case 'ASSISTENTE DE LABORATÓRIO':
                    removeAutoIncrementedValueByName('Natureza', 2);
                    removeAutoIncrementedValueByName('Alquimia', 2);
                    removeAutoIncrementedValueByName('História', 1);
                    removeAutoIncrementedValueByName('Arcanismo', 1);
                    setEspecieSelecionadaLista({})
                    break;
                case 'ASTRÔNOMO':
                    removeAutoIncrementedValueByName('Natureza', 2);
                    removeAutoIncrementedValueByName('Navegação', 2);
                    removeAutoIncrementedValueByName('História', 1);
                    removeAutoIncrementedValueByName('Percepção', 1);
                    handleRemoveBG("Equipamento Geral", { name: "Telescópio portátil", price: 1 }, 1);
                    handleRemoveBG("Equipamento Geral", { name: "Mapa das estrelas", price: 2 }, 1);
                    handleRemoveBG("Kits", {
                        name: "Kit de Cartografia",
                        description: "Inclui pergaminhos, pena, tinta e outros itens para desenhar mapas e fazer anotações.",
                        price: 30
                    }, 1)
                    break;
                case 'ATOR':
                    removeAutoIncrementedValueByName('Performance', 2);
                    removeAutoIncrementedValueByName('Persuasão', 2);
                    removeAutoIncrementedValueByName('Enganação', 1);
                    removeAutoIncrementedValueByName('Sedução', 1);
                    removeAutoIncrementedProfByName('Proficiência em Disfarce', 1);
                    handleRemoveBG("Kits", {
                        name: "Kit de Disfarces",
                        description: "Contém roupas variadas, perucas, maquiagem e outros itens para se disfarçar e passar despercebido.",
                        price: 50
                    }, 1)
                    break;
                case 'BANDIDO':
                    removeAutoIncrementedValueByName('Intimidação', 2);
                    removeAutoIncrementedValueByName('Furtividade', 2);
                    removeAutoIncrementedValueByName('Percepção', 1);
                    removeAutoIncrementedValueByName('Agilidade', 1);
                    handleRemoveBG("Kits", {
                        name: "Ferramentas de ladrão",
                        description: "Contém ferramentas especializadas, como pés de cabra, brocas manuais e chave de fenda para abrir fechaduras.",
                        price: 45
                    }, 1);
                    break;
                case 'BARBEIRO':
                    removeAutoIncrementedValueByName('Intuição', 2);
                    removeAutoIncrementedValueByName('Negociação', 2);
                    removeAutoIncrementedValueByName('Agilidade', 1);
                    removeAutoIncrementedValueByName('Destreza', 1);

                    handleRemoveBG("Kits", {
                        name: "Kit de Disfarces",
                        description: "Contém roupas variadas, perucas, maquiagem e outros itens para se disfarçar e passar despercebido.",
                        price: 50
                    }, 1)
                    break;
                case 'BATEDOR':
                    removeAutoIncrementedValueByName('Sobrevivência', 2);
                    removeAutoIncrementedValueByName('Navegação', 2);
                    removeAutoIncrementedValueByName('Furtividade', 1);
                    removeAutoIncrementedValueByName('Percepção', 1);
                    removeAutoIncrementedProfByName('Ferramentas de ladrão', 1);
                    handleRemoveBG("Kits", {
                        name: "Kit de Escalada",
                        description: "Contém cordas, mosquetões, ganchos e outros itens para escalada e rapel.",
                        price: 40
                    }, 1)
                    handleRemoveBG("Kits", {
                        name: "Kit de Explorador",
                        description: "Inclui bússola, mapa, binóculos e outros itens para exploração e orientação em território desconhecido.",
                        price: 35
                    }, 1);
                    break;
                case 'BIBLIOTECÁRIO':
                    removeAutoIncrementedValueByName('SobreviHistóriavência', 2);
                    removeAutoIncrementedValueByName('Jurisprudência', 2);
                    removeAutoIncrementedValueByName('Teologia', 1);
                    removeAutoIncrementedValueByName('Natureza', 1);
                    removeAutoIncrementedProfByName('Proficiência em Línguas Antigas', 1);
                    break;
                case 'CAÇADOR DE RECOMPENSAS':
                    removeAutoIncrementedValueByName('Rastreamento', 2);
                    removeAutoIncrementedValueByName('Investigação', 2);
                    removeAutoIncrementedValueByName('Persuasão', 1);
                    removeAutoIncrementedValueByName('Negociação', 1);
                    handleRemoveBG("Kits", {
                        name: "Kit de Explorador",
                        description: "Inclui bússola, mapa, binóculos e outros itens para exploração e orientação em território desconhecido.",
                        price: 35
                    }, 1);
                    break;
                case 'CAPANGA':
                    removeAutoIncrementedValueByName('Negociação', 2);
                    removeAutoIncrementedValueByName('Intimidação', 2);
                    removeAutoIncrementedValueByName('Fortitude', 1);
                    removeAutoIncrementedValueByName('Força', 1);
                    handleRemoveBG("Kits", {
                        name: "Ferramentas de ladrão",
                        description: "Contém ferramentas especializadas, como pés de cabra, brocas manuais e chave de fenda para abrir fechaduras.",
                        price: 45
                    }, 1);
                    break;
                case 'CARTEIRO':
                    removeAutoIncrementedValueByName('Percepção', 2);
                    removeAutoIncrementedValueByName('Navegação', 2);
                    removeAutoIncrementedValueByName('Agilidade', 1);
                    removeAutoIncrementedValueByName('Intuição', 1);
                    handleRemoveBG("Kits", {
                        name: "Kit de Explorador",
                        description: "Inclui bússola, mapa, binóculos e outros itens para exploração e orientação em território desconhecido.",
                        price: 35
                    }, 1);
                    handleRemoveBG("Kits", {
                        name: "Kit de Cartografia",
                        description: "Inclui pergaminhos, pena, tinta e outros itens para desenhar mapas e fazer anotações.",
                        price: 30
                    }, 1);
                    removeAutoIncrementedProfByName('Condução de Veículos Terrestres', 1);
                    handleRemoveBG("Montaria", { name: "Cavalo", price: 50, velocidade: "12m", carga: 270 }, 1);
                    break;
                case 'CAMPONÊS':
                    removeAutoIncrementedValueByName('Sobrevivência', 2);
                    removeAutoIncrementedValueByName(' Lidar com animais', 2);
                    removeAutoIncrementedValueByName('Fortitude', 1);
                    removeAutoIncrementedValueByName('Destreza', 1);
                    removeAutoIncrementedProfByName('Condução de Veículos Terrestres', 2);
                    break;
                case 'CHARLATÃO':
                    removeAutoIncrementedValueByName('Performance', 2);
                    removeAutoIncrementedValueByName('Enganação', 2);
                    removeAutoIncrementedValueByName('EngPersuasãoanação', 1);
                    removeAutoIncrementedValueByName('Agilidade', 1);
                    removeAutoIncrementedProfByName('Proficiência em Disfarce', 1);
                    handleRemoveBG("Kits", {
                        name: "Kit de Disfarces",
                        description: "Contém roupas variadas, perucas, maquiagem e outros itens para se disfarçar e passar despercebido.",
                        price: 50
                    }, 1);
                    break;
                case 'CIRCENSE':
                    removeAutoIncrementedValueByName('Navegação', 2);
                    removeAutoIncrementedValueByName('Performance', 2);
                    removeAutoIncrementedValueByName('Agilidade', 1);
                    removeAutoIncrementedValueByName('Acrobacia', 1);
                    setEspecieSelecionadaLista({})
                    break;
                case 'COMERCIANTE':
                    removeAutoIncrementedValueByName('Negociação', 2);
                    removeAutoIncrementedValueByName('Arcanatec', 2);
                    removeAutoIncrementedValueByName('Enganação', 1);
                    removeAutoIncrementedValueByName('Persuasão', 1);
                    handleRemoveBG("Kits", {
                        name: "Kit de Sobrevivência",
                        description: "Inclui faca, corda, fósforos, cantil e outros itens essenciais para sobreviver ao ar livre.",
                        price: 30
                    }, 1);
                    break;
                case 'CORTESÃO':
                    removeAutoIncrementedValueByName('História', 2);
                    removeAutoIncrementedValueByName('Persuasão', 2);
                    removeAutoIncrementedValueByName('Sedução', 1);
                    removeAutoIncrementedValueByName('Intuição', 1);
                    handleRemoveBG("Equipamento Geral", { name: "Vestuário fino", price: 10 }, 1);
                    break;
                case 'CURANDEIRO':
                    removeAutoIncrementedValueByName('Medicina', 2);
                    removeAutoIncrementedValueByName('Natureza', 2);
                    removeAutoIncrementedValueByName('Sobrevivência', 1);
                    removeAutoIncrementedValueByName('Alquimia', 1);
                    handleRemoveBG("Kits", {
                        name: "Kit Médico",
                        description: "Inclui bandagens, anti sépticos, tesoura médica e outros itens para primeiros socorros.",
                        price: 50
                    }, 1);
                    handleRemoveBG("Kits", {
                        name: "Kit de Herborista",
                        description: "Contém ervas medicinais, pilão, mortalha e outros itens para preparar remédios naturais.",
                        price: 20
                    }, 1);
                    break;
                case 'DETETIVE':
                    removeAutoIncrementedValueByName('Investigação', 2);
                    removeAutoIncrementedValueByName('Rastreamento', 2);
                    removeAutoIncrementedValueByName('Jurisprudência', 1);
                    removeAutoIncrementedValueByName('Intuição', 1);
                    handleRemoveBG("Kits", {
                        name: "Kit de Explorador",
                        description: "Inclui bússola, mapa, binóculos e outros itens para exploração e orientação em território desconhecido.",
                        price: 35
                    }, 1);
                    break;
                case 'EREMITA':
                    removeAutoIncrementedValueByName('Natureza', 2);
                    removeAutoIncrementedValueByName('Sobrevivência', 2);
                    removeAutoIncrementedValueByName('Furtividade', 1);
                    removeAutoIncrementedValueByName('Lidar com Animais', 1);
                    handleRemoveBG("Kits", {
                        name: "Kit de Sobrevivência",
                        description: "Inclui faca, corda, fósforos, cantil e outros itens essenciais para sobreviver ao ar livre.",
                        price: 30
                    }, 1);
                    break;
                case 'ESCUDEIRO':
                    removeAutoIncrementedValueByName('História', 2);
                    removeAutoIncrementedValueByName('Atletismo', 2);
                    removeAutoIncrementedValueByName('Fortitude', 1);
                    removeAutoIncrementedValueByName(selectedAttribute, 1);
                    handleRemoveBG("Kits", {
                        name: "Kit de Ferramentas",
                        description: "Contém martelo, chave de fenda, alicate e outros itens úteis para consertar e construir objetos.",
                        price: 25
                    }, 1)
                    break;
                case 'ESPIÃO':
                    removeAutoIncrementedValueByName('Furtividade', 2);
                    removeAutoIncrementedValueByName('Investigação', 2);
                    removeAutoIncrementedValueByName('Intuição', 1);
                    removeAutoIncrementedValueByName('Enganação', 1);
                    removeAutoIncrementedProfByName('Proficiência em Disfarce', 1);
                    handleRemoveBG("Kits", {
                        name: "Kit de Disfarces",
                        description: "Contém roupas variadas, perucas, maquiagem e outros itens para se disfarçar e passar despercebido.",
                        price: 50
                    }, 1);
                    handleRemoveBG("Kits", {
                        name: "Kit de Venenos",
                        description: "Contém frascos de veneno, luvas, aplicadores e outros itens para lidar com substâncias tóxicas.",
                        price: 70
                    }, 1)
                    break;
                case 'ESTUDANTE DE MAGIA':
                    removeAutoIncrementedValueByName('Arcanismo', 2);
                    removeAutoIncrementedValueByName('Alquimia', 2);
                    removeAutoIncrementedValueByName('Arcanatec', 1);
                    removeAutoIncrementedValueByName('Natureza', 1);
                    break;
                case 'FANÁTICO':
                    removeAutoIncrementedValueByName('Ocultismo', 2);
                    removeAutoIncrementedValueByName('Ritualismo', 2);
                    removeAutoIncrementedValueByName('Arcanismo', 1);
                    removeAutoIncrementedValueByName('Teologia', 1);
                    break;
                case 'FORASTEIRO':
                    removeAutoIncrementedValueByName('Navegação', 2);
                    removeAutoIncrementedValueByName('Sobrevivência', 2);
                    removeAutoIncrementedValueByName('História', 1);
                    removeAutoIncrementedValueByName('Negociação', 1);
                    break;
                case 'GLADIADOR':
                    removeAutoIncrementedValueByName('Atletismo', 2);
                    removeAutoIncrementedValueByName('Acrobacia', 2);
                    removeAutoIncrementedValueByName(selectedAttribute, 1);
                    removeAutoIncrementedValueByName('Fortitude', 1);
                    break;
                case 'GUARDA':
                    removeAutoIncrementedValueByName('Atletismo', 2);
                    removeAutoIncrementedValueByName('Acrobacia', 2);
                    removeAutoIncrementedProfByName(selectedProfModal, 1);
                    break;
                case 'HERDEIRO':
                    removeAutoIncrementedValueByName('Persuasão', 2);
                    removeAutoIncrementedValueByName('História', 2);
                    handleRemoveBG("Equipamento Geral", { name: "Vestuário fino", price: 10 }, 1);
                    setInicialMoney(450)
                    break;
                case 'HEROICO':
                    removeAutoIncrementedValueByName('Acrobacia', 2);
                    removeAutoIncrementedValueByName('Medicina', 2);
                    removeAutoIncrementedValueByName('Atletismo', 1);
                    removeAutoIncrementedValueByName('Agilidade', 1);
                    break;
                case 'JORNALEIRO':
                    removeAutoIncrementedValueByName('Intuição', 2);
                    removeAutoIncrementedValueByName('Investigação', 2);
                    removeAutoIncrementedValueByName('História', 1);
                    removeAutoIncrementedValueByName('Navegação', 1);
                    break;
                case 'MARUJO':
                    removeAutoIncrementedValueByName('Intuição', 2);
                    removeAutoIncrementedValueByName('Investigação', 2);
                    removeAutoIncrementedValueByName('História', 1);
                    removeAutoIncrementedValueByName('Navegação', 1);
                    removeAutoIncrementedValueByName(selectedAttribute, 1);
                    break;
                case 'MÉDICO DE BECO':
                    removeAutoIncrementedValueByName('Medicina', 2);
                    removeAutoIncrementedValueByName('Alquimia', 2);
                    removeAutoIncrementedValueByName('Furtividade', 1);
                    removeAutoIncrementedValueByName('Enganação', 1);
                    handleRemoveBG("Kits", {
                        name: "Kit de Ferramentas",
                        description: "Contém martelo, chave de fenda, alicate e outros itens úteis para consertar e construir objetos.",
                        price: 25
                    }, 1);
                    break;
                case 'MENESTREL':
                    removeAutoIncrementedValueByName('Performance', 2);
                    removeAutoIncrementedValueByName('Sedução', 2);
                    removeAutoIncrementedValueByName('Persuasão', 1);
                    removeAutoIncrementedValueByName('Enganação', 1);
                    setOpenForcaOuDex(true);
                    handleRemoveBG("Equipamento geralEquipamento Geral", { name: "Instrumento musical", price: 1 }, 1);
                    handleRemoveBG("Kits", {
                        name: "Kit de Músico",
                        description: "Inclui instrumentos musicais, partituras, cordas de reposição e outros itens para tocar música.",
                        price: 55
                    }, 1);

                    break;
                case 'MINERADOR':
                    removeAutoIncrementedValueByName('Natureza', 2);
                    removeAutoIncrementedValueByName('Navegação', 2);
                    removeAutoIncrementedValueByName('Furtividade', 1);
                    removeAutoIncrementedValueByName('Força', 1);
                    removeAutoIncrementedProfByName('Ferramentas de ladrão', 1);
                    handleRemoveBG("Kits", {
                        name: "Kit de Escalada",
                        description: "Contém cordas, mosquetões, ganchos e outros itens para escalada e rapel.",
                        price: 40
                    }, 1)
                    break;
                case 'NAVEGADOR':
                    removeAutoIncrementedValueByName('Percepção', 2);
                    removeAutoIncrementedValueByName('Navegação', 2);
                    removeAutoIncrementedValueByName('Investigação', 1);
                    removeAutoIncrementedValueByName('História', 1);

                    break;
                case 'NOBRE':
                    removeAutoIncrementedValueByName('Jurisprudência', 2);
                    removeAutoIncrementedValueByName('História', 2);
                    handleRemoveBG("Equipamento Geral", { name: "Vestuário fino", price: 10 }, 1);
                    handleRemoveBG("Montaria", { name: "Cavalo", price: 50, velocidade: "12m", carga: 270 }, 1);
                    setInicialMoney(450);
                    break;
                case 'NÔMADE':
                    removeAutoIncrementedValueByName('Lidar com animais', 2);
                    removeAutoIncrementedValueByName('Navegação', 2);
                    removeAutoIncrementedValueByName('Investigação', 1);
                    removeAutoIncrementedValueByName('Sobrevivência', 1);
                    handleRemoveBG("Kits", {
                        name: "Kit de Sobrevivência",
                        description: "Inclui faca, corda, fósforos, cantil e outros itens essenciais para sobreviver ao ar livre.",
                        price: 30
                    }, 1);
                    break;
                case 'ÓRFÃO':
                    removeAutoIncrementedValueByName('Sobrevivência', 2);
                    removeAutoIncrementedValueByName('Enganação', 2);
                    removeAutoIncrementedValueByName('Furtividade', 1);
                    removeAutoIncrementedValueByName('Agilidade', 1);
                    break;
                case 'PEREGRINO':
                    removeAutoIncrementedValueByName('Navegação', 2);
                    removeAutoIncrementedValueByName('História', 2);
                    removeAutoIncrementedValueByName('Teologia', 1);
                    removeAutoIncrementedValueByName('Percepção', 1);
                    break;
                case 'PRISIONEIRO':
                    removeAutoIncrementedValueByName('Furtividade', 2);
                    removeAutoIncrementedValueByName('Intimidação', 2);
                    removeAutoIncrementedValueByName('Jurisprudência', 1);
                    removeAutoIncrementedValueByName('Agilidade', 1);
                    break;
                case 'REFUGIADO':
                    removeAutoIncrementedValueByName('Sobrevivência', 2);
                    removeAutoIncrementedValueByName('Persuasão', 2);
                    removeAutoIncrementedValueByName('Intuição', 1);
                    removeAutoIncrementedValueByName('História', 1);
                    break;
                case 'TAVERNEIRO':
                    removeAutoIncrementedValueByName('Negociação', 2);
                    removeAutoIncrementedValueByName('Intuição', 2);
                    removeAutoIncrementedValueByName('Intimidação', 1);
                    removeAutoIncrementedValueByName('Destreza', 1);

                    break;
                default:
                    // opcional: lidar com casos não mapeados
                    break;
            }

            setAntecedenteSelecionado(null);
            return;
        }
        setAntecedenteSelecionado(antecedente);
        if (chosenAntecedentes.has(antecedente)) {
            console.log(`${antecedente.nome} já selecionado, sem incremento`);
            return;
        }
        setChosenAntecedentes(prev => new Set(prev).add(antecedente));

        switch (antecedente.nome) {
            case 'ABENÇOADO':
                setAutoIncrementedValueByName('Teologia', 2);
                setAutoIncrementedValueByName('História', 2);
                setAutoIncrementedValueByName('Intuição', 2);
                setAutoIncrementedValueByName('Ritualismo', -1);
                setAutoIncrementedValueByName('Ocultismo', -1);
                break;
            case 'ACADÊMICO':
                setAutoIncrementedValueByName('Natureza', 2);
                setAutoIncrementedValueByName('História', 2);
                setAutoIncrementedValueByName('Jurisprudência (Política e leis)', 1);
                setAutoIncrementedProfByName('Proficiência em Línguas Antigas', 1);
                break;
            case 'ACÓLITO':
                setAutoIncrementedValueByName('Teologia', 2);
                setAutoIncrementedValueByName('Jurisprudência (Política e leis)', 2);
                handleChangeShopBG("Equipamento Geral", { name: "Símbolo santo", price: 0.7 }, 1)
                setAutoIncrementedValueByName('História', 1);
                setAutoIncrementedValueByName('Intuição', 1);
                break;
            case 'ACROBATA':
                setAutoIncrementedValueByName('Acrobacia', 2);
                setAutoIncrementedValueByName('Performance', 2);
                setAutoIncrementedValueByName('Destreza', 1);
                setAutoIncrementedValueByName('Agilidade', 1);
                break;
            case 'ADESTRADOR DE ANIMAIS':
                setAutoIncrementedValueByName('Intuição', 2);
                setAutoIncrementedValueByName('Lidar com animais', 2);
                setAutoIncrementedValueByName('Natureza', 1);
                setAutoIncrementedValueByName('Armadilhas', 1);
                break;
            case 'AMALDIÇOADO':
                setAutoIncrementedValueByName('Percepção', 2);
                setAutoIncrementedValueByName('Ocultismo', 2);
                setAutoIncrementedValueByName('Intimidação', 2);
                setAutoIncrementedValueByName('Ritualismo', 2);
                setAutoIncrementedValueByName('Intuição', -1);
                setAutoIncrementedValueByName('Persuasão', -1);
                break;
            case 'AMNÉSICO':
                setOpen(true);
                break;
            case 'ARQUEOLOGISTA':
                setAutoIncrementedValueByName('História', 2);
                setAutoIncrementedValueByName('Navegação', 2);
                setAutoIncrementedValueByName('Investigação', 1);
                setAutoIncrementedProfByName('Proficiência em Arqueologia', 1);
                break;
            case 'ARTESÃO':
                setAutoIncrementedValueByName('Natureza', 2);
                setAutoIncrementedValueByName('Percepção', 2);
                setAutoIncrementedValueByName('Negociação', 1);
                handleChangeShopBG("Kits", {
                    name: "Kit de Ferramentas",
                    description: "Contém martelo, chave de fenda, alicate e outros itens úteis para consertar e construir objetos.",
                    price: 25
                }, 1)
                setModalAberto(true);

                break;
            case 'ASSISTENTE DE LABORATÓRIO':
                setAutoIncrementedValueByName('Natureza', 2);
                setAutoIncrementedValueByName('Alquimia', 2);
                setAutoIncrementedValueByName('História', 1);
                setAutoIncrementedValueByName('Arcanismo', 1);
                setOpenMutatioModal(true)
                break;
            case 'ASTRÔNOMO':
                setAutoIncrementedValueByName('Natureza', 2);
                setAutoIncrementedValueByName('Navegação', 2);
                setAutoIncrementedValueByName('História', 1);
                setAutoIncrementedValueByName('Percepção', 1);
                handleChangeShopBG("Equipamento Geral", { name: "Telescópio portátil", price: 1 }, 1);
                handleChangeShopBG("Equipamento Geral", { name: "Mapa das estrelas", price: 2 }, 1);
                handleChangeShopBG("Kits", {
                    name: "Kit de Cartografia",
                    description: "Inclui pergaminhos, pena, tinta e outros itens para desenhar mapas e fazer anotações.",
                    price: 30
                }, 1)
                break;
            case 'ATOR':
                setAutoIncrementedValueByName('Performance', 2);
                setAutoIncrementedValueByName('Persuasão', 2);
                setAutoIncrementedValueByName('Enganação', 1);
                setAutoIncrementedValueByName('Sedução', 1);
                setAutoIncrementedProfByName('Proficiência em Disfarce', 1);
                handleChangeShopBG("Kits", {
                    name: "Kit de Disfarces",
                    description: "Contém roupas variadas, perucas, maquiagem e outros itens para se disfarçar e passar despercebido.",
                    price: 50
                }, 1)
                break;
            case 'BANDIDO':
                setAutoIncrementedValueByName('Intimidação', 2);
                setAutoIncrementedValueByName('Furtividade', 2);
                setAutoIncrementedValueByName('Percepção', 1);
                setAutoIncrementedValueByName('Agilidade', 1);
                handleChangeShopBG("Kits", {
                    name: "Ferramentas de ladrão",
                    description: "Contém ferramentas especializadas, como pés de cabra, brocas manuais e chave de fenda para abrir fechaduras.",
                    price: 45
                }, 1);
                break;
            case 'BARBEIRO':
                setAutoIncrementedValueByName('Intuição', 2);
                setAutoIncrementedValueByName('Negociação', 2);
                setAutoIncrementedValueByName('Agilidade', 1);
                setAutoIncrementedValueByName('Destreza', 1);

                handleChangeShopBG("Kits", {
                    name: "Kit de Disfarces",
                    description: "Contém roupas variadas, perucas, maquiagem e outros itens para se disfarçar e passar despercebido.",
                    price: 50
                }, 1)
                break;
            case 'BATEDOR':
                setAutoIncrementedValueByName('Sobrevivência', 2);
                setAutoIncrementedValueByName('Navegação', 2);
                setAutoIncrementedValueByName('Furtividade', 1);
                setAutoIncrementedValueByName('Percepção', 1);
                setAutoIncrementedProfByName('Ferramentas de ladrão', 1);
                handleChangeShopBG("Kits", {
                    name: "Kit de Escalada",
                    description: "Contém cordas, mosquetões, ganchos e outros itens para escalada e rapel.",
                    price: 40
                }, 1)
                handleChangeShopBG("Kits", {
                    name: "Kit de Explorador",
                    description: "Inclui bússola, mapa, binóculos e outros itens para exploração e orientação em território desconhecido.",
                    price: 35
                }, 1);
                break;
            case 'BIBLIOTECÁRIO':
                setAutoIncrementedValueByName('SobreviHistóriavência', 2);
                setAutoIncrementedValueByName('Jurisprudência', 2);
                setAutoIncrementedValueByName('Teologia', 1);
                setAutoIncrementedValueByName('Natureza', 1);
                setAutoIncrementedProfByName('Proficiência em Línguas Antigas', 1);
                break;
            case 'CAÇADOR DE RECOMPENSAS':
                setAutoIncrementedValueByName('Rastreamento', 2);
                setAutoIncrementedValueByName('Investigação', 2);
                setAutoIncrementedValueByName('Persuasão', 1);
                setAutoIncrementedValueByName('Negociação', 1);
                handleChangeShopBG("Kits", {
                    name: "Kit de Explorador",
                    description: "Inclui bússola, mapa, binóculos e outros itens para exploração e orientação em território desconhecido.",
                    price: 35
                }, 1);
                break;
            case 'CAPANGA':
                setAutoIncrementedValueByName('Negociação', 2);
                setAutoIncrementedValueByName('Intimidação', 2);
                setAutoIncrementedValueByName('Fortitude', 1);
                setAutoIncrementedValueByName('Força', 1);
                handleChangeShopBG("Kits", {
                    name: "Ferramentas de ladrão",
                    description: "Contém ferramentas especializadas, como pés de cabra, brocas manuais e chave de fenda para abrir fechaduras.",
                    price: 45
                }, 1);
                break;
            case 'CARTEIRO':
                setAutoIncrementedValueByName('Percepção', 2);
                setAutoIncrementedValueByName('Navegação', 2);
                setAutoIncrementedValueByName('Agilidade', 1);
                setAutoIncrementedValueByName('Intuição', 1);
                handleChangeShopBG("Kits", {
                    name: "Kit de Explorador",
                    description: "Inclui bússola, mapa, binóculos e outros itens para exploração e orientação em território desconhecido.",
                    price: 35
                }, 1);
                handleChangeShopBG("Kits", {
                    name: "Kit de Cartografia",
                    description: "Inclui pergaminhos, pena, tinta e outros itens para desenhar mapas e fazer anotações.",
                    price: 30
                }, 1);
                setAutoIncrementedProfByName('Condução de Veículos Terrestres', 1);
                handleChangeShopBG("Montaria", { name: "Cavalo", price: 50, velocidade: "12m", carga: 270 }, 1);
                break;
            case 'CAMPONÊS':
                setAutoIncrementedValueByName('Sobrevivência', 2);
                setAutoIncrementedValueByName(' Lidar com animais', 2);
                setAutoIncrementedValueByName('Fortitude', 1);
                setAutoIncrementedValueByName('Destreza', 1);
                setAutoIncrementedProfByName('Condução de Veículos Terrestres', 2);
                break;
            case 'CHARLATÃO':
                setAutoIncrementedValueByName('Performance', 2);
                setAutoIncrementedValueByName('Enganação', 2);
                setAutoIncrementedValueByName('EngPersuasãoanação', 1);
                setAutoIncrementedValueByName('Agilidade', 1);
                setAutoIncrementedProfByName('Proficiência em Disfarce', 1);
                handleChangeShopBG("Kits", {
                    name: "Kit de Disfarces",
                    description: "Contém roupas variadas, perucas, maquiagem e outros itens para se disfarçar e passar despercebido.",
                    price: 50
                }, 1);
                break;
            case 'CIRCENSE':
                setAutoIncrementedValueByName('Navegação', 2);
                setAutoIncrementedValueByName('Performance', 2);
                setAutoIncrementedValueByName('Agilidade', 1);
                setAutoIncrementedValueByName('Acrobacia', 1);
                setOpenMutatioModal(true)
                break;
            case 'COMERCIANTE':
                setAutoIncrementedValueByName('Negociação', 2);
                setAutoIncrementedValueByName('Arcanatec', 2);
                setAutoIncrementedValueByName('Enganação', 1);
                setAutoIncrementedValueByName('Persuasão', 1);
                handleChangeShopBG("Kits", {
                    name: "Kit de Sobrevivência",
                    description: "Inclui faca, corda, fósforos, cantil e outros itens essenciais para sobreviver ao ar livre.",
                    price: 30
                }, 1);
                break;
            case 'CORTESÃO':
                setAutoIncrementedValueByName('História', 2);
                setAutoIncrementedValueByName('Persuasão', 2);
                setAutoIncrementedValueByName('Sedução', 1);
                setAutoIncrementedValueByName('Intuição', 1);
                handleChangeShopBG("Equipamento Geral", { name: "Vestuário fino", price: 10 }, 1);
                break;
            case 'CURANDEIRO':
                setAutoIncrementedValueByName('Medicina', 2);
                setAutoIncrementedValueByName('Natureza', 2);
                setAutoIncrementedValueByName('Sobrevivência', 1);
                setAutoIncrementedValueByName('Alquimia', 1);
                handleChangeShopBG("Kits", {
                    name: "Kit Médico",
                    description: "Inclui bandagens, anti sépticos, tesoura médica e outros itens para primeiros socorros.",
                    price: 50
                }, 1);
                handleChangeShopBG("Kits", {
                    name: "Kit de Herborista",
                    description: "Contém ervas medicinais, pilão, mortalha e outros itens para preparar remédios naturais.",
                    price: 20
                }, 1);
                break;
            case 'DETETIVE':
                setAutoIncrementedValueByName('Investigação', 2);
                setAutoIncrementedValueByName('Rastreamento', 2);
                setAutoIncrementedValueByName('Jurisprudência', 1);
                setAutoIncrementedValueByName('Intuição', 1);
                handleChangeShopBG("Kits", {
                    name: "Kit de Explorador",
                    description: "Inclui bússola, mapa, binóculos e outros itens para exploração e orientação em território desconhecido.",
                    price: 35
                }, 1);
                break;
            case 'EREMITA':
                setAutoIncrementedValueByName('Natureza', 2);
                setAutoIncrementedValueByName('Sobrevivência', 2);
                setAutoIncrementedValueByName('Furtividade', 1);
                setAutoIncrementedValueByName('Lidar com Animais', 1);
                handleChangeShopBG("Kits", {
                    name: "Kit de Sobrevivência",
                    description: "Inclui faca, corda, fósforos, cantil e outros itens essenciais para sobreviver ao ar livre.",
                    price: 30
                }, 1);
                break;
            case 'ESCUDEIRO':
                setAutoIncrementedValueByName('História', 2);
                setAutoIncrementedValueByName('Atletismo', 2);
                setAutoIncrementedValueByName('Fortitude', 1);
                setOpenForcaOuDex(true);
                handleChangeShopBG("Kits", {
                    name: "Kit de Ferramentas",
                    description: "Contém martelo, chave de fenda, alicate e outros itens úteis para consertar e construir objetos.",
                    price: 25
                }, 1)
                break;
            case 'ESPIÃO':
                setAutoIncrementedValueByName('Furtividade', 2);
                setAutoIncrementedValueByName('Investigação', 2);
                setAutoIncrementedValueByName('Intuição', 1);
                setAutoIncrementedValueByName('Enganação', 1);
                setAutoIncrementedProfByName('Proficiência em Disfarce', 1);
                handleChangeShopBG("Kits", {
                    name: "Kit de Disfarces",
                    description: "Contém roupas variadas, perucas, maquiagem e outros itens para se disfarçar e passar despercebido.",
                    price: 50
                }, 1);
                handleChangeShopBG("Kits", {
                    name: "Kit de Venenos",
                    description: "Contém frascos de veneno, luvas, aplicadores e outros itens para lidar com substâncias tóxicas.",
                    price: 70
                }, 1)
                break;
            case 'ESTUDANTE DE MAGIA':
                setAutoIncrementedValueByName('Arcanismo', 2);
                setAutoIncrementedValueByName('Alquimia', 2);
                setAutoIncrementedValueByName('Arcanatec', 1);
                setAutoIncrementedValueByName('Natureza', 1);
                break;
            case 'FANÁTICO':
                setAutoIncrementedValueByName('Ocultismo', 2);
                setAutoIncrementedValueByName('Ritualismo', 2);
                setAutoIncrementedValueByName('Arcanismo', 1);
                setAutoIncrementedValueByName('Teologia', 1);
                break;
            case 'FORASTEIRO':
                setAutoIncrementedValueByName('Navegação', 2);
                setAutoIncrementedValueByName('Sobrevivência', 2);
                setAutoIncrementedValueByName('História', 1);
                setAutoIncrementedValueByName('Negociação', 1);
                break;
            case 'GLADIADOR':
                setAutoIncrementedValueByName('Atletismo', 2);
                setAutoIncrementedValueByName('Acrobacia', 2);
                setOpenForcaOuDex(true);
                setAutoIncrementedValueByName('Fortitude', 1);
                break;
            case 'GUARDA':
                setAutoIncrementedValueByName('Atletismo', 2);
                setAutoIncrementedValueByName('Acrobacia', 2);
                setOpenProfEsgrimaOuArmadura(true);
                break;
            case 'HERDEIRO':
                setAutoIncrementedValueByName('Persuasão', 2);
                setAutoIncrementedValueByName('História', 2);
                handleChangeShopBG("Equipamento Geral", { name: "Vestuário fino", price: 10 }, 1);
                setInicialMoney(650)
                break;
            case 'HEROICO':
                setAutoIncrementedValueByName('Acrobacia', 2);
                setAutoIncrementedValueByName('Medicina', 2);
                setAutoIncrementedValueByName('Atletismo', 1);
                setAutoIncrementedValueByName('Agilidade', 1);
                break;
            case 'JORNALEIRO':
                setAutoIncrementedValueByName('Intuição', 2);
                setAutoIncrementedValueByName('Investigação', 2);
                setAutoIncrementedValueByName('História', 1);
                setAutoIncrementedValueByName('Navegação', 1);
                break;
            case 'MARUJO':
                setAutoIncrementedValueByName('Intuição', 2);
                setAutoIncrementedValueByName('Investigação', 2);
                setAutoIncrementedValueByName('História', 1);
                setAutoIncrementedValueByName('Navegação', 1);
                setOpenForcaOuDex(true);
                break;
            case 'MÉDICO DE BECO':
                setAutoIncrementedValueByName('Medicina', 2);
                setAutoIncrementedValueByName('Alquimia', 2);
                setAutoIncrementedValueByName('Furtividade', 1);
                setAutoIncrementedValueByName('Enganação', 1);
                setOpenForcaOuDex(true);
                handleChangeShopBG("Kits", {
                    name: "Kit de Ferramentas",
                    description: "Contém martelo, chave de fenda, alicate e outros itens úteis para consertar e construir objetos.",
                    price: 25
                }, 1);
                break;
            case 'MENESTREL':
                setAutoIncrementedValueByName('Performance', 2);
                setAutoIncrementedValueByName('Sedução', 2);
                setAutoIncrementedValueByName('Persuasão', 1);
                setAutoIncrementedValueByName('Enganação', 1);
                setOpenForcaOuDex(true);
                handleChangeShopBG("Equipamento geralEquipamento Geral", { name: "Instrumento musical", price: 1 }, 1);
                handleChangeShopBG("Kits", {
                    name: "Kit de Músico",
                    description: "Inclui instrumentos musicais, partituras, cordas de reposição e outros itens para tocar música.",
                    price: 55
                }, 1);

                break;
            case 'MINERADOR':
                setAutoIncrementedValueByName('Natureza', 2);
                setAutoIncrementedValueByName('Navegação', 2);
                setAutoIncrementedValueByName('Furtividade', 1);
                setAutoIncrementedValueByName('Força', 1);
                setAutoIncrementedProfByName('Ferramentas de ladrão', 1);
                handleChangeShopBG("Kits", {
                    name: "Kit de Escalada",
                    description: "Contém cordas, mosquetões, ganchos e outros itens para escalada e rapel.",
                    price: 40
                }, 1)
                break;
            case 'NAVEGADOR':
                setAutoIncrementedValueByName('Percepção', 2);
                setAutoIncrementedValueByName('Navegação', 2);
                setAutoIncrementedValueByName('Investigação', 1);
                setAutoIncrementedValueByName('História', 1);

                break;
            case 'NOBRE':
                setAutoIncrementedValueByName('Jurisprudência', 2);
                setAutoIncrementedValueByName('História', 2);
                handleChangeShopBG("Equipamento Geral", { name: "Vestuário fino", price: 10 }, 1);
                handleChangeShopBG("Montaria", { name: "Cavalo", price: 50, velocidade: "12m", carga: 270 }, 1);
                setInicialMoney(600);
                break;
            case 'NÔMADE':
                setAutoIncrementedValueByName('Lidar com animais', 2);
                setAutoIncrementedValueByName('Navegação', 2);
                setAutoIncrementedValueByName('Investigação', 1);
                setAutoIncrementedValueByName('Sobrevivência', 1);
                handleChangeShopBG("Kits", {
                    name: "Kit de Sobrevivência",
                    description: "Inclui faca, corda, fósforos, cantil e outros itens essenciais para sobreviver ao ar livre.",
                    price: 30
                }, 1);
                break;
            case 'ÓRFÃO':
                setAutoIncrementedValueByName('Sobrevivência', 2);
                setAutoIncrementedValueByName('Enganação', 2);
                setAutoIncrementedValueByName('Furtividade', 1);
                setAutoIncrementedValueByName('Agilidade', 1);
                break;
            case 'PEREGRINO':
                setAutoIncrementedValueByName('Navegação', 2);
                setAutoIncrementedValueByName('História', 2);
                setAutoIncrementedValueByName('Teologia', 1);
                setAutoIncrementedValueByName('Percepção', 1);
                break;
            case 'PRISIONEIRO':
                setAutoIncrementedValueByName('Furtividade', 2);
                setAutoIncrementedValueByName('Intimidação', 2);
                setAutoIncrementedValueByName('Jurisprudência', 1);
                setAutoIncrementedValueByName('Agilidade', 1);
                break;
            case 'REFUGIADO':
                setAutoIncrementedValueByName('Sobrevivência', 2);
                setAutoIncrementedValueByName('Persuasão', 2);
                setAutoIncrementedValueByName('Intuição', 1);
                setAutoIncrementedValueByName('História', 1);
                break;
            case 'TAVERNEIRO':
                setAutoIncrementedValueByName('Negociação', 2);
                setAutoIncrementedValueByName('Intuição', 2);
                setAutoIncrementedValueByName('Intimidação', 1);
                setAutoIncrementedValueByName('Destreza', 1);

                break;
            default:
                // opcional: lidar com casos não mapeados
                break;
        }

    };
    
    // Função de validação com regex
    const validateForm = () => {
        const errors = {};
        
        // Validar nome do personagem
        if (!charName || charName.trim() === '') {
            errors.nome = 'Nome do personagem é obrigatório';
        } else if (!validationPatterns.nome.test(charName)) {
            errors.nome = 'Nome deve conter apenas letras, espaços, hífens e apóstrofos (2-50 caracteres)';
        }
        
        // Validar descrição (opcional, mas com limite)
        if (charDiscription && !validationPatterns.descricao.test(charDiscription)) {
            errors.descricao = 'Descrição não pode exceder 2000 caracteres';
        }
        
        // Validar gênero
        if (!gender || gender.trim() === '') {
            errors.genero = 'Gênero é obrigatório';
        }
        
        // Validar espécie
        if (!especieSelecionada) {
            errors.especie = 'Espécie é obrigatória';
        }
        
        // Validar antecedente
        if (!antecedenteSelecionado) {
            errors.antecedente = 'Antecedente é obrigatório';
        }
        
        // Validar regalias de aprendiz
        if (RegaliasDeAprendiz.length === 0) {
            errors.regalias = 'Selecione pelo menos uma regalia de aprendiz';
        }
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };
    
    const handleCriarPersonagem = async () => {
        // Validar formulário
        if (!validateForm()) {
            setSnackbar({ 
                open: true, 
                message: 'Por favor, corrija os erros no formulário', 
                severity: 'error' 
            });
            return;
        }
        
        setIsSubmitting(true);
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.id;
        
        if (!userId) {
            setSnackbar({ 
                open: true, 
                message: 'Usuário não autenticado. Faça login novamente.', 
                severity: 'error' 
            });
            setIsSubmitting(false);
            return;
        }

        const payload = {
            nome_personagem: charName.trim(),
            classe: '',
            image: image,
            nível: 1,
            pontos_de_regalia: pontosDeRegalia,
            genero: gender,
            dinheiro: finallMoney,
            idade: age,
            altura: altura,
            descricao: charDiscription?.trim() || '',
            antecedente: antecedenteSelecionado,
            habilidades: allValues,
            condições: {},
            proficiencias: values,
            especie: especieSelecionada,
            regalias_de_especie: [especieSelecionadaLista, regaliaEscolhida],
            regalias_de_aprendiz: { RegaliasDeAprendizSelecionada },
            regalias_de_classe: {
            },
            regalias_de_especialization: {
            },
            regalias_de_profissao: [professionReg],
            equipamentos: selectedItems
        };

        try {
            const response = await fetch(`${baseUrl}/users/${userId}/personagens`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                setSnackbar({ 
                    open: true, 
                    message: `Personagem "${charName}" criado com sucesso! (ID: ${data.id})`, 
                    severity: 'success' 
                });
                setTimeout(() => handleNavigateToCharPage(), 1500);
            } else {
                // Tratamento de erros específicos do backend
                let errorMessage = 'Erro ao criar personagem';
                if (data.error) {
                    // Verificar padrões de erro comuns
                    if (/nome.*já.*existe/i.test(data.error)) {
                        errorMessage = 'Já existe um personagem com este nome';
                    } else if (/inválid[oa]/i.test(data.error)) {
                        errorMessage = 'Dados inválidos: ' + data.error;
                    } else if (/obrigatóri[oa]/i.test(data.error)) {
                        errorMessage = 'Campo obrigatório faltando: ' + data.error;
                    } else {
                        errorMessage = data.error;
                    }
                }
                setSnackbar({ open: true, message: errorMessage, severity: 'error' });
            }
        } catch (error) {
            console.error('Erro de requisição:', error);
            let errorMessage = 'Erro de conexão com o servidor';
            if (/network/i.test(error.message)) {
                errorMessage = 'Sem conexão com o servidor. Verifique sua internet.';
            } else if (/timeout/i.test(error.message)) {
                errorMessage = 'A requisição demorou muito. Tente novamente.';
            }
            setSnackbar({ open: true, message: errorMessage, severity: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };
    const totalUsed = Object.values(valuesPoints).reduce((sum, v) => sum + v, 0);
    const remainingPoints = Math.max(0, MAX_PROF_POINTS - totalUsed);
    const fileInputRef = useRef();
    const handleToggle = (profissao, habNome) => {
        const id = `${profissao}::${habNome}`;
        let profession = {};

        const isSelected = selectedId === id; // estado atual da seleção

        if (id) {
            profession = profissao && habNome ? {
                nome: profissao,
                habilidades: habNome
            } : {};
        }

        setSelectedId(isSelected ? '' : id);
        setProfessionReg(isSelected ? {} : profession);

        if (habNome !== 'Abrir Fechaduras') {
            removeAutoIncrementedProfByName("Ferramentas de ladrão", 2);
        }
        if (habNome === 'Abrir Fechaduras') {
            if (isSelected) {

                removeAutoIncrementedProfByName("Ferramentas de ladrão", 2);
            } else {

                setAutoIncrementedProfByName("Ferramentas de ladrão", 2);
            }
        }
    };

    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };
    const handleChangeShop = (category, item) => {
        const key = `${category}-${item.name}`;
        const index = selectedItems.findIndex(i => i.key === key);

        if (index !== -1) {
            const existingItem = selectedItems[index];
            const newTotal = totalSpent() + item.price;
            if (newTotal <= goldLimit) {
                const updatedItems = [...selectedItems];
                updatedItems[index] = {
                    ...existingItem,
                    quantity: existingItem.quantity + 1
                };
                setSelectedItems(updatedItems);
                setFinallMoney(`${goldLimit - newTotal}`)

            }
        } else {
            const newTotal = totalSpent() + item.price;
            if (newTotal <= goldLimit) {
                setSelectedItems(prev => [...prev, {
                    key,
                    category,
                    ...item,
                    quantity: 1
                }]);
                setFinallMoney(`${goldLimit - newTotal}`)
            }

        }

    };
    const handleChangeShopBG = (category, item, qtd) => {
        const key = `${category}-${item.name}`;
        const index = selectedItemsBG.findIndex(i => i.key === key);

        if (index !== -1) {
            const existingItem = selectedItemsBG[index];
            const newTotal = totalSpent() + item.price;
            if (newTotal <= goldLimit) {
                const updatedItems = [...selectedItemsBG];
                updatedItems[index] = {
                    ...existingItem,
                    quantity: existingItem.quantity + 1
                };
                setSelectedItemsBG(updatedItems);


            }
        } else {
            const newTotal = totalSpent() + item.price;
            if (newTotal <= goldLimit) {
                setSelectedItemsBG(prev => [...prev, {
                    key,
                    category,
                    ...item,
                    quantity: qtd
                }]);
            }

        }
        console.log(index);
    };
    const handleRemove = (item) => {
        const index = selectedItems.findIndex(i => i.key === item.key);
        const newTotal = item.price;
        if (index !== -1) {
            const updatedItems = [...selectedItems];
            if (updatedItems[index].quantity > 1) {
                updatedItems[index].quantity -= 1;

                // setFinallMoney(`${goldLimit}`)
            } else {
                updatedItems.splice(index, 1);


            }
            setSelectedItems(updatedItems);
            var itemReturned = parseInt(finallMoney) + newTotal;
            setFinallMoney(`${itemReturned}`)

        }
    };

    const handleRemoveBG = (item) => {
        const index = selectedItemsBG.findIndex(i => i.key === item.key);

        const updatedItems = [...selectedItemsBG];
        updatedItems.splice(index, 1);
        setSelectedItemsBG(updatedItems);
        console.log(updatedItems);
        console.log(index);

    };
    const totalSpent = () => selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const processFile = (file) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        processFile(e.dataTransfer.files[0]);
    }, []);
    const handleDragOver = (e) => {
        e.preventDefault();
    };
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = (e) => {
        processFile(e.target.files[0]);
    };
    const handleAgeChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (value >= 18) {
            setAge(value);
        } else {
            setAge(18);
        }
    };
    const handleChange = (event) => {
        setEspecieSelecionada(event.target.value);
    };
    const handleRegaliasUpdate = ({ regalias, comprada }) => {
        const selecionadas = {};
        regalias.forEach(reg => {
            const item = regaliasDeAprendiz.find(regD => reg === regD.id);
            if (item) {
                selecionadas[reg] = item;
            }
        });
        setRegaliasDeAprendizSelecionada(selecionadas);
    };
    const ProfBox = ({ nome, descricao, notas, niveis, value, onChange, remainingPoints, borderColor = '#7B3311' }) => (
        <Paper
            elevation={3}
            sx={{ padding: 2, mx: 0, width: '24.5%', my: 1, borderBottom: `6px solid ${borderColor}` }}
        >
            <Tooltip 
                title={descricao} 
                placement="top" 
                arrow
                enterDelay={300}
            >
                <Typography variant="h6" gutterBottom sx={{ cursor: 'help' }}>
                    {nome}
                </Typography>
            </Tooltip>
            <Typography variant="body2" gutterBottom>
                {descricao}
            </Typography>
            {notas?.length > 0 && (
                <Box mb={1}>
                    {notas.map((nota, idx) => (
                        <Typography key={idx} variant="caption" display="block">
                            • {nota}
                        </Typography>
                    ))}
                </Box>
            )}
            <Box display="flex" alignItems="center" gap={1} mt={1}>
                <TextField
                    label="Nível"
                    type="number"
                    size="small"
                    value={value}
                    onChange={(e) => {
                        (onChange(nome, parseInt(e.target.value) || 0)); console.log(e.target.value);
                    }}
                    inputProps={{ min: 0, max: niveis.length, step: 1 }}
                    sx={{ width: '80px' }}
                />
                <Typography variant="body2" color={remainingPoints === 0 ? 'error' : 'textSecondary'}>
                    Restam: {remainingPoints}
                </Typography>
            </Box>
            <Box display="flex" flexDirection="column" gap={1} mt={1}>
                {niveis.map(({ nivel, descricao: nivelDesc }) => (
                    <Tooltip 
                        key={nivel}
                        title={
                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                    Nível {nivel}
                                </Typography>
                                <Typography variant="body2">
                                    {nivelDesc}
                                </Typography>
                                {value < nivel && (
                                    <Typography variant="caption" sx={{ color: '#ffb74d', display: 'block', mt: 1 }}>
                                        ⚠️ Você precisa de {nivel - value} ponto(s) a mais para desbloquear
                                    </Typography>
                                )}
                            </Box>
                        }
                        placement="right"
                        arrow
                        enterDelay={200}
                    >
                        <Typography
                            variant="body2"
                            sx={{ 
                                opacity: value >= nivel ? 1 : 0.5,
                                cursor: 'help',
                                '&:hover': { 
                                    backgroundColor: value >= nivel ? 'rgba(187, 129, 48, 0.1)' : 'rgba(0,0,0,0.05)',
                                    borderRadius: 1,
                                    px: 0.5
                                }
                            }}
                        >
                            {nivel}. {nivelDesc}
                        </Typography>
                    </Tooltip>
                ))}
            </Box>
        </Paper>
    );
    const handleProficienciaChange = (nome, newVal) => {
        const prof = proficiencias.find(p => p.nome === nome);
        const maxNiveis = prof.niveis.length;
        newVal = Math.max(0, Math.min(newVal, maxNiveis));
        const prevVal = values[nome] || 0;
        const prevPoints = valuesPoints[nome] || 0;

        // Determina se é incremento ou decremento
        const step = newVal > prevVal ? 1 : newVal < prevVal ? -1 : 0;
        if (step === 0) return; // sem mudança

        // 1) Atualiza o valor bruto, mas nunca abaixo de 0 nem acima de maxNiveis
        let updatedVal = prevVal + step;
        updatedVal = Math.max(0, Math.min(updatedVal, maxNiveis));

        // 2) Calcula diferença de pontos (sempre de 1 em 1)
        let updatedPoints = prevPoints + step;
        updatedPoints = Math.max(0, updatedPoints);

        // 3) Se o valor bruto bateu em maxNiveis e houve "estouro", tira do points
        if (updatedVal === maxNiveis && prevVal + step > maxNiveis) {
            // houve tentativa de ultrapassar
            const excedente = (prevVal + step) - maxNiveis;
            updatedPoints = Math.max(0, updatedPoints - excedente);
        }
        const extra = autoIncrementedProfValues[nome] || 0;
        const newCusto = calculateCustoEscalonado(newVal - extra);
        const prevCusto = calculateCustoEscalonado(prevVal - extra);
        const deltaCusto = newCusto - prevCusto;
        const getTotalUsed = () => {
            return Object.entries(values).reduce((acc, [title, val]) => {
                const auto = autoIncrementedProfValues[title] || 0;
                return acc + calculateCustoEscalonado(val - auto);
            }, 0);
        };
        if (deltaCusto <= 0 || (getTotalUsed() + deltaCusto <= 4)) {
            setValues(v => ({ ...v, [nome]: updatedVal }));
            setValuesPoints(p => ({ ...p, [nome]: updatedPoints }));
        }
    };

    const ajustarDiscrepancia = () => {
        const novosValues = { ...values };
        const novosPoints = { ...valuesPoints };

        proficiencias.forEach(({ nome, niveis }) => {
            const maxNiveis = niveis.length;
            const val = novosValues[nome] || 0;
            const pts = novosPoints[nome] || 0;

            // Se o value for maior que maxNiveis, corrige
            if (val > maxNiveis) {
                const excedente = val - maxNiveis;
                novosValues[nome] = maxNiveis;
                // subtrai o excedente de pontos (sem ficar abaixo de zero)
                novosPoints[nome] = Math.max(0, pts - excedente);
            }

            // Se os pontos forem negativos, corrige para zero
            if (novosPoints[nome] < 0) {
                novosPoints[nome] = 0;
            }
        });

        setValues(novosValues);
        setValuesPoints(novosPoints);
    };

    const AtributoBox = ({ title, data, values, onChange, remainingPoints, borderColor = "#7B3311", onCheckboxClick, isChecked }) => {
        const handleCheckboxChange = () => {
            onCheckboxClick(data, title, !isChecked);
        };

        return (
            <Paper
                elevation={3}
                sx={{
                    padding: 2,
                    mx: 0,
                    width: "19.5%",
                    my: 1,
                    borderBottom: `10px solid ${borderColor}`
                }}
            >
                <Typography variant="h6" gutterBottom className="esteban" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    {title}
                    <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
                </Typography>
                <Typography
                    variant="body2"
                    color={remainingPoints === 0 ? "error" : "textSecondary"}
                    className="bigBoxTextClasses"
                >
                    Pontos restantes: {remainingPoints}
                </Typography>
                <Box display="flex" flexDirection="column" gap={2} mt={1}>
                    {data.map((item, index) => (
                        <Box
                            key={index}
                            gap={2}
                            sx={{
                                justifyContent: "space-around",
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            <Tooltip title={item.description} arrow placement="right">
                                <Typography sx={{ width: "200px", textAlign: "start" }} className="bigBoxTextClasses">
                                    {item.title}
                                </Typography>
                            </Tooltip>
                            <TextField
                                label="Valor"
                                type="number"
                                size="small"
                                value={values[item.title]}
                                onChange={(e) => onChange(item.title, e.target.value)}
                                sx={{ width: "100px" }}
                                inputProps={{
                                    min: 0,
                                    max: values[item.title] + remainingPoints
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            </Paper>
        );
    };
    const calculateCustoEscalonado = (valor) => {
        let custo = 0;
        for (let i = 1; i <= valor; i++) {
            if (i <= 4) custo += 1;
            else if (i === 5) custo += 2;
            else if (i === 6) custo += 3;
            else custo += 4;
        }
        return custo;
    };
    const AtributoContainer = () => {

        const getTotalUsed = () => {
            return Object.entries(allValues).reduce((acc, [title, val]) => {
                const auto = autoIncrementedValues[title] || 0;
                return acc + calculateCustoEscalonado(val - auto);
            }, 0);
        };

        const remainingPoints = MAX_POINTS - getTotalUsed();

        const handleChange = (title, newValue) => {
            newValue = parseInt(newValue) || 0;
            const auto = autoIncrementedValues[title] || 0;

            if (newValue < auto) return;

            setAllValues((prev) => {
                const previousValue = prev[title];
                const newCusto = calculateCustoEscalonado(newValue - auto);
                const prevCusto = calculateCustoEscalonado(previousValue - auto);
                const deltaCusto = newCusto - prevCusto;

                if (deltaCusto <= 0 || (getTotalUsed() + deltaCusto <= MAX_POINTS)) {
                    return { ...prev, [title]: newValue };
                }

                return prev;
            });
            console.log(allValues);
        };
        const updateCounts = (itemTitle, incrementar) => {
            setAutoIncrementedValues(prevAuto => {
                const current = prevAuto[itemTitle] || 0;
                const updatedAuto = incrementar ? current + 1 : current - 1;

                // Assim que obtivermos o novo auto-incremento, recalculamos allValues
                setAllValues(prevAll => {
                    // extraímos o “manual” anterior: toda diferença não-vinda do auto
                    const totalPrev = prevAll[itemTitle] || 0;
                    const manualPrev = totalPrev - current;
                    // mantemos o manual igual e somamos o novo auto
                    return {
                        ...prevAll,
                        [itemTitle]: manualPrev + updatedAuto
                    };
                });

                return { ...prevAuto, [itemTitle]: updatedAuto };
            });
        };
        const handleCheckboxClick = (grupoData, grupoTitle, novoStatus) => {
            setCheckedOrder(prevOrder => {
                let newOrder = [...prevOrder];
                let removedGrupo = null;

                if (novoStatus) {
                    // Se já há 2 ativos, removemos o mais antigo
                    if (newOrder.length >= 2) {
                        removedGrupo = newOrder.shift();
                    }
                    newOrder.push(grupoTitle);
                } else {
                    // Desmarcando manualmente
                    newOrder = newOrder.filter(title => title !== grupoTitle);
                }

                // Se precisou remover um grupo por excesso, desfazemos o incremento dele
                if (removedGrupo) {
                    const grupoRemovido = grupos.find(g => g.title === removedGrupo);
                    grupoRemovido?.data.forEach(item => {
                        updateCounts(item.title, /* incrementar? */ false);
                    });
                }

                // Agora processamos o grupo que está sendo (des)marcado
                grupoData.forEach(item => {
                    updateCounts(item.title, /* incrementar? */ novoStatus);
                });

                // Marcamos o checkbox
                setCheckedGroups(prev => ({ ...prev, [grupoTitle]: novoStatus }));

                return newOrder;
            });
        };



        return (
            <Box display="flex" flexWrap="wrap" sx={{ justifyContent: 'space-between', width: '100%' }}>
                {grupos.map((grupo, index) => (
                    <AtributoBox
                        key={index}
                        title={grupo.title}
                        data={grupo.data}
                        values={allValues}
                        onChange={handleChange}
                        remainingPoints={remainingPoints}
                        borderColor={grupo.borderColor}
                        onCheckboxClick={handleCheckboxClick}
                        isChecked={!!checkedGroups[grupo.title]}
                    />
                ))}
            </Box>
        );
    }
    const handleRegaliaChange = (regaliaId) => {
        const alreadySelected = RegaliasDeAprendiz.includes(regaliaId);
        if (alreadySelected) {
            const updated = RegaliasDeAprendiz.filter((id) => id !== regaliaId);
            setRegaliasDeAprendiz(updated);
            handleRegaliasUpdate({ regalias: updated, comprada: RegaliaComprada });
            switch (regaliaId) {
                case 'combatente':
                    removeAutoIncrementedValueByName(selectedAttributeCombatente, 1);
                    removeAutoIncrementedValueByName(selectedAttributeCombatente2, 1);
                    setSelectedAttributeCombatente('')
                    setSelectedAttributeCombatente2('')
                    break;
                case 'novico':
                    removeAutoIncrementedValueByName(selectedAttributeNovico, 1);
                    removeAutoIncrementedValueByName(selectedAttributeNovico2, 1);
                    setSelectedAttributeNovico('')
                    setSelectedAttributeNovico2('')
                    break;
                case 'iniciado':
                    removeAutoIncrementedValueByName(selectedAttributeIniciado, 1);
                    removeAutoIncrementedValueByName(selectedAttributeIniciado2, 1);
                    setSelectedAttributeIniciado('')
                    setSelectedAttributeIniciado2('')
                    break;
                case 'feiticeiro':
                    removeAutoIncrementedValueByName(selectedAttributeFeiticeiro, 1);
                    removeAutoIncrementedValueByName(selectedAttributeFeiticeiro2, 1);
                    setSelectedAttributeFeiticeiro('')
                    setSelectedAttributeFeiticeiro2('')
                    break;
                case 'diplomata':
                    removeAutoIncrementedValueByName(selectedAttributeDiplomata, 2);
                    removeAutoIncrementedValueByName('Negociação', 1);
                    removeAutoIncrementedValueByName('Sedução', 2);
                    removeAutoIncrementedValueByName('Intimidação', 2);
                    setSelectedAttributeDiplomata('')
                    break;
                case 'explorador':
                    removeAutoIncrementedValueByName(selectedAttributeExplorador, 2);
                    removeAutoIncrementedValueByName(selectedAttributeExplorador2, 2);
                    removeAutoIncrementedValueByName('Sobrevivência', 1);
                    removeAutoIncrementedValueByName('Negociação', 1);
                    setSelectedAttributeExplorador('')
                    setSelectedAttributeExplorador2('')
                    break;
                case 'academico':
                    removeAutoIncrementedValueByName(selectedAttributeAcademico, 2);
                    removeAutoIncrementedValueByName(selectedAttributeAcademico2, 2);
                    removeAutoIncrementedValueByName('Teologia', 1);
                    removeAutoIncrementedValueByName('Jurisprudência (Política e leis)', 1);
                    setSelectedAttributeAcademico('')
                    setSelectedAttributeAcademico2('')
                    break;
                case 'guardarPonto':
                    setPontosDeRegalia(0)
                    break;

                default:
                    break;
            }

        } else {
            if (RegaliasDeAprendiz.length < 2) {
                const updated = [...RegaliasDeAprendiz, regaliaId];
                setRegaliasDeAprendiz(updated);
                handleRegaliasUpdate({ regalias: updated, comprada: RegaliaComprada });
                console.log(updated);
            }
            switch (regaliaId) {
                case 'combatente':
                    setOpenForcaOuDexOuFortitude(true);
                    break;
                case 'novico':
                    setOpenNovicoChoices(true);
                    break;
                case 'iniciado':
                    setOpenIniciadoChoices(true);
                    break;
                case 'feiticeiro':
                    setOpenFeiticeiroChoices(true);
                    break;
                case 'diplomata':
                    setOpenDiplomataChoices(true);

                    break;
                case 'explorador':
                    setOpenExploradorChoices(true);

                    break;
                case 'academico':
                    setOpenAcademicoChoices(true);

                    break;
                case 'guardarPonto':
                    setPontosDeRegalia(1)
                    break;

                default:
                    break;
            }
        }


    };

    function NavigationButtons() {

        const handleNext = () => {
            if (tabIndex < 7) {
                setTabIndex(prev => prev + 1);
            }
        };

        const handlePrevious = () => {
            if (tabIndex > 0) {
                setTabIndex(prev => prev - 1);
            }
        };

        return (
            <Stack direction="row" spacing={2} alignItems="center" sx={{ display: 'flex', justifyContent: 'center', py: '1', my: 4, alignItems: 'center' }}>
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
                <Button variant="contained" id="criarCharButtom" onClick={() => { handleCriarPersonagem(); }}>Finalizar</Button>
            </Stack>
        );
    }

    const handleGroupChange = (groupSetter, selected, increment) => {
        return (event) => {
            const { value, checked } = event.target;
            let newSelected = [...selected];

            if (checked) {
                if (selected.length < 2) {
                    newSelected.push(value);
                    setAutoIncrementedValueByName(value, increment);
                }
            } else {
                newSelected = newSelected.filter(item => item !== value);
                removeAutoIncrementedValueByName(value, increment);
            }

            groupSetter(newSelected);
        };
    };


    const AntecedenteCard = ({ antecedente, selected, onSelect }) => (
        <Paper
            sx={{
                minWidth: 275,
                my: 2,
                p: 2,
                borderTop: "4px solid #162A22",
                borderBottom: "8px solid #162A22",
                height: '470px',
                position: 'relative',
                backgroundColor: selected ? '#f0f0f0' : 'white',
                width: '23%'
            }}
            onClick={() => onSelect(antecedente)}
        >
            <CardContent>
                <FormControlLabel
                    value={antecedente.nome}
                    control={<Radio checked={selected} />}
                    label=""
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                />

                <Typography className="boxTextTitle" variant="h6" component="div">
                    {antecedente.nome}
                </Typography>

                <Box
                    className="armaCard"
                    sx={{
                        height: "150px",
                        overflowY: 'scroll',
                        p: 1,
                        border: "1px solid #5B1F0F",
                        borderRadius: '10px',
                        mt: 2,
                    }}
                >
                    <Typography className="bigBoxTextEquips">
                        {antecedente.descricao}
                    </Typography>
                </Box>

                <ul>
                    {antecedente.habilidades.map((hab, index) => (
                        <li className="bigBoxTextBG" key={index}>
                            {hab}
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Paper>
    );

    const allowedProfissoes = ['Ferreiro', 'Alfaiate', 'Joalheiro', 'Carpinteiro'];

    const handleToggleArte = (profissao, habNome) => {
        const id = `${profissao}::${habNome}`;
        setSelectedIdModal(prev => prev === id ? '' : id);
        const result = profissao && habNome ? {
            nome: profissao, habilidades: habNome
        } : {};
        setProfessionRegAntecedente(result)
    };

    const handleSave = () => {
        setModalAberto(false)
    };


    return (
        <Box sx={{ width: '100%', minHeight: '900px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', m: 'auto' }}>
            <Box sx={{ width: '90%', mx: 'auto' }}>
                <Typography variant="h4" className="MainTitleC" sx={{ mt: 4 }}>Criação de personagem</Typography>
                <NavigationButtons sx={{ width: '100%' }} />

                <Tabs
                    value={tabIndex}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="character creation tabs"
                >
                    <Tab className="tabs" label="Informações Básicas" id="character-tab-0" aria-controls="character-tabpanel-0" />
                    <Tab className="tabs" label="Espécie" id="character-tab-4" aria-controls="character-tabpanel-3" />
                    <Tab className="tabs" label="Habilidades" id="character-tab-1" aria-controls="character-tabpanel-1" />
                    <Tab className="tabs" label="Proficiências" id="character-tab-3" aria-controls="character-tabpanel-2" />
                    <Tab className="tabs" label="Antecedente" id="character-tab-1" aria-controls="character-tabpanel-1" />
                    <Tab className="tabs" label="Aprendiz" id="character-tab-5" aria-controls="character-tabpanel-4" />
                    <Tab className="tabs" label="Profissão" id="character-tab-6" aria-controls="character-tabpanel-5" />
                    <Tab className="tabs" label="Equipamentos" id="character-tab-7" aria-controls="character-tabpanel-6" />
                </Tabs>
                <Box >
                    <TabPanel value={tabIndex} index={0}>

                        <Grid container spacing={2} sx={{ height: '400px' }}>
                            <Grid item xs={6}>
                                <Grid container spacing={2} sx={{ height: '100%' }} >
                                    <Grid item xs={6}>
                                        <TextField fullWidth label="Nome do Personagem" name="nome_personagem" value={charName} onChange={(e) => { setCharName(e.target.value) }} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        {age == 18 ?
                                            <Tooltip title="Idade mínima para fazer sentido estar em um aventura no sistema LDO.">
                                                <TextField
                                                    fullWidth
                                                    type="number"
                                                    inputProps={{
                                                        min: 18
                                                    }}
                                                    label="idade"
                                                    name="idade"
                                                    defaultValue="18"
                                                    value={age}
                                                    onChange={(e) => { setAge(e.target.value) }}
                                                />
                                            </Tooltip> :
                                            <TextField
                                                fullWidth
                                                type="number"
                                                inputProps={{
                                                    min: 18
                                                }}
                                                label="idade"
                                                name="idade"
                                                defaultValue="18"
                                                value={age}
                                                onChange={(e) => { setAge(e.target.value) }}
                                            />
                                        }

                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField fullWidth label="genêro" name="genero" value={gender} onChange={(e) => { setGender(e.target.value) }} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField 
                                            fullWidth 
                                            type="number"
                                            label="Altura (cm)" 
                                            name="altura" 
                                            value={altura} 
                                            onChange={(e) => { setAltura(parseInt(e.target.value) || 170) }}
                                            inputProps={{ min: 10, max: 5000 }}
                                            helperText={`Tamanho: ${altura <= 60 ? 'Minúsculo' : altura <= 130 ? 'Pequeno' : altura <= 220 ? 'Médio' : altura <= 350 ? 'Grande' : altura <= 600 ? 'Muito Grande' : altura <= 1200 ? 'Gigante' : 'Colossal'}`}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField fullWidth label="Nível" name="nivel" defaultValue={1} disabled />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField multiline rows={9} fullWidth label="Descrição" name="descricao" sx={{ height: '250px' }} value={charDiscription} onChange={(e) => { setCharDiscription(e.target.value) }} />
                                    </Grid>

                                </Grid>

                            </Grid>
                            <Grid item xs={6}>
                                <Box
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    sx={{
                                        border: '2px dashed #BB8130',
                                        borderRadius: 2,
                                        padding: 2,
                                        textAlign: 'center',
                                        bgcolor: '#756A3422',
                                        position: 'relative',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        maxHeight: '600px'
                                    }}
                                >
                                    <Box>
                                        <Typography variant="body1" sx={{ mb: 1 }}>
                                            Arraste e solte uma imagem aqui
                                        </Typography>

                                        <Button variant="text" sx={{ width: 'fit-content', marginX: 'auto' }} onClick={handleButtonClick}>
                                            Selecionar imagem
                                        </Button>
                                    </Box>


                                    {/* Input escondido para seleção por botão */}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        style={{ display: 'none', }}
                                    />

                                    {image && (
                                        <Box
                                            component="img"
                                            src={image}
                                            alt="Imagem do personagem"
                                            sx={{ mt: 2, maxWidth: '50%', margin: '0 auto', borderRadius: 1, maxHeight: '300px' }}
                                        />
                                    )}
                                </Box>
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={tabIndex} index={1}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="select-especie-label">Espécie</InputLabel>
                            <Select
                                labelId="select-especie-label"
                                label="Espécie"
                                value={especieSelecionada}
                                onChange={handleChange}
                                sx={{ borderRadius: '4px 4px 4px' }}
                            >
                                {Object.keys(racas).map((key) => (
                                    <MenuItem key={key} value={key}>
                                        {racas[key].nome}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Typography variant="h6">{racas[especieSelecionada].nome}</Typography>
                        <Typography className="bigBoxTextClasses" paragraph>{racas[especieSelecionada].descricao}</Typography>
                        <Box>
                            <Typography className="bigBoxTextEquipsHeader" sx={{ mb: 2 }}>
                                Escolha uma entre:
                            </Typography>

                            <FormControl component="fieldset">
                                <FormLabel component="legend">Regalia Obrigatória</FormLabel>
                                <RadioGroup
                                    name="regalia-escolhida"
                                    value={regaliaEscolhida.regalias}

                                    onChange={(e) => {
                                        setRegaliaEscolhida({ especie: racas[especieSelecionada].nome, regalias: [e.target.value] });


                                    }}
                                >
                                    {/* Regalias Obrigatórias */}
                                    {racas[especieSelecionada].obrigatorias.map((opcao) => (
                                        <FormControlLabel
                                            key={opcao.id}
                                            value={opcao.nome}
                                            control={<Radio />}
                                            label={
                                                <div>
                                                    <strong>{opcao.nome}</strong><br />
                                                    <Typography variant="body2">{opcao.descricao}</Typography>
                                                </div>
                                            }
                                            sx={{ alignItems: 'flex-start', my: 2 }}
                                        />
                                    ))}
                                    <Box>
                                        <Typography variant="h6" className="bigBoxTextClasses" sx={{ mb: 2 }}>

                                            REGALIAS OPCIONAIS DE ESPÉCIE
                                        </Typography>
                                        <Typography className="bigBoxTextClasses">
                                            Aqui o jogador pode encontrar opções para personalizar ainda mais seus personagens. A seguir temos várias opções que podem substituir a Regalia obrigatória de uma espécie. Assim sendo, como um exemplo,  o personagem pode ser humano e começar com uma das opções abaixo ao invés das que estão inicialmente disponíveis para ele.
                                            Ao escolher uma das opções abaixo é proibido escolher uma das outras. Após trocar a regalia inicial de classe, adicione as outras opções que sobraram da lista de escolhas para regalias de sua espécie original.

                                        </Typography>
                                    </Box>
                                    {/* Regalias Especiais agrupadas por tipo */}
                                    {regaliasOpcionais.regalias_opcionais.map((grupo) => (
                                        <Box key={grupo.tipo} sx={{ mt: 3, display: 'flex', flexDirection: 'column', flexWrap: 'nowrap' }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                                Regalias Especiais - {grupo.tipo}
                                            </Typography>
                                            {grupo.observacao &&
                                                <Typography sx={{ mb: 1 }}>
                                                    {grupo.observacao}
                                                </Typography>}
                                            {grupo.penalidade &&
                                                <Typography sx={{ mb: 1 }}>
                                                    {grupo.penalidade}
                                                </Typography>}
                                            <Typography sx={{ mb: 1 }}>
                                                {grupo.descricao}
                                            </Typography>
                                            {grupo.opcoes.map((opcao) => (
                                                <FormControlLabel
                                                    key={opcao.nome}
                                                    value={opcao.nome}
                                                    disabled={disableMutationOptModal === opcao.nome}
                                                    control={<Radio />}
                                                    label={
                                                        <Box>
                                                            <strong>{opcao.nome}</strong>
                                                            <Typography variant="body2" sx={{ mt: 0.5 }}>
                                                                {opcao.descricao.trim()}
                                                            </Typography>
                                                        </Box>
                                                    }
                                                    sx={{ alignItems: 'flex-start', my: 1 }}
                                                />
                                            ))}
                                        </Box>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </TabPanel>
                    <TabPanel value={tabIndex} index={2}>
                        <Typography className="bigBoxTextClasses">
                            Um personagem com zero pontos em uma Habilidade não é proficiente nesta Habilidade. Essa informação é relevante para as regras, habilidades e ações que exigem que o personagem seja proficiente com a habilidade.Um jogador só pode pedir ao mestre testes em Habilidades que sejam proficientes, caso contrário somente fará testes que lhe forem exigidos pelas situações enfrentadas no jogo.
                        </Typography>
                        <ListItem sx={{ px: 0 }} className="esteban">
                            Escolha dois dos Grupos de Habilidade (Físico, Conhecimento, Exploração, Arcana ou Social). Receba 1 ponto de habilidade em cada uma das Habilidades do Grupo. Esses incrementos são considerados os primeiros incrementos para propósitos de distribuição de pontos de Habilidade.
                            Ao atingir o Nível 7 escolha um nova aba, diferente das opções escolhidas no nível 1, para receber o mesmo incremento.<br />
                        </ListItem>
                        <ListItem sx={{ px: 0 }} className="esteban">

                            Aloque 40 pontos em Habilidades ou Proficiências. Ao alocar os pontos de habilidade, siga as regras a seguir:
                            Depois do quarto incremento em uma Habilidade, são necessários 2 pontos de habilidade para o quinto incremento (ao invés de 1) , 3 para um sexto (ao invés de 2) e a partir do sétimo será 4 pontos de habilidade por incremento (ao invés de 3).

                        </ListItem>
                        <ListItem sx={{ px: 0 }} className="esteban">
                            O valor máximo de uma Habilidade é igual a 15. Se alguma Regalia lhe fornecer pontos em uma habilidade que já esteja no valor de 15, escolha outra habilidade do mesmo grupo (Físico, Conhecimento, Exploração, Arcana ou Social) para adicionar o ponto.

                        </ListItem>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <AtributoContainer />

                        </Box>
                    </TabPanel>
                    <TabPanel value={tabIndex} index={3}>
                        <Typography>Selecione proficiências iniciais.</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box display="flex" flexWrap="wrap" sx={{ justifyContent: 'start', gap: 1, width: '100%' }}>
                                {proficiencias.map((prof, idx) => (
                                    <ProfBox
                                        key={idx}
                                        nome={prof.nome}
                                        descricao={prof.descricao}
                                        notas={prof.notas}
                                        niveis={prof.niveis}
                                        value={values[prof.nome]}
                                        onChange={handleProficienciaChange}
                                        remainingPoints={remainingPoints}
                                        borderColor={prof.borderColor}
                                    />
                                ))}
                            </Box>

                        </Box>
                    </TabPanel>
                    <TabPanel value={tabIndex} index={4}>
                        <FormControl component="fieldset">
                            <RadioGroup>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'start', gap: 1 }}>
                                    {antecedentes.map((ant) => (
                                        <AntecedenteCard
                                            key={ant.nome}
                                            antecedente={ant}
                                            selected={antecedenteSelecionado?.nome === ant.nome}
                                            onSelect={handleAntecedenteChange}
                                        />
                                    ))}
                                </Box>
                            </RadioGroup>
                        </FormControl>
                    </TabPanel>
                    <TabPanel value={tabIndex} index={5}>
                        <Typography variant="h6">
                            Aprendiz
                        </Typography>
                        <Typography className="bigBoxTextClasses" paragraph>
                            A jornada de um herói nem sempre começa com glória e reconhecimento. No vasto e implacável mundo, onde reinos se erguem e caem e os perigos espreitam nas sombras, aqueles que buscam se aventurar precisam mais do que coragem — precisam de preparo. É nesse vácuo de inexperiência que surge a figura do Aprendiz.Nem todos nascem nobres guerreiros, poderosos magos ou astutos exploradores.Muitos são apenas jovens sedentos por conhecimento, sobreviventes forçados a trilhar caminhos incertos, ou estudiosos que, diante da realidade, percebem que a teoria, sozinha, não os salvará.O Aprendiz é aquele que entende que antes de se tornar mestre, precisa aprender; antes de empunhar uma lâmina com destreza, deve compreender seu peso; antes de lançar feitiços que dobram a realidade, precisa sentir a magia pulsar dentro de si.Seja empunhando uma espada, curando feridos com bênçãos sagradas ou desbravando mistérios ocultos, o Aprendiz dá seus primeiros passos rumo ao desconhecido.Ele não é um especialista, mas também não é um amador indefeso.Seu papel no mundo é crescer, explorar e se moldar ao destino que escolheu — ou ao que o destino escolheu para ele.Mas a trilha do Aprendiz não é apenas feita de livros e lições simples. O mundo é um mestre cruel, e cada cicatriz, cada batalha perdida, cada erro cometido esculpe sua jornada. É na forja da experiência que o Aprendiz se torna algo mais. Alguns seguirão o caminho do aço, tornando-se guerreiros temidos. Outros dominarão os segredos da magia, dobrando as forças arcanas à sua vontade. Alguns escolherão a diplomacia, a exploração ou a fé, guiando-se não pela lâmina, mas pela palavra, pelo conhecimento ou pelo instinto.Independentemente do caminho escolhido, o Aprendiz carrega uma verdade inabalável: ele ainda não é um mestre, mas já deixou de ser um mero iniciante. E, no fim, o que define seu destino não é de onde veio, mas para onde está indo.
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap', m: 3 }}>
                            <FormControl component="fieldset" sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap', m: 3 }}>
                                <FormLabel component="legend">Escolha até duas regalias de aprendiz</FormLabel>
                                <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap', m: 3, width: '50%' }}>
                                    {regaliasDeAprendiz.map((sc) => {
                                        const checked = RegaliasDeAprendiz.includes(sc.id);
                                        return (
                                            <FormControlLabel
                                                key={sc.id}
                                                control={
                                                    <Checkbox
                                                        checked={checked}
                                                        onChange={() => setTimeout(() => {
                                                            handleRegaliaChange(sc.id)
                                                        }, 100)}
                                                    />
                                                }
                                                label={
                                                    <Box>
                                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                            {sc.nome}
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                                                            {sc.descricao}
                                                        </Typography>
                                                    </Box>
                                                }
                                                sx={{ alignItems: 'flex-start', my: 1 }}
                                            />
                                        );
                                    })}
                                </Box>
                            </FormControl>
                        </Box>

                    </TabPanel>
                    <TabPanel value={tabIndex} index={6}>
                        <Box className="esteban" sx={{ mt: 4 }}>
                            <Grid container spacing={3}>
                                {profissoes.map((prof) => (
                                    <Grid item xs={12} md={6} key={prof.nome}>
                                        <Card
                                            variant={selectedId.startsWith(prof.nome + '::') ? 'outlined' : 'elevation'}
                                            sx={{
                                                borderBottom: '6px solid #7B3311',
                                                height: '320px',
                                                overflowY: 'scroll',
                                                background: '#EDEDED',
                                                borderColor: selectedId.startsWith(prof.nome + '::') ? 'primary.main' : undefined
                                            }}
                                        >
                                            <CardHeader title={prof.nome} subheader={`Ambiente: ${prof.ambiente || prof.ambienteEmprego}`} />
                                            <CardContent>
                                                <Typography sx={{ marginBottom: 4 }}>{prof.descricao}</Typography>
                                                {prof.habilidades
                                                    .filter(hab => {
                                                        const nome = hab.nome;

                                                        // Filtro por nível
                                                        const nivelMatch = nome.match(/Nível (\d+)/i);
                                                        if (nivelMatch && parseInt(nivelMatch[1], 10) >= 2) return false;

                                                        // Filtro por "+X"
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
                                                                            checked={selectedId === id}
                                                                            disabled={hab.nome === professionRegAntecedente.habilidades}
                                                                            onChange={() => {
                                                                                handleToggle(prof.nome, hab.nome);

                                                                            }}
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
                        </Box>
                    </TabPanel>
                    <TabPanel value={tabIndex} index={7}>
                        <Box sx={{ width: '80%', position: 'relative', marginBottom: '200px', }} >
                            <Box my={4}>
                                <Typography className="esteban" sx={{ color: '#7B3311 !important', fontSize: '22px !important' }} variant="h4" gutterBottom>
                                    Loja de Itens
                                </Typography>

                                <Typography className="esteban" variant="h6" color={totalSpent() > goldLimit ? "error" : "primary"}>
                                    Total: {totalSpent().toFixed(2)} M.O. / {inicialMoney} M.O.
                                </Typography>
                                <Typography className="esteban" sx={{ my: 2 }}>
                                    Atenção:<br />
                                    Armaduras pesadas requerem um mínimo de força, se usadas sem esse pré requisito sofre as seguintes penalidades:<br />
                                    -1,5 m de velocidade de  movimento por ponto de força abaixo do requerido.<br />
                                    -1 em rolamento de acerto de qualquer teste de combate por ponto de força abaixo do requerimento.<br />
                                    Requer duas ações para usar a ação andar/correr ao invés de apenas uma.<br />

                                    Armaduras pesadas, mesmo se atingir o requerimento de força, sofrem penalidade em testes de furtividade de -5 e armaduras médias sofrem uma penalidade de -2.<br />
                                    Se uma criatura que não receber capacidade de usar um tipo de armadura usá-la mesmo assim se torna incapaz de conjurar magias, milagres, feitiços, manobras e quaisquer habilidades. Além disso, todo rolamento de habilidade possui desvantagem.

                                </Typography>
                                <Box mt={4} id="itensBG">
                                    <Typography className="esteban" variant="h5">Itens de Antecedente:</Typography>
                                    {selectedItemsBG.length === 0 ? (
                                        <Typography className="esteban">Nenhum para este antecedente.</Typography>
                                    ) : (
                                        selectedItemsBG.map(item => (
                                            <Chip
                                                key={item.key}
                                                id={item.name.split(" ")[0]}
                                                label={`${item.name} x${item.quantity} (${(item.price * item.quantity).toFixed(2)} M.O.)`}
                                                sx={{ m: 0.5 }}
                                            />
                                        ))
                                    )}
                                </Box>
                                <Box
                                    sx={{
                                        position: 'fixed',
                                        bottom: 16,
                                        right: 16,
                                        backgroundColor: 'white',
                                        padding: 2,
                                        borderRadius: 2,
                                        boxShadow: 3,
                                        zIndex: 1000,
                                        maxWidth: '300px',
                                        minWidth: '200px',
                                        overflowY: 'scroll',
                                        height: '300px'
                                    }}
                                >
                                    <Typography className="esteban" variant="h5" sx={{ color: '#7B3311 !important' }}>
                                        Inventário
                                    </Typography>
                                    <Typography className="esteban" variant="subtitle" color={totalSpent() > goldLimit ? "error" : "primary"} sx={{ fontSize: '12px !important' }}>
                                        Total: {totalSpent().toFixed(2)} M.O. / {inicialMoney} M.O.
                                    </Typography>
                                    <Box mt={1}>
                                        <Typography className="esteban" sx={{ fontSize: '12px !important' }} variant="subtitle1">Itens Selecionados:</Typography>
                                        {selectedItems.length === 0 ? (
                                            <Typography className="esteban" sx={{ fontSize: '12px !important' }} variant="body2">Nenhum item selecionado.</Typography>
                                        ) : (
                                            selectedItems.map(item => (
                                                <Chip
                                                    key={item.key}
                                                    label={` ${item.quantity}x ${item.name} (${(item.price * item.quantity).toFixed(2)} M.O.)`}
                                                    onDelete={() => handleRemove(item)}
                                                    sx={{ m: 0.5 }}
                                                />
                                            ))
                                        )}
                                    </Box>
                                </Box>


                                {Object.entries(categories).map(([category, items]) => (
                                    <Box key={category} my={3}>
                                        <Typography className="esteban" sx={{ color: '#40150A', my: 3 }} variant="h6">{category}</Typography>
                                        <Grid container spacing={1} sx={{ display: 'flex !important', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'start', gap: 1 }}>
                                            {items.map(item => {
                                                const key = `${category}-${item.name}`;
                                                const selected = selectedItems.some(i => i.key === key);
                                                const disabled = totalSpent() + item.price > goldLimit;
                                                const forcaRequisito = item.forca ? `Requisito de força: ${item.forca}` : ""
                                                return (
                                                    item.description ?
                                                        <Tooltip title={`${item.description} ${forcaRequisito}`}>
                                                            <Box sx={{ width: 'fitContent' }} key={key} >

                                                                <Button
                                                                    className="esteban"
                                                                    variant={selected ? "contained" : "outlined"}
                                                                    color={disabled ? "inherit" : "primary"}
                                                                    disabled={disabled}
                                                                    onClick={() => handleChangeShop(category, item)}
                                                                    sx={{ fontSize: '14px !important', background: selected ? "#40150A" : "#EDEDED", }}
                                                                >
                                                                    {item.name} ({item.price} M.O.)
                                                                </Button>

                                                            </Box>
                                                        </Tooltip> :
                                                        <Box sx={{ width: 'fitContent' }} key={key} >

                                                            <Button
                                                                className="esteban"
                                                                variant={selected ? "contained" : "outlined"}
                                                                color={disabled ? "inherit" : "primary"}
                                                                disabled={disabled}
                                                                onClick={() => handleChangeShop(category, item)}
                                                                sx={{ fontSize: '14px !important', background: selected ? "#40150A" : "#EDEDED", }}
                                                            >
                                                                {item.name} ({item.price} M.O.)
                                                            </Button>

                                                        </Box>
                                                );
                                            })}
                                        </Grid>
                                        <Divider sx={{ my: 2 }} />
                                    </Box>
                                ))}

                            </Box>
                        </Box>
                    </TabPanel>
                </Box>
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
                                    onClick={() => {
                                        // Aplicar os pontos selecionados e fechar
                                        setOpen(false);
                                    }}
                                    sx={{ ml: 2 }}
                                    disabled={group1.length === 0 && group2.length === 0}
                                >
                                    Confirmar
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Modal>
                <Modal open={modalAberto} >
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
                                onClick={handleSave} 
                                variant="contained" 
                                color="primary"
                                disabled={!selectedIdModal}
                            >
                                Confirmar
                            </Button>
                        </Box>
                    </Box>
                </Modal>

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
                                    <FormControlLabel
                                        value="Força"
                                        control={<Radio />}
                                        label={`Força `}
                                    />
                                    <FormControlLabel
                                        value="Destreza"
                                        control={<Radio />}
                                        label={`Destreza `}
                                    />
                                </RadioGroup>
                            </FormControl>

                            <Box mt={3} textAlign="right">
                                <Button variant="outlined" onClick={() => setOpen(false)}>
                                    Fechar
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        if (selectedAttribute) {
                                            setAutoIncrementedValueByName(selectedAttribute, 1)
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
                                    <FormControlLabel
                                        value="Força"
                                        control={<Radio />}
                                        label={`Força `}
                                    />
                                    <FormControlLabel
                                        value="Destreza"
                                        control={<Radio />}
                                        label={`Destreza `}
                                    />
                                    <FormControlLabel
                                        value="Fortitude"
                                        control={<Radio />}
                                        label={`Fortitude `}
                                    />
                                </RadioGroup>
                            </FormControl>
                            <FormControl component="fieldset" margin="normal" sx={{ m: 2 }}>
                                <FormLabel component="legend">Escolha um atributo para aumentar em +1 ponto</FormLabel>
                                <RadioGroup
                                    value={selectedAttributeCombatente2}
                                    onChange={(e) => { setSelectedAttributeCombatente2(e.target.value); }}
                                >
                                    <FormControlLabel
                                        value="Combate Corpo a Corpo"
                                        control={<Radio />}
                                        label={`Combate Corpo a Corpo `}
                                    />
                                    <FormControlLabel
                                        value="Combate a Distância"
                                        control={<Radio />}
                                        label={`Combate a Distância `}
                                    />
                                </RadioGroup>
                            </FormControl>

                            <Box mt={3} textAlign="right">
                                <Button variant="outlined" onClick={() => {
                                    setOpenForcaOuDexOuFortitude(false)
                                    handleRegaliaChange('combatente')
                                }}>
                                    Fechar
                                </Button>
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
                                    <FormControlLabel
                                        value="Teologia"
                                        control={<Radio />}
                                        label={`Teologia `}
                                    />
                                    <FormControlLabel
                                        value="Arcanismo"
                                        control={<Radio />}
                                        label={`Arcanismo `}
                                    />
                                    <FormControlLabel
                                        value="Medicina"
                                        control={<Radio />}
                                        label={`Medicina `}
                                    />
                                </RadioGroup>
                            </FormControl>
                            <FormControl component="fieldset" margin="normal" sx={{ m: 2 }}>
                                <FormLabel component="legend">Escolha um atributo para aumentar em +1 ponto</FormLabel>
                                <RadioGroup
                                    value={selectedAttributeNovico2}
                                    onChange={(e) => { setSelectedAttributeNovico2(e.target.value); }}
                                >
                                    <FormControlLabel
                                        value="Combate Corpo a Corpo"
                                        control={<Radio />}
                                        label={`Combate Corpo a Corpo `}
                                    />
                                    <FormControlLabel
                                        value="Combate a Distância"
                                        control={<Radio />}
                                        label={`Combate a Distância `}
                                    />
                                    <FormControlLabel
                                        value="Combate Arcano"
                                        control={<Radio />}
                                        label={`Combate Arcano `}
                                    />
                                </RadioGroup>
                            </FormControl>

                            <Box mt={3} textAlign="right">
                                <Button variant="outlined" onClick={() => {
                                    setOpenNovicoChoices(false)
                                    handleRegaliaChange('novico')
                                }}>
                                    Fechar
                                </Button>
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
                                    <FormControlLabel
                                        value="Ritualismo"
                                        control={<Radio />}
                                        label={`Ritualismo `}
                                    />
                                    <FormControlLabel
                                        value="Arcanismo"
                                        control={<Radio />}
                                        label={`Arcanismo `}
                                    />
                                    <FormControlLabel
                                        value="Arcanatec"
                                        control={<Radio />}
                                        label={`Medicina `}
                                    />
                                </RadioGroup>
                            </FormControl>
                            <FormControl component="fieldset" margin="normal" sx={{ m: 2 }}>
                                <FormLabel component="legend">Escolha um atributo para aumentar em +1 ponto</FormLabel>
                                <RadioGroup
                                    value={selectedAttributeIniciado2}
                                    onChange={(e) => { setSelectedAttributeIniciado2(e.target.value); }}
                                >
                                    <FormControlLabel
                                        value="Combate Arcano"
                                        control={<Radio />}
                                        label={`Combate Arcano `}
                                    />
                                </RadioGroup>
                            </FormControl>

                            <Box mt={3} textAlign="right">
                                <Button variant="outlined" onClick={() => {
                                    setOpenIniciadoChoices(false)
                                    handleRegaliaChange('iniciado')
                                }}>
                                    Fechar
                                </Button>
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
                                    <FormControlLabel
                                        value="Ritualismo"
                                        control={<Radio />}
                                        label={`Ritualismo `}
                                    />
                                    <FormControlLabel
                                        value="Ocultismo"
                                        control={<Radio />}
                                        label={`Ocultismo`}
                                    />
                                </RadioGroup>
                            </FormControl>
                            <FormControl component="fieldset" margin="normal" sx={{ m: 2 }}>
                                <FormLabel component="legend">Escolha um atributo para aumentar em +1 ponto</FormLabel>
                                <RadioGroup
                                    value={selectedAttributeFeiticeiro2}
                                    onChange={(e) => { setSelectedAttributeFeiticeiro2(e.target.value); }}
                                >
                                    <FormControlLabel
                                        value="Combate Arcano"
                                        control={<Radio />}
                                        label={`Combate Arcano `}
                                    />
                                </RadioGroup>
                            </FormControl>

                            <Box mt={3} textAlign="right">
                                <Button variant="outlined" onClick={() => {
                                    setOpenFeiticeiroChoices(false)
                                    handleRegaliaChange('feiticeiro')
                                }}>
                                    Fechar
                                </Button>
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
                                    <FormControlLabel
                                        value="Persuasão"
                                        control={<Radio />}
                                        label={`Persuasão `}
                                    />
                                    <FormControlLabel
                                        value="Enganação"
                                        control={<Radio />}
                                        label={`Enganação`}
                                    />
                                </RadioGroup>
                            </FormControl>
                            <FormControl component="fieldset" margin="normal" sx={{ m: 2 }}>
                                <FormLabel component="legend">+2 pontos em:</FormLabel>
                                <RadioGroup>
                                    <FormControlLabel
                                        checked
                                        value="Sedução"
                                        control={<Radio />}
                                        label={`Sedução `}
                                    />
                                    <FormControlLabel
                                        checked
                                        value="Negociação"
                                        control={<Radio />}
                                        label={`Negociação`}
                                    />
                                </RadioGroup>
                            </FormControl>
                            <FormControl component="fieldset" margin="normal" sx={{ m: 2 }}>
                                <FormLabel component="legend"> +1 ponto em:</FormLabel>
                                <RadioGroup>
                                    <FormControlLabel
                                        checked
                                        value="Intimidação"
                                        control={<Radio />}
                                        label={`Intimidação `}
                                    />
                                </RadioGroup>
                            </FormControl>

                            <Box mt={3} textAlign="right">
                                <Button variant="outlined" onClick={() => {
                                    setOpenDiplomataChoices(false)
                                    handleRegaliaChange('diplomata')
                                }}>
                                    Fechar
                                </Button>
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
                                    <FormControlLabel
                                        value="Rastreamento"
                                        control={<Radio />}
                                        label={`Rastreamento `}
                                    />
                                    <FormControlLabel
                                        value="Investigação"
                                        control={<Radio />}
                                        label={`Investigação`}
                                    />
                                </RadioGroup>
                            </FormControl>
                            <FormControl component="fieldset" margin="normal" sx={{ m: 2 }}>
                                <FormLabel component="legend">Escolha um atributo para aumentar em +2 pontos :</FormLabel>
                                <RadioGroup
                                    value={selectedAttributeExplorador2}
                                    onChange={(e) => { setSelectedAttributeExplorador2(e.target.value); }}
                                >
                                    <FormControlLabel

                                        value="Percepção"
                                        control={<Radio />}
                                        label={`Percepção`}
                                    />
                                    <FormControlLabel

                                        value="Furtividade"
                                        control={<Radio />}
                                        label={`Furtividade`}
                                    />
                                </RadioGroup>
                            </FormControl>
                            <FormControl component="fieldset" margin="normal" sx={{ m: 2 }}>
                                <FormLabel component="legend"> +1 ponto em:</FormLabel>
                                <RadioGroup>
                                    <FormControlLabel
                                        checked
                                        value="Sobrevivência"
                                        control={<Radio />}
                                        label={`Sobrevivência `}
                                    />
                                    <FormControlLabel
                                        checked
                                        value="Navegação"
                                        control={<Radio />}
                                        label={`Navegação `}
                                    />
                                </RadioGroup>
                            </FormControl>

                            <Box mt={3} textAlign="right">
                                <Button variant="outlined" onClick={() => {
                                    setOpenExploradorChoices(false)
                                    handleRegaliaChange('explorador')
                                }}>
                                    Fechar
                                </Button>
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
                                    <FormControlLabel
                                        value="História"
                                        control={<Radio />}
                                        label={`História`}
                                    />
                                    <FormControlLabel
                                        value="Intuição"
                                        control={<Radio />}
                                        label={`Intuição`}
                                    />
                                </RadioGroup>
                            </FormControl>
                            <FormControl component="fieldset" margin="normal" sx={{ m: 2 }}>
                                <FormLabel component="legend">+1 pontos em:</FormLabel>
                                <RadioGroup

                                >
                                    <FormControlLabel
                                        checked
                                        value="Jurisprudência (Política e leis)"
                                        control={<Radio />}
                                        label={`Jurisprudência (Política e leis)`}
                                    />
                                    <FormControlLabel
                                        checked
                                        value="Teologia"
                                        control={<Radio />}
                                        label={`Teologia`}
                                    />
                                </RadioGroup>
                            </FormControl>
                            <FormControl component="fieldset" margin="normal" sx={{ m: 2 }}>
                                <FormLabel component="legend">Escolha um atributo para aumentar em +2 pontos :</FormLabel>
                                <RadioGroup
                                    value={selectedAttributeAcademico2}
                                    onChange={(e) => { setSelectedAttributeAcademico2(e.target.value); }}
                                >
                                    <FormControlLabel

                                        value="Medicina"
                                        control={<Radio />}
                                        label={`Medicina`}
                                    />
                                    <FormControlLabel

                                        value="Natureza"
                                        control={<Radio />}
                                        label={`Natureza`}
                                    />
                                </RadioGroup>
                            </FormControl>

                            <Box mt={3} textAlign="right">
                                <Button variant="outlined" onClick={() => {
                                    setOpenAcademicoChoices(false)
                                    handleRegaliaChange('academico')
                                }}>
                                    Fechar
                                </Button>
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
                                    <FormControlLabel
                                        value="Maestria em Armaduras e Escudos"
                                        control={<Radio />}
                                        label={`Maestria em Armaduras e Escudos `}
                                    />
                                    <FormControlLabel
                                        value="Proficiência em Esgrima"
                                        control={<Radio />}
                                        label={`Proficiência em Esgrima `}
                                    />
                                </RadioGroup>
                            </FormControl>

                            <Box mt={3} textAlign="right">
                                <Button variant="outlined" onClick={() => setOpen(false)}>
                                    Fechar
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        if (selectedProfModal) {
                                            setAutoIncrementedProfByName(selectedProfModal, 1)
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
            </Box >
            {/* Snackbar para feedback de ações */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert 
                    onClose={() => setSnackbar({ ...snackbar, open: false })} 
                    severity={snackbar.severity} 
                    sx={{ width: '100%' }}
                    variant="filled"
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
            {/* Footer */}
            < Box sx={{ background: '#40150A', p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <Typography sx={{ color: '#fff', fontSize: '10px' }}>© {dayjs().year()} Lâmina do oculto. All rights reserved.</Typography>
            </Box >
        </Box >
    );
};

export default CharCreationPage;
