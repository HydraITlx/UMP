import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Controls from "../../../Helpers/Controls";
import { useForm, Form } from "./useForm";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { purple } from "@mui/material/colors";

const initialFValues = {
  End_Date: new Date(),
  ID: " ",
  Name: "",
  Number: 0,
  Starting_Date: new Date(),
  Prefix: "",
};

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: "#ad0b90",
  "&:hover": {
    backgroundColor: "#6d085a",
  },
}));

export default function GroupForm(props) {
  const { addOrEdit, recordForEdit, isEdit, data, UCCOptions } = props;

  let btnStyles = "";
  if (isEdit) {
    btnStyles = { minWidth: "100%" };
  } else {
    btnStyles = { minWidth: "100%" };
  }

  const validate = (fieldValues = values) => {
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

  return (
    <>
      <DialogContent dividers>
        <Form>
          <Grid container container pl={15}>
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
            <Grid item xs={12} md={5} pt={5} pb={5}>
              <Controls.DatePicker
                name="Starting_Date"
                label="Data Inicio"
                value={values.Starting_Date}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} md={5} pt={5} pb={5}>
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
          </Grid>
        </Form>
      </DialogContent>
      <DialogActions>
        <ColorButton style={btnStyles} onClick={handleSubmit}>
          Submeter
        </ColorButton>
      </DialogActions>
    </>
  );
}
