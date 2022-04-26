import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Controls from "../../../Helpers/Controls";
import { useForm, Form } from "./useForm";
import PagePermissions from "./PagePermissions";
import { purple } from "@mui/material/colors";
import { alpha, styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const initialFValues = {
  value: "",
  label: "",
};

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: "#ad0b90",
  "&:hover": {
    backgroundColor: "#6d085a",
  },
}));

export default function GroupForm(props) {
  const { addOrEdit, addonConfirm, recordForEdit, isEdit, data } = props;
  const [showTable, setshowTable] = useState(false);

  let btnStyles = "";
  if (isEdit) {
    btnStyles = { minWidth: "100%" };
  } else {
    btnStyles = { minWidth: "100%" };
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
    if (showTable) {
      addOrEdit(values, resetForm);
    } else {
      if (validate()) {
        addOrEdit(values, resetForm);
      }
    }
  };

  const handleConfirm = (e) => {
    e.preventDefault();

    if (validate()) {
      addonConfirm(values);
      setshowTable(true);
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
          <Grid container>
            <Grid item xs={12} md={3}>
              <Controls.Input
                name="value"
                label="Id Grupo"
                disabled={isEdit || showTable}
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

            {!isEdit && (
              <Grid item xs={12} md={3}>
                <div style={{ minWidth: "100%" }}>
                  <Controls.Button text="Confirmar" onClick={handleConfirm} />
                </div>
              </Grid>
            )}

            {!isEdit && showTable && (
              <Grid item xs={12} md={12} sx={{ m: 4 }}>
                <PagePermissions recordForEdit={values} />
              </Grid>
            )}

            {isEdit && (
              <Grid item xs={12} md={12} sx={{ m: 4 }}>
                <PagePermissions recordForEdit={recordForEdit} />
              </Grid>
            )}
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
