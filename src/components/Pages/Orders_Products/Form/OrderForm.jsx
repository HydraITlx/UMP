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
};

const TypeOption = [
  { value: 1, label: "Geral" },
  { value: 2, label: "Subst Controladas" },
  { value: 3, label: "Dispositivos Médicos" },
  { value: 4, label: "Outros" },
  { value: 5, label: "Nutrição" },
  { value: 6, label: "Soros" },
];

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: "#ad0b90",
  "&:hover": {
    backgroundColor: "#6d085a",
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
  } = props;
  const [TotalAmount, SetTotalAmount] = useState(0.0);
  const [TotalAmountVat, SetTotalAmountVat] = useState(0.0);
  const [rowData, SetRowData] = useState([]);
  let btnStyles = "";
  if (isEdit) {
    btnStyles = { minWidth: "100%" };
  } else {
    btnStyles = { minWidth: "100%" };
  }

  const calculateTotal = (data) => {
    console.log(data);
    console.log("AQUI viCTOR!!");
    SetRowData(data);

    var TotalAmount = data
      .map((bill) => bill.Total_Amount)
      .reduce(
        (acc, bill) =>
          parseFloat(bill.replace(",", ".")) + parseFloat(acc.replace(",", "."))
      );

    var TotalAmountVat = data
      .map((bill) => bill.Total_AmountVat)
      .reduce(
        (acc, bill) =>
          parseFloat(bill.replace(",", ".")) + parseFloat(acc.replace(",", "."))
      );
    console.log("TotalAmount");
    console.log(TotalAmount);
    if (data.length > 1) {
      SetTotalAmount(TotalAmount.toFixed(5).toString().replace(".", ","));
      SetTotalAmountVat(TotalAmountVat.toFixed(5).toString().replace(".", ","));
    } else {
      SetTotalAmount(TotalAmount);
      SetTotalAmountVat(TotalAmountVat);
    }
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

  console.log("recordForEdit AQUI");
  console.log(recordForEdit);

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
                value={TotalAmountVat}
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
            </Grid>
            <Grid item xs={12} md={3} pt={2}>
              <Controls.Input
                name="Total_Amount"
                label="Valor Total"
                disabled={true}
                value={TotalAmount}
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
            </Grid>
            <Grid item xs={12} md={10.5} pt={2}>
              <Controls.Input
                name="Delivery_Address"
                label="Morada de Entrega"
                value={values.Delivery_Address}
                onChange={handleInputChange}
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
        <ColorButton style={btnStyles} onClick={handleSubmit}>
          Submeter
        </ColorButton>
      </DialogActions>
    </>
  );
}
