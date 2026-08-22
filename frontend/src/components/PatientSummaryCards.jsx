import {
    Grid,
    Paper,
    Typography
} from '@mui/material';

import EventIcon from '@mui/icons-material/Event';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PaymentsIcon from '@mui/icons-material/Payments';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const Card = ({

    title,

    value,

    icon,

    color

}) => (

    <Paper

        sx={{

            p:3,

            borderRadius:4,

            textAlign:'center',

            boxShadow:
                '0 10px 25px rgba(0,0,0,.08)',

            height:'100%'

        }}

    >

        <Typography

            sx={{

                color,

                mb:1

            }}

        >

            {icon}

        </Typography>

        <Typography

            variant="h4"

            fontWeight={700}

        >

            {value}

        </Typography>

        <Typography

            color="text.secondary"

        >

            {title}

        </Typography>

    </Paper>

);

export default function PatientSummaryCards({

    statistics

}) {

    return (

        <Grid
            container
            spacing={3}
            mb={3}
        >

            <Grid item xs={12} md={3}>

                <Card

                    title="Citas"

                    value={
                        statistics.totalAppointments
                    }

                    icon={<EventIcon />}

                    color="#2563EB"

                />

            </Grid>

            <Grid item xs={12} md={3}>

                <Card

                    title="Tratamientos"

                    value={
                        statistics.totalTreatments
                    }

                    icon={<MedicalServicesIcon />}

                    color="#16A34A"

                />

            </Grid>

            <Grid item xs={12} md={3}>

                <Card

                    title="Pagos"

                    value={
                        statistics.totalPayments
                    }

                    icon={<PaymentsIcon />}

                    color="#EA580C"

                />

            </Grid>

            <Grid item xs={12} md={3}>

                <Card

                    title="Total Pagado"

                    value={`$${statistics.totalPaid}`}

                    icon={<AttachMoneyIcon />}

                    color="#9333EA"

                />

            </Grid>

        </Grid>

    );

}