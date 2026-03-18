import React, { useState } from "react";
import AppFooter from '../../componentes/Footer/Footer';
import { useNavigate } from "react-router-dom";
import './Login.css';
import {
    Box, Container, TextField, Button, Typography, Alert,
    CircularProgress,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import logo from "../../assets/images/LDO.png";

const ForgotPasswordPage = () => {
    const baseUrl  = process.env.REACT_APP_LISTEN_ADDRESS;
    const navigate = useNavigate();

    const [email,    setEmail]    = useState('');
    const [loading,  setLoading]  = useState(false);
    const [success,  setSuccess]  = useState(false);
    const [error,    setError]    = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email.trim()) {
            setError('Por favor, insira seu e-mail.');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${baseUrl}/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim().toLowerCase() }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Erro ao enviar e-mail.');
            setSuccess(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Container component="main" maxWidth={false} sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4 }}>
                <Box
                    sx={{
                        padding: { xs: '16px', sm: '30px' },
                        display: 'flex',
                        borderRadius: '10px',
                        flexFlow: 'column',
                        textAlign: 'center',
                        alignItems: 'center',
                        width: '100%',
                        maxWidth: { xs: '80vw', md: '50vw' },
                        minWidth: '300px',
                    }}
                >
                    <img src={logo} style={{ margin: '10px auto', display: 'block', width: '100%', height: 'auto' }} alt="logo" />

                    {success ? (
                        <Box sx={{ mt: 2 }}>
                            <Alert
                                severity="success"
                                icon={<EmailIcon />}
                                sx={{ mb: 2, fontFamily: '"Esteban", serif', textAlign: 'left' }}
                            >
                                Se esse e-mail estiver cadastrado, você receberá
                                as instruções para redefinir sua senha em breve.
                                Verifique sua caixa de entrada (e a de spam).
                            </Alert>
                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={() => navigate('/login')}
                                sx={{ borderColor: '#162A22', color: '#162A22', mt: 1 }}
                            >
                                Voltar ao login
                            </Button>
                        </Box>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            style={{ width: '100%', display: 'flex', flexFlow: 'column' }}
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontFamily: '"Esteban", serif',
                                    mb: 1.5,
                                    mt: 1,
                                    color: 'text.secondary',
                                    fontSize: '0.95rem',
                                }}
                            >
                                Insira o e-mail da sua conta e enviaremos um link
                                para redefinir sua senha.
                            </Typography>

                            <TextField
                                type="email"
                                label="E-mail"
                                value={email}
                                onChange={e => { setEmail(e.target.value); setError(''); }}
                                error={!!error}
                                helperText={error}
                                size="small"
                                fullWidth
                                autoFocus
                                sx={{ mb: 2 }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={loading}
                                startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <EmailIcon />}
                                sx={{ background: '#162A22', mb: 1, '&:hover': { background: '#2F3C29' } }}
                            >
                                {loading ? 'Enviando...' : 'Enviar link de redefinição'}
                            </Button>

                            <Button
                                variant="text"
                                onClick={() => navigate('/login')}
                                sx={{ textDecoration: 'underline', color: 'text.secondary', fontSize: '0.85rem' }}
                            >
                                Voltar ao login
                            </Button>
                        </form>
                    )}
                </Box>
            </Container>

            <AppFooter />
        </Box>
    );
};

export default ForgotPasswordPage;
