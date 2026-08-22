const db = require('../config/db');

/*
|--------------------------------------------------------------------------
| Obtener Configuración
|--------------------------------------------------------------------------
*/

const getSettings = async (req, res) => {

    try {

        const [settings] = await db.query(`
            SELECT *
            FROM settings
            LIMIT 1
        `);

        res.json(
            settings[0] || {}
        );

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Error interno'
        });

    }

};

/*
|--------------------------------------------------------------------------
| Actualizar Configuración
|--------------------------------------------------------------------------
*/

const updateSettings = async (req, res) => {

    try {

        const {
            clinic_name,
            doctor_name,
            phone,
            email,
            address,
            opening_time,
            closing_time,
            appointment_duration
        } = req.body;

        await db.query(
            `
            UPDATE settings
            SET
                clinic_name = ?,
                doctor_name = ?,
                phone = ?,
                email = ?,
                address = ?,
                opening_time = ?,
                closing_time = ?,
                appointment_duration = ?
            WHERE id = 1
            `,
            [
                clinic_name,
                doctor_name,
                phone,
                email,
                address,
                opening_time,
                closing_time,
                appointment_duration
            ]
        );

        res.json({
            message:
                'Configuración actualizada correctamente'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Error interno'
        });

    }

};

module.exports = {
    getSettings,
    updateSettings
};