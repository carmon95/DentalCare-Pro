import {
    Paper,
    Typography,
    Grid,
    Divider
} from '@mui/material';

export default function ClinicalHistoryTab({

    histories

}) {

    if (

        !histories ||

        histories.length === 0

    ) {

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
                    mb={2}
                >

                    🩺 Historial Clínico

                </Typography>

                <Typography>

                    Este paciente aún no posee historial clínico.

                </Typography>

            </Paper>

        );

    }

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

                🩺 Historial Clínico

            </Typography>

            {

                histories.map(

                    (history)=>(

                        <Paper

                            key={history.id}

                            elevation={0}

                            sx={{

                                p:3,

                                mb:3,

                                borderRadius:3,

                                background:'#F8FAFC',

                                border:'1px solid #E2E8F0'

                            }}

                        >

                            <Grid
                                container
                                spacing={2}
                            >

                                <Grid item xs={12} md={6}>

                                    <Typography>

                                        <strong>

                                            Motivo de Consulta

                                        </strong>

                                    </Typography>

                                    <Typography>

                                        {

                                            history.chief_complaint ||

                                            'No registrado'

                                        }

                                    </Typography>

                                </Grid>

                                <Grid item xs={12} md={6}>

                                    <Typography>

                                        <strong>

                                            Diagnóstico

                                        </strong>

                                    </Typography>

                                    <Typography>

                                        {

                                            history.diagnosis ||

                                            'No registrado'

                                        }

                                    </Typography>

                                </Grid>

                                <Grid item xs={12}>

                                    <Divider />

                                </Grid>

                                <Grid item xs={12}>

                                    <Typography>

                                        <strong>

                                            Plan de Tratamiento

                                        </strong>

                                    </Typography>

                                    <Typography>

                                        {

                                            history.treatment_plan ||

                                            'No registrado'

                                        }

                                    </Typography>

                                </Grid>

                                <Grid item xs={12} md={4}>

                                    <Typography>

                                        <strong>

                                            Presión Arterial

                                        </strong>

                                    </Typography>

                                    <Typography>

                                        {

                                            history.blood_pressure ||

                                            'No registrado'

                                        }

                                    </Typography>

                                </Grid>

                                <Grid item xs={12} md={4}>

                                    <Typography>

                                        <strong>

                                            Peso

                                        </strong>

                                    </Typography>

                                    <Typography>

                                        {

                                            history.weight ||

                                            'No registrado'

                                        } kg

                                    </Typography>

                                </Grid>

                                <Grid item xs={12} md={4}>

                                    <Typography>

                                        <strong>

                                            Temperatura

                                        </strong>

                                    </Typography>

                                    <Typography>

                                        {

                                            history.temperature ||

                                            'No registrada'

                                        }

                                    </Typography>

                                </Grid>

                                <Grid item xs={12}>

                                    <Divider />

                                </Grid>

                                <Grid item xs={12}>

                                    <Typography>

                                        <strong>

                                            Observaciones

                                        </strong>

                                    </Typography>

                                    <Typography>

                                        {

                                            history.notes ||

                                            'Sin observaciones'

                                        }

                                    </Typography>

                                </Grid>

                            </Grid>

                        </Paper>

                    )

                )

            }

        </Paper>

    );

}