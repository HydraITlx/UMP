import { useEffect, useState } from "react";
import MaterialTable, { MTableToolbar } from "@material-table/core";
import { Paper } from "@mui/material";
import {
  getUCCs,
  onHandlePharmacistOptions,
  onHandleUCCUpdate,
  onHandleUCCInsert,
  DeleteUCC,
} from "../../Requests/UCCRequests";

import {
  getPermissions,
  checkIfAdminPermissions,
} from "../../Requests/PermissionRequests";
import Popup from "../../Helpers/Popup";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import UCCForm from "./Form/UCCForm";
import EditIcon from "@mui/icons-material/Edit";
import Controls from "../../Helpers/Controls";
import TableTitle from "../../Helpers/TableTitle";
import Spinner from "../../Spinner/Spinner";
import NoAccess from "../../Helpers/NoAccess";
import ImportApi from "./ImportApi";

import PreviewIcon from "@mui/icons-material/RemoveRedEye";
import DeletePopUp from "../../Helpers/DeletePopUp";
import DeleteIcon from "@mui/icons-material/Delete";

const EntityTypeOption = [
  { value: 0, label: " " },
  { value: 1, label: "IPSS" },
  { value: 2, label: "Misericórdia" },
];

export default function GruopTable() {
  const [isLoading, setisLoading] = useState(true);
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [isInsert, setisInsert] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const [pharmacistOptions, SetpharmacistOptions] = useState([]);

  const [AllowRead, setAllowRead] = useState(false);
  const [AllowModify, setAllowModify] = useState(false);
  const [AllowInsert, setAllowInsert] = useState(false);
  const [AllowDelete, setAllowDelete] = useState(false);
  const [IsAdmin, setIsAdmin] = useState(false);

  const [OnlyPreview, setOnlyPreview] = useState(false);
  const [open, setOpen] = useState(false);
  const [recordForDelete, setRecordForDelete] = useState(null);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      handlePermissionRequests();
      handlePromisses();
    }

    return () => {
      isMounted = false;
    };
  }, [update]);

  function handlePermissionRequests() {
    const AdminPromise = checkIfAdminPermissions();
    handleAdminPromise(AdminPromise);

    const RequestPromise = getPermissions(20);
    handlePermissionPromise(RequestPromise);
  }

  const handlePermissionPromise = (AuthPromise) => {
    {
      if (AuthPromise === undefined) {
        return;
      }

      AuthPromise.then((response) => {
        if (response[0] !== undefined) {
          console.log(response[0]);
          setAllowRead(response[0].r);
          setAllowModify(response[0].m);
          setAllowInsert(response[0].i);
          setAllowDelete(response[0].d);
        }
      });
    }
  };

  const handleAdminPromise = (AuthPromise) => {
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

  function handlePromisses() {
    const OptionsPromise = onHandlePharmacistOptions();
    handleOptionsPromise(OptionsPromise);
    const UCCPromise = getUCCs();
    handleUCCPromise(UCCPromise);
  }

  const handleUCCPromise = (AuthPromise) => {
    {
      if (AuthPromise === undefined) {
        setisLoading(false);
        return;
      }

      AuthPromise.then((response) => {
        if (response !== undefined) {
          setisLoading(false);
          console.log(response);
          setData(response);
        }
      });
    }
  };

  const columns = [
    {
      title: "Nome",
      field: "Name",
      width: "auto",
    },

    {
      title: "Tipo de Entidade",
      field: "UCC_Type",
      width: "auto",
      render: (rowData) => {
        if (rowData.Entity_Type === 1) {
          rowData.UCC_Type = "IPSS";
        }

        if (rowData.Entity_Type === 2) {
          rowData.UCC_Type = "Misericórdia";
        }

        return rowData.UCC_Type;
      },
    },
    { title: "NIPC", field: "NIPC", width: "auto" },
    { title: "Morada", field: "Address", width: "auto" },
    { title: "Código Postal", field: "Post_Code", width: "auto" },
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

  const addOrEdit = (values, resetForm) => {
    if (isEdit) {
      onHandleUCCUpdate(values);
    }

    if (isInsert) {
      onHandleUCCInsert(values);
    }
    resetForm();
    setisLoading(true);
    setRecordForEdit(null);
    SetpharmacistOptions([]);
    setOpenPopup(false);
    setTimeout(() => {
      setUpdate(!update);
      setisEdit(false);
      setisInsert(false);
      setOnlyPreview(false);
    }, 4000);
  };

  const openInPopup = (rowData) => {
    console.log("rowData");
    console.log(rowData);
    setRecordForEdit(rowData);
    setOpenPopup(true);
  };

  const handleOptionsPromise = (AuthPromise) => {
    {
      if (AuthPromise === undefined) {
        return;
      }

      AuthPromise.then((response) => {
        if (response !== undefined) {
          SetpharmacistOptions(response);
        }
      });
      return;
    }
  };

  const handleDeleteOnClick = (rowData) => {
    console.log(rowData);
    setRecordForDelete(rowData.data);
    setOpen(true);
  };

  const handleDeleteCancel = () => {
    setOpen(false);
  };

  const handleDeleteConfirm = (rowData) => {
    setOpen(false);
    setTimeout(() => {
      const dataDelete = [...data];
      const index = rowData.id;
      dataDelete.splice(index, 1);
      setData([...dataDelete]);
      DeleteUCC(rowData);
    }, 1000);
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
              title={<TableTitle text="Unidades de Cuidados Continuados" />}
              editable={{
                isDeletable: (rowData) => AllowDelete === 1 || IsAdmin === true,
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
                          setisInsert(false);
                          setOnlyPreview(false);
                          openInPopup(props.data);
                        }}
                      >
                        <EditIcon fontSize="small" />
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
                        <PreviewIcon fontSize="small" />
                      </IconButton>
                    )}

                    <IconButton
                      disabled={!AllowDelete && !IsAdmin}
                      onClick={() => {
                        handleDeleteOnClick(props);
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </div>
                ),

                Toolbar: (props) => (
                  <div>
                    <MTableToolbar {...props} />

                    <div style={{ display: "flex" }}>
                      {IsAdmin && <ImportApi />}

                      <div
                        style={{
                          padding: "5px 10px",
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
                            setOnlyPreview(false);
                          }}
                        >
                          <AddIcon fontSize="small" />
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
          <DeletePopUp
            open={open}
            recordForDelete={recordForDelete}
            handleCancel={handleDeleteCancel}
            handleConfirm={handleDeleteConfirm}
          ></DeletePopUp>

          <Popup
            title="Ficha Unidade de Cuidadados Continuados"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <UCCForm
              recordForEdit={recordForEdit}
              pharmacistOptions={pharmacistOptions}
              addOrEdit={addOrEdit}
              isEdit={isEdit}
              OnlyPreview={OnlyPreview}
              isInsert={isInsert}
              data={data}
            ></UCCForm>
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
