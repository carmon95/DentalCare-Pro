import {
    Typography,
    Grid,
    Card,
    CardContent,
    Paper,
    Box
} from '@mui/material';

import MainLayout from '../layouts/MainLayout';

import {
    useEffect,
    useState
} from 'react';

import {
    getPatients
} from '../services/patientService';

import {
    getTreatments
} from '../services/treatmentService';

import {
    getPaymentsSummary
} from '../services/paymentService';

export default function Reports() {

    const [patients, setPatients] =
        useState([]);

    const [treatments, setTreatments] =
        useState([]);

    const [summary, setSummary] =
        useState([]);

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            const patientsData =
                await getPatients();

            const treatmentsData =
                await getTreatments();

            const summaryData =
                await getPaymentsSummary();

            setPatients(
                patientsData
            );

            setTreatments(
                treatmentsData
            );

            setSummary(
                summaryData
            );

        } catch (error) {

            console.error(error);

        }

    };

    const totalCollected =
        summary.reduce(
            (total, item) =>
                total +
                Number(
                    item.total_paid
                ),
            0
        );

    const totalPending =
        summary.reduce(
            (total, item) =>
                total +
                Number(
                    item.balance
                ),
            0
        );

    return (

    <MainLayout>

        <Typography
            variant="h3"
            fontWeight={700}
            mb={1}
        >
            Reportes
        </Typography>

        <Typography
            variant="h6"
            color="text.secondary"
            mb={5}
        >
            Indicadores y análisis del consultorio
        </Typography>

        {/* KPIs */}

        <Grid
            container
            spacing={3}
            sx={{
                mb: 5
            }}
        >

            <Grid item xs={12} sm={6} md={3}>

                <Card
                    sx={{
                        background:
                            'linear-gradient(135deg,#38BDF8,#0EA5E9)',
                        color: '#fff',
                        borderRadius: 5,
                        boxShadow:
                            '0 10px 30px rgba(0,0,0,0.15)'
                    }}
                >

                    <CardContent>

                        <Typography>
                            Total Pacientes
                        </Typography>

                        <Typography
                            variant="h3"
                            fontWeight={700}
                        >
                            {patients.length}
                        </Typography>

                    </CardContent>

                </Card>

            </Grid>

            <Grid item xs={12} sm={6} md={3}>

                <Card
                    sx={{
                        background:
                            'linear-gradient(135deg,#22C55E,#16A34A)',
                        color: '#fff',
                        borderRadius: 5,
                        boxShadow:
                            '0 10px 30px rgba(0,0,0,0.15)'
                    }}
                >

                    <CardContent>

                        <Typography>
                            Tratamientos
                        </Typography>

                        <Typography
                            variant="h3"
                            fontWeight={700}
                        >
                            {treatments.length}
                        </Typography>

                    </CardContent>

                </Card>

            </Grid>

            <Grid item xs={12} sm={6} md={3}>

                <Card
                    sx={{
                        background:
                            'linear-gradient(135deg,#F59E0B,#D97706)',
                        color: '#fff',
                        borderRadius: 5,
                        boxShadow:
                            '0 10px 30px rgba(0,0,0,0.15)'
                    }}
                >

                    <CardContent>

                        <Typography>
                            Total Cobrado
                        </Typography>

                        <Typography
                            variant="h3"
                            fontWeight={700}
                        >
                            $
                            {totalCollected.toFixed(2)}
                        </Typography>

                    </CardContent>

                </Card>

            </Grid>

            <Grid item xs={12} sm={6} md={3}>

                <Card
                    sx={{
                        background:
                            'linear-gradient(135deg,#EF4444,#DC2626)',
                        color: '#fff',
                        borderRadius: 5,
                        boxShadow:
                            '0 10px 30px rgba(0,0,0,0.15)'
                    }}
                >

                    <CardContent>

                        <Typography>
                            Saldo Pendiente
                        </Typography>

                        <Typography
                            variant="h3"
                            fontWeight={700}
                        >
                            $
                            {totalPending.toFixed(2)}
                        </Typography>

                    </CardContent>

                </Card>

            </Grid>

        </Grid>

        {/* BLOQUES PRINCIPALES */}

        <Grid
            container
            spacing={3}
            mb={4}
        >

            <Grid item xs={12} md={6}>

                <Paper
                    sx={{
                        p: 4,
                        borderRadius: 5,
                        minHeight: 320
                    }}
                >

                    <Typography
                        variant="h5"
                        fontWeight={700}
                        mb={3}
                    >
                        Tratamientos por Estado
                    </Typography>

                    <Typography color="text.secondary">

                        Pendientes:
                        {' '}
                        {
                            treatments.filter(
                                t =>
                                    t.status ===
                                    'PENDIENTE'
                            ).length
                        }

                    </Typography>

                    <Typography color="text.secondary">

                        En Proceso:
                        {' '}
                        {
                            treatments.filter(
                                t =>
                                    t.status ===
                                    'EN PROCESO'
                            ).length
                        }

                    </Typography>

                    <Typography color="text.secondary">

                        Finalizados:
                        {' '}
                        {
                            treatments.filter(
                                t =>
                                    t.status ===
                                    'FINALIZADO'
                            ).length
                        }

                    </Typography>

                    <Typography color="text.secondary">

                        Cancelados:
                        {' '}
                        {
                            treatments.filter(
                                t =>
                                    t.status ===
                                    'CANCELADO'
                            ).length
                        }

                    </Typography>

                </Paper>

            </Grid>

            <Grid item xs={12} md={6}>

                <Paper
                    sx={{
                        p: 4,
                        borderRadius: 5,
                        minHeight: 320
                    }}
                >

                    <Typography
                        variant="h5"
                        fontWeight={700}
                        mb={3}
                    >
                        Ingresos por Mes
                    </Typography>

                    <Typography
                        color="text.secondary"
                    >
                        Total ingresado:
                    </Typography>

                    <Typography
                        variant="h3"
                        fontWeight={700}
                        color="success.main"
                    >
                        $
                        {totalCollected.toFixed(2)}
                    </Typography>

                </Paper>

            </Grid>

        </Grid>

       {/* ESTADÍSTICAS DEL CONSULTORIO */}

<Paper
    sx={{
        p: 4,
        borderRadius: 5
    }}
>

    <Typography
        variant="h4"
        fontWeight={700}
        mb={4}
    >
        Estadísticas del Consultorio
    </Typography>

    <Grid
        container
        spacing={3}
    >

        <Grid item xs={12} md={6}>

            <Paper
                sx={{
                    p: 3,
                    borderRadius: 4,
                    background: '#F8FAFC'
                }}
            >

                <Typography
                    variant="h6"
                    fontWeight={700}
                    mb={3}
                >
                    Tratamientos por Estado
                </Typography>

                <Typography mb={1}>
                    Pendientes:
                    {' '}
                    {
                        treatments.filter(
                            t =>
                                t.status ===
                                'PENDIENTE'
                        ).length
                    }
                </Typography>

                <Typography mb={1}>
                    En Proceso:
                    {' '}
                    {
                        treatments.filter(
                            t =>
                                t.status ===
                                'EN PROCESO'
                        ).length
                    }
                </Typography>

                <Typography mb={1}>
                    Finalizados:
                    {' '}
                    {
                        treatments.filter(
                            t =>
                                t.status ===
                                'FINALIZADO'
                        ).length
                    }
                </Typography>

                <Typography>
                    Cancelados:
                    {' '}
                    {
                        treatments.filter(
                            t =>
                                t.status ===
                                'CANCELADO'
                        ).length
                    }
                </Typography>

            </Paper>

        </Grid>

        <Grid item xs={12} md={6}>

            <Paper
                sx={{
                    p: 3,
                    borderRadius: 4,
                    background: '#F8FAFC'
                }}
            >

                <Typography
                    variant="h6"
                    fontWeight={700}
                    mb={3}
                >
                    Actividad General
                </Typography>

                <Typography mb={1}>
                    Pacientes Registrados:
                    {' '}
                    {patients.length}
                </Typography>

                <Typography mb={1}>
                    Tratamientos Registrados:
                    {' '}
                    {treatments.length}
                </Typography>

                <Typography mb={1}>
                    Tratamientos Finalizados:
                    {' '}
                    {
                        treatments.filter(
                            t =>
                                t.status ===
                                'FINALIZADO'
                        ).length
                    }
                </Typography>

                <Typography>
                    Tratamientos Activos:
                    {' '}
                    {
                        treatments.filter(
                            t =>
                                t.status ===
                                'PENDIENTE'
                                ||
                                t.status ===
                                'EN PROCESO'
                        ).length
                    }
                </Typography>

            </Paper>

        </Grid>

    </Grid>

</Paper>

    </MainLayout>

);
}