import {
    Typography,
    Paper,
    Box,
    Button,
    TextField,
    Grid,
    Card,
    CardContent,
    Chip,
    Divider
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import EventIcon from '@mui/icons-material/Event';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import MainLayout from '../layouts/MainLayout';

import { useEffect, useState } from 'react';

import {
    getAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment
} from '../services/appointmentService';
import AppointmentDialog
from '../components/AppointmentDialog';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';


export default function Appointments() {

    const [appointments, setAppointments] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [openDialog, setOpenDialog] =
        useState(false);

    const [successMessage, setSuccessMessage] =
        useState(false);

    const [calendarEvents, setCalendarEvents] =
    useState([]);   

    const [search, setSearch] =
    useState('');

const [editingAppointment,
    setEditingAppointment] =
    useState(null);

    useEffect(() => {

        loadAppointments();

    }, []);

    const loadAppointments = async () => {

        try {

            const data =
                await getAppointments();

            setAppointments(data);
const events = data.map((appointment) => ({

    id: appointment.id,

    title: appointment.full_name,

    start: new Date(
        `${appointment.appointment_date.split('T')[0]} ${appointment.appointment_time}`
    ),

    allDay: false

}));

setCalendarEvents(events);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const handleCreateAppointment =
async (appointmentData) => {

    try {

        await createAppointment(
            appointmentData
        );

        await loadAppointments();

        setOpenDialog(false);

        setSuccessMessage(true);

    } catch (error) {

        console.error(error);

    }

};

const handleDeleteAppointment =
async (id) => {

    const confirmDelete =
        window.confirm(
            '¿Desea eliminar esta cita?'
        );

    if (!confirmDelete) return;

    try {

        await deleteAppointment(id);

        await loadAppointments();

    } catch (error) {

        console.error(error);

    }

};

const handleEditAppointment =
(appointment) => {

    console.log(appointment);

    setEditingAppointment(
        appointment
    );

    setOpenDialog(true);

};

const handleUpdateAppointment =
async (appointmentData) => {

    try {

        await updateAppointment(
            editingAppointment.id,
            appointmentData
        );

        await loadAppointments();

        setEditingAppointment(
            null
        );

        setOpenDialog(false);

    } catch (error) {

        console.error(error);

    }

};

    const stats = [

        {
            title: 'Citas Hoy',
            value:appointments.filter(
        appointment => {

           const today =
    new Date()
        .toLocaleDateString(
            'en-CA'
        );

            return (
                appointment
                    .appointment_date
                    ?.split('T')[0]
                === today
            );

        }
    ).length,
            icon:
                <EventIcon sx={{ fontSize: 42 }} />,
            color:
                'linear-gradient(135deg,#38BDF8,#0EA5E9)'
        },

        {
            title: 'Confirmadas',
            value:
                appointments.filter(
                    a =>
                        a.status === 'CONFIRMADA'
                ).length,

            icon:
                <CheckCircleIcon
                    sx={{ fontSize: 42 }}
                />,

            color:
                'linear-gradient(135deg,#22C55E,#16A34A)'
        },

        {
            title: 'Pendientes',
            value:
                appointments.filter(
                    a =>
                        a.status === 'PENDIENTE'
                ).length,

            icon:
                <PendingActionsIcon
                    sx={{ fontSize: 42 }}
                />,

            color:
                'linear-gradient(135deg,#F59E0B,#D97706)'
        },

        {
            title: 'Canceladas',
            value:
                appointments.filter(
                    a =>
                        a.status === 'CANCELADA'
                ).length,

            icon:
                <CancelIcon
                    sx={{ fontSize: 42 }}
                />,

            color:
                'linear-gradient(135deg,#EF4444,#DC2626)'
        }

    ];

    const filteredAppointments =
appointments.filter(
    (appointment) => {

        const text =
            search.toLowerCase();

        return (

            appointment.full_name
                ?.toLowerCase()
                .includes(text)

            ||

            appointment.reason
                ?.toLowerCase()
                .includes(text)

            ||

            appointment.status
                ?.toLowerCase()
                .includes(text)

        );

    }
);

const sortedAppointments =
    [...filteredAppointments]
        .sort((a, b) => {

            const dateA =
                new Date(
                    `${a.appointment_date} ${a.appointment_time}`
                );

            const dateB =
                new Date(
                    `${b.appointment_date} ${b.appointment_time}`
                );

            return dateA - dateB;

        });

const now = new Date();

const today =
    `${now.getFullYear()}-${
        String(now.getMonth() + 1)
            .padStart(2, '0')
    }-${
        String(now.getDate())
            .padStart(2, '0')
    }`;

const todayAppointments =
    appointments.filter(
        appointment =>
            appointment.appointment_date
                ?.split('T')[0] === today
    );
    return (

        <MainLayout>

            {/* HEADER */}
<Box
    sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        mb: 6
    }}
>
    <Box>

        <Typography
            variant="h3"
            fontWeight={700}
            color="#0F172A"
        >
            Agenda de Citas
        </Typography>

        <Typography
            variant="h6"
            color="text.secondary"
        >
            Gestión completa de citas odontológicas
        </Typography>

    </Box>

    <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpenDialog(true)}
        sx={{
            borderRadius: 3,
            px: 4,
            py: 1.5,
            fontWeight: 700,
            mt: 1
        }}
    >
        Nueva Cita
    </Button>

</Box>

            {/* KPIS */}

           <Grid
    container
    spacing={3}
    sx={{
        mt: 3,
        mb: 6
    }}
>

                {stats.map((stat) => (

                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        key={stat.title}
                    >

                        <Card
                            sx={{
                                background: stat.color,
                                color: '#fff',
                                borderRadius: 5,
                                boxShadow:
                                    '0 10px 30px rgba(0,0,0,0.15)'
                            }}
                        >

                            <CardContent
                                sx={{
                                    display: 'flex',
                                    justifyContent:
                                        'space-between',
                                    alignItems:
                                        'center'
                                }}
                            >

                                <Box>

                                    <Typography>
                                        {stat.title}
                                    </Typography>

                                    <Typography
                                        variant="h3"
                                        fontWeight={700}
                                    >
                                        {stat.value}
                                    </Typography>

                                </Box>

                                {stat.icon}

                            </CardContent>

                        </Card>

                    </Grid>

                ))}

            </Grid>
{/* TABLA + CALENDARIO */}

<Grid
    container
    spacing={4}
    sx={{
        mt: 3
    }}
>

    {/* PANEL IZQUIERDO */}

    <Grid
        item
        xs={12}
        lg={8}
    >

        <Paper
            sx={{
                p: 4,
                borderRadius: 5,
                height: '100%'
            }}
        >

            <TextField
                fullWidth
                label="Buscar paciente o cita"
                value={search}
                onChange={(e) =>
                    setSearch(
                        e.target.value
                    )
                }
                sx={{
                    mb: 4
                }}
            />

            <Typography
                variant="h5"
                fontWeight={700}
                mb={3}
            >
                Próximas Citas
            </Typography>

            <Box
                sx={{
                    overflowX: 'auto',
                    width: '100%'
                }}
            >

                <table
                    style={{
                        width: '100%',
                         tableLayout: 'fixed',
                        borderCollapse: 'collapse'
                    }}
                >

                    <thead>

                        <tr
                            style={{
                                background: '#F1F5F9'
                            }}
                        >

                            <th style={{ padding: '16px', textAlign: 'left' }}>
                                Paciente
                            </th>

                            <th style={{ padding: '16px', textAlign: 'left' }}>
                                Tratamiento
                            </th>

                            <th style={{ padding: '16px', textAlign: 'left' }}>
                                Fecha
                            </th>

                            <th style={{ padding: '16px', textAlign: 'left' }}>
                                Hora
                            </th>

                            <th style={{ padding: '16px', textAlign: 'left' }}>
                                Estado
                            </th>

                            <th style={{ padding: '16px', textAlign: 'left' }}>
                                Acciones
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredAppointments.map(
                            (appointment) => (

                                <tr
                                    key={appointment.id}
                                >

                                    <td style={{ padding: '16px' }}>
                                        {appointment.full_name}
                                    </td>

                                    <td style={{ padding: '16px' }}>
                                        {appointment.reason}
                                    </td>

                                    <td style={{ padding: '16px' }}>
                                        {new Date(
                                            appointment.appointment_date
                                        ).toLocaleDateString('es-NI')}
                                    </td>

                                    <td style={{ padding: '16px' }}>
    {new Date(
        `2000-01-01T${appointment.appointment_time}`
    ).toLocaleTimeString(
        'en-US',
        {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        }
    )}
</td>

                                    <td style={{ padding: '16px' }}>

                                        <Chip
                                            label={appointment.status}
                                            color={
                                                appointment.status === 'CONFIRMADA'
                                                    ? 'success'
                                                    : appointment.status === 'PENDIENTE'
                                                    ? 'warning'
                                                    : 'error'
                                            }
                                        />

                                    </td>

                                    <td style={{ padding: '16px' }}>

                                        <IconButton
                                            color="primary"
                                            onClick={() =>
                                                handleEditAppointment(
                                                    appointment
                                                )
                                            }
                                        >
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton
                                            color="error"
                                            onClick={() =>
                                                handleDeleteAppointment(
                                                    appointment.id
                                                )
                                            }
                                        >
                                            <DeleteIcon />
                                        </IconButton>

                                    </td>

                                </tr>

                            )
                        )}

                    </tbody>

                </table>

            </Box>

        </Paper>

    </Grid>

    {/* PANEL DERECHO */}

    <Grid
        item
        xs={12}
        lg={4}
    >

        {/* CALENDARIO */}

       <Paper
    sx={{
        p: 3,
        borderRadius: 5,
        width: '100%'
    }}
>

            <Typography
                variant="h6"
                fontWeight={700}
                mb={2}
            >
                Calendario
            </Typography>

          <Box
    sx={{
        width: '100%',

        '.fc': {
            width: '100%',
            fontSize: '14px'
        },

        '.fc-view-harness': {
            minHeight: '550px'
        },

        '.fc-scrollgrid': {
            width: '100% !important'
        },

        '.fc-toolbar-title': {
            fontSize: '18px',
            fontWeight: 700
        },

        '.fc-daygrid-event': {
            fontSize: '12px'
        },

        '.fc-daygrid-event-harness': {
            marginBottom: '2px'
        },

        '.fc-button': {
            backgroundColor: '#38BDF8',
            border: 'none'
        },

        '.fc-button:hover': {
            backgroundColor: '#0EA5E9'
        }
    }}
>

           <FullCalendar
    plugins={[
        dayGridPlugin,
        interactionPlugin
    ]}
    initialView="dayGridMonth"
    height="auto"
    contentHeight={500}
    expandRows={true}
    events={calendarEvents}
    dayMaxEvents={3}
    eventTimeFormat={{
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }}
/>

            </Box>

        </Paper>

        {/* AGENDA DE HOY */}

        <Paper
            sx={{
                mt: 3,
                p: 3,
                borderRadius: 5
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                mb={2}
            >
                Agenda de Hoy
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {todayAppointments.length > 0 ? (

                todayAppointments.map(
                    (appointment) => (

                        <Box
                            key={appointment.id}
                            sx={{
                                mb: 2,
                                p: 2,
                                borderRadius: 2,
                                backgroundColor: '#F8FAFC'
                            }}
                        >

                            <Typography
                                fontWeight={700}
                            >
                                {new Date(
    `2000-01-01T${appointment.appointment_time}`
).toLocaleTimeString(
    'en-US',
    {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }
)}
                            </Typography>

                            <Typography
                                variant="body2"
                            >
                                {appointment.full_name}
                            </Typography>

                        </Box>

                    )
                )

            ) : (

                <Typography
                    color="text.secondary"
                >
                    No hay citas programadas para hoy.
                </Typography>

            )}

        </Paper>

    </Grid>

</Grid>

 <AppointmentDialog
    open={openDialog}

    appointment={
        editingAppointment
    }

    onClose={() => {

        setOpenDialog(false);

        setEditingAppointment(
            null
        );

    }}

    onSave={
        editingAppointment
            ? handleUpdateAppointment
            : handleCreateAppointment
    }
/>

        </MainLayout>

    );

}