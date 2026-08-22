import {
    Doughnut
} from 'react-chartjs-2';

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

import {
    Paper,
    Typography,
    Box
} from '@mui/material';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

export default function PatientsChart({

    data

}) {

    const chartData = {

        labels: [

            'Activos',

            'Inactivos'

        ],

        datasets: [

            {

                data: [

                    Number(data.active),

                    Number(data.inactive)

                ],

                backgroundColor: [

                    '#22C55E',

                    '#EF4444'

                ],

                borderColor: [

                    '#22C55E',

                    '#EF4444'

                ],

                borderWidth: 2,

                hoverOffset: 15

            }

        ]

    };

    return (

        <Paper

            sx={{

                p: 3,

                borderRadius: 4,

                height: 320,

                boxShadow:
                    '0 10px 30px rgba(0,0,0,0.08)'

            }}

        >

            <Typography

                variant="h6"

                fontWeight={700}

                mb={2}

            >

                👥 Pacientes Activos

            </Typography>

            <Box

                sx={{

                    height: 220,

                    display: 'flex',

                    justifyContent: 'center',

                    alignItems: 'center'

                }}

            >

                <Doughnut

                    data={chartData}

                    options={{

                        responsive: true,

                        maintainAspectRatio: false,

                        cutout: '65%',

                        plugins: {

                            legend: {

                                position: 'bottom',

                                labels: {

                                    usePointStyle: true,

                                    padding: 20

                                }

                            }

                        }

                    }}

                />

            </Box>

        </Paper>

    );

}