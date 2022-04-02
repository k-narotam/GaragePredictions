import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
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
        <div>
          <Link href="/trends" color="primary">Check Future Dates</Link>
        </div>
      </div>
    </React.Fragment>
  );
}