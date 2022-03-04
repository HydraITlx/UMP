import { useEffect, useState } from "react";
import MaterialTable, { MTableToolbar } from "@material-table/core";
import { Paper } from "@mui/material";
import {
  getLaboratories,
  updateLaboratories,
  InsertLaboratories,
  DeleteLaboratory,
} from "../../Requests/LaboratoryRequests";
import Popup from "../../Helpers/Popup";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import ProductForm from "./Form/LaboratoryForm";
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

import DeletePopUp from "../../Helpers/DeletePopUp";
import DeleteIcon from "@mui/icons-material/Delete";

export default function GruopTable() {
  const [data, setData] = useState([]);
  const [LabOptions, setLabOptions] = useState([]);
  const [update, setUpdate] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [isInsert, setisInsert] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const [OnlyPreview, setOnlyPreview] = useState(false);
  const [open, setOpen] = useState(false);

  const [AllowRead, setAllowRead] = useState(false);
  const [AllowModify, setAllowModify] = useState(false);
  const [AllowInsert, setAllowInsert] = useState(false);
  const [AllowDelete, setAllowDelete] = useState(false);
  const [IsAdmin, setIsAdmin] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [recordForDelete, setRecordForDelete] = useState(null);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      handlePermissionRequests();
      handleLabRequests();
    }
    return () => {
      isMounted = false;
    };
  }, [update]);

  function handlePermissionRequests() {
    const AdminPromise = checkIfAdminPermissions();
    handleAdminPromise(AdminPromise);

    const RequestPromise = getPermissions(10);
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

  function handleLabRequests() {
    const RequestPromise = getLaboratories();
    handleProductsPromise(RequestPromise);
  }

  const handleProductsPromise = (AuthPromise) => {
    {
      if (AuthPromise === undefined) {
        return;
      }

      AuthPromise.then((response) => {
        if (response !== undefined) {
          console.log("response");
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
      title: "Nome",
      field: "Name",
      width: "auto",
    },

    {
      title: "Tipo",
      field: "Type",
      width: "auto",
      render: (rowData) => {
        let rowType = " ";
        if (rowData.Type === 1) {
          rowType = "Laboratório";
        }

        if (rowData.Type === 2) {
          rowType = "Dispositivos Médicos";
        }

        if (rowData.Type === 3) {
          rowType = "Nutrição Especial";
        }
        return <p style={{ marginTop: "10px" }}>{rowType}</p>;
      },
    },

    {
      title: "Morada",
      field: "Address",
      width: "auto",
    },

    {
      title: "Telefone",
      field: "Phone",
      width: "auto",
    },

    {
      title: "Num. Contacto",
      field: "Contact_Phone",
      width: "auto",
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
    ((window.innerHeight - 64 - 64 - 52 - 1) / window.innerHeight) * 70;
  //Auto Height

  const options = {
    maxBodyHeight: `${tableHeight}vh`,
    minBodyHeight: `${tableHeight}vh`,
    pageSize: 10,
    paging: true,
    headerStyle: {
      position: "sticky",
      top: 0,
      backgroundColor: "#ad0b90",
      color: "#FFFFFF",
      fontWeight: "bold",
      height: 10,
    },
    filtering: false,
    actionsColumnIndex: -1,
    padding: "dense",
  };

  const addOrEdit = (values, resetForm) => {
    if (isInsert) {
      InsertLaboratories(values);
    }

    if (isEdit) {
      updateLaboratories(values);
    }
    resetForm();
    setisLoading(true);
    setRecordForEdit(null);
    setOpenPopup(false);

    setTimeout(() => {
      handleLabRequests();
      setisEdit(false);
      setisInsert(false);
      setOnlyPreview(false);
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
    DeleteLaboratory(rowData.ID);
    setTimeout(() => {
      handleLabRequests();
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
              title={<TableTitle text="Laboratórios" />}
              editable={{
                onRowDelete: (oldData) => new Promise((resolve, reject) => {}),
              }}
              //aqui new
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
                    <div style={{ padding: "0px 10px", textAlign: "right" }}>
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
                        <AddIcon />
                      </IconButton>
                    </div>
                  </div>
                ),
              }}
              localization={{
                header: { actions: "Ações" },
                body: { editRow: { deleteText: "Deseja apagar esta linha?" } },
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
            title="Ficha de Laboratório"
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
