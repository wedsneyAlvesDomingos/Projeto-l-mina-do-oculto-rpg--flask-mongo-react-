import cavaleiro from "../../../assets/images/cavaleiro.png";
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./classes.css";

const CavaleiroPage = () => {
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
        "titulo": "Cavaleiro",
        "img": cavaleiro,
        "descricao": "O Cavaleiro é a personificação da honra, coragem e lealdade. Sua essência é forjada no compromisso de proteger e servir, seja a uma causa nobre, um senhor ou uma causa maior. Equipado com força física e uma disciplina imbatível, o Cavaleiro é um defensor incansável, sempre pronto para enfrentar qualquer desafio que ameace os seus. Sua presença em combate é imponente, com uma combinação de habilidade marcial e uma sólida moralidade que guia suas ações. Não é apenas um guerreiro, mas um líder capaz de inspirar e conduzir outros com confiança, sempre em busca de justiça. \n Com um espírito indomável, o Cavaleiro se destaca pela resistência física e mental, capaz de resistir a pressões e superar adversidades. Sua lealdade é inquebrantável, e sua habilidade de proteger e agir como escudo para os outros é sua marca registrada. No campo de batalha, sua determinação e habilidade tática fazem dele uma força a ser respeitada, sempre em busca da vitória para os seus, seja com a espada ou com palavras.\n O Cavaleiro, com sua postura firme e coração resoluto, é uma figura de autoridade e proteção, cuja presença garante que a justiça prevalecerá, não importa o custo.",
        "atributos": "Cada Regalia comprada na especialização Cavaleiro(a) fornece:\n- 6 Pontos de Vida\n- 3 Pontos de Estâmina\n- 1 Ponto em Magia",
        "regaliaObrigatoria": {
          "descricao": "Ao escolher esta especialização, o personagem recebe os seguintes atributos :",
          "pontos": {
            "atributos": {
              "quantidade": 2,
              "opcoes": ["Força", "Fortitude", "Agilidade"]
            },
            "combate": {
              "quantidade": 1,
              "opcoes": ["Combate corpo a corpo", "Combate à distância"]
            },
            "habilidades": {
              "quantidade": 2,
              "opcoes": ["Jurisprudência", "Persuasão", "Intimidação"]
            },
            "proficiências": ["Condução de Veículos Terrestres"]
          },
          "outrasProficiencias": [
            "Armaduras Pesadas",
            "Todos os Escudos"
          ],
          "habilidade": [{
            "nome": "Juramento",
            "tipo": "Passiva",
            "descricao": "Ao se tornar cavaleiro, o personagem faz um juramento de honra e lealdade a alguém ou causa  que queira servir. É um voto de proteção que deve ser seguido. Um cavaleiro executando seu juramento ao entrar na condição a beira da morte não para de agir até que morra completamente ou seja incapcitado por outros meios. ",
          }]
        },
        "regalias": [
          {
            "nome": "Intervenção",
            "tipo": "Reação",
            "descricao": "Quando um inimigo passar a 1,5m de distância do cavaleiro, ele pode usar sua reação para impedir que ele prossiga, parando completamente sua ação de movimento.",
            "custoEstamina": 4,
            "chanceDeSucesso": "60%",
            "efeitos": {},
            "modificadores": {
              "bonusSucesso": "+5% por 1 ponto adicional de Estâmina"
            },
            "bonus": {},
            "interacoes": {}
          },
          {
            "nome": "Combate Montado",
            "tipo": "Passiva",
            "descricao": "O Cavaleiro recebe vantagem no rolamento de ataque quando luta em cima de uma montaria. Além disso, pode forçar um ataque a atingi-lo ao invés da sua montaria.",
  
            "efeitos": {},
            "modificadores": {},
            "bonus": {
              "vidaTemporaria": "2d4 pontos de vida temporários toda rodada, se a montaria estiver com todos os pontos de vida"
            },
            "interacoes": {}
          },
          {
            "nome": "Aparar",
            "tipo": "Reação",
            "descricao": "Ao receber um ataque, antes do rolamento ser resolvido, pode usar sua reação para aumentar o Valor de Defesa em 2 pontos durante este ataque específico.",
            "custoEstamina": 2,
            "efeitos": {},
            "modificadores": {
              "usoExtra": "Pode ser repetido mais vezes na mesma rodada ao custo de 2 pontos de Estâmina adicionais por uso"
            },
            "bonus": {},
            "interacoes": {}
          },
          {
            "nome": "Levantar Moral",
            "tipo": "Ação",
            "descricao": "O Cavaleiro(a) encoraja seus aliados em um raio de 9m. Eles ficam imunes à condição aterrorizado e seu próximo rolamento de combate tem vantagem.",
            "custoEstamina": 5,
            "efeitos": {},
            "modificadores": {
              "bonusLideranca": "Se tiver pontos em Liderança, pode combinar Levantar Moral com um efeito da proficiência"
            },
            "bonus": {},
            "interacoes": {}
          },
          {
            "nome": "Liderar Ataque",
            "tipo": "Ação",
            "descricao": "Ao realizar um ataque, um aliado pode atacar simultaneamente como uma reação.",
            "custoEstamina": 4,
            "efeitos": {},
            "modificadores": {},
            "bonus": {},
            "interacoes": {}
          },
          {
            "nome": "Ripostar",
            "tipo": "Reação",
            "descricao": "Quando um inimigo erra um ataque corpo a corpo contra um aliado a até 3m, o Cavaleiro(a) pode realizar um contra-ataque.",
            "custoEstamina": 4,
            "efeitos": {},
            "modificadores": {
              "usoExtra": "Pode ser repetido na mesma rodada ao custo de 4 pontos de Estâmina por tentativa adicional"
            },
            "bonus": {},
            "interacoes": {}
          },
          {
            "nome": "Fortaleza",
            "tipo": "Ação",
            "descricao": "O Cavaleiro(a) assume uma postura defensiva ao atacar, reduzindo em 2 pontos o valor de acerto de todos os ataques, mas aumentando o Valor de Defesa em 3 até o fim da rodada.",
            "custoEstamina": 4,
            "efeitos": {},
            "modificadores": {
              "duracaoExtra": "Pode manter essa postura gastando 2 pontos de Estâmina por rodada adicional"
            },
            "bonus": {},
            "interacoes": {}
          },
          {
            "nome": "Desafio",
            "tipo": "Ação",
            "descricao": "O Cavaleiro(a) desafia um número de inimigos (até seu valor de Intimidação) em um raio de 6m. Eles devem atacá-lo ou não podem atacar ninguém na rodada.",
            "custoEstamina": 1,
            "efeitos": {},
            "modificadores": {},
            "bonus": {},
            "interacoes": {}
          },
          {
            "nome": "Vontade Inabalável",
            "tipo": "Reação",
            "descricao": "O Cavaleiro(a) tem maior resistência contra efeitos mentais.",
  
            "efeitos": {
              "passivo": "Reduz em 10% a chance de ser afetado por encantamentos ou medo",
              "ativo": "Pode reduzir em mais 10% ao gastar 3 pontos de Estâmina"
            },
            "modificadores": {},
            "bonus": {},
            "interacoes": {}
          },
          {
            "nome": "Golpe Heroico",
            "tipo": "Ação (2 Ações)",
            "descricao": "O Cavaleiro(a) faz uma investida heróica, atacando todos os inimigos a 1,5m de um aliado e empurrando-os 1,5m, entrando entre eles e o aliado.",
            "custoEstamina": 3,
            "dano": "(Dano da arma + atributo) + 1d8",
            "efeitos": {
              "penalidadeDefesa": "Reduz o Valor de Defesa em 4 até o próximo turno"
            },
            "modificadores": {},
            "bonus": {},
            "interacoes": {
              "comFortaleza": "Usar Golpe Heroico cancela o efeito da regalia Fortaleza"
            }
          },
          {
            "nome": "Atropelar",
            "tipo": "Ação (2 Ações)",
            "descricao": "O Cavaleiro(a) avança 18m causando dano a todos os inimigos no caminho e tem 50% de chance de derrubá-los.",
            "custoEstamina": 6,
            "dano": "5d4",
            "efeitos": {},
            "modificadores": {},
            "bonus": {},
            "interacoes": {}
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

export default CavaleiroPage;