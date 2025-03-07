import { Container, Grid, Typography, Box, Card, CardContent, CardMedia } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import "./ldop.css";
import creatStories from "../../assets/images/creatStories.png";
import createAHook from "../../assets/images/createAHook.png";
import developYourCharacters from "../../assets/images/developYourCharacters.png";
import structureYorStorie from "../../assets/images/structureYorStorie.png";
import importantPlaces from "../../assets/images/importantPlaces.png";
import improvMoments from "../../assets/images/improvMoments.png";



const HowToMakeYourOwnGames = () => {



    return (
        <Box className="esteban" sx={{ minHeight: '700px', width: '100%' }}>
            <Box className="esteban" sx={{ minHeight: '700px', width: '80%', margin: 'auto' }}>
                <Box sx={{ padding: 4, width: '80%', m: 'auto' }}>
                    {/* Título da Página */}
                    <Typography variant="h1" className="boxTextTitleText" gutterBottom align="center">
                        Como Criar uma História de RPG
                    </Typography>

                    {/* Introdução */}
                    <Typography className="bigBoxTextGUIA" paragraph>
                        Criar uma história de RPG envolvente e imersiva é o primeiro passo para uma grande aventura.
                        Neste guia, vamos explorar as etapas essenciais para dar vida à sua narrativa e criar uma jornada
                        inesquecível para seus jogadores.
                    </Typography>

                    {/* Passos para criar a história */}
                    <Grid container spacing={3}>

                        {/* Passo 1: Defina o Mundo e o Cenário */}
                        <Grid item xs={12} sm={6} md={6}>
                            <Card sx={{ overflowY: 'scroll', maxHeight: '600px' }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: '50%', m: 'auto' }}
                                    image={creatStories} // Espaço para imagem do cenário
                                    alt="Cenário de RPG"
                                />
                                <CardContent>
                                    <Typography variant="h6" component="div" className="esteban">
                                        1. Defina o Mundo e o Cenário
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        O cenário de uma aventura é a base sobre a qual todas as histórias serão construídas.
                                        Antes de qualquer coisa, defina o tom do mundo: ele será sombrio e brutal, repleto de perigos constantes,
                                        ou mais fantasioso e heróico, onde aventureiros podem se tornar lendas?
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        Considere o ambiente físico: vastos desertos queimados pelo sol, florestas ancestrais habitadas por seres míticos,
                                        cidades que se estendem por quilômetros no subsolo ou ruínas de civilizações esquecidas. A geografia influencia não só
                                        a estética do mundo, mas também a forma como os personagens interagem com ele e quais desafios enfrentarão.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        Outro ponto crucial são as sociedades. Existem grandes reinos ou cidades-estado independentes? O governo é uma monarquia,
                                        uma democracia ou algo mais exótico, como um conselho de magos ou uma IA que controla tudo? Pense nas tradições, religiões,
                                        economia e no impacto que a magia ou tecnologia têm na vida cotidiana.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        Além disso, construa um pano de fundo histórico. O mundo está em paz ou há uma guerra iminente? Existem profecias antigas,
                                        deuses esquecidos ou forças cósmicas atuando nos bastidores? Os jogadores devem sentir que o mundo não existe apenas para eles,
                                        mas que tem sua própria história e dinâmica, independente das ações do grupo.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        Por fim, adicione elementos únicos que diferenciem seu cenário de outros já existentes. Talvez as estrelas do céu sejam diferentes
                                        todas as noites, cidades flutuem sobre oceanos de névoa ou os mortos tenham um papel ativo na sociedade. Pequenos detalhes fazem
                                        toda a diferença para tornar o mundo memorável e imersivo.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Passo 2: Crie o Gancho Inicial */}
                        <Grid item xs={12} sm={6} md={6}>
                            <Card sx={{ overflowY: 'scroll', maxHeight: '600px' }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: '50%', m: 'auto' }}
                                    image={createAHook} // Espaço para imagem de mistério
                                    alt="Gancho da História"
                                />
                                <CardContent>
                                    <Typography variant="h6" component="div" className="esteban">
                                        2. Crie o Gancho Inicial
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        Toda grande aventura começa com um evento intrigante. O gancho inicial deve despertar a curiosidade dos jogadores
                                        e fornecer um motivo forte para que seus personagens se envolvam na história.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        Existem várias formas de criar esse primeiro impulso narrativo. Um mistério antigo ressurgiu, como o desaparecimento de um
                                        artefato lendário ou o retorno inesperado de alguém que deveria estar morto? Um inimigo perigoso fez seu primeiro movimento,
                                        colocando cidades em alerta e obrigando os personagens a agir? Talvez um evento inexplicável tenha ocorrido — um eclipse que dura
                                        dias, uma cidade que desaparece sem deixar rastros ou um estranho surto de magia selvagem transformando pessoas em criaturas
                                        bizarras.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        Um bom gancho inicial também se conecta ao mundo e ao cenário previamente definidos. Se seu mundo está em guerra, um tratado de paz
                                        pode ser quebrado por um ataque misterioso. Se a ambientação é uma metrópole cyberpunk, um hacker anônimo pode vazar arquivos secretos
                                        sobre um projeto obscuro.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        Além disso, considere a relação do gancho com os personagens. Se houver algo que os envolva pessoalmente, o impacto será maior.
                                        O vilão pode ser um inimigo do passado de um dos jogadores, ou um dos personagens pode ser o único que pode decifrar uma pista essencial.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        Seja qual for o gancho escolhido, ele deve criar uma sensação de urgência e curiosidade, garantindo que os jogadores queiram descobrir
                                        mais e mergulhar na trama.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Passo 3: Desenvolva os Personagens */}
                        {/* Passo 3: Desenvolva os Personagens */}
                        <Grid item xs={12} sm={6} md={6}>
                            <Card sx={{ overflowY: 'scroll', maxHeight: '600px' }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: '50%', m: 'auto' }}
                                    image={developYourCharacters} // Espaço para imagem dos personagens
                                    alt="Personagens de RPG"
                                />
                                <CardContent>
                                    <Typography variant="h6" component="div" className="esteban">
                                        3. Desenvolva os Personagens
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        Os personagens são o coração da narrativa. Criar protagonistas e antagonistas com profundidade torna a história mais
                                        envolvente e realista.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        Comece com os jogadores, incentivando-os a criar personagens que tenham motivações claras. O que os move? Vingança,
                                        redenção, fama ou um segredo obscuro do passado? Suas histórias pessoais devem ter impacto na campanha, seja por conexões
                                        com facções, laços familiares ou eventos importantes do mundo.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        Além disso, pense nos coadjuvantes e vilões. O antagonista principal não deve ser apenas uma ameaça física, mas alguém
                                        com motivações próprias. Um rei tirano pode acreditar que está salvando o reino de um destino pior. Um necromante pode
                                        estar tentando reviver um ente querido. Vilões com objetivos bem definidos fazem os jogadores questionarem suas próprias
                                        escolhas.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        Outro elemento essencial são os aliados e NPCs. Desde um velho mentor até um mercador misterioso, essas figuras trazem
                                        camadas à narrativa e oferecem novas perspectivas. Dê a eles personalidades distintas, falhas e traços memoráveis.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        Um bom elenco de personagens transforma qualquer campanha em uma experiência inesquecível. Aprofunde as relações, crie
                                        conflitos interessantes e explore o impacto das decisões dos jogadores no mundo ao redor.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>


                        {/* Passo 4: Estruture a Aventura */}
                        <Grid item xs={12} sm={6} md={6}>
                            <Card sx={{ overflowY: 'scroll', maxHeight: '600px' }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: '50%', m: 'auto' }}
                                    image={structureYorStorie} // Espaço para imagem de aventura
                                    alt="Estrutura de Aventura"
                                />
                                <CardContent>
                                    <Typography variant="h6" component="div" className="esteban">
                                        4. Estruture a Aventura
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        Para criar uma aventura envolvente, é essencial planejar sua estrutura de forma clara. Cada parte da jornada deve ser
                                        pensada para manter os jogadores imersos e desafiados. A estrutura tradicional de uma aventura passa por quatro etapas principais:
                                        introdução, desenvolvimento, clímax e conclusão. Vamos detalhá-las:
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        **Introdução**: A introdução é a porta de entrada para o mundo da história. Aqui, os jogadores são apresentados ao cenário,
                                        ao gancho inicial e aos primeiros conflitos. Ela deve estabelecer o tom da aventura, seja de mistério, ação ou exploração.
                                        Pense em como capturar a atenção dos jogadores logo no começo — um evento dramático, uma missão intrigante ou uma situação
                                        urgente que exige ação imediata.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        **Desenvolvimento**: A maior parte da aventura se passa aqui. Durante essa fase, os jogadores investigam, exploram e fazem
                                        descobertas importantes. A história se desenrola e os personagens enfrentam uma série de obstáculos, seja em forma de
                                        monstros, enigmas ou desafios emocionais. Essa etapa deve ser recheada de reviravoltas e momentos de tensão, mantendo
                                        o ritmo da aventura dinâmico e imprevisível. Os personagens começam a tomar decisões que moldam o futuro da trama.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        **Clímax**: O clímax é o ponto mais alto da tensão. Aqui, os jogadores enfrentam o maior desafio da aventura, seja uma batalha
                                        épica, uma decisão moral difícil ou a resolução do mistério que começou a história. É importante que o clímax seja emocionalmente
                                        satisfatório e recompense as escolhas e esforços dos jogadores até aquele momento. Este é o momento em que tudo se conecta
                                        e o destino do mundo ou dos personagens está em jogo.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        **Conclusão**: Após o clímax, a conclusão amarra as pontas soltas e mostra as consequências das ações dos jogadores. Eles devem
                                        ver os resultados de suas escolhas e, se possível, sentir que sua jornada teve um impacto duradouro no mundo. A conclusão pode
                                        também abrir portas para futuras aventuras, deixando ganchos para novas histórias.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        **Obstáculos e Reviravoltas**: Ao longo de cada etapa, planeje obstáculos e reviravoltas que desafiem as expectativas dos jogadores.
                                        Um aliado pode se revelar um traidor, ou um poder inesperado pode surgir para alterar o curso da história. As surpresas mantêm
                                        a narrativa interessante e os jogadores na ponta da cadeira.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        Estruturar a aventura dessa maneira garante que o enredo se desenvolva de forma coesa e empolgante, proporcionando momentos
                                        emocionantes que farão com que seus jogadores queiram continuar explorando o mundo criado.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>


                        {/* Passo 5: Crie Locais Importantes */}
                        {/* Passo 5: Crie Locais Importantes */}
                        <Grid item xs={12} sm={6} md={6}>
                            <Card sx={{ overflowY: 'scroll', maxHeight: '600px' }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: '50%', m: 'auto' }}
                                    image={importantPlaces} // Espaço para imagem dos locais
                                    alt="Locais Importantes"
                                />
                                <CardContent>
                                    <Typography variant="h6" component="div" className="esteban">
                                        5. Crie Locais Importantes
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        Um mundo vasto e imersivo não é completo sem lugares significativos que desempenham um papel importante na história.
                                        Cidades, vilarejos, templos, masmorras, ruínas antigas e florestas misteriosas são apenas alguns exemplos de locais
                                        que podem ter um impacto duradouro na narrativa. Cada um desses lugares precisa ser mais do que apenas um ponto no mapa.
                                        Eles devem ter sua própria atmosfera, história e conexão com os personagens e eventos.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        **Cidades e Vilarejos**: As cidades são o centro de muitas histórias, repletas de intriga política, comércio e cultura.
                                        Ao criar uma cidade, pense no seu layout, nas diferentes áreas que a compõem (bairros ricos, mercados, templos, etc.) e em
                                        como a cidade influencia o enredo. Ela é um local de segurança ou uma cidade corrupta e cheia de mistérios? Os vilarejos
                                        menores podem servir como pontos de partida ou momentos cruciais de descanso e descoberta para os jogadores.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        **Masmorras e Ruínas**: Masmorras, cavernas e ruínas antigas são locais clássicos de exploração em RPGs. Eles não devem ser
                                        apenas labirintos de monstros, mas lugares com uma história. O que aconteceu ali? Que segredos escondem as paredes de pedra
                                        ou os artefatos antigos? Cada masmorra deve contar uma história, seja de um império caído ou de uma sociedade secreta
                                        que deixou pistas para aqueles corajosos o suficiente para explorá-las.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        **Templos e Monumentos**: Templos antigos, santuários de deuses esquecidos ou monumentos a heróis lendários podem ser
                                        locais de grande significado para a trama. Eles podem abrigar artefatos poderosos, serem o palco de eventos religiosos
                                        ou se tornarem um ponto de conflito entre facções religiosas. Tais lugares frequentemente têm um impacto direto nas
                                        motivações dos personagens, seja fornecendo sabedoria, poder ou desafios.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        **Florestas, Montanhas e Regiões Selvagens**: Os locais naturais também podem ser vitais para o enredo. Uma floresta
                                        encantada pode esconder criaturas mágicas ou servir de refúgio para uma sociedade secreta. Montanhas intransponíveis
                                        podem guardar segredos antigos ou representar desafios físicos e emocionais para os personagens. Cada lugar selvagem
                                        deve ter seu próprio conjunto de regras, perigos e possibilidades.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        **Atmosfera e Impacto**: Ao criar esses locais, pense na atmosfera que cada um transmite. Eles são sombrios e opressivos,
                                        iluminados por uma luz suave, ou misteriosos e vibrantes com a presença de magia? O impacto desses locais no enredo deve
                                        ser significativo. Cada lugar deve ter uma razão para existir e um papel no desenvolvimento da história, seja como uma
                                        fonte de conflito, sabedoria, perigo ou uma peça crucial no quebra-cabeça da trama.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        Ao construir locais importantes, você dá aos jogadores a chance de explorar, descobrir e interagir com o mundo de forma
                                        profunda e significativa. Esses lugares se tornam mais do que apenas pontos no mapa — eles são parte fundamental da
                                        narrativa e das experiências dos personagens.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>


                        {/* Passo 6: Prepare-se para Adaptação e Improviso */}
                        {/* Passo 6: Prepare-se para Adaptação e Improviso */}
                        <Grid item xs={12} sm={6} md={6}>
                            <Card sx={{ overflowY: 'scroll', maxHeight: '600px' }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: '50%', m: 'auto' }}
                                    image={improvMoments} // Espaço para imagem de improviso
                                    alt="Improviso"
                                />
                                <CardContent>
                                    <Typography variant="h6" component="div" className="esteban">
                                        6. Prepare-se para Adaptação e Improviso
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Em uma campanha de RPG, as coisas nem sempre seguirão conforme o planejado. Os jogadores são imprevisíveis,
                                        e suas escolhas podem tomar direções inesperadas, o que pode alterar o rumo da história de maneiras que você nunca
                                        antecipou. Por isso, um dos maiores desafios e, ao mesmo tempo, uma das maiores recompensas de ser um mestre de jogo
                                        é aprender a improvisar e adaptar-se às situações à medida que elas surgem.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        **Aceite a Improvisação**: Mesmo que você tenha planejado uma campanha detalhada, com personagens e eventos
                                        cuidadosamente preparados, nunca subestime o poder da criatividade dos jogadores. Eles podem seguir um caminho
                                        inesperado, fazer escolhas ousadas ou até inventar soluções para os problemas que você não antecipou. Aceitar
                                        esse fato e estar preparado para improvisar pode ser a chave para uma experiência mais dinâmica e fluida.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        **Mantenha a Coerência com o Mundo e a História**: Embora a improvisação seja importante, ela deve ser feita de forma
                                        que não quebre a imersão ou a lógica interna do mundo que você criou. Se os jogadores tomarem decisões inesperadas,
                                        busque formas de ajustar a história sem perder a consistência. Por exemplo, se eles optarem por um caminho totalmente
                                        diferente, talvez um personagem não planejado surja, ou um evento secundário comece a se desenvolver de forma mais
                                        prominente. Isso deve ocorrer dentro dos limites do mundo, sem contradizer o que foi estabelecido.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        **Seja Flexível com a Narrativa**: As reviravoltas podem ser uma ótima maneira de manter os jogadores engajados. Se um
                                        evento inesperado acontece ou uma escolha dos jogadores muda a direção da história, veja isso como uma oportunidade
                                        de criar uma nova trama ou conflito. Ao invés de seguir rigidamente o que foi planejado, use as mudanças para aprofundar
                                        a narrativa. O objetivo é manter o jogo fluido e em constante evolução.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        **Prepare-se para as Questões Não Planejadas**: Não há como prever todas as perguntas ou interações que os jogadores
                                        terão. Eles podem querer saber detalhes sobre um personagem secundário, explorar um local que você não tinha considerado
                                        ou até mesmo desenvolver uma ideia completamente nova durante a sessão. Tenha um plano básico para improvisar essas
                                        interações. Às vezes, uma resposta rápida e criativa pode ser mais impactante do que uma resposta muito detalhada.
                                        Lembre-se de que você não precisa saber tudo de antemão — um pouco de improvisação pode ser um ótimo tempero para o jogo.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        **Crie Oportunidades para Reviravoltas**: O improviso não precisa ser apenas uma reação às escolhas dos jogadores.
                                        Você também pode criar momentos inesperados para manter o jogo interessante. Um vilão pode revelar um novo plano,
                                        um aliado pode se tornar um traidor ou um evento aleatório pode mudar os rumos da campanha. Esses momentos não apenas
                                        mantêm os jogadores alertas, mas também aumentam a imersão e o prazer da narrativa.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        **Prepare-se Mentalmente para a Incerteza**: O improviso pode ser desafiador, especialmente para mestres de jogo
                                        que preferem ter tudo planejado. Mas ao aceitar a incerteza e a imprevisibilidade, você torna o jogo mais empolgante
                                        e orgânico. Ao invés de ver as escolhas inesperadas dos jogadores como algo que desvia da história, veja-as como uma
                                        maneira de deixar o jogo mais colaborativo, com os jogadores sendo coautores da narrativa.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        **Dicas para Melhorar o Improviso**:
                                        - **Use o "Sim, e..."**: Essa técnica de improvisação envolve aceitar a escolha do jogador e expandi-la, sempre
                                        trazendo algo novo e interessante para a história.
                                        - **Prepare uma lista de elementos genéricos**: Tente ter alguns NPCs, locais e eventos em mente que possam ser
                                        facilmente adaptados para diferentes situações. Assim, você pode usá-los rapidamente quando a narrativa tomar
                                        um rumo inesperado.
                                        - **Esteja atento ao ritmo do jogo**: O improviso deve ajudar a manter a fluidez da narrativa, não atrasá-la ou
                                        tornar a sessão confusa. Mantenha o ritmo dinâmico e focado na diversão dos jogadores.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        Em resumo, a preparação para improvisação não significa ter todas as respostas prontas, mas sim estar mentalmente
                                        pronto para reagir e adaptar-se ao fluxo do jogo. Isso cria uma experiência mais envolvente e flexível, onde a
                                        narrativa se desenvolve organicamente, tornando a jornada mais emocionante para todos os envolvidos.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>


                    </Grid>
                </Box>
            </Box>
            <Box sx={{ background: '#40150A', p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 8 }}>
                <Typography sx={{ color: '#fff', fontSize: '10px' }}>© 2024 Lâmina do oculto. All rights reserved.</Typography>
                <Typography sx={{ color: '#fff', fontSize: '10px' }}>Art by John D Batten</Typography>
            </Box>
        </Box >

    );
}

export default HowToMakeYourOwnGames;
