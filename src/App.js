import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Layout from "./components/layout/Layout";

import Home from "./pages/Home";
import Aggregation from "./pages/Aggregation";
import Single from "./pages/Single";
import SinglePostPage from "./pages/SinglePostPage";

import HostedProgram from "./pages/HostedProgram";
import Agency from "./pages/Agency";
import Education from "./pages/Education";
import Search from "./pages/Search";



const App = () => {
  return (
    <>
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/artists/"
            exact
            render={(props) => (
              <Aggregation {...props} url="wp/v2/artist/?_embed&per_page=12&_fields=id,title,slug,formatted_date,acf,type,tags,featured_media,_links,_embedded" />
            )}
          />
          <Route
            path="/artist/:slug"
            render={(props) => <Single {...props} posttype="artist" />}
          />

          <Route path="/hosted/" exact component={HostedProgram} />
          <Route path="/agency/" exact component={Agency} />
          <Route path="/education/" exact component={Education} />
          <Route
            path="/editions/"
            exact
            render={(props) => (
              <Aggregation
                {...props}
                url="wp/v2/project/?type=editions&_embed"
              />
            )}
          />
          <Route
            path="/agenda/:slug"
            render={(props) => <Single {...props} posttype="agenda" />}
          />
          <Route
            path="/project/:slug"
            render={(props) => <Single {...props} posttype="project" />}
          />
          <Route
            path="/product/:slug"
            render={(props) => <Single {...props} posttype="product" />}
          />
          <Route
            path="/search/"
            render={(props) => (
              <Search {...props} />
            )}
          />
          <Route
            path="/:p1/:p2?"
            render={(props) => <SinglePostPage {...props} />}
          />
        </Switch>
      </Layout>
    </>
  );
};

export default App;
