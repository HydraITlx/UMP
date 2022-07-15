import { useState, useEffect } from "react";
import { getProductsLines } from "../../../Requests/PostedOrdersRequests";
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
      title: "Observações",
      field: "Observations",
      width: "auto",
      editable: "never",
    },
    {
      title: "IVA",
      field: "Tax_Percentage",
      width: "auto",
      align: "center",
      editable: "never",
    },

    {
      title: "Total s/IVA",
      field: "Total_Amount",
      width: "auto",
      align: "center",
      editable: "never",
    },

    {
      title: "Total C/IVA",
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
      editable: "never",
    },
    {
      title: "Qtd. Caixa",
      field: "Box_Quantity",
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
      editComponent: (props) => {
        function onChangeValue(e) {
          if (e.target.value.length > 6) return;

          const re = /^[0-9\b]+$/;
          if (e.target.value === "" || re.test(e.target.value)) {
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
