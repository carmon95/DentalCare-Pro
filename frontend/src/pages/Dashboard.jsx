import {
    Grid,
    Typography,
    Paper,
    Box
} from '@mui/material';

import {
    useEffect,
    useState
} from 'react';

import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import PaymentsIcon from '@mui/icons-material/Payments';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

import MainLayout from '../layouts/MainLayout';
import KpiCard from '../components/KpiCard';
import PatientsChart from '../components/PatientsChart';
import TreatmentsChart from '../components/TreatmentsChart';

import {
    getDashboard
} from '../services/dashboardService';

export default function Dashboard() {

    const [dashboard, setDashboard] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const data =
                await getDashboard();

            setDashboard(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <MainLayout>

                <Typography
                    variant="h5"
                >
                    Cargando Dashboard...
                </Typography>

            </MainLayout>

        );

    }

    return (

        <MainLayout>

            <Typography
                variant="h4"
                fontWeight={700}
                sx={{
                    color: '#0F172A',
                    mb: 1
                }}
            >
                Dashboard
            </Typography>

            <Typography
                sx={{
                    color: '#64748B',
                    mb: 4
                }}
            >
                Resumen general de la clínica
            </Typography>

            <Grid container spacing={3}>

                <Grid item xs={12} md={3}>

                    <KpiCard
                        title="Pacientes Activos"
                        value={dashboard.patients.active}
                        subtitle={`${dashboard.patients.inactive} inactivos`}
                        icon={<PeopleIcon />}
                        gradient="linear-gradient(135deg,#38BDF8,#0284C7)"
                    />

                </Grid>

                <Grid item xs={12} md={3}>

                    <KpiCard
                        title="Citas Hoy"
                        value={dashboard.appointmentsToday.total}
                        icon={<EventIcon />}
                        gradient="linear-gradient(135deg,#4ADE80,#16A34A)"
                    />

                </Grid>

                <Grid item xs={12} md={3}>

                    <KpiCard
                        title="Tratamientos Activos"
                        value={dashboard.treatments.total}
                        icon={<MedicalServicesIcon />}
                        gradient="linear-gradient(135deg,#FACC15,#F59E0B)"
                    />

                </Grid>

                <Grid item xs={12} md={3}>

                    <KpiCard
                        title="Saldo Pendiente"
                        value={`$${Number(
                            dashboard.pending.total || 0
                        ).toFixed(2)}`}
                        icon={<PaymentsIcon />}
                        gradient="linear-gradient(135deg,#FB923C,#EA580C)"
                    />

                </Grid>

            </Grid>

<Grid
    container
    spacing={3}
    sx={{ mt: 2 }}
>

    {/* Columna izquierda */}

    <Grid item xs={12} md={5}>

        {/* Citas */}

        <Paper
            sx={{
                p: 4,
                borderRadius: 4,
                minHeight: 300,
                mb: 3,
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                mb={3}
            >
                📅 Citas de Hoy
            </Typography>

            {
                dashboard.nextAppointments.length > 0 ?

                dashboard.nextAppointments.map(

                    (appointment, index) => (

                        <Paper
                            key={index}
                            elevation={0}
                            sx={{
                                p: 2,
                                mb: 2,
                                borderRadius: 3,
                                background: '#F8FAFC',
                                border: '1px solid #E2E8F0'
                            }}
                        >

                            <Typography fontWeight={700}>
                                {appointment.full_name}
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                📅 {new Date(
                                    appointment.appointment_date
                                ).toLocaleDateString('es-NI')}
                            </Typography>

                            <Typography color="primary">
                                🕒 {appointment.appointment_time?.substring(0, 5)}
                            </Typography>

                        </Paper>

                    )

                )

                :

                <Typography color="text.secondary">
                    No hay citas programadas.
                </Typography>

            }

        </Paper>

        {/* Pacientes recientes */}

        <Paper
            sx={{
                p: 4,
                borderRadius: 4,
                minHeight: 300,
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                mb={3}
            >
                👥 Pacientes Recientes
            </Typography>

            {

                dashboard.recentPatients
                    .slice(0, 3)
                    .map(

                        (patient, index) => (

                            <Paper
                                key={index}
                                elevation={0}
                                sx={{
                                    p: 2,
                                    mb: 2,
                                    borderRadius: 3,
                                    background: '#F8FAFC',
                                    border: '1px solid #E2E8F0'
                                }}
                            >

                                <Typography fontWeight={700}>
                                    {patient.full_name}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Registrado{' '}
                                    {new Date(
                                        patient.created_at
                                    ).toLocaleDateString('es-NI')}
                                </Typography>

                            </Paper>

                        )

                    )

            }

        </Paper>

    </Grid>

    {/* Columna derecha */}

    <Grid item xs={12} md={7}>

          <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            ml: 4
        }}
    ></Box>

        <PatientsChart
            data={dashboard.patientsChart}
        />

        <Box sx={{ mt: 3 }} />

        <TreatmentsChart
            data={dashboard.treatmentsChart}
        />

    </Grid>

</Grid>

        </MainLayout>

    );

}