import React from "react";
import "./App.css";
// react router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//components
import SignIn from "./Components/PhoneOtp/SignIn";
import Home from "./Components/PhoneOtp/Home";

const App = () => {
  return (
    <Router>
      <div id="recaptcha-container"></div>
      <Switch>
        <Route path="/home" exact>
          <Home />
        </Route>
        <Route path="/" exact>
          <SignIn />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
