import React from 'react';
import { Box, Typography, FormControl, FormLabel, FormControlLabel, Checkbox } from '@mui/material';

const ApprenticeTab = React.memo(function ApprenticeTab({
    regaliasDeAprendiz,
    RegaliasDeAprendiz,
    handleRegaliaChange,
}) {
    return (
        <>
            <Typography variant="h6">
                Aprendiz
            </Typography>
            <Typography className="bigBoxTextClasses" paragraph>
                A jornada de um herói nem sempre começa com glória e reconhecimento. No vasto e implacável mundo, onde reinos se erguem e caem e os perigos espreitam nas sombras, aqueles que buscam se aventurar precisam mais do que coragem — precisam de preparo. É nesse vácuo de inexperiência que surge a figura do Aprendiz.Nem todos nascem nobres guerreiros, poderosos magos ou astutos exploradores.Muitos são apenas jovens sedentos por conhecimento, sobreviventes forçados a trilhar caminhos incertos, ou estudiosos que, diante da realidade, percebem que a teoria, sozinha, não os salvará.O Aprendiz é aquele que entende que antes de se tornar mestre, precisa aprender; antes de empunhar uma lâmina com destreza, deve compreender seu peso; antes de lançar feitiços que dobram a realidade, precisa sentir a magia pulsar dentro de si.Seja empunhando uma espada, curando feridos com bênçãos sagradas ou desbravando mistérios ocultos, o Aprendiz dá seus primeiros passos rumo ao desconhecido.Ele não é um especialista, mas também não é um amador indefeso.Seu papel no mundo é crescer, explorar e se moldar ao destino que escolheu — ou ao que o destino escolheu para ele.Mas a trilha do Aprendiz não é apenas feita de livros e lições simples. O mundo é um mestre cruel, e cada cicatriz, cada batalha perdida, cada erro cometido esculpe sua jornada. É na forja da experiência que o Aprendiz se torna algo mais. Alguns seguirão o caminho do aço, tornando-se guerreiros temidos. Outros dominarão os segredos da magia, dobrando as forças arcanas à sua vontade. Alguns escolherão a diplomacia, a exploração ou a fé, guiando-se não pela lâmina, mas pela palavra, pelo conhecimento ou pelo instinto.Independentemente do caminho escolhido, o Aprendiz carrega uma verdade inabalável: ele ainda não é um mestre, mas já deixou de ser um mero iniciante. E, no fim, o que define seu destino não é de onde veio, mas para onde está indo.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap', m: 3 }}>
                <FormControl component="fieldset" sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap', m: 3 }}>
                    <FormLabel component="legend">Escolha até duas regalias de aprendiz</FormLabel>
                    <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap', m: 3, width: '50%' }}>
                        {regaliasDeAprendiz.map((sc) => {
                            const checked = RegaliasDeAprendiz.includes(sc.id);
                            return (
                                <FormControlLabel
                                    key={sc.id}
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={() => setTimeout(() => {
                                                handleRegaliaChange(sc.id)
                                            }, 100)}
                                        />
                                    }
                                    label={
                                        <Box>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                {sc.nome}
                                            </Typography>
                                            <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                                                {sc.descricao}
                                            </Typography>
                                        </Box>
                                    }
                                    sx={{ alignItems: 'flex-start', my: 1 }}
                                />
                            );
                        })}
                    </Box>
                </FormControl>
            </Box>
        </>
    );
});

export default ApprenticeTab;
