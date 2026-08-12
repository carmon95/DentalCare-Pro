# DentalCare Pro Mobile

Aplicación móvil para Android e iOS construida con React Native, Expo y Expo Router. Reutiliza la API de DentalCare Pro para autenticación y, en las siguientes etapas, pacientes, citas, tratamientos, pagos y reportes.

## Preparación

1. Instala las dependencias:

   ```bash
   npm install
   npx expo install expo-secure-store
   ```

2. Copia `.env.example` a `.env` y asigna una URL que el teléfono pueda alcanzar. En un dispositivo físico, usa la IP local del equipo donde corre el backend, por ejemplo `http://192.168.1.100:3001/api`.

3. Inicia la aplicación:

   ```bash
   npm start
   ```

Escanea el código QR con Expo Go o abre un emulador Android/iOS.

## Alcance inicial

- Inicio de sesión con la API actual (`POST /api/auth/login`).
- Token y sesión almacenados en el almacén seguro del dispositivo.
- Navegación por Inicio, Citas, Pacientes, Reportes y Configuración.
- Pantallas base listas para implementar los módulos funcionales.

## Seguridad

La API actual debe publicarse mediante HTTPS y proteger sus rutas con JWT antes de distribuir una versión de producción. Nunca incluyas contraseñas ni secretos en variables `EXPO_PUBLIC_*`.
