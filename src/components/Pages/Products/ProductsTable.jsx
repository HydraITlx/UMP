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
import PreviewIcon from "@mui/icons-material/RemoveRedEye";
import TableTitle from "../../Helpers/TableTitle";
import Switch from "../../Helpers/Switch";
import NoAccess from "../../Helpers/NoAccess";
import Spinner from "../../Spinner/Spinner";
import {
  getPermissions,
  checkIfAdminPermissions,
} from "../../Requests/PermissionRequests";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function GruopTable() {
  const [data, setData] = useState([]);
  const [filerData, setfilterData] = useState([]);
  const [LabOptions, setLabOptions] = useState([]);
  const [update, setUpdate] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [isInsert, setisInsert] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const [OnlyPreview, SetOnlyPreview] = useState(false);

  const [AllowRead, setAllowRead] = useState(false);
  const [AllowModify, setAllowModify] = useState(false);
  const [AllowInsert, setAllowInsert] = useState(false);
  const [AllowDelete, setAllowDelete] = useState(false);
  const [IsAdmin, setIsAdmin] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [YearFilter, setYearFilter] = useState(new Date());

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      handlePermissionRequests();
      const LabOptionsPromise = getLabsOptions();
      handleLabOptionsPromise(LabOptionsPromise);

      handleProductsRequests();
    }
    return () => {
      isMounted = false;
    };
  }, [update]);

  function handlePermissionRequests() {
    const AdminPromise = checkIfAdminPermissions();
    handleAdminPromise(AdminPromise);

    const RequestPromise = getPermissions(50);
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
          setData(response);
          setfilterData(
            response.filter((data) =>
              JSON.stringify(data).includes(
                `"Year":${new Date().getFullYear()}`
              )
            )
          );
          setTimeout(() => {
            setisLoading(false);
          }, 1000);
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
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Tipo",
      field: "Type",
      width: "auto",
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

        return rowType;
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
      width: "35%",
      render: (rowdata) => rowdata.Description.slice(0, 55),
    },

    {
      title: "Nome Lab.",
      field: "Laboratory_Name",

      width: "10%",
    },

    {
      title: "Preço Caixa",
      field: "Unit_Price_Box",
      width: "9%",
    },

    {
      title: "Qtd. Caixa",
      field: "Total_Quantity",
      width: "9%",
    },

    {
      title: "Preço Un.",
      field: "Unit_Price_UN",
      width: "9%",
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
      title: "Ativo",
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
  ];

  //Auto Height
  const tableHeight =
    ((window.innerHeight - 64 - 64 - 52 - 1) / window.innerHeight) * 80;
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
    rowStyle: { fontSize: 12 },
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
    setisLoading(true);
    setRecordForEdit(null);
    setOpenPopup(false);

    setTimeout(() => {
      handleProductsRequests();
      setisEdit(false);
      setisInsert(true);
      SetOnlyPreview(false);
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

  const handleFilterChange = (newValue) => {
    setYearFilter(JSON.stringify(newValue).slice(1, 5));
    setfilterData(
      data.filter((data) =>
        JSON.stringify(data).includes(
          `"Year":${JSON.stringify(newValue).slice(1, 5)}`
        )
      )
    );
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
              data={filerData}
              title={<TableTitle text="Produtos" />}
              editable={{
                isDeletable: () => AllowDelete === 1 || IsAdmin === true,
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
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          readonly="readonly"
                          views={["year"]}
                          label="Filtro Ano"
                          minDate={new Date("2021-01-01")}
                          maxDate={new Date()}
                          value={YearFilter}
                          onChange={(newValue) => {
                            handleFilterChange(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} helperText={null} />
                          )}
                        />
                      </LocalizationProvider>
                      <div
                        style={{
                          padding: "0px 10px",
                          textAlign: "right",
                          flex: 1,
                        }}
                      >
                        <IconButton
                          disabled={!AllowInsert && !IsAdmin}
                          onClick={() => {
                            setisEdit(false);
                            setisInsert(true);
                            setOpenPopup(true);
                            setRecordForEdit(null);
                            SetOnlyPreview(false);
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                ),
              }}
              localization={{
                header: { actions: "Ações" },
                body: {
                  editRow: { deleteText: "Deseja apagar esta linha?" },
                  emptyDataSourceMessage: "Nenhum registro para exibir",
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
              OnlyPreview={OnlyPreview}
            ></ProductForm>
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
