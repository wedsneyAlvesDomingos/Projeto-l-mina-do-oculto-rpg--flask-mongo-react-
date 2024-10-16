import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import Card from '@mui/material/Card';
import MaterialUISwitch from "../../componentes/themes/DarkModeToggleSwitch";


const LoginPage = () => {
    const baseUrl = process.env.REACT_APP_LISTEN_ADDRESS

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [usernameError, serUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loginError, setLoginError] = useState(false);

    const navigate = useNavigate();

    const submitLogin = (e) => {
        e.preventDefault();

        serUsernameError("");
        setPasswordError("");

        if ("" === username) {
            setLoginError(false)
            serUsernameError("Por favor, insira seu usuário.")
            return
        }

        if ("" === password) {
            setLoginError(false)
            setPasswordError("Por favor, insira sua senha.")
            return
        }

        logIn()

    };

    const logIn = async () => {
        fetch(`${baseUrl}/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: username, password }) // Ajuste aqui para enviar email em vez de username
        })
            .then(r => r.json())
            .then(r => {
                if (r.message === 'Login successful') { // Ajuste para verificar a mensagem de sucesso
                    const { user } = r; // Obtém o usuário da resposta
                    localStorage.setItem("user", JSON.stringify({ name: user.name, id: user.id })); // Ajuste aqui para armazenar os dados do usuário
                    navigate("/home");
                } else {
                    setPasswordError(r.error || "Usuário ou senha incorretos."); // Mostra erro da resposta
                    setLoginError(true);
                }
            })
            .catch(error => {
                console.error("Error during login:", error); // Captura erros da requisição
                setPasswordError("Ocorreu um erro ao tentar fazer login."); // Mensagem genérica de erro
                setLoginError(true);
            });
    }
    


    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (
      
            <Container
                component='main' maxWidth='xs'>

                <Card
                    sx={{
                        position: 'absolute',
                        left: '50%',
                        top: '40%',
                        transform: 'translate(-50%, -50%)',
                        padding: '30px',
                        display:'flex',
                        borderRadius: '10px',
                        flexFlow:'column',
                        textAlign: 'center',
                        boxShadow: 'rgba(14, 30, 37, 0.02) 0px 2px 4px 0px, rgba(14, 30, 37, 0.12) 0px 2px 16px 0px',
                      
                    }}
                >

                    <form onSubmit={submitLogin}>

                        {/* <img src={logo} style={{ margin: '10px' }} alt="logo" /> */}
                        <div className={"titleContainer"}>
                            <div>Lâmina do oculto</div>
                        </div>

                        <TextField
                            error={usernameError !== "" || loginError}
                            helperText={usernameError}
                            value={username}
                            label="Usuário"
                            onChange={(e) => setUsername(e.target.value)}
                            fullWidth
                            sx={{ mb: 4, mt: 4 ,color:'black'}}
                        />

                        <TextField
                            error={passwordError !== "" || loginError}
                            helperText={passwordError}
                            value={password}
                            label="Senha"
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            type={showPassword ? 'text' : 'password'}
                            sx={{ mb: 4 }}
                            InputProps={
                                {
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
                        <input
                            className={"btn-primary btn-block"}
                            type="submit"
                            value={"Entrar"}
                        />

                    </form>
                    
                   
                </Card>
                <Box sx={{position:'absolute', right:'10px', top:'10px'}}>
                         <MaterialUISwitch flow={'row'} />
                    </Box>
            </Container>
        
    );

};

export default LoginPage;