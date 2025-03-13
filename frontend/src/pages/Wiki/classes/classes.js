import React, { useState } from 'react';
import { Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./classes.css";
import diagram from "../../../assets/images/classesDiagram.png";
import classes from "../../../assets/images/classes.png";
import aprendiz from "../../../assets/images/aprendiz.png";
import novice from "../../../assets/images/noviço.png";

const ClassesPage = () => {
  const [thisvalue, thisThisvalue] = useState(0);

  const handleTABChange = (event, newValue) => {
    thisThisvalue(newValue);
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
  const novicoSkillsData = {

    "titulo": "Noviço",
    "atributos": {
      "vida": 4,
      "estamina": 2,
      "magia": 0
    },
    "descricao": "O Noviço é um estudante devoto, moldado pela fé e pela busca constante de crescimento espiritual. Sua jornada é marcada por disciplina e serviço, onde cada ação, por mais simples que seja, reflete o desejo de agradar sua divindade e cumprir seu destino sagrado. Em um mundo povoado por magos e guerreiros, ele se destaca pela sua conexão com o divino, acreditando que a verdadeira força vem da devoção, e não da carne ou da magia pura. Ele é portador de milagres, capaz de curar, proteger e banir o mal com sua fé inabalável, sempre empenhado em tornar o mundo mais puro e justo.A habilidade de curar vai além de restaurar pontos de vida; para o Noviço, cada ato de cura é um sacrifício e um testemunho de sua fé. Seu corpo e sua magia são os canais pelos quais os milagres de sua divindade fluem, oferecendo auxílio tanto a amigos quanto a necessitados. No entanto, esse poder sempre exige algo em troca, pois está entrelaçado com o serviço que ele presta. Quando necessário, o Noviço sacrifica suas próprias forças, seja por meio de rituais de fé ou martírio, para garantir a proteção de seus aliados. Sua devoção é sua principal fonte de poder, e ele a utiliza com sabedoria, buscando sempre se aproximar mais de seu deus.Sua conexão com o divino o capacita a realizar feitos extraordinários, como purificar o mundo com o poder sagrado ou banir criaturas das trevas com sua luz divina. Mesmo diante de desafios imensos, o Noviço se mantém firme, sendo a personificação da resistência espiritual. O uso de milagres e bênçãos vai além de uma simples ferramenta; é a expressão de sua crença, seja para proteger, curar ou até para combater os inimigos das forças divinas. Ao invocar seus milagres, ele se torna um farol de esperança para seus aliados e uma força imbatível contra o mal.Embora sua força física não se iguale à de outros combatentes ou magos, o Noviço sabe que a verdadeira magia reside em sua fé e na capacidade de servir. Ele nunca busca glória pessoal, mas age com a certeza de que cada ato que realiza é uma manifestação do poder divino que o sustenta. Seu papel no campo de batalha é claro: curar, proteger e, quando necessário, sacrificar-se para assegurar a vitória de seus aliados. Ele é um pilar de luz em um mundo sombrio, confiando plenamente que a força de sua fé é a chave para superar qualquer adversidade.",
    "habilidade": {
      "nome": "Anticorrupção",
      "descricao": "Toda cura conjurada, como um milagre, em um alvo morto vivo ou demônio causa o mesmo valor em dano sagrado ao invés de curá-lo. O noviço pode usar uma habilidade de cura para causar dano  nos seres citados anteriormente sem custo de pontos de magia uma vez por combate. Todo milagre causa dano sagrado.",
      "habilidades": [

      ]
    },
    "regalias": [
      {
        "nome": "Servitude (Habilidade de classe Secundária)",
        "descricao": " Todo Noviço possui uma divindade a qual serve, dependendo se o deus é mau, bom ou neutro o noviço ganha um bônus:",
        "manobras": [
          {
            "nome": "Deus bom:",
            "descricao": "2 vezes por dia o noviço pode curar uma criatura que não seja a si mesmo num valor igual a 2d6 pontos de vida. Essa cura pode ser feita dentro de combate ao mesmo tempo que outra ação que não cause dano. Aumentando para 3d6  ao atingir nível 7."
          },
          {
            "nome": "Deus mau:",
            "descricao": " Deus mau: Uma vez por dia o noviço pode sacrificar um animal ou outro ser vivo para recuperar 8 pontos de magia através de uma prece de 10 minutos após matar a criatura. Se matar uma criatura em combate pode realizar o ritual em até 1 hora após o ocorrido. Alternativamente pode se curar em 1d12 pontos imediatamente após matar uma criatura dentro ou fora de combate. Esse valor aumenta para o valor fixo de 12 e o rolamento para 3d6  ao atingir nível 7."
          },
          {
            "nome": "Deus neutro: ",
            "descricao": " 3 vezes por dia o noviço pode realizar uma prece, com custo de duas ações em combate, recuperando 1d6+1 pontos de seus próprios pontos de vida e magia . Aumenta para 2d6+2 no nível 7."
          }
        ]
      },
      {
        "nome": "Oração de Luz",
        "bônus": [
          { "tipo": "Medicina", "valor": 3 },
          { "tipo": "Teologia", "valor": 3 },
          { "tipo": "Intuição", "valor": 3 },
        ],
        "manobras": [
          {
            "nome": "Cura (2 Ações)",
            "descricao": "Cura uma criatura em 1d6+2 pontos de vida. O alvo da cura deve estar a até 1,5 metros de distância do noviço. Custa 2 pontos de magia. Aumenta a cura em 1d6 para cada 2 pontos de mágica adicionais ao conjurar este milagre."
          },
          {
            "nome": "Abençoar ( 2 Ações)",
            "descricao": "Abençoa uma criatura, concedendo 1,5m de movimento extradicional e também vantagem nos rolamentos de ataque. Esse buff dura por 30 segundos, o que corresponde a 5 rodadas em combate. Custa 6 pontos de magia. Pode abençoar uma criatura adicional a cada 3 pontos de magia adicionais ao conjurar este milagre."
          },
          {
            "nome": "Ataque Guiado (Reação)",
            "descricao": "Aumenta a chance de acerto de uma criatura em até 18 metros de distância. O noviço dá vantagem ao rolamento de acerto de ataque destacando com luz divina um ponto fraco na defesa do alvo do ataque. Pode usar esse milagre 4 vezes ao dia."
          }
        ]
      },
      {
        "nome": "Oração de Banimento",
        "bônus": [
          { "tipo": "Ocultismo", "valor": 3 },
          { "tipo": "Combate Arcano", "valor": 3 }
        ],
        "manobras": [
          {
            "nome": "Marca Divina (2 Ações)",
            "descricao": "Cria uma marca na criatura alvo permitindo causar 1d8 pontos de dano sagrado neste turno e nos turnos seguintes, durante 10 rodadas. Para causar o dano no turno seguinte à execução do Milagre, é preciso realizar uma ação de ataque de Combate Arcano. Custa 5 pontos de magia. Alcance 18 metros."
          },
          {
            "nome": "Chama Sagrada (Ação)",
            "descricao": "Uma oração faz com que uma chama sagrada queime o alvo, causando 1d6 pontos de dano sagrado. Custa 1 ponto de magia. Aumenta em 1d8 de dano para cada 2 pontos de magia adicionais ao conjurar este milagre."
          },
          {
            "nome": "Fonte Divina (2 Ações)",
            "descricao": "Uma oração faz com que o noviço vire uma fonte de energia sagrada e todos mortos-vivos e demônios em até 12 metros são obrigados a usar sua reação para mover até sua velocidade de movimento para o mais longe que conseguir do noviço. Esse milagre tem 80% de chance de sucesso e caso falhe o noviço recupera uma de suas ações usadas para esta habilidade. Pode usar esse milagre 2 vezes ao dia. Se estiver com 0 usos deste milagre, o noviço pode gastar 10 pontos de magia para conjurar seu efeito."
          }
        ]
      },
      {
        "nome": "Oração de Proteção",
        "bônus": [
          { "tipo": "Fortitude", "valor": 2 },
          { "tipo": "Percepção", "valor": 2 }
        ],
        "manobras": [
          {
            "nome": "Santuário (Ação)",
            "descricao": "Cria um campo de proteção sagrado em volta do alvo (podendo ser o próprio noviço), aumentando em 2 seu Valor de Defesa, por uma rodada. Custa 4 pontos de magia. Ao conjurar o milagre é possível aumentar sua duração em uma rodada para cada 2 pontos de magia adicionais."
          },
          {
            "nome": "Farol (2 Ações)",
            "descricao": "A oração gera uma luz tão forte que pode ser vista a alguns quilômetros de distância. Todas as criaturas, exceto seus aliados, que estiverem em até 27m ficam cegos até o fim de seu próximo turno. A luz dura até o fim de seu turno atual (6 segundos). Custa 8 pontos de magia."
          },
          {
            "nome": "Restauração (2 Ações)",
            "descricao": "O noviço faz uma oração e toca o seu alvo para tirar uma das seguintes condições: Envenenado, um nível de Congelado, um nível de Queimando e um nível de Cansado. Pode usar esse milagre 4 vezes ao dia."
          }
        ]
      },
      {
        "nome": "Oração de Preservação",
        "bônus": [
          { "tipo": "Medicina", "valor": 3 },
          { "tipo": "Teologia", "valor": 3 },
          { "tipo": "Intuição", "valor": 3 }
        ],
        "manobras": [
          {
            "nome": "Estabilizar (Ação)",
            "descricao": "A oração estabiliza um personagem à Beira da Morte e prolonga seu tempo de duração para 10 o número de falhas necessárias para levar o alvo à morte por dano. Pode usar esse milagre 4 vezes ao dia."
          },
          {
            "nome": "Resistência (Reação)",
            "descricao": "A oração cria uma resistência instantânea que protege o alvo de um ataque ou efeito. O alvo da oração recebe apenas metade do dano de um ataque ou um efeito. Custa 3 pontos de magia."
          },
          {
            "nome": "Lente Investigativa (Ação)",
            "descricao": "Um noviço ativa uma benção a até 3 metros de distância de si e todos dentro deste raio que tentam mentir têm sua fala cortada e recebem 1d4 pontos de dano. Dura por 10 minutos. Pode usar esse milagre 4 vezes ao dia."
          }
        ]
      },
      {
        "nome": "Noviço(a) de Combate",
        "descricao": "Proficiência em Armaduras Leves e Médias. Proficiência em Escudo Simples. Aumento de 5 pontos em sua vida máxima."
      },
      {
        "nome": "Intervenção (Reação)",
        "descricao": "O personagem pode realizar uma oração e pedir para sua divindade para que mude o resultado de uma ação, obrigando que o rolamento de um ataque, ou outra ação que use o rolamento de d20, seja refeito. Após refeito o noviço escolhe o novo ou o antigo rolamento. Custa 3 pontos de magia."
      },
      {
        "nome": "Abençoar Arma (Ação)",
        "descricao": "Realiza uma oração que abençoa uma arma e muda o seu dano para a propriedade sagrado por 10 rodadas. Apenas uma arma por vez. Custa 1 ponto de Magia."
      },
      {
        "nome": "Esfera Divina (Ação) (Milagre)",
        "descricao": "Realiza uma oração para acumular energia sagrada em 1 esfera, podendo acumular até 3 esferas por vez. Cada esfera dura uma hora e pode ser entregue a um aliado em até 6 m. Durante esse tempo, a esfera pode projetar luz em até 3 metros de raio ao seu redor e protege seu portador contra maldições, magias ou feitiços de controle mental. Essa proteção vem na forma de 10% de penalidade, na chance de sucesso de uma Habilidade que tome o portador das esferas como alvo, por esfera. Uma vez que uma ou mais esferas sejam usadas dessa maneira, elas desaparecem, mesmo que ainda não tenha acabado sua duração. Custa 2 pontos de Magia para conjurar uma esfera e 2 pontos de Magia adicional para conjurar cada esfera adicional."
      },
      {
        "nome": "Martírio (2 Ações)",
        "descricao": "O personagem pode orar fervorosamente para que sua capacidade mágica se recupere, a custo de parte de sua vitalidade para isso. Recuperando 1 ponto de mana para cada ponto de vida sacrificado, com um máximo de 5 pontos. Pode realizar essa ação uma vez por descanso curto."
      },
      {
        "nome": "Dividir a Dor (Reação)",
        "descricao": "Ao ver uma criatura que esteja com a condição restringido, paralizado, atordoado ou incapacitada, o personagem pode dividir o dano de um ataque que ela sofra. Ao dividir o dano, o personagem define quantos pontos de dano quer tomar do valor total."
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
      <Tabs value={thisvalue} onChange={handleTABChange} aria-label="Info and Classes Tabs">
        <Tab label="Informações Gerais" className="tabs" />
        <Tab label="Aprendiz" className="tabs" />
        <Tab label="Classes Primárias" className="tabs" />
      </Tabs>

      {/* Info MUI Tab Content */}
      {thisvalue === 0 && (
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
      {thisvalue === 1 && (
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
      {thisvalue === 2 && (
        <Box>
          <Typography className="MainTitleC" variant="h3" sx={{ my: 8 }}>
            Classes primárias
          </Typography>
          <Box className="bigBoxTextClasses" sx={{ width: "80%", mx: 'auto', my: 4 }}>
            Em Lâmina do Oculto (LDO), a classe primária representa a segunda etapa da evolução do personagem, após o desenvolvimento inicial. Ao alcançar o nível 3, o personagem pode começar a escolher sua classe primária, mas para isso, é necessário que ele tenha a regalia de aprendiz correspondente à classe que deseja seguir. As classes primárias trazem habilidades poderosas e específicas, mas é importante entender como elas funcionam no sistema de regalias.

            Cada classe primária pode incluir uma ou mais habilidades, mas, para adquirir cada habilidade adicional dentro de uma classe, o personagem precisará comprar a regalia correspondente à habilidade desejada. Isso significa que, ao escolher uma classe primária, o jogador pode precisar investir em várias regalias ao longo da evolução do personagem, conforme as habilidades se tornam acessíveis. Cada nova habilidade dentro de uma classe primária é tratada como uma compra separada.

            Além disso, algumas classes primárias têm uma ordem específica em que precisam ser compradas. Ou seja, é necessário seguir a sequência definida para desbloquear novas regalias e habilidades dentro da classe. Isso reflete a progressão natural do desenvolvimento do personagem e assegura que ele construa sua experiência dentro da classe de forma coerente.

            Em Lâmina do Oculto, o conceito de multiclasse é totalmente permitido. O personagem pode escolher outras classes primárias, mas sempre precisa ter a regalia de aprendiz correspondente à classe que deseja explorar. Isso proporciona flexibilidade para o jogador, permitindo que ele experimente diferentes caminhos de desenvolvimento, desde que tenha os requisitos necessários.

            Essa estrutura de regalias e classes primárias cria uma abordagem progressiva, permitindo que o personagem cresça de maneira controlada, mas ao mesmo tempo aberta a diferentes possibilidades de personalização.
          </Box>
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
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ width: "80%", mx: "auto" }}>
              {/* Título e Descrição */}
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                <Box sx={{ width: "60%", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Typography className="boxTextTitle" variant="h3" gutterBottom>
                    {novicoSkillsData.titulo}
                  </Typography>
                  <Typography className="bigBoxTextClasses" paragraph sx={{ textAlign: 'justify' }}>
                    {novicoSkillsData.descricao}
                  </Typography>
                </Box>
                <img src={novice} style={{ width: "30%", height: '30%' }} alt="Imagem do Combatente" />
              </Box>
              <Typography variant="h4" className="boxTextTitle" sx={{ my: 3 }}>
                Habilidade de Classe
              </Typography>
              {/* Renderizar habilidade */}
              <HabilidadeDeClasseAcordion skill={novicoSkillsData.habilidade} />
              <Typography variant="h4" className="boxTextTitle" sx={{ my: 3 }}>
                Regalias
              </Typography>
              {/* Mapear regalias */}
              {novicoSkillsData.regalias.map((regalia, index) => (
                <PerkAccordion key={index} skill={regalia} />
              ))}
            </Box>
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
