import elementalista from "../../../assets/images/elementalista.png";
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./classes.css";

const ElementalistaPage = () => {
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
        "titulo": "Elementalista",
        "img": elementalista,
        "descricao": "O Elementalista, moldador dos próprios fios da criação, caminha entre os mundos do fogo, da terra, do ar e da água como um maestro conduzindo uma sinfonia cósmica. Seus olhos refletem tempestades distantes e mares revoltos, enquanto suas mãos, calejadas não pelo trabalho comum, mas pelo toque da essência primordial, desenham símbolos no ar que vibram com o poder dos próprios alicerces do mundo. Ele não domina os elementos, mas dança com eles em uma harmonia ancestral, persuadindo a chama a rugir como um dragão acordado ou a brisa a sussurrar segredos esquecidos pelos mortais. Rochas se erguem sob seus pés como servos antigos despertos de seu sono de eras, e rios desviam seu curso obedientes à sua silenciosa vontade. Onde o Elementalista passa, a natureza o reconhece — árvores inclinam seus galhos em reverência, e trovões ecoam seu nome nas montanhas distantes. Ele é um ser à parte, nem mestre nem servo, mas um intermediário entre o mundo dos homens e o coração selvagem da própria terra. Em seus passos ecoa o crepitar das chamas, o sussurro do vento, o rugido das marés e o sussurro das pedras — uma sinfonia eterna da qual ele é tanto condutor quanto parte.",
        "atributos": "Cada Regalia comprada na especialização Elementalista(a) fornece:\n- 5 Pontos de Vida\n- 0 Pontos de Estâmina\n- 5 Ponto em Magia",
        "regaliaObrigatoria": {
          "descricao": "Ao escolher esta especialização, o personagem recebe os seguintes atributos :",
          "pontos": {
            "atributos": {
              "quantidade": 2,
              "opcoes": ["Arcanismo", "Natureza"]
            },
            "combate": {
              "quantidade": 1,
              "opcoes": ["Combate Arcano", "Ritualismo"]
            },
            "habilidades": {
              "quantidade": 2,
              "opcoes": ["Natureza", "Alquimia", "Condução exótica"]
            },
            "proficiências": ["Nenhuma nova proficiência."]
          },
          "habilidade": [{
            "nome": "Dominar Elemento Avançado",
            "tipo": "Feitiço( Ação)",
            "descricao": "Criar fortes rajadas de vento capazes de abrir portas e janelas, além de empurrar criaturas médias ou menores em 3 metros para trás. Mover 1 metro cúbico de terra solta ou abrir 1 metros cúbico de passagem em rocha sólida a cada 6 segundos. Acender uma fogueira, vela, tocha e qualquer combustível com chamas. Pode também criar uma chama em sua mão que tem duração de 1 hora ou até arremessar em em alguma direção em até 6 metros. Causa 1d6 de dano no que acertar. Custa 2 pontos de magia.Controlar até 10 metros cúbicos de água, podendo modelar sua forma  e sua cor, e congelar porções dessa água (10 litros a cada 6 segundos). Acender estalos de eletricidade que causam flashes de luz. Esses flashes têm 50% de chance de cegar uma criatura por 6 segundos. Além disso, pode manter a faísca elétrica em sua mão e causar um pouco de dano em alguma criatura que tocar em alcance corpo a corpo. Causa 1d8 de dano. ",
          }]
        },
        "regalias": [
          {
            "nome": "Montaria Elemental",
            "tipo": "Ritual",
            "descricao": "O elementalista faz um ritual para conjurar uma montaria elemental, que não consegue voar e é grande ou muito grande. Escolha um elemento para a montaria ser imune. A montaria tem habilidades baseadas no elemento escolhido.",
            "custoEstamina": 0,
            "custoMagia": 0,
            "efeitos": {
              "ativo": "Dependente do elemento escolhido, a montaria recebe habilidades como ar, fogo, raio, terra ou água."
            },
            "modificadores": {
              "usoExtra": "Uma vez a cada 10 minutos."
            }
          },
          {
            "nome": "Companheiro Elemental",
            "tipo": "Ritual",
            "descricao": "O elementalista realiza um ritual para invocar uma criatura pequena que não consegue voar. A criatura é imune a um elemento de sua escolha e recebe habilidades baseadas no elemento selecionado.",
            "custoEstamina": 0,
            "custoMagia": 0,
            "efeitos": {
              "ativo": "Dependente do elemento escolhido, o companheiro recebe habilidades como ar, fogo, raio, terra ou água."
            },
            "modificadores": {
              "usoExtra": "Uma vez a cada 10 minutos."
            }
          },
          {
            "nome": "Ataque Elemental Múltiplo",
            "tipo": "Ação",
            "descricao": "O elementalista dispara três jatos de elementos à sua escolha, causando 2d10 de dano para cada jato. Cada jato tem 40% de chance de aplicar um efeito no alvo.",
            "custoEstamina": 0,
            "custoMagia": 6,
            "chanceDeSucesso": 40,
            "dano": "2d10",
            "efeitos": {
              "ativo": "Chance de aplicar efeitos como sangramento, atordoado, congelado, queimando ou surdo/cego dependendo do elemento."
            }
          },
          {
            "nome": "Armadura Elemental Melhorada",
            "tipo": "Feitiço",
            "descricao": "Cria uma armadura elemental que fornece pontos de vida temporários iguais ao valor de arcanismo + ocultismo do elementalista e causa dano de retaliação no atacante.",
            "custoEstamina": 0,
            "custoMagia": 10,
            "efeitos": {
              "passivo": "Causa dano de retaliação a cada ataque corpo a corpo que o elementalista recebe enquanto tiver pontos de vida temporários."
            },
            "modificadores": {
              "duracaoExtra": "5 pontos de magia para cada 5 pontos adicionais de vida temporária."
            },
            "bonus": {
              "vidaTemporaria": "Valor igual a arcanismo + ocultismo."
            }
          },
          {
            "nome": "Nevasca",
            "tipo": "Feitiço",
            "descricao": "Cria uma tempestade de neve que causa dano e tem 70% de chance de aplicar congelamento. Dura por rodadas baseadas no arcanismo do conjurador.",
            "custoEstamina": 0,
            "custoMagia": 10,
            "dano": "3d6",
            "efeitos": {
              "ativo": "Todas as criaturas na área ficam Devagar e recebem dano ao entrar ou começar o turno na área."
            },
            "modificadores": {
              "duracaoExtra": "Dura por rodadas iguais ao arcanismo do conjurador."
            }
          },
          {
            "nome": "Pilar de Chamas",
            "tipo": "Feitiço",
            "descricao": "Cria uma coluna de chamas que causa dano às criaturas dentro do raio. O elementalista pode mover o pilar após a conjuração.",
            "custoEstamina": 0,
            "custoMagia": 10,
            "dano": "9d4",
            "efeitos": {
              "ativo": "Causa dano de fogo às criaturas na área e tem 60% de chance de aplicar o efeito 'Queimando'."
            },
            "modificadores": {
              "duracaoExtra": "Dura por rodadas iguais ao arcanismo do conjurador."
            }
          },
          {
            "nome": "Tempestade de Raios",
            "tipo": "Feitiço",
            "descricao": "Cria uma área de raios que causa dano e tem chance de paralisar as criaturas dentro da área. Dura por rodadas baseadas no arcanismo.",
            "custoEstamina": 0,
            "custoMagia": 10,
            "dano": "6d6",
            "efeitos": {
              "ativo": "Chance de paralisia e dano adicional para criaturas com armadura de metal."
            },
            "modificadores": {
              "duracaoExtra": "Dura por rodadas iguais ao arcanismo do conjurador."
            }
          },
          {
            "nome": "Terremoto",
            "tipo": "Feitiço",
            "descricao": "Cria um terremoto que causa dano e tem chance de restringir as criaturas dentro da área. Também cria terreno difícil que causa dano adicional.",
            "custoEstamina": 0,
            "custoMagia": 10,
            "dano": "3d6",
            "efeitos": {
              "ativo": "Causa dano de terra e cria terreno difícil."
            },
            "modificadores": {
              "duracaoExtra": "Dura por rodadas iguais ao arcanismo do conjurador."
            }
          },
          {
            "nome": "Furacão",
            "tipo": "Feitiço",
            "descricao": "O feitiço cria uma área de 4,5 metros de raio em um ponto que o elementalista consegue ver em até 30 metros. Criaturas dentro do raio sofrem 3d10 +6 pontos de dano de impacto ao entrarem ou começarem o turno na área. O feitiço tem 40% de chance de causar Surdo e Devagar em quem toma dano da área.",
            "custoEstamina": 0,
            "custoMagia": 10,
            "efeitos": {
              "ativo": "Causa dano de impacto em uma área, com chance de aplicar Surdo e Devagar nos inimigos que tomam dano."
            },
            "modificadores": {
              "duracaoExtra": "O efeito dura por um número de rodadas igual ao valor de arcanismo do elementalista."
            }
          },
          {
            "nome": "Espinho de Gelo",
            "tipo": "Feitiço",
            "descricao": "O feitiço cria um enorme espinho de gelo a partir do chão para acertar uma criatura em até 9 metros. Causa 5d6 de dano de gelo e 5d6 de dano perfurante.",
            "custoEstamina": 0,
            "custoMagia": 10,
            "efeitos": {
              "ativo": "Causa dano de gelo e dano perfurante a uma criatura."
            }
          },
          {
            "nome": "Lança Chamas",
            "tipo": "Feitiço",
            "descricao": "O feitiço cria um cone de 18 metros de comprimento e 60° de ângulo. Criaturas dentro desse cone tomam 5d4 de dano de fogo e recebem um nível de Queimando.",
            "custoEstamina": 0,
            "custoMagia": 8,
            "efeitos": {
              "ativo": "Causa dano de fogo e aplica Queimando em todas as criaturas no cone."
            }
          },
          {
            "nome": "Eletrocutar",
            "tipo": "Feitiço",
            "descricao": "O feitiço energiza a mão do elementalista com uma carga elétrica. Ao tocar em um inimigo, causa 3d10 +7 de dano e o alvo tem 20% de chance de ficar paralisado.",
            "custoEstamina": 0,
            "custoMagia": 8,
            "efeitos": {
              "ativo": "Causa dano de eletricidade e tem chance de paralisar o alvo."
            }
          },
          {
            "nome": "Esmagar Com Corrente",
            "tipo": "Feitiço",
            "descricao": "O feitiço força uma grande quantidade de ar para baixo, esmagando criaturas em uma área de 1,5 metros de raio. A magia causa 2d6 de dano de impacto, mais 5d4 de dano de corte e 20% de chance de deixar o inimigo Deitado.",
            "custoEstamina": 0,
            "custoMagia": 8,
            "efeitos": {
              "ativo": "Causa dano de impacto e corte e pode deixar a criatura Deitada."
            }
          },
          {
            "nome": "Estalagmite de Cristal",
            "tipo": "Feitiço",
            "descricao": "O feitiço conjura uma estalagmite de cristal que é atirada em uma criatura em até 18 metros. Causa 3d6 de dano perfurante e 2d10 de dano de terra.",
            "custoEstamina": 0,
            "custoMagia": 8,
            "efeitos": {
              "ativo": "Causa dano perfurante e dano de terra a uma criatura."
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

export default ElementalistaPage;