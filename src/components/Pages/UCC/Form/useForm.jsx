import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

export function useForm(initialFValues, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "Active") {
      setValues({
        ...values,
        [name]: checked,
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
    if (validateOnChange) validate({ [name]: value });
  };

  const handleInputChangeSelect = (e, pharmacistOptions) => {
    const { name, value } = e.target;
    let Email = "";
    let Phone = "";
    let Name = "";

    if (value !== " ") {
      const RespVariables = pharmacistOptions.filter(
        (item) => item.value === e.target.value
      );

      Email = RespVariables[0].Email;
      Phone = RespVariables[0].Phone;
      Name = RespVariables[0].label;
    }
    setValues({
      ...values,
      [name]: value,
      Responsible_Pharmacist_Email: Email,
      Responsible_Pharmacist_Phone: Phone,
      Responsible_Pharmacist_Name: Name,
    });
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
    handleInputChangeSelect,
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
