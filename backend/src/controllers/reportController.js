const db = require('../config/db');

const isDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value || '');

const getReports = async (req, res) => {
    const today = new Date().toISOString().slice(0, 10);
    const monthStart = `${today.slice(0, 7)}-01`;
    const from = isDate(req.query.from) ? req.query.from : monthStart;
    const to = isDate(req.query.to) ? req.query.to : today;

    if (from > to) {
        return res.status(400).json({
            message: 'La fecha inicial no puede ser posterior a la fecha final.'
        });
    }

    try {
        const [
            [[financial]],
            [[patients]],
            [[appointments]],
            [treatmentStatus],
            [monthlyRevenue],
            [topTreatments],
            [paymentMethods],
            [recentPayments]
        ] = await Promise.all([
            db.query(`
                SELECT
                    COALESCE(SUM(amount), 0) AS collected,
                    COUNT(*) AS payments_count
                FROM payments
                WHERE payment_date BETWEEN ? AND ?
            `, [from, to]),
            db.query(`
                SELECT COUNT(*) AS new_patients
                FROM patients
                WHERE DATE(created_at) BETWEEN ? AND ?
            `, [from, to]),
            db.query(`
                SELECT
                    COUNT(*) AS total,
                    SUM(status = 'ATENDIDA') AS attended,
                    SUM(status = 'CANCELADA') AS cancelled,
                    SUM(status IN ('PENDIENTE', 'CONFIRMADA')) AS scheduled
                FROM appointments
                WHERE appointment_date BETWEEN ? AND ?
            `, [from, to]),
            db.query(`
                SELECT status, COUNT(*) AS total
                FROM treatments
                WHERE start_date BETWEEN ? AND ?
                GROUP BY status
                ORDER BY total DESC
            `, [from, to]),
            db.query(`
                SELECT
                    DATE_FORMAT(payment_date, '%Y-%m') AS month,
                    COALESCE(SUM(amount), 0) AS total
                FROM payments
                WHERE payment_date BETWEEN ? AND ?
                GROUP BY DATE_FORMAT(payment_date, '%Y-%m')
                ORDER BY month
            `, [from, to]),
            db.query(`
                SELECT
                    treatment_type,
                    COUNT(*) AS total,
                    COALESCE(SUM(cost), 0) AS billed
                FROM treatments
                WHERE start_date BETWEEN ? AND ?
                GROUP BY treatment_type
                ORDER BY total DESC, billed DESC
                LIMIT 5
            `, [from, to]),
            db.query(`
                SELECT
                    COALESCE(NULLIF(payment_method, ''), 'No especificado') AS method,
                    COALESCE(SUM(amount), 0) AS total
                FROM payments
                WHERE payment_date BETWEEN ? AND ?
                GROUP BY COALESCE(NULLIF(payment_method, ''), 'No especificado')
                ORDER BY total DESC
            `, [from, to]),
            db.query(`
                SELECT
                    p.id,
                    p.amount,
                    p.payment_date,
                    p.payment_method,
                    pa.full_name,
                    t.treatment_type
                FROM payments p
                INNER JOIN treatments t ON t.id = p.treatment_id
                INNER JOIN patients pa ON pa.id = t.patient_id
                WHERE p.payment_date BETWEEN ? AND ?
                ORDER BY p.payment_date DESC, p.id DESC
                LIMIT 5
            `, [from, to])
        ]);

        const [[treatmentsFinancial]] = await db.query(`
            SELECT
                COALESCE(SUM(t.cost), 0) AS billed,
                COALESCE(SUM(t.cost - COALESCE(payments.total_paid, 0)), 0) AS pending
            FROM treatments t
            LEFT JOIN (
                SELECT treatment_id, SUM(amount) AS total_paid
                FROM payments
                GROUP BY treatment_id
            ) payments ON payments.treatment_id = t.id
            WHERE t.start_date BETWEEN ? AND ?
        `, [from, to]);

        res.json({
            period: { from, to },
            kpis: {
                collected: Number(financial.collected),
                billed: Number(treatmentsFinancial.billed),
                pending: Number(treatmentsFinancial.pending),
                paymentsCount: Number(financial.payments_count),
                newPatients: Number(patients.new_patients),
                appointments: {
                    total: Number(appointments.total),
                    attended: Number(appointments.attended || 0),
                    cancelled: Number(appointments.cancelled || 0),
                    scheduled: Number(appointments.scheduled || 0)
                }
            },
            treatmentStatus,
            monthlyRevenue,
            topTreatments,
            paymentMethods,
            recentPayments
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'No fue posible generar el reporte.' });
    }
};

module.exports = { getReports };
