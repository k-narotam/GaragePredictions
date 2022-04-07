import React from 'react';
import tableIcons from "./TableIcons";
import MaterialTable from 'material-table';
import Title from '../components/Title';

function createData(time, garage, prediction) {
  return { time, garage, prediction };
}

const rows = [
  createData('Monday 3:00 PM', 'A', '30%'),
  createData('Tuesday 4:45 PM', 'D', '25%'),
  createData('Tuesday 6:35 PM', 'B', '25%'),
  createData('Monday 7:45 AM', 'C', '75%'),
  createData('Thursday 1:00 PM', 'H', '41%'),
  createData('Friday 9:00 AM', 'I', '81%'),
  createData('Thursday 3:20 PM', 'A', '0%'),
  createData('Wednesday 2:20 PM', 'D', '45%'),
  createData('Friday 1:45 PM', 'B', '15%'),
  createData('Tuesday 7:35 AM', 'D', '75%'),
  createData('Wednesday 8:45 PM', 'I', '1%'),
  createData('Friday 12:45 PM', 'C', '8%'),
  createData('Tuesday 4:44 PM', 'A', '0%'),
]//.sort((a, b) => (a.calories < b.calories ? -1 : 1));

export default function StickyHeadTable() {

  const [selectedData, setSelectedData] = React.useState([]);
  const [tableData, setTableData] = React.useState(rows);

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