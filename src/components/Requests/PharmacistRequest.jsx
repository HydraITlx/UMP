export function getPharmacists() {
  let body = {
    process: 2,
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
    process.env.REACT_APP_PHARMACIST_MANAGEMENT,
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

export function DeletePharmacists(ID) {
  console.log("ID");
  console.log(ID);

  let body = {
    process: 3,
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
    process.env.REACT_APP_PHARMACIST_MANAGEMENT,
    requestOptions
  );
}

export function InsertPharmacists(newData) {
  console.log("InsertPharmacists");
  console.log(newData);
  console.log(newData.Active);
  let body = {
    process: 4,
    Name: newData.Name,
    Phone: newData.Phone,
    Email: newData.Email,
    username: newData.username,
    Active: newData.Active !== undefined ? newData.Active : false,
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
    process.env.REACT_APP_PHARMACIST_MANAGEMENT,
    requestOptions
  );
}

export function getUserOptions() {
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
    process.env.REACT_APP_PHARMACIST_MANAGEMENT,
    requestOptions
  );
}

export function UpdatePharmacists(newData) {
  console.log("InsertPharmacists");
  console.log(newData);
  console.log(newData.Active);
  let body = {
    process: 6,
    ID: newData.ID,
    Name: newData.Name,
    Phone: newData.Phone,
    Email: newData.Email,
    username: newData.username,
    Active: newData.Active !== undefined ? newData.Active : false,
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
    process.env.REACT_APP_PHARMACIST_MANAGEMENT,
    requestOptions
  );
}
