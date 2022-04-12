import React, { useState } from 'react';
import tableIcons from "./TableIcons";
import MaterialTable from 'material-table';
import Title from '../components/Title';
import axios from 'axios';

function createData(day, time, garage, prediction) {
  return { day, time, garage, prediction };
}

const rows = []//.sort((a, b) => (a.calories < b.calories ? -1 : 1));

export default function StickyHeadTable() {

  const [selectedData, setSelectedData] = useState([]);
  const [tableData, setTableData] = useState(rows);

  const columns = [
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

  axios.get("https://group17poos-api.herokuapp.com/list_favorites", {withCredentials: true})
    .then(response => {
      console.log(response.data);
    });

  return (
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
    />
  );
}