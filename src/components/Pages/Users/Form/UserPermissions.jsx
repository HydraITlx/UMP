import { useState, useEffect } from "react";
import {
  onGetPagePermissions,
  onGetPageOptions,
  onAddPagePermission,
  onDeletePagePermission,
} from "../../../Requests/UserRequests";
import { Paper } from "@mui/material";
import MaterialTable, { MTableToolbar } from "@material-table/core";
import Controls from "../../../Helpers/Controls";

export default function PagePermissions(props) {
  const { recordForEdit } = props;

  const [data, setData] = useState([]);
  const [lineOptions, setlineOptions] = useState([]);

  useEffect(() => {
    let OptionsPromise = "";

    OptionsPromise = onGetPageOptions();
    handleOptionPromise(OptionsPromise);

    if (recordForEdit !== null) {
      getPagePromise();
    }
  }, []);

  function getPagePromise() {
    const PagePromise = onGetPagePermissions(recordForEdit);
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
        setError("Grupo não pode estar vazio");
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
        onChange={change}
        options={lineOptions}
      />
    );
  };

  function checkDuplicates(arr, index, newGroup_Id, setError) {
    return arr.map((options) => {
      if (options.intid !== index) {
        if (options.group_Id === newGroup_Id) {
          setError("Grupo já existe");
        }
      }
    });
  }

  //Auto Height
  const tableHeight =
    ((window.innerHeight - 64 - 64 - 52 - 1) / window.innerHeight) * 55;
  //Auto Height

  const options = {
    maxBodyHeight: `${tableHeight}vh`,
    minBodyHeight: `${tableHeight}vh`,
    //pageSize: 10,
    paging: false,
    headerStyle: {
      backgroundColor: "#ad0b90",
      color: "#FFFFFF",
      fontWeight: "bold",
      height: 70,
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
      title: "Descrição Grupo",

      field: "group_Id",
      width: "50%",
      render: (RowData) => {
        return (
          <Controls.Select
            disabled={false}
            name="departmentId"
            label="Department"
            value={RowData.group_Id}
            options={lineOptions}
          />
        );
      },
      editComponent,
    },

    {
      title: "ID Grupo",
      field: "name",

      render: (rowData) => (
        <Controls.Input
          variant="standard"
          label=""
          name="label"
          value={rowData.group_Id}
        />
      ),
      editComponent: (RowData) => {
        return (
          <Controls.Input
            variant="standard"
            label=""
            name="label"
            value={
              RowData.rowData.group_Id !== undefined
                ? RowData.rowData.group_Id
                : ""
            }
          />
        );
      },
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
              header: { actions: "Eliminar" },
              body: { editRow: { deleteText: "Deseja apagar esta linha?" } },
            }}
            editable={{
              onRowAdd: (newRow) =>
                new Promise((resolve, reject) => {
                  console.log("WHHHHHHHHHHAT");
                  console.log(newRow.group_Id);
                  let allow_Resolve = true;
                  data.map((options) => {
                    if (options.group_Id === newRow.group_Id) {
                      allow_Resolve = false;
                    }
                  });

                  if (
                    newRow.group_Id === undefined ||
                    newRow.group_Id === " "
                  ) {
                    allow_Resolve = false;
                  }

                  if (allow_Resolve) {
                    onAddPagePermission(recordForEdit.username, newRow);
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
                  onDeletePagePermission(
                    recordForEdit.username,
                    oldData.group_Id
                  );
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
