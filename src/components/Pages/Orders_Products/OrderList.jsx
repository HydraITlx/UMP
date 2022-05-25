import React from "react";
import { useEffect, useState } from "react";
import MaterialTable, { MTableToolbar } from "@material-table/core";
import { Paper } from "@mui/material";
import {
  GetCreatedOrders,
  DeleteCreatedOrders,
} from "../../Requests/OrdersRequests";

import { PostOrders, SendEmail } from "../../Requests/Post_OrdersRequest";
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
import DeleteIcon from "@mui/icons-material/Delete";
import DeletePopUp from "../../Helpers/DeletePopUp";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
  const [recordForDelete, setRecordForDelete] = useState(null);
  const [open, setOpen] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [Alertopen, setAlertopen] = useState(false);
  const [AlertVariant, setAlertVariant] = useState("");
  const [AlertMessage, setAlertMessage] = useState("");

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
    const OrdersPromise = GetCreatedOrders(userName);
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
          setTimeout(() => {
            setData(response);
            setisLoading(false);
          }, 1000);
        }
      });
    }
  };

  function handleOrdersPost(HeaderData, RowData) {
    const OrdersPromise = PostOrders(HeaderData);
    handleOrdersPostPromise(
      OrdersPromise,
      HeaderData,
      RowData,
      HeaderData.sendEmail
    );
  }

  const handleOrdersPostPromise = (
    OrdersPromise,
    HeaderData,
    RowData,
    sendEmail
  ) => {
    {
      OrdersPromise.then((response) => {
        if (response !== undefined) {
          if (response[0].NewDocumentNo === "") {
            setAlertMessage(response[0].warningMessage);
            setAlertVariant(response[0].variant);
            setAlertopen(true);
          } else {
            setAlertMessage(response[0].warningMessage);
            setAlertVariant(response[0].variant);
            setAlertopen(true);
            if (sendEmail) {
              SendEmail(
                response[0].NewDocumentNo,
                HeaderData.Email,
                CreateOrderPDF(
                  HeaderData,
                  RowData,
                  response[0].NewDocumentNo,
                  sendEmail
                ),
                HeaderData
              );
            } else {
              CreateOrderPDF(
                HeaderData,
                RowData,
                response[0].NewDocumentNo,
                sendEmail
              );
            }
          }
        }
      });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertopen(false);
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
      render: (rowData) => {
        let rowStyle = { color: "black", fontWeight: "bold" };
        if (rowData.Total_Amount !== null) {
          if (isNum(rowData.Order_Minimum_Amount)) {
            //less than 50%
            const Percentage =
              (rowData.Total_Amount.replace(",", ".") /
                rowData.Order_Minimum_Amount) *
              100;

            if (Percentage > 100) {
              rowStyle = { color: "#00A20D", fontWeight: "bold" };
            }

            if (Percentage > 50 && Percentage < 100) {
              rowStyle = { color: "#FFC500", fontWeight: "bold" };
            }

            if (Percentage < 50) {
              rowStyle = { color: "#EF2F00", fontWeight: "bold" };
            }
          }
        }
        return <a style={rowStyle}>{rowData.Total_Amount}</a>;
      },
      align: "center",
    },
  ];

  //Auto Height
  const tableHeight =
    ((window.innerHeight - 64 - 64 - 52 - 1) / window.innerHeight) * 85;
  //Auto Height

  function isNum(val) {
    return !isNaN(val);
  }

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

  const addOrEdit = (values, rowData) => {
    handleOrdersPost(values, rowData);
    setOpenPopup(false);
    setUpdate(!update);
    setTimeout(() => {}, 500);
  };

  const openInPopup = (rowData) => {
    setRecordForEdit(rowData);
    setOpenPopup(true);
  };

  const handleDeleteOnClick = (rowData) => {
    setRecordForDelete(rowData.data);
    setOpen(true);
  };

  const handleDeleteCancel = () => {
    setOpen(false);
  };

  const handleDeleteConfirm = (rowData) => {
    setOpen(false);
    DeleteCreatedOrders(rowData.Order_ID);
    setTimeout(() => {
      let userID = sessionStorage.getItem("userID");
      userID = JSON.parse(userID);

      if (userID === null) {
        userID = localStorage.getItem("userID");
        userID = JSON.parse(userID);
      }
      handleOrdersRequests(userID);
    }, 1000);
  };

  const HandlePrintDocument = (headerData, rowData) => {};

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

                    <IconButton
                      disabled={!AllowDelete && !IsAdmin}
                      onClick={() => {
                        handleDeleteOnClick(props);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
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
          <Snackbar
            open={Alertopen}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity={AlertVariant}
              sx={{ width: "100%" }}
            >
              {AlertMessage}
            </Alert>
          </Snackbar>
          <DeletePopUp
            open={open}
            recordForDelete={recordForDelete}
            handleCancel={handleDeleteCancel}
            handleConfirm={handleDeleteConfirm}
          ></DeletePopUp>
          <Popup
            title="Nota de Encomenda"
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
