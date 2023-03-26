import { createTheme } from '@mui/material';

export const yellowColor = 'rgb(255,169,3)';
export const blueColor = 'rgb(16,48,173)';

export const theme = createTheme({
    palette: {
         warning: {main: yellowColor},
         primary: {main: blueColor}
    },
});