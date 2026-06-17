import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Avatar,
    IconButton,
    Menu,
    MenuItem
} from '@mui/material';

import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Topbar() {

    const navigate = useNavigate();

    const user =
        JSON.parse(localStorage.getItem('user'));

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {

        localStorage.removeItem('token');
        localStorage.removeItem('user');

        navigate('/');

    };

    const currentHour = new Date().getHours();

    let greeting = 'Buenos días';

    if (currentHour >= 12 && currentHour < 18) {
        greeting = 'Buenas tardes';
    }

    if (currentHour >= 18) {
        greeting = 'Buenas noches';
    }

    const currentDate = new Date().toLocaleDateString(
        'es-NI',
        {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
    );

    return (

        <AppBar
            position="static"
            elevation={0}
            sx={{
                backgroundColor: '#FFFFFF',
                color: '#000',
                borderBottom: '1px solid #E2E8F0'
            }}
        >

            <Toolbar>

                <Box>

                    <Typography
                        variant="h5"
                        fontWeight={700}
                        sx={{
                            color: '#0F172A'
                        }}
                    >
                        {greeting} {user?.name || 'Administrador'} 👋
                    </Typography>

                    <Typography
                        sx={{
                            color: '#64748B',
                            mt: 0.5,
                            textTransform: 'capitalize'
                        }}
                    >
                        {currentDate}
                    </Typography>

                </Box>

                <Box sx={{ flexGrow: 1 }} />

                <IconButton>

                    <NotificationsIcon
                        sx={{
                            color: '#38BDF8'
                        }}
                    />

                </IconButton>

                <Typography
                    sx={{
                        mx: 2,
                        fontWeight: 600,
                        color: '#0F172A'
                    }}
                >
                    {user?.name || 'Administrador'}
                </Typography>

                <IconButton
                    onClick={handleMenuOpen}
                >

                    <Avatar
                        sx={{
                            bgcolor: '#38BDF8'
                        }}
                    >
                        {user?.name?.charAt(0) || 'A'}
                    </Avatar>

                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                >

                    <MenuItem
                        onClick={handleLogout}
                    >

                        <LogoutIcon
                            sx={{
                                mr: 1
                            }}
                        />

                        Cerrar Sesión

                    </MenuItem>

                </Menu>

            </Toolbar>

        </AppBar>

    );

}