import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Stack,
    TextField,
    Typography
} from "@mui/material";

import {
    useEffect,
    useState
} from "react";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import KeyIcon from "@mui/icons-material/Key";

export default function Activation() {

    const [machineId, setMachineId] = useState("");
    const [copied, setCopied] = useState(false);
    const [licenseFile, setLicenseFile] = useState("");
    const [licenseInfo, setLicenseInfo] = useState(null);
    const [activating, setActivating] = useState(false);

const [error, setError] = useState("");

const [success, setSuccess] = useState("");

    useEffect(() => {

        const loadMachineId = async () => {

            if (window.electronAPI) {

                const id = await window.electronAPI.getMachineId();

                setMachineId(id);

            }

        };

        loadMachineId();

    }, []);

    const handleCopy = async () => {

        if (!machineId) return;

        await navigator.clipboard.writeText(machineId);

        setCopied(true);

        setTimeout(() => {

            setCopied(false);

        }, 2000);

    };

    const handleBrowse = async () => {

    if (!window.electronAPI) {

        return;

    }

    setError("");

    setSuccess("");

    setLicenseInfo(null);

    const result = await window.electronAPI.selectLicense();

    if (result.canceled) {

        return;

    }

    if (!result.success) {

        setError(result.reason);

        return;

    }

    setLicenseFile("license.dat");

    setLicenseInfo(result.license);

    setSuccess("Licencia verificada correctamente.");

};

const handleActivate = async () => {

    if (!window.electronAPI) {

        return;

    }

    setActivating(true);

    const result = await window.electronAPI.activateSystem();

    setActivating(false);

    if (result.success) {

        alert("Sistema activado correctamente.");

    }

}

    return (

        <Box

            sx={{

                minHeight: "100vh",

                display: "flex",

                justifyContent: "center",

                alignItems: "center",

                bgcolor: "#F1F5F9"

            }}

        >

            <Card

                sx={{

                    width: 600,

                    borderRadius: 5,

                    boxShadow:
                        "0 20px 60px rgba(0,0,0,.12)"

                }}

            >

                <CardContent

                    sx={{

                        p: 5

                    }}

                >

                    <Typography

                        variant="h4"

                        fontWeight={700}

                        align="center"

                    >

                        🦷 DentalCare Pro

                    </Typography>

                    <Typography

                        align="center"

                        color="text.secondary"

                        sx={{

                            mb: 4

                        }}

                    >

                        Activación del Sistema

                    </Typography>

                    <Divider sx={{ mb: 4 }} />

                    <Typography

                        mb={1}

                        fontWeight={600}

                    >

                        Machine ID

                    </Typography>

                    <Stack

                        direction="row"

                        spacing={2}

                    >

                        <TextField

                            fullWidth

                            value={machineId}

                            InputProps={{

                                readOnly: true

                            }}

                        />

                        <Button

                            variant="contained"

                            onClick={handleCopy}

                        >

                            <ContentCopyIcon />

                            &nbsp;

                            {copied ? "Copiado" : "Copiar"}

                        </Button>

                    </Stack>

                    <Typography

                        mt={4}

                        mb={1}

                        fontWeight={600}

                    >

                        Archivo de Licencia

                    </Typography>

                    <Stack

                        direction="row"

                        spacing={2}

                    >

                      <TextField

                    fullWidth

                    value={licenseFile}

                    placeholder="Seleccione license.dat"

                    InputProps={{

                        readOnly: true

                    }}

                />

                       <Button

                    variant="outlined"

                    onClick={handleBrowse}

                >

                    Examinar

                </Button>

                    </Stack>

                    {

    error && (

        <Typography

            color="error"

            mt={2}

        >

            {error}

        </Typography>

    )

}

{

    success && (

        <Typography

            color="success.main"

            mt={2}

        >

            {success}

        </Typography>

    )

}

{

    licenseInfo && (

        <Box

            mt={3}

            p={2}

            sx={{

                bgcolor:"#F8FAFC",

                borderRadius:2,

                border:"1px solid #E2E8F0"

            }}

        >

            <Typography fontWeight={700}>

                Información de la licencia

            </Typography>

            <Typography>

                Clínica: {licenseInfo.clinic}

            </Typography>

            <Typography>

                Propietario: {licenseInfo.owner}

            </Typography>

            <Typography>

                Edición: {licenseInfo.edition}

            </Typography>

            <Typography>

                Versión: {licenseInfo.version}

            </Typography>

        </Box>

    )

}

                    <Button

    fullWidth

    size="large"

    variant="contained"

    startIcon={<KeyIcon />}

    onClick={handleActivate}

    disabled={!licenseInfo || activating}

    sx={{

        mt: 5,

        py: 1.5,

        borderRadius: 3

    }}

>

    {

        activating

            ? "Activando..."

            : "Activar Sistema"

    }

</Button>
                </CardContent>

            </Card>

        </Box>

    );

}