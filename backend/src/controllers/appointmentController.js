const db = require('../config/db');

/*
|--------------------------------------------------------------------------
| Obtener citas
|--------------------------------------------------------------------------
*/

const getAppointments = async (req, res) => {

    try {

        const [appointments] = await db.query(`
            SELECT
                a.id,
                a.patient_id,
                p.full_name,
                a.appointment_date,
                a.appointment_time,
                a.reason,
                a.status,
                a.notes
            FROM appointments a
            INNER JOIN patients p
                ON p.id = a.patient_id
            ORDER BY
                a.appointment_date DESC,
                a.appointment_time DESC
        `);

        res.json(appointments);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Error interno'
        });

    }

};

/*
|--------------------------------------------------------------------------
| Crear cita
|--------------------------------------------------------------------------
*/

const createAppointment = async (
    req,
    res
) => {

    try {

        const {
            patient_id,
            appointment_date,
            appointment_time,
            reason,
            status,
            notes
        } = req.body;

        const [result] = await db.query(
            `
            INSERT INTO appointments
            (
                patient_id,
                appointment_date,
                appointment_time,
                reason,
                status,
                notes
            )
            VALUES
            (?, ?, ?, ?, ?, ?)
            `,
            [
                patient_id,
                appointment_date,
                appointment_time,
                reason,
                status,
                notes
            ]
        );

        res.status(201).json({
            id: result.insertId,
            message:
                'Cita creada correctamente'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Error interno'
        });

    }

};

const updateAppointment = async (
    req,
    res
) => {

    try {

        const { id } = req.params;

        const {
            patient_id,
            appointment_date,
            appointment_time,
            reason,
            status,
            notes
        } = req.body;

        await db.query(
            `
            UPDATE appointments
            SET
                patient_id=?,
                appointment_date=?,
                appointment_time=?,
                reason=?,
                status=?,
                notes=?
            WHERE id=?
            `,
            [
                patient_id,
                appointment_date,
                appointment_time,
                reason,
                status,
                notes,
                id
            ]
        );

        res.json({
            message:
                'Cita actualizada correctamente'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Error interno'
        });

    }

};

const deleteAppointment = async (
    req,
    res
) => {

    try {

        const { id } = req.params;

        await db.query(
            `
            DELETE FROM appointments
            WHERE id = ?
            `,
            [id]
        );

        res.json({
            message:
                'Cita eliminada correctamente'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Error interno'
        });

    }

};

module.exports = {
    getAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment
};