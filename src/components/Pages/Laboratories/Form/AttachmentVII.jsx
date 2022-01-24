import { useState, useEffect } from "react";
import {
  getAttachmentVII,
  InsertAttachmentVII,
  UpdateAttachmentVII,
  DeleteAttachmentVII,
} from "../../../Requests/AttachmentVIIRequests";

import Controls from "../../../Helpers/Controls";
import { Paper } from "@mui/material";
import MaterialTable, { MTableToolbar } from "@material-table/core";

export default function PagePermissions(props) {
  const { recordForEdit, ID } = props;

  const [data, setData] = useState([]);

  useEffect(() => {
    if (recordForEdit !== null) {
      getAttachmentVIIPromise();
    }
  }, []);

  function getAttachmentVIIPromise() {
    const ReturnPromise = getAttachmentVII(ID);
    handlePromise(ReturnPromise);
  }

  const handlePromise = (ReturnPromise) => {
    {
      if (ReturnPromise === undefined) {
        return;
      }

      ReturnPromise.then((response) => {
        console.log(response);
        if (response !== undefined) {
          setData(response);
        }
      });
    }
  };

  const editComponent = ({ onChange, value, ...rest }) => {
    let newRowValue = 0;
    if (value !== undefined) {
      newRowValue = value;
    }

    const [error, setError] = useState(null);

    const change = (e) => {
      let newValue = " ";

      if (e.target !== undefined) {
        newValue = e.target.value;
      }

      onChange(newValue);
      setError(null);
      if (newValue < 1900) {
        setError("Ano não é valido");
      } else {
        checkDuplicates(data, rest.rowData.intid, newValue, setError);
      }

      if (error !== null) {
        onChange(newValue);
      }
    };

    return (
      <Controls.Input
        name="Year"
        label=""
        variant="standard"
        error={error}
        value={newRowValue}
        onChange={change}
        type="number"
      />
    );
  };

  function checkDuplicates(arr, index, New_year, setError) {
    return arr.map((options) => {
      if (options.intid !== index) {
        if (options.Year === parseInt(New_year)) {
          setError("Ano já existe");
        }
      }
    });
  }

  //Auto Height
  const tableHeight =
    ((window.innerHeight - 64 - 64 - 52 - 1) / window.innerHeight) * 70;
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
      title: "Ano",
      field: "Year",
      width: "33%",
      editComponent,
    },
    {
      title: "Morada",
      field: "Address",
      width: "auto",
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
                    if (parseInt(options.Year) === parseInt(newRow.Year)) {
                      allow_Resolve = false;
                    }
                  });

                  if (newRow.Year === "" || newRow.Year < 1900) {
                    allow_Resolve = false;
                  }

                  if (allow_Resolve) {
                    InsertAttachmentVII(newRow, ID);
                  }
                  setTimeout(() => {
                    if (allow_Resolve) {
                      InsertAttachmentVII(newRow, ID);
                      getAttachmentVIIPromise();
                      resolve();
                    } else {
                      reject();
                    }
                  }, 2000);
                }),

              onRowUpdate: (newRow, oldRow) =>
                new Promise((resolve, reject) => {
                  let allow_Resolve = true;
                  data.map((options) => {
                    if (options.intid !== oldRow.intid) {
                      if (parseInt(options.Year) === parseInt(newRow.Year)) {
                        allow_Resolve = false;
                      }
                    }
                  });

                  if (newRow.Year === "" || newRow.Year < 1900) {
                    allow_Resolve = false;
                  }

                  if (allow_Resolve) {
                    UpdateAttachmentVII(newRow, oldRow.Year);
                  }

                  setTimeout(() => {
                    if (allow_Resolve) {
                      getAttachmentVIIPromise();
                      resolve();
                    } else {
                      reject();
                    }
                  }, 2000);
                }),

              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  DeleteAttachmentVII(oldData);
                  setTimeout(() => {
                    getAttachmentVIIPromise();
                    resolve();
                  }, 1000);
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
