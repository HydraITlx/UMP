import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Controls from "../../../Helpers/Controls";
import Checkbox from "../../../Helpers/Checkbox";
import { useForm, Form } from "./useForm";
import ReturnConditions from "./ReturnConditions";
import AttachmentVII from "./AttachmentVII";

const initialFValues = {
  Active: false,
  Email: "",
  Address: "",
  Comments: "",
  Contact_Order: "",
  Contact_Phone: "",
  Customer_Contact_Name: "",
  Customer_Email: "",
  Customer_Name: "",
  Customer_Phone: "",
  Delivery_Terms: "",
  Documents: "",
  Fax: "",
  IBAN: "",
  ID: 11,
  NIB: "",
  NIF: "",
  Name: "",
  Order_Minimum_Amount: "",
  Payment_Method: "",
  Payment_Terms: "",
  Phone: "",
  SWIFT: "",
  Tecnical_Contact_Name: "",
  Tecnical_Email: "",
  Tecnical_Fax: "",
  Tecnical_Name: "",
  Tecnical_Phone: "",
  Type: " ",
};

const TypeOption = [
  { value: 1, label: "Laboratório" },
  { value: 2, label: "Dispositivos Médicos" },
  { value: 3, label: "Nutrição Especial" },
];

export default function GroupForm(props) {
  const { addOrEdit, recordForEdit, isEdit, data, LabOptions } = props;

  const [btn1bg, setbtn1bg] = useState("#ad0b90");
  const [btn1hv, setbtn1hv] = useState("#6d085a");
  const [btn1ac, setbtn1ac] = useState(true);

  const [btn2bg, setbtn2bg] = useState("#6d085a");
  const [btn2hv, setbtn2hv] = useState("#ad0b90");
  const [btn2ac, setbtn2ac] = useState(false);

  const [btn3bg, setbtn3bg] = useState("#6d085a");
  const [btn3hv, setbtn3hv] = useState("#ad0b90");
  const [btn3ac, setbtn3ac] = useState(false);

  const [btn4bg, setbtn4bg] = useState("#6d085a");
  const [btn4hv, setbtn4hv] = useState("#ad0b90");
  const [btn4ac, setbtn4ac] = useState(false);

  const [btn5bg, setbtn5bg] = useState("#6d085a");
  const [btn5hv, setbtn5hv] = useState("#ad0b90");
  const [btn5ac, setbtn5ac] = useState(false);

  const handleBtn1 = () => {
    setbtn1ac(!btn1ac);
    if (!btn1ac) {
      setbtn1bg("#ad0b90");
      setbtn1hv("#6d085a");
    } else {
      setbtn1bg("#6d085a");
      setbtn1hv("#ad0b90");
    }

    setbtn2ac(false);
    setbtn2bg("#6d085a");
    setbtn2hv("#ad0b90");

    setbtn3ac(false);
    setbtn3bg("#6d085a");
    setbtn3hv("#ad0b90");

    setbtn4ac(false);
    setbtn4bg("#6d085a");
    setbtn4hv("#ad0b90");

    setbtn5ac(false);
    setbtn5bg("#6d085a");
    setbtn5hv("#ad0b90");
  };

  const handleBtn2 = () => {
    setbtn2ac(!btn2ac);
    if (!btn2ac) {
      setbtn2bg("#ad0b90");
      setbtn2hv("#6d085a");
    } else {
      setbtn2bg("#6d085a");
      setbtn2hv("#ad0b90");
    }

    setbtn1ac(false);
    setbtn1bg("#6d085a");
    setbtn1hv("#ad0b90");

    setbtn3ac(false);
    setbtn3bg("#6d085a");
    setbtn3hv("#ad0b90");

    setbtn4ac(false);
    setbtn4bg("#6d085a");
    setbtn4hv("#ad0b90");

    setbtn5ac(false);
    setbtn5bg("#6d085a");
    setbtn5hv("#ad0b90");
  };

  const handleBtn3 = () => {
    setbtn3ac(!btn3ac);
    if (!btn3ac) {
      setbtn3bg("#ad0b90");
      setbtn3hv("#6d085a");
    } else {
      setbtn3bg("#6d085a");
      setbtn3hv("#ad0b90");
    }

    setbtn1ac(false);
    setbtn1bg("#6d085a");
    setbtn1hv("#ad0b90");

    setbtn2ac(false);
    setbtn2bg("#6d085a");
    setbtn2hv("#ad0b90");

    setbtn4ac(false);
    setbtn4bg("#6d085a");
    setbtn4hv("#ad0b90");

    setbtn5ac(false);
    setbtn5bg("#6d085a");
    setbtn5hv("#ad0b90");
  };

  const handleBtn4 = () => {
    setbtn4ac(!btn4ac);
    if (!btn4ac) {
      setbtn4bg("#ad0b90");
      setbtn4hv("#6d085a");
    } else {
      setbtn4bg("#6d085a");
      setbtn4hv("#ad0b90");
    }

    setbtn1ac(false);
    setbtn1bg("#6d085a");
    setbtn1hv("#ad0b90");

    setbtn2ac(false);
    setbtn2bg("#6d085a");
    setbtn2hv("#ad0b90");

    setbtn3ac(false);
    setbtn3bg("#6d085a");
    setbtn3hv("#ad0b90");

    setbtn5ac(false);
    setbtn5bg("#6d085a");
    setbtn5hv("#ad0b90");
  };

  const handleBtn5 = () => {
    setbtn5ac(!btn5ac);
    if (!btn5ac) {
      setbtn5bg("#ad0b90");
      setbtn5hv("#6d085a");
    } else {
      setbtn5bg("#6d085a");
      setbtn5hv("#ad0b90");
    }

    setbtn1ac(false);
    setbtn1bg("#6d085a");
    setbtn1hv("#ad0b90");

    setbtn2ac(false);
    setbtn2bg("#6d085a");
    setbtn2hv("#ad0b90");

    setbtn3ac(false);
    setbtn3bg("#6d085a");
    setbtn3hv("#ad0b90");

    setbtn4ac(false);
    setbtn4bg("#6d085a");
    setbtn4hv("#ad0b90");
  };

  let btnStyles = "";
  if (isEdit) {
    btnStyles = { minWidth: "100%" };
  } else {
    btnStyles = { minWidth: "100%" };
  }

  let btnStyles2 = "";
  if (isEdit) {
    btnStyles2 = {
      minWidth: "80%",
      //position: "absolute",
      bottom: "3%",
      // margin: "auto",
      //top: 0,
      left: "10%",
    };
  } else {
    btnStyles2 = {
      minWidth: "80%",
      //position: "absolute",
      bottom: "3%",
      // margin: "auto",
      //top: 0,
      left: "10%",
    };
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

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container pl={25}>
        <Grid item xs={12} md={2} pb={3} pr={2}>
          <Controls.ButtonLabs
            backgroundColor={btn1bg}
            backgroundColorHover={btn1hv}
            style={btnStyles}
            type="button"
            text="Dados Lab."
            id="teste"
            onClick={handleBtn1}
          />
        </Grid>

        <Grid item xs={12} md={2} pb={3} pr={2}>
          <Controls.ButtonLabs
            backgroundColor={btn2bg}
            backgroundColorHover={btn2hv}
            style={btnStyles}
            type="button"
            text="Info. Clientes"
            onClick={handleBtn2}
          />
        </Grid>

        <Grid item xs={12} md={2} pb={3} pr={2}>
          <Controls.ButtonLabs
            backgroundColor={btn3bg}
            backgroundColorHover={btn3hv}
            style={btnStyles}
            type="button"
            text="Info. Técnica"
            onClick={handleBtn3}
          />
        </Grid>

        {isEdit && (
          <Grid item xs={12} md={2} pb={3} pr={2}>
            <Controls.ButtonLabs
              backgroundColor={btn4bg}
              backgroundColorHover={btn4hv}
              style={btnStyles}
              type="button"
              text="C. Devolução"
              onClick={handleBtn4}
            />
          </Grid>
        )}

        {isEdit && (
          <Grid item xs={12} md={2} pb={3} pr={2}>
            <Controls.ButtonLabs
              backgroundColor={btn5bg}
              backgroundColorHover={btn5hv}
              style={btnStyles}
              type="button"
              text="Anexo VII"
              onClick={handleBtn5}
            />
          </Grid>
        )}
      </Grid>

      {btn1ac && (
        <>
          <Grid container pl={35}>
            <Grid item xs={12} md={4} pb={3}>
              <Controls.Input
                name="Name"
                label="Nome"
                value={values.Name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={4} pb={3}>
              <Controls.Select
                variant="outlined"
                name="Type"
                label="Tipo*"
                value={values.Type}
                onChange={handleInputChange}
                options={TypeOption}
                error={errors.Type}
              />
            </Grid>

            <Grid item xs={12} md={11} pb={3}>
              <Controls.Input
                name="Address"
                label="Morada"
                value={values.Address}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={3} pb={3}>
              <Controls.Input
                name="NIF"
                label="NIF"
                value={values.NIF}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={3} pb={3}>
              <Controls.Input
                name="Phone"
                label="Telefone"
                value={values.Phone}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} md={3} pb={3}>
              <Controls.Input
                name="Email"
                label="Email"
                value={values.Email}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} md={3} pb={3}>
              <Controls.Input
                name="Fax"
                label="Fax"
                value={values.Fax}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={11} pb={3}>
              <Controls.Input
                name="Comments"
                label="Comentários"
                value={values.Comments}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={3} pb={3}>
              <Controls.Input
                name="Delivery_Terms"
                label="Prazo de Entrega"
                value={values.Delivery_Terms}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={3} pb={3}>
              <Controls.Input
                name="Payment_Terms"
                label="Prazo de Pagamento"
                value={values.Payment_Terms}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={3} pb={3}>
              <Controls.Input
                name="Order_Minimum_Amount"
                label="Valor min. Encomenda"
                value={values.Order_Minimum_Amount}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={4} pb={3}>
              <Controls.Input
                name="Contact_Phone"
                label="Num. Contacto"
                value={values.Contact_Phone}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={4} pb={3}>
              <Controls.Input
                name="Contact_Order"
                label="Encomenda Contacto"
                value={values.Contact_Order}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={11} pb={5}>
              <Checkbox
                name="Active"
                label="Ativo"
                value={values.Active}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </>
      )}

      {btn2ac && (
        <Grid container pl={35}>
          <Grid item xs={12} md={4} pb={3}>
            <Controls.Input
              name="Customer_Contact_Name"
              label="Nome Contacto"
              value={values.Customer_Contact_Name}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} md={4} pb={3}>
            <Controls.Input
              name="Customer_Email"
              label="E-Mail"
              value={values.Customer_Email}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} md={4} pb={3}>
            <Controls.Input
              name="Customer_Phone"
              label="Telefone"
              value={values.Customer_Phone}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} md={12} pb={3}>
            <Controls.Input
              name="Documents"
              label="Documentos"
              value={values.Documents}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} md={4} pb={3}>
            <Controls.Input
              name="Payment_Method"
              label="Forma de Pagamento"
              value={values.Payment_Method}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} md={4} pb={3}>
            <Controls.Input
              name="NIB"
              label="NIB"
              value={values.NIB}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} md={4} pb={3}>
            <Controls.Input
              name="IBAN"
              label="IBAN"
              value={values.IBAN}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} md={4} pb={3}>
            <Controls.Input
              name="SWIFT"
              label="SWIFT"
              value={values.SWIFT}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      )}

      {btn3ac && (
        <Grid container pl={35}>
          <Grid item xs={12} md={5} pb={3}>
            <Controls.Input
              name="Tecnical_Contact_Name"
              label="Nome Contacto"
              value={values.Tecnical_Contact_Name}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} md={5} pb={3}>
            <Controls.Input
              name="Tecnical_Email"
              label="E-Mail"
              value={values.Tecnical_Email}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} md={5} pb={3}>
            <Controls.Input
              name="Tecnical_Phone"
              label="Telefone"
              value={values.Tecnical_Phone}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} md={5} pb={3}>
            <Controls.Input
              name="Tecnical_Fax"
              label="Fax"
              value={values.Tecnical_Fax}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      )}

      {btn4ac && <ReturnConditions ID={values.ID} />}

      {btn5ac && <AttachmentVII ID={values.ID} />}
      <Grid container>
        <Grid item xs={12} md={12} pt={3}>
          <Controls.Button style={btnStyles2} type="submit" text="Submeter" />
        </Grid>
      </Grid>
    </Form>
  );
}
