function getRequestPromise(RequestUrl, requestOptions) {
  return fetch(RequestUrl, requestOptions)
    .then((response) => response.json())
    .then((responseData) => {
      return responseData;
    })
    .catch((error) => console.warn(error));
}

export function GetPostedOrders(userName) {
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
    process.env.REACT_APP_POSTEDORDERS_MANAGEMENT,
    requestOptions
  );
}

export function getProductsLines(Order_ID) {
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
    process.env.REACT_APP_POSTEDORDERS_MANAGEMENT,
    requestOptions
  );
}

export function CancelOrder(Order_ID) {
  let body = {
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
  return getRequestPromise(process.env.REACT_APP_CANCEL_ORDER, requestOptions);
}
