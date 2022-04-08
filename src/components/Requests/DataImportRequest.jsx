export function ImportProducts(sheetName, data, FileName) {
  let body = {
    sheetName: sheetName,
    data: data,
    FileName: FileName,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_APITOKEN}`,
    },
    body: JSON.stringify(body),
  };

  return getRequestPromise(process.env.REACT_APP_DATA_IMPORT, requestOptions);
}

function getRequestPromise(RequestUrl, requestOptions) {
  return fetch(RequestUrl, requestOptions)
    .then((response) => response.json())
    .then((responseData) => {
      return responseData;
    })
    .catch((error) => console.warn(error));
}

export function GetImportDataLog() {
  let body = {
    sheetName: "getData",
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_APITOKEN}`,
    },
    body: JSON.stringify(body),
  };

  return getRequestPromise(process.env.REACT_APP_DATA_IMPORT, requestOptions);
}
