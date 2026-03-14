import React from 'react';
import { Box, Typography, Paper, Tooltip, TextField, ListItem, Checkbox } from '@mui/material';

// ============================================================
// AtributoBox — Caixa de grupo de habilidades
// ============================================================
const AtributoBox = ({ title, data, values, onChange, remainingPoints, borderColor = "#7B3311", onCheckboxClick, isChecked }) => {
    const handleCheckboxChange = () => {
        onCheckboxClick(data, title, !isChecked);
    };

    return (
        <Paper
            elevation={3}
            sx={{
                padding: 2,
                mx: 0,
                width: "19.5%",
                my: 1,
                borderBottom: `10px solid ${borderColor}`
            }}
        >
            <Typography variant="h6" gutterBottom className="esteban" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                {title}
                <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
            </Typography>
            <Typography
                variant="body2"
                color={remainingPoints === 0 ? "error" : "textSecondary"}
                className="bigBoxTextClasses"
            >
                Pontos restantes: {remainingPoints}
            </Typography>
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
                {data.map((item, index) => (
                    <Box
                        key={index}
                        gap={2}
                        sx={{
                            justifyContent: "space-around",
                            display: "flex",
                            alignItems: "center"
                        }}
                    >
                        <Tooltip title={item.description} arrow placement="right">
                            <Typography sx={{ width: "200px", textAlign: "start" }} className="bigBoxTextClasses">
                                {item.title}
                            </Typography>
                        </Tooltip>
                        <TextField
                            label="Valor"
                            type="number"
                            size="small"
                            value={values[item.title]}
                            onChange={(e) => onChange(item.title, e.target.value)}
                            sx={{ width: "100px" }}
                            inputProps={{
                                min: 0,
                                max: values[item.title] + remainingPoints
                            }}
                        />
                    </Box>
                ))}
            </Box>
        </Paper>
    );
};

// ============================================================
// AtributoContainer — Contêiner de todos os grupos de habilidades
// ============================================================
const AtributoContainer = ({
    allValues, autoIncrementedValues,
    MAX_POINTS, calculateCustoEscalonado,
    setAllValues, setAutoIncrementedValues,
    setCheckedOrder, setCheckedGroups, checkedGroups,
    grupos,
}) => {
    const getTotalUsed = () => {
        return Object.entries(allValues).reduce((acc, [title, val]) => {
            const auto = autoIncrementedValues[title] || 0;
            return acc + calculateCustoEscalonado(val - auto);
        }, 0);
    };

    const remainingPoints = MAX_POINTS - getTotalUsed();

    const handleChange = (title, newValue) => {
        newValue = parseInt(newValue) || 0;
        const auto = autoIncrementedValues[title] || 0;

        if (newValue < auto) return;

        setAllValues((prev) => {
            const previousValue = prev[title];
            const newCusto = calculateCustoEscalonado(newValue - auto);
            const prevCusto = calculateCustoEscalonado(previousValue - auto);
            const deltaCusto = newCusto - prevCusto;

            if (deltaCusto <= 0 || (getTotalUsed() + deltaCusto <= MAX_POINTS)) {
                return { ...prev, [title]: newValue };
            }

            return prev;
        });
        console.log(allValues);
    };

    const updateCounts = (itemTitle, incrementar) => {
        setAutoIncrementedValues(prevAuto => {
            const current = prevAuto[itemTitle] || 0;
            const updatedAuto = incrementar ? current + 1 : current - 1;

            setAllValues(prevAll => {
                const totalPrev = prevAll[itemTitle] || 0;
                const manualPrev = totalPrev - current;
                return {
                    ...prevAll,
                    [itemTitle]: manualPrev + updatedAuto
                };
            });

            return { ...prevAuto, [itemTitle]: updatedAuto };
        });
    };

    const handleCheckboxClick = (grupoData, grupoTitle, novoStatus) => {
        setCheckedOrder(prevOrder => {
            let newOrder = [...prevOrder];
            let removedGrupo = null;

            if (novoStatus) {
                if (newOrder.length >= 2) {
                    removedGrupo = newOrder.shift();
                }
                newOrder.push(grupoTitle);
            } else {
                newOrder = newOrder.filter(title => title !== grupoTitle);
            }

            if (removedGrupo) {
                const grupoRemovido = grupos.find(g => g.title === removedGrupo);
                grupoRemovido?.data.forEach(item => {
                    updateCounts(item.title, false);
                });
            }

            grupoData.forEach(item => {
                updateCounts(item.title, novoStatus);
            });

            setCheckedGroups(prev => {
                const updated = { ...prev, [grupoTitle]: novoStatus };
                if (removedGrupo) {
                    updated[removedGrupo] = false;
                }
                return updated;
            });

            return newOrder;
        });
    };

    return (
        <Box display="flex" flexWrap="wrap" sx={{ justifyContent: 'space-between', width: '100%' }}>
            {grupos.map((grupo, index) => (
                <AtributoBox
                    key={index}
                    title={grupo.title}
                    data={grupo.data}
                    values={allValues}
                    onChange={handleChange}
                    remainingPoints={remainingPoints}
                    borderColor={grupo.borderColor}
                    onCheckboxClick={handleCheckboxClick}
                    isChecked={!!checkedGroups[grupo.title]}
                />
            ))}
        </Box>
    );
};

