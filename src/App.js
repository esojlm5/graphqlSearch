import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import { Container, makeStyles } from "@material-ui/core";
import { Home, Result } from "./pages";

const useStyles = makeStyles(() => ({
  root: {
    padding: "50px 20px"
  }
}));

function App() {
  const classes = useStyles();

  return (
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
}

export default App;
