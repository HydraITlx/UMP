import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Controls from "../../../Helpers/Controls";
import { useForm, Form } from "./useForm";

const initialFValues = {
  value: "",
  label: "",
};

export default function GroupForm(props) {
  const { children, addOrEdit, recordForEdit, isEdit, data } = props;
  let btnStyles = "";
  if (isEdit) {
    btnStyles = { minWidth: "100%" };
  } else {
    btnStyles = { minWidth: "75%" };
  }

  const validate = (fieldValues = values) => {
    const errorText = "Preenchimento obrigatório";
    const errorTextExists = "O grupo já existe";

    let temp = { ...errors };

    if ("value" in fieldValues) temp.value = fieldValues.value ? "" : errorText;

    if (!isEdit) {
      if (JSON.stringify(data).includes(`"value":"${fieldValues.value}"`)) {
        temp.value = errorTextExists;
      }
    }

    if ("label" in fieldValues) temp.label = fieldValues.label ? "" : errorText;

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
      addOrEdit(values, resetForm);
    }
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12} md={3}>
          <Controls.Input
            name="value"
            label="Id Grupo"
            disabled={isEdit}
            value={values.value}
            onChange={handleInputChange}
            error={errors.value}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <div style={{ minWidth: "100%" }}>
            <Controls.Input
              label="Descrição"
              name="label"
              value={values.label}
              onChange={handleInputChange}
              error={errors.label}
            />
          </div>
        </Grid>

        <Grid item xs={12} md={12} sx={{ m: 4 }}>
          {children}
        </Grid>

        <Grid item xs={12} md={12}>
          <Controls.Button style={btnStyles} type="submit" text="Submeter" />
          {!isEdit && (
            <Controls.Button
              //style={{ minWidth: "23.5%" }}
              text="Redefinir"
              onClick={resetForm}
            />
          )}
        </Grid>
      </Grid>
    </Form>
  );
}
