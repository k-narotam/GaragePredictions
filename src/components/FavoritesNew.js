import React, { useEffect, useState } from 'react';
import tableIcons from "./TableIcons";
import MaterialTable from 'material-table';
import Title from '../components/Title';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const days = {
  "mon": "Monday",
  "tue": "Tuesday",
  "wed": "Wednesday",
  "thr": "Thursday",
  "fri": "Friday",
  "sat": "Saturday",
  "sun": "Sunday"
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

  const columns = [
    { title: "Weekday", 
      field: "day", 
      minWidth: 100, 
      lookup: days,
    },

      {
        title: "Time",
        field: "time",
        minWidth: 100,
        type: "time",
        dateSetting: {locale: 'en-US'},
        render: rowData => rowData.time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
        editComponent: ({ value, onChange }) => {
          return (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
              id="time-picker"
              label="Time picker"
              value={value}
              onChange={onChange}
              renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

          );
        }
      },

    { title: "Garage", 
      field: "garage_id", 
      minWidth: 100, 
      lookup: garages },

    { title: 'Prediction',
      field: 'garage_fullness',
      align: 'right',
      minWidth: 170,
      editable: 'never',
      render: rowData => formatPercentage(rowData.garage_fullness)
    }
  ];

  const handleGetFavorites = () => {
    setLoading(true);
      axios.get(global.config.host + '/list_favorites', { withCredentials: true })
        .then(res => {
          const data = res.data.favorites.map(row => {
            return createData(row.weekday, row.time, row.garage_id, row.garage_fullness);
          });
          data.sort((a, b) => {
            if (a.day < b.day) {
              return -1;
            }
            else if (a.day > b.day) {
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

  useEffect(() => {
    if (init) {
      handleGetFavorites();
      setInit(false);
    }
  }, [init]);

  return (
    <div>
      {loading ? <div>Loading...</div> :
        <MaterialTable
          title={<Title>Favorite Predictions</Title>}
          data={tableData}
          columns={columns}
          icons={tableIcons}
          options={{
            pageSize: 10,
            pageSizeOptions: [10, 50, 100],
            addRowPosition: 'first',
            actionsColumnIndex: -1,
            paginationType: 'stepped',
            search: false,
          }}

          editable={{
            onRowAdd: (newData) => new Promise((resolve, reject) => {
              axios.post(global.config.host + '/add_favorite',
                {"garage_id": newData.garage_id,
                  "weekday": newData.day,
                  "time": convertTimeToNum(newData.time)},
                {withCredentials: true}
              ).then(res => {
                setInit(true);
              });
              resolve();
            }),

            onRowDelete: (oldData) => new Promise((resolve) => {
              axios.post(global.config.host + '/delete_favorite',
                {"garage_id": oldData.garage_id,
                  "weekday": oldData.day,
                  "time": convertTimeToNum(oldData.time)},
                {withCredentials: true}
              ).then(res => {
                setInit(true);
              });
              resolve();
            }),

            onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
              console.log(oldData);
              console.log(newData);
              console.log(convertTimeToNum(newData.time));
              axios.post(global.config.host + '/delete_favorite',
                {"garage_id": oldData.garage_id,
                  "weekday": oldData.day,
                  "time": convertTimeToNum(oldData.time)},
                  {withCredentials: true}
                  ).then(res => {
                    axios.post(global.config.host + '/add_favorite',
                      {"garage_id": newData.garage_id,
                        "weekday": newData.day,
                        "time": convertTimeToNum(newData.time)},
                      {withCredentials: true}
                    ).then(res => {
                      setInit(true);
                    });
                  });
              resolve();
            }),
          }}
        />}
    </div>
  );
}
