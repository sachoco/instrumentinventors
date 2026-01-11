import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Layout from "./components/layout/Layout";

import Home from "./pages/Home";
import Aggregation from "./pages/Aggregation";
import Single from "./pages/Single";
import SinglePage from "./pages/SinglePage";

import Program from "./pages/Program";
import ProgramNew from "./pages/ProgramNew";
import HostedProgram from "./pages/HostedProgram";
import Agency from "./pages/Agency";
import Education from "./pages/Education";
import Search from "./pages/Search";
import loadPages from "./components/rest-api/loadPages";
import fetchMenu from "./components/rest-api/fetchMenu";

const App = () => {
  const menuItems = fetchMenu();
  const pages = null; //loadPages(menuItems.items);

  return (
    <>
      <Layout menuItems={menuItems}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/artists/"
            exact
            render={(props) => (
              <Aggregation {...props} url="wp/v2/artist/?" posttype="artist" />
            )}
          />
          <Route
            path="/artist/:slug"
            render={(props) => <Single {...props} posttype="artist" />}
          />

          <Route path="/program/" exact component={Program} />
          <Route path="/program-new/" exact component={ProgramNew} />
          <Route path="/hosted-program/" exact component={HostedProgram} />
          <Route path="/agency/" exact component={Agency} />
          <Route path="/education/" exact component={Education} />

          <Route
            path="/agenda/"
            exact
            render={(props) => (
              <Aggregation {...props} url="wp/v2/agenda/?" posttype="agenda" />
            )}
          />
          <Route
            path="/agenda/:slug"
            render={(props) => <Single {...props} posttype="agenda" />}
          />
          <Route
            path="/projects/"
            exact
            render={(props) => (
              <Aggregation
                {...props}
                url="wp/v2/project/?"
                posttype="project"
              />
            )}
          />
          <Route
            path="/project/:slug"
            render={(props) => <Single {...props} posttype="project" />}
          />
          <Route
            path="/posts/"
            exact
            render={(props) => (
              <Aggregation
                {...props}
                url="wp/v2/posts/?"
                posttype="posts"
                key={props.location.key}
              />
            )}
          />
          <Route
            path="/post/:slug"
            render={(props) => <Single {...props} posttype="posts" />}
          />
          <Route path="/search/" render={(props) => <Search {...props} />} />
          <Route
            path="/:p1/:p2?"
            render={(props) => <SinglePage {...props} pages={pages} />}
          />
        </Switch>
      </Layout>
    </>
  );
};

export default App;
