import barbaro from "../../../assets/images/barbaro.png";
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./classes.css";

const BarbaroPage = () => {
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
        "titulo": "BÁRBARO",
        "img": barbaro,
        "descricao": "O Assassino da classe Lâmina do Oculto é uma sombra letal que se move entre o mundo dos vivos sem ser notado. Ele domina a arte da furtividade e da precisão, transformando cada situação em uma oportunidade de eliminar seu alvo com eficiência mortal. Para ele, a escuridão não é um obstáculo, mas um aliado fiel, ocultando seus passos e protegendo-o dos olhos inimigos.Cada movimento do Assassino é calculado e executado com perfeição cirúrgica. Quando necessário, ele envolve a área com uma densa névoa de fumaça, confundindo seus inimigos e criando aberturas para desaparecer ou atacar sem ser visto. Em combate direto, ele desfere golpes meticulosamente planejados, mirando pontos vitais e causando hemorragias devastadoras, deixando seus inimigos enfraquecidos e sangrando até a morte. Sua especialidade não é a força bruta, mas sim a agilidade e a astúcia. Ele dança pelo campo de batalha, esquivando-se de ataques com reflexos sobre-humanos, desviando de explosões e investidas com uma precisão quase sobrenatural. Quando um inimigo erra, ele contra-ataca em um piscar de olhos, transformando qualquer falha adversária em uma oportunidade letal. O Assassino domina a arte das lâminas, empunhando duas armas com destreza implacável, sem se cansar. Com uma sequência de golpes rápidos e implacáveis, ele desfere uma tempestade de ataques, perfurando defesas e destruindo oponentes antes mesmo que percebam o que está acontecendo. Seus venenos são aplicados de forma estratégica, tornando suas armas ainda mais letais, causando dor, paralisia ou até morte silenciosa. Mas ele não é apenas um matador eficiente — ele é um mestre da guerra psicológica. Sua capacidade de se mesclar às sombras é tão perfeita que até mesmo olhos treinados ou sentidos sobrenaturais falham em detectá-lo. Ele observa, espera e age no momento exato, executando seus alvos com precisão cirúrgica. Mesmo quando cercado, o Assassino não recua. Ele golpeia com velocidade feroz, desviando de ataques e revidando com uma tempestade de lâminas. Cada golpe é planejado para desorientar, retardar e controlar seus oponentes. E quando o momento certo chega, ele desce sobre seu alvo com uma execução perfeita, encerrando a luta com um único golpe devastador.Mais do que um guerreiro, o Assassino da classe Lâmina do Oculto é uma lenda nas sombras. Ele é o fantasma que sussurra promessas de morte ao ouvido de seus inimigos. Cada ataque seu não é apenas uma investida física — é um lembrete cruel de que ninguém, por mais protegido que esteja, está verdadeiramente seguro.",
        "atributos": "Cada Regalia comprada na especialização Bárbaro(a) fornece:\n- 8 Pontos de Vida\n- 2 Pontos de Estâmina\n- 0 Ponto em Magia",
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
                    "opcoes": ["Atletismo", "Agilidade", "Intimidação"]
                },
                "proficiências": ["Proficiência em Espada Táurico, Machado Taurico, Machado Anão, Montante Cinético e Manopla de Espinhos."]
            },
            "habilidade": [{
                "nome": "Estado Enfurecido",
                "tipo": "Ação",
                "descricao": "Ao entrar nesse estado, o Bárbaro(a) se torna um ser primitivo, mas de grande Habilidade de combate. Aumentando seu acerto em 1 ponto. Causando 2 pontos de dano adicional ao fazer ataques que usam força. Recebe também bônus de 2 pontos em Atletismo, que não afeta seus pontos de estâmina.Nesse estado, o Bárbaro(a) perde a capacidade de pensar claramente, recebendo penalidade de 2 pontos em todas as proficiências de conhecimento.O estado Enfurecido dura enquanto o Bárbaro(a) estiver em combate ou realizando grande esforço físico. Após 30 segundos(ou 5 rodadas) sem atacar, sofrer dano ou fazer testes de atletismo ou força para usar sua força para carregar ou mover algo, o bárbaro sai de seu estado enfurecido. Custa 4 pontos de Estâmina .",
            }]
        },
        "regalias": [
            {
                "nome": "Couraça",
                "tipo": "Passiva",
                "descricao": "Se o Bárbaro(a) optar por não usar uma armadura, ele somará seu valor de fortitude ao seu Valor de Defesa, com um máximo de +8.",
                "custoEstamina": null,
                "chanceDeSucesso": null,
                "dano": null,
                "requisito": null,
                "efeitos": {
                    "passivo": "Aumenta o Valor de Defesa do Bárbaro(a) com base em seu valor de fortitude."
                },
                "modificadores": {
                    "bonusSucesso": null,
                    "usoExtra": null,
                    "duracaoExtra": null
                },
                "bonus": null,
                "interacoes": null
            },
            {
                "nome": "Ímpeto Furioso",
                "tipo": "Passiva",
                "descricao": "Quando entrar no estado Enfurecido, o Bárbaro(a) se torna imune a ser Encantado ou Amedrontado.",
                "custoEstamina": "4 pontos de estâmina",
                "chanceDeSucesso": null,
                "dano": null,
                "requisito": null,
                "efeitos": {
                    "passivo": "Imunidade a ser Encantado ou Amedrontado quando Enfurecido."
                },
                "modificadores": {
                    "bonusSucesso": null,
                    "usoExtra": null,
                    "duracaoExtra": null
                },
                "bonus": null,
                "interacoes": null
            },
            {
                "nome": "Ataque Veloz",
                "tipo": "Ação",
                "descricao": "O Bárbaro(a) pode realizar um ataque a mais quando tomar uma ação de atacar. Apenas uma vez por ação.",
                "custoEstamina": "2 pontos de estâmina",
                "chanceDeSucesso": null,
                "dano": null,
                "requisito": null,
                "efeitos": {
                    "ativo": "Realiza um ataque extra quando tomar uma ação de atacar."
                },
                "modificadores": {
                    "bonusSucesso": null,
                    "usoExtra": null,
                    "duracaoExtra": null
                },
                "bonus": null,
                "interacoes": null
            },
            {
                "nome": "Força Superior",
                "tipo": "Passiva",
                "descricao": "O Bárbaro(a) consegue manipular Armas consideradas de duas mãos, em uma única mão.",
                "custoEstamina": null,
                "chanceDeSucesso": null,
                "dano": null,
                "requisito": "6 pontos em Força",
                "efeitos": {
                    "passivo": "Permite usar armas de duas mãos com uma só mão."
                },
                "modificadores": {
                    "bonusSucesso": null,
                    "usoExtra": null,
                    "duracaoExtra": null
                },
                "bonus": null,
                "interacoes": null
            },
            {
                "nome": "Força Excessiva",
                "tipo": "Ação",
                "descricao": "O Bárbaro(a) consegue temporariamente manipular Armas consideradas de duas mãos em uma única mão. Sendo capaz de manusear duas armas de duas mãos ao mesmo tempo, uma em cada mão.",
                "custoEstamina": "10 pontos de estâmina (apenas durante o estado Enfurecido)",
                "chanceDeSucesso": null,
                "dano": null,
                "requisito": "10 pontos em Força e Força Superior",
                "efeitos": {
                    "ativo": "Permite usar duas armas de duas mãos simultaneamente."
                },
                "modificadores": {
                    "bonusSucesso": null,
                    "usoExtra": null,
                    "duracaoExtra": null
                },
                "bonus": null,
                "interacoes": null
            },
            {
                "nome": "Urro Amedrontador",
                "tipo": "Ação",
                "descricao": "O Bárbaro(a) ruge para as criaturas em até 6m dele. Todas as criaturas nessa área têm 50% de chance de serem amedrontadas, entrando na condição Aterrorizado, até o fim de seu próximo turno.",
                "custoEstamina": "5 pontos de estâmina (pode aumentar em 5% a chance por 1 ponto extra)",
                "chanceDeSucesso": "50%",
                "dano": null,
                "requisito": null,
                "efeitos": {
                    "ativo": "Chance de amedrontar inimigos próximos, aplicando a condição Aterrorizado."
                },
                "modificadores": {
                    "bonusSucesso": "Aumenta em 5% a chance de sucesso por ponto de estâmina extra.",
                    "usoExtra": null,
                    "duracaoExtra": null
                },
                "bonus": null,
                "interacoes": null
            },
            {
                "nome": "Dizimar",
                "tipo": "2 Ações",
                "descricao": "O Bárbaro(a) realiza um poderoso ataque giratório em sua área de ameaça, causando (o valor de dano da arma somado a seu atributo) +1d6 pontos de dano adicionais em todos os inimigos na área, além de aplicar a condição Sangrando.",
                "custoEstamina": "10 pontos de estâmina",
                "chanceDeSucesso": null,
                "dano": "Valor de dano da arma + atributo + 1d6",
                "requisito": null,
                "efeitos": {
                    "ativo": "Realiza um ataque giratório, causando dano e aplicando Sangrando."
                },
                "modificadores": {
                    "bonusSucesso": "Gire novamente por 8 pontos de estâmina e uma ação extra.",
                    "usoExtra": null,
                    "duracaoExtra": null
                },
                "bonus": null,
                "interacoes": null
            },
            {
                "nome": "Golpe Imprudente",
                "tipo": "Ação",
                "descricao": "O Bárbaro(a) ao realizar um ataque ganha vantagem no rolamento de ataque e para todos os ataques feitos neste turno. Porém, em retorno, todo ataque feito contra o bárbaro, até o início de seu próximo turno, recebe vantagem.",
                "custoEstamina": "2 pontos de estâmina",
                "chanceDeSucesso": null,
                "dano": null,
                "requisito": null,
                "efeitos": {
                    "ativo": "Vantagem no rolamento de ataque, mas ataques contra o Bárbaro(a) recebem vantagem."
                },
                "modificadores": {
                    "bonusSucesso": null,
                    "usoExtra": null,
                    "duracaoExtra": null
                },
                "bonus": null,
                "interacoes": null
            },
            {
                "nome": "Ferocidade",
                "tipo": "Passiva",
                "descricao": "Quando o ataque do Bárbaro(a) for um acerto crítico ou reduzir os pontos de vida de um inimigo a 0 em seu turno, ele pode realizar uma ação Atacar adicional.",
                "custoEstamina": null,
                "chanceDeSucesso": null,
                "dano": null,
                "requisito": null,
                "efeitos": {
                    "passivo": "Permite realizar um ataque adicional após um acerto crítico ou matar um inimigo."
                },
                "modificadores": {
                    "bonusSucesso": null,
                    "usoExtra": "Somente uma vez por turno."
                },
                "bonus": null,
                "interacoes": null
            },
            {
                "nome": "Fúria Implacável",
                "tipo": "Reação",
                "descricao": "Ao receber um golpe que o reduz a zero pontos de vida e entrar na condição À Beira da Morte, o Bárbaro(a) pode usar sua reação para entrar em uma fúria cega e continuar lutando.",
                "custoEstamina": "Todos os pontos de estâmina restantes",
                "chanceDeSucesso": null,
                "dano": null,
                "requisito": "Estar Enfurecido",
                "efeitos": {
                    "ativo": "Permite continuar lutando com a condição À Beira da Morte."
                },
                "modificadores": {
                    "bonusSucesso": null,
                    "usoExtra": null,
                    "duracaoExtra": "Custo de estâmina restante."
                },
                "bonus": null,
                "interacoes": null
            },
            {
                "nome": "Bater com Escudo",
                "tipo": "Ação",
                "descricao": "O Bárbaro(a) que estiver equipado com um escudo pode usá-lo como uma arma. Causa 1d6 pontos de dano de impacto.",
                "custoEstamina": null,
                "chanceDeSucesso": null,
                "dano": "1d6 de dano de impacto",
                "requisito": "Estar no estado Enfurecido e Combate Defensivo",
                "efeitos": {
                    "ativo": "Usa o escudo como uma arma causando dano de impacto."
                },
                "modificadores": {
                    "bonusSucesso": null,
                    "usoExtra": null,
                    "duracaoExtra": null
                },
                "bonus": null,
                "interacoes": null
            },
            {
                "nome": "Avanço Implacável",
                "tipo": "2 Ações",
                "descricao": "O Bárbaro(a) avança em linha reta por 9m com seu escudo à frente. Todos os alvos nesta linha são empurrados até o fim do movimento.",
                "custoEstamina": "4 pontos de estâmina",
                "chanceDeSucesso": null,
                "dano": "2d8 de dano de impacto (4d8 contra parede)",
                "requisito": "Estar Enfurecido, Regalia Bater com Escudo",
                "efeitos": {
                    "ativo": "Empurra inimigos em linha reta, causando dano de impacto.",
                    "modificadores": {
                        "bonusSucesso": "Empurrar com mais de um alvo causa dano adicional."
                    }
                },
                "bonus": null,
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

export default BarbaroPage;