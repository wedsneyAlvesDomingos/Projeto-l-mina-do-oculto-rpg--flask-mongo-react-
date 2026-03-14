
import React, { useState, useEffect } from 'react';
import AppFooter from '../../componentes/Footer/Footer';
import { Typography, Box, Autocomplete, Tab, Tabs } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "./wiki.css";
import search from "../../assets/icons/search.png";

// Wiki section pages
import ClassesPage from './classes/classes';
import EquipmentPage from './equipment/equipment';
import AntecendetesPage from './backgrounds/backgrounds';
import Actionspage from './actions/actions';
import HabilidadesPage from './habilidadesProenfiencias/habilidades';
import EspeciesPage from './especies/especies';
import JobsPage from './jobs/jobs';
import ConditionsPage from './conditions/conditions';
import GeneralRulesPage from './GeneralRules/generalRules';
import CombatRulesPage from './CombatRules/CombateRules';

const WIKI_TABS = [
    { label: 'Classes',                  Component: ClassesPage },
    { label: 'Antecedentes',             Component: AntecendetesPage },
    { label: 'Habilidades e Proficiências', Component: HabilidadesPage },
    { label: 'Profissões',               Component: JobsPage },
    { label: 'Regras Gerais',            Component: GeneralRulesPage },
    { label: 'Equipamentos e Itens',     Component: EquipmentPage },
    { label: 'Ações',                    Component: Actionspage },
    { label: 'Espécies',                 Component: EspeciesPage },
    { label: 'Condições',                Component: ConditionsPage },
    { label: 'Regras de Combate',        Component: CombatRulesPage },
];

// Normalise a string into a DOM-safe anchor id
const toAnchorId = s =>
    s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
     .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// maps search-result paths → tab index
const PATH_TO_TAB = {
    '/classes':      0,
    '/antecedentes': 1,
    '/habilidades':  2,
    '/profissoes':   3,
    '/regrasGerais': 4,
    '/equipment':    5,
    '/acoes':        6,
    '/especies':     7,
    '/condicoes':    8,
    '/regrasCombate':9,
};

