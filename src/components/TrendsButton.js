import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

/*
function preventDefault(event) {
  event.preventDefault();
}
*/

export default function TrendsButton() {
  return (
    <React.Fragment>
      <Title>See the Future at UCF</Title>
      
      <div>
        <Link color="primary" href="/trends">
        View Trends
        </Link>
      </div>
    </React.Fragment>
  );
}