import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    MenuItem
} from '@mui/material';

import Box from '@mui/material/Box';

import {
    useEffect,
    useState
} from 'react';

import {
    getPatients
} from '../services/patientService';

export default function TreatmentDialog({
    open,
    onClose,
    onSave,
    treatment
}) {

    const [patients, setPatients] =
        useState([]);

    const [formData, setFormData] =
        useState({
            patient_id: '',
            treatment_type: '',
            start_date: '',
            end_date: '',
            cost: '',
            status: 'PENDIENTE',
            notes: ''
        });

    useEffect(() => {

        loadPatients();

    }, []);

    useEffect(() => {

        if (
            treatment &&
            patients.length > 0
        ) {

            setFormData({

                patient_id:
                    String(
                        treatment.patient_id
                    ),

                treatment_type:
                    treatment.treatment_type || '',

                start_date:
                    treatment.start_date
                        ?.split('T')[0] || '',

                end_date:
                    treatment.end_date
                        ?.split('T')[0] || '',

                cost:
                    treatment.cost || '',

                status:
                    treatment.status || 'PENDIENTE',

                notes:
                    treatment.notes || ''

            });

        }

    }, [treatment, patients]);

    const loadPatients = async () => {

        try {

            const data =
                await getPatients();

            setPatients(data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value

        });

    };

    const handleSave = () => {

        onSave({

            ...formData,

            patient_id:
                Number(
                    formData.patient_id
                ),

            cost:
                Number(
                    formData.cost
                )

        });

        setFormData({

            patient_id: '',
            treatment_type: '',
            start_date: '',
            end_date: '',
            cost: '',
            status: 'PENDIENTE',
            notes: ''

        });

    };

    return (

        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    minHeight: 500
                }
            }}
        >

            <DialogTitle>

                {treatment
                    ? 'Editar Tratamiento'
                    : 'Nuevo Tratamiento'}

            </DialogTitle>

            <DialogContent>

                <Grid
                    container
                    spacing={2}
                    sx={{ mt: 1 }}
                >

                    <Box
                        sx={{
                            width: '100%',
                            mb: 2
                        }}
                    >

                        <TextField
                            select
                            fullWidth
                            label="Paciente"
                            name="patient_id"
                            value={formData.patient_id}
                            onChange={handleChange}
                        >

                            {patients.map(
                                (patient) => (

                                    <MenuItem
                                        key={patient.id}
                                        value={String(patient.id)}
                                    >
                                        {patient.full_name}
                                    </MenuItem>

                                )
                            )}

                        </TextField>

                    </Box>

                    <Grid item xs={12} md={6}>

                        <TextField
                            fullWidth
                            label="Tratamiento"
                            name="treatment_type"
                            value={formData.treatment_type}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid item xs={12} md={3}>

                        <TextField
                            fullWidth
                            type="date"
                            name="start_date"
                            value={formData.start_date}
                            onChange={handleChange}
                            helperText="Fecha de inicio"
                        />

                    </Grid>

                    <Grid item xs={12} md={3}>

                        <TextField
                            fullWidth
                            type="date"
                            name="end_date"
                            value={formData.end_date}
                            onChange={handleChange}
                            helperText="Fecha de finalización"
                        />

                    </Grid>

                    <Grid item xs={12} md={4}>

                        <TextField
                            fullWidth
                            type="number"
                            label="Costo"
                            name="cost"
                            value={formData.cost}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid item xs={12} md={4}>

                        <TextField
                            select
                            fullWidth
                            label="Estado"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >

                            <MenuItem value="PENDIENTE">
                                Pendiente
                            </MenuItem>

                            <MenuItem value="EN PROCESO">
                                En Proceso
                            </MenuItem>

                            <MenuItem value="FINALIZADO">
                                Finalizado
                            </MenuItem>

                            <MenuItem value="CANCELADO">
                                Cancelado
                            </MenuItem>

                        </TextField>

                    </Grid>

                    <Grid item xs={12}>

                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Observaciones"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                        />

                    </Grid>

                </Grid>

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onClose}
                >
                    Cancelar
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSave}
                >

                    {treatment
                        ? 'Actualizar Tratamiento'
                        : 'Guardar Tratamiento'}

                </Button>

            </DialogActions>

        </Dialog>

    );

}