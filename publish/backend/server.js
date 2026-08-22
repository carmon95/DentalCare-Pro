const path = require("path");

require("dotenv").config({
    path: path.join(__dirname, ".env")
});

const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const patientRoutes = require('./src/routes/patientRoutes');
const appointmentRoutes = require('./src/routes/appointmentRoutes');
const settingsRoutes = require('./src/routes/settingsRoutes');
const treatmentRoutes = require('./src/routes/treatmentRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');
const clinicalHistoryRoutes = require('./src/routes/clinicalHistoryRoutes');
const dashboardRoutes = require('./src/routes/dashboardRoutes');
const patientSummaryRoutes = require('./src/routes/patientSummaryRoutes');
const reportRoutes = require('./src/routes/reportRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(
    '/api/patients',
    patientRoutes
);
app.use(
    '/api/appointments',
    appointmentRoutes
);

app.use(
    '/api/treatments',
    treatmentRoutes
);

app.use(
    '/api/payments',
    paymentRoutes
);

app.use(
    '/api/clinical-histories',
    clinicalHistoryRoutes
);

app.use(
    '/api/dashboard',
    dashboardRoutes
);

app.use(
    '/api/settings',
    settingsRoutes
);

app.use(
    '/api/patient-summary',
    patientSummaryRoutes
);

app.use('/api/reports', reportRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'Dental API funcionando'
    });
});

const PORT = 3001;

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
});

function shutdown(signal) {

    console.log(`Recibida señal ${signal}. Cerrando servidor...`);

    server.close(() => {

        console.log("Servidor detenido.");

        process.exit(0);

    });

}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
