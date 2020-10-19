import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import { Container, makeStyles } from "@material-ui/core";
import { isLoggedInVar } from "./graphql/cache";
import { Home, Result } from "./pages";
import { useReactiveVar } from "@apollo/client";
import { RegisterUser } from "./components";

const useStyles = makeStyles(() => ({
  root: {
    padding: "50px 20px"
  }
}));

const App = () => {
  const classes = useStyles();
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const handleSubmit = e => {
    isLoggedInVar(true);
    localStorage.setItem("isLoggedIn", JSON.stringify(true));
  };

  return !isLoggedIn ? (
    <RegisterUser onSubmit={handleSubmit} open={!isLoggedIn} />
  ) : (
    <Router>
      <Switch>
        <Route exact path="/">
          <Container className={classes.root}>
            <Home />
          </Container>
        </Route>
        <Router path="/result">
          <Container className={classes.root}>
            <Result />
          </Container>
        </Router>
      </Switch>
    </Router>
  );
};

export default App;
