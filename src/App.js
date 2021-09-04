import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
// import { hot } from "react-hot-loader";
import Layout from "./components/layout/Layout";

import Home from "./pages/Home";
import Artists from "./pages/Artists";
import SingleArtist from "./pages/SingleArtist";

import HostedProgram from "./pages/HostedProgram";


const App = () => {
  return (
    <>
      <Layout >
        <Switch>
          <Route path="/" exact component={Home} />
          {/*<Route
          path="/item"
          render={(props) => <EditProfile {...props} />}
        ></Route>*/}
          <Route path="/artists" exact component={Artists} />
          <Route path="/artists/:slug" component={SingleArtist} />

          <Route path="/hosted" exact component={HostedProgram} />
        </Switch>

      </Layout>
    </>
  );
}

export default App;
// export default hot(module)(ViewProfileApp);
