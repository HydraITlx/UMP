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
          console.log(response);
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
      title: "Total",
      field: "Total_Amount",
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
          if (e.target.value.length > 8) return;

          const floatRegExp = new RegExp(
            "^[+-]?([0-9]+([,][0-9]*)?|[,][0-9]+)$"
          );

          const orginalValue = e.target.value;
          let value = e.target.value;

          if (value === "" || floatRegExp.test(value)) {
            value = value.replace(",", ".");
            let unitprice =
              value / props.rowData.Box_Quantity.replace(",", ".");
            console.log(unitprice);
            console.log(
              `Value => ${value}  qtd Box =>  ${props.rowData.Box_Quantity}  unitprice => ${unitprice}`
            );
            props.rowData.Unit_Price_UN = unitprice
              .toFixed(5)
              .replace(".", ",");
            props.rowData.Total_Amount = (props.rowData.Quantity * value)
              .toFixed(5)
              .replace(".", ",");
            props.onChange(orginalValue);
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
          if (e.target.value.length > 8) return;

          const floatRegExp = new RegExp(/^[0-9\b]+$/);

          const value = e.target.value;
          if (value === "" || floatRegExp.test(value)) {
            console.log(value);
            if (value === "" || parseInt(value, 10) === 0) {
              let unitprice = 0;
              props.rowData.Unit_Price_UN = unitprice.toFixed(5);
              props.onChange(value);
            } else {
              console.log(props.rowData.Unit_Price_Box);
              let unitprice =
                props.rowData.Unit_Price_Box.replace(",", ".") / value;
              props.rowData.Unit_Price_UN = unitprice
                .toFixed(5)
                .replace(".", ",");
              props.onChange(value);
            }
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
