import React, { useState } from 'react';
import { Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./classes.css";
import diagram from "../../../assets/images/classesDiagram.png";
import classes from "../../../assets/images/classes.png";
import aprendiz from "../../../assets/images/aprendiz.png";
import novice from "../../../assets/images/noviço.png";
import iniciado from "../../../assets/images/iniciado2.png";
import feiticeiro from "../../../assets/images/feiticeiro.png";
import cavaleiro from "../../../assets/images/cavaleiro.png";
import barbaro from "../../../assets/images/barbaro.png";
import cacador from "../../../assets/images/caçador.png";
import assassino from "../../../assets/images/assassino.png";
import mago from "../../../assets/images/mago.png";
import professor from "../../../assets/images/professor.png";
import sarcedote from "../../../assets/images/sarcedote.png";
import exorcista from "../../../assets/images/exorcista.png";
import xama from "../../../assets/images/xama.png";
import elementalista from "../../../assets/images/elementalista.png";
import bruxo from "../../../assets/images/bruxo.png";
import metamorfo from "../../../assets/images/metamorfo.png";

const ClassesPage = () => {
  const [thisvalue, thisThisvalue] = useState(0);

  const handleTABChange = (event, newValue) => {
    thisThisvalue(newValue);
  };
  const regaliaContructor = {
    "nome": "[Nome da Regalia]" || null,
    "tipo": "[Ação | Reação | Passiva]" || null,
    "descricao": "[Descrição detalhada do efeito da regalia]" || null,
    "custoEstamina": "[Valor numérico > 0]" || null,
    "custoMagia": "[Valor numérico]" || null,
    "chanceDeSucesso": "[Valor %]" || null,
    "dano": "[Fórmula de dano, se aplicável]" || null,
    "requisito": "[Condição necessária, se houver]" || null,
    "efeitos": {
      "passivo": "[Efeito contínuo, se houver]" || null,
      "ativo": "[Efeito acionável, se houver]" || null
    },
    "modificadores": {
      "bonusSucesso": "[Bônus de sucesso ou efeito adicional com custo]" || null,
      "usoExtra": "[Condições para usar mais de uma vez na rodada]" || null,
      "duracaoExtra": "[Custo adicional para manter o efeito por mais tempo]" || null
    },
    "bonus": {
      "vidaTemporaria": "[Bônus de vida temporária ou efeito similar]" || null
    },
    "interacoes": {
      "comOutraRegalia": "[Como interage com outras regalias específicas]" || null
    }
  }

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
  const iniciadoSkillsData = {

    "titulo": "Iniciado",
    "atributos": {
      "vida": 2,
      "estamina": 0,
      "magia": 4
    },
    "descricao": "O Iniciado é uma classe focada no domínio da magia arcana, adquirindo o poder de manipular energias místicas desde o início de sua jornada. Este personagem usa sua conexão com as forças arcanas para conjurar magias, inicialmente sem grandes custos, mas com a capacidade de aprender e expandir seus conhecimentos mágicos conforme avança.Embora não possua grande resistência física, o Iniciado compensa isso com sua habilidade de manipular magia de forma precisa e eficaz. A magia é sua principal arma, e os Iniciados são conhecidos por sua flexibilidade na conjuração, podendo usar diversos tipos de focos como varinhas, cajados e outros instrumentos. Ao dominar as artes arcanas, o Iniciado pode liberar poderosas magias, desde ataques devastadores até habilidades de defesa e controle mental. O Iniciado pode utilizar diferentes escolas de magia, cada uma oferecendo habilidades únicas que se complementam ao longo do tempo. Essas escolas incluem Evocação, que permite manipular e lançar feitiços de dano, Abjuração, para proteger a si mesmo e aos outros, Encantamento e Ilusão, para manipular mentes e enganar os sentidos, Telecinese, para mover objetos e afetar a mente de inimigos, Invocação, para trazer entidades e objetos mágicos, e Transmutação, que altera a própria matéria. Cada escola exige comprometimento e aprendizado contínuo, com o Iniciado precisando adquirir Regalias em uma sequência específica para aprimorar suas habilidades. Ao seguir essas rotas mágicas, o Iniciado não apenas se torna um mestre da magia, mas também um estrategista capaz de adaptar suas habilidades às situações que enfrenta. Iniciados(as) usam as mãos para conjurar magias, mas podem usar focos como varinhas, instrumentos, ferramentas ou cajados no lugar das mãos. É necessário um foco ou uma mão livre para conjurar magias. Toda magia causa dano arcano. Cada escola de magia possui uma árvore de Regalias, o iniciado deve comprar essas Regalias na ordem que aparece e não pode comprar a segunda antes de comprar a primeira e por aí vai.",
    "habilidade": {
      "nome": "Magus",
      "descricao": "O iniciado pode conjurar as magias aprendidas através da Regalia “Aprendiz de Iniciado” sem custo de pontos de magia um número de vezes igual ao seu valor de Habilidade de arcanismo. Ao conjurar este determinado número de vezes terá que gastar pontos de magias para continuar conjurando-as. Se o Iniciado usar Míssil arcano com esta habilidade deve usar em sua forma mais simples com custo de 1 ponto de mana, mas pode melhorá-la  com sua mana além desse primeiro ponto Recupera essa habilidade após um descanso longo.O feiticeiro pode afetar feitiços através de pontos de feitiçaria uma vez por rodada, e um feitiço pode receber apenas uma das opções acima.  Um feitiço que seja conjurado, ou alterado, por pontos de feitiçaria não geram novos pontos de feitiçaria. ",
      "habilidades": [
      ]
    },
    "regalias": [
      {
        "nome": "Evocação",
        "descricao": " O personagem ganha um bônus de 1 ponto em Combate Arcano, 2 pontos em Arcanismo e ganha a seguinte magia:",
        "manobras": [
          {
            "nome": "Nível 1 - Cone Arcano(2 Ações)(Magia)",
            "descricao": "Uma magia que cria uma cone de 6 metros de alcance e 60° de abertura, um jato de energia arcana causando 2d8 de dano àqueles que estiverem dentro da área de efeito. Causa a condição devagar até o início de seu próximo turno. Custa 6 pontos de magia. Mais 1d8 de dano para cada 3 pontos de magia adicionais."
          },
          {
            "nome": "Nível 2 - Esfera Arcana (Magia)(2 Ações)",
            "descricao": " Uma magia que cria uma esfera de 3 metros de raio, dentro da área uma explosão arcana acontece causando 3d10 de dano àqueles que estiverem dentro da área de efeito. Causa a condição queimando ou aumenta em 1 o nível de queimando. Custa 10 pontos de magia. Mais 1d10 de dano para cada 3 pontos de magia adicionais."
          },
          {
            "nome": "Nível 3 - Raio Arcano(2 Ações)(Magia)",
            "descricao": " Uma magia que cria, em uma linha de 36 metros de comprimento e 3 metros de largura, um raio arcano causando 3d10 de dano àqueles que estiverem dentro da área de efeito. Custa 10 pontos de magia. Mais 1d10 de dano para cada 3 pontos de magia gasto a mais."
          }
        ]
      },
      {
        "nome": "Abjuração",
        "descricao": "O personagem ganha um bônus de 1 ponto em Agilidade, 2 pontos em Fortitude e ganha a seguinte magia:",
        "manobras": [
          {
            "nome": "Nível 1 - Armadura Arcana  (Ação)  (Magia)",
            "descricao": "Ao conjurar essa magia o iniciado recebe uma camada protetora feita de energia. Essa camada protetora dá ao seu usuário 2 pontos de vida temporários e aumenta o valor de defesa em 2 pontos por 1 hora. Custa 2 pontos de magia. Custa 2 pontos de magia adicionais  para aumentar a vida em +2 e o bônus de defesa em + 1."
          },
          {
            "nome": "Nível 2 - Defesa contra Armas  (Ação)  (Magia)",
            "descricao": " Ao conjurar essa magia o iniciado recebe uma camada protetora feita de energia. Essa camada protetora concede ao seu usuário resistência ao dano causado por armas mágicas, não mágicas ou que tenha dano elemental durante 2 rodadas. Custa 2 pontos de magia. "
          },
          {
            "nome": "Nível 3 - Refletir (Reação)  (Magia)",
            "descricao": " Se um inimigo atacar o iniciado com algum tipo de magia, feitiço ou milagre que lhe cause dano, e estiver 30 metros distância ou menos, o iniciado pode refletir até metade do dano para o atacante, O iniciado recebe o dano excedente da reflexão e o dano transferido se converte em vida temporária com duração até o fim de seu próximo turno. Faça um rolamento de 1d100, abaixo de 40 o iniciado reflete apenas 25% do valor do dano, se rolar acima de 40 reflete metade do dano e se rolar 100 o iniciado reflete o dano por completo. Custa 4 pontos de magia."
          }
        ]
      },
      {
        "nome": "Encantamento",
        "descricao": "O personagem ganha um bônus de 2 pontos em Persuasão, Sedução e ganha a seguinte magia:",
        "manobras": [
          {
            "nome": "Nível 1 -Voz de Comando(2 Ações) (Magia)",
            "descricao": "Ao conjurar essa magia em um alvo ela tem 50% de chance de sucesso. Caso o alvo caia sob o efeito da magia ele obedece um comando de no máximo 1 palavra que não cause dano ou que seja de extremo perigo. Custa 4 pontos de magia e pode aumentar em 5% para cada 1 ponto de magia a mais."
          },
          {
            "nome": "Nível 2 - Controlar Animal (2 Ações) (Magia)",
            "descricao": " Ao conjurar essa magia em um alvo ela tem 60% de chance de sucesso. Caso o alvo caia sob o efeito da magia vai estar disposto a fazer pequenos favores e te defender. Pode durar até uma hora. Custa 6 pontos de magia e pode aumentar em 5% para cada 1 ponto de magia a mais."
          },
          {
            "nome": "Nível 3 - Hipnose (3 Ações) (Magia)",
            "descricao": " Ao conjurar essa magia em um alvo ela tem 50% de chance de sucesso. Caso o alvo caia sob o efeito da magia vai estar disposto a fazer pequenos favores, te defender de conflitos leves e te contar tudo que sabe como se fosse um velho amigo. Pode durar até uma hora. Custa 8 pontos de magia e pode aumentar em 5% para cada 1 ponto de magia a mais."
          }
        ]
      },
      {
        "nome": "Ilusão",
        "descricao": "O personagem ganha um bônus de 1 ponto em Arcanismo,  2 pontos em Enganação, 2 pontos em Performance  e ganha a seguinte magia:",
        "manobras": [
          {
            "nome": "Nível 1 - Disfarce Arcano (3 Ações) (Magia)",
            "descricao": "Ao conjurar a magia o Iniciado(a) pode escolher uma imagem de um humanóide de seu tamanho para ser sua nova aparência durante 2 horas. A ilusão pode ser sentida através do tato e brilha em um detectar magia. Para fingir ser alguém é preciso realizar um teste de enganação com dificuldade definida pelo mestre, de acordo com a situação. Custa 4 pontos de magia."
          },
          {
            "nome": "Nível 2 - Gerar imagens (2 Ações) (Magia)",
            "descricao": " Ao conjurar a magia o Iniciado pode escolher uma imagem de pessoas, lugares, objetos, animais e até monstros para representar. Essa imagem se movimenta e reproduz sons rudimentares, mas sem diálogos sonoros compreensíveis. A magia ocupa até no máximo um cubo de 6 metros de aresta e possui uma duração de até 10 minutos. Custa 6 pontos de magia."
          },
          {
            "nome": "Nível 3 - Ataque Fantasma",
            "descricao": " Ao conjurar a magia o Iniciado(a) pode escolher uma imagem de pessoas, lugares, objetos, animais e até monstros para representar um terror na mente de uma criatura. Ao conjurar essa magia em um alvo ela tem 60% de chance de sucesso de acontecer. Caso ela funcione o alvo fica aterrorizado por 5 rodadas. Todo turno a criatura alvo pode fazer um teste de ocultismo ou arcanismo para descobrir se é uma ilusão, a dificuldade é 20 - o número de rodadas que se encontra na condição aterrorizado. Se a criatura permanecer até o final do 5° turno na condição aterrorizado ela se torna atordoada  até o final de seu próximo turno.  Custa 10 pontos de magia e pode aumentar em 5% para cada 1 ponto de magia a mais."
          }
        ]
      },
      {
        "nome": "Telecinese",
        "descricao": "O personagem ganha um bônus de 1 ponto em Combate Arcano, 2 pontos em Intuição e ganha a seguinte magia:",
        "manobras": [
          {
            "nome": "Nível 1 - Mover Objeto (1 Ação) (Magia)",
            "descricao": "O iniciado move um objeto de até três quilos calmamente pelo ar. Não é possível fazer ataques ou ativar itens mágicos com essa magia. Dura por 1 minuto. Custa 1 ponto de magia. Custa 4 pontos para cada 1 minuto a mais de duração."
          },
          {
            "nome": "Nível 2 - Ruptura Mental (2 Ações) (Magia)",
            "descricao": " Ao conjurar essa magia em um alvo ela tem 50% de chance de sucesso. Caso o alvo caia sob o efeito da magia um estalo irá ocorrer dentro de sua mente, o deixando surdo e causando 2d10 pontos de dano. Custa 8 pontos de magia e pode aumentar em 5% para cada 1 ponto de magia adicional."
          },
          {
            "nome": "Nível 3 - Psicose Súbita(Ação) (Magia)",
            "descricao": " Causa que dezenas de vozes falem na mente de seu alvo. Esta magia possui 50% de chance de sucesso. Caso a magia tenha sucesso, o alvo fica na condição Paralizado até o inicio do próximo turno do iniciado e Aterrorizado por 2 rodadas após sair da paralisia. Custa 8 pontos de magia e pode aumentar em 5% para cada 1 ponto de adicional."
          }
        ]
      },
      {
        "nome": "Invocação",
        "descricao": "O personagem ganha um bônus de 1 ponto em Combate Arcano, 2 pontos em Ritualismo e ganha a seguinte magia:",
        "manobras": [
          {
            "nome": "Nível 1 -Disco de carga (2 Ações) (Magia)",
            "descricao": "Conjura um disco de 3 metros de raio feito de energia, que consegue carregar pessoas e carga em até 200 quilos. Pode mover o círculo como uma ação a uma distância de até 18 metros. Dura por 1 hora. Custa 2 pontos de magia."
          },
          {
            "nome": "Nível 2 - Névoa de Combate (2 Ações) (Magia)",
            "descricao": " Conjura uma névoa que ocupa um cubo de 3 metros de aresta centralizado  no iniciado. Dentro dessa névoa ele se encontra obscurecido, mas pode ver fora da névoa como se ela não existisse. Dura 2 turnos. Custa 3 pontos de magia. Custa 6 pontos de magia por turno a mais."
          },
          {
            "nome": "Nível 3 - Arma Arcana (Ação) (Magia)",
            "descricao": " Invoca uma arma simples de energia arcana que ele seja proficiente. A arma causa 2d10 + arcanismo de dano arcano e utiliza Combate Arcano como atributo de acerto, dura por 5 turnos. Custa 10 pontos de magia. Se gastar 8 pontos de magia adicionais torna possível conjurar uma segunda arma."
          }
        ]
      },
      {
        "nome": "Transmutação",
        "descricao": "O personagem ganha um bônus de 1 ponto em Tecnologia, 3 pontos em Arcanatec, 2 pontos em Natureza e ganha a seguinte magia:",
        "manobras": [
          {
            "nome": "Nível 1 - Destrancar Fechadura (2 Ações) (Magia)",
            "descricao": "O iniciado abre uma fechadura ou ou cadeado. Ao abrir faz um enorme som de algo quebrando. A fechadura fica inútil após usar essa magia. Custa 5 pontos de magia."
          },
          {
            "nome": "Nível 2 - Mudar Temperatura(2 Ações)(Magia)",
            "descricao": "Essa magia transforma a energia de um objeto, que não esteja sendo vestido por alguém, e aumenta a temperatura até  ficar incandescente, se o objeto for metálico, ou pegar fogo, se o objeto for inflamável. Alternativamente pode abaixar a temperatura de maneira que quase congela o objeto. De qualquer forma, ao transformar a temperatura do objeto desta maneira possui 80% de chance de causar a condição congelando ou queimando a uma criatura em contato com o objeto. O objeto não pode ter um volume maior que 1.5 metros cúbicos  e nem ser maior que 9 metros quadrados em superfície (por exemplo um quadrado de 3 metros de lado). Dura 5 rodadas. Custa 4 pontos de magia."
          },
          {
            "nome": "Nível 3 - Prisão Arcana (2 Ações) (Magia)",
            "descricao": " Essa magia transforma matéria em energia arcana. Ao transformar o ambiente em volta em cordas, correntes ou vinhas, o conjurador tem uma chance de 40% de prender os alvos no lugar, os deixando na condição restringido. Alcance 9 metros  com uma área de  3 metros de raio. Possui uma duração até o final do próximo turno do alvo preso. Custa 10 pontos de magia e pode aumentar em 5% a chance de sucesso e duração  para cada 1 ponto de magia a mais."
          }
        ]
      },

    ]
  }
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
  const EspecializacaoCombatenteSkillsData = [
    {
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

    },
    {
      "titulo": "CAÇADOR",
      "img": cacador,
      "descricao": "O Caçador da classe Lâmina do Oculto é um mestre em sobrevivência e rastreamento, capaz de transformar o ambiente ao seu favor. Ele vê o mundo de forma única, decifrando rastros, lendo o vento e detectando sinais invisíveis para a maioria. Sua percepção aguçada o torna tanto um perseguidor implacável quanto um protetor vigilante de seus aliados, antecipando emboscadas e armadilhas.Ao seu lado, há sempre um companheiro animal leal, uma criatura treinada que se torna uma extensão do próprio Caçador. Juntos, eles operam em perfeita sincronia, protegendo um ao outro e atacando como uma unidade coesa. Essa ligação é tão profunda que o Caçador pode até compartilhar os sentidos de seu companheiro, tornando-se quase impossível de ser surpreendido.Sua adaptabilidade impressiona. Ele prospera em qualquer ambiente — florestas densas, desertos escaldantes ou montanhas geladas — resistindo a condições extremas sem perder eficácia. Ele é um explorador incansável, capaz de suportar fome, sede e temperaturas letais graças à sua resistência física e mental sobre-humanas.No combate, o Caçador não depende de força bruta, mas de velocidade e precisão. Ele ataca rápido e letalmente, aproveitando cada erro do oponente. Seu companheiro animal complementa esses ataques, desorientando e derrubando alvos com coordenação impecável. Além disso, o Caçador controla o campo de batalha com maestria, restringindo o movimento de inimigos e incapacitando-os sem matá-los quando necessário — ideal para capturar alvos ou impedir fugas.À distância, sua destreza é lendária. Ele dispara flechas com precisão cirúrgica, atingindo alvos mesmo atrás de cobertura. Quando cercado, ele pode liberar uma tempestade de golpes, transformando-se em um turbilhão de lâminas e fúria.Há um lado quase místico no Caçador. Ele pode marcar um alvo de forma sobrenatural, rastreando-o mesmo se este se esconder ou ficar invisível. Essa marca transforma a caçada em algo inevitável — o Caçador sempre encontra sua presa e cada ataque contra ela é mais mortal.Mais que guerreiro ou rastreador, o Caçador é um símbolo de equilíbrio entre civilização e natureza. Ele entende e respeita as leis selvagens do mundo, domando até mesmo criaturas lendárias como dragões. Ele não busca destruição, mas parceria e compreensão. Seu papel na sociedade varia: pode ser o guardião de uma vila remota, um explorador destemido ou um assassino furtivo, eliminando alvos importantes sem ser notado. Sua versatilidade e independência fazem dele um sobrevivente nato. Em essência, o Caçador é definido por sua mentalidade: um predador paciente, um sobrevivente resiliente e um aliado leal. Ele não teme o mundo cruel — ele se adapta e prospera. Onde quer que vá, deixa sua marca de equilíbrio e perseverança, lembrando a todos que, mesmo na escuridão, seus olhos atentos observam, esperando o momento certo para agir.",
      "atributos": "Cada Regalia comprada na especialização Caçador(a) fornece:\n- 5 Pontos de Vida\n- 4 Pontos de Estâmina\n- 1 Ponto em Magia",
      "regaliaObrigatoria": {
        "descricao": "Ao escolher esta especialização, o personagem recebe os seguintes atributos :",
        "pontos": {
          "atributos": {
            "quantidade": 2,
            "opcoes": ["Força", "Agilidade", "Destreza"]
          },
          "combate": {
            "quantidade": 1,
            "opcoes": ["Combate corpo a corpo", "Combate à distância"]
          },
          "habilidades": {
            "quantidade": 2,
            "opcoes": ["Percepção", "Sobrevivência", "Armadilha", "Natureza", "Rastreamento"]
          },
          "proficiências": ["Capacidade de Adestrar Animais"]
        },
        "habilidade": [{
          "nome": " Adestrar Animais",
          "tipo": "Passiva",
          "descricao": "Cada animal adestrado tem um valor de dificuldade para ser treinado. Esse valor é de 10 ou metade do  valor dos pontos de vida da criatura, arredondado para cima, o que for maior. O teste feito deve ser de Lidar com Animais e o caçador ganha um bônus igual a metade do seu nível de personagem neste rolamento, arredondado para cima.\n A criatura adestrada é considerada um companheiro animal e tem seu turno ao mesmo tempo que o caçador. Esse companheiro pode agir alternadamente com o caçador dentro deste turno. \n O caçador consegue tratar ferimentos e  tem, em  todos os testes de medicina, um bônus de +5 ao cuidar de seu companheiro animal. \n Seu companheiro animal pode fazer um turno de vigia de duas horas sozinho em um acampamento. \n O companheiro animal ganha um  bônus em seus pontos de vida igual a duas vezes o nível do caçador. Ou seja, os pontos de vida ficha da criatura somados ao nível do caçador multiplicado por dois. O caçador pode ter um número de animais adestrados igual o seu valor em Lidar com animais",
        }]
      },
      "regalias": [
        {
          "nome": "Ataque Veloz",
          "tipo": "Ação livre",
          "descricao": "O Caçador(a) pode realizar um ataque a mais quando tomar uma ação de atacar. Apenas uma vez por ação.",
          "custoEstamina": 1,
          "chanceDeSucesso": "",
          "dano": "",
          "requisito": "",
          "efeitos": {},
          "modificadores": {},
          "bonus": {},
          "interacoes": {}
        },
        {
          "nome": "Concentração",
          "tipo": "Ação livre",
          "descricao": "O Caçador(a) aumenta o seu acerto em 2 pontos durante 10 rodadas.",
          "custoEstamina": 6,
          "chanceDeSucesso": "",
          "dano": "",
          "requisito": "",
          "efeitos": {
            "passivo": "Aumento de acerto em 2 pontos."
          },
          "modificadores": {},
          "bonus": {},
          "interacoes": {}
        },
        {
          "nome": "Ataque de Oportunidade",
          "tipo": "Reação",
          "descricao": "O Caçador(a) pode realizar um ataque de oportunidade quando outra criatura que possa ver sair da sua área de ameaça, ou atacar um aliado dentro do seu alcance.",
          "custoEstamina": 2,
          "chanceDeSucesso": "",
          "dano": "",
          "requisito": "",
          "efeitos": {},
          "modificadores": {},
          "bonus": {},
          "interacoes": {}
        },
        {
          "nome": "Trabalho em Equipe",
          "tipo": "Ação livre",
          "descricao": "O Caçador(a) ao realizar um ataque pode comandar o seu Companheiro Animal para atacar em conjunto sem gastar uma ação do companheiro animal.",
          "custoEstamina": 6,
          "chanceDeSucesso": "",
          "dano": "",
          "requisito": "",
          "efeitos": {
            "ativo": "Ao sofrer um ataque, tanto o caçador quanto o Companheiro Animal podem, como uma reação, solicitar auxílio um do outro. Ao receber auxílio, o caçador e o Companheiro recebem um aumento no Valor de Defesa em 2 pontos. O caçador deve estar a até 3 metros de distância de seu companheiro para realizar essa ajuda e vice-versa."
          },
          "modificadores": {},
          "bonus": {},
          "interacoes": {}
        },
        {
          "nome": "Conexão Primitiva",
          "tipo": "Ação",
          "descricao": "O Caçador(a) e seu companheiro animal criam uma conexão que compartilham seus sentidos, permitindo que um possa usar os sentidos do outro. O caçador consegue ver e ouvir pelos sentidos de seu companheiro e pelos próprios ao mesmo tempo.",
          "custoEstamina": 1,
          "chanceDeSucesso": "",
          "dano": "",
          "requisito": "",
          "efeitos": {
            "ativo": "Compartilhar sentidos com o companheiro animal."
          },
          "modificadores": {},
          "bonus": {},
          "interacoes": {}
        },
        {
          "nome": "Corpo Adaptativo",
          "tipo": "Passiva",
          "descricao": "O Caçador(a) consegue se adaptar a qualquer ambiente em que é possível a vida de humanóides. O caçador e seu companheiro animal não se perdem em ambientes naturais e podem ficar até um mês sem comida e até 10 dias sem água.",
          "custoEstamina": 4,
          "chanceDeSucesso": "",
          "dano": "",
          "requisito": "",
          "efeitos": {
            "passivo": "Adaptação a ambientes naturais e resistência ao dano de fogo ou gelo."
          },
          "modificadores": {
            "ativo": "Resistência ao dano de fogo ou gelo, reduzindo-o pela metade."
          },
          "bonus": {},
          "interacoes": {}
        },
        {
          "nome": "Instinto Caçador",
          "tipo": "Passiva",
          "descricao": "O Caçador(a) utiliza de pistas em um ambiente para perseguir uma criatura que tenha passado por ali. Ao perseguir uma criatura através de pistas, como cheiro ou pegadas, ele ganha vantagem em testes de Rastreamento e Percepção.",
          "custoEstamina": 1,
          "chanceDeSucesso": "",
          "dano": "",
          "requisito": "",
          "efeitos": {
            "passivo": "Vantagem em testes de Rastreamento e Percepção."
          },
          "modificadores": {
            "ativo": "O Caçador(a) marca uma criatura que possa ver. Enquanto esta criatura estiver marcada, o caçador sabe onde ela está mesmo se estiver invisível."
          },
          "bonus": {
            "danoExtra": "1d6 de dano extra do tipo do ataque em cada ataque realizado."
          },
          "interacoes": {}
        },
        {
          "nome": "Debilitar",
          "tipo": "Ação livre",
          "descricao": "O Caçador(a) pode optar por debilitar um inimigo quando realizar um ataque. Reduzindo seu movimento pela metade.",
          "custoEstamina": 2,
          "chanceDeSucesso": "",
          "dano": "",
          "requisito": "",
          "efeitos": {},
          "modificadores": {
            "efeitoExtra": "Reduzindo o movimento do alvo a zero ao gastar mais 2 pontos de estâmina adicionais."
          },
          "bonus": {},
          "interacoes": {}
        },
        {
          "nome": "Olho de Águia",
          "tipo": "Ação livre",
          "descricao": "O Caçador(a) ao realizar um ataque a distância pode ignorar até meia cobertura.",
          "custoEstamina": 1,
          "chanceDeSucesso": "",
          "dano": "",
          "requisito": "",
          "efeitos": {},
          "modificadores": {
            "bonusPenetracao": "Ignora até 3/4 de cobertura ao custo de 1 ponto de estâmina adicional."
          },
          "bonus": {},
          "interacoes": {}
        },
        {
          "nome": "Chuva de Ataques",
          "tipo": "Ação",
          "descricao": "O Caçador(a) pode atacar, repetidamente, em um cone de 60° de abertura, 1.5 m de altura e distância de 27m. Atingindo todas as criaturas na área (incluindo aliados)",
          "custoEstamina": 2,
          "chanceDeSucesso": "",
          "dano": "(dano da arma + atributo) + 1d10 pontos de dano adicional para cada 1,5 m quadrado de área que a criatura ocupa.",
          "requisito": "",
          "efeitos": {},
          "modificadores": {},
          "bonus": {},
          "interacoes": {}
        },
        {
          "nome": "Expurgo",
          "tipo": "Ação (2 Ações)",
          "descricao": "O Caçador(a) gira com golpes rápidos, acertando todas as criaturas que escolher em seu alcance de ameaça.",
          "custoEstamina": 5,
          "chanceDeSucesso": "",
          "dano": "(dano da arma + atributo) + 1d10 pontos de dano adicional em cada criatura em alcance.",
          "requisito": "",
          "efeitos": {},
          "modificadores": {},
          "bonus": {},
          "interacoes": {}
        },
        {
          "nome": "Adestrar Dragão",
          "tipo": "Passiva",
          "descricao": "O personagem pode adestrar dragões e transformá-los em seu Companheiro.",
          "custoEstamina": "",
          "chanceDeSucesso": "",
          "dano": "",
          "requisito": "",
          "efeitos": {},
          "modificadores": {},
          "bonus": {},
          "interacoes": {}
        },
        {
          "nome": "Recuperar Fôlego Maior",
          "tipo": "Ação (2 Ações)",
          "descricao": "O personagem pode gastar duas ações para recuperar 3d8 pontos de vida e 6 pontos de estâmina.",
          "custoEstamina": "",
          "chanceDeSucesso": "",
          "dano": "",
          "requisito": "",
          "efeitos": {},
          "modificadores": {},
          "bonus": {
            "vidaTemporaria": "3d8 pontos de vida"
          },
          "interacoes": {}
        }
      ]


    },

    {
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

    },
    {
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

    },
  ]
  const EspecializacaoIniciadoSkillsData = [
    {
      "titulo": "MAGO",
      "img": mago,
      "descricao": "O Mago, como uma sombra longa e silenciosa que se estende sobre os destinos do mundo, é um ser de grande sabedoria e poder. Sua presença é como um sussurro nos ventos que atravessam os vales antigos, um murmurinho no fundo das bibliotecas esquecidas e nas torres que tocam as estrelas. Com os olhos carregados de antigos segredos, ele caminha com a serenidade daqueles que compreendem os mistérios do cosmos. Não há pressa em seus passos, pois o tempo, para ele, é apenas um fio que pode ser puxado e entrelaçado ao seu bel prazer. O Mago é um mestre das forças invisíveis, capaz de comandar os elementos e de dobrar o próprio tecido da realidade à sua vontade. Seus feitiços não são meras palavras ditas ao vento, mas cânticos profundos que ecoam em dimensões além da compreensão mortal. Ele pode, com um gesto de sua mão, invocar tempestades que congelam o coração dos inimigos ou chamar a terra sob seus pés para flutuar, desafiando as leis naturais. Nos campos de batalha, o Mago é tanto uma espada quanto um escudo, usando sua magia para defender ou destruir com a mesma destreza. Sua mente afiada, porém, jamais se deixa levar pela fúria do combate, pois ele sabe que o verdadeiro poder reside na paciência e na precisão. Ele se move como uma brisa, tão leve quanto as folhas caindo no outono, mas com a força para derrubar castelos inteiros. Contudo, o Mago não é apenas um conjurador de destruição. Ele é um guardião das artes arcanas, um farol de sabedoria e, para aqueles que buscam seu conselho, um guia nas sombras da ignorância. Mas, como toda grande força, ele é também um enigma, um reflexo das forças que ele manipula—cercado de mistério, admirado e temido, pois quem sabe até onde seu poder pode alcançar?",
      "atributos": "Cada Regalia comprada na especialização Mago(a) fornece:\n- 5 Pontos de Vida\n- 0 Pontos de Estâmina\n- 5 Ponto em Magia",
      "regaliaObrigatoria": {
        "descricao": "Ao escolher esta especialização, o personagem recebe os seguintes atributos :",
        "pontos": {
          "atributos": {
            "quantidade": 2,
            "opcoes": ["Combate arcano", "Arcanismo"]
          },
          "combate": {
            "quantidade": 1,
            "opcoes": ["Arcanismo", "Fortitude"]
          },
          "habilidades": {
            "quantidade": 2,
            "opcoes": ["Arcanismo", "Fortitude", "Agilidade"]
          },
          "proficiências": ["CProficiência em Armadura média e Escudo."]
        },
        "outrasProficiencias": [
          "Armaduras Pesadas",
          "Todos os Escudos"
        ],
        "habilidade": [{
          "nome": "Arcanista de combate",
          "tipo": "Passiva",
          "descricao": "Soma o valor de Arcanismo para o ataque de Míssil Mágico . Esse valor é adicionado por míssil.  ",
        }]
      },
      "regalias": [
        {
          "nome": "Alta Frequência",
          "tipo": "Ação",
          "descricao": "Faz com que um ponto a sua escolha em até 18 metros gere um som de imenso volume e frequência alta, causando danos em objetos e criaturas dentro do alcance.",
          "custoMagia": 6,
          "chanceDeSucesso": "100%",
          "dano": "3d10 + 1d10 por cada 3 pontos de magia extra",
          "requisito": null,
          "efeitos": {
            "passivo": null,
            "ativo": "Gera um som destruidor e danifica objetos e criaturas."
          },
          "modificadores": {
            "bonusSucesso": "Cada 3 pontos de magia extra causam 1d10 pontos de dano a mais",
            "usoExtra": "Pode ser usado uma vez por turno",
            "duracaoExtra": null
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": "Nenhuma interação especificada"
          }
        },
        {
          "nome": "Grande Mão",
          "tipo": "Ação",
          "descricao": "Cria uma enorme mão que pode levantar ou atacar criaturas e objetos.",
          "custoMagia": 7,
          "chanceDeSucesso": "100%",
          "dano": "1d10 + Arcanismo",
          "requisito": null,
          "efeitos": {
            "passivo": null,
            "ativo": "Cria uma mão que pode atacar ou empurrar criaturas."
          },
          "modificadores": {
            "bonusSucesso": "A mão pode levantar criaturas até 500 kg",
            "usoExtra": "Pode ser usada uma vez por turno",
            "duracaoExtra": "Dura 10 rodadas"
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": "Nenhuma interação especificada"
          }
        },
        {
          "nome": "Conjuração de Combate",
          "tipo": "Passiva",
          "descricao": "Permite que o mago inicie uma magia de múltiplas ações em um turno e termine em outro.",
          "chanceDeSucesso": "100%",
          "dano": null,
          "requisito": null,
          "efeitos": {
            "passivo": "Permite conjurar magias com ações múltiplas de forma contínua entre turnos.",
            "ativo": null
          },
          "modificadores": {
            "bonusSucesso": null,
            "usoExtra": "Pode ser usado com qualquer magia de múltiplas ações",
            "duracaoExtra": null
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": "Nenhuma interação especificada"
          }
        },
        {
          "nome": "Globo de Proteção",
          "tipo": "Reação",
          "descricao": "Cria uma esfera protetora ao redor do mago, imune a danos externos.",
          "custoMagia": 10,
          "chanceDeSucesso": "100%",
          "dano": null,
          "requisito": "Receber um ataque ou efeito mágico que causaria dano",
          "efeitos": {
            "passivo": null,
            "ativo": "Cria uma esfera de proteção com 50 pontos de vida."
          },
          "modificadores": {
            "bonusSucesso": "Custa mais 10 pontos de magia para cada 25 pontos de vida extra na esfera",
            "usoExtra": "Pode ser usado uma vez por rodada",
            "duracaoExtra": "Dura até o fim do próximo turno do mago"
          },
          "bonus": {
            "vidaTemporaria": "50 pontos de vida temporária na esfera"
          },
          "interacoes": {
            "comOutraRegalia": "Nenhuma interação especificada"
          }
        },
        {
          "nome": "Parede de Espadas",
          "tipo": "Ação",
          "descricao": "Cria uma parede de espadas que causa dano e empurra criaturas que tentam atravessá-la.",
          "custoMagia": 12,
          "chanceDeSucesso": "100%",
          "dano": "4d10",
          "requisito": null,
          "efeitos": {
            "passivo": null,
            "ativo": "Cria uma parede de espadas que empurra e causa dano."
          },
          "modificadores": {
            "bonusSucesso": null,
            "usoExtra": "Pode ser usada uma vez por turno",
            "duracaoExtra": "Dura por 10 rodadas"
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": "Nenhuma interação especificada"
          }
        },
        {
          "nome": "Azagaia Arcana",
          "tipo": "Ação",
          "descricao": "Atira um projétil de energia arcana que causa dano à criatura atingida.",
          "custoMagia": 6,
          "chanceDeSucesso": "100%",
          "dano": "2d10 + Arcanismo",
          "requisito": null,
          "efeitos": {
            "passivo": null,
            "ativo": "Dispara um projétil que causa dano."
          },
          "modificadores": {
            "bonusSucesso": "Aumenta o dano em 10 para cada 6 pontos de magia extra",
            "usoExtra": "Pode ser usado uma vez por turno",
            "duracaoExtra": null
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": "Nenhuma interação especificada"
          }
        },
        {
          "nome": "Deslocar Terreno",
          "tipo": "Ação",
          "descricao": "Cria uma cópia do terreno em que todas as suas características flutuam no ar.",
          "custoMagia": 10,
          "chanceDeSucesso": "100%",
          "dano": null,
          "requisito": null,
          "efeitos": {
            "passivo": null,
            "ativo": "Cria uma cópia flutuante do terreno que reduz a velocidade de movimento."
          },
          "modificadores": {
            "bonusSucesso": "Custa 5 pontos de magia por metro de altura adicional",
            "usoExtra": "Pode ser usado uma vez por turno",
            "duracaoExtra": "Dura por 10 rodadas"
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": "Nenhuma interação especificada"
          }
        },
        {
          "nome": "Tempestade Arcana",
          "tipo": "Ação",
          "descricao": "Cria uma tempestade que causa congelamento e dano contínuo em criaturas na área.",
          "custoMagia": 10,
          "chanceDeSucesso": "70%",
          "dano": "8d6 por turno de condição congelando",
          "requisito": null,
          "efeitos": {
            "passivo": null,
            "ativo": "Causa a condição congelando e dano contínuo dentro da tempestade."
          },
          "modificadores": {
            "bonusSucesso": "Custa 5 pontos de magia para aumentar a chance de congelamento em 5%",
            "usoExtra": "Pode ser usado uma vez por turno",
            "duracaoExtra": "Dura 10 rodadas"
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": "Nenhuma interação especificada"
          }
        },
        {
          "nome": "Meteoro Arcano",
          "tipo": "Ação",
          "descricao": "Dispara um meteoro arcano que causa dano massivo e deixa a condição queimando.",
          "custoMagia": 10,
          "chanceDeSucesso": "100%",
          "dano": "8d10 + Arcanismo",
          "requisito": "Explosão Arcana, Conjuração de Combate",
          "efeitos": {
            "passivo": null,
            "ativo": "Causa dano massivo em área e pode deixar a condição queimando."
          },
          "modificadores": {
            "bonusSucesso": "Custa 10 pontos de magia para adicionar uma explosão extra",
            "usoExtra": "Pode ser usado uma vez por turno",
            "duracaoExtra": null
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": "Nenhuma interação especificada"
          }
        },
        {
          "nome": "Teletransporte Tático",
          "tipo": "Ação",
          "descricao": "Teletransporta o mago até 18 metros de distância para um local visível.",
          "custoMagia": 2,
          "chanceDeSucesso": "100%",
          "dano": null,
          "requisito": null,
          "efeitos": {
            "passivo": null,
            "ativo": "Teletransporta o mago instantaneamente."
          },
          "modificadores": {
            "bonusSucesso": null,
            "usoExtra": "Pode ser usado uma vez por turno",
            "duracaoExtra": null
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": "Nenhuma interação especificada"
          }
        }
      ]


    },
    {
      "titulo": "PROFESSOR",
      "img": professor,
      "descricao": "O Professor, com sua mente afiada e insaciável curiosidade, é um arquétipo de sabedoria e experimentação no mundo que habita. Em sua busca incessante por entender os mistérios do arcano e da tecnologia, ele molda o futuro a partir de seu vasto conhecimento, seja através de suas habilidades arcanas ou invenções brilhantes. Suas mãos, que muitas vezes seguram o compasso e a pena, também podem conjurar forças que moldam a matéria e desafiam os limites do mundo físico. Com o poder de criar e controlar constructos artificiais, o Professor se torna mais que um simples conjurador: ele é um criador. Seus ajudantes, feitos de elementos arcanos e materiais cuidadosamente selecionados, agem como extensões de sua própria vontade, executando suas ordens com precisão e força. O Professor é um mestre na manipulação de magias não destrutivas, utilizando seu talento para alterar o funcionamento das artes arcanas, seja ampliando sua duração, reduzindo custos ou aumentando seu alcance. Sua habilidade de conjurar múltiplas magias em um único turno, como um diretor orquestrando uma sinfonia de encantamentos, torna-o um adversário formidável, mesmo sem recorrer ao combate direto. O Professor é também um ser que compreende o valor da adaptação. Sua capacidade de modificar seus ajudantes, seja para torná-los mais eficientes ou dar-lhes uma aparência mais humanóide, reflete sua busca constante por aprimoramento. Além disso, suas magias de teletransporte e voo falam de sua compreensão dos limites do espaço e do tempo, como se ele pudesse dançar entre as fronteiras do mundo físico. Em sua essência, o Professor é um ser de profundo conhecimento e engenhosidade, sempre à frente de seu tempo, criando e moldando o arcano e a tecnologia para atender às suas necessidades, sejam elas científicas ou estratégicas. É um estudioso que caminha na linha tênue entre o possível e o impossível, um verdadeiro mestre da teoria e da prática.",
      "atributos": "Cada Regalia comprada na especialização Professor(a) fornece:\n- 4 Pontos de Vida\n- 0 Pontos de Estâmina\n- 6 Ponto em Magia",
      "regaliaObrigatoria": {
        "descricao": "Ao escolher esta especialização, o personagem recebe os seguintes atributos :",
        "pontos": {
          "atributos": {
            "quantidade": 2,
            "opcoes": ["Arcanismo", "Tecnologia"]
          },
          "combate": {
            "quantidade": 1,
            "opcoes": ["Combate arcano", "Destreza"]
          },
          "habilidades": {
            "quantidade": 2,
            "opcoes": ["História", "Alquimia", "Arcanismo"]
          },
          "proficiências": ["Nenhuma nova proficiência."]
        },
        "habilidade": [{
          "nome": " Ajudante de Laboratório ",
          "tipo": "Magia (3 ações)",
          "descricao": "O professor cria um elemental artificial do elemento arcano e aplica em um conjunto de materiais no valor de 50 moedas de ouro. Ao fazer isso cria um constructo  pequeno ou menor com pontos de vida igual a três vezes o nível de personagem professor. O professor pode conjurar magias da posição do seu ajudante desde que esteja em até 50 metros do mesmo. O constructo tem uma velocidade de movimento igual a 4,5 metros e pode ser voador ou não. Seu valor de armadura é igual a 10. Apenas um ajudante pode estar ativo por vez, que tem duração de até seu cancelamento ou chegar a zero pontos de vida( tanto o ajudante quanto o professor). Ao ser destruído, os materiais usados para construí-lo viram pó. Custa 10 pontos de magia para conjurar o elemental artificial. Ganha 5 pontos de vida adicionais a cada 5 pontos de magia adicionais ao conjurar o elemental.",
        }]
      },
      "regalias": [
        {
          "nome": "Escultor de Magias",
          "tipo": "Ativa | Reação",
          "descricao": "Ao conjurar uma magia que não cause dano, o professor pode escolher um dos seguintes efeitos: dobrar o tempo de duração, diminuir em metade o custo de pontos de magia (Arredondando pra cima) ou dobrar a quantidade de alvos. Pode ser usada 5 vezes ao dia, com recuperação de usos após um descanso longo.",
          "chanceDeSucesso": "100%",
          "dano": null,
          "requisito": null,
          "efeitos": {
            "passivo": null,
            "ativo": "Escolher um dos efeitos: dobrar duração, reduzir custo de pontos de magia ou dobrar número de alvos."
          },
          "modificadores": {
            "bonusSucesso": null,
            "usoExtra": "Pode ser usada até 5 vezes ao dia, com recuperação em descanso longo.",
            "duracaoExtra": null
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": "Nenhuma interação especificada."
          }
        },
        {
          "nome": "Conjuração Múltipla",
          "tipo": "Passiva",
          "descricao": "O professor pode conjurar mais magias que não causem dano em um mesmo turno, usando uma reação para adicionar uma ação extra ao seu turno. Pode conjurar até 2 magias de 2 ações ou até 4 de 1 ação, ou qualquer combinação que gaste até 4 ações em um turno. Pode ser usada 5 vezes ao dia, com recuperação em descanso longo.",
          "chanceDeSucesso": "100%",
          "dano": null,
          "requisito": null,
          "efeitos": {
            "passivo": "Permite conjurar múltiplas magias não-dano em um único turno.",
            "ativo": "Usa uma reação para adicionar ação extra ao turno."
          },
          "modificadores": {
            "bonusSucesso": null,
            "usoExtra": "Pode ser usada até 5 vezes ao dia, com recuperação em descanso longo.",
            "duracaoExtra": null
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": "Nenhuma interação especificada."
          }
        },
        {
          "nome": "Roque",
          "tipo": "Ativa | Ação",
          "descricao": "Troca de lugar com um ajudante através de teletransporte, desde que o ajudante esteja a até 50 metros. Pode ser usada 5 vezes ao dia, com recuperação em descanso longo.",
          "chanceDeSucesso": "100%",
          "dano": null,
          "requisito": null,
          "efeitos": {
            "passivo": null,
            "ativo": "Troca de lugar com um ajudante dentro do limite de distância."
          },
          "modificadores": {
            "bonusSucesso": null,
            "usoExtra": "Pode ser usada até 5 vezes ao dia, com recuperação em descanso longo.",
            "duracaoExtra": null
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": "Nenhuma interação especificada."
          }
        },
        {
          "nome": "Ajudante Melhorado",
          "tipo": "Passiva",
          "descricao": "Permite conjurar um constructo de tamanho médio ou menor com aparência humanóide rústica. Seus pontos de vida são 4 vezes o nível do professor.",
          "chanceDeSucesso": "100%",
          "dano": null,
          "requisito": null,
          "efeitos": {
            "passivo": "Ajudante conjurado possui aparência humanóide rústica e pontos de vida aumentados.",
            "ativo": null
          },
          "modificadores": {
            "bonusSucesso": null,
            "usoExtra": null,
            "duracaoExtra": null
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": "Nenhuma interação especificada."
          }
        },
        {
          "nome": "Teletransporte",
          "tipo": "Magia | Ação",
          "descricao": "Teletransporta todas as criaturas dentro de um raio de três metros para um local familiar. A chance de sucesso depende da distância, sendo 80% para até 10 km e 50% para até 100 km. Caso falhe, o teletransporte leva para uma direção aleatória. Custa 15 pontos de magia.",
          "custoMagia": 15,
          "chanceDeSucesso": "80% (10 km) | 50% (100 km)",
          "dano": null,
          "requisito": "Conhecimento do local a ser teletransportado",
          "efeitos": {
            "passivo": null,
            "ativo": "Teletransporta até 3 metros para local familiar."
          },
          "modificadores": {
            "bonusSucesso": null,
            "usoExtra": null,
            "duracaoExtra": null
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": "Nenhuma interação especificada."
          }
        },
        {
          "nome": "Voar",
          "tipo": "Magia | Ação",
          "descricao": "Permite que o conjurador ou outra criatura voe. A velocidade de movimento no voo é o dobro da normal, com duração de 100 turnos. Custa 8 pontos de magia por criatura.",
          "custoMagia": 8,
          "chanceDeSucesso": "100%",
          "dano": null,
          "requisito": null,
          "efeitos": {
            "passivo": null,
            "ativo": "Concede a habilidade de voar por 100 turnos."
          },
          "modificadores": {
            "bonusSucesso": null,
            "usoExtra": null,
            "duracaoExtra": null
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": "Nenhuma interação especificada."
          }
        },
        {
          "nome": "Invisibilidade",
          "tipo": "Magia | Ação",
          "descricao": "Torna o conjurador ou outra criatura invisível por até 10 minutos. A invisibilidade é quebrada ao causar dano. Custa 8 pontos de magia por criatura.",
          "custoMagia": 8,
          "chanceDeSucesso": "100%",
          "dano": null,
          "requisito": null,
          "efeitos": {
            "passivo": null,
            "ativo": "Torna invisível por até 10 minutos, ou até causar dano."
          },
          "modificadores": {
            "bonusSucesso": null,
            "usoExtra": null,
            "duracaoExtra": null
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": "Nenhuma interação especificada."
          }
        },
        {
          "nome": "Ajudante de Combate",
          "tipo": "Passiva",
          "descricao": "Permite invocar um constructo de combate com 5 vezes o nível do professor em pontos de vida. O ajudante pode usar armas simples, escudo simples e armaduras leves ou médias. A velocidade de movimento é de 6 metros.",
          "chanceDeSucesso": "100%",
          "dano": null,
          "requisito": "Ajudante Melhorado",
          "efeitos": {
            "passivo": "Ajudante de combate com armas, armaduras e escudo.",
            "ativo": null
          },
          "modificadores": {
            "bonusSucesso": null,
            "usoExtra": null,
            "duracaoExtra": null
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": "Nenhuma interação especificada."
          }
        },
        {
          "nome": "Atirador Arcano",
          "tipo": "Passiva",
          "descricao": "Dobra o alcance das magias que possuem alcance. Se o professor acertar um alvo com uma magia que precise de um rolamento de acerto, o dano atinge um segundo alvo a 1,5 metros de distância.",
          "chanceDeSucesso": "100%",
          "dano": null,
          "requisito": null,
          "efeitos": {
            "passivo": "Dobra o alcance de magias e permite acertar outro alvo próximo.",
            "ativo": null
          },
          "modificadores": {
            "bonusSucesso": null,
            "usoExtra": null,
            "duracaoExtra": null
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": "Nenhuma interação especificada."
          }
        },
        {
          "nome": "Laboratório em Expansão",
          "tipo": "Passiva",
          "descricao": "Permite conjurar dois ajudantes em vez de um, com o custo base da magia para um único ajudante.",
          "chanceDeSucesso": "100%",
          "dano": null,
          "requisito": null,
          "efeitos": {
            "passivo": "Permite conjurar dois ajudantes com o custo de um.",
            "ativo": null
          },
          "modificadores": {
            "bonusSucesso": null,
            "usoExtra": null,
            "duracaoExtra": null
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": "Nenhuma interação especificada."
          }
        }
      ]
    },
  ]
  const EspecializacaoNovicoSkillsData = [
    {
      "titulo": "Sarcedote",
      "img": sarcedote,
      "descricao": "Na penumbra das grandes catedrais e nas montanhas onde os ventos sussurram segredos antigos, surge uma figura que, mais que qualquer outra, carrega em seu ser o peso do destino dos outros. O sacerdote, cujo manto não apenas cobre seu corpo, mas resguarda as esperanças e os temores daqueles que buscam consolo nas horas de trevas. Sua presença é, muitas vezes, uma âncora em mares revoltos, um farol que brilha na escuridão do sofrimento humano. Em sua jornada, o sacerdote possui a capacidade de curar e restaurar, não só os corpos quebrantados, mas também as almas fragmentadas. Sua magia não é uma força bruta, mas uma gentileza revestida de poder. A cura que ele oferece não vem apenas do gesto, mas da conexão com o divino, uma força etérea que se manifesta em milagre após milagre. Cada oração, cada feitiço lançado, é um eco de um chamado maior, uma resposta ao sofrimento do mundo. Quando o sacerdote invoca o poder do milagre, ele não apenas traz alívio imediato, mas estende seu toque para além, fazendo com que sua benção continue, fluindo suavemente, como um rio que nunca cessa de correr. Mas sua dedicação vai além da cura. Ele também é o guardião dos outros, aquele que se coloca entre seus companheiros e o perigo, dividindo as dores e os fardos. Em sua jornada, a troca de fardos é um caminho sem retorno, onde o peso de um só é repartido com a alma do outro. O sacerdote não teme os sacrifícios, pois sabe que, em sua perda, pode salvar vidas. E, em sua bondade, pode até mesmo devolver o que o destino tomara, ressuscitando aqueles que foram tomados pela morte, com a promessa de um novo amanhã. O sacerdote é um ser de dualidade: forte, mas gentil; humilde, mas poderoso. Cada ação sua ressoa com um propósito que transcende a compreensão humana, e sua presença é tanto uma bênção quanto uma lembrança de que, no final, todos devemos, em algum momento, buscar a luz nas sombras.",
      "atributos": "Cada Regalia comprada na especialização Sarcedote(a) fornece:\n- 4 Pontos de Vida\n- 0 Pontos de Estâmina\n- 6 Ponto em Magia",
      "regaliaObrigatoria": {
        "descricao": "Ao escolher esta especialização, o personagem recebe os seguintes atributos :",
        "pontos": {
          "atributos": {
            "quantidade": 2,
            "opcoes": ["Fortitude", "Arcanismo"]
          },
          "combate": {
            "quantidade": 1,
            "opcoes": ["Arcanismo", "Combate Arcano "]
          },
          "habilidades": {
            "quantidade": 2,
            "opcoes": ["Medicina", "Estudo Religioso", "Intuição", "Percepção"]
          },
          "proficiências": null
        },
        "outrasProficiencias": [
          "Armaduras Pesadas",
          "Todos os Escudos"
        ],
        "habilidade": [{
          "nome": "Cura Maior",
          "tipo": "(Ação) (Milagre)",
          "descricao": "Esse milagre cura 3d4 Pontos de Vida de até 5 aliados que estejam em até 18 metros. Custa 1 ponto de Magia. Aumenta a cura em 1d4 Pontos de Vida para cada 2 pontos de magia adicionais ao realizar o milagre.",
        }]
      },
      "regalias": [
        {
          "nome": "Cura Maior Estendida",
          "tipo": "Passiva",
          "descricao": "Quando um sacerdote com esta regalia conjura o milagre Cura Maior, a cura se repete em seu turno seguinte nos alvos afetados.",
          "custoMagia": null,
          "chanceDeSucesso": "100%",
          "dano": null,
          "requisito": "Sacerdote com a regalia",
          "efeitos": {
            "passivo": "A cura é repetida no turno seguinte."
          },
          "modificadores": {
            "bonusSucesso": null,
            "usoExtra": null,
            "duracaoExtra": null
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": "Pode ser combinado com Cura Maior Melhorada para aplicar Abençoar também."
          }
        },
        {
          "nome": "Cura Maior Melhorada",
          "tipo": "Passiva",
          "descricao": "Ao realizar o milagre Cura Maior, o Sacerdote pode escolher que o efeito de Abençoar seja aplicado às criaturas escolhidas.",
          "custoMagia": null,
          "chanceDeSucesso": "100%",
          "dano": null,
          "requisito": "Sacerdote com Cura Maior",
          "efeitos": {
            "passivo": "Abençoar é aplicado às criaturas escolhidas ao realizar Cura Maior."
          },
          "modificadores": {
            "bonusSucesso": null,
            "usoExtra": null,
            "duracaoExtra": null
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": "Combina bem com Cura Maior Estendida, repetindo o efeito no próximo turno."
          }
        },
        {
          "nome": "Abençoar Arma Melhorado",
          "tipo": "Ação",
          "descricao": "Abençoa até 5 armas e muda o tipo de dano da arma para Sagrado. Dura 10 rodadas. Aumenta o dano da arma em 1d4.",
          "custoMagia": "1 ponto de Magia",
          "chanceDeSucesso": "100%",
          "dano": "1d4 adicional",
          "requisito": "Abençoar Arma",
          "efeitos": {
            "passivo": null,
            "ativo": "Abençoa até 5 armas, muda o tipo de dano para Sagrado e aumenta o dano em 1d4."
          },
          "modificadores": {
            "bonusSucesso": null,
            "usoExtra": null,
            "duracaoExtra": null
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": "Pode ser combinado com outras regalias que aumentam o dano de armas."
          }
        },
        {
          "nome": "Sacrifício",
          "tipo": "Ação",
          "descricao": "O sacerdote pode se sacrificar para salvar aliados à Beira da Morte. Ele fica à Beira da Morte e consome metade de sua mana atual, mas com gasto mínimo de 10.",
          "custoMagia": "10 pontos de Magia",
          "chanceDeSucesso": "5% por pessoa salva",
          "dano": null,
          "requisito": "Sacerdote com Mana suficiente",
          "efeitos": {
            "passivo": null,
            "ativo": "O Sacerdote fica à Beira da Morte e consome metade de sua mana para salvar aliados."
          },
          "modificadores": {
            "bonusSucesso": "Pode receber 2d10 de vida e magia no próximo turno.",
            "usoExtra": null,
            "duracaoExtra": null
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": null
          }
        },
        {
          "nome": "Ressuscitar",
          "tipo": "Ação",
          "descricao": "Restaura uma criatura morta em até 10 minutos de sua morte. A criatura retorna com 10 pontos de vida, mas com a condição Cansado 4.",
          "custoMagia": "10 pontos de Magia",
          "chanceDeSucesso": "100%",
          "dano": null,
          "requisito": "Criatura morta em até 10 minutos",
          "efeitos": {
            "passivo": null,
            "ativo": "Restaura uma criatura morta com 10 pontos de vida e a condição Cansado 4."
          },
          "modificadores": {
            "bonusSucesso": null,
            "usoExtra": "Apenas uma vez por dia.",
            "duracaoExtra": null
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": null
          }
        },
        {
          "nome": "Restauração Maior",
          "tipo": "Ação",
          "descricao": "Tira completamente as condições Envenenado, Congelado, Queimando e Cansado do alvo.",
          "custoMagia": "10 pontos de Magia",
          "chanceDeSucesso": "100%",
          "dano": null,
          "requisito": "Sacerdote",
          "efeitos": {
            "passivo": null,
            "ativo": "Remove Envenenado, Congelado, Queimando e Cansado do alvo."
          },
          "modificadores": {
            "bonusSucesso": null,
            "usoExtra": null,
            "duracaoExtra": null
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": null
          }
        },
        {
          "nome": "Crítico Guiado",
          "tipo": "Reação",
          "descricao": "Aumenta a chance de crítico de uma criatura em até 18 metros de distância. Ao iluminar um ponto no alvo do ataque, o noviço gera +2 na margem de crítico.",
          "custoMagia": "5 pontos de Magia",
          "chanceDeSucesso": "100%",
          "dano": null,
          "requisito": "Criatura em até 18 metros de distância",
          "efeitos": {
            "passivo": null,
            "ativo": "Aumenta a chance de crítico no alvo em até +2."
          },
          "modificadores": {
            "bonusSucesso": null,
            "usoExtra": null,
            "duracaoExtra": null
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": null
          }
        },
        {
          "nome": "Empatia",
          "tipo": "Ação",
          "descricao": "Cria uma ligação com o aliado e divide a dor e sofrimento recebido por ele.",
          "custoMagia": "2 pontos de Magia",
          "chanceDeSucesso": "100%",
          "dano": null,
          "requisito": "Sacerdote e aliado",
          "efeitos": {
            "passivo": null,
            "ativo": "Divide o dano recebido pelo aliado."
          },
          "modificadores": {
            "bonusSucesso": null,
            "usoExtra": null,
            "duracaoExtra": null
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": null
          }
        },
        {
          "nome": "Silêncio",
          "tipo": "Ação",
          "descricao": "Impedir todos os alvos dentro de 3 metros de raio de usar qualquer magia, feitiço ou milagre até o fim do próximo turno.",
          "custoMagia": "5 pontos de Magia",
          "chanceDeSucesso": "100%",
          "dano": null,
          "requisito": "Sacerdote",
          "efeitos": {
            "passivo": null,
            "ativo": "Impedir o uso de habilidades mágicas em uma área."
          },
          "modificadores": {
            "bonusSucesso": null,
            "usoExtra": null,
            "duracaoExtra": null
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": null
          }
        },
        {
          "nome": "Clemência",
          "tipo": "Ação",
          "descricao": "Abencoar todos os aliados em até 9 metros com Abençoar e todos os inimigos com Marca Divina.",
          "custoMagia": "10 pontos de Magia",
          "chanceDeSucesso": "100%",
          "dano": null,
          "requisito": "Sacerdote",
          "efeitos": {
            "passivo": null,
            "ativo": "Abençoa aliados e marca inimigos com suas respectivas magias."
          },
          "modificadores": {
            "bonusSucesso": null,
            "usoExtra": null,
            "duracaoExtra": null
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": null
          }
        }
      ]
    },
    {
      "titulo": "EXORCISTA",
      "img": exorcista,
      "descricao": "O Exorcista é um guardião das fronteiras entre os mundos, aquele que caminha onde as sombras se amontoam e o vazio sussurra promessas de destruição. Com uma fé inabalável, sua jornada é tanto uma busca espiritual quanto uma luta constante contra as forças que tentam corromper a humanidade. Armado com o conhecimento profundo de rituais sagrados e uma compreensão singular da natureza do mal, o Exorcista se vê como um juiz e executor, encarregado de purificar aqueles que foram tomados por demônios ou mortos-vivos. Sua capacidade de discernir e purificar é moldada por uma conexão direta com o divino, capaz de invocar milagres que envolvem purificação, iluminação e julgamento. A habilidade de fazer o mal retroceder, como um farol de luz contra as trevas, é acompanhada de uma habilidade de adaptação impressionante. Os Exorcistas podem manipular a energia celestial para criar esferas que protejam seus aliados, ou lançar ataques devastadores contra os corruptores da vida e da morte. Sua oração, como um eco de uma autoridade superior, permite que sua lâmina espiritual corte através das mentiras e corrupções, trazendo tanto a vingança quanto a cura. Porém, sua luta não é apenas contra os demônios externos. O Exorcista é muitas vezes um ser solitário, forjado na dor e na dúvida, testado pela escuridão que ameaça devorar sua própria alma. Ao conjurar a Marca Divina ou executar rituais de purificação, ele não só age sobre o mal, mas também reflete sobre sua própria humanidade, buscando o equilíbrio entre a justiça e a misericórdia. A batalha que trava, tanto no campo espiritual quanto físico, é uma busca constante pelo propósito, pela proteção dos inocentes e pela destruição de tudo o que corrompe o que é puro.",
      "atributos": "Cada Regalia comprada na especialização Exorcista(a) fornece:\n- 5 Pontos de Vida\n- 0 Pontos de Estâmina\n- 5 Ponto em Magia",
      "regaliaObrigatoria": {
        "descricao": "Ao escolher esta especialização, o personagem recebe os seguintes atributos :",
        "pontos": {
          "atributos": {
            "quantidade": 2,
            "opcoes": ["Combate Arcano ", "Arcanismo"]
          },
          "combate": {
            "quantidade": 1,
            "opcoes": ["Combate Arcano", "Ocultismo"]
          },
          "habilidades": {
            "quantidade": 2,
            "opcoes": ["Ritualismo", "Teologia", "História"]
          },
          "proficiências": ["Nenhuma nova proficiência."]
        },
        "habilidade": [{
          "nome": " Purificar corruptores ",
          "tipo": "Milagre  (2 Ações)",
          "descricao": "O milagre consiste em Purificar corruptores em um raio de 9 metros de distância. Todos os mortos vivos e demônios dentro desta área sofrem 2d10 de dano e perdem uma ação no próximo turno. Custa 3 pontos de Magia.",
        }]
      },
      "regalias": [
        {
          "nome": "Julgar Alma",
          "tipo": "Ação",
          "descricao": "O exorcista ora para que seu deus julgue uma criatura em seu nome. Deixa o alvo cego, surdo e restringido até o fim do turno. No final, há 30% de chance de causar 5d10 de dano.",
          "custoEstamina": null,
          "custoMagia": 5,
          "chanceDeSucesso": "30%",
          "dano": "5d10",
          "requisito": null,
          "efeitos": {
            "passivo": null,
            "ativo": "Cada 5 pontos de magia adicionais aumentam a chance de sucesso em 5%."
          },
          "modificadores": {
            "bonusSucesso": null,
            "usoExtra": null,
            "duracaoExtra": null
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": null
          }
        },
        {
          "nome": "Explosão Sagrada",
          "tipo": "Passiva",
          "descricao": "Ao conjurar Chama Sagrada, o exorcista explode o alvo e todos a até 6m. Causa dano normal ao alvo e 1d8 extra em mortos-vivos.",
          "custoEstamina": null,
          "custoMagia": null,
          "chanceDeSucesso": null,
          "dano": "Dano normal + 1d8 (mortos-vivos)",
          "requisito": "Chama Sagrada",
          "efeitos": {
            "passivo": "Explosão de dano em área.",
            "ativo": null
          },
          "modificadores": {
            "bonusSucesso": null,
            "usoExtra": null,
            "duracaoExtra": null
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": "Melhora Chama Sagrada"
          }
        },
        {
          "nome": "Marca do Julgamento",
          "tipo": "Passiva",
          "descricao": "Ao conjurar a Marca Divina, causa o dano inicial e repete o dano ao conjurar outros milagres. Causa 1d8 extra em mortos-vivos e demônios.",
          "custoEstamina": null,
          "custoMagia": null,
          "chanceDeSucesso": null,
          "dano": "Dano inicial + 1d8 (mortos-vivos/demônios)",
          "requisito": "Marca Divina",
          "efeitos": {
            "passivo": "Dano recorrente com novos milagres.",
            "ativo": null
          },
          "modificadores": {
            "bonusSucesso": null,
            "usoExtra": null,
            "duracaoExtra": null
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": "Amplifica Marca Divina"
          }
        },
        {
          "nome": "Esfera Divina Completa",
          "tipo": "Ação",
          "descricao": "O exorcista cria até 5 esferas sagradas que duram 1h. Cada esfera dá -10% na chance de sucesso de maldições e controle mental.",
          "custoEstamina": null,
          "custoMagia": "2 por esfera",
          "chanceDeSucesso": null,
          "dano": null,
          "requisito": null,
          "efeitos": {
            "passivo": null,
            "ativo": "Protege aliados próximos e projeta luz."
          },
          "modificadores": {
            "bonusSucesso": null,
            "usoExtra": null,
            "duracaoExtra": null
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": null
          }
        },
        {
          "nome": "Atirar Esfera Divina",
          "tipo": "Ação",
          "descricao": "Permite atirar esferas divinas. Causa 2d10 de dano por esfera e 1d10 extra em corruptores.",
          "custoEstamina": null,
          "custoMagia": "4 por esfera",
          "chanceDeSucesso": null,
          "dano": "2d10 por esfera + 1d10 (corruptores)",
          "requisito": "Esfera Divina, Teologia 4, Ocultismo 4",
          "efeitos": {
            "passivo": null,
            "ativo": "Permite lançar múltiplas esferas de uma vez."
          },
          "modificadores": {
            "bonusSucesso": null,
            "usoExtra": null,
            "duracaoExtra": null
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": "Melhora Esfera Divina"
          }
        },
        {
          "nome": "Lente investigativa Melhorada",
          "tipo": "Passiva",
          "descricao": "Aumenta o alcance do milagre em 6m. Dura 10 minutos a mais. Causa 1d4 de dano a mortos-vivos e demônios dentro da área a cada rodada ou 6 segundos se estiver fora de combate. A área fica em meia luz caso esteja em escuridão, criaturas dentro desta área ficam iluminadas e destacadas do ambiente como se estivessem em luz completa.",
          "custoEstamina": null,
          "custoMagia": null,
          "chanceDeSucesso": null,
          "dano": "1d4 (contra mortos-vivos e demônios por rodada)",
          "requisito": null,
          "efeitos": {
            "passivo": "Aumenta o alcance, causa dano contínuo a inimigos específicos e ilumina a área.",
            "ativo": null
          },
          "modificadores": {
            "bonusSucesso": null,
            "usoExtra": null,
            "duracaoExtra": null
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": null
          }
        },
        {
          "nome": "Arma divina",
          "tipo": "Ação",
          "descricao": "Uma arma divina astral começa a flutuar a 1,5 metros do Exorcista. Após conjurar, pode usar uma ação para mover a arma em até 9 m. Ao usar a ação para atacar, pode usar a arma divina no lugar de um ataque com arma, ela causa 1d12 de dano. Duração de 10 rodadas.",
          "custoEstamina": null,
          "custoMagia": "6",
          "chanceDeSucesso": null,
          "dano": "1d12",
          "requisito": null,
          "efeitos": {
            "passivo": null,
            "ativo": "Invoca uma arma astral que pode ser controlada e causa dano ao atacar."
          },
          "modificadores": {
            "bonusSucesso": null,
            "usoExtra": null,
            "duracaoExtra": null
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": null
          }
        },
        {
          "nome": "Proteção contra o sombrio",
          "tipo": "Ação",
          "descricao": "Cria uma área protetora de 18 metros de raio ao redor do exorcista. Esta área atribui desvantagem em ataques feitos por corruptores. Para cada aliado protegido, o exorcista ganha um bônus de Combate Arcano igual a +1.",
          "custoEstamina": null,
          "custoMagia": "5",
          "chanceDeSucesso": null,
          "dano": null,
          "requisito": null,
          "efeitos": {
            "passivo": null,
            "ativo": "Cria uma área que penaliza ataques inimigos e fortalece o exorcista."
          },
          "modificadores": {
            "bonusSucesso": null,
            "usoExtra": null,
            "duracaoExtra": null
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": null
          }
        },
        {
          "nome": "Oração de reflexão",
          "tipo": "Milagre",
          "descricao": "O Exorcista que tiver esferas divinas em volta de si pode girá-las para se defender de ofensores. Ao receber um ataque enquanto essa habilidade estiver ativa, causa 1d8 de dano por esfera conjurada ao atacante. Duração de 5 turnos.",
          "custoEstamina": null,
          "custoMagia": "10",
          "chanceDeSucesso": null,
          "dano": "1d8 por esfera",
          "requisito": "Esfera divina",
          "efeitos": {
            "passivo": null,
            "ativo": "Reflete dano em atacantes usando esferas divinas."
          },
          "modificadores": {
            "bonusSucesso": null,
            "usoExtra": null,
            "duracaoExtra": null
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": null
          }
        },
        {
          "nome": "Exorcista de Combate",
          "tipo": "Especialização",
          "descricao": "1 ponto em fortitude e agilidade. 2 pontos em combate corpo a corpo ou distância. 1 em Força ou Destreza. Proficiência com todas as armas simples e marciais, escudos e armaduras.",
        }
      ]


    },
  ]
  const EspecializacaoFeiticeiroSkillsData = [
    {
      "titulo": "Xamã",
      "img": xama,
      "descricao": "O Xamã é um andarilho entre os véus da vida e da morte, um mediador entre os sussurros dos espíritos e o pulsar da terra viva. Seu corpo é marcado por símbolos antigos, gravados não pela mão dos homens, mas pelos próprios ecos do além, e sua voz, quando invoca os nomes esquecidos do outro lado, ressoa como um lamento antigo que faz a própria natureza estremecer. Ele não comanda os mortos como um tirano impiedoso, mas os guia como um pastor sombrio, oferecendo-lhes propósito onde antes havia apenas vazio. O vento carrega murmúrios de almas perdidas em sua presença, e as sombras se alongam como se buscassem seu toque. Quando o Xamã caminha, corvos o seguem, lobos observam à distância e até mesmo os insetos rastejam em sua direção, atraídos por uma força invisível e inevitável. Ele é a ponte entre o mundo dos vivos e a vastidão sem nome do pós-vida, tecendo pactos e trocas em uma linguagem que só os mortos compreendem. Onde ele passa, a terra apodrece e floresce em igual medida, e os vivos o temem tanto quanto os espíritos o reverenciam. Ele é o arauto do ciclo eterno — aquele que dá, toma e restaura, sem piedade e sem remorso.",
      "atributos": "Cada Regalia comprada na especialização Xamã fornece:\n- 3 Pontos de Vida\n- 0 Pontos de Estâmina\n- 7 Ponto em Magia",
      "regaliaObrigatoria": {
        "descricao": "Ao escolher esta especialização, o personagem recebe os seguintes atributos :",
        "pontos": {
          "atributos": {
            "quantidade": 2,
            "opcoes": ["Ritualismo", "Ocultismo"]
          },
          "combate": {
            "quantidade": 1,
            "opcoes": ["Destreza", "Combate Arcano "]
          },
          "habilidades": {
            "quantidade": 2,
            "opcoes": ["Natureza", "Estudo Religioso", "Intuição", "Sobrevivência"]
          },
          "proficiências": null
        },
        "outrasProficiencias": null,
        "habilidade": [{
          "nome": "Ciclo Sem Fim",
          "tipo": "(Passiva) ",
          "descricao": "Pré-Requisito: Espiritomancia. Sempre que uma criatura, não humanoide e de tamanho médio ou menor, morre em até 9 metros do Xamã, enquanto ele estiver com o rito espiritomancia ativo. Há uma chance de 50% de um dos espíritos possuir o corpo da criatura morta. A criatura retorna como um morto-vivo comandado pelo Xamã. Possui 2 vezes o valor do ocultismo do xamã em pontos de vida e é incapaz de utilizar feitiços, magias, milagres e afins. Seus ataques são considerados mágicos, desarmados e causam 1d8 de dano necrótico.",
        }]
      },
      "regalias": [{
        "nome": "Sacrifício",
        "tipo": "Ação",
        "descricao": "O Xamã explode um dos seus fantoches ou invocações causando dano necrótico igual ao valor do ocultismo do xamã + 1d12, em uma área de 3 metros de raio. Custa 6 pontos de magia para cada criatura que explodir através desta regalia.",
        "custoMagia": 6,
        "dano": "Ocultismo do Xamã + 1d12 de dano necrótico"
      },
      {
        "nome": "Banquete Mórbido",
        "tipo": "Ativa",
        "descricao": "O Xamã consome um dos seus mortos-vivos, recuperando pontos de vida equivalentes ao seu valor de ocultismo + ritualismo. Não possui custo de magia.",
        "bonus": {
          "vidaTemporaria": "Ocultismo + Ritualismo"
        }
      },
      {
        "nome": "Amigos do Outro Lado",
        "tipo": "Reação",
        "descricao": "Quando for realizar um teste da aba de Conhecimento, o Xamã pode realizar um ritual para tentar contatar um espírito para auxiliá-lo. O Xamã recebe um bônus de +10 no referido teste. Custa 5 pontos de Magia e 5 moedas de custo para o material de ritual. Se o xamã tiver mais que 5 em seu ritualismo ele não precisa dos materiais para o ritual.",
        "custoMagia": 5,
        "efeitos": {},
        "modificadores": {
          "bonusSucesso": "Bônus de +10 em teste de Conhecimento"
        }
      },
      {
        "nome": "Fantoche de Carne",
        "tipo": "Ritual",
        "descricao": "Este ritual anima uma pequena criatura utilizando um espírito da natureza, este ritual não tem limite de duração, ela desaparece apenas quando for morta. A criatura pode atacar usando o Combate Arcano do Feiticeiro(a) e tem seu valor de ritualismo x 2 em pontos de vida. Seus ataques causam 1d4 + o valor de ocultismo do xamã em dano necrótico. Custa 5 moedas de ouro em materiais para o ritual. Custa 5 pontos de magia e para cada 1 ponto extra o fantoche recebe mais 2 pontos de vida.",
        "custoMagia": 5,
        "dano": "1d4 + Ocultismo do Xamã de dano necrótico",
        "modificadores": {
          "usoExtra": "Custa 5 pontos de magia e para cada 1 ponto extra o fantoche recebe mais 2 pontos de vida"
        }
      },
      {
        "nome": "Matilha Carniceira",
        "tipo": "Ação",
        "descricao": "O Xamã invoca um Cão Zumbi para lutar ao seu lado em um ponto a até 6 metros de distância, o Cão possui pontos de Vida igual a 3 vezes o nível do Xamã e seu Valor de Defesa é 7+ valor de ritualismo. Ele pode realizar ataques de mordida e de garra em sua rodada com dano igual ao valor de ocultismo do xamã. Custa 5 pontos de magia. O Xamã pode invocar somente um cão por ação.",
        "custoMagia": 5,
        "dano": "Ocultismo do Xamã",
        "modificadores": {
          "usoExtra": "Somente um cão pode ser invocado por ação"
        }
      },
      {
        "nome": "Aparição Assombrada",
        "tipo": "Ação",
        "descricao": "O Xamã invoca um espírito de tamanho grande em um ponto que consiga ver a até 18 metros de distância. As criaturas em uma área de até 12 metros têm 50% de chance de entrar na condição Aterrorizado. Custa 4 pontos de magia. A cada 2 pontos de magia gastos a mais, aumenta em 5% a chance de sucesso do feitiço.",
        "custoMagia": 4,
        "chanceDeSucesso": "50%",
        "efeitos": {},
        "modificadores": {
          "bonusSucesso": "A cada 2 pontos de magia gastos a mais, aumenta em 5% a chance de sucesso do feitiço"
        }
      },
      {
        "nome": "Ciclo Sem Fim Aprimorado",
        "tipo": "Passiva",
        "descricao": "Sempre que uma criatura morre próximo do Xamã, enquanto ele estiver com o rito espiritomancia ativo e a uma distância de 12 metros, há uma chance de 10% de um dos espíritos possuir o corpo da criatura morta. A criatura retorna como um morto-vivo comandado pelo Xamã. Possui metade dos pontos de vida da criatura original e é incapaz de utilizar feitiços, magias, milagres e afins. Só pode ser de tamanho médio ou menor.",
        "efeitos": {
          "passivo": "Chance de espírito possuir corpo de criatura morta"
        }
      },
      {
        "nome": "Ciclo Sem Fim Supremo",
        "tipo": "Passiva",
        "descricao": "Uma chance de 20% de um dos espíritos possuir o corpo da criatura morta, independente de seu tamanho, desde que esteja em até 6 metros do Xamã. A criatura retorna como um morto-vivo comandado pelo Xamã. Possui metade dos pontos de vida da criatura original e metade dos seus pontos de magia (caso a criatura original os possua). A criatura consegue lançar os feitiços conhecidos pela criatura ou pelo feiticeiro.",
        "efeitos": {
          "passivo": "Chance de espírito possuir corpo de criatura morta e poder lançar feitiços"
        }
      },
      {
        "nome": "Festim Macabro",
        "tipo": "Feitiço",
        "descricao": "Uma revoada de espíritos surge em uma área de 6 metros ao redor do Xamã e o circundam durante 10 rodadas. Os inimigos dentro da área recebem 3d6 pontos de dano quando entram na área pela primeira vez e quando começa o turno dentro dela. Os inimigos que entrarem na área pela primeira vez tem 50% de chance de entrar na condição Aterrorizado pelos agouros dos espíritos. Inimigos dentro da área possuem movimento difícil e gastam o dobro de movimento que gastariam normalmente (3 metros para cada 1,5 metros de movimento).",
        "custoEstamina": null,
        "custoMagia": "10 pontos de magia",
        "chanceDeSucesso": null,
        "dano": "3d6 pontos de dano. A cada 5 pontos de magia aumenta o dano em 2d6.",
        "efeitos": {
          "ativo": "Os inimigos que entrarem na área pela primeira vez e os que começam o turno dentro dela sofrem dano e podem entrar na condição Aterrorizado. Além disso, o movimento dentro da área é reduzido, com gasto dobrado de movimento."
        },
        "modificadores": null,
        "bonus": null,
        "interacoes": null
      },
      {
        "nome": "Necroanimação",
        "tipo": "Ritual",
        "descricao": "O Xamã pode reanimar um ser de tamanho grande ou menor, que esteja em até 6 metros de distância como um morto vivo em um ritual que dura aproximadamente 1 hora. O morto-vivo retorna como a criatura que foi morta, mas possuída por um espírito sob o comando do Xamã. Um ser necroanimado é incapaz de se usar milagres ou receber cura de milagres conjurados nele. Possui os mesmos status da criatura que era antes de morrer.",
        "custoEstamina": null,
        "custoMagia": "10 pontos de magia",
        "chanceDeSucesso": null,
        "dano": null,
        "requisito": "Fantoche de Carne",
        "efeitos": {
          "ativo": "Ritual de necroanimação que dura 1 hora para reanimar um morto-vivo sob o controle do Xamã."
        },
        "modificadores": null,
        "bonus": null,
        "interacoes": null
      },
      {
        "nome": "Terreno Apodrecido",
        "tipo": "Feitiço",
        "descricao": "O Xamã amaldiçoa o solo em uma área de 12 metros de raio, em um ponto a 100 metros de distância. As criaturas que passarem por esse terreno perdem metade do seu movimento e recebem 1d4 de dano necrótico a cada 1,5m que caminham na área.",
        "custoEstamina": null,
        "custoMagia": "7 pontos de magia",
        "chanceDeSucesso": null,
        "dano": "1d4 de dano necrótico a cada 1,5 metros percorridos. A cada 7 pontos de magia gastos a mais, o dano aumenta em 1d4.",
        "efeitos": {
          "ativo": "A área amaldiçoada reduz o movimento e causa dano necrótico às criaturas que nela passarem."
        },
        "modificadores": null,
        "bonus": null,
        "interacoes": null
      },
      {
        "nome": "Maestria Necrótica",
        "tipo": "Passiva",
        "descricao": "Todos os mortos-vivos invocados pelo Xamã passam a causar 1d10 pontos de dano necrótico adicionais.",
        "custoEstamina": null,
        "custoMagia": null,
        "chanceDeSucesso": null,
        "dano": null,
        "requisito": null,
        "efeitos": {
          "passivo": "Os mortos-vivos invocados pelo Xamã causam dano necrótico adicional."
        },
        "modificadores": null,
        "bonus": null,
        "interacoes": null
      },
      {
        "nome": "Praga",
        "tipo": "Feitiço",
        "descricao": "O Xamã invoca um enxame de insetos, répteis ou anfíbios rastejantes e peçonhentos que avançam em um alvo em até 72 metros. O alvo recebe 4d6 pontos de dano e tem 75% de chance de ficar nas condições Devagar e Cego por 5 turnos.",
        "custoEstamina": null,
        "custoMagia": "5 pontos de Magia",
        "chanceDeSucesso": null,
        "dano": "4d6 pontos de dano. Aumenta o dano em 1d6 para cada 2 pontos de magia adicionais.",
        "efeitos": {
          "ativo": "O alvo recebe dano e tem chances de ficar Devagar e Cego por 5 turnos."
        },
        "modificadores": null,
        "bonus": null,
        "interacoes": null
      }
      ]

    },
    {
      "titulo": "Elementalista",
      "img": elementalista,
      "descricao": "O Elementalista, moldador dos próprios fios da criação, caminha entre os mundos do fogo, da terra, do ar e da água como um maestro conduzindo uma sinfonia cósmica. Seus olhos refletem tempestades distantes e mares revoltos, enquanto suas mãos, calejadas não pelo trabalho comum, mas pelo toque da essência primordial, desenham símbolos no ar que vibram com o poder dos próprios alicerces do mundo. Ele não domina os elementos, mas dança com eles em uma harmonia ancestral, persuadindo a chama a rugir como um dragão acordado ou a brisa a sussurrar segredos esquecidos pelos mortais. Rochas se erguem sob seus pés como servos antigos despertos de seu sono de eras, e rios desviam seu curso obedientes à sua silenciosa vontade. Onde o Elementalista passa, a natureza o reconhece — árvores inclinam seus galhos em reverência, e trovões ecoam seu nome nas montanhas distantes. Ele é um ser à parte, nem mestre nem servo, mas um intermediário entre o mundo dos homens e o coração selvagem da própria terra. Em seus passos ecoa o crepitar das chamas, o sussurro do vento, o rugido das marés e o sussurro das pedras — uma sinfonia eterna da qual ele é tanto condutor quanto parte.",
      "atributos": "Cada Regalia comprada na especialização Elementalista(a) fornece:\n- 5 Pontos de Vida\n- 0 Pontos de Estâmina\n- 5 Ponto em Magia",
      "regaliaObrigatoria": {
        "descricao": "Ao escolher esta especialização, o personagem recebe os seguintes atributos :",
        "pontos": {
          "atributos": {
            "quantidade": 2,
            "opcoes": ["Arcanismo", "Natureza"]
          },
          "combate": {
            "quantidade": 1,
            "opcoes": ["Combate Arcano", "Ritualismo"]
          },
          "habilidades": {
            "quantidade": 2,
            "opcoes": ["Natureza", "Alquimia", "Condução exótica"]
          },
          "proficiências": ["Nenhuma nova proficiência."]
        },
        "habilidade": [{
          "nome": "Dominar Elemento Avançado",
          "tipo": "Feitiço( Ação)",
          "descricao": "Criar fortes rajadas de vento capazes de abrir portas e janelas, além de empurrar criaturas médias ou menores em 3 metros para trás. Mover 1 metro cúbico de terra solta ou abrir 1 metros cúbico de passagem em rocha sólida a cada 6 segundos. Acender uma fogueira, vela, tocha e qualquer combustível com chamas. Pode também criar uma chama em sua mão que tem duração de 1 hora ou até arremessar em em alguma direção em até 6 metros. Causa 1d6 de dano no que acertar. Custa 2 pontos de magia.Controlar até 10 metros cúbicos de água, podendo modelar sua forma  e sua cor, e congelar porções dessa água (10 litros a cada 6 segundos). Acender estalos de eletricidade que causam flashes de luz. Esses flashes têm 50% de chance de cegar uma criatura por 6 segundos. Além disso, pode manter a faísca elétrica em sua mão e causar um pouco de dano em alguma criatura que tocar em alcance corpo a corpo. Causa 1d8 de dano. ",
        }]
      },
      "regalias": [
        {
          "nome": "Montaria Elemental",
          "tipo": "Ritual",
          "descricao": "O elementalista faz um ritual para conjurar uma montaria elemental, que não consegue voar e é grande ou muito grande. Escolha um elemento para a montaria ser imune. A montaria tem habilidades baseadas no elemento escolhido.",
          "custoEstamina": 0,
          "custoMagia": 0,
          "efeitos": {
            "ativo": "Dependente do elemento escolhido, a montaria recebe habilidades como ar, fogo, raio, terra ou água."
          },
          "modificadores": {
            "usoExtra": "Uma vez a cada 10 minutos."
          }
        },
        {
          "nome": "Companheiro Elemental",
          "tipo": "Ritual",
          "descricao": "O elementalista realiza um ritual para invocar uma criatura pequena que não consegue voar. A criatura é imune a um elemento de sua escolha e recebe habilidades baseadas no elemento selecionado.",
          "custoEstamina": 0,
          "custoMagia": 0,
          "efeitos": {
            "ativo": "Dependente do elemento escolhido, o companheiro recebe habilidades como ar, fogo, raio, terra ou água."
          },
          "modificadores": {
            "usoExtra": "Uma vez a cada 10 minutos."
          }
        },
        {
          "nome": "Ataque Elemental Múltiplo",
          "tipo": "Ação",
          "descricao": "O elementalista dispara três jatos de elementos à sua escolha, causando 2d10 de dano para cada jato. Cada jato tem 40% de chance de aplicar um efeito no alvo.",
          "custoEstamina": 0,
          "custoMagia": 6,
          "chanceDeSucesso": 40,
          "dano": "2d10",
          "efeitos": {
            "ativo": "Chance de aplicar efeitos como sangramento, atordoado, congelado, queimando ou surdo/cego dependendo do elemento."
          }
        },
        {
          "nome": "Armadura Elemental Melhorada",
          "tipo": "Feitiço",
          "descricao": "Cria uma armadura elemental que fornece pontos de vida temporários iguais ao valor de arcanismo + ocultismo do elementalista e causa dano de retaliação no atacante.",
          "custoEstamina": 0,
          "custoMagia": 10,
          "efeitos": {
            "passivo": "Causa dano de retaliação a cada ataque corpo a corpo que o elementalista recebe enquanto tiver pontos de vida temporários."
          },
          "modificadores": {
            "duracaoExtra": "5 pontos de magia para cada 5 pontos adicionais de vida temporária."
          },
          "bonus": {
            "vidaTemporaria": "Valor igual a arcanismo + ocultismo."
          }
        },
        {
          "nome": "Nevasca",
          "tipo": "Feitiço",
          "descricao": "Cria uma tempestade de neve que causa dano e tem 70% de chance de aplicar congelamento. Dura por rodadas baseadas no arcanismo do conjurador.",
          "custoEstamina": 0,
          "custoMagia": 10,
          "dano": "3d6",
          "efeitos": {
            "ativo": "Todas as criaturas na área ficam Devagar e recebem dano ao entrar ou começar o turno na área."
          },
          "modificadores": {
            "duracaoExtra": "Dura por rodadas iguais ao arcanismo do conjurador."
          }
        },
        {
          "nome": "Pilar de Chamas",
          "tipo": "Feitiço",
          "descricao": "Cria uma coluna de chamas que causa dano às criaturas dentro do raio. O elementalista pode mover o pilar após a conjuração.",
          "custoEstamina": 0,
          "custoMagia": 10,
          "dano": "9d4",
          "efeitos": {
            "ativo": "Causa dano de fogo às criaturas na área e tem 60% de chance de aplicar o efeito 'Queimando'."
          },
          "modificadores": {
            "duracaoExtra": "Dura por rodadas iguais ao arcanismo do conjurador."
          }
        },
        {
          "nome": "Tempestade de Raios",
          "tipo": "Feitiço",
          "descricao": "Cria uma área de raios que causa dano e tem chance de paralisar as criaturas dentro da área. Dura por rodadas baseadas no arcanismo.",
          "custoEstamina": 0,
          "custoMagia": 10,
          "dano": "6d6",
          "efeitos": {
            "ativo": "Chance de paralisia e dano adicional para criaturas com armadura de metal."
          },
          "modificadores": {
            "duracaoExtra": "Dura por rodadas iguais ao arcanismo do conjurador."
          }
        },
        {
          "nome": "Terremoto",
          "tipo": "Feitiço",
          "descricao": "Cria um terremoto que causa dano e tem chance de restringir as criaturas dentro da área. Também cria terreno difícil que causa dano adicional.",
          "custoEstamina": 0,
          "custoMagia": 10,
          "dano": "3d6",
          "efeitos": {
            "ativo": "Causa dano de terra e cria terreno difícil."
          },
          "modificadores": {
            "duracaoExtra": "Dura por rodadas iguais ao arcanismo do conjurador."
          }
        },
        {
          "nome": "Furacão",
          "tipo": "Feitiço",
          "descricao": "O feitiço cria uma área de 4,5 metros de raio em um ponto que o elementalista consegue ver em até 30 metros. Criaturas dentro do raio sofrem 3d10 +6 pontos de dano de impacto ao entrarem ou começarem o turno na área. O feitiço tem 40% de chance de causar Surdo e Devagar em quem toma dano da área.",
          "custoEstamina": 0,
          "custoMagia": 10,
          "efeitos": {
            "ativo": "Causa dano de impacto em uma área, com chance de aplicar Surdo e Devagar nos inimigos que tomam dano."
          },
          "modificadores": {
            "duracaoExtra": "O efeito dura por um número de rodadas igual ao valor de arcanismo do elementalista."
          }
        },
        {
          "nome": "Espinho de Gelo",
          "tipo": "Feitiço",
          "descricao": "O feitiço cria um enorme espinho de gelo a partir do chão para acertar uma criatura em até 9 metros. Causa 5d6 de dano de gelo e 5d6 de dano perfurante.",
          "custoEstamina": 0,
          "custoMagia": 10,
          "efeitos": {
            "ativo": "Causa dano de gelo e dano perfurante a uma criatura."
          }
        },
        {
          "nome": "Lança Chamas",
          "tipo": "Feitiço",
          "descricao": "O feitiço cria um cone de 18 metros de comprimento e 60° de ângulo. Criaturas dentro desse cone tomam 5d4 de dano de fogo e recebem um nível de Queimando.",
          "custoEstamina": 0,
          "custoMagia": 8,
          "efeitos": {
            "ativo": "Causa dano de fogo e aplica Queimando em todas as criaturas no cone."
          }
        },
        {
          "nome": "Eletrocutar",
          "tipo": "Feitiço",
          "descricao": "O feitiço energiza a mão do elementalista com uma carga elétrica. Ao tocar em um inimigo, causa 3d10 +7 de dano e o alvo tem 20% de chance de ficar paralisado.",
          "custoEstamina": 0,
          "custoMagia": 8,
          "efeitos": {
            "ativo": "Causa dano de eletricidade e tem chance de paralisar o alvo."
          }
        },
        {
          "nome": "Esmagar Com Corrente",
          "tipo": "Feitiço",
          "descricao": "O feitiço força uma grande quantidade de ar para baixo, esmagando criaturas em uma área de 1,5 metros de raio. A magia causa 2d6 de dano de impacto, mais 5d4 de dano de corte e 20% de chance de deixar o inimigo Deitado.",
          "custoEstamina": 0,
          "custoMagia": 8,
          "efeitos": {
            "ativo": "Causa dano de impacto e corte e pode deixar a criatura Deitada."
          }
        },
        {
          "nome": "Estalagmite de Cristal",
          "tipo": "Feitiço",
          "descricao": "O feitiço conjura uma estalagmite de cristal que é atirada em uma criatura em até 18 metros. Causa 3d6 de dano perfurante e 2d10 de dano de terra.",
          "custoEstamina": 0,
          "custoMagia": 8,
          "efeitos": {
            "ativo": "Causa dano perfurante e dano de terra a uma criatura."
          }
        }
      ]


    },
    {
      "titulo": "Bruxo",
      "img": bruxo,
      "descricao": "O bruxo é uma figura cuja essência se entrelaça com os fios ocultos que ligam o mundo natural ao sobrenatural, um estudioso e praticante das forças que existem à margem da compreensão mundana. Não é mero manipulador de energias arcanas, mas um mediador entre reinos vivos e mortos, um arauto das vontades inomináveis que sussurram entre as folhas das árvores antigas e nas sombras dos becos esquecidos. Seu poder brota de pactos antigos, de uma compreensão visceral das forças da vida e da morte, moldando o próprio tecido da realidade em ilusões e maldições que confundem os sentidos e dobram a vontade dos incautos. Ele cultiva a natureza não como um jardineiro, mas como um maestro regendo a fúria selvagem das raízes e a doçura enganosa das flores. Suas criaturas invocadas, sejam elas familiares astutos ou abominações retorcidas pela corrupção, não são meros servos — são extensões de sua própria alma fragmentada, espreitando o mundo através de olhos que não deveriam ver. E assim o bruxo caminha entre mundos, um viajante cuja marca é sentida nos rastros de vinhas torcidas e na sensação inquietante de que algo está observando, mesmo quando não há ninguém por perto.",
      "atributos": "Cada Regalia comprada na especialização Bruxo(a) fornece:\n- 2 Pontos de Vida\n- 0 Pontos de Estâmina\n- 8 Ponto em Magia",
      "regaliaObrigatoria": {
        "descricao": "Ao escolher esta especialização, o personagem recebe os seguintes atributos :",
        "pontos": {
          "atributos": {
            "quantidade": 2,
            "opcoes": ["Lidar Com Animais", "Arcanismo"]
          },
          "combate": {
            "quantidade": 1,
            "opcoes": ["Combate Arcano", "Ocultismo"]
          },
          "habilidades": {
            "quantidade": 2,
            "opcoes": ["Natureza", "Alquimia", "Enganação", "Condução exótica"]
          },
          "proficiências": ["Nenhuma nova proficiência."]
        },
        "habilidade": [{
          "nome": "Invocação de Familiar",
          "tipo": "Feitiço (Ritual)(1 hora)",
          "descricao": "O bruxo consegue invocar uma criatura para ser seu companheiro e servo. Apenas uma invocação por vez. O familiar tem pontos de vida igual a metade dos pontos de vida do Bruxo(a), um acerto igual ao valor do ocultismo do bruxo, valor de defesa igual ao valor de ritualismo + valor de  arcanismo do bruxo, e um ataque que condiz com a forma do familiar com 2d6 de dano sombrio e pode fazer tudo que a criatura conseguiria se estivesse em seu ambiente natural. O  familiar tem um turno de combate ao mesmo tempo que o da bruxa e possui 3 ações como qualquer outra. O bruxo pode controlar seu familiar em uma distância de até 200 metros e conjurar maldições da posição de seu familiar. O bruxo pode sacrificar seu familiar como uma reação para recuperar 20 pontos de vida e 10 de magia. Ao fazer isso, o bruxo fica impossibilitado de invocar um novo familiar até realizar um descanso longo.",
        }]
      },
      "regalias": [
        {
          "nome": "Fotossíntese",
          "tipo": "Ritual",
          "descricao": "O bruxo fica parado por 1 minuto em um ambiente aberto durante o dia para recuperar 4d10 pontos de vida e 2d6 pontos de magia. Custa 5 moedas de ouro em materiais para o ritual e pode ser realizado uma vez por dia. Se o bruxo tiver mais que 10 em ritualismo ele pode realizar duas vezes esse ritual em um mesmo dia e sem custo material.",
          "efeitos": {
            "ativo": "Recupera 4d10 pontos de vida e 2d6 pontos de magia"
          },
          "modificadores": {
            "usoExtra": "Se o bruxo tiver mais que 10 em ritualismo, pode realizar duas vezes esse ritual por dia e sem custo material"
          }
        },
        {
          "nome": "Dedo Verde",
          "tipo": "Feitiço",
          "descricao": "Acelera o crescimento de plantas sobrenaturalmente, em uma área de 18 metros de raio e um ponto em até 72 metros de distância, criando um terreno difícil natural. Essa habilidade pode ser usada em plantações, porém reduz a vida útil da planta e de seus alimentos para 12 horas, após esse tempo as plantas morrem e o alimento apodrece. Custa 2 pontos de magia.",
          "efeitos": {
            "ativo": "Cria terreno difícil natural e acelera o crescimento de plantas"
          },
          "modificadores": {
            "bonusSucesso": "Ao gastar 3 pontos de magia adicionais, as plantas criam espinhos que causam 1d6 de dano"
          }
        },
        {
          "nome": "Fúria Natural",
          "tipo": "Feitiço",
          "descricao": "Conjura um feitiço que afeta uma árvore de até 3 metros ou um arbusto pequeno. Essa planta escolhida cria vida própria e se torna servo do bruxo por um número de turnos igual ao seu ocultismo+1. Durante esse tempo, a planta tem 50 pontos de vida, valor de defesa igual a 9, uma velocidade de movimento de 4,5 metros, acerto de +10 e dano igual a 2d10 de dano do elemento terra. Essa criatura tem vulnerabilidade ao dano cortante causado por machados. Custa 10 pontos de magia.",
          "efeitos": {
            "ativo": "Cria uma planta serva com vida própria para ajudar o bruxo"
          }
        },
        {
          "nome": "Amizade Animal",
          "tipo": "Feitiço",
          "descricao": "O bruxo encanta um animal para obedecer suas ordens. O animal faz tudo como faria para defender outro membro da espécie ao defender o bruxo, mas nada que o coloque em perigo direto. O animal consegue se comunicar com o bruxo com um idioma escolhido pelo bruxo. Custa 2 pontos de magia.",
          "efeitos": {
            "ativo": "Encanta um animal para seguir ordens e comunicar-se com o bruxo"
          },
          "modificadores": {
            "bonusSucesso": "Ao gastar 10 pontos de magia adicionais, o animal pode ser corrompido em uma abominação com o dobro de pontos de vida"
          }
        },
        {
          "nome": "Alucinação",
          "tipo": "Maldição | Feitiço",
          "descricao": "O bruxo cria uma área de 18 metros de raio cheia de ilusões com sons, cheiros e imagens. Essas ilusões parecem verdadeiras de longe e apenas criaturas a 1,5 metros da área podem fazer um teste de intuição ou investigação para definir se é uma ilusão ou não. A dificuldade do teste para descobrir se a ilusão é real ou não é baseada na soma de 7 + ocultismo + arcanismo do bruxo. Custa 6 pontos de magia e dura 24 horas.",
          "efeitos": {
            "ativo": "Cria uma área de ilusões que mascaram o terreno real"
          },
          "modificadores": {
            "duracaoExtra": "Para cada 6 pontos de magia a mais, a duração aumenta em 12 horas"
          }
        },
        {
          "nome": "Confusão",
          "tipo": "Feitiço",
          "descricao": "Cria 10 imagens de si em espaços vazios em uma distância de até 9 metros de onde o bruxo está. Uma criatura em movimento que passar em 1,5 metros de uma cópia ou que atacar uma cópia com um ataque corpo a corpo tem 30% de chance de ficar atordoada por um turno, mas de qualquer forma a cópia some. Criaturas que não se desloquem ou ataquem uma cópia não ativam a maldição mesmo se estiverem a 1,5 metros da cópia. O bruxo pode mudar de posição com uma cópia de si desde que esteja em até 18 metros da cópia. Dura 10 rodadas. Custa 5 pontos de magia.",
          "efeitos": {
            "ativo": "Cria cópias do bruxo para confundir inimigos"
          },
          "modificadores": {
            "bonusSucesso": "Para cada 5 pontos adicionais de magia, aumenta em 5% a chance de causar o efeito de atordoamento"
          }
        },
        {
          "nome": "Contrato",
          "tipo": "Ritual | Maldição",
          "descricao": "O bruxo pode realizar um ritual para fazer um contrato com outra criatura, desde que a criatura concorde. O contrato pode ter um dos seguintes efeitos: Dividir vitalidade, Conceder Poder, ou Fantoche. Custa 10 moedas de ouro em materiais.",
          "efeitos": {
            "ativo": "Cria um contrato com outra criatura, conferindo-lhe benefícios ou maldições"
          },
          "modificadores": {
            "bonusSucesso": null,
            "usoExtra": null
          }
        },
        {
          "nome": "Bola de Cristal",
          "tipo": "Maldição",
          "descricao": "Marca uma criatura que esteja a até 3 metros de distância do bruxo por 7 dias. O bruxo consegue observar onde a criatura está e o que está fazendo durante 10 minutos por dia. Cada vez que olhar, gasta no mínimo um minuto e 5 pontos de magia.",
          "efeitos": {
            "ativo": "Permite que o bruxo observe uma criatura marcada"
          }
        },
        {
          "nome": "Dedo Podre",
          "tipo": "Maldição",
          "descricao": "A criatura humanóide tocada pelo bruxo tem 5% de chance de sofrer 12d12 pontos de dano necrótico. Caso contrário, sofre 12d4 pontos de dano necrótico. Custa 12 pontos de magia.",
          "efeitos": {
            "ativo": "Causa dano necrótico em uma criatura tocada"
          },
          "modificadores": {
            "bonusSucesso": "Para cada 3 pontos de magia adicionais, aumenta a chance de causar o dano de 12d12 em 5%"
          }
        },
        {
          "nome": "Invocação de Familiar Maior",
          "tipo": "Ritual",
          "descricao": "O bruxo consegue invocar um monstro pequeno ou dois minúsculos para ser seu companheiro e servo. O familiar tem pontos de vida igual ao dobro dos pontos de vida do Bruxo(a), um acerto de +10, valor de defesa igual a 15, e um ataque que condiz com a forma do familiar com 1d12 de dano e pode fazer tudo que a criatura conseguiria se estivesse em seu ambiente natural. O bruxo pode controlar seu familiar em uma distância de até 200 metros e conjurar maldições da posição de seu familiar.",
          "custoEstamina": null,
          "custoMagia": null,
          "chanceDeSucesso": null,
          "dano": "1d12",
          "requisito": null,
          "efeitos": {
            "passivo": null,
            "ativo": "O bruxo pode controlar seu familiar em uma distância de até 200 metros e conjurar maldições da posição de seu familiar."
          },
          "modificadores": {
            "bonusSucesso": null,
            "usoExtra": null,
            "duracaoExtra": null
          },
          "bonus": {
            "vidaTemporaria": null
          },
          "interacoes": {
            "comOutraRegalia": null
          }
        }
      ]
    },
    {
      "titulo": "Metamorfo",
      "img": metamorfo,
      "descricao": "Entre as sombras das florestas primevas e os vales intocados pelo tempo, caminham os metamorfos, figuras de essência mutável cuja ligação com o mundo natural transcende as formas fixas dos homens. Eles não são meros conhecedores das criaturas da terra, da água e do céu, mas partilham de sua linguagem, entendendo os sussurros do vento entre as copas das árvores e a cadência oculta dos passos de um lobo em perseguição. O corpo do metamorfo não conhece rigidez, moldando-se conforme a necessidade, tomando feições que lhe conferem força, destreza ou resistência, espelhando as qualidades das bestas que observa. Nos antigos mitos de aldeias distantes, são descritos como aqueles que percorrem o mundo sem que se saiba se são homem ou fera, seus olhos refletindo um entendimento que vai além das palavras e suas ações ditadas por instintos tão refinados quanto os da criatura mais astuta da mata. Se há um propósito em sua existência, ele se manifesta na fusão entre o humano e o selvagem, um equilíbrio onde a identidade não é uma âncora, mas um rio que flui, sem nunca se deter por completo.",
      "atributos": "Cada Regalia comprada na especialização Metamorfo(a) fornece:\n- 7 Pontos de Vida\n- 0 Pontos de Estâmina\n- 3 Ponto em Magia",
      "regaliaObrigatoria": {
        "descricao": "Ao escolher esta especialização, o personagem recebe os seguintes atributos :",
        "pontos": {
          "atributos": {
            "quantidade": 2,
            "opcoes": ["Lidar Com Animais", "Arcanismo"]
          },
          "combate": {
            "quantidade": 1,
            "opcoes": ["Combate Arcano", "Sobrevivência"]
          },
          "habilidades": {
            "quantidade": 2,
            "opcoes": ["Natureza", "Alquimia", "Fortitude"]
          },
          "proficiências": ["Proficiência total em  Conduções Exóticas, Terrestres e Aquáticas."]
        },
        "habilidade": [{
          "nome": "Mestre da metamorfose",
          "tipo": "Feitiço (Ritual)(1 hora)",
          "descricao": "O metamorfo pode usar até duas metamorfoses, que não sejam licantrópicas, ao consumir um elixir. Ao transformar em licantropo o metamorfo mantém todos os valores de Habilidade e ganha todos os benefícios somado a esses valores. Em forma licantropo é possível usar armas e outros equipamentos. Se a forma sofre alteração no tamanho o equipamento no corpo do metamorfo acompanha a mudança, porém armas não acompanham a mudança de tamanho.",
        }]
      },
      "regalias": [

        {
          "nome": "Asas",
          "tipo": "Passiva",
          "descricao": "Ao tomar um Elixir, o Metamorfo pode escolher aparecer asas como efeito adicional que dura pelo tempo em que o elixir durar. Ganha uma velocidade de voo igual à sua velocidade de movimento.",
          "custoMagia": 2,
          "efeitos": {
            "passivo": "Ganha a habilidade de voar com a mesma velocidade de movimento"
          }
        },
        {
          "nome": "Musculatura Monstruosa",
          "tipo": "Passiva",
          "descricao": "Ao tomar um Elixir, o Metamorfo pode mudar a biologia de seus músculos, ganhando um bônus de força igual a 4, podendo ultrapassar 15.",
          "custoMagia": 4,
          "efeitos": {
            "passivo": "Ganha bônus de força"
          }
        },
        {
          "nome": "Cauda",
          "tipo": "Passiva",
          "descricao": "Ao tomar um Elixir, o Metamorfo pode mudar a anatomia de seu corpo, ganhando uma cauda que pode ser usada como arma natural ou para segurar uma arma ou escudo.",
          "custoMagia": 4,
          "dano": "1d8 + força (concussivo)",
          "efeitos": {
            "passivo": "Ganha uma cauda que pode ser usada como arma ou para segurar itens"
          }
        },
        {
          "nome": "Licantropia Lobo",
          "tipo": "Metamorfose",
          "descricao": "O Metamorfo se transforma em um híbrido animal com várias características. Ganha visão no escuro, velocidade de movimento adicional, resistência a certos tipos de dano e ataques naturais com garras e mordida.",
          "custoMagia": 10,
          "efeitos": {
            "passivo": "Ganha resistência a danos cortante, perfurante e concussivo",
            "ativo": "Transforma-se em híbrido lobo com habilidades especiais"
          },
          "dano": "1d12 (mordida) + 1d12 (garras)",
          "duracaoExtra": "Dura 2 horas"
        },
        {
          "nome": "Licantropia Urso",
          "tipo": "Metamorfose",
          "descricao": "O Metamorfo se transforma em um híbrido urso, ganhando resistência a danos e aumentando sua vida e força.",
          "custoMagia": 10,
          "efeitos": {
            "passivo": "Ganha resistência a danos cortante, perfurante e concussivo",
            "ativo": "Transforma-se em híbrido urso com ataques naturais"
          },
          "dano": "3d4 (mordida) + 3d4 (garras)",
          "bonus": {
            "vidaTemporaria": "Ganha 20 pontos de vida extra"
          },
          "duracaoExtra": "Dura 2 horas"
        },
        {
          "nome": "Licantropia Javali",
          "tipo": "Metamorfose",
          "descricao": "O Metamorfo se transforma em um híbrido javali, com aumento de velocidade e resistência a danos.",
          "custoMagia": 10,
          "efeitos": {
            "passivo": "Ganha resistência a danos cortante, perfurante e concussivo",
            "ativo": "Transforma-se em híbrido javali com ataque com presas"
          },
          "dano": "2d6 (presas)",
          "bonus": {
            "vidaTemporaria": "Ganha 10 pontos de vida extra"
          },
          "duracaoExtra": "Dura 2 horas"
        },
        {
          "nome": "Licantropia Pantera",
          "tipo": "Metamorfose",
          "descricao": "O Metamorfo se transforma em um híbrido pantera, com maior furtividade, resistência a danos e ataques naturais.",
          "custoMagia": 10,
          "efeitos": {
            "passivo": "Ganha resistência a danos cortante, perfurante e concussivo",
            "ativo": "Transforma-se em híbrido pantera com ataques naturais"
          },
          "dano": "3d8 (mordida) + 3d8 (garras)",
          "modificadores": {
            "bonusSucesso": "Ganha bônus de 10 pontos em furtividade"
          },
          "duracaoExtra": "Dura 2 horas"
        },
        {
          "nome": "Licantropia Crocodilo",
          "tipo": "Metamorfose",
          "descricao": "O Metamorfo se transforma em um híbrido crocodilo, ganhando bônus de defesa, velocidade na água e ataque com mordida.",
          "custoMagia": 10,
          "efeitos": {
            "passivo": "Ganha resistência a danos cortante, perfurante e concussivo",
            "ativo": "Transforma-se em híbrido crocodilo com ataque natural"
          },
          "dano": "2d10 (mordida)",
          "bonus": {
            "vidaTemporaria": "Ganha bônus de +5 em defesa"
          },
          "duracaoExtra": "Dura 2 horas"
        },
        {
          "nome": "Licantropia Águia",
          "tipo": "Metamorfose",
          "descricao": "O metamorfo consegue se transformar em um híbrido águia. Ganha visão no escuro de 12 metros, 3 metros de velocidade adicional e resistência aos danos cortante, perfurante e concussivo. Ao se transformar, o metamorfo ganha asas, podendo voar com o dobro da sua velocidade de movimento. Possui um ataque desarmado com garras que causa 1d20 de dano perfurante. Pode atacar com suas garras enquanto voa como parte do movimento, com custo de uma ação. Não sofre ataques de oportunidade ao entrar ou sair do alcance de um inimigo. Dura 2 horas.",
          "custoEstamina": null,
          "custoMagia": 10,
          "efeitos": {
            "passivo": null,
            "ativo": "Ao se transformar em híbrido águia, o metamorfo ganha asas para voo."
          },
          "modificadores": {
            "bonusSucesso": "O metamorfo ganha 3 metros de velocidade adicional enquanto voa."
          },
          "bonus": null,
          "interacoes": null
        },
        {
          "nome": "Licantropia Cobra",
          "tipo": "Metamorfose",
          "descricao": "O metamorfo se transforma em um híbrido cobra. Ganha visão no escuro de 6 metros, 1,5 metros de velocidade adicional e resistência aos danos cortante, perfurante e concussivo. Ao atacar com mordida, o metamorfo tem 50% de chance de inocular um veneno que causa 1d10 de dano extra. Ganha a capacidade de enxergar com fossetas loreais e um ataque de mordida que causa 2d4 pontos de dano perfurante. Dura 2 horas.",
          "custoEstamina": null,
          "custoMagia": 10,
          "efeitos": {
            "passivo": null,
            "ativo": "O metamorfo pode atacar com mordida, podendo inocular veneno com chance de causar dano extra."
          },
          "modificadores": null,
          "bonus": null,
          "interacoes": null
        },
        {
          "nome": "Licantropia Salamandra",
          "tipo": "Metamorfose",
          "descricao": "O metamorfo se transforma em um híbrido salamandra. Ganha visão no escuro de 6 metros, 1,5 metros de velocidade adicional e resistência aos danos cortante, perfurante e concussivo. O metamorfo é incendiado com chamas que não o ferem, mas causa 1d6 de dano a criaturas em até 1,5 metros de distância. Imbui seus ataques com fogo, ganhando 2 pontos de dano extra. Recebe 2d8 pontos de vida extra e consegue escalar paredes sem necessidade de teste. É vulnerável a dano de gelo. Dura 2 horas.",
          "custoEstamina": null,
          "custoMagia": 10,
          "efeitos": {
            "passivo": "O metamorfo causa dano a criaturas próximas com chamas e ganha bônus de dano nos ataques com fogo.",
            "ativo": "Ao se transformar em salamandra, o metamorfo adquire resistência ao dano e ganha bônus de vida extra."
          },
          "modificadores": {
            "bonusSucesso": "O metamorfo recebe 2d8 pontos de vida extra e 2 pontos de dano adicional nos ataques com fogo."
          },
          "bonus": null,
          "interacoes": null
        },
        {
          "nome": "Virar Animal",
          "tipo": "Metamorfose",
          "descricao": "O metamorfo pode se transformar em um animal grande ou menor por um número de horas igual ao seu nível. Mantém os pontos de vida atuais e ganha pontos de vida temporários iguais ao seu valor de fortitude.",
          "custoEstamina": null,
          "custoMagia": null,
          "efeitos": {
            "passivo": null,
            "ativo": "Ao se transformar, o metamorfo ganha pontos de vida temporários equivalentes ao seu valor de fortitude."
          },
          "modificadores": null,
          "bonus": {
            "vidaTemporaria": "O metamorfo ganha pontos de vida temporários equivalentes ao seu valor de fortitude."
          },
          "interacoes": null
        }
      ]
    },
  ]
  const EspecializacaoMistaSkillsData = [
    {
      "titulo": "Monge",
      "img": xama,
      "descricao": "O Xamã é um andarilho entre os véus da vida e da morte, um mediador entre os sussurros dos espíritos e o pulsar da terra viva. Seu corpo é marcado por símbolos antigos, gravados não pela mão dos homens, mas pelos próprios ecos do além, e sua voz, quando invoca os nomes esquecidos do outro lado, ressoa como um lamento antigo que faz a própria natureza estremecer. Ele não comanda os mortos como um tirano impiedoso, mas os guia como um pastor sombrio, oferecendo-lhes propósito onde antes havia apenas vazio. O vento carrega murmúrios de almas perdidas em sua presença, e as sombras se alongam como se buscassem seu toque. Quando o Xamã caminha, corvos o seguem, lobos observam à distância e até mesmo os insetos rastejam em sua direção, atraídos por uma força invisível e inevitável. Ele é a ponte entre o mundo dos vivos e a vastidão sem nome do pós-vida, tecendo pactos e trocas em uma linguagem que só os mortos compreendem. Onde ele passa, a terra apodrece e floresce em igual medida, e os vivos o temem tanto quanto os espíritos o reverenciam. Ele é o arauto do ciclo eterno — aquele que dá, toma e restaura, sem piedade e sem remorso.",
      "atributos": "Cada Regalia comprada na especialização Xamã fornece:\n- 4 Pontos de Vida\n- 4 Pontos de Estâmina\n- 2 Ponto em Magia",
      "regaliaObrigatoria": {
        "descricao": "Ao escolher esta especialização, o personagem recebe os seguintes atributos :",
        "pontos": {
          "atributos": {
            "quantidade": 2,
            "opcoes": ["Força", "Destreza"]
          },
          "combate": {
            "quantidade": 1,
            "opcoes": [" Combate Corpo a Corpo", "Fortitude"]
          },
          "habilidades": {
            "quantidade": 2,
            "opcoes": ["Atletismo", "Agilidade", "Acrobacia"]
          },
          "proficiências": ["Proficiência em Lança Mola, Manopla de Espinhos e Canalizar ki."]
        },
        "outrasProficiencias": null,
        "habilidade": [{
          "nome": "Canalizar ki ",
          "tipo": "(Ação livre)",
          "descricao": "Um monge pode gastar pontos de magia para canalizar ki. Ao canalizar ki, o monge que não estiver usando armadura pesada ganha um bônus de +2 em valor de defesa e independente da armadura ganha vantagem em testes de percepção. Esse bônus dura 1 minuto e pode ser renovado ao canalizar ki novamente. Custa 3 pontos de magia.",
        }]
      },
      "regalias": [
        {
          "nome": "Chakra da Base",
          "tipo": "Passiva",
          "descricao": "Ao canalizar o ki com o chakra da base aberto, o monge fica resistente à condição envenenado, resistente ao dano elemental de terra, e efeitos que possam desestabilizar seu controle sobre a própria mente têm a chance de sucesso reduzida em 5%.",
          "efeitos": {
            "passivo": "Resistência à condição envenenado e dano elemental de terra, redução de chance de sucesso de efeitos mentais."
          }
        },
        {
          "nome": "Chakra Abdominal",
          "tipo": "Passiva",
          "descricao": "Ao canalizar o ki com o chakra do abdômen aberto, o monge fica impossibilitado de ser derrubado contra sua vontade, resistente ao dano elemental de gelo e ganha 3 m de velocidade de movimento bônus.",
          "efeitos": {
            "passivo": "Impossível de ser derrubado, resistência ao dano elemental de gelo, bônus de velocidade."
          }
        },
        {
          "nome": "Chakra do Plexo Solar",
          "tipo": "Passiva",
          "descricao": "Ao canalizar o ki com o chakra do plexo solar aberto, o monge fica resistente ao dano sombrio, resistente ao dano elemental de fogo, e efeitos que possam desestabilizar seu controle sobre a própria mente têm a chance de sucesso reduzida em 5%.",
          "efeitos": {
            "passivo": "Resistência ao dano sombrio, dano elemental de fogo e redução de chance de sucesso de efeitos mentais."
          }
        },
        {
          "nome": "Chakra do Coração",
          "tipo": "Passiva",
          "descricao": "Ao canalizar o ki com o chakra do coração aberto, o monge ganha vantagem em testes de acrobacia para evitar ou para escapar de agarramentos, fica resistente ao dano elemental de ar, e terreno difícil não afeta a velocidade de movimento do monge.",
          "efeitos": {
            "passivo": "Vantagem em testes de acrobacia, resistência ao dano elemental de ar, terreno difícil não afeta a velocidade."
          }
        },
        {
          "nome": "Chakra da Garganta",
          "tipo": "Passiva",
          "descricao": "Ao canalizar o ki com o chakra da garganta aberto, o monge tem vantagem dupla em testes da árvore Social, vantagem em testes de intuição, fica imune à condição surdo e é impossível fazer um monge ficar em silêncio contra sua vontade.",
          "efeitos": {
            "passivo": "Vantagem em testes sociais e intuição, imune à condição surdo e silêncio."
          }
        },
        {
          "nome": "Chakra do Terceiro Olho",
          "tipo": "Passiva",
          "descricao": "Ao canalizar o ki com o chakra do terceiro olho aberto, o monge consegue ver através de ilusões em até 12 metros de distância, consegue ler lábios em até 100 metros de distância e é imune a ficar cego.",
          "efeitos": {
            "passivo": "Visão através de ilusões, leitura de lábios, imunidade a cegueira."
          }
        },
        {
          "nome": "Chakra da Coroa",
          "tipo": "Passiva",
          "descricao": "Ao canalizar o ki com o chakra da coroa, o monge recebe vantagem dupla em testes da árvore de conhecimento, fica imune à condição amedrontado e consegue criar uma projeção astral para andar pelo plano astral a até 100 metros de distância.",
          "requisito": "Todos os outros chakras abertos.",
          "efeitos": {
            "passivo": "Vantagem em testes de conhecimento, imune à condição amedrontado, projeção astral."
          }
        },
        {
          "nome": "Ataque Veloz",
          "tipo": "Ativa",
          "descricao": "O monge pode realizar um ataque adicional quando tomar uma ação de atacar. Apenas uma vez por ação.",
          "custoEstamina": 2,
          "efeitos": {
            "ativo": "Realiza um ataque extra na mesma ação de ataque."
          }
        },
        {
          "nome": "Fúria de Ataques",
          "tipo": "Ativa",
          "descricao": "Ao usar a ação para atacar, o monge pode gastar 2 pontos de estâmina para atacar novamente. Pode ser usado em conjunto com o Ataque Veloz.",
          "custoEstamina": 2,
          "efeitos": {
            "ativo": "Realiza um ataque extra ao usar a ação de atacar."
          },
          "usoExtra": "Pode ser usado em conjunto com Ataque Veloz."
        },
        {
          "nome": "Corpo Fechado",
          "tipo": "Passiva",
          "descricao": "O monge pode entrar em uma posição defensiva e meditativa que fecha seu corpo e mente contra o ambiente e outras criaturas. Fica imune a todas as condições e resistente a todo tipo de dano por uma rodada. Recupera 2 pontos de estâmina, 1 ponto de magia e 3d8 pontos de vida ao sair.",
          "custoEstamina": 2,
          "custoMagia": 1,
          "efeitos": {
            "passivo": "Imunidade a todas as condições e resistência a dano por uma rodada. Recupera pontos ao sair da posição."
          }
        },
        {
          "nome": "Fortalecer Físico",
          "tipo": "Passiva",
          "descricao": "Ao canalizar ki, o monge ganha um bônus de +2 em força, destreza, combate corpo a corpo, agilidade e acrobacia. Esse bônus pode ultrapassar o limite de 15 pontos máximos em uma habilidade.",
          "efeitos": {
            "passivo": "Bônus de +2 em força, destreza, combate corpo a corpo, agilidade e acrobacia."
          }
        },
        {
          "nome": "Fluir como Água, Golpear como Pedra",
          "tipo": "Passiva",
          "descricao": "O monge ganha um bônus de +4 em acertos de ataques desarmados e +1 de defesa enquanto não usar armadura pesada.",
          "efeitos": {
            "passivo": "Bônus de +4 em ataques desarmados e +1 de defesa sem armadura pesada."
          }
        },
        {
          "nome": "Ataque de Oportunidade",
          "tipo": "Reação",
          "descricao": "O monge pode realizar um ataque quando uma criatura que possa ver sair da sua área de ameaça, ou atacar um aliado dentro do seu alcance.",
          "custoEstamina": 2,
          "efeitos": {
            "ativo": "Realiza um ataque quando uma criatura sai da área de ameaça ou ataca um aliado."
          }
        },
        {
          "nome": "Desviar projéteis",
          "tipo": "Reação",
          "descricao": "O monge pode usar sua reação, ao ser acertado por um projétil físico, para tentar desviar a trajetória do objeto e evitar o dano do ataque. Para isso o monge deve passar em um teste de acrobacia, a dificuldade do teste é o valor rolado para o acerto do ataque. Caso tenha sucesso, o monge não sofre o dano do ataque, e caso o rolamento do teste seja um 19 ou 20 no d20, o monge arremessa o projétil em outra criatura em até 9 metros de distância a sua escolha. Caso fracasse no teste, recebe o ataque normalmente.",
          "custoEstamina": 5,
          "efeitos": {
            "ativo": "Desviar a trajetória do projétil e, em caso de sucesso no teste, evitar o dano do ataque. Caso acerte 19 ou 20 no teste, o monge arremessa o projétil em outra criatura."
          },
          "modificadores": {
            "bonusSucesso": "Desviar a trajetória e arremessar o projétil se rolado 19 ou 20 no d20."
          }
        }

      ]

    },
    {
      "titulo": "Inquisidor",
      "img": bruxo,
      "descricao": "O bruxo é uma figura cuja essência se entrelaça com os fios ocultos que ligam o mundo natural ao sobrenatural, um estudioso e praticante das forças que existem à margem da compreensão mundana. Não é mero manipulador de energias arcanas, mas um mediador entre reinos vivos e mortos, um arauto das vontades inomináveis que sussurram entre as folhas das árvores antigas e nas sombras dos becos esquecidos. Seu poder brota de pactos antigos, de uma compreensão visceral das forças da vida e da morte, moldando o próprio tecido da realidade em ilusões e maldições que confundem os sentidos e dobram a vontade dos incautos. Ele cultiva a natureza não como um jardineiro, mas como um maestro regendo a fúria selvagem das raízes e a doçura enganosa das flores. Suas criaturas invocadas, sejam elas familiares astutos ou abominações retorcidas pela corrupção, não são meros servos — são extensões de sua própria alma fragmentada, espreitando o mundo através de olhos que não deveriam ver. E assim o bruxo caminha entre mundos, um viajante cuja marca é sentida nos rastros de vinhas torcidas e na sensação inquietante de que algo está observando, mesmo quando não há ninguém por perto.",
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
    },
    {
      "titulo": "Combatente Arcano",
      "img": elementalista,
      "descricao": "O Elementalista, moldador dos próprios fios da criação, caminha entre os mundos do fogo, da terra, do ar e da água como um maestro conduzindo uma sinfonia cósmica. Seus olhos refletem tempestades distantes e mares revoltos, enquanto suas mãos, calejadas não pelo trabalho comum, mas pelo toque da essência primordial, desenham símbolos no ar que vibram com o poder dos próprios alicerces do mundo. Ele não domina os elementos, mas dança com eles em uma harmonia ancestral, persuadindo a chama a rugir como um dragão acordado ou a brisa a sussurrar segredos esquecidos pelos mortais. Rochas se erguem sob seus pés como servos antigos despertos de seu sono de eras, e rios desviam seu curso obedientes à sua silenciosa vontade. Onde o Elementalista passa, a natureza o reconhece — árvores inclinam seus galhos em reverência, e trovões ecoam seu nome nas montanhas distantes. Ele é um ser à parte, nem mestre nem servo, mas um intermediário entre o mundo dos homens e o coração selvagem da própria terra. Em seus passos ecoa o crepitar das chamas, o sussurro do vento, o rugido das marés e o sussurro das pedras — uma sinfonia eterna da qual ele é tanto condutor quanto parte.",
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
    },
    {
      "titulo": "Metamorfo",
      "img": metamorfo,
      "descricao": "Entre as sombras das florestas primevas e os vales intocados pelo tempo, caminham os metamorfos, figuras de essência mutável cuja ligação com o mundo natural transcende as formas fixas dos homens. Eles não são meros conhecedores das criaturas da terra, da água e do céu, mas partilham de sua linguagem, entendendo os sussurros do vento entre as copas das árvores e a cadência oculta dos passos de um lobo em perseguição. O corpo do metamorfo não conhece rigidez, moldando-se conforme a necessidade, tomando feições que lhe conferem força, destreza ou resistência, espelhando as qualidades das bestas que observa. Nos antigos mitos de aldeias distantes, são descritos como aqueles que percorrem o mundo sem que se saiba se são homem ou fera, seus olhos refletindo um entendimento que vai além das palavras e suas ações ditadas por instintos tão refinados quanto os da criatura mais astuta da mata. Se há um propósito em sua existência, ele se manifesta na fusão entre o humano e o selvagem, um equilíbrio onde a identidade não é uma âncora, mas um rio que flui, sem nunca se deter por completo.",
      "atributos": "Cada Regalia comprada na especialização Metamorfo(a) fornece:\n- 7 Pontos de Vida\n- 0 Pontos de Estâmina\n- 3 Ponto em Magia",
      "regaliaObrigatoria": {
        "descricao": "Ao escolher esta especialização, o personagem recebe os seguintes atributos :",
        "pontos": {
          "atributos": {
            "quantidade": 2,
            "opcoes": ["Lidar Com Animais", "Arcanismo"]
          },
          "combate": {
            "quantidade": 1,
            "opcoes": ["Combate Arcano", "Sobrevivência"]
          },
          "habilidades": {
            "quantidade": 2,
            "opcoes": ["Natureza", "Alquimia", "Fortitude"]
          },
          "proficiências": ["Proficiência total em  Conduções Exóticas, Terrestres e Aquáticas."]
        },
        "habilidade": [{
          "nome": "Mestre da metamorfose",
          "tipo": "Feitiço (Ritual)(1 hora)",
          "descricao": "O metamorfo pode usar até duas metamorfoses, que não sejam licantrópicas, ao consumir um elixir. Ao transformar em licantropo o metamorfo mantém todos os valores de Habilidade e ganha todos os benefícios somado a esses valores. Em forma licantropo é possível usar armas e outros equipamentos. Se a forma sofre alteração no tamanho o equipamento no corpo do metamorfo acompanha a mudança, porém armas não acompanham a mudança de tamanho.",
        }]
      },
      "regalias": [

        {
          "nome": "Asas",
          "tipo": "Passiva",
          "descricao": "Ao tomar um Elixir, o Metamorfo pode escolher aparecer asas como efeito adicional que dura pelo tempo em que o elixir durar. Ganha uma velocidade de voo igual à sua velocidade de movimento.",
          "custoMagia": 2,
          "efeitos": {
            "passivo": "Ganha a habilidade de voar com a mesma velocidade de movimento"
          }
        },
        {
          "nome": "Musculatura Monstruosa",
          "tipo": "Passiva",
          "descricao": "Ao tomar um Elixir, o Metamorfo pode mudar a biologia de seus músculos, ganhando um bônus de força igual a 4, podendo ultrapassar 15.",
          "custoMagia": 4,
          "efeitos": {
            "passivo": "Ganha bônus de força"
          }
        },
        {
          "nome": "Cauda",
          "tipo": "Passiva",
          "descricao": "Ao tomar um Elixir, o Metamorfo pode mudar a anatomia de seu corpo, ganhando uma cauda que pode ser usada como arma natural ou para segurar uma arma ou escudo.",
          "custoMagia": 4,
          "dano": "1d8 + força (concussivo)",
          "efeitos": {
            "passivo": "Ganha uma cauda que pode ser usada como arma ou para segurar itens"
          }
        },
        {
          "nome": "Licantropia Lobo",
          "tipo": "Metamorfose",
          "descricao": "O Metamorfo se transforma em um híbrido animal com várias características. Ganha visão no escuro, velocidade de movimento adicional, resistência a certos tipos de dano e ataques naturais com garras e mordida.",
          "custoMagia": 10,
          "efeitos": {
            "passivo": "Ganha resistência a danos cortante, perfurante e concussivo",
            "ativo": "Transforma-se em híbrido lobo com habilidades especiais"
          },
          "dano": "1d12 (mordida) + 1d12 (garras)",
          "duracaoExtra": "Dura 2 horas"
        },
        {
          "nome": "Licantropia Urso",
          "tipo": "Metamorfose",
          "descricao": "O Metamorfo se transforma em um híbrido urso, ganhando resistência a danos e aumentando sua vida e força.",
          "custoMagia": 10,
          "efeitos": {
            "passivo": "Ganha resistência a danos cortante, perfurante e concussivo",
            "ativo": "Transforma-se em híbrido urso com ataques naturais"
          },
          "dano": "3d4 (mordida) + 3d4 (garras)",
          "bonus": {
            "vidaTemporaria": "Ganha 20 pontos de vida extra"
          },
          "duracaoExtra": "Dura 2 horas"
        },
        {
          "nome": "Licantropia Javali",
          "tipo": "Metamorfose",
          "descricao": "O Metamorfo se transforma em um híbrido javali, com aumento de velocidade e resistência a danos.",
          "custoMagia": 10,
          "efeitos": {
            "passivo": "Ganha resistência a danos cortante, perfurante e concussivo",
            "ativo": "Transforma-se em híbrido javali com ataque com presas"
          },
          "dano": "2d6 (presas)",
          "bonus": {
            "vidaTemporaria": "Ganha 10 pontos de vida extra"
          },
          "duracaoExtra": "Dura 2 horas"
        },
        {
          "nome": "Licantropia Pantera",
          "tipo": "Metamorfose",
          "descricao": "O Metamorfo se transforma em um híbrido pantera, com maior furtividade, resistência a danos e ataques naturais.",
          "custoMagia": 10,
          "efeitos": {
            "passivo": "Ganha resistência a danos cortante, perfurante e concussivo",
            "ativo": "Transforma-se em híbrido pantera com ataques naturais"
          },
          "dano": "3d8 (mordida) + 3d8 (garras)",
          "modificadores": {
            "bonusSucesso": "Ganha bônus de 10 pontos em furtividade"
          },
          "duracaoExtra": "Dura 2 horas"
        },
        {
          "nome": "Licantropia Crocodilo",
          "tipo": "Metamorfose",
          "descricao": "O Metamorfo se transforma em um híbrido crocodilo, ganhando bônus de defesa, velocidade na água e ataque com mordida.",
          "custoMagia": 10,
          "efeitos": {
            "passivo": "Ganha resistência a danos cortante, perfurante e concussivo",
            "ativo": "Transforma-se em híbrido crocodilo com ataque natural"
          },
          "dano": "2d10 (mordida)",
          "bonus": {
            "vidaTemporaria": "Ganha bônus de +5 em defesa"
          },
          "duracaoExtra": "Dura 2 horas"
        },
        {
          "nome": "Licantropia Águia",
          "tipo": "Metamorfose",
          "descricao": "O metamorfo consegue se transformar em um híbrido águia. Ganha visão no escuro de 12 metros, 3 metros de velocidade adicional e resistência aos danos cortante, perfurante e concussivo. Ao se transformar, o metamorfo ganha asas, podendo voar com o dobro da sua velocidade de movimento. Possui um ataque desarmado com garras que causa 1d20 de dano perfurante. Pode atacar com suas garras enquanto voa como parte do movimento, com custo de uma ação. Não sofre ataques de oportunidade ao entrar ou sair do alcance de um inimigo. Dura 2 horas.",
          "custoEstamina": null,
          "custoMagia": 10,
          "efeitos": {
            "passivo": null,
            "ativo": "Ao se transformar em híbrido águia, o metamorfo ganha asas para voo."
          },
          "modificadores": {
            "bonusSucesso": "O metamorfo ganha 3 metros de velocidade adicional enquanto voa."
          },
          "bonus": null,
          "interacoes": null
        },
        {
          "nome": "Licantropia Cobra",
          "tipo": "Metamorfose",
          "descricao": "O metamorfo se transforma em um híbrido cobra. Ganha visão no escuro de 6 metros, 1,5 metros de velocidade adicional e resistência aos danos cortante, perfurante e concussivo. Ao atacar com mordida, o metamorfo tem 50% de chance de inocular um veneno que causa 1d10 de dano extra. Ganha a capacidade de enxergar com fossetas loreais e um ataque de mordida que causa 2d4 pontos de dano perfurante. Dura 2 horas.",
          "custoEstamina": null,
          "custoMagia": 10,
          "efeitos": {
            "passivo": null,
            "ativo": "O metamorfo pode atacar com mordida, podendo inocular veneno com chance de causar dano extra."
          },
          "modificadores": null,
          "bonus": null,
          "interacoes": null
        },
        {
          "nome": "Licantropia Salamandra",
          "tipo": "Metamorfose",
          "descricao": "O metamorfo se transforma em um híbrido salamandra. Ganha visão no escuro de 6 metros, 1,5 metros de velocidade adicional e resistência aos danos cortante, perfurante e concussivo. O metamorfo é incendiado com chamas que não o ferem, mas causa 1d6 de dano a criaturas em até 1,5 metros de distância. Imbui seus ataques com fogo, ganhando 2 pontos de dano extra. Recebe 2d8 pontos de vida extra e consegue escalar paredes sem necessidade de teste. É vulnerável a dano de gelo. Dura 2 horas.",
          "custoEstamina": null,
          "custoMagia": 10,
          "efeitos": {
            "passivo": "O metamorfo causa dano a criaturas próximas com chamas e ganha bônus de dano nos ataques com fogo.",
            "ativo": "Ao se transformar em salamandra, o metamorfo adquire resistência ao dano e ganha bônus de vida extra."
          },
          "modificadores": {
            "bonusSucesso": "O metamorfo recebe 2d8 pontos de vida extra e 2 pontos de dano adicional nos ataques com fogo."
          },
          "bonus": null,
          "interacoes": null
        },
        {
          "nome": "Virar Animal",
          "tipo": "Metamorfose",
          "descricao": "O metamorfo pode se transformar em um animal grande ou menor por um número de horas igual ao seu nível. Mantém os pontos de vida atuais e ganha pontos de vida temporários iguais ao seu valor de fortitude.",
          "custoEstamina": null,
          "custoMagia": null,
          "efeitos": {
            "passivo": null,
            "ativo": "Ao se transformar, o metamorfo ganha pontos de vida temporários equivalentes ao seu valor de fortitude."
          },
          "modificadores": null,
          "bonus": {
            "vidaTemporaria": "O metamorfo ganha pontos de vida temporários equivalentes ao seu valor de fortitude."
          },
          "interacoes": null
        }
      ]
    },
  ]
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
        <Tab label="Especializações de Combatente" className="tabs" />
        <Tab label="Especializações de Iniciado" className="tabs" />
        <Tab label="Especializações de Noviço" className="tabs" />
        <Tab label="Especializações de Feiticeiro" className="tabs" />
        <Tab label="Especializações Mistas" className="tabs" />
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
                <img src={novice} style={{ width: "30%", height: '30%' }} alt="Imagem do Combatente" />
                <Box sx={{ width: "60%", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Typography className="boxTextTitle" variant="h3" gutterBottom>
                    {novicoSkillsData.titulo}
                  </Typography>
                  <Typography className="bigBoxTextClasses" paragraph sx={{ textAlign: 'justify' }}>
                    {novicoSkillsData.descricao}
                  </Typography>
                </Box>

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
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ width: "80%", mx: "auto" }}>
              {/* Título e Descrição */}
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                <Box sx={{ width: "60%", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Typography className="boxTextTitle" variant="h3" gutterBottom>
                    {iniciadoSkillsData.titulo}
                  </Typography>
                  <Typography className="bigBoxTextClasses" paragraph sx={{ textAlign: 'justify' }}>
                    {iniciadoSkillsData.descricao}
                  </Typography>
                </Box>
                <img src={iniciado} style={{ width: "30%", height: '30%' }} alt="Imagem do Combatente" />
              </Box>
              <Typography variant="h4" className="boxTextTitle" sx={{ my: 3 }}>
                Habilidade de Classe
              </Typography>
              {/* Renderizar habilidade */}
              <HabilidadeDeClasseAcordion skill={iniciadoSkillsData.habilidade} />
              <Typography variant="h4" className="boxTextTitle" sx={{ my: 3 }}>
                Regalias
              </Typography>
              {/* Mapear regalias */}
              {iniciadoSkillsData.regalias.map((regalia, index) => (
                <PerkAccordion key={index} skill={regalia} />
              ))}
            </Box>
          </Box>
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
        </Box>
      )}
      {thisvalue === 3 && (
        <Box>
          {EspecializacaoCombatenteSkillsData.map(especializacao =>
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
          )}

        </Box>
      )}
      {thisvalue === 4 && (
        <Box>
          {EspecializacaoIniciadoSkillsData.map(especializacao =>
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
          )}

        </Box>
      )}
      {thisvalue === 5 && (
        <Box>
          {EspecializacaoNovicoSkillsData.map(especializacao =>
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
          )}

        </Box>
      )}
      {thisvalue === 6 && (
        <Box>
          {EspecializacaoFeiticeiroSkillsData.map(especializacao =>
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
          )}

        </Box>
      )}   {thisvalue === 7 && (
        <Box>
          {EspecializacaoMistaSkillsData.map(especializacao =>
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
          )}

        </Box>
      )}
      <Box sx={{ background: '#40150A', p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography sx={{ color: '#fff', fontSize: '10px' }}>© 2024 Lâmina do oculto. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default ClassesPage;
