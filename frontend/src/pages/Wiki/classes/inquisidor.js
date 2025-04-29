import inquisidor from "../../../assets/images/inquisidor.png";
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./classes.css";

const InquisidorPage = () => {
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
    const especializacao =    {
        "titulo": "Inquisidor",
        "img": inquisidor,
        "descricao": "O Inquisidor é uma figura imponente, cujas mãos são guiadas por uma fé inabalável e uma missão clara: purificar o mundo das trevas que o assolam. Vestido pela luz de um poder divino, ele não apenas carrega a espada, mas também um ardor espiritual que reverbera em sua essência. Com olhos afiados e alma diligente, ele caça aqueles que se escondem na escuridão, punindo com mão firme, não pela força do homem, mas pela força que emana do alto. Em sua busca, o Inquisidor invoca milagres com uma precisão quase ritualística. Quando a batalha se adensa, ele não hesita em chamar a Armadura de Fé, revestindo-se com uma defesa incomparável, que reflete o ardente fervor de sua crença. A armadura, feita não de aço, mas de energia sagrada, o torna uma muralha impenetrável, enquanto o escudo que a acompanha impede qualquer ofensiva contra sua missão. Cada golpe que ele desferir será abençoado, não com o sangue comum, mas com o fogo celestial que arde na ponta de sua lâmina. Seu armamento, imbuído de pureza, se torna uma extensão de sua vontade divina, trazendo a justiça não apenas de forma física, mas transcendental, como uma manifestação do próprio poder celeste. No entanto, a força do Inquisidor não se limita à sua imbatível resistência ou ao dano que ele inflige. Ele também é um farol para seus aliados, compartilhando seu peso nas batalhas e dividindo os ataques que o cercam com uma empatia de combate que transcende a mera parceria. Naqueles momentos mais sombrios, ele pode invocar uma montaria celestial, uma besta imponente que não só o transporta, mas também o revigora para enfrentar os desafios com a força de sua fé, guiando-o em sua cruzada implacável. Cada passo que dá é um passo em direção à luz, a um mundo purificado, onde o mal será erradicado.",
        "atributos": "Cada Regalia comprada na especialização Inquisidor(a) fornece:\n- 5 Pontos de Vida\n- 3 Pontos de Estâmina\n- 2 Ponto em Magia",
        "regaliaObrigatoria": {
          "descricao": "Ao escolher esta especialização, o personagem recebe os seguintes atributos :",
          "pontos": {
            "atributos": {
              "quantidade": 2,
              "opcoes": [" Combate Arcano", "Arcanismo"]
            },
            "combate": {
              "quantidade": 1,
              "opcoes": ["Combate Arcano", "Combate corpo a corpo"]
            },
            "habilidades": {
              "quantidade": 2,
              "opcoes": ["Ritualismo", "Teologia", "Condução de veículos terrestres."]
            },
            "proficiências": ["Nenhuma nova proficiência."]
          },
          "habilidade": [{
            "nome": "Punição e Purificação",
            "tipo": "Milagre(Passiva / Ação livre)",
            "descricao": "Passiva - Todo ataque físico causado pelo inquisidor ganha um bônus de 1d4 de dano sagrado. Ativa - Ao acertar um ataque físico o inquisidor pode escolher fortalecer sua capacidade de punir aqueles que não acreditam em suas ideias e purificar suas almas, causando 2d10 de dano sagrado extra no ataque, ao invés de 1d4. Custa 5 pontos de magia .",
          }]
        },
        "regalias": [
          {
            "nome": "Armadura de fé",
            "tipo": "Ação",
            "descricao": "O inquisidor ora para o seu deus e conjura uma armadura completa feita de energia sagrada. Além da armadura vem um escudo pesado, também feito de energia sagrada. A armadura é considerada média pelo seu peso mas protege como uma armadura pesada. Ao usar essa armadura de fé, o inquisidor tem o valor de defesa igual a 20 e com o escudo 23. A armadura dura 8 horas ou até o inquisidor não tiver vontade ou capacidade de manter o milagre ativo.",
            "custoMagia": 15,
            "efeitos": {
              "passivo": null,
              "ativo": "Aumento de defesa (20 com armadura e 23 com escudo)"
            }
          },
          {
            "nome": "Armamento Divino",
            "tipo": "Ação",
            "descricao": "O inquisidor conjura uma arma simples ou marcial feita de energia sagrada e causa dano sagrado. A cópia sagrada causa um valor de dano igual ao da arma original + 1d6 pontos de dano extra.",
            "custoMagia": 5,
            "duracaoExtra": "Dura 1 hora",
            "efeitos": {
              "passivo": null,
              "ativo": "Criação de arma sagrada com dano adicional de 1d6"
            }
          },
          {
            "nome": "Ascensão Celeste",
            "tipo": "Ação",
            "descricao": "O Inquisidor ora pela benção divina que lhe permite voar, recebendo um par de asas que lhe dão uma velocidade de voo igual a sua velocidade de movimento.",
            "custoMagia": 8,
            "efeitos": {
              "passivo": null,
              "ativo": "Voo com velocidade igual à de movimento"
            },
            "duracaoExtra": "Dura 10 rodadas"
          },
          {
            "nome": "Montaria Celeste",
            "tipo": "Ação",
            "descricao": "O inquisidor conjura uma montaria divina com 9 metros de velocidade de movimento. A montaria dura 8 horas e não cansa nem sofre dano.",
            "custoMagia": 7,
            "efeitos": {
              "passivo": null,
              "ativo": "Montaria com 9 metros de movimento, permite ao inquisidor carregar o dobro de peso e receber vantagem no acerto"
            },
            "duracaoExtra": "Dura 8 horas"
          },
          {
            "nome": "Aparar",
            "tipo": "Reação",
            "descricao": "Ao receber um ataque, o inquisidor pode usar sua reação para aumentar o seu valor de defesa em 2 pontos.",
            "custoEstamina": 2,
            "efeitos": {
              "passivo": null,
              "ativo": "Aumento de defesa em 2 pontos"
            },
            "usoExtra": "Pode ser repetido mais de uma vez na mesma rodada ao custo de mais 2 pontos de estâmina"
          },
          {
            "nome": "Cruzada Implacável",
            "tipo": "Ação",
            "descricao": "O inquisidor avança por 12 metros, causando 2d6 pontos de dano sagrado em inimigos no caminho e tendo 30% de chance de empurrá-los para um espaço disponível.",
            "custoEstamina": 4,
            "efeitos": {
              "passivo": null,
              "ativo": "Avança causando dano e empurrando inimigos"
            },
            "chanceDeSucesso": 30,
            "dano": "2d6"
          },
          {
            "nome": "Bater com Escudo",
            "tipo": "Ação",
            "descricao": "O inquisidor pode usar um escudo como arma secundária. Causa 1d8 pontos de dano sagrado.",
            "requisito": "Armadura de fé, Combate defensivo",
            "efeitos": {
              "passivo": null,
              "ativo": "Ataque com escudo causando 1d8 de dano"
            },
            "dano": "1d8"
          },
          {
            "nome": "Marca da Punição",
            "tipo": "Passiva",
            "descricao": "Ao conjurar a marca divina, o inquisidor causa dano inicial e pode causar novamente o dano toda rodada sempre que acertar um ataque físico. O milagre também causa o dobro de dano em mortos-vivos e demônios.",
            "efeitos": {
              "passivo": "Dano adicional sempre que um ataque físico acerta, dano dobrado em mortos-vivos e demônios",
              "ativo": null
            },
            "modificadores": {
              "bonusSucesso": "Bônus de 1d6 de dano ao usar Armamento Divino"
            }
          },
          {
            "nome": "Empatia de combate",
            "tipo": "Ação",
            "descricao": "Cria uma ligação com o aliado em combate, dividindo o dano dos ataques recebidos por ele. O inquisidor define quantos pontos de dano tomar, com um mínimo de 1.",
            "custoMagia": 2,
            "efeitos": {
              "passivo": null,
              "ativo": "Divisão de dano com aliado"
            },
            "modificadores": {
              "bonusSucesso": "Se equipado com Armadura de fé, o dano dividido é reduzido pela metade, arredondado para cima"
            }
          },
          {
            "nome": "Guerreiro da Fé",
            "tipo": "Passiva",
            "descricao": "O inquisidor se torna imune a envenenamento, resistente a dano sagrado e imune a doenças. Consegue conjurar Armamento Divino e Montaria Celeste uma vez por dia sem custo.",
            "efeitos": {
              "passivo": "Imunidade a envenenamento, resistência a dano sagrado e imunidade a doenças. Conjura uma vez por dia sem custo."
            },
            "modificadores": {
              "bonusSucesso": "Primeira conjuração de Armadura de fé e Ascensão Celeste custa apenas 3 pontos de magia"
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

export default InquisidorPage;