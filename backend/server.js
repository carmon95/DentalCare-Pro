require('dotenv').config();

const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const patientRoutes = require('./src/routes/patientRoutes');
const appointmentRoutes = require('./src/routes/appointmentRoutes');
const settingsRoutes = require('./src/routes/settingsRoutes');
const treatmentRoutes = require('./src/routes/treatmentRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');
const clinicalHistoryRoutes = require('./src/routes/clinicalHistoryRoutes');

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
    '/api/settings',
    settingsRoutes
);

app.get('/', (req, res) => {
    res.json({
        message: 'Dental API funcionando'
    });
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
});