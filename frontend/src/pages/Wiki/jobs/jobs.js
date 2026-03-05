import React, { useState, useEffect } from 'react';
import { Card, CardContent, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, Divider, Chip } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./jobs.css";

// Importações centralizadas de dados
import { profissoes } from '../../../data/constants';


const JobsPage = () => {


  function TabPanel({ children, value, index }) {
    return (
      <div role="tabpanel" hidden={value !== index}>
        {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
      </div>
    );
  }
  
  const ProfissoesComponent = () => (
    <Box>
      <Typography variant="h4" className="MainTitleC">PROFISSÕES</Typography>
      <Typography className="bigBoxTextClasses" sx={{ mt: 2 }}>
        Em muitos sistemas de RPG, as profissões desempenham um papel crucial no desenvolvimento do personagem, oferecendo uma forma tangível de especialização e aprimoramento à medida que ele avança em suas jornadas. Em nosso sistema, as profissões são concebidas como um conjunto de habilidades que evoluem ao longo do tempo, permitindo que o personagem se torne mais competente em sua área escolhida e, ao mesmo tempo, oferecendo uma gama de possibilidades durante o jogo.
      </Typography>
      <Typography className="boxTextTitle" variant="h5"  sx={{ my: 2, mx: 3 }}>
        Progressão e Regalias</Typography>
      <Typography className="bigBoxTextClasses" sx={{ mt: 2 }}>
        Ao atingir novos níveis, o personagem tem a oportunidade de investir seus pontos de Regalia para melhorar sua profissão ou até mesmo escolher uma nova. Essa flexibilidade é essencial para garantir que o personagem tenha um senso de evolução contínua e relevância dentro do jogo.
        <br />
        Cada ponto de Regalia atribuído a uma profissão escolhida proporciona um avanço progressivo nas habilidades dessa profissão, sempre seguindo uma sequência numérica obrigatória. Essa sequência é importante para manter a lógica de evolução da profissão, proporcionando um crescimento coerente e estruturado para o personagem.
      </Typography>
      <Typography className="boxTextTitle" variant="h5"  sx={{ my: 2, mx: 3 }}>        Escolhas de Profissão e Habilidades</Typography>
      <Typography className="bigBoxTextClasses" sx={{ mt: 2 }}>
        Quando o personagem atinge um novo nível e decide investir em sua profissão, ele pode escolher entre várias habilidades disponíveis dentro de sua profissão inicial ou até mesmo optar por uma nova profissão. Para as profissões que possuem habilidades ordenadas numericamente, o ponto de Regalia investido deve seguir essa ordem específica. Ou seja, um ponto de Regalia gasto no nível 1 concede a primeira habilidade, no nível 2 a segunda habilidade, e assim por diante.
        <br />
        Se, por outro lado, a profissão não exige uma ordem numérica rígida nas suas habilidades, o jogador pode escolher livremente entre as opções disponíveis para melhorar o personagem de acordo com as necessidades de sua jornada e estilo de jogo.
        <br />
        Por exemplo, se uma profissão oferece habilidades que não estão organizadas de maneira sequencial, o jogador pode selecionar qualquer habilidade desejada, tornando o processo mais flexível e permitindo uma customização mais profunda do personagem.
        <br />
        Exemplo Prático:<br />
        Profissão: Ferreiro<br />

        Nível 1: Habilidade de Forjar Armas Simples.
        <br />
        Nível 2: Habilidade de Forjar Armaduras de Média Complexidade.
        <br />
        Nível 3: Habilidade de Forjar Armas Mágicas.
        <br />
        Neste exemplo, um personagem ferreiro deve seguir a ordem para aprimorar suas habilidades, gastando pontos de Regalia em sequência para adquirir as habilidades de forjar armas simples, depois armaduras de média complexidade, e finalmente, as armas mágicas.
        <br />
        Se uma profissão não seguir uma ordem numérica, como a profissão de Alquimista, o jogador poderia escolher qualquer habilidade disponível entre as opções, como:
        <br />
        Profissão: Alquimista
        <br />
        Opções de Habilidades: Criar Poções Curativas, Poções de Invisibilidade, Poções de Aumento de Força.
        <br />
        A flexibilidade de escolha permite que o jogador adapte o desenvolvimento de seu personagem às circunstâncias do jogo e à narrativa que se desenrola.
      </Typography>
      {profissoes.map((p, i) => (
        <Accordion key={i}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="boxTextTitle" variant="h6">{p.nome}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box mb={2}>
              {p.ambiente && <Typography className="bigBoxTextClasses" variant="body2"><strong>Ambiente:</strong> {p.ambiente}</Typography>}
              {p.ambienteEmprego && <Typography className="bigBoxTextClasses" variant="body2"><strong>Ambiente de Emprego:</strong> {p.ambienteEmprego}</Typography>}
              {p.rendimento != null && <Typography className="bigBoxTextClasses" variant="body2"><strong>Rendimento:</strong> {p.rendimento} moedas</Typography>}
              {p.rendaPorDia != null && <Typography className="bigBoxTextClasses" variant="body2"><strong>Renda por Dia:</strong> {p.rendaPorDia} moedas</Typography>}
              {p.chanceDeRisco && <Typography className="bigBoxTextClasses" variant="body2"><strong>Chance de Risco:</strong> {p.chanceDeRisco}</Typography>}
              {p.beneficiosFixos?.length > 0 && (
                <>
                  <Typography className="bigBoxTextClasses" variant="subtitle2" mt={1}>Benefícios Fixos:</Typography>
                  <List dense>
                    {p.beneficiosFixos.map((b, j) => (
                      <ListItem key={j}><ListItemText primary={b} /></ListItem>
                    ))}
                  </List>
                </>
              )}
            </Box>
            {p.habilidades?.length > 0 && (
              <Box mt={2}>
                <Typography className="bigBoxTextClasses" variant="subtitle1">Habilidades:</Typography>
                {p.habilidades.map((h, j) => (
                  <Box key={j} mb={2} ml={1}>
                    <Typography className="bigBoxTextClasses" variant="subtitle2">{h.nome}</Typography>
                    {h.descricao && <Typography className="bigBoxTextClasses" variant="body2">{h.descricao}</Typography>}
                    {"custoRegalia" in h && <Chip label={`Custo: ${h.custoRegalia} Regalia`} size="small" />}
                    {h.opcoes?.length > 0 && (
                      <List dense>{h.opcoes.map((o, k) => <ListItem key={k}><ListItemText primary={o} /></ListItem>)}</List>
                    )}
                    {h.efeitos?.length > 0 && (
                      <List dense>{h.efeitos.map((e, k) => <ListItem key={k}><ListItemText primary={e} /></ListItem>)}</List>
                    )}
                  </Box>
                ))}
              </Box>
            )}
            {p.sistemasEspeciais && Object.keys(p.sistemasEspeciais).length > 0 && (
              <Box mt={2}>
                <Typography className="bigBoxTextClasses" variant="subtitle1">Sistemas Especiais:</Typography>
                {Object.entries(p.sistemasEspeciais).map(([titulo, conteudo], j) => (
                  <Box key={j} ml={1} mt={1}>
                    <Typography className="bigBoxTextClasses" variant="subtitle2">{titulo}</Typography>
                    {conteudo.tabelas && Object.entries(conteudo.tabelas).map(([nome, valores], k) => (
                      <Box key={k} ml={2}>
                        <Typography className="bigBoxTextClasses" variant="body2"><strong>{nome}</strong></Typography>
                        <List dense>
                          {Object.entries(valores).map(([faixa, valor], m) => (
                            <ListItem key={m}><ListItemText primary={`${faixa}: ${valor}`} /></ListItem>
                          ))}
                        </List>
                      </Box>
                    ))}
                  </Box>
                ))}
              </Box>
            )}
            {p.pocoes && <Typography className="boxTextTitle" variant="h5" sx={{ my: 2 }}>Poções</Typography>}
            {p.pocoes && <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell align="center">Mágica</TableCell>
                    <TableCell align="center">Alquimia</TableCell>
                    <TableCell>Efeito</TableCell>
                    <TableCell align="center">Duração</TableCell>
                    <TableCell align="right">Custo (M.O.)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {p.pocoes?.map((pocao, index) => (
                    <TableRow key={index}>
                      <TableCell>{pocao.nome}</TableCell>
                      <TableCell align="center">{pocao.mágica ? 'Sim' : 'Não'}</TableCell>
                      <TableCell align="center">{pocao.alquimia ? 'Sim' : 'Não'}</TableCell>
                      <TableCell>{pocao.efeito}</TableCell>
                      <TableCell align="center">{pocao.duracao}</TableCell>
                      <TableCell align="right">{pocao.custo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>}
            {p.venenos && <Typography className="boxTextTitle" variant="h5" sx={{ my: 2 }}>Venenos de animais</Typography>}
            {p.venenos && <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell align="center">Mágica</TableCell>
                    <TableCell align="center">Alquimia</TableCell>
                    <TableCell>Efeito</TableCell>
                    <TableCell align="center">Duração</TableCell>
                    <TableCell align="right">Custo (M.O.)</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {p.venenos?.map((pocao, index) => (
                    <TableRow key={index}>
                      <TableCell>{pocao.nome}</TableCell>
                      <TableCell align="center">{pocao.mágica ? 'Sim' : 'Não'}</TableCell>
                      <TableCell align="center">{pocao.alquimia ? 'Sim' : 'Não'}</TableCell>
                      <TableCell>{pocao.efeito}</TableCell>
                      <TableCell align="center">{pocao.duracao}</TableCell>
                      <TableCell align="right">{pocao.custo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>}
            {p.plantas && <Typography className="boxTextTitle" variant="h5" sx={{ my: 2 }}>Venenos de plantas</Typography>}
            {p.plantas && <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell align="center">Mágica</TableCell>
                    <TableCell align="center">Alquimia</TableCell>
                    <TableCell>Efeito</TableCell>
                    <TableCell align="center">Duração</TableCell>
                    <TableCell align="right">Custo (M.O.)</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {p.plantas?.map((pocao, index) => (
                    <TableRow key={index}>
                      <TableCell>{pocao.nome}</TableCell>
                      <TableCell align="center">{pocao.mágica ? 'Sim' : 'Não'}</TableCell>
                      <TableCell align="center">{pocao.alquimia ? 'Sim' : 'Não'}</TableCell>
                      <TableCell>{pocao.efeito}</TableCell>
                      <TableCell align="center">{pocao.duracao}</TableCell>
                      <TableCell align="right">{pocao.custo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>}
            {p.monstros && <Typography className="boxTextTitle" variant="h5" sx={{ my: 2 }}>Venenos de Monstros</Typography>}
            {p.monstros && <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell align="center">Mágica</TableCell>
                    <TableCell align="center">Alquimia</TableCell>
                    <TableCell>Efeito</TableCell>
                    <TableCell align="center">Duração</TableCell>
                    <TableCell align="right">Custo (M.O.)</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {p.monstros?.map((pocao, index) => (
                    <TableRow key={index}>
                      <TableCell>{pocao.nome}</TableCell>
                      <TableCell align="center">{pocao.mágica ? 'Sim' : 'Não'}</TableCell>
                      <TableCell align="center">{pocao.alquimia ? 'Sim' : 'Não'}</TableCell>
                      <TableCell>{pocao.efeito}</TableCell>
                      <TableCell align="center">{pocao.duracao}</TableCell>
                      <TableCell align="right">{pocao.custo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
  return (
    <Box sx={{ minHeight: '700px', width: '100%' }} >
      <Box sx={{ width: "80%", mx: 'auto', my: 4 }}>
        <ProfissoesComponent></ProfissoesComponent>
      </Box>

      <Box sx={{ background: '#40150A', p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', width: '100%' }}>
        <Typography sx={{ color: '#fff', fontSize: '10px' }}>© 2024 Lâmina do oculto. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default JobsPage;