const WikiPage = () => {

    const [activeTab, setActiveTab] = useState(0);
    // Track which tabs have ever been visited (lazy-mount + keep-alive)
    const [mounted, setMounted] = useState(() => new Set([0]));
    const [query, setQuery] = useState('');
    const [pendingAnchor, setPendingAnchor] = useState(null);

    // After the target tab becomes visible, scroll to the pending anchor
    useEffect(() => {
        if (!pendingAnchor) return;
        const timer = setTimeout(() => {
            const el = document.getElementById(pendingAnchor);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setPendingAnchor(null);
        }, 80);
        return () => clearTimeout(timer);
    }, [pendingAnchor, activeTab]);

    const handleTabChange = (_, newValue) => {
        setActiveTab(newValue);
        setMounted(prev => new Set([...prev, newValue]));
    };

    const handleTabByPath = (path) => {
        // Support optional #anchor: '/condicoes#cego' → root='/condicoes', anchor='cego'
        const [pathPart, anchor] = path.split('#');
        const root = '/' + pathPart.split('/').filter(Boolean)[0];
        const idx = PATH_TO_TAB[root];
        if (idx !== undefined) {
            handleTabChange(null, idx);
            if (anchor) {
                setPendingAnchor(anchor);
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };
    const searchKeyWords = [
        // ── Regras de Combate ──────────────────────────────────────────────
        { label: 'Regras de Combate', path: '/regrasCombate' },
        { label: 'Combate', path: '/regrasCombate' },
        { label: 'Turno', path: '/regrasCombate#turno-e-rodada' },
        { label: 'Rodada', path: '/regrasCombate#turno-e-rodada' },
        { label: 'Turno e Rodada', path: '/regrasCombate#turno-e-rodada' },
        { label: 'Iniciativa', path: '/regrasCombate#iniciativa' },
        { label: 'Ordem de Combate', path: '/regrasCombate#iniciativa' },
        { label: 'Dano', path: '/regrasCombate#dano' },
        { label: 'Tipos de Dano', path: '/regrasCombate#dano' },
        { label: 'Acerto', path: '/regrasCombate#acerto' },
        { label: 'Regras de Acerto', path: '/regrasCombate#acerto' },
        { label: 'Acerto Crítico', path: '/regrasCombate#acerto-critico' },
        { label: 'Velocidade', path: '/regrasCombate#velocidade-de-movimento' },
        { label: 'Velocidade de Movimento', path: '/regrasCombate#velocidade-de-movimento' },
        { label: 'Defesa', path: '/regrasCombate#defesa' },
        { label: 'Regras de Defesa', path: '/regrasCombate#defesa' },
        { label: 'Regras de Velocidade', path: '/regrasCombate#velocidade-de-movimento' },
        { label: 'Pontos de Vida', path: '/regrasCombate#pontos-de-vida' },
        { label: 'Pontos de Magia', path: '/regrasCombate#pontos-de-magia' },
        { label: 'Pontos de Estamina', path: '/regrasCombate#pontos-de-estamina' },
        { label: 'Magia', path: '/regrasCombate#pontos-de-magia' },
        { label: 'Vida', path: '/regrasCombate#pontos-de-vida' },
        { label: 'Estamina', path: '/regrasCombate#pontos-de-estamina' },
        { label: 'Proficiência em Armas', path: '/regrasCombate#proficiencia-em-armas' },
        { label: 'Regras de Poções', path: '/regrasCombate#pocoes-de-recuperacao' },
        { label: 'Regras de Poção', path: '/regrasCombate#pocoes-de-recuperacao' },
        { label: 'Regras de Armas', path: '/regrasCombate#proficiencia-em-armas' },
        { label: 'Combate Montado', path: '/regrasCombate#combate-montado' },
        { label: 'Regra de Montaria', path: '/regrasCombate#combate-montado' },
        { label: 'Ameaça', path: '/regrasCombate#alcance-de-ameaca' },
        { label: 'Alcance', path: '/regrasCombate#alcance-de-ameaca' },
        { label: 'Alcance e Ameaça', path: '/regrasCombate#alcance-de-ameaca' },
        { label: 'Campo de Visão', path: '/regrasCombate#campo-de-visao' },
        // ── Regras Gerais ──────────────────────────────────────────────────
        { label: 'Tamanho', path: '/regrasGerais#tamanho' },
        { label: 'Carga', path: '/regrasGerais#tamanho' },
        { label: 'Capacidade de Carga', path: '/regrasGerais#tamanho' },
        { label: 'Vantagem', path: '/regrasGerais#vantagem-e-desvantagem' },
        { label: 'Desvantagem', path: '/regrasGerais#vantagem-e-desvantagem' },
        { label: 'Dinheiro', path: '/regrasGerais#dinheiro' },
        { label: 'Bônus e Penalidades', path: '/regrasGerais#bonus-ou-penalidade-de-acerto-e-defesa' },
        { label: 'Itens Mágicos', path: '/regrasGerais#itens-magicos' },
        { label: 'Vulnerabilidade e Resitência', path: '/regrasGerais#vulnerabilidade-e-resistencia' },
        { label: 'Regras de Armadilhas', path: '/regrasGerais#armadilhas' },
        { label: 'Regras de Rituais', path: '/regrasGerais#rituais-opcional' },
        { label: 'Regras de Luz e Visão', path: '/regrasGerais#luz-e-visao' },
        { label: 'Descanso', path: '/regrasGerais#descanso' },
        { label: 'Regalias', path: '/regrasGerais#regalias-e-pontos-de-regalia' },
        // ── Condições ─────────────────────────────────────────────────────
        { label: 'Condições', path: '/condicoes' },
        { label: 'Atordoado', path: '/condicoes#atordoado' },
        { label: 'Cego', path: '/condicoes#cego' },
        { label: 'Cansado', path: '/condicoes#cansado' },
        { label: 'Envenenado', path: '/condicoes#envenenado' },
        { label: 'Restringido', path: '/condicoes#restringido' },
        { label: 'Deitado', path: '/condicoes#deitado' },
        { label: 'Incapacitado', path: '/condicoes#incapacitado' },
        { label: 'Surdo', path: '/condicoes#surdo' },
        { label: 'Sangrando', path: '/condicoes#sangrando' },
        { label: 'Paralizado', path: '/condicoes#paralisado' },
        { label: 'Aterrorizado', path: '/condicoes#aterrorizado' },
        { label: 'À Beira da Morte', path: '/condicoes#a-beira-da-morte' },
        { label: 'Congelado', path: '/condicoes#congelando' },
        { label: 'Queimando', path: '/condicoes#queimando' },
        { label: 'Obscurecido', path: '/condicoes#obscurecido' },
        { label: 'Escondido', path: '/condicoes#escondido' },
        { label: 'Surpreso', path: '/condicoes#surpreso' },
        { label: 'Devagar', path: '/condicoes#devagar' },
        // ── Profissões ────────────────────────────────────────────────────
        { label: 'Profissões', path: '/profissoes' },
        { label: 'Ferreiro', path: '/profissoes#ferreiro' },
        { label: 'Criminoso', path: '/profissoes#criminoso' },
        { label: 'Mercador', path: '/profissoes#mercador' },
        { label: 'Explorador', path: '/profissoes#explorador' },
        { label: 'Acadêmico', path: '/profissoes#academico' },
        { label: 'Herbalista', path: '/profissoes#herbalista' },
        { label: 'Alfaiate', path: '/profissoes#alfaiate' },
        { label: 'Artista', path: '/profissoes#artista' },
        { label: 'Joalheiro', path: '/profissoes#joalheiro' },
        { label: 'Inventor', path: '/profissoes#inventor' },
        { label: 'Carpinteiro', path: '/profissoes#carpinteiro' },
        { label: 'Arcanista', path: '/profissoes#arcanista' },
        { label: 'Cozinheiro', path: '/profissoes#cozinheiro' },
        { label: 'Soldado de Aluguel', path: '/profissoes#soldado-de-aluguel' },
        // ── Espécies ──────────────────────────────────────────────────────
        { label: 'Humano', path: '/especies#humano' },
        { label: 'Elfo', path: '/especies#elfo' },
        { label: 'Anão', path: '/especies#anao' },
        { label: 'Féerico', path: '/especies#feerico' },
        { label: 'Draconiano', path: '/especies#draconiano' },
        { label: 'Meio Elfo', path: '/especies#meio-elfo' },
        { label: 'Meio Demônio', path: '/especies#meio-demonio' },
        { label: 'Meio Celestial', path: '/especies#meio-celestial' },
        { label: 'Meio Gênio', path: '/especies#meio-genio' },
        { label: 'Meio Troll', path: '/especies#meio-troll' },
        { label: 'Bestial', path: '/especies#bestial' },
        { label: 'Halfling', path: '/especies#halfling' },
        { label: 'Troll', path: '/especies#troll' },
        { label: 'Constructo', path: '/especies#constructo' },
        { label: 'Vampiro', path: '/especies#vampiro-wight-draugr' },
        { label: 'Psíquico', path: '/especies#psiquico' },
        { label: 'Mutante', path: '/especies#mutante' },
        // ── Habilidades ───────────────────────────────────────────────────
        { label: 'Habilidades', path: '/habilidades' },
        { label: 'Físico', path: '/habilidades#fisico' },
        { label: 'Conhecimento', path: '/habilidades#conhecimento' },
        { label: 'Arcana', path: '/habilidades#arcana' },
        { label: 'Profossiências', path: '/habilidades' },
        { label: 'Social', path: '/habilidades#social' },
        { label: 'Exploração', path: '/habilidades#exploracao' },
        // ── Ações ─────────────────────────────────────────────────────────
        { label: 'Rodada, Turno e o Sistema de Ações', path: '/acoes' },
        { label: 'Ações primárias, Acões de movimento, Ações de Turno Completo e Reações', path: '/acoes' },
        { label: 'Abrir fechaduras', path: '/acoes#abrir-fechadura' },
        { label: 'Atacar', path: '/acoes#atacar' },
        { label: 'Agarrar', path: '/acoes#agarrar' },
        { label: 'Buscar', path: '/acoes#buscar' },
        { label: 'Buscar Cobertura', path: '/acoes#buscar-cobertura' },
        { label: 'Comandar animal', path: '/acoes#comandar-animal' },
        { label: 'Distrair', path: '/acoes#distrair' },
        { label: 'Derrubar', path: '/acoes#derrubar' },
        { label: 'Desarmar', path: '/acoes#desarmar' },
        { label: 'Empurrar', path: '/acoes#empurrar' },
        { label: 'Ecapar', path: '/acoes#escapar' },
        { label: 'Esconder', path: '/acoes#esconder' },
        { label: 'Esconder um objeto', path: '/acoes#esconder-um-objeto' },
        { label: 'Esgueirar', path: '/acoes#esgueirar' },
        { label: 'Fintar', path: '/acoes#fintar' },
        { label: 'Interagir', path: '/acoes#interagir' },
        { label: 'Intimidar', path: '/acoes#intimidar' },
        { label: 'Ler Ambiente', path: '/acoes#ler-ambiente' },
        { label: 'Levantar', path: '/acoes#levantar' },
        { label: 'Montar', path: '/acoes#montar' },
        { label: 'Pedir', path: '/acoes#pedir' },
        { label: 'Performar', path: '/acoes#performar' },
        { label: 'Preparar', path: '/acoes#preparar' },
        { label: 'Recordar reconhecimento', path: '/acoes#recordar-conhecimento' },
        { label: 'Primeiros socorros', path: '/acoes#primeiros-socorros' },
        { label: 'Tratar Veneno', path: '/acoes#tratar-veneno' },
        { label: 'Desabilitar Habilitar dispositivo', path: '/acoes#desabilitar-habilitar-dispositivo' },
        { label: 'Atenuar Queda', path: '/acoes#atenuar-queda' },
        { label: 'Ajudar', path: '/acoes#ajudar' },
        { label: 'Agarrar-se', path: '/acoes#agarrar-se' },
        { label: 'Andar, correr, voar', path: '/acoes#andar-ou-correr' },
        { label: 'Escalar, nadar, saltar', path: '/acoes#escalar' },
        { label: 'Rastejar', path: '/acoes#rastejar' },
        { label: 'Conduzir montaria', path: '/acoes#conduzir-montaria' },
        { label: 'Atravessar acrobaticamente', path: '/acoes#atravessar-acrobaticamente' },
        { label: 'Recuar cuidadosamente', path: '/acoes#recuar-cuidadosamente' },
        // ── Antecedentes ──────────────────────────────────────────────────
        { label: 'Antecedentes', path: '/antecedentes' },
        { label: 'Equipamento base de antecedente', path: '/antecedentes' },
        { label: 'Abençoado', path: '/antecedentes#abencado' },
        { label: 'Acadêmico', path: '/antecedentes#academico' },
        { label: 'Aminésico', path: '/antecedentes#aminesico' },
        { label: 'Acólito', path: '/antecedentes#acolito' },
        { label: 'Acrobata', path: '/antecedentes#acrobata' },
        { label: 'Adestrador de animais', path: '/antecedentes#adestrador-de-animais' },
        { label: 'Amaldiçoado', path: '/antecedentes#amaldicado' },
        { label: 'Arqueologista', path: '/antecedentes#arqueologista' },
        { label: 'Artesão', path: '/antecedentes#artesao' },
        { label: 'Assistênte de laboratório', path: '/antecedentes#assistente-de-laboratorio' },
        { label: 'Astrônamo', path: '/antecedentes#astronomo' },
        { label: 'Ator', path: '/antecedentes#ator' },
        { label: 'Bandido', path: '/antecedentes#bandido' },
        { label: 'Barbeiro', path: '/antecedentes#barbeiro' },
        { label: 'Batedor', path: '/antecedentes#batedor' },
        { label: 'Bibliotecário', path: '/antecedentes#bibliotecario' },
        { label: 'Caçador de recompensas', path: '/antecedentes#cacador-de-recompensas' },
        { label: 'Capanga', path: '/antecedentes#capanga' },
        { label: 'Carteiro', path: '/antecedentes#carteiro' },
        { label: 'Camponês', path: '/antecedentes#campones' },
        { label: 'Charlatão', path: '/antecedentes#charlatao' },
        { label: 'Circense', path: '/antecedentes#circense' },
        { label: 'Comerciante', path: '/antecedentes#comerciante' },
        { label: 'Cortesâo', path: '/antecedentes#cortesao' },
        { label: 'Curandeiro', path: '/antecedentes#curandeiro' },
        { label: 'Detetive', path: '/antecedentes#detetive' },
        { label: 'Eremita', path: '/antecedentes#eremita' },
        { label: 'Ecudeiro', path: '/antecedentes#escudeiro' },
        { label: 'Espião', path: '/antecedentes#espiao' },
        { label: 'Estudante de magia', path: '/antecedentes#estudante-de-magia' },
        { label: 'Fanático', path: '/antecedentes#fanatico' },
        { label: 'Forasteiro', path: '/antecedentes#forasteiro' },
        { label: 'Gladiador', path: '/antecedentes#gladiador' },
        { label: 'Guarda', path: '/antecedentes#guarda' },
        { label: 'Herdeiro', path: '/antecedentes#herdeiro' },
        { label: 'Heroico', path: '/antecedentes#heroico' },
        { label: 'Jornaleiro', path: '/antecedentes#jornaleiro' },
        { label: 'Marujo', path: '/antecedentes#marujo' },
        { label: 'Médico de beco', path: '/antecedentes#medico-de-beco' },
        { label: 'Menestrel', path: '/antecedentes#menestrel' },
        { label: 'Mineirador', path: '/antecedentes#mineirador' },
        { label: 'Navegador', path: '/antecedentes#navegador' },
        { label: 'Nobre', path: '/antecedentes#nobre' },
        { label: 'Nômade', path: '/antecedentes#nomade' },
        { label: 'Orfão', path: '/antecedentes#orfao' },
        { label: 'Peregrino', path: '/antecedentes#peregrino' },
        { label: 'Prisioneiro', path: '/antecedentes#prisioneiro' },
        { label: 'Refugiado', path: '/antecedentes#refugiado' },
        { label: 'Taverneiro', path: '/antecedentes#taverneiro' },
        // ── Equipamentos ──────────────────────────────────────────────────
        { label: 'Compra e vendas', path: '/equipment' },
        { label: 'Negociação', path: '/equipment' },
        { label: 'Armas', path: '/equipment#armas' },
        { label: 'Armaduras', path: '/equipment#armaduras' },
        { label: 'Equipamentos', path: '/equipment' },
        { label: 'Itens gerais', path: '/equipment' },
        { label: 'Kits', path: '/equipment#kits' },
        { label: 'Veículos e montarias', path: '/equipment#veiculos-e-montarias' },
        { label: 'Proficiência com armas', path: '/equipment#armas' },
        { label: 'Adaga', path: '/equipment' },
        { label: 'Adaga de mola', path: '/equipment' },
        { label: 'Arco curto', path: '/equipment' },
        { label: 'Azagaia', path: '/equipment' },
        { label: 'Bastão acochoado', path: '/equipment' },
        { label: 'Besta Leve', path: '/equipment' },
        { label: 'Bordão', path: '/equipment' },
        { label: 'Clava', path: '/equipment' },
        { label: 'Espada curta', path: '/equipment' },
        { label: 'Funda', path: '/equipment' },
        { label: 'Lança', path: '/equipment' },
        { label: 'Maça', path: '/equipment' },
        { label: 'Machadinha', path: '/equipment' },
        { label: 'Martelo leve', path: '/equipment' },
        { label: 'Tacape', path: '/equipment' },
        { label: 'Aji', path: '/equipment' },
        { label: 'Alabarda  ', path: '/equipment' },
        { label: 'Alfange', path: '/equipment' },
        { label: 'Arco longo', path: '/equipment' },
        { label: 'Besta de mão', path: '/equipment' },
        { label: 'Besta pesada', path: '/equipment' },
        { label: 'Cajado de batalha', path: '/equipment' },
        { label: 'Chicote', path: '/equipment' },
        { label: 'Cimitarra', path: '/equipment' },
        { label: 'Corrente de cravos', path: '/equipment' },
        { label: 'Espada bastarda', path: '/equipment' },
        { label: 'Espada grande', path: '/equipment' },
        { label: 'Espada longa', path: '/equipment' },
        { label: 'Florete', path: '/equipment' },
        { label: 'Foice', path: '/equipment' },
        { label: 'Katana', path: '/equipment' },
        { label: 'Catapulta de braço', path: '/equipment' },
        { label: 'Manopla de espinhos', path: '/equipment' },
        { label: 'Espada de lâminas duplas', path: '/equipment' },
        { label: 'Espada de diapasão', path: '/equipment' },
        { label: 'Espada táurica', path: '/equipment' },
        { label: 'Katar', path: '/equipment' },
        { label: 'Lança foguete', path: '/equipment' },
        { label: 'Lança mola', path: '/equipment' },
        { label: 'Machado anão', path: '/equipment' },
        { label: 'Machado táurico', path: '/equipment' },
        { label: 'Marreta pistão', path: '/equipment' },
        { label: 'Martelo pistão', path: '/equipment' },
        { label: 'Montante Cinético', path: '/equipment' },
        { label: 'Mosquetão', path: '/equipment' },
        { label: 'Presa da serpente', path: '/equipment' },
        { label: 'Vara relâmpago', path: '/equipment' },
        { label: 'Wakizashi', path: '/equipment' },
        { label: 'Tridente', path: '/equipment' },
        { label: 'Sai', path: '/equipment' },
        { label: 'Sabre serrilhado', path: '/equipment' },
        { label: 'Rede', path: '/equipment' },
        { label: 'Pistola de tambor', path: '/equipment' },
        { label: 'Pistola', path: '/equipment' },
        { label: 'Pique', path: '/equipment' },
        { label: 'Nunchaku', path: '/equipment' },
        { label: 'Mosquete', path: '/equipment' },
        { label: 'Martelo de guerra', path: '/equipment' },
        { label: 'Marreta estilhaçadora', path: '/equipment' },
        { label: 'Marreta', path: '/equipment' },
        { label: 'Manopla espada', path: '/equipment' },
        { label: 'Mangual', path: '/equipment' },
        { label: 'Mangual Pesado', path: '/equipment' },
        { label: 'Machado grande', path: '/equipment' },
        { label: 'Maça de guerra', path: '/equipment' },
        { label: 'Maça estrela', path: '/equipment' },
        { label: 'Lança montada', path: '/equipment' },
        { label: 'Lança de falange', path: '/equipment' },
        { label: 'Arco composto', path: '/equipment' },
        { label: 'Florete Agulha', path: '/equipment' },
        { label: 'Fogo alquímico', path: '/equipment' },
        { label: 'Pó de explosão solar', path: '/equipment' },
        { label: 'Classes', path: '/classes' },
        { label: 'Aprendiz', path: '/classes/aprendiz' },
        { label: 'Regalias', path: '/regrasGerais' },
        { label: 'Regalias de classe', path: '/classes' },
        { label: 'Progressão de classe', path: '/classes' },
        { label: 'Combatente', path: '/classes/combatente' },
        { label: 'Noviço', path: '/classes/novico' },
        { label: 'Iniciado', path: '/classes/iniciado' },
        { label: 'Feiticeiro', path: '/classes/feiticeiro' },
        { label: 'Especializações', path: '/classes' },
        { label: 'Cavaleiro', path: '/classes/cavaleiro' },
        { label: 'Caçador', path: '/classes/cacador' },
        { label: 'Assassino', path: '/classes/assassino' },
        { label: 'Bárbaro', path: '/classes/barbaro' },
        { label: 'Mago', path: '/classes/mago' },
        { label: 'Professor', path: '/classes/professor' },
        { label: 'Exorcista', path: '/classes/exorcista' },
        { label: 'Sarcedote', path: '/classes/sarcedote' },
        { label: 'Xamã', path: '/classes/xama' },
        { label: 'Elementalista', path: '/classes/elementalista' },
        { label: 'Bruxo', path: '/classes/bruxo' },
        { label: 'Metamorfo', path: '/classes/metamorfo' },
        { label: 'Monge', path: '/classes/monge' },
        { label: 'Inquisidor', path: '/classes/inquisidor' },
        { label: 'Combatente Arcano', path: '/classes/combatenteArcano' },
        { label: 'Erudito', path: '/classes/erudito' },
        { label: 'Caçador de demônios', path: '/classes/cacadorDeDemonios' },
        { label: 'Profano', path: '/classes/profano' },
        { label: 'Invocador', path: '/classes/invocador' },
    ];

    const handleSearch = () => {
        const normalizedQuery = query
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/\s+/g, '');

        const found = searchKeyWords.find(opt =>
            opt.label.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, '').includes(normalizedQuery) ||
            opt.path.toLowerCase().replace(/\s+/g, '').includes(normalizedQuery)
        );

        if (found) {
            handleTabByPath(found.path);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>

            {/* ── Main row: sidebar + content ── */}
            <Box sx={{ display: 'flex', flex: 1 }}>

            {/* ── Sidebar ── */}
            <Box
                component="nav"
                sx={{
                    width: 200,
                    flexShrink: 0,
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    overflowY: 'auto',
                    borderRight: '1px solid var(--panel-border, #2F3C29)',
                    background: 'var(--panel-bg)',
                    display: 'flex',
                    flexDirection: 'column',
                    pt: 2,
                    pb: 2,
                }}
            >
                {/* Title */}
                <Typography
                    className="esteban"
                    variant="h5"
                    sx={{ textAlign: 'center', mb: 2, color: 'var(--text-primary)', fontWeight: 700, letterSpacing: 1 }}
                >
                    Wiki
                </Typography>

                {/* Search */}
                <Box sx={{ px: 1, mb: 2, display: 'flex', gap: 0.5 }}>
                    <Autocomplete
                        freeSolo
                        options={query.length > 0 ? searchKeyWords : []}
                        getOptionLabel={(option) => option.label}
                        inputValue={query}
                        onInputChange={(_, v) => setQuery(v)}
                        onChange={(_, newValue) => {
                            if (newValue && newValue.path) {
                                handleTabByPath(newValue.path);
                                setQuery('');
                            }
                        }}
                        sx={{ flex: 1 }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Pesquisar"
                                size="small"
                                variant="outlined"
                                sx={{ background: 'var(--input-bg)' }}
                                onKeyPress={handleKeyPress}
                            />
                        )}
                    />
                    <Button
                        sx={{ minWidth: 0, p: '6px', background: 'var(--action-bg)', color: '#fff' }}
                        onClick={handleSearch}
                    >
                        <img src={search} alt="Buscar" style={{ width: 16 }} />
                    </Button>
                </Box>

                {/* Vertical tabs */}
                <Tabs
                    orientation="vertical"
                    value={activeTab}
                    onChange={handleTabChange}
                    aria-label="Wiki navigation"
                    sx={{
                        '& .MuiTab-root': {
                            fontFamily: '"Esteban", serif',
                            fontSize: '13px',
                            textTransform: 'none',
                            alignItems: 'flex-start',
                            textAlign: 'left',
                            pl: 2,
                            minHeight: 44,
                        },
                        '& .Mui-selected': {
                            color: 'var(--text-accent, #756A34) !important',
                            fontWeight: 700,
                            background: 'var(--surface-raised, rgba(117,106,52,0.12))',
                        },
                        '& .MuiTabs-indicator': {
                            left: 0,
                            right: 'unset',
                            width: 3,
                            backgroundColor: 'var(--text-accent, #756A34)',
                        },
                    }}
                >
                    {WIKI_TABS.map((tab, i) => (
                        <Tab key={i} label={tab.label} id={`wiki-tab-${i}`} aria-controls={`wiki-panel-${i}`} />
                    ))}
                </Tabs>
            </Box>

            {/* ── Content area ── */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
                {WIKI_TABS.map(({ Component }, i) => (
                    <Box
                        key={i}
                        role="tabpanel"
                        id={`wiki-panel-${i}`}
                        aria-labelledby={`wiki-tab-${i}`}
                        sx={{ display: activeTab === i ? 'block' : 'none' }}
                    >
                        {mounted.has(i) && <Component />}
                    </Box>
                ))}
            </Box>

            </Box>{/* end main row */}

            <AppFooter />
        </Box>
    );
}

export default WikiPage;
