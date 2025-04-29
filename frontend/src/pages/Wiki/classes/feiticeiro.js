import feiticeiro from "../../../assets/images/feiticeiro.png";
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./classes.css";

const FeiticeiroPage = () => {
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
    const feiticeiroSkillsData = {

        "titulo": "Feiticeiro",
        "atributos": {
          "vida": 3,
          "estamina": 0,
          "magia": 3
        },
        "descricao": "O feiticeiro é uma figura enigmática e poderosa, cuja magia surge de sua própria essência, ao contrário de outras tradições mágicas que dependem de estudo ou artefatos. Esse vínculo natural com as forças arcanas permite ao feiticeiro manipular o mundo ao seu redor de forma fluida e instintiva. Suas habilidades são muitas vezes imprevisíveis, refletindo a intensidade de sua conexão com o arcano, o que pode gerar resultados poderosos, mas também perigosos. No mundo, os feiticeiros são vistos com uma mistura de fascínio e temor, sendo capazes de realizar feitos extraordinários, mas também suscetíveis a perder o controle, com consequências catastróficas. O papel do feiticeiro no mundo varia: ele pode ser um sábio que busca conhecimento oculto, um defensor que usa seus poderes para proteger ou até mesmo um agente do caos, que age sem limites ou escrúpulos. Seu caminho é determinado não apenas pelo poder que possui, mas pelas escolhas que faz em sua jornada. As Regalias de feiticeiro não possuem ordem de compra. Dentro de cada categoria é possível comprar qualquer Regalia na ordem que desejar, diferente das outras classes primárias.",
        "habilidade": {
          "nome": "Veia azul",
          "descricao": "Magia corre em suas veias de maneira natural desde seu nascimento. Ao conjurar qualquer feitiço,  e apenas feitiços, o feiticeiro recebe 2 pontos de feitiçaria. Cada ponto de feitiçaria pode ser adicionado em uma magia para substituir pontos de magia. Porém esses pontos de feitiçaria têm uma duração curta de 1 minuto (10 rodadas) após adquiridos. Cada 1 ponto de feitiçaria pode substituir 1 ponto de magia. Pontos de feitiçaria podem ser acumulados de maneira que seja, no máximo, igual ao valor de ocultismo + ritualismo + arcanismo do feiticeiro. Estes pontos de feitiçaria podem ser trocados  por  outras coisas além de pontos de magia.O feiticeiro pode afetar feitiços através de pontos de feitiçaria uma vez por rodada, e um feitiço pode receber apenas uma das opções acima.  Um feitiço que seja conjurado, ou alterado, por pontos de feitiçaria não geram novos pontos de feitiçaria. Estas opções lhe dão mais versatilidade e utilidade. Essas opções são:",
          "habilidades": [
            {
              "nome": "Acelerar feitiço: ",
              "descricao": "Ao conjurar um feitiço, o feiticeiro pode gastar 4 pontos de feitiçaria para diminuir em 1 o número de ações necessárias para executá-lo. Essa opção não reduz um feitiço de uma ação a zero.",
            },
            {
              "nome": "Duplicar:",
              "descricao": "Ao conjurar um feitiço que afete apenas um alvo, o feiticeiro pode escolher atingir outro alvo que esteja a até 9 metros do alvo original do feitiço, essa opção custa 4 pontos de feitiçaria."
            },
            {
              "nome": "Conjuração atrasada: ",
              "descricao": "Ao gastar 4 pontos de feitiçaria, o feiticeiro pode escolher atrasar um feitiço de ataque a distância em até 12 segundos. Ao fazer isso o feitiço é conjurado normalmente, porém o feiticeiro pode escolher um atraso de 6 ou 12 segundos. Após o tempo escolhido de passar, o feitiço é lançado da posição em que o feiticeiro se encontrava."
            },
            {
              "nome": "Eco Elemental: ",
              "descricao": "O feiticeiro pode gastar uma ação e 8 pontos de feitiçaria para criar uma duplicata elemental de si ao conjurar um feitiço que envolva um elemento natural específico (fogo, gelo, eletricidade, etc.). Esta duplicata é do elemento do feitiço conjurado, ocupa um espaço desocupado ao lado do feiticeiro e possui 20 pontos de vida. Ela segue o feiticeiro e replica automaticamente o próximo feitiço elemental de ataque que for lançado pelo feiticeiro original, no mesmo lugar ou alvo . O eco elemental desaparece após lançar o feitiço replicado ou no final do turno do feiticeiro original."
            },
            {
              "nome": "Ampliação de Efeito:",
              "descricao": "O feiticeiro pode gastar 4 pontos de feitiçaria para ampliar o efeito de um feitiço que normalmente afeta uma área específica. Esta habilidade permite que o feiticeiro aumente a área de efeito do feitiço em 50%, afetando mais alvos ou uma área maior do campo de batalha."
            }
          ]
        },
        "regalias": [
          {
            "nome": "Maldição",
            "descricao": "Escolha entre as opções: ",
            "manobras": [
              {
                "nome": "O personagem ganha um bônus de 1 ponto em Intuição, Ocultismo e aprende a seguinte maldição: Enfraquecer(Maldição)(2 Ações)",
                "descricao": "Este feitiço causa enfraquecimento em um alvo e tem 40% de chance de sucesso. Caso enfeitiçado o alvo possui desvantagens em rolamentos de acerto, além de uma penalidade de 1,5m de velocidade de movimento. Duração de 5 rodadas. Custa 6 pontos de magia e pode aumentar em 5% para cada 2 pontos de magia a mais."
              },
              {
                "nome": "O personagem ganha um bônus de 1 ponto em Arcanismo, Ocultismo e aprende a seguinte maldição: Paranóia(Maldição)(2 Ações)",
                "descricao": " Este feitiço causa surdez e cegueira em seu alvo, tendo 30% de chance de sucesso. Duração de 5 rodadas. Custa 6 pontos de magia e pode aumentar em 5% para cada 3 pontos de magia a mais."
              },
              {
                "nome": "O personagem ganha a seguinte maldição: Olhar Amaldiçoado(Maldição)(2 Ações)",
                "descricao": "Um feiticeiro mantém seu olhar fixo em uma criatura que esteja a até 9 metros de distância. A criatura tem 50 % de chance de ser afetada pelo olhar e entrar na condição Aterrorizado. Dura 3 turnos Custa 5 pontos de magia e pode aumentar em 5% para cada 1 ponto de magia a mais."
              }
            ]
          },
          {
            "nome": "Caos",
            "descricao": " Escolha entre as opções:",
            "manobras": [
              {
                "nome": "O personagem ganha um bônus de 1 ponto em Combate Arcano, Arcanismo, Natureza e aprende o seguinte feitiço: Aperto do Caos(Feitiço)(2 Ações)",
                "descricao": "Este feitiço conjura um elemento aleatório ao redor de uma criatura em até 36 metros, tendo 40% de chance de sucesso. Caso enfeitiçado, o alvo durante uma rodada sofre 1d10 pontos de dano do elemento sorteado (Faça um rolamento de 1d6: 1   Fogo, 2   Gelo, 3   Terra, 4   Ar, 5   Raio e 6   Escolha), além de restringir a pessoa deitada no chão. Custa 3 pontos de magia e pode aumentar em 5% para cada 1 ponto de magia a mais. * Dano de gelo tem 20% de chance de aplicar um nível de Congelado. * Dano de fogo tem a mesma chance de aplicar Queimando.* Dano de terra tem um bônus de  20% para deixar o alvo restrito.* Dano de ar causa 2d6 a mais de dano."
              },
              {
                "nome": "O personagem ganha um bônus de 1 ponto em Arcanismo, Natureza e aprende o seguinte feitiço: Eletrodança Caótica(Feitiço)(2 Ações)",
                "descricao": " Conjura em uma área de 3m de raio, uma esfera de lampejos multicoloridos de todos os elementos, causando 1d4+1 pontos de dano de cada elemento (Fogo, Água, Ar, Terra e Raio). Custa 8 pontos de magia. Essa magia tem 40% de chance de aplicar um nível da condição Congelado e Queimando. "
              },
              {
                "nome": "O personagem aprende o seguinte feitiço: Roleta Caótica (Feitiço)(2 Ações)",
                "descricao": " Conjura um raio elemental com elemento aleatório causando 3d10 de dano a todos inimigos em uma linha de 18 metros de comprimento e 3 metros de largura. Tem 10% de chance de explodir na cara do conjurador, causando o dano da magia em todos a sua volta em até 1,5 metros. Custa 5 pontos de magia."
              }
            ]
          },
          {
            "nome": "Rito",
            "descricao": " Escolha entre as opções:",
            "manobras": [
              {
                "nome": "O personagem ganha um bônus de 1 ponto em Percepção, Ritualismo e aprendo o seguinte ritual: Espiritomancia (1 minuto)(ritual) ",
                "descricao": "Esse Ritual invoca três espíritos aliados que auxiliam na investigação e exploração de ambientes. O Feiticeiro(a) pode controlar e comandar cada espírito em até 100m de distância, além de ver e ouvir através de cada um, mas não ao mesmo tempo.  Custa 5 moedas de ouro em materiais para o ritual. Os espíritos permanecem com o Feiticeiro(a) em duração de uma hora e não podem ser destruídos. Custa 1 ponto de magia."
              },
              {
                "nome": "O personagem ganha um bônus de 1 ponto em Combate Arcano, Ritualismo e aprendo o seguinte ritual: Fantoche (1 minuto)(ritual)",
                "descricao": " Este ritual anima um pequeno fantoche utilizando um espírito da natureza, este ritual não tem limite de duração, apenas quando o boneco for destruído. O boneco pode atacar usando o Combate Arcano do Feiticeiro(a) e tem um quinto (⅕ ou 20%) dos pontos de vida do mesmo. Seus ataques causam 1d6 de dano necrótico. Custa 5 moedas de ouro em materiais para o ritual. Custa 4 pontos de magia e para cada 1 ponto extra o fantoche recebe mais 1 ponto de vida."
              },
              {
                "nome": "O personagem aprende o seguinte ritual: Comunicar com os mortos(10 minutos)(ritual)",
                "descricao": " Cria uma área de 6 metros onde é possível comunicar com o espírito de um corpo ou esqueleto de um humanóide morto. Dura 10 minutos ou até o espírito responder 5 perguntas. Custa 5 moedas de ouro em materiais para o ritual. Custa 4 pontos de magia."
              }
            ]
          },
          {
            "nome": "Metamorfose",
            "descricao": "Única exceção das árvores de regalias do feiticeiro que existe uma ordem de compra. Para criar os outros dois elixires é necessário ter um elixir padrão primeiro. Todo elixir dura 24 horas ou até ser consumido.uTomar um elixir custa uma ação, assim como criar um. Escolha entre as opções:",
            "manobras": [
              {
                "nome": "O personagem ganha um bônus de 1 ponto em Combate Arcano, Alquimia e aprende a criar o elixir padrão:  Elixir Padrão(Elixir)(Ação)",
                "descricao": "O personagem potencializa um líquido para se transformar nesse elixir. Ao tomar esse elixir os olhos do feiticeiro se transformam em algo novo e mais bestial, além de fortalecer o seu corpo, aumentando em 1 ponto o seu acerto em qualquer combate. O feiticeiro também recebe visão no escuro, com alcance de 6 metros, e vantagem em percepção, durante 10 rodadas. Criar esse elixir custa 5 pontos de magia. A cada 1 ponto de magia gostos a mais na conjuração, aumenta sua duração em 10 rodadas."
              },
              {
                "nome": "O personagem ganha um bônus de 1 ponto em Combate Arcano, Alquimia e aprende uma nova receita de elixir: Elixir do Predador(Elixir)(Ação)",
                "descricao": " Este ritual anima um pequeno fantoche utilizando um espírito da natureza, este ritual não tem limite de duração, apenas quando o boneco for destruído. O boneco pode atacar usando o Combate Arcano do Feiticeiro(a) e tem um quinto (⅕ ou 20%) dos pontos de vida do mesmo. Seus ataques causam 1d6 de dano necrótico. Custa 5 moedas de ouro em materiais para o ritual. Custa 4 pontos de magia e para cada 1 ponto extra o fantoche recebe mais 1 ponto de vida."
              },
              {
                "nome": "O personagem aprende uma nova receita de elixir: Elixir da Aceleração (Elixir)(Ação)",
                "descricao": " O personagem potencializa um frasco de elixir padrão para se transformar nesse elixir. Aumenta em 6 metros a velocidade de movimento, além do efeito base do elixir padrão. Duração de 10 rodadas,  Criar esse elixir custa 8 pontos de magia. A cada 1 ponto de magia gostos a mais na conjuração, aumenta sua duração em 10 rodadas."
              }
            ]
          },
          {
            "nome": "Rúnico",
            "descricao": "Criar uma runa gasta 1 minuto para realizar os desenhos e imbuir com magia. Escolha entre as opções:",
            "manobras": [
              {
                "nome": "O personagem ganha um bônus de 1 ponto em Combate Arcano, Ritualismo e aprende a seguinte runa:  Runa Protetiva (Runa)(Reação)",
                "descricao": "Ao imbuir essa runa em um equipamento, o feiticeiro o encanta com o efeito desta runa. A runa protetiva permite, enquanto equipada por uma criatura, que o portador possa uma vez ao dia negar o dano causado por outra criatura, seja por magia, milagre, feitiço ou ataques físicos. Custa 5 pontos de magia para imbuir um item com esta runa.  A cada 1 ponto de magia gastos para imbuir o poder desta runa a um objeto ganha mais um uso da Habilidade fornecida por ela."
              },
              {
                "nome": "O personagem ganha um bônus de 1 ponto em Arcanismo, Ritualismo e aprende a seguinte runa: Runa regenerativa(Runa)(Ação)",
                "descricao": " Ao imbuir essa runa em um equipamento, o feiticeiro o encanta com o efeito desta runa. A runa regenerativa permite, enquanto equipada por uma criatura, que o portador possa uma vez ao dia recuperar 3 pontos de vida, dois de estâmina  e 4 de magia. Custa 5 pontos de magia para imbuir um item com esta runa.  A cada 5 pontos de magia gastos para imbuir o poder desta runa a um objeto ganha mais um uso da Habilidade fornecida por ela."
              },
              {
                "nome": "O personagem aprende a seguinte runa: Runa de Ataque   (Runa)(Ação)",
                "descricao": " Ao imbuir essa runa em um equipamento, o feiticeiro o encanta com o efeito desta runa. Ao encantar o equipamento, o feiticeiro pode ativar o objeto e encantar sua arma com dano sombrio, divino ou arcano no lugar do dano original. Efeito com duração de 1 hora. Custa 5 pontos de magia para imbuir um item com esta runa.  A cada 5 pontos de magia gastos para imbuir o poder desta runa a um objeto ganha mais um uso da Habilidade fornecida por ela."
              }
            ]
          },
          {
            "nome": "Elemental",
            "descricao": "Escolha entre as opções ",
            "manobras": [
              {
                "nome": "O personagem ganha um bônus de 1 ponto em Combate Arcano, Arcanismo, Natureza e aprende o seguinte feitiço:  Ataque elemental (Feitiço) (2 Ações)",
                "descricao": "Dispara um jato de um elemento a sua escolha que causa 2d10 de dano do elemento. Custa 4 pontos de magia. Dano de gelo tem 40% de chance de aplicar um nível de Congelado. Dano de fogo tem a mesma chance de aplicar  um nível de queimando."
              },
              {
                "nome": "O personagem ganha um bônus de 1 ponto em Arcanismo, Natureza e aprende o seguinte feitiço:Dominar elemento (Feitiço) (2 Ações)",
                "descricao": " Ao usar esse feitiço o feiticeiro pode usar uma das opções abaixo:Criar pequenas rajadas de vento capazes de abrir portas e janelas, mas não tem efeito em criaturas. Mover 1 metro cúbico de terra solta a cada 6 segundos.Acender uma fogueira, vela, tocha e qualquer combustível com chamas.Controlar até 1 metro cúbico de água, podendo modelar sua forma  e sua cor, e congelar pequenas porções dessa água (100 mililitros a cada 6 segundos). Acender estalos de eletricidade que causam flashes de luz. Esses flashes têm 50% de chance de cegar uma criatura por 6 segundos."
              },
              {
                "nome": "O personagem aprende o seguinte feitiço:  Armadura Elemental(Feitiço) (3 Ações)",
                "descricao": " O feitiço cria uma armadura de um dos cinco elementos e fornece 5 pontos de vida temporário. Custa 2 pontos de magia e custa 2 pontos para cada 5 pontos de vida a mais."
              }
            ]
          },
        ]
      }
    return (
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
            <Box sx={{ width: "80%", mx: "auto" }}>
                {/* Título e Descrição */}
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                    <img src={feiticeiro} style={{ width: "30%", height: '30%' }} alt="Imagem do Combatente" />
                    <Box sx={{ width: "60%", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography className="boxTextTitle" variant="h3" gutterBottom>
                            {feiticeiroSkillsData.titulo}
                        </Typography>
                        <Typography className="bigBoxTextClasses" paragraph sx={{ textAlign: 'justify' }}>
                            {feiticeiroSkillsData.descricao}
                        </Typography>
                    </Box>

                </Box>
                <Typography variant="h4" className="boxTextTitle" sx={{ my: 3 }}>
                    Habilidade de Classe
                </Typography>
                {/* Renderizar habilidade */}
                <HabilidadeDeClasseAcordion skill={feiticeiroSkillsData.habilidade} />
                <Typography variant="h4" className="boxTextTitle" sx={{ my: 3 }}>
                    Regalias
                </Typography>
                {/* Mapear regalias */}
                {feiticeiroSkillsData.regalias.map((regalia, index) => (
                    <PerkAccordion key={index} skill={regalia} />
                ))}
            </Box>
        </Box>
    );
}

export default FeiticeiroPage;