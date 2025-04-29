import profano from "../../../assets/images/profano.png";
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./classes.css";

const ProfanoPage = () => {
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
        "titulo": "Profano",
        "img": profano,
        "descricao": "Entre as sombras das florestas primevas e os vales intocados pelo tempo, caminham os metamorfos, figuras de essência mutável cuja ligação com o mundo natural transcende as formas fixas dos homens. Eles não são meros conhecedores das criaturas da terra, da água e do céu, mas partilham de sua linguagem, entendendo os sussurros do vento entre as copas das árvores e a cadência oculta dos passos de um lobo em perseguição. O corpo do metamorfo não conhece rigidez, moldando-se conforme a necessidade, tomando feições que lhe conferem força, destreza ou resistência, espelhando as qualidades das bestas que observa. Nos antigos mitos de aldeias distantes, são descritos como aqueles que percorrem o mundo sem que se saiba se são homem ou fera, seus olhos refletindo um entendimento que vai além das palavras e suas ações ditadas por instintos tão refinados quanto os da criatura mais astuta da mata. Se há um propósito em sua existência, ele se manifesta na fusão entre o humano e o selvagem, um equilíbrio onde a identidade não é uma âncora, mas um rio que flui, sem nunca se deter por completo.",
        "atributos": "Cada Regalia comprada na especialização Profano(a) fornece:\n- 3 Pontos de Vida\n- 0 Pontos de Estâmina\n- 7 Ponto em Magia. Para se tornar um profano o deus escolhido ao pegar a classe noviço tem que possuir alinhamento maligno ou neutro.",
        "regaliaObrigatoria": {
          "descricao": "Ao escolher esta especialização, o personagem recebe os seguintes atributos :",
          "pontos": {
            "atributos": {
              "quantidade": 2,
              "opcoes": ["Ocultismo", "Ritualismo"]
            },
            "combate": {
              "quantidade": 1,
              "opcoes": ["Combate Arcano", "Arcanismo"]
            },
            "habilidades": {
              "quantidade": 2,
              "opcoes": ["Teologia", "Intuição", "História", "Medicina"]
            },
            "proficiências": ["Proficiência em escudos.",]
          },
          "habilidade": [{
            "nome": "Ovelha perdida",
            "tipo": "(Passiva)",
            "descricao": " Quando o profano usar milagres que causam dano sagrado sua natureza faz esses milagres causarem dano  necrótico.O profano aprende a tirar poder de sacrilégios e heresias. Ao cometer alguma forma de desrespeito a uma das divindades boas, o profano recebe uma runa em seu braço, que pode ser usada como uma das runas da árvore de runas da classe feiticeiro. Estes atos de heresia são claras formas de vandalismo ou ataques diretos a ídolos e rituais realizados diretamente ligados a um deus considerado bom. É possível acumular até 3 runas desta forma. Não é necessário ter comprado as Regalias da árvore de runa para usá-las desta maneira.",
          }]
        },
        "regalias": [
          {
            "nome": "Amaldiçoar Arma Melhorado",
            "tipo": "Ação",
            "descricao": "Amaldiçoa até 5 armas e muda o tipo de dano para Necrótico. Dura 10 rodadas. Aumenta o dano da arma em 1d4 pontos de dano.",
            "custoMagia": 1,
            "requisito": "Abençoar Arma"
          },
          {
            "nome": "Empatia Maliciosa",
            "tipo": "Ação",
            "descricao": "Cria uma ligação com um alvo e através dela divide toda dor e sofrimento recebido pelo profano. Existe 50% de chance de sucesso ao tentar se ligar com um alvo que não seja voluntário. Todo dano que o profano recebe pode ser dividido na metade com o alvo .  Ao dividir o dano  com um alvo involuntário é necessário um rolamento de 1d4 ou sofre dano para determinar a divisão. Ao rolar 1 no rolamento do d4 o alvo da ligação recebe 25% do dano (um quarto)  e o profano o resto, se rolar 2 no d4 sofre 50% (metade)  e o profano o resto, se rolar 3 no d4 sofre 75% (3 quartos)  e o profano o resto,  e se rolar 4 no d4 sofre 100% (todo o dano) do valor do dano é tranferido do profano pro alvo da ligação. Custa 8 pontos de magia.",
            "custoMagia": 8,
            "chanceDeSucesso": "50%",
            "efeitos": {
              "ativo": "Divide o dano entre o profano e o alvo, com a porcentagem definida pelo rolamento de 1d4."
            }
          },
          {
            "nome": "Turbilhão de Gritos",
            "tipo": "Ação",
            "descricao": "O Profano grita injúrias ao alvo, o alvo fica Surdo, mudo e impossibilitado de usar qualquer habilidade, magia, feitiço ou milagres até o fim de seu próximo turno. Custa 6 pontos de magia.",
            "custoMagia": 6
          },
          {
            "nome": "Manchar Alma",
            "tipo": "Milagre",
            "descricao": "chance de fazer um inimigo ficar cego, surdo e restringido até o fim de seu próximo turno. Quando seu turno acabar o alvo é manchado pelos seus atos mais vergonhosos e tem 30% de chance de sofrer 6d10 pontos de dano necrótico e sofre as condições, caso passe sofre 2d10 de dano necrótico e não sofre as condições. Custa 10 pontos de magia e mais 2 pontos de magia para aumentar a chance de sucesso da magia em 5%. Para cada 15 pontos a mais é possível amaldiçoar outra criatura.",
            "custoMagia": 10,
            "chanceDeSucesso": "60%",
            "dano": "6d10 (falha) ou 2d10 (sucesso)",
            "modificadores": {
              "bonusSucesso": "2 pontos de magia aumentam a chance de sucesso em 5%.",
              "usoExtra": "Para cada 15 pontos extras, é possível amaldiçoar outra criatura."
            }
          },
          {
            "nome": "Proteção contra o Sagrado",
            "tipo": "Ação",
            "descricao": "Cria uma área protetora de 9 metros de raio que dá penalidade de -4 em ataques feitos por celestiais e criaturas divinas e -2 para outras criaturas. Dá bônus de Combate Arcano +1 para cada aliado protegido.",
            "custoMagia": 7
          },
          {
            "nome": "Lente Investigativa Melhorada",
            "tipo": "Passiva",
            "descricao": "Aumenta o alcance do milagre em 6m. Dura 10 minutos a mais. A área fica em meia luz caso esteja em escuridão, criaturas dentro desta área ficam iluminadas e destacadas do ambiente como se estivessem em luz completa. A criatura que mentir sofre como se estivesse sendo atacada, cada mentira inflige 1d6 de dano sagrado.",
            "efeitos": {
              "passivo": "Ilumina a área e destaca criaturas, causa dano sagrado a mentirosos."
            }
          },
          {
            "nome": "Asas",
            "tipo": "Metamorfose",
            "descricao": "Pré-requisito: Elixir Padrão. Ao tomar um Elixir, o profano pode escolher fazer com que asas apareçam como efeito adicional, que duram pelo tempo em que o elixir durar. Ganha uma velocidade de voo igual à sua velocidade de movimento. Custa 4 pontos de magia para ativar o efeito ao tomar um elixir.",
            "custoMagia": 4,
            "requisito": "Elixir Padrão",
            "efeitos": {
              "ativo": "Ganha uma velocidade de voo igual à sua velocidade de movimento pelo tempo de duração do elixir."
            }
          },
          {
            "nome": "Confusão",
            "tipo": "Ação",
            "descricao": "Cria 10 imagens de si em espaços vazios em uma distância de até 9 metros de onde o profano está. Uma criatura em movimento que passar em 1,5 metros de uma cópia, e continuar movimentando para longe da cópia, ou que atacar uma cópia com um ataque corpo a corpo tem 50 % de chance de ficar atordoado por um turno, mas de qualquer forma a cópia some. Criaturas que não se desloquem para longe ou ataquem uma cópia não ativam a maldição mesmo se estiverem a 1,5 metros da cópia. O profano pode mudar de posição com uma cópia de si desde que esteja em até 18 metros da cópia. Dura 10 rodadas. Custa 5 pontos de magia e para cada 5 aumenta em 5% a chance de causar o efeito.",
            "custoMagia": 5,
            "chanceDeSucesso": "50%",
            "efeitos": {
              "ativo": "Cria 10 imagens ilusórias que confundem inimigos, com chance de atordoar quem interage com elas. Pode trocar de lugar com uma cópia."
            },
            "modificadores": {
              "bonusSucesso": "Para cada 5 pontos de magia extras, aumenta em 5% a chance de atordoar."
            }
          },
          {
            "nome": "Fantoche de Carne",
            "tipo": "Ritual",
            "descricao": "Este ritual anima uma pequena criatura utilizando um espírito da natureza, este ritual não tem limite de duração, ela desaparece apenas quando for morta. A criatura pode atacar usando o Combate Arcano do Feiticeiro(a) e tem seu ritualismo x2 em pontos de vida. Seus ataques causam 1 + o ocultismo do xamã em dano necrótico. Custa 5 moedas de ouro em materiais para o ritual. Custa 5 pontos de magia e para cada 1 ponto extra o fantoche recebe mais 2 pontos de vida.",
            "custoMagia": 5,
            "bonus": {
              "vidaTemporaria": "Para cada 1 ponto de magia extra, o fantoche recebe mais 2 pontos de vida."
            }
          },
          {
            "nome": "Necroanimação",
            "tipo": "Ritual",
            "descricao": "Pré-requisito: Fantoche de Carne. O Profano pode reanimar um ser de tamanho grande ou menor como um morto vivo em um ritual que dura aproximadamente 1 hora. O morto-vivo retorna como a criatura que foi morta, mas possuída por um espírito sob o comando do Xamã. Um ser necroanimado é incapaz de se usar milagres ou receber cura de milagres conjurados nele.  Custa 5 moedas de ouro em materiais para o ritual. Custa 25 pontos de magia.",
            "custoMagia": 25,
            "requisito": "Fantoche de Carne",
            "interacoes": {
              "comOutraRegalia": "Requer a regalia 'Fantoche de Carne' para ser realizado."
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

export default ProfanoPage;