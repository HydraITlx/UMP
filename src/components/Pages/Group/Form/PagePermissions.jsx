import { useState, useEffect } from "react";
import {
  getPagePermissions,
  onHandleOptions,
  onHandleUpdate,
  onHandleDelete,
  onHandleInsert,
} from "../../../Requests/PagePermissionRequests";
import { Paper } from "@mui/material";
import MaterialTable, { MTableToolbar } from "@material-table/core";
import Controls from "../../../Helpers/Controls";
import Switch from "../../../Helpers/SwitchTable";

export default function PagePermissions(props) {
  const { recordForEdit } = props;

  const [data, setData] = useState([]);
  const [lineOptions, setlineOptions] = useState([]);

  useEffect(() => {
    let OptionsPromise = "";

    OptionsPromise = onHandleOptions();
    handleOptionPromise(OptionsPromise);
    if (recordForEdit !== null) {
      getPagePromise();
    }
  }, []);

  function getPagePromise() {
    const PagePromise = getPagePermissions(recordForEdit.value);
    handlePagePromise(PagePromise);
  }

  const handlePagePromise = (PagePromise) => {
    {
      if (PagePromise === undefined) {
        return;
      }

      PagePromise.then((response) => {
        if (response !== undefined) {
          setData(response);
        }
      });
    }
  };

  const handleOptionPromise = (OptionsPromise) => {
    {
      if (OptionsPromise === undefined) {
        return;
      }
      OptionsPromise.then((response) => {
        if (response !== undefined) {
          setlineOptions(response);
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
        setError("Nome de página não pode estar vazio");
      } else {
        checkDuplicates(data, rest.rowData.intid, newValue, setError);
      }

      if (error !== null) {
        onChange(newValue);
      }
    };

    return (
      <Controls.Select
        {...rest}
        name="name"
        label="Nome"
        error={error}
        value={currentValue}
        //     error={helperText}
        onChange={change}
        options={lineOptions}
      />
    );
  };

  function checkDuplicates(arr, index, newPermission_id, setError) {
    return arr.map((options) => {
      if (options.intid !== index) {
        if (options.permission_id === newPermission_id) {
          setError("Nome de página já existe");
        }
      }
    });
  }

  //Auto Height
  const tableHeight =
    ((window.innerHeight - 64 - 64 - 52 - 1) / window.innerHeight) * 75;
  //Auto Height

  const options = {
    maxBodyHeight: `${tableHeight}vh`,
    minBodyHeight: `${tableHeight}vh`,
    //pageSize: 10,
    paging: false,
    headerStyle: {
      position: "sticky",
      top: 0,
      backgroundColor: "#ad0b90",
      color: "#FFFFFF",
      fontWeight: "bold",
      height: 10,
    },
    filtering: false,
    addRowPosition: "first",
    actionsColumnIndex: -1,
    search: false,
    showTitle: false,
    padding: "dense",
  };

  const columns = [
    {
      title: "Nome",
      field: "permission_id",
      render: (RowData) => (
        <Controls.Select
          disabled={true}
          name="departmentId"
          label="Nome"
          value={RowData.permission_id}
          options={lineOptions}
        />
      ),
      editComponent,
    },

    {
      title: "ID Página",
      field: "name",
      width: "20%",
      render: (rowData) => (
        <Controls.Input
          variant="standard"
          label=""
          name="label"
          value={rowData.permission_id}
        />
      ),
      editComponent: (RowData) => {
        return (
          <Controls.Input
            variant="standard"
            label=""
            name="label"
            value={
              RowData.rowData.permission_id !== undefined
                ? RowData.rowData.permission_id
                : ""
            }
          />
        );
      },
    },

    {
      title: "Leitura",
      field: "allow_read",
      render: (rowData) => (
        <Switch
          defaultChecked={rowData.allow_read}
          value={rowData.allow_read}
          disabled={true}
        ></Switch>
      ),
      editComponent: (RowData) => (
        <Switch
          value={RowData.value !== undefined ? RowData.value : false}
          onChange={(e) => RowData.onChange(e.target.checked)}
          disabled={false}
        ></Switch>
      ),
    },

    {
      title: "Inserção",
      field: "allow_insert",
      render: (rowData) => (
        <Switch
          defaultChecked={rowData.allow_insert}
          value={rowData.allow_insert}
          disabled={true}
        ></Switch>
      ),
      editComponent: (RowData) => (
        <Switch
          value={RowData.value !== undefined ? RowData.value : false}
          onChange={(e) => RowData.onChange(e.target.checked)}
          disabled={false}
        ></Switch>
      ),
    },
    {
      title: "Modificação",
      field: "allow_modify",
      render: (rowData) => (
        <Switch
          defaultChecked={rowData.allow_modify}
          value={rowData.allow_modify}
          disabled={true}
        ></Switch>
      ),
      editComponent: (RowData) => (
        <Switch
          value={RowData.value !== undefined ? RowData.value : false}
          onChange={(e) => RowData.onChange(e.target.checked)}
          disabled={false}
        ></Switch>
      ),
    },
    {
      title: "Eliminação",
      field: "allow_delete",
      render: (rowData) => (
        <Switch
          defaultChecked={rowData.allow_delete}
          value={rowData.allow_delete}
          disabled={true}
        ></Switch>
      ),
      editComponent: (RowData) => (
        <Switch
          value={RowData.value !== undefined ? RowData.value : false}
          onChange={(e) => RowData.onChange(e.target.checked)}
          disabled={false}
        ></Switch>
      ),
    },
  ];

  return (
    <>
      {recordForEdit !== null && (
        <Paper>
          <MaterialTable
            options={options}
            columns={columns}
            data={data}
            localization={{
              header: { actions: "Ações" },
              body: { editRow: { deleteText: "Deseja apagar esta linha?" } },
            }}
            editable={{
              onRowAdd: (newRow) =>
                new Promise((resolve, reject) => {
                  let allow_Resolve = true;
                  data.map((options) => {
                    if (options.permission_id === newRow.permission_id) {
                      allow_Resolve = false;
                    }
                  });

                  if (
                    newRow.permission_id === undefined ||
                    newRow.permission_id === " "
                  ) {
                    allow_Resolve = false;
                  }

                  if (allow_Resolve) {
                    onHandleInsert(recordForEdit.value, newRow);
                  }

                  setTimeout(() => {
                    if (allow_Resolve) {
                      getPagePromise();
                      resolve();
                    } else {
                      reject();
                    }
                  }, 2000);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  let allow_Resolve = true;
                  data.map((options) => {
                    if (options.intid !== oldData.intid) {
                      if (options.permission_id === newData.permission_id) {
                        allow_Resolve = false;
                      }
                    }
                  });

                  if (allow_Resolve) {
                    onHandleUpdate(recordForEdit.value, newData, oldData);
                  }
                  setTimeout(() => {
                    if (allow_Resolve) {
                      getPagePromise();
                      resolve();
                    } else {
                      reject();
                    }
                  }, 2000);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  onHandleDelete(oldData.group_Id, oldData.permission_id);
                  setTimeout(() => {
                    getPagePromise();
                    resolve();
                  }, 2000);
                }),
            }}
            components={{
              Toolbar: (props) => (
                <div style={{ position: "absolute", bottom: "98%", right: 0 }}>
                  <MTableToolbar {...props}></MTableToolbar>
                </div>
              ),
            }}
          />
        </Paper>
      )}
    </>
  );
}
