const db = require('../config/db');

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

const getDashboard = async (req, res) => {

    try {

        /*
        |--------------------------------------------------------------------------
        | Pacientes
        |--------------------------------------------------------------------------
        */

        const [[patients]] = await db.query(`
            SELECT

                COUNT(*) AS total,

                SUM(
                    CASE
                        WHEN status='ACTIVO'
                        THEN 1
                        ELSE 0
                    END
                ) AS active,

                SUM(
                    CASE
                        WHEN status='INACTIVO'
                        THEN 1
                        ELSE 0
                    END
                ) AS inactive

            FROM patients
        `);

        /*
        |--------------------------------------------------------------------------
        | Citas de hoy
        |--------------------------------------------------------------------------
        */

        const [[appointmentsToday]] =
            await db.query(

            `
            SELECT
                COUNT(*) AS total
            FROM appointments
            WHERE appointment_date = CURDATE()
            `

        );

        /*
        |--------------------------------------------------------------------------
        | Tratamientos activos
        |--------------------------------------------------------------------------
        */

        const [[treatments]] =
            await db.query(

            `
            SELECT
                COUNT(*) AS total
            FROM treatments
            WHERE status='EN PROCESO'
            `

        );

        /*
|--------------------------------------------------------------------------
| Gráfico de tratamientos
|--------------------------------------------------------------------------
*/

const [treatmentsChart] =
    await db.query(

    `
    SELECT

        status,

        COUNT(*) AS total

    FROM treatments

    GROUP BY status
    `

);

        /*
        |--------------------------------------------------------------------------
        | Saldo pendiente
        |--------------------------------------------------------------------------
        */

        const [[pending]] =
            await db.query(

            `
            SELECT

                SUM(balance) AS total

            FROM (

                SELECT

                    (
                        t.cost -

                        COALESCE(
                            SUM(p.amount),
                            0
                        )

                    ) AS balance

                FROM treatments t

                LEFT JOIN payments p

                    ON p.treatment_id=t.id

                GROUP BY
                    t.id,
                    t.cost

            ) balances
            `

        );

        /*
|--------------------------------------------------------------------------
| Gráfico pacientes
|--------------------------------------------------------------------------
*/

const patientsChart = {

    active:
        Number(
            patients.active
        ),

    inactive:
        Number(
            patients.inactive
        )

};

        /*
        |--------------------------------------------------------------------------
        | Últimos pacientes
        |--------------------------------------------------------------------------
        */

        const [recentPatients] =
            await db.query(

            `
            SELECT

                full_name,
                created_at

            FROM patients

            ORDER BY created_at DESC

            LIMIT 3
            `

        );

        /*
        |--------------------------------------------------------------------------
        | Próximas citas
        |--------------------------------------------------------------------------
        */

        const [nextAppointments] =
            await db.query(

            `
            SELECT

                p.full_name,

                a.appointment_date,

                a.appointment_time

            FROM appointments a

            INNER JOIN patients p

                ON p.id=a.patient_id

            WHERE

                a.appointment_date>=CURDATE()

            ORDER BY

                a.appointment_date,

                a.appointment_time

            LIMIT 5
            `

        );
        res.json({

            patients,

            patientsChart,

            appointmentsToday,

            treatments,

            treatmentsChart,

            pending,

            recentPatients,

            nextAppointments

});

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message:
                'Error interno'

        });

    }

};

module.exports = {

    getDashboard

};