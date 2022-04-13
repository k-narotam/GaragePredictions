import React, { useEffect, useState } from 'react';
import tableIcons from "./TableIcons";
import MaterialTable from 'material-table';
import Title from '../components/Title';
import axios from 'axios';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const days = {
  "mon": "Monday",
  "tue": "Tuesday",
  "wed": "Wednesday",
  "thu": "Thursday",
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
function createData(day, time, garage_id, garage_fullness) {
  return { day, time, garage_id, garage_fullness };

}

function convertNumToTime(number) {

  // Set positive value of number of sign negative
  number = Math.abs(number);

  // Separate the int from the decimal part
  let hour = Math.floor(number);
  let half = (hour >= 12) ? " PM" : " AM";
  let decpart = number - hour;
  hour = (hour > 12) ? hour - 12 : hour;
  hour = (hour === 0) ? 12 : hour;

  let min = 1 / 60;
  // Round to nearest minute
  decpart = min * Math.round(decpart / min);

  let minute = Math.floor(decpart * 60) + '';

  // Add padding if need
  console.log(minute);
  if (minute.length < 2) {
    minute = '0' + minute;
  }

  // Concate hours and minutes
  let time = hour + ':' + minute + half;

  return time;
}

function formatPercentage(value) {
  return `${Math.round(value * 100)}%`;
}

export default function StickyHeadTable() {

  const [selectedData, setSelectedData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [init, setInit] = useState(true);

  const columns = [
    { title: "Weekday", 
      field: "day", 
      minWidth: 100, 
      lookup: days },

    { title: "Time", 
      field: "time", 
      align: 'left', 
      minWidth: 100, 
      type:"numeric", 
      render: rowData => convertNumToTime(rowData.time), },

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
      //format: (value) => value.toLocaleString('en-US'),
    }
  ];

  const handleGetFavorites = () => {
    setLoading(true);
      axios.get(global.config.host + '/list_favorites', { withCredentials: true })
        .then(res => {
          const data = res.data.map(row => {
            return createData(row.weekday, row.time, row.garage_id, row.garage_fullness);
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
  }
  );

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
          }}
          editable={{
            onRowAdd: (newData) => new Promise((resolve, reject) => {
              axios.post(global.config.host + '/add_favorite',
                {"garage_id": newData.garage_id,
                  "weekday": newData.day,
                  "time": newData.time},
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
                  "time": oldData.time},
                {withCredentials: true}
              ).then(res => {
                setInit(true);
              });
              resolve();
            }),
            onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
              axios.post(global.config.host + '/delete_favorite',
                {"garage_id": oldData.garage_id,
                  "weekday": oldData.day,
                  "time": oldData.time},
                  {withCredentials: true}
                  ).then(res => {
                    axios.post(global.config.host + '/add_favorite',
                      {"garage_id": newData.garage_id,
                        "weekday": newData.day,
                        "time": newData.time},
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
