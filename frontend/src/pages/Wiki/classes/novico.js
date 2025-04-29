import novice from "../../../assets/images/noviço.png";
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./classes.css";

const NovicoPage = () => {
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
    const novicoSkillsData = {

        "titulo": "Noviço",
        "atributos": {
            "vida": 4,
            "estamina": 2,
            "magia": 0
        },
        "descricao": "O Noviço é um estudante devoto, moldado pela fé e pela busca constante de crescimento espiritual. Sua jornada é marcada por disciplina e serviço, onde cada ação, por mais simples que seja, reflete o desejo de agradar sua divindade e cumprir seu destino sagrado. Em um mundo povoado por magos e guerreiros, ele se destaca pela sua conexão com o divino, acreditando que a verdadeira força vem da devoção, e não da carne ou da magia pura. Ele é portador de milagres, capaz de curar, proteger e banir o mal com sua fé inabalável, sempre empenhado em tornar o mundo mais puro e justo.A habilidade de curar vai além de restaurar pontos de vida; para o Noviço, cada ato de cura é um sacrifício e um testemunho de sua fé. Seu corpo e sua magia são os canais pelos quais os milagres de sua divindade fluem, oferecendo auxílio tanto a amigos quanto a necessitados. No entanto, esse poder sempre exige algo em troca, pois está entrelaçado com o serviço que ele presta. Quando necessário, o Noviço sacrifica suas próprias forças, seja por meio de rituais de fé ou martírio, para garantir a proteção de seus aliados. Sua devoção é sua principal fonte de poder, e ele a utiliza com sabedoria, buscando sempre se aproximar mais de seu deus.Sua conexão com o divino o capacita a realizar feitos extraordinários, como purificar o mundo com o poder sagrado ou banir criaturas das trevas com sua luz divina. Mesmo diante de desafios imensos, o Noviço se mantém firme, sendo a personificação da resistência espiritual. O uso de milagres e bênçãos vai além de uma simples ferramenta; é a expressão de sua crença, seja para proteger, curar ou até para combater os inimigos das forças divinas. Ao invocar seus milagres, ele se torna um farol de esperança para seus aliados e uma força imbatível contra o mal.Embora sua força física não se iguale à de outros combatentes ou magos, o Noviço sabe que a verdadeira magia reside em sua fé e na capacidade de servir. Ele nunca busca glória pessoal, mas age com a certeza de que cada ato que realiza é uma manifestação do poder divino que o sustenta. Seu papel no campo de batalha é claro: curar, proteger e, quando necessário, sacrificar-se para assegurar a vitória de seus aliados. Ele é um pilar de luz em um mundo sombrio, confiando plenamente que a força de sua fé é a chave para superar qualquer adversidade.",
        "habilidade": {
            "nome": "Anticorrupção",
            "descricao": "Toda cura conjurada, como um milagre, em um alvo morto vivo ou demônio causa o mesmo valor em dano sagrado ao invés de curá-lo. O noviço pode usar uma habilidade de cura para causar dano  nos seres citados anteriormente sem custo de pontos de magia uma vez por combate. Todo milagre causa dano sagrado.",
            "habilidades": [

            ]
        },
        "regalias": [
            {
                "nome": "Servitude (Habilidade de classe Secundária)",
                "descricao": " Todo Noviço possui uma divindade a qual serve, dependendo se o deus é mau, bom ou neutro o noviço ganha um bônus:",
                "manobras": [
                    {
                        "nome": "Deus bom:",
                        "descricao": "2 vezes por dia o noviço pode curar uma criatura que não seja a si mesmo num valor igual a 2d6 pontos de vida. Essa cura pode ser feita dentro de combate ao mesmo tempo que outra ação que não cause dano. Aumentando para 3d6  ao atingir nível 7."
                    },
                    {
                        "nome": "Deus mau:",
                        "descricao": " Deus mau: Uma vez por dia o noviço pode sacrificar um animal ou outro ser vivo para recuperar 8 pontos de magia através de uma prece de 10 minutos após matar a criatura. Se matar uma criatura em combate pode realizar o ritual em até 1 hora após o ocorrido. Alternativamente pode se curar em 1d12 pontos imediatamente após matar uma criatura dentro ou fora de combate. Esse valor aumenta para o valor fixo de 12 e o rolamento para 3d6  ao atingir nível 7."
                    },
                    {
                        "nome": "Deus neutro: ",
                        "descricao": " 3 vezes por dia o noviço pode realizar uma prece, com custo de duas ações em combate, recuperando 1d6+1 pontos de seus próprios pontos de vida e magia . Aumenta para 2d6+2 no nível 7."
                    }
                ]
            },
            {
                "nome": "Oração de Luz",
                "bônus": [
                    { "tipo": "Medicina", "valor": 3 },
                    { "tipo": "Teologia", "valor": 3 },
                    { "tipo": "Intuição", "valor": 3 },
                ],
                "manobras": [
                    {
                        "nome": "Cura (2 Ações)",
                        "descricao": "Cura uma criatura em 1d6+2 pontos de vida. O alvo da cura deve estar a até 1,5 metros de distância do noviço. Custa 2 pontos de magia. Aumenta a cura em 1d6 para cada 2 pontos de mágica adicionais ao conjurar este milagre."
                    },
                    {
                        "nome": "Abençoar ( 2 Ações)",
                        "descricao": "Abençoa uma criatura, concedendo 1,5m de movimento extradicional e também vantagem nos rolamentos de ataque. Esse buff dura por 30 segundos, o que corresponde a 5 rodadas em combate. Custa 6 pontos de magia. Pode abençoar uma criatura adicional a cada 3 pontos de magia adicionais ao conjurar este milagre."
                    },
                    {
                        "nome": "Ataque Guiado (Reação)",
                        "descricao": "Aumenta a chance de acerto de uma criatura em até 18 metros de distância. O noviço dá vantagem ao rolamento de acerto de ataque destacando com luz divina um ponto fraco na defesa do alvo do ataque. Pode usar esse milagre 4 vezes ao dia."
                    }
                ]
            },
            {
                "nome": "Oração de Banimento",
                "bônus": [
                    { "tipo": "Ocultismo", "valor": 3 },
                    { "tipo": "Combate Arcano", "valor": 3 }
                ],
                "manobras": [
                    {
                        "nome": "Marca Divina (2 Ações)",
                        "descricao": "Cria uma marca na criatura alvo permitindo causar 1d8 pontos de dano sagrado neste turno e nos turnos seguintes, durante 10 rodadas. Para causar o dano no turno seguinte à execução do Milagre, é preciso realizar uma ação de ataque de Combate Arcano. Custa 5 pontos de magia. Alcance 18 metros."
                    },
                    {
                        "nome": "Chama Sagrada (Ação)",
                        "descricao": "Uma oração faz com que uma chama sagrada queime o alvo, causando 1d6 pontos de dano sagrado. Custa 1 ponto de magia. Aumenta em 1d8 de dano para cada 2 pontos de magia adicionais ao conjurar este milagre."
                    },
                    {
                        "nome": "Fonte Divina (2 Ações)",
                        "descricao": "Uma oração faz com que o noviço vire uma fonte de energia sagrada e todos mortos-vivos e demônios em até 12 metros são obrigados a usar sua reação para mover até sua velocidade de movimento para o mais longe que conseguir do noviço. Esse milagre tem 80% de chance de sucesso e caso falhe o noviço recupera uma de suas ações usadas para esta habilidade. Pode usar esse milagre 2 vezes ao dia. Se estiver com 0 usos deste milagre, o noviço pode gastar 10 pontos de magia para conjurar seu efeito."
                    }
                ]
            },
            {
                "nome": "Oração de Proteção",
                "bônus": [
                    { "tipo": "Fortitude", "valor": 2 },
                    { "tipo": "Percepção", "valor": 2 }
                ],
                "manobras": [
                    {
                        "nome": "Santuário (Ação)",
                        "descricao": "Cria um campo de proteção sagrado em volta do alvo (podendo ser o próprio noviço), aumentando em 2 seu Valor de Defesa, por uma rodada. Custa 4 pontos de magia. Ao conjurar o milagre é possível aumentar sua duração em uma rodada para cada 2 pontos de magia adicionais."
                    },
                    {
                        "nome": "Farol (2 Ações)",
                        "descricao": "A oração gera uma luz tão forte que pode ser vista a alguns quilômetros de distância. Todas as criaturas, exceto seus aliados, que estiverem em até 27m ficam cegos até o fim de seu próximo turno. A luz dura até o fim de seu turno atual (6 segundos). Custa 8 pontos de magia."
                    },
                    {
                        "nome": "Restauração (2 Ações)",
                        "descricao": "O noviço faz uma oração e toca o seu alvo para tirar uma das seguintes condições: Envenenado, um nível de Congelado, um nível de Queimando e um nível de Cansado. Pode usar esse milagre 4 vezes ao dia."
                    }
                ]
            },
            {
                "nome": "Oração de Preservação",
                "bônus": [
                    { "tipo": "Medicina", "valor": 3 },
                    { "tipo": "Teologia", "valor": 3 },
                    { "tipo": "Intuição", "valor": 3 }
                ],
                "manobras": [
                    {
                        "nome": "Estabilizar (Ação)",
                        "descricao": "A oração estabiliza um personagem à Beira da Morte e prolonga seu tempo de duração para 10 o número de falhas necessárias para levar o alvo à morte por dano. Pode usar esse milagre 4 vezes ao dia."
                    },
                    {
                        "nome": "Resistência (Reação)",
                        "descricao": "A oração cria uma resistência instantânea que protege o alvo de um ataque ou efeito. O alvo da oração recebe apenas metade do dano de um ataque ou um efeito. Custa 3 pontos de magia."
                    },
                    {
                        "nome": "Lente Investigativa (Ação)",
                        "descricao": "Um noviço ativa uma benção a até 3 metros de distância de si e todos dentro deste raio que tentam mentir têm sua fala cortada e recebem 1d4 pontos de dano. Dura por 10 minutos. Pode usar esse milagre 4 vezes ao dia."
                    }
                ]
            },
            {
                "nome": "Noviço(a) de Combate",
                "descricao": "Proficiência em Armaduras Leves e Médias. Proficiência em Escudo Simples. Aumento de 5 pontos em sua vida máxima."
            },
            {
                "nome": "Intervenção (Reação)",
                "descricao": "O personagem pode realizar uma oração e pedir para sua divindade para que mude o resultado de uma ação, obrigando que o rolamento de um ataque, ou outra ação que use o rolamento de d20, seja refeito. Após refeito o noviço escolhe o novo ou o antigo rolamento. Custa 3 pontos de magia."
            },
            {
                "nome": "Abençoar Arma (Ação)",
                "descricao": "Realiza uma oração que abençoa uma arma e muda o seu dano para a propriedade sagrado por 10 rodadas. Apenas uma arma por vez. Custa 1 ponto de Magia."
            },
            {
                "nome": "Esfera Divina (Ação) (Milagre)",
                "descricao": "Realiza uma oração para acumular energia sagrada em 1 esfera, podendo acumular até 3 esferas por vez. Cada esfera dura uma hora e pode ser entregue a um aliado em até 6 m. Durante esse tempo, a esfera pode projetar luz em até 3 metros de raio ao seu redor e protege seu portador contra maldições, magias ou feitiços de controle mental. Essa proteção vem na forma de 10% de penalidade, na chance de sucesso de uma Habilidade que tome o portador das esferas como alvo, por esfera. Uma vez que uma ou mais esferas sejam usadas dessa maneira, elas desaparecem, mesmo que ainda não tenha acabado sua duração. Custa 2 pontos de Magia para conjurar uma esfera e 2 pontos de Magia adicional para conjurar cada esfera adicional."
            },
            {
                "nome": "Martírio (2 Ações)",
                "descricao": "O personagem pode orar fervorosamente para que sua capacidade mágica se recupere, a custo de parte de sua vitalidade para isso. Recuperando 1 ponto de mana para cada ponto de vida sacrificado, com um máximo de 5 pontos. Pode realizar essa ação uma vez por descanso curto."
            },
            {
                "nome": "Dividir a Dor (Reação)",
                "descricao": "Ao ver uma criatura que esteja com a condição restringido, paralizado, atordoado ou incapacitada, o personagem pode dividir o dano de um ataque que ela sofra. Ao dividir o dano, o personagem define quantos pontos de dano quer tomar do valor total."
            }

        ]
    }
    return (
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ width: "80%", mx: "auto" }}>
                {/* Título e Descrição */}
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                    <img src={novice} style={{ width: "30%", height: '30%' }} alt="Imagem do Combatente" />
                    <Box sx={{ width: "60%", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography className="boxTextTitle" variant="h3" gutterBottom>
                            {novicoSkillsData.titulo}
                        </Typography>
                        <Typography className="bigBoxTextClasses" paragraph sx={{ textAlign: 'justify' }}>
                            {novicoSkillsData.descricao}
                        </Typography>
                    </Box>

                </Box>
                <Typography variant="h4" className="boxTextTitle" sx={{ my: 3 }}>
                    Habilidade de Classe
                </Typography>
                {/* Renderizar habilidade */}
                <HabilidadeDeClasseAcordion skill={novicoSkillsData.habilidade} />
                <Typography variant="h4" className="boxTextTitle" sx={{ my: 3 }}>
                    Regalias
                </Typography>
                {/* Mapear regalias */}
                {novicoSkillsData.regalias.map((regalia, index) => (
                    <PerkAccordion key={index} skill={regalia} />
                ))}
            </Box>

        </Box>
    );
}

export default NovicoPage;