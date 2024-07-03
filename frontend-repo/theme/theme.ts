import { createTheme } from '@mui/material/styles';
import { green } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    secondary: {
      main: green[500]
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 16,
  },
});

export default theme;
