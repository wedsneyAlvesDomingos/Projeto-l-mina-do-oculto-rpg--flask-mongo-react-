import React, { useState } from 'react';
import { Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./classes.css";
import diagram from "../../../assets/images/classesDiagram.png";
import classes from "../../../assets/images/classes.png";
import aprendiz from "../../../assets/images/aprendiz.png";

const ClassesPage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const aprenticeSkillsData = {
    titulo: "Aprendiz",
    descricao: "A jornada de um herói nem sempre começa com glória e reconhecimento. No vasto e implacável mundo, onde reinos se erguem e caem e os perigos espreitam nas sombras, aqueles que buscam se aventurar precisam mais do que coragem — precisam de preparo. É nesse vácuo de inexperiência que surge a figura do Aprendiz.Nem todos nascem nobres guerreiros, poderosos magos ou astutos exploradores.Muitos são apenas jovens sedentos por conhecimento, sobreviventes forçados a trilhar caminhos incertos, ou estudiosos que, diante da realidade, percebem que a teoria, sozinha, não os salvará.O Aprendiz é aquele que entende que antes de se tornar mestre, precisa aprender; antes de empunhar uma lâmina com destreza, deve compreender seu peso; antes de lançar feitiços que dobram a realidade, precisa sentir a magia pulsar dentro de si.Seja empunhando uma espada, curando feridos com bênçãos sagradas ou desbravando mistérios ocultos, o Aprendiz dá seus primeiros passos rumo ao desconhecido.Ele não é um especialista, mas também não é um amador indefeso.Seu papel no mundo é crescer, explorar e se moldar ao destino que escolheu — ou ao que o destino escolheu para ele.Mas a trilha do Aprendiz não é apenas feita de livros e lições simples. O mundo é um mestre cruel, e cada cicatriz, cada batalha perdida, cada erro cometido esculpe sua jornada. É na forja da experiência que o Aprendiz se torna algo mais. Alguns seguirão o caminho do aço, tornando-se guerreiros temidos. Outros dominarão os segredos da magia, dobrando as forças arcanas à sua vontade. Alguns escolherão a diplomacia, a exploração ou a fé, guiando-se não pela lâmina, mas pela palavra, pelo conhecimento ou pelo instinto.Independentemente do caminho escolhido, o Aprendiz carrega uma verdade inabalável: ele ainda não é um mestre, mas já deixou de ser um mero iniciante. E, no fim, o que define seu destino não é de onde veio, mas para onde está indo.",
    habilidades: [
      {
        nome: "Combatente Aprendiz",
        descricao: "Estudante do combate marcial",
        detalhes: [
          "1 ponto em Força, Fortitude ou Destreza",
          "1 ponto em Combate Corpo a Corpo ou Combate À Distância",
          "Proficiência em Armas Marciais",
          "Proficiência em Armaduras Leves e Médias",
          "Proficiência em Escudo Simples",
          "Recuperar Fôlego (Ação de turno completo): O personagem pode gastar uma ação de turno completo para recuperar 4 pontos de vida. Custa 2 pontos de magia. Por mais 2 pontos de magia, recupera 4 pontos de estâmina na mesma ação."
        ]
      },
      {
        nome: "Noviço(a) Aprendiz",
        descricao: "Iniciado(a) no caminho divino",
        detalhes: [
          "1 ponto em Teologia, Arcanismo ou Medicina",
          "1 ponto em Combate Arcano ou Combate Corpo a Corpo ou Combate à Distância",
          "Aprende os Milagres:",
          "Abençoar Água (Milagre) (Ação): Abençoa uma pequena porção de água, tornando-a sagrada. Essa água fica abençoada por 1 hora, e o noviço aprendiz pode acumular até 5 frascos, ou outro vasilhame, pequenos por vez. Essa água pode ser usada para encantar uma arma por um minuto, deixando-a com o status sagrado. Custa 1 ponto de magia para abençoar um frasco. Tem a opção de, ao invés de encantar uma arma, ser jogada em um morto-vivo causando 1d12 pontos de dano. Custa 3 pontos de magia.",
          "Facilitar Cura (Milagre): O personagem gasta 10 minutos operando esse Milagre para curar em até 4d6 pontos de vida de até duas criaturas por vez. Custa 2 pontos de magia.",
          "Tocha Sagrada (Milagre) (Ação): Toca um item com energia sagrada, que brilha com luz completa em até 3 metros e meia luz nos 3 metros seguintes. Mortos-vivos, que estejam diante dessa luz, ficam cegos no primeiro turno de combate, desde que estejam dentro da área da luz. Dura 1 hora. Custa 1 ponto de magia."
        ]
      },
      {
        nome: "Iniciado(a) Aprendiz",
        descricao: "Estudante de magias arcanas",
        detalhes: [
          "1 ponto em Arcanismo, Ritualismo ou Apuração de Itens Mágicos",
          "1 ponto em Combate Arcano",
          "Aprende as Magias:",
          "Míssil Arcano (Magia)(2 Ações): Dispara um projétil de energia arcana que causa 1d4 de dano. Alcance 36 metros. Custa 2 pontos de magia por míssil lançado, máximo de até 5 mísseis por vez.",
          "Detectar Magia (Magia)(Ação): Seus olhos brilham com poder arcano e o personagem consegue enxergar poder arcano emanando de um ambiente, objeto ou pessoa. Custa 2 pontos de magia e tem alcance de até 9 metros. Custa 4 pontos de magia e uma ação adicional para saber qual escola de magia ou se é um feitiço, ritual, ruína ou maldição.",
          "Iluminação Arcana (Magia)(Ação): Toca um item ou sua própria mão, que brilha com luz completa em até 3 metros e meia luz nos 3 metros seguintes. Dura 1 hora. Custa 1 ponto de magia."
        ]
      },
      {
        nome: "Feiticeiro(a) Aprendiz",
        descricao: "Iniciado(a) nas artes do ocultismo",
        detalhes: [
          "1 ponto em Ocultismo ou Ritualismo",
          "1 ponto em Combate Arcano",
          "Aprende os Feitiços:",
          "Orbe Caótico (Feitiço) (2 Ações): Dispara um orbe de um elemento aleatório que causa 2d6 pontos de dano (Rola 1d6: 1 Fogo, 2 Gelo, 3 Terra, 4 Ar, 5 Raio e 6 Escolha). Custa 2 pontos de magia.",
          "Azaralhar (Feitiço) (2 Ações): Embaralha os sentidos do seu alvo, que esteja em até 9 metros, fazendo-o ficar Atordoado até o próximo turno. Tem 30% de chance de sucesso e custa 4 pontos de magia. Mais 5% de chance de sucesso para cada ponto de magia gasto além dos 4 pontos iniciais.",
          "Luz Guia (Feitiço) (Ação): Foca sua energia na própria mão, que brilha com luz completa em até 3 metros e meia luz nos 3 metros seguintes. Dura 1 hora. Custa 1 ponto de magia."
        ]
      }
      ,
      {
        nome: "Diplomata Aprendiz",
        descricao: "Iniciado nas artes da persuasão e negociação",
        detalhes: [
          "2 pontos em Persuasão ou Enganação",
          "1 ponto em Negociação",
          "2 pontos em Sedução e Intimidação",
          "Aprende a Habilidade:",
          "Barganhar: Um Diplomata pode fazer um teste de negociação para tentar descontos em preços de serviços como hospedagem, mas não na compra de produtos como um mercador. Um diplomata pode usar essa habilidade uma vez por pessoa dentro do período de uma semana.",
          "Rolamento de Negociação: Porcentagem de desconto",
          "0 a 10: 5%",
          "11 a 15: 5%",
          "16 a 20: 15%"
        ]
      }
      ,
      {
        nome: "Explorador Aprendiz",
        descricao: "Iniciado nas artes de rastreamento e sobrevivência",
        detalhes: [
          "2 pontos em Rastreamento ou Investigação",
          "1 ponto em Sobrevivência e Navegação",
          "2 pontos em Percepção ou Furtividade",
          "Proficiente com kit de arrombamento",
          "Aprende a Habilidade:",
          "Visão para Abrigo: Um explorador aprendiz consegue procurar um abrigo natural para proteger dos elementos. Se for calor demais que possa causar exaustão, ele consegue achar um lugar para refrescar ou isolar do calor, ou então, se for frio demais, um abrigo quente para não sofrer com a temperatura. A chance de sucesso é de 80%. Além disso, um explorador aprendiz tem um bônus de +2 em testes de sobrevivência para achar comida e água caso exista."
        ]
      },
      {
        nome: "Acadêmico Aprendiz",
        descricao: "Estudante das ciências e das artes do conhecimento",
        detalhes: [
          "2 pontos em História ou Intuição",
          "1 ponto em Jurisprudência e Teologia",
          "2 pontos em Medicina ou Natureza",
          "Aprende a Habilidade:",
          "Já Li Sobre Isso: Um acadêmico tem +2 em qualquer rolamento de conhecimento. Um acadêmico também recebe +3 em testes de persuasão que o ajudem a entrar em uma biblioteca, templo ou centro acadêmico com conhecimento registrado de alguma forma."
        ]
      }


    ]
  };
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
            "nome": "Guarda de Duelo",
            "descricao": "Recebe vantagem em rolamentos de ataque e 1 ponto de Defesa, desde que apenas um inimigo esteja à distância corpo a corpo. Custa 3 pontos de Estâmina e dura até o fim do turno."
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
            "nome": "Desarmar",
            "descricao": "Ao realizar um ataque de Combate a distância, pode escolher desarmar o alvo. A chance de desarme é de 40%, e a arma cai a 3 metros do alvo. Custa 4 pontos de Estâmina."
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
            "nome": "Ponto Fraco",
            "descricao": "Causa 1d6 pontos de dano extra em um ataque, se estiver flanqueando o inimigo. Aumenta em 1d6 de dano ao gastar 2 pontos de Estâmina adicionais."
          }
        ]
      },
      {
        "nome": "Combate Defensivo",
        "bônus": [
          { "tipo": "Fortitude", "valor": 1 },
          { "tipo": "Agilidade", "valor": 1 }
        ],
        "manobras": [
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
            "nome": "Estocada",
            "descricao": "Ao atacar com uma arma de haste, o combatente pode estender seu alcance em 1,5 metros. Custa 2 pontos de Estâmina."
          }
        ]
      },
      {
        "nome": "Combate Desarmado",
        "bônus": [
          { "tipo": "Combate Corpo a Corpo", "valor": 1 },
          { "tipo": "Força ou Destreza", "valor": 1 }
        ],
        "manobras": [
          {
            "nome": "Derrubar ou Agarrar",
            "descricao": "Ao realizar um ataque desarmado, o combatente pode derrubar ou agarrar o inimigo. A chance de sucesso é de 50%. Custa 4 pontos de Estâmina."
          }
        ]
      },
      {
        "nome": "Combate com Armas Improvisadas",
        "descricao": "O combatente pode usar objetos diversos como armas improvisadas. O dano e habilidades variam de acordo com o objeto, com durabilidade e efeitos especiais."
      },
      {
        "nome": "Combate com Duas Armas",
        "descricao": "O combatente pode atacar com uma arma secundária sem penalidade, desde que ambas as armas sejam leves. Custa 1 ponto de Estâmina por rodada para manter essa postura."
      },
      {
        "nome": "Combate com Arma de Acuidade",
        "descricao": "O combatente pode usar Destreza para calcular o dano de armas corpo a corpo com a propriedade acuidade. Recebe 1d6 de dano extra ao usar a manobra 'Ponto Fraco'."
      },
      {
        "nome": "Recuperar Fôlego Melhorado",
        "descricao": "Permite recuperar 3d4 pontos de vida e, por mais 2 pontos de magia, também recuperar 2d4 pontos de Estâmina. Custa 2 pontos de magia."
      },
      {
        "nome": "Golpe Explosivo",
        "descricao": "Causa 1d6 pontos de dano adicionais ao realizar um ataque. Custa 2 pontos de Estâmina."
      },
      {
        "nome": "Levantar Escudo",
        "descricao": "Levanta o escudo como reação a um ataque, causando desvantagem em ataques direcionados ao combatente até o início de seu próximo turno. Custa 2 pontos de Estâmina."
      },
      {
        "nome": "Recarga Oportuna",
        "descricao": "Permite recarregar uma arma de recarga enquanto usa uma ação de movimento. Custa 1 ponto de Estâmina."
      }
    ]
  }

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


  return (
    <Box sx={{ minHeight: '700px', width: '100%' }} >
      <Tabs value={value} onChange={handleChange} aria-label="Info and Classes Tabs">
        <Tab label="Informações Gerais" className="tabs" />
        <Tab label="Aprendiz" className="tabs" />
        <Tab label="Classes Primárias" className="tabs" />
      </Tabs>

      {/* Info MUI Tab Content */}
      {value === 0 && (
        <Box sx={{ width: "80%", mx: 'auto', my: 4 }}>
          <Typography variant="h3" className="boxTextTitle">
            CLASSES
          </Typography>
          <Grid container spacing={1} sx={{ my: 4 }}>
            <Grid item xs={6} sx={{ p: 2, display: 'flex', flexFlow: 'column nowrap', justifyContent: 'space-between' }}>
              <Typography variant="h5" className="bigBoxTextClasses">
                As classes deste sistema evoluem de maneira simples e são bem familiares para todos que gostam de rpg e fantasia. Quando um jogador de ttrpg decide jogar uma campanha é fundamental que as opções disponíveis possam atender o maior número de expectativas possíveis. Pensando nisso o sistema de classe do LDO foi pensado para uma progressão tanto vertical quanto horizontal, a depender das decisões do cliente. Para escolher uma classe primária, o jogador deve começar com a classe "Aprendiz" e escolher a Regalia de Aprendiz condizente com a classe primária desejada. Além disso, o personagem deve atingir pelo menos o nível 3 para poder escolher uma classe primária. As classes primárias devem ser escolhidas antes de qualquer classe secundária. O jogador começa com a classe "Aprendiz", e ao atingir o nível 3, pode optar por uma classe primária. O diagrama abaixo ilustra como funciona o processo de escolha das classes, a evolução das Regalias e a progressão de níveis.
              </Typography>
              <Typography variant="body1" className="bigBoxTextClasses">
                Exemplo: “Pablo criou uma nova ficha e deseja jogar como um noviço como sua classe primária. Para isso, ao começar como aprendiz, ele deve escolher a Regalia de classe Aprendiz de Noviço(a). Assim, no nível 3, ele pode escolher a classe Noviço(a) e selecionar as Regalias de classe associadas.”
              </Typography>
              <Typography variant="body1" className="bigBoxTextClasses">
                O personagem pode comprar Regalias através de pontos de Regalia. Ao subir de nível, o personagem recebe dois pontos, que podem ser gastos em qualquer Regalia que tenha acesso, desde que tenha pontos suficientes. Se uma habilidade não tiver um número ao lado, a Regalia custa apenas um ponto. Caso tenha um número entre parênteses, a Habilidade custa o valor desse número em pontos de Regalia.
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ p: 2, display: 'flex', flexFlow: 'column nowrap', justifyContent: 'space-between' }}>
              <Box sx={{ mx: 'auto', width: '30%' }}>
                <img src={classes} alt="Classes Image" />
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', my: 4, justifyContent: 'space-between', alignItems: 'center' }}>
            <Grid item xs={3} sx={{ width: '55%' }}>
              <Box>
                <img src={diagram} alt="Classes Diagram" style={{ width: '100%' }} />
              </Box>
            </Grid>
            <Grid item xs={6} sx={{ width: '40%' }}>
              <Typography variant="h5" className="boxTextTitle">
                Aprendiz
              </Typography>
              <Typography variant="body1" className="esteban">Todos personagens começam de algum lugar!</Typography>
              <Typography variant="h5" className="boxTextTitle">
                COMBATENTE
              </Typography>
              <Typography variant="body1" className="esteban">Especialização (Níveis em uma ou duas classes primárias)</Typography>
              <ul>
                <li>Cavaleiro(a) (10 com)</li>
                <li>Assassino(a) (10 com)</li>
                <li>Caçador(a) (10 com)</li>
                <li>Monge (7 com/3 nov)</li>
                <li>Bárbaro(a) (10 com)</li>
              </ul>
              <Typography variant="h5" className="boxTextTitle">
                NOVIÇO
              </Typography>
              <Typography variant="body1" className="esteban">Especialização (Níveis em uma ou duas classes primárias)</Typography>
              <ul>
                <li>Sacerdote (10 nov)</li>
                <li>Exorcista (10 nov)</li>
                <li>Inquisidor (5/5 com/nov)</li>
                <li>Profano (5/5 fei/nov)</li>
              </ul>
              <Typography variant="h5" className="boxTextTitle">
                INICIADO
              </Typography>
              <Typography variant="body1" className="esteban">Especialização (Níveis em uma ou duas classes primárias)</Typography>
              <ul>
                <li>Mago (10 ini)</li>
                <li>Professor (10 ini)</li>
                <li>Erudito (5/5 ini/nov)</li>
                <li>Invocador (5/5 ini/fei)</li>
              </ul>
              <Typography variant="h5" className="boxTextTitle">
                FEITICEIRO
              </Typography>
              <Typography variant="body1" className="esteban">Especialização (Níveis em uma ou duas classes primárias)</Typography>
              <ul>
                <li>Metamorfo (10 fei)</li>
                <li>Elementalista (10 fei)</li>
                <li>Xamã (10 fei)</li>
                <li>Bruxo (10 fei)</li>
                <li>Caçador(a) de Demônios (3/7 fei/com)</li>
              </ul>
            </Grid>
          </Box>
        </Box>
      )}

      {/* Aprendiz Tab Content (Empty for now) */}
      {value === 1 && (
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ width: "80%", mx: "auto", }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }} >
              <Box sx={{ width: "60%", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography className="boxTextTitle" variant="h3" gutterBottom >
                  {aprenticeSkillsData.titulo}
                </Typography>
                <Typography className="bigBoxTextClasses" paragraph sx={{ textAlign: 'justify' }}>{aprenticeSkillsData.descricao}</Typography>
              </Box>
              <img src={aprendiz} style={{ width: "30%", height: '30%' }}></img>
            </Box>

            {aprenticeSkillsData.habilidades.map((skill, index) =>
              (<SkillAccordion key={index} skill={skill} />)
            )}
          </Box>

        </Box>
      )}

      {/* Combatente Tab Content (Empty for now) */}
      {value === 2 && (
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
              <img src={aprendiz} style={{ width: "30%", height: '30%' }} alt="Imagem do Combatente" />
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
      )}


      <Box sx={{ background: '#40150A', p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography sx={{ color: '#fff', fontSize: '10px' }}>© 2024 Lâmina do oculto. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default ClassesPage;
