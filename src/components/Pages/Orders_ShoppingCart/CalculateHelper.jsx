import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "../../../styles/_pagestyles.scss";
import Controls from "../../Helpers/Controls";

function CalculateHelper({
  setNumberOfDays,
  setDosages,
  setUpdate,
  update,
  ...rest
}) {
  console.log(rest.NumberOfDays);
  //console.log({ NumberOfDaysTable });
  const [NumberOfDays, setNumberOfDay] = useState(rest.NumberOfDays);
  const btnStyles = {
    minWidth: "100%",
    top: 10,
    left: 15,
  };
  const onDaysChange = (e) => {
    const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/;
    if (rx_live.test(e.target.value)) {
      if (e.target.value > 9999) {
        return;
      } else {
        setNumberOfDay(e.target.value);
      }
    }
  };

  const onCalculateClick = (e) => {
    const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/;
    if (rx_live.test(NumberOfDays)) {
      if (NumberOfDays > 0) {
        console.log(NumberOfDays);
        setNumberOfDays(NumberOfDays);
        setUpdate(!update);
      }
    }
  };

  return (
    <div style={{ display: "flex", marginLeft: "5%" }}>
      <div style={{ marginLeft: "5%" }}>
        <TextField
          id="filled-basic"
          label="Numero de dias"
          variant="standard"
          value={NumberOfDays}
          onChange={onDaysChange}
        />
      </div>

      <div>
        <Controls.Button
          style={btnStyles}
          text="Alterar"
          onClick={onCalculateClick}
        />
      </div>
    </div>
  );
}

export default CalculateHelper;
