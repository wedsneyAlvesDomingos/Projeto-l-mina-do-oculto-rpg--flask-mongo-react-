
import { Paper, Typography, Box, Grid } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import "./HTMC.css";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import knight from "../../assets/images/image-from-rawpixel-id-6503681-png.png";


const HowToMakeCharPage = () => {

    return (

        <Box sx={{ minHeight: '700px', width: '100%' }}>
            <Typography variant="h1" className="boxTextTitle">Guia de criação de personagens</Typography>
            <Box sx={{ width: "20%", margin: "auto" }}>
                <img style={{ width: "100%" }} src={knight} />
            </Box>
            <Typography variant="h5" className="boxTextTitleText" sx={{ width: "80%", margin: "auto" }}>
                Bem-vindo ao guia passo a passo para criar seu personagem! Aqui, você aprenderá a construir um personagem único, escolhendo suas habilidades, espécie, profissão e classe. Este sistema permite uma personalização profunda, garantindo que seu personagem evolua conforme suas escolhas ao longo da aventura.
            </Typography>
            <Typography variant="h5" className="boxTextTitleText" sx={{ width: "80%", mx: "auto", mb: 3 }}>
                Desde a seleção de habilidades e proficiências até a progressão em classes e especializações, cada decisão impactará o desenvolvimento do seu personagem no jogo. Siga as etapas abaixo e crie um herói à sua maneira!
            </Typography>
            <Typography variant="h4" className="boxTextTitle" sx={{ width: "80%", mx: "auto", mb:3 }}>
                Regalias e Pontos de Regalia
            </Typography>
            <Typography className="bigBoxTextGUIA" >
                No sistema de Regalias, o personagem pode adquirir Regalias de Classe, Regalias de Profissão, Proficiências ou Regalias de Espécie usando Pontos de Regalia. O personagem recebe pontos de Regalia ao passar de nível com seu personagem.
            </Typography>
            <Typography className="bigBoxTextGUIA" >
                No primeiro nível, o personagem começa com 4 Pontos de Regalia, no segundo nível recebe mais 4 e a partir do terceiro nível, quando os pré requisitos para escolher uma classe são preenchidos, recebe 2 Pontos de Regalia por nível. Um personagem no nível 20 terá um total de 44 Pontos de Regalia, por exemplo.
            </Typography>
            <Typography className="bigBoxTextGUIA" >
                Dos quatro Pontos de Regalia do primeiro nível, três deles já estão pré-determinados. O primeiro ponto deve ser usado obrigatoriamente para comprar uma Regalia de Espécie, o segundo ponto para uma Regalia da Classe Aprendiz e o terceiro ponto para uma Regalia da Profissão escolhida. O quarto ponto pode ser gasto onde quiser e, assim como nos próximos níveis, é possível até mesmo guardá-lo para os próximos níveis com a intenção de comprar Regalias mais caras. Essa estrutura garante que os personagens tenham uma base sólida e equilibrada em termos de espécie, classe e profissão, promovendo diversidade e consistência no desenvolvimento inicial. Além disso, a flexibilidade do quarto ponto permite personalização e planejamento estratégico a longo prazo, incentivando a criação de personagens únicos e adaptáveis.
            </Typography>
            <Typography className="bigBoxTextGUIA" >
                As Regalias podem conceder várias Habilidades. Existem dois tipos principais de Regalias: passivas e ativas. Regalias passivas não precisam de pontos de Estâmina ou Magia para funcionar, apenas dependem da situação certa. Algumas Regalias passivas estão sempre ativas, enquanto outras precisam de uma ou mais condições específicas para funcionar, como usar uma ação específica.
            </Typography>
            <Typography className="bigBoxTextGUIA" >
                Por outro lado, as Regalias ativas são Habilidades que exigem a ativação por meio de uma ação ou mais, quase sempre com o gasto de pontos de Estâmina ou Magia. Essas Regalias podem ser ações normais ou reações a eventos específicos.
            </Typography>
            <Typography className="bigBoxTextGUIA" >
                É importante observar as descrições e requisitos das Regalias ao escolhê-las, pois algumas podem oferecer ataques especiais ou efeitos únicos, enquanto outras podem proporcionar benefícios passivos ou suporte. Certifique-se de entender como as Regalias funcionam e como elas se encaixam no estilo de jogo do seu personagem.

            </Typography>
            <Typography variant="h4" className="boxTextTitle">Como Começar?</Typography>
            <List sx={{ width: "80%", margin: "auto", px: 0 }}>
                <ListItem sx={{ px: 0 }} className="esteban">
                    Escolha dois dos Grupos de Habilidade (Físico, Conhecimento, Exploração, Arcana ou Social). Receba 1 ponto de habilidade em cada uma das Habilidades do Grupo. Esses incrementos são considerados os primeiros incrementos para propósitos de distribuição de pontos de Habilidade.
                    Ao atingir o Nível 7 escolha um nova aba, diferente das opções escolhidas no nível 1, para receber o mesmo incremento.<br />
                </ListItem>
                <ListItem sx={{ px: 0 }} className="esteban">

                    Aloque 40 pontos em Habilidades ou Proficiências. Ao alocar os pontos de habilidade, siga as regras a seguir: a partir do sétimo será 4 pontos de habilidade por incremento (ao invés de 3).

                </ListItem>
                <ListItem sx={{ px: 0 }} className="esteban">
                    Depois do quarto incremento em uma Habilidade, são necessários 2 pontos de habilidade para o quinto incremento (ao invés de 1) , 3 para um sexto (ao invés de 2) e a partir do sétimo será 4 pontos de habilidade por incremento (ao invés de 3).

                </ListItem>
                <ListItem sx={{ px: 0 }} className="esteban">
                    O valor máximo de uma Habilidade é igual a 15. Se alguma Regalia lhe fornecer pontos em uma habilidade que já esteja no valor de 15, escolha outra habilidade do mesmo grupo (Físico, Conhecimento, Exploração, Arcana ou Social) para adicionar o ponto.

                </ListItem>
                <ListItem sx={{ px: 0 }} className="esteban">
                    O cálculo para o gasto de pontos de incrementos funciona apenas para Habilidades. Quando alocado em proficiências, cada  2 pontos de habilidade alocados garantem 1 nível naquela proficiência.</ListItem>

                <ListItem sx={{ px: 0 }} className="esteban">
                    O personagem ganha 4 pontos de proficiência, além dos 40 pontos de habilidade anteriores, para aplicar apenas em proficiências.

                </ListItem>

                <ListItem sx={{ px: 0 }} className="esteban">
                    Escolha um antecedente da lista, que fornecerá dinheiro inicial e pontos de habilidade para aplicar em habilidades de acordo com cada antecedente. Adicione esses pontos de habilidade após a distribuição dos 40  pontos de habilidade  inicial.

                </ListItem>

                <ListItem sx={{ px: 0 }} className="esteban">
                    Após distribuir os pontos de habilidade entre as opções, a única maneira de ganhar pontos de habilidade adicionais é através do sistema de Regalias, de Classe ou Espécie.

                </ListItem>

                <ListItem sx={{ px: 0 }} className="esteban">
                    Escolha a espécie do seu personagem. Cada espécie tem uma Regalia obrigatória inicial que ajuda a determinar o tipo de criatura que seu personagem é, dentro daquela espécie. O primeiro ponto compra uma das opções, após isso é preciso escolher fora da lista de regalias obrigatórias daquela espécie.
                </ListItem>
                <ListItem sx={{ px: 0 }} className="esteban">
                    Escolha uma profissão para o seu personagem. Aloque um ponto em uma das opções da profissão escolhida. A profissão é responsável por fornecer  a capacidade de criar itens de utilidade como armas, armaduras, poções e outras opções que podem te ajudar a criar o personagem do seu jeito da melhor forma  para a história.

                </ListItem>

                <ListItem sx={{ px: 0 }} className="esteban">
                    Para evoluir para uma das Classes Primárias (Combatente, Noviço(a), Iniciado(a) e Feiticeiro(a)), o personagem deve escolher a Regalia da classe Aprendiz correspondente e atingir o Nível 3 do personagem. Ao tentar comprar regalias de uma classe diferente da sua é necessário comprar regalia de aprendiz referente a classe, se ainda não tiver.

                </ListItem>

                <ListItem sx={{ px: 0 }} className="esteban">
                    Para alcançar uma das Especializações de Classe, o personagem deve adquirir 10 Regalias na Classe Primária requerida.Ao ler as classes é perceptível que existem Regalias que são em como uma corrente que uma é ligada a outra, e podem parecer uma regalia só com várias camadas, mas cada ponto gasto nessa corrente conta com uma regalia diferente. No caso de Especializações que vêm de uma combinação de Classes Primárias, cada uma tem um requisito específico de quantas Regalias são necessárias em cada classe.
                </ListItem>

                <ListItem sx={{ px: 0 }} className="esteban">
                    Um personagem pode escolher até duas especializações, mas pode escolher todas as classes desde que tenha a classe de aprendiz correspondente.
                </ListItem>

                <ListItem sx={{ px: 0 }} className="esteban">
                    Além disso, o personagem avança de nível quando atinge o valor de Pontos de Experiência cumulativo equivalente ou através do sistema de marco, que é decidido pelo grupo em conjunto com o mestre. Na tabela fornecida, estão os valores de Pontos de Experiência necessários para cada nível. O mestre pode alterar esses valores de acordo com o seu mundo e modo de jogo.
                </ListItem>
            </List>

        </Box >

    );
}

export default HowToMakeCharPage;
