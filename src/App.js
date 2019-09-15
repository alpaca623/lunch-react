import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/Home";
import Admin from "./components/Admin";
import Login from "./components/Login";
import Join from "./components/Join";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Login} />
        <Route path="/join" component={Join} />
        <Route path="/home" component={Home} />
        <Route path="/admin" exact component={Admin} />
      </Router>
    );
  }
}

export default App;
