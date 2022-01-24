import React, { useEffect, useState } from "react";
import MaterialTable, {
  MTableToolbar,
  MTableAction,
} from "@material-table/core";
import { Paper } from "@mui/material";
import {
  getOrderAccess,
  getUCCOptions,
  InsertOrderAccess,
  UpdateOrderAccess,
  DeleteOrderAccess,
} from "../../Requests/AccessOrderRequest";

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import TableTitle from "../../Helpers/TableTitle";
import Select from "../../Helpers/SelectRender";
import { onHandlePharmacistOptions } from "../../Requests/UCCRequests";

export default function GruopTable() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(true);
  const addActionRef = React.useRef();
  const [pharmacistOptions, SetpharmacistOptions] = useState([]);
  const [UCCOptions, SetUCCOptions] = useState([]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) MakeRequests();

    return () => {
      isMounted = false;
    };
  }, [update]);

  function MakeRequests() {
    const OptionsPromise = onHandlePharmacistOptions();
    handleOptionsPromise(OptionsPromise);

    const UCCOptionsPromise = getUCCOptions();
    handleUCCOptionsPromise(UCCOptionsPromise);

    const RequestPromise = getOrderAccess();
    handleRequestPromise(RequestPromise);
  }

  const handleOptionsPromise = (AuthPromise) => {
    {
      if (AuthPromise === undefined) {
        return;
      }

      AuthPromise.then((response) => {
        console.log(response);
        if (response !== undefined) {
          SetpharmacistOptions(response);
        }
      });
      return;
    }
  };

  const handleUCCOptionsPromise = (AuthPromise) => {
    {
      if (AuthPromise === undefined) {
        return;
      }

      AuthPromise.then((response) => {
        console.log(response);
        if (response !== undefined) {
          SetUCCOptions(response);
        }
      });
      return;
    }
  };

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
      if (newValue === " ") {
        setError("O Nome Farmacêutico não pode estar vazio");
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
        name="Pharmacist_ID"
        label=""
        error={error}
        value={currentValue}
        //     error={helperText}
        onChange={change}
        options={pharmacistOptions}
      />
    );
  };

  function checkDuplicates(arr, index, new_id, setError) {
    console.log(index);
    return arr.map((options) => {
      if (options.ID !== index) {
        console.log("HELO");
        console.log(`${options.Pharmacist_ID} new_id ${new_id}`);
        if (options.Pharmacist_ID === new_id) {
          setError("O Farmacêutico já existe");
        }
      }
    });
  }

  const columns = [
    {
      title: "Nome Farmacêutico",
      field: "Pharmacist_ID",
      width: "50%",
      render: (rowData) => (
        <Select
          label=""
          value={rowData.Pharmacist_ID}
          //     error={helperText}
          options={pharmacistOptions}
        />
      ),
      editComponent,
    },

    {
      title: "Nome UCC",
      field: "UCC_ID",
      width: "50%",
      render: (rowData) => (
        <Select
          label=""
          value={rowData.UCC_ID}
          //     error={helperText}
          options={UCCOptions}
        />
      ),
      editComponent: (tableData) => {
        console.log(tableData);
        console.log("tableData");
        return (
          <Select
            name="UCC_ID"
            label=""
            value={
              tableData.rowData.UCC_ID !== undefined
                ? tableData.rowData.UCC_ID
                : " "
            }
            //     error={helperText}
            onChange={(e) => tableData.onChange(e.target.value)}
            options={UCCOptions}
          />
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
          title={<TableTitle text="Lista de acesso a encomendas" />}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                console.log("newData");
                console.log(newData);
                let allow_Resolve = true;

                data.map((options) => {
                  if (options.Pharmacist_ID === newData.Pharmacist_ID) {
                    allow_Resolve = false;
                  }
                });

                if (
                  newData.Pharmacist_ID === undefined ||
                  newData.Pharmacist_ID === " "
                ) {
                  allow_Resolve = false;
                }
                if (allow_Resolve) {
                  InsertOrderAccess(newData);
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
                  console.log("newData");
                  console.log(newData);
                  if (options.ID !== oldData.ID) {
                    if (options.Pharmacist_ID === newData.Pharmacist_ID) {
                      allow_Resolve = false;
                    }
                  }
                });

                if (
                  newData.Pharmacist_ID === undefined ||
                  newData.Pharmacist_ID === " "
                ) {
                  allow_Resolve = false;
                }
                if (allow_Resolve) {
                  UpdateOrderAccess(newData);
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
                DeleteOrderAccess(oldData);
                setTimeout(() => {
                  MakeRequests();
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
            header: { actions: "Ações" },
            body: { editRow: { deleteText: "Deseja apagar esta linha?" } },
          }}
        />
      </Paper>
    </>
  );
}
