import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PaymentsIcon from '@mui/icons-material/Payments';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';

import { useNavigate, useLocation } from 'react-router-dom';

import logo from '../assets/logo.png';

const drawerWidth = 280;

export default function Sidebar() {

    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            text: 'Dashboard',
            icon: <DashboardIcon />,
            path: '/dashboard'
        },
        {
            text: 'Pacientes',
            icon: <PeopleIcon />,
            path: '/patients'
        },
        {
        text: 'Citas',
        icon: <EventIcon />,
        path: '/appointments'
        },
       {
        text: 'Tratamientos',
        icon: <MedicalServicesIcon />,
        path: '/treatments'
        },
        {
            text: 'Pagos',
            icon: <PaymentsIcon />
        },
        {
            text: 'Reportes',
            icon: <BarChartIcon />
        },
        {
            text: 'Configuración',
            icon: <SettingsIcon />,
            path: '/settings'
        }
    ];

    return (

        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,

                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    background:
                        'linear-gradient(180deg,#071330,#0F172A)',
                    color: '#fff',
                    borderRight: 'none'
                }
            }}
        >

            <Box
                sx={{
                    p: 3,
                    pt: 4,
                    textAlign: 'center'
                }}
            >

                <img
                    src={logo}
                    alt="DentalCare Pro"
                    style={{
                        width: '230px',
                        maxWidth: '100%'
                    }}
                />

            </Box>

            <List>

                {menuItems.map((item) => (

                    <ListItem
                        key={item.text}
                        disablePadding
                    >

                        <ListItemButton

                            onClick={() => {
                                if(item.path){
                                    navigate(item.path);
                                }
                            }}

                            selected={
                                location.pathname === item.path
                            }

                            sx={{
                                mx: 1.5,
                                my: 0.5,
                                borderRadius: 3,

                                '&.Mui-selected': {
                                    backgroundColor:
                                        'rgba(79,195,247,0.25)'
                                },

                                '&:hover': {
                                    backgroundColor:
                                        'rgba(79,195,247,0.15)'
                                }
                            }}
                        >

                            <ListItemIcon
                                sx={{
                                    color: '#4FC3F7',
                                    minWidth: 42
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>

                            <ListItemText
                                primary={item.text}
                            />

                        </ListItemButton>

                    </ListItem>

                ))}

            </List>

        </Drawer>

    );

}