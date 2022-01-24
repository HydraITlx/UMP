export function getNumbering() {
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
    process.env.REACT_APP_NUMBERING_MANAGEMENT,
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

export function InsertNumbering(values) {
  let body = {
    process: 2,
    ID: values.ID,
    Starting_Date: values.Starting_Date,
    End_Date: values.End_Date,
    End_Date: values.End_Date,
    Number: values.Number,
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
    process.env.REACT_APP_NUMBERING_MANAGEMENT,
    requestOptions
  );
}

export function UpdateNumbering(values, oldValues) {
  let body = {
    process: 3,
    ID: values.ID,
    OldID: oldValues.ID,
    Starting_Date: values.Starting_Date,
    OldStarting_Date: oldValues.Starting_Date,
    End_Date: values.End_Date,
    End_Date: values.End_Date,
    Number: values.Number,
  };
  console.log("body");
  console.log(body);

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_APITOKEN}`,
    },
    body: JSON.stringify(body),
  };

  return getRequestPromise(
    process.env.REACT_APP_NUMBERING_MANAGEMENT,
    requestOptions
  );
}

export function DeleteNumbering(values) {
  let body = {
    process: 4,
    ID: values.ID,
    Starting_Date: values.Starting_Date,
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
    process.env.REACT_APP_NUMBERING_MANAGEMENT,
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
