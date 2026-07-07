const db = require('../config/db');

/*
|--------------------------------------------------------------------------
| Expediente completo del paciente
|--------------------------------------------------------------------------
*/

const getPatientSummary = async (req, res) => {

    try {

        const { id } = req.params;

        /*
        |--------------------------------------------------------------------------
        | Datos del paciente
        |--------------------------------------------------------------------------
        */

        const [patient] = await db.query(

            `
            SELECT *
            FROM patients
            WHERE id = ?
            `,

            [id]

        );

        if (patient.length === 0) {

            return res.status(404).json({

                message: 'Paciente no encontrado.'

            });

        }

        /*
        |--------------------------------------------------------------------------
        | Historial Clínico
        |--------------------------------------------------------------------------
        */

        const [clinicalHistory] = await db.query(

            `
            SELECT *
            FROM clinical_histories
            WHERE patient_id = ?
            ORDER BY created_at DESC
            `,

            [id]

        );

        /*
        |--------------------------------------------------------------------------
        | Tratamientos
        |--------------------------------------------------------------------------
        */

        const [treatments] = await db.query(

            `
            SELECT *
            FROM treatments
            WHERE patient_id = ?
            ORDER BY start_date DESC
            `,

            [id]

        );

        /*
        |--------------------------------------------------------------------------
        | Citas
        |--------------------------------------------------------------------------
        */

        const [appointments] = await db.query(

            `
            SELECT *
            FROM appointments
            WHERE patient_id = ?
            ORDER BY appointment_date DESC,
                     appointment_time DESC
            `,

            [id]

        );

        /*
        |--------------------------------------------------------------------------
        | Pagos
        |--------------------------------------------------------------------------
        */

        const [payments] = await db.query(

            `
            SELECT

                pay.*,

                t.treatment_type

            FROM payments pay

            INNER JOIN treatments t

                ON t.id = pay.treatment_id

            WHERE t.patient_id = ?

            ORDER BY pay.payment_date DESC
            `,

            [id]

        );

        /*
        |--------------------------------------------------------------------------
        | Estadísticas
        |--------------------------------------------------------------------------
        */

        const statistics = {

            totalAppointments:

                appointments.length,

            totalTreatments:

                treatments.length,

            totalPayments:

                payments.length,

            totalPaid:

                payments.reduce(

                    (sum, payment) =>

                        sum + Number(payment.amount),

                    0

                )

        };

        res.json({

            patient: patient[0],

            clinicalHistory,

            appointments,

            treatments,

            payments,

            statistics

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: 'Error interno'

        });

    }

};

module.exports = {

    getPatientSummary

};