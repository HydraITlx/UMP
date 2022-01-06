import { useEffect, useState } from "react";
import MaterialTable, { MaterialTableProps } from "@material-table/core";
import { Paper } from "@mui/material";
import { getGroups, onHandleDelete } from "../Requests/GroupRequests";

export default function CustomizedTables() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const GroupPromise = getGroups(isMounted);
    if (isMounted) handleGroupPromise(GroupPromise, isMounted);

    return () => {
      isMounted = false;
    };
  }, []);

  const handleGroupPromise = (AuthPromise, isMounted) => {
    if (AuthPromise === undefined) {
      return;
    }
    console.log(isMounted);
    AuthPromise.then((response) => {
      console.log(response);
      if (response !== undefined) {
        setData(response);
      }
    });
  };

  //Auto Height
  const tableHeight =
    ((window.innerHeight - 64 - 64 - 52 - 1) / window.innerHeight) * 70;
  //Auto Height

  const columns = [
    {
      title: "ID Grupo",
      field: "value",
      width: "auto",
    },
    { title: "Descrição Grupo", field: "label", width: "auto" },

    {
      title: "Editar ",
      field: "",
      //  render: (rowData) => (
      //     <Container triggerText={"Utilizadores"} data={rowData} />
      //   ),
      width: "10%",
    },
  ];

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
  };

  return (
    <Paper>
      <MaterialTable
        options={options}
        columns={columns}
        data={data}
        title="Grupos de permissões"
        editable={{
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                console.log(oldData.value);
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                onHandleDelete(oldData.value);
                resolve();
              }, 1000);
            }),
        }}
        localization={{
          header: { actions: "Ações" },
          body: { editRow: { deleteText: "Deseja apagar esta linha?" } },
        }}
      />
    </Paper>
  );
}
