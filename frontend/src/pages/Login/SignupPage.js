import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import logo from "../../assets/images/LDO.png";
import { useCallback } from "react";

const SignUpPage = () => {
    const baseUrl = process.env.REACT_APP_LISTEN_ADDRESS;
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [feedbackType, setFeedbackType] = useState(""); // "success" ou "error"

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [rememberMe, setRememberMe] = useState(false); // Novo estado para "Lembre-se de mim"

    const navigate = useNavigate();
    const handleNavigateBack = useCallback(() => {
        navigate("/login");
    }, [navigate]);
    const submitSignup = (e) => {
        e.preventDefault();
        setUsernameError("");
        setPasswordError("");

        if (username === "") {
            setLoginError(false);
            setUsernameError("Por favor, insira seu usuário.");
            return;
        }

        if (password === "") {
            setLoginError(false);
            setPasswordError("Por favor, insira sua senha.");
            return;
        }
        if (email === "") {
            setLoginError(false);
            setEmailError("Por favor, insira sua senha.");
            return;
        }

        signup();

    };

    const signup = async () => {
        if (!username || !email || !password) {
            setPasswordError("Por favor, preencha todos os campos.");
            return;
        }
    
        try {
            const response = await fetch(`${baseUrl}/users`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: username, email: email, password: password })
            });
    
            const result = await response.json();
    
            if (response.status === 201) {
                setFeedbackType("success");
                setFeedbackMessage("Muito bem! Cadastro concluído! Verifique seu e-mail para confirmar o cadastro. (Pode estar na caixa de spam)");
                setUsername("");
                setEmail("");
                setPassword("");
            } else {
                // Lida com erros de cadastro vindos do backend
                const errorMessage = result.error || result.message || "Erro desconhecido ao criar usuário.";
    
                setFeedbackType("error");
                setFeedbackMessage(errorMessage);
                setPasswordError(errorMessage);
                setLoginError(true);
            }
    
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            setFeedbackType("error");
            setFeedbackMessage("Erro ao conectar com o servidor.");
            setPasswordError("Ocorreu um erro ao tentar criar o usuário.");
            setLoginError(true);
        }
    };
    


    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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
                    }}
                >
                    <img src={logo} style={{ margin: '10px' }} alt="logo" />
                    {feedbackMessage && (
                        <Box
                            sx={{
                                backgroundColor: feedbackType === "success" ? "#d4edda" : "#f8d7da",
                                color: feedbackType === "success" ? "#155724" : "#721c24",
                                border: `1px solid ${feedbackType === "success" ? "#c3e6cb" : "#f5c6cb"}`,
                                borderRadius: "4px",
                                padding: "10px",
                                marginBottom: "16px",
                                width:"90%",
                            }}
                        >
                            {feedbackMessage}
                        </Box>
                    )}

                    <form style={{ width: '70%', margin: 'auto', display: 'flex', flexFlow: 'column wrap' }}>
                        <TextField
                            error={usernameError !== "" || loginError}
                            helperText={usernameError}
                            value={username}
                            size="small"
                            label="Usuário"
                            onChange={(e) => setUsername(e.target.value)}
                            fullWidth
                            sx={{ mb: 1, mt: 1, color: 'black' }}
                        />
                        <TextField
                            error={emailError !== "" || loginError}
                            helperText={emailError}
                            value={email}
                            size="small"
                            label="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            sx={{ mb: 1, color: 'black' }}

                        />
                        <TextField
                            error={passwordError !== "" || loginError}
                            helperText={passwordError}
                            value={password}
                            size="small"
                            label="Senha"
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            type={showPassword ? 'text' : 'password'}
                            sx={{ mb: 1 }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Box sx={{ display: 'flex' }}>
                            <Button id="buttonSigIn" variant="contained" onClick={submitSignup} sx={{ background: '#162A22' }}>Cadastrar</Button>
                            <Button id="buttonSigIn2" variant="text" onClick={handleNavigateBack} sx={{ mx: 2, textDecoration: 'underline', color: '#000' }}>Voltar</Button>
                        </Box>
                    </form>
                </Box>

            </Container>
            <Box sx={{ background: '#40150A', position: 'absolute', bottom: '0px', width: '100%', color: '#fff', textAlign: 'center', fontSize: '10px', p: '4px' }}>© 2024 Lâmina do oculto. All rights reserved.</Box>
        </>
    );
};

export default SignUpPage;
