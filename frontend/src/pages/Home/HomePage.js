
import dayjs from 'dayjs';
import { Paper, Typography, Box, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import { PieChart } from '@mui/x-charts/PieChart';
import React, { useState, useEffect, useCallback } from 'react';
import "./home.css";
import Title from "../../assets/images/image.png";



const HomePage = () => {



    return (

        <Box sx={{ minHeight: '700px', width: '100%' }}>
            <Paper sx={{ py: 4, display: 'flex', justifyContent: 'center', background: 'transparent', boxShadow: 'none' }}>
                <img src={Title} style={{ width: '70%', }} ></img>
            </Paper>

            <Grid container spacing={1} sx={{ p: 4, width: '90%', m: 'auto' }} >
                <Grid item xs={6} sx={{ p: 2, display: 'flex', flexFlow: 'column wrap', justifyContent: 'space-between' }}>
                    <Paper sx={{ background: '#756A34', minHeight: '100px', minWidth: '100px', borderRadius: '24px', borderBottom: '9px solid #BB8130', height: '48%' }}>

                    </Paper>
                    <Paper sx={{ background: '#756A34', minHeight: '100px', minWidth: '100px', borderRadius: '24px', borderBottom: '9px solid #BB8130', height: '48%' }}>

                    </Paper>

                </Grid>
                <Grid item xs={6} sx={{ p: 2, }}>
                    <Paper sx={{ background: '#756A34', minHeight: '400px', minWidth: '100px', borderRadius: '24px', borderBottom: '9px solid #BB8130' }}>

                    </Paper>
                </Grid>
                <Grid item xs={6} sx={{ p: 2 }}>
                    <Paper sx={{ background: '#756A34', minHeight: '200px', minWidth: '100px', borderRadius: '24px', borderBottom: '9px solid #BB8130' }}>

                    </Paper>
                </Grid>
                <Grid item xs={3} sx={{ p: 2 }}>
                    <Paper sx={{ background: '#756A34', minHeight: '200px', minWidth: '100px', borderRadius: '24px', borderBottom: '9px solid #BB8130' }}>

                    </Paper>
                </Grid>
                <Grid item xs={3} sx={{ p: 2 }}>
                    <Paper sx={{ background: '#756A34', minHeight: '200px', minWidth: '100px', borderRadius: '24px', borderBottom: '9px solid #BB8130' }}>

                    </Paper>
                </Grid>

            </Grid>
        </Box>

    );
}

export default HomePage;
