import React from "react";
import { Controller, useForm } from "react-hook-form";
import { map, isEmpty } from "lodash";
import { yupResolver } from "@hookform/resolvers";

import { Button, Dialog, TextField } from "@material-ui/core";
import fields, { schema } from "./fields";

import { useStyles } from "./style";

const RegisterUser = ({ onSubmit, open }) => {
  const classes = useStyles();
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });

  return (
    <Dialog open={open}>
      <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
        {map(fields, ({ type, name, label, placeholder, autocomplete }) => (
          <Controller
            key={name}
            control={control}
            defaultValue=""
            as={TextField}
            name={name}
            type={type}
            margin="normal"
            label={label}
            placeholder={placeholder}
            fullWidth
            autoComplete={autocomplete}
            helperText={errors[name] && errors[name].message}
            error={!isEmpty(errors[name])}
          />
        ))}

        <Button
          className={classes.submit}
          variant="contained"
          color="primary"
          type="submit"
          size="large"
        >
          Iniciar sesión
        </Button>
      </form>
    </Dialog>
  );
};

export default RegisterUser;
