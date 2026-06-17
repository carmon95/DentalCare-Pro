import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#4FC3F7'
        },
        secondary: {
            main: '#29B6F6'
        },
        background: {
            default: '#F5F9FC'
        }
    },
    shape: {
        borderRadius: 12
    }
});

export default theme;