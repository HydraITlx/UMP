import React, { useEffect, useState } from "react";
import MaterialTable, {
  MTableToolbar,
  MTableAction,
} from "@material-table/core";
import { Paper } from "@mui/material";
import {
  getPharmacists,
  DeletePharmacists,
  InsertPharmacists,
  getUserOptions,
  UpdatePharmacists,
} from "../../Requests/PharmacistRequest";

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import TableTitle from "../../Helpers/TableTitle";
import Select from "../../Helpers/SelectRender";
import Switch from "../../Helpers/Switch";
import NoAccess from "../../Helpers/NoAccess";
import Spinner from "../../Spinner/Spinner";
import {
  getPermissions,
  checkIfAdminPermissions,
} from "../../Requests/PermissionRequests";

export default function GruopTable() {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState(true);
  const addActionRef = React.useRef();

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
      MakeRequests();
    }

    return () => {
      isMounted = false;
    };
  }, [update]);

  function handlePermissionRequests() {
    const AdminPromise = checkIfAdminPermissions();
    handleAdminPromise(AdminPromise);

    const RequestPromise = getPermissions(40);
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

  function MakeRequests() {
    const userRequest = getUserOptions();
    handleUsersPromise(userRequest);
    const RequestPromise = getPharmacists();
    handleRequestPromise(RequestPromise);
  }

  const handleRequestPromise = (RequestPromise) => {
    {
      if (RequestPromise === undefined) {
        return;
      }

      RequestPromise.then((response) => {
        if (response !== undefined) {
          setData(response);
          setTimeout(() => {
            setisLoading(false);
          }, 1000);
        }
      });
    }
  };

  const handleUsersPromise = (RequestPromise) => {
    {
      if (RequestPromise === undefined) {
        return;
      }

      RequestPromise.then((response) => {
        if (response !== undefined) {
          setUsers(response);
        }
      });
    }
  };

  const editComponent = ({ onChange, value, ...rest }) => {
    let newRowValue = " ";
    if (value !== undefined) {
      newRowValue = value;
    }

    const [currentValue, setValue] = useState(newRowValue);
    const [error, setError] = useState(null);

    const change = (e) => {
      let newValue = " ";

      if (e.target !== undefined) {
        newValue = e.target.value;
      }

      setValue(newValue);
      onChange(newValue);
      setError(null);

      if (newValue === " ") {
        setError("Utilizador não pode estar vazio");
      } else {
        checkDuplicates(data, rest.rowData.ID, newValue, setError);
      }

      if (error !== null) {
        onChange(newValue);
      }
    };

    return (
      <Select
        {...rest}
        name="username"
        label=""
        error={error}
        value={currentValue}
        //     error={helperText}
        onChange={change}
        options={users}
      />
    );
  };

  function checkDuplicates(arr, index, new_id, setError) {
    return arr.map((options) => {
      if (options.ID !== index) {
        if (options.username === new_id) {
          setError("Utilizador já é atribuído a outro farmacêutico");
        }
      }
    });
  }

  const columns = [
    {
      title: "Nome",
      field: "Name",
      width: "auto",
    },

    { title: "Email", field: "Email", width: "auto" },

    { title: "Telefone", field: "Phone", width: "auto" },

    {
      title: "Utilizador",
      field: "username",
      width: "20%",
      render: (RowData) => RowData.full_name,
      editComponent,
    },

    {
      title: "Ativo",
      field: "Active",
      width: "auto",
      width: "10%",
      render: (RowData) => (
        <Switch
          value={RowData.Active}
          disabled={true}
          id={"Active"}
          defaultChecked={RowData.Active}
          label={""}
        ></Switch>
      ),
      editComponent: (RowData) => {
        return (
          <Switch
            value={RowData.value !== undefined ? RowData.value : false}
            onChange={(e) => RowData.onChange(e.target.checked)}
            disabled={false}
          ></Switch>
        );
      },
    },
  ];

  //Auto Height
  const tableHeight =
    ((window.innerHeight - 64 - 64 - 52 - 1) / window.innerHeight) * 85;
  //Auto Height

  const options = {
    exportButton: true,
    maxBodyHeight: `${tableHeight}vh`,
    minBodyHeight: `${tableHeight}vh`,
    pageSize: 20,
    emptyRowsWhenPaging: false, // To avoid of having empty rows
    pageSizeOptions: [20, 40, 60], // rows selection option
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
              title={<TableTitle text="Farmacêuticos" />}
              editable={{
                isDeletable: (rowData) => AllowDelete === 1 || IsAdmin === true,
                isEditable: (rowData) => AllowModify === 1 || IsAdmin === true,

                onRowAdd: (newData) =>
                  new Promise((resolve, reject) => {
                    let allow_Resolve = true;

                    data.map((options) => {
                      if (options.username === newData.username) {
                        allow_Resolve = false;
                      }
                    });

                    if (
                      newData.username === undefined ||
                      newData.username === " "
                    ) {
                      allow_Resolve = false;
                    }
                    if (allow_Resolve) {
                      InsertPharmacists(newData);
                    }

                    setTimeout(() => {
                      if (allow_Resolve) {
                        MakeRequests();
                        resolve();
                      } else {
                        reject();
                      }
                    }, 1000);
                  }),

                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    let allow_Resolve = true;

                    data.map((options) => {
                      if (options.ID !== oldData.ID) {
                        if (options.username === newData.username) {
                          allow_Resolve = false;
                        }
                      }
                    });

                    if (
                      newData.username === undefined ||
                      newData.username === " "
                    ) {
                      allow_Resolve = false;
                    }
                    if (allow_Resolve) {
                      UpdatePharmacists(newData);
                    }

                    setTimeout(() => {
                      if (allow_Resolve) {
                        MakeRequests();
                        resolve();
                      } else {
                        reject();
                      }
                    }, 1000);
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve, reject) => {
                    DeletePharmacists(oldData.ID);
                    setTimeout(() => {
                      setUpdate(!update);
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
                        disabled={!AllowInsert && !IsAdmin}
                        onClick={() => addActionRef.current.click()}
                      >
                        <AddIcon fontSize="small" />
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
