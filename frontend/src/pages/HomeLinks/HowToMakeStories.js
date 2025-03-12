import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Paper, Box, Grid } from '@mui/material';
import "./ldop.css";
import CoverImg from "../../assets/images/makeYourOwnCampaing.png"

const StoryPage = () => {
    const tips = [
        {
            title: '1. Use as Habilidades para Criar Obstáculos e Desafios Naturais',
            content: [
                'Rastreamento: Quando os personagens tentam seguir uma trilha, seja de um inimigo, uma criatura mítica ou uma presa, use a habilidade de rastreamento para adicionar tensão e drama. Se os personagens falharem, podem ser forçados a seguir uma pista falsa que os leva a uma armadilha ou a um perigo desconhecido.',
                'Percepção e Investigação: Ao introduzir novos locais, use a percepção para dar aos jogadores a chance de notar detalhes cruciais como sinais de vida, pistas de eventos passados ou até mesmo indicadores de perigo iminente. A investigação pode revelar mais informações contextuais, como registros de um antigo explorador ou vestígios de algo misterioso.',
                'Sobrevivência: Em ambientes selvagens ou inexplorados, a habilidade de sobrevivência pode ser um pilar central. Ela não se limita a encontrar comida, mas também permite que os jogadores construam abrigos improvisados, analisem o clima para evitar tempestades e identifiquem perigos naturais, como terrenos instáveis ou plantas venenosas.',
                'Furtividade e Navegação: Durante perseguições ou infiltrações, a furtividade pode criar cenas intensas onde os jogadores precisam calcular com precisão seus movimentos e avaliar o risco. A navegação, por sua vez, pode ser crucial em cenários onde o terreno é hostil ou desconhecido, criando um desafio adicional de orientação e direção.',
                'Lidar com Animais: Os animais podem ser tanto aliados quanto obstáculos. Os jogadores podem tentar domar ou interagir com criaturas selvagens, seja para obter ajuda ou como parte de um desafio para evitar um ataque. Isso pode ser usado para introduzir elementos dinâmicos, como montar um cavalo selvagem ou negociar com uma besta rara.'
            ]
        },
        {
            title: '2. Use as Habilidades para Enriquecer a História',
            content: [
                'Durante uma sessão de exploração, trate as habilidades como parte da jornada do grupo. Cada sucesso ou fracasso não é apenas uma rolagem de dados, mas uma narrativa que reflete a determinação e as decisões dos jogadores. Use esses momentos para criar histórias de resistência, descoberta e superação.Conecte as habilidades aos backgrounds dos personagens. Se um personagem tem uma ligação forte com animais, pode ser interessante permitir que ele use essa habilidade para acalmar uma fera ameaçadora ou até mesmo para negociar com tribos locais. Isso torna as habilidades mais pessoais e integradas à narrativa do grupo.Ao usar a investigação, fuja do simples "sucesso" ou "fracasso" e adicione camadas à descoberta. Em vez de apenas dar a resposta imediata, dê pistas sutis que permitam aos jogadores construir suas próprias teorias ou traçar conexões entre elementos aparentemente desconexos, criando uma história mais rica e envolvente.'
            ]
        },
        {
            title: '3. Deixe os Jogadores Sentirem as Consequências',
            content: [
                'Falhas não devem ser vistas como momentos negativos. Se um jogador falha ao rastrear uma criatura, em vez de simplesmente não encontrar nada, crie uma situação onde a falha gera uma nova complicação. Talvez eles se distraem com uma pista falsa que os leva a uma emboscada, um atalho perigoso, ou até uma luta inesperada.Em falhas de navegação, as consequências podem ir além da perda de direção. Se um personagem se perde, ele pode acabar encontrando algo inesperado, como uma tribo desconhecida ou uma criatura mística, gerando novas oportunidades de exploração ou conflito.',
                'Falhas em furtividade podem resultar em consequências que exigem improvisação. Ao ser detectado, o grupo pode precisar reagir rapidamente, criando uma situação de combate ou uma fuga apressada. Isso pode gerar momentos de tensão que adicionam profundidade à história.'
            ]
        },
        {
            title: '4. Incentive o Trabalho em Equipe',
            content: [
                'O sistema de habilidades no LDO é ideal para promover o trabalho em equipe. Cada membro do grupo pode ter habilidades únicas que se complementam, criando oportunidades para o grupo resolver problemas juntos. Em vez de apenas permitir que um único personagem se destaque, incentive os jogadores a usar suas habilidades de forma colaborativa para alcançar o sucesso.Além disso, as consequências das ações de um jogador podem afetar diretamente os outros, o que exige que o grupo trabalhe em conjunto para lidar com os desafios. Por exemplo, se um jogador falha em uma rolagem de navegação, o resto do grupo pode ter que decidir rapidamente como reagir à situação, o que reforça a importância do trabalho em equipe e da tomada de decisões coletivas.'
            ]
        },
        {
            title: '5. Incorpore o Ambiente no Jogo',
            content: [
                'No LDO, o ambiente é quase um personagem por si só. Use o cenário não apenas como um pano de fundo, mas como um desafio ativo para os jogadores. Se eles estão explorando uma floresta densa, por exemplo, o ambiente pode afetar a visibilidade, o rastreamento, ou até as habilidades de navegação, criando obstáculos naturais.Desafios ambientais podem exigir a combinação de várias habilidades para serem superados. Por exemplo, um terreno perigoso pode exigir uma combinação de sobrevivência para identificar um caminho seguro e percepção para notar sinais de perigo iminente. Isso cria uma experiência de jogo mais imersiva e dinâmica.'
            ]
        },
        {
            title: '6. Seja Flexível e Criativo com as Habilidades',
            content: [
                'As habilidades no LDO são projetadas para serem flexíveis e permitir que os mestres as adaptem de acordo com a situação. Encoraje os jogadores a pensar fora da caixa e usar suas habilidades de maneiras criativas. Por exemplo, um personagem com habilidade em rastreamento pode usá-la para encontrar vestígios de uma pessoa perdida, mas também para investigar um local abandonado em busca de pistas sobre o que aconteceu ali.A exploração não se trata apenas de encontrar objetos ou alcançar objetivos, mas de criar uma experiência única para os jogadores. Deixe que eles experimentem diferentes abordagens e soluções criativas para os problemas que enfrentam. Às vezes, a solução mais interessante não é a mais óbvia, mas a mais criativa.'
            ]
        }
    ];
    

    return (
        <Box maxWidth="lg" sx={{ margin: 'auto', width: '100%',display:"flex",flexFlow:'column',alignItems:'center' }}>
            <Typography variant="h3" gutterBottom className="boxTextTitle">
                Criando Histórias Engajantes com Foco nas Habilidades de Exploração
            </Typography>
            <img style={{margin:'40px', width:'30%'}} src={CoverImg}/>
            <Box sx={{  width: "100%" }}>

                <Typography className="esteban" paragraph sx={{textIndent:'20px'}} >
                    Bem-vindo, Mestre! No Lâmina do Oculto (LDO), as histórias não são feitas apenas dos eventos épicos e batalhas intensas, mas também das nuances de exploração, investigação e interação com o mundo ao redor. O sistema coloca uma forte ênfase nas habilidades como rastreamento, percepção, investigação, sobrevivência, furtividade, navegação e interação com animais, e é essencial que você aproveite essas mecânicas para construir narrativas envolventes.
                </Typography>
                <Typography className="esteban" paragraph sx={{textIndent:'20px'}} >
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
                                    <ListItemText className="bigBoxTextGUIA" primary={item} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default StoryPage;