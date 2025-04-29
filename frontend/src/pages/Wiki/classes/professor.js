import professor from "../../../assets/images/professor.png";
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./classes.css";

const ProfessorPage = () => {
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
        "titulo": "PROFESSOR",
        "img": professor,
        "descricao": "O Professor, com sua mente afiada e insaciável curiosidade, é um arquétipo de sabedoria e experimentação no mundo que habita. Em sua busca incessante por entender os mistérios do arcano e da tecnologia, ele molda o futuro a partir de seu vasto conhecimento, seja através de suas habilidades arcanas ou invenções brilhantes. Suas mãos, que muitas vezes seguram o compasso e a pena, também podem conjurar forças que moldam a matéria e desafiam os limites do mundo físico. Com o poder de criar e controlar constructos artificiais, o Professor se torna mais que um simples conjurador: ele é um criador. Seus ajudantes, feitos de elementos arcanos e materiais cuidadosamente selecionados, agem como extensões de sua própria vontade, executando suas ordens com precisão e força. O Professor é um mestre na manipulação de magias não destrutivas, utilizando seu talento para alterar o funcionamento das artes arcanas, seja ampliando sua duração, reduzindo custos ou aumentando seu alcance. Sua habilidade de conjurar múltiplas magias em um único turno, como um diretor orquestrando uma sinfonia de encantamentos, torna-o um adversário formidável, mesmo sem recorrer ao combate direto. O Professor é também um ser que compreende o valor da adaptação. Sua capacidade de modificar seus ajudantes, seja para torná-los mais eficientes ou dar-lhes uma aparência mais humanóide, reflete sua busca constante por aprimoramento. Além disso, suas magias de teletransporte e voo falam de sua compreensão dos limites do espaço e do tempo, como se ele pudesse dançar entre as fronteiras do mundo físico. Em sua essência, o Professor é um ser de profundo conhecimento e engenhosidade, sempre à frente de seu tempo, criando e moldando o arcano e a tecnologia para atender às suas necessidades, sejam elas científicas ou estratégicas. É um estudioso que caminha na linha tênue entre o possível e o impossível, um verdadeiro mestre da teoria e da prática.",
        "atributos": "Cada Regalia comprada na especialização Professor(a) fornece:\n- 4 Pontos de Vida\n- 0 Pontos de Estâmina\n- 6 Ponto em Magia",
        "regaliaObrigatoria": {
          "descricao": "Ao escolher esta especialização, o personagem recebe os seguintes atributos :",
          "pontos": {
            "atributos": {
              "quantidade": 2,
              "opcoes": ["Arcanismo", "Tecnologia"]
            },
            "combate": {
              "quantidade": 1,
              "opcoes": ["Combate arcano", "Destreza"]
            },
            "habilidades": {
              "quantidade": 2,
              "opcoes": ["História", "Alquimia", "Arcanismo"]
            },
            "proficiências": ["Nenhuma nova proficiência."]
          },
          "habilidade": [{
            "nome": " Ajudante de Laboratório ",
            "tipo": "Magia (3 ações)",
            "descricao": "O professor cria um elemental artificial do elemento arcano e aplica em um conjunto de materiais no valor de 50 moedas de ouro. Ao fazer isso cria um constructo  pequeno ou menor com pontos de vida igual a três vezes o nível de personagem professor. O professor pode conjurar magias da posição do seu ajudante desde que esteja em até 50 metros do mesmo. O constructo tem uma velocidade de movimento igual a 4,5 metros e pode ser voador ou não. Seu valor de armadura é igual a 10. Apenas um ajudante pode estar ativo por vez, que tem duração de até seu cancelamento ou chegar a zero pontos de vida( tanto o ajudante quanto o professor). Ao ser destruído, os materiais usados para construí-lo viram pó. Custa 10 pontos de magia para conjurar o elemental artificial. Ganha 5 pontos de vida adicionais a cada 5 pontos de magia adicionais ao conjurar o elemental.",
          }]
        },
        "regalias": [
          {
            "nome": "Escultor de Magias",
            "tipo": "Ativa | Reação",
            "descricao": "Ao conjurar uma magia que não cause dano, o professor pode escolher um dos seguintes efeitos: dobrar o tempo de duração, diminuir em metade o custo de pontos de magia (Arredondando pra cima) ou dobrar a quantidade de alvos. Pode ser usada 5 vezes ao dia, com recuperação de usos após um descanso longo.",
            "chanceDeSucesso": "100%",
            "dano": null,
            "requisito": null,
            "efeitos": {
              "passivo": null,
              "ativo": "Escolher um dos efeitos: dobrar duração, reduzir custo de pontos de magia ou dobrar número de alvos."
            },
            "modificadores": {
              "bonusSucesso": null,
              "usoExtra": "Pode ser usada até 5 vezes ao dia, com recuperação em descanso longo.",
              "duracaoExtra": null
            },
            "bonus": {
              "vidaTemporaria": null
            },
            "interacoes": {
              "comOutraRegalia": "Nenhuma interação especificada."
            }
          },
          {
            "nome": "Conjuração Múltipla",
            "tipo": "Passiva",
            "descricao": "O professor pode conjurar mais magias que não causem dano em um mesmo turno, usando uma reação para adicionar uma ação extra ao seu turno. Pode conjurar até 2 magias de 2 ações ou até 4 de 1 ação, ou qualquer combinação que gaste até 4 ações em um turno. Pode ser usada 5 vezes ao dia, com recuperação em descanso longo.",
            "chanceDeSucesso": "100%",
            "dano": null,
            "requisito": null,
            "efeitos": {
              "passivo": "Permite conjurar múltiplas magias não-dano em um único turno.",
              "ativo": "Usa uma reação para adicionar ação extra ao turno."
            },
            "modificadores": {
              "bonusSucesso": null,
              "usoExtra": "Pode ser usada até 5 vezes ao dia, com recuperação em descanso longo.",
              "duracaoExtra": null
            },
            "bonus": {
              "vidaTemporaria": null
            },
            "interacoes": {
              "comOutraRegalia": "Nenhuma interação especificada."
            }
          },
          {
            "nome": "Roque",
            "tipo": "Ativa | Ação",
            "descricao": "Troca de lugar com um ajudante através de teletransporte, desde que o ajudante esteja a até 50 metros. Pode ser usada 5 vezes ao dia, com recuperação em descanso longo.",
            "chanceDeSucesso": "100%",
            "dano": null,
            "requisito": null,
            "efeitos": {
              "passivo": null,
              "ativo": "Troca de lugar com um ajudante dentro do limite de distância."
            },
            "modificadores": {
              "bonusSucesso": null,
              "usoExtra": "Pode ser usada até 5 vezes ao dia, com recuperação em descanso longo.",
              "duracaoExtra": null
            },
            "bonus": {
              "vidaTemporaria": null
            },
            "interacoes": {
              "comOutraRegalia": "Nenhuma interação especificada."
            }
          },
          {
            "nome": "Ajudante Melhorado",
            "tipo": "Passiva",
            "descricao": "Permite conjurar um constructo de tamanho médio ou menor com aparência humanóide rústica. Seus pontos de vida são 4 vezes o nível do professor.",
            "chanceDeSucesso": "100%",
            "dano": null,
            "requisito": null,
            "efeitos": {
              "passivo": "Ajudante conjurado possui aparência humanóide rústica e pontos de vida aumentados.",
              "ativo": null
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
              "comOutraRegalia": "Nenhuma interação especificada."
            }
          },
          {
            "nome": "Teletransporte",
            "tipo": "Magia | Ação",
            "descricao": "Teletransporta todas as criaturas dentro de um raio de três metros para um local familiar. A chance de sucesso depende da distância, sendo 80% para até 10 km e 50% para até 100 km. Caso falhe, o teletransporte leva para uma direção aleatória. Custa 15 pontos de magia.",
            "custoMagia": 15,
            "chanceDeSucesso": "80% (10 km) | 50% (100 km)",
            "dano": null,
            "requisito": "Conhecimento do local a ser teletransportado",
            "efeitos": {
              "passivo": null,
              "ativo": "Teletransporta até 3 metros para local familiar."
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
              "comOutraRegalia": "Nenhuma interação especificada."
            }
          },
          {
            "nome": "Voar",
            "tipo": "Magia | Ação",
            "descricao": "Permite que o conjurador ou outra criatura voe. A velocidade de movimento no voo é o dobro da normal, com duração de 100 turnos. Custa 8 pontos de magia por criatura.",
            "custoMagia": 8,
            "chanceDeSucesso": "100%",
            "dano": null,
            "requisito": null,
            "efeitos": {
              "passivo": null,
              "ativo": "Concede a habilidade de voar por 100 turnos."
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
              "comOutraRegalia": "Nenhuma interação especificada."
            }
          },
          {
            "nome": "Invisibilidade",
            "tipo": "Magia | Ação",
            "descricao": "Torna o conjurador ou outra criatura invisível por até 10 minutos. A invisibilidade é quebrada ao causar dano. Custa 8 pontos de magia por criatura.",
            "custoMagia": 8,
            "chanceDeSucesso": "100%",
            "dano": null,
            "requisito": null,
            "efeitos": {
              "passivo": null,
              "ativo": "Torna invisível por até 10 minutos, ou até causar dano."
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
              "comOutraRegalia": "Nenhuma interação especificada."
            }
          },
          {
            "nome": "Ajudante de Combate",
            "tipo": "Passiva",
            "descricao": "Permite invocar um constructo de combate com 5 vezes o nível do professor em pontos de vida. O ajudante pode usar armas simples, escudo simples e armaduras leves ou médias. A velocidade de movimento é de 6 metros.",
            "chanceDeSucesso": "100%",
            "dano": null,
            "requisito": "Ajudante Melhorado",
            "efeitos": {
              "passivo": "Ajudante de combate com armas, armaduras e escudo.",
              "ativo": null
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
              "comOutraRegalia": "Nenhuma interação especificada."
            }
          },
          {
            "nome": "Atirador Arcano",
            "tipo": "Passiva",
            "descricao": "Dobra o alcance das magias que possuem alcance. Se o professor acertar um alvo com uma magia que precise de um rolamento de acerto, o dano atinge um segundo alvo a 1,5 metros de distância.",
            "chanceDeSucesso": "100%",
            "dano": null,
            "requisito": null,
            "efeitos": {
              "passivo": "Dobra o alcance de magias e permite acertar outro alvo próximo.",
              "ativo": null
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
              "comOutraRegalia": "Nenhuma interação especificada."
            }
          },
          {
            "nome": "Laboratório em Expansão",
            "tipo": "Passiva",
            "descricao": "Permite conjurar dois ajudantes em vez de um, com o custo base da magia para um único ajudante.",
            "chanceDeSucesso": "100%",
            "dano": null,
            "requisito": null,
            "efeitos": {
              "passivo": "Permite conjurar dois ajudantes com o custo de um.",
              "ativo": null
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
              "comOutraRegalia": "Nenhuma interação especificada."
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

export default ProfessorPage;