import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    LinearProgress,
    Grid,
    Paper,
    Stack
} from "@mui/material";

import {
    Storage,
    Settings,
    Security,
    Person,
    RocketLaunch,
    CheckCircle
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Setup() {

    const navigate = useNavigate();

    const config = {

        host: "localhost",
        port: "3306",
        user: "root",
        password: "DentalCare2026!",
        database: "dental_system_test"

    };

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("Listo para comenzar.");
    const [progress, setProgress] = useState(0);

    useEffect(() => {

    window.electronAPI.onSetupProgress(

        ({ progress, message }) => {

            setProgress(progress);

            setStatus(message);

        }

    );

}, []);

    const prepareSystem = async () => {

    setLoading(true);

    try {

        setProgress(10);
        setStatus("Verificando instalación...");

        const result =
            await window.electronAPI.prepareSystem(config);

        if (!result.success) {

            alert(result.message);

            setLoading(false);

            setProgress(0);

            setStatus("Error durante la preparación.");

            return;

        }

        setProgress(100);

        setStatus("Sistema preparado correctamente.");

        navigate(

            "/activation",

            {

                replace: true

            }

        );

    }

    catch (e) {

        console.error(e);

        alert(e.message);

        setLoading(false);

        setProgress(0);

        setStatus("Error durante la preparación.");

    }

};

    const StepCard = ({ icon, title, description }) => (

        <Paper
            elevation={0}
            sx={{
                p:3,
                border:"1px solid #E5E7EB",
                borderRadius:3,
                height:"100%"
            }}
        >

            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
            >

                <Box
                    sx={{
                        width:60,
                        height:60,
                        borderRadius:"50%",
                        bgcolor:"#E8F2FF",
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"center",
                        color:"#1976d2"
                    }}
                >

                    {icon}

                </Box>

                <Box>

                    <Typography
                        fontWeight={700}
                    >

                        {title}

                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >

                        {description}

                    </Typography>

                </Box>

            </Stack>

        </Paper>

    );

    return (

        <Box
            sx={{
                minHeight:"100vh",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                background:"linear-gradient(135deg,#edf5ff,#ffffff)"
            }}
        >

            <Card
                sx={{
                    width:950,
                    borderRadius:5,
                    boxShadow:8
                }}
            >

                <CardContent sx={{p:5}}>

                    <Stack
                        spacing={1}
                        alignItems="center"
                        mb={5}
                    >

                        <Typography
                            variant="h3"
                            fontWeight="bold"
                            color="primary"
                        >

                            DentalCare Pro

                        </Typography>

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >

                            Bienvenido

                        </Typography>

                        <Typography
                            color="text.secondary"
                            align="center"
                        >

                            Este asistente preparará automáticamente DentalCare Pro para su primer uso.

                        </Typography>

                    </Stack>

                    <Grid container spacing={3} mb={4}>

                        <Grid item xs={12} md={6}>

                            <StepCard
                                icon={<Storage fontSize="large" />}
                                title="Base de Datos"
                                description="Creación automática de la base de datos."
                            />

                        </Grid>

                        <Grid item xs={12} md={6}>

                            <StepCard
                                icon={<Settings fontSize="large" />}
                                title="Configuración"
                                description="Generación del archivo config.json."
                            />

                        </Grid>

                        <Grid item xs={12} md={6}>

                            <StepCard
                                icon={<Security fontSize="large" />}
                                title="Seguridad"
                                description="Preparación de la activación del sistema."
                            />

                        </Grid>

                        <Grid item xs={12} md={6}>

                            <StepCard
                                icon={<Person fontSize="large" />}
                                title="Usuario Administrador"
                                description="Preparación del acceso inicial."
                            />

                        </Grid>

                    </Grid>

                    <Paper
                        sx={{
                            p:3,
                            borderRadius:3,
                            bgcolor:"#F8FAFC"
                        }}
                    >

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={2}
                        >

                            <Typography
                                fontWeight={700}
                            >

                                Estado del Sistema

                            </Typography>

                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >

                                <CheckCircle color="success"/>

                                <Typography
                                    color="success.main"
                                    fontWeight={600}
                                >

                                    Seguro

                                </Typography>

                            </Stack>

                        </Stack>

                        <Typography mb={2}>

                            {status}

                        </Typography>

                        {loading && (

                            <>

                                <LinearProgress
                                    variant="determinate"
                                    value={progress}
                                    sx={{
                                        height:10,
                                        borderRadius:5
                                    }}
                                />

                                <Typography
                                    mt={1}
                                    variant="body2"
                                    color="text.secondary"
                                >

                                    {progress}% completado

                                </Typography>

                            </>

                        )}

                    </Paper>

                    <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        startIcon={<RocketLaunch />}
                        disabled={loading}
                        onClick={prepareSystem}
                        sx={{
                            mt:5,
                            py:2,
                            borderRadius:3,
                            fontSize:18,
                            fontWeight:"bold"
                        }}
                    >

                        PREPARAR SISTEMA

                    </Button>

                </CardContent>

            </Card>

        </Box>

    );

}