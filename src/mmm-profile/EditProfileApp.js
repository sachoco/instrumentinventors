import React from "react";
import { hot } from "react-hot-loader";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import mmmTheme from "./themes/mmmTheme";
import { SnackbarProvider } from "notistack";

import "./App.scss";

import EditProfile from "./pages/EditProfile";
// import './App.scss';

const EditProfileApp = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <ThemeProvider theme={mmmTheme}>
        <CssBaseline />
          <EditProfile />
      </ThemeProvider>
    </SnackbarProvider>
  );
};

// export default App;
export default hot(module)(EditProfileApp);
