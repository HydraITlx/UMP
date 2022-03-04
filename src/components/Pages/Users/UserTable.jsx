import { useEffect, useState } from "react";
import MaterialTable, { MTableToolbar } from "@material-table/core";
import { Paper } from "@mui/material";
import { getUsers, onHandleInsertModify } from "../../Requests/UserRequests";
import Switch from "../../Helpers/Switch";
import Popup from "../../Helpers/Popup";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import UserForm from "./Form/UserForm";
import EditIcon from "@mui/icons-material/Edit";
import TableTitle from "../../Helpers/TableTitle";

export default function GruopTable() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [isInsert, setisInsert] = useState(false);
  const [isEdit, setisEdit] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const UserPromise = getUsers();
    if (isMounted) handleUserPromise(UserPromise, isMounted);

    return () => {
      isMounted = false;
    };
  }, [update]);

  const handleUserPromise = (AuthPromise, isMounted) => {
    {
      if (AuthPromise === undefined) {
        return;
      }

      AuthPromise.then((response) => {
        if (response !== undefined) {
          setData(response);
        }
      });
    }
  };

  const columns = [
    {
      title: "Utilizador",
      field: "username",
      width: "auto",
    },

    { title: "Nome Completo", field: "full_name", width: "auto" },
    { title: "Email", field: "email", width: "auto" },
    {
      title: "Tent. Autenticação",
      field: "attempts",
      width: "auto",
      align: "center",
    },

    {
      title: "Administrador",
      field: "is_admin",
      width: "auto",
      render: (rowData) => (
        <Switch
          value={rowData.is_admin}
          disabled={true}
          id={"isadmin"}
          defaultChecked={rowData.is_admin}
          label={""}
        ></Switch>
      ),
    },

    {
      title: "Ativo",
      field: "active",
      width: "auto",
      render: (rowData) => (
        <Switch
          value={rowData.active}
          disabled={true}
          id={"active"}
          defaultChecked={rowData.active}
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
    onHandleInsertModify(values, isInsert);

    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    setUpdate(!update);

    setTimeout(() => {
      setisEdit(false);
      setisInsert(false);
    }, 500);
  };

  const addonConfirm = (values) => {
    if (isInsert) {
      onHandleInsertModify(values, isInsert);
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
          title={<TableTitle text="Utilizadores" />}
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
            header: { actions: "Ações" },
            body: { editRow: { deleteText: "Deseja apagar esta linha?" } },
          }}
        />
      </Paper>
      <Popup
        title="Ficha de Utilizador"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <UserForm
          data={data}
          recordForEdit={recordForEdit}
          addOrEdit={addOrEdit}
          addonConfirm={addonConfirm}
          isEdit={isEdit}
        ></UserForm>
      </Popup>
    </>
  );
}
