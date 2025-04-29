import invocador from "../../../assets/images/invocador.png";
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./classes.css";

const InvocadorPage = () => {
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
        "titulo": "Invocador",
        "img": invocador,
        "descricao": "Entre as sombras das florestas primevas e os vales intocados pelo tempo, caminham os metamorfos, figuras de essência mutável cuja ligação com o mundo natural transcende as formas fixas dos homens. Eles não são meros conhecedores das criaturas da terra, da água e do céu, mas partilham de sua linguagem, entendendo os sussurros do vento entre as copas das árvores e a cadência oculta dos passos de um lobo em perseguição. O corpo do metamorfo não conhece rigidez, moldando-se conforme a necessidade, tomando feições que lhe conferem força, destreza ou resistência, espelhando as qualidades das bestas que observa. Nos antigos mitos de aldeias distantes, são descritos como aqueles que percorrem o mundo sem que se saiba se são homem ou fera, seus olhos refletindo um entendimento que vai além das palavras e suas ações ditadas por instintos tão refinados quanto os da criatura mais astuta da mata. Se há um propósito em sua existência, ele se manifesta na fusão entre o humano e o selvagem, um equilíbrio onde a identidade não é uma âncora, mas um rio que flui, sem nunca se deter por completo.",
        "atributos": "Cada Regalia comprada na especialização Invocador(a) fornece:\n- 3 Pontos de Vida\n- 0 Pontos de Estâmina\n- 7 Ponto em Magia. Para se tornar um profano o deus escolhido ao pegar a classe noviço tem que possuir alinhamento maligno ou neutro.",
        "regaliaObrigatoria": {
          "descricao": "Ao escolher esta especialização, o personagem recebe os seguintes atributos :",
          "pontos": {
            "atributos": {
              "quantidade": 2,
              "opcoes": ["Arcanismo", "Ritualismo"]
            },
            "combate": {
              "quantidade": 1,
              "opcoes": ["Ocultismo", "Natureza"]
            },
            "habilidades": {
              "quantidade": 2,
              "opcoes": ["Teologia", "Tecnologia", "História", "Lidar com animais"]
            },
            "proficiências": ["Proficiência em Transportes terrestres, aquáticas e exóticas.",]
          },
          "habilidade": [{
            "nome": "Mestre de invocações:",
            "tipo": "(Passiva)",
            "descricao": "Todas as invocações que fizer ganha 5 somado do ritualismo do invocador de vida temporária. Todas as criaturas invocadas por um invocador podem ser sacrificadas para causar dano em 3 metros de área.  Esse dano é igual a Ritualismo + Ocultismo + Arcanismo do invocador.",
          }]
        },
        "regalias": [
          {
            "nome": "Fúria Natural",
            "tipo": "Feitiço",
            "descricao": "Conjura um feitiço que afeta uma árvore de até 3 metros ou um arbusto pequeno. Essa planta escolhida cria vida própria e se torna servo do invocador por um número de turnos igual ao seu ocultismo. Durante esse tempo a planta tem 50 pontos de vida, valor de defesa igual a 9, uma velocidade de movimento de 4,5 metros, acerto de +10 e dano igual a 2d10 de dano do elemento terra. Custa 10 pontos de magia e para cada 7 pontos de magia a mais dura mais 5 rodadas.",
            "custoMagia": 10,
            "efeitos": {
              "ativo": "Planta se torna servo do invocador e executa ações no combate."
            },
            "modificadores": {
              "duracaoExtra": "Para cada 7 pontos de magia a mais, a duração aumenta em 5 rodadas."
            }
          },
          {
            "nome": "Companheiro Elemental",
            "tipo": "Ritual",
            "descricao": "O invocador faz um ritual para conjurar uma criatura pequena que não consegue voar. Escolha um elemento para seu companheiro ser imune. Essa criatura pequena pode ter qualquer aparência e formato corporal, com máximo de quatro membros e uma cauda. Custa 20 moedas de ouro em materiais para o ritual. O elemento escolhido para ser imune também influencia o que consegue fazer (além das ações padrão), veja a seguir as diferenças: Fogo: Arma de sopro igual a um cone de 3 metros, 60° de ângulo, que causa 3 pontos de dano. Usa uma ação da rodada do elementalista e pode ser usada a cada 30 segundos. Raio: cria uma manta de eletricidade, durante uma rodada, em volta de si e que causa 1d8 de dano para quem acertar ataques na criatura. Custa uma ação e pode ser usado uma vez a cada 30 segundos. Ar: Consegue prender a respiração por 10 horas seguidas e voar, com velocidade de voo igual a sua velocidade de movimento. Terra: Consegue sentir a posição de outras criaturas independente se consegue enxergá-las, desde que esteja em terreno de terra ou pedra e em até 12 metros. Ao sentir a posição do inimigo, a montaria compartilha a informação com o elementalista. Água: Consegue criar uma bolha de ar em sua cabeça e do elementalista para que respire debaixo d'água. Dura 1 hora e a criatura pode fazer isso 2 vezes ao dia.",
            "custoMagia": null,
            "custoEstamina": null,
            "efeitos": {
              "ativo": "Companheiro elemental ganha habilidades baseadas no elemento escolhido (Fogo, Raio, Ar, Terra, Água)."
            },
            "modificadores": {
              "usoExtra": "O elemental pode realizar uma das habilidades de elemento a cada 30 segundos, usando uma ação da rodada do invocador."
            }
          },
          {
            "nome": "Grande Mão",
            "tipo": "Feitiço",
            "descricao": "Uma mão enorme aparece ao lado do conjurador. Essa mão é de tamanho médio e pode levantar uma ou mais criaturas que somem até 500 quilos. Essa mão tem alcance de 30 metros e dura por 10 rodadas. Essa mão pode atacar ou empurrar, seu dano é de 1d10 pontos + Arcanismo. Custa 5 pontos de magia.",
            "custoMagia": 5,
            "efeitos": {
              "ativo": "A mão pode atacar ou empurrar com dano baseado em Arcanismo."
            },
            "modificadores": {
              "bonusSucesso": "Dano de 1d10 pontos + Arcanismo."
            }
          },
          {
            "nome": "Runa de Armazenamento",
            "tipo": "Feitiço",
            "descricao": "Criar uma runa gasta 1 minuto para realizar os desenhos e imbuir com magia. Cria uma runa capaz de guardar uma invocação ou criatura voluntária a ficar em uma dimensão de bolso por até 24 horas. O tempo de duração de uma invocação para de rodar enquanto dentro da runa e volta quando o invocador liberar a criatura. A cada 5 pontos de magia gastos para imbuir o poder desta runa a um objeto ganha mais um uso da Habilidade de armazenamento por ela.",
            "custoMagia": 0,
            "efeitos": {
              "passivo": "A duração da invocação para enquanto estiver dentro da runa e retoma quando liberada."
            },
            "modificadores": {
              "usoExtra": "A cada 5 pontos de magia gastos, um objeto ganha mais um uso da Habilidade de armazenamento."
            }
          },
          {
            "nome": "Rito Elemental",
            "tipo": "Passiva",
            "descricao": "Ao realizar qualquer ritual para invocar espíritos ou fantoches, o invocador pode escolher imbuí-los com um dos 5 elementos naturais para que seus ataques causem seu valor de ritualismo no elemento escolhido ao invés de seu ataque original. Caso a invocação não possua um ataque, ela passa a ter e usa o combate arcano do invocador.",
            "efeitos": {
              "passivo": "Invocações podem ser imbuídas com elementos naturais, alterando o tipo de dano causado. Se não tiverem ataques, passam a ter e usam o combate arcano do invocador."
            }
          },
          {
            "nome": "Montaria Elemental",
            "tipo": "Ritual",
            "descricao": "O invocador faz um ritual para conjurar uma criatura, que não consegue voar, grande ou muito grande que possa ser montada. Essa montaria é exótica e só pode ser montada pelo invocador. Escolha um elemento para sua montaria ser imune. Custa 20 moedas de ouro em materiais para o ritual. O elemento escolhido para ser imune também influência o que essa montaria consegue fazer, veja a seguir as diferenças: Fogo: Arma de sopro igual a um cone de 3 metros, 60° de ângulo, que causa 1d8 pontos de dano. Usa uma ação da rodada do elementalista e pode ser usada a cada 30 segundos. Raio: Consegue dar um avanço rápido de 10 metros em qualquer padrão de movimento. Custa uma ação e pode ser usado uma vez a cada 30 segundos. Ar: Consegue prender a respiração por 10 horas seguidas e voar, com velocidade de voo igual a sua velocidade de movimento. Terra: Consegue sentir a posição de outras criaturas independente se consegue enxergá-las, desde que esteja em terreno de terra ou pedra e em até 12 metros.Ao sentir a posição do inimigo a montaria compartilha a informação com o elementalista.   Água: Consegue criar uma bolha de ar em sua cabeça e do elementalista para  que respire debaixo d'água. Dura 1 hora e a criatura pode fazer isso 2 vezes ao dia.",
            "custoEstamina": null,
            "requisito": "20 moedas de ouro em materiais.",
            "efeitos": {
              "passivo": "A montaria recebe imunidade ao elemento escolhido e habilidades associadas a ele."
            },
            "modificadores": {
              "bonusSucesso": "Dependendo do elemento, a montaria recebe habilidades especiais, como sopro de fogo, avanço rápido, voo, detecção de inimigos no solo ou criação de bolha de ar."
            }
          },
          {
            "nome": "Roque",
            "tipo": "Ação",
            "descricao": "O invocador troca de lugar com uma de suas invocações através de um teletransporte, desde que a invocação esteja em até 50 metros. O invocador pode usar essa Habilidade um número de vezes igual ao seu valor de arcanismo por dia, recuperando os usos em um descanso longo.",
            "efeitos": {
              "ativo": "Permite troca de posição instantânea com uma invocação dentro do alcance de 50 metros."
            },
            "modificadores": {
              "usoExtra": "Pode ser usado um número de vezes igual ao valor de arcanismo por dia."
            }
          },
          {
            "nome": "Invocação Inanimada Arcana",
            "tipo": "Magia",
            "descricao": "O invocador pode invocar um objeto inanimado que caiba dentro de uma área com 3 m³. O invocador tem que ter visto o objeto em sua frente em algum momento. Se apenas tiver lido sobre, é necessário um rolamento em que existe 70% de chance de sucesso. Custa 5 pontos de magia.",
            "custoMagia": 5,
            "chanceDeSucesso": "70%, se apenas tiver lido sobre o objeto."
          },
          {
            "nome": "Espírito de Proteção",
            "tipo": "Ação",
            "descricao": "O invocador pode realizar um ritual com custo de 5 moedas de ouro, que dura 10 minutos, no qual ele desenha uma runa em seu corpo e a imbui com magia. Como uma ação em combate ele pode ativar a runa e aplicar o efeito em combinação com um encantamento arcano e girar um espírito protetor ao seu redor. O espírito ocupa tanto o espaço do invocador como também uma área de 1.5 metros em sua volta, o espírito acompanha o invocador em seu movimento e lhe dá os seguintes benefícios: O espírito pode usar a reação do invocador para fazer um ataque, como combate arcano do invocador, de oportunidade para inimigos que entram ou saem da área ocupada pelo espírito. Esse ataque causa 2d10 de dano arcano. O valor de defesa do invocador sobe em 2 pontos. O invocador ganha 10 pontos de vida temporária. O invocador pode realizar ataques em alvos que estejam a até 3 metros de distância de si. Esses ataques usam o combate arcano e causam 10 de dano arcano.",
            "custoEstamina": null,
            "requisito": "5 moedas de ouro e 10 minutos de ritual.",
            "dano": "2d10 de dano arcano",
            "efeitos": {
              "ativo": "O espírito protege o invocador, concede bônus de defesa e vida temporária e realiza ataques de oportunidade usando a reação do invocador."
            },
            "bonus": {
              "vidaTemporaria": "10 pontos de vida temporária"
            }
          },
          {
            "nome": "Invocar Duplicata",
            "tipo": "Ação",
            "descricao": "O invocador conjura uma cópia sua que consegue controlar da forma que quiser. Essa cópia é como um fantoche com 1 ponto de vida que pode ser possuído pelo invocador e controlado remotamente em uma distância de até 300 metros. O invocador pode conjurar magias e feitiços pela posição do fantoche. A magia dura 1 hora e custa 10 pontos de magia. Ao custo de mais 10 pontos pode fazer uma duplicata de outra criatura e controlá-la, essa duplicata também é um fantoche que possui 1 ponto de vida. Porém essa segunda forma de invocar a duplicata dura 1 minuto e copia as habilidades da criatura original. Apesar de ter as habilidades da criatura que foi copiada, só pode usar cada habilidade que tem custo 1 vez, e apenas se o custo for menor que 6 pontos de magia ou estâmina.",
            "custoMagia": 10,
            "efeitos": {
              "ativo": "Cria uma duplicata controlável do invocador ou de outra criatura por tempo limitado."
            },
            "modificadores": {
              "duracaoExtra": "Ao custo de mais 10 pontos de magia, permite invocar uma duplicata de outra criatura com suas habilidades, mas a duração é reduzida para 1 minuto."
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

export default InvocadorPage;