import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Controls from "../../../Helpers/Controls";
import { useForm, Form } from "./useForm";
import UserPermissions from "./UserPermissions";
import Switch from "@mui/material/Switch";
import { alpha, styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { purple } from "@mui/material/colors";
import FormControlLabel from "@mui/material/FormControlLabel";

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

const initialFValues = {
  username: "",
  full_name: "",
  email: "",
  attempts: 0,
  active: false,
  is_admin: false,
};

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
    const errorTextExists = "O Utilizador já existe";

    let temp = { ...errors };

    if ("username" in fieldValues)
      temp.username = fieldValues.username ? "" : errorText;

    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email não é valido";

    if (!isEdit) {
      if (
        JSON.stringify(data).includes(`"username":"${fieldValues.username}"`)
      ) {
        temp.username = errorTextExists;
      }
    }

    if ("full_name" in fieldValues)
      temp.full_name = fieldValues.full_name ? "" : errorText;

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
            <Grid item xs={12} md={4}>
              <Controls.Input
                name="username"
                label="Nome Utilizador"
                disabled={isEdit || showTable}
                value={values.username}
                onChange={handleInputChange}
                error={errors.username}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controls.Input
                label="Nome Completo"
                name="full_name"
                value={values.full_name}
                onChange={handleInputChange}
                error={errors.full_name}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controls.Input
                label="Email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                error={errors.email}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControlLabel
                control={
                  <GreenSwitch
                    name="is_admin"
                    checked={values.is_admin}
                    onChange={handleInputChange}
                  />
                }
                label="Administrador"
              />
              <FormControlLabel
                control={
                  <GreenSwitch
                    name="active"
                    checked={values.active}
                    onChange={handleInputChange}
                  />
                }
                label="Ativo"
              />

              {!isEdit && !showTable && (
                <Grid item xs={12} md={3}>
                  <div style={{ minWidth: "100%" }}>
                    <Controls.Button text="Confirmar" onClick={handleConfirm} />
                  </div>
                </Grid>
              )}
            </Grid>

            {!isEdit && showTable && (
              <Grid item xs={12} md={12} sx={{ m: 4 }}>
                <UserPermissions recordForEdit={values} />
              </Grid>
            )}

            {isEdit && (
              <Grid item xs={12} md={12} sx={{ m: 4 }}>
                <UserPermissions
                  recordForEdit={recordForEdit}
                  values={values}
                />
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
