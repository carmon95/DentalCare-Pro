import {
    Bar
} from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from 'chart.js';

import {
    Paper,
    Typography,
    Box
} from '@mui/material';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

export default function TreatmentsChart({

    data

}) {

    const labels =
        data.map(item => item.status);

    const values =
        data.map(item => Number(item.total));

    const chartData = {

        labels,

        datasets: [

            {

                label: 'Tratamientos',

                data: values,

                backgroundColor: [

                    '#3B82F6',

                    '#22C55E',

                    '#F59E0B',

                    '#EF4444'

                ],

                borderRadius: 8,

                borderSkipped: false

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

                🦷 Tratamientos por Estado

            </Typography>

            <Box

                sx={{

                    height: 220,

                    display: 'flex',

                    alignItems: 'center'

                }}

            >

                <Bar

                    data={chartData}

                    options={{

                        responsive: true,

                        maintainAspectRatio: false,

                        plugins: {

                            legend: {

                                display: false

                            }

                        },

                        scales: {

                            y: {

                                beginAtZero: true,

                                ticks: {

                                    precision: 0

                                }

                            }

                        }

                    }}

                />

            </Box>

        </Paper>

    );

}