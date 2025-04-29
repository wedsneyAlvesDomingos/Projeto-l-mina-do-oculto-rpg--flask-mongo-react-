
import dayjs from 'dayjs';
import { Paper, Typography, Box, Grid, Autocomplete } from '@mui/material';
import Card from '@mui/material/Card';
import { PieChart } from '@mui/x-charts/PieChart';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import "./wiki.css";
import Title from "../../assets/images/image.png";
import LDO from "../../assets/images/LDO.png";
import feather from "../../assets/images/image-from-rawpixel-id-6605206-png.png";
import helmet from "../../assets/images/image-from-rawpixel-id-6439958-png.png";
import puppet from "../../assets/images/image-from-rawpixel-id-6553179-png.png";
import linkOut from "../../assets/icons/linkout.png";
import search from "../../assets/icons/search.png";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const WikiPage = () => {

    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const searchKeyWords = [
        { label: 'Regras de Combate', path: '/regrasCombate' },
        { label: 'Combate', path: '/regrasCombate' },
        { label: 'Turno', path: '/regrasCombate' },
        { label: 'Rodada', path: '/regrasCombate' },
        { label: 'Turno e Rodada', path: '/regrasCombate' },
        { label: 'Iniciativa', path: '/regrasCombate' },
        { label: 'Ordem de Combate', path: '/regrasCombate' },
        { label: 'Dano', path: '/regrasCombate' },
        { label: 'Tipos de Dano', path: '/regrasCombate' },
        { label: 'Acerto', path: '/regrasCombate' },
        { label: 'Regras de Acerto', path: '/regrasCombate' },
        { label: 'Acerto Crítico', path: '/regrasCombate' },
        { label: 'Velocidade', path: '/regrasCombate' },
        { label: 'Velocidade de Movimento', path: '/regrasCombate' },
        { label: 'Defesa', path: '/regrasCombate' },
        { label: 'Regras de Defesa', path: '/regrasCombate' },
        { label: 'Regras de Velocidade', path: '/regrasCombate' },
        { label: 'Pontos de Magia', path: '/regrasCombate' },
        { label: 'Pontos de Estamina', path: '/regrasCombate' },
        { label: 'Magia', path: '/regrasCombate' },
        { label: 'Vida', path: '/regrasCombate' },
        { label: 'Estamina', path: '/regrasCombate' },
        { label: 'Proficiência em Armas', path: '/regrasCombate' },
        { label: 'Regras de Poções', path: '/regrasCombate' },
        { label: 'Regras de Poção', path: '/regrasCombate' },
        { label: 'Regras de Armas', path: '/regrasCombate' },
        { label: 'Combate Montado', path: '/regrasCombate' },
        { label: 'Regra de Montaria', path: '/regrasCombate' },
        { label: 'Ameaça', path: '/regrasCombate' },
        { label: 'Alcance', path: '/regrasCombate' },
        { label: 'Alcance e Ameaça', path: '/regrasCombate' },
        { label: 'Campo de Visão', path: '/regrasCombate' },
        { label: 'Tamanho', path: '/regrasGerais' },
        { label: 'Carga', path: '/regrasGerais' },
        { label: 'Capacidade de Carga', path: '/regrasGerais' },
        { label: 'Vantagem', path: '/regrasGerais' },
        { label: 'Desvantagem', path: '/regrasGerais' },
        { label: 'Dinheiro', path: '/regrasGerais' },
        { label: 'Bônus e Penalidades', path: '/regrasGerais' },
        { label: 'Itens Mágicos', path: '/regrasGerais' },
        { label: 'Vulnerabilidade e Resitência', path: '/regrasGerais' },
        { label: 'Regras de Armadilhas', path: '/regrasGerais' },
        { label: 'Regras de Rituais', path: '/regrasGerais' },
        { label: 'Regras de Luz e Visão', path: '/regrasGerais' },
        { label: 'Descanso', path: '/regrasGerais' },
        { label: 'Condições', path: '/condicoes' },
        { label: 'Atordoado', path: '/condicoes' },
        { label: 'Cego', path: '/condicoes' },
        { label: 'Cansado', path: '/condicoes' },
        { label: 'Envenenado', path: '/condicoes' },
        { label: 'Restringido', path: '/condicoes' },
        { label: 'Deitado', path: '/condicoes' },
        { label: 'Incapacitado', path: '/condicoes' },
        { label: 'Surdo', path: '/condicoes' },
        { label: 'Sangrando', path: '/condicoes' },
        { label: 'Paralizado', path: '/condicoes' },
        { label: 'Aterrorizado', path: '/condicoes' },
        { label: 'À Beira da Morte', path: '/condicoes' },
        { label: 'Congelado', path: '/condicoes' },
        { label: 'Queimando', path: '/condicoes' },
        { label: 'Obscurecido', path: '/condicoes' },
        { label: 'Escondido', path: '/condicoes' },
        { label: 'Surpreso', path: '/condicoes' },
        { label: 'Devagar', path: '/condicoes' },
        { label: 'Profissões', path: '/profissoes' },
        { label: 'Ferreiro', path: '/profissoes' },
        { label: 'Criminoso', path: '/profissoes' },
        { label: 'Mercador', path: '/profissoes' },
        { label: 'Explorador', path: '/profissoes' },
        { label: 'Acadêmico', path: '/profissoes' },
        { label: 'Herbalista', path: '/profissoes' },
        { label: 'Alfaiate', path: '/profissoes' },
        { label: 'Artista', path: '/profissoes' },
        { label: 'Joalheiro', path: '/profissoes' },
        { label: 'Inventor', path: '/profissoes' },
        { label: 'Carpinteiro', path: '/profissoes' },
        { label: 'Arcanista', path: '/profissoes' },
        { label: 'Cozinheiro', path: '/profissoes' },
        { label: 'Soldado de Aluguel', path: '/profissoes' },
        { label: 'Humano', path: '/especies' },
        { label: 'Elfo', path: '/especies' },
        { label: 'Anão', path: '/especies' },
        { label: 'Féerico', path: '/especies' },
        { label: 'Draconiano', path: '/especies' },
        { label: 'Meio Elfo', path: '/especies' },
        { label: 'Meio Demônio', path: '/especies' },
        { label: 'Meio Celestial', path: '/especies' },
        { label: 'Meio Gênio', path: '/especies' },
        { label: 'Meio Troll', path: '/especies' },
        { label: 'Bestial', path: '/especies' },
        { label: 'Halfling', path: '/especies' },
        { label: 'Troll', path: '/especies' },
        { label: 'Constructo', path: '/especies' },
        { label: 'Vampiro', path: '/especies' },
        { label: 'Psíquico', path: '/especies' },
        { label: 'Mutante', path: '/especies' },
        { label: 'Habilidades', path: '/habilidades' },
        { label: 'Físico', path: '/habilidades' },
        { label: 'Conhecimento', path: '/habilidades' },
        { label: 'Arcana', path: '/habilidades' },
        { label: 'Profossiências', path: '/habilidades' },
        { label: 'Social', path: '/habilidades' },
        { label: 'Exploração', path: '/habilidades' },
        { label: 'Rodada, Turno e o Sistema de Ações', path: '/acoes' },
        { label: 'Ações primárias, Acões de movimento, Ações de Turno Completo e Reações', path: '/acoes' },
        { label: 'Abrir fechaduras', path: '/acoes' },
        { label: 'Atacar', path: '/acoes' },
        { label: 'Agarrar', path: '/acoes' },
        { label: 'Buscar', path: '/acoes' },
        { label: 'Buscar Cobertura', path: '/acoes' },
        { label: 'Comandar animal', path: '/acoes' },
        { label: 'Distrair', path: '/acoes' },
        { label: 'Derrubar', path: '/acoes' },
        { label: 'Desarmar', path: '/acoes' },
        { label: 'Empurrar', path: '/acoes' },
        { label: 'Ecapar', path: '/acoes' },
        { label: 'Esconder', path: '/acoes' },
        { label: 'Esconder um objeto', path: '/acoes' },
        { label: 'Esgueirar', path: '/acoes' },
        { label: 'Fintar', path: '/acoes' },
        { label: 'Interagir', path: '/acoes' },
        { label: 'Intimidar', path: '/acoes' },
        { label: 'Ler Ambiente', path: '/acoes' },
        { label: 'Levantar', path: '/acoes' },
        { label: 'Montar', path: '/acoes' },
        { label: 'Pedir', path: '/acoes' },
        { label: 'Performar', path: '/acoes' },
        { label: 'Preparar', path: '/acoes' },
        { label: 'Recordar reconhecimento', path: '/acoes' },
        { label: 'Primeiros socorros', path: '/acoes' },
        { label: 'Tratar Veneno', path: '/acoes' },
        { label: 'Desabilitar Habilitar dispositivo', path: '/acoes' },
        { label: 'Atenuar Queda', path: '/acoes' },
        { label: 'Ajudar', path: '/acoes' },
        { label: 'Agarrar-se', path: '/acoes' },
        { label: 'Andar, correr, voar', path: '/acoes' },
        { label: 'Escalar, nadar, saltar', path: '/acoes' },
        { label: 'Rastejar', path: '/acoes' },
        { label: 'Conduzir montaria', path: '/acoes' },
        { label: 'Atravessar acrobaticamente', path: '/acoes' },
        { label: 'Recuar cuidadosamente', path: '/acoes' },
        { label: 'Antecedentes', path: '/antecedentes' },
        { label: 'Equipamento base de antecedente', path: '/antecedentes' },
        { label: 'Abençoado', path: '/antecedentes' },
        { label: 'Acadêmico', path: '/antecedentes' },
        { label: 'Aminésico', path: '/antecedentes' },
        { label: 'Acólito', path: '/antecedentes' },
        { label: 'Acrobata', path: '/antecedentes' },
        { label: 'Adestrador de animais', path: '/antecedentes' },
        { label: 'Amaldiçoado', path: '/antecedentes' },
        { label: 'Arqueologista', path: '/antecedentes' },
        { label: 'Artesão', path: '/antecedentes' },
        { label: 'Assistênte de laboratório', path: '/antecedentes' },
        { label: 'Astrônamo', path: '/antecedentes' },
        { label: 'Ator', path: '/antecedentes' },
        { label: 'Bandido', path: '/antecedentes' },
        { label: 'Barbeiro', path: '/antecedentes' },
        { label: 'Batedor', path: '/antecedentes' },
        { label: 'Bibliotecário', path: '/antecedentes' },
        { label: 'Caçador de recompensas', path: '/antecedentes' },
        { label: 'Capanga', path: '/antecedentes' },
        { label: 'Carteiro', path: '/antecedentes' },
        { label: 'Camponês', path: '/antecedentes' },
        { label: 'Charlatão', path: '/antecedentes' },
        { label: 'Circense', path: '/antecedentes' },
        { label: 'Comerciante', path: '/antecedentes' },
        { label: 'Cortesâo', path: '/antecedentes' },
        { label: 'Curandeiro', path: '/antecedentes' },
        { label: 'Detetive', path: '/antecedentes' },
        { label: 'Eremita', path: '/antecedentes' },
        { label: 'Ecudeiro', path: '/antecedentes' },
        { label: 'Espião', path: '/antecedentes' },
        { label: 'Estudante de magia', path: '/antecedentes' },
        { label: 'Fanático', path: '/antecedentes' },
        { label: 'Forasteiro', path: '/antecedentes' },
        { label: 'Gladiador', path: '/antecedentes' },
        { label: 'Guarda', path: '/antecedentes' },
        { label: 'Herdeiro', path: '/antecedentes' },
        { label: 'Heroico', path: '/antecedentes' },
        { label: 'Jornaleiro', path: '/antecedentes' },
        { label: 'Marujo', path: '/antecedentes' },
        { label: 'Médico de beco', path: '/antecedentes' },
        { label: 'Menestrel', path: '/antecedentes' },
        { label: 'Mineirador', path: '/antecedentes' },
        { label: 'Navegador', path: '/antecedentes' },
        { label: 'Nobre', path: '/antecedentes' },
        { label: 'Nômade', path: '/antecedentes' },
        { label: 'Orfão', path: '/antecedentes' },
        { label: 'Peregrino', path: '/antecedentes' },
        { label: 'Prisioneiro', path: '/antecedentes' },
        { label: 'Refugiado', path: '/antecedentes' },
        { label: 'Taverneiro', path: '/antecedentes' },
        { label: 'Compra e vendas', path: '/equipment' },
        { label: 'Negociação', path: '/equipment' },
        { label: 'Armas', path: '/equipment' },
        { label: 'Armaduras', path: '/equipment' },
        { label: 'Equipamentos', path: '/equipment' },
        { label: 'Itens gerais', path: '/equipment' },
        { label: 'Kits', path: '/equipment' },
        { label: 'Veículos e montarias', path: '/equipment' },
        { label: 'Proficiência com armas', path: '/equipment' },
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
        { label: 'Xamã', path: '/classes' },
        { label: 'Elementalista', path: '/classes' },
        { label: 'Bruxo', path: '/classes' },
        { label: 'Metamorfo', path: '/classes' },
        { label: 'Monge', path: '/classes' },
        { label: 'Inquisitor', path: '/classes' },
        { label: 'Combatente Arcano', path: '/classes' },
        { label: 'Erudito', path: '/classes' },
        { label: 'Caçador de demônios', path: '/classes' },
        { label: 'Profano', path: '/classes' },
        { label: 'Invocador', path: '/classes' },
    ];

    const handleSearch = () => {
        const normalizedQuery = query
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/\s+/g, '');

        const found = searchKeyWords.find(opt =>
            opt.path.toLowerCase().includes(normalizedQuery)
        );

        if (found) {
            navigate(found.path);
        } else {
            navigate(`/pesquisa/${encodeURIComponent(normalizedQuery)}`);
        }
    };
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (

        <Box sx={{ minHeight: '700px', width: '100%', }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
                <Typography className="esteban" variant="h4" sx={{ textAlign: 'center', my: '30px' }}>Wiki</Typography>
                <Box sx={{ width: '40%', display: 'flex', justifyContent: 'center' }}>
                    <Autocomplete
                        freeSolo
                        options={query.length > 0 ? searchKeyWords : []}
                        getOptionLabel={(option) => option.label}
                        inputValue={query}
                        onInputChange={(event, newInputValue) => setQuery(newInputValue)}
                        onChange={(event, newValue) => {
                            if (newValue && newValue.path) {
                                navigate(newValue.path);
                            }
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Pesquisar"
                                size="small"
                                variant="outlined"
                                sx={{ background: '#ffffff', width: '100%', minWidth: '350px' }}
                                id="searchBar"
                                onKeyPress={handleKeyPress}
                            />
                        )}
                    />

                    <Button
                        className="esteban"
                        sx={{ background: '#162A22', color: '#ffffff', p: 1, width: '10%' }}
                        onClick={handleSearch}
                    >
                        <img src={search} alt="Search" style={{ width: '20px' }} />
                    </Button>
                </Box>
            </Box>
            <Grid container spacing={1} sx={{ p: 4, width: '70%', m: 'auto', minHeight: '700px' }} >
                <Grid item xs={6} sx={{ p: 2, display: 'flex', flexFlow: 'column nowrap', justifyContent: 'space-between' }}>
                    <a href="/classes" style={{ display: "flex", alignItems: "center", width: '100%', justifyContent: "center", background: '#756A34', minHeight: '80px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid #BB8130', height: '18%', position: 'relative' }}>
                        <Typography className="boxText">Classes</Typography>
                    </a>
                    <a href="/antecedentes" style={{ display: "flex", alignItems: "center", width: '100%', justifyContent: "center", background: '#756A34', minHeight: '80px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid #BB8130', height: '18%', position: 'relative' }}>
                        <Typography className="boxText">Antecedentes</Typography>
                    </a>
                    <a href="/habilidades" style={{ display: "flex", alignItems: "center", width: '100%', justifyContent: "center", background: '#756A34', minHeight: '80px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid #BB8130', height: '18%', position: 'relative' }}>
                        <Typography className="boxText">Habilidades e Proficiências</Typography>
                    </a>
                    <a href="/profissoes" style={{ display: "flex", alignItems: "center", width: '100%', justifyContent: "center", background: '#756A34', minHeight: '80px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid #BB8130', height: '18%', position: 'relative' }}>
                        <Typography className="boxText">Profissões</Typography>
                    </a>
                    <a href="/regrasGerais" style={{ display: "flex", alignItems: "center", width: '100%', justifyContent: "center", background: '#756A34', minHeight: '80px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid #BB8130', height: '18%', position: 'relative' }}>
                        <Typography className="boxText">Regras Gerais</Typography>
                    </a>
                </Grid>
                <Grid item xs={6} sx={{ p: 2, display: 'flex', flexFlow: 'column nowrap', justifyContent: 'space-between' }}>
                    <a href="/equipment" style={{ display: "flex", alignItems: "center", width: '100%', justifyContent: "center", background: '#756A34', minHeight: '80px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid #BB8130', height: '18%', position: 'relative' }}>
                        <Typography className="boxText">Equipamentos e Itens</Typography>
                    </a>
                    <a href="/acoes" style={{ display: "flex", alignItems: "center", width: '100%', justifyContent: "center", background: '#756A34', minHeight: '80px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid #BB8130', height: '18%', position: 'relative' }}>
                        <Typography className="boxText">Açoes</Typography>
                    </a>
                    <a href="/especies" style={{ display: "flex", alignItems: "center", width: '100%', justifyContent: "center", background: '#756A34', minHeight: '80px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid #BB8130', height: '18%', position: 'relative' }}>
                        <Typography className="boxText">Espécies</Typography>
                    </a>
                    <a href="/condicoes" style={{ display: "flex", alignItems: "center", width: '100%', justifyContent: "center", background: '#756A34', minHeight: '80px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid #BB8130', height: '18%', position: 'relative' }}>
                        <Typography className="boxText">Condições</Typography>
                    </a>
                    <a href="/regrasCombate" style={{ display: "flex", alignItems: "center", width: '100%', justifyContent: "center", background: '#756A34', minHeight: '80px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid #BB8130', height: '18%', position: 'relative' }}>
                        <Typography className="boxText">Regras de Combate</Typography>
                    </a>
                </Grid>

            </Grid>
            <Box sx={{ background: '#40150A', p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', width: '100%' }}>
                <Typography sx={{ color: '#fff', fontSize: '10px' }}>© 2024 Lâmina do oculto. All rights reserved.</Typography>
            </Box>
        </Box>

    );
}

export default WikiPage;
