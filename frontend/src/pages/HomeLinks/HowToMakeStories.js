import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Paper, Box, Grid } from '@mui/material';
import "./ldop.css";
import CoverImg from "../../assets/images/makeYourOwnCampaing.png"

const StoryPage = () => {
    const tips = [
        {
            title: '1. Use as Habilidades para Criar Obstáculos e Desafios Naturais',
            content: [
                'Rastreamento: Se os personagens estão tentando seguir uma trilha ou descobrir o paradeiro de um inimigo ou criatura, o uso da habilidade de rastreamento não só resolve a situação, mas também oferece momentos de tensão.',
                'Percepção e Investigação: Sempre que os jogadores estão em um novo local, você pode usar a percepção para revelar pequenos detalhes sobre o ambiente.',
                'Sobrevivência: Este é o pilar das aventuras em ambientes selvagens. Você pode usá-la para determinar se os jogadores conseguem caçar, encontrar alimentos, construir abrigo, ou até mesmo identificar um perigo natural.',
                'Furtividade e Navegação: Ao criar cenas de perseguições ou infiltrações, aproveite as mecânicas de furtividade para tornar esses momentos ainda mais intensos.',
                'Lidar com Animais: Animais podem ser tanto aliados quanto obstáculos. O mestre pode criar momentos únicos onde os jogadores tentam se comunicar ou domar criaturas selvagens.'
            ]
        },
        {
            title: '2. Use as Habilidades para Enriquecer a História',
            content: [
                'Durante uma sessão de exploração, você pode descrever a jornada como uma série de tentativas, falhas e sucessos ao usar essas habilidades.',
                'Conecte as habilidades com os personagens. Se um personagem tem um forte vínculo com a natureza ou com animais, permita que sua habilidade de interação com animais se manifeste de formas interessantes.',
                'Ao usar a habilidade de investigação, não se limite a simples rolagens de dados. Dê aos jogadores uma narrativa detalhada sobre o que eles descobrem ou falham ao tentar descobrir.'
            ]
        },
        {
            title: '3. Deixe os Jogadores Sentirem as Consequências',
            content: [
                'Se um jogador falha ao rastrear uma criatura, ao invés de simplesmente dizer que não encontra nada, você pode dizer que ele se distrai com uma pista falsa, levando o grupo para uma emboscada ou um atalho perigoso.',
                'Se um jogador falha em uma habilidade de navegação e se perde, isso pode gerar uma oportunidade de criar um encontro inesperado com uma nova tribo, um inimigo ou uma criatura mística.',
                'Quando um personagem falha em uma rolagem de furtividade, pode ser interessante adicionar consequências que forçam o grupo a improvisar ou lutar.'
            ]
        },
        {
            title: '4. Incentive o Trabalho em Equipe',
            content: [
                'As habilidades de exploração do sistema LDO funcionam muito bem quando o grupo se complementa.',
                'Deixe-os se envolver com o ambiente e com as consequências das ações uns dos outros.'
            ]
        },
        {
            title: '5. Incorpore o Ambiente no Jogo',
            content: [
                'Lembre-se de que no LDO, o mundo é quase um personagem por si só. Use o ambiente para desafiar os jogadores, criando cenários que exijam uma combinação de habilidades para serem superados.'
            ]
        },
        {
            title: '6. Seja Flexível e Criativo com as Habilidades',
            content: [
                'As mecânicas do LDO são projetadas para dar flexibilidade ao mestre. Permita que seus jogadores usem as habilidades de maneiras criativas.',
                'A exploração é sobre a descoberta, e muitas vezes a solução mais interessante não será a mais óbvia.'
            ]
        }
    ];

    return (
        <Box maxWidth="lg" sx={{ padding: 3, margin: 'auto', width: '80%',display:"flex",flexFlow:'column',alignItems:'center' }}>
            <Typography variant="h2" gutterBottom className="boxTextTitle">
                Criando Histórias Engajantes com Foco nas Habilidades de Exploração
            </Typography>
            <img style={{margin:'40px', width:'50%'}} src={CoverImg}/>
            <Box sx={{  width: "100%" }}>

                <Typography className="esteban" >
                    Bem-vindo, Mestre! No Lâmina do Oculto (LDO), as histórias não são feitas apenas dos eventos épicos e batalhas intensas, mas também das nuances de exploração, investigação e interação com o mundo ao redor. O sistema coloca uma forte ênfase nas habilidades como rastreamento, percepção, investigação, sobrevivência, furtividade, navegação e interação com animais, e é essencial que você aproveite essas mecânicas para construir narrativas envolventes.
                </Typography>
                <Typography className="esteban" >
                    Aqui estão algumas dicas para ajudá-lo a criar histórias ricas e dinâmicas, aproveitando ao máximo as mecânicas de habilidades de exploração.
                </Typography>

                {tips.map((tip, index) => (
                    <Box key={index} sx={{ marginBottom: 3, }}>
                        <Typography className="boxTextTitleText" variant="h6" gutterBottom>
                            {tip.title}
                        </Typography>
                        <List>
                            {tip.content.map((item, idx) => (
                                <ListItem key={idx}>
                                    <ListItemText primary={item} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                ))}

                <Typography className="bigBoxTextGUIA" >
                    Ao aplicar essas dicas, você pode criar uma experiência mais rica e imersiva para seus jogadores. Lembre-se, o Lâmina do Oculto é sobre descobertas e crescimento através da exploração. Aproveite as oportunidades que surgem ao longo do caminho e crie histórias que deixem os jogadores empolgados para a próxima aventura!
                </Typography>
            </Box>
        </Box>
    );
};

export default StoryPage;