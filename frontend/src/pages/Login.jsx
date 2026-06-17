import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography
} from '@mui/material';

import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import logo from '../assets/logo.png';

export default function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {

        try {

            const response = await axios.post(
                'http://localhost:3001/api/auth/login',
                {
                    username,
                    password
                }
            );

            localStorage.setItem(
                'token',
                response.data.token
            );

            localStorage.setItem(
                'user',
                JSON.stringify(response.data.user)
            );

            navigate('/dashboard');

        } catch (error) {

            console.error(error);

            alert('Usuario o contraseña incorrectos');

        }

    };

    return (

        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background:
                    'linear-gradient(135deg,#0099E5 0%, #4FC3F7 50%, #E1F5FE 100%)'
            }}
        >

            <Card
                sx={{
                    width: 450,
                    borderRadius: 8,
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(10px)',
                    boxShadow:
                        '0 20px 60px rgba(0,0,0,0.15)'
                }}
            >

                <CardContent sx={{ p: 5 }}>

                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        mb={1}
                    >
                        <img
                            src={logo}
                            alt="DentalCare Pro"
                            style={{
                                width: '320px',
                                height: 'auto',
                                marginBottom: '-20px'
                            }}
                        />
                    </Box>

                    <Typography
                        variant="h6"
                        align="center"
                        color="text.secondary"
                        gutterBottom
                    >
                        Sistema de Gestión Odontológica
                    </Typography>

                    <TextField
                        fullWidth
                        label="Usuario"
                        margin="normal"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3
                            }
                        }}
                    />

                   <TextField
    fullWidth
    label="Contraseña"
    type={showPassword ? 'text' : 'password'}
    margin="normal"
    value={password}
    onChange={(e) =>
        setPassword(e.target.value)
    }
    sx={{
        '& .MuiOutlinedInput-root': {
            borderRadius: 3
        }
    }}
    slotProps={{
        input: {
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton
                        onClick={() =>
                            setShowPassword(!showPassword)
                        }
                        edge="end"
                    >
                        {showPassword
                            ? <VisibilityOff />
                            : <Visibility />
                        }
                    </IconButton>
                </InputAdornment>
            )
        }
    }}
/>

                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={handleLogin}
                        sx={{
                            mt: 3,
                            py: 1.8,
                            borderRadius: 3,
                            fontWeight: 700,
                            fontSize: '1rem',
                            textTransform: 'none',
                            transition: '0.3s',

                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow:
                                    '0 10px 25px rgba(0,0,0,0.2)'
                            }
                        }}
                    >
                        Iniciar Sesión
                    </Button>

                    <Typography
                        align="center"
                        color="text.secondary"
                        sx={{
                            mt: 3,
                            fontSize: 13
                        }}
                    >
                        Pacientes • Citas • Expedientes Clínicos
                    </Typography>

                </CardContent>

            </Card>

        </Box>

    );
}