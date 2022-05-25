import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

export function useForm(initialFValues, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "Unit_Price_Box" || name === "Unit_Price_UN") {
      setValues({
        ...values,
        [name]: value.toFixed(5),
      });
    } else {
      if (name === "Active" || name === "Sold_Out") {
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
    }

    if (validateOnChange) validate({ [name]: value });
  };

  const handleInputQTDChange = (e, QTDValue) => {
    const { name, value } = e.target;
    const re = /^[+-]?\d*(?:[,,]\d*)?$/;

    let ConvertedValue = value.replace(",", ".");
    let ConvertedQTDValue = QTDValue.toString().replace(",", ".");

    if (name === "Total_Quantity") {
      if (value === "0" || value === "") {
        setValues({
          ...values,
          [name]: value,
          Unit_Price_UN: 0,
        });
      } else {
        if (re.test(value)) {
          setValues({
            ...values,
            [name]: value,
            Unit_Price_UN: (ConvertedQTDValue / ConvertedValue).toLocaleString(
              navigator.language,
              {
                minimumFractionDigits: 5,
              }
            ),
          });
        }
      }
    }

    if (name === "Unit_Price_Box") {
      if (value === "0" || value === "") {
        setValues({
          ...values,
          [name]: 0,
          Unit_Price_UN: 0,
        });
      } else {
        if (QTDValue === "0" || QTDValue === "") {
          setValues({
            ...values,
            [name]: value,
            Unit_Price_UN: 0,
          });
        } else {
          if (re.test(value)) {
            setValues({
              ...values,
              [name]: value,
              Unit_Price_UN: (
                ConvertedValue / ConvertedQTDValue
              ).toLocaleString(navigator.language, {
                minimumFractionDigits: 5,
              }),
            });
          }
        }
      }
    }

    if (name === "Unit_Price_UN") {
      if (value === "" || re.test(value)) {
        setValues({
          ...values,
          [name]: value,
          Unit_Price_Box: (ConvertedValue * ConvertedQTDValue).toLocaleString(
            navigator.language,
            {
              minimumFractionDigits: 5,
            }
          ),
        });
      }
    }

    /*    setValues({
      ...values,
      [name]: value,
    });*/
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
    handleInputQTDChange,
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
