import mago from "../../../assets/images/mago.png";
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./classes.css";

const MagoPage = () => {
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
        "titulo": "MAGO",
        "img": mago,
        "descricao": "O Mago, como uma sombra longa e silenciosa que se estende sobre os destinos do mundo, é um ser de grande sabedoria e poder. Sua presença é como um sussurro nos ventos que atravessam os vales antigos, um murmurinho no fundo das bibliotecas esquecidas e nas torres que tocam as estrelas. Com os olhos carregados de antigos segredos, ele caminha com a serenidade daqueles que compreendem os mistérios do cosmos. Não há pressa em seus passos, pois o tempo, para ele, é apenas um fio que pode ser puxado e entrelaçado ao seu bel prazer. O Mago é um mestre das forças invisíveis, capaz de comandar os elementos e de dobrar o próprio tecido da realidade à sua vontade. Seus feitiços não são meras palavras ditas ao vento, mas cânticos profundos que ecoam em dimensões além da compreensão mortal. Ele pode, com um gesto de sua mão, invocar tempestades que congelam o coração dos inimigos ou chamar a terra sob seus pés para flutuar, desafiando as leis naturais. Nos campos de batalha, o Mago é tanto uma espada quanto um escudo, usando sua magia para defender ou destruir com a mesma destreza. Sua mente afiada, porém, jamais se deixa levar pela fúria do combate, pois ele sabe que o verdadeiro poder reside na paciência e na precisão. Ele se move como uma brisa, tão leve quanto as folhas caindo no outono, mas com a força para derrubar castelos inteiros. Contudo, o Mago não é apenas um conjurador de destruição. Ele é um guardião das artes arcanas, um farol de sabedoria e, para aqueles que buscam seu conselho, um guia nas sombras da ignorância. Mas, como toda grande força, ele é também um enigma, um reflexo das forças que ele manipula—cercado de mistério, admirado e temido, pois quem sabe até onde seu poder pode alcançar?",
        "atributos": "Cada Regalia comprada na especialização Mago(a) fornece:\n- 5 Pontos de Vida\n- 0 Pontos de Estâmina\n- 5 Ponto em Magia",
        "regaliaObrigatoria": {
          "descricao": "Ao escolher esta especialização, o personagem recebe os seguintes atributos :",
          "pontos": {
            "atributos": {
              "quantidade": 2,
              "opcoes": ["Combate arcano", "Arcanismo"]
            },
            "combate": {
              "quantidade": 1,
              "opcoes": ["Arcanismo", "Fortitude"]
            },
            "habilidades": {
              "quantidade": 2,
              "opcoes": ["Arcanismo", "Fortitude", "Agilidade"]
            },
            "proficiências": ["CProficiência em Armadura média e Escudo."]
          },
          "outrasProficiencias": [
            "Armaduras Pesadas",
            "Todos os Escudos"
          ],
          "habilidade": [{
            "nome": "Arcanista de combate",
            "tipo": "Passiva",
            "descricao": "Soma o valor de Arcanismo para o ataque de Míssil Mágico . Esse valor é adicionado por míssil.  ",
          }]
        },
        "regalias": [
          {
            "nome": "Alta Frequência",
            "tipo": "Ação",
            "descricao": "Faz com que um ponto a sua escolha em até 18 metros gere um som de imenso volume e frequência alta, causando danos em objetos e criaturas dentro do alcance.",
            "custoMagia": 6,
            "chanceDeSucesso": "100%",
            "dano": "3d10 + 1d10 por cada 3 pontos de magia extra",
            "requisito": null,
            "efeitos": {
              "passivo": null,
              "ativo": "Gera um som destruidor e danifica objetos e criaturas."
            },
            "modificadores": {
              "bonusSucesso": "Cada 3 pontos de magia extra causam 1d10 pontos de dano a mais",
              "usoExtra": "Pode ser usado uma vez por turno",
              "duracaoExtra": null
            },
            "bonus": {
              "vidaTemporaria": null
            },
            "interacoes": {
              "comOutraRegalia": "Nenhuma interação especificada"
            }
          },
          {
            "nome": "Grande Mão",
            "tipo": "Ação",
            "descricao": "Cria uma enorme mão que pode levantar ou atacar criaturas e objetos.",
            "custoMagia": 7,
            "chanceDeSucesso": "100%",
            "dano": "1d10 + Arcanismo",
            "requisito": null,
            "efeitos": {
              "passivo": null,
              "ativo": "Cria uma mão que pode atacar ou empurrar criaturas."
            },
            "modificadores": {
              "bonusSucesso": "A mão pode levantar criaturas até 500 kg",
              "usoExtra": "Pode ser usada uma vez por turno",
              "duracaoExtra": "Dura 10 rodadas"
            },
            "bonus": {
              "vidaTemporaria": null
            },
            "interacoes": {
              "comOutraRegalia": "Nenhuma interação especificada"
            }
          },
          {
            "nome": "Conjuração de Combate",
            "tipo": "Passiva",
            "descricao": "Permite que o mago inicie uma magia de múltiplas ações em um turno e termine em outro.",
            "chanceDeSucesso": "100%",
            "dano": null,
            "requisito": null,
            "efeitos": {
              "passivo": "Permite conjurar magias com ações múltiplas de forma contínua entre turnos.",
              "ativo": null
            },
            "modificadores": {
              "bonusSucesso": null,
              "usoExtra": "Pode ser usado com qualquer magia de múltiplas ações",
              "duracaoExtra": null
            },
            "bonus": {
              "vidaTemporaria": null
            },
            "interacoes": {
              "comOutraRegalia": "Nenhuma interação especificada"
            }
          },
          {
            "nome": "Globo de Proteção",
            "tipo": "Reação",
            "descricao": "Cria uma esfera protetora ao redor do mago, imune a danos externos.",
            "custoMagia": 10,
            "chanceDeSucesso": "100%",
            "dano": null,
            "requisito": "Receber um ataque ou efeito mágico que causaria dano",
            "efeitos": {
              "passivo": null,
              "ativo": "Cria uma esfera de proteção com 50 pontos de vida."
            },
            "modificadores": {
              "bonusSucesso": "Custa mais 10 pontos de magia para cada 25 pontos de vida extra na esfera",
              "usoExtra": "Pode ser usado uma vez por rodada",
              "duracaoExtra": "Dura até o fim do próximo turno do mago"
            },
            "bonus": {
              "vidaTemporaria": "50 pontos de vida temporária na esfera"
            },
            "interacoes": {
              "comOutraRegalia": "Nenhuma interação especificada"
            }
          },
          {
            "nome": "Parede de Espadas",
            "tipo": "Ação",
            "descricao": "Cria uma parede de espadas que causa dano e empurra criaturas que tentam atravessá-la.",
            "custoMagia": 12,
            "chanceDeSucesso": "100%",
            "dano": "4d10",
            "requisito": null,
            "efeitos": {
              "passivo": null,
              "ativo": "Cria uma parede de espadas que empurra e causa dano."
            },
            "modificadores": {
              "bonusSucesso": null,
              "usoExtra": "Pode ser usada uma vez por turno",
              "duracaoExtra": "Dura por 10 rodadas"
            },
            "bonus": {
              "vidaTemporaria": null
            },
            "interacoes": {
              "comOutraRegalia": "Nenhuma interação especificada"
            }
          },
          {
            "nome": "Azagaia Arcana",
            "tipo": "Ação",
            "descricao": "Atira um projétil de energia arcana que causa dano à criatura atingida.",
            "custoMagia": 6,
            "chanceDeSucesso": "100%",
            "dano": "2d10 + Arcanismo",
            "requisito": null,
            "efeitos": {
              "passivo": null,
              "ativo": "Dispara um projétil que causa dano."
            },
            "modificadores": {
              "bonusSucesso": "Aumenta o dano em 10 para cada 6 pontos de magia extra",
              "usoExtra": "Pode ser usado uma vez por turno",
              "duracaoExtra": null
            },
            "bonus": {
              "vidaTemporaria": null
            },
            "interacoes": {
              "comOutraRegalia": "Nenhuma interação especificada"
            }
          },
          {
            "nome": "Deslocar Terreno",
            "tipo": "Ação",
            "descricao": "Cria uma cópia do terreno em que todas as suas características flutuam no ar.",
            "custoMagia": 10,
            "chanceDeSucesso": "100%",
            "dano": null,
            "requisito": null,
            "efeitos": {
              "passivo": null,
              "ativo": "Cria uma cópia flutuante do terreno que reduz a velocidade de movimento."
            },
            "modificadores": {
              "bonusSucesso": "Custa 5 pontos de magia por metro de altura adicional",
              "usoExtra": "Pode ser usado uma vez por turno",
              "duracaoExtra": "Dura por 10 rodadas"
            },
            "bonus": {
              "vidaTemporaria": null
            },
            "interacoes": {
              "comOutraRegalia": "Nenhuma interação especificada"
            }
          },
          {
            "nome": "Tempestade Arcana",
            "tipo": "Ação",
            "descricao": "Cria uma tempestade que causa congelamento e dano contínuo em criaturas na área.",
            "custoMagia": 10,
            "chanceDeSucesso": "70%",
            "dano": "8d6 por turno de condição congelando",
            "requisito": null,
            "efeitos": {
              "passivo": null,
              "ativo": "Causa a condição congelando e dano contínuo dentro da tempestade."
            },
            "modificadores": {
              "bonusSucesso": "Custa 5 pontos de magia para aumentar a chance de congelamento em 5%",
              "usoExtra": "Pode ser usado uma vez por turno",
              "duracaoExtra": "Dura 10 rodadas"
            },
            "bonus": {
              "vidaTemporaria": null
            },
            "interacoes": {
              "comOutraRegalia": "Nenhuma interação especificada"
            }
          },
          {
            "nome": "Meteoro Arcano",
            "tipo": "Ação",
            "descricao": "Dispara um meteoro arcano que causa dano massivo e deixa a condição queimando.",
            "custoMagia": 10,
            "chanceDeSucesso": "100%",
            "dano": "8d10 + Arcanismo",
            "requisito": "Explosão Arcana, Conjuração de Combate",
            "efeitos": {
              "passivo": null,
              "ativo": "Causa dano massivo em área e pode deixar a condição queimando."
            },
            "modificadores": {
              "bonusSucesso": "Custa 10 pontos de magia para adicionar uma explosão extra",
              "usoExtra": "Pode ser usado uma vez por turno",
              "duracaoExtra": null
            },
            "bonus": {
              "vidaTemporaria": null
            },
            "interacoes": {
              "comOutraRegalia": "Nenhuma interação especificada"
            }
          },
          {
            "nome": "Teletransporte Tático",
            "tipo": "Ação",
            "descricao": "Teletransporta o mago até 18 metros de distância para um local visível.",
            "custoMagia": 2,
            "chanceDeSucesso": "100%",
            "dano": null,
            "requisito": null,
            "efeitos": {
              "passivo": null,
              "ativo": "Teletransporta o mago instantaneamente."
            },
            "modificadores": {
              "bonusSucesso": null,
              "usoExtra": "Pode ser usado uma vez por turno",
              "duracaoExtra": null
            },
            "bonus": {
              "vidaTemporaria": null
            },
            "interacoes": {
              "comOutraRegalia": "Nenhuma interação especificada"
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

export default MagoPage;