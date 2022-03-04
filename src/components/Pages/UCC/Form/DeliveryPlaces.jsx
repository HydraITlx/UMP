import { useState, useEffect } from "react";
import {
  getDeliveryPlaces,
  InsertDeliveryPlaces,
  DeleteDeliveryPlaces,
  UpdateDeliveryPlaces,
} from "../../../Requests/UCCRequests";
import { Paper } from "@mui/material";
import MaterialTable, { MTableToolbar } from "@material-table/core";

export default function PagePermissions(props) {
  const { recordForEdit, UCCID } = props;

  const [data, setData] = useState([]);

  useEffect(() => {
    if (recordForEdit !== null) {
      getPlacesPromise();
    }
  }, []);

  function getPlacesPromise() {
    const PlacesPromise = getDeliveryPlaces(UCCID);
    handlePagePromise(PlacesPromise);
  }

  const handlePagePromise = (PlacesPromise) => {
    {
      if (PlacesPromise === undefined) {
        return;
      }

      PlacesPromise.then((response) => {
        if (response !== undefined) {
          setData(response);
        }
      });
    }
  };

  //Auto Height
  const tableHeight =
    ((window.innerHeight - 64 - 64 - 52 - 1) / window.innerHeight) * 70;
  //Auto Height

  const options = {
    maxBodyHeight: `${tableHeight}vh`,
    minBodyHeight: `${tableHeight}vh`,

    //pageSize: 10,
    paging: false,
    headerStyle: {
      position: "sticky",
      top: 0,
      backgroundColor: "#ad0b90",
      color: "#FFFFFF",
      fontWeight: "bold",
      height: 10,
    },
    filtering: false,
    addRowPosition: "first",
    actionsColumnIndex: -1,
    search: false,
    showTitle: false,
    padding: "dense",
  };

  const columns = [
    {
      title: "Morada",
      field: "Address",
      width: "auto",
    },
    {
      title: "Nome Contacto",
      field: "Contact Name",
      width: "auto",
    },
    {
      title: "Telefone",
      field: "Contact Phone",
      width: "auto",
    },
  ];

  return (
    <>
      {recordForEdit !== null && (
        <Paper>
          <MaterialTable
            options={options}
            columns={columns}
            data={data}
            localization={{
              header: { actions: "Ações" },
              body: { editRow: { deleteText: "Deseja apagar esta linha?" } },
            }}
            editable={{
              onRowAdd: (newRow) =>
                new Promise((resolve, reject) => {
                  InsertDeliveryPlaces(newRow, UCCID);
                  setTimeout(() => {
                    getPlacesPromise();
                    resolve();
                  }, 1000);
                }),

              onRowUpdate: (newRow, oldRow) =>
                new Promise((resolve, reject) => {
                  UpdateDeliveryPlaces(newRow, UCCID);
                  setTimeout(() => {
                    getPlacesPromise();
                    resolve();
                  }, 1000);
                }),

              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  DeleteDeliveryPlaces(oldData, UCCID);
                  setTimeout(() => {
                    getPlacesPromise();
                    resolve();
                  }, 1000);
                }),
            }}
            components={{
              Toolbar: (props) => (
                <div style={{ position: "absolute", bottom: "98%", right: 0 }}>
                  <MTableToolbar {...props}></MTableToolbar>
                </div>
              ),
            }}
          />
        </Paper>
      )}
    </>
  );
}
