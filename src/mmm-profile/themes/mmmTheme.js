import { createMuiTheme } from "@material-ui/core/styles";
const mmmTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#09D2FF",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: "nobel, sans-serif",
  },
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The default props to change
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
  overrides: {
    // Style sheet name ⚛️
    MuiButton: {
      // Name of the rule
      root: {
        borderRadius: 2,
        textTransform: "default",
      },
      contained: {
        // Some CSS
        boxShadow: "none",
        backgroundColor: "#000",
        color: "#fff",
        "&:hover": {
          boxShadow: "none",

        }

      },
    },
    MuiChip: {
      root: {
        margin: '0 5px 5px 0',
      }
    }
  },
});
export default mmmTheme;
