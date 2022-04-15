import React, { useState, useEffect } from "react";
import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';

const theme = createTheme({
    palette: {
        primary: {
            main: '#c79632',
            contrastText: '#fff',
        },
        cancel: {
            main: '#000000',
            contrastText: '#fff',
        },
    },
}); 

const data = [
    {
        name: '12 AM',
        hour: 0,
        filled: 0,
        spaces: 0,
    },
    {
        name: '1 AM',
        hour: 1,
        filled: 0,
        spaces: 0,
    },
    {
        name: '2 AM',
        hour: 2,
        filled: 0,
        spaces: 0,
    },
    {
        name: '3 AM',
        hour: 3,
        filled: 0,
        spaces: 0,
    },
    {
        name: '4 AM',
        hour: 4,
        filled: 0,
        spaces: 0,
    },
    {
        name: '5 AM',
        hour: 5,
        filled: 0,
        spaces: 0,
    },
    {
        name: '6 AM',
        hour: 6,
        filled: 0,
        spaces: 0,
    },
    {
        name: '7 AM',
        hour: 7,
        filled: 0,
        spaces: 0,
    },
    {
        name: '8 AM',
        hour: 8,
        filled: 0,
        spaces: 0,
    },
    {
        name: '9 AM',
        hour: 9,
        filled: 0,
        spaces: 0,
    },
    {
        name: '10 AM',
        hour: 10,
        filled: 0,
        spaces: 0,
    },
    {
        name: '11 AM',
        hour: 11,
        filled: 0,
        spaces: 0,
    },
    {
        name: '12 PM',
        hour: 12,
        filled: 0,
        spaces: 0,
    },
    {
        name: '1 PM',
        hour: 13,
        filled: 0,
        spaces: 0,
    },
    {
        name: '2 PM',
        hour: 14,
        filled: 0,
        spaces: 0,
    },
    {
        name: '3 PM',
        hour: 15,
        filled: 0,
        spaces: 0,
    },
    {
        name: '4 PM',
        hour: 16,
        filled: 0,
        spaces: 0,
    },
    {
        name: '5 PM',
        hour: 17,
        filled: 0,
        spaces: 0,
    },
    {
        name: '6 PM',
        hour: 18,
        filled: 0,
        spaces: 0,
    },
    {
        name: '7 PM',
        hour: 19,
        filled: 0,
        spaces: 0,
    },
    {
        name: '8 PM',
        hour: 20,
        filled: 0,
        spaces: 0,
    },
    {
        name: '9 PM',
        hour: 21,
        filled: 0,
        spaces: 0,
    },
    {
        name: '10 PM',
        hour: 22,
        filled: 0,
        spaces: 0,
    },
    {
        name: '11 PM',
        hour: 23,
        filled: 0,
        spaces: 0,
    },
];

const garage_spaces = {
    "a": 1623,
    "b": 1259,
    "c": 1852,
    "d": 1241,
    "h": 1284,
    "i": 1231,
    "l": 1007,
};

export default function MiniTrendGraph() {
    const [isLoading, setLoading] = useState(true);
    const [predictions, setPredictions] = useState(data);
    const [garage, setGarage] = useState("a");

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrow_day = tomorrow.getDay();

    const formatPercentage = (value) => {
        return `${Math.round(value * 100)}%`;
    }
    const capPrediction = (prediction) => {
        if (prediction > 1) {
            return 1;
        } else if (prediction < 0) {
            return 0;
        } else {
            return prediction;
        }
    }

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div
                    className="custom-tooltip"
                    style={{
                        backgroundColor: '#fff',
                        border: '1px solid #ccc',
                        borderRadius: '2px',
                        padding: '5px',
                        margin: '5px',
                        fontSize: '14px',
                    }}
                >
                    <p className="label"
                        style={{
                            margin: '0',
                        }}
                    >{`${label}: ${formatPercentage(payload[0].value)} Filled`}</p>
                    <p className="label"
                        style={{
                            margin: '0',
                        }}
                    >{`${payload[0].payload.spaces} Spaces`}</p>
                </div>
            );
        }

        return null;
    };


    useEffect(() => {
        if (garage !== '') {
            setLoading(true);

            const capSpaces = (spaces) => {
                if (spaces > garage_spaces[garage]) {
                    return garage_spaces[garage];
                } else if (spaces < 0) {
                    return 0;
                } else {
                    return spaces;
                }
            }

            let newPredictions = structuredClone(data);

            axios.post(global.config.host + "/trend", { "garage_id": garage, "day": tomorrow_day })
                .then(response => {
                    if (response.data.error === '') {
                        newPredictions.forEach((prediction, index) => {
                            prediction.filled = 1 - capPrediction(response.data.predictions[index] / garage_spaces[garage]);
                            prediction.spaces = capSpaces(Math.round(response.data.predictions[index]));
                        });

                        setPredictions(newPredictions);
                        setLoading(false);
                    }
                    else {
                        console.log(response.data.error);
                    }
                }
                )
        }
    }, [tomorrow_day, garage]);

    return (
        <div>
            <ThemeProvider theme={theme}>
                        <Grid 
                            container 
                            direction="column"
                            justify="center"
                            >
                            <TextField
                                value={garage}
                                onChange={(e) => setGarage(e.target.value)}
                                // id="garage-select"
                                style={{ width: '60%', margin: 'auto', textAlign : 'center'}}
                                select
                                label=" "
                                InputLabelProps={
                                    { shrink: false }
                                }
                                size="small"
                                >
                                <MenuItem value="a">Garage A</MenuItem>
                                <MenuItem value="c">Garage C</MenuItem>
                                <MenuItem value="d">Garage D</MenuItem>
                                <MenuItem value="i">Garage I</MenuItem>
                                <MenuItem value="l">Garage Libra</MenuItem>
                            </TextField>
                            {/* </Select> */}
                            {isLoading ?
                                <div style={{ textAlign: 'center' }}>
                                    <CircularProgress />
                                </div>
                                :
                                <div>
                                    <ResponsiveContainer
                                        width={"100%"}
                                        aspect={1.15}

                                    >
                                        <AreaChart
                                            data={predictions}
                                            margin={{
                                                top: 10,
                                                bottom: 10
                                            }}
                                        >
                                            <XAxis 
                                                dataKey="name" 
                                                height={19}
                                                tick={{ fontSize: '0.75rem' }}
                                                tickCount={4}
                                                ticks={["12 AM", "6 AM", "12 PM", "6 PM"]}
                                                />
                                            <YAxis 
                                                domain={[0, 1]} 
                                                tickFormatter={formatPercentage}
                                                width={42}
                                                tick={{ fontSize: '14px' }}
                                            />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Area type="monotone" dataKey="filled" stroke="#8884d8" activeDot={{ r: 8 }} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            }
                        </Grid>
            </ThemeProvider>
        </div>
    );
}
