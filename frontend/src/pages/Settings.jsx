import {
    Typography,
    Paper,
    Grid,
    TextField,
    Button,
    Divider,
    MenuItem
} from '@mui/material';

import MainLayout from '../layouts/MainLayout';
import { useEffect, useState } from 'react';

import {
    getSettings,
    updateSettings
} from '../services/settingsService';

export default function Settings() {

    const [formData, setFormData] =
    useState({
        clinic_name: '',
        doctor_name: '',
        phone: '',
        email: '',
        address: '',
        opening_time: '08:00',
        closing_time: '17:00',
        appointment_duration: 30
    });

useEffect(() => {

    loadSettings();

}, []);

const loadSettings = async () => {

    try {

        const data =
            await getSettings();

        setFormData({
            clinic_name:
                data.clinic_name || '',
            doctor_name:
                data.doctor_name || '',
            phone:
                data.phone || '',
            email:
                data.email || '',
            address:
                data.address || '',
            opening_time:
                data.opening_time?.substring(0,5) || '08:00',
            closing_time:
                data.closing_time?.substring(0,5) || '17:00',
            appointment_duration:
                data.appointment_duration || 30
        });

    } catch (error) {

        console.error(error);

    }

};

const handleChange = (e) => {

    setFormData({

        ...formData,

        [e.target.name]:
            e.target.value

    });

};

const handleSave = async () => {

    try {

        await updateSettings(
            formData
        );

        alert(
            'Configuración guardada correctamente'
        );

    } catch (error) {

        console.error(error);

        alert(
            'Error al guardar configuración'
        );

    }

};

    return (

        <MainLayout>

            <Typography
                variant="h3"
                fontWeight={700}
                mb={4}
            >
                Configuración
            </Typography>

            <Grid
                container
                spacing={4}
            >

                {/* CLINICA */}

                <Grid item xs={12}>

                    <Paper
                        sx={{
                            p: 4,
                            borderRadius: 5
                        }}
                    >

                        <Typography
                            variant="h5"
                            fontWeight={700}
                            mb={3}
                        >
                            Información de la Clínica
                        </Typography>

                        <Grid container spacing={3}>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Nombre de la Clínica"
                                    name="clinic_name"
                                    value={formData.clinic_name}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Doctor(a)"
                                    name="doctor_name"
                                    value={formData.doctor_name}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Teléfono"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Correo"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Dirección"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </Grid>

                        </Grid>

                    </Paper>

                </Grid>

                {/* HORARIO */}

                <Grid item xs={12} md={6}>

                    <Paper
                        sx={{
                            p: 4,
                            borderRadius: 5,
                            height: '100%'
                        }}
                    >

                        <Typography
                            variant="h5"
                            fontWeight={700}
                            mb={3}
                        >
                            Horario de Atención
                        </Typography>

                        <TextField
    fullWidth
    name="opening_time"
    label="Hora de Apertura"
    type="time"
    value={formData.opening_time}
    onChange={handleChange}
    InputLabelProps={{
        shrink: true
    }}
    sx={{ mb: 3 }}
/>

                        <TextField
    fullWidth
    name="closing_time"
    label="Hora de Cierre"
    type="time"
    value={formData.closing_time}
    onChange={handleChange}
    InputLabelProps={{
        shrink: true
    }}
/>

                    </Paper>

                </Grid>

                {/* CITAS */}

                <Grid item xs={12} md={6}>

                    <Paper
                        sx={{
                            p: 4,
                            borderRadius: 5,
                            height: '100%'
                        }}
                    >

                        <Typography
                            variant="h5"
                            fontWeight={700}
                            mb={3}
                        >
                            Configuración de Citas
                        </Typography>

                        <TextField
    select
    fullWidth
    name="appointment_duration"
    label="Duración por Defecto"
    value={
        formData.appointment_duration
    }
    onChange={handleChange}
>

    <MenuItem value={30}>
        30 minutos
    </MenuItem>

    <MenuItem value={45}>
        45 minutos
    </MenuItem>

    <MenuItem value={60}>
        60 minutos
    </MenuItem>

</TextField>

                    </Paper>

                </Grid>

                {/* SEGURIDAD */}

                <Grid item xs={12}>

                    <Paper
                        sx={{
                            p: 4,
                            borderRadius: 5
                        }}
                    >

                        <Typography
                            variant="h5"
                            fontWeight={700}
                            mb={3}
                        >
                            Seguridad
                        </Typography>

                        <Grid container spacing={3}>

                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    type="password"
                                    label="Contraseña Actual"
                                />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    type="password"
                                    label="Nueva Contraseña"
                                />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    type="password"
                                    label="Confirmar Contraseña"
                                />
                            </Grid>

                        </Grid>

                    </Paper>

                </Grid>

                {/* SISTEMA */}

                <Grid item xs={12}>

                    <Paper
                        sx={{
                            p: 4,
                            borderRadius: 5
                        }}
                    >

                        <Typography
                            variant="h5"
                            fontWeight={700}
                        >
                            Información del Sistema
                        </Typography>

                        <Divider
                            sx={{
                                my: 2
                            }}
                        />

                        <Typography>
                            DentalCare Pro
                        </Typography>

                        <Typography>
                            Versión 1.0
                        </Typography>

                        <Typography>
                            Desarrollado por Carlos Montalván
                        </Typography>

                    </Paper>

                </Grid>

                <Grid item xs={12}>

                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleSave}
                    >
                        Guardar Configuración
                    </Button>

                </Grid>

            </Grid>

        </MainLayout>

    );

}