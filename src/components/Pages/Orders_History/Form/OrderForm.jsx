import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Controls from "../../../Helpers/Controls";
import { useForm, Form } from "./useForm";
import ListOfProducts from "./ListOfProducts";
import ListOfProductsStockists from "./ListOfProductsStockists";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { alpha, styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
const initialFValues = {
  UCC_Name: "",
  Laboratory_Name: "",
  Total_Amount: 0.0,
  Delivery_Terms: " ",
  Payment_Terms: " ",
  Order_Minimum_Amount: " ",
  Delivery_Address: "",
  Total_AmountVat: 0.0,
  Email: "",
  Alliance_Route: "",
  Alliance_customer_number: "",
};

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: "#ad0b90",
  "&:hover": {
    backgroundColor: "#6d085a",
  },
}));

const ColorButton2 = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: "#0b16ad",
  "&:hover": {
    backgroundColor: "#070c57",
  },
}));

const ColorButton3 = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: "#A43217",
  "&:hover": {
    backgroundColor: "#782612",
  },
}));

export default function GroupForm(props) {
  const {
    addOrEdit,
    recordForEdit,
    isEdit,
    LabOptions,
    OnlyPreview,
    HandlePrintDocument,
    handleCancelOnClick,
  } = props;
  const [TotalAmount, SetTotalAmount] = useState(0.0);
  const [TotalAmountVat, SetTotalAmountVat] = useState(0.0);
  const [rowData, SetRowData] = useState([]);
  let btnStyles = "";
  if (isEdit) {
    btnStyles = { minWidth: "85%" };
  } else {
    btnStyles = { minWidth: "85%" };
  }

  const calculateTotal = (data) => {
    SetRowData(data);
  };

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

    addOrEdit(values);
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
                name="Total_Amount"
                label="Valor Total c/Iva"
                disabled={true}
                value={values.Total_AmountVat}
                onChange={handleInputChange}
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
                name="Laboratory_Name"
                label="Laboratório"
                disabled={true}
                value={values.Laboratory_Name}
                onChange={handleInputChange}
                error={errors.Laboratory_Name}
              />
              <Controls.Input
                name="Order_Minimum_Amount"
                label="Valor Minimo"
                disabled={true}
                value={values.Order_Minimum_Amount}
                onChange={handleInputChange}
                error={errors.Order_Minimum_Amount}
              />
              <Controls.Input
                disabled={true}
                name="Email"
                label="Endereço eletrónico"
                value={values.Email}
                onChange={handleInputChange}
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
                name="Delivery_Terms"
                label="Prazo Entrega"
                disabled={true}
                value={values.Delivery_Terms}
                onChange={handleInputChange}
                error={errors.Delivery_Terms}
              />
              <Controls.Input
                name="Alliance_customer_number"
                label="Nº cliente Alliance"
                disabled={true}
                value={values.Alliance_customer_number}
                onChange={handleInputChange}
                error={errors.Alliance_customer_number}
              />
            </Grid>
            <Grid item xs={12} md={10.5}>
              <Controls.Input
                disabled={true}
                name="Delivery_Address"
                label="Morada de Entrega"
                value={values.Delivery_Address}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={10.5}>
              <Controls.Input
                name="Alliance_Route"
                label="Rota Alliance"
                disabled={true}
                value={values.Alliance_Route}
                onChange={handleInputChange}
                error={errors.Alliance_Route}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} md={12} pt={2}>
            <section>
              {values.Stockist === true && (
                <ListOfProductsStockists
                  Order_ID={recordForEdit.Order_ID}
                  calculateTotal={calculateTotal}
                />
              )}
              {values.Stockist === false && (
                <ListOfProducts
                  Order_ID={recordForEdit.Order_ID}
                  calculateTotal={calculateTotal}
                />
              )}
            </section>
          </Grid>
        </Form>
      </DialogContent>
      <DialogActions>
        <ColorButton3
          style={{ minWidth: " 7.3%" }}
          onClick={() => handleCancelOnClick(values.Order_ID)}
        >
          Cancelar
        </ColorButton3>
        <ColorButton2
          style={{ minWidth: "7.5%" }}
          onClick={() => HandlePrintDocument(values, rowData)}
        >
          Imprimir
        </ColorButton2>
        <ColorButton style={btnStyles} onClick={handleSubmit}>
          Encerrar
        </ColorButton>
      </DialogActions>
    </>
  );
}
