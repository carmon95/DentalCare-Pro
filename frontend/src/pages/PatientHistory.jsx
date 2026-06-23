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

import {
    getPatients
} from '../services/patientService';

import {
    getAppointments
} from '../services/appointmentService';

import {
    getTreatments
} from '../services/treatmentService';

import {
    getPayments
} from '../services/paymentService';

import {
    getClinicalHistories
} from '../services/clinicalHistoryService';

export default function PatientHistory() {

    const { id } = useParams();

    const [patient,
        setPatient] =
        useState(null);

    const [appointments,
        setAppointments] =
        useState([]);

    const [treatments,
        setTreatments] =
        useState([]);

    const [payments,
        setPayments] =
        useState([]);

    const [histories,
        setHistories] =
        useState([]);

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            const patientsData =
                await getPatients();

            const appointmentsData =
                await getAppointments();

            const treatmentsData =
                await getTreatments();

            const paymentsData =
                await getPayments();

            const historiesData =
                await getClinicalHistories();

            const selectedPatient =
                patientsData.find(
                    p =>
                        p.id ===
                        Number(id)
                );

            setPatient(
                selectedPatient
            );

            setAppointments(

                appointmentsData.filter(
                    a =>
                        a.patient_id ===
                        Number(id)
                )

            );

            setTreatments(

                treatmentsData.filter(
                    t =>
                        t.patient_id ===
                        Number(id)
                )

            );

            setPayments(

                paymentsData.filter(
                    p =>
                        treatmentsData.some(
                            t =>
                                t.id ===
                                p.treatment_id
                                &&
                                t.patient_id ===
                                Number(id)
                        )
                )

            );

            setHistories(

                historiesData.filter(
                    h =>
                        h.patient_id ===
                        Number(id)
                )

            );

        } catch (error) {

            console.error(error);

        }
    };

        if (!patient) {

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

        {/* DATOS PACIENTE */}

        <Paper
            sx={{
                p: 4,
                borderRadius: 5,
                mb: 4
            }}
        >

            <Typography
                variant="h5"
                fontWeight={700}
                mb={2}
            >
                Información del Paciente
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2}>

                <Grid item xs={12} md={6}>

                    <Typography>
                        <strong>Nombre:</strong>
                        {' '}
                        {patient.full_name}
                    </Typography>

                </Grid>

                <Grid item xs={12} md={6}>

                    <Typography>
                        <strong>Teléfono:</strong>
                        {' '}
                        {patient.phone}
                    </Typography>

                </Grid>

                <Grid item xs={12} md={6}>

                    <Typography>
                        <strong>Correo:</strong>
                        {' '}
                        {patient.email}
                    </Typography>

                </Grid>

                <Grid item xs={12} md={6}>

                    <Typography>
                        <strong>Alergias:</strong>
                        {' '}
                        {patient.allergies || 'N/A'}
                    </Typography>

                </Grid>

            </Grid>

        </Paper>

        {/* CITAS */}

        <Paper
            sx={{
                p: 4,
                borderRadius: 5,
                mb: 4
            }}
        >

            <Typography
                variant="h5"
                fontWeight={700}
                mb={3}
            >
                Citas
            </Typography>

            {appointments.length > 0 ? (

                appointments.map(
                    (appointment) => (

                        <Box
                            key={appointment.id}
                            sx={{
                                mb: 2,
                                p: 2,
                                background:
                                    '#F8FAFC',
                                borderRadius: 2
                            }}
                        >

                            <Typography>

                                <strong>
                                    Fecha:
                                </strong>

                                {' '}

                                {new Date(
                                    appointment.appointment_date
                                ).toLocaleDateString(
                                    'es-NI'
                                )}

                            </Typography>

                            <Typography>

                                <strong>
                                    Motivo:
                                </strong>

                                {' '}

                                {appointment.reason}

                            </Typography>

                        </Box>

                    )
                )

            ) : (

                <Typography>
                    Sin citas registradas.
                </Typography>

            )}

        </Paper>

        {/* TRATAMIENTOS */}

        <Paper
            sx={{
                p: 4,
                borderRadius: 5,
                mb: 4
            }}
        >

            <Typography
                variant="h5"
                fontWeight={700}
                mb={3}
            >
                Tratamientos
            </Typography>

            {treatments.length > 0 ? (

                treatments.map(
                    (treatment) => (

                        <Box
                            key={treatment.id}
                            sx={{
                                mb: 2,
                                p: 2,
                                background:
                                    '#F8FAFC',
                                borderRadius: 2
                            }}
                        >

                            <Typography>

                                <strong>
                                    Tratamiento:
                                </strong>

                                {' '}

                                {treatment.treatment_type}

                            </Typography>

                            <Typography>

                                <strong>
                                    Estado:
                                </strong>

                                {' '}

                                {treatment.status}

                            </Typography>

                            <Typography>

                                <strong>
                                    Costo:
                                </strong>

                                {' '}

                                $
                                {Number(
                                    treatment.cost
                                ).toFixed(2)}

                            </Typography>

                        </Box>

                    )
                )

            ) : (

                <Typography>
                    Sin tratamientos registrados.
                </Typography>

            )}

        </Paper>

        {/* PAGOS */}

        <Paper
            sx={{
                p: 4,
                borderRadius: 5,
                mb: 4
            }}
        >

            <Typography
                variant="h5"
                fontWeight={700}
                mb={3}
            >
                Pagos
            </Typography>

            {payments.length > 0 ? (

                payments.map(
                    (payment) => (

                        <Box
                            key={payment.id}
                            sx={{
                                mb: 2,
                                p: 2,
                                background:
                                    '#F8FAFC',
                                borderRadius: 2
                            }}
                        >

                            <Typography>

                                <strong>
                                    Monto:
                                </strong>

                                {' '}

                                $
                                {Number(
                                    payment.amount
                                ).toFixed(2)}

                            </Typography>

                            <Typography>

                                <strong>
                                    Método:
                                </strong>

                                {' '}

                                {payment.payment_method}

                            </Typography>

                        </Box>

                    )
                )

            ) : (

                <Typography>
                    Sin pagos registrados.
                </Typography>

            )}

        </Paper>

        {/* HISTORIAL CLÍNICO */}

        <Paper
            sx={{
                p: 4,
                borderRadius: 5
            }}
        >

            <Typography
                variant="h5"
                fontWeight={700}
                mb={3}
            >
                Historial Clínico
            </Typography>

            {histories.length > 0 ? (

                histories.map(
                    (history) => (

                        <Box
                            key={history.id}
                            sx={{
                                mb: 3,
                                p: 3,
                                background:
                                    '#F8FAFC',
                                borderRadius: 3
                            }}
                        >

                            <Typography>

                                <strong>
                                    Motivo Consulta:
                                </strong>

                                {' '}

                                {history.chief_complaint}

                            </Typography>

                            <Typography>

                                <strong>
                                    Diagnóstico:
                                </strong>

                                {' '}

                                {history.diagnosis}

                            </Typography>

                            <Typography>

                                <strong>
                                    Plan Tratamiento:
                                </strong>

                                {' '}

                                {history.treatment_plan}

                            </Typography>

                            <Typography>

                                <strong>
                                    Presión:
                                </strong>

                                {' '}

                                {history.blood_pressure}

                            </Typography>

                            <Typography>

                                <strong>
                                    Peso:
                                </strong>

                                {' '}

                                {history.weight}
                                {' '}kg

                            </Typography>

                            <Typography>

                                <strong>
                                    Notas:
                                </strong>

                                {' '}

                                {history.notes}

                            </Typography>

                        </Box>

                    )
                )

            ) : (

                <Typography>
                    Sin historial clínico registrado.
                </Typography>

            )}

        </Paper>

    </MainLayout>


        );
    };