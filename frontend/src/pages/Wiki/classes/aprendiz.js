import aprendiz from "../../../assets/images/aprendiz.png";
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./classes.css";

const AprendizPage = () => {
    const SkillAccordion = ({ skill }) => (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className="estebanText" variant="h6">{skill.nome}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography className="estebanText" >{skill.descricao}</Typography>
                <List>
                    {skill.detalhes.map((detalhe, index) => (
                        <ListItem className="estebanText" key={index}>{detalhe}</ListItem>
                    ))}
                </List>
            </AccordionDetails>
        </Accordion>
    );
    const PerkAccordion = ({ skill }) => (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className="estebanText" variant="h6">{skill.nome}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {skill.descricao && <Typography className="estebanText" >{skill.descricao}</Typography>}

                {/* Renderizando bônus se existirem */}
                {skill.bônus && (
                    <List>
                        <ListItem><Typography className="estebanText" ><strong>Bônus de Habilidades:</strong></Typography></ListItem>
                        {skill.bônus.map((bonus, index) => (
                            <ListItem className="estebanText" key={index}>
                                {bonus.tipo} : {bonus.valor}
                            </ListItem>
                        ))}
                    </List>
                )}

                {/* Renderizando manobras se existirem */}
                {skill.manobras && (
                    <List>
                        {skill.manobras.map((manobra, index) => (
                            <ListItem key={index}>
                                <Typography className="estebanText" variant="body1"> <strong>{manobra.nome} </strong>: {manobra.descricao}</Typography>
                            </ListItem>
                        ))}
                    </List>
                )}
            </AccordionDetails>
        </Accordion>
    );

    const HabilidadeDeClasseAcordion = ({ skill }) => (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className="estebanText" variant="h6">{skill.nome}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography className="estebanText" >{skill.descricao}</Typography>
                <List>
                    {skill.habilidades.map((habilidade, index) => (
                        <ListItem key={index}>
                            <Typography className="estebanText" variant="body1"><strong>{habilidade.nome}:</strong> {habilidade.descricao}</Typography>
                            {habilidade.condicao && (
                                <Typography className="estebanText" variant="body2" color="textSecondary">
                                    <em>{habilidade.condicao}</em>
                                </Typography>
                            )}
                        </ListItem>
                    ))}
                </List>
            </AccordionDetails>
        </Accordion>
    );
    const aprenticeSkillsData = {
        titulo: "Aprendiz",
        descricao: "A jornada de um herói nem sempre começa com glória e reconhecimento. No vasto e implacável mundo, onde reinos se erguem e caem e os perigos espreitam nas sombras, aqueles que buscam se aventurar precisam mais do que coragem — precisam de preparo. É nesse vácuo de inexperiência que surge a figura do Aprendiz.Nem todos nascem nobres guerreiros, poderosos magos ou astutos exploradores.Muitos são apenas jovens sedentos por conhecimento, sobreviventes forçados a trilhar caminhos incertos, ou estudiosos que, diante da realidade, percebem que a teoria, sozinha, não os salvará.O Aprendiz é aquele que entende que antes de se tornar mestre, precisa aprender; antes de empunhar uma lâmina com destreza, deve compreender seu peso; antes de lançar feitiços que dobram a realidade, precisa sentir a magia pulsar dentro de si.Seja empunhando uma espada, curando feridos com bênçãos sagradas ou desbravando mistérios ocultos, o Aprendiz dá seus primeiros passos rumo ao desconhecido.Ele não é um especialista, mas também não é um amador indefeso.Seu papel no mundo é crescer, explorar e se moldar ao destino que escolheu — ou ao que o destino escolheu para ele.Mas a trilha do Aprendiz não é apenas feita de livros e lições simples. O mundo é um mestre cruel, e cada cicatriz, cada batalha perdida, cada erro cometido esculpe sua jornada. É na forja da experiência que o Aprendiz se torna algo mais. Alguns seguirão o caminho do aço, tornando-se guerreiros temidos. Outros dominarão os segredos da magia, dobrando as forças arcanas à sua vontade. Alguns escolherão a diplomacia, a exploração ou a fé, guiando-se não pela lâmina, mas pela palavra, pelo conhecimento ou pelo instinto.Independentemente do caminho escolhido, o Aprendiz carrega uma verdade inabalável: ele ainda não é um mestre, mas já deixou de ser um mero iniciante. E, no fim, o que define seu destino não é de onde veio, mas para onde está indo.",
        habilidades: [
            {
                nome: "Combatente Aprendiz",
                descricao: "Estudante do combate marcial",
                detalhes: [
                    "1 ponto em Força, Fortitude ou Destreza",
                    "1 ponto em Combate Corpo a Corpo ou Combate À Distância",
                    "Proficiência em Armas Marciais",
                    "Proficiência em Armaduras Leves e Médias",
                    "Proficiência em Escudo Simples",
                    "Recuperar Fôlego (Ação de turno completo): O personagem pode gastar uma ação de turno completo para recuperar 4 pontos de vida. Custa 2 pontos de magia. Por mais 2 pontos de magia, recupera 4 pontos de estâmina na mesma ação."
                ]
            },
            {
                nome: "Noviço(a) Aprendiz",
                descricao: "Iniciado(a) no caminho divino",
                detalhes: [
                    "1 ponto em Teologia, Arcanismo ou Medicina",
                    "1 ponto em Combate Arcano ou Combate Corpo a Corpo ou Combate à Distância",
                    "Aprende os Milagres:",
                    "Abençoar Água (Milagre) (Ação): Abençoa uma pequena porção de água, tornando-a sagrada. Essa água fica abençoada por 1 hora, e o noviço aprendiz pode acumular até 5 frascos, ou outro vasilhame, pequenos por vez. Essa água pode ser usada para encantar uma arma por um minuto, deixando-a com o status sagrado. Custa 1 ponto de magia para abençoar um frasco. Tem a opção de, ao invés de encantar uma arma, ser jogada em um morto-vivo causando 1d12 pontos de dano. Custa 3 pontos de magia.",
                    "Facilitar Cura (Milagre): O personagem gasta 10 minutos operando esse Milagre para curar em até 4d6 pontos de vida de até duas criaturas por vez. Custa 2 pontos de magia.",
                    "Tocha Sagrada (Milagre) (Ação): Toca um item com energia sagrada, que brilha com luz completa em até 3 metros e meia luz nos 3 metros seguintes. Mortos-vivos, que estejam diante dessa luz, ficam cegos no primeiro turno de combate, desde que estejam dentro da área da luz. Dura 1 hora. Custa 1 ponto de magia."
                ]
            },
            {
                nome: "Iniciado(a) Aprendiz",
                descricao: "Estudante de magias arcanas",
                detalhes: [
                    "1 ponto em Arcanismo, Ritualismo ou Apuração de Itens Mágicos",
                    "1 ponto em Combate Arcano",
                    "Aprende as Magias:",
                    "Míssil Arcano (Magia)(2 Ações): Dispara um projétil de energia arcana que causa 1d4 de dano. Alcance 36 metros. Custa 2 pontos de magia por míssil lançado, máximo de até 5 mísseis por vez.",
                    "Detectar Magia (Magia)(Ação): Seus olhos brilham com poder arcano e o personagem consegue enxergar poder arcano emanando de um ambiente, objeto ou pessoa. Custa 2 pontos de magia e tem alcance de até 9 metros. Custa 4 pontos de magia e uma ação adicional para saber qual escola de magia ou se é um feitiço, ritual, ruína ou maldição.",
                    "Iluminação Arcana (Magia)(Ação): Toca um item ou sua própria mão, que brilha com luz completa em até 3 metros e meia luz nos 3 metros seguintes. Dura 1 hora. Custa 1 ponto de magia."
                ]
            },
            {
                nome: "Feiticeiro(a) Aprendiz",
                descricao: "Iniciado(a) nas artes do ocultismo",
                detalhes: [
                    "1 ponto em Ocultismo ou Ritualismo",
                    "1 ponto em Combate Arcano",
                    "Aprende os Feitiços:",
                    "Orbe Caótico (Feitiço) (2 Ações): Dispara um orbe de um elemento aleatório que causa 2d6 pontos de dano (Rola 1d6: 1 Fogo, 2 Gelo, 3 Terra, 4 Ar, 5 Raio e 6 Escolha). Custa 2 pontos de magia.",
                    "Azaralhar (Feitiço) (2 Ações): Embaralha os sentidos do seu alvo, que esteja em até 9 metros, fazendo-o ficar Atordoado até o próximo turno. Tem 30% de chance de sucesso e custa 4 pontos de magia. Mais 5% de chance de sucesso para cada ponto de magia gasto além dos 4 pontos iniciais.",
                    "Luz Guia (Feitiço) (Ação): Foca sua energia na própria mão, que brilha com luz completa em até 3 metros e meia luz nos 3 metros seguintes. Dura 1 hora. Custa 1 ponto de magia."
                ]
            }
            ,
            {
                nome: "Diplomata Aprendiz",
                descricao: "Iniciado nas artes da persuasão e negociação",
                detalhes: [
                    "2 pontos em Persuasão ou Enganação",
                    "1 ponto em Negociação",
                    "2 pontos em Sedução e Intimidação",
                    "Aprende a Habilidade:",
                    "Barganhar: Um Diplomata pode fazer um teste de negociação para tentar descontos em preços de serviços como hospedagem, mas não na compra de produtos como um mercador. Um diplomata pode usar essa habilidade uma vez por pessoa dentro do período de uma semana.",
                    "Rolamento de Negociação: Porcentagem de desconto",
                    "0 a 10: 5%",
                    "11 a 15: 5%",
                    "16 a 20: 15%"
                ]
            }
            ,
            {
                nome: "Explorador Aprendiz",
                descricao: "Iniciado nas artes de rastreamento e sobrevivência",
                detalhes: [
                    "2 pontos em Rastreamento ou Investigação",
                    "1 ponto em Sobrevivência e Navegação",
                    "2 pontos em Percepção ou Furtividade",
                    "Proficiente com kit de arrombamento",
                    "Aprende a Habilidade:",
                    "Visão para Abrigo: Um explorador aprendiz consegue procurar um abrigo natural para proteger dos elementos. Se for calor demais que possa causar exaustão, ele consegue achar um lugar para refrescar ou isolar do calor, ou então, se for frio demais, um abrigo quente para não sofrer com a temperatura. A chance de sucesso é de 80%. Além disso, um explorador aprendiz tem um bônus de +2 em testes de sobrevivência para achar comida e água caso exista."
                ]
            },
            {
                nome: "Acadêmico Aprendiz",
                descricao: "Estudante das ciências e das artes do conhecimento",
                detalhes: [
                    "2 pontos em História ou Intuição",
                    "1 ponto em Jurisprudência e Teologia",
                    "2 pontos em Medicina ou Natureza",
                    "Aprende a Habilidade:",
                    "Já Li Sobre Isso: Um acadêmico tem +2 em qualquer rolamento de conhecimento. Um acadêmico também recebe +3 em testes de persuasão que o ajudem a entrar em uma biblioteca, templo ou centro acadêmico com conhecimento registrado de alguma forma."
                ]
            }


        ]
    };
    return (
        <Box sx={{position:'relative'}}>
            <a href="/wiki" style={{position: 'absolute', top:'1%', left:'1%', textDecoration:'none',color:"black", fontFamily:'esteban'}}>↤ Voltar</a>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                <Box sx={{ width: "80%", mx: "auto", }}>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }} >
                        <Box sx={{ width: "60%", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Typography className="boxTextTitle" variant="h3" gutterBottom >
                                {aprenticeSkillsData.titulo}
                            </Typography>
                            <Typography className="bigBoxTextClasses" paragraph sx={{ textAlign: 'justify' }}>{aprenticeSkillsData.descricao}</Typography>
                        </Box>
                        <img src={aprendiz} style={{ width: "30%", height: '30%' }}></img>
                    </Box>

                    {aprenticeSkillsData.habilidades.map((skill, index) =>
                        (<SkillAccordion key={index} skill={skill} />)
                    )}
                </Box>

            </Box>
        </Box>
    );
}

export default AprendizPage;