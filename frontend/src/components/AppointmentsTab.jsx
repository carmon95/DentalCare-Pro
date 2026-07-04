import {
    Paper,
    Typography,
    Box
} from '@mui/material';

export default function AppointmentsTab({

    appointments

}) {

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

                📅 Historial de Citas

            </Typography>

            {

                appointments.length > 0

                ?

                appointments.map(

                    (appointment)=>(

                        <Box

                            key={appointment.id}

                            sx={{

                                mb:2,

                                p:2,

                                borderRadius:3,

                                background:'#F8FAFC',

                                border:'1px solid #E2E8F0'

                            }}

                        >

                            <Typography>

                                <strong>Fecha:</strong>

                                {' '}

                                {new Date(

                                    appointment.appointment_date

                                ).toLocaleDateString('es-NI')}

                            </Typography>

                            <Typography>

                                <strong>Hora:</strong>

                                {' '}

                                {appointment.appointment_time?.substring(0,5)}

                            </Typography>

                            <Typography>

                                <strong>Motivo:</strong>

                                {' '}

                                {appointment.reason}

                            </Typography>

                            <Typography>

                                <strong>Estado:</strong>

                                {' '}

                                {appointment.status}

                            </Typography>

                        </Box>

                    )

                )

                :

                <Typography>

                    Este paciente todavía no tiene citas registradas.

                </Typography>

            }

        </Paper>

    );

}