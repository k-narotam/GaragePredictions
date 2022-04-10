import React, { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';

import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const data = [
    {
        name: '12 AM',
        filled: 0,
    },
    {
        name: '1 AM',
        filled: 0,
    },
    {
        name: '2 AM',
        filled: 0,
    },
    {
        name: '3 AM',
        filled: 0,
    },
    {
        name: '4 AM',
        filled: 0,
    },
    {
        name: '5 AM',
        filled: 0,
    },
    {
        name: '6 AM',
        filled: 0,
    },
    {
        name: '7 AM',
        filled: 0,
    },
    {
        name: '8 AM',
        filled: 0,
    },
    {
        name: '9 AM',
        filled: 0,
    },
    {
        name: '10 AM',
        filled: 0,
    },
    {
        name: '11 AM',
        filled: 0,
    },
    {
        name: '12 PM',
        filled: 0,
    },
    {
        name: '1 PM',
        filled: 0,
    },
    {
        name: '2 PM',
        filled: 0,
    },
    {
        name: '3 PM',
        filled: 0,
    },
    {
        name: '4 PM',
        filled: 0,
    },
    {
        name: '5 PM',
        filled: 0,
    },
    {
        name: '6 PM',
        filled: 0,
    },
    {
        name: '7 PM',
        filled: 0,
    },
    {
        name: '8 PM',
        filled: 0,
    },
    {
        name: '9 PM',
        filled: 0,
    },
    {
        name: '10 PM',
        filled: 0,
    },
    {
        name: '11 PM',
        filled: 0,
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

export default function TrendGraph(props) {
    const [isLoading, setLoading] = useState(true);
    const [predictions, setPredictions] = useState(data);

    const capPrediction = (prediction) => {
        if (prediction > 1) {
            return 1;
        } else if (prediction < 0) {
            return 0;
        } else {
            return prediction;
        }
    }

    useEffect(() => {
        if (props.weekday !== '' && props.garage !== '') {
            setLoading(true);

            let newPredictions = structuredClone(data);

            axios.post("https://group17poos-api.herokuapp.com/trend", { "garage_id": props.garage, "day": props.weekday })
                .then(response => {
                    if (response.data.error === '') {
                        newPredictions.forEach((prediction, index) => {
                            prediction.filled = 1 - capPrediction(response.data.predictions[index] / garage_spaces[props.garage]);
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

    console.log(props.weekday);

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
                <Typography variant="h6" color="#c79632" fontWeight="bold" gutterBottom textAlign={'center'}>
                    Future Availability
                </Typography>
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
                        <ResponsiveContainer width={"75%"} aspect={2.25}>
                            <AreaChart
                                width={500}
                                height={300}
                                data={predictions}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis domain={[0, 1]}/>
                                <Tooltip />
                                <Area type="monotone" dataKey="filled" stroke="#8884d8" activeDot={{ r: 8 }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    }
                </div>
            </div>
        );
    }
}