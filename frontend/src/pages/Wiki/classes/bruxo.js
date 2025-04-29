import bruxo from "../../../assets/images/bruxo.png";
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./classes.css";

const BruxoPage = () => {
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
    const especializacao =     {
        "titulo": "Bruxo",
        "img": bruxo,
        "descricao": "O bruxo é uma figura cuja essência se entrelaça com os fios ocultos que ligam o mundo natural ao sobrenatural, um estudioso e praticante das forças que existem à margem da compreensão mundana. Não é mero manipulador de energias arcanas, mas um mediador entre reinos vivos e mortos, um arauto das vontades inomináveis que sussurram entre as folhas das árvores antigas e nas sombras dos becos esquecidos. Seu poder brota de pactos antigos, de uma compreensão visceral das forças da vida e da morte, moldando o próprio tecido da realidade em ilusões e maldições que confundem os sentidos e dobram a vontade dos incautos. Ele cultiva a natureza não como um jardineiro, mas como um maestro regendo a fúria selvagem das raízes e a doçura enganosa das flores. Suas criaturas invocadas, sejam elas familiares astutos ou abominações retorcidas pela corrupção, não são meros servos — são extensões de sua própria alma fragmentada, espreitando o mundo através de olhos que não deveriam ver. E assim o bruxo caminha entre mundos, um viajante cuja marca é sentida nos rastros de vinhas torcidas e na sensação inquietante de que algo está observando, mesmo quando não há ninguém por perto.",
        "atributos": "Cada Regalia comprada na especialização Bruxo(a) fornece:\n- 2 Pontos de Vida\n- 0 Pontos de Estâmina\n- 8 Ponto em Magia",
        "regaliaObrigatoria": {
          "descricao": "Ao escolher esta especialização, o personagem recebe os seguintes atributos :",
          "pontos": {
            "atributos": {
              "quantidade": 2,
              "opcoes": ["Lidar Com Animais", "Arcanismo"]
            },
            "combate": {
              "quantidade": 1,
              "opcoes": ["Combate Arcano", "Ocultismo"]
            },
            "habilidades": {
              "quantidade": 2,
              "opcoes": ["Natureza", "Alquimia", "Enganação", "Condução exótica"]
            },
            "proficiências": ["Nenhuma nova proficiência."]
          },
          "habilidade": [{
            "nome": "Invocação de Familiar",
            "tipo": "Feitiço (Ritual)(1 hora)",
            "descricao": "O bruxo consegue invocar uma criatura para ser seu companheiro e servo. Apenas uma invocação por vez. O familiar tem pontos de vida igual a metade dos pontos de vida do Bruxo(a), um acerto igual ao valor do ocultismo do bruxo, valor de defesa igual ao valor de ritualismo + valor de  arcanismo do bruxo, e um ataque que condiz com a forma do familiar com 2d6 de dano sombrio e pode fazer tudo que a criatura conseguiria se estivesse em seu ambiente natural. O  familiar tem um turno de combate ao mesmo tempo que o da bruxa e possui 3 ações como qualquer outra. O bruxo pode controlar seu familiar em uma distância de até 200 metros e conjurar maldições da posição de seu familiar. O bruxo pode sacrificar seu familiar como uma reação para recuperar 20 pontos de vida e 10 de magia. Ao fazer isso, o bruxo fica impossibilitado de invocar um novo familiar até realizar um descanso longo.",
          }]
        },
        "regalias": [
          {
            "nome": "Fotossíntese",
            "tipo": "Ritual",
            "descricao": "O bruxo fica parado por 1 minuto em um ambiente aberto durante o dia para recuperar 4d10 pontos de vida e 2d6 pontos de magia. Custa 5 moedas de ouro em materiais para o ritual e pode ser realizado uma vez por dia. Se o bruxo tiver mais que 10 em ritualismo ele pode realizar duas vezes esse ritual em um mesmo dia e sem custo material.",
            "efeitos": {
              "ativo": "Recupera 4d10 pontos de vida e 2d6 pontos de magia"
            },
            "modificadores": {
              "usoExtra": "Se o bruxo tiver mais que 10 em ritualismo, pode realizar duas vezes esse ritual por dia e sem custo material"
            }
          },
          {
            "nome": "Dedo Verde",
            "tipo": "Feitiço",
            "descricao": "Acelera o crescimento de plantas sobrenaturalmente, em uma área de 18 metros de raio e um ponto em até 72 metros de distância, criando um terreno difícil natural. Essa habilidade pode ser usada em plantações, porém reduz a vida útil da planta e de seus alimentos para 12 horas, após esse tempo as plantas morrem e o alimento apodrece. Custa 2 pontos de magia.",
            "efeitos": {
              "ativo": "Cria terreno difícil natural e acelera o crescimento de plantas"
            },
            "modificadores": {
              "bonusSucesso": "Ao gastar 3 pontos de magia adicionais, as plantas criam espinhos que causam 1d6 de dano"
            }
          },
          {
            "nome": "Fúria Natural",
            "tipo": "Feitiço",
            "descricao": "Conjura um feitiço que afeta uma árvore de até 3 metros ou um arbusto pequeno. Essa planta escolhida cria vida própria e se torna servo do bruxo por um número de turnos igual ao seu ocultismo+1. Durante esse tempo, a planta tem 50 pontos de vida, valor de defesa igual a 9, uma velocidade de movimento de 4,5 metros, acerto de +10 e dano igual a 2d10 de dano do elemento terra. Essa criatura tem vulnerabilidade ao dano cortante causado por machados. Custa 10 pontos de magia.",
            "efeitos": {
              "ativo": "Cria uma planta serva com vida própria para ajudar o bruxo"
            }
          },
          {
            "nome": "Amizade Animal",
            "tipo": "Feitiço",
            "descricao": "O bruxo encanta um animal para obedecer suas ordens. O animal faz tudo como faria para defender outro membro da espécie ao defender o bruxo, mas nada que o coloque em perigo direto. O animal consegue se comunicar com o bruxo com um idioma escolhido pelo bruxo. Custa 2 pontos de magia.",
            "efeitos": {
              "ativo": "Encanta um animal para seguir ordens e comunicar-se com o bruxo"
            },
            "modificadores": {
              "bonusSucesso": "Ao gastar 10 pontos de magia adicionais, o animal pode ser corrompido em uma abominação com o dobro de pontos de vida"
            }
          },
          {
            "nome": "Alucinação",
            "tipo": "Maldição | Feitiço",
            "descricao": "O bruxo cria uma área de 18 metros de raio cheia de ilusões com sons, cheiros e imagens. Essas ilusões parecem verdadeiras de longe e apenas criaturas a 1,5 metros da área podem fazer um teste de intuição ou investigação para definir se é uma ilusão ou não. A dificuldade do teste para descobrir se a ilusão é real ou não é baseada na soma de 7 + ocultismo + arcanismo do bruxo. Custa 6 pontos de magia e dura 24 horas.",
            "efeitos": {
              "ativo": "Cria uma área de ilusões que mascaram o terreno real"
            },
            "modificadores": {
              "duracaoExtra": "Para cada 6 pontos de magia a mais, a duração aumenta em 12 horas"
            }
          },
          {
            "nome": "Confusão",
            "tipo": "Feitiço",
            "descricao": "Cria 10 imagens de si em espaços vazios em uma distância de até 9 metros de onde o bruxo está. Uma criatura em movimento que passar em 1,5 metros de uma cópia ou que atacar uma cópia com um ataque corpo a corpo tem 30% de chance de ficar atordoada por um turno, mas de qualquer forma a cópia some. Criaturas que não se desloquem ou ataquem uma cópia não ativam a maldição mesmo se estiverem a 1,5 metros da cópia. O bruxo pode mudar de posição com uma cópia de si desde que esteja em até 18 metros da cópia. Dura 10 rodadas. Custa 5 pontos de magia.",
            "efeitos": {
              "ativo": "Cria cópias do bruxo para confundir inimigos"
            },
            "modificadores": {
              "bonusSucesso": "Para cada 5 pontos adicionais de magia, aumenta em 5% a chance de causar o efeito de atordoamento"
            }
          },
          {
            "nome": "Contrato",
            "tipo": "Ritual | Maldição",
            "descricao": "O bruxo pode realizar um ritual para fazer um contrato com outra criatura, desde que a criatura concorde. O contrato pode ter um dos seguintes efeitos: Dividir vitalidade, Conceder Poder, ou Fantoche. Custa 10 moedas de ouro em materiais.",
            "efeitos": {
              "ativo": "Cria um contrato com outra criatura, conferindo-lhe benefícios ou maldições"
            },
            "modificadores": {
              "bonusSucesso": null,
              "usoExtra": null
            }
          },
          {
            "nome": "Bola de Cristal",
            "tipo": "Maldição",
            "descricao": "Marca uma criatura que esteja a até 3 metros de distância do bruxo por 7 dias. O bruxo consegue observar onde a criatura está e o que está fazendo durante 10 minutos por dia. Cada vez que olhar, gasta no mínimo um minuto e 5 pontos de magia.",
            "efeitos": {
              "ativo": "Permite que o bruxo observe uma criatura marcada"
            }
          },
          {
            "nome": "Dedo Podre",
            "tipo": "Maldição",
            "descricao": "A criatura humanóide tocada pelo bruxo tem 5% de chance de sofrer 12d12 pontos de dano necrótico. Caso contrário, sofre 12d4 pontos de dano necrótico. Custa 12 pontos de magia.",
            "efeitos": {
              "ativo": "Causa dano necrótico em uma criatura tocada"
            },
            "modificadores": {
              "bonusSucesso": "Para cada 3 pontos de magia adicionais, aumenta a chance de causar o dano de 12d12 em 5%"
            }
          },
          {
            "nome": "Invocação de Familiar Maior",
            "tipo": "Ritual",
            "descricao": "O bruxo consegue invocar um monstro pequeno ou dois minúsculos para ser seu companheiro e servo. O familiar tem pontos de vida igual ao dobro dos pontos de vida do Bruxo(a), um acerto de +10, valor de defesa igual a 15, e um ataque que condiz com a forma do familiar com 1d12 de dano e pode fazer tudo que a criatura conseguiria se estivesse em seu ambiente natural. O bruxo pode controlar seu familiar em uma distância de até 200 metros e conjurar maldições da posição de seu familiar.",
            "custoEstamina": null,
            "custoMagia": null,
            "chanceDeSucesso": null,
            "dano": "1d12",
            "requisito": null,
            "efeitos": {
              "passivo": null,
              "ativo": "O bruxo pode controlar seu familiar em uma distância de até 200 metros e conjurar maldições da posição de seu familiar."
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

export default BruxoPage;