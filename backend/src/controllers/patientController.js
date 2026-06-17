const db = require('../config/db');

/*
|--------------------------------------------------------------------------
| Obtener pacientes
|--------------------------------------------------------------------------
*/

const getPatients = async (req, res) => {

    try {

        const [patients] = await db.query(`
            SELECT
                id,
                full_name,
                birth_date,
                phone,
                address,
                email,
                allergies,
                medical_conditions,
                notes,
                created_at
            FROM patients
            ORDER BY id DESC
        `);

        res.json(patients);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Error interno'
        });

    }

};

/*
|--------------------------------------------------------------------------
| Crear paciente
|--------------------------------------------------------------------------
*/

const createPatient = async (req, res) => {

    try {

        const {
            full_name,
            birth_date,
            phone,
            address,
            email,
            allergies,
            medical_conditions,
            notes
        } = req.body;

        const [result] = await db.query(
            `
            INSERT INTO patients
            (
                full_name,
                birth_date,
                phone,
                address,
                email,
                allergies,
                medical_conditions,
                notes
            )
            VALUES
            (?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                full_name,
                birth_date,
                phone,
                address,
                email,
                allergies,
                medical_conditions,
                notes
            ]
        );

        res.status(201).json({
            id: result.insertId,
            message: 'Paciente creado correctamente'
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
| Eliminar paciente
|--------------------------------------------------------------------------
*/

const deletePatient = async (req, res) => {

    try {

        const { id } = req.params;

        await db.query(
            'DELETE FROM patients WHERE id = ?',
            [id]
        );

        res.json({
            message:
                'Paciente eliminado correctamente'
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
| Editar paciente
|--------------------------------------------------------------------------
*/

const updatePatient = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            full_name,
            birth_date,
            phone,
            address,
            email,
            allergies,
            medical_conditions,
            notes
        } = req.body;

        await db.query(
            `
            UPDATE patients
            SET
                full_name = ?,
                birth_date = ?,
                phone = ?,
                address = ?,
                email = ?,
                allergies = ?,
                medical_conditions = ?,
                notes = ?
            WHERE id = ?
            `,
            [
                full_name,
                birth_date,
                phone,
                address,
                email,
                allergies,
                medical_conditions,
                notes,
                id
            ]
        );

        res.json({
            message:
                'Paciente actualizado correctamente'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Error interno'
        });

    }

};

module.exports = {
    getPatients,
    createPatient,
    deletePatient,
    updatePatient
};