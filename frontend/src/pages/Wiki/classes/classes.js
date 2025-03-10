import React, { useState } from 'react';
import { Box, Typography, Grid, Tab, Tabs } from '@mui/material';
import "./classes.css";
import diagram from "../../../assets/images/classesDiagram.png";
import classes from "../../../assets/images/classes.png";

const ClassesPage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ minHeight: '700px', width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="Info and Classes Tabs">
        <Tab label="Informações Gerais" className="tabs"/>
        <Tab label="Classes" className="tabs" />
      </Tabs>

      {/* Info MUI Tab Content */}
      {value === 0 && (
        <Box sx={{ width: "80%", mx: 'auto', my: 4 }}>
          <Typography variant="h3" className="boxTextTitle">
            CLASSES
          </Typography>
          <Grid container spacing={1} sx={{ my: 4 }}>
            <Grid item xs={6} sx={{ p: 2, display: 'flex', flexFlow: 'column nowrap', justifyContent: 'space-between' }}>
              <Typography variant="h5" className="bigBoxTextClasses">
                As classes deste sistema evoluem de maneira simples e são bem familiares para todos que gostam de rpg e fantasia. Quando um jogador de ttrpg decide jogar uma campanha é fundamental que as opções disponíveis possam atender o maior número de expectativas possíveis. Pensando nisso o sistema de classe do LDO foi pensado para uma progressão tanto vertical quanto horizontal, a depender das decisões do cliente. Para escolher uma classe primária, o jogador deve começar com a classe "Aprendiz" e escolher a Regalia de Aprendiz condizente com a classe primária desejada. Além disso, o personagem deve atingir pelo menos o nível 3 para poder escolher uma classe primária. As classes primárias devem ser escolhidas antes de qualquer classe secundária. O jogador começa com a classe "Aprendiz", e ao atingir o nível 3, pode optar por uma classe primária. O diagrama abaixo ilustra como funciona o processo de escolha das classes, a evolução das Regalias e a progressão de níveis.
              </Typography>
              <Typography variant="body1" className="bigBoxTextClasses">
                Exemplo: “Pablo criou uma nova ficha e deseja jogar como um noviço como sua classe primária. Para isso, ao começar como aprendiz, ele deve escolher a Regalia de classe Aprendiz de Noviço(a). Assim, no nível 3, ele pode escolher a classe Noviço(a) e selecionar as Regalias de classe associadas.”
              </Typography>
              <Typography variant="body1" className="bigBoxTextClasses">
                O personagem pode comprar Regalias através de pontos de Regalia. Ao subir de nível, o personagem recebe dois pontos, que podem ser gastos em qualquer Regalia que tenha acesso, desde que tenha pontos suficientes. Se uma habilidade não tiver um número ao lado, a Regalia custa apenas um ponto. Caso tenha um número entre parênteses, a Habilidade custa o valor desse número em pontos de Regalia.
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ p: 2, display: 'flex', flexFlow: 'column nowrap', justifyContent: 'space-between' }}>
              <Box sx={{ mx: 'auto', width: '30%' }}>
                <img src={classes} alt="Classes Image" />
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', my: 4, justifyContent: 'space-between', alignItems: 'center' }}>
            <Grid item xs={3} sx={{ width: '55%' }}>
              <Box>
                <img src={diagram} alt="Classes Diagram" style={{ width: '100%' }} />
              </Box>
            </Grid>
            <Grid item xs={6} sx={{ width: '40%' }}>
              <Typography variant="h5" className="boxTextTitle">
                Aprendiz
              </Typography>
              <Typography variant="body1" className="esteban">Todos personagens começam de algum lugar!</Typography>
              <Typography variant="h5" className="boxTextTitle">
                COMBATENTE
              </Typography>
              <Typography variant="body1" className="esteban">Especialização (Níveis em uma ou duas classes primárias)</Typography>
              <ul>
                <li>Cavaleiro(a) (10 com)</li>
                <li>Assassino(a) (10 com)</li>
                <li>Caçador(a) (10 com)</li>
                <li>Monge (7 com/3 nov)</li>
                <li>Bárbaro(a) (10 com)</li>
              </ul>
              <Typography variant="h5" className="boxTextTitle">
                NOVIÇO
              </Typography>
              <Typography variant="body1" className="esteban">Especialização (Níveis em uma ou duas classes primárias)</Typography>
              <ul>
                <li>Sacerdote (10 nov)</li>
                <li>Exorcista (10 nov)</li>
                <li>Inquisidor (5/5 com/nov)</li>
                <li>Profano (5/5 fei/nov)</li>
              </ul>
              <Typography variant="h5" className="boxTextTitle">
                INICIADO
              </Typography>
              <Typography variant="body1" className="esteban">Especialização (Níveis em uma ou duas classes primárias)</Typography>
              <ul>
                <li>Mago (10 ini)</li>
                <li>Professor (10 ini)</li>
                <li>Erudito (5/5 ini/nov)</li>
                <li>Invocador (5/5 ini/fei)</li>
              </ul>
              <Typography variant="h5" className="boxTextTitle">
                FEITICEIRO
              </Typography>
              <Typography variant="body1" className="esteban">Especialização (Níveis em uma ou duas classes primárias)</Typography>
              <ul>
                <li>Metamorfo (10 fei)</li>
                <li>Elementalista (10 fei)</li>
                <li>Xamã (10 fei)</li>
                <li>Bruxo (10 fei)</li>
                <li>Caçador(a) de Demônios (3/7 fei/com)</li>
              </ul>
            </Grid>
          </Box>
        </Box>
      )}

      {/* Classes Tab Content (Empty for now) */}
      {value === 1 && (
        <Box sx={{ p: 2 }}>
          <Typography variant="h4" color="textSecondary">
            This tab is empty for now.
          </Typography>
        </Box>
      )}

      <Box sx={{ background: '#40150A', p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography sx={{ color: '#fff', fontSize: '10px' }}>© 2024 Lâmina do oculto. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default ClassesPage;
