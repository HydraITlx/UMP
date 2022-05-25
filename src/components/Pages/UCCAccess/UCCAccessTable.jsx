import React, { useEffect, useState } from "react";
import MaterialTable, {
  MTableToolbar,
  MTableAction,
} from "@material-table/core";
import { Paper } from "@mui/material";
import {
  getUCCAccess,
  getLabOptions,
  getUCCOptions,
  updateUCCOptions,
  InsertUCCOptions,
  DeleteUCCOptions,
} from "../../Requests/UCCAccessRequest";

import Popup from "../../Helpers/PopupCustom";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import TableTitle from "../../Helpers/TableTitle";
import OrderAccessForm from "./Form/UCCAccessForm";
import EditIcon from "@mui/icons-material/Edit";
import DeletePopUp from "../../Helpers/DeletePopUp";
import DeleteIcon from "@mui/icons-material/Delete";

export default function GruopTable() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(true);
  const addActionRef = React.useRef();
  const [labOptions, SetlabOptions] = useState([]);
  const [UCCOptions, SetUCCOptions] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [isInsert, setisInsert] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [open, setOpen] = useState(false);
  const [recordForDelete, setRecordForDelete] = useState(null);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) MakeRequests();

    return () => {
      isMounted = false;
    };
  }, [update]);

  function MakeRequests() {
    const OptionsPromise = getLabOptions();
    handleOptionsPromise(OptionsPromise);

    const UCCOptionsPromise = getUCCOptions();
    handleUCCOptionsPromise(UCCOptionsPromise);

    const RequestPromise = getUCCAccess();
    handleRequestPromise(RequestPromise);
  }

  const handleOptionsPromise = (AuthPromise) => {
    {
      if (AuthPromise === undefined) {
        return;
      }

      AuthPromise.then((response) => {
        if (response !== undefined) {
          SetlabOptions(response);
        }
      });
      return;
    }
  };

  const handleUCCOptionsPromise = (AuthPromise) => {
    {
      if (AuthPromise === undefined) {
        return;
      }

      AuthPromise.then((response) => {
        if (response !== undefined) {
          SetUCCOptions(response);
        }
      });
      return;
    }
  };

  const handleRequestPromise = (RequestPromise) => {
    {
      if (RequestPromise === undefined) {
        return;
      }

      RequestPromise.then((response) => {
        if (response !== undefined) {
          setData(response);
        }
      });
    }
  };

  const addOrEdit = (values, resetForm) => {
    if (isInsert) {
      InsertUCCOptions(values);
    }
    if (isEdit) {
      updateUCCOptions(values);
    }
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);

    setTimeout(() => {
      MakeRequests();
      setisEdit(false);
      setisInsert(false);
    }, 500);
  };

  const openInPopup = (rowData) => {
    setRecordForEdit(rowData);
    setOpenPopup(true);
  };

  const columns = [
    {
      title: "Nome UCC",
      field: "UCC_Name",
      width: "50%",
    },

    {
      title: "Nome Laboratório",
      field: "Laboratory_Name",
      width: "50%",
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

  const handleDeleteOnClick = (rowData) => {
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
      const index = rowData.ID;
      dataDelete.splice(index, 1);
      setData([...dataDelete]);
      DeleteUCCOptions(rowData);
      MakeRequests();
    }, 1000);
  };

  return (
    <>
      <Paper>
        <MaterialTable
          options={options}
          columns={columns}
          data={data}
          title={<TableTitle text="Permissões UCC/Laboratório" />}
          editable={{
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                DeleteUCCOptions(oldData);
                setTimeout(() => {
                  MakeRequests();
                  resolve();
                }, 1500);
              }),
          }}
          components={{
            Action: (props) => (
              <div style={{ display: "flex" }}>
                <IconButton
                  onClick={() => {
                    setisEdit(true);
                    setisInsert(false);
                    openInPopup(props.data);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
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
      <DeletePopUp
        open={open}
        recordForDelete={recordForDelete}
        handleCancel={handleDeleteCancel}
        handleConfirm={handleDeleteConfirm}
      ></DeletePopUp>
      <Popup
        title="Ficha de Permissões"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <OrderAccessForm
          data={data}
          recordForEdit={recordForEdit}
          addOrEdit={addOrEdit}
          isEdit={isEdit}
          labOptions={labOptions}
          UCCOptions={UCCOptions}
        ></OrderAccessForm>
      </Popup>
    </>
  );
}
