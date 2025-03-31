import React, { useState, useEffect } from 'react';
import { Card, CardContent, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./backgrounds.css";


const AntecendetesPage = () => {
    const antecedentes = [
        {
            "nome": "ABENÇOADO",
            "descricao":
                "Um personagem com este antecedente possui um histórico religioso e foi tocado por uma divindade.",
            "habilidades": [
                "2 pontos em Teologia e História",
                "2 pontos em Intuição",
                "-1 em Ritualismo e Ocultismo",
            ],
        },
        {
            "nome": "ACADÊMICO",
            "descricao":
                "Um personagem com este antecedente possui um histórico estudioso, passando muito tempo em uma academia.",
            "habilidades": [
                "2 pontos em História e Natureza",
                "1 ponto em Jurisprudência",
                "1 ponto na proficiência Línguas Antigas",
            ],
        },
        {
            "nome": "ACÓLITO",
            "descricao":
                "Um personagem com este antecedente é um devoto de um templo.",
            "habilidades": [
                "2 pontos em Teologia e Jurisprudência",
                "1 ponto em História e Intuição",
                "Um símbolo religioso que permite conjurar o milagre Tocha Sagrada por 10 minutos 1 vez no dia.",
            ],
        },
        {
            "nome": "ACROBATA",
            "descricao": "Um personagem com este antecedente possui um histórico de ser um ginasta ou praticante de algum tipo de apresentação artística acrobática. Um acrobata consegue ser flexível e tem um conhecimento do próprio corpo.",
            "habilidades": [
                "2 pontos em Acrobacia",
                "2 pontos em Performance",
                "1 ponto em Destreza",
                "1 ponto em Agilidade"
            ]
        },
        {
            "nome": "ADESTRADOR DE ANIMAIS",
            "descricao": "Um personagem com este antecedente possui um histórico de lidar com animais com fim de treinamento.",
            "habilidades": [
                "2 pontos em Intuição",
                "2 pontos em Lidar com animais",
                "1 ponto em Natureza",
                "1 ponto em Armadilhas"
            ]
        },
        {
            "nome": "AMALDIÇOADO",
            "descricao": "Um personagem com este antecedente possui um histórico de tormento e de azar. Um personagem pode ter sido amaldiçoado por um demônio, bruxo ou outro membro do oculto.",
            "habilidades": [
                "2 pontos em Percepção",
                "2 pontos em Ocultismo",
                "2 pontos em Intimidação",
                "2 pontos em Ritualismo",
                "-1 ponto em Intuição",
                "-1 ponto em Persuasão"
            ]
        },
        {
            "nome": "AMNÉSICO",
            "descricao": "Um personagem com este antecedente não possui um histórico.",
            "habilidades": [
                "2 pontos em Habilidade escolhida",
                "2 pontos em Habilidade escolhida",
                "1 ponto em Habilidade escolhida",
                "1 ponto em Habilidade escolhida"
            ]
        },
        {
            "nome": "ARQUEOLOGISTA",
            "descricao": "Um personagem com este antecedente possui um histórico acadêmico. Passou anos estudando história e explorando ruínas.",
            "habilidades": [
                "2 pontos em História",
                "2 pontos em Navegação",
                "1 ponto em Natureza",
                "1 ponto em Investigação",
                "1 ponto em Proficiência Arqueólogo"
            ]
        },
        {
            "nome": "ARTESÃO",
            "descricao": "Um personagem com este antecedente possui um histórico de trabalhar com criações manuais de madeira, pedra, tecido ou argila.",
            "habilidades": [
                "2 pontos em Natureza",
                "2 pontos em Percepção",
                "1 ponto em Negociação",
                "1 ponto em Destreza",
                "1 ponto em Ferreiro, Alfaiate, Marceneiro ou Joalheiro",
                "1 kit de Ferramentas"
            ]
        },
        {
            "nome": "ASSISTENTE DE LABORATÓRIO",
            "descricao": "Um personagem com este antecedente possui um histórico de ajudar em pesquisas feitas em um laboratório químico.",
            "habilidades": [
                "2 pontos em Natureza",
                "2 pontos em Alquimia",
                "1 ponto em História",
                "1 ponto em Arcanismo",
                "1 ponto em Mutações da espécie variante Mutante"
            ]
        },
        {
            "nome": "ASTRÔNOMO",
            "descricao": "Um personagem com este antecedente possui um histórico acadêmico do estudo das estrelas e seus padrões.",
            "habilidades": [
                "2 pontos em Navegação",
                "2 pontos em Natureza",
                "1 ponto em História",
                "1 ponto em Percepção",
                "1 Mapa das estrelas",
                "1 telescópio portátil",
                "1 kit de cartografia"
            ]
        },
        {
            "nome": "ATOR",
            "descricao": "Um personagem com este antecedente possui um histórico de ser um artista das artes cênicas.",
            "habilidades": [
                "2 pontos em Performance",
                "2 pontos em Persuasão",
                "1 ponto em Sedução",
                "1 ponto em Enganação",
                "1 ponto na Proficiência em Disfarce",
                "1 kit de disfarce"
            ]
        },
        {
            "nome": "BANDIDO",
            "descricao": "Um personagem com este antecedente possui um histórico de atacar viajantes na beira das estradas ou vítimas indefesas em becos.",
            "habilidades": [
                "2 pontos em Intimidação",
                "2 pontos em Furtividade",
                "1 ponto em Agilidade",
                "1 ponto em Percepção",
                "1 kit de Arrombamento"
            ]
        },
        {
            "nome": "BARBEIRO",
            "descricao": "Um personagem com este antecedente possui um histórico de ser um trabalhador comum em uma cidade, que trabalha cortando cabelo e fazendo a barba de clientes.",
            "habilidades": [
                "2 pontos em Intuição",
                "2 pontos em Negociação",
                "1 ponto em Agilidade",
                "1 ponto em Destreza",
                "1 kit de disfarce"
            ]
        },
        {
            "nome": "BATEDOR",
            "descricao": "Um personagem com este antecedente possui um histórico de ser um forma de soldado ou informante dentro de uma instituição ou contratado por uma caravana.",
            "habilidades": [
                "2 pontos em Sobrevivência",
                "2 pontos em Navegação",
                "1 ponto em Furtividade",
                "1 ponto em Percepção",
                "1 ponto na Proficiência em kit de arrombamento",
                "1 kit de explorador",
                "1 kit de escalada"
            ]
        },
        {
            "nome": "BIBLIOTECÁRIO",
            "descricao": "Um personagem com este antecedente possui um histórico de ser um trabalhador comum em uma grande cidade, mais especificamente na biblioteca de uma academia ou particular.",
            "habilidades": [
                "2 pontos em História",
                "2 pontos em Jurisprudência",
                "1 ponto em Teologia",
                "1 ponto em Natureza",
                "1 ponto na Proficiência em Línguas Antigas"
            ]
        },
        {
            "nome": "CAÇADOR DE RECOMPENSAS",
            "descricao": "Um personagem com este antecedente possui um histórico de caçar criminosos procurados.",
            "habilidades": [
                "2 pontos em Rastreamento",
                "2 pontos em Investigação",
                "1 ponto em Persuasão",
                "1 ponto em Negociação",
                "1 kit de explorador"
            ]
        },
        {
            "nome": "CAPANGA",
            "descricao": "Um personagem com este antecedente possui um histórico de trabalhar como músculo de cobrança ou proteção de um criminoso ou outro tipo de indivíduo excuso.",
            "habilidades": [
                "2 pontos em Negociação",
                "2 pontos em Intimidação",
                "1 ponto em Fortitude",
                "1 ponto em Força",
                "1 kit de arrombamento"
            ]
        },
        {
            "nome": "CARTEIRO",
            "descricao": "Um personagem com este antecedente possui um histórico de trabalhar como entregador de correspondências.",
            "habilidades": [
                "2 pontos em Percepção",
                "2 pontos em Navegação",
                "1 ponto em Agilidade",
                "1 ponto em Intuição",
                "1 kit de explorador",
                "1 kit de cartografia",
                "1 ponto na proficiência condução de veículos terrestres",
                "1 cavalo (50 po.)"
            ]
        },
        {
            "nome": "CAMPONÊS",
            "descricao": "Um personagem com este antecedente possui um histórico simples e tranquilo. Viveu possivelmente sem muitos luxos, mas não necessariamente em grande pobreza.",
            "habilidades": [
                "2 pontos em Sobrevivência",
                "2 pontos em Lidar com animais",
                "1 ponto em Fortitude",
                "1 ponto em Destreza",
                "2 pontos na Proficiência Condução e Veículos Terrestres"
            ]
        },
        {
            "nome": "CHARLATÃO",
            "descricao": "Um personagem com este antecedente possui um histórico de enganar e dar golpes em desavisados pelas cidades e vilas por aí.",
            "habilidades": [
                "2 pontos em Performance",
                "2 pontos em Enganação",
                "1 ponto em Persuasão",
                "1 ponto em Agilidade",
                "1 ponto na Proficiência Disfarce",
                "1 kit de disfarce"
            ]
        },
        {
            "nome": "CIRCENSE",
            "descricao": "Um personagem com este antecedente possui um histórico de viajar com um circo pelas estradas do mundo sem um rumo e atrás de novos clientes e experiências.",
            "habilidades": [
                "2 pontos em Navegação",
                "2 pontos em Performance",
                "1 ponto em Agilidade",
                "1 ponto em Acrobacia",
                "1 mutação da lista de mutações da espécie variante Mutante"
            ]
        },
        {
            "nome": "COMERCIANTE",
            "descricao": "Um personagem com este antecedente possui um histórico de trabalhar com venda e/ou compra de produtos, serviços e imóveis.",
            "habilidades": [
                "2 pontos em Negociação",
                "2 pontos em Apurar Itens Mágicos",
                "1 ponto em Enganação",
                "1 ponto em Persuasão",
                "1 kit de Sobrevivência"
            ]
        },
        {
            "nome": "CORTESÃO",
            "descricao": "Um personagem com este antecedente possui um histórico social de alto status.",
            "habilidades": [
                "2 pontos em História",
                "2 pontos em Persuasão",
                "1 ponto em Sedução",
                "1 ponto em Intuição",
                "Vestuárias finas"
            ]
        },
        {
            "nome": "CURANDEIRO",
            "descricao": "Um personagem com este antecedente possui um histórico de trabalhar como um farmacêutico e responsável por doentes em pequenas vilas e cidades.",
            "habilidades": [
                "2 pontos em Medicina",
                "2 pontos em Natureza",
                "1 ponto em Sobrevivência",
                "1 ponto em Alquimia",
                "1 kit Médico",
                "1 kit de Herbalismo"
            ]
        },
        {
            "nome": "DETETIVE",
            "descricao": "Um personagem com este antecedente possui um histórico de ser um detetive particular que recolhe informações para a guarda ou civis.",
            "habilidades": [
                "2 pontos em Investigação",
                "2 pontos em Rastreio",
                "1 ponto em Jurisprudência",
                "1 ponto em Intuição",
                "1 kit de explorador"
            ]
        },
        {
            "nome": "EREMITA",
            "descricao": "Um personagem com este antecedente possui um histórico de isolamento por penitência ou amor à natureza.",
            "habilidades": [
                "2 pontos em Natureza",
                "2 pontos em Sobrevivência",
                "1 ponto em Furtividade",
                "1 ponto em Lidar com Animais",
                "1 kit de sobrevivência"
            ]
        },
        {
            "nome": "ESCUDEIRO",
            "descricao": "Um personagem com este antecedente possui um histórico de trabalhar para um cavaleiro em uma batalha ou competição. Geralmente os escudeiros são treinados para quem trabalha.",
            "habilidades": [
                "2 pontos em História",
                "2 pontos em Atletismo",
                "1 ponto em Fortitude",
                "1 ponto em Força ou Destreza",
                "1 kit de ferramentas"
            ]
        },
        {
            "nome": "ESPIÃO",
            "descricao": "Um personagem com este antecedente possui um histórico de trabalhar infiltrado ou entrando em ambientes para roubá-las.",
            "habilidades": [
                "2 pontos em Furtividade",
                "2 pontos em Investigação",
                "1 ponto em Intuição",
                "1 ponto em Enganação",
                "1 ponto na Proficiência em Disfarce",
                "1 kit de disfarce",
                "1 kit de venenos"
            ]
        },
        {
            "nome": "ESTUDANTE DE MAGIA",
            "descricao": "Um personagem com este antecedente possui um histórico de estudar em uma academia de magia ou possui um tutor.",
            "habilidades": [
                "2 pontos em Arcanismo",
                "2 pontos em Alquimia",
                "1 ponto em Apuração de Itens Mágicos",
                "1 ponto em Natureza"
            ]
        },
        {
            "nome": "FANÁTICO",
            "descricao": "Um personagem com este antecedente possui um histórico de ser integrante ou ex-integrante de um grupo religioso ou culto.",
            "habilidades": [
                "2 pontos em Ocultismo",
                "2 pontos em Ritualismo",
                "1 ponto em Arcanismo",
                "1 ponto em Teologia"
            ]
        },
        {
            "nome": "FORASTEIRO",
            "descricao": "Um personagem com este antecedente possui um histórico de ser de uma terra longínqua ou isolada.",
            "habilidades": [
                "2 pontos em Navegação",
                "2 pontos em Sobrevivência",
                "1 ponto em História",
                "1 ponto em Negociação"
            ]
        },
        {
            "nome": "GLADIADOR",
            "descricao": "Um personagem com este antecedente possui um histórico em lutar em arenas por dinheiro, honra ou obrigação.",
            "habilidades": [
                "2 pontos em Atletismo",
                "2 pontos em Acrobacia",
                "1 ponto em Força ou Destreza",
                "1 ponto em Fortitude"
            ]
        },
        {
            "nome": "GUARDA",
            "descricao": "Um personagem com este antecedente possui um histórico de trabalhar na guarda de uma cidade, provavelmente como soldado.",
            "habilidades": [
                "2 pontos em Jurisprudência",
                "2 pontos em Percepção",
                "1 ponto na Proficiência em Armaduras ou Esgrima"
            ]
        },
        {
            "nome": "HERDEIRO",
            "descricao": "Um personagem com este antecedente possui um histórico de vir de uma família rica e algum parente próximo acabou de morrer e lhe deixar dinheiro, pertences ou terrenos. O personagem não começa o jogo com esses espólios, mas pode reivindicá-los em jogo.",
            "habilidades": [
                "2 pontos em Persuasão",
                "2 pontos em História",
                "200 moedas de ouro",
                "Vestuárias Finas"
            ]
        },
        {
            "nome": "HEROICO",
            "descricao": "Um personagem com este antecedente possui um histórico de ter salvado uma ou mais pessoas de um pequeno perigo ou um inimigo problemático para pessoas fracas.",
            "habilidades": [
                "2 pontos em Acrobacia",
                "2 pontos em Medicina",
                "1 ponto em Atletismo",
                "1 ponto em Agilidade"
            ]
        },
        {
            "nome": "JORNALEIRO",
            "descricao": "Um personagem com este antecedente possui um histórico de trabalhar como investigador de notícias e também como entregador.",
            "habilidades": [
                "2 pontos em Intuição",
                "2 pontos em Investigação",
                "1 ponto em História",
                "1 ponto em Navegação"
            ]
        },
        {
            "nome": "MARUJO",
            "descricao": "Um personagem com este antecedente possui um histórico de trabalhar em barcos dentro da legalidade ou não.",
            "habilidades": [
                "2 pontos na Proficiência Veículos Aquáticos",
                "1 ponto em Intimidação",
                "1 ponto em Navegação",
                "1 ponto em Força ou Destreza"
            ]
        },
        {
            "nome": "MÉDICO DE BECO",
            "descricao": "Um personagem com este antecedente possui um histórico de ser um médico ilegal que atende de maneira clandestina dentro de cidades.",
            "habilidades": [
                "2 pontos em Medicina",
                "2 pontos em Alquimia",
                "1 ponto em Furtividade",
                "1 ponto em Enganação",
                "1 kit de ferramentas"
            ]
        },
        {
            "nome": "MENESTREL",
            "descricao": "Um personagem com este antecedente possui um histórico de ser um músico e poeta, viajante ou não.",
            "habilidades": [
                "2 pontos em Performance",
                "2 pontos em Sedução",
                "1 ponto em Persuasão",
                "1 ponto em Enganação",
                "1 kit de músico",
                "1 instrumento a sua escolha de até 1 M.O."
            ]
        },
        {
            "nome": "MINERADOR",
            "descricao": "Um personagem com este antecedente possui um histórico de trabalhar nas minas para coletar minérios diversos.",
            "habilidades": [
                "2 pontos em Natureza",
                "2 pontos em Navegação",
                "1 ponto em Fortitude",
                "1 ponto em Força",
                "1 kit de escalada"
            ]
        },
        {
            "nome": "NAVEGADOR",
            "descricao": "Um personagem com este antecedente possui um histórico de ser o leitor de mapas de uma expedição, o navegador de um navio em alto mar, etc.",
            "habilidades": [
                "2 pontos em Navegação",
                "2 pontos em Percepção",
                "1 ponto em Investigação",
                "1 ponto em História"
            ]
        },
        {
            "nome": "NOBRE",
            "descricao": "Um personagem com este antecedente possui um histórico de possuir um título de nobreza em sua família.",
            "habilidades": [
                "2 pontos em Jurisprudência",
                "2 pontos em História",
                "150 moedas de ouro extra",
                "Vestuárias finas",
                "Cavalo (50 M.O.)"
            ]
        },
        {
            "nome": "NÔMADE",
            "descricao": "Um personagem com este antecedente possui um histórico de não ficar em um mesmo lugar durante longos períodos de tempo. Nômades normalmente andam em grupos.",
            "habilidades": [
                "2 pontos em Lidar com animais",
                "2 pontos em Navegação",
                "1 ponto em História",
                "1 ponto em Sobrevivência",
                "1 kit de sobrevivência"
            ]
        },
        {
            "nome": "ÓRFÃO",
            "descricao": "Um personagem com este antecedente possui um histórico de não saber quem são seus pais e família, ou dessa família ter morrido.",
            "habilidades": [
                "2 pontos em Sobrevivência",
                "2 pontos em Enganação",
                "1 ponto em Furtividade",
                "1 ponto em Agilidade"
            ]
        },
        {
            "nome": "PEREGRINO",
            "descricao": "Um personagem com este antecedente possui um histórico de ter feito ou estar fazendo uma viagem religiosa, de penitência ou de aprendizado.",
            "habilidades": [
                "2 pontos em Navegação",
                "2 pontos em História",
                "1 ponto em Teologia",
                "1 ponto em Percepção"
            ]
        },
        {
            "nome": "PRISIONEIRO",
            "descricao": "Um personagem com este antecedente possui um histórico de ter sido um prisioneiro e cumprido sua pena, ou ter fugido da cadeia.",
            "habilidades": [
                "2 pontos em Furtividade",
                "2 pontos em Intimidação",
                "1 ponto em Jurisprudência",
                "1 ponto em Agilidade"
            ]
        },
        {
            "nome": "REFUGIADO",
            "descricao": "Um personagem com este antecedente possui um histórico de estar fugindo de um desastre natural ou avanços militares.",
            "habilidades": [
                "2 pontos em Sobrevivência",
                "2 pontos em Persuasão",
                "1 ponto em Intuição",
                "1 ponto em História"
            ]
        },
        {
            "nome": "TAVERNEIRO",
            "descricao": "Um personagem com este antecedente possui um histórico de trabalhar em uma taverna como cozinheiro, ajudante de cozinheiro, servir comida e bebida.",
            "habilidades": [
                "2 pontos em Negociação",
                "2 pontos em Intuição",
                "1 ponto em Intimidação",
                "1 ponto em Destreza"
            ]
        }

    ];

    // Componente de card para cada antecedente
    const AntecedenteCard = ({ antecedente }) => (
        <Paper sx={{ minWidth: 275, m: 2, p: 2, borderTop: "4px solid #162A22", borderBottom: "8px solid #162A22", height: '470px', }}>
            <CardContent>
                <Typography className="boxTextTitle" variant="h6" component="div">
                    {antecedente.nome}
                </Typography>
                <Box className="armaCard" sx={{ height: "150px", overflowY: 'scroll', p: 1, border: "1px solid #5B1F0F", borderRadius: '10px' }}>
                    <Typography className="bigBoxTextEquips "  >
                        {antecedente.descricao}
                    </Typography>
                </Box>

                <ul>
                    {antecedente.habilidades.map((hab, index) => (
                        <li className="bigBoxTextBG" key={index}>{hab}</li>
                    ))}
                </ul>
            </CardContent>
        </Paper>
    );

    return (
        <Box sx={{ minHeight: '700px', width: '100%' }} >

            <Box sx={{ width: "80%", mx: 'auto', my: 4 }}>
                <Typography className="MainTitleC" variant="h4" gutterBottom>
                    Antecedentes
                </Typography>
                <Typography className="boxTextTitle" variant="h5" gutterBottom>
                    A Importância do Antecedente na Ficha do Personagem
                </Typography>
                <Typography className="bigBoxTextClasses" paragraph>
                    O antecedente de um personagem desempenha um papel fundamental na construção de sua história e na definição de suas habilidades. Ele não apenas estabelece as bases do passado do personagem, mas também orienta suas decisões, ações e interações dentro do jogo. Através do antecedente, podemos entender de onde o personagem vem, que experiências moldaram sua vida e como ele enxerga o mundo ao seu redor.
                </Typography>
                <Typography className="bigBoxTextClasses" paragraph>
                    Esse contexto é essencial para a interpretação do personagem durante a aventura. Ele oferece uma motivação para o comportamento e as escolhas que o personagem faz, além de fornecer ao jogador ferramentas para dar mais profundidade e realismo ao seu papel. Atribuir habilidades específicas a um antecedente permite que o personagem se destaque em áreas que são relevantes para sua história, oferecendo uma maneira mais natural de se envolver com o ambiente e com os outros personagens.
                </Typography>
                <Typography className="bigBoxTextClasses" paragraph>
                    Assim, o antecedente não é apenas uma mecânica de jogo, mas também um elemento narrativo que dá significado a cada decisão tomada pelo personagem. Seja em situações de combate, exploração ou interação, o antecedente permite que o jogador explore um leque maior de possibilidades, com escolhas que são coerentes com a vida e as experiências de seu personagem.
                </Typography>
                <Typography className="bigBoxTextClasses" paragraph>
                    Todo antecedente começa com:
                    <ul>
                        <li>250 M.O.</li>
                        <li>Roupas simples</li>
                        <li> 5 Rações de Viagem</li>
                    </ul>
                </Typography>
                <Grid container spacing={2}>
                    {antecedentes.map((antecedente, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <AntecedenteCard antecedente={antecedente} />
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box sx={{ background: '#40150A', p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography sx={{ color: '#fff', fontSize: '10px' }}>© 2024 Lâmina do oculto. All rights reserved.</Typography>
            </Box>
        </Box>
    );
};

export default AntecendetesPage;
