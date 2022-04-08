import React, { useState } from "react";

import * as XLSX from "xlsx";
import { ImportProducts } from "../../Requests/DataImportRequest";
import Table from "./DataImportLog";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const [items, setItems] = useState([]);
  const [Alertopen, setAlertopen] = useState(false);

  const readExcel = (file) => {
    if (file !== undefined) {
      const promise = new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);

        fileReader.onload = (e) => {
          const bufferArray = e.target.result;

          const wb = XLSX.read(bufferArray, { type: "buffer" });
          wb.SheetNames.map((value) => {
            const ws = wb.Sheets[value];
            const data = XLSX.utils.sheet_to_json(ws);
            ImportProducts(value, data, file.name);
          });
        };
        setAlertopen(true);
        resolve();
      });

      promise.then((d) => {
        setItems(d);
      });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertopen(false);
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />

      <Table></Table>

      <Snackbar open={Alertopen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          Dados estão a ser importados, pode demorar!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
