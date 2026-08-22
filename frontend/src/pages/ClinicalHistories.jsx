import {
    Typography,
    Paper,
    Box,
    Button,
    TextField,
    Grid,
    Card,
    CardContent,
    Snackbar,
    Alert
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import IconButton from '@mui/material/IconButton';

import MainLayout from '../layouts/MainLayout';

import {
    useState,
    useEffect
} from 'react';

import {
    getClinicalHistories,
    createClinicalHistory,
    updateClinicalHistory,
    deleteClinicalHistory
} from '../services/clinicalHistoryService';

import ClinicalHistoryDialog
from '../components/ClinicalHistoryDialog';

export default function ClinicalHistories() {

    const [histories,
        setHistories] =
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

    const [editingHistory,
        setEditingHistory] =
        useState(null);

    const [successMessage,
        setSuccessMessage] =
        useState(false);

    const [errorMessage,
        setErrorMessage] =
        useState(false);

    useEffect(() => {

        loadHistories();

    }, []);

    const loadHistories =
    async () => {

        try {

            const data =
                await getClinicalHistories();

            setHistories(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const handleCreateHistory =
    async (historyData) => {

        try {

            await createClinicalHistory(
                historyData
            );

            await loadHistories();

            setOpenDialog(false);

            setSuccessMessage(true);

        } catch (error) {

            console.error(error);

            setErrorMessage(true);

        }

    };

    const handleEditHistory =
    (history) => {

        setEditingHistory(
            history
        );

        setOpenDialog(true);

    };

    const handleUpdateHistory =
    async (historyData) => {

        try {

            await updateClinicalHistory(
                editingHistory.id,
                historyData
            );

            await loadHistories();

            setEditingHistory(
                null
            );

            setOpenDialog(false);

            setSuccessMessage(true);

        } catch (error) {

            console.error(error);

            setErrorMessage(true);

        }

    };

    const handleDeleteHistory =
    async (id) => {

        const confirmDelete =
            window.confirm(
                '¿Desea eliminar este historial clínico?'
            );

        if (!confirmDelete) return;

        try {

            await deleteClinicalHistory(id);

            await loadHistories();

        } catch (error) {

            console.error(error);

        }

    };

    const filteredHistories =
    histories.filter(
        (history) => {

            const text =
                search.toLowerCase();

            return (

                history.full_name
                    ?.toLowerCase()
                    .includes(text)

                ||

                history.diagnosis
                    ?.toLowerCase()
                    .includes(text)

                ||

                history.chief_complaint
                    ?.toLowerCase()
                    .includes(text)

            );

        }
    );

    const stats = [

        {
            title:
                'Historiales',

            value:
                histories.length,

            icon:
                <DescriptionIcon
                    sx={{
                        fontSize: 42
                    }}
                />,

            color:
                'linear-gradient(135deg,#38BDF8,#0EA5E9)'
        },

        {
            title:
                'Diagnósticos',

            value:
                histories.filter(
                    h =>
                        h.diagnosis
                ).length,

            icon:
                <MedicalServicesIcon
                    sx={{
                        fontSize: 42
                    }}
                />,

            color:
                'linear-gradient(135deg,#22C55E,#16A34A)'
        },

        {
            title:
                'Antecedentes',

            value:
                histories.filter(
                    h =>
                        h.medical_history
                ).length,

            icon:
                <MonitorHeartIcon
                    sx={{
                        fontSize: 42
                    }}
                />,

            color:
                'linear-gradient(135deg,#F59E0B,#D97706)'
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
                    Historial Clínico
                </Typography>

                <Typography
                    variant="h6"
                    color="text.secondary"
                >
                    Gestión integral de historiales clínicos
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
                Nuevo Historial
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
                    md={4}
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
                label="Buscar historial clínico"
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
                Historiales Registrados
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
                                Motivo Consulta
                            </th>

                            <th style={{ padding: '16px', textAlign: 'left' }}>
                                Diagnóstico
                            </th>

                            <th style={{ padding: '16px', textAlign: 'left' }}>
                                Presión
                            </th>

                            <th style={{ padding: '16px', textAlign: 'left' }}>
                                Peso
                            </th>

                            <th style={{ padding: '16px', textAlign: 'left' }}>
                                Acciones
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredHistories.map(
                            (history) => (

                                <tr
                                    key={history.id}
                                >

                                    <td style={{ padding: '16px' }}>
                                        {history.full_name}
                                    </td>

                                    <td style={{ padding: '16px' }}>
                                        {history.chief_complaint}
                                    </td>

                                    <td style={{ padding: '16px' }}>
                                        {history.diagnosis}
                                    </td>

                                    <td style={{ padding: '16px' }}>
                                        {history.blood_pressure}
                                    </td>

                                    <td style={{ padding: '16px' }}>
                                        {history.weight}
                                        {' '}kg
                                    </td>

                                    <td style={{ padding: '16px' }}>

                                        <IconButton
                                            color="primary"
                                            onClick={() =>
                                                handleEditHistory(
                                                    history
                                                )
                                            }
                                        >
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton
                                            color="error"
                                            onClick={() =>
                                                handleDeleteHistory(
                                                    history.id
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

        <ClinicalHistoryDialog
            open={openDialog}
            history={
                editingHistory
            }
            onClose={() => {

                setOpenDialog(
                    false
                );

                setEditingHistory(
                    null
                );

            }}
            onSave={
                editingHistory
                    ? handleUpdateHistory
                    : handleCreateHistory
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