// ============================================================
// SkillsTab — Tab 2 (Habilidades)
// ============================================================
const SkillsTab = React.memo(function SkillsTab({
    allValues, autoIncrementedValues,
    MAX_POINTS, calculateCustoEscalonado,
    setAllValues, setAutoIncrementedValues,
    setCheckedOrder, setCheckedGroups, checkedGroups,
    grupos,
}) {
    return (
        <>
            <Typography className="bigBoxTextClasses">
                Um personagem com zero pontos em uma Habilidade não é proficiente nesta Habilidade. Essa informação é relevante para as regras, habilidades e ações que exigem que o personagem seja proficiente com a habilidade.Um jogador só pode pedir ao mestre testes em Habilidades que sejam proficientes, caso contrário somente fará testes que lhe forem exigidos pelas situações enfrentadas no jogo.
            </Typography>
            <ListItem sx={{ px: 0 }} className="esteban">
                Escolha dois dos Grupos de Habilidade (Físico, Conhecimento, Exploração, Arcana ou Social). Receba 1 ponto de habilidade em cada uma das Habilidades do Grupo. Esses incrementos são considerados os primeiros incrementos para propósitos de distribuição de pontos de Habilidade.
                Ao atingir o Nível 7 escolha um nova aba, diferente das opções escolhidas no nível 1, para receber o mesmo incremento.<br />
            </ListItem>
            <ListItem sx={{ px: 0 }} className="esteban">
                Aloque 40 pontos em Habilidades ou Proficiências. Ao alocar os pontos de habilidade, siga as regras a seguir:
                Depois do quarto incremento em uma Habilidade, são necessários 2 pontos de habilidade para o quinto incremento (ao invés de 1) , 3 para um sexto (ao invés de 2) e a partir do sétimo será 4 pontos de habilidade por incremento (ao invés de 3).
            </ListItem>
            <ListItem sx={{ px: 0 }} className="esteban">
                O valor máximo de uma Habilidade é igual a 15. Se alguma Regalia lhe fornecer pontos em uma habilidade que já esteja no valor de 15, escolha outra habilidade do mesmo grupo (Físico, Conhecimento, Exploração, Arcana ou Social) para adicionar o ponto.
            </ListItem>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <AtributoContainer
                    allValues={allValues}
                    autoIncrementedValues={autoIncrementedValues}
                    MAX_POINTS={MAX_POINTS}
                    calculateCustoEscalonado={calculateCustoEscalonado}
                    setAllValues={setAllValues}
                    setAutoIncrementedValues={setAutoIncrementedValues}
                    setCheckedOrder={setCheckedOrder}
                    setCheckedGroups={setCheckedGroups}
                    checkedGroups={checkedGroups}
                    grupos={grupos}
                />
            </Box>
        </>
    );
});

export default SkillsTab;
