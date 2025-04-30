import React, { useEffect, useState, useCallback } from "react";
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
        <>
            <Container component='main' maxWidth='xs'>
                <Box
                    sx={{
                        position: 'absolute',
                        left: '50%',
                        top: '40%',
                        transform: 'translate(-50%, -50%)',
                        padding: '30px',
                        display: 'flex',
                        borderRadius: '10px',
                        flexFlow: 'column',
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <img src={logo} style={{ margin: '10px', width: '70%', }} alt="logo" />
                    <img src={decoration} style={{ margin: '10px', width: '30%', }} alt="logo" />
                    <Typography variant="h6" className="bigBoxTextClasses">{status}</Typography>
                    <img src={decoration} style={{ margin: '10px', width: '30%', transform: "scaleY(-1)" }} alt="logo" />
                    <Button id="buttonconfirm" variant="outlined" onClick={handleNavigateBack} sx={{ mt: 2 }}>
                        Voltar ao login
                    </Button>
                </Box>
            </Container>
            <Box sx={{ background: '#40150A', position: 'absolute', bottom: '0px', width: '100%', color: '#fff', textAlign: 'center', fontSize: '10px', p: '4px' }}>
                © 2024 Lâmina do oculto. All rights reserved.
            </Box>
        </>
    );
};

export default ConfirmEmailPage;
