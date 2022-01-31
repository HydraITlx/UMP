import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Controls from "../../../Helpers/Controls";
import Checkbox from "../../../Helpers/Checkbox";
import { useForm, Form } from "./useForm";
const initialFValues = {
  Active: false,
  CHNM: "",
  Commercial_Name: "",
  DUP: "",
  Description: "",
  Laboratory_ID: " ",
  Laboratory_Name: "",
  Observations: "",
  Sold_Out: false,
  Total_Quantity: 0,
  Type: " ",
  Unit_Price_Box: 0,
  Unit_Price_UN: 0,
  Year: 0,
};

const TypeOption = [
  { value: 1, label: "Geral" },
  { value: 2, label: "Subst Controladas" },
  { value: 3, label: "Dispositivos Médicos" },
  { value: 4, label: "Outros" },
  { value: 5, label: "Nutrição" },
  { value: 6, label: "Soros" },
];

export default function GroupForm(props) {
  const { addOrEdit, recordForEdit, isEdit, data, LabOptions } = props;

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

    if ("Laboratory_ID" in fieldValues)
      temp.Laboratory_ID = fieldValues.Laboratory_ID !== " " ? "" : errorText;

    if ("CHNM" in fieldValues) temp.CHNM = fieldValues.CHNM ? "" : errorText;

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    handleInputQTDChange,
    resetForm,
  } = useForm(initialFValues, true, validate);

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
  console.log(values);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container pl={25}>
        <Grid item xs={12} md={5.34} pt={2}>
          <Controls.Input
            name="Year"
            label="Ano*"
            disabled={isEdit}
            value={values.Year}
            onChange={handleInputChange}
            error={errors.Year}
          />
          <Controls.Input
            name="CHNM"
            label="CHNM*"
            disabled={isEdit}
            value={values.CHNM}
            onChange={handleInputChange}
            error={errors.CHNM}
          />
        </Grid>
        <Grid item xs={12} md={5.34} pt={2}>
          <Controls.Select
            variant="outlined"
            name="Type"
            label="Tipo*"
            disabled={isEdit}
            value={values.Type}
            onChange={handleInputChange}
            options={TypeOption}
            error={errors.Type}
          />

          <Controls.Select
            variant="outlined"
            name="Laboratory_ID"
            disabled={isEdit}
            label="Nome Laboratôrio*"
            value={values.Laboratory_ID}
            onChange={handleInputChange}
            options={LabOptions}
            error={errors.Laboratory_ID}
          />
        </Grid>

        <Grid item xs={12} md={12} pt={2}>
          <Controls.Input
            name="Description"
            label="Descrição"
            value={values.Description}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} md={3.43} pt={2}>
          <Controls.Input
            type="number"
            name="Total_Quantity"
            label="Qtd. por caixa"
            value={values.Total_Quantity}
            onChange={(e) => handleInputQTDChange(e, values.Unit_Price_Box)}
            error={errors.Total_Quantity}
          />
        </Grid>
        <Grid item xs={12} md={3.43} pt={2}>
          <Controls.Input
            type="number"
            name="Unit_Price_Box"
            label="Preço Caixa"
            value={values.Unit_Price_Box}
            onChange={(e) => handleInputQTDChange(e, values.Total_Quantity)}
            error={errors.Unit_Price_Box}
          />
        </Grid>
        <Grid item xs={12} md={3.43} pt={2}>
          <Controls.Input
            type="number"
            name="Unit_Price_UN"
            label="Preço Unitário"
            value={values.Unit_Price_UN}
            onChange={(e) => handleInputQTDChange(e, values.Total_Quantity)}
            error={errors.Unit_Price_UN}
          />
        </Grid>

        <Grid item xs={12} md={5.34} pt={2}>
          <Controls.Input
            name="DUP"
            label="DUP"
            value={values.DUP}
            onChange={handleInputChange}
            error={errors.DUP}
          />
        </Grid>

        <Grid item xs={12} md={5.34} pt={2}>
          <Controls.Input
            name="Commercial_Name"
            label="Nome Comercial"
            value={values.Commercial_Name}
            onChange={handleInputChange}
            error={errors.Commercial_Name}
          />
        </Grid>
        <Grid item xs={12} md={12} pt={2}>
          <Controls.Input
            name="Observations"
            label="Observações"
            value={values.Observations}
            onChange={handleInputChange}
            error={errors.Observations}
          />
        </Grid>

        <Grid item xs={12} md={5.34} pt={2}>
          <Checkbox
            name="Sold_Out"
            label="Esgotado"
            value={values.Sold_Out}
            onChange={handleInputChange}
          />

          <Checkbox
            name="Active"
            label="Ativo"
            value={values.Active}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} pt={2}>
        <Controls.Button style={btnStyles} type="submit" text="Submeter" />
      </Grid>
    </Form>
  );
}
