import { Container, Grid, Typography, Box, Card, CardContent, CardMedia } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import "./ldop.css";
import LimitlesCustomization from "../../assets/images/LimitlessCustomization.png";
import PlayerPower from "../../assets/images/playerpowers.png"
import bewhatyouwant from "../../assets/images/bewhatyouwant.png"
import creativenarrative from "../../assets/images/creativenarrative.png"
import youbackgroundmatters from "../../assets/images/youbackgroundmatters.png"
import welcomeToLDOImage from "../../assets/images/welcomeToLDOImage.png"
import becomePartOftheWorld from "../../assets/images/becomePartOftheWorld.png"
import simpleSystemReally from "../../assets/images/simpleSystemReally.png"
import logo from "../../assets/images/logo.png"



const WhatIsLDO = () => {
    const pilares = [
        {
            titulo: "Customização Sem Limites",
            descricao:
                "Nenhum personagem precisa se encaixar em moldes pré-definidos. Com o LDO, você tem liberdade para criar heróis e anti-heróis com combinações únicas de habilidades, origens e especializações.",
            imagem: LimitlesCustomization,
        },
        {
            titulo: "Fusão de Classes: Seja o que Quiser",
            descricao:
                "No LDO, você não escolhe uma classe — você molda a sua própria. Misture arquétipos e habilidades para criar um guerreiro arcano, um ladino xamânico ou qualquer outra combinação que sua imaginação permitir.",
            imagem: bewhatyouwant,
        },
        {
            titulo: "Narrativa Viva e Impactante",
            descricao:
                "Aqui, suas escolhas importam. Cada decisão dos jogadores influencia o desenrolar da história, criando momentos épicos e consequências memoráveis.",
            imagem: creativenarrative,
        },
        {
            titulo: "Histórias Pessoais Profundas",
            descricao:
                "O passado do seu personagem não é apenas um detalhe. O LDO fornece ferramentas para explorar conexões, motivações e dilemas que tornam cada personagem mais real e envolvente.",
            imagem: youbackgroundmatters,
        },
        {
            titulo: "Poder nas Mãos dos Jogadores",
            descricao:
                "O jogo é seu. O LDO coloca o destino dos personagens diretamente nas mãos dos jogadores, permitindo que criem, transformem e redefinam suas jornadas de forma dinâmica e empolgante.",
            imagem: PlayerPower,
        },
    ];


    return (

        <Box className="esteban" sx={{ minHeight: '700px', width: '100%' }}>
            <Box sx={{ width: "80%", mx: 'auto' }}>
                {/* Título Principal */}
                <Box my={4}>
                    <Typography className="boxTextTitle" variant="h1" align="center" gutterBottom>
                        Desbravando os Mundos dos Jogos de RPG de Mesa
                    </Typography>
                </Box>

                {/* Seção 1 - Introdução */}
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ p: 3 }}>
                            <Typography className="bigBoxTextGUIA" variant="h6" paragraph>
                                Bem-vindo ao universo dos Jogos de RPG de Mesa, ou TTRPGs, como são carinhosamente conhecidos por seus entusiastas. Neste livro, embarcaremos em uma jornada para explorar a imaginação, onde a magia, a aventura e os dilemas morais se entrelaçam de maneira única, dando vida aos mais variados cenários e personagens.
                            </Typography>
                            <Typography className="bigBoxTextGUIA" variant="body1" paragraph>
                                Os TTRPGs são um mundo à parte, um reino de narrativas colaborativas onde sua criatividade é a única limitação.
                            </Typography>
                            <Typography className="bigBoxTextGUIA" variant="body1" paragraph>
                                Mas o que exatamente são os TTRPGs? E quantas pessoas em todo o mundo jogam? Vamos explorar isso.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>

                        <img style={{ width: "80%" }} src={welcomeToLDOImage} />

                    </Grid>
                </Grid>

                {/* Seção 2 - O Que São os TTRPGs? */}
                <Grid container spacing={4} my={4}>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                        {/* Espaço para Ilustração */}
                        <img style={{ width: "80%", left: 0 }} src={becomePartOftheWorld} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ p: 3 }}>
                            <Typography className="bigBoxTextGUIA" variant="h6" paragraph>
                                Os Jogos de RPG de Mesa são uma forma de entretenimento interativo e colaborativo, onde os jogadores assumem o papel de personagens fictícios e, com o auxílio de um Mestre de Jogo, embarcam em aventuras que podem variar de caçadas épicas por tesouros perdidos a intrigas políticas em mundos de fantasia.
                            </Typography>
                            <Typography className="bigBoxTextGUIA" variant="body1" paragraph>
                                Em todo o mundo, milhões de pessoas se entregam a esse universo apaixonante. Estima-se que sua comunidade global abrace facilmente centenas de milhares de participantes dedicados.
                            </Typography>
                            <Typography className="bigBoxTextGUIA" variant="body1" paragraph>
                                Um exemplo forte são os jogos ao vivo em plataformas como Youtube e Twitch, com transmissões que alcançam milhares de espectadores.
                            </Typography>
                        </Box>
                    </Grid>

                </Grid>

                {/* Seção 3 - O Sistema D20 */}
                <Grid container spacing={4} my={4}>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ p: 3 }}>
                            <Typography className="bigBoxTextGUIA" variant="h6" paragraph>
                                Dentro deste vasto mundo de narrativas e possibilidades, existe uma ampla gama de sistemas de regras e abordagens. Entre eles, destaca-se o sistema genérico de D20, que utiliza um dado de vinte faces como pedra angular das mecânicas de jogo.
                            </Typography>
                            <Typography className="bigBoxTextGUIA" variant="body1" paragraph>
                                O sistema D20 é amplamente adotado por sua simplicidade e versatilidade. Ele cria uma sensação de risco constante e recompensa, mantendo os jogadores sempre em suspense.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                        {/* Espaço para Ilustração */}
                        <img style={{ width: "80%", left: 0 }} src={simpleSystemReally} />
                    </Grid>
                </Grid>

                <Box my={4}>
                    <Typography className="bigBoxTextGUIA" sx={{ py: '40px' }}>
                        O Sistema Lâmina do Oculto (LDO) é mais do que um conjunto de regras — é um convite para moldar seu próprio épico. Combinando profundidade narrativa, flexibilidade estratégica e uma imersão sem igual, o LDO transforma cada aventura em uma jornada única. Descubra cinco pilares que tornam esse sistema verdadeiramente especial:
                    </Typography>
                    <Grid container spacing={3}>
                        {pilares.map((pilar, index) => (
                            <Grid item xs={8} sm={4} md={4} key={index}>
                                <Card className="overflow-hidden" sx={{ border: 'none', boxShadow: 'none' }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ height: "300px", width: 'auto', m: 'auto' }}
                                        image={pilar.imagem}
                                        alt={pilar.titulo}
                                    />
                                    <CardContent>
                                        <Typography className="boxTextTitle" variant="h5" gutterBottom>
                                            {pilar.titulo}
                                        </Typography>
                                        <Typography className="bigBoxTextGUIA" variant="body1">
                                            {pilar.descricao}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                {/* Seção Final - Conclusão */}
                <Grid container spacing={4} my={4}>
                    <Grid item xs={12}>
                        <Box sx={{ p: 0 }}>
                            <Typography className="bigBoxTextGUIA" variant="h6" paragraph>
                                No Sistema Lâmina do Oculto, você tem a liberdade de criar e explorar um universo de alta fantasia, onde cada escolha e ação impactam diretamente a história. Esteja pronto para mergulhar em um mundo rico em possibilidades, onde o único limite é a sua imaginação. Com regras dinâmicas e flexíveis, você pode forjar aventuras épicas, construir personagens únicos e enfrentar desafios complexos, tudo enquanto se envolve em uma narrativa que é moldada de forma colaborativa.
                            </Typography>
                            <Typography className="bigBoxTextGUIA" variant="h6" paragraph>
                                Seja você um mestre de jogo experiente ou um novato em busca de novas experiências, Lâmina do Oculto oferece uma plataforma acessível e envolvente para contar histórias inesquecíveis. Junte-se a nós e crie seu próprio caminho, explorando territórios desconhecidos, enfrentando criaturas místicas e desvendando segredos ocultos. Prepare-se para uma jornada emocionante onde cada momento é uma oportunidade de aventura. O único limite é sua criatividade.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{m:'auto', width:'30%'}}>
                    <img style={{ width: "100%", m:'auto' }} src={logo} />
                </Box>

            </Box>
            <Box sx={{ background: '#40150A', p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 8 }}>
                <Typography sx={{ color: '#fff', fontSize: '10px' }}>© 2024 Lâmina do oculto. All rights reserved.</Typography>
                <Typography sx={{ color: '#fff', fontSize: '10px' }}>Art by John D Batten</Typography>
            </Box>
        </Box >

    );
}

export default WhatIsLDO;
