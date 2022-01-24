export function getLaboratories() {
  let body = {
    process: 1,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_APITOKEN}`,
    },
    body: JSON.stringify(body),
  };

  return getRequestPromise(
    process.env.REACT_APP_LABORATORY_MANAGEMENT,
    requestOptions
  );
}

function getRequestPromise(RequestUrl, requestOptions) {
  return fetch(RequestUrl, requestOptions)
    .then((response) => response.json())
    .then((responseData) => {
      return responseData;
    })
    .catch((error) => console.warn(error));
}

export function updateLaboratories(values) {
  let body = {
    process: 3,
    ID: values.ID,
    Name: values.Name,
    Type: values.Type,
    Address: values.Address,
    NIF: values.NIF,
    Phone: values.Phone,
    Fax: values.Fax,
    Comments: values.Comments,
    Delivery_Terms: values.Delivery_Terms,
    Payment_Terms: values.Payment_Terms,
    Order_Minimum_Amount: values.Order_Minimum_Amount,
    Contact_Phone: values.Contact_Phone,
    Contact_Order: values.Contact_Order,
    Active: values.Active,
    Email: values.Email,
    Customer_Name: values.Customer_Name,
    Customer_Contact_Name: values.Customer_Contact_Name,
    Customer_Phone: values.Customer_Phone,
    Customer_Email: values.Customer_Email,
    Documents: values.Documents,
    Payment_Method: values.Payment_Method,
    NIB: values.NIB,
    IBAN: values.IBAN,
    SWIFT: values.SWIFT,
    Tecnical_Name: values.Tecnical_Name,
    Tecnical_Contact_Name: values.Tecnical_Contact_Name,
    Tecnical_Phone: values.Tecnical_Phone,
    Tecnical_Fax: values.Tecnical_Fax,
    Tecnical_Email: values.Tecnical_Email,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_APITOKEN}`,
    },
    body: JSON.stringify(body),
  };

  return getRequestPromise(
    process.env.REACT_APP_LABORATORY_MANAGEMENT,
    requestOptions
  );
}

export function InsertLaboratories(values) {
  let body = {
    process: 5,
    Name: values.Name,
    Type: values.Type,
    Address: values.Address,
    NIF: values.NIF,
    Phone: values.Phone,
    Fax: values.Fax,
    Comments: values.Comments,
    Delivery_Terms: values.Delivery_Terms,
    Payment_Terms: values.Payment_Terms,
    Order_Minimum_Amount: values.Order_Minimum_Amount,
    Contact_Phone: values.Contact_Phone,
    Contact_Order: values.Contact_Order,
    Active: values.Active,
    Email: values.Email,
    Customer_Name: values.Customer_Name,
    Customer_Contact_Name: values.Customer_Contact_Name,
    Customer_Phone: values.Customer_Phone,
    Customer_Email: values.Customer_Email,
    Documents: values.Documents,
    Payment_Method: values.Payment_Method,
    NIB: values.NIB,
    IBAN: values.IBAN,
    SWIFT: values.SWIFT,
    Tecnical_Name: values.Tecnical_Name,
    Tecnical_Contact_Name: values.Tecnical_Contact_Name,
    Tecnical_Phone: values.Tecnical_Phone,
    Tecnical_Fax: values.Tecnical_Fax,
    Tecnical_Email: values.Tecnical_Email,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_APITOKEN}`,
    },
    body: JSON.stringify(body),
  };

  return getRequestPromise(
    process.env.REACT_APP_LABORATORY_MANAGEMENT,
    requestOptions
  );
}

export function DeleteLaboratory(ID) {
  let body = {
    process: 4,
    ID: ID,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_APITOKEN}`,
    },
    body: JSON.stringify(body),
  };

  return getRequestPromise(
    process.env.REACT_APP_LABORATORY_MANAGEMENT,
    requestOptions
  );
}
