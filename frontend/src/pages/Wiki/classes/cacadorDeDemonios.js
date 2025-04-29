import cacador_de_demonios from "../../../assets/images/cacador_de_demonios.png";
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./classes.css";

const CacadorDeDemonionsPage = () => {
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
        "titulo": "Caçador de dêmonios",
        "img": cacador_de_demonios,
        "descricao": "Entre as sombras das florestas primevas e os vales intocados pelo tempo, caminham os metamorfos, figuras de essência mutável cuja ligação com o mundo natural transcende as formas fixas dos homens. Eles não são meros conhecedores das criaturas da terra, da água e do céu, mas partilham de sua linguagem, entendendo os sussurros do vento entre as copas das árvores e a cadência oculta dos passos de um lobo em perseguição. O corpo do metamorfo não conhece rigidez, moldando-se conforme a necessidade, tomando feições que lhe conferem força, destreza ou resistência, espelhando as qualidades das bestas que observa. Nos antigos mitos de aldeias distantes, são descritos como aqueles que percorrem o mundo sem que se saiba se são homem ou fera, seus olhos refletindo um entendimento que vai além das palavras e suas ações ditadas por instintos tão refinados quanto os da criatura mais astuta da mata. Se há um propósito em sua existência, ele se manifesta na fusão entre o humano e o selvagem, um equilíbrio onde a identidade não é uma âncora, mas um rio que flui, sem nunca se deter por completo.",
        "atributos": "Cada Regalia comprada na especialização Caçador de demônios(a) fornece:\n- 3 Pontos de Vida\n- 3 Pontos de Estâmina\n- 4 Ponto em Magia",
        "regaliaObrigatoria": {
          "descricao": "Ao escolher esta especialização, o personagem recebe os seguintes atributos :",
          "pontos": {
            "atributos": {
              "quantidade": 2,
              "opcoes": ["Combate arcano", "Fortitude"]
            },
            "combate": {
              "quantidade": 1,
              "opcoes": ["Combate corpo a corpo ", "Combate a distância"]
            },
            "habilidades": {
              "quantidade": 2,
              "opcoes": ["Teologia", "Ocultismo", "Ritualismo", "Medicina"]
            },
            "proficiências": ["Proficiência em Katanas, Espada Diapasão, Presa Da Serpente, Montante Cinético, armaduras leves, médias, pesadas e escudos.", "Proficiente em Conduções exóticas, kit de arrombamento e capacidade de criar as seguintes poções (desde que possua as ferramentas e os materiais necessários):",
              "Poção de Saciedade",
              "Poção de Silêncio",
              "Poção de Armadura"
              , "Poção de Transformação animal"]
          },
          "habilidade": [{
            "nome": " Rastreador profano",
            "tipo": "Passiva / Ativa / Feitço (Ação)",
            "descricao": "Passiva: O caçador de demônios é um exímio rastreador de corruptores (diabos, demônios e mortos vivos), fadas e celestiais. O caçador de demônios recebe vantagem em todos os rolamentos de investigação, rastreamento e percepção que seja relacionado às criaturas citadas anteriormente. Ativa: O caçador de demônios pode gastar 10 pontos de magia e ganhar vantagem dupla para os rolamentos citados acima  ou a uma única criatura, independente de seu tipo, que escolher durante um período de 12 horas. Voto de Caçada - Ativa (Feitiço)(Ação): O caçador de demônios pode marcar uma criatura com um Voto de Caçada. Ao realizar este voto a criatura se torna vulnerável a todos os ataques do caçador de demônios por 1 rodada, porém toda vez que o caçador atacar a criatura marcada sofrerá 1d8 pontos de dano. Custa 5 pontos de magia.",
          }]
        },
        "regalias": [
          {
            "nome": "Sobreviver a Caçada",
            "tipo": "Ação",
            "descricao": "Ao realizar um Voto de Caçada e marcar uma criatura, o caçador de demônios normalmente sofre 5 pontos de dano ao atacar o alvo. Com esta regalia, o caçador pode usar uma ação após a marca para reduzir esse dano sofrido de 1d8 para 1d4."
          },
          {
            "nome": "Corrida contra o Fim",
            "tipo": "Passiva",
            "descricao": "O Caçador de Demônios pode realizar um ataque a mais quando tomar uma ação de atacar contra uma criatura marcada pelo voto da caçada. Apenas uma vez por ação.",
            "custoEstamina": 2,
            "efeitos": {
              "passivo": "Ganha um ataque extra contra alvos marcados."
            }
          },
          {
            "nome": "Ataque Vampírico",
            "tipo": "Passiva",
            "descricao": "Uma vez em seu turno ao atacar uma criatura, o caçador de demônios pode gastar 1 ponto de magia para recuperar 1d6 pontos de vida.",
            "custoMagia": 1,
            "bonus": {
              "vidaTemporaria": "Recupera 1d6 pontos de vida."
            }
          },
          {
            "nome": "Lado Sombrio",
            "tipo": "Ritual",
            "descricao": "Após uma meditação de 1 minuto, o caçador pode tocar o lado sombrio que lida ao caçar diabos, demônios e mortos-vivos. Seus ataques e armadura ganham a propriedade sombria, e seus ataques são considerados neutros contra corruptores.",
            "custoMagia": 4,
            "modificadores": {
              "duracaoExtra": "Dura 8 horas."
            }
          },
          {
            "nome": "Ataque de Oportunidade",
            "tipo": "Reação",
            "descricao": "O Caçador de Demônios pode realizar um ataque quando uma criatura que possa ver sai da sua área de ameaça ou ataca um aliado dentro do seu alcance.",
            "custoEstamina": 2
          },
          {
            "nome": "Recuperar Fôlego Maior",
            "tipo": "Ação de turno completo",
            "descricao": "O Caçador de Demônios gasta todas as ações de seu turno para recuperar 8 pontos de vida e 6 pontos de estâmina.",
            "custoMagia": 4,
            "bonus": {
              "vidaTemporaria": "Recupera 8 pontos de vida e 6 pontos de estâmina."
            }
          },
          {
            "nome": "Treinamento com Arma Secundária",
            "tipo": "Passiva",
            "descricao": "Não custa estâmina para usar duas armas, e a segunda arma não precisa ser leve, desde que possa ser empunhada com uma mão.",
            "requisito": "Combate com duas armas",
            "efeitos": {
              "passivo": "Uso de segunda arma sem custo de estâmina."
            }
          },
          {
            "nome": "Aparar",
            "tipo": "Reação",
            "descricao": "AAo receber um ataque, mas antes de o rolamento de ataque ser resolvido se acerta ou não, pode usar sua reação para aumentar o seu Valor de Defesa em 2 pontos durante este específico ataque. Custa 2 pontos de estâmina .O personagem pode repetir essa reação mais de uma vez na mesma rodada ao custo de mais 2 pontos de estâmina .",
            "custoEstamina": 2,
            "modificadores": {
              "usoExtra": "Pode ser repetida na mesma rodada ao custo de mais 2 pontos de estâmina por uso."
            }
          },
          {
            "nome": "Festim Macabro",
            "tipo": "Feitiço",
            "descricao": "Uma revoada de espíritos surgem em uma área de 6 metros ao redor do Caçador de demônios  e o circundam durante 3 rodadas. Os inimigos dentro da área recebem 7 pontos de dano quando entram na área pela primeira vez e quando começa o turno dentro dela. Os inimigos que entrarem na área pela primeira vez tem 50% de chance de entrar na condição Aterrorizado pelos agouros dos espíritos. Custa 10 pontos de magia. A cada 5 pontos de magia aumenta o dano por rodada em 2 pontos.",
            "custoMagia": 10,
            "dano": "7 pontos de dano por rodada",
            "modificadores": {
              "duracaoExtra": "A cada 5 pontos de magia adicionais, aumenta o dano em 2 pontos por rodada."
            }
          },
          {
            "nome": "Bater com Escudo",
            "tipo": "Passiva",
            "descricao": "O Caçador de Demônios que estiver equipado com um escudo pode usá-lo como arma secundária, causando 3 pontos de dano sagrado.",
            "requisito": "Lado Sombrio, Combate defensivo",
            "efeitos": {
              "passivo": "Escudo vira arma secundária, causando 3 pontos de dano sagrado."
            }
          },
          {
            "nome": "Lado Sombrio Irrestrito",
            "tipo": "Ação",
            "descricao": "Enquanto Lado Sombrio estiver ativado, o Caçador de Demônios consegue quebrar o controle da escuridão dentro de si. Ao ativar esta habilidade o Caçador de Demônios causa 2d10 de dano sombrio em todos a sua volta, em 1,5 metros de raio e seus ataques recebem 1d6 pontos de dano sombrio de bônus. Além disso, recebe 1 ponto de valor de defesa e fica resistente ao dano de armas não elementais e que não sejam mágicas. Porém fica vulnerável a ataques sagrados. A habilidade dura 1 minuto e custa 8 pontos de magia.",
            "custoMagia": 8,
            "dano": "2d10 de dano sombrio em área, 1d6 de dano sombrio bônus nos ataques",
            "modificadores": {
              "duracaoExtra": "Dura 1 minuto."
            }
          },
          {
            "nome": "Corte das Sombras",
            "tipo": "Feitiço",
            "descricao": "O Caçador de demônios cria um corte negro no ar que voa em direção a um alvo que esteja a até 12 metros de distância. Um rolamento de combate arcano determina se a habilidade acerta seu alvo, se acertar causa 5d10 pontos de dano sombrio. Todas as criaturas que estiverem na linha direta entre o Caçador de demônios e seu alvo sofrem metade deste dano caso o rolamento também superar o seus valores de defesa. A habilidade custa 8 pontos de magia.",
            "custoMagia": 8,
            "dano": "5d10 de dano sombrio"
          },
          {
            "nome": "Ataque Conjurativo",
            "tipo": "Ação",
            "descricao": "Ao atacar um alvo em até 1,5 metros de si com um ataque físico, o Caçador de Demônios pode optar por conjurar um feitiço que tem o tempo de conjuração de até duas ações. Se a magia for de área de efeito, ela é centralizada no alvo do ataque, acertando todos em alcance, inclusive ele mesmo. Além de gastar os pontos de magia referentes ao feitiço conjurado, o caçador de demônios gasta 5 pontos de estâmina .",
            "custoEstamina": 5
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

export default CacadorDeDemonionsPage;