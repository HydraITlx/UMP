import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

export function useForm(initialFValues, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "Prefix" || name === "Number") {
      if (name === "Prefix") {
        setValues({
          ...values,
          [name]: value.slice(0, 4).toUpperCase(),
        });
        console.log(value);
        console.log("ENTTROU NO PREFIX");
      } else {
        const re = /^[0-9\b]+$/;
        if (value === "" || re.test(value)) {
          setValues({
            ...values,
            [name]: value.slice(0, 9),
          });
        }
      }
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
    if (validateOnChange) validate({ [name]: value });
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

export function Form(props) {
  const classes = useStyles();
  const { children, ...other } = props;
  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {props.children}
    </form>
  );
}
