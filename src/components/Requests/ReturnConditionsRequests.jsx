export function getReturnConditions(ID) {
  let body = {
    process: 1,
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
    process.env.REACT_APP_RETURN_MANAGEMENT,
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

export function InsertReturnConditions(newData, ID) {
  let body = {
    process: 2,
    ID: ID,
    Name: newData.Name,
    Year: newData.Year,
    Return_Conditions: newData.Return_Conditions,
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
    process.env.REACT_APP_RETURN_MANAGEMENT,
    requestOptions
  );
}

export function UpdateReturnConditions(newData, oldYear) {
  let body = {
    process: 3,
    ID: newData.ID,
    Name: newData.Name,
    Year: newData.Year,
    OldYear: oldYear,
    Return_Conditions: newData.Return_Conditions,
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
    process.env.REACT_APP_RETURN_MANAGEMENT,
    requestOptions
  );
}

export function DeleteReturnConditions(values) {
  let body = {
    process: 4,
    ID: values.ID,
    Year: values.Year,
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
    process.env.REACT_APP_RETURN_MANAGEMENT,
    requestOptions
  );
}
