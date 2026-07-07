const db = require('../config/db');

/*
|--------------------------------------------------------------------------
| Obtener pagos
|--------------------------------------------------------------------------
*/

const getPayments = async (req, res) => {

    try {

        const [payments] = await db.query(`
                SELECT
            p.id,
            p.treatment_id,

            t.treatment_type,
            t.cost,

            pa.full_name,

            p.amount,
            p.payment_date,
            p.payment_method,
            p.notes

        FROM payments p

        INNER JOIN treatments t
            ON t.id = p.treatment_id

        INNER JOIN patients pa
            ON pa.id = t.patient_id

        ORDER BY
            p.payment_date DESC
        `);

        res.json(payments);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Error interno'
        });

    }

};

/*
|--------------------------------------------------------------------------
| Crear pago
|--------------------------------------------------------------------------
*/

const createPayment = async (req, res) => {

    try {

        const {
            treatment_id,
            amount,
            payment_date,
            payment_method,
            notes
        } = req.body;

        const [result] = await db.query(
            `
            INSERT INTO payments
            (
                treatment_id,
                amount,
                payment_date,
                payment_method,
                notes
            )
            VALUES
            (?, ?, ?, ?, ?)
            `,
            [
                treatment_id,
                amount,
                payment_date,
                payment_method,
                notes
            ]
        );

        res.status(201).json({
            id: result.insertId,
            message: 'Pago registrado correctamente'
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
| Actualizar pago
|--------------------------------------------------------------------------
*/

const updatePayment = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            treatment_id,
            amount,
            payment_date,
            payment_method,
            notes
        } = req.body;

        await db.query(
            `
            UPDATE payments
            SET
                treatment_id = ?,
                amount = ?,
                payment_date = ?,
                payment_method = ?,
                notes = ?
            WHERE id = ?
            `,
            [
                treatment_id,
                amount,
                payment_date,
                payment_method,
                notes,
                id
            ]
        );

        res.json({
            message: 'Pago actualizado correctamente'
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
| Eliminar pago
|--------------------------------------------------------------------------
*/

const deletePayment = async (req, res) => {

    try {

        const { id } = req.params;

        await db.query(
            `
            DELETE FROM payments
            WHERE id = ?
            `,
            [id]
        );

        res.json({
            message: 'Pago eliminado correctamente'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Error interno'
        });

    }

};

const getPaymentSummary = async (req, res) => {

    try {

        const [summary] = await db.query(`
            SELECT
                t.id,
                t.treatment_type,
                p.full_name,

                t.cost AS total_cost,

                COALESCE(
                    SUM(pay.amount),
                    0
                ) AS total_paid,

                (
                    t.cost -
                    COALESCE(
                        SUM(pay.amount),
                        0
                    )
                ) AS balance

            FROM treatments t

            INNER JOIN patients p
                ON p.id = t.patient_id

            LEFT JOIN payments pay
                ON pay.treatment_id = t.id

            GROUP BY
                t.id,
                p.full_name,
                t.treatment_type,
                t.cost

            ORDER BY
                t.id DESC
        `);

        res.json(summary);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Error interno'
        });

    }

};

module.exports = {
    getPayments,
    createPayment,
    updatePayment,
    deletePayment,
    getPaymentSummary
};