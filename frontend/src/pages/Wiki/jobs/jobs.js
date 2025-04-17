import React, { useState, useEffect } from 'react';
import { Card, CardContent, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, Divider, } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./jobs.css";


const JobsPage = () => {
   
   

    function TabPanel({ children, value, index }) {
        return (
            <div role="tabpanel" hidden={value !== index}>
                {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
            </div>
        );
    }
    const profissoes = [
        {
          nome: 'Ferreiro',
          descricao:
            'Pode conseguir emprego em qualquer lugar onde tenha uma forja média. Esta profissão rende 20 moedas de ouro por dia de trabalho.',
          habilidades: [
            ' - Forja de Armaduras e escudos de Metal',
            'Pode forjar em aço e reforçar armaduras em até +1 (1 Ponto de Regalia)',
            'Pode forjar em aço, aço negro e reforçar armaduras em até +2 (1 Ponto de Regalia)',
            'Pode forjar em aço, aço negro, mitralino e reforçar armaduras em até +3 (1 Ponto de Regalia)',
            ' - Forja de Armas de Metal (Dano e acerto)',
            'Pode forjar em aço e reforçar armas em até +1 (1 Ponto de Regalia)',
            'Pode forjar em aço, aço negro e reforçar armas em até +2 (1 Ponto de Regalia)',
            'Pode forjar em aço, aço negro, mitralino, adamante e reforçar armas em até +3 (1 Ponto de Regalia)',
            ' - Forja de Itens Gerais',
            'Pode forjar em aço itens gerais como ferraduras, esferas de aço, alavancas, engrenagens e outros. (1 Ponto de Regalia)',
            'Pode forjar em aço, e outros metais comuns, itens gerais como ferraduras, esferas de aço, alavancas, engrenagens e peças pequenas e complexas para mecanismos. (1 Ponto de Regalia)',
          ],
        },
        {
          nome: 'Criminoso',
          descricao:
            'Pode conseguir emprego em qualquer lugar onde tenha multidões, estradas vazias ou becos. Esta profissão rende 30 moedas de ouro por dia de trabalho. O criminoso tem 10% de chance de ser pego pela guarda.',
          habilidades: [
            'Bater Carteiras (1 Ponto de Regalia)',
            'Abrir Fechaduras (1 Ponto de Regalia)',
            'Esconder Itens Ilegais (1 Ponto de Regalia)',
          ],
        },
        {
          nome: 'Mercador',
          descricao:
            'Pode conseguir emprego em qualquer lugar onde tenha comércio de médio porte.',
          habilidades: [
            'Melhorar Preços (1 Ponto de Regalia)',
            'Reunir Informações (1 Ponto de Regalia)',
          ],
        },
        {
          nome: 'Explorador',
          descricao:
            'Pode conseguir emprego em qualquer lugar onde tenha viajantes necessitados e aventureiros estrangeiros. Esta profissão rende 20 moedas de ouro por dia de trabalho.',
          habilidades: [
            'Guiar (1 Ponto de Regalia)',
            'Rastrear Pistas (1 Ponto de Regalia)',
            'Facilidade em Encontrar Recursos na Natureza (1 Ponto de Regalia)',
          ],
        },
        {
          nome: 'Acadêmico',
          descricao:
            'Pode conseguir emprego em qualquer lugar onde tenha uma academia ou nobre precisando de tutores. Esta profissão rende 40 moedas de ouro por dia de trabalho.',
          habilidades: [
            'Elaborar Mapas (1 Ponto de Regalia)',
            'Conhecimento de Civilizações Antigas (1 Ponto de Regalia)',
            'Acesso a Bibliotecas e Setores de Estudos Privados (1 Ponto de Regalia)',
            'Arqueólogo (1 Ponto de Regalia)',
          ],
        },
        {
          nome: 'Herbalista',
          descricao:
            'Pode conseguir emprego em qualquer lugar onde tenha laboratórios, curandeiros e lojas de poções. Esta profissão rende 20 moedas de ouro por dia de trabalho. Poções feitas pelo próprio herbalista são 3x mais baratas que compradas em lojas, pois o preço que ele paga é apenas dos materiais.',
          habilidades: [
            'Produção de Poções (1 Ponto de Regalia)',
            'Produção de Venenos (1 Ponto de Regalia)',
            'Produção de Antídotos (1 Ponto de Regalia)',
          ],
        },
      ];
      
      const Profissoes = () => {
        return (
          <div>
            <Typography variant="h4" gutterBottom>
              Profissões
            </Typography>
            {profissoes.map((profissao, index) => (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">{profissao.nome}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" paragraph>
                    {profissao.descricao}
                  </Typography>
                  <Divider />
                  <List>
                    {profissao.habilidades.map((habilidade, idx) => (
                      <ListItem key={idx}>
                        <ListItemText primary={habilidade} />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        );
      };
    return (
        <Box sx={{ minHeight: '700px', width: '100%' }} >
            <Box sx={{ width: "80%", mx: 'auto', my: 4 }}>
              <Profissoes></Profissoes>
            </Box>

            <Box sx={{ background: '#40150A', p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', width: '100%' }}>
                <Typography sx={{ color: '#fff', fontSize: '10px' }}>© 2024 Lâmina do oculto. All rights reserved.</Typography>
            </Box>
        </Box>
    );
};

export default JobsPage;
