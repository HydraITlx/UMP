import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function DatePicker(props) {
  const { name, label, value, onChange, disabled = false, ...other } = props;

  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        disableToolbar
        views={["year", "month", "day"]}
        disabled={disabled}
        variant="inline"
        inputVariant="outlined"
        label={label}
        inputFormat="dd/MM/yyyy"
        name={name}
        value={value}
        onChange={(date) => onChange(convertToDefEventPara(name, date))}
        renderInput={(other) => <TextField {...other} />}
      />
    </LocalizationProvider>
  );
}
