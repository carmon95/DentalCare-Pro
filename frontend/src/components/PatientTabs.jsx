import {
    Tabs,
    Tab,
    Paper,
    Box
} from '@mui/material';

export default function PatientTabs({

    value,

    onChange

}) {

    return (

        <Paper

            sx={{

                borderRadius:4,

                mb:3,

                boxShadow:
                    '0 10px 30px rgba(0,0,0,.08)'

            }}

        >

            <Tabs

                value={value}

                onChange={onChange}

                variant="scrollable"

                scrollButtons="auto"

            >

                <Tab
                    label="Datos"
                />

                <Tab
                    label="Historial"
                />

                <Tab
                    label="Tratamientos"
                />

                <Tab
                    label="Citas"
                />

                <Tab
                    label="Pagos"
                />

            </Tabs>

        </Paper>

    );

}