import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark', // Set the theme type to dark
    primary: {
      main: '#FBCB1C', // dark grayblue = 1B1D21
    },
   
  },
});

export default theme;

/**
 *  secondary: {
      main: '#FBCB1C',
    },
    text: {
      primary: '#FFF',
      secondary: '#666',
    },
  },
  // Add more theme configurations if needed
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Change this to your desired border radius
          "&:hover": {
            backgroundColor: '#3D444E',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'gray', // Change this to your desired divider color
          height: '0.1px', // Change this to adjust the thickness of the divider
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1B1D21', // Change this to your desired background color
        },
      },
    },
 */