function getRequestPromise(RequestUrl, requestOptions) {
  return fetch(RequestUrl, requestOptions)
    .then((response) => response.json())
    .then((responseData) => {
      return responseData;
    })
    .catch((error) => console.warn(error));
}

export function PostOrders(HeaderData) {
  let body = {
    process: 1,
    Order_ID: HeaderData.Order_ID,
    Delivery_Address: HeaderData.Delivery_Address,
    Email: HeaderData.Email,
    Alliance_customer_number: HeaderData.Alliance_customer_number,
    Alliance_Route: HeaderData.Alliance_Route,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_APITOKEN}`,
    },
    body: JSON.stringify(body),
  };

  return getRequestPromise(process.env.REACT_APP_POST_ORDERS, requestOptions);
}

export function SendEmail(Order_ID, Email, attachment, HeaderData) {
  let body = {
    process: 2,
    Order_ID: Order_ID,
    Email: Email,
    attachment: attachment,
    UCC_Name: HeaderData.UCC_Name,
    UccPhoneNo: HeaderData.UccPhoneNo,
    Delivery_Address: HeaderData.Delivery_Address,
    Pharmacist_Name: HeaderData.Pharmacist_Name,
    NIPC: HeaderData.NIPC,
    Post_Code: HeaderData.Post_Code,
    Responsible_Pharmacist_Email: HeaderData.Responsible_Pharmacist_Email,
    Laboratory_Name: HeaderData.Laboratory_Name,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_APITOKEN}`,
    },
    body: JSON.stringify(body),
  };

  return getRequestPromise(process.env.REACT_APP_POST_ORDERS, requestOptions);
}
