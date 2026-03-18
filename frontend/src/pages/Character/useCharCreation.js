/**
 * useCharCreation — Custom hook para criação de personagem
 * Extrai TODO o estado, handlers e lógica de criarPersonagem.js
 * Refatoração UI-005 — Fase 4
 */
import { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    antecedentes,
    calcularPontosDeVida,
    calcularEstamina,
    calcularBonusVelocidade,
    calcularPontosDeMagia,
    calcularIniciativa,
    calcularCapacidadeDeCarga,
    calcularCuraKitMedico,
    calcularTempoRespiracao,
} from '../../data/constants';
import {
    calcularBonusDefesaAgilidade,
    calcularDefesaTotal,
} from '../../data/constants/regras';

// ============================================================================
// CONSTANTES
// ============================================================================
const MAX_POINTS = 40;
const MAX_PROF_POINTS = 4;
const DEFAULT_MONEY = 450;

const defaultValues = {
    Acrobacia: 0, Agilidade: 0, Alquimia: 0, Arcanatec: 0, Arcanismo: 0,
    Armadilhas: 0, Atletismo: 0, "Combate Arcano": 0, "Combate Corpo a Corpo": 0,
    "Combate a Distância": 0, Destreza: 0, Enganação: 0, Fortitude: 0, Força: 0,
    Furtividade: 0, História: 0, Intimidação: 0, Intuição: 0, Investigação: 0,
    "Jurisprudência (Política e leis)": 0, "Lidar com animais": 0, Medicina: 0,
    Natureza: 0, Navegação: 0, Negociação: 0, Ocultismo: 0, Percepção: 0,
    Performance: 0, Persuasão: 0, Rastreamento: 0, Ritualismo: 0, Sedução: 0,
    Sobrevivência: 0, Tecnologia: 0, Teologia: 0,
};

export const mutacaoData = {
    "tipo": "Mutante",
    "custo": 2,
    "descricao": 'Uma criatura que sofreu de alguma forma uma exposição a um efeito que mudou permanentemente sua aparência e fisionomia é considerada um mutante. O mutante tem uma penalidade de -2 em todos os testes da aba social, exceto intimidação, sempre que que tiver a mutação visível. Todos sabem que o personagem possui mutações, a não ser que o personagem a mantenha contida dentro de roupas, máscaras e afins. Ao escolher ser um mutante é necessário escolher apenas uma das opções abaixo:',
    "penalidade": "-2 em testes da aba social (exceto Intimidação) com mutação visível.",
    "opcoes": [
        { "nome": "Pele Escamosa", "descricao": "A pele do personagem se torna grossa e escamosa, fornecendo uma defesa natural a cortes e arranhões. A base do valor de defesa para o personagem sem armadura é de 10 ao invés de 7." },
        { "nome": "Olhos Multifacetados", "descricao": "Os olhos do personagem se multiplicam e adquirem uma aparência insectóide, concedendo visão ampliada e a capacidade de enxergar no escuro. Visão no escuro, e meia luz, com alcance de 27 metros e bônus de +2 em testes de percepção que envolvam visão. Além disso possui visão 360°" },
        { "nome": "Boca Abissal", "descricao": "A boca do personagem se expande, revelando uma mandíbula cheia de dentes afiados, permitindo ataques mordedores poderosos. Recebe uma arma natural com dano perfurante  1d10 + valor de força. Recebe +2 em testes de atletismo para agarrar um alvo com os dentes." },
        { "nome": "Membros Desproporcionais", "descricao": "Os membros do personagem se alongam ou encurtam, concedendo versatilidade. Aumentam o alcance de ameaça em 1,5 metros ou reduz a criatura em um tamanho na escala, com um mínimo de minúsculo." },
        { "nome": "Cauda Serpentina", "descricao": "Uma cauda serpentina cresce na parte inferior do corpo do personagem, permitindo uma maior capacidade de equilíbrio e agilidade em movimentos.o personagem ganha um bônus de +5 em testes de acrobacia para se equilibrar e consegue usar sua cauda para se segurar em beiradas, galhos e outros que possam ser enrolados por ela, deixando assim suas mãos livres. A calda pode ser usada para segurar objetos mas não realizar ataques ou defender de ataques." },
        { "nome": "Garras Retráteis", "descricao": "O personagem desenvolve garras afiadas em suas mãos ou pés, fornecendo ataques mais letais e a habilidade de escalar superfícies verticais. Recebe uma arma natural com dano cortante   1d6 + valor de destreza. O personagem tem a capacidade de escalar superfícies verticais sem custo extra de movimento e sem necessidade de ferramentas extras." },
        { "nome": "Chifres Torcidos", "descricao": "Chifres retorcidos e sinuosos crescem na cabeça do personagem, conferindo maior resistência física e a capacidade de empurrar objetos pesados. O personagem recebe +2 em testes de atletismo para se manter em pé ou derrubar um alvo. Recebe uma arma natural com dano de impacto  1d6 + valor de força." },
        { "nome": "Exoesqueleto Ósseo", "descricao": "O corpo do personagem é envolvido por um exoesqueleto ósseo, tornando-o mais resistente a cortes. Se torna resistente ao dano cortante, porém se torna vulnerável ao dano de impacto. O exoesqueleto também aumenta a base do valor de defesa de 7 para 12." },
        { "nome": "Pernas de Aranha", "descricao": "O personagem desenvolve pernas extras semelhantes às de uma aranha, permitindo maior mobilidade e a habilidade de escalar paredes. Pode escalar sem gastar movimento extra e ganha um bônus de 1.5 metros no valor de velocidade. Ganha um bônus de +5 em testes de atletismo para agarrar e para não ser derrubado." },
        { "nome": "Braços Tentaculares", "descricao": "Braços adicionais em forma de tentáculos crescem no corpo do personagem, fornecendo uma vantagem de alcance em combate e a habilidade de agarrar objetos a distância. Recebe 1.5 metros a mais em seu alcance de ameaça e +2 em testes de atletismo para agarrar outra criatura." }
    ]
};

const VALIDATION_PATTERNS = {
    nome: /^[a-zA-Z0-9À-ÿ\s'.,-]{2,50}$/,
    descricao: /^[\s\S]{0,2000}$/,
    idade: /^(1[0-9]|[2-9][0-9]|[1-9][0-9]{2}|1000)$/,
    dinheiro: /^\d+(\.\d{1,2})?$/
};

// ============================================================================
// LOCALSTORAGE — Rascunho de criação
// ============================================================================
const STORAGE_KEY = 'ldo_char_creation_draft';

const loadDraft = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const draft = JSON.parse(raw);
        const today = new Date().toISOString().slice(0, 10);
        if (draft._savedDate !== today) {
            localStorage.removeItem(STORAGE_KEY);
            return null;
        }
        return draft;
    } catch {
        localStorage.removeItem(STORAGE_KEY);
        return null;
    }
};

