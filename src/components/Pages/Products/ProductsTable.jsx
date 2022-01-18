import { useEffect, useState } from "react";
import MaterialTable, { MTableToolbar } from "@material-table/core";
import { Paper } from "@mui/material";
import {
  getProducts,
  InsertProducts,
  getLabsOptions,
  DeleteProducts,
  modifyProducts,
} from "../../Requests/ProductsRequests";

import Popup from "../../Helpers/Popup";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import ProductForm from "./Form/ProductForm";
import EditIcon from "@mui/icons-material/Edit";
import TableTitle from "../../Helpers/TableTitle";
import Switch from "../../Helpers/Switch";

export default function GruopTable() {
  const [data, setData] = useState([]);
  const [LabOptions, setLabOptions] = useState([]);
  const [update, setUpdate] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [isInsert, setisInsert] = useState(false);
  const [isEdit, setisEdit] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      const LabOptionsPromise = getLabsOptions();
      handleLabOptionsPromise(LabOptionsPromise);

      handleProductsRequests();
    }
    return () => {
      isMounted = false;
    };
  }, [update]);

  function handleProductsRequests() {
    const ProductsPromise = getProducts();
    handleProductsPromise(ProductsPromise);
  }

  const handleProductsPromise = (AuthPromise) => {
    {
      if (AuthPromise === undefined) {
        return;
      }

      AuthPromise.then((response) => {
        if (response !== undefined) {
          console.log(response);
          setData(response);
        }
      });
    }
  };

  const handleLabOptionsPromise = (AuthPromise) => {
    {
      if (AuthPromise === undefined) {
        return;
      }

      AuthPromise.then((response) => {
        if (response !== undefined) {
          console.log(response);
          setLabOptions(response);
        }
      });
    }
  };

  const columns = [
    {
      title: "Ano",
      field: "Year",
      width: "auto",
    },

    {
      title: "Tipo",
      field: "Type",
      width: "auto",
    },

    {
      title: "CHNM",
      field: "CHNM",
      width: "auto",
    },

    {
      title: "Descrição",
      field: "Description",
      width: "auto",
    },

    {
      title: "Nome Laboratório",
      field: "Laboratory_Name",
      width: "auto",
    },

    {
      title: "Preço Caixa",
      field: "Unit_Price_Box",
      width: "auto",
    },

    {
      title: "Qtd. por Caixa",
      field: "Total_Quantity",
      width: "auto",
    },

    {
      title: "Preço unit.",
      field: "Unit_Price_UN",
      width: "auto",
    },

    {
      title: "Esgotado",
      field: "Sold_Out",
      width: "auto",
      render: (RowData) => (
        <Switch
          value={RowData.Sold_Out}
          disabled={true}
          id={"Active"}
          defaultChecked={RowData.Sold_Out}
          label={""}
        ></Switch>
      ),
    },

    {
      title: "Active",
      field: "Active",
      width: "auto",
      render: (RowData) => (
        <Switch
          value={RowData.Active}
          disabled={true}
          id={"Active"}
          defaultChecked={RowData.Active}
          label={""}
        ></Switch>
      ),
    },

    {
      title: "Editar ",
      field: "",
      render: (rowData) => (
        <IconButton
          onClick={() => {
            setisEdit(true);
            setisInsert(false);
            openInPopup(rowData);
          }}
        >
          <EditIcon />
        </IconButton>
      ),
      width: "10%",
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

  const addOrEdit = (values, resetForm) => {
    if (isInsert) {
      InsertProducts(values);
    }
    if (isEdit) {
      modifyProducts(values);
    }
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);

    setTimeout(() => {
      handleProductsRequests();
      setisEdit(false);
      setisInsert(true);
    }, 500);
  };

  const addonConfirm = (values) => {
    if (isInsert) {
      onHandleInsert(values);
    }
    setUpdate(!update);
    setTimeout(() => {
      setisEdit(false);
      setisInsert(true);
    }, 500);
  };

  const openInPopup = (rowData) => {
    setRecordForEdit(rowData);
    setOpenPopup(true);
  };

  return (
    <>
      <Paper>
        <MaterialTable
          options={options}
          columns={columns}
          data={data}
          title={<TableTitle text="Produtos" />}
          editable={{
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                DeleteProducts(oldData);
                setTimeout(() => {
                  handleProductsRequests();
                  resolve();
                }, 1500);
              }),
          }}
          components={{
            Toolbar: (props) => (
              <div>
                <MTableToolbar {...props} />
                <div style={{ padding: "0px 10px", textAlign: "right" }}>
                  <IconButton
                    onClick={() => {
                      setisEdit(false);
                      setisInsert(true);
                      setOpenPopup(true);
                      setRecordForEdit(null);
                    }}
                  >
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
      <Popup
        title="Ficha de Produto"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ProductForm
          data={data}
          recordForEdit={recordForEdit}
          addOrEdit={addOrEdit}
          addonConfirm={addonConfirm}
          isEdit={isEdit}
          LabOptions={LabOptions}
        ></ProductForm>
      </Popup>
    </>
  );
}
