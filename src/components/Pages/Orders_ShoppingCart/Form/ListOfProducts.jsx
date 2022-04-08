import { useState, useEffect } from "react";
import {
  getProductsLines,
  DeleteProductsLines,
  EditProductsLines,
} from "../../../Requests/OrdersRequests";
import { Paper } from "@mui/material";
import MaterialTable, { MTableToolbar } from "@material-table/core";

export default function PagePermissions(props) {
  const { recordForEdit, Order_ID } = props;

  const [data, setData] = useState([]);

  useEffect(() => {
    getOrderLines();
  }, []);

  function getOrderLines() {
    const ProductsLines = getProductsLines(Order_ID);
    handleProductsLines(ProductsLines);
  }

  const handleProductsLines = (ProductsLines) => {
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
    ((window.innerHeight - 64 - 64 - 52 - 1) / window.innerHeight) * 70;
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
      title: "Tipo",
      field: "Type",
      width: "auto",
      editable: "never",
      render: (rowData) => {
        let rowType = " ";
        if (rowData.Type === 1) {
          rowType = "Geral";
        }

        if (rowData.Type === 2) {
          rowType = "Subst Controladas";
        }

        if (rowData.Type === 3) {
          rowType = "Dispositivos Médicos";
        }

        if (rowData.Type === 4) {
          rowType = "Outros";
        }
        if (rowData.Type === 5) {
          rowType = "Nutrição";
        }
        if (rowData.Type === 6) {
          rowType = "Soros";
        }

        return <p style={{ marginTop: "10px" }}>{rowType}</p>;
      },
    },
    {
      title: "CHNM",
      field: "CHNM",
      width: "auto",
      editable: "never",
    },
    {
      title: "Descrição",
      field: "Description",
      width: "auto",
      editable: "never",
    },

    {
      title: "Preço Caixa",
      field: "Unit_Price_Box",
      width: "auto",
      align: "center",
      editable: "never",
    },
    {
      title: "Qtd. Caixa",
      field: "Total_Quantity",
      width: "auto",
      align: "center",
      editable: "never",
    },

    {
      title: "Preço unit.",
      field: "Unit_Price_UN",

      width: "auto",
      align: "center",
      editable: "never",
    },

    {
      title: "Quantidade",
      field: "Quantity",

      width: "auto",
      align: "center",
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
              onRowUpdate: (newRow, oldRow) =>
                new Promise((resolve, reject) => {
                  EditProductsLines(newRow);
                  setTimeout(() => {
                    getOrderLines();
                    resolve();
                  }, 1000);
                }),

              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  DeleteProductsLines(oldData);
                  setTimeout(() => {
                    getOrderLines();
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
