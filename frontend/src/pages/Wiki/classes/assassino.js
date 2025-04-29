import assassino from "../../../assets/images/assassino.png";
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./classes.css";

const AssassinoPage = () => {
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
        "titulo": "ASSASSINO",
        "img": assassino,
        "descricao": "O Assassino da classe Lâmina do Oculto é uma sombra letal que se move entre o mundo dos vivos sem ser notado. Ele domina a arte da furtividade e da precisão, transformando cada situação em uma oportunidade de eliminar seu alvo com eficiência mortal. Para ele, a escuridão não é um obstáculo, mas um aliado fiel, ocultando seus passos e protegendo-o dos olhos inimigos.Cada movimento do Assassino é calculado e executado com perfeição cirúrgica. Quando necessário, ele envolve a área com uma densa névoa de fumaça, confundindo seus inimigos e criando aberturas para desaparecer ou atacar sem ser visto. Em combate direto, ele desfere golpes meticulosamente planejados, mirando pontos vitais e causando hemorragias devastadoras, deixando seus inimigos enfraquecidos e sangrando até a morte. Sua especialidade não é a força bruta, mas sim a agilidade e a astúcia. Ele dança pelo campo de batalha, esquivando-se de ataques com reflexos sobre-humanos, desviando de explosões e investidas com uma precisão quase sobrenatural. Quando um inimigo erra, ele contra-ataca em um piscar de olhos, transformando qualquer falha adversária em uma oportunidade letal. O Assassino domina a arte das lâminas, empunhando duas armas com destreza implacável, sem se cansar. Com uma sequência de golpes rápidos e implacáveis, ele desfere uma tempestade de ataques, perfurando defesas e destruindo oponentes antes mesmo que percebam o que está acontecendo. Seus venenos são aplicados de forma estratégica, tornando suas armas ainda mais letais, causando dor, paralisia ou até morte silenciosa. Mas ele não é apenas um matador eficiente — ele é um mestre da guerra psicológica. Sua capacidade de se mesclar às sombras é tão perfeita que até mesmo olhos treinados ou sentidos sobrenaturais falham em detectá-lo. Ele observa, espera e age no momento exato, executando seus alvos com precisão cirúrgica. Mesmo quando cercado, o Assassino não recua. Ele golpeia com velocidade feroz, desviando de ataques e revidando com uma tempestade de lâminas. Cada golpe é planejado para desorientar, retardar e controlar seus oponentes. E quando o momento certo chega, ele desce sobre seu alvo com uma execução perfeita, encerrando a luta com um único golpe devastador.Mais do que um guerreiro, o Assassino da classe Lâmina do Oculto é uma lenda nas sombras. Ele é o fantasma que sussurra promessas de morte ao ouvido de seus inimigos. Cada ataque seu não é apenas uma investida física — é um lembrete cruel de que ninguém, por mais protegido que esteja, está verdadeiramente seguro.",
        "atributos": "Cada Regalia comprada na especialização Assassino(a) fornece:\n- 4 Pontos de Vida\n- 6 Pontos de Estâmina\n- 0 Ponto em Magia",
        "regaliaObrigatoria": {
          "descricao": "Ao escolher esta especialização, o personagem recebe os seguintes atributos :",
          "pontos": {
            "atributos": {
              "quantidade": 2,
              "opcoes": ["Força", "Destreza"]
            },
            "combate": {
              "quantidade": 1,
              "opcoes": ["Combate corpo a corpo", "Combate à distância"]
            },
            "habilidades": {
              "quantidade": 2,
              "opcoes": ["Furtividade", "Alquimia", "Enganação", "Acrobacia"]
            },
            "proficiências": ["Proficiência em Katares, Presas da Serpente, Espadas de Lâminas Duplas, Katanas  e todas as armas com propriedade acuidade."]
          },
          "habilidade": [{
            "nome": "Treinamento de assassino",
            "tipo": "Passiva",
            "descricao": "Consegue produzir venenos como um profissional herbalista com as três regalias de produção de veneno. Se já possuir uma ou mais dessas regalias escolha outras regalias de qualquer profissão.",
          }]
        },
        "regalias": [
          {
            "nome": "Bomba de Fumaça",
            "tipo": "Ação",
            "descricao": "O Assassino(a) arremessa em seu pé uma bomba que cria uma névoa ao seu redor, com uma área de 6m de raio. Ficando obscurecido dentro do raio de efeito, aumentando seu Valor de Defesa em 2 pontos. O assassino pode ver dentro da área normalmente. Além disso, recebe vantagem em testes de furtividade e 3m a mais de movimento.",
            "custoEstamina": "2",
            "chanceDeSucesso": "100%",
            "dano": null,
            "efeitos": {
              "ativo": "Área de 6m de raio que obscurece, aumentando o Valor de Defesa em 2 pontos, vantagem em furtividade e 3m a mais de movimento."
            },
            "modificadores": {
              "bonusSucesso": "Aumento de 2 pontos de Defesa, vantagem em furtividade, aumento de 3m no movimento."
            },
            "bonus": {
              "vidaTemporaria": null
            },
            "interacoes": {
              "comOutraRegalia": "Interage com habilidades de furtividade e mobilidade."
            }
          },
          {
            "nome": "Treinamento com Arma Secundária",
            "tipo": "Passivo",
            "descricao": "Não custa estâmina para usar duas armas e a segunda arma não precisa ser leve, apenas uma arma que possa ser empunhada com uma mão. A arma da mão primária pode ter a propriedade pesada.",
            "custoEstamina": null,
            "chanceDeSucesso": "100%",
            "dano": null,
            "efeitos": {
              "passivo": "Permite usar duas armas sem custo adicional de estâmina, a arma secundária não precisa ser leve."
            },
            "modificadores": {
              "bonusSucesso": "Permite empunhar duas armas, sendo uma delas pesada."
            },
            "bonus": {
              "vidaTemporaria": null
            },
            "interacoes": {
              "comOutraRegalia": "Permite o uso de outras habilidades de combate com duas armas."
            }
          },
          {
            "nome": "Envenenar Arma",
            "tipo": "Ação",
            "descricao": "Como parte da ação atacar, o Assassino pode aplicar um veneno em sua arma até o fim de seu turno atual. O valor do dano adicional dependerá do veneno aplicado.",
            "custoEstamina": "4",
            "chanceDeSucesso": "100%",
            "dano": "Dependente do veneno",
            "efeitos": {
              "ativo": "Aplica veneno na arma para causar dano adicional no ataque."
            },
            "modificadores": {
              "bonusSucesso": "Dano adicional de acordo com o veneno."
            },
            "bonus": {
              "vidaTemporaria": null
            },
            "interacoes": {
              "comOutraRegalia": "Combina com habilidades de aumento de dano."
            }
          },
          {
            "nome": "Golpe Hemorrágico",
            "tipo": "Ação",
            "descricao": "O Assassino(a) ataca em um ponto de alta circulação sanguínea e com grande precisão. Para esse ataque a sua margem de crítico aumenta em 2 pontos e aplica a condição 'Sangrando' caso acerte e cause dano.",
            "custoEstamina": "4",
            "chanceDeSucesso": "100%",
            "dano": "1d8 adicional",
            "efeitos": {
              "ativo": "Aumenta a margem de crítico em 2 pontos e aplica a condição 'Sangrando'."
            },
            "modificadores": {
              "bonusSucesso": "Aumento na margem de crítico, aplicação da condição 'Sangrando'."
            },
            "bonus": {
              "vidaTemporaria": null
            },
            "interacoes": {
              "comOutraRegalia": "Combina com habilidades de dano e sangramento."
            }
          },
          {
            "nome": "Mesclar-se às Sombras",
            "tipo": "2 Ações",
            "descricao": "O Assassino(a) entra em um estado de furtividade avançado, no qual ele se torna invisível desde que esteja em um ambiente parcialmente ou completamente escuro. Essa habilidade engana até olhos que enxergam no escuro e sentidos que detectam vibrações no solo. O efeito acaba se o assassino atacar ou entrar em uma área de luz completa.",
            "custoEstamina": "3",
            "chanceDeSucesso": "100%",
            "dano": null,
            "efeitos": {
              "ativo": "Furtividade avançada que engana sentidos e habilidades de detecção em ambientes escuros."
            },
            "modificadores": {
              "bonusSucesso": "Furtividade completa em ambientes escuros, não detectado por sentidos comuns."
            },
            "bonus": {
              "vidaTemporaria": null
            },
            "interacoes": {
              "comOutraRegalia": "Combina com outras habilidades de furtividade e camuflagem."
            }
          },
          {
            "nome": "Esquiva Perfeita",
            "tipo": "Reação",
            "descricao": "O Assassino(a) pode usar a sua reação para reduzir o dano de um ataque em área pela metade. Pode-se gastar 4 pontos de estâmina adicionais para reduzir todo o dano com uma Esquiva Perfeita completa. O assassino pode fazer 1 Esquiva Perfeita completa por dia sem custo.",
            "custoEstamina": "2",
            "chanceDeSucesso": "100%",
            "dano": null,
            "efeitos": {
              "ativo": "Reduz dano de ataques em área pela metade ou por completo com gasto adicional de estâmina."
            },
            "modificadores": {
              "bonusSucesso": "Redução total de dano com custo adicional de estâmina."
            },
            "bonus": {
              "vidaTemporaria": null
            },
            "interacoes": {
              "comOutraRegalia": "Interage com habilidades de defesa e evasão."
            }
          },
          {
            "nome": "Executar",
            "tipo": "2 Ações",
            "descricao": "O Assassino(a) realiza um poderoso e preciso golpe em um dos pontos vitais de seu inimigo. Esse ataque reduz o seu alcance de crítico em 3 pontos e causa 1d8 pontos de dano adicionais. Se a criatura estiver sangrando o ataque é um crítico automático e causa 3d8 ao invés de 1d8 adicional no cálculo antes do crítico.",
            "custoEstamina": "5",
            "chanceDeSucesso": "100%",
            "dano": "1d8 ou 3d8 (se sangrando)",
            "efeitos": {
              "ativo": "Ataque preciso que causa dano adicional, crítico automático se a vítima estiver sangrando."
            },
            "modificadores": {
              "bonusSucesso": "Causa dano adicional e crítico automático se o inimigo estiver sangrando."
            },
            "bonus": {
              "vidaTemporaria": null
            },
            "interacoes": {
              "comOutraRegalia": "Combina com habilidades de sangramento e dano."
            }
          },
          {
            "nome": "Ataque de Oportunidade",
            "tipo": "Reação",
            "descricao": "O Assassino(a) pode realizar um ataque quando uma criatura que possa ver sai da sua área de ameaça, ou quando um inimigo ataca um aliado dentro do seu alcance.",
            "custoEstamina": "1",
            "chanceDeSucesso": "100%",
            "dano": "Dano normal de ataque",
            "efeitos": {
              "ativo": "Permite realizar um ataque quando uma condição específica for atendida."
            },
            "modificadores": {
              "bonusSucesso": "Dano normal de ataque."
            },
            "bonus": {
              "vidaTemporaria": null
            },
            "interacoes": {
              "comOutraRegalia": "Combina com habilidades de ataque e posicionamento."
            }
          },
          {
            "nome": "Troco",
            "tipo": "Reação",
            "descricao": "Quando um inimigo erra um ataque corpo a corpo, o Assassino(a) pode usar a sua reação para realizar um contra-ataque. Esse contra-ataque causa o dano de um ataque de arma normal do assassino, mas tem vantagem no rolamento de acerto. Pode ser feito uma vez por turno, podendo repetir com um custo adicional de 3 pontos de estâmina por uso extra.",
            "custoEstamina": "2",
            "chanceDeSucesso": "100%",
            "dano": "Dano normal de ataque",
            "efeitos": {
              "ativo": "Contra-ataque com vantagem após um ataque perdido."
            },
            "modificadores": {
              "bonusSucesso": "Vantagem no rolamento de acerto e possibilidade de repetir com custo extra de estâmina."
            },
            "bonus": {
              "vidaTemporaria": null
            },
            "interacoes": {
              "comOutraRegalia": "Interage com habilidades de ataque e reação."
            }
          },
          {
            "nome": "Finta Rápida",
            "tipo": "Ação",
            "descricao": "O Assassino(a) ao realizar um ataque, faz parecer que sua mão está em outra posição. Ganhando vantagem no rolamento de ataque. Esse ataque confunde os sentidos do inimigo e, ao acertar o alvo, o deixa com a condição 'Devagar' até o início do próximo turno do assassino.",
            "custoEstamina": "5",
            "chanceDeSucesso": "100%",
            "dano": null,
            "efeitos": {
              "ativo": "Ganha vantagem no ataque e aplica a condição 'Devagar'."
            },
            "modificadores": {
              "bonusSucesso": "Confunde o inimigo, deixando-o com a condição 'Devagar'."
            },
            "bonus": {
              "vidaTemporaria": null
            },
            "interacoes": {
              "comOutraRegalia": "Combina com habilidades de confusão e controle de movimento."
            }
          },
          {
            "nome": "Mestre do Flanco",
            "tipo": "Passivo",
            "descricao": "O Assassino(a) possui melhor desempenho quando não é foco único do seu inimigo. Ao lutar com um inimigo que esteja na distância de ameaça de um aliado, todo ataque causa 1d6 pontos de dano adicional.",
            "custoEstamina": null,
            "chanceDeSucesso": "100%",
            "dano": "1d6 adicional",
            "efeitos": {
              "passivo": "Dano adicional quando em combate com aliados próximos."
            },
            "modificadores": {
              "bonusSucesso": "Dano adicional de 1d6 contra inimigos que tenham aliados na área de ameaça."
            },
            "bonus": {
              "vidaTemporaria": null
            },
            "interacoes": {
              "comOutraRegalia": "Combina com habilidades de combate em grupo e posicionamento."
            }
          },
          {
            "nome": "Fúria de Lâminas",
            "tipo": "2 Ações",
            "descricao": "O Assassino(a) realiza uma sequência de golpes igual ao valor de agilidade do assassino. Todos os golpes contam como apenas um ataque para fins de penalidade. Para cada golpe que acerta o alvo, são somados 1d8 pontos de dano extra ao ataque. Ao terminar os ataques some todos os D8s ao valor de dano padrão de cada ataque, esses ataques não recebem bônus de dano de outras fontes.",
            "custoEstamina": "10",
            "chanceDeSucesso": "100%",
            "dano": "1d8 por golpe acertado",
            "efeitos": {
              "ativo": "Realiza uma sequência de ataques baseados na agilidade do assassino, com dano adicional."
            },
            "modificadores": {
              "bonusSucesso": "Dano extra de 1d8 para cada ataque bem-sucedido."
            },
            "bonus": {
              "vidaTemporaria": null
            },
            "interacoes": {
              "comOutraRegalia": "Interage com habilidades de agilidade e dano contínuo."
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

export default AssassinoPage;