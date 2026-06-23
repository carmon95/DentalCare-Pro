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

export default function ClinicalHistoryDialog({
    open,
    onClose,
    onSave,
    history
}) {

    const [patients, setPatients] =
        useState([]);

    const [formData, setFormData] =
        useState({
            patient_id: '',
            chief_complaint: '',
            medical_history: '',
            allergies: '',
            current_medications: '',
            diagnosis: '',
            treatment_plan: '',
            blood_pressure: '',
            weight: '',
            notes: ''
        });

    useEffect(() => {

        loadPatients();

    }, []);

    useEffect(() => {

        if (
            history &&
            patients.length > 0
        ) {

            setFormData({

                patient_id:
                    String(
                        history.patient_id
                    ),

                chief_complaint:
                    history.chief_complaint || '',

                medical_history:
                    history.medical_history || '',

                allergies:
                    history.allergies || '',

                current_medications:
                    history.current_medications || '',

                diagnosis:
                    history.diagnosis || '',

                treatment_plan:
                    history.treatment_plan || '',

                blood_pressure:
                    history.blood_pressure || '',

                weight:
                    history.weight || '',

                notes:
                    history.notes || ''

            });

        }

    }, [history, patients]);

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

            weight:
                Number(
                    formData.weight || 0
                )

        });

        setFormData({

            patient_id: '',
            chief_complaint: '',
            medical_history: '',
            allergies: '',
            current_medications: '',
            diagnosis: '',
            treatment_plan: '',
            blood_pressure: '',
            weight: '',
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
                    borderRadius: 4
                }
            }}
        >

            <DialogTitle>

                {history
                    ? 'Editar Historial Clínico'
                    : 'Nuevo Historial Clínico'}

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

                    <Grid item xs={12}>

                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Motivo de Consulta"
                            name="chief_complaint"
                            value={formData.chief_complaint}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid item xs={12}>

                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Antecedentes Médicos"
                            name="medical_history"
                            value={formData.medical_history}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid item xs={12}>

                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Alergias"
                            name="allergies"
                            value={formData.allergies}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid item xs={12}>

                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Medicamentos Actuales"
                            name="current_medications"
                            value={formData.current_medications}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid item xs={12}>

                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Diagnóstico"
                            name="diagnosis"
                            value={formData.diagnosis}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid item xs={12}>

                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Plan de Tratamiento"
                            name="treatment_plan"
                            value={formData.treatment_plan}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid item xs={12} md={6}>

                        <TextField
                            fullWidth
                            label="Presión Arterial"
                            name="blood_pressure"
                            value={formData.blood_pressure}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid item xs={12} md={6}>

                        <TextField
                            fullWidth
                            type="number"
                            label="Peso (kg)"
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid item xs={12}>

                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Notas"
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

                    {history
                        ? 'Actualizar Historial'
                        : 'Guardar Historial'}

                </Button>

            </DialogActions>

        </Dialog>

    );

}