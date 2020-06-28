import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import Home from "./Home";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/parser" exact component={App} />
      </Switch>
    </Router>
  );
};

export default Routes;
