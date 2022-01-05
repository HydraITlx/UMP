import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {render} from 'react-dom';
import App from './components/App';
import {BrowserRouter as Router} from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';


render(<Router>
      <StyledEngineProvider injectFirst>
<App/>
     </StyledEngineProvider></Router>,document.getElementById("root"));

