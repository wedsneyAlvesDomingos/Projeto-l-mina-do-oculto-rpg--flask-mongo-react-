import metamorfo from "../../../assets/images/metamorfo.png";
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./classes.css";

const MetamorfoPage = () => {
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
        "titulo": "Metamorfo",
        "img": metamorfo,
        "descricao": "Entre as sombras das florestas primevas e os vales intocados pelo tempo, caminham os metamorfos, figuras de essência mutável cuja ligação com o mundo natural transcende as formas fixas dos homens. Eles não são meros conhecedores das criaturas da terra, da água e do céu, mas partilham de sua linguagem, entendendo os sussurros do vento entre as copas das árvores e a cadência oculta dos passos de um lobo em perseguição. O corpo do metamorfo não conhece rigidez, moldando-se conforme a necessidade, tomando feições que lhe conferem força, destreza ou resistência, espelhando as qualidades das bestas que observa. Nos antigos mitos de aldeias distantes, são descritos como aqueles que percorrem o mundo sem que se saiba se são homem ou fera, seus olhos refletindo um entendimento que vai além das palavras e suas ações ditadas por instintos tão refinados quanto os da criatura mais astuta da mata. Se há um propósito em sua existência, ele se manifesta na fusão entre o humano e o selvagem, um equilíbrio onde a identidade não é uma âncora, mas um rio que flui, sem nunca se deter por completo.",
        "atributos": "Cada Regalia comprada na especialização Metamorfo(a) fornece:\n- 7 Pontos de Vida\n- 0 Pontos de Estâmina\n- 3 Ponto em Magia",
        "regaliaObrigatoria": {
          "descricao": "Ao escolher esta especialização, o personagem recebe os seguintes atributos :",
          "pontos": {
            "atributos": {
              "quantidade": 2,
              "opcoes": ["Lidar Com Animais", "Arcanismo"]
            },
            "combate": {
              "quantidade": 1,
              "opcoes": ["Combate Arcano", "Sobrevivência"]
            },
            "habilidades": {
              "quantidade": 2,
              "opcoes": ["Natureza", "Alquimia", "Fortitude"]
            },
            "proficiências": ["Proficiência total em  Conduções Exóticas, Terrestres e Aquáticas."]
          },
          "habilidade": [{
            "nome": "Mestre da metamorfose",
            "tipo": "Feitiço (Ritual)(1 hora)",
            "descricao": "O metamorfo pode usar até duas metamorfoses, que não sejam licantrópicas, ao consumir um elixir. Ao transformar em licantropo o metamorfo mantém todos os valores de Habilidade e ganha todos os benefícios somado a esses valores. Em forma licantropo é possível usar armas e outros equipamentos. Se a forma sofre alteração no tamanho o equipamento no corpo do metamorfo acompanha a mudança, porém armas não acompanham a mudança de tamanho.",
          }]
        },
        "regalias": [
  
          {
            "nome": "Asas",
            "tipo": "Passiva",
            "descricao": "Ao tomar um Elixir, o Metamorfo pode escolher aparecer asas como efeito adicional que dura pelo tempo em que o elixir durar. Ganha uma velocidade de voo igual à sua velocidade de movimento.",
            "custoMagia": 2,
            "efeitos": {
              "passivo": "Ganha a habilidade de voar com a mesma velocidade de movimento"
            }
          },
          {
            "nome": "Musculatura Monstruosa",
            "tipo": "Passiva",
            "descricao": "Ao tomar um Elixir, o Metamorfo pode mudar a biologia de seus músculos, ganhando um bônus de força igual a 4, podendo ultrapassar 15.",
            "custoMagia": 4,
            "efeitos": {
              "passivo": "Ganha bônus de força"
            }
          },
          {
            "nome": "Cauda",
            "tipo": "Passiva",
            "descricao": "Ao tomar um Elixir, o Metamorfo pode mudar a anatomia de seu corpo, ganhando uma cauda que pode ser usada como arma natural ou para segurar uma arma ou escudo.",
            "custoMagia": 4,
            "dano": "1d8 + força (concussivo)",
            "efeitos": {
              "passivo": "Ganha uma cauda que pode ser usada como arma ou para segurar itens"
            }
          },
          {
            "nome": "Licantropia Lobo",
            "tipo": "Metamorfose",
            "descricao": "O Metamorfo se transforma em um híbrido animal com várias características. Ganha visão no escuro, velocidade de movimento adicional, resistência a certos tipos de dano e ataques naturais com garras e mordida.",
            "custoMagia": 10,
            "efeitos": {
              "passivo": "Ganha resistência a danos cortante, perfurante e concussivo",
              "ativo": "Transforma-se em híbrido lobo com habilidades especiais"
            },
            "dano": "1d12 (mordida) + 1d12 (garras)",
            "duracaoExtra": "Dura 2 horas"
          },
          {
            "nome": "Licantropia Urso",
            "tipo": "Metamorfose",
            "descricao": "O Metamorfo se transforma em um híbrido urso, ganhando resistência a danos e aumentando sua vida e força.",
            "custoMagia": 10,
            "efeitos": {
              "passivo": "Ganha resistência a danos cortante, perfurante e concussivo",
              "ativo": "Transforma-se em híbrido urso com ataques naturais"
            },
            "dano": "3d4 (mordida) + 3d4 (garras)",
            "bonus": {
              "vidaTemporaria": "Ganha 20 pontos de vida extra"
            },
            "duracaoExtra": "Dura 2 horas"
          },
          {
            "nome": "Licantropia Javali",
            "tipo": "Metamorfose",
            "descricao": "O Metamorfo se transforma em um híbrido javali, com aumento de velocidade e resistência a danos.",
            "custoMagia": 10,
            "efeitos": {
              "passivo": "Ganha resistência a danos cortante, perfurante e concussivo",
              "ativo": "Transforma-se em híbrido javali com ataque com presas"
            },
            "dano": "2d6 (presas)",
            "bonus": {
              "vidaTemporaria": "Ganha 10 pontos de vida extra"
            },
            "duracaoExtra": "Dura 2 horas"
          },
          {
            "nome": "Licantropia Pantera",
            "tipo": "Metamorfose",
            "descricao": "O Metamorfo se transforma em um híbrido pantera, com maior furtividade, resistência a danos e ataques naturais.",
            "custoMagia": 10,
            "efeitos": {
              "passivo": "Ganha resistência a danos cortante, perfurante e concussivo",
              "ativo": "Transforma-se em híbrido pantera com ataques naturais"
            },
            "dano": "3d8 (mordida) + 3d8 (garras)",
            "modificadores": {
              "bonusSucesso": "Ganha bônus de 10 pontos em furtividade"
            },
            "duracaoExtra": "Dura 2 horas"
          },
          {
            "nome": "Licantropia Crocodilo",
            "tipo": "Metamorfose",
            "descricao": "O Metamorfo se transforma em um híbrido crocodilo, ganhando bônus de defesa, velocidade na água e ataque com mordida.",
            "custoMagia": 10,
            "efeitos": {
              "passivo": "Ganha resistência a danos cortante, perfurante e concussivo",
              "ativo": "Transforma-se em híbrido crocodilo com ataque natural"
            },
            "dano": "2d10 (mordida)",
            "bonus": {
              "vidaTemporaria": "Ganha bônus de +5 em defesa"
            },
            "duracaoExtra": "Dura 2 horas"
          },
          {
            "nome": "Licantropia Águia",
            "tipo": "Metamorfose",
            "descricao": "O metamorfo consegue se transformar em um híbrido águia. Ganha visão no escuro de 12 metros, 3 metros de velocidade adicional e resistência aos danos cortante, perfurante e concussivo. Ao se transformar, o metamorfo ganha asas, podendo voar com o dobro da sua velocidade de movimento. Possui um ataque desarmado com garras que causa 1d20 de dano perfurante. Pode atacar com suas garras enquanto voa como parte do movimento, com custo de uma ação. Não sofre ataques de oportunidade ao entrar ou sair do alcance de um inimigo. Dura 2 horas.",
            "custoEstamina": null,
            "custoMagia": 10,
            "efeitos": {
              "passivo": null,
              "ativo": "Ao se transformar em híbrido águia, o metamorfo ganha asas para voo."
            },
            "modificadores": {
              "bonusSucesso": "O metamorfo ganha 3 metros de velocidade adicional enquanto voa."
            },
            "bonus": null,
            "interacoes": null
          },
          {
            "nome": "Licantropia Cobra",
            "tipo": "Metamorfose",
            "descricao": "O metamorfo se transforma em um híbrido cobra. Ganha visão no escuro de 6 metros, 1,5 metros de velocidade adicional e resistência aos danos cortante, perfurante e concussivo. Ao atacar com mordida, o metamorfo tem 50% de chance de inocular um veneno que causa 1d10 de dano extra. Ganha a capacidade de enxergar com fossetas loreais e um ataque de mordida que causa 2d4 pontos de dano perfurante. Dura 2 horas.",
            "custoEstamina": null,
            "custoMagia": 10,
            "efeitos": {
              "passivo": null,
              "ativo": "O metamorfo pode atacar com mordida, podendo inocular veneno com chance de causar dano extra."
            },
            "modificadores": null,
            "bonus": null,
            "interacoes": null
          },
          {
            "nome": "Licantropia Salamandra",
            "tipo": "Metamorfose",
            "descricao": "O metamorfo se transforma em um híbrido salamandra. Ganha visão no escuro de 6 metros, 1,5 metros de velocidade adicional e resistência aos danos cortante, perfurante e concussivo. O metamorfo é incendiado com chamas que não o ferem, mas causa 1d6 de dano a criaturas em até 1,5 metros de distância. Imbui seus ataques com fogo, ganhando 2 pontos de dano extra. Recebe 2d8 pontos de vida extra e consegue escalar paredes sem necessidade de teste. É vulnerável a dano de gelo. Dura 2 horas.",
            "custoEstamina": null,
            "custoMagia": 10,
            "efeitos": {
              "passivo": "O metamorfo causa dano a criaturas próximas com chamas e ganha bônus de dano nos ataques com fogo.",
              "ativo": "Ao se transformar em salamandra, o metamorfo adquire resistência ao dano e ganha bônus de vida extra."
            },
            "modificadores": {
              "bonusSucesso": "O metamorfo recebe 2d8 pontos de vida extra e 2 pontos de dano adicional nos ataques com fogo."
            },
            "bonus": null,
            "interacoes": null
          },
          {
            "nome": "Virar Animal",
            "tipo": "Metamorfose",
            "descricao": "O metamorfo pode se transformar em um animal grande ou menor por um número de horas igual ao seu nível. Mantém os pontos de vida atuais e ganha pontos de vida temporários iguais ao seu valor de fortitude.",
            "custoEstamina": null,
            "custoMagia": null,
            "efeitos": {
              "passivo": null,
              "ativo": "Ao se transformar, o metamorfo ganha pontos de vida temporários equivalentes ao seu valor de fortitude."
            },
            "modificadores": null,
            "bonus": {
              "vidaTemporaria": "O metamorfo ganha pontos de vida temporários equivalentes ao seu valor de fortitude."
            },
            "interacoes": null
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

export default MetamorfoPage;