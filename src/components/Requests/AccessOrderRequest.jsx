export function getOrderAccess() {
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
    process.env.REACT_APP_ORDERACCESS_MANAGEMENT,
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

export function InsertOrderAccess(values) {
  let body = {
    process: 2,
    Pharmacist_ID: values.Pharmacist_ID,
    UCC_ID: values.UCC_ID,
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
    process.env.REACT_APP_ORDERACCESS_MANAGEMENT,
    requestOptions
  );
}

export function UpdateOrderAccess(values) {
  let body = {
    process: 4,
    ID: values.ID,
    Pharmacist_ID: values.Pharmacist_ID,
    UCC_ID: values.UCC_ID,
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
    process.env.REACT_APP_ORDERACCESS_MANAGEMENT,
    requestOptions
  );
}

export function DeleteOrderAccess(values) {
  let body = {
    process: 5,
    ID: values.ID,
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
    process.env.REACT_APP_ORDERACCESS_MANAGEMENT,
    requestOptions
  );
}

export function getUCCOptions(values) {
  let body = {
    process: 3,
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
    process.env.REACT_APP_ORDERACCESS_MANAGEMENT,
    requestOptions
  );
}
