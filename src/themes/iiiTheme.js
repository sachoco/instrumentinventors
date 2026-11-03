import { createTheme } from "@mui/material/styles";
const iiiTheme = createTheme({
  palette: {
    primary: {
      main: "#000",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: "GT Walsheim, sans-serif",
  },
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The default props to change
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
  conponents: {
    MuiTabs: {
      styleOverrides: {
        root: {
          fontFamily: "Antipol Extended, sans-serif",
          fontSize: '3rem',
        }
      },
    },
  },
  overrides: {
    // Style sheet name ⚛️
    // MuiTextField: {
    //   // Name of the rule
    //   root: {
    //     borderRadius: 2,
    //     textTransform: "default",
    //   },
    //   contained: {
    //     // Some CSS
    //     boxShadow: "none",
    //     backgroundColor: "#000",
    //     color: "#fff",
    //     "&:hover": {
    //       boxShadow: "none",
    //
    //     }
    //
    //   },
    // },
  },
});
export default iiiTheme;
