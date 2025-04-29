import classes from "../../../assets/images/classes.png";
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./classes.css";

const CombatentePage = () => {
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
    const combatenteSkillsData = {

        "titulo": "Combatente",
        "atributos": {
          "vida": 4,
          "estamina": 2,
          "magia": 0
        },
        "descricao": "O Combatente é a personificação da resistência e da disciplina, moldado para se destacar onde a força e a perseverança são a chave para a vitória. Em um mundo onde os magos e feiticeiros podem chamar os elementos à sua vontade, o Combatente sabe que a verdadeira força vem da própria carne e espírito, refinados através de anos de treinamento rigoroso. Sua estamina é seu bem mais precioso, e ele a utiliza com sabedoria. Cada movimento, cada golpe, cada manobra é calculado para ser eficiente, economizando sua energia para o momento exato em que a força bruta será necessária. Enquanto outros confiam nos feitiços e encantamentos, o Combatente raramente recorre à magia. Seu foco está em aprender a controlar seu corpo até o limite, transformando a exaustão em uma aliada e a dor em motivação.A habilidade de meditar em plena batalha, conhecida como Meditação de Combate, permite que o Combatente recupere o fôlego com um simples gesto, sem a necessidade de recorrer à magia, e ao usar essa prática, ele restabelece o equilíbrio entre corpo e mente. Sua estamina é sua fonte de poder, e ele a utiliza de forma implacável, sem hesitar em gastar pontos para garantir a vitória. Usando sua energia para fortalecer ataques, desarmar inimigos ou até mesmo proteger aliados, ele prova que a resistência física é a maior forma de magia que um combatente pode possuir.Pouco lhe importa o uso de encantamentos ou artefatos místicos; para ele, a verdadeira magia está em sua habilidade de continuar de pé, de se adaptar e de nunca sucumbir ao cansaço. As batalhas não são vencidas em um único movimento, mas sim em uma série de decisões calculadas, onde o combate é tanto mental quanto físico. O Combatente é imbatível porque sabe que, no final, o cansaço de seu corpo será sempre superado pela força de sua vontade. Cada ponto de estamina gasto é um passo mais perto da vitória, enquanto o uso de magia se mantém um recurso raro e reservado apenas para os momentos mais críticos.",
        "habilidade": {
          "nome": "Implacável",
          "descricao": "Implacável consiste em pequenas habilidades menores que trabalham em sinergia, oferecendo vantagens no combate.",
          "habilidades": [
            {
              "nome": "Meditação de Combate",
              "descricao": "Recupere fôlego uma vez por dia sem custo de magia, com o custo de apenas uma ação no turno de combate.",
              "condicao": "Com a Regalia 'Recuperar Fôlego Melhorado', aplica a habilidade também."
            },
            {
              "nome": "Novo Fôlego",
              "descricao": "Ao usar Meditação de Combate, o combatente retira qualquer penalidade de ataque acumulada dentro dessa rodada."
            },
            {
              "nome": "Ataque Fortalecido",
              "descricao": "Após usar Meditação de Combate, o combatente ganha um bônus de dano igual ao valor de sua Habilidade Fortitude."
            },
            {
              "nome": "Embalado",
              "descricao": "Após usar Meditação de Combate e deixar outra criatura com 0 pontos de vida através do Ataque Fortalecido, o combatente recebe 2 ações extras no próximo turno."
            }
          ]
        },
        "regalias": [
          {
            "nome": "Combate Direto",
            "bônus": [
              { "tipo": "Combate Corpo a Corpo", "valor": 1 },
              { "tipo": "Destreza ou Força", "valor": 1 }
            ],
            "manobras": [
              {
                "nome": "Nível 2",
                "descricao": "O personagem ganha um bônus de 2 pontos em Combate Corpo a Corpo e 1 Destreza ou Força."
              },
              {
                "nome": "Nível 3",
                "descricao": "O personagem ganha um bônus de 1 ponto em Combate Corpo a Corpo, Destreza ou Força e a utilização da seguinte Manobra:"
              },
              {
                "nome": "Guarda de Duelo (Ação Livre)",
                "descricao": "Ao entrar nesta postura recebe vantagem em rolamentos de ataque  e 1 ponto de Defesa, desde que só tenha um inimigo à distância corpo a corpo de si. Custa 3 pontos de estâmina Duração até o fim do turno."
              }
            ]
          },
          {
            "nome": "Combate a Distância",
            "bônus": [
              { "tipo": "Combate a Distância", "valor": 1 },
              { "tipo": "Destreza", "valor": 1 }
            ],
            "manobras": [
              {
                "nome": "Nível 2",
                "descricao": "O personagem ganha um bônus de 2 pontos em Combate a Distância e 1 de Destreza. "
              },
              {
                "nome": "Nível 3",
                "descricao": "O personagem ganha um bônus de 3 pontos em Combate a Distância, 1 de Destreza e a utilização da seguinte manobra:"
              },
    
              {
                "nome": "Desarmar",
                "descricao": "Ao realizar um ataque de Combate a distância, o combatente pode escolher desarmar o alvo. Veja as regras na ação Desarmar. Em um acerto o alvo toma o dano e tem 40% de chance de ser desarmado. A arma cai em uma distância de 3 metros do alvo em um sucesso. Custa 4 pontos de Estâmina  e pode aumentar em 5% por cada 1 ponto de Estâmina  a mais gastos no uso da manobra."
              }
            ]
          },
          {
            "nome": "Combate de Emboscada",
            "bônus": [
              { "tipo": "Agilidade", "valor": 1 },
              { "tipo": "Percepção", "valor": 1 },
              { "tipo": "Furtividade", "valor": 1 }
            ],
            "manobras": [
              {
                "nome": "Nível 2",
                "descricao": "O personagem ganha um bônus de 1 ponto em Agilidade, Percepção e Furtividade. Recebe também vantagem no rolamento de ataque, com ataques corpo a corpo, se estiver flanqueando um inimigo."
              },
              {
                "nome": "Nível 3",
                "descricao": "O personagem ganha um bônus de 1 ponto em Agilidade, Percepção, Furtividade e a utilização da seguinte manobra"
              },
              {
                "nome": "Ponto Fraco",
                "descricao": "Causa 1d6 pontos de dano extra em um ataque, caso esteja flanqueando um inimigo. Esse dano extra só é aplicado no primeiro ataque em uma mesma ação. Pode aumentar em 1d6 de dano ao gastar 2 pontos de estâmina ao usar a manobra, e mais 1d6 para cada 2 pontos adicionais."
              }
            ]
          },
          {
            "nome": "Combate Defensivo",
            "bônus": [
              { "tipo": "Fortitude", "valor": 1 },
              { "tipo": "Agilidade", "valor": 1 },
              { "tipo": "Proficiência", "valor": 'Armadura pesada' }
            ],
            "manobras": [
              {
                "nome": "Nível 2",
                "descricao": "O personagem ganha um bônus de 1 ponto em Fortitude e Agilidade. O personagem também ganha 1 ponto de valor de Defesa se lutar com Armadura Média, ou Pesada, e um Escudo. "
              },
              {
                "nome": "Nível 3",
                "descricao": "O personagem ganha um bônus de 1 ponto em Fortitude e Agilidade e a utilização da seguinte manobra: "
              },
              {
                "nome": "Guarda-Costas",
                "descricao": "Reage a um ataque contra um aliado, tentando bloquear o ataque com seu valor de Defesa. Custa 3 pontos de Estâmina e mais 1 ponto para reagir novamente no mesmo turno."
              }
            ]
          },
          {
            "nome": "Combate com Arma de Haste",
            "bônus": [
              { "tipo": "Combate Corpo a Corpo", "valor": 1 },
              { "tipo": "Força", "valor": 1 }
            ],
            "manobras": [
              {
                "nome": "Nível 2",
                "descricao": "O personagem ganha um bônus de 2 pontos em Combate Corpo a Corpo e 1 em Força"
              },
              {
                "nome": "Nível 3",
                "descricao": "O personagem ganha um bônus de 1 ponto em Combate Corpo a Corpo, Força e a utilização da seguinte manobra: "
              },
              {
                "nome": "Estocada",
                "descricao": "Ao atacar com uma arma de haste, o combatente pode estender seu alcance em 1,5 metros. Custa 2 pontos de Estâmina."
              }
            ]
          },
          {
            "nome": "Combate Desarmado",
            "bônus": [
              { "tipo": "Combate Corpo a Corpo", "valor": 1 },
              { "tipo": "Força ou Destreza", "valor": 1 },
              { "tipo": "Forma de ataque desarmado", "valor": "Destreza ou Força" },
              { "tipo": "Dano do ataque desarmado", "valor": " 1d6 pontos de dano de impacto" }
            ],
            "manobras": [
              {
                "nome": "Nível 2",
                "descricao": "O personagem ganha um bônus de 2 pontos em Combate Corpo a Corpo e 1 em Força ou Destreza."
              },
              {
                "nome": "Nível 3",
                "descricao": "O personagem ganha um bônus de 1 ponto em Combate Corpo a Corpo e Força ou Destreza e a utilização da seguinte manobra:"
              },
              {
                "nome": "Derrubar ou Agarrar",
                "descricao": "Ao realizar um ataque desarmado, o combatente pode derrubar ou agarrar o inimigo. A chance de sucesso é de 50%. Custa 4 pontos de Estâmina."
              }
            ]
          },
          {
            "nome": "Combate com Armas Improvisadas",
            "descricao": "O combatente pode usar objetos diversos como armas improvisadas. O dano e habilidades variam de acordo com o objeto, com durabilidade e efeitos especiais.Veja na página de equipamentos.",
    
          },
          {
            "nome": "Combate com Duas Armas",
            "descricao": "O personagem pode atacar uma segunda vez na ação Atacar com uma arma secundária. Para usar uma arma em cada mão, as duas armas precisam possuir a possibilidade de ser usada com uma mão e a arma secundária precisa da propriedade leve. Nenhuma das duas armas pode ser pesada. Combate com duas armas é exaustivo e custa 1 ponto de Stamina por rodada para manter essa postura de combate. Esse ataque com a mão secundária não gera a penalidade de ataques consecutivos em um mesmo turno."
          },
          {
            "nome": "Combate com Arma de Acuidade",
            "descricao": "O personagem pode usar seu valor de Destreza para calcular o valor de ataque e o dano de armas corpo a corpo que possuam a propriedade acuidade. Essa Regalia vale para ataques desarmados também. Se o combatente possuir a manobra “Ponto Fraco” e estiver usando uma arma de acuidade para realizar a manobra recebe 1d6 de dano extra."
          },
          {
            "nome": "Recuperar Fôlego Melhorado",
            "descricao": "O personagem pode gastar uma ação para recuperar 3d4 pontos de vida . Custa 2 pontos de magia e por 2 pontos de magia adicionais também recupera 2d4 pontos de estâmina na mesma ação."
          },
          {
            "nome": "Golpe Explosivo",
            "descricao": "O personagem realiza um ataque rápido e mais forte ao custo do seu vigor. Ao realizar um ataque, na ação atacar, causa 1d6 pontos de dano adicionais. Custa 2 pontos de Estâmina."
          },
          {
            "nome": "Levantar Escudo",
            "descricao": "O personagem pode levantar seu escudo, desde que não seja um Broquel, e se esconder atrás dele como uma reação engatilhada por um ataque realizado contra o personagem. Causa desvantagem em todos ataques direcionados ao personagem até o início de seu próximo turno. Custa 2 pontos de Estâmina."
          },
          {
            "nome": "Recarga Oportuna",
            "descricao": "Permite recarregar uma arma de recarga enquanto usa uma ação de movimento. Custa 1 ponto de Estâmina."
          }
        ]
      }
    return (
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ width: "80%", mx: "auto" }}>
                {/* Título e Descrição */}
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                    <Box sx={{ width: "60%", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography className="boxTextTitle" variant="h3" gutterBottom>
                            {combatenteSkillsData.titulo}
                        </Typography>
                        <Typography className="bigBoxTextClasses" paragraph sx={{ textAlign: 'justify' }}>
                            {combatenteSkillsData.descricao}
                        </Typography>
                    </Box>
                    <img src={classes} style={{ width: "30%", height: '30%' }} alt="Imagem do Combatente" />
                </Box>
                <Typography variant="h4" className="boxTextTitle" sx={{ my: 3 }}>
                    Habilidade de Classe
                </Typography>
                {/* Renderizar habilidade */}
                <HabilidadeDeClasseAcordion skill={combatenteSkillsData.habilidade} />
                <Typography variant="h4" className="boxTextTitle" sx={{ my: 3 }}>
                    Regalias
                </Typography>
                {/* Mapear regalias */}
                {combatenteSkillsData.regalias.map((regalia, index) => (
                    <PerkAccordion key={index} skill={regalia} />
                ))}
            </Box>
        </Box>
    );
}

export default CombatentePage;