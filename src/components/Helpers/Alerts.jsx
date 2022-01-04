import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { StyledEngineProvider } from "@mui/material/styles";

export default function DescriptionAlerts(props) {
  return (
    <StyledEngineProvider injectFirst>
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity={props.severity}>{props.message}</Alert>
      </Stack>
    </StyledEngineProvider>
  );
}
