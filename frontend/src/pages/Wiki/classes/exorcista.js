import exorcista from "../../../assets/images/exorcista.png";
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./classes.css";

const ExorcistaPage = () => {
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
    const especializacao ={
        "titulo": "EXORCISTA",
        "img": exorcista,
        "descricao": "O Exorcista é um guardião das fronteiras entre os mundos, aquele que caminha onde as sombras se amontoam e o vazio sussurra promessas de destruição. Com uma fé inabalável, sua jornada é tanto uma busca espiritual quanto uma luta constante contra as forças que tentam corromper a humanidade. Armado com o conhecimento profundo de rituais sagrados e uma compreensão singular da natureza do mal, o Exorcista se vê como um juiz e executor, encarregado de purificar aqueles que foram tomados por demônios ou mortos-vivos. Sua capacidade de discernir e purificar é moldada por uma conexão direta com o divino, capaz de invocar milagres que envolvem purificação, iluminação e julgamento. A habilidade de fazer o mal retroceder, como um farol de luz contra as trevas, é acompanhada de uma habilidade de adaptação impressionante. Os Exorcistas podem manipular a energia celestial para criar esferas que protejam seus aliados, ou lançar ataques devastadores contra os corruptores da vida e da morte. Sua oração, como um eco de uma autoridade superior, permite que sua lâmina espiritual corte através das mentiras e corrupções, trazendo tanto a vingança quanto a cura. Porém, sua luta não é apenas contra os demônios externos. O Exorcista é muitas vezes um ser solitário, forjado na dor e na dúvida, testado pela escuridão que ameaça devorar sua própria alma. Ao conjurar a Marca Divina ou executar rituais de purificação, ele não só age sobre o mal, mas também reflete sobre sua própria humanidade, buscando o equilíbrio entre a justiça e a misericórdia. A batalha que trava, tanto no campo espiritual quanto físico, é uma busca constante pelo propósito, pela proteção dos inocentes e pela destruição de tudo o que corrompe o que é puro.",
        "atributos": "Cada Regalia comprada na especialização Exorcista(a) fornece:\n- 5 Pontos de Vida\n- 0 Pontos de Estâmina\n- 5 Ponto em Magia",
        "regaliaObrigatoria": {
          "descricao": "Ao escolher esta especialização, o personagem recebe os seguintes atributos :",
          "pontos": {
            "atributos": {
              "quantidade": 2,
              "opcoes": ["Combate Arcano ", "Arcanismo"]
            },
            "combate": {
              "quantidade": 1,
              "opcoes": ["Combate Arcano", "Ocultismo"]
            },
            "habilidades": {
              "quantidade": 2,
              "opcoes": ["Ritualismo", "Teologia", "História"]
            },
            "proficiências": ["Nenhuma nova proficiência."]
          },
          "habilidade": [{
            "nome": " Purificar corruptores ",
            "tipo": "Milagre  (2 Ações)",
            "descricao": "O milagre consiste em Purificar corruptores em um raio de 9 metros de distância. Todos os mortos vivos e demônios dentro desta área sofrem 2d10 de dano e perdem uma ação no próximo turno. Custa 3 pontos de Magia.",
          }]
        },
        "regalias": [
          {
            "nome": "Julgar Alma",
            "tipo": "Ação",
            "descricao": "O exorcista ora para que seu deus julgue uma criatura em seu nome. Deixa o alvo cego, surdo e restringido até o fim do turno. No final, há 30% de chance de causar 5d10 de dano.",
            "custoEstamina": null,
            "custoMagia": 5,
            "chanceDeSucesso": "30%",
            "dano": "5d10",
            "requisito": null,
            "efeitos": {
              "passivo": null,
              "ativo": "Cada 5 pontos de magia adicionais aumentam a chance de sucesso em 5%."
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
            "nome": "Explosão Sagrada",
            "tipo": "Passiva",
            "descricao": "Ao conjurar Chama Sagrada, o exorcista explode o alvo e todos a até 6m. Causa dano normal ao alvo e 1d8 extra em mortos-vivos.",
            "custoEstamina": null,
            "custoMagia": null,
            "chanceDeSucesso": null,
            "dano": "Dano normal + 1d8 (mortos-vivos)",
            "requisito": "Chama Sagrada",
            "efeitos": {
              "passivo": "Explosão de dano em área.",
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
              "comOutraRegalia": "Melhora Chama Sagrada"
            }
          },
          {
            "nome": "Marca do Julgamento",
            "tipo": "Passiva",
            "descricao": "Ao conjurar a Marca Divina, causa o dano inicial e repete o dano ao conjurar outros milagres. Causa 1d8 extra em mortos-vivos e demônios.",
            "custoEstamina": null,
            "custoMagia": null,
            "chanceDeSucesso": null,
            "dano": "Dano inicial + 1d8 (mortos-vivos/demônios)",
            "requisito": "Marca Divina",
            "efeitos": {
              "passivo": "Dano recorrente com novos milagres.",
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
              "comOutraRegalia": "Amplifica Marca Divina"
            }
          },
          {
            "nome": "Esfera Divina Completa",
            "tipo": "Ação",
            "descricao": "O exorcista cria até 5 esferas sagradas que duram 1h. Cada esfera dá -10% na chance de sucesso de maldições e controle mental.",
            "custoEstamina": null,
            "custoMagia": "2 por esfera",
            "chanceDeSucesso": null,
            "dano": null,
            "requisito": null,
            "efeitos": {
              "passivo": null,
              "ativo": "Protege aliados próximos e projeta luz."
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
            "nome": "Atirar Esfera Divina",
            "tipo": "Ação",
            "descricao": "Permite atirar esferas divinas. Causa 2d10 de dano por esfera e 1d10 extra em corruptores.",
            "custoEstamina": null,
            "custoMagia": "4 por esfera",
            "chanceDeSucesso": null,
            "dano": "2d10 por esfera + 1d10 (corruptores)",
            "requisito": "Esfera Divina, Teologia 4, Ocultismo 4",
            "efeitos": {
              "passivo": null,
              "ativo": "Permite lançar múltiplas esferas de uma vez."
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
              "comOutraRegalia": "Melhora Esfera Divina"
            }
          },
          {
            "nome": "Lente investigativa Melhorada",
            "tipo": "Passiva",
            "descricao": "Aumenta o alcance do milagre em 6m. Dura 10 minutos a mais. Causa 1d4 de dano a mortos-vivos e demônios dentro da área a cada rodada ou 6 segundos se estiver fora de combate. A área fica em meia luz caso esteja em escuridão, criaturas dentro desta área ficam iluminadas e destacadas do ambiente como se estivessem em luz completa.",
            "custoEstamina": null,
            "custoMagia": null,
            "chanceDeSucesso": null,
            "dano": "1d4 (contra mortos-vivos e demônios por rodada)",
            "requisito": null,
            "efeitos": {
              "passivo": "Aumenta o alcance, causa dano contínuo a inimigos específicos e ilumina a área.",
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
              "comOutraRegalia": null
            }
          },
          {
            "nome": "Arma divina",
            "tipo": "Ação",
            "descricao": "Uma arma divina astral começa a flutuar a 1,5 metros do Exorcista. Após conjurar, pode usar uma ação para mover a arma em até 9 m. Ao usar a ação para atacar, pode usar a arma divina no lugar de um ataque com arma, ela causa 1d12 de dano. Duração de 10 rodadas.",
            "custoEstamina": null,
            "custoMagia": "6",
            "chanceDeSucesso": null,
            "dano": "1d12",
            "requisito": null,
            "efeitos": {
              "passivo": null,
              "ativo": "Invoca uma arma astral que pode ser controlada e causa dano ao atacar."
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
            "nome": "Proteção contra o sombrio",
            "tipo": "Ação",
            "descricao": "Cria uma área protetora de 18 metros de raio ao redor do exorcista. Esta área atribui desvantagem em ataques feitos por corruptores. Para cada aliado protegido, o exorcista ganha um bônus de Combate Arcano igual a +1.",
            "custoEstamina": null,
            "custoMagia": "5",
            "chanceDeSucesso": null,
            "dano": null,
            "requisito": null,
            "efeitos": {
              "passivo": null,
              "ativo": "Cria uma área que penaliza ataques inimigos e fortalece o exorcista."
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
            "nome": "Oração de reflexão",
            "tipo": "Milagre",
            "descricao": "O Exorcista que tiver esferas divinas em volta de si pode girá-las para se defender de ofensores. Ao receber um ataque enquanto essa habilidade estiver ativa, causa 1d8 de dano por esfera conjurada ao atacante. Duração de 5 turnos.",
            "custoEstamina": null,
            "custoMagia": "10",
            "chanceDeSucesso": null,
            "dano": "1d8 por esfera",
            "requisito": "Esfera divina",
            "efeitos": {
              "passivo": null,
              "ativo": "Reflete dano em atacantes usando esferas divinas."
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
            "nome": "Exorcista de Combate",
            "tipo": "Especialização",
            "descricao": "1 ponto em fortitude e agilidade. 2 pontos em combate corpo a corpo ou distância. 1 em Força ou Destreza. Proficiência com todas as armas simples e marciais, escudos e armaduras.",
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

export default ExorcistaPage;