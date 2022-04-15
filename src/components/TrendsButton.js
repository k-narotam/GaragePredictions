import React from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#c79632',
            contrastText: '#fff',
        },
    },
});
export default function TrendsButton() {
  return (
    <ThemeProvider theme={theme}>
        <div style={{ textAlign: 'center' }}>
          {/* <Link href="/trends" color="primary">Check Future Dates</Link> */}
          <Button href="/trends" color="primary" variant='contained' size="small">Check Future Dates</Button>
        </div>
    </ThemeProvider>
  );
}