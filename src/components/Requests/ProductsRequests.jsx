export function getProducts() {
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
    process.env.REACT_APP_ITEM_MANAGEMENT,
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

export function InsertProducts(rowData) {
  console.log("rowData");
  console.log(rowData);
  let body = {
    process: 2,
    Year: rowData.Year,
    Type: rowData.Type,
    CHNM: rowData.CHNM,
    Description: rowData.Description,
    Total_Quantity: rowData.Total_Quantity,
    Laboratory_ID: rowData.Laboratory_ID,
    Unit_Price_UN: rowData.Unit_Price_UN,
    Unit_Price_Box: rowData.Unit_Price_Box,
    DUP: rowData.DUP,
    Sold_Out: rowData.Sold_Out,
    Commercial_Name: rowData.Commercial_Name,
    Observations: rowData.Observations,
    Tax_Percentage: rowData.Tax_Percentage,
    Active: rowData.Active,
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
    process.env.REACT_APP_ITEM_MANAGEMENT,
    requestOptions
  );
}

export function DeleteProducts(rowData) {
  console.log("rowData");
  console.log(rowData);
  let body = {
    process: 3,
    Year: rowData.Year,
    Type: rowData.Type,
    CHNM: rowData.CHNM,
    Laboratory_ID: rowData.Laboratory_ID,
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
    process.env.REACT_APP_ITEM_MANAGEMENT,
    requestOptions
  );
}

export function getLabsOptions() {
  let body = {
    process: 99,
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
    process.env.REACT_APP_ITEM_MANAGEMENT,
    requestOptions
  );
}

export function modifyProducts(rowData) {
  console.log("rowData");
  console.log(rowData);
  let body = {
    process: 4,
    Year: rowData.Year,
    Type: rowData.Type,
    CHNM: rowData.CHNM,
    Description: rowData.Description,
    Total_Quantity: rowData.Total_Quantity,
    Laboratory_ID: rowData.Laboratory_ID,
    Unit_Price_UN: rowData.Unit_Price_UN,
    Unit_Price_Box: rowData.Unit_Price_Box,
    DUP: rowData.DUP,
    Sold_Out: rowData.Sold_Out,
    Commercial_Name: rowData.Commercial_Name,
    Observations: rowData.Observations,
    Tax_Percentage: rowData.Tax_Percentage,
    Active: rowData.Active,
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
    process.env.REACT_APP_ITEM_MANAGEMENT,
    requestOptions
  );
}
