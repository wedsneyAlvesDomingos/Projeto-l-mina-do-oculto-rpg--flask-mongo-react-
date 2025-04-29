import cavaleiro_arcano from "../../../assets/images/cavaleiro_arcano.png";
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./classes.css";

const CombatenteArcanoPage = () => {
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
        "titulo": "Combatente Arcano",
        "img": cavaleiro_arcano,
        "descricao": "Na quietude das antigas terras, onde a magia se entrelaça com o aço e os ventos sussurram segredos, o Combatente Arcano caminha com um propósito único, um guerreiro moldado não apenas pelo treinamento de combate, mas pela profunda compreensão das artes arcanas. Seu corpo e alma são templos de disciplina, onde o esforço físico se funde com o poder da magia, criando uma harmonia mortal. O Combatente Arcano não é um mero conjurador, nem um simples espadachim. Ele é o elo entre duas forças primordiais, um mestre em usar o poder arcano com a destreza de um combatente treinado. Seu corpo carrega o peso das armaduras mais pesadas, mas também é envolvido pela leveza da magia, permitindo-lhe conjurar escudos e armamentos de energia pura. Seus passos são guiados pela sabedoria arcana, e suas armas, muitas vezes, se tornam extensões de sua própria vontade, moldadas em pureza sagrada. Em batalha, o Combatente Arcano não depende apenas de sua espada ou de seu bastão, mas da estreita ligação entre sua alma e as forças místicas que governam o mundo. Ele pode evocar um escudo invisível que o protege das mais mortais investidas ou lançar uma lâmina de energia pura com a mesma facilidade com que invoca feitiçarias arcanas. Sua habilidade de conjurar magias não é limitada pela tradição ou pelo ritual; ele consegue, no calor do combate, moldar feitiços de abjuração, evocação e invocação com a mesma naturalidade com que desferiria um golpe mortal. No entanto, seu verdadeiro poder reside na simbiose com as armas que invoca. Cada lâmina conjurada, cada encantamento lançado, é parte de uma dança letal onde a magia e o aço se entrelaçam. E mesmo quando a batalha parece perdida, o Combatente Arcano tem a capacidade de se reposicionar, utilizando seu conhecimento arcano para saltar por distâncias inimagináveis e lançar o golpe final, onde a força do combate físico se junta ao poder devastador da magia. Ele é uma força não só de combate, mas de transformação, capaz de moldar a própria realidade ao seu redor, tornando-se um verdadeiro titã entre os mortais.",
        "atributos": "Cada Regalia comprada na especialização Combatente Arcano(a) fornece:\n- 5 Pontos de Vida\n- 2 Pontos de Estâmina\n- 3 Ponto em Magia",
        "regaliaObrigatoria": {
          "descricao": "Ao escolher esta especialização, o personagem recebe os seguintes atributos :",
          "pontos": {
            "atributos": {
              "quantidade": 2,
              "opcoes": ["Arcanismo", "Atletismo"]
            },
            "combate": {
              "quantidade": 1,
              "opcoes": ["Combate corpo a corpo", "Combate a distância", "Combate arcano"]
            },
            "habilidades": {
              "quantidade": 2,
              "opcoes": ["Arcanatec", "Alquimia", "Acrobacia"]
            },
            "proficiências": ["Proficiência em Vara Relâmpago, armadura pesada, todos os escudos e espada de lâminas duplas.", "Aptidão para o combate arcano: O Combatente Arcano tem uma maior aptidão para usar algumas escolas de magia durante o combate. Ao usar as magias das escolas de abjuração, evocação e invocação o Combatente Arcano gasta 1 ponto de magia a menos para conjurá-las, magias custam no minimo 1 ponto de magia e não podem custar 0 pontos de magia através desta Habilidade."]
          },
          "habilidade": [{
            "nome": "Ligação arcana",
            "tipo": "Magia (Ritual / Ação livre / Ação)",
            "descricao": "O Combatente Arcano escolhe até três armas ou objetos que ele queira sintonizar sua ligação arcana. Ao sintonizar sua ligação arcana através de um ritual de 1 h para cada objeto, o Combatente Arcano pode guardar ou pegar esse objeto de uma dimensão de bolso em qualquer momento que quiser. Durante um turno de combate o cavaleiro pode pegar 1 objeto como ação livre mas a  partir do segundo é consumida uma ação por interação com objeto através desta Habilidade. Não existe limite diário para essa Habilidade e ela não gera custos em ponto de magia ou estâmina.",
          }]
        },
        "regalias": [
          {
            "nome": "Ataque Conjurativo",
            "tipo": "Ação",
            "descricao": "Ao atacar um alvo em até 1,5 metros de si com um ataque físico, o Combatente Arcano pode optar por conjurar uma magia que tem o tempo de conjuração de até duas ações. Durante essa ação, o Combatente Arcano pode apenas conjurar magias arcanas e realizar apenas um ataque. O alvo da magia deve ser o próprio cavaleiro ou seu alvo. Se a magia for de área, ela é centralizada no alvo do ataque. Além de gastar os pontos de magia referentes à magia conjurada, o Combatente Arcano gasta 5 pontos de estâmina.",
            "custoEstamina": 5,
            "custoMagia": null
          },
          {
            "nome": "Contingência",
            "tipo": "Ação",
            "descricao": "O cavaleiro conjura uma magia da árvore de ilusão ou abjuração e estabelece um gatilho para sua conjuração. O Combatente Arcano então gasta os pontos de magia e conjura a magia que vai ser colocada em contingência. Se o gatilho ocorrer em até um número de dias igual ao valor do arcanismo do Combatente Arcano, a magia é conjurada de acordo com o desejo do conjurador. Para guardar a magia em contingência é necessário gastar 2 pontos de magia e 2 pontos de estâmina.",
            "custoEstamina": 2,
            "custoMagia": 2
          },
          {
            "nome": "Arma Arcana Melhorada",
            "tipo": "Passiva",
            "descricao": "Ao invocar uma arma através da magia arma arcano o Combatente Arcano pode escolher qual estilo de combate vai usar entre os combates físicos e arcanos, desde que seja compatível com a arma. Ao usar a magia arma arcana, o Combatente Arcano gasta 5 pontos de magia ao invés de 10 e gasta apenas mais 2 pontos de magia adicionais para invocar a segunda arma.",
            "custoEstamina": null,
            "custoMagia": null,
            "efeitos": {
              "passivo": "Reduz o custo de magia para invocar uma arma arcana."
            }
          },
          {
            "nome": "Armadura Arcana Melhorada",
            "tipo": "Ativo",
            "descricao": "Ao conjurar armadura arcana, o Combatente Arcano pode escolher usar com o mesmo número de ações da magia a habilidade recuperar fôlego. O Combatente Arcano pode fazer isso um número de vezes igual ao seu valor de fortitude em um mesmo dia.",
            "custoEstamina": null,
            "custoMagia": null
          },
          {
            "nome": "Ataque Fortalecido",
            "tipo": "Passiva",
            "descricao": "Ao sacar uma arma através de ligação arcana em um turno, o primeiro ataque feito com essa arma tem o dano dobrado. Esse efeito só acontece uma vez por ação atacar. Custa 1 ponto de magia.",
            "custoEstamina": null,
            "custoMagia": 1,
            "modificadores": {
              "usoExtra": "Gasta 5 pontos de estâmina para retirar a penalidade de -5 no acerto gerada por esse ataque para a próxima ação."
            }
          },
          {
            "nome": "Câmbio Arcano",
            "tipo": "Passiva",
            "descricao": "O Combatente Arcano pode pegar ou entregar um objeto para outra criatura voluntária através de sua ligação arcana. Essa interação é uma ação livre para ambos e tem um alcance igual a 5 x o arcanismo do Combatente Arcano em metros. Após entregar ou pegar um item com essa criatura, tanto o cavaleiro quanto a criatura se ligam através da magia. O Combatente Arcano pode escolher gastar 5 pontos de magia e gastar uma ação para trocar de lugar com a criatura.",
            "custoEstamina": null,
            "custoMagia": 5
          },
          {
            "nome": "Carapaça Arcana",
            "tipo": "Reação",
            "descricao": "O Combatente Arcano ao receber um ataque pode usar sua reação para levantar um escudo, caso esteja equipando um. Ao levantar escudo desta maneira, além de ganhar os benefícios de levantar escudo, ainda gera uma barreira protetiva envolta de si que lhe dá 20 pontos de vida temporário até o fim de seu próximo turno.",
            "custoEstamina": null,
            "custoMagia": null,
            "bonus": {
              "vidaTemporaria": 20
            }
          },
          {
            "nome": "Combate Anti-Conjuração",
            "tipo": "Passiva",
            "descricao": "Se uma criatura conjurar qualquer magia, feitiço, milagre ou maldição dentro do alcance de ameaça do Combatente Arcano, ele pode realizar um ataque de oportunidade através de sua reação contra o conjurador. Se acertar o ataque, o Combatente Arcano interrompe a conjuração. Custa 10 pontos de estâmina e 2 pontos de magia.",
            "custoEstamina": 10,
            "custoMagia": 2
          },
          {
            "nome": "Ataque Veloz Com Armas Arcanas",
            "tipo": "Ação",
            "descricao": "O Combatente Arcano pode realizar um ataque a mais quando tomar uma ação de atacar. Esse ataque deve ser feito apenas com armas que estejam em uma ligação arcana ou que sejam invocadas através da magia arma arcana. Apenas uma vez por ação. Custa 1 ponto de estâmina.",
            "custoEstamina": 1,
            "custoMagia": null
          },
          {
            "nome": "Flash",
            "tipo": "Ação",
            "descricao": "O Combatente Arcano se teleporta para um ponto até 2x o seu valor de arcanismo em metros de distância que possa ver. Se o Combatente Arcano se teleportar para um espaço que ele consiga realizar um ataque físico contra um oponente, então pode escolher atacar sem consumir uma nova ação. Se este golpe acertar, o alvo sofre um número de pontos de dano arcano igual ao dano do ataque normal da arma + 2x o seu valor de arcanismo.",
            "custoEstamina": 2,
            "custoMagia": 2,
            "modificadores": {
              "usoExtra": "Se o Combatente Arcano usar uma nova ação para conjurar Flash novamente no mesmo turno, a magia custa o 3x o valor de pontos de magia e estâmina, porém o ataque recebe um bônus de +10 de acerto."
            }
          },
          {
            "nome": "Golpe Final",
            "tipo": "Ação",
            "descricao": "O Combatente Arcano pode movimentar até 2x sua velocidade de movimento e realiza um ataque contra um alvo a sua escolha em alcance. Esse ataque recebe um bônus de acerto igual ao seu valor de arcanismo. Se o ataque acertar ele causa o dano normal do ataque e mais 1d12 de dano arcano para cada ponto de magia que for gasto nesta magia, com um máximo de 10.",
            "custoEstamina": 5,
            "custoMagia": null,
            "dano": "Dano normal do ataque + 1d12 por ponto de magia (máximo de 10)",
            "efeitos": {
              "ativo": "Movimenta até 2x sua velocidade e realiza um ataque com bônus de acerto igual ao valor de arcanismo."
            },
            "modificadores": {
              "bonusSucesso": "Bônus de acerto igual ao valor de arcanismo."
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

export default CombatenteArcanoPage;