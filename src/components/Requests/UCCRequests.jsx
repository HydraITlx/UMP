export function getUCCs() {
  let body = {
    process: 5,
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
    process.env.REACT_APP_UCC_MANAGEMENT,
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

export function onHandlePharmacistOptions() {
  let body = {
    process: 1,
  };

  let requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_APITOKEN}`,
    },
    body: JSON.stringify(body),
  };

  return getRequestPromise(
    process.env.REACT_APP_PHARMACIST_MANAGEMENT,
    requestOptions
  );
}

export function onHandleUCCUpdate(values) {
  const body = {
    process: 3,
    ID: values.ID,
    Name: values.Name,
    Entity_Type: values.Entity_Type,
    NIPC: values.NIPC,
    Address: values.Address,
    Post_Code: values.Post_Code,
    Responsible_Pharmacist_ID: values.Responsible_Pharmacist_ID,
    Responsible_Pharmacist_Name: values.Responsible_Pharmacist_Name,
    Responsible_Pharmacist_Phone: values.Responsible_Pharmacist_Phone,
    Responsible_Pharmacist_Email: values.Responsible_Pharmacist_Email,
    Active: values.Active,
    Logo: values.Logo,
  };

  let requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_APITOKEN}`,
    },
    body: JSON.stringify(body),
  };

  return getRequestPromise(
    process.env.REACT_APP_UCC_MANAGEMENT,
    requestOptions
  );
}

export function onHandleUCCInsert(values) {
  const body = {
    process: 2,
    ID: values.ID,
    Name: values.Name,
    Entity_Type: values.Entity_Type,
    NIPC: values.NIPC,
    Address: values.Address,
    Post_Code: values.Post_Code,
    Responsible_Pharmacist_ID: values.Responsible_Pharmacist_ID,
    Responsible_Pharmacist_Name: values.Responsible_Pharmacist_Name,
    Responsible_Pharmacist_Phone: values.Responsible_Pharmacist_Phone,
    Responsible_Pharmacist_Email: values.Responsible_Pharmacist_Email,
    Active: values.Active,
    Logo: values.Logo,
  };

  let requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_APITOKEN}`,
    },
    body: JSON.stringify(body),
  };

  return getRequestPromise(
    process.env.REACT_APP_UCC_MANAGEMENT,
    requestOptions
  );
}

export function getDeliveryPlaces(UCCID) {
  let body = {
    process: 5,
    UCCID: UCCID,
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
    process.env.REACT_APP_PLACES_MANAGEMENT,
    requestOptions
  );
}

export function InsertDeliveryPlaces(rowdata, UCCID) {
  let body = {
    process: 2,
    UCCID: UCCID,
    Address: rowdata.Address,
    cName: rowdata["Contact Name"],
    cPhone: rowdata["Contact Phone"],
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
    process.env.REACT_APP_PLACES_MANAGEMENT,
    requestOptions
  );
}

export function DeleteDeliveryPlaces(rowdata, UCCID) {
  let body = {
    process: 4,
    UCCID: UCCID,
    ID: rowdata.ID,
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
    process.env.REACT_APP_PLACES_MANAGEMENT,
    requestOptions
  );
}

export function UpdateDeliveryPlaces(rowdata, UCCID) {
  let body = {
    process: 3,
    UCCID: UCCID,
    ID: rowdata.ID,
    Address: rowdata.Address,
    cName: rowdata["Contact Name"],
    cPhone: rowdata["Contact Phone"],
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
    process.env.REACT_APP_PLACES_MANAGEMENT,
    requestOptions
  );
}
