import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {render} from 'react-dom';
import App from './components/App';
import {BrowserRouter as Router} from 'react-router-dom'
import MenuProvider from "react-flexible-sliding-menu";
import Menu from "./components/Sidebar/Menu";
import { StyledEngineProvider } from '@mui/material/styles';


render(<Router>
      <StyledEngineProvider injectFirst>
<App/>
     </StyledEngineProvider></Router>,document.getElementById("root"));

