import React, { useState, useEffect } from 'react';
import { Card, CardContent, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./actions.css";


const Actionspage = () => {

    const acoes = [
        {
            title: "Abrir Fechadura",
            description: "Custa duas ações. Uma criatura proficiente com kit de arrombamento que as tenha em mãos, pode tentar arrombar uma fechadura usando suas Habilidades.  A dificuldade dessa ação depende da complexidade da fechadura. Alternativamente, um personagem pode tentar arrombar a porta com um golpe poderoso ou magia.A dificuldade dessa ação depende da porta e sua construção.",
        },
        {
            title: "Agarrar",
            description: "Iniciar um Agarrar: A criatura pode tentar agarrar um oponente realizando um teste de Força contra o teste de Força do adversário. Se for bem - sucedida, a criatura consegue agarrar a outra, colocando- a na condição Agarrado. Efeitos do Agarrar: Agarrado: A criatura agarrada tem sua velocidade reduzida a 0 e não pode se beneficiar de quaisquer bônus de velocidade.Ataques feitos contra a criatura agarrada recebem vantagem A criatura que realiza o agarrão pode mover a criatura agarrada, mas sua própria velocidade é reduzida pela metade durante esse movimento. Tentativas Adicionais no Mesmo Turno: Se uma criatura falhar em agarrar seu oponente e tentar novamente no mesmo turno, sofrerá uma penalidade cumulativa de - 2 pontos na próxima tentativa e em todas as subsequentes no mesmo turno. Tamanho das Criaturas: Não é possível agarrar uma criatura que seja dois tamanhos acima do seu próprio. Manter e Escapar de um Agarrar Manter o Agarrar: No início de cada um dos seus turnos, a criatura que está agarrando deve fazer um novo teste de Força contra o teste de Força da criatura agarrada. Se falhar, a criatura agarrada escapa e a condição de agarrado termina. Escapar de um Agarrar: Uma criatura agarrada pode usar sua ação escapar. Outras Ações Enquanto Agarrando: A criatura que está agarrando pode atacar a criatura agarrada com vantagem em ataques corpo a corpo. A criatura que está agarrando não pode usar as duas mãos para outras ações enquanto mantém o agarrão, a menos que tenha uma habilidade ou regalia que permita, ou tenha mais que dois braços.   Considerações Adicionais: Ações de Ajuda, outra criatura pode usar sua ação para ajudar uma criatura a escapar de um agarrão, fornecendo vantagem no teste de escape.Penalidades de Tamanho: Criaturas dois tamanhos maiores , ou mais, têm vantagem nos testes para manter o agarrão.",
        },
        {
            title: "Atacar",
            description: "Uma criatura pode realizar um ataque como uma ação. Cada criatura pode atacar apenas uma vez por ação, a menos que possua uma Regalia que permita o contrário. Quando uma criatura realiza mais de uma ação “atacar” no mesmo turno, a partir da segunda vez que usar a ação atacar, os ataques feitos terão desvantagem. É importante destacar que Regalias que permitam realizar um ataque como parte de uma Habilidade também sofrem essa penalidade.Caso a criatura ao rolar o seu ataque role mais que 10 acima do valor de defesa do alvo ganha 1d4 de dano bônus em seu ataque. Caso a criatura ao rolar o seu ataque role mais que 15 acima do valor de defesa do alvo ganha  2 pontos de dano bônus em seu ataque. Caso a criatura ao rolar o seu ataque role mais que 20 acima do valor de defesa do alvo ganha  3 pontos de dano bônus em seu ataque.",
        },
        {
            title: "Buscar",
            description: "Um personagem pode, ao fazer um teste de percepção, tentar localizar visualmente um objeto, rota ou criatura sem interagir diretamente com o ambiente.",
        },
        {
            title: "Buscar Cobertura",
            description: "Uma criatura pode se abrigar atrás de obstáculos físicos no ambiente em que se encontra para se proteger de projéteis. A barreira física deve ser resistente o suficiente para deter os projéteis. Existem três tipos de cobertura: Cobertura Total,Uma estrutura grande o bastante para proteger todo o corpo de uma criatura. Quando uma criatura está em cobertura total, ela fica obscurecida e não pode ser alvejada  ataques de longa distância, mágicos ou físicos.Cobertura de ¾:Um objeto ou estrutura que protege 3/4 do corpo de uma criatura. Quando em 3/4 de cobertura, a criatura recebe um bônus de 2 pontos na sua defesa.Meia Cobertura:Um objeto ou estrutura que protege metade do corpo de uma criatura. Quando em meia cobertura, a criatura recebe um bônus de 1 ponto na sua defesa.",
        },
        {
            title: "Comandar Animal",
            description: "Uma criatura que possui um companheiro animal ou que consegue tomar controle de um através de magia ou feitiço pode comandá-lo com esta ação. É possível ordenar ao animal que use ações de ataque, movimento, buscar cobertura, interação com objetos (se possível), distrair ou derrubar (se possível).",
        },
        {
            title: "Distrair",
            description: "Uma criatura pode distrair outra para ajudar seus aliados. Para isso, a criatura deve realizar uma ação que chame a atenção das outras criaturas para si, como acender um fogo, gritar algo pessoal, fazer uma provocação ou até mesmo fingir uma morte dramática. Para distrair um inimigo, a criatura deve fazer um teste de Enganação, Persuasão ou Performance que supere o teste de intuição do inimigo. A criatura distraída sofre uma penalidade de 2 pontos em testes de ataque e percepção até o final de seu próximo turno.",
        },
        {
            title: "Derrubar",
            description: "Uma criatura pode tentar derrubar seu oponente. Para isso, deve fazer um teste de Força ou Destreza contra a Força ou Destreza do adversário. Se for bem-sucedida, a criatura consegue derrubar o oponente, que fica na condição deitado. Se uma criatura falhar em derrubar seu oponente e tentar novamente no mesmo turno, sofrerá uma penalidade cumulativa de 1 ponto na próxima tentativa. No entanto, não é possível derrubar uma criatura duas vezes maior ou que possua mais de duas pernas, nem uma criatura sem pernas.",
        },
        {
            title: "Desarmar",
            description: "Uma criatura pode tentar desarmar seu oponente, realizando um teste de Destreza contra a Destreza do adversário. Se for bem-sucedida, a criatura consegue desarmar o oponente, fazendo-o soltar sua arma. Não é possível desarmar armas naturais ou aquelas presas ao corpo do inimigo.",
        },
        {
            title: "Empurrar",
            description: "Uma criatura pode tentar empurrar seu oponente, realizando um teste de Força contra a Força do adversário. Se for bem-sucedida, a criatura empurra o oponente para trás ou para o lado, em uma distância de 1,5 metros, desde que não haja obstáculos físicos ou outras criaturas no caminho. Se a criatura falhar em empurrar o oponente e tentar novamente no mesmo turno, sofrerá uma penalidade de 2 pontos na próxima tentativa. Não é possível empurrar uma criatura que seja 2 tamanhos maior ou esteja enraizada no chão.",
        },
        {
            title: "Escapar",
            description: "Uma criatura agarrada pode tentar escapar realizando um teste de Acrobacia ou Atletismo contra um teste de força da criatura que realiza o agarrão ou valor de dificuldade de um efeito que o deixou restringido. Se for agarrado ou restringido por magia, feitiço ou milagre leia o efeito do mesmo para saber como escapar. Se não houver nenhuma regra específica use o valor do sucesso de conjuração da habilidade.",
        },
        {
            title: "Esconder",
            description: "Durante o combate, uma criatura pode se esconder das outras. Ao ficar obscurecida pela falta de luz, fumaça ou outras condições semelhantes, a criatura pode fazer um teste de furtividade. O valor de dificuldade deste teste será determinado pelo mestre. Se for bem-sucedida, a criatura fica Escondida. É possível fazer mais de uma tentativa de esconder-se por turno, mas a criatura sofrerá uma penalidade cumulativa de 1 ponto por cada tentativa adicional. Uma criatura  que esteja em campo de visão de um ou mais inimigos não pode ser considerada Escondida  de outros ao se abaixar ou encolher atrás de objetos, criaturas ou outros sem se mover se esgueirando para mudar de posição. É preciso estar fora do campo de visão de toda e qualquer criatura hostil.",
        },
        {
            title: "Esconder um objeto",
            description: "Durante o combate, uma criatura pode esconder um objeto das outras. Se o objeto puder ser guardado em sua roupa, a criatura pode fazer um teste de furtividade. O valor desse teste será determinado pelo mestre. Se for bem-sucedida, as outras criaturas não perceberão que a criatura está com o objeto, embora possam suspeitar. Se o objeto for uma arma e o teste for um sucesso, a criatura ganha 1 ponto de Acerto ao realizar um ataque e deixa o alvo do ataque na condição surpreso. É possível fazer mais de uma tentativa de esconder o objeto por turno, mas a criatura sofrerá uma penalidade cumulativa de 1 ponto por cada tentativa adicional.",
        },
        {
            title: "Esgueirar",
            description: "Uma criatura pode mover-se em modo de esgueirar por um ambiente, desde que esteja obscurecida pelo ambiente ou fora do campo de visão de todos os inimigos. A velocidade de movimento ao esgueirar-se sofre uma penalidade de 1,5 metros.",
        },
        {
            title: "Fintar",
            description: "Uma criatura que esteja em combate corpo a corpo com uma ou mais criaturas pode fazer uma finta para ganhar vantagem no rolamento de ataque corpo a corpo. A criatura que tentar realizar essa ação deve fazer teste de enganação com valor 12 de dificuldade. Somente uma tentativa de finta pode ser feita por rodada. O vantagem de fintar aumenta em 1 dado por inimigo adicional que esteja a até 1,5 metros de distância.",
        },
        {
            title: "Interagir",
            description: "Uma criatura realiza uma interação com um objeto simples, como: Sacar uma arma ou escudo , Abrir uma porta , Ativar um item simples, mágico ou não , Retirar uma peça de roupa que não seja difícil de tirar , Guardar uma arma ou escudo , Tomar uma poção , Entregar uma poção",
        },
        {
            title: "Intimidar",
            description: "Uma criatura pode tentar intimidar um inimigo por meio de fala e/ou ações. O alvo deve fazer um teste de Intuição contra o teste de Intimidação do intimidador. Se o intimidador for bem-sucedido, o alvo ficará na condição aterrorizada até o fim de seu próximo turno.",
        },
        {
            title: "Levantar",
            description: "Uma criatura usa sua ação para se levantar do chão",
        },
        {
            title: "Ler Ambiente",
            description: "Uma criatura pode tentar compreender uma situação ou detectar emoções ou expressões específicas em uma pessoa, como medo ou mentira. A criatura que está tentando ler o ambiente deve fazer um teste de Intuição contra uma Habilidade Social correspondente ao que o alvo está demonstrando, como Enganação para mentiras, Persuasão para a verdade, Sedução para seduzir, etc.",
        },
        {
            title: "Montar",
            description: "Uma criatura monta em uma montaria ou sobe em um veículo aberto.",
        },
        {
            title: "Pedir",
            description: "Uma criatura pode pedir um item ou algo que esteja em posse de um aliado, desde que seja algo que o aliado tenha capacidade física de entregar.",
        },
        {
            title: "Performar",
            description: "Uma criatura pode realizar uma performance artística uma vez por turno. Essa performance pode ser usada para acalmar os ânimos de adversários com os quais prefere não lutar ou para inspirar seus aliados. Para tentar acalmar adversários, deve fazer um teste de Performance contra um teste de Intuição de cada adversário. Caso o adversário falhe no teste, o mestre determina o resultado da mudança de humor. É possível encerrar uma luta ou deixar o adversário incapaz de tomar ações hostis por um turno. Para inspirar um de seus aliados dentro de um alcance de 30 metros, a criatura deve fazer um teste de Performance. Dependendo do valor obtido no teste, são gerados bônus em no pŕoximo rolamento de um d20 dos aliado afetado. ",
        },
        {
            title: "Preparar",
            description: " Custa 2 Ações. Uma criatura pode preparar uma ação com um gatilho para ativá-la. Caso o gatilho ocorra até o seu próximo turno, ela pode usar a ação preparada. Caso contrário, a ação não ocorre.",
        },
        {
            title: "Recordar Conhecimento",
            description: "Uma criatura pode tentar fazer um teste de História, Ocultismo, Teologia, Religião, Tecnologia, Jurisprudência ou Arcanismo para recordar de um conhecimento relacionado ao que deseja saber. A dificuldade do teste depende do que o personagem deseja recordar e é definida pelo mestre. O personagem pode descobrir através desta ação vulnerabilidades e resistências de materiais , criaturas entre outras coisas. ",
        }
    ];
    const acoesTurnocompleto = [
        {
            title: "Primeiros Socorros",
            description: "Uma criatura pode prestar primeiros socorros em outra criatura que esteja À Beira da Morte. Para isso, é necessário ter um kit de médico ou de herbalista. Essa ação permite estabilizar a criatura e impedir que ela morra.",
        },
        {
            title: "Tratar Veneno",
            description: "Uma criatura pode aplicar um antídoto em outra criatura que esteja Envenenada. Para isso, é necessário ter um frasco de antídoto adequado. Essa ação permite neutralizar os efeitos do veneno na criatura envenenada.",
        },
        {
            title: "Disparada",
            description: "Uma criatura pode correr o máximo que puder durante o tempo de uma rodada. Com essa ação de turno completo, a criatura pode mover até 4 vezes o valor de sua Velocidade de Movimento. No entanto, é importante observar que correr em alta velocidade pode impor penalidades em certas situações, como na capacidade de esquivar de ataques ou na realização de outras ações.",
        },
        {
            title: "Desabilitar / Habilitar Dispositivo",
            description: "Uma criatura pode tentar desabilitar uma armadilha ou trabalhar em um item mais complexo que requer mais tempo e Habilidade do que simplesmente interagir com o objeto. Essa ação de turno completo permite à criatura utilizar suas Habilidades e ferramentas apropriadas para desativar o dispositivo ou realizar a manutenção necessária para funcionar e ativá-lo. ",
        },
    ]
    const reactions = [
        {
            title: "Atenuar Queda",
            description: "Uma criatura pode usar sua reação para atenuar o impacto de uma queda, reduzindo o dano sofrido pela metade, com um mínimo de 1d4 de dano. Para ganhar essa redução de dano, a criatura deve passar em um teste de acrobacia com dificuldade determinado pelo mestre. A tabela fornecida é uma referência para o dano de queda em relação à altura da queda, onde cada altura corresponde a uma quantidade específica de dano. É importante lembrar que essa reação só pode ser usada quando a criatura está consciente e capaz de reagir à queda.",
        },
        {
            title: "Ajudar",
            description: "Uma criatura pode usar sua reação para ajudar um aliado em um teste de Habilidade que não seja um ataque. A criatura deve ter pelo menos um ponto na Habilidade em questão para poder ajudar. O mestre determinará o valor da ajuda fornecida, mas normalmente a criatura ajudada ganhará um bônus de 1 ponto em seu rolamento.  Essa reação é útil para dar suporte a um aliado em momentos cruciais e aumentar suas chances de sucesso. Alternativamente, uma criatura pode usar a reação para ajudar a se tornar um ponto de apoio para outra criatura usar a reação agarrar-se. Para isso ela deve ser pelo menos  1 tamanho maior  e estar em um situação que está segura e estável.",
        },
        {
            title: "Agarrar-se",
            description: "Uma criatura que esteja caindo de alguma altura ou sendo arremessada por uma força poderosa pode tentar se agarrar a uma beirada, coluna ou qualquer objeto firme que possa sustentar seu corpo. Essa reação permite que a criatura faça um teste de agarrar-se, geralmente usando a Habilidade de Atletismo ou reflexo (Agilidade), para determinar se ela consegue se segurar e evitar a queda. O sucesso nesse teste pode evitar que a criatura sofra o dano da queda ou permitir que ela reduza o dano de alguma forma. A dificuldade do teste e as possíveis consequências de falha são determinadas pelo mestre, com base nas circunstâncias e na situação em jogo. Essa reação é uma tentativa desesperada de evitar uma queda perigosa ou até mesmo mortal.",
        },

    ]
    const acoesDeMovimento = [
        {
            title: "Andar ou Correr",
            description: "Uma criatura usa uma ação para se movimentar por uma distância igual ou menor ao seu valor de Velocidade de Movimento.",
        },
        {
            title: "Conduzir Montaria",
            description: "Uma criatura usa uma ação para movimentar uma montaria por uma distância igual ou menor ao valor de Velocidade de Movimento da montaria.",
        },
        {
            title: "Voar",
            description: "Uma criatura, que tenha capacidade, usa uma ação para voar por uma distância igual ou menor ao seu valor de Velocidade de Movimento. Esse valor pode ser diferente apenas se alguma habilidade ou característica especificar o contrário.",
        },
        {
            title: "Recuar Cuidadosamente",
            description: "Algumas criaturas possuem a habilidade de realizar ataques de oportunidade quando uma criatura se afasta delas. No entanto, uma criatura pode recuar cuidadosamente por até 1,5 metros sem sofrer ataques de oportunidade.",
        },
        {
            title: "Escalar",
            description: "Uma criatura usa uma ação para escalar uma inclinação, desde que seja possível fazê-lo, por uma distância igual ou menor à metade do seu valor de Velocidade de Movimento. Caso seja uma escalada difícil, a criatura deve fazer um teste de Atletismo.",
        },
        {
            title: "Nadar",
            description: "Uma criatura usa uma ação para nadar por uma distância igual ou menor à metade do seu valor de Velocidade de Movimento. Esse valor pode ser diferente apenas se alguma Habilidade ou característica especificar o contrário. Se for uma natação difícil, a criatura deve fazer um teste de Atletismo. ",
        },
        {
            title: "Rastejar",
            description: "Uma criatura deitada pode rastejar por uma distância igual a um terço do seu valor de Velocidade de Movimento, arredondado para cima.",
        },
        {
            title: "Saltar",
            description: "Uma criatura pode realizar um salto horizontal com uma distância, em metros, igual ou menor à metade do seu valor de Atletismo, e um salto vertical com uma distância, em metros, igual ou menor a um terço do seu valor de Atletismo, arredondado para cima. A menor distância para o salto horizontal é de 2 metros e para o salto vertical é de 1 metro.",
        },
        {
            title: "Atravessar Acrobaticamente",
            description: "Uma criatura que tenta atravessar uma corda bamba, correr em um telhado ou qualquer outra ação que envolva andar ou correr em superfícies difíceis de se equilibrar ou evitar cair precisa realizar um teste de Acrobacia. A dificuldade deste teste será determinada pelo mestre. Em caso de falha, a criatura pode cair ou sofrer alguma consequência relacionada à situação.",
        },

    ]
    const PerformTable = () => {
        const rows = [
            { range: '5 a 9', bonus: '+1 no rolamento' },
            { range: '10 a 14', bonus: 'vantagem' },
            { range: '15 a 19', bonus: 'vantagem + 1 no rolamento' },
            { range: '20 a 24', bonus: 'vantagem + 2 no rolamento' },
            { range: '25 a 29', bonus: 'vantagem + 3 no rolamento' },
            { range: '30 ou mais', bonus: 'vantagem x 2 + 3 no rolamento' },
        ];

        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Rolamento de Performance</TableCell>
                            <TableCell>Bônus para aliados</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.range}</TableCell>
                                <TableCell>{row.bonus}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
    const FallDamageTable = () => {
        const rows = [
            { height: '3 m', damage: '1 ponto' },
            { height: '6 m', damage: '2 pontos' },
            { height: '9 m', damage: '4 pontos' },
            { height: '12 m', damage: '6 pontos' },
            { height: '15 m', damage: '8 pontos' },
            { height: '18 m', damage: '10 pontos' },
            { height: '...', damage: '...' },
            { height: '450 m', damage: '300 pontos' },
        ];

        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Altura</TableCell>
                            <TableCell>Dano de Queda</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.height}</TableCell>
                                <TableCell>{row.damage}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };


    const AcoesComponent = () => {
        return (
            <div>
                <Typography className="boxTextTitle" variant="h4" gutterBottom>
                    Ações Primárias
                </Typography>
                {acoes.map((acao, index) => (
                    <Accordion key={index}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className="estebanText" variant="h6">{acao.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography className="bigBoxTextClasses" > {acao.description}</Typography>
                            <Box>
                                {acao.title && acao.title == "Performar" ? < PerformTable /> : ""}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                ))}
                <Typography className="boxTextTitle" variant="h4" gutterBottom>
                    Ações de turno completo
                </Typography>
                {acoesTurnocompleto.map((acao, index) => (
                    <Accordion key={index}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className="estebanText" variant="h6">{acao.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography className="bigBoxTextClasses" >{acao.description}</Typography>
                            <Box>
                                {acao.title && acao.title == "Atenuar Queda" ? < FallDamageTable /> : ""}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                ))}
                <Typography className="boxTextTitle" variant="h4" gutterBottom>
                    Reações
                </Typography>
                {reactions.map((acao, index) => (
                    <Accordion key={index}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className="estebanText" variant="h6">{acao.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography className="bigBoxTextClasses" >{acao.description}</Typography>
                            <Box>
                                {acao.title && acao.title == "Atenuar Queda" ? < FallDamageTable /> : ""}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                ))}
                <Typography className="boxTextTitle" variant="h4" gutterBottom>
                    Ações de movimento
                </Typography>
                <Typography className="bigBoxTextClasses" >
                    O movimento é uma ação que uma criatura pode tomar durante seu turno. Ao utilizar a ação de movimentar, a criatura pode avançar ou recuar em uma distância igual ou menor à sua velocidade de movimento. Se uma criatura optar por movimentar apenas metade de sua velocidade, realizar um ataque e depois recuar, será necessário utilizar uma ação para avançar, outra ação para realizar o ataque e uma última ação para recuar.<br /><br />

                    É importante destacar que uma criatura gasta o dobro de movimento ao passar por uma área caracterizada como terreno difícil. Essa penalidade de movimento se acumula com outras penalidades existentes. Além disso, uma criatura não pode atravessar o espaço ocupado por um inimigo.<br /><br />

                    Uma criatura pode se mover pelo espaço ocupado por aliados sem restrições. No entanto, quando se trata de se mover por criaturas hostis, é permitido apenas se a diferença de tamanho entre elas for de pelo menos duas categorias (sendo considerado terreno difícil).<br /><br />

                    É importante mencionar que ao sair do alcance de um inimigo, isso pode provocar um ataque de oportunidade do inimigo, se este tiver a Habilidade de realizar ataques de oportunidade, contra a criatura em movimento.<br /><br />

                    No caso de estar utilizando armaduras pesadas, há uma penalidade no movimento, que pode reduzir a velocidade de deslocamento da criatura em 1,5 metros.

                </Typography>
                {acoesDeMovimento.map((acao, index) => (
                    <Accordion key={index}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className="estebanText" variant="h6">{acao.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography className="bigBoxTextClasses" >{acao.description}</Typography>
                            <Box>
                                {acao.title && acao.title == "Atenuar Queda" ? < FallDamageTable /> : ""}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                ))}

            </div>
        );
    };

    return (
        <Box sx={{ minHeight: '700px', width: '100%' }} >

            <Box sx={{ width: "80%", mx: 'auto', my: 4 }}>
                <Typography className="MainTitleC" variant="h4" gutterBottom sx={{ my: 4 }}>
                    Ações
                </Typography>
                <Typography className="bigBoxTextClasses" paragraph sx={{ py: 1 }}>
                    <Typography className="boxTextTitle" variant="h5" gutterBottom>
                        Rodada, Turno e o Sistema de Ações
                    </Typography>

                    <Typography lassName="bigBoxTextClasses"  paragraph>
                        Em um jogo de RPG de mesa (TTRPG), os conceitos de <strong>rodada</strong> e <strong>turno</strong> são fundamentais para estruturar a dinâmica do combate e da exploração. Embora possam parecer semelhantes, eles possuem diferenças importantes.
                    </Typography>

                    <Box sx={{ marginBottom: 3 }}>
                        <Typography className="boxTextTitle" variant="h5" gutterBottom>
                            Rodada vs. Turno
                        </Typography>

                        <Typography className="bigBoxTextClasses">
                            <strong>Rodada:</strong> Representa um ciclo completo de ação no qual todos os personagens e criaturas participantes do combate realizam seus turnos. Uma rodada se encerra quando o último participante da ordem de iniciativa age, e uma nova rodada começa.
                        </Typography>

                        <Typography className="bigBoxTextClasses" sx={{ marginTop: 2 }}>
                            <strong>Turno:</strong> Cada personagem, jogador ou inimigo tem um momento específico dentro da rodada para agir. Esse momento é chamado de turno. Durante seu turno, o personagem pode realizar suas ações disponíveis conforme permitido pelo sistema de jogo.
                        </Typography>

                        <Typography className="bigBoxTextClasses" sx={{ marginTop: 2 }}>
                            Portanto, uma rodada é composta por vários turnos, um para cada participante do combate.
                        </Typography>
                    </Box>

                    <Box sx={{ marginBottom: 3 }}>
                        <Typography className="boxTextTitle" variant="h5" gutterBottom>
                            O Sistema de 3 Ações e 1 Reação
                        </Typography>

                        <Typography className="bigBoxTextClasses" paragraph>
                            Durante seu turno, cada personagem pode realizar <strong>três ações</strong>. As ações disponíveis podem incluir movimentação, ataque, uso de habilidades, entre outras opções, e algumas ações podem exigir mais de um desses três espaços disponíveis.
                        </Typography>

                        <Typography className="bigBoxTextClasses" paragraph>
                            Além disso, <strong>fora do turno</strong>, cada personagem também possui <strong>uma reação por rodada</strong>. Uma reação é uma ação especial que pode ser ativada em resposta a um evento específico, como bloquear um ataque ou desviar de um golpe.
                        </Typography>
                    </Box>

                    <Box sx={{ backgroundColor: "#f5f5f5", padding: 2, borderRadius: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Resumo do funcionamento:
                        </Typography>

                        <Typography  className="bigBoxTextClasses">- <strong>No turno do personagem:</strong> Ele pode gastar suas <strong>três ações</strong> livremente em qualquer combinação permitida.</Typography>
                        <Typography  className="bigBoxTextClasses">- <strong>Fora do turno:</strong> Ele pode realizar <strong>uma reação</strong>, se houver uma condição que a permita ativar.</Typography>
                        <Typography  className="bigBoxTextClasses">- <strong>Quando termina o turno do último participante:</strong> A rodada se encerra e uma nova começa, repetindo o ciclo.</Typography>
                    </Box>

                    <Typography  className="bigBoxTextClasses" sx={{ marginTop: 3 }}>
                        Esse sistema torna o combate <strong>dinâmico e estratégico</strong>, permitindo que os jogadores decidam como distribuir suas ações de acordo com a situação no campo de batalha.
                    </Typography>

                </Typography>

                <Paper sx={{ px: 2, py: 2, mb: 4, display: "flex", flexFlow: 'column wrap', justifyContent: 'center' }}>
                    <Typography variant="h5" gutterBottom sx={{ pt: 1, textAlign: 'center' }}>
                        Condições
                    </Typography>
                    <Typography className="bigBoxTextClasses" paragraph sx={{ pb: 4, width: '90%' }}>
                        Atenção: Existem várias ações, magias, manobras, milagres e feitiços que causam algum tipo de efeito em seu alvo, alguns desses efeitos são chamados de condições. Estas condições são efeitos que afetam valores de Habilidade dentro e fora de combate. Para saber exatamente o que cada uma faz vá ao tópico de Condições e leia com atenção Fique atento com os  seguintes termos :

                    </Typography>
                    <Box sx={{ display: "flex", flexFlow: 'row wrap', justifyContent: 'center' }}>
                        <List sx={{ width: "28%" }}>
                            {["À Beira Da Morte", "Aterrorizado", "Cego", "Cansado", "Congelando", "Deitado", "Devagar",].map((condicao, index) => (
                                <ListItem key={index}>
                                    <ListItemText className="bigBoxTextEquips" primary={condicao} />
                                </ListItem>
                            ))}

                        </List>
                        <List sx={{ width: "28%" }}>
                            {["Envenenado", "Obscurecido", "Escondido", "Enfraquecido", "Paralisado", "Queimando", "Restringido",].map((condicao, index) => (
                                <ListItem key={index}>
                                    <ListItemText className="bigBoxTextEquips" primary={condicao} />
                                </ListItem>
                            ))}
                        </List>
                        <List sx={{ width: "28%" }}>
                            {["Sangrando", "Surdo", "Surpreso"].map((condicao, index) => (
                                <ListItem key={index}>
                                    <ListItemText className="bigBoxTextEquips" primary={condicao} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Paper>
                <AcoesComponent />
            </Box>

            <Box sx={{ background: '#40150A', p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography sx={{ color: '#fff', fontSize: '10px' }}>© 2024 Lâmina do oculto. All rights reserved.</Typography>
            </Box>
        </Box>
    );
};

export default Actionspage;
