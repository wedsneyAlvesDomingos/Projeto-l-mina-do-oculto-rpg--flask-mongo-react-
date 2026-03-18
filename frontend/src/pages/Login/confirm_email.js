import React, { useEffect, useState, useCallback } from "react";
import AppFooter from '../../componentes/Footer/Footer';
import { useNavigate, useParams } from "react-router-dom";
import './Login.css';
import { Typography, Box, Button, Container } from '@mui/material';
import decoration from "../../assets/images/image-from-rawpixel-id-6676779-png.png";
import logo from "../../assets/images/LDO.png";

const ConfirmEmailPage = () => {
    const { token } = useParams();
    const baseUrl = process.env.REACT_APP_LISTEN_ADDRESS;
    const navigate = useNavigate();
    const [status, setStatus] = useState("Verificando...");

    useEffect(() => {
        setTimeout(() => {
            if (!token) {
                setStatus("Token inválido.");
                return;
            }
            fetch(`${baseUrl}/confirm_email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: token })
            })

                .then(response => response.json())
                .then(data => {
                    if (data.message.includes("sucesso")) {
                        setStatus(`Email confirmado com sucesso! Obrigado por se registrar no nosso site!`);
                    } else {
                        setStatus(`Erro: ${data.message}`);
                    }
                })
                .catch(err => {
                    setStatus("Erro ao confirmar o email.");
                    console.error(err);
                });
        }, 5000);

    }, [token, baseUrl]);

    const handleNavigateBack = useCallback(() => {
        navigate("/login");
    }, [navigate]);

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Container component='main' maxWidth={false} sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4 }}>
                <Box
                    sx={{
                        padding: { xs: '16px', sm: '30px' },
                        display: 'flex',
                        borderRadius: '10px',
                        flexFlow: 'column',
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        maxWidth: { xs: '80vw', md: '50vw' },
                        minWidth: '300px',
                    }}
                >
                    <img src={logo} style={{ margin: '10px auto', display: 'block', width: '100%', height: 'auto' }} alt="logo" />
                    <img src={decoration} style={{ margin: '10px', width: '30%', }} alt="logo" />
                    <Typography variant="h6" className="bigBoxTextClasses">{status}</Typography>
                    <img src={decoration} style={{ margin: '10px', width: '30%', transform: "scaleY(-1)" }} alt="logo" />
                    <Button id="buttonconfirm" variant="outlined" onClick={handleNavigateBack} sx={{ mt: 2 }}>
                        Voltar ao login
                    </Button>
                </Box>
            </Container>
            <AppFooter />
        </Box>
    );
};

export default ConfirmEmailPage;
