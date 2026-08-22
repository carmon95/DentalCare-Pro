const db = require('../config/db');

/*
|--------------------------------------------------------------------------
| Obtener historiales clínicos
|--------------------------------------------------------------------------
*/

const getClinicalHistories = async (req, res) => {

    try {

        const [histories] = await db.query(`
            SELECT
                ch.*,
                p.full_name
            FROM clinical_histories ch
            INNER JOIN patients p
                ON p.id = ch.patient_id
            ORDER BY ch.created_at DESC
        `);

        res.json(histories);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Error interno'
        });

    }

};

/*
|--------------------------------------------------------------------------
| Crear historial clínico
|--------------------------------------------------------------------------
*/

const createClinicalHistory = async (req, res) => {

    try {

        const {
            patient_id,
            chief_complaint,
            medical_history,
            allergies,
            current_medications,
            diagnosis,
            treatment_plan,
            blood_pressure,
            weight,
            notes
        } = req.body;

        const [result] = await db.query(
            `
            INSERT INTO clinical_histories
            (
                patient_id,
                chief_complaint,
                medical_history,
                allergies,
                current_medications,
                diagnosis,
                treatment_plan,
                blood_pressure,
                weight,
                notes
            )
            VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                patient_id,
                chief_complaint,
                medical_history,
                allergies,
                current_medications,
                diagnosis,
                treatment_plan,
                blood_pressure,
                weight,
                notes
            ]
        );

        res.status(201).json({
            id: result.insertId,
            message:
                'Historial clínico creado correctamente'
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
| Actualizar historial clínico
|--------------------------------------------------------------------------
*/

const updateClinicalHistory = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            patient_id,
            chief_complaint,
            medical_history,
            allergies,
            current_medications,
            diagnosis,
            treatment_plan,
            blood_pressure,
            weight,
            notes
        } = req.body;

        await db.query(
            `
            UPDATE clinical_histories
            SET
                patient_id = ?,
                chief_complaint = ?,
                medical_history = ?,
                allergies = ?,
                current_medications = ?,
                diagnosis = ?,
                treatment_plan = ?,
                blood_pressure = ?,
                weight = ?,
                notes = ?
            WHERE id = ?
            `,
            [
                patient_id,
                chief_complaint,
                medical_history,
                allergies,
                current_medications,
                diagnosis,
                treatment_plan,
                blood_pressure,
                weight,
                notes,
                id
            ]
        );

        res.json({
            message:
                'Historial clínico actualizado correctamente'
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
| Eliminar historial clínico
|--------------------------------------------------------------------------
*/

const deleteClinicalHistory = async (req, res) => {

    try {

        const { id } = req.params;

        await db.query(
            `
            DELETE FROM clinical_histories
            WHERE id = ?
            `,
            [id]
        );

        res.json({
            message:
                'Historial clínico eliminado correctamente'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Error interno'
        });

    }

};

module.exports = {
    getClinicalHistories,
    createClinicalHistory,
    updateClinicalHistory,
    deleteClinicalHistory
};