import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%"
  }
});

const Input = ({ handleChange, handleLink }) => {
  const classes = useStyles();

  return (
    <TextField
      className={classes.root}
      id="standard-basic"
      label="Search Jobs"
      onChange={e => handleChange(e)}
      onKeyUp={e => handleLink(e)}
    />
  );
};

export default Input;
