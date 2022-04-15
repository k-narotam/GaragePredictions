import React, { useEffect, useState } from 'react';
import tableIcons from "./TableIcons";
import MaterialTable, { MTableToolbar } from 'material-table';
import Title from '../components/Title';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
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

const days = {
  "mon": "Monday",
  "tue": "Tuesday",
  "wed": "Wednesday",
  "thr": "Thursday",
  "fri": "Friday",
  "sat": "Saturday",
  "sun": "Sunday"
};

const days_val = {
  "mon": 0,
  "tue": 1,
  "wed": 2,
  "thr": 3,
  "fri": 4,
  "sat": 5,
  "sun": 6
};

const garages = {
  "a": "A",
  "c": "C",
  "d": "D",
  "i": "I",
  "l": "Libra",
}

function createData(day, num_time, garage_id, garage_fullness) {

  let time = new Date();
  time.setHours(Math.floor(num_time));
  time.setMinutes(Math.round((num_time - Math.floor(num_time)) * 60));

  return { day, time, garage_id, garage_fullness };

}

function convertTimeToNum(time) {

  if (typeof (time) === 'string') {
    time = new Date(time);
  }

  let hours = time.getHours();
  let minutes = time.getMinutes();
  return hours + minutes / 60;
}

function formatPercentage(value) {
  return `${Math.round(value * 100)}%`;
}

export default function StickyHeadTable() {

  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [init, setInit] = useState(true);
  const [filter, setFilter] = useState("");

  const columns = [
    {
      title: "Weekday",
      field: "day",
      lookup: days,
      editComponent: props => (
        <TextField
          select
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
          style={{ width: 'auto' }}
          variant="standard"
        >
          {Object.keys(days).map(key => (
            <MenuItem key={key} value={key}>
              {days[key]}
            </MenuItem>
          ))}
        </TextField>
      ),
    },

    {
      title: "Time",
      field: "time",
      type: "time",
      dateSetting: { locale: 'en-US' },
      render: rowData => rowData.time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
      editComponent: ({ value, onChange }) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              id="time-picker"
              label="Select time"
              value={new Date(value)}
              onChange={onChange}
              minutesPlaceholder="Minutes"
              hoursPlaceholder="Hours"
              theme={theme}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        );
      }
    },

    {
      title: "Garage",
      field: "garage_id",
      lookup: garages,
      editComponent: props => (
        <TextField
          select
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
          style={{ width: 'auto' }}
          variant="standard"
        >
          {Object.keys(garages).map(key => (
            <MenuItem key={key} value={key}>
              {garages[key]}
            </MenuItem>
          ))}
        </TextField>
      ),
    },

    {
      title: 'Predicted Fullness',
      field: 'garage_fullness',
      align: 'right',
      editable: 'never',
      render: rowData => formatPercentage(rowData.garage_fullness)
    }
  ];

  const customFilter = () => {

    const changeFilter = (event) => {
      setFilter(event.target.value);
      setInit(true);
    }
    return (
      <div>
        <TextField
          value={filter}
          onChange={event => changeFilter(event)}
          select
          label=" "
          InputLabelProps={
              { shrink: false }
          }
          size="small"
          variant="standard"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="a">A</MenuItem>
          <MenuItem value="c">C</MenuItem>
          <MenuItem value="d">D</MenuItem>
          <MenuItem value="i">I</MenuItem>
          <MenuItem value="l">Libra</MenuItem>
        </TextField>
      </div>
    );
  }

  useEffect(() => {
    if (init) {
      const handleGetFavorites = () => {
        setLoading(true);
        axios.post(global.config.host + '/list_favorites', { "garage_id": filter }, { withCredentials: true })
          .then(res => {
            const data = res.data.favorites.map(row => {
              return createData(row.weekday, row.time, row.garage_id, row.garage_fullness);
            });
            data.sort((a, b) => {
              if (days_val[a.day] < days_val[b.day]) {
                return -1;
              }
              else if (days_val[a.day] > days_val[b.day]) {
                return 1;
              }
              else {
                if (a.time < b.time) {
                  return -1;
                }
                else if (a.time > b.time) {
                  return 1;
                }
                else {
                  if (a.garage_id < b.garage_id) {
                    return -1;
                  }
                  else if (a.garage_id > b.garage_id) {
                    return 1;
                  }
                  else {
                    return 0;
                  }
                }
              }
            });
            setTableData(data);
            setLoading(false);
          })
      }

      handleGetFavorites();
      setInit(false);
    }
  }, [init, filter]);

  return (
    <ThemeProvider theme={theme}>
      {loading ?
        <div style={{ textAlign: 'center' }}>
          <CircularProgress />
        </div> :
        <MaterialTable
          title=" "
          data={tableData}
          columns={columns}
          icons={tableIcons}

          components={{
            Toolbar: props => (
              <div
                style={{
                  padding: '0px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: '50px',
                  paddingLeft: '20px',
                  backgroundColor: '#f5f5f5',
                }}
              >
                <div style={{ marginRight: "650px", paddingTop: '10px', }}>
                  <Title>Favorite Predictions</Title>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    height: '50px',
                  }}

                >
                  Filter by Garage:
                </div>
                <div>
                  {customFilter()}
                </div>
                <MTableToolbar {...props} />
              </div>
            ),
          }}
          options={{
            pageSize: 10,
            pageSizeOptions: [10, 50, 100],
            addRowPosition: 'first',
            actionsColumnIndex: -1,
            paginationType: 'stepped',
            sorting: false,
            search: false,
          }}

          editable={{
            onRowAdd: (newData) => new Promise((resolve, reject) => {
              axios.post(global.config.host + '/add_favorite',
                {
                  "garage_id": newData.garage_id,
                  "weekday": newData.day,
                  "time": convertTimeToNum(newData.time)
                },
                { withCredentials: true }
              ).then(res => {
                setInit(true);
              });
              resolve();
            }),

            onRowDelete: (oldData) => new Promise((resolve) => {
              axios.post(global.config.host + '/delete_favorite',
                {
                  "garage_id": oldData.garage_id,
                  "weekday": oldData.day,
                  "time": convertTimeToNum(oldData.time)
                },
                { withCredentials: true }
              ).then(res => {
                setInit(true);
              });
              resolve();
            }),

            onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
              axios.post(global.config.host + '/delete_favorite',
                {
                  "garage_id": oldData.garage_id,
                  "weekday": oldData.day,
                  "time": convertTimeToNum(oldData.time)
                },
                { withCredentials: true }
              ).then(res => {
                console.log("in")
                axios.post(global.config.host + '/add_favorite',
                  {
                    "garage_id": newData.garage_id,
                    "weekday": newData.day,
                    "time": convertTimeToNum(newData.time)
                  },
                  { withCredentials: true }
                ).then(res => {
                  setInit(true);
                });
              });
              resolve();
            }),
          }}
        />}
    </ThemeProvider>
  );
}
