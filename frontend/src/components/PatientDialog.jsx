import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid
} from '@mui/material';

import {
    useState,
    useEffect
} from 'react';

export default function PatientDialog({
    open,
    onClose,
    onSave,
    patient = null
}) {

    const [formData, setFormData] = useState({
        full_name: '',
        birth_date: '',
        phone: '',
        address: '',
        email: '',
        allergies: '',
        medical_conditions: '',
        notes: ''
    });

    useEffect(() => {

        if (patient) {

            setFormData({
                full_name: patient.full_name || '',
                birth_date: patient.birth_date
                    ? patient.birth_date.substring(0, 10)
                    : '',
                phone: patient.phone || '',
                address: patient.address || '',
                email: patient.email || '',
                allergies: patient.allergies || '',
                medical_conditions:
                    patient.medical_conditions || '',
                notes: patient.notes || ''
            });

        } else {

            setFormData({
                full_name: '',
                birth_date: '',
                phone: '',
                address: '',
                email: '',
                allergies: '',
                medical_conditions: '',
                notes: ''
            });

        }

    }, [patient, open]);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSave = () => {

        onSave(formData);

    };

    return (

        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >

            <DialogTitle>

                {patient
                    ? 'Editar Paciente'
                    : 'Nuevo Paciente'}

            </DialogTitle>

            <DialogContent>

                <Grid
                    container
                    spacing={2}
                    sx={{ mt: 1 }}
                >

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Nombre Completo"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            type="date"
                            name="birth_date"
                            value={formData.birth_date}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Teléfono"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Correo"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Dirección"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Alergias"
                            name="allergies"
                            value={formData.allergies}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Condiciones Médicas"
                            name="medical_conditions"
                            value={formData.medical_conditions}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
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
                    Guardar
                </Button>

            </DialogActions>

        </Dialog>

    );

}