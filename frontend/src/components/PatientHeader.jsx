import {
    Paper,
    Grid,
    Typography,
    Chip,
    Avatar,
    Box
} from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';

export default function PatientHeader({

    patient

}) {

    if (!patient) return null;

    return (

        <Paper

            sx={{

                p:4,

                mb:3,

                borderRadius:4,

                boxShadow:
                    '0 10px 30px rgba(0,0,0,0.08)'

            }}

        >

            <Grid
                container
                spacing={3}
                alignItems="center"
            >

                <Grid item>

                    <Avatar

                        sx={{

                            width:80,

                            height:80,

                            bgcolor:'#0284C7'

                        }}

                    >

                        <PersonIcon
                            sx={{
                                fontSize:40
                            }}
                        />

                    </Avatar>

                </Grid>

                <Grid item xs>

                    <Typography

                        variant="h4"

                        fontWeight={700}

                    >

                        {patient.full_name}

                    </Typography>

                    <Box
                        mt={1}
                        mb={2}
                    >

                        <Chip

                            label={patient.status}

                            color={
                                patient.status === 'ACTIVO'
                                ? 'success'
                                : 'error'
                            }

                        />

                    </Box>

                    <Typography>

                        📞 {patient.phone || 'Sin teléfono'}

                    </Typography>

                    <Typography>

                        📧 {patient.email || 'Sin correo'}

                    </Typography>

                    <Typography>

                        🏠 {patient.address || 'Sin dirección'}

                    </Typography>

                </Grid>

            </Grid>

        </Paper>

    );

}