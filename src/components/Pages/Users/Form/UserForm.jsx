import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Controls from "../../../Helpers/Controls";
import { useForm, Form } from "./useForm";
import UserPermissions from "./UserPermissions";
import Checkbox from "../../../Helpers/Checkbox";
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
    btnStyles = { minWidth: "75%" };
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
    <Form onSubmit={handleSubmit}>
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
          <Checkbox
            name="is_admin"
            label="Administrador"
            value={values.is_admin}
            onChange={handleInputChange}
          />
          <Checkbox
            name="active"
            label="Ativo"
            value={values.active}
            onChange={handleInputChange}
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
            <UserPermissions recordForEdit={recordForEdit} values={values} />
          </Grid>
        )}
        <Grid item xs={12} md={12}>
          <Controls.Button style={btnStyles} type="submit" text="Submeter" />
          {!isEdit && !showTable && (
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
