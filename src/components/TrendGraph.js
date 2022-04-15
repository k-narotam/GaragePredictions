import React, { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';

import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { createTheme, ThemeProvider } from '@mui/material/styles';

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

const days = {
    "0": "Sunday",
    "1": "Monday",
    "2": "Tuesday",
    "3": "Wednesday",
    "4": "Thursday",
    "5": "Friday",
    "6": "Saturday",
};

const api_days = {
    0: 'sun',
    1: 'mon',
    2: 'tue',
    3: 'wed',
    4: 'thr',
    5: 'fri',
    6: 'sat',
}

const garages = {
    "a": "A",
    "c": "C",
    "d": "D",
    "i": "I",
    "l": "Libra",
}

export default function TrendGraph(props) {
    const [isLoading, setLoading] = useState(true);
    const [predictions, setPredictions] = useState(data);
    const [favorite, setFavorite] = useState(false);

    const [prediction, setPrediction] = useState(0);
    const [prediction_time, setPredictionTime] = useState(0);
    const [prediction_hour, setPredictionHour] = useState(0);
    const [prediction_spaces, setPredictionSpaces] = useState(0);

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

    const capSpaces = (spaces) => {
        if (spaces > garage_spaces[props.garage]) {
            return garage_spaces[props.garage];
        } else if (spaces < 0) {
            return 0;
        } else {
            return spaces;
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
                        borderRadius: '5px',
                        padding: '10px',
                        margin: '10px',
                    }}
                >
                    <p className="label">{`${label}: ${formatPercentage(payload[0].value)} Filled`}</p>
                    <p className="label">{`${payload[0].payload.spaces} Spaces`}</p>
                </div>
            );
        }

        return null;
    };

    const handleGraphClick = (event) => {
        setPrediction(capPrediction(event.activePayload[0].payload.filled));
        setPredictionTime(event.activePayload[0].payload.name);
        setPredictionHour(event.activePayload[0].payload.hour);
        setPredictionSpaces(capSpaces(event.activePayload[0].payload.spaces));
        setFavorite(true);
    }

    const handleFavoriteClick = () => {
        axios.post(global.config.host + "/add_favorite",
            {"garage_id": props.garage, "weekday":api_days[props.weekday], "time": prediction_hour},
            {withCredentials: true},
        );

        setFavorite(false);
    }
    const cancelFavorite = () => {
        setFavorite(false);
        setPrediction(0);
        setPredictionTime(0);
        setPredictionHour(0);
        setPredictionSpaces(0);
    }

    useEffect(() => {
        if (props.weekday !== '' && props.garage !== '') {
            setLoading(true);
            cancelFavorite();

            const capSpaces = (spaces) => {
                if (spaces > garage_spaces[props.garage]) {
                    return garage_spaces[props.garage];
                } else if (spaces < 0) {
                    return 0;
                } else {
                    return spaces;
                }
            }
            
            let newPredictions = structuredClone(data);

            axios.post(global.config.host + "/trend", { "garage_id": props.garage, "day": props.weekday })
                .then(response => {
                    if (response.data.error === '') {
                        newPredictions.forEach((prediction, index) => {
                            prediction.filled = 1 - capPrediction(response.data.predictions[index] / garage_spaces[props.garage]);
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
    }, [props.weekday, props.garage]);

    if (props.weekday === '' || props.garage === '') {
        return (
            <div>
                <Typography
                    component="h2"
                    variant="h6"
                    color="#c79632"
                    fontWeight="bold"
                    textAlign={'center'}
                    marginTop={'20px'}
                >
                    Select Weekday and Garage
                </Typography>
            </div>
        );
    }

    else {
        return (
            <div>
                <ThemeProvider theme={theme}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h6" color="#c79632" fontWeight="bold" gutterBottom textAlign={'center'}>
                                Future Availability
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <div>
                                {isLoading ?
                                    <Typography
                                        component="h2"
                                        variant="h6"
                                        color="#c79632"
                                        fontWeight="bold"
                                        textAlign={'center'}
                                        marginTop={'20px'}
                                    >
                                        Please Wait
                                    </Typography>
                                    :
                                    <div>
                                        <ResponsiveContainer
                                            width={"100%"}
                                            aspect={2.5}
                                        >
                                            <AreaChart
                                                data={predictions}
                                                margin={{
                                                    top: 5,
                                                    right: 30,
                                                    left: 20,
                                                    bottom: 5,
                                                }}
                                                onClick={handleGraphClick}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" tick={{fontSize: '12px'}}/>
                                                <YAxis domain={[0, 1]} tickFormatter={formatPercentage}/>
                                                <Tooltip content={<CustomTooltip />} />
                                                <Area type="monotone" dataKey="filled" stroke="#8884d8" activeDot={{ r: 8 }} />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                }
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            {favorite ?
                                <div>
                                    <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom textAlign={'center'}>
                                        Save Time?
                                    </Typography>
                                    <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom textAlign={'center'}>
                                        {`${days[props.weekday]}, ${prediction_time} at Garage ${garages[props.garage]}`}
                                    </Typography>
                                    <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom textAlign={'center'}>
                                        {`${prediction_spaces} Spaces, ${formatPercentage(prediction)} Filled`}
                                    </Typography>
                                    <Box
                                        textAlign="center"
                                        marginTop={'20px'}
                                        marginBottom={'20px'}
                                    >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            onClick={handleFavoriteClick}
                                        >
                                            Favorite
                                        </Button>
                                    </Box>
                                    <Box
                                        textAlign="center"
                                        marginTop={'20px'}
                                        marginBottom={'20px'}
                                    >
                                        <Button
                                            variant="contained"
                                            color="cancel"
                                            size="large"
                                            onClick={cancelFavorite}
                                        >
                                            Cancel
                                        </Button>
                                    </Box>
                                </div>
                                :
                                <div>
                                    <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom textAlign={'center'}>
                                        Click on the graph to save highlighted time.
                                    </Typography>
                                </div>
                            }
                        </Grid>
                    </Grid>
                </ThemeProvider>
            </div>
        );
    }
}
