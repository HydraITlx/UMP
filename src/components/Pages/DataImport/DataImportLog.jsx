import { useState, useEffect } from "react";

import { GetImportDataLog } from "../../Requests/DataImportRequest";
import { Paper } from "@mui/material";
import MaterialTable, { MTableToolbar } from "@material-table/core";

export default function PagePermissions(props) {
  const { recordForEdit, Order_ID } = props;

  const [data, setData] = useState([]);

  useEffect(() => {
    getDataImportLog();
  }, []);

  function getDataImportLog() {
    const ProductsLines = GetImportDataLog(Order_ID);
    handlegetDataImportLog(ProductsLines);
  }

  const handlegetDataImportLog = (ProductsLines) => {
    {
      if (ProductsLines === undefined) {
        return;
      }

      ProductsLines.then((response) => {
        if (response !== undefined) {
          setData(response);
        }
      });
    }
  };

  //Auto Height
  const tableHeight =
    ((window.innerHeight - 64 - 64 - 52 - 1) / window.innerHeight) * 90;
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
      height: 40,
      fontSize: 12,
    },
    rowStyle: { fontSize: 14 },
    filtering: false,
    addRowPosition: "first",
    actionsColumnIndex: -1,
    search: false,
    showTitle: false,
    padding: "dense",
  };

  const columns = [
    {
      title: "Nome Ficheiro",
      field: "File_Name",
      width: "auto",
      editable: "never",
    },
    {
      title: "Tipo de Dados",
      field: "Data_Type",
      width: "auto",
      editable: "never",
    },

    {
      title: "Data de Importação",
      field: "Date",
      width: "auto",
      align: "center",
      editable: "never",
      render: (RowData) => RowData.Date.slice(0, 10),
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
