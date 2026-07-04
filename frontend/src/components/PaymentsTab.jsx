import {
    Paper,
    Typography,
    Box,
    Chip
} from '@mui/material';

export default function PaymentsTab({

    payments

}) {

    const totalPaid = payments.reduce(

        (sum, payment) =>

            sum + Number(payment.amount),

        0

    );

    return (

        <Paper

            sx={{

                p:4,

                borderRadius:4,

                boxShadow:
                    '0 10px 30px rgba(0,0,0,.08)'

            }}

        >

            <Typography

                variant="h5"

                fontWeight={700}

                mb={3}

            >

                💰 Historial de Pagos

            </Typography>

            <Typography

                variant="h6"

                color="primary"

                mb={3}

            >

                Total Pagado:

                {' '}

                ${totalPaid.toFixed(2)}

            </Typography>

            {

                payments.length > 0

                ?

                payments.map(

                    (payment)=>(

                        <Box

                            key={payment.id}

                            sx={{

                                mb:2,

                                p:2,

                                borderRadius:3,

                                background:'#F8FAFC',

                                border:'1px solid #E2E8F0'

                            }}

                        >

                            <Typography>

                                <strong>Monto:</strong>

                                {' '}

                                $

                                {Number(

                                    payment.amount

                                ).toFixed(2)}

                            </Typography>

                            <Typography>

                                <strong>Fecha:</strong>

                                {' '}

                                {new Date(

                                    payment.payment_date

                                ).toLocaleDateString('es-NI')}

                            </Typography>

                            <Typography>

                                <strong>Método:</strong>

                                {' '}

                                {payment.payment_method}

                            </Typography>

                            <Typography
                                sx={{ mt:1 }}
                            >

                                <Chip

                                    label={

                                        payment.treatment_type

                                    }

                                    color="primary"

                                    size="small"

                                />

                            </Typography>

                        </Box>

                    )

                )

                :

                <Typography>

                    No existen pagos registrados.

                </Typography>

            }

        </Paper>

    );

}