import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import routes from "./routes";

class App extends Component {
  showRoutes = routes => {
    let result = [];
    result = routes.map((ele, index) => (
      <Route
        key={index}
        exact={ele.exact}
        path={ele.path}
        component={ele.main}
      />
    ));
    // Switch case routes
    return <Switch>{result}</Switch>;
  };

  render() {
    return <Router>{this.showRoutes(routes)}</Router>;
  }
}

export default App;
