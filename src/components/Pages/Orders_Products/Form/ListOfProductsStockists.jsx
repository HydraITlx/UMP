import { useState, useEffect } from "react";
import {
  getProductsLines,
  DeleteProductsLines,
  EditStockistProductsLines,
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
          props.calculateTotal(response);
          setData(response);
        }
      });
    }
  };

  //Auto Height
  const tableHeight =
    ((window.innerHeight - 64 - 64 - 52 - 1) / window.innerHeight) * 60;
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
      title: "Nome Comercial",
      field: "Comercial_Branch",
      editComponent: (props) => {
        function onChangeValue(e) {
          if (e.target.value.length > 199) return;
          props.onChange(e.target.value);
        }
        return (
          <input type="text" value={props.value} onChange={onChangeValue} />
        );
      },
      width: "auto",
    },

    {
      title: "Observações",
      field: "Observations",
      editComponent: (props) => {
        function onChangeValue(e) {
          if (e.target.value.length > 999) return;
          props.onChange(e.target.value);
        }
        return (
          <input type="text" value={props.value} onChange={onChangeValue} />
        );
      },
      width: "auto",
    },

    {
      title: "Total s/IVA",
      field: "Total_Amount",
      width: "auto",
      align: "center",
      editable: "never",
    },

    {
      title: "Total c/IVA",
      field: "Total_AmountVat",
      width: "auto",
      align: "center",
      editable: "never",
    },

    {
      title: "Preço Caixa",
      field: "Unit_Price_Box",
      width: "auto",
      align: "center",
      editComponent: (props) => {
        function onChangeValue(e) {
          const vatMultiplier = (percentage) => percentage / 100 + 1;

          if (e.target.value.length > 8) return;

          const floatRegExp = new RegExp(
            "^[+-]?([0-9]+([,][0-9]*)?|[,][0-9]+)$"
          );

          let value = e.target.value;

          if (value == "" || floatRegExp.test(value)) {
            const convertedValue = parseFloat(value.replace(",", "."));

            let unitprice = convertedValue / props.rowData.Box_Quantity;
            unitprice = unitprice.toFixed(5);
            props.rowData.Unit_Price_UN = unitprice.replace(".", ",");

            let Total_Amount = props.rowData.Quantity * convertedValue;
            Total_Amount = Total_Amount.toFixed(5);
            let Total_AmountVat =
              Total_Amount * vatMultiplier(props.rowData.Tax_Percentage);

            Total_AmountVat = Total_AmountVat.toFixed(5);
            props.rowData.Total_Amount = Total_Amount.replace(".", ",");
            props.rowData.Total_AmountVat = Total_AmountVat.replace(".", ",");
            props.onChange(value);
          }
        }
        return (
          <input type="text" value={props.value} onChange={onChangeValue} />
        );
      },
      align: "center",
    },
    {
      title: "Qtd. Caixa",
      field: "Box_Quantity",
      width: "auto",
      align: "center",
      editComponent: (props) => {
        function onChangeValue(e) {
          const vatMultiplier = (percentage) => percentage / 100 + 1;

          if (e.target.value.length > 8) return;
          const floatRegExp = new RegExp(/^[0-9\b]+$/);
          let value = e.target.value;

          if (value == "" || floatRegExp.test(value)) {
            const convertedValue = parseInt(value);
            const convertedBoxPrice = parseFloat(
              props.rowData.Unit_Price_Box.replace(",", ".")
            );

            let unitprice = convertedBoxPrice / convertedValue;
            unitprice = unitprice.toFixed(5);
            props.rowData.Unit_Price_UN = unitprice.replace(".", ",");

            props.onChange(value);
          }
        }
        return (
          <input type="text" value={props.value} onChange={onChangeValue} />
        );
      },
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
      editComponent: (props) => {
        function onChangeValue(e) {
          if (e.target.value.length > 6) return;

          const re = /^[0-9\b]+$/;
          if (e.target.value === "" || re.test(e.target.value)) {
            props.rowData.Total_Amount = (
              props.rowData.Unit_Price_Box.replace(",", ".") * e.target.value
            )
              .toFixed(5)
              .replace(".", ",");
            props.onChange(e.target.value);
          }
        }
        return (
          <input type="text" value={props.value} onChange={onChangeValue} />
        );
      },
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
                  EditStockistProductsLines(newRow);
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
