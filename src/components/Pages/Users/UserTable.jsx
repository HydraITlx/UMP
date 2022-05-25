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
  const [SendEmail, setSendEmail] = useState(true);

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
      height: 40,
      fontSize: 12,
    },
    rowStyle: { fontSize: 14 },
    filtering: false,
    actionsColumnIndex: -1,
    padding: "dense",
  };

  const addOrEdit = (values, resetForm) => {
    onHandleInsertModify(values, SendEmail);

    resetForm();
    setRecordForEdit(null);
    setSendEmail(true);
    setOpenPopup(false);
    setUpdate(!update);

    setTimeout(() => {
      setisEdit(false);
      setisInsert(false);
    }, 500);
  };

  const addonConfirm = (values) => {
    if (isInsert) {
      onHandleInsertModify(values, SendEmail);
    }
    setUpdate(!update);
    setTimeout(() => {
      setisEdit(false);
      setisInsert(true);
      setSendEmail(false);
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
