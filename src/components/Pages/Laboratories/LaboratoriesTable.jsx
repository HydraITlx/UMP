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
import TableTitle from "../../Helpers/TableTitle";
import Switch from "../../Helpers/Switch";
import NoAccess from "../../Helpers/NoAccess";
import Spinner from "../../Spinner/Spinner";
import {
  getPermissions,
  checkIfAdminPermissions,
} from "../../Requests/PermissionRequests";

export default function GruopTable() {
  const [data, setData] = useState([]);
  const [LabOptions, setLabOptions] = useState([]);
  const [update, setUpdate] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [isInsert, setisInsert] = useState(false);
  const [isEdit, setisEdit] = useState(false);

  const [AllowRead, setAllowRead] = useState(false);
  const [AllowModify, setAllowModify] = useState(false);
  const [AllowInsert, setAllowInsert] = useState(false);
  const [AllowDelete, setAllowDelete] = useState(false);
  const [IsAdmin, setIsAdmin] = useState(false);
  const [isLoading, setisLoading] = useState(true);

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

    {
      title: "Editar ",
      field: "",
      render: (rowData) => (
        <IconButton
          disabled={!AllowModify && !IsAdmin}
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
                isDeletable: (rowData) => AllowDelete === 1 || IsAdmin === true,
                onRowDelete: (oldData) =>
                  new Promise((resolve, reject) => {
                    DeleteLaboratory(oldData.ID);
                    setTimeout(() => {
                      handleLabRequests();
                      resolve();
                    }, 1000);
                  }),
              }}
              components={{
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
