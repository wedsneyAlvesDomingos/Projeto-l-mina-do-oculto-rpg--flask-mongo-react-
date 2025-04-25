import React, { useState, useEffect } from 'react';
import { Card, CardContent, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, Divider, Chip } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./combatRules.css";


const CombatRulesPage = () => {

    const sections = [

        {
            title: 'Turno e Rodada',
            content: (
                <Box id="turno">
                    <Typography paragraph>
                        Um turno é apenas a vez de um personagem agir. Após agir, o turno do personagem termina e o próximo turno começa. Uma rodada ocorre quando todos os participantes do combate ou cena agem, ou seja, desde o início do turno do primeiro colocado na lista de iniciativa até o fim do turno do último colocado. Cada rodada tem uma duração de 6 segundos para os personagens na história, mas para os jogadores o combate ocorre em turnos e pode durar o tempo que for necessário.
                    </Typography>
                    <Typography paragraph>
                        A lógica por trás disso é que na história todos os personagens do combate agem basicamente ao mesmo tempo com velocidade e responsividade, em poucos segundos várias coisas acontecem ao mesmo tempo e todos agem ou não de acordo com o que decidiram. Enquanto isso, na mesa em que o jogo acontece, os jogadores podem tomar decisões inteligentes e conversar entre si para trabalhar estratégias durante minutos por vez.
                    </Typography>
                </Box>
            ),
        },
        {
            title: 'Iniciativa',
            content: (
                <Box>
                    <Typography paragraph>
                        Quando um combate se inicia, ou quando vários personagens tomam uma ação ao mesmo tempo na cena, é necessário fazer um rolamento de iniciativa. Todos os envolvidos no combate ou cena calculam sua iniciativa, e uma lista é gerada do valor mais alto para o menor valor. O personagem com o valor mais alto fica em primeiro lugar na lista, enquanto o com o menor valor fica em último. Caso dois personagens lancem o mesmo valor, o que tiver o maior bônus de iniciativa vai na frente. Se mesmo assim os valores forem iguais, o mestre junto aos jogadores decidem como desempatar.
                    </Typography>
                    <Typography paragraph>
                        Se dois ou mais jogadores tiverem a mesma iniciativa, ou tiverem suas iniciativas uma após a outra, eles podem escolher quem vai primeiro da forma que preferirem ou até mesmo agir ao mesmo tempo.
                    </Typography>
                    <Typography paragraph>
                        <strong>Bônus de Iniciativa = Agilidade + Percepção</strong>
                    </Typography>
                    <Typography paragraph>
                        A iniciativa é determinada pela soma das Habilidades de Percepção e Agilidade do personagem. Isso define seu reflexo e velocidade de ação.
                    </Typography>
                    <Typography paragraph>
                        <em>Nota:</em> A iniciativa pode ser utilizada quando uma situação requer uma ordem de ações específicas ou para organizar a linha de ação entre jogadores e gerar menos caos. Ou seja, a iniciativa é mais que uma forma de ordenar turnos em um combate, ela é uma forma de ordenar qualquer situação que o mestre julgue necessário.
                    </Typography>
                </Box>
            ),
        },

        {
            title: 'Acerto',
            content: (
                <Box>
                    <Typography paragraph>
                        Em um combate, ou até mesmo fora dele, quando um personagem realiza um ataque, é feito um Rolamento de um D20. Após descobrir o resultado do Rolamento, o valor apropriado de uma das habilidades de Combate é somado ao tipo de ataque. Se houver bônus adicionais devido a condições ou
                        Habilidades diferentes, esses valores são somados ao resultado anterior para determinar o Valor de Acerto final. Se o valor de acerto for igual ao valor de defesa do alvo, o dano é reduzido pela metade. Acima do valor de defesa é um acerto e o valor de dano é aplicado no alvo do ataque. Abaixo do valor é considerado um erro e nenhum dano é causado.
                    </Typography>
                    <Typography paragraph>
                        Acerto = combate corpo a corpo /combate a distância / combate arcano + valor do D20
                        Por exemplo: (d20 = 10) + (combate corpo a corpo = 5) + (combate desarmado = 2) + (oração "Abençoar" = 2) = 19. .
                    </Typography>
                </Box>
            ),
        },
        {
            title: 'Acerto Crítico',
            content: (
                <Box>
                    <Typography paragraph>
                        O acerto crítico é determinado pela arma ou Regalia de um personagem.
                    </Typography>
                    <Typography paragraph>
                        O acerto crítico padrão ocorre quando um 20 é obtido em um rolamento de em um dado D20.

                    </Typography>
                    <Typography paragraph>
                        Algumas Regalias, armas e magias podem reduzir a margem de acerto crítico para números como 19, 18 ou até menos.

                    </Typography>
                    <Typography paragraph>
                        Em caso de acerto crítico, o valor total do dano é dobrado. Certas armas, Regalias e magias podem interagir com o valor do dano em um acerto crítico e têm a capacidade de modificá-lo.<br /><br />

                        (Opcional)<br />
                        Um ataque que obtém sucesso crítico causa desgaste na armadura do alvo (exceto armaduras naturais). Por outro lado, uma falha crítica (rolamento de 01 em um dado D20) acumula desgaste na arma do atacante. Após 5 falhas consecutivas, a arma sofre uma penalidade de -1 no acerto e no dano (com o valor mínimo de 1d4 de dano). A partir de 10 falhas, a penalidade aumenta para -2 (com o valor mínimo de 1d4 de dano) e, ao atingir 20 falhas, a arma tem seu dano reduzido para 1 e a penalidade de acerto se torna -3 (com o valor mínimo de 1d4 de dano).
                        A armadura perde 1 de valor de defesa até ser reparada em um descanso curto ou longo. Se sofrer 5 penalidades antes de ser consertada a armadura precisa ser reparada por um artesão do material.
                    </Typography>
                </Box>
            ),
        },
        {
            title: 'Dano',
            content: (
                <Box>

                    <Typography paragraph>
                        Dano Físico:
                        O dano físico é calculado somando-se o valor de dano da arma ao atributo de Força ou Destreza, de acordo com o tipo de ataque. Pode haver bônus adicionais de dano provenientes de magias, habilidades ou outras fontes.
                        Durante um combate, quando um personagem realiza um ataque, é feita uma rolagem no dado D20. Após confirmar que o ataque acertou, o valor de dano da arma é somado ao atributo de Força ou Destreza, dependendo do tipo de ataque. Se houver um ou mais bônus para adicionar devido a condições ou Habilidades, esse valor é somado ao resultado da soma anterior, resultando no valor final do Dano Físico.
                        Por exemplo: (Força = 5) + (espada longa + encantamentos = 5) = 10.
                        Caso o personagem esteja realizando um ataque desarmado, e utilizando seu próprio corpo, o dano causado é de 1d4 de dano de impacto, considerado como o "valor de dano da arma".
                    </Typography>
                    <Typography paragraph>

                        Dano Mágico:
                        O Dano Mágico é determinado pelo valor especificado na descrição da magia. Em um ataque mágico, o valor do dano é fixo, conforme indicado no texto descritivo da habilidade. Se a magia exigir um rolamento de ataque, ela pode ser afetada pelas regras de acerto crítico.
                        Existem diferentes tipos de dano que podem ocorrer em um combate, além dos danos de arma física (perfurante, cortante e concussivo). Danos de armas físicas atingem armaduras e criaturas elementais de maneira neutra e não sofrem penalidade a não ser que o item ou a criatura possua a habilidade para tal. Cada tipo de dano possui suas próprias características e interações específicas. Vamos analisar cada um deles:
                    </Typography>
                    <Typography paragraph>
                        Fogo: É considerado forte quando atinge o elemento terra, resultando em um dano duplicado. Por outro lado, é fraco contra o elemento gelo, resultando em apenas metade do dano. Caso seja utilizado contra um alvo com o mesmo elemento (fogo contra fogo), o ataque é considerado fraco.

                    </Typography>
                    <Typography paragraph>
                        Gelo: É considerado forte quando atinge o elemento fogo, resultando em um dano duplicado. No entanto, é fraco contra o elemento raio, resultando em apenas metade do dano. Quando utilizado contra um alvo com o mesmo elemento (gelo contra gelo), o ataque  não sofre penalidades.

                    </Typography>
                    <Typography paragraph> Raio: É considerado forte quando atinge o elemento gelo, resultando em um dano duplicado. Contudo, é fraco contra o elemento terra, resultando em apenas metade do dano. Quando utilizado contra um alvo com o mesmo elemento (raio contra raio), o ataque é considerado fraco.
                    </Typography>
                    <Typography paragraph>Terra: É considerado forte quando atinge o elemento raio, resultando em um dano duplicado. Porém, é fraco contra o elemento fogo, resultando em apenas metade do dano. Quando utilizado contra um alvo com o mesmo elemento (terra contra terra), o ataque é considerado fraco.</Typography>
                    <Typography paragraph>Sombrio: É considerado forte contra todos os elementos mencionados anteriormente (fogo, gelo, raio e terra), resultando em um dano duplicado. No entanto, é fraco contra o elemento sagrado, resultando em apenas metade do dano. Quando utilizado contra um alvo com o mesmo elemento (sombrio contra sombrio), o ataque é considerado fraco.</Typography>
                    <Typography paragraph>Sagrado: É considerado forte contra os elementos sombrio e necrótico, resultando em um dano duplicado. Contudo, é fraco contra os demais elementos mencionados, resultando em apenas metade do dano. Quando utilizado contra um alvo com o mesmo elemento (sagrado contra sagrado), o dano do ataque é reduzido a zero.</Typography>
                    <Typography paragraph>
                        Arcano: Não apresenta força nem fraqueza específica em relação aos elementos, resultando sempre em dano normal.
                    </Typography>
                    <Typography paragraph>
                        Necrótico: É considerado forte contra todos os elementos, resultando em um dano duplicado. Contudo, é fraco contra o elemento sagrado, resultando em apenas metade do dano. Quando utilizado contra um alvo com o mesmo elemento (necrótico contra necrótico), o ataque cura o alvo.
                    </Typography>

                </Box>
            ),
        },
        {
            title: 'Velocidade de Movimento',
            content: (
                <Box>
                    <Typography paragraph>
                        A velocidade de movimento de um personagem é determinada pela soma da velocidade base da espécie com o valor relacionado ao valor de Agilidade, conforme indicado na tabela abaixo:
                    </Typography>
                    <Typography paragraph>
                        <strong>Agilidade</strong><br />
                        3 pontos em Agilidade → +1,5 m<br />
                        6 pontos em Agilidade → +3 m<br />
                        9 pontos em Agilidade → +4,5 m<br />
                        12 pontos em Agilidade → +6 m
                    </Typography>
                    <Typography paragraph>
                        Por exemplo, se um personagem possui uma velocidade base de espécie de 6 m e tem 9 pontos em Agilidade, sua velocidade de movimento em combate será de 10,5 m (6 m + 4,5 m).
                    </Typography>
                    <Typography paragraph>
                        É importante observar que o valor máximo para a Agilidade é de 12 pontos, resultando em um aumento máximo de 6 m na velocidade de movimento.
                    </Typography>
                </Box>
            ),
        },
        {
            title: 'Defesa',
            content: (
                <Box>
                    <Typography paragraph>
                        O Valor de Defesa é calculado somando-se 7 ao valor de bônus da Agilidade, à Armadura e ao Escudo (se tiver proficiência). Essa fórmula é aplicável apenas para armaduras leves ou médias.
                    </Typography>
                    <Typography paragraph>
                        <strong>Defesa = 7 + Bônus de Agilidade + Armadura + Escudo (com proficiência)</strong>
                    </Typography>
                    <Typography paragraph>
                        Armaduras pesadas não adicionam o valor da Agilidade à Defesa. Nesses casos, apenas o valor base da armadura e escudo (se aplicável) é considerado, juntamente com o valor fixo de 7.
                    </Typography>
                </Box>
            ),
        },
        {
            title: 'Pontos de Vida',
            content: (
                <Box>
                    <Typography paragraph>
                        Os Pontos de Vida de um personagem são calculados somando-se o valor inicial da espécie, o valor fornecido por Regalias de classe e o dobro do valor da Habilidade Fortitude.
                    </Typography>
                    <Typography paragraph>
                        <strong>Pontos de Vida = Valor da Espécie + Valor por Regalia de Classe + 2 x Fortitude</strong>
                    </Typography>
                </Box>
            ),
        },
        {
            title: 'Pontos de Magia',
            content: (
                <Box>
                    <Typography paragraph>
                        Os Pontos de Magia são determinados pelo valor fornecido por Regalias de classe, somado ao valor da Habilidade Arcanismo.
                    </Typography>
                    <Typography paragraph>
                        <strong>Pontos de Magia = Valor por Regalia de Classe + Arcanismo</strong>
                    </Typography>
                </Box>
            ),
        },
        {
            title: 'Pontos de Estamina',
            content: (
                <Box>
                    <Typography paragraph>
                        Os Pontos de Estamina são calculados somando-se o valor fornecido por Regalias de classe ao valor da Habilidade Atletismo.
                    </Typography>
                    <Typography paragraph>
                        <strong>Pontos de Estamina = Valor por Regalia de Classe + Atletismo</strong>
                    </Typography>
                </Box>
            ),
        },
        {
            title: 'Proficiência em armas',
            content: (
                <Box>
                    <Typography paragraph>
                        Quando um personagem realiza um ataque com uma arma com a qual não possui proficiência, não são adicionados os bônus de combate correspondentes (corpo a corpo, distância, mágico).
                    </Typography>
                    <Typography paragraph>
                        Nesse caso, é utilizado apenas o valor rolado em um dado D20 para determinar o acerto do ataque. O dano causado será apenas o dano base da arma, sem nenhum bônus adicional.
                    </Typography>
                    <Typography paragraph>
                        Ataques com armas com as quais é proficiente não geram nenhuma das implicações acima e as regras de dano e acerto se aplicam normalmente.
                    </Typography>
                </Box>
            ),
        },
        {
            title: 'Poções de Recuperação',
            content: (
                <Box>
                    <Typography paragraph>
                        Cada poção consumida por um personagem irá sempre recuperar o mesmo valor indicado, a menos que alguma Regalia ou condição especifique o contrário.
                    </Typography>
                </Box>
            ),
        },
        {
            title: 'Combate Montado',
            content: (
                <Box>
                    <Typography paragraph>
                        Durante o combate, uma criatura tem a capacidade de montar outra criatura, desde que esta esteja de acordo e quem for montar não seja maior do que a montaria.
                    </Typography>
                    <Typography paragraph>
                        A criatura montada se desloca de acordo com a velocidade de movimento da montaria. Caso a montaria possua uma forma de ataque, o cavaleiro pode utilizar o ataque da montaria como uma de suas ações durante seu turno.
                    </Typography>
                    <Typography paragraph>
                        Ao utilizar uma montaria que não esteja treinada, é necessário realizar um teste de Lidar com Animais com uma dificuldade inicial de 10 a cada movimento ou dano sofrido pela montaria.
                    </Typography>
                    <Typography paragraph>
                        A cada novo teste realizado durante o mesmo combate, a dificuldade aumenta em +1. Ao finalizar o combate, os testes deixam de ser necessários e a dificuldade retorna ao valor inicial.
                    </Typography>
                </Box>
            ),
        },
        {
            title: 'Alcance de Ameaça',
            content: (
                <Box id="alcance">
                    <Typography paragraph>
                        O alcance de ameaça refere-se ao alcance dos ataques corpo a corpo que uma criatura pode realizar.
                    </Typography>
                    <Typography paragraph>
                        Normalmente, o alcance de ameaça é de 1,5 metros. Algumas armas podem ter um alcance maior, podendo chegar a 3 metros. Com o auxílio de certas Habilidades, pode-se atingir um alcance de até 4,5 metros.
                    </Typography>
                    <Typography paragraph>
                        Personagens que utilizam armas de ataque à distância possuem um alcance de ameaça de 1,5 metros.
                    </Typography>
                </Box>
            ),
        },
        {
            title: 'Campo de Visão',
            content: (
                <Box id="campoDeVisao">
                    <Typography paragraph>
                        O campo de visão de um personagem é igual a um cone de 100° de ângulo, e a distância depende da iluminação e da capacidade da criatura de enxergar no escuro.
                    </Typography>
                    <Typography paragraph>
                        Na luz completa, a criatura vê outra em até 500 metros de distância (sem obstruções físicas).
                    </Typography>
                </Box>
            ),
        },

    ];

    const CombatMechanicsPage = () => {
        return (
            <Box sx={{ py: 4 }}>
                <Typography className="MainTitleC" variant="h4" gutterBottom>
                    Mecânicas de Combate
                </Typography>
                <Box>
                    <Typography className="bigBoxTextClasses" paragraph>
                        Um combate pode iniciar quando um ou mais jogadores ou NPCs realizarem uma ação que afete outros personagens de maneira agressiva ou manipulativa. Ao iniciar um combate, é feito um rolamento de iniciativa. Esse rolamento determina a ordem em que os personagens agem durante cada turno. Todos os envolvidos no combate rolam a iniciativa e a ordem de ação segue do maior para o menor valor, com o maior valor sendo o primeiro a agir.
                    </Typography>
                    <Typography className="bigBoxTextClasses" paragraph>
                        Todos os participantes do combate possuem 3 ações, a menos que alguma Regalia (mecânica de evolução de personagem) ou Condição diga o contrário. Cada movimento, ataque, manobra, magia ou milagre realizado consome um certo número de ações, conforme definido pela habilidade correspondente.
                    </Typography>
                    <Typography className="bigBoxTextClasses" paragraph>
                        Durante o jogo os personagens irão fazer rolamentos, isso quer dizer que irão rolar dados. No sistema Lâmina do Oculto os dados que são utilizados são: o d20 (dado de 20 lados), o d100 (um dado de 100 lados), o d12 (dado de 12 lados), o d10 (dado de 10 lados), o d8 (dado de 8 lados) e o d6 (dado de 6 lados). O d100 pode ser substituído pelo d20 quando for frações de 5% (20x5 =100).
                    </Typography>
                </Box>
                {sections.map((section, index) => (
                    <Box key={index} mb={2} >
                        <Typography variant="h6" className="boxTextTitle" gutterBottom>
                            {section.title}
                        </Typography>
                        <Typography className="bigBoxTextClasses" variant="body1">
                            {section.content}
                        </Typography>
                    </Box>
                ))}
            </Box>
        );
    };
    return (
        <Box sx={{ minHeight: '700px', width: '100%' }} >
            <Box sx={{ width: "80%", mx: 'auto', my: 4 }}>
                <CombatMechanicsPage />
            </Box>

            <Box sx={{ background: '#40150A', p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', width: '100%' }}>
                <Typography sx={{ color: '#fff', fontSize: '10px' }}>© 2024 Lâmina do oculto. All rights reserved.</Typography>
            </Box>
        </Box>
    );
};

export default CombatRulesPage;
