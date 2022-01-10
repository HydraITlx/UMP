export function getPagePermissions(group_Id) {
  let data = {
    group_Id: group_Id,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_APITOKEN}`,
    },
    body: JSON.stringify(data),
  };

  return getPagesPromise(process.env.REACT_APP_GET_GROUPPAGES, requestOptions);
}

function getPagesPromise(RequestUrl, requestOptions) {
  return fetch(RequestUrl, requestOptions)
    .then((response) => response.json())
    .then((responseData) => {
      return responseData;
    })
    .catch((error) => console.warn(error));
}

export function onHandleOptions() {
  let requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_APITOKEN}`,
    },
  };

  return getPagesPromise(process.env.REACT_APP_GET_ALLPAGES, requestOptions);
}

export function onHandleUpdate(group_Id, rowData, oldData) {
  let body = {
    oldpermission_id: oldData.permission_id,
    group_Id: group_Id,
    permission_Id: rowData.permission_id,
    name: rowData.name,
    allow_read: rowData.allow_read,
    allow_insert: rowData.allow_insert,
    allow_modify: rowData.allow_modify,
    allow_delete: rowData.allow_delete,
  };

  let requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_APITOKEN}`,
    },
    body: JSON.stringify(body),
  };
  getPagesPromise(process.env.REACT_APP_UPDATE_PAGES, requestOptions);
}

export async function onHandleDelete(groupip, permissionid) {
  let data = {
    group_Id: groupip,
    permission_id: permissionid,
  };

  let requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_APITOKEN}`,
    },
    body: JSON.stringify(data),
  };

  getPagesPromise(process.env.REACT_APP_DELETE_ALLPAGES, requestOptions);
}

export async function onHandleInsert(group_Id, rowdata) {
  let read = false;
  let insert = false;
  let modify = false;
  let allowdelete = false;
  if (rowdata.allow_read !== undefined) {
    read = rowdata.allow_read;
  }

  if (rowdata.allow_insert !== undefined) {
    insert = rowdata.allow_insert;
  }

  if (rowdata.allow_modify !== undefined) {
    modify = rowdata.allow_modify;
  }

  if (rowdata.allow_delete !== undefined) {
    allowdelete = rowdata.allow_delete;
  }

  let body = {
    group_Id: group_Id,
    permission_Id: rowdata.permission_id,
    name: rowdata.name,
    allow_read: read,
    allow_insert: insert,
    allow_modify: modify,
    allow_delete: allowdelete,
  };

  let requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_APITOKEN}`,
    },
    body: JSON.stringify(body),
  };
  getPagesPromise(process.env.REACT_APP_GET_MANAGEPAGES, requestOptions);
}
