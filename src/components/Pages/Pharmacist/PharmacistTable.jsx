import React, { useEffect, useState } from "react";
import MaterialTable, {
  MTableToolbar,
  MTableAction,
} from "@material-table/core";
import { Paper } from "@mui/material";
import {
  getPharmacists,
  DeletePharmacists,
  InsertPharmacists,
  getUserOptions,
  UpdatePharmacists,
} from "../../Requests/PharmacistRequest";

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import TableTitle from "../../Helpers/TableTitle";
import Select from "../../Helpers/SelectRender";
import Switch from "../../Helpers/Switch";

export default function GruopTable() {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState(true);
  const addActionRef = React.useRef();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) MakeRequests();

    return () => {
      isMounted = false;
    };
  }, [update]);

  function MakeRequests() {
    const userRequest = getUserOptions();
    handleUsersPromise(userRequest);
    const RequestPromise = getPharmacists();
    handleRequestPromise(RequestPromise);
  }

  const handleRequestPromise = (RequestPromise) => {
    {
      if (RequestPromise === undefined) {
        return;
      }

      RequestPromise.then((response) => {
        console.log(response);
        if (response !== undefined) {
          setData(response);
        }
      });
    }
  };

  const handleUsersPromise = (RequestPromise) => {
    {
      if (RequestPromise === undefined) {
        return;
      }

      RequestPromise.then((response) => {
        console.log(response);
        if (response !== undefined) {
          console.log(response);
          setUsers(response);
        }
      });
    }
  };

  const editComponent = ({ onChange, value, ...rest }) => {
    let newRowValue = " ";
    if (value !== undefined) {
      newRowValue = value;
    }

    const [currentValue, setValue] = useState(newRowValue);
    const [error, setError] = useState(null);

    const change = (e) => {
      let newValue = " ";

      if (e.target !== undefined) {
        newValue = e.target.value;
      }

      setValue(newValue);
      onChange(newValue);
      setError(null);
      console.log("rest.rowData");
      console.log(newValue);
      if (newValue === " ") {
        console.log("erroraqui");
        setError("Utilizador não pode estar vazio");
      } else {
        checkDuplicates(data, rest.rowData.ID, newValue, setError);
      }

      if (error !== null) {
        onChange(newValue);
      }
    };

    return (
      <Select
        {...rest}
        name="username"
        label=""
        error={error}
        value={currentValue}
        //     error={helperText}
        onChange={change}
        options={users}
      />
    );
  };

  function checkDuplicates(arr, index, new_id, setError) {
    return arr.map((options) => {
      if (options.ID !== index) {
        if (options.username === new_id) {
          setError("Utilizador já é atribuído a outro farmacêutico");
        }
      }
    });
  }

  const columns = [
    {
      title: "Nome",
      field: "Name",
      width: "auto",
    },

    { title: "Email", field: "Email", width: "auto" },

    { title: "Telefone", field: "Phone", width: "auto" },

    {
      title: "Utilizador",
      field: "username",
      width: "20%",
      render: (RowData) => (
        <Select disabled={true} value={RowData.username} options={users} />
      ),
      editComponent,
    },

    {
      title: "Ativo",
      field: "Active",
      width: "auto",
      width: "10%",
      render: (RowData) => (
        <Switch
          value={RowData.Active}
          disabled={true}
          id={"Active"}
          defaultChecked={RowData.Active}
          label={""}
        ></Switch>
      ),
      editComponent: (RowData) => {
        console.log(RowData.value);
        return (
          <Switch
            value={RowData.value !== undefined ? RowData.value : false}
            onChange={(e) => RowData.onChange(e.target.checked)}
            disabled={false}
          ></Switch>
        );
      },
    },
  ];

  //Auto Height
  const tableHeight =
    ((window.innerHeight - 64 - 64 - 52 - 1) / window.innerHeight) * 70;
  //Auto Height

  const options = {
    maxBodyHeight: `${tableHeight}vh`,
    minBodyHeight: `${tableHeight}vh`,
    pageSize: 10,
    paging: true,
    headerStyle: {
      backgroundColor: "#ad0b90",
      color: "#FFFFFF",
      fontWeight: "bold",
      height: 70,
    },
    filtering: false,
    actionsColumnIndex: -1,
    padding: "dense",
  };

  return (
    <>
      <Paper>
        <MaterialTable
          options={options}
          columns={columns}
          data={data}
          title={<TableTitle text="Farmacêuticos" />}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                console.log("newData");
                console.log(newData);
                let allow_Resolve = true;

                data.map((options) => {
                  if (options.username === newData.username) {
                    allow_Resolve = false;
                  }
                });

                if (
                  newData.username === undefined ||
                  newData.username === " "
                ) {
                  allow_Resolve = false;
                }
                if (allow_Resolve) {
                  InsertPharmacists(newData);
                }

                setTimeout(() => {
                  if (allow_Resolve) {
                    MakeRequests();
                    resolve();
                  } else {
                    reject();
                  }
                }, 1000);
              }),

            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                let allow_Resolve = true;

                data.map((options) => {
                  if (options.ID !== oldData.ID) {
                    if (options.username === newData.username) {
                      allow_Resolve = false;
                    }
                  }
                });

                if (
                  newData.username === undefined ||
                  newData.username === " "
                ) {
                  allow_Resolve = false;
                }
                if (allow_Resolve) {
                  UpdatePharmacists(newData);
                }

                setTimeout(() => {
                  if (allow_Resolve) {
                    MakeRequests();
                    resolve();
                  } else {
                    reject();
                  }
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                DeletePharmacists(oldData.ID);
                setTimeout(() => {
                  setUpdate(!update);
                  resolve();
                }, 1500);
              }),
          }}
          components={{
            Action: (props) => {
              if (
                typeof props.action === typeof Function ||
                props.action.tooltip !== "Add"
              ) {
                return <MTableAction {...props} />;
              } else {
                return (
                  <div ref={addActionRef} onClick={props.action.onClick} />
                );
              }
            },

            Toolbar: (props) => (
              <div>
                <MTableToolbar {...props} />
                <div style={{ padding: "0px 10px", textAlign: "right" }}>
                  <IconButton onClick={() => addActionRef.current.click()}>
                    <AddIcon />
                  </IconButton>
                </div>
              </div>
            ),
          }}
          localization={{
            header: { actions: "Eliminar" },
            body: { editRow: { deleteText: "Deseja apagar esta linha?" } },
          }}
        />
      </Paper>
    </>
  );
}
