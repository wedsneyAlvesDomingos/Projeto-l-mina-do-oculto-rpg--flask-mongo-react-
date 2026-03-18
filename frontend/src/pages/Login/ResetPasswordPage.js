import React, { useState } from "react";
import AppFooter from '../../componentes/Footer/Footer';
import { useNavigate, useParams } from "react-router-dom";
import './Login.css';
import {
    Box, Container, TextField, Button, Typography, Alert,
    InputAdornment, IconButton, CircularProgress,
} from '@mui/material';
import Visibility    from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockResetIcon from '@mui/icons-material/LockReset';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import logo from "../../assets/images/LDO.png";

const ResetPasswordPage = () => {
    const { token } = useParams();
    const baseUrl   = process.env.REACT_APP_LISTEN_ADDRESS;
    const navigate  = useNavigate();

    const [newPwd,      setNewPwd]      = useState('');
    const [confirmPwd,  setConfirmPwd]  = useState('');
    const [showNew,     setShowNew]     = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading,     setLoading]     = useState(false);
    const [success,     setSuccess]     = useState(false);
    const [error,       setError]       = useState('');
    const [fieldError,  setFieldError]  = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setFieldError('');

        if (!newPwd || !confirmPwd) {
            setFieldError('Preencha os dois campos.');
            return;
        }
        if (newPwd.length < 6) {
            setFieldError('A senha deve ter no mínimo 6 caracteres.');
            return;
        }
        if (newPwd !== confirmPwd) {
            setFieldError('As senhas não conferem.');
            return;
        }
        if (!token) {
            setError('Link inválido. Solicite um novo.');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${baseUrl}/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, new_password: newPwd }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Erro ao redefinir senha.');
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
                        <Box sx={{ mt: 2, width: '100%' }}>
                            <Alert
                                severity="success"
                                icon={<CheckCircleIcon />}
                                sx={{ mb: 2, fontFamily: '"Esteban", serif', textAlign: 'left' }}
                            >
                                Senha redefinida com sucesso! Agora você já pode
                                fazer login com sua nova senha.
                            </Alert>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => navigate('/login')}
                                sx={{ background: '#162A22', '&:hover': { background: '#2F3C29' } }}
                            >
                                Ir para o login
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
                                    mb: 2,
                                    mt: 1,
                                    color: 'text.secondary',
                                    fontSize: '0.95rem',
                                }}
                            >
                                Digite sua nova senha abaixo.
                            </Typography>

                            {error && (
                                <Alert severity="error" sx={{ mb: 2, textAlign: 'left' }}>
                                    {error}
                                </Alert>
                            )}

                            <TextField
                                label="Nova senha"
                                type={showNew ? 'text' : 'password'}
                                value={newPwd}
                                onChange={e => { setNewPwd(e.target.value); setFieldError(''); setError(''); }}
                                error={!!fieldError}
                                size="small"
                                fullWidth
                                autoFocus
                                sx={{ mb: 1.5 }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton size="small" onClick={() => setShowNew(v => !v)}>
                                                {showNew ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                label="Confirmar nova senha"
                                type={showConfirm ? 'text' : 'password'}
                                value={confirmPwd}
                                onChange={e => { setConfirmPwd(e.target.value); setFieldError(''); setError(''); }}
                                error={!!fieldError}
                                helperText={fieldError}
                                size="small"
                                fullWidth
                                sx={{ mb: 2 }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton size="small" onClick={() => setShowConfirm(v => !v)}>
                                                {showConfirm ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={loading}
                                startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <LockResetIcon />}
                                sx={{ background: '#162A22', mb: 1, '&:hover': { background: '#2F3C29' } }}
                            >
                                {loading ? 'Salvando...' : 'Redefinir senha'}
                            </Button>

                            <Button
                                variant="text"
                                onClick={() => navigate('/esqueceuSenha')}
                                sx={{ textDecoration: 'underline', color: 'text.secondary', fontSize: '0.85rem' }}
                            >
                                Solicitar novo link
                            </Button>
                        </form>
                    )}
                </Box>
            </Container>

            <AppFooter />
        </Box>
    );
};

export default ResetPasswordPage;
