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

const LoginPage = () => {
    const baseUrl = process.env.REACT_APP_LISTEN_ADDRESS;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();
    const handleNavigateToSignup = useCallback(() => {
        navigate("/signup");
    }, [navigate]);
    useEffect(() => {
        const savedUsername = localStorage.getItem("rememberedUsername");
        if (savedUsername) {
            setUsername(savedUsername);
            setRememberMe(true);
        }
    }, []);

    const submitLogin = (e) => {
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
        logIn();
    };

    const logIn = async () => {
        fetch(`${baseUrl}/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: username, password: password })
        })
            .then(r => r.json())
            .then(r => {
                if (r.message === 'Login successful') {
                    const { user } = r;
                    localStorage.setItem("user", JSON.stringify({ name: user.name, id: user.id }));
                    if (rememberMe) {
                        localStorage.setItem("rememberedUsername", username);
                    } else {
                        localStorage.removeItem("rememberedUsername");
                    }

                    navigate("/home");
                } else {
                    if(r.error  == "Invalid data: Email not confirmed"){
                        setPasswordError("Confirme a sua conta por email.");
                    }else{
                        setPasswordError(r.error || "Usuário ou senha incorretos.");
                        setLoginError(true);
                    }

                }
            })
            .catch(error => {
                console.error("Error during login:", error);
                setPasswordError("Ocorreu um erro ao tentar fazer login.");
                setLoginError(true);
            });
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
                        <FormControlLabel
                            control={<Checkbox checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />}
                            label="Lembre-se de mim"
                            sx={{ mb: 2, mt: 0, width: 'fit-content' }}
                        />
                        <Box sx={{ display: 'flex' }}>
                            <Button type="submit" id="buttonLogIn" variant="contained" onClick={submitLogin} sx={{ background: '#162A22' }}>Login</Button>
                            <Button id="buttonLogIn2" variant="text" onClick={handleNavigateToSignup} sx={{ mx: 2, textDecoration: 'underline', color: '#000' }}>Cadastrar</Button>
                        </Box>
                    </form>
                </Box>
            </Container>
            <Box sx={{ background: '#40150A', position: 'absolute', bottom: '0px', width: '100%', color: '#fff', textAlign: 'center', fontSize: '10px', p: '4px' }}>© 2024 Lâmina do oculto. All rights reserved.</Box>
        </>
    );
};

export default LoginPage;
