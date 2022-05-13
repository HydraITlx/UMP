import { useEffect, useState } from "react";
import MaterialTable, { MTableToolbar } from "@material-table/core";
import { Paper } from "@mui/material";
import { GetPostedOrders } from "../../Requests/PostedOrdersRequests";
import { CreateOrderPDF } from "../../Helpers/CreateOrderPDF";

import OrderForm from "./Form/OrderForm";
import Popup from "../../Helpers/Popup";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/RemoveRedEye";
import TableTitle from "../../Helpers/TableTitle";
import NoAccess from "../../Helpers/NoAccess";
import Spinner from "../../Spinner/Spinner";
import {
  getPermissions,
  checkIfAdminPermissions,
} from "../../Requests/PermissionRequests";

export default function GruopTable() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(true);
  const [isEdit, setisEdit] = useState(false);
  const [OnlyPreview, setOnlyPreview] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [AllowRead, setAllowRead] = useState(false);
  const [AllowModify, setAllowModify] = useState(false);
  const [AllowInsert, setAllowInsert] = useState(false);
  const [AllowDelete, setAllowDelete] = useState(false);
  const [IsAdmin, setIsAdmin] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [recordForEdit, setRecordForEdit] = useState(null);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      let userID = sessionStorage.getItem("userID");
      userID = JSON.parse(userID);

      if (userID === null) {
        userID = localStorage.getItem("userID");
        userID = JSON.parse(userID);
      }
      handleOrdersRequests(userID);
      handlePermissionRequests();
    }

    return () => {
      isMounted = false;
    };
  }, [update]);

  function handlePermissionRequests() {
    const AdminPromise = checkIfAdminPermissions();
    handleAdminPromise(AdminPromise);

    const RequestPromise = getPermissions(30);
    handlePermissionPromise(RequestPromise);
  }

  const handlePermissionPromise = (AuthPromise) => {
    {
      if (AuthPromise === undefined) {
        return;
      }

      AuthPromise.then((response) => {
        if (response[0] !== undefined) {
          setAllowRead(response[0].r);
          setAllowModify(response[0].m);
          setAllowInsert(response[0].i);
          setAllowDelete(response[0].d);
        }
      });
    }
  };

  const handleAdminPromise = (AuthPromise) => {
    if (IsAdmin) {
      return;
    }
    {
      if (AuthPromise === undefined) {
        return;
      }

      AuthPromise.then((response) => {
        if (response !== undefined) {
          setIsAdmin(response[0].is_admin);
        }
      });
    }
  };

  function handleOrdersRequests(userName) {
    const OrdersPromise = GetPostedOrders(userName);
    handleOrderPromise(OrdersPromise);
  }

  const handleOrderPromise = (AuthPromise) => {
    {
      if (AuthPromise === undefined) {
        setTimeout(() => {
          setisLoading(false);
        }, 1000);
        return;
      }

      AuthPromise.then((response) => {
        if (response !== undefined) {
          console.log(response);
          setData(response);
          setTimeout(() => {
            setisLoading(false);
          }, 1000);
        }
      });
    }
  };

  const columns = [
    {
      title: "UCC",
      field: "UCC_Name",

      width: "auto",
    },

    {
      title: "Farmacêutico",
      field: "Pharmacist_Name",
      width: "auto",
    },

    {
      title: "Laboratório",
      field: "Laboratory_Name",
      width: "auto",
    },
    {
      title: "Nº Items",
      field: "Number_Item",
      width: "auto",
      align: "center",
    },

    {
      title: "Valor Mínimo",
      field: "Order_Minimum_Amount",
      width: "auto",
      align: "center",
    },

    {
      title: "Valor Total",
      field: "Total_Amount",
      width: "auto",
      align: "center",
    },
  ];

  //Auto Height
  const tableHeight =
    ((window.innerHeight - 64 - 64 - 52 - 1) / window.innerHeight) * 85;
  //Auto Height

  const options = {
    maxBodyHeight: `${tableHeight}vh`,
    minBodyHeight: `${tableHeight}vh`,
    pageSize: 20,
    emptyRowsWhenPaging: false, // To avoid of having empty rows
    pageSizeOptions: [20, 40, 60], // rows selection options
    paging: true,
    headerStyle: {
      position: "sticky",
      top: 0,
      backgroundColor: "#ad0b90",
      color: "#FFFFFF",
      fontWeight: "bold",
      height: 40,
      fontSize: 11,
    },
    rowStyle: { fontSize: 11 },
    filtering: false,
    actionsColumnIndex: -1,
    padding: "dense",
  };

  const addOrEdit = (values) => {
    setOpenPopup(false);

    setTimeout(() => {}, 500);
  };

  const openInPopup = (rowData) => {
    setRecordForEdit(rowData);
    setOpenPopup(true);
  };

  const HandlePrintDocument = (headerData, rowData) => {
    console.log("victor AQUI AAAHAHAHAHAH");
    console.log(headerData);
    console.log(rowData);
    CreateOrderPDF(headerData, rowData, headerData.Order_ID);
  };

  if (isLoading === true) {
    return <Spinner />;
  }

  if (isLoading === false) {
    if (IsAdmin || AllowRead === 1) {
      return (
        <>
          <Paper>
            <MaterialTable
              options={options}
              columns={columns}
              data={data}
              title={<TableTitle text="Encomendas" />}
              editable={{
                onRowDelete: (oldData) => new Promise((resolve, reject) => {}),
              }}
              components={{
                Action: (props) => (
                  <div style={{ display: "flex" }}>
                    {(AllowModify === 1 || IsAdmin === true) && (
                      <IconButton
                        disabled={!AllowModify && !IsAdmin}
                        onClick={() => {
                          setisEdit(true);
                          setOnlyPreview(false);
                          openInPopup(props.data);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    )}

                    {!AllowModify && !IsAdmin && (
                      <IconButton
                        disabled={false}
                        onClick={() => {
                          setisEdit(true);
                          setisInsert(false);
                          setOnlyPreview(true);
                          openInPopup(props.data);
                        }}
                      >
                        <PreviewIcon />
                      </IconButton>
                    )}
                  </div>
                ),

                Toolbar: (props) => (
                  <div>
                    <MTableToolbar {...props} />
                  </div>
                ),
              }}
              localization={{
                header: { actions: "Ações" },
                body: {
                  emptyDataSourceMessage: (
                    <div
                      style={{
                        color: "#ad0b90",
                        fontWeight: "bold",
                        fontSize: "2rem",
                      }}
                    >
                      Não tem encomendas criadas
                    </div>
                  ),
                },
                toolbar: {
                  searchTooltip: "Pesquisar",
                  searchPlaceholder: "Pesquisar",
                },
                pagination: {
                  labelRowsSelect: "linhas",
                  labelDisplayedRows: "{count} de {from}-{to}",
                  firstTooltip: "Primeira página",
                  previousTooltip: "Página anterior",
                  nextTooltip: "Próxima página",
                  lastTooltip: "Última página",
                  labelRowsPerPage: "Linhas por página:",
                },
              }}
            />
          </Paper>
          <Popup
            title="Escolha uma UCC para começar"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <OrderForm
              addOrEdit={addOrEdit}
              HandlePrintDocument={HandlePrintDocument}
              data={data}
              recordForEdit={recordForEdit}
            ></OrderForm>
          </Popup>
        </>
      );
    } else {
      return (
        <>
          <NoAccess />
        </>
      );
    }
  }
}
