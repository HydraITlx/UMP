import { useEffect, useState } from "react";
import MaterialTable, { MTableToolbar } from "@material-table/core";
import { Paper } from "@mui/material";
import { getUCCs, getProducts } from "../../Requests/OrdersRequests";

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
import SelectMui from "../../Helpers/SelectMui";

import ShoppingCart from "./ShoppingCart";

export default function GruopTable() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(true);
  const [uccOptions, SetUccOptions] = useState([]);
  const [selectedUCC, SetSelectedUCC] = useState(" ");

  const [AllowRead, setAllowRead] = useState(false);
  const [AllowModify, setAllowModify] = useState(false);
  const [AllowInsert, setAllowInsert] = useState(false);
  const [AllowDelete, setAllowDelete] = useState(false);
  const [IsAdmin, setIsAdmin] = useState(false);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      let userID = sessionStorage.getItem("userID");
      userID = JSON.parse(userID);

      if (userID === null) {
        userID = localStorage.getItem("userID");
        userID = JSON.parse(userID);
      }

      handleUCCOptionsRequests(userID);
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

  function handleProductsRequests(userName, UCC_ID) {
    const ProductsPromise = getProducts(userName, UCC_ID);
    handleProductsPromise(ProductsPromise);
  }

  const handleProductsPromise = (AuthPromise) => {
    {
      if (AuthPromise === undefined) {
        return;
      }

      AuthPromise.then((response) => {
        if (response !== undefined) {
          setData(response);
          setTimeout(() => {
            setisLoading(false);
          }, 1000);
        }
      });
    }
  };

  function handleUCCOptionsRequests(userID) {
    const UCCPromise = getUCCs(userID);
    handleUCCOptionsPromise(UCCPromise);
  }

  const handleUCCOptionsPromise = (AuthPromise) => {
    {
      if (AuthPromise === undefined) {
        return;
      }

      AuthPromise.then((response) => {
        if (response !== undefined) {
          SetUccOptions(response);
          setTimeout(() => {
            setisLoading(false);
          }, 1000);
        }
      });
    }
  };

  function onOptionsChange(e) {
    SetSelectedUCC(e.target.value);
    if (e.target.value === " ") {
      setData([]);
      return;
    }

    let userID = sessionStorage.getItem("userID");
    userID = JSON.parse(userID);

    if (userID === null) {
      userID = localStorage.getItem("userID");
      userID = JSON.parse(userID);
    }
    handleProductsRequests(userID, e.target.value);
  }

  const columns = [
    {
      title: "Tipo",
      field: "Type",
      width: "15rem",
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
    },

    {
      title: "Descrição",
      field: "Description",
      width: "19rem",
      render: (rowdata) => (
        <a style={{ whiteSpace: "nowrap" }}>{rowdata.Description}</a>
      ),
    },

    {
      title: "Nome Lab.",
      field: "Laboratory_Name",

      width: "12rem",
    },
    {
      title: "DUP",
      field: "DUP",
      width: "auto",
    },

    {
      title: "Preço Caixa",
      field: "Unit_Price_Box",
      width: "8rem",
      render: (rowData) => rowData.Unit_Price_Box,
    },
    {
      title: "Qtd. Caixa",
      field: "Total_Quantity",
      width: "7.6rem",
    },
    {
      title: "Preço Un.",
      field: "Unit_Price_UN",
      width: "7rem",
      render: (rowData) => rowData.Unit_Price_UN,
    },

    {
      title: "Quantidade",
      width: "auto",
      align: "center",
      cellStyle: {
        textAlign: "right",
      },
      render: (rowData) => <ShoppingCart data={rowData} UCCID={selectedUCC} />,
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
      height: 10,
      fontSize: 10,
      height: 40,
      fontSize: 11,
    },
    rowStyle: { fontSize: 11 },
    filtering: false,
    actionsColumnIndex: -1,
    padding: "dense",
  };

  const openInPopup = (rowData) => {
    setRecordForEdit(rowData);
    setOpenPopup(true);
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
              title={<TableTitle text="Adicionar Produtos a Encomenda" />}
              components={{
                Action: (props) => (
                  <div>
                    {(AllowModify === 1 || IsAdmin === true) && (
                      <IconButton
                        disabled={!AllowModify && !IsAdmin}
                        onClick={() => {
                          setisEdit(true);
                          setisInsert(false);
                          SetOnlyPreview(false);
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
                          SetOnlyPreview(true);
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
                    <div style={{ display: "flex" }}>
                      <SelectMui
                        style={{ minWidth: 120 }}
                        variant="filled"
                        name="UCC"
                        label="UCC"
                        value={selectedUCC}
                        onChange={onOptionsChange}
                        options={uccOptions}
                      />
                    </div>
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
                        top: 0,
                      }}
                    >
                      Escolha uma UCC para começar
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
