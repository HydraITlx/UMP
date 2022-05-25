import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Controls from "../../../Helpers/Controls";
import { useForm, Form } from "./useForm";
import FormControlLabel from "@mui/material/FormControlLabel";
import { alpha, styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { purple } from "@mui/material/colors";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
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
  Tax_Percentage: 0,
  Year: 0,
  CFT: "",
  CFT_Family: "",
};

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: purple[300],
    "&:hover": {
      backgroundColor: alpha(purple[900], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: purple[400],
  },
}));

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: "#ad0b90",
  "&:hover": {
    backgroundColor: "#6d085a",
  },
}));

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
    <>
      <DialogContent dividers>
        <Form>
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
                disabled={OnlyPreview}
                value={values.Description}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} md={3.43} pt={2}>
              <Controls.Input
                type="input"
                name="Total_Quantity"
                label="Qtd. por caixa"
                disabled={OnlyPreview}
                value={values.Total_Quantity}
                onChange={(e) => handleInputQTDChange(e, values.Unit_Price_Box)}
                error={errors.Total_Quantity}
              />
            </Grid>
            <Grid item xs={12} md={3.43} pt={2}>
              <Controls.Input
                type="input"
                name="Unit_Price_Box"
                label="Preço Caixa"
                disabled={OnlyPreview}
                value={values.Unit_Price_Box}
                onChange={(e) => handleInputQTDChange(e, values.Total_Quantity)}
                error={errors.Unit_Price_Box}
              />
            </Grid>
            <Grid item xs={12} md={3.43} pt={2}>
              <Controls.Input
                type="input"
                name="Unit_Price_UN"
                label="Preço Unitário"
                disabled={OnlyPreview}
                value={values.Unit_Price_UN}
                onChange={(e) => handleInputQTDChange(e, values.Total_Quantity)}
                error={errors.Unit_Price_UN}
              />
            </Grid>

            <Grid item xs={12} md={5.34} pt={2}>
              <Controls.Input
                name="DUP"
                label="DUP"
                disabled={OnlyPreview}
                value={values.DUP}
                onChange={handleInputChange}
                error={errors.DUP}
              />
            </Grid>

            <Grid item xs={12} md={5.34} pt={2}>
              <Controls.Input
                name="Commercial_Name"
                label="Nome Comercial"
                disabled={OnlyPreview}
                value={values.Commercial_Name}
                onChange={handleInputChange}
                error={errors.Commercial_Name}
              />
            </Grid>
            <Grid item xs={12} md={12} pt={2}>
              <Controls.Input
                name="Observations"
                label="Observações"
                disabled={OnlyPreview}
                value={values.Observations}
                onChange={handleInputChange}
                error={errors.Observations}
              />
            </Grid>
            <Grid item xs={12} md={5.34} pt={2}>
              <Controls.Input
                type="number"
                name="Tax_Percentage"
                label="Iva"
                disabled={OnlyPreview}
                value={values.Tax_Percentage}
                onChange={handleInputChange}
                error={errors.DUP}
              />
            </Grid>
            <Grid item xs={12} md={5.34} pt={2}>
              <Controls.Input
                name="CFT_Family"
                label="Família CFT"
                disabled={OnlyPreview}
                value={values.CFT_Family}
                onChange={handleInputChange}
                error={errors.CFT_Family}
              />
            </Grid>
            <Grid item xs={12} md={5.34} pt={2}>
              <Controls.Input
                name="CFT"
                label="CFT"
                disabled={OnlyPreview}
                value={values.CFT}
                onChange={handleInputChange}
                error={errors.CFT}
              />
            </Grid>
            <Grid item xs={12} md={12} pt={2}>
              <FormControlLabel
                control={
                  <GreenSwitch
                    name="Sold_Out"
                    disabled={OnlyPreview}
                    checked={values.Sold_Out}
                    onChange={handleInputChange}
                  />
                }
                label="Esgotado"
              />
              <FormControlLabel
                control={
                  <GreenSwitch
                    name="Active"
                    disabled={OnlyPreview}
                    checked={values.Active}
                    onChange={handleInputChange}
                  />
                }
                label="Ativo"
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
