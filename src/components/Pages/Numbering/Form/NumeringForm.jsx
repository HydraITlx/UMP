import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Controls from "../../../Helpers/Controls";
import { useForm, Form } from "./useForm";
const initialFValues = {
  End_Date: new Date(),
  ID: " ",
  Name: "",
  Number: 0,
  Starting_Date: new Date(),
  Prefix: "",
};

export default function GroupForm(props) {
  const { addOrEdit, recordForEdit, isEdit, data, UCCOptions } = props;

  console.log(recordForEdit);

  let btnStyles = "";
  if (isEdit) {
    btnStyles = { minWidth: "100%" };
  } else {
    btnStyles = { minWidth: "100%" };
  }

  const validate = (fieldValues = values) => {
    console.log("sumbited");
    console.log(fieldValues);
    const errorText = "O campo não pode estar vazio";
    const errorText2 = "O valor não é valido";

    let temp = { ...errors };

    if ("Year" in fieldValues)
      temp.Year = fieldValues.Year > 1500 ? "" : errorText2;

    if ("Type" in fieldValues)
      temp.Type = fieldValues.Type !== " " ? "" : errorText;

    if ("ID" in fieldValues) temp.ID = fieldValues.ID !== " " ? "" : errorText;

    if ("CHNM" in fieldValues) temp.CHNM = fieldValues.CHNM ? "" : errorText;

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, recordForEdit, resetForm);
    }
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);
  console.log(values);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12} md={12}>
          <Controls.Select
            variant="outlined"
            name="ID"
            label="Nome*"
            value={values.ID}
            onChange={handleInputChange}
            options={UCCOptions}
            error={errors.ID}
          />
        </Grid>
        <Grid item xs={12} md={5} pb={5}>
          <Controls.DatePicker
            name="Starting_Date"
            label="Data Inicio"
            value={values.Starting_Date}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} md={5} pb={5}>
          <Controls.DatePicker
            name="End_Date"
            label="Data Fim"
            value={values.End_Date}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} md={5} pb={5}>
          <Controls.Input
            name="Prefix"
            label="Prefixo"
            value={values.Prefix}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} md={5}>
          <Controls.Input
            type="text"
            name="Number"
            label="Numeração"
            value={values.Number}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <Controls.Button style={btnStyles} type="submit" text="Submeter" />
        </Grid>
      </Grid>
    </Form>
  );
}
