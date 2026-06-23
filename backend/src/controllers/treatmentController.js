const db = require('../config/db');

/*
|--------------------------------------------------------------------------
| Obtener tratamientos
|--------------------------------------------------------------------------
*/

const getTreatments = async (req, res) => {

    try {

        const [treatments] = await db.query(`
            SELECT
                t.id,
                t.patient_id,
                p.full_name,
                t.start_date,
                t.end_date,
                t.treatment_type,
                t.cost,
                t.status,
                t.notes
            FROM treatments t
            INNER JOIN patients p
                ON p.id = t.patient_id
            ORDER BY
                t.start_date DESC
        `);

        res.json(treatments);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Error interno'
        });

    }

};

/*
|--------------------------------------------------------------------------
| Crear tratamiento
|--------------------------------------------------------------------------
*/

const createTreatment = async (req, res) => {

    try {

            const {
            patient_id,
            start_date,
            end_date,
            treatment_type,
            cost,
            status,
            notes
        } = req.body;

        const [result] = await db.query(
            `
            INSERT INTO treatments
            (
                patient_id,
                start_date,
                end_date,
                treatment_type,
                cost,
                status,
                notes
            )
            VALUES
            (?, ?, ?, ?, ?, ?, ?)
            `,
            [
                patient_id,
                start_date,
                end_date,
                treatment_type,
                cost,
                status,
                notes
            ]
        );

        res.status(201).json({
            id: result.insertId,
            message:
                'Tratamiento creado correctamente'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Error interno'
        });

    }

};

/*
|--------------------------------------------------------------------------
| Actualizar tratamiento
|--------------------------------------------------------------------------
*/

const updateTreatment = async (req, res) => {

    try {

        const { id } = req.params;

        console.log('========== UPDATE TREATMENT ==========');
        console.log(req.body);

        const {
            patient_id,
            start_date,
            end_date,
            treatment_type,
            cost,
            status,
            notes
        } = req.body;

        await db.query(
            `
            UPDATE treatments
            SET
                patient_id = ?,
                start_date = ?,
                end_date = ?,
                treatment_type = ?,
                cost = ?,
                status = ?,
                notes = ?
            WHERE id = ?
            `,
            [
                patient_id,
                start_date,
                end_date,
                treatment_type,
                cost,
                status,
                notes,
                id
            ]
        );

        res.json({
            message:
                'Tratamiento actualizado correctamente'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }

};

/*
|--------------------------------------------------------------------------
| Eliminar tratamiento
|--------------------------------------------------------------------------
*/

const deleteTreatment = async (req, res) => {

    try {

        const { id } = req.params;

        await db.query(
            `
            DELETE FROM treatments
            WHERE id = ?
            `,
            [id]
        );

        res.json({
            message:
                'Tratamiento eliminado correctamente'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Error interno'
        });

    }

};

module.exports = {
    getTreatments,
    createTreatment,
    updateTreatment,
    deleteTreatment
};