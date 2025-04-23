import React, { useState, useEffect } from 'react';
import { Card, CardContent, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, Divider, Chip } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./generalRules.css";


const GeneralRulesPage = () => {

    const dataTamanhoAltura = [
        ['Minúsculo', '0 a 60 cm'],
        ['Pequeno', '61 a 130 cm'],
        ['Médio', '131 a 220 cm'],
        ['Grande', '221 a 350 cm'],
        ['Muito grande', '351 a 600 cm'],
        ['Gigante', '601 a 1200 cm'],
        ['Colossal', 'maior que 1201 cm']
    ];

    const dataTamanhoCarga = [
        ['Minúsculo', 'Igual o valor de força em quilos (mínimo de 1)'],
        ['Pequeno', '10x valor de força (mínimo de 20)'],
        ['Médio', '25x valor de força (mínimo de 50)'],
        ['Grande', '50x valor de força (mínimo de 100)'],
        ['Muito grande', '70x valor de força (mínimo de 200)'],
        ['Gigante', '150x valor de força (mínimo de 300)'],
        ['Colossal', '300x valor de força (mínimo de 800)']
    ];

    const dataTamanhoArma = [
        ['Minúsculo', 'Armas adaptadas -2 de dano (mínimo de 1)'],
        ['Pequeno', 'Armas adaptadas -1 de dano (mínimo de 1)'],
        ['Médio', 'Armas padrão'],
        ['Grande', 'Armas padrão'],
        ['Muito grande', 'Armas adaptadas +1 de dano'],
        ['Gigante', 'Armas adaptadas +1d8 de dano'],
        ['Colossal', 'Armas adaptadas +6 de dano']
    ];

    const renderTable = (title, headers, data) => (
        <Box my={4}>
            <Typography variant="h6" className="boxTextTitle" gutterBottom>{title}</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headers.map(header => (
                                <TableCell key={header}><strong>{header}</strong></TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index}>
                                {row.map((cell, i) => (
                                    <TableCell key={i}>{cell}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );

    const Paragraph = ({ title, text }) => (
        <Box my={4}>
            <Typography variant="h6" className="boxTextTitle" gutterBottom>{title}</Typography>
            <Typography variant="body1" paragraph>{text}</Typography>
        </Box>
    );

    const TamanhoPage = () => {
        return (
            <Box>
                <Typography variant="h4" className="MainTitleC" gutterBottom>Regras gerais</Typography>
                <Typography variant="h5" className="boxTextTitle" gutterBottom>Tamanho</Typography>
                {renderTable('Tamanho vs Altura', ['Tamanho', 'Centímetros em Altura'], dataTamanhoAltura)}
                {renderTable('Tamanho vs Carga', ['Tamanho', 'Capacidade de Carga'], dataTamanhoCarga)}
                <Typography paragraph>Criaturas conseguem usar todas as armas, porém algumas precisam adaptar para o seu tamanho, para que possam usar. Armas culturais de uma espécie não sofrem essa penalidade (exemplo: anão utilizando o Machado Anão).
                    Uma arma adaptada para o tamanho minúsculo custa metade do preço, e o dobro para muito grande ou acima. </Typography>
                {renderTable('Tamanho vs Arma', ['Tamanho', 'Consegue usar'], dataTamanhoArma)}
                <Typography paragraph>
                    Dependendo do tamanho da criatura, ela pode sofrer penalidades ou receber bônus em certas perícias:
                </Typography>
                <ul>
                    <li><strong>Minúsculo ou Pequeno:</strong> +1 em Furtividade e Armadilhas, -1 em Atletismo e Intimidação.</li>
                    <li><strong>Grande ou maior:</strong> +1 em Intimidação e Atletismo, -1 em Furtividade e Armadilhas.</li>
                </ul>
                <Typography paragraph>
                    Criaturas de tamanho Médio não recebem modificadores por tamanho.
                </Typography>
                <Paragraph title="Vantagem e Desvantagem" text={`Vantagem:\n
                    Quando um rolamento é feito com vantagem quer dizer que o jogador ou mestre faz um rolamento de dois d20s ao invés de apenas 1 e pega o melhor resultado. Se receber mais que uma vantagem rola um d20 a mais e assim por diante. Exemplo: Vantagem duplas = 3 dados, vantagem tripla igual a 4 dados.:\n
                    Desvantagem:\n
                    Quando um rolamento é feito com desvantagem quer dizer que o jogador ou mestre faz um rolamento de dois d20s ao invés de apenas 1 e pega o pior resultado.\n
                    Vantagem e Desvantagem :\n
                    Uma criatura que possui vantagens e desvantagens ao mesmo tempo deve usar o valor maior. Se as vantagens e desvantagens forem iguais, elas se cancelam. Por exemplo, se uma criatura tem 3 vantagens e 2 desvantagens, ela realiza o rolamento com 1 vantagem. Porém, se tiver 2 vantagens e 2 desvantagens, realiza o rolamento de forma padrão, sem vantagem ou desvantagem.
                    `} />

                <Paragraph title="Dinheiro" text={`O dinheiro no jogo é dividido em diferentes moedas: platina(M.P.), ouro (M.O.), prata (M.P.) e cobre (M.C.). A taxa de conversão padrão é de 10 para 1, o que significa que a cada 10 moedas de cobre, temos 1 moeda de prata, a cada 10 moedas de prata, temos 1 moeda de ouro, e a cada 10 moedas de ouro, temos 1 moeda de platina.\n

                Essa taxa de conversão é utilizada para facilitar as transações e estimar o valor relativo das diferentes moedas em termos de poder aquisitivo dentro do jogo. Portanto, ao realizar trocas ou cálculos envolvendo dinheiro, é importante ter em mente essa taxa de conversão de 10 para 1.
                `} />

                <Paragraph title="Bônus ou Penalidade de Acerto e Defesa" text={`Durante o combate, ou até mesmo fora dele, uma criatura pode receber bônus ou penalidades de acerto e defesa. No entanto, esses bônus ou penalidades têm um limite. A criatura receberá apenas o maior bônus ou penalidade de cada tipo, descartando os demais.\n

                Para calcular o bônus de acerto ou defesa, devemos considerar os seguintes fatores:\n
                Maior bônus proveniente de manobras de combate\n
                Maior bônus proveniente de magias\n
                Maior bônus proveniente de condições\n
                Maior bônus proveniente de milagres\n
                Maior bônus proveniente de feitiçaria\n

                Nesse cálculo, selecionamos apenas o maior bônus de cada tipo e os somamos para obter o bônus total de acerto ou defesa.\n

                Da mesma forma, para calcular as penalidades, utilizamos o seguinte procedimento:\n
                Maior penalidade proveniente de manobras de combate\n
                Maior penalidade proveniente de magias\n
                Maior penalidade proveniente de condições\n
                Maior penalidade proveniente de milagres\n
                Penalidade proveniente de feitiçaria (se houver)\n

                Selecionamos apenas a maior penalidade de cada tipo e as somamos para obter a penalidade total de acerto ou defesa.
                `} />

                <Paragraph title="Bônus ou Penalidade de Acerto e Defesa (Alternativo)" text={`Em combate uma criatura pode receber apenas um bônus ou penalidade de acerto ou defesa.  Uma criatura vai receber sempre o maior bônus ou penalidade de qualquer fonte, e somente ele.`} />

                <Paragraph title="Itens Mágicos" text={`
                Uma criatura pode equipar até 3 acessórios mágicos, 2 armas mágicas e 1 armadura e 1 escudo mágico simultaneamente. \n
                Apenas a armadura define o elemento do personagem relevante para ataques contra ele. Efeitos mágicos com o mesmo texto não se combinam para um efeito maior, a não ser que seja um bônus numérico (+1,+2+3….)\n
                No caso de armaduras encantadas, consideramos o peitoral, as pernas e os braços como uma única peça. Luvas e botas são separadas.
                `} />

                <Paragraph title="Vulnerabilidade e Resistência" text={`Uma criatura que possui resistência a um determinado tipo de dano recebe apenas metade do dano normalmente causado por esse tipo de dano.\n

                Por outro lado, uma criatura que possui vulnerabilidade a um determinado tipo de dano sofre o dobro do dano normalmente causado por esse tipo de dano.\n

                Essas características de vulnerabilidade e resistência permitem que certas criaturas tenham uma maior ou menor capacidade de lidar com diferentes tipos de danos, adicionando um elemento estratégico ao combate e influenciando as decisões táticas dos jogadores.
                `} />

                <Paragraph title="Armadilhas" text={`Quando uma criatura se depara com uma armadilha, ela pode reagir tentando evitá-la através de um teste de Atletismo ou Acrobacia, dependendo da natureza da armadilha. A dificuldade do teste e o tipo de teste a ser realizado variam de acordo com o tipo de armadilha em questão.\n
                As armadilhas podem ser descobertas por meio de testes da Habilidade Armadilhas. Algumas armadilhas podem possuir mecanismos adicionais que precisam ser resolvidos para torná-las seguras. Nesses casos, podem ser necessários mais testes de Habilidade para desarmá-las completamente.\n
                A Habilidade do personagem em detectar e desarmar armadilhas desempenha um papel crucial na exploração de ambientes perigosos, garantindo a segurança do grupo e evitando possíveis danos ou efeitos negativos causados pelas armadilhas.\n
                Armadilhas que façam a pessoa cair em um buraco ou que realize disparos contra o alvo são evitadas com um teste de reflexo(Agilidade).
                `} />

                <Paragraph title="Rituais (Opcional)" text={`As criaturas têm a capacidade de realizar rituais que aprenderam por meio de Regalias ou instruções adquiridas ao longo de suas jornadas. Esses rituais podem ser realizados individualmente ou em grupo, embora alguns possam exigir a participação de uma ou mais criaturas específicas. É importante observar que todos os rituais têm uma chance mínima de falha de 5%, exceto aqueles que buscam efeitos perpétuos.
                \n
                Um rolamento de um dado D100 ou um dado D20 é feito para determinar o sucesso do ritual. Caso o ritual seja realizado por pelo menos duas pessoas, a chance de falha é eliminada. Além disso, para cada pessoa adicional além da segunda, todos os participantes recebem um bônus de 5 pontos de vida temporária. Essa vida temporária dura por uma hora após a conclusão do ritual.
                \n
                A realização de rituais pode ser uma forma poderosa de obter benefícios, desencadear efeitos mágicos e fortalecer laços entre as criaturas envolvidas. No entanto, é importante seguir as instruções e requisitos específicos de cada ritual para garantir seu sucesso e evitar possíveis consequências indesejadas.
                `} />

                <Paragraph title="Luz e Visão" text={`Luz e visão desempenham um papel importante na percepção e exploração do mundo. Aqui estão algumas considerações sobre luz e visão em um ambiente:\n

                Luz Completa:\n
                Em áreas iluminadas, a visão é clara e é possível enxergar com detalhes e clareza.\n

                Meia Luz:/n
                Em áreas de meia luz, a visão é ligeiramente obscurecida, tornando o ambiente menos nítido. Rolamentos de Habilidades que envolvem ataques, investigação, rastreamento, percepção e leitura sofrem uma penalidade de 1 ponto no valor final. No entanto, uma criatura com visão no escuro enxerga como se estivesse em luz completa em um ambiente de meia luz.\n

                Escuridão:\n
                Em áreas de escuridão, não é possível enxergar, a menos que a criatura possua alguma forma de visão especial, como visão no escuro. Uma criatura sem visão no escuro é considerada na condição Cega na escuridão. No entanto, uma criatura com visão no escuro enxerga como se estivesse em um ambiente de meia luz.\n

                Criaturas com visão no escuro podem enxergar na escuridão como se estivessem em meia luz, e em áreas de meia luz como se estivessem em luz completa. Cada criatura com visão no escuro possui um alcance específico para essa visão. Ao receber uma Regalia ou Habilidade que concede visão no escuro, é fornecido um valor de alcance que se aplica tanto a áreas de meia luz quanto à escuridão. Algumas Regalias podem estender esse alcance além do valor inicial, mas essa extensão se aplica apenas à escuridão.\n
                `} />

                <Paragraph title="Descanso" text={`Descanso é uma parte essencial do jogo e permite que as criaturas se recuperem e restaurem suas energias. Existem dois tipos de descanso: curto e longo.

                Descanso Curto:
                Um descanso curto requer 1 hora ininterrupta e pode ser realizado a cada 6 horas. Durante um descanso curto, uma criatura recupera metade dos seus Pontos de Estamina, metade dos seus Pontos de Magia e um terço dos seus Pontos de Vida. Esse valor recuperado é baseado no valor máximo de Pontos, se a recuperação exceder a quantidade pontos perdida é ignorado os pontos que excederem do valor máximo.

                Descanso Longo:
                Um descanso longo requer 6 horas ininterruptas de sono e deve ser realizado a cada 20 horas. Durante um descanso longo, uma criatura recupera todos os seus Pontos de Estamina, todos os Pontos de Magia gastos e todos os Pontos de Vida perdidos.
                Uma tentativa de realizar um descanso longo antes de 20 horas entre descansos não configura como descanso longo.

                Para obter os benefícios de um descanso longo, é necessário ter equipamentos de acampamento adequados, como um saco de dormir, além de ração e água. No entanto, estar em um ambiente seguro, como uma caverna rasa com a entrada bloqueada ou uma construção civilizada (como casas, tabernas ou templos), elimina a necessidade de equipamentos de acampamento, embora a ração e a água ainda sejam necessárias. É importante garantir que haja pelo menos uma ração diária e 1 litro de água disponível para um descanso adequado.

                Se uma criatura passar dois dias consecutivos sem realizar um descanso longo, ela é considerada na condição Cansada. A cada dois dias adicionais sem um descanso longo, o nível de cansaço aumenta. Cada descanso longo realizado retira um nível de cansaço.
                `} />
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '700px', width: '100%' }} >
            <Box sx={{ width: "80%", mx: 'auto', my: 4 }}>
                <TamanhoPage />
            </Box>

            <Box sx={{ background: '#40150A', p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', width: '100%' }}>
                <Typography sx={{ color: '#fff', fontSize: '10px' }}>© 2024 Lâmina do oculto. All rights reserved.</Typography>
            </Box>
        </Box>
    );
};

export default GeneralRulesPage;
