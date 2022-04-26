import { useEffect, useState } from "react";
import MaterialTable, { MTableToolbar } from "@material-table/core";
import { Paper } from "@mui/material";
import { format } from "date-fns";

import {
  getNumbering,
  InsertNumbering,
  UpdateNumbering,
  DeleteNumbering,
  getUCCOptions,
} from "../../Requests/NumberingRequest";

import Popup from "../../Helpers/PopupCustom";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import NumeringForm from "./Form/NumeringForm";
import EditIcon from "@mui/icons-material/Edit";
import TableTitle from "../../Helpers/TableTitle";
import Controls from "../../Helpers/Controls";
import DeletePopUp from "../../Helpers/DeletePopUp";
import DeleteIcon from "@mui/icons-material/Delete";

export default function GruopTable() {
  const [data, setData] = useState([]);
  const [UCCOptions, SetUCCOptions] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [isInsert, setisInsert] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [recordForDelete, setRecordForDelete] = useState(null);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) MakeRequests();

    return () => {
      isMounted = false;
    };
  }, []);

  function MakeRequests() {
    const UCCOptionsPromise = getUCCOptions();
    handleUCCOptionsPromise(UCCOptionsPromise);

    const RequestPromise = getNumbering();
    handleRequestPromise(RequestPromise);
  }

  const handleRequestPromise = (RequestPromise) => {
    {
      if (RequestPromise === undefined) {
        return;
      }

      RequestPromise.then((response) => {
        if (response !== undefined) {
          console.log(response);
          setData(response);
        }
      });
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

  const columns = [
    {
      title: "Nome",
      field: "Name",
      width: "30%",
    },

    {
      title: "Data Inicio",
      field: "Starting_Date",
      width: "auto",
      render: (rowData) => (
        <Controls.DatePicker
          name="Starting_Date"
          disabled={true}
          label=""
          value={rowData.Starting_Date}
        />
      ),
    },

    {
      title: "Data Fim",
      field: "End_Date",
      width: "auto",
      render: (rowData) => (
        <Controls.DatePicker
          name="Starting_Date"
          disabled={true}
          label=""
          value={rowData.End_Date}
        />
      ),
    },
    {
      title: "Prefixo",
      field: "Prefix",
      width: "auto",
    },
    {
      title: "Numeração",
      field: "Number",
      width: "auto",
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
      fontSize: 12,
    },
    rowStyle: { fontSize: 14 },
    filtering: false,
    actionsColumnIndex: -1,
    padding: "dense",
  };

  const addOrEdit = (values, oldValues, resetForm) => {
    if (isInsert) {
      InsertNumbering(values);
    }
    if (isEdit) {
      UpdateNumbering(values, oldValues);
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
    setTimeout(() => {
      const dataDelete = [...data];
      const index = rowData.id;
      dataDelete.splice(index, 1);
      setData([...dataDelete]);
      DeleteNumbering(rowData);
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
          title={<TableTitle text="Numeração" />}
          editable={{
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                DeleteNumbering(oldData);
                setTimeout(() => {
                  MakeRequests();
                  resolve();
                }, 1500);
              }),
          }}
          components={{
            Action: (props) => (
              <div style={{ display: "flex" }}>
                {" "}
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
        title="Ficha de Numeração"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <NumeringForm
          data={data}
          recordForEdit={recordForEdit}
          addOrEdit={addOrEdit}
          addonConfirm={addonConfirm}
          isEdit={isEdit}
          UCCOptions={UCCOptions}
        ></NumeringForm>
      </Popup>
    </>
  );
}
