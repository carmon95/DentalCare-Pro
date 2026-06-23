import {
    Typography,
    Paper,
    Box,
    Button,
    TextField,
    Snackbar,
    Alert
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DescriptionIcon from '@mui/icons-material/Description';


import { DataGrid } from '@mui/x-data-grid';

import MainLayout from '../layouts/MainLayout';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    getPatients,
    createPatient,
    deletePatient,
    updatePatient
} from '../services/patientService';

import PatientDialog from '../components/PatientDialog';

export default function Patients() {

    const navigate = useNavigate();

    const [patients, setPatients] = useState([]);

    const [search, setSearch] = useState('');

    const [loading, setLoading] = useState(true);

    const [openDialog, setOpenDialog] =
        useState(false);

    const [selectedPatient, setSelectedPatient] =
    useState(null);

    const [isEditing, setIsEditing] =
    useState(false);

    const [successMessage, setSuccessMessage] =
    useState(false);

    const [errorMessage, setErrorMessage] =
    useState(false);

    useEffect(() => {

        loadPatients();

    }, []);

    const loadPatients = async () => {

        try {

            const data =
                await getPatients();

            setPatients(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const handleCreatePatient = async (
    patientData
) => {

    try {

        if (isEditing) {

            await updatePatient(
                selectedPatient.id,
                patientData
            );

        } else {

            await createPatient(
                patientData
            );

        }

        await loadPatients();

        setOpenDialog(false);

        setSelectedPatient(null);

        setIsEditing(false);

        setSuccessMessage(true);

    } catch (error) {

        console.error(error);

        setErrorMessage(true);

    }

};

    const handleDeletePatient = async (id) => {

    const confirmDelete = window.confirm(
        '¿Desea eliminar este paciente?'
    );

    if (!confirmDelete) return;

    try {

        await deletePatient(id);

        await loadPatients();

    } catch (error) {

        console.error(error);

        alert(
            'Error al eliminar paciente'
        );

    }

};

const handleEditPatient = (
    patient
) => {

    setSelectedPatient(patient);

    setIsEditing(true);

    setOpenDialog(true);

};

    const columns = [

        {
            field: 'full_name',
            headerName: 'Nombre',
            flex: 1
        },

        {
            field: 'phone',
            headerName: 'Teléfono',
            flex: 1
        },

        {
            field: 'email',
            headerName: 'Correo',
            flex: 1
        },

        {
            field: 'allergies',
            headerName: 'Alergias',
            flex: 1
        }

        ,
{
    field: 'actions',
    headerName: 'Acciones',
    width: 220,

    sortable: false,

    renderCell: (params) => (

        <>

            <IconButton
                color="primary"
                onClick={() =>
                    handleEditPatient(
                        params.row
                    )
                }
            >
                <EditIcon />
            </IconButton>

            <IconButton
                color="error"
                onClick={() =>
                    handleDeletePatient(
                        params.row.id
                    )
                }
            >
                <DeleteIcon />
            </IconButton>

            <IconButton
    color="secondary"
    onClick={() =>
        navigate(
            `/patient-history/${params.row.id}`
        )
    }
>
    <DescriptionIcon />
</IconButton>

        </>

    )
}
    ];

    const filteredPatients =
    patients.filter(patient =>
        patient.full_name
            ?.toLowerCase()
            .includes(
                search.toLowerCase()
            )
    );

    return (

        <MainLayout>

            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
            >

                <Typography
                    variant="h4"
                    fontWeight={700}
                >
                    Pacientes
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                   onClick={() => {

                setSelectedPatient(null);
                setIsEditing(false);
                 setOpenDialog(true);
}}
                >
                    Nuevo Paciente
                </Button>

            </Box>

            <Paper
                sx={{
                    p: 3,
                    borderRadius: 4
                }}
            >
            <TextField
            fullWidth
            label="Buscar paciente"
            value={search}
            onChange={(e) =>
            setSearch(e.target.value)
            }
            sx={{
             mb: 3
            }}
            />
                <Box
                    sx={{
                        height: 500
                    }}
                >

                    <DataGrid
                        rows={filteredPatients}
                        columns={columns}
                        loading={loading}
                        pageSizeOptions={[
                            5,
                            10,
                            20
                        ]}
                    />

                </Box>

            </Paper>

          <PatientDialog
    open={openDialog}
    patient={selectedPatient}
    onClose={() =>
        setOpenDialog(false)
    }
    onSave={
        handleCreatePatient
    }
/>

        <Snackbar
    open={successMessage}
    autoHideDuration={3000}
    onClose={() =>
        setSuccessMessage(false)
    }
>

    <Alert
        severity="success"
        variant="filled"
    >
        Paciente creado correctamente
    </Alert>

</Snackbar>

<Snackbar
    open={errorMessage}
    autoHideDuration={3000}
    onClose={() =>
        setErrorMessage(false)
    }
>

    <Alert
        severity="error"
        variant="filled"
    >
        Error al crear paciente
    </Alert>

</Snackbar>
        </MainLayout>

    );

}