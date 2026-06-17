import {
    Grid,
    Typography,
    Paper,
    Box
} from '@mui/material';

import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import PaymentsIcon from '@mui/icons-material/Payments';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

import MainLayout from '../layouts/MainLayout';
import KpiCard from '../components/KpiCard';

export default function Dashboard() {

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
                        title="Pacientes Totales"
                        value="128"
                        icon={<PeopleIcon />}
                        gradient="linear-gradient(135deg,#38BDF8,#0284C7)"
                    />
                </Grid>

                <Grid item xs={12} md={3}>
                    <KpiCard
                        title="Citas Hoy"
                        value="12"
                        icon={<EventIcon />}
                        gradient="linear-gradient(135deg,#4ADE80,#16A34A)"
                    />
                </Grid>

                <Grid item xs={12} md={3}>
                    <KpiCard
                        title="Ingresos del Mes"
                        value="$2,500"
                        icon={<PaymentsIcon />}
                        gradient="linear-gradient(135deg,#FACC15,#F59E0B)"
                    />
                </Grid>

                <Grid item xs={12} md={3}>
                    <KpiCard
                        title="Pendientes"
                        value="8"
                        icon={<MedicalServicesIcon />}
                        gradient="linear-gradient(135deg,#FB923C,#EA580C)"
                    />
                </Grid>

            </Grid>

            <Grid
                container
                spacing={3}
                sx={{
                    mt: 2
                }}
            >

                <Grid item xs={12} md={7}>

                    <Paper
                        sx={{
                            p: 4,
                            borderRadius: 4,
                            minHeight: 320,
                            boxShadow:
                                '0 10px 30px rgba(0,0,0,0.08)'
                        }}
                    >

                        <Typography
                            variant="h6"
                            fontWeight={700}
                            mb={3}
                        >
                            📅 Citas de Hoy
                        </Typography>

                        <Box mb={2}>
                            08:00 AM - Juan Pérez
                        </Box>

                        <Box mb={2}>
                            09:00 AM - María López
                        </Box>

                        <Box mb={2}>
                            10:30 AM - Carlos Gómez
                        </Box>

                        <Box mb={2}>
                            02:00 PM - Ana Martínez
                        </Box>

                    </Paper>

                </Grid>

                <Grid item xs={12} md={5}>

                    <Paper
                        sx={{
                            p: 4,
                            borderRadius: 4,
                            minHeight: 320,
                            boxShadow:
                                '0 10px 30px rgba(0,0,0,0.08)'
                        }}
                    >

                        <Typography
                            variant="h6"
                            fontWeight={700}
                            mb={3}
                        >
                            👥 Pacientes Recientes
                        </Typography>

                        <Box mb={2}>
                            Carlos Gómez
                        </Box>

                        <Box mb={2}>
                            María López
                        </Box>

                        <Box mb={2}>
                            Juan Pérez
                        </Box>

                        <Box mb={2}>
                            Sofía Hernández
                        </Box>

                    </Paper>

                </Grid>

            </Grid>

        </MainLayout>

    );

}