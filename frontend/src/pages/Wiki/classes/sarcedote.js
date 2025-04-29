import sarcedote from "../../../assets/images/sarcedote.png";
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./classes.css";

const SarcedotePage = () => {
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
    const especializacao =  {
        "titulo": "Sarcedote",
        "img": sarcedote,
        "descricao": "Na penumbra das grandes catedrais e nas montanhas onde os ventos sussurram segredos antigos, surge uma figura que, mais que qualquer outra, carrega em seu ser o peso do destino dos outros. O sacerdote, cujo manto não apenas cobre seu corpo, mas resguarda as esperanças e os temores daqueles que buscam consolo nas horas de trevas. Sua presença é, muitas vezes, uma âncora em mares revoltos, um farol que brilha na escuridão do sofrimento humano. Em sua jornada, o sacerdote possui a capacidade de curar e restaurar, não só os corpos quebrantados, mas também as almas fragmentadas. Sua magia não é uma força bruta, mas uma gentileza revestida de poder. A cura que ele oferece não vem apenas do gesto, mas da conexão com o divino, uma força etérea que se manifesta em milagre após milagre. Cada oração, cada feitiço lançado, é um eco de um chamado maior, uma resposta ao sofrimento do mundo. Quando o sacerdote invoca o poder do milagre, ele não apenas traz alívio imediato, mas estende seu toque para além, fazendo com que sua benção continue, fluindo suavemente, como um rio que nunca cessa de correr. Mas sua dedicação vai além da cura. Ele também é o guardião dos outros, aquele que se coloca entre seus companheiros e o perigo, dividindo as dores e os fardos. Em sua jornada, a troca de fardos é um caminho sem retorno, onde o peso de um só é repartido com a alma do outro. O sacerdote não teme os sacrifícios, pois sabe que, em sua perda, pode salvar vidas. E, em sua bondade, pode até mesmo devolver o que o destino tomara, ressuscitando aqueles que foram tomados pela morte, com a promessa de um novo amanhã. O sacerdote é um ser de dualidade: forte, mas gentil; humilde, mas poderoso. Cada ação sua ressoa com um propósito que transcende a compreensão humana, e sua presença é tanto uma bênção quanto uma lembrança de que, no final, todos devemos, em algum momento, buscar a luz nas sombras.",
        "atributos": "Cada Regalia comprada na especialização Sarcedote(a) fornece:\n- 4 Pontos de Vida\n- 0 Pontos de Estâmina\n- 6 Ponto em Magia",
        "regaliaObrigatoria": {
          "descricao": "Ao escolher esta especialização, o personagem recebe os seguintes atributos :",
          "pontos": {
            "atributos": {
              "quantidade": 2,
              "opcoes": ["Fortitude", "Arcanismo"]
            },
            "combate": {
              "quantidade": 1,
              "opcoes": ["Arcanismo", "Combate Arcano "]
            },
            "habilidades": {
              "quantidade": 2,
              "opcoes": ["Medicina", "Estudo Religioso", "Intuição", "Percepção"]
            },
            "proficiências": null
          },
          "outrasProficiencias": [
            "Armaduras Pesadas",
            "Todos os Escudos"
          ],
          "habilidade": [{
            "nome": "Cura Maior",
            "tipo": "(Ação) (Milagre)",
            "descricao": "Esse milagre cura 3d4 Pontos de Vida de até 5 aliados que estejam em até 18 metros. Custa 1 ponto de Magia. Aumenta a cura em 1d4 Pontos de Vida para cada 2 pontos de magia adicionais ao realizar o milagre.",
          }]
        },
        "regalias": [
          {
            "nome": "Cura Maior Estendida",
            "tipo": "Passiva",
            "descricao": "Quando um sacerdote com esta regalia conjura o milagre Cura Maior, a cura se repete em seu turno seguinte nos alvos afetados.",
            "custoMagia": null,
            "chanceDeSucesso": "100%",
            "dano": null,
            "requisito": "Sacerdote com a regalia",
            "efeitos": {
              "passivo": "A cura é repetida no turno seguinte."
            },
            "modificadores": {
              "bonusSucesso": null,
              "usoExtra": null,
              "duracaoExtra": null
            },
            "bonus": {
              "vidaTemporaria": null
            },
            "interacoes": {
              "comOutraRegalia": "Pode ser combinado com Cura Maior Melhorada para aplicar Abençoar também."
            }
          },
          {
            "nome": "Cura Maior Melhorada",
            "tipo": "Passiva",
            "descricao": "Ao realizar o milagre Cura Maior, o Sacerdote pode escolher que o efeito de Abençoar seja aplicado às criaturas escolhidas.",
            "custoMagia": null,
            "chanceDeSucesso": "100%",
            "dano": null,
            "requisito": "Sacerdote com Cura Maior",
            "efeitos": {
              "passivo": "Abençoar é aplicado às criaturas escolhidas ao realizar Cura Maior."
            },
            "modificadores": {
              "bonusSucesso": null,
              "usoExtra": null,
              "duracaoExtra": null
            },
            "bonus": {
              "vidaTemporaria": null
            },
            "interacoes": {
              "comOutraRegalia": "Combina bem com Cura Maior Estendida, repetindo o efeito no próximo turno."
            }
          },
          {
            "nome": "Abençoar Arma Melhorado",
            "tipo": "Ação",
            "descricao": "Abençoa até 5 armas e muda o tipo de dano da arma para Sagrado. Dura 10 rodadas. Aumenta o dano da arma em 1d4.",
            "custoMagia": "1 ponto de Magia",
            "chanceDeSucesso": "100%",
            "dano": "1d4 adicional",
            "requisito": "Abençoar Arma",
            "efeitos": {
              "passivo": null,
              "ativo": "Abençoa até 5 armas, muda o tipo de dano para Sagrado e aumenta o dano em 1d4."
            },
            "modificadores": {
              "bonusSucesso": null,
              "usoExtra": null,
              "duracaoExtra": null
            },
            "bonus": {
              "vidaTemporaria": null
            },
            "interacoes": {
              "comOutraRegalia": "Pode ser combinado com outras regalias que aumentam o dano de armas."
            }
          },
          {
            "nome": "Sacrifício",
            "tipo": "Ação",
            "descricao": "O sacerdote pode se sacrificar para salvar aliados à Beira da Morte. Ele fica à Beira da Morte e consome metade de sua mana atual, mas com gasto mínimo de 10.",
            "custoMagia": "10 pontos de Magia",
            "chanceDeSucesso": "5% por pessoa salva",
            "dano": null,
            "requisito": "Sacerdote com Mana suficiente",
            "efeitos": {
              "passivo": null,
              "ativo": "O Sacerdote fica à Beira da Morte e consome metade de sua mana para salvar aliados."
            },
            "modificadores": {
              "bonusSucesso": "Pode receber 2d10 de vida e magia no próximo turno.",
              "usoExtra": null,
              "duracaoExtra": null
            },
            "bonus": {
              "vidaTemporaria": null
            },
            "interacoes": {
              "comOutraRegalia": null
            }
          },
          {
            "nome": "Ressuscitar",
            "tipo": "Ação",
            "descricao": "Restaura uma criatura morta em até 10 minutos de sua morte. A criatura retorna com 10 pontos de vida, mas com a condição Cansado 4.",
            "custoMagia": "10 pontos de Magia",
            "chanceDeSucesso": "100%",
            "dano": null,
            "requisito": "Criatura morta em até 10 minutos",
            "efeitos": {
              "passivo": null,
              "ativo": "Restaura uma criatura morta com 10 pontos de vida e a condição Cansado 4."
            },
            "modificadores": {
              "bonusSucesso": null,
              "usoExtra": "Apenas uma vez por dia.",
              "duracaoExtra": null
            },
            "bonus": {
              "vidaTemporaria": null
            },
            "interacoes": {
              "comOutraRegalia": null
            }
          },
          {
            "nome": "Restauração Maior",
            "tipo": "Ação",
            "descricao": "Tira completamente as condições Envenenado, Congelado, Queimando e Cansado do alvo.",
            "custoMagia": "10 pontos de Magia",
            "chanceDeSucesso": "100%",
            "dano": null,
            "requisito": "Sacerdote",
            "efeitos": {
              "passivo": null,
              "ativo": "Remove Envenenado, Congelado, Queimando e Cansado do alvo."
            },
            "modificadores": {
              "bonusSucesso": null,
              "usoExtra": null,
              "duracaoExtra": null
            },
            "bonus": {
              "vidaTemporaria": null
            },
            "interacoes": {
              "comOutraRegalia": null
            }
          },
          {
            "nome": "Crítico Guiado",
            "tipo": "Reação",
            "descricao": "Aumenta a chance de crítico de uma criatura em até 18 metros de distância. Ao iluminar um ponto no alvo do ataque, o noviço gera +2 na margem de crítico.",
            "custoMagia": "5 pontos de Magia",
            "chanceDeSucesso": "100%",
            "dano": null,
            "requisito": "Criatura em até 18 metros de distância",
            "efeitos": {
              "passivo": null,
              "ativo": "Aumenta a chance de crítico no alvo em até +2."
            },
            "modificadores": {
              "bonusSucesso": null,
              "usoExtra": null,
              "duracaoExtra": null
            },
            "bonus": {
              "vidaTemporaria": null
            },
            "interacoes": {
              "comOutraRegalia": null
            }
          },
          {
            "nome": "Empatia",
            "tipo": "Ação",
            "descricao": "Cria uma ligação com o aliado e divide a dor e sofrimento recebido por ele.",
            "custoMagia": "2 pontos de Magia",
            "chanceDeSucesso": "100%",
            "dano": null,
            "requisito": "Sacerdote e aliado",
            "efeitos": {
              "passivo": null,
              "ativo": "Divide o dano recebido pelo aliado."
            },
            "modificadores": {
              "bonusSucesso": null,
              "usoExtra": null,
              "duracaoExtra": null
            },
            "bonus": {
              "vidaTemporaria": null
            },
            "interacoes": {
              "comOutraRegalia": null
            }
          },
          {
            "nome": "Silêncio",
            "tipo": "Ação",
            "descricao": "Impedir todos os alvos dentro de 3 metros de raio de usar qualquer magia, feitiço ou milagre até o fim do próximo turno.",
            "custoMagia": "5 pontos de Magia",
            "chanceDeSucesso": "100%",
            "dano": null,
            "requisito": "Sacerdote",
            "efeitos": {
              "passivo": null,
              "ativo": "Impedir o uso de habilidades mágicas em uma área."
            },
            "modificadores": {
              "bonusSucesso": null,
              "usoExtra": null,
              "duracaoExtra": null
            },
            "bonus": {
              "vidaTemporaria": null
            },
            "interacoes": {
              "comOutraRegalia": null
            }
          },
          {
            "nome": "Clemência",
            "tipo": "Ação",
            "descricao": "Abencoar todos os aliados em até 9 metros com Abençoar e todos os inimigos com Marca Divina.",
            "custoMagia": "10 pontos de Magia",
            "chanceDeSucesso": "100%",
            "dano": null,
            "requisito": "Sacerdote",
            "efeitos": {
              "passivo": null,
              "ativo": "Abençoa aliados e marca inimigos com suas respectivas magias."
            },
            "modificadores": {
              "bonusSucesso": null,
              "usoExtra": null,
              "duracaoExtra": null
            },
            "bonus": {
              "vidaTemporaria": null
            },
            "interacoes": {
              "comOutraRegalia": null
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

export default SarcedotePage;