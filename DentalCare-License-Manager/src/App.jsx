import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    MenuItem,
    Button,
    Grid,
    Stack
} from "@mui/material";

import {
    useState
} from "react";

export default function App() {

    const [clinic, setClinic] = useState("");

    const [owner, setOwner] = useState("");

    const [machineId, setMachineId] = useState("");

    const [edition, setEdition] = useState("Professional");

    const [version, setVersion] = useState("1.0");

    const generateLicense = async () => {

    const result = await window.electronAPI.generateLicense({

        clinic,

        owner,

        machineId,

        edition,

        version,

        expiresAt: null

    });

    if (!result.success) {

        alert(result.message);

        return;

    }

    const save = await window.electronAPI.saveLicense(

        result.license

    );

    if (save.success) {

        alert("Licencia generada correctamente.");

    }

};

    return (

        <Box

            sx={{

                minHeight:"100vh",

                bgcolor:"#EEF5FC",

                display:"flex",

                justifyContent:"center",

                alignItems:"center",

                p:4

            }}

        >

            <Card

                sx={{

                    width:900,

                    borderRadius:4,

                    boxShadow:8

                }}

            >

                <CardContent sx={{p:5}}>

                    <Typography

                        variant="h3"

                        fontWeight="bold"

                        color="primary"

                        gutterBottom

                    >

                        DentalCare License Manager

                    </Typography>

                    <Typography

                        color="text.secondary"

                        mb={4}

                    >

                        Generador oficial de licencias para DentalCare Pro.

                    </Typography>

                    <Grid container spacing={3}>

                        <Grid item xs={12}>

                            <TextField

                                fullWidth

                                label="Clínica"

                                value={clinic}

                                onChange={(e)=>setClinic(e.target.value)}

                            />

                        </Grid>

                        <Grid item xs={12}>

                            <TextField

                                fullWidth

                                label="Propietario"

                                value={owner}

                                onChange={(e)=>setOwner(e.target.value)}

                            />

                        </Grid>

                        <Grid item xs={12}>

                            <TextField

                                fullWidth

                                multiline

                                minRows={3}

                                label="Machine ID"

                                value={machineId}

                                onChange={(e)=>setMachineId(e.target.value)}

                            />

                        </Grid>

                        <Grid item xs={6}>

                            <TextField

                                fullWidth

                                select

                                label="Edición"

                                value={edition}

                                onChange={(e)=>setEdition(e.target.value)}

                            >

                                <MenuItem value="Professional">

                                    Professional

                                </MenuItem>

                                <MenuItem value="Enterprise">

                                    Enterprise

                                </MenuItem>

                            </TextField>

                        </Grid>

                        <Grid item xs={6}>

                            <TextField

                                fullWidth

                                label="Versión"

                                value={version}

                                onChange={(e)=>setVersion(e.target.value)}

                            />

                        </Grid>

                    </Grid>

                    <Stack

                        mt={5}

                        direction="row"

                        justifyContent="flex-end"

                    >

                        <Button

                            size="large"

                            variant="contained"

                              onClick={generateLicense}

                        >

                            GENERAR LICENCIA

                        </Button>

                    </Stack>

                </CardContent>

            </Card>

        </Box>

    );

}