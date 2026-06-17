import {
    Card,
    CardContent,
    Typography,
    Box
} from '@mui/material';

export default function KpiCard({
    title,
    value,
    icon,
    gradient
}) {

    return (

        <Card
            sx={{
                borderRadius: 4,
                background: gradient,
                color: '#fff',
                minHeight: 180,

                boxShadow:
                    '0 8px 25px rgba(0,0,0,0.15)',

                transition: '0.3s',

                '&:hover': {
                    transform: 'translateY(-5px)'
                }
            }}
        >

            <CardContent>

                <Typography
                    sx={{
                        opacity: 0.9,
                        fontSize: 15
                    }}
                >
                    {title}
                </Typography>

                <Typography
                    variant="h3"
                    fontWeight="bold"
                    mt={1}
                >
                    {value}
                </Typography>

                <Box
                    mt={2}
                    sx={{
                        fontSize: 34
                    }}
                >
                    {icon}
                </Box>

            </CardContent>

        </Card>

    );

}