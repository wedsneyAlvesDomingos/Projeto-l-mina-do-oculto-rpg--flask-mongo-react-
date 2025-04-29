import iniciado from "../../../assets/images/iniciado2.png";
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./classes.css";

const IniciadoPage = () => {
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
    return (
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
    );
}

export default IniciadoPage;