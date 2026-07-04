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

export default function AppointmentDialog({
    open,
    onClose,
    onSave,
    appointment
}) {

    const [patients, setPatients] =
        useState([]);

    const [formData, setFormData] =
    useState({
        patient_id: '',
        appointment_date: '',
        appointment_time: '',
        reason: '',
        status: 'PENDIENTE',
        notes: ''
    });

useEffect(() => {

    loadPatients();

}, []);

useEffect(() => {

    if (
        appointment &&
        patients.length > 0
    ) {

        setFormData({

            patient_id:
                String(
                    appointment.patient_id
                ),

            appointment_date:
                appointment.appointment_date
                    ?.split('T')[0] || '',

            appointment_time:
                appointment.appointment_time
                    ?.substring(0, 5) || '',

            reason:
                appointment.reason || '',

            status:
                appointment.status || 'PENDIENTE',

            notes:
                appointment.notes || ''

        });

    }

}, [appointment, patients]);

    const loadPatients = async () => {

        try {
const data =
    await getPatients();

setPatients(

    data.filter(

        patient =>

            patient.status ===
            'ACTIVO'

    )

);

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
    patient_id: Number(
        formData.patient_id
    )
});

        setFormData({
            patient_id: '',
            appointment_date: '',
            appointment_time: '',
            reason: '',
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

    {appointment
        ? 'Editar Cita'
        : 'Nueva Cita'}

</DialogTitle>

            <DialogContent>

    <Grid
        container
        spacing={2}
        sx={{ mt: 1 }}
    >

        {/* PACIENTE */}

    <Box sx={{ width: '100%', mb: 2 }}>

  <TextField
    select
    fullWidth
    displayEmpty
    label="Paciente"
    name="patient_id"
    value={formData.patient_id}
    onChange={handleChange}
>

        {patients.map((patient) => (

            <MenuItem
    key={patient.id}
    value={String(patient.id)}
>
                {patient.full_name}
            </MenuItem>

        ))}

    </TextField>

</Box>

        {/* FECHA */}

        <Grid item xs={12} md={3}>

            <TextField
                fullWidth
                type="date"
                name="appointment_date"
                value={formData.appointment_date}
                onChange={handleChange}
                helperText="Fecha de la cita"
            />

        </Grid>

        {/* HORA */}

        <Grid item xs={12} md={3}>

            <TextField
                fullWidth
                type="time"
                name="appointment_time"
                value={formData.appointment_time}
                onChange={handleChange}
                helperText="Hora de la cita"
            />

        </Grid>

        {/* MOTIVO */}

        <Grid item xs={12}>

            <TextField
                fullWidth
                label="Motivo"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
            />

        </Grid>

        {/* ESTADO */}

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

                <MenuItem value="CONFIRMADA">
                    Confirmada
                </MenuItem>

                <MenuItem value="CANCELADA">
                    Cancelada
                </MenuItem>

            </TextField>

        </Grid>

        {/* NOTAS */}

        <Grid item xs={12} md={8}>

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

    {appointment
        ? 'Actualizar Cita'
        : 'Guardar Cita'}

</Button>

            </DialogActions>

        </Dialog>

    );

}