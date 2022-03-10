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
} from "../../Requests/UCCAccessRequest";

import Popup from "../../Helpers/PopupCustom";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import TableTitle from "../../Helpers/TableTitle";
import OrderAccessForm from "./Form/UCCAccessForm";
import EditIcon from "@mui/icons-material/Edit";

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
        console.log(response);
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
        console.log(response);
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
        console.log(response);
        console.log("RESPOSTA AQUI");
        if (response !== undefined) {
          setData(response);
        }
      });
    }
  };

  const addOrEdit = (values, resetForm) => {
    if (isInsert) {
      InsertOrderAccess(values);
    }
    if (isEdit) {
      console.log("entou no edit");
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

  return (
    <>
      <Paper>
        <MaterialTable
          options={options}
          columns={columns}
          data={data}
          title={<TableTitle text="Permissões de UCC" />}
          editable={{
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                DeleteOrderAccess(oldData);
                setTimeout(() => {
                  MakeRequests();
                  resolve();
                }, 1500);
              }),
          }}
          components={{
            Action: (props) => {
              if (
                typeof props.action === typeof Function ||
                props.action.tooltip !== "Add"
              ) {
                return <MTableAction {...props} />;
              } else {
                return (
                  <div ref={addActionRef} onClick={props.action.onClick} />
                );
              }
            },

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
