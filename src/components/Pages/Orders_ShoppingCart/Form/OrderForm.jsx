import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Controls from "../../../Helpers/Controls";
import { useForm, Form } from "./useForm";
import ListOfProducts from "./ListOfProducts";
const initialFValues = {
  UCC_Name: "",
  Laboratory_Name: "",
  Total_Amount: 0.0,
  Delivery_Terms: " ",
  Payment_Terms: " ",
  Order_Minimum_Amount: " ",
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
  const { addOrEdit, recordForEdit, isEdit, LabOptions, OnlyPreview } = props;

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

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container pl={25}>
        <Grid item xs={12} md={3} pt={2}>
          <Controls.Input
            name="UCC_Name"
            label="UCC"
            disabled={true}
            value={values.UCC_Name}
            onChange={handleInputChange}
            error={errors.UCC_Name}
          />

          <Controls.Input
            name="Delivery_Terms"
            label="Prazo Entrega"
            disabled={true}
            value={values.Delivery_Terms}
            onChange={handleInputChange}
            error={errors.Delivery_Terms}
          />
        </Grid>
        <Grid item xs={12} md={3} pt={2}>
          <Controls.Input
            name="Laboratory_Name"
            label="Laboratório"
            disabled={true}
            value={values.Laboratory_Name}
            onChange={handleInputChange}
            error={errors.Laboratory_Name}
          />

          <Controls.Input
            name="Payment_Terms"
            label="Prazo Pagamento"
            disabled={true}
            value={values.Payment_Terms}
            onChange={handleInputChange}
            error={errors.Payment_Terms}
          />
        </Grid>
        <Grid item xs={12} md={3} pt={2}>
          <Controls.Input
            name="Total_Amount"
            label="Valor Total"
            disabled={true}
            value={values.Total_Amount}
            onChange={handleInputChange}
          />

          <Controls.Input
            name="Order_Minimum_Amount"
            label="Valor Minimo"
            disabled={true}
            value={values.Order_Minimum_Amount}
            onChange={handleInputChange}
            error={errors.Order_Minimum_Amount}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} md={12} pt={2}>
        <section>
          <ListOfProducts Order_ID={recordForEdit.Order_ID} />
        </section>
        <Controls.Button
          style={btnStyles}
          type="submit"
          text="Finalizar Encomenda"
        />
      </Grid>
    </Form>
  );
}