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

import {
    useEffect,
    useState
} from 'react';

import {
    getTreatments
} from '../services/treatmentService';

export default function PaymentDialog({
    open,
    onClose,
    onSave,
    payment
}) {

    const [treatments, setTreatments] =
        useState([]);

    const [formData, setFormData] =
        useState({
            treatment_id: '',
            amount: '',
            payment_date: '',
            payment_method: 'EFECTIVO',
            notes: ''
        });

    useEffect(() => {

        loadTreatments();

    }, []);

    useEffect(() => {

        if (payment) {

            setFormData({

                treatment_id:
                    String(
                        payment.treatment_id
                    ),

                amount:
                    payment.amount || '',

                payment_date:
                    payment.payment_date
                        ?.split('T')[0] || '',

                payment_method:
                    payment.payment_method || 'EFECTIVO',

                notes:
                    payment.notes || ''

            });

        }

    }, [payment]);

    const loadTreatments = async () => {

        try {

            const data =
                await getTreatments();

            setTreatments(data);

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

            treatment_id:
                Number(
                    formData.treatment_id
                ),

            amount:
                Number(
                    formData.amount
                )

        });

    };

    return (

        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >

            <DialogTitle>

                {
                    payment
                        ? 'Editar Pago'
                        : 'Nuevo Pago'
                }

            </DialogTitle>

            <DialogContent>

                <Grid
                    container
                    spacing={2}
                    sx={{ mt: 1 }}
                >

                    <Grid item xs={12}>

                        <TextField
                            select
                            fullWidth
                            label="Tratamiento"
                            name="treatment_id"
                            value={formData.treatment_id}
                            onChange={handleChange}
                        >

                            {treatments.map(
                                treatment => (

                                    <MenuItem
                                        key={treatment.id}
                                        value={String(treatment.id)}
                                    >
                                        {treatment.full_name}
                                        {' - '}
                                        {treatment.treatment_type}
                                    </MenuItem>

                                )
                            )}

                        </TextField>

                    </Grid>

                    <Grid item xs={12} md={4}>

                        <TextField
                            fullWidth
                            type="number"
                            label="Monto"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid item xs={12} md={4}>

                        <TextField
                            fullWidth
                            type="date"
                            name="payment_date"
                            value={formData.payment_date}
                            onChange={handleChange}
                            helperText="Fecha de pago"
                        />

                    </Grid>

                    <Grid item xs={12} md={4}>

                        <TextField
                            select
                            fullWidth
                            label="Método"
                            name="payment_method"
                            value={formData.payment_method}
                            onChange={handleChange}
                        >

                            <MenuItem value="EFECTIVO">
                                Efectivo
                            </MenuItem>

                            <MenuItem value="TRANSFERENCIA">
                                Transferencia
                            </MenuItem>

                            <MenuItem value="TARJETA">
                                Tarjeta
                            </MenuItem>

                        </TextField>

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
                    {
                        payment
                            ? 'Actualizar Pago'
                            : 'Guardar Pago'
                    }
                </Button>

            </DialogActions>

        </Dialog>

    );

}