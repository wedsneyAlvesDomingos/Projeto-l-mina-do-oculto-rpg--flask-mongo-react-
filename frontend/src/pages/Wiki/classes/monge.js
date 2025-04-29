import monge from "../../../assets/images/monge.png";
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./classes.css";

const MongePage = () => {
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
        "titulo": "Monge",
        "img": monge,
        "descricao": "Desde os primeiros dias de sua jornada, o monge aprende que o corpo não é uma prisão, mas uma ponte para o mundo ao seu redor. Seus pés se firmam com a solidez da terra, mas seus passos fluem como a correnteza de um rio. Cada movimento é deliberado, cada respiração é um ciclo que alimenta não apenas seus músculos, mas seu próprio ser. O domínio dos chakras revela camadas mais profundas de seu potencial. O chakra da base confere uma resiliência inabalável, um alicerce que resiste tanto à toxina da carne quanto à corrupção da mente. Com o chakra abdominal aberto, o monge se torna indomável, desafiando o próprio conceito de equilíbrio e velocidade. Mais adiante, o plexo solar arde como uma fornalha interna, forjando sua determinação contra as sombras e chamas da maldade. No coração, reside a leveza — uma liberdade que ignora as amarras do terreno e dos grilhões. A garganta, por sua vez, dá voz à verdade imutável do universo, tornando o monge inabalável em espírito e palavra. Quando o terceiro olho desperta, o véu das ilusões se rasga diante dele, revelando a realidade como ela é. E no auge da jornada, a coroa se abre, unindo o corpo à alma e o espírito ao plano astral. O monge não busca poder, mas equilíbrio. Seu caminho é uma dança entre a força e a serenidade, entre o golpe e o silêncio. Ele não é herói ou vilão — é um fragmento da própria vontade do mundo, em constante movimento. ",
        "atributos": "Cada Regalia comprada na especialização Xamã fornece:\n- 4 Pontos de Vida\n- 4 Pontos de Estâmina\n- 2 Ponto em Magia",
        "regaliaObrigatoria": {
          "descricao": "Ao escolher esta especialização, o personagem recebe os seguintes atributos :",
          "pontos": {
            "atributos": {
              "quantidade": 2,
              "opcoes": ["Força", "Destreza"]
            },
            "combate": {
              "quantidade": 1,
              "opcoes": [" Combate Corpo a Corpo", "Fortitude"]
            },
            "habilidades": {
              "quantidade": 2,
              "opcoes": ["Atletismo", "Agilidade", "Acrobacia"]
            },
            "proficiências": ["Proficiência em Lança Mola, Manopla de Espinhos e Canalizar ki."]
          },
          "outrasProficiencias": null,
          "habilidade": [{
            "nome": "Canalizar ki ",
            "tipo": "(Ação livre)",
            "descricao": "Um monge pode gastar pontos de magia para canalizar ki. Ao canalizar ki, o monge que não estiver usando armadura pesada ganha um bônus de +2 em valor de defesa e independente da armadura ganha vantagem em testes de percepção. Esse bônus dura 1 minuto e pode ser renovado ao canalizar ki novamente. Custa 3 pontos de magia.",
          }]
        },
        "regalias": [
          {
            "nome": "Chakra da Base",
            "tipo": "Passiva",
            "descricao": "Ao canalizar o ki com o chakra da base aberto, o monge fica resistente à condição envenenado, resistente ao dano elemental de terra, e efeitos que possam desestabilizar seu controle sobre a própria mente têm a chance de sucesso reduzida em 5%.",
            "efeitos": {
              "passivo": "Resistência à condição envenenado e dano elemental de terra, redução de chance de sucesso de efeitos mentais."
            }
          },
          {
            "nome": "Chakra Abdominal",
            "tipo": "Passiva",
            "descricao": "Ao canalizar o ki com o chakra do abdômen aberto, o monge fica impossibilitado de ser derrubado contra sua vontade, resistente ao dano elemental de gelo e ganha 3 m de velocidade de movimento bônus.",
            "efeitos": {
              "passivo": "Impossível de ser derrubado, resistência ao dano elemental de gelo, bônus de velocidade."
            }
          },
          {
            "nome": "Chakra do Plexo Solar",
            "tipo": "Passiva",
            "descricao": "Ao canalizar o ki com o chakra do plexo solar aberto, o monge fica resistente ao dano sombrio, resistente ao dano elemental de fogo, e efeitos que possam desestabilizar seu controle sobre a própria mente têm a chance de sucesso reduzida em 5%.",
            "efeitos": {
              "passivo": "Resistência ao dano sombrio, dano elemental de fogo e redução de chance de sucesso de efeitos mentais."
            }
          },
          {
            "nome": "Chakra do Coração",
            "tipo": "Passiva",
            "descricao": "Ao canalizar o ki com o chakra do coração aberto, o monge ganha vantagem em testes de acrobacia para evitar ou para escapar de agarramentos, fica resistente ao dano elemental de ar, e terreno difícil não afeta a velocidade de movimento do monge.",
            "efeitos": {
              "passivo": "Vantagem em testes de acrobacia, resistência ao dano elemental de ar, terreno difícil não afeta a velocidade."
            }
          },
          {
            "nome": "Chakra da Garganta",
            "tipo": "Passiva",
            "descricao": "Ao canalizar o ki com o chakra da garganta aberto, o monge tem vantagem dupla em testes da árvore Social, vantagem em testes de intuição, fica imune à condição surdo e é impossível fazer um monge ficar em silêncio contra sua vontade.",
            "efeitos": {
              "passivo": "Vantagem em testes sociais e intuição, imune à condição surdo e silêncio."
            }
          },
          {
            "nome": "Chakra do Terceiro Olho",
            "tipo": "Passiva",
            "descricao": "Ao canalizar o ki com o chakra do terceiro olho aberto, o monge consegue ver através de ilusões em até 12 metros de distância, consegue ler lábios em até 100 metros de distância e é imune a ficar cego.",
            "efeitos": {
              "passivo": "Visão através de ilusões, leitura de lábios, imunidade a cegueira."
            }
          },
          {
            "nome": "Chakra da Coroa",
            "tipo": "Passiva",
            "descricao": "Ao canalizar o ki com o chakra da coroa, o monge recebe vantagem dupla em testes da árvore de conhecimento, fica imune à condição amedrontado e consegue criar uma projeção astral para andar pelo plano astral a até 100 metros de distância.",
            "requisito": "Todos os outros chakras abertos.",
            "efeitos": {
              "passivo": "Vantagem em testes de conhecimento, imune à condição amedrontado, projeção astral."
            }
          },
          {
            "nome": "Ataque Veloz",
            "tipo": "Ativa",
            "descricao": "O monge pode realizar um ataque adicional quando tomar uma ação de atacar. Apenas uma vez por ação.",
            "custoEstamina": 2,
            "efeitos": {
              "ativo": "Realiza um ataque extra na mesma ação de ataque."
            }
          },
          {
            "nome": "Fúria de Ataques",
            "tipo": "Ativa",
            "descricao": "Ao usar a ação para atacar, o monge pode gastar 2 pontos de estâmina para atacar novamente. Pode ser usado em conjunto com o Ataque Veloz.",
            "custoEstamina": 2,
            "efeitos": {
              "ativo": "Realiza um ataque extra ao usar a ação de atacar."
            },
            "usoExtra": "Pode ser usado em conjunto com Ataque Veloz."
          },
          {
            "nome": "Corpo Fechado",
            "tipo": "Passiva",
            "descricao": "O monge pode entrar em uma posição defensiva e meditativa que fecha seu corpo e mente contra o ambiente e outras criaturas. Fica imune a todas as condições e resistente a todo tipo de dano por uma rodada. Recupera 2 pontos de estâmina, 1 ponto de magia e 3d8 pontos de vida ao sair.",
            "custoEstamina": 2,
            "custoMagia": 1,
            "efeitos": {
              "passivo": "Imunidade a todas as condições e resistência a dano por uma rodada. Recupera pontos ao sair da posição."
            }
          },
          {
            "nome": "Fortalecer Físico",
            "tipo": "Passiva",
            "descricao": "Ao canalizar ki, o monge ganha um bônus de +2 em força, destreza, combate corpo a corpo, agilidade e acrobacia. Esse bônus pode ultrapassar o limite de 15 pontos máximos em uma habilidade.",
            "efeitos": {
              "passivo": "Bônus de +2 em força, destreza, combate corpo a corpo, agilidade e acrobacia."
            }
          },
          {
            "nome": "Fluir como Água, Golpear como Pedra",
            "tipo": "Passiva",
            "descricao": "O monge ganha um bônus de +4 em acertos de ataques desarmados e +1 de defesa enquanto não usar armadura pesada.",
            "efeitos": {
              "passivo": "Bônus de +4 em ataques desarmados e +1 de defesa sem armadura pesada."
            }
          },
          {
            "nome": "Ataque de Oportunidade",
            "tipo": "Reação",
            "descricao": "O monge pode realizar um ataque quando uma criatura que possa ver sair da sua área de ameaça, ou atacar um aliado dentro do seu alcance.",
            "custoEstamina": 2,
            "efeitos": {
              "ativo": "Realiza um ataque quando uma criatura sai da área de ameaça ou ataca um aliado."
            }
          },
          {
            "nome": "Desviar projéteis",
            "tipo": "Reação",
            "descricao": "O monge pode usar sua reação, ao ser acertado por um projétil físico, para tentar desviar a trajetória do objeto e evitar o dano do ataque. Para isso o monge deve passar em um teste de acrobacia, a dificuldade do teste é o valor rolado para o acerto do ataque. Caso tenha sucesso, o monge não sofre o dano do ataque, e caso o rolamento do teste seja um 19 ou 20 no d20, o monge arremessa o projétil em outra criatura em até 9 metros de distância a sua escolha. Caso fracasse no teste, recebe o ataque normalmente.",
            "custoEstamina": 5,
            "efeitos": {
              "ativo": "Desviar a trajetória do projétil e, em caso de sucesso no teste, evitar o dano do ataque. Caso acerte 19 ou 20 no teste, o monge arremessa o projétil em outra criatura."
            },
            "modificadores": {
              "bonusSucesso": "Desviar a trajetória e arremessar o projétil se rolado 19 ou 20 no d20."
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

export default MongePage;