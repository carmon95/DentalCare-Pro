import {
    Paper,
    Typography,
    Box,
    Chip
} from '@mui/material';

export default function TreatmentsTab({

    treatments

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

                🦷 Historial de Tratamientos

            </Typography>

            {

                treatments.length > 0

                ?

                treatments.map(

                    (treatment)=>(

                        <Box

                            key={treatment.id}

                            sx={{

                                mb:2,

                                p:2,

                                borderRadius:3,

                                background:'#F8FAFC',

                                border:'1px solid #E2E8F0'

                            }}

                        >

                            <Typography>

                                <strong>Tratamiento:</strong>

                                {' '}

                                {treatment.treatment_type}

                            </Typography>

                            <Typography>

                                <strong>Costo:</strong>

                                {' '}

                                $

                                {Number(

                                    treatment.cost

                                ).toFixed(2)}

                            </Typography>

                            <Typography
                                sx={{ mt:1 }}
                            >

                                <Chip

                                    label={treatment.status}

                                    color={

                                        treatment.status === 'COMPLETADO'

                                        ? 'success'

                                        : treatment.status === 'EN PROCESO'

                                        ? 'warning'

                                        : 'default'

                                    }

                                    size="small"

                                />

                            </Typography>

                        </Box>

                    )

                )

                :

                <Typography>

                    Este paciente todavía no posee tratamientos registrados.

                </Typography>

            }

        </Paper>

    );

}