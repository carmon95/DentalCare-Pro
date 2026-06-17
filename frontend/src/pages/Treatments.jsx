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
    Snackbar,
    Alert
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import IconButton from '@mui/material/IconButton';

import MainLayout from '../layouts/MainLayout';

import {
    useState,
    useEffect
} from 'react';

import {
    getTreatments,
    createTreatment,
    updateTreatment,
    deleteTreatment
} from '../services/treatmentService';

import TreatmentDialog
from '../components/TreatmentDialog';

export default function Treatments() {

    const [treatments,
        setTreatments] =
        useState([]);

    const [loading,
        setLoading] =
        useState(true);

    const [search,
        setSearch] =
        useState('');

    const [openDialog,
        setOpenDialog] =
        useState(false);

    const [editingTreatment,
        setEditingTreatment] =
        useState(null);

    const [successMessage,
        setSuccessMessage] =
        useState(false);

    const [errorMessage,
        setErrorMessage] =
        useState(false);

    useEffect(() => {

        loadTreatments();

    }, []);

    const loadTreatments =
    async () => {

        try {

            const data =
                await getTreatments();

            setTreatments(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const handleCreateTreatment =
    async (treatmentData) => {

        try {

            await createTreatment(
                treatmentData
            );

            await loadTreatments();

            setOpenDialog(false);

            setSuccessMessage(true);

        } catch (error) {

            console.error(error);

            setErrorMessage(true);

        }

    };

    const handleEditTreatment =
    (treatment) => {

        setEditingTreatment(
            treatment
        );

        setOpenDialog(true);

    };

    const handleUpdateTreatment =
    async (treatmentData) => {

        try {

            await updateTreatment(
                editingTreatment.id,
                treatmentData
            );

            await loadTreatments();

            setEditingTreatment(
                null
            );

            setOpenDialog(false);

            setSuccessMessage(true);

        } catch (error) {

            console.error(error);

            setErrorMessage(true);

        }

    };

    const handleDeleteTreatment =
    async (id) => {

        const confirmDelete =
            window.confirm(
                '¿Desea eliminar este tratamiento?'
            );

        if (!confirmDelete) return;

        try {

            await deleteTreatment(id);

            await loadTreatments();

        } catch (error) {

            console.error(error);

        }

    };

    const filteredTreatments =
    treatments.filter(
        (treatment) => {

            const text =
                search.toLowerCase();

            return (

                treatment.full_name
                    ?.toLowerCase()
                    .includes(text)

                ||

                treatment.treatment_type
                    ?.toLowerCase()
                    .includes(text)

                ||

                treatment.status
                    ?.toLowerCase()
                    .includes(text)

            );

        }
    );

    const stats = [

        {
            title:
                'Total Tratamientos',

            value:
                treatments.length,

            icon:
                <MedicalServicesIcon
                    sx={{
                        fontSize: 42
                    }}
                />,

            color:
                'linear-gradient(135deg,#38BDF8,#0EA5E9)'
        },

        {
            title:
                'Pendientes',

            value:
                treatments.filter(
                    t =>
                        t.status ===
                        'PENDIENTE'
                ).length,

            icon:
                <PendingActionsIcon
                    sx={{
                        fontSize: 42
                    }}
                />,

            color:
                'linear-gradient(135deg,#F59E0B,#D97706)'
        },

        {
            title:
                'Finalizados',

            value:
                treatments.filter(
                    t =>
                        t.status ===
                        'FINALIZADO'
                ).length,

            icon:
                <CheckCircleIcon
                    sx={{
                        fontSize: 42
                    }}
                />,

            color:
                'linear-gradient(135deg,#22C55E,#16A34A)'
        },

        {
            title:
                'Cancelados',

            value:
                treatments.filter(
                    t =>
                        t.status ===
                        'CANCELADO'
                ).length,

            icon:
                <CancelIcon
                    sx={{
                        fontSize: 42
                    }}
                />,

            color:
                'linear-gradient(135deg,#EF4444,#DC2626)'
        }

    ];

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
                    Tratamientos
                </Typography>

                <Typography
                    variant="h6"
                    color="text.secondary"
                >
                    Gestión de tratamientos odontológicos
                </Typography>

            </Box>

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() =>
                    setOpenDialog(true)
                }
                sx={{
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    fontWeight: 700,
                    mt: 1
                }}
            >
                Nuevo Tratamiento
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

        {/* TABLA */}

        <Paper
            sx={{
                p: 4,
                borderRadius: 5
            }}
        >

            <TextField
                fullWidth
                label="Buscar tratamiento"
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
                Lista de Tratamientos
            </Typography>

            <Box
                sx={{
                    overflowX: 'auto'
                }}
            >

                <table
                    style={{
                        width: '100%',
                        borderCollapse:
                            'collapse'
                    }}
                >

                    <thead>

                        <tr
                            style={{
                                background:
                                    '#F1F5F9'
                            }}
                        >

                            <th style={{ padding: '16px', textAlign: 'left' }}>
                                Paciente
                            </th>

                            <th style={{ padding: '16px', textAlign: 'left' }}>
                                Tratamiento
                            </th>

                        <th style={{ padding: '16px', textAlign: 'left' }}>
                            Inicio
                        </th>

                        <th style={{ padding: '16px', textAlign: 'left' }}>
                            Fin
                        </th>

                            <th style={{ padding: '16px', textAlign: 'left' }}>
                                Costo
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

                        {filteredTreatments.map(
                            (
                                treatment
                            ) => (

                                <tr
                                    key={
                                        treatment.id
                                    }
                                >

                                    <td style={{ padding: '16px' }}>
                                        {
                                            treatment.full_name
                                        }
                                    </td>

                                    <td style={{ padding: '16px' }}>
                                        {
                                            treatment.treatment_type
                                        }
                                    </td>

                                  <td style={{ padding: '16px' }}>
                                    {
                                        treatment.start_date
                                            ? new Date(
                                                treatment.start_date
                                            ).toLocaleDateString(
                                                'es-NI'
                                            )
                                            : '-'
                                    }
                                </td>

                                <td style={{ padding: '16px' }}>
                                    {
                                        treatment.end_date
                                            ? new Date(
                                                treatment.end_date
                                            ).toLocaleDateString(
                                                'es-NI'
                                            )
                                            : '-'
                                    }
                                </td>

                                   <td style={{ padding: '16px' }}>
                                        $
                                        {Number(
                                            treatment.cost
                                        ).toFixed(2)}
                                    </td>

                                    <td style={{ padding: '16px' }}>

                                        <Chip
                                            label={
                                                treatment.status
                                            }
                                            color={
                                                treatment.status === 'FINALIZADO'
                                                    ? 'success'
                                                    : treatment.status === 'PENDIENTE'
                                                    ? 'warning'
                                                    : treatment.status === 'EN PROCESO'
                                                    ? 'info'
                                                    : 'error'
                                            }
                                        />

                                    </td>

                                    <td style={{ padding: '16px' }}>

                                        <IconButton
                                            color="primary"
                                            onClick={() =>
                                                handleEditTreatment(
                                                    treatment
                                                )
                                            }
                                        >
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton
                                            color="error"
                                            onClick={() =>
                                                handleDeleteTreatment(
                                                    treatment.id
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

        <TreatmentDialog
            open={openDialog}
            treatment={
                editingTreatment
            }
            onClose={() => {

                setOpenDialog(
                    false
                );

                setEditingTreatment(
                    null
                );

            }}
            onSave={
                editingTreatment
                    ? handleUpdateTreatment
                    : handleCreateTreatment
            }
        />

        <Snackbar
            open={successMessage}
            autoHideDuration={3000}
            onClose={() =>
                setSuccessMessage(
                    false
                )
            }
        >

            <Alert
                severity="success"
                variant="filled"
            >
                Operación realizada correctamente
            </Alert>

        </Snackbar>

        <Snackbar
            open={errorMessage}
            autoHideDuration={3000}
            onClose={() =>
                setErrorMessage(
                    false
                )
            }
        >

            <Alert
                severity="error"
                variant="filled"
            >
                Ocurrió un error
            </Alert>

        </Snackbar>

    </MainLayout>

);

}
