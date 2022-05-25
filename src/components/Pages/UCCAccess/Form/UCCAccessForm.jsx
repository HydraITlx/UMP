import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Controls from "../../../Helpers/Controls";
import { useForm, Form } from "./useForm";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { purple } from "@mui/material/colors";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: "#ad0b90",
  "&:hover": {
    backgroundColor: "#6d085a",
  },
}));

const initialFValues = {
  ID: " ",
  Laboratory_ID: " ",
  Laboratory_Name: " ",
  UCC_ID: " ",
  UCC_Name: " ",
};

export default function GroupForm(props) {
  const { addOrEdit, recordForEdit, isEdit, data, UCCOptions, labOptions } =
    props;

  let btnStyles = "";
  if (isEdit) {
    btnStyles = { minWidth: "100%" };
  } else {
    btnStyles = { minWidth: "100%" };
  }

  const validate = (fieldValues = values) => {
    const errorText = "O campo não pode estar vazio";
    const errorTextExists = "O acesso já existe";

    let temp = { ...errors };

    if ("Laboratory_ID" in fieldValues) {
      temp.Laboratory_ID = fieldValues.Laboratory_ID !== " " ? "" : errorText;
      temp.UCC_ID = "";

      if (fieldValues.Laboratory_ID !== " ") {
        data.map((options) => {
          if (options.ID !== values.ID) {
            if (
              parseInt(options.Laboratory_ID) ===
                parseInt(fieldValues.Laboratory_ID) &&
              parseInt(options.UCC_ID) === parseInt(values.UCC_ID)
            ) {
              temp.Laboratory_ID = errorTextExists;
              temp.UCC_ID = errorTextExists;
            }
          }
        });
      }
    }
    if ("UCC_ID" in fieldValues) {
      temp.UCC_ID = fieldValues.UCC_ID !== " " ? "" : errorText;
      temp.Laboratory_ID = "";

      data.map((options) => {
        if (options.ID !== values.ID) {
          if (
            parseInt(options.Laboratory_ID) ===
              parseInt(values.Laboratory_ID) &&
            parseInt(options.UCC_ID) === parseInt(fieldValues.UCC_ID)
          ) {
            temp.UCC_ID = errorTextExists;
            temp.Laboratory_ID = errorTextExists;
          }
        }
      });
    }
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

  function checkDuplicates(arr, index, new_id, new_id2, temp) {
    return arr.map((options) => {
      if (options.ID !== index) {
        if (options.Laboratory_ID === new_id || options.UCC_ID === new_id2) {
          temp.Laboratory_ID = "DADASDASDADA";
          w;
          return temp;
        }
      }
    });
  }

  return (
    <>
      <DialogContent dividers>
        <Form onSubmit={handleSubmit}>
          <Grid container>
            <Grid container pl={15}>
              <Grid item xs={12} md={12} pb={5}>
                <Controls.Select
                  variant="outlined"
                  name="UCC_ID"
                  label="Nome UCC*"
                  value={values.UCC_ID}
                  onChange={handleInputChange}
                  options={UCCOptions}
                  error={errors.UCC_ID}
                />

                <Controls.Select
                  variant="outlined"
                  name="Laboratory_ID"
                  label="Nome Laboratório*"
                  value={values.Laboratory_ID}
                  onChange={handleInputChange}
                  options={labOptions}
                  error={errors.Laboratory_ID}
                />
              </Grid>
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
