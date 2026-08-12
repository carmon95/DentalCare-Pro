import { useEffect, useMemo, useState } from 'react';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    Grid,
    Paper,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Tooltip
} from 'chart.js';
import MainLayout from '../layouts/MainLayout';
import { getReports } from '../services/reportService';

ChartJS.register(
    ArcElement,
    BarElement,
    CategoryScale,
    Filler,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Tooltip
);

const COLORS = ['#2563EB', '#14B8A6', '#F59E0B', '#8B5CF6', '#EF4444', '#64748B'];
const today = new Date().toISOString().slice(0, 10);
const firstDayOfMonth = `${today.slice(0, 7)}-01`;
const currency = new Intl.NumberFormat('es-NI', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});

function MetricCard({ title, value, helper, icon, color }) {
    return (
        <Card sx={{ height: '100%', borderRadius: 3, border: '1px solid #E2E8F0', boxShadow: 'none' }}>
            <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                        <Typography variant="body2" color="text.secondary" fontWeight={600}>{title}</Typography>
                        <Typography variant="h5" fontWeight={800} sx={{ mt: 0.75, color: '#0F172A' }}>{value}</Typography>
                        <Typography variant="caption" color="text.secondary">{helper}</Typography>
                    </Box>
                    <Box sx={{ p: 1, borderRadius: 2, color, bgcolor: `${color}18`, display: 'grid', placeItems: 'center' }}>
                        {icon}
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
}

function ChartCard({ title, children, height = 280 }) {
    return (
        <Paper sx={{ p: 3, borderRadius: 3, height, border: '1px solid #E2E8F0', boxShadow: 'none' }}>
            <Typography variant="h6" fontWeight={750} mb={2}>{title}</Typography>
            <Box sx={{ height: `calc(100% - 40px)`, position: 'relative' }}>{children}</Box>
        </Paper>
    );
}

export default function Reports() {
    const [filters, setFilters] = useState({ from: firstDayOfMonth, to: today });
    const [reports, setReports] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const loadReports = async (nextFilters = filters) => {
        setLoading(true);
        setError('');
        try {
            setReports(await getReports(nextFilters));
        } catch (requestError) {
            setError(requestError.response?.data?.message || 'No se pudo cargar la información de reportes.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const loadInitialReports = async () => {
            try {
                setReports(await getReports({ from: firstDayOfMonth, to: today }));
            } catch (requestError) {
                setError(requestError.response?.data?.message || 'No se pudo cargar la información de reportes.');
            } finally {
                setLoading(false);
            }
        };

        loadInitialReports();
    }, []);

    const chartData = useMemo(() => {
        if (!reports) return null;
        return {
            revenue: {
                labels: reports.monthlyRevenue.map((item) => new Date(`${item.month}-01T12:00:00`).toLocaleDateString('es-NI', { month: 'short', year: 'numeric' })),
                datasets: [{ label: 'Cobrado', data: reports.monthlyRevenue.map((item) => Number(item.total)), borderColor: '#2563EB', backgroundColor: 'rgba(37, 99, 235, .14)', fill: true, tension: .35, pointRadius: 4, pointBackgroundColor: '#2563EB' }]
            },
            treatmentStatus: {
                labels: reports.treatmentStatus.map((item) => item.status),
                datasets: [{ data: reports.treatmentStatus.map((item) => Number(item.total)), backgroundColor: COLORS, borderWidth: 0, hoverOffset: 8 }]
            },
            topTreatments: {
                labels: reports.topTreatments.map((item) => item.treatment_type),
                datasets: [{ label: 'Tratamientos', data: reports.topTreatments.map((item) => Number(item.total)), backgroundColor: '#14B8A6', borderRadius: 7, borderSkipped: false }]
            },
            paymentMethods: {
                labels: reports.paymentMethods.map((item) => item.method),
                datasets: [{ data: reports.paymentMethods.map((item) => Number(item.total)), backgroundColor: COLORS, borderWidth: 0 }]
            }
        };
    }, [reports]);

    const hasData = (items) => items?.length > 0;
    const appointmentRate = reports?.kpis.appointments.total
        ? Math.round((reports.kpis.appointments.attended / reports.kpis.appointments.total) * 100)
        : 0;

    return (
        <MainLayout>
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ md: 'center' }} spacing={2} mb={3}>
                <Box>
                    <Typography variant="h4" fontWeight={800}>Reportes</Typography>
                    <Typography color="text.secondary" mt={.5}>Seguimiento financiero y operativo de la clínica.</Typography>
                </Box>
                <Button variant="outlined" startIcon={<RefreshIcon />} onClick={() => loadReports()} disabled={loading}>Actualizar</Button>
            </Stack>

            <Paper component="form" onSubmit={(event) => { event.preventDefault(); loadReports(); }} sx={{ p: 2, mb: 3, borderRadius: 3, border: '1px solid #E2E8F0', boxShadow: 'none' }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
                    <TextField label="Desde" type="date" size="small" value={filters.from} onChange={(event) => setFilters({ ...filters, from: event.target.value })} InputLabelProps={{ shrink: true }} sx={{ minWidth: 175 }} />
                    <TextField label="Hasta" type="date" size="small" value={filters.to} onChange={(event) => setFilters({ ...filters, to: event.target.value })} InputLabelProps={{ shrink: true }} sx={{ minWidth: 175 }} />
                    <Button type="submit" variant="contained" disabled={loading}>Aplicar período</Button>
                    {reports && <Typography variant="body2" color="text.secondary" sx={{ ml: { sm: 'auto' } }}>Datos del {reports.period.from} al {reports.period.to}</Typography>}
                </Stack>
            </Paper>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
            {loading && !reports ? <Box sx={{ py: 10, display: 'grid', placeItems: 'center' }}><CircularProgress /></Box> : reports && chartData && <>
                <Grid container spacing={2.5} mb={3}>
                    <Grid item xs={12} sm={6} lg={3}><MetricCard title="Ingresos cobrados" value={currency.format(reports.kpis.collected)} helper={`${reports.kpis.paymentsCount} pagos registrados`} icon={<PaymentsOutlinedIcon />} color="#2563EB" /></Grid>
                    <Grid item xs={12} sm={6} lg={3}><MetricCard title="Facturado" value={currency.format(reports.kpis.billed)} helper="Tratamientos iniciados en el período" icon={<AccountBalanceWalletOutlinedIcon />} color="#14B8A6" /></Grid>
                    <Grid item xs={12} sm={6} lg={3}><MetricCard title="Saldo pendiente" value={currency.format(reports.kpis.pending)} helper="De tratamientos del período" icon={<AccountBalanceWalletOutlinedIcon />} color="#F59E0B" /></Grid>
                    <Grid item xs={12} sm={6} lg={3}><MetricCard title="Nuevos pacientes" value={reports.kpis.newPatients} helper={`${reports.kpis.appointments.total} citas programadas`} icon={<PeopleAltOutlinedIcon />} color="#8B5CF6" /></Grid>
                </Grid>

                <Grid container spacing={2.5} mb={3}>
                    <Grid item xs={12} lg={7}><ChartCard title="Ingresos por mes"><Line data={chartData.revenue} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: (context) => currency.format(context.parsed.y) } } }, scales: { y: { ticks: { callback: (value) => currency.format(value) }, grid: { color: '#F1F5F9' } }, x: { grid: { display: false } } } }} /></ChartCard></Grid>
                    <Grid item xs={12} lg={5}><ChartCard title="Tratamientos por estado"><Doughnut data={chartData.treatmentStatus} options={{ responsive: true, maintainAspectRatio: false, cutout: '66%', plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, padding: 16 } } } }} /></ChartCard></Grid>
                </Grid>

                <Grid container spacing={2.5} mb={3}>
                    <Grid item xs={12} md={7}><ChartCard title="Tratamientos más registrados"><Bar data={chartData.topTreatments} options={{ indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { beginAtZero: true, ticks: { precision: 0 }, grid: { color: '#F1F5F9' } }, y: { grid: { display: false } } } }} /></ChartCard></Grid>
                    <Grid item xs={12} md={5}><ChartCard title="Métodos de pago"><Doughnut data={chartData.paymentMethods} options={{ responsive: true, maintainAspectRatio: false, cutout: '62%', plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, padding: 14 } }, tooltip: { callbacks: { label: (context) => `${context.label}: ${currency.format(context.parsed)}` } } } }} /></ChartCard></Grid>
                </Grid>

                <Grid container spacing={2.5}>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #E2E8F0', boxShadow: 'none', height: '100%' }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}><Typography variant="h6" fontWeight={750}>Citas del período</Typography><EventAvailableOutlinedIcon color="primary" /></Stack>
                            <Typography variant="h3" fontWeight={800}>{reports.kpis.appointments.total}</Typography>
                            <Typography color="text.secondary" variant="body2" mb={2}>citas registradas</Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Stack spacing={1}><Typography variant="body2">Atendidas <b>{reports.kpis.appointments.attended}</b> ({appointmentRate}%)</Typography><Typography variant="body2">Programadas <b>{reports.kpis.appointments.scheduled}</b></Typography><Typography variant="body2">Canceladas <b>{reports.kpis.appointments.cancelled}</b></Typography></Stack>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #E2E8F0', boxShadow: 'none', height: '100%' }}>
                            <Typography variant="h6" fontWeight={750} mb={2}>Últimos pagos del período</Typography>
                            {hasData(reports.recentPayments) ? <Stack divider={<Divider flexItem />}>{reports.recentPayments.map((payment) => <Stack key={payment.id} direction="row" justifyContent="space-between" spacing={2} py={1.15}><Box><Typography fontWeight={650}>{payment.full_name}</Typography><Typography variant="body2" color="text.secondary">{payment.treatment_type} · {payment.payment_method || 'No especificado'}</Typography></Box><Box textAlign="right"><Typography fontWeight={750} color="success.main">{currency.format(payment.amount)}</Typography><Typography variant="caption" color="text.secondary">{payment.payment_date}</Typography></Box></Stack>)}</Stack> : <Typography color="text.secondary">No hay pagos registrados en este período.</Typography>}
                        </Paper>
                    </Grid>
                </Grid>
            </>}
        </MainLayout>
    );
}
