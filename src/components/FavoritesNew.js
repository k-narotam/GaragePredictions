import React, { useEffect, useState } from 'react';
import tableIcons from "./TableIcons";
import MaterialTable from 'material-table';
import Title from '../components/Title';
import axios from 'axios';

const days = {
  "mon": "Monday",
  "tue": "Tuesday",
  "wed": "Wednesday",
  "thu": "Thursday",
  "fri": "Friday",
  "sat": "Saturday",
  "sun": "Sunday"
};

function createData(day, time, garage, prediction) {
  return { day, time, garage, prediction };

}

function convertNumToTime(number) {
  // Check sign of given number
  let sign = (number >= 0) ? 1 : -1;

  // Set positive value of number of sign negative
  number = number * sign;

  // Separate the int from the decimal part
  let hour = Math.floor(number);
  let decpart = number - hour;

  let min = 1 / 60;
  // Round to nearest minute
  decpart = min * Math.round(decpart / min);

  let minute = Math.floor(decpart * 60) + '';

  // Add padding if need
  if (minute.length < 2) {
  minute = '0' + minute; 
  }

  // Add Sign in final result
  sign = sign == 1 ? '' : '-';

  // Concate hours and minutes
  let time = sign + hour + ':' + minute;

  return time;
}

function formatPercentage (value) {
  return `${Math.round(value * 100)}%`;
}

export default function StickyHeadTable() {

  const [selectedData, setSelectedData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { title: "Weekday", field: "day", minWidth: 170},
    { title: "Time", field: "time", minWidth: 170 },
    { title: "Garage", field: "garage", minWidth: 100 },
    {
      title: 'Prediction',
      field: 'prediction',
      align: 'right',
      minWidth: 170,
      editable: 'never',
      //format: (value) => value.toLocaleString('en-US'),
    }
  ];

  const handleBulkDelete = () => {
    const updatedData = tableData.filter(row=>!selectedData.includes(row))
    setTableData(updatedData)
  }

  useEffect(() => {
    if (tableData.length === 0) {
      setLoading(true);
      axios.get(global.config.host + '/list_favorites', {withCredentials: true})
      .then(res => {
        const data = res.data.map(row => {
          return createData(days[row.weekday], convertNumToTime(row.time), row.garage_id, formatPercentage(row.garage_fullness));
        });
        console.log(data);
        setTableData(data);
        console.log(tableData.length);
        setLoading(false);
      })
    }

    // axios.get(global.config.host + "/list_favorites", {withCredentials: true})
    // .then(response => {
    //   // console.log(response.data);
    //   const data = response.data.map(row => {
    //     return createData(row.day, convertNumToTime(row.time), row.garage_id.toUpperCase(), formatPercentage(row.garage_fullness));
    //   }
    //   );
    //   setTableData(data);
    //   // console.log(data);
    // });
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
      onSelectionChange={(data) => setSelectedData(data)}
      options={{
        pageSize: 10,
        pageSizeOptions: [10, 50, 100],
        selection: true,
        addRowPosition: 'first',
        actionsColumnIndex: -1,
        paginationType: 'stepped',
      }}
      actions={[
        {
          icon: tableIcons.Delete,
          tooltip: 'Delete Favorites',
          onClick:() => handleBulkDelete()
        }
      ]}
      editable={{
        onRowAdd: (newData) => new Promise((resolve, reject) => {
         setTableData([...tableData, newData])
         setTimeout(() => resolve(), 100)
        }),
        onRowUpdate:(newData, oldData) => new Promise((resolve, reject) => {
          const updatedData=[...tableData]
          updatedData[updatedData.indexOf(oldData)]=newData
          setTableData(updatedData)

          setTimeout(() => resolve(), 100)
        }),
      }}
    />}
    </div>
  );
}
