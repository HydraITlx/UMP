export function getUCCs(userName) {
  let body = {
    process: 2,
    userName: userName,
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
    process.env.REACT_APP_LABUCCFILTER_MANAGEMENT,
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

export function getProducts(userName, UCC_ID) {
  let body = {
    process: 1,
    userName: userName,
    UCC_ID: UCC_ID,
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
    process.env.REACT_APP_LABUCCFILTER_MANAGEMENT,
    requestOptions
  );
}

export function ProcessCartProdutos(userName, UCC_ID, data, Qtd) {
  console.log(data);
  let body = {
    UCC_ID: UCC_ID,
    username: userName,
    Laboratory_ID: data.Laboratory_ID,
    Item_Year: data.Year,
    Item_Type: data.Type,
    Item_CHNM: data.CHNM,
    Item_Qtd: Qtd,
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
    process.env.REACT_APP_ORDER_MANAGEMENT,
    requestOptions
  );
}

export function GetCreatedOrders(userName) {
  let body = {
    process: 1,
    username: userName,
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
    process.env.REACT_APP_CREATEDORDER_MANAGEMENT,
    requestOptions
  );
}

export function DeleteCreatedOrders(Order_ID) {
  let body = {
    process: 2,
    Order_ID: Order_ID,
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
    process.env.REACT_APP_CREATEDORDER_MANAGEMENT,
    requestOptions
  );
}

export function getProductsLines(Order_ID) {
  console.log("WHAT IM SENDING?");
  console.log(Order_ID);
  let body = {
    process: 1,
    Order_ID: Order_ID,
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
    process.env.REACT_APP_ORDERLINES_MANAGEMENT,
    requestOptions
  );
}

export function DeleteProductsLines(Rowdata) {
  console.log("DELETE HERE");
  console.log(Rowdata);

  let body = {
    process: 2,
    Order_ID: Rowdata.ID,
    Line_No: Rowdata.Line_No,
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
    process.env.REACT_APP_ORDERLINES_MANAGEMENT,
    requestOptions
  );
}

export function EditProductsLines(Rowdata) {
  let body = {
    process: 3,
    Order_ID: Rowdata.ID,
    Line_No: Rowdata.Line_No,
    Quantity: Rowdata.Quantity,
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
    process.env.REACT_APP_ORDERLINES_MANAGEMENT,
    requestOptions
  );
}

export function EditStockistProductsLines(Rowdata) {
  console.log(Rowdata);
  let body = {
    process: 4,
    Order_ID: Rowdata.ID,
    Line_No: Rowdata.Line_No,
    Quantity: Rowdata.Quantity,
    Comercial_Branch: Rowdata.Comercial_Branch,
    Unit_Price_Box: Rowdata.Unit_Price_Box,
    Box_Quantity: Rowdata.Box_Quantity,
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
    process.env.REACT_APP_ORDERLINES_MANAGEMENT,
    requestOptions
  );
}