// ============================================================================
// HOOK PRINCIPAL
// ============================================================================
export default function useCharCreation() {
    const navigate = useNavigate();
    const baseUrl = process.env.REACT_APP_LISTEN_ADDRESS;
    const fileInputRef = useRef();
    const [draft] = useState(() => loadDraft());

    // ------------------------------------------------------------------
    // ESTADO — Atributos de modal
    // ------------------------------------------------------------------
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

    // ------------------------------------------------------------------
    // ESTADO — Dinheiro
    // ------------------------------------------------------------------
    const [inicialMoney, setInicialMoney] = useState(DEFAULT_MONEY);
    const [finallMoney, setFinallMoney] = useState('0');
    var goldLimit = inicialMoney || DEFAULT_MONEY;

    // ------------------------------------------------------------------
    // ESTADO — Modais
    // ------------------------------------------------------------------
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
    const [modalAberto, setModalAberto] = useState(false);
    const [openMutatioModal, setOpenMutatioModal] = useState(false);

    // ------------------------------------------------------------------
    // ESTADO — Grupos (habilidades)
    // ------------------------------------------------------------------
    const [group1, setGroup1] = useState([]);
    const [group2, setGroup2] = useState([]);

    // ------------------------------------------------------------------
    // ESTADO — Formulário básico
    // ------------------------------------------------------------------
    const [age, setAge] = useState(18);
    const [altura, setAltura] = useState(170);
    const [tabIndex, setTabIndex] = useState(0);
    const [image, setImage] = useState(null);
    const [charName, setCharName] = useState('');
    const [charDiscription, setCharDiscription] = useState('');
    const [gender, setGender] = useState('');

    // ------------------------------------------------------------------
    // ESTADO — Equipamentos
    // ------------------------------------------------------------------
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedItemsBG, setSelectedItemsBG] = useState([]);

    // ------------------------------------------------------------------
    // ESTADO — Espécie
    // ------------------------------------------------------------------
    const [especieSelecionada, setEspecieSelecionada] = useState('humano');
    const [regaliaEscolhida, setRegaliaEscolhida] = useState('');
    const [especieSelecionadaLista, setEspecieSelecionadaLista] = useState([]);

    // ------------------------------------------------------------------
    // ESTADO — Profissão
    // ------------------------------------------------------------------
    const [selectedId, setSelectedId] = useState('');
    const [selectedIdModal, setSelectedIdModal] = useState('');
    const [professionReg, setProfessionReg] = useState([]);
    const [professionRegAntecedente, setProfessionRegAntecedente] = useState([]);

    // ------------------------------------------------------------------
    // ESTADO — Regalias
    // ------------------------------------------------------------------
    const [RegaliasDeAprendiz, setRegaliasDeAprendiz] = useState([]);
    const [RegaliasDeAprendizSelecionada, setRegaliasDeAprendizSelecionada] = useState({});
    const [RegaliaComprada, setRegaliaComprada] = useState('');
    const [pontosDeRegalia, setPontosDeRegalia] = useState(0);

    // ------------------------------------------------------------------
    // ESTADO — Habilidades e Proficiências
    // ------------------------------------------------------------------
    const [values, setValues] = useState(
        proficiencias.reduce((acc, prof) => ({ ...acc, [prof.nome]: 0 }), {})
    );
    const [valuesPoints, setValuesPoints] = useState(
        proficiencias.reduce((acc, prof) => ({ ...acc, [prof.nome]: 0 }), {})
    );
    const [allValues, setAllValues] = useState(defaultValues);
    const [autoIncrementedValues, setAutoIncrementedValues] = useState(defaultValues);
    const [autoIncrementedProfValues, setAutoIncrementedProfValues] = useState(
        proficiencias.reduce((acc, prof) => ({ ...acc, [prof.nome]: 0 }), {})
    );
    const [checkedGroups, setCheckedGroups] = useState({});
    const [checkedOrder, setCheckedOrder] = useState([]);

    // ------------------------------------------------------------------
    // ESTADO — Antecedente
    // ------------------------------------------------------------------
    const [antecedenteSelecionado, setAntecedenteSelecionado] = useState(null);
    const [chosenAntecedentes, setChosenAntecedentes] = useState(new Set());
    const [mensagem, setMensagem] = useState('');

    // ------------------------------------------------------------------
    // ESTADO — Modal de escolha de antecedente
    // ------------------------------------------------------------------
    const [antecedenteChoiceModalOpen, setAntecedenteChoiceModalOpen] = useState(false);
    const [antecedenteEscolhas, setAntecedenteEscolhas] = useState(
        { habilidades: [], proficiencias: [] }
    );

    // ------------------------------------------------------------------
    // ESTADO — Feedback / Validação
    // ------------------------------------------------------------------
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    // ============================================================
    // LOCALSTORAGE — Hidratar estado do rascunho no mount
    // ============================================================
    useEffect(() => {
        if (!draft) return;
        if (draft.charName) setCharName(draft.charName);
        if (draft.charDiscription != null) setCharDiscription(draft.charDiscription);
        if (draft.gender) setGender(draft.gender);
        if (draft.age != null) setAge(draft.age);
        if (draft.altura != null) setAltura(draft.altura);
        if (draft.image != null) setImage(draft.image);
        if (draft.tabIndex != null) setTabIndex(draft.tabIndex);
        if (draft.especieSelecionada) setEspecieSelecionada(draft.especieSelecionada);
        if (draft.regaliaEscolhida) setRegaliaEscolhida(draft.regaliaEscolhida);
        if (draft.especieSelecionadaLista) setEspecieSelecionadaLista(draft.especieSelecionadaLista);
        if (draft.allValues) setAllValues(draft.allValues);
        if (draft.autoIncrementedValues) setAutoIncrementedValues(draft.autoIncrementedValues);
        if (draft.values) setValues(draft.values);
        if (draft.valuesPoints) setValuesPoints(draft.valuesPoints);
        if (draft.autoIncrementedProfValues) setAutoIncrementedProfValues(draft.autoIncrementedProfValues);
        if (draft.checkedGroups) setCheckedGroups(draft.checkedGroups);
        if (draft.checkedOrder) setCheckedOrder(draft.checkedOrder);
        if (draft.RegaliasDeAprendiz) setRegaliasDeAprendiz(draft.RegaliasDeAprendiz);
        if (draft.RegaliasDeAprendizSelecionada) setRegaliasDeAprendizSelecionada(draft.RegaliasDeAprendizSelecionada);
        if (draft.RegaliaComprada) setRegaliaComprada(draft.RegaliaComprada);
        if (draft.pontosDeRegalia != null) setPontosDeRegalia(draft.pontosDeRegalia);
        if (draft.professionReg) setProfessionReg(draft.professionReg);
        if (draft.professionRegAntecedente) setProfessionRegAntecedente(draft.professionRegAntecedente);
        if (draft.selectedId) setSelectedId(draft.selectedId);
        if (draft.selectedIdModal) setSelectedIdModal(draft.selectedIdModal);
        if (draft.selectedItems) setSelectedItems(draft.selectedItems);
        if (draft.selectedItemsBG) setSelectedItemsBG(draft.selectedItemsBG);
        if (draft.finallMoney != null) setFinallMoney(draft.finallMoney);
        if (draft.inicialMoney != null) setInicialMoney(draft.inicialMoney);
        if (draft.group1) setGroup1(draft.group1);
        if (draft.group2) setGroup2(draft.group2);
        if (draft.antecedenteEscolhas) setAntecedenteEscolhas(draft.antecedenteEscolhas);
        if (draft.selectedAttribute) setSelectedAttribute(draft.selectedAttribute);
        if (draft.selectedAttributeCombatente) setSelectedAttributeCombatente(draft.selectedAttributeCombatente);
        if (draft.selectedAttributeCombatente2) setSelectedAttributeCombatente2(draft.selectedAttributeCombatente2);
        if (draft.selectedAttributeNovico) setSelectedAttributeNovico(draft.selectedAttributeNovico);
        if (draft.selectedAttributeNovico2) setSelectedAttributeNovico2(draft.selectedAttributeNovico2);
        if (draft.selectedAttributeIniciado) setSelectedAttributeIniciado(draft.selectedAttributeIniciado);
        if (draft.selectedAttributeIniciado2) setSelectedAttributeIniciado2(draft.selectedAttributeIniciado2);
        if (draft.selectedAttributeFeiticeiro) setSelectedAttributeFeiticeiro(draft.selectedAttributeFeiticeiro);
        if (draft.selectedAttributeFeiticeiro2) setSelectedAttributeFeiticeiro2(draft.selectedAttributeFeiticeiro2);
        if (draft.selectedAttributeDiplomata) setSelectedAttributeDiplomata(draft.selectedAttributeDiplomata);
        if (draft.selectedAttributeExplorador) setSelectedAttributeExplorador(draft.selectedAttributeExplorador);
        if (draft.selectedAttributeExplorador2) setSelectedAttributeExplorador2(draft.selectedAttributeExplorador2);
        if (draft.selectedAttributeAcademico) setSelectedAttributeAcademico(draft.selectedAttributeAcademico);
        if (draft.selectedAttributeAcademico2) setSelectedAttributeAcademico2(draft.selectedAttributeAcademico2);
        if (draft.selectedProfModal) setSelectedProfModal(draft.selectedProfModal);
        if (draft.antecedenteSelecionadoNome) {
            const ant = antecedentes.find(a => a.nome === draft.antecedenteSelecionadoNome);
            if (ant) {
                setAntecedenteSelecionado(ant);
                setChosenAntecedentes(prev => new Set(prev).add(ant));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ============================================================
    // LOCALSTORAGE — Salvar rascunho automaticamente (debounce 2s)
    // ============================================================
    useEffect(() => {
        const timer = setTimeout(() => {
            try {
                const draftData = {
                    _savedDate: new Date().toISOString().slice(0, 10),
                    charName, charDiscription, gender, age, altura, image, tabIndex,
                    especieSelecionada, regaliaEscolhida, especieSelecionadaLista,
                    antecedenteSelecionadoNome: antecedenteSelecionado?.nome || null,
                    allValues, autoIncrementedValues,
                    values, valuesPoints, autoIncrementedProfValues,
                    checkedGroups, checkedOrder,
                    RegaliasDeAprendiz, RegaliasDeAprendizSelecionada, pontosDeRegalia,
                    RegaliaComprada,
                    professionReg, professionRegAntecedente, selectedId, selectedIdModal,
                    selectedItems, selectedItemsBG, finallMoney, inicialMoney,
                    group1, group2, antecedenteEscolhas,
                    selectedAttribute,
                    selectedAttributeCombatente, selectedAttributeCombatente2,
                    selectedAttributeNovico, selectedAttributeNovico2,
                    selectedAttributeIniciado, selectedAttributeIniciado2,
                    selectedAttributeFeiticeiro, selectedAttributeFeiticeiro2,
                    selectedAttributeDiplomata,
                    selectedAttributeExplorador, selectedAttributeExplorador2,
                    selectedAttributeAcademico, selectedAttributeAcademico2,
                    selectedProfModal,
                };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(draftData));
            } catch (e) {
                console.warn('Falha ao salvar rascunho de criação:', e);
            }
        }, 2000);
        return () => clearTimeout(timer);
    }); // sem deps — roda após cada render, debounced a 2s

    // ============================================================
    // STATS DERIVADOS — Recalculados automaticamente (UI-001)
    // ============================================================
    const statsDerivados = useMemo(() => {
        const especieData = racas[especieSelecionada] || racas.humano;
        const pvBase = especieData?.pvBase ?? 10;
        const velBase = especieData?.velocidadeBase ?? 6;

        const fortitude = allValues['Fortitude'] || 0;
        const forca = allValues['Força'] || 0;
        const agilidade = allValues['Agilidade'] || 0;
        const atletismo = allValues['Atletismo'] || 0;
        const arcanismo = allValues['Arcanismo'] || 0;
        const percepcao = allValues['Percepção'] || 0;
        const medicina = allValues['Medicina'] || 0;

        // Bônus de recursos por regalia de aprendiz (PV, Estamina, Magia)
        let regaliaPV = 0, regaliaEstamina = 0, regaliaMagia = 0;
        RegaliasDeAprendiz.forEach(regId => {
            const regalia = regaliasDeAprendiz.find(r => r.id === regId);
            if (regalia?.bonusPorRegalia) {
                regaliaPV += regalia.bonusPorRegalia.pv || 0;
                regaliaEstamina += regalia.bonusPorRegalia.estamina || 0;
                regaliaMagia += regalia.bonusPorRegalia.magia || 0;
            }
        });

        const pvMax = calcularPontosDeVida(pvBase, fortitude) + regaliaPV;
        const estaminaMax = calcularEstamina(atletismo) + regaliaEstamina;
        const pmMax = calcularPontosDeMagia(arcanismo) + regaliaMagia;
        const bonusVel = calcularBonusVelocidade(agilidade);
        const bonusDefAgi = calcularBonusDefesaAgilidade(agilidade);
        const defesaResult = calcularDefesaTotal({ agilidade, defesaArmadura: 0, defesaEscudo: 0, armaduraPesada: false });
        const defesaTotal = defesaResult.defesaTotal || (7 + bonusDefAgi);
        const iniciativa = calcularIniciativa(agilidade, percepcao);
        const cargaMax = calcularCapacidadeDeCarga(forca);
        const velTotal = velBase + bonusVel;

        return {
            pvBase, regaliaPV, regaliaEstamina, regaliaMagia,
            pvMax, estaminaMax, pmMax,
            bonusVel, velBase, velTotal,
            bonusDefAgi, defesaTotal,
            iniciativa, cargaMax,
            curaKit: calcularCuraKitMedico(medicina),
            respiracao: calcularTempoRespiracao(fortitude),
        };
    }, [especieSelecionada, allValues, RegaliasDeAprendiz]);

    // ------------------------------------------------------------------
    // VALORES DERIVADOS SIMPLES
    // ------------------------------------------------------------------
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

    const totalUsed = Object.values(valuesPoints).reduce((sum, v) => sum + v, 0);
    const remainingProfPoints = Math.max(0, MAX_PROF_POINTS - totalUsed);
    const totalSpent = () => selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const allowedProfissoes = ['Ferreiro', 'Alfaiate', 'Joalheiro', 'Carpinteiro'];

    // ============================================================
    // HELPERS — Auto-incremento de habilidades e proficiências
    // ============================================================
    const handleSelect = (selecao) => {
        setEspecieSelecionadaLista({ especie: racas[especieSelecionada].nome, regalias: [selecao] });
    };

    const setAutoIncrementedValueByName = (nome, valor) => {
        if (!nome) return;
        setAutoIncrementedValues(prev => ({
            ...prev,
            [nome]: (prev[nome] || 0) + valor
        }));
        setAllValues(prev => ({
            ...prev,
            [nome]: (prev[nome] || 0) + valor
        }));
    };

    const removeAutoIncrementedValueByName = (nome, valor) => {
        if (!nome) return;
        setAutoIncrementedValues(prev => ({
            ...prev,
            [nome]: Math.max(0, (prev[nome] || 0) - valor)
        }));
        setAllValues(prev => ({
            ...prev,
            [nome]: Math.max(0, (prev[nome] || 0) - valor)
        }));
    };

    const setAutoIncrementedProfByName = (nome, valor) => {
        setAutoIncrementedProfValues(prev => ({
            ...prev,
            [nome]: (prev[nome] || 0) + valor
        }));
        setValues(prev => ({
            ...prev,
            [nome]: (prev[nome] || 0) + valor
        }));
    };

    const removeAutoIncrementedProfByName = (nome, valor) => {
        setAutoIncrementedProfValues(prev => ({
            ...prev,
            [nome]: Math.max(0, (prev[nome] || 0) - valor)
        }));
        setValues(prev => ({
            ...prev,
            [nome]: Math.max(0, (prev[nome] || 0) - valor)
        }));
    };

    const clearGroups = (groups, groupSetters, increment) => {
        groups.forEach((group, index) => {
            group.forEach(key => {
                removeAutoIncrementedValueByName(key, increment);
            });
            groupSetters[index]([]);
        });
        console.log(group1, group2);
    };

    // ============================================================
    // NAVEGAÇÃO
    // ============================================================
    const handleNavigateToCharPage = useCallback(() => {
        navigate("/character");
    }, [navigate]);

    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };

    // ============================================================
    // HANDLER — Antecedente (Seleção e Remoção)
    // ============================================================
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
                    removeAutoIncrementedValueByName('Percepção', 1);
                    handleRemoveBG("Kits", { name: "Kit de Escalada", description: "Contém cordas, mosquetões, ganchos e outros itens para escalada e rapel.", price: 40 }, 1);
                    break;
                case 'ARTESÃO':
                    removeAutoIncrementedValueByName('Arcanatec', 2);
                    removeAutoIncrementedValueByName('Tecnologia', 2);
                    removeAutoIncrementedValueByName('Negociação', 1);
                    removeAutoIncrementedValueByName('Destreza', 1);
                    setModalAberto(false);
                    setSelectedIdModal('');
                    setProfessionRegAntecedente([]);
                    handleRemoveBG("Kits", { name: "Kit de Ferramentas", description: "Contém martelo, chave de fenda, alicate e outros itens úteis para consertar e construir objetos.", price: 25 }, 1);
                    break;
                case 'ASSISTENTE DE ACADEMIA':
                    removeAutoIncrementedValueByName('Alquimia', 2);
                    removeAutoIncrementedValueByName('Natureza', 2);
                    removeAutoIncrementedValueByName('Medicina', 1);
                    removeAutoIncrementedValueByName('Investigação', 1);
                    break;
                case 'ASSISTENTE DE LABORATÓRIO':
                    removeAutoIncrementedValueByName('Natureza', 2);
                    removeAutoIncrementedValueByName('Alquimia', 2);
                    removeAutoIncrementedValueByName('História', 1);
                    removeAutoIncrementedValueByName('Arcanismo', 1);
                    setEspecieSelecionadaLista([]);
                    setOpenMutatioModal(false);
                    break;
                case 'ASTRÔNOMO':
                    removeAutoIncrementedValueByName('Navegação', 2);
                    removeAutoIncrementedValueByName('Natureza', 2);
                    removeAutoIncrementedValueByName('História', 1);
                    removeAutoIncrementedValueByName('Percepção', 1);
                    handleRemoveBG("Kits", { name: "Kit de Cartografia", description: "Contém instrumentos de medição, papéis especiais e canetas de precisão para elaborar mapas.", price: 30 }, 1);
                    break;
                case 'ATOR':
                    removeAutoIncrementedValueByName('Performance', 2);
                    removeAutoIncrementedValueByName('Persuasão', 2);
                    removeAutoIncrementedValueByName('Sedução', 1);
                    removeAutoIncrementedValueByName('Enganação', 1);
                    removeAutoIncrementedProfByName('Proficiência em Disfarce', 1);
                    handleRemoveBG("Kits", { name: "Kit de Disfarces", description: "Contém roupas variadas, perucas, maquiagem e outros itens para se disfarçar e passar despercebido.", price: 50 }, 1);
                    break;
                case 'BANDIDO':
                    removeAutoIncrementedValueByName('Intimidação', 2);
                    removeAutoIncrementedValueByName('Furtividade', 2);
                    removeAutoIncrementedValueByName('Agilidade', 1);
                    removeAutoIncrementedValueByName('Percepção', 1);
                    handleRemoveBG("Kits", { name: "Ferramentas de ladrão", description: "Inclui gazuas, pé de cabra pequeno, lima de metal e outros instrumentos para abrir fechaduras.", price: 45 }, 1);
                    break;
                case 'BARBEIRO':
                    removeAutoIncrementedValueByName('Intuição', 2);
                    removeAutoIncrementedValueByName('Negociação', 2);
                    removeAutoIncrementedValueByName('Agilidade', 1);
                    removeAutoIncrementedValueByName('Destreza', 1);
                    handleRemoveBG("Kits", { name: "Kit de Disfarces", description: "Contém roupas variadas, perucas, maquiagem e outros itens para se disfarçar e passar despercebido.", price: 50 }, 1);
                    break;
                case 'BATEDOR':
                    removeAutoIncrementedValueByName('Sobrevivência', 2);
                    removeAutoIncrementedValueByName('Navegação', 2);
                    removeAutoIncrementedValueByName('Furtividade', 1);
                    removeAutoIncrementedValueByName('Percepção', 1);
                    removeAutoIncrementedProfByName('Ferramentas de ladrão', 1);
                    handleRemoveBG("Kits", { name: "Kit de Explorador", description: "Inclui bússola, mapa, binóculos e outros itens para exploração e orientação em território desconhecido.", price: 35 }, 1);
                    handleRemoveBG("Kits", { name: "Kit de Escalada", description: "Contém cordas, mosquetões, ganchos e outros itens para escalada e rapel.", price: 40 }, 1);
                    break;
                case 'AVENTUREIRO':
                    removeAutoIncrementedValueByName('Sobrevivência', 2);
                    removeAutoIncrementedValueByName('Percepção', 2);
                    removeAutoIncrementedValueByName('Navegação', 1);
                    removeAutoIncrementedValueByName('Atletismo', 1);
                    handleRemoveBG("Kits", { name: "Kit de Escalada", description: "Contém cordas, mosquetões, ganchos e outros itens para escalada e rapel.", price: 40 }, 1);
                    handleRemoveBG("Kits", { name: "Kit de Explorador", description: "Inclui bússola, mapa, binóculos e outros itens para exploração e orientação em território desconhecido.", price: 35 }, 1);
                    break;
                case 'BIBLIOTECÁRIO':
                    removeAutoIncrementedValueByName('História', 2);
                    removeAutoIncrementedValueByName('Jurisprudência (Política e leis)', 2);
                    removeAutoIncrementedValueByName('Teologia', 1);
                    removeAutoIncrementedValueByName('Natureza', 1);
                    removeAutoIncrementedProfByName('Proficiência em Línguas Antigas', 1);
                    break;
                case 'CAÇADOR DE RECOMPENSAS':
                    removeAutoIncrementedValueByName('Rastreamento', 2);
                    removeAutoIncrementedValueByName('Investigação', 2);
                    removeAutoIncrementedValueByName('Persuasão', 1);
                    removeAutoIncrementedValueByName('Negociação', 1);
                    handleRemoveBG("Kits", { name: "Kit de Explorador", description: "Inclui bússola, mapa, binóculos e outros itens para exploração e orientação em território desconhecido.", price: 35 }, 1);
                    break;
                case 'CAPANGA':
                    removeAutoIncrementedValueByName('Negociação', 2);
                    removeAutoIncrementedValueByName('Intimidação', 2);
                    removeAutoIncrementedValueByName('Fortitude', 1);
                    removeAutoIncrementedValueByName('Força', 1);
                    handleRemoveBG("Kits", { name: "Ferramentas de ladrão", description: "Contém ferramentas especializadas, como pés de cabra, brocas manuais e chave de fenda para abrir fechaduras.", price: 45 }, 1);
                    break;
                case 'CARTEIRO':
                    removeAutoIncrementedValueByName('Percepção', 2);
                    removeAutoIncrementedValueByName('Navegação', 2);
                    removeAutoIncrementedValueByName('Agilidade', 1);
                    removeAutoIncrementedValueByName('Intuição', 1);
                    handleRemoveBG("Kits", { name: "Kit de Explorador", description: "Inclui bússola, mapa, binóculos e outros itens para exploração e orientação em território desconhecido.", price: 35 }, 1);
                    handleRemoveBG("Kits", { name: "Kit de Cartografia", description: "Inclui pergaminhos, pena, tinta e outros itens para desenhar mapas e fazer anotações.", price: 30 }, 1);
                    removeAutoIncrementedProfByName('Condução de Veículos Terrestres', 1);
                    handleRemoveBG("Montaria", { name: "Cavalo", price: 50, velocidade: "12m", carga: 270 }, 1);
                    break;
                case 'CAMPONÊS':
                    removeAutoIncrementedValueByName('Sobrevivência', 2);
                    removeAutoIncrementedValueByName('Lidar com animais', 2);
                    removeAutoIncrementedValueByName('Fortitude', 1);
                    removeAutoIncrementedValueByName('Destreza', 1);
                    removeAutoIncrementedProfByName('Condução de Veículos Terrestres', 2);
                    break;
                case 'CHARLATÃO':
                    removeAutoIncrementedValueByName('Performance', 2);
                    removeAutoIncrementedValueByName('Enganação', 2);
                    removeAutoIncrementedValueByName('Persuasão', 1);
                    removeAutoIncrementedValueByName('Agilidade', 1);
                    removeAutoIncrementedProfByName('Proficiência em Disfarce', 1);
                    handleRemoveBG("Kits", { name: "Kit de Disfarces", description: "Contém roupas variadas, perucas, maquiagem e outros itens para se disfarçar e passar despercebido.", price: 50 }, 1);
                    break;
                case 'CIRCENSE':
                    removeAutoIncrementedValueByName('Navegação', 2);
                    removeAutoIncrementedValueByName('Performance', 2);
                    removeAutoIncrementedValueByName('Agilidade', 1);
                    removeAutoIncrementedValueByName('Acrobacia', 1);
                    setEspecieSelecionadaLista([]);
                    setOpenMutatioModal(false);
                    break;
                case 'COMERCIANTE':
                    removeAutoIncrementedValueByName('Negociação', 2);
                    removeAutoIncrementedValueByName('Arcanatec', 2);
                    removeAutoIncrementedValueByName('Enganação', 1);
                    removeAutoIncrementedValueByName('Persuasão', 1);
                    handleRemoveBG("Kits", { name: "Kit de Sobrevivência", description: "Inclui faca, corda, fósforos, cantil e outros itens essenciais para sobreviver ao ar livre.", price: 30 }, 1);
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
                    handleRemoveBG("Kits", { name: "Kit Médico", description: "Inclui bandagens, anti sépticos, tesoura médica e outros itens para primeiros socorros.", price: 50 }, 1);
                    handleRemoveBG("Kits", { name: "Kit de Herborista", description: "Contém ervas medicinais, pilão, mortalha e outros itens para preparar remédios naturais.", price: 20 }, 1);
                    break;
                case 'DETETIVE':
                    removeAutoIncrementedValueByName('Investigação', 2);
                    removeAutoIncrementedValueByName('Rastreamento', 2);
                    removeAutoIncrementedValueByName('Jurisprudência (Política e leis)', 1);
                    removeAutoIncrementedValueByName('Intuição', 1);
                    handleRemoveBG("Kits", { name: "Kit de Explorador", description: "Inclui bússola, mapa, binóculos e outros itens para exploração e orientação em território desconhecido.", price: 35 }, 1);
                    break;
                case 'EREMITA':
                    removeAutoIncrementedValueByName('Natureza', 2);
                    removeAutoIncrementedValueByName('Sobrevivência', 2);
                    removeAutoIncrementedValueByName('Furtividade', 1);
                    removeAutoIncrementedValueByName('Lidar com Animais', 1);
                    handleRemoveBG("Kits", { name: "Kit de Sobrevivência", description: "Inclui faca, corda, fósforos, cantil e outros itens essenciais para sobreviver ao ar livre.", price: 30 }, 1);
                    break;
                case 'ESCUDEIRO':
                    removeAutoIncrementedValueByName('História', 2);
                    removeAutoIncrementedValueByName('Atletismo', 2);
                    removeAutoIncrementedValueByName('Fortitude', 1);
                    handleRemoveBG("Kits", { name: "Kit de Ferramentas", description: "Contém martelo, chave de fenda, alicate e outros itens úteis para consertar e construir objetos.", price: 25 }, 1);
                    break;
                case 'ESPIÃO':
                    removeAutoIncrementedValueByName('Furtividade', 2);
                    removeAutoIncrementedValueByName('Investigação', 2);
                    removeAutoIncrementedValueByName('Intuição', 1);
                    removeAutoIncrementedValueByName('Enganação', 1);
                    removeAutoIncrementedProfByName('Proficiência em Disfarce', 1);
                    handleRemoveBG("Kits", { name: "Kit de Disfarces", description: "Contém roupas variadas, perucas, maquiagem e outros itens para se disfarçar e passar despercebido.", price: 50 }, 1);
                    handleRemoveBG("Kits", { name: "Kit de Venenos", description: "Contém frascos de veneno, luvas, aplicadores e outros itens para lidar com substâncias tóxicas.", price: 70 }, 1);
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
                    removeAutoIncrementedValueByName('Fortitude', 1);
                    break;
                case 'GUARDA':
                    removeAutoIncrementedValueByName('Atletismo', 2);
                    removeAutoIncrementedValueByName('Acrobacia', 2);
                    break;
                case 'HERDEIRO':
                    removeAutoIncrementedValueByName('Persuasão', 2);
                    removeAutoIncrementedValueByName('História', 2);
                    handleRemoveBG("Equipamento Geral", { name: "Vestuário fino", price: 10 }, 1);
                    setInicialMoney(DEFAULT_MONEY);
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
                    break;
                case 'MÉDICO DE BECO':
                    removeAutoIncrementedValueByName('Medicina', 2);
                    removeAutoIncrementedValueByName('Alquimia', 2);
                    removeAutoIncrementedValueByName('Furtividade', 1);
                    removeAutoIncrementedValueByName('Enganação', 1);
                    handleRemoveBG("Kits", { name: "Kit de Ferramentas", description: "Contém martelo, chave de fenda, alicate e outros itens úteis para consertar e construir objetos.", price: 25 }, 1);
                    break;
                case 'MENESTREL':
                    removeAutoIncrementedValueByName('Performance', 2);
                    removeAutoIncrementedValueByName('Sedução', 2);
                    removeAutoIncrementedValueByName('Persuasão', 1);
                    removeAutoIncrementedValueByName('Enganação', 1);
                    handleRemoveBG("Equipamento geralEquipamento Geral", { name: "Instrumento musical", price: 1 }, 1);
                    handleRemoveBG("Kits", { name: "Kit de Músico", description: "Inclui instrumentos musicais, partituras, cordas de reposição e outros itens para tocar música.", price: 55 }, 1);
                    break;
                case 'MINERADOR':
                    removeAutoIncrementedValueByName('Natureza', 2);
                    removeAutoIncrementedValueByName('Navegação', 2);
                    removeAutoIncrementedValueByName('Furtividade', 1);
                    removeAutoIncrementedValueByName('Força', 1);
                    removeAutoIncrementedProfByName('Ferramentas de ladrão', 1);
                    handleRemoveBG("Kits", { name: "Kit de Escalada", description: "Contém cordas, mosquetões, ganchos e outros itens para escalada e rapel.", price: 40 }, 1);
                    break;
                case 'NAVEGADOR':
                    removeAutoIncrementedValueByName('Percepção', 2);
                    removeAutoIncrementedValueByName('Navegação', 2);
                    removeAutoIncrementedValueByName('Investigação', 1);
                    removeAutoIncrementedValueByName('História', 1);
                    break;
                case 'NOBRE':
                    removeAutoIncrementedValueByName('Jurisprudência (Política e leis)', 2);
                    removeAutoIncrementedValueByName('História', 2);
                    handleRemoveBG("Equipamento Geral", { name: "Vestuário fino", price: 10 }, 1);
                    handleRemoveBG("Montaria", { name: "Cavalo", price: 50, velocidade: "12m", carga: 270 }, 1);
                    setInicialMoney(DEFAULT_MONEY);
                    break;
                case 'NÔMADE':
                    removeAutoIncrementedValueByName('Lidar com animais', 2);
                    removeAutoIncrementedValueByName('Navegação', 2);
                    removeAutoIncrementedValueByName('Investigação', 1);
                    removeAutoIncrementedValueByName('Sobrevivência', 1);
                    handleRemoveBG("Kits", { name: "Kit de Sobrevivência", description: "Inclui faca, corda, fósforos, cantil e outros itens essenciais para sobreviver ao ar livre.", price: 30 }, 1);
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
                    removeAutoIncrementedValueByName('Jurisprudência (Política e leis)', 1);
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
                    break;
            }
            // Desfazer escolhas do modal de antecedente (Força/Destreza, Proficiências etc.)
            antecedenteEscolhas.habilidades.forEach(h => removeAutoIncrementedValueByName(h.nome, h.pontos));
            antecedenteEscolhas.proficiencias.forEach(p => removeAutoIncrementedProfByName(p.nome, p.pontos));
            setAntecedenteEscolhas({ habilidades: [], proficiencias: [] });

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
                setAutoIncrementedValueByName('História', 1);
                setAutoIncrementedValueByName('Intuição', 1);
                handleChangeShopBG("Equipamento Geral", { name: "Símbolo santo", price: 0.7 }, 1);
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
                removeAutoIncrementedValueByName('Intuição', 1);
                removeAutoIncrementedValueByName('Persuasão', 1);
                break;
            case 'AMNÉSICO':
                setOpen(true);
                break;
            case 'ARQUEOLOGISTA':
                setAutoIncrementedValueByName('História', 2);
                setAutoIncrementedValueByName('Navegação', 2);
                setAutoIncrementedValueByName('Investigação', 1);
                setAutoIncrementedValueByName('Percepção', 1);
                handleChangeShopBG("Kits", { name: "Kit de Escalada", description: "Contém cordas, mosquetões, ganchos e outros itens para escalada e rapel.", price: 40 }, 1);
                break;
            case 'ARTESÃO':
                setAutoIncrementedValueByName('Arcanatec', 2);
                setAutoIncrementedValueByName('Tecnologia', 2);
                setAutoIncrementedValueByName('Negociação', 1);
                setAutoIncrementedValueByName('Destreza', 1);
                setModalAberto(true);
                handleChangeShopBG("Kits", { name: "Kit de Ferramentas", description: "Contém martelo, chave de fenda, alicate e outros itens úteis para consertar e construir objetos.", price: 25 }, 1);
                break;
            case 'ASSISTENTE DE ACADEMIA':
                setAutoIncrementedValueByName('Alquimia', 2);
                setAutoIncrementedValueByName('Natureza', 2);
                setAutoIncrementedValueByName('Medicina', 1);
                setAutoIncrementedValueByName('Investigação', 1);
                break;
            case 'ASSISTENTE DE LABORATÓRIO':
                setAutoIncrementedValueByName('Natureza', 2);
                setAutoIncrementedValueByName('Alquimia', 2);
                setAutoIncrementedValueByName('História', 1);
                setAutoIncrementedValueByName('Arcanismo', 1);
                setOpenMutatioModal(true);
                break;
            case 'ASTRÔNOMO':
                setAutoIncrementedValueByName('Navegação', 2);
                setAutoIncrementedValueByName('Natureza', 2);
                setAutoIncrementedValueByName('História', 1);
                setAutoIncrementedValueByName('Percepção', 1);
                handleChangeShopBG("Kits", { name: "Kit de Cartografia", description: "Contém instrumentos de medição, papéis especiais e canetas de precisão para elaborar mapas.", price: 30 }, 1);
                break;
            case 'ATOR':
                setAutoIncrementedValueByName('Performance', 2);
                setAutoIncrementedValueByName('Persuasão', 2);
                setAutoIncrementedValueByName('Sedução', 1);
                setAutoIncrementedValueByName('Enganação', 1);
                setAutoIncrementedProfByName('Proficiência em Disfarce', 1);
                handleChangeShopBG("Kits", { name: "Kit de Disfarces", description: "Contém roupas variadas, perucas, maquiagem e outros itens para se disfarçar e passar despercebido.", price: 50 }, 1);
                break;
            case 'BANDIDO':
                setAutoIncrementedValueByName('Intimidação', 2);
                setAutoIncrementedValueByName('Furtividade', 2);
                setAutoIncrementedValueByName('Agilidade', 1);
                setAutoIncrementedValueByName('Percepção', 1);
                handleChangeShopBG("Kits", { name: "Ferramentas de ladrão", description: "Inclui gazuas, pé de cabra pequeno, lima de metal e outros instrumentos para abrir fechaduras.", price: 45 }, 1);
                break;
            case 'BARBEIRO':
                setAutoIncrementedValueByName('Intuição', 2);
                setAutoIncrementedValueByName('Negociação', 2);
                setAutoIncrementedValueByName('Agilidade', 1);
                setAutoIncrementedValueByName('Destreza', 1);
                handleChangeShopBG("Kits", { name: "Kit de Disfarces", description: "Contém roupas variadas, perucas, maquiagem e outros itens para se disfarçar e passar despercebido.", price: 50 }, 1);
                break;
            case 'BATEDOR':
                setAutoIncrementedValueByName('Sobrevivência', 2);
                setAutoIncrementedValueByName('Navegação', 2);
                setAutoIncrementedValueByName('Furtividade', 1);
                setAutoIncrementedValueByName('Percepção', 1);
                setAutoIncrementedProfByName('Ferramentas de ladrão', 1);
                handleChangeShopBG("Kits", { name: "Kit de Explorador", description: "Inclui bússola, mapa, binóculos e outros itens para exploração e orientação em território desconhecido.", price: 35 }, 1);
                handleChangeShopBG("Kits", { name: "Kit de Escalada", description: "Contém cordas, mosquetões, ganchos e outros itens para escalada e rapel.", price: 40 }, 1);
                break;
            case 'AVENTUREIRO':
                setAutoIncrementedValueByName('Sobrevivência', 2);
                setAutoIncrementedValueByName('Percepção', 2);
                setAutoIncrementedValueByName('Navegação', 1);
                setAutoIncrementedValueByName('Atletismo', 1);
                handleChangeShopBG("Kits", { name: "Kit de Escalada", description: "Contém cordas, mosquetões, ganchos e outros itens para escalada e rapel.", price: 40 }, 1);
                handleChangeShopBG("Kits", { name: "Kit de Explorador", description: "Inclui bússola, mapa, binóculos e outros itens para exploração e orientação em território desconhecido.", price: 35 }, 1);
                break;
            case 'BIBLIOTECÁRIO':
                setAutoIncrementedValueByName('História', 2);
                setAutoIncrementedValueByName('Jurisprudência (Política e leis)', 2);
                setAutoIncrementedValueByName('Teologia', 1);
                setAutoIncrementedValueByName('Natureza', 1);
                setAutoIncrementedProfByName('Proficiência em Línguas Antigas', 1);
                break;
            case 'CAÇADOR DE RECOMPENSAS':
                setAutoIncrementedValueByName('Rastreamento', 2);
                setAutoIncrementedValueByName('Investigação', 2);
                setAutoIncrementedValueByName('Persuasão', 1);
                setAutoIncrementedValueByName('Negociação', 1);
                handleChangeShopBG("Kits", { name: "Kit de Explorador", description: "Inclui bússola, mapa, binóculos e outros itens para exploração e orientação em território desconhecido.", price: 35 }, 1);
                break;
            case 'CAPANGA':
                setAutoIncrementedValueByName('Negociação', 2);
                setAutoIncrementedValueByName('Intimidação', 2);
                setAutoIncrementedValueByName('Fortitude', 1);
                setAutoIncrementedValueByName('Força', 1);
                handleChangeShopBG("Kits", { name: "Ferramentas de ladrão", description: "Contém ferramentas especializadas, como pés de cabra, brocas manuais e chave de fenda para abrir fechaduras.", price: 45 }, 1);
                break;
            case 'CARTEIRO':
                setAutoIncrementedValueByName('Percepção', 2);
                setAutoIncrementedValueByName('Navegação', 2);
                setAutoIncrementedValueByName('Agilidade', 1);
                setAutoIncrementedValueByName('Intuição', 1);
                handleChangeShopBG("Kits", { name: "Kit de Explorador", description: "Inclui bússola, mapa, binóculos e outros itens para exploração e orientação em território desconhecido.", price: 35 }, 1);
                handleChangeShopBG("Kits", { name: "Kit de Cartografia", description: "Inclui pergaminhos, pena, tinta e outros itens para desenhar mapas e fazer anotações.", price: 30 }, 1);
                setAutoIncrementedProfByName('Condução de Veículos Terrestres', 1);
                handleChangeShopBG("Montaria", { name: "Cavalo", price: 50, velocidade: "12m", carga: 270 }, 1);
                break;
            case 'CAMPONÊS':
                setAutoIncrementedValueByName('Sobrevivência', 2);
                setAutoIncrementedValueByName('Lidar com animais', 2);
                setAutoIncrementedValueByName('Fortitude', 1);
                setAutoIncrementedValueByName('Destreza', 1);
                setAutoIncrementedProfByName('Condução de Veículos Terrestres', 2);
                break;
            case 'CHARLATÃO':
                setAutoIncrementedValueByName('Performance', 2);
                setAutoIncrementedValueByName('Enganação', 2);
                setAutoIncrementedValueByName('Persuasão', 1);
                setAutoIncrementedValueByName('Agilidade', 1);
                setAutoIncrementedProfByName('Proficiência em Disfarce', 1);
                handleChangeShopBG("Kits", { name: "Kit de Disfarces", description: "Contém roupas variadas, perucas, maquiagem e outros itens para se disfarçar e passar despercebido.", price: 50 }, 1);
                break;
            case 'CIRCENSE':
                setAutoIncrementedValueByName('Navegação', 2);
                setAutoIncrementedValueByName('Performance', 2);
                setAutoIncrementedValueByName('Agilidade', 1);
                setAutoIncrementedValueByName('Acrobacia', 1);
                setOpenMutatioModal(true);
                break;
            case 'COMERCIANTE':
                setAutoIncrementedValueByName('Negociação', 2);
                setAutoIncrementedValueByName('Arcanatec', 2);
                setAutoIncrementedValueByName('Enganação', 1);
                setAutoIncrementedValueByName('Persuasão', 1);
                handleChangeShopBG("Kits", { name: "Kit de Sobrevivência", description: "Inclui faca, corda, fósforos, cantil e outros itens essenciais para sobreviver ao ar livre.", price: 30 }, 1);
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
                handleChangeShopBG("Kits", { name: "Kit Médico", description: "Inclui bandagens, anti sépticos, tesoura médica e outros itens para primeiros socorros.", price: 50 }, 1);
                handleChangeShopBG("Kits", { name: "Kit de Herborista", description: "Contém ervas medicinais, pilão, mortalha e outros itens para preparar remédios naturais.", price: 20 }, 1);
                break;
            case 'DETETIVE':
                setAutoIncrementedValueByName('Investigação', 2);
                setAutoIncrementedValueByName('Rastreamento', 2);
                setAutoIncrementedValueByName('Jurisprudência (Política e leis)', 1);
                setAutoIncrementedValueByName('Intuição', 1);
                handleChangeShopBG("Kits", { name: "Kit de Explorador", description: "Inclui bússola, mapa, binóculos e outros itens para exploração e orientação em território desconhecido.", price: 35 }, 1);
                break;
            case 'EREMITA':
                setAutoIncrementedValueByName('Natureza', 2);
                setAutoIncrementedValueByName('Sobrevivência', 2);
                setAutoIncrementedValueByName('Furtividade', 1);
                setAutoIncrementedValueByName('Lidar com Animais', 1);
                handleChangeShopBG("Kits", { name: "Kit de Sobrevivência", description: "Inclui faca, corda, fósforos, cantil e outros itens essenciais para sobreviver ao ar livre.", price: 30 }, 1);
                break;
            case 'ESCUDEIRO':
                setAutoIncrementedValueByName('História', 2);
                setAutoIncrementedValueByName('Atletismo', 2);
                setAutoIncrementedValueByName('Fortitude', 1);
                handleChangeShopBG("Kits", { name: "Kit de Ferramentas", description: "Contém martelo, chave de fenda, alicate e outros itens úteis para consertar e construir objetos.", price: 25 }, 1);
                break;
            case 'ESPIÃO':
                setAutoIncrementedValueByName('Furtividade', 2);
                setAutoIncrementedValueByName('Investigação', 2);
                setAutoIncrementedValueByName('Intuição', 1);
                setAutoIncrementedValueByName('Enganação', 1);
                setAutoIncrementedProfByName('Proficiência em Disfarce', 1);
                handleChangeShopBG("Kits", { name: "Kit de Disfarces", description: "Contém roupas variadas, perucas, maquiagem e outros itens para se disfarçar e passar despercebido.", price: 50 }, 1);
                handleChangeShopBG("Kits", { name: "Kit de Venenos", description: "Contém frascos de veneno, luvas, aplicadores e outros itens para lidar com substâncias tóxicas.", price: 70 }, 1);
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
                setAutoIncrementedValueByName('Fortitude', 1);
                break;
            case 'GUARDA':
                setAutoIncrementedValueByName('Atletismo', 2);
                setAutoIncrementedValueByName('Acrobacia', 2);
                break;
            case 'HERDEIRO':
                setAutoIncrementedValueByName('Persuasão', 2);
                setAutoIncrementedValueByName('História', 2);
                handleChangeShopBG("Equipamento Geral", { name: "Vestuário fino", price: 10 }, 1);
                setInicialMoney(650);
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
                break;
            case 'MÉDICO DE BECO':
                setAutoIncrementedValueByName('Medicina', 2);
                setAutoIncrementedValueByName('Alquimia', 2);
                setAutoIncrementedValueByName('Furtividade', 1);
                setAutoIncrementedValueByName('Enganação', 1);
                handleChangeShopBG("Kits", { name: "Kit de Ferramentas", description: "Contém martelo, chave de fenda, alicate e outros itens úteis para consertar e construir objetos.", price: 25 }, 1);
                break;
            case 'MENESTREL':
                setAutoIncrementedValueByName('Performance', 2);
                setAutoIncrementedValueByName('Sedução', 2);
                setAutoIncrementedValueByName('Persuasão', 1);
                setAutoIncrementedValueByName('Enganação', 1);
                handleChangeShopBG("Equipamento geralEquipamento Geral", { name: "Instrumento musical", price: 1 }, 1);
                handleChangeShopBG("Kits", { name: "Kit de Músico", description: "Inclui instrumentos musicais, partituras, cordas de reposição e outros itens para tocar música.", price: 55 }, 1);
                break;
            case 'MINERADOR':
                setAutoIncrementedValueByName('Natureza', 2);
                setAutoIncrementedValueByName('Navegação', 2);
                setAutoIncrementedValueByName('Furtividade', 1);
                setAutoIncrementedValueByName('Força', 1);
                setAutoIncrementedProfByName('Ferramentas de ladrão', 1);
                handleChangeShopBG("Kits", { name: "Kit de Escalada", description: "Contém cordas, mosquetões, ganchos e outros itens para escalada e rapel.", price: 40 }, 1);
                break;
            case 'NAVEGADOR':
                setAutoIncrementedValueByName('Percepção', 2);
                setAutoIncrementedValueByName('Navegação', 2);
                setAutoIncrementedValueByName('Investigação', 1);
                setAutoIncrementedValueByName('História', 1);
                break;
            case 'NOBRE':
                setAutoIncrementedValueByName('Jurisprudência (Política e leis)', 2);
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
                handleChangeShopBG("Kits", { name: "Kit de Sobrevivência", description: "Inclui faca, corda, fósforos, cantil e outros itens essenciais para sobreviver ao ar livre.", price: 30 }, 1);
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
                setAutoIncrementedValueByName('Jurisprudência (Política e leis)', 1);
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
                break;
        }

        // Abrir modal de escolha se o antecedente possuir escolhasHabilidades ou escolhasProficiencias
        if (
            (antecedente.escolhasHabilidades?.length > 0 || antecedente.escolhasProficiencias?.length > 0) &&
            antecedente.nome !== 'ARTESÃO' // Artesão usa ProfessionSelectionModal próprio
        ) {
            setAntecedenteChoiceModalOpen(true);
        }
    };

    // ============================================================
    // HANDLER — Confirmar escolha do modal de antecedente
    // ============================================================
    const handleAntecedenteChoiceConfirm = (escolhas) => {
        escolhas.habilidades.forEach(h => setAutoIncrementedValueByName(h.nome, h.pontos));
        escolhas.proficiencias.forEach(p => setAutoIncrementedProfByName(p.nome, p.pontos));
        setAntecedenteEscolhas(escolhas);
        setAntecedenteChoiceModalOpen(false);
    };

    // ============================================================
    // HANDLER — Regalia de Aprendiz
    // ============================================================
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
                    setSelectedAttributeCombatente('');
                    setSelectedAttributeCombatente2('');
                    break;
                case 'novico':
                    removeAutoIncrementedValueByName(selectedAttributeNovico, 1);
                    removeAutoIncrementedValueByName(selectedAttributeNovico2, 1);
                    setSelectedAttributeNovico('');
                    setSelectedAttributeNovico2('');
                    break;
                case 'iniciado':
                    removeAutoIncrementedValueByName(selectedAttributeIniciado, 1);
                    removeAutoIncrementedValueByName(selectedAttributeIniciado2, 1);
                    setSelectedAttributeIniciado('');
                    setSelectedAttributeIniciado2('');
                    break;
                case 'feiticeiro':
                    removeAutoIncrementedValueByName(selectedAttributeFeiticeiro, 1);
                    removeAutoIncrementedValueByName(selectedAttributeFeiticeiro2, 1);
                    setSelectedAttributeFeiticeiro('');
                    setSelectedAttributeFeiticeiro2('');
                    break;
                case 'diplomata':
                    removeAutoIncrementedValueByName(selectedAttributeDiplomata, 2);
                    removeAutoIncrementedValueByName('Negociação', 1);
                    removeAutoIncrementedValueByName('Sedução', 2);
                    removeAutoIncrementedValueByName('Intimidação', 2);
                    setSelectedAttributeDiplomata('');
                    break;
                case 'explorador':
                    removeAutoIncrementedValueByName(selectedAttributeExplorador, 2);
                    removeAutoIncrementedValueByName(selectedAttributeExplorador2, 2);
                    removeAutoIncrementedValueByName('Sobrevivência', 1);
                    removeAutoIncrementedValueByName('Negociação', 1);
                    setSelectedAttributeExplorador('');
                    setSelectedAttributeExplorador2('');
                    break;
                case 'academico':
                    removeAutoIncrementedValueByName(selectedAttributeAcademico, 2);
                    removeAutoIncrementedValueByName(selectedAttributeAcademico2, 2);
                    removeAutoIncrementedValueByName('Teologia', 1);
                    removeAutoIncrementedValueByName('Jurisprudência (Política e leis)', 1);
                    setSelectedAttributeAcademico('');
                    setSelectedAttributeAcademico2('');
                    break;
                case 'guardarPonto':
                    setPontosDeRegalia(0);
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
                    setPontosDeRegalia(1);
                    break;
                default:
                    break;
            }
        }
    };

    // ============================================================
    // HANDLER — Loja de Equipamentos
    // ============================================================
    const handleChangeShop = (category, item) => {
        const key = `${category}-${item.name}`;
        const index = selectedItems.findIndex(i => i.key === key);

        if (index !== -1) {
            const existingItem = selectedItems[index];
            const newTotal = totalSpent() + item.price;
            if (newTotal <= goldLimit) {
                const updatedItems = [...selectedItems];
                updatedItems[index] = { ...existingItem, quantity: existingItem.quantity + 1 };
                setSelectedItems(updatedItems);
                setFinallMoney(`${goldLimit - newTotal}`);
            }
        } else {
            const newTotal = totalSpent() + item.price;
            if (newTotal <= goldLimit) {
                setSelectedItems(prev => [...prev, { key, category, ...item, quantity: 1 }]);
                setFinallMoney(`${goldLimit - newTotal}`);
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
                updatedItems[index] = { ...existingItem, quantity: existingItem.quantity + 1 };
                setSelectedItemsBG(updatedItems);
            }
        } else {
            const newTotal = totalSpent() + item.price;
            if (newTotal <= goldLimit) {
                setSelectedItemsBG(prev => [...prev, { key, category, ...item, quantity: qtd }]);
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
            } else {
                updatedItems.splice(index, 1);
            }
            setSelectedItems(updatedItems);
            var itemReturned = parseInt(finallMoney) + newTotal;
            setFinallMoney(`${itemReturned}`);
        }
    };

    const handleRemoveBG = (category, item, qty) => {
        if (!item || typeof item !== 'object') return;
        const key = `${category}-${item.name}`;
        const index = selectedItemsBG.findIndex(i => i.key === key);
        if (index === -1) return;
        const updatedItems = [...selectedItemsBG];
        if (qty && updatedItems[index]?.quantity > qty) {
            updatedItems[index] = { ...updatedItems[index], quantity: updatedItems[index].quantity - qty };
        } else {
            updatedItems.splice(index, 1);
        }
        setSelectedItemsBG(updatedItems);
    };

    // ============================================================
    // HANDLER — Imagem
    // ============================================================
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

    // ============================================================
    // HANDLER — Espécie
    // ============================================================
    const handleSpeciesChange = (event) => {
        setEspecieSelecionada(event.target.value);
    };

    // ============================================================
    // HANDLER — Proficiências
    // ============================================================
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

    const handleProficienciaChange = (nome, newVal) => {
        const prof = proficiencias.find(p => p.nome === nome);
        const maxNiveis = prof.niveis.length;
        if (newVal < 0) newVal = 0;
        newVal = Math.max(0, Math.min(newVal, maxNiveis));
        const prevVal = values[nome] || 0;
        const prevPoints = valuesPoints[nome] || 0;

        const step = newVal > prevVal ? 1 : newVal < prevVal ? -1 : 0;
        if (step === 0) return;

        let updatedVal = prevVal + step;
        updatedVal = Math.max(0, Math.min(updatedVal, maxNiveis));

        let updatedPoints = prevPoints + step;
        updatedPoints = Math.max(0, updatedPoints);

        if (updatedVal === maxNiveis && prevVal + step > maxNiveis) {
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

            if (val > maxNiveis) {
                const excedente = val - maxNiveis;
                novosValues[nome] = maxNiveis;
                novosPoints[nome] = Math.max(0, pts - excedente);
            }
            if (novosPoints[nome] < 0) {
                novosPoints[nome] = 0;
            }
        });

        setValues(novosValues);
        setValuesPoints(novosPoints);
    };

    // ============================================================
    // HANDLER — Profissão
    // ============================================================
    const handleToggle = (profissao, habNome) => {
        const id = `${profissao}::${habNome}`;
        let profession = {};

        const isSelected = selectedId === id;

        if (id) {
            profession = profissao && habNome ? { nome: profissao, habilidades: habNome } : {};
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

    const handleToggleArte = (profissao, habNome) => {
        const id = `${profissao}::${habNome}`;
        setSelectedIdModal(prev => prev === id ? '' : id);
        const result = profissao && habNome ? { nome: profissao, habilidades: habNome } : {};
        setProfessionRegAntecedente(result);
    };

    const handleSaveArte = () => {
        setModalAberto(false);
    };

    // ============================================================
    // HANDLER — Grupos
    // ============================================================
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

    // ============================================================
    // VALIDAÇÃO E SUBMISSÃO
    // ============================================================
    const validateForm = () => {
        const errors = {};

        if (!charName || charName.trim() === '') {
            errors.nome = 'Nome do personagem é obrigatório';
        } else if (!VALIDATION_PATTERNS.nome.test(charName)) {
            errors.nome = 'Nome inválido (2-50 caracteres, sem caracteres especiais proibidos)';
        }

        if (charDiscription && !VALIDATION_PATTERNS.descricao.test(charDiscription)) {
            errors.descricao = 'Descrição não pode exceder 2000 caracteres';
        }

        if (!gender || gender.trim() === '') {
            errors.genero = 'Gênero é obrigatório (aba: Informações Básicas)';
        }

        if (!especieSelecionada) {
            errors.especie = 'Espécie é obrigatória';
        }

        if (!antecedenteSelecionado) {
            errors.antecedente = 'Antecedente é obrigatório (aba: Antecedente)';
        }

        if (RegaliasDeAprendiz.length === 0) {
            errors.regalias = 'Selecione pelo menos uma regalia de aprendiz (aba: Aprendiz)';
        }

        // Validar que todos os pontos de habilidade foram gastos
        const totalSkillUsed = Object.entries(allValues).reduce((acc, [title, val]) => {
            const auto = autoIncrementedValues[title] || 0;
            return acc + calculateCustoEscalonado(val - auto);
        }, 0);
        if (totalSkillUsed < MAX_POINTS) {
            errors.habilidades = `Você deve gastar todos os ${MAX_POINTS} pontos de habilidade (restam ${MAX_POINTS - totalSkillUsed}) (aba: Habilidades)`;
        }

        // Validar que todos os pontos de proficiência foram gastos
        if (remainingProfPoints > 0) {
            errors.proficiencias = `Você deve gastar todos os ${MAX_PROF_POINTS} pontos de proficiência (restam ${remainingProfPoints}) (aba: Proficiências)`;
        }

        setFormErrors(errors);
        return errors;
    };

    const handleCriarPersonagem = async () => {
        const formErros = validateForm();
        if (Object.keys(formErros).length > 0) {
            const errorList = Object.values(formErros).join(' \u2022 ');
            setSnackbar({ open: true, message: errorList, severity: 'error' });
            return;
        }

        setIsSubmitting(true);
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.id;

        if (!userId) {
            setSnackbar({ open: true, message: 'Usuário não autenticado. Faça login novamente.', severity: 'error' });
            setIsSubmitting(false);
            return;
        }

        // Construir regaliasCompradas com os custos de pontos de criação
        // Regra: 4 pontos totais — 1 obrigatório por categoria (aprendiz, espécie, profissão)
        //        + 1 livre (qualquer categoria ou guardarPonto)
        const regaliasCompradasCriacao = {};
        // Aprendiz: 1 ponto cada (exceto guardarPonto)
        RegaliasDeAprendiz.forEach(id => {
            if (id !== 'guardarPonto') {
                regaliasCompradasCriacao[id] = 1;
            }
        });
        // Espécie: 1 ponto
        if (regaliaEscolhida && (regaliaEscolhida.id || regaliaEscolhida.nome)) {
            const especieKey = `especie:${regaliaEscolhida.id || regaliaEscolhida.nome}`;
            regaliasCompradasCriacao[especieKey] = 1;
        }
        // Profissão: 1 ponto
        if (professionReg && professionReg.nome) {
            const profissaoKey = `profissao:${professionReg.nome}`;
            regaliasCompradasCriacao[profissaoKey] = 1;
        }

        // Sanitizar habilidades — remover chaves vazias que possam ter surgido
        const habilidadesSanitizadas = Object.fromEntries(
            Object.entries(allValues).filter(([k]) => k && k.trim() !== '')
        );

        // Converter checkedGroups (título → bool) para grupos_marcados (key → bool)
        const gruposMarcadosCriacao = {};
        const gruposRef = [
            { title: 'Físico', key: 'fisico' },
            { title: 'Exploração', key: 'exploracao' },
            { title: 'Conhecimento', key: 'conhecimento' },
            { title: 'Arcana', key: 'arcana' },
            { title: 'Social', key: 'social' },
        ];
        gruposRef.forEach(g => {
            if (checkedGroups[g.title]) gruposMarcadosCriacao[g.key] = true;
        });

        // pontos_de_regalia = total pool = pontos gastos na criação + ponto salvo via guardarPonto
        // Isso permite que a ficha exiba corretamente "X de Y" (ex: "1 de 4")
        const totalPontosGastosCriacao = Object.values(regaliasCompradasCriacao)
            .reduce((acc, v) => acc + (typeof v === 'number' ? v : 1), 0);
        const totalPontosDeRegalia = totalPontosGastosCriacao + pontosDeRegalia;

        const payload = {
            nome_personagem: charName.trim(),
            classe: 'Aprendiz',
            image: image,
            nível: 1,
            pontos_de_regalia: totalPontosDeRegalia,
            genero: gender,
            dinheiro: finallMoney,
            idade: age,
            altura: altura,
            descricao: charDiscription?.trim() || '',
            antecedente: antecedenteSelecionado,
            habilidades: habilidadesSanitizadas,
            grupos_marcados: gruposMarcadosCriacao,
            condições: {},
            proficiencias: values,
            especie: especieSelecionada,
            regalias_de_especie: [especieSelecionadaLista, regaliaEscolhida],
            regalias_de_aprendiz: { RegaliasDeAprendizSelecionada },
            regalias_de_classe: {},
            regalias_de_especialization: {},
            regalias_de_profissao: [professionReg],
            regaliasCompradas: regaliasCompradasCriacao,
            equipamentos: selectedItems,
            pv_base_especie: statsDerivados.pvBase,
            velocidade_base_especie: statsDerivados.velBase,
            pv_regalia_classe: statsDerivados.regaliaPV,
            pm_regalia_classe: statsDerivados.regaliaMagia,
            pe_regalia_classe: statsDerivados.regaliaEstamina,
            recursos: {
                pv_atual: statsDerivados.pvMax,
                pv_max: statsDerivados.pvMax,
                pm_atual: statsDerivados.pmMax,
                pm_max: statsDerivados.pmMax,
                estamina_atual: statsDerivados.estaminaMax,
                estamina_max: statsDerivados.estaminaMax,
            },
            defesa: {
                base: 7,
                agilidade: statsDerivados.bonusDefAgi,
                armadura: 0,
                escudo: 0,
                total: statsDerivados.defesaTotal,
            },
            velocidade: {
                base_especie: statsDerivados.velBase,
                bonus_agilidade: statsDerivados.bonusVel,
                total: statsDerivados.velTotal,
            },
            iniciativa: { total: statsDerivados.iniciativa },
            carga: { capacidade_max: statsDerivados.cargaMax },
        };

        try {
            const response = await fetch(`${baseUrl}/users/${userId}/personagens`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.removeItem(STORAGE_KEY);
                setSnackbar({ open: true, message: `Personagem "${charName}" criado com sucesso! (ID: ${data.id})`, severity: 'success' });
                setTimeout(() => handleNavigateToCharPage(), 1500);
            } else {
                let errorMessage = 'Erro ao criar personagem';
                if (data.error) {
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

    // ============================================================
    // RETORNO — Tudo que os componentes necessitam
    // ============================================================
    return {
        // Navegação
        navigate, tabIndex, setTabIndex, handleTabChange, handleNavigateToCharPage,

        // Formulário básico
        charName, setCharName, charDiscription, setCharDiscription,
        gender, setGender, age, setAge, altura, setAltura,
        image, setImage, fileInputRef,
        handleDrop, handleDragOver, handleButtonClick, handleFileChange,

        // Espécie
        especieSelecionada, handleSpeciesChange,
        regaliaEscolhida, setRegaliaEscolhida,
        especieSelecionadaLista, setEspecieSelecionadaLista,
        disableMutationOpt, disableMutationOptModal,
        handleSelect,

        // Habilidades
        allValues, setAllValues,
        autoIncrementedValues, setAutoIncrementedValues,
        checkedGroups, setCheckedGroups, checkedOrder, setCheckedOrder,
        MAX_POINTS, calculateCustoEscalonado,
        setAutoIncrementedValueByName, removeAutoIncrementedValueByName,
        setAutoIncrementedProfByName,

        // Proficiências
        values, setValues, valuesPoints, setValuesPoints,
        autoIncrementedProfValues,
        handleProficienciaChange, ajustarDiscrepancia,
        remainingProfPoints, MAX_PROF_POINTS,

        // Antecedente
        antecedenteSelecionado, handleAntecedenteChange,
        antecedenteChoiceModalOpen, setAntecedenteChoiceModalOpen,
        handleAntecedenteChoiceConfirm,

        // Regalias de aprendiz
        RegaliasDeAprendiz, handleRegaliaChange,
        RegaliasDeAprendizSelecionada,

        // Profissão
        selectedId, handleToggle, professionReg,
        professionRegAntecedente,
        selectedIdModal, handleToggleArte, handleSaveArte,
        modalAberto, setModalAberto, allowedProfissoes,

        // Equipamentos / Loja
        selectedItems, selectedItemsBG,
        handleChangeShop, handleRemove,
        totalSpent, goldLimit, inicialMoney, finallMoney,

        // Grupos (Amnésico)
        group1, setGroup1, group2, setGroup2, handleGroupChange,
        open, setOpen,

        // Modais — atributos
        openForcaOuDex, setOpenForcaOuDex,
        openForcaOuDexOuFortitude, setOpenForcaOuDexOuFortitude,
        openNovicoChoices, setOpenNovicoChoices,
        openDiplomataChoices, setOpenDiplomataChoices,
        openFeiticeiroChoices, setOpenFeiticeiroChoices,
        openIniciadoChoices, setOpenIniciadoChoices,
        openExploradorChoices, setOpenExploradorChoices,
        openAcademicoChoices, setOpenAcademicoChoices,
        openProfEsgrimaOuArmadura, setOpenProfEsgrimaOuArmadura,
        openMutatioModal, setOpenMutatioModal,

        // Seleções de modais
        selectedAttribute, setSelectedAttribute,
        selectedAttributeCombatente, setSelectedAttributeCombatente,
        selectedAttributeCombatente2, setSelectedAttributeCombatente2,
        selectedAttributeNovico, setSelectedAttributeNovico,
        selectedAttributeNovico2, setSelectedAttributeNovico2,
        selectedAttributeIniciado, setSelectedAttributeIniciado,
        selectedAttributeIniciado2, setSelectedAttributeIniciado2,
        selectedAttributeFeiticeiro, setSelectedAttributeFeiticeiro,
        selectedAttributeFeiticeiro2, setSelectedAttributeFeiticeiro2,
        selectedAttributeDiplomata, setSelectedAttributeDiplomata,
        selectedAttributeExplorador, setSelectedAttributeExplorador,
        selectedAttributeExplorador2, setSelectedAttributeExplorador2,
        selectedAttributeAcademico, setSelectedAttributeAcademico,
        selectedAttributeAcademico2, setSelectedAttributeAcademico2,
        selectedProfModal, setSelectedProfModal,

        // Stats e mutação
        statsDerivados, pontosDeRegalia, mutacaoData,

        // Feedback
        snackbar, setSnackbar, isSubmitting, formErrors,
        handleCriarPersonagem,

        // Dados constantes (re-exportados para componentes)
        grupos, proficiencias, profissoes, racas, regaliasDeAprendiz,
        regaliasOpcionais, categories, antecedentes, defaultValues,
    };
}
