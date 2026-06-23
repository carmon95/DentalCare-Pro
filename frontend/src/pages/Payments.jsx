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
import PaymentsIcon from '@mui/icons-material/Payments';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import IconButton from '@mui/material/IconButton';

import MainLayout from '../layouts/MainLayout';

import {
    useState,
    useEffect
} from 'react';

import {
    getPayments,
    createPayment,
    updatePayment,
    deletePayment,
    getPaymentsSummary
} from '../services/paymentService';

import PaymentDialog
from '../components/PaymentDialog';

export default function Payments() {

    const [payments,
        setPayments] =
        useState([]);

    const [paymentSummary,
    setPaymentSummary] =
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

    const [editingPayment,
        setEditingPayment] =
        useState(null);

    const [successMessage,
        setSuccessMessage] =
        useState(false);

    const [errorMessage,
        setErrorMessage] =
        useState(false);

    useEffect(() => {

        loadPayments();

         loadPaymentSummary();

    }, []);

    const loadPaymentSummary =
async () => {

    try {

        const data =
            await getPaymentsSummary();

        setPaymentSummary(
            data
        );

    } catch (error) {

        console.error(error);

    }

};

    const loadPayments =
    async () => {

        try {

            const data =
                await getPayments();

            setPayments(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const handleCreatePayment =
    async (paymentData) => {

        try {

            await createPayment(
                paymentData
            );

            await loadPayments();
            await loadPaymentSummary();

            setOpenDialog(false);

            setSuccessMessage(true);

        } catch (error) {

            console.error(error);

            setErrorMessage(true);

        }

    };

    const handleEditPayment =
    (payment) => {

        setEditingPayment(
            payment
        );

        setOpenDialog(true);

    };

    const handleUpdatePayment =
    async (paymentData) => {

        try {

            await updatePayment(
                editingPayment.id,
                paymentData
            );

            await loadPayments();
            await loadPaymentSummary();

            setEditingPayment(
                null
            );

            setOpenDialog(false);

            setSuccessMessage(true);

        } catch (error) {

            console.error(error);

            setErrorMessage(true);

        }

    };

    const handleDeletePayment =
    async (id) => {

        const confirmDelete =
            window.confirm(
                '¿Desea eliminar este pago?'
            );

        if (!confirmDelete) return;

        try {

            await deletePayment(id);

            await loadPayments();
            await loadPaymentSummary();

        } catch (error) {

            console.error(error);

        }

    };

    const filteredPayments =
    payments.filter(
        (payment) => {

            const text =
                search.toLowerCase();

            return (

                payment.full_name
                    ?.toLowerCase()
                    .includes(text)

                ||

                payment.treatment_type
                    ?.toLowerCase()
                    .includes(text)

                ||

                payment.payment_method
                    ?.toLowerCase()
                    .includes(text)

            );

        }
    );

    const totalCollected =
    payments.reduce(
        (total, payment) =>
            total +
            Number(payment.amount || 0),
        0
    );

    const cashPayments =
    payments.filter(
        payment =>
            payment.payment_method ===
            'EFECTIVO'
    ).length;

    const transferPayments =
    payments.filter(
        payment =>
            payment.payment_method ===
            'TRANSFERENCIA'
    ).length;

    const cardPayments =
    payments.filter(
        payment =>
            payment.payment_method ===
            'TARJETA'
    ).length;

    const stats = [

        {
            title:
                'Total Cobrado',

            value:
                `$${totalCollected.toFixed(2)}`,

            icon:
                <AttachMoneyIcon
                    sx={{
                        fontSize: 42
                    }}
                />,

            color:
                'linear-gradient(135deg,#22C55E,#16A34A)'
        },

        {
            title:
                'Pagos Registrados',

            value:
                payments.length,

            icon:
                <PaymentsIcon
                    sx={{
                        fontSize: 42
                    }}
                />,

            color:
                'linear-gradient(135deg,#38BDF8,#0EA5E9)'
        },

        {
            title:
                'Efectivo',

            value:
                cashPayments,

            icon:
                <AccountBalanceIcon
                    sx={{
                        fontSize: 42
                    }}
                />,

            color:
                'linear-gradient(135deg,#F59E0B,#D97706)'
        },

        {
            title:
                'Tarjetas',

            value:
                cardPayments,

            icon:
                <CreditCardIcon
                    sx={{
                        fontSize: 42
                    }}
                />,

            color:
                'linear-gradient(135deg,#8B5CF6,#7C3AED)'
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
                    Pagos
                </Typography>

                <Typography
                    variant="h6"
                    color="text.secondary"
                >
                    Gestión de pagos y cobros
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
                Nuevo Pago
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
                label="Buscar pago"
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
                Historial de Pagos
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
                                Costo
                            </th>

                            <th style={{ padding: '16px', textAlign: 'left' }}>
                                Pago
                            </th>

                            <th style={{ padding: '16px', textAlign: 'left' }}>
                                Fecha
                            </th>

                            <th style={{ padding: '16px', textAlign: 'left' }}>
                                Método
                            </th>

                            <th style={{ padding: '16px', textAlign: 'left' }}>
                                Acciones
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredPayments.map(
                            (payment) => (

                                <tr
                                    key={payment.id}
                                >

                                    <td style={{ padding: '16px' }}>
                                        {payment.full_name}
                                    </td>

                                    <td style={{ padding: '16px' }}>
                                        {payment.treatment_type}
                                    </td>

                                    <td style={{ padding: '16px' }}>
                                        $
                                        {Number(
                                            payment.cost
                                        ).toFixed(2)}
                                    </td>

                                    <td style={{ padding: '16px' }}>
                                        $
                                        {Number(
                                            payment.amount
                                        ).toFixed(2)}
                                    </td>

                                    <td style={{ padding: '16px' }}>
                                        {new Date(
                                            payment.payment_date
                                        ).toLocaleDateString(
                                            'es-NI'
                                        )}
                                    </td>

                                    <td style={{ padding: '16px' }}>

                                        <Chip
                                            label={
                                                payment.payment_method
                                            }
                                            color={
                                                payment.payment_method ===
                                                'EFECTIVO'
                                                    ? 'success'
                                                    : payment.payment_method ===
                                                      'TRANSFERENCIA'
                                                    ? 'info'
                                                    : 'warning'
                                            }
                                        />

                                    </td>

                                    <td style={{ padding: '16px' }}>

                                        <IconButton
                                            color="primary"
                                            onClick={() =>
                                                handleEditPayment(
                                                    payment
                                                )
                                            }
                                        >
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton
                                            color="error"
                                            onClick={() =>
                                                handleDeletePayment(
                                                    payment.id
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

        <Paper
    sx={{
        p: 4,
        borderRadius: 5,
        mt: 4
    }}
>

    <Typography
        variant="h5"
        fontWeight={700}
        mb={3}
    >
        Resumen Financiero
    </Typography>

    <Box
        sx={{
            overflowX: 'auto'
        }}
    >

        <table
            style={{
                width: '100%',
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
                        Costo Total
                    </th>

                    <th style={{ padding: '16px', textAlign: 'left' }}>
                        Pagado
                    </th>

                    <th style={{ padding: '16px', textAlign: 'left' }}>
                        Saldo
                    </th>

                </tr>

            </thead>

            <tbody>

                {paymentSummary.map(
                    (item) => (

                        <tr
                            key={item.id}
                        >

                            <td style={{ padding: '16px' }}>
                                {item.full_name}
                            </td>

                            <td style={{ padding: '16px' }}>
                                {item.treatment_type}
                            </td>

                            <td style={{ padding: '16px' }}>
                                $
                                {Number(
                                    item.total_cost
                                ).toFixed(2)}
                            </td>

                            <td style={{ padding: '16px' }}>
                                $
                                {Number(
                                    item.total_paid
                                ).toFixed(2)}
                            </td>

                            <td style={{ padding: '16px' }}>

                                <Chip
                                    label={
                                        '$' +
                                        Number(
                                            item.balance
                                        ).toFixed(2)
                                    }
                                    color={
                                        Number(
                                            item.balance
                                        ) > 0
                                            ? 'warning'
                                            : 'success'
                                    }
                                />

                            </td>

                        </tr>

                    )
                )}

            </tbody>

        </table>

    </Box>

</Paper>

        <PaymentDialog
            open={openDialog}
            payment={
                editingPayment
            }
            onClose={() => {

                setOpenDialog(
                    false
                );

                setEditingPayment(
                    null
                );

            }}
            onSave={
                editingPayment
                    ? handleUpdatePayment
                    : handleCreatePayment
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