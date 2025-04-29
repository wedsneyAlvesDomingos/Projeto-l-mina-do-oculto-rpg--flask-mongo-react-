import erudita from "../../../assets/images/erudita.png";
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./classes.css";

const EruditoPage = () => {
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
    const especializacao = {
        "titulo": "Erudito",
        "img": erudita,
        "descricao": "Os eruditos, aqueles que buscam as profundezas do conhecimento divino e arcano, são mestres de uma sabedoria vasta, que vai além das fronteiras do entendimento comum. Seu caminho é marcado pela disciplina e pelo estudo imensurável das forças que regem o mundo, seja no campo da magia, da teologia ou do ocultismo. A mente do erudito é como um templo de saber, onde cada pensamento se transforma em uma peça crucial no grande quebra-cabeça da existência. Com um olhar atento aos segredos ocultos, o erudito não apenas contempla os mistérios do universo, mas também se dedica a traduzi-los em ações práticas e poderosas. Seus milagres, embora incompreensíveis para muitos, são baseados em um entendimento profundo da estrutura das energias divinas. O que para outros é um ato de fé, para ele é um estudo meticuloso da interação entre o sagrado e o arcano. Ao conjurar um milagre, o erudito não apenas invoca forças sobrenaturais, mas também as compreende e as manipula com a precisão de um artesão, acumulando energia sagrada que pode ser utilizada para curar, proteger ou até mesmo reforçar sua defesa. No campo de batalha, o erudito não é um guerreiro de espada, mas de palavras e gestos, conjurando esferas de poder sagrado com a mesma naturalidade com que outros empunham lâminas. Seus aliados, muitas vezes, encontram proteção sob o manto divino que ele cria, uma barreira de luz que neutraliza as adversidades do ambiente e proporciona um refúgio de serenidade e cura. Sua capacidade de conjurar um templo invulnerável, onde o conhecimento e a cura se entrelaçam, reflete a grandeza de sua compreensão do cosmos. Cada gesto, cada palavra do erudito é um reflexo de uma vida dedicada ao aprendizado, ao aprimoramento e ao compartilhamento do conhecimento com aqueles que estão dispostos a ouvir. Em suas mãos, o poder não é apenas uma força destrutiva, mas um meio de restaurar o equilíbrio, proteger a vida e elevar a compreensão. O erudito, portanto, não é apenas um mestre da magia, mas um farol de sabedoria, cuja presença ilumina o caminho daqueles que buscam entender o universo em toda a sua complexidade.",
        "atributos": "Cada Regalia comprada na especialização Erudito(a) fornece:\n- 4 Pontos de Vida\n- 0 Pontos de Estâmina\n- 6 Ponto em Magia",
        "regaliaObrigatoria": {
          "descricao": "Ao escolher esta especialização, o personagem recebe os seguintes atributos :",
          "pontos": {
            "atributos": {
              "quantidade": 2,
              "opcoes": ["Combate arcano", "Arcanismo"]
            },
            "combate": {
              "quantidade": 1,
              "opcoes": ["Teologia", " Apuração de itens mágicos"]
            },
            "habilidades": {
              "quantidade": 2,
              "opcoes": ["Ocultismo", "Jurisprudência", "Ritualismo"]
            },
            "proficiências": null
          },
          "habilidade": [{
            "nome": "Engenharia do divino",
            "tipo": "Passiva",
            "descricao": " Ao conjurar um milagre, o erudito acumula energia sagrada. Cada milagre que o erudito conjura gera um ponto de energia sagrada. Essa energia sagrada pode ser usada de duas maneiras inicialmente:Por 3 pontos de energia sagrada o erudito pode aumentar seu valor de defesa em 2 por uma hora.Por 2 pontos o erudito pode se curar em 5 pontos como uma reação.Por 1 ponto, e três ações, o erudito pode repetir o último milagre que conjurou, em sua forma mais simples. ",
          }]
        },
        "regalias": [
          {
            "nome": "Manto Divino",
            "tipo": "Ação",
            "descricao": "O erudito cria um manto protetivo em volta de si e de todos aliados que escolher em até 6 metros. Magias e milagres dentro da área sofrem redução de 1 ponto de magia no custo (mínimo de 1). Os afetados recebem 5 pontos de vida temporários e ficam imunes ao clima externo, garantindo descanso adequado. Dura 6 horas.",
            "custoMagia": 10,
            "efeitos": {
              "ativo": "Redução de custo de magia/milagre, imunidade ao clima externo, 5 pontos de vida temporários."
            },
            "bonus": {
              "vidaTemporaria": 5
            },
            "modificadores": {
              "usoExtra": "Pode ser conjurado como ritual de 1 hora sem custo de magia, mas sem conceder vida temporária."
            }
          },
          {
            "nome": "Santuário Múltiplo",
            "tipo": "Reação",
            "descricao": "O erudito conjura o milagre Santuário em aliados antes de um ataque ser resolvido. O efeito dura até o fim da rodada.",
            "custoMagia": 5,
            "efeitos": {
              "ativo": "Concede Santuário a aliados antes do ataque ser resolvido, protegendo-os."
            }
          },
          {
            "nome": "Evocação do Divino",
            "tipo": "Passiva",
            "descricao": "Ao usar magias de evocação, pode gastar até 2 pontos de energia sagrada para causar +1d6 de dano arcano por ponto gasto. Pode gastar 1 ponto de magia para mudar o dano para sagrado.",
            "efeitos": {
              "passivo": "Aumento de dano para magias de evocação e conversão de dano para sagrado."
            },
            "modificadores": {
              "bonusSucesso": "+1d6 de dano arcano por ponto de energia sagrada gasto (máx. 2)."
            }
          },
          {
            "nome": "Engenharia do Divino 2",
            "tipo": "Passiva",
            "descricao": "O erudito pode causar dano arcano em vez de sagrado ao conjurar milagres. Pode conjurar certos milagres e magias como rituais sem custo de materiais ou magia.",
            "efeitos": {
              "passivo": "Permite converter dano de milagres para arcano e conjurar magias/milagres específicos sem custo de materiais ou magia."
            },
            "requisito": "Teologia 4, Ocultismo 4"
          },
          {
            "nome": "Templo de Adoração e Conhecimento",
            "tipo": "Ritual",
            "descricao": "O erudito conjura um templo mágico indestrutível e impenetrável por 8 horas. O templo contém uma biblioteca com seu conhecimento e abriga aliados. Pode curar todos dentro do templo em 50 pontos de vida e remover todas as condições após 1 hora de oração.",
            "custoMagia": 10,
            "efeitos": {
              "ativo": "Criação de um templo mágico para abrigo, estudo e cura."
            },
            "modificadores": {
              "bonusSucesso": "Cura em massa de 50 pontos de vida e remoção de condições após 1 hora de oração."
            }
          },
          {
            "nome": "Teletransporte Tático",
            "tipo": "Ação",
            "descricao": "Teletransporta o erudito até 9 metros para um local que ele possa ver.",
            "custoMagia": 2,
            "efeitos": {
              "ativo": "Movimento instantâneo de até 9 metros."
            }
          },
          {
            "nome": "Atirador Arcano",
            "tipo": "Passiva",
            "descricao": "Dobra o alcance das magias e milagres.",
            "efeitos": {
              "passivo": "Alcance dobrado para todas as magias e milagres."
            }
          },
          {
            "nome": "Crítico Guiado",
            "tipo": "Reação",
            "descricao": "O erudito pode transformar um ataque em um acerto crítico.",
            "custoMagia": 10,
            "efeitos": {
              "ativo": "Converte um ataque em acerto crítico."
            }
          },
          {
            "nome": "Atirar Esfera Divina",
            "tipo": "Ação",
            "descricao": "Permite atacar com esferas divinas conjuradas pelo milagre Esfera Divina, causando 2d10 de dano sagrado (dobro contra mortos-vivos e demônios). Pode atirar todas as esferas em um único ataque.",
            "custoMagia": 3,
            "dano": "2d10 dano sagrado por esfera, dobrado contra mortos-vivos e demônios.",
            "requisito": "Esfera Divina, Teologia 4, Ocultismo 4",
            "efeitos": {
              "ativo": "Permite lançar todas as esferas divinas em um único ataque."
            }
          },
          {
            "nome": "Invisibilidade",
            "tipo": "Ação",
            "descricao": "O erudito ou uma criatura tocada se torna invisível por até 10 minutos. A invisibilidade se desfaz ao causar dano.",
            "custoMagia": 10,
            "efeitos": {
              "ativo": "Faz o alvo se tornar invisível por 10 minutos ou até atacar."
            }
          },
          {
            "nome": "Silêncio",
            "tipo": "Ação",
            "descricao": "O erudito conjura uma oração que impede o alvo de usar qualquer magia, feitiço ou milagre até o fim de seu próximo turno.",
            "custoMagia": 5,
            "efeitos": {
              "ativo": "Impede o alvo de conjurar magias, feitiços ou milagres."
            }
          }
        ]
      }

    return (
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
            <Box sx={{ width: "80%", mx: "auto" }}>
                {/* Título e Descrição */}
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                    <img src={especializacao.img} style={{ width: "30%", height: '30%' }} alt="Imagem do Combatente" />
                    <Box sx={{ width: "60%", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography className="boxTextTitle" variant="h3" gutterBottom>
                            {especializacao.titulo}
                        </Typography>
                        <Typography className="bigBoxTextClasses" paragraph sx={{ textAlign: 'justify' }}>
                            {especializacao.descricao}
                        </Typography>
                    </Box>
                </Box>

                {/* Atributos */}
                <Typography variant="body1" sx={{ textAlign: 'justify', mb: 3 }}>
                    {especializacao.atributos}
                </Typography>
                <Typography variant="h4" className="boxTextTitle" sx={{ my: 3 }}>
                    Regalia Obrigatória
                </Typography>
                {especializacao.regaliaObrigatoria && (
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-regaliaObrigatoria-content" id="panel-regaliaObrigatoria-header">
                            <Typography>Atributos e Bonus</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{especializacao.regaliaObrigatoria.descricao}</Typography>

                            {/* Atributos */}
                            {especializacao.regaliaObrigatoria.pontos.atributos && (
                                <>
                                    <Typography><strong>Atributos:</strong></Typography>
                                    <ul>
                                        <li key={especializacao.regaliaObrigatoria.pontos.atributos.quantidade}>{especializacao.regaliaObrigatoria.pontos.atributos.quantidade} Pontos em um dos seguintes:</li>
                                        {especializacao.regaliaObrigatoria.pontos.atributos.opcoes.map((atributo, index) => (
                                            <li key={index}>{atributo}</li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            {/* Combate */}
                            {especializacao.regaliaObrigatoria.pontos.combate && (
                                <>
                                    <Typography><strong>Combate:</strong></Typography>
                                    <ul>
                                        <li key={especializacao.regaliaObrigatoria.pontos.combate.quantidade}>{especializacao.regaliaObrigatoria.pontos.combate.quantidade} Pontos em um dos seguintes:</li>
                                        {especializacao.regaliaObrigatoria.pontos.combate.opcoes.map((opcao, index) => (
                                            <li key={index}>{opcao}</li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            {/* Habilidades */}
                            {especializacao.regaliaObrigatoria.pontos.habilidades && (
                                <>
                                    <Typography><strong>Habilidades:</strong></Typography>
                                    <ul>
                                        <li key={especializacao.regaliaObrigatoria.pontos.habilidades.quantidade}>{especializacao.regaliaObrigatoria.pontos.habilidades.quantidade} Pontos em todos os seguintes:</li>
                                        {especializacao.regaliaObrigatoria.pontos.habilidades.opcoes.map((habilidade, index) => (
                                            <li key={index}>{habilidade}</li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            {/* Proficiências */}
                            {especializacao.regaliaObrigatoria.pontos.proficiências && (
                                <>
                                    <Typography><strong>Proficiências:</strong></Typography>
                                    <ul>
                                        {especializacao.regaliaObrigatoria.pontos.proficiências.map((proficiencia, index) => (
                                            <li key={index}>{proficiencia}</li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            {/* Outras Proficiencias */}
                            {especializacao.regaliaObrigatoria.outrasProficiencias && (
                                <>
                                    <Typography><strong>Outras Proficiências:</strong></Typography>
                                    <ul>
                                        {especializacao.regaliaObrigatoria.outrasProficiencias.map((proficiencia, index) => (
                                            <li key={index}>{proficiencia}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </AccordionDetails>
                    </Accordion>
                )}

                {/* Accordion para Habilidades */}
                <Typography variant="h4" className="boxTextTitle" sx={{ my: 3 }}>
                    Habilidade de Classe
                </Typography>
                {especializacao.regaliaObrigatoria.habilidade.map((habilidade, index) => (
                    <Accordion key={index}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index}-content`} id={`panel${index}-header`}>
                            <Typography>{habilidade.nome} </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>Tipo: {habilidade.tipo}</Typography>
                            <Typography>{habilidade.descricao}</Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}

                {/* Regalias */}
                <Typography variant="h4" className="boxTextTitle" sx={{ my: 3 }}>
                    Regalias
                </Typography>
                {especializacao.regalias.map((regalia, index) => (
                    <Accordion key={index}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel-regalia${index}-content`} id={`panel-regalia${index}-header`}>
                            <Typography>{regalia.nome} ({regalia.tipo})</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{regalia.descricao}</Typography>
                            {regalia.prerequisito && (
                                <Typography><strong>Pré-Requisito:</strong> {regalia.prerequisito}</Typography>
                            )}

                            {regalia.chanceDeSucesso && (
                                <Typography><strong>Chance de Sucesso:</strong> {regalia.chanceDeSucesso}</Typography>
                            )}


                            {regalia.bonus && regalia.bonus.vidaTemporaria && (
                                <Typography><strong>Bônus de Vida Temporária:</strong> {regalia.bonus.vidaTemporaria}</Typography>
                            )}

                            {regalia.tempoConstrucao && (
                                <Typography><strong>Tempo de contrução:</strong> {regalia.tempoConstrucao}</Typography>
                            )}

                            {regalia.duracao && (
                                <Typography><strong>Duração:</strong> {regalia.duracao}</Typography>
                            )}
                            {regalia.requisito && (
                                <Typography><strong>Requisito:</strong> {regalia.requisito}</Typography>
                            )}

                            {regalia.efeitos && regalia.efeitos.ativo && (
                                <Typography><strong>Ativo:</strong> {regalia.efeitos.ativo}</Typography>
                            )}
                            {regalia.efeitos && regalia.efeitos.duracao && (
                                <Typography><strong>Duração:</strong> {regalia.efeitos.duracao}</Typography>
                            )}

                            {regalia.efeitos && regalia.efeitos.passivo && (
                                <Typography><strong>Passivo:</strong> {regalia.efeitos.passivo}</Typography>
                            )}

                            {regalia.dano && (
                                <Typography><strong>Dano:</strong> {regalia.dano}</Typography>
                            )}

                            {regalia.modificadores && (
                                <>
                                    {regalia.modificadores.bonusSucesso && (
                                        <Typography><strong>Bonus Sucesso:</strong> {regalia.modificadores.bonusSucesso}</Typography>
                                    )}
                                    {regalia.modificadores.usoExtra && (
                                        <Typography><strong>Uso Extra:</strong> {regalia.modificadores.usoExtra}</Typography>
                                    )}
                                    {regalia.modificadores.duracaoExtra && (
                                        <Typography><strong>Duração Extra:</strong> {regalia.modificadores.duracaoExtra}</Typography>
                                    )}
                                    {regalia.modificadores.bonusLideranca && (
                                        <Typography><strong>Bonus Liderança:</strong> {regalia.modificadores.bonusLideranca}</Typography>
                                    )}
                                </>
                            )}

                            {regalia.interacoes && regalia.interacoes.comFortaleza && (
                                <Typography><strong>Interação com Fortaleza:</strong> {regalia.interacoes.comFortaleza}</Typography>
                            )}

                            {regalia.custoEstamina && (
                                <Typography><strong>Custo de Estâmina:</strong> {regalia.custoEstamina}</Typography>
                            )}
                            {regalia.custoMagia && (
                                <Typography><strong>Custo de Magia:</strong> {regalia.custoMagia}</Typography>
                            )}

                        </AccordionDetails>
                    </Accordion>
                ))}

            </Box>
        </Box>
    );
}

export default EruditoPage;