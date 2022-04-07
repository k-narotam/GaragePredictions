import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
    filled: 5,
  },
  {
    name: '7 AM',
    filled: 10,
  },
  {
    name: '8 AM',
    filled: 20,
  },
  {
    name: '9 AM',
    filled: 50,
  },
  {
    name: '10 AM',
    filled: 70,
  },
  {
    name: '11 AM',
    filled: 90,
  },
  {
    name: '12 PM',
    filled: 100,
  },
  {
    name: '1 PM',
    filled: 90,
  },
  {
    name: '2 PM',
    filled: 70,
  },
  {
    name: '3 PM',
    filled: 60,
  },
  {
    name: '4 PM',
    filled: 30,
  },
  {
    name: '5 PM',
    filled: 30,
  },
  {
    name: '6 PM',
    filled: 20,
  },
  {
    name: '7 PM',
    filled: 15,
  },
  {
    name: '8 PM',
    filled: 10,
  },
  {
    name: '9 PM',
    filled: 5,
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

export default function FutureTrends() {

  const [weekday, setWeekday] = useState('');
  const [garage, setGarage] = useState('');

  const handleWeekdayChange = (event) => {
    setWeekday(event.target.value);
  };

  const handleGarageChange = (event) => {
    setGarage(event.target.value);
  };

  const handleGraph = () => {
    console.log(weekday);
    if (weekday === '' && garage === '') {
      return (
        <div>
          <Typography variant="h6" color="#c79632" fontWeight= "bold" gutterBottom>
            Select a weekday and a garage to see the future trends.
          </Typography>
        </div>
      );
    }
    else if (weekday === 24 && garage === 'c') {
      return (
        <ResponsiveContainer width={"75%"} aspect={2.25}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="filled" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      );
    }
    else {
      return ("No data available");
    }
  };
  return (
    <div>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent={"center"}
        alignItems={"center"}
        mt={5}
      >
        <Grid item>
          <Typography variant="h5">Check next</Typography>
        </Grid>

        <Grid item>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="future-weekday">Weekday</InputLabel>
            <Select
              labelId="future-weekday"
              id="future-weekday-select"
              value={weekday}
              label="Weekday"
              onChange={handleWeekdayChange}
            >
              <MenuItem value={0}>Sunday</MenuItem>
              <MenuItem value={24}>Monday</MenuItem>
              <MenuItem value={48}>Tuesday</MenuItem>
              <MenuItem value={72}>Wednesday</MenuItem>
              <MenuItem value={96}>Thursday</MenuItem>
              <MenuItem value={120}>Friday</MenuItem>
              <MenuItem value={144}>Saturday</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <Typography variant="h5">at Garage</Typography>
        </Grid>

        <Grid item>

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="future-garage">Garage</InputLabel>
            <Select
              labelId="future-garage"
              id="future-garage-select"
              value={garage}
              label="Garage"
              onChange={handleGarageChange}
            >
              <MenuItem value={'a'}>A</MenuItem>
              <MenuItem value={'c'}>C</MenuItem>
              <MenuItem value={'d'}>D</MenuItem>
              <MenuItem value={'i'}>I</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid item >
        {handleGraph()}
      </Grid>

    </div>
  );
}

