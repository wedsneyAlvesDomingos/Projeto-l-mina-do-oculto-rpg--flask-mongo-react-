import React, { useState, useEffect } from 'react';
import { Card, CardContent, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, Divider, Chip } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./jobs.css";


const JobsPage = () => {


  function TabPanel({ children, value, index }) {
    return (
      <div role="tabpanel" hidden={value !== index}>
        {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
      </div>
    );
  }
  const profissoes = [
    {
      "nome": "Ferreiro",
      "ambiente": "forja média",
      "rendimento": 20,
      "habilidades": [
        {
          "nome": "Forja de Armaduras e Escudos de Metal - Nível 1",
          "descricao": "Forja em aço e reforça armaduras em até +1.",
          "custoRegalia": 1
        },
        {
          "nome": "Forja de Armaduras e Escudos de Metal - Nível 2",
          "descricao": "Forja em aço, aço negro e reforça armaduras em até +2.",
          "custoRegalia": 1
        },
        {
          "nome": "Forja de Armaduras e Escudos de Metal - Nível 3",
          "descricao": "Forja em aço, aço negro, mitralino e reforça armaduras em até +3.",
          "custoRegalia": 1
        },
        {
          "nome": "Forja de Armas de Metal (Dano e Acerto) - Nível 1",
          "descricao": "Forja em aço e reforça armas em até +1.",
          "custoRegalia": 1
        },
        {
          "nome": "Forja de Armas de Metal (Dano e Acerto) - Nível 2",
          "descricao": "Forja em aço, aço negro e reforça armas em até +2.",
          "custoRegalia": 1
        },
        {
          "nome": "Forja de Armas de Metal (Dano e Acerto) - Nível 3",
          "descricao": "Forja em aço, aço negro, mitralino, adamante e reforça armas em até +3.",
          "custoRegalia": 1
        },
        {
          "nome": "Forja de Itens Gerais - Nível 1",
          "descricao": "Forja em aço itens gerais como ferraduras, esferas de aço, alavancas, engrenagens e outros.",
          "custoRegalia": 1
        },
        {
          "nome": "Forja de Itens Gerais - Nível 2",
          "descricao": "Forja em aço e outros metais comuns itens gerais como ferraduras, esferas de aço, alavancas, engrenagens e peças pequenas e complexas para mecanismos.",
          "custoRegalia": 1
        }
      ]
    },
    {
      "nome": "Criminoso",
      "ambienteEmprego": "Pode conseguir emprego em qualquer lugar onde tenha multidões, estradas vazias ou becos.",
      "rendaPorDia": 30,
      "chanceDeRisco": "10% de ser pego",
      "beneficiosFixos": [
        "Aprende a usar kit de arrombamento"
      ],
      "habilidades": [
        {
          "nome": "Bater Carteiras",
          "descricao": "Permite ao criminoso furtar itens em multidões ou com trombadas.",
          "custoRegalia": 1,
          "efeitos": [
            "Pode tentar pegar itens visíveis de outra criatura em meio à multidão ou em uma trombada.",
            "Um teste de agilidade determina o sucesso, com dificuldade definida pelo mestre."
          ]
        },
        {
          "nome": "Abrir Fechaduras",
          "descricao": "Aumenta a proficiência e eficácia ao arrombar portas e janelas.",
          "custoRegalia": 1,
          "efeitos": [
            "Ganha dois pontos na proficiência em kit de arrombamento.",
            "+2 em testes para abrir portas e janelas em uma invasão."
          ]
        },
        {
          "nome": "Esconder Itens Ilegais",
          "descricao": "Aprimora a capacidade de esconder objetos ilegais.",
          "custoRegalia": 1,
          "efeitos": [
            "Vantagem no teste de furtividade para esconder um item ilegal."
          ]
        }
      ],
      "sistemasEspeciais": {}
    },
    {
      "nome": "Mercador",
      "ambienteEmprego": "Pode conseguir emprego em qualquer lugar onde tenha comércio de médio porte.",
      "rendaPorDia": 0,
      "chanceDeRisco": null,
      "beneficiosFixos": [],
      "habilidades": [
        {
          "nome": "Melhorar Preços",
          "descricao": "Permite negociar descontos em produtos ou serviços.",
          "custoRegalia": 1,
          "efeitos": [
            "Pode fazer um teste de negociação para conseguir descontos.",
            "Desconto varia conforme a rolagem: 5% (0-5), 10% (6-10), 15% (11-15), 25% (16-20), 30% (21-25), 35% (26+)."
          ]
        },
        {
          "nome": "Reunir Informações",
          "descricao": "Coleta informações em cidades ou regiões conversando com mercadores.",
          "custoRegalia": 1,
          "efeitos": [
            "Gasta 1 hora conversando para obter informações.",
            "Requer teste de persuasão com dificuldade determinada pelo mestre."
          ]
        }
      ],
      "sistemasEspeciais": {
        "Rolamento de Negociação": {
          "tabelas": {
            "Desconto por Rolagem": {
              "0-5": "5%",
              "6-10": "10%",
              "11-15": "15%",
              "16-20": "25%",
              "21-25": "30%",
              "26+": "35%"
            }
          },
          "regras": {}
        }
      }
    },
    {
      "nome": "Explorador",
      "ambienteEmprego": "Pode conseguir emprego em qualquer lugar onde tenha viajantes necessitados e aventureiros estrangeiros.",
      "rendaPorDia": 20,
      "chanceDeRisco": null,
      "beneficiosFixos": [],
      "habilidades": [
        {
          "nome": "Guiar",
          "descricao": "Ajuda o grupo a se mover furtivamente em terrenos perigosos.",
          "custoRegalia": 1,
          "efeitos": [
            "+2 em testes de furtividade e navegação para o grupo.",
            "Se o explorador tirar 20 no teste de furtividade, todos aliados automaticamente passam no teste."
          ]
        },
        {
          "nome": "Rastrear Pistas",
          "descricao": "Especialista em seguir rastros e pegadas.",
          "custoRegalia": 1,
          "efeitos": [
            "Rolagens de 12 ou menor são consideradas como 12 em testes de rastrear."
          ]
        },
        {
          "nome": "Facilidade em Encontrar Recursos na Natureza",
          "descricao": "Mais eficiente em testes de sobrevivência.",
          "custoRegalia": 1,
          "efeitos": [
            "Dobra os recursos obtidos em testes de sobrevivência.",
            "Sempre encontra abrigo para descansar na natureza."
          ]
        }
      ],
      "sistemasEspeciais": {}
    },
    {
      "nome": "Acadêmico",
      "ambienteEmprego": "Pode conseguir emprego em qualquer lugar onde tenha uma academia ou nobre precisando de tutores.",
      "rendaPorDia": 40,
      "chanceDeRisco": null,
      "beneficiosFixos": [],
      "habilidades": [
        {
          "nome": "Elaborar Mapas",
          "descricao": "Cria mapas que permitem retornar sem se perder.",
          "custoRegalia": 1,
          "efeitos": [
            "Permite retornar ao ponto inicial de uma viagem com precisão total ao usar um mapa elaborado."
          ]
        },
        {
          "nome": "Conhecimento de Civilizações Antigas",
          "descricao": "Ajuda na exploração de ruínas e tumbas.",
          "custoRegalia": 1,
          "efeitos": [
            "+2 de navegação em tumbas e ruínas.",
            "+3 em proficiência em Línguas Antigas.",
            "+5 em testes de investigação para encontrar artefatos."
          ]
        },
        {
          "nome": "Acesso a Bibliotecas e Setores de Estudos Privados",
          "descricao": "Acesso exclusivo a áreas de pesquisa.",
          "custoRegalia": 1,
          "efeitos": [
            "Entrada permitida em bibliotecas e setores de pesquisa proibidos ao público geral."
          ]
        },
        {
          "nome": "Arqueólogo",
          "descricao": "Especialista em escavações e estudo de artefatos antigos.",
          "custoRegalia": 1,
          "efeitos": [
            "+3 em proficiência em Arqueologia."
          ]
        }
      ],
      "sistemasEspeciais": {}
    },
    {
      "nome": "Herbalista",
      "ambienteEmprego": "Pode conseguir emprego em qualquer lugar onde tenha laboratórios, curandeiros e lojas de poções.",
      "rendaPorDia": 20,
      "beneficiosFixos": [
        "Poções feitas pelo próprio herbalista custam 3x menos que em lojas, pagando apenas pelos materiais."
      ],
      "habilidades": [
        {
          "nome": "Produção de Poções",
          "descricao": "Consegue produzir poções a partir de ervas e soluções alquímicas.",
          "custoRegalia": 1,
          "efeitos": [
            "Custo em materiais conforme tabela.",
            "Necessário teste de alquimia para produção."
          ]
        },
        {
          "nome": "Produção de Venenos Naturais",
          "descricao": "Extrai e prepara venenos de bestas e plantas naturais para aplicar em armas ou misturar em líquidos.",
          "custoRegalia": 1,
          "efeitos": [
            "Dano e efeitos conforme tabela.",
            "Custo mínimo de materiais: 10 M.O.",
            "Necessário teste de alquimia para produção."
          ]
        },
        {
          "nome": "Produção de Venenos de Monstros",
          "descricao": "Extrai e prepara venenos de anomalias e monstros para aplicação em armas ou líquidos.",
          "custoRegalia": 1,
          "efeitos": [
            "Dano e efeitos conforme tabela.",
            "Necessário teste de alquimia para produção."
          ]
        },
        {
          "nome": "Produção de Frascos de Veneno para Arremesso",
          "descricao": "Produz veneno de arremesso que causa dano em área.",
          "custoRegalia": 1,
          "efeitos": [
            "Afeta todas as criaturas em um raio de 10 pés.",
            "Causa o dano do veneno aplicado."
          ]
        },
        {
          "nome": "Produção de Antídotos",
          "descricao": "Consegue produzir antídotos para venenos de todos os tipos.",
          "custoRegalia": 1,
          "efeitos": [
            "Chance de sucesso: 50% (acima de 17 no D20).",
            "Custo: 50 M.O.",
            "Necessário teste de alquimia para produção."
          ]
        }
      ],
      "pocoes": [
        {
          "nome": "Poção de saciedade",
          "mágica": "não",
          "alquimia": "sim",
          "efeito": "Poção que deixa uma criatura hidratada e alimentada por um dia inteiro.",
          "duração": "24 horas",
          "custo": "10 M.O."
        },
        {
          "nome": "Poção de velocidade",
          "mágica": "sim",
          "alquimia": "não",
          "efeito": "Poção que dobra a velocidade do movimento de uma criatura.",
          "duração": "10 minutos",
          "custo": "100 M.O."
        },
        {
          "nome": "Poção de velocidade maior",
          "mágica": "sim",
          "alquimia": "não",
          "efeito": "Poção que dobra a velocidade do movimento de uma criatura e aumenta em 1 o número total de ações em um turno, para um total de 4.",
          "duração": "1 minuto",
          "custo": "200 M.O."
        },
        {
          "nome": "Poção de invisibilidade",
          "mágica": "sim",
          "alquimia": "não",
          "efeito": "A criatura fica invisível até realizar um ataque ou interagir com outra criatura de alguma forma. Enquanto invisível a criatura está Obscurecida.",
          "duração": "1 hora",
          "custo": "100 M.O."
        },
        {
          "nome": "Poção de cura",
          "mágica": "não",
          "alquimia": "sim",
          "efeito": "Cura uma criatura em 10 pontos de vida.",
          "duração": "instantâneo",
          "custo": "50 M.O."
        },
        {
          "nome": "Poção de cura maior",
          "mágica": "não",
          "alquimia": "sim",
          "efeito": "Cura uma criatura em 50 pontos de vida.",
          "duração": "instantâneo",
          "custo": "100 M.O."
        },
        {
          "nome": "Poção de cura suprema",
          "mágica": "sim",
          "alquimia": "não",
          "efeito": "Cura uma criatura em 100 pontos de vida.",
          "duração": "instantâneo",
          "custo": "200 M.O."
        },
        {
          "nome": "Poção de cura completa",
          "mágica": "sim",
          "alquimia": "não",
          "efeito": "Cura uma criatura em 150 pontos de vida.",
          "duração": "instantâneo",
          "custo": "400 M.O."
        },
        {
          "nome": "Poção de Armadura",
          "mágica": "sim",
          "alquimia": "não",
          "efeito": "Aumenta a defesa de uma pessoa sem armadura em +6",
          "duração": "12 horas",
          "custo": "100 M.O."
        },
        {
          "nome": "Poção de Crescimento",
          "mágica": "sim",
          "alquimia": "não",
          "efeito": "Aumenta em 1 o tamanho de uma criatura.",
          "duração": "1 minuto",
          "custo": "100 M.O."
        },
        {
          "nome": "Poção de redução",
          "mágica": "sim",
          "alquimia": "não",
          "efeito": "Diminui em 2 o tamanho de uma criatura. Máximo de minúsculo.",
          "duração": "1 minuto",
          "custo": "100 M.O."
        },
        {
          "nome": "Poção de transformação animal",
          "mágica": "sim",
          "alquimia": "não",
          "efeito": "Transforma-se em um animal de tamanho pequeno ou médio. Completamente transforma a forma física mas não a mental.",
          "duração": "1 hora",
          "custo": "100 M.O."
        },
        {
          "nome": "Poção de coragem",
          "mágica": "não",
          "alquimia": "sim",
          "efeito": "Imune a aterrorizado pela duração",
          "duração": "8 horas",
          "custo": "50 M.O."
        },
        {
          "nome": "Poção de disfarce",
          "mágica": "sim",
          "alquimia": "não",
          "efeito": "Transforma a aparência de uma criatura para outra de mesmo tamanho. Não é uma ilusão, porém não altera a capacidade física de quem toma a poção.",
          "duração": "1 hora",
          "custo": "50 M.O."
        },
        {
          "nome": "Poção de silêncio",
          "mágica": "sim",
          "alquimia": "não",
          "efeito": "Reduz todo som produzido por voz, roupa e itens de um indivíduo para um alcance de 3 metros, qualquer criatura fora desse alcance não consegue ouvir a criatura que tomou a poção andar ou falar.",
          "duração": "10 minutos",
          "custo": "30 M.O."
        }
      ],

      "venenos": [
        {
          "nome": "Cobra",
          "efeito": "Causa 6 pontos por rodada e deixa a vítima Devagar.",
          "duração": "Durabilidade do veneno",
          "custo": "20 M.O.",
          "teste_fortitude": "10"
        },
        {
          "nome": "Aranha",
          "efeito": "Causa 7 de dano imediato e 2 por rodada.",
          "duração": "Durabilidade do veneno",
          "custo": "30 M.O.",
          "teste_fortitude": "10"
        },
        {
          "nome": "Escorpião",
          "efeito": "Causa 6 de dano imediato e 2 por rodada.",
          "duração": "Durabilidade do veneno",
          "custo": "20 M.O.",
          "teste_fortitude": "10"
        },
        {
          "nome": "Abelhas",
          "efeito": "Deixa a vítima com a condição Enfraquecido.",
          "duração": "Durabilidade do veneno",
          "custo": "10 M.O.",
          "teste_fortitude": "14"
        },
        {
          "nome": "Vespas",
          "efeito": "Causa 10 de dano imediato e 2 por rodada.",
          "duração": "Durabilidade do veneno",
          "custo": "20 M.O.",
          "teste_fortitude": "12"
        },
        {
          "nome": "Água viva",
          "efeito": "Causa à vítima dor intensa e queima a pele, 6 de dano por rodada.",
          "duração": "Durabilidade do veneno",
          "custo": "10 M.O.",
          "teste_fortitude": "10"
        },
        {
          "nome": "Sapos",
          "efeito": "Causa à vítima a condição Paralisado.",
          "duração": "Durabilidade do veneno",
          "custo": "50 M.O.",
          "teste_fortitude": "10"
        },
        {
          "nome": "Larva de mariposa",
          "efeito": "Causa feridas na pele da vítima, 1d12 de dano por rodada.",
          "duração": "Durabilidade do veneno",
          "custo": "20 M.O.",
          "teste_fortitude": "10"
        },
        {
          "nome": "Peixe",
          "efeito": "Causa à vítima danos internos, 1d12 de dano por rodada.",
          "duração": "Durabilidade do veneno",
          "custo": "20 M.O.",
          "teste_fortitude": "10"
        },
        {
          "nome": "Besouro",
          "efeito": "Causa dor local e queimação e deixa Incapacitado.",
          "duração": "Durabilidade do veneno",
          "custo": "10 M.O.",
          "teste_fortitude": "10"
        }
      ],
      "plantas": [
        {
          "nome": "Aningapara",
          "efeito": "Causa à vítima a condição Paralisado.",
          "duração": "Durabilidade do veneno",
          "custo": "50 M.O.",
          "teste_fortitude": "10"
        },
        {
          "nome": "Saia Branca",
          "efeito": "Causa à vítima a condição Aterrorizado.",
          "duração": "Durabilidade do veneno",
          "custo": "30 M.O.",
          "teste_fortitude": "13"
        },
        {
          "nome": "Lírio do vale",
          "efeito": "Causa feridas na pele da vítima, 1d12 de dano por rodada.",
          "duração": "Durabilidade do veneno",
          "custo": "20 M.O.",
          "teste_fortitude": "10"
        },
        {
          "nome": "Olho de Boneca",
          "efeito": "Causa à vítima danos internos, 1d12 de dano por rodada.",
          "duração": "Durabilidade do veneno",
          "custo": "20 M.O.",
          "teste_fortitude": "10"
        }
      ],
      "monstros": [
        {
          "nome": "Basilisco",
          "efeito": "Causa à vítima a condição Paralisado.",
          "duração": "Durabilidade do veneno",
          "custo": "50 M.O."
        },
        {
          "nome": "Wyrm",
          "efeito": "Causa 10 de dano imediato e 4 por rodada.",
          "duração": "Durabilidade do veneno",
          "custo": "30 M.O."
        },
        {
          "nome": "Manticora",
          "efeito": "Causa à vítima as condições Aterrorizado e Devagar.",
          "duração": "Durabilidade do veneno",
          "custo": "40 M.O."
        },
        {
          "nome": "Sandworm",
          "efeito": "Causa à vítima a condição Enfraquecido e adiciona um nível de Cansado.",
          "duração": "Durabilidade do veneno",
          "custo": "30 M.O."
        }
      ],
      "producoes": [
        {
          "nome": "Frasco de veneno",
          "efeito": "Causa o dano do veneno em todas as criaturas em 10 pés do raio de explosão.",
          "custo": "Produção com 1 ponto de regalia"
        },
        {
          "nome": "Antídoto",
          "efeito": "Antídoto contra venenos de todos os tipos.",
          "custo": "50 M.O."
        }
      ]
    },
    {
      "nome": "Alfaiate",
      "ambiente": "cidades pequenas (costureiro de roupas básicas ou finas)",
      "rendimento": 40,
      "habilidades": [
        {
          "nome": "Produção de Itens e Armaduras de Tecido Encantáveis",
          "descricao": "Produz itens e armaduras de tecido que podem ser encantados.",
          "custoRegalia": 1
        },
        {
          "nome": "Refinar Armaduras Leves +1",
          "descricao": "Fabrica e reforça armaduras leves em até +1.",
          "custoRegalia": 1
        },
        {
          "nome": "Refinar Armaduras Leves +2",
          "descricao": "Fabrica e reforça armaduras leves em até +2.",
          "custoRegalia": 1
        },
        {
          "nome": "Refinar Armaduras Leves +3",
          "descricao": "Fabrica e reforça armaduras leves em até +3.",
          "custoRegalia": 1
        },
        {
          "nome": "Produção de Itens e Armaduras de Couro Encantáveis",
          "descricao": "Produz itens e armaduras de couro que podem ser encantados.",
          "custoRegalia": 1
        },
        {
          "nome": "Refinar Armaduras Médias +1",
          "descricao": "Fabrica e reforça armaduras médias em até +1.",
          "custoRegalia": 1
        },
        {
          "nome": "Refinar Armaduras Médias +2",
          "descricao": "Fabrica e reforça armaduras médias em até +2.",
          "custoRegalia": 1
        },
        {
          "nome": "Refinar Armaduras Médias +3",
          "descricao": "Fabrica e reforça armaduras médias em até +3.",
          "custoRegalia": 1
        }
      ],
      "chanceDeSucesso": [
        {
          "produto": "Armaduras ou itens de couro/tecido +1",
          "chance": "80%",
          "dificuldadeRolagem": "≥5 no D20"
        },
        {
          "produto": "Armaduras ou itens de couro/tecido +2",
          "chance": "60%",
          "dificuldadeRolagem": "≥13 no D20"
        },
        {
          "produto": "Armaduras ou itens de couro/tecido +3",
          "chance": "40%",
          "dificuldadeRolagem": "≥17 no D20"
        }
      ],
      "notas": "Requer teste de Destreza. Forja leva 3 dias de trabalho."
    },
    {
      "nome": "Artista",
      "ambiente": "qualquer lugar com público",
      "rendimento": 20,
      "habilidades": [
        {
          "nome": "Reunir Informações",
          "descricao": "Gasta 1h conversando para coletar informações (teste de Persuasão ou Sedução).",
          "custoRegalia": 1
        },
        {
          "nome": "Espalhar Rumores",
          "descricao": "Gasta 1h conversando para espalhar informações (teste de Enganação ou Sedução).",
          "custoRegalia": 1
        },
        {
          "nome": "Causar Distrações",
          "descricao": "Pode usar a ação ‘Distrair’ simultaneamente à performance.",
          "custoRegalia": 1
        }
      ]
    },
    {
      "nome": "Joalheiro",
      "ambiente": "joalherias ou minas de pedras preciosas",
      "rendimento": 50,
      "habilidades": [
        {
          "nome": "Confeccionar Jóias Simples",
          "descricao": "Produz jóias (custa metade do preço de mercado).",
          "custoRegalia": 1
        },
        {
          "nome": "Confeccionar Jóias Encantadas",
          "descricao": "Produz jóias encantáveis a partir de metais preciosos e gemas.",
          "custoRegalia": 1
        },
        {
          "nome": "Apurar Pedras Preciosas",
          "descricao": "Determina valor e identifica gemas (+5 em Natureza para rochas).",
          "custoRegalia": 1
        }
      ]
    },
    {
      "nome": "Inventor",
      "ambiente": "grandes cidades (projetista de pontes/estruturas)",
      "rendimento": 60,
      "habilidades": [
        {
          "nome": "Elaborar Esquemáticas de Armas",
          "descricao": "Cria ou melhora armas existentes.",
          "custoRegalia": 1
        },
        {
          "nome": "Elaborar Esquemáticas de Armaduras",
          "descricao": "Cria ou melhora armaduras existentes.",
          "custoRegalia": 1
        },
        {
          "nome": "Elaborar Esquemáticas de Próteses",
          "descricao": "Projeta próteses para membros faltantes ou inexistentes.",
          "custoRegalia": 1
        },
        {
          "nome": "Elaborar Esquemáticas de Veículos",
          "descricao": "Cria ou melhora veículos existentes.",
          "custoRegalia": 1
        },
        {
          "nome": "Elaborar Esquemáticas de Engenhocas",
          "descricao": "Cria pequenos mecanismos de utilidade básica.",
          "custoRegalia": 1
        },
        {
          "nome": "Criar Constructos Semicientes",
          "descricao": "Elabora constructos sencientes.",
          "custoRegalia": 1
        }
      ],
      "tabelaSucesso": [
        {
          "chance": "80%",
          "rolagem": "≥5 no D20",
          "precoSugerido": 5,
          "complexidade": "simples"
        },
        {
          "chance": "50%",
          "rolagem": "≥11 no D20",
          "precoSugerido": 15,
          "complexidade": "média"
        },
        {
          "chance": "30%",
          "rolagem": "≥15 no D20",
          "precoSugerido": 45,
          "complexidade": "média‑alta"
        },
        {
          "chance": "10%",
          "rolagem": "≥19 no D20",
          "precoSugerido": 135,
          "complexidade": "alta"
        }
      ],
      "notas": "Teste de Tecnologia para criar esquemáticas; duração e custo definidos pelo mestre."
    },
    {
      "nome": "Carpinteiro",
      "ambiente": "qualquer lugar com moradias ou móveis de madeira",
      "rendimento": 20,
      "habilidades": [
        {
          "nome": "Produzir Itens de Madeira",
          "descricao": "Produz itens de madeira simples ou exóticas (custa metade do preço).",
          "custoRegalia": 1
        },
        {
          "nome": "Produzir Itens Encantáveis",
          "descricao": "Produz itens de madeira que podem ser encantados.",
          "custoRegalia": 1
        },
        {
          "nome": "Forjar Armas de Madeira +1",
          "descricao": "Forja armas de madeira com reforço +1.",
          "custoRegalia": 1
        },
        {
          "nome": "Forjar Armas de Madeira +2",
          "descricao": "Forja armas de madeira élfica com reforço +2.",
          "custoRegalia": 1
        },
        {
          "nome": "Forjar Armas de Madeira +3",
          "descricao": "Forja armas em madeiras exóticas com reforço +3.",
          "custoRegalia": 1
        },
        {
          "nome": "Construir Veículos de Madeira",
          "descricao": "Constrói veículos terrestres e aquáticos majoritariamente de madeira.",
          "custoRegalia": 1
        },
        {
          "nome": "Construir Veículos Exóticos de Madeira",
          "descricao": "Constrói veículos exóticos de madeira com peças adicionais compradas.",
          "custoRegalia": 1
        }
      ],
      "materiaisEspeciais": [
        "Madeira Simples",
        "Madeira Élfica",
        "Madeira de Ébano Ancião",
        "Madeira de Sangue"
      ],
      "chanceDeSucesso": [
        {
          "tentativa": "arma de madeira",
          "chance": "80%",
          "rolagem": "≥5 no D20"
        },
        {
          "tentativa": "item ou veículo",
          "chance": "50%",
          "rolagem": "≥11 no D20"
        }
      ],
      "notas": "Produção custa metade do preço; refino custa um terço."
    },
    {
      "nome": "Arcanista",
      "ambiente": "itens militares ou academias de magia",
      "rendimento": 40,
      "habilidades": [
        {
          "nome": "Encantar Armas +1d4",
          "descricao": "Bônus +1d4 de dano elemental (materiais de 100 M.O.).",
          "custoRegalia": 1
        },
        {
          "nome": "Encantar Armas +2d4",
          "descricao": "Bônus +2d4 de dano (pré‑req: +1; materiais 100 M.O. se reencantar ou 400 M.O. se primeiro).",
          "custoRegalia": 1
        },
        {
          "nome": "Encantar Armas +3d4",
          "descricao": "Bônus +3d4 de dano (pré‑req: +2; materiais 100 M.O. se reencantar ou 600 M.O. se primeiro).",
          "custoRegalia": 1
        },
        {
          "nome": "Mudar Tipo de Dano",
          "descricao": "Altera elemento da arma corpo a corpo (100 M.O.; projéteis não podem).",
          "custoRegalia": 1
        },
        {
          "nome": "Encantar Proteção +1",
          "descricao": "+1 em defesa em armaduras leves/roupas/jóias (150 M.O.).",
          "custoRegalia": 1
        },
        {
          "nome": "Encantar Proteção +2",
          "descricao": "+2 em defesa (pré‑req: +1; 300 M.O.).",
          "custoRegalia": 1
        },
        {
          "nome": "Reforço de Dano Elemental +2",
          "descricao": "+2 no dano elemental de magias (100 M.O.).",
          "custoRegalia": 1
        },
        {
          "nome": "Reforço de Dano Elemental +4",
          "descricao": "+4 no dano elemental de magias (pré‑req: +2; 300 M.O.).",
          "custoRegalia": 1
        },
        {
          "nome": "Produzir Pergaminhos",
          "descricao": "Replica magias conhecidas em pergaminhos (50 M.O. em papel e tinta).",
          "custoRegalia": 1
        }
      ],
      "tiposDeDano": [
        "Fogo", "Gelo", "Raio", "Terra", "Sombrio", "Sagrado", "Arcano", "Necrótico"
      ],
      "chanceDeSucesso": [
        {
          "acao": "encantar arma/objeto",
          "chance": "30%",
          "rolagem": "≥15 no D20"
        },
        {
          "acao": "criar pergaminho",
          "chance": "20%",
          "rolagem": "≥17 no D20"
        }
      ],
      "notas": "Teste de Arcanismo para rolagem."
    },
    {
      "nome": "Cozinheiro",
      "ambiente": "qualquer lugar",
      "rendimento": null,
      "habilidades": [
        {
          "nome": "Produzir Rações Especiais",
          "descricao": "Gasta metade do valor para fazer duas rações; cada uma confere +10 PV temporários.",
          "custoRegalia": 1
        },
        {
          "nome": "Aprimorar Uso de Recursos Alimentícios",
          "descricao": "Dobra usos de comida/água encontradas e +5 em Sobrevivência.",
          "custoRegalia": 1
        },
        {
          "nome": "Cozinhar Alimentos Restauradores",
          "descricao": "Ração que em 10 min cura 10 PV e 3 de estamina (10 M.O. por ração).",
          "custoRegalia": 1
        }
      ]
    },
    {
      "nome": "Soldado de Aluguel",
      "ambiente": "área portuária, segurança ou periferias",
      "rendimento": null,
      "habilidades": [
        {
          "nome": "Trabalhar como Marinheiro",
          "descricao": "+5 em Navegação e passagem em troca de serviço.",
          "custoRegalia": 1
        },
        {
          "nome": "Trabalhar como Segurança",
          "descricao": "+3 em Percepção em turno de guarda ou vigia.",
          "custoRegalia": 1
        },
        {
          "nome": "Trabalhar como Capanga de Agiota",
          "descricao": "+5 em Intimidação para obter informações.",
          "custoRegalia": 1
        },
        {
          "nome": "Treinamento Militar",
          "descricao": "+5 em Jurisprudência e Negociação com nobres.",
          "custoRegalia": 1
        }
      ]
    }
  ]
  const ProfissoesComponent = () => (
    <Box>
      <Typography variant="h4" className="MainTitleC">PROFISSÕES</Typography>
      <Typography className="bigBoxTextClasses" sx={{ mt: 2 }}>
        Em muitos sistemas de RPG, as profissões desempenham um papel crucial no desenvolvimento do personagem, oferecendo uma forma tangível de especialização e aprimoramento à medida que ele avança em suas jornadas. Em nosso sistema, as profissões são concebidas como um conjunto de habilidades que evoluem ao longo do tempo, permitindo que o personagem se torne mais competente em sua área escolhida e, ao mesmo tempo, oferecendo uma gama de possibilidades durante o jogo.
      </Typography>
      <Typography variant="h5" className="boxTextTitle" sx={{ my: 2, mx: 3 }}>
        Progressão e Regalias</Typography>
      <Typography className="bigBoxTextClasses" sx={{ mt: 2 }}>
        Ao atingir novos níveis, o personagem tem a oportunidade de investir seus pontos de Regalia para melhorar sua profissão ou até mesmo escolher uma nova. Essa flexibilidade é essencial para garantir que o personagem tenha um senso de evolução contínua e relevância dentro do jogo.
        <br />
        Cada ponto de Regalia atribuído a uma profissão escolhida proporciona um avanço progressivo nas habilidades dessa profissão, sempre seguindo uma sequência numérica obrigatória. Essa sequência é importante para manter a lógica de evolução da profissão, proporcionando um crescimento coerente e estruturado para o personagem.
      </Typography>
      <Typography variant="h5" className="boxTextTitle" sx={{ my: 2, mx: 3 }}>        Escolhas de Profissão e Habilidades</Typography>
      <Typography className="bigBoxTextClasses" sx={{ mt: 2 }}>
        Quando o personagem atinge um novo nível e decide investir em sua profissão, ele pode escolher entre várias habilidades disponíveis dentro de sua profissão inicial ou até mesmo optar por uma nova profissão. Para as profissões que possuem habilidades ordenadas numericamente, o ponto de Regalia investido deve seguir essa ordem específica. Ou seja, um ponto de Regalia gasto no nível 1 concede a primeira habilidade, no nível 2 a segunda habilidade, e assim por diante.
        <br />
        Se, por outro lado, a profissão não exige uma ordem numérica rígida nas suas habilidades, o jogador pode escolher livremente entre as opções disponíveis para melhorar o personagem de acordo com as necessidades de sua jornada e estilo de jogo.
        <br />
        Por exemplo, se uma profissão oferece habilidades que não estão organizadas de maneira sequencial, o jogador pode selecionar qualquer habilidade desejada, tornando o processo mais flexível e permitindo uma customização mais profunda do personagem.
        <br />
        Exemplo Prático:<br />
        Profissão: Ferreiro<br />

        Nível 1: Habilidade de Forjar Armas Simples.
        <br />
        Nível 2: Habilidade de Forjar Armaduras de Média Complexidade.
        <br />
        Nível 3: Habilidade de Forjar Armas Mágicas.
        <br />
        Neste exemplo, um personagem ferreiro deve seguir a ordem para aprimorar suas habilidades, gastando pontos de Regalia em sequência para adquirir as habilidades de forjar armas simples, depois armaduras de média complexidade, e finalmente, as armas mágicas.
        <br />
        Se uma profissão não seguir uma ordem numérica, como a profissão de Alquimista, o jogador poderia escolher qualquer habilidade disponível entre as opções, como:
        <br />
        Profissão: Alquimista
        <br />
        Opções de Habilidades: Criar Poções Curativas, Poções de Invisibilidade, Poções de Aumento de Força.
        <br />
        A flexibilidade de escolha permite que o jogador adapte o desenvolvimento de seu personagem às circunstâncias do jogo e à narrativa que se desenrola.
      </Typography>
      {profissoes.map((p, i) => (
        <Accordion key={i}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{p.nome}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box mb={2}>
              {p.ambiente && <Typography variant="body2"><strong>Ambiente:</strong> {p.ambiente}</Typography>}
              {p.ambienteEmprego && <Typography variant="body2"><strong>Ambiente de Emprego:</strong> {p.ambienteEmprego}</Typography>}
              {p.rendimento != null && <Typography variant="body2"><strong>Rendimento:</strong> {p.rendimento} moedas</Typography>}
              {p.rendaPorDia != null && <Typography variant="body2"><strong>Renda por Dia:</strong> {p.rendaPorDia} moedas</Typography>}
              {p.chanceDeRisco && <Typography variant="body2"><strong>Chance de Risco:</strong> {p.chanceDeRisco}</Typography>}
              {p.beneficiosFixos?.length > 0 && (
                <>
                  <Typography variant="subtitle2" mt={1}>Benefícios Fixos:</Typography>
                  <List dense>
                    {p.beneficiosFixos.map((b, j) => (
                      <ListItem key={j}><ListItemText primary={b} /></ListItem>
                    ))}
                  </List>
                </>
              )}
            </Box>
            {p.habilidades?.length > 0 && (
              <Box mt={2}>
                <Typography variant="subtitle1">Habilidades:</Typography>
                {p.habilidades.map((h, j) => (
                  <Box key={j} mb={2} ml={1}>
                    <Typography variant="subtitle2">{h.nome}</Typography>
                    {h.descricao && <Typography variant="body2">{h.descricao}</Typography>}
                    {"custoRegalia" in h && <Chip label={`Custo: ${h.custoRegalia} Regalia`} size="small" />}
                    {h.opcoes?.length > 0 && (
                      <List dense>{h.opcoes.map((o, k) => <ListItem key={k}><ListItemText primary={o} /></ListItem>)}</List>
                    )}
                    {h.efeitos?.length > 0 && (
                      <List dense>{h.efeitos.map((e, k) => <ListItem key={k}><ListItemText primary={e} /></ListItem>)}</List>
                    )}
                  </Box>
                ))}
              </Box>
            )}
            {p.sistemasEspeciais && Object.keys(p.sistemasEspeciais).length > 0 && (
              <Box mt={2}>
                <Typography variant="subtitle1">Sistemas Especiais:</Typography>
                {Object.entries(p.sistemasEspeciais).map(([titulo, conteudo], j) => (
                  <Box key={j} ml={1} mt={1}>
                    <Typography variant="subtitle2">{titulo}</Typography>
                    {conteudo.tabelas && Object.entries(conteudo.tabelas).map(([nome, valores], k) => (
                      <Box key={k} ml={2}>
                        <Typography variant="body2"><strong>{nome}</strong></Typography>
                        <List dense>
                          {Object.entries(valores).map(([faixa, valor], m) => (
                            <ListItem key={m}><ListItemText primary={`${faixa}: ${valor}`} /></ListItem>
                          ))}
                        </List>
                      </Box>
                    ))}
                  </Box>
                ))}
              </Box>
            )}
            {p.pocoes && <Typography variant="h5" sx={{ my: 2 }}>Poções</Typography>}
            {p.pocoes && <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell align="center">Mágica</TableCell>
                    <TableCell align="center">Alquimia</TableCell>
                    <TableCell>Efeito</TableCell>
                    <TableCell align="center">Duração</TableCell>
                    <TableCell align="right">Custo (M.O.)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {p.pocoes?.map((pocao, index) => (
                    <TableRow key={index}>
                      <TableCell>{pocao.nome}</TableCell>
                      <TableCell align="center">{pocao.mágica ? 'Sim' : 'Não'}</TableCell>
                      <TableCell align="center">{pocao.alquimia ? 'Sim' : 'Não'}</TableCell>
                      <TableCell>{pocao.efeito}</TableCell>
                      <TableCell align="center">{pocao.duracao}</TableCell>
                      <TableCell align="right">{pocao.custo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>}
            {p.venenos && <Typography variant="h5" sx={{ my: 2 }}>Venenos de animais</Typography>}
            {p.venenos && <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell align="center">Mágica</TableCell>
                    <TableCell align="center">Alquimia</TableCell>
                    <TableCell>Efeito</TableCell>
                    <TableCell align="center">Duração</TableCell>
                    <TableCell align="right">Custo (M.O.)</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {p.venenos?.map((pocao, index) => (
                    <TableRow key={index}>
                      <TableCell>{pocao.nome}</TableCell>
                      <TableCell align="center">{pocao.mágica ? 'Sim' : 'Não'}</TableCell>
                      <TableCell align="center">{pocao.alquimia ? 'Sim' : 'Não'}</TableCell>
                      <TableCell>{pocao.efeito}</TableCell>
                      <TableCell align="center">{pocao.duracao}</TableCell>
                      <TableCell align="right">{pocao.custo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>}
            {p.plantas && <Typography variant="h5" sx={{ my: 2 }}>Venenos de plantas</Typography>}
            {p.plantas && <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell align="center">Mágica</TableCell>
                    <TableCell align="center">Alquimia</TableCell>
                    <TableCell>Efeito</TableCell>
                    <TableCell align="center">Duração</TableCell>
                    <TableCell align="right">Custo (M.O.)</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {p.plantas?.map((pocao, index) => (
                    <TableRow key={index}>
                      <TableCell>{pocao.nome}</TableCell>
                      <TableCell align="center">{pocao.mágica ? 'Sim' : 'Não'}</TableCell>
                      <TableCell align="center">{pocao.alquimia ? 'Sim' : 'Não'}</TableCell>
                      <TableCell>{pocao.efeito}</TableCell>
                      <TableCell align="center">{pocao.duracao}</TableCell>
                      <TableCell align="right">{pocao.custo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>}
            {p.monstros && <Typography variant="h5" sx={{ my: 2 }}>Venenos de Monstros</Typography>}
            {p.monstros && <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell align="center">Mágica</TableCell>
                    <TableCell align="center">Alquimia</TableCell>
                    <TableCell>Efeito</TableCell>
                    <TableCell align="center">Duração</TableCell>
                    <TableCell align="right">Custo (M.O.)</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {p.monstros?.map((pocao, index) => (
                    <TableRow key={index}>
                      <TableCell>{pocao.nome}</TableCell>
                      <TableCell align="center">{pocao.mágica ? 'Sim' : 'Não'}</TableCell>
                      <TableCell align="center">{pocao.alquimia ? 'Sim' : 'Não'}</TableCell>
                      <TableCell>{pocao.efeito}</TableCell>
                      <TableCell align="center">{pocao.duracao}</TableCell>
                      <TableCell align="right">{pocao.custo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
  return (
    <Box sx={{ minHeight: '700px', width: '100%' }} >
      <Box sx={{ width: "80%", mx: 'auto', my: 4 }}>
        <ProfissoesComponent></ProfissoesComponent>
      </Box>

      <Box sx={{ background: '#40150A', p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', width: '100%' }}>
        <Typography sx={{ color: '#fff', fontSize: '10px' }}>© 2024 Lâmina do oculto. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default JobsPage;
