import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';

import TrendGraph from './TrendGraph';

export default function FutureTrends() {

  const [weekday, setWeekday] = useState('');
  const [garage, setGarage] = useState('');

  const handleWeekdayChange = (event) => {
    setWeekday(event.target.value);
  };

  const handleGarageChange = (event) => {
    setGarage(event.target.value);
  };

  return (
    <div>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent={"center"}
        alignItems={"center"}
        mt={10}
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
              <MenuItem value={1}>Monday</MenuItem>
              <MenuItem value={2}>Tuesday</MenuItem>
              <MenuItem value={3}>Wednesday</MenuItem>
              <MenuItem value={4}>Thursday</MenuItem>
              <MenuItem value={5}>Friday</MenuItem>
              <MenuItem value={6}>Saturday</MenuItem>
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
              <MenuItem value={'l'}>Libra</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid item>
        <TrendGraph 
          weekday={weekday}
          garage={garage}
        />
      </Grid>

    </div>
  );
}
