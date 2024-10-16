import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ptBR from 'dayjs/locale/pt-br';
import dayjs from 'dayjs';
import Filter from './Filter';
import { useNavigate } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import {MenuItem, OutlinedInput, Select} from '@mui/material';

const Filters = ({ onFilterChange }) => {
    const navigate = useNavigate();
    const [equipments, setEquipments] = useState([]);
    const [ship_owners, setShipOwners] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));
    const baseUrl = process.env.REACT_APP_LISTEN_ADDRESS;

    const alerts = [
        { label: 'Pessoa caída', value: 'falling' },
        { label: 'Sem macacão', value: 'no-coverall' },
        { label: 'Sem colete', value: 'no-jacket' },
        { label: 'Sem capacete', value: 'no-helmet' },
        { label: 'Sem botas', value: 'no-boots' },
        { label: 'Sem luvas', value: 'no-gloves' },
        { label: 'Área proibida', value: 'intrusion' },
        //{ label: '    ', value: 'no-ear-protector' },
        //{ label: 'Sem óculos', value: 'no-glasses' },
    ];

    // const severity = ['Crítico', 'Alto', 'Normal', 'Baixo'];
    const severity = ['Crítico', 'Normal'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const equipmentResponse = await fetch(`${baseUrl}/equipment`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                if (!equipmentResponse.ok) {
                    if (equipmentResponse.status === 401) {
                        localStorage.removeItem("user");
                        navigate("/login", { replace: true });
                    } else {
                        throw new Error(`HTTP error! Status: ${equipmentResponse.status}`);
                    }
                }

                const equipmentData = await equipmentResponse.json();

                const mappedEquipments = equipmentData.map(equipment => ({
                    label: equipment.display_name !== null ? equipment.display_name : equipment.identifier,
                    value: equipment.identifier,
                }));

                const uniqueShipOwners = new Set();
                equipmentData
                    .filter(equipment => equipment.ship_owner !== null)
                    .forEach(equipment => uniqueShipOwners.add(equipment.ship_owner));

                const uniqueMappedShipOwners = Array.from(uniqueShipOwners).map(ship_owner => ({
                    label: ship_owner,
                    value: ship_owner
                }));

                setEquipments(mappedEquipments);
                setShipOwners(uniqueMappedShipOwners);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [baseUrl, user.token, navigate]);

    const [cleared, setCleared] = useState(false);

    useEffect(() => {
        if (cleared) {
            const timeout = setTimeout(() => {
                setCleared(false);
            }, 1500);

            return () => clearTimeout(timeout);
        }
        return () => { };
    }, [cleared]);

    const [selectedStartDate, setSelectedStartDate] = useState();
    const [selectedEndDate, setSelectedEndDate] = useState();
    const [dateOption, setDateOption] = useState('ultimos-7-dias');

    const handleDateOptionChange = (event) => {
        const option = event.target.value;
        setDateOption(option);

        let startDate = null;
        let endDate = null;

        if (option === 'hoje') {
            startDate = dayjs();
            endDate = dayjs();
        } else if (option === 'ultimos-7-dias') {
            startDate = dayjs().subtract(7, 'day');
            endDate = dayjs();
        } else if (option === 'ultimos-30-dias') {
            startDate = dayjs().subtract(30, 'day');
            endDate = dayjs();
        }

        setSelectedStartDate(startDate);
        setSelectedEndDate(endDate);
        onFilterChange('start_date', startDate);
        onFilterChange('end_date', endDate);
    };

    const handleStartDateChange = (date) => {
        setSelectedStartDate(date);
        if (selectedEndDate && dayjs(date).isAfter(selectedEndDate)) {
            setSelectedEndDate(null);
            onFilterChange('end_date', null);
        }
        onFilterChange('start_date', date);
    };

    const handleEndDateChange = (date) => {
        setSelectedEndDate(date);
        if (selectedStartDate && dayjs(date).isBefore(selectedStartDate)) {
            setSelectedStartDate(null);
            onFilterChange('start_date', null);
        }
        onFilterChange('end_date', date);
    };

    const handleStartDateClear = () => {
        setSelectedStartDate(null);
        setCleared(true);
        onFilterChange('start_date', null);
    };

    const handleEndDateClear = () => {
        setSelectedEndDate(null);
        setCleared(true);
        onFilterChange('end_date', null);
    };

    return (
        <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale={ptBR}
        >
            <Box sx={{ display: 'flex', gap: 2, flexFlow: 'row wrap' }}>
                <Filter itens={''} label="Localização" onChange={(selectedOptions) => onFilterChange('ship_owners', selectedOptions)} />
                <Filter itens={''} label="Câmeras" onChange={(selectedOptions) => onFilterChange('equipment_identifiers', selectedOptions)} />
                <Filter itens={''} label="Auto" onChange={(selectedOptions) => onFilterChange('describe_info', selectedOptions)} />
                <Filter itens={''} label="Humano" onChange={(selectedOptions) => onFilterChange('severities', selectedOptions)} />

                <FormControl sx={{  minWidth:'130px',flex: 1 }}>
                    <InputLabel id="daterange-label">Período</InputLabel>
                    <Select
                        labelId="daterange-label"
                        id="daterange-select"
                        value={dateOption}
                        input={<OutlinedInput label={"Período"} />}
                        onChange={handleDateOptionChange}
                    >
                        <MenuItem value={"hoje"}>Hoje</MenuItem>
                        <MenuItem value={"ultimos-7-dias"}>Últimos 7 Dias</MenuItem>
                        <MenuItem value={"ultimos-30-dias"}>Últimos 15 Dias</MenuItem>
                        <MenuItem value={"ultimos-30-dias"}>Últimos 30 Dias</MenuItem>
                    </Select>
                </FormControl>

  

                {dateOption === 'customizado' && (
                    <>
                        <DatePicker
                            sx={{ minWidth: '130px', flex: 1 }}
                            disableFuture
                            slotProps={{
                                field: { clearable: true, onClear: handleStartDateClear },
                            }}
                            label="Início"
                            format="DD/MM/YYYY"
                            onChange={handleStartDateChange}
                            value={selectedStartDate}
                        />
                        <DatePicker
                            sx={{ minWidth: '130px', flex: 1 }}
                            slotProps={{
                                field: { clearable: true, onClear: handleEndDateClear },
                            }}
                            label="Fim"
                            format="DD/MM/YYYY"
                            onChange={handleEndDateChange}
                            value={selectedEndDate}
                        />
                    </>
                )}
            </Box>
        </LocalizationProvider>
    );
};

export default Filters;
