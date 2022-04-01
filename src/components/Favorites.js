import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, favorite, prediction) {
  return { id, favorite, prediction};
}

const rows = [
  createData(
    0, 'Monday 3:00 pm', '80%'
  ),
  createData(
    1, 'Tuesday 4:00 pm', '32%'
  )
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Favorite Predictions</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Day & Time</TableCell>
   
            <TableCell>Prediction</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.favorite}</TableCell>
              <TableCell> {row.prediction}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        View More
      </Link>
    </React.Fragment>
  );
}