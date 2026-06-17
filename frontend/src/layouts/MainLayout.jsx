import Box from '@mui/material/Box';

import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export default function MainLayout({ children }) {

    return (

        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
                backgroundColor: '#F8FAFC'
            }}
        >

            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    overflowX: 'hidden'
                }}
            >

                <Topbar />

                <Box
                    sx={{
                        flexGrow: 1,
                        p: 4,
                        width: '100%',
                        boxSizing: 'border-box'
                    }}
                >

                    {children}

                </Box>

            </Box>

        </Box>

    );

}