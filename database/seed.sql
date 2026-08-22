SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- ==========================================
-- USERS
-- ==========================================

INSERT INTO users
(id,name,email,password,role,created_at,username)
VALUES
(
1,
'Administrador',
'admin@dental.com',
'$2b$10$yL5J1h/4jKI.ZSSG78hrGexXl8Y5wzRu169gvzzLpfDyP7rd8B0O2',
'ADMIN',
'2026-06-08 05:18:48',
'admin'
);

-- ==========================================
-- PATIENTS
-- ==========================================

INSERT INTO patients
(id,full_name,birth_date,phone,address,email,allergies,medical_conditions,notes,created_at,status)
VALUES
(1,'Juan Pérez','1990-01-10','88888888','Managua','juan@email.com','Lacteos','Hipertensión','Paciente de prueba','2026-06-09 23:24:28','ACTIVO'),
(2,'Carlos Montalvan','1995-05-10','88888888','Managua','carlos@test.com','Ninguna','Ninguna','Paciente de prueba','2026-06-10 00:20:22','ACTIVO'),
(3,'Esteban Solano','2008-06-09','7896-5897','Bello Horizonte','esteban.solano@gmail.com','Acaro','Sinusitis Alergica','paciente de prueba','2026-06-10 00:29:33','INACTIVO'),
(5,'Elieth Flores','1997-05-03','7896-5897','Managua','efloresolivas@gmail.com','Ninguna','','prueba','2026-06-13 14:34:44','ACTIVO'),
(7,'Anselmo Flores','2026-06-29','7896-5897','Altagracia','afloresolivas@gmail.com','Mariscos','Ninguna','','2026-06-30 04:37:13','ACTIVO'),
(8,'Jimmy Orozco','2022-01-06','45987562','Jinotega, la curva','jorozco@hotmail.com','Polvo','Asmatico','','2026-07-07 03:31:42','ACTIVO');

-- ==========================================
-- SETTINGS
-- ==========================================

INSERT INTO settings
(id,clinic_name,doctor_name,phone,email,address,opening_time,closing_time,appointment_duration)
VALUES
(
1,
'DentalCare Pro',
'Dra. Maria Eugenia',
'8568-7742',
'meugenia@gmail.com',
'Bello Horizonte',
'08:00:00',
'17:00:00',
30
);

-- ==========================================
-- TREATMENTS
-- ==========================================

INSERT INTO treatments
(id,patient_id,start_date,treatment_type,cost,status,notes,created_at,end_date)
VALUES
(1,5,'2026-06-16','Orthodoncia',30.00,'FINALIZADO','Paciente respondió bien al tratamiento.','2026-06-15 23:56:47','2026-06-18'),
(2,2,'2026-06-21','Blanqueamiento',25.00,'FINALIZADO','Excelente','2026-06-22 05:18:34','2026-06-21');

-- ==========================================
-- APPOINTMENTS
-- ==========================================

INSERT INTO appointments
(id,patient_id,appointment_date,appointment_time,reason,status,notes,created_at)
VALUES
(1,1,'2026-06-10','09:00:00','Ortodoncia','CANCELADA','Primera consulta','2026-06-10 03:03:32'),
(3,3,'2026-06-11','17:30:00','extraccion','CONFIRMADA','','2026-06-12 05:32:43'),
(5,2,'2026-06-13','11:00:00','Ortodoncia','CONFIRMADA','','2026-06-13 14:36:31'),
(6,7,'2026-07-02','11:45:00','Seguimiento','CONFIRMADA','Prueba','2026-07-03 04:45:59');

-- ==========================================
-- CLINICAL HISTORIES
-- ==========================================

INSERT INTO clinical_histories
(id,patient_id,chief_complaint,medical_history,allergies,current_medications,diagnosis,treatment_plan,blood_pressure,weight,notes,created_at)
VALUES
(1,3,'Extraccion de cordales','Alergias en piel','Pescado','Cetriler','Cordales','No tiene','Normal',80,'','2026-06-23 02:40:25'),
(2,5,'Seguimiento de endodoncia','Ninguno','mariscos','Doloneurovion','caries','1-2 semanas','Normal',75,'paciente f','2026-06-23 04:46:04');

-- ==========================================
-- PAYMENTS
-- ==========================================

INSERT INTO payments
(id,treatment_id,amount,payment_date,payment_method,notes,created_at)
VALUES
(2,1,30,'2026-06-19','EFECTIVO','Pago de limpieza dental','2026-06-19 03:21:00'),
(3,2,25,'2026-06-21','TARJETA','Excelente','2026-06-22 05:19:16');

COMMIT;