import {
    Typography,
    Paper,
    Grid,
    Box,
    Divider
} from '@mui/material';

import {
    useParams
} from 'react-router-dom';

import {
    useEffect,
    useState
} from 'react';

import MainLayout from '../layouts/MainLayout';

import PatientHeader
    from '../components/PatientHeader';

import PatientSummaryCards
    from '../components/PatientSummaryCards';

import PatientTabs
    from '../components/PatientTabs';

 import AppointmentsTab
    from '../components/AppointmentsTab';

import TreatmentsTab
    from '../components/TreatmentsTab';

import PaymentsTab
    from '../components/PaymentsTab';

import ClinicalHistoryTab
    from '../components/ClinicalHistoryTab';   

import {
    getPatientSummary
} from '../services/patientSummaryService';

export default function PatientHistory() {

    const { id } = useParams();

    const [summary,
    setSummary] =
    useState(null);

    const [tab,
    setTab] =
    useState(0);

    useEffect(() => {

        loadData();

    }, []);

const loadData = async () => {

    try {

        const data =
            await getPatientSummary(id);

        setSummary(data);

    }

    catch (error) {

        console.error(error);

    }

};

        if (!summary) {

    return (

        <MainLayout>

            <Typography>
                Cargando...
            </Typography>

        </MainLayout>

    );

}

return (

    <MainLayout>

        <Typography
            variant="h3"
            fontWeight={700}
            mb={4}
        >
            Expediente Clínico
        </Typography>

       <PatientHeader

    patient={summary.patient}

/>

<PatientSummaryCards

    statistics={summary.statistics}

/>

<PatientTabs

    value={tab}

    onChange={(event, newValue) =>

        setTab(newValue)

    }

/>

<Box>

    {

        tab === 0 && (

            <Paper

                sx={{

                    p:4,

                    borderRadius:4,

                    mb:3

                }}

            >

                <Typography

                    variant="h5"

                    fontWeight={700}

                    mb={2}

                >

                    Datos del Paciente

                </Typography>

                <Grid
                    container
                    spacing={2}
                >

                    <Grid item xs={12} md={6}>

                        <Typography>

                            <strong>Nombre:</strong>

                            {' '}

                            {summary.patient.full_name}

                        </Typography>

                    </Grid>

                    <Grid item xs={12} md={6}>

                        <Typography>

                            <strong>Teléfono:</strong>

                            {' '}

                            {summary.patient.phone || 'N/A'}

                        </Typography>

                    </Grid>

                    <Grid item xs={12} md={6}>

                        <Typography>

                            <strong>Correo:</strong>

                            {' '}

                            {summary.patient.email || 'N/A'}

                        </Typography>

                    </Grid>

                    <Grid item xs={12} md={6}>

                        <Typography>

                            <strong>Dirección:</strong>

                            {' '}

                            {summary.patient.address || 'N/A'}

                        </Typography>

                    </Grid>

                </Grid>

            </Paper>

        )

    }

</Box>

{

    tab === 1 && (

        <ClinicalHistoryTab

            histories={
                summary.clinicalHistory
            }

        />

    )

}

{

    tab === 2 && (

        <TreatmentsTab

            treatments={
                summary.treatments
            }

        />

    )

}

{

    tab === 3 && (

        <AppointmentsTab

            appointments={
                summary.appointments
            }

        />

    )

}

{

    tab === 4 && (

        <PaymentsTab

            payments={
                summary.payments
            }

        />

    )

}


    </MainLayout>


        );
    };