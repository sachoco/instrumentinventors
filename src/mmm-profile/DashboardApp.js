import React from "react";
import { Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import mmmTheme from "./themes/mmmTheme";
import { SnackbarProvider } from "notistack";

import Dashboard from "./pages/Dashboard";
// import EditProfile from "./pages/EditProfile";
import "./App.scss";

const DashboardApp = () => (
  <>
    <SnackbarProvider maxSnack={3}>
      <ThemeProvider theme={mmmTheme}>
        <CssBaseline />
        <Dashboard />

        {/*<Switch>
        <Route path="/:username" exact component={ViewProfile} />
        <Route
          path="/:username/edit"
          render={(props) => <EditProfile {...props} />}
        ></Route>
      </Switch>*/}
      </ThemeProvider>
    </SnackbarProvider>
  </>
);

// export default App;
export default hot(module)(DashboardApp);
