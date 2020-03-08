import React from "react";
import "./App.css";
import { Container, makeStyles } from "@material-ui/core";
import Search from "./InputSearch";

const useStyles = makeStyles(() => ({
  root: {
    padding: "50px 20px"
  }
}));

function App() {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Search />
    </Container>
  );
}

export default App;
