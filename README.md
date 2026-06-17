# 🦷 DentalCare Pro

Sistema de gestión odontológica desarrollado para clínicas dentales, orientado a mejorar el control de pacientes, citas, tratamientos y procesos administrativos.

---

## 📌 Descripción

DentalCare Pro permite digitalizar las tareas diarias de una clínica odontológica, reemplazando procesos manuales por una plataforma moderna, intuitiva y fácil de utilizar.

Actualmente el sistema incluye:

* Gestión de Pacientes
* Agenda de Citas
* Gestión de Tratamientos
* Configuración de Clínica
* Dashboard Administrativo
* Autenticación de Usuarios

---

## 🚀 Tecnologías Utilizadas

### Frontend

* React
* Material UI (MUI)
* React Router
* Axios
* FullCalendar

### Backend

* Node.js
* Express.js
* MySQL
* JWT Authentication
* Bcrypt

### Base de Datos

* MySQL 8+

---

## 📂 Estructura del Proyecto

```text
DentalSystem/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── config/
│   │   └── middleware/
│   │
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── layouts/
│   │   └── routes/
│   │
│   └── App.jsx
│
└── tools/
```

---

## ⚙️ Instalación

### Clonar repositorio

```bash
git clone https://github.com/carmon95/DentalCare-Pro.git
```

### Backend

```bash
cd backend
npm install
npm run dev
```

Servidor:

```text
http://localhost:3001
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicación:

```text
http://localhost:5173
```

---

## 🗄️ Base de Datos

Crear una base de datos llamada:

```sql
CREATE DATABASE dentalcare_pro;
```

Configurar las credenciales en:

```text
backend/.env
```

Ejemplo:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=admin
DB_NAME=dentalcare_pro
DB_PORT=3306
JWT_SECRET=tu_clave_secreta
```

---

## 📋 Módulos Implementados

### ✅ Dashboard

* Resumen general del sistema
* Indicadores principales

### ✅ Pacientes

* Crear pacientes
* Editar pacientes
* Eliminar pacientes
* Buscar pacientes

### ✅ Citas

* Crear citas
* Editar citas
* Eliminar citas
* Agenda diaria
* Calendario mensual

### ✅ Tratamientos

* Registro de tratamientos
* Estado del tratamiento
* Costos
* Fechas de inicio y finalización

### ✅ Configuración

* Información de la clínica
* Horarios de atención
* Configuración general

---

## 🔄 Estado Actual del Proyecto

Versión actual:

```text
v1.0.0
```

En desarrollo:

* Historial Clínico
* Gestión de Pagos
* Reportes PDF
* Dashboard Financiero
* Gestión de Usuarios
* Adjuntos y Radiografías

---

## 👨‍💻 Autor

Carlos Montalván

Proyecto desarrollado como solución de gestión odontológica para clínicas dentales.

---

## 📄 Licencia

Uso privado.
Todos los derechos reservados.
