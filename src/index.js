import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {render} from 'react-dom';
import App from './components/App';
import {BrowserRouter as Router} from 'react-router-dom'


render(<Router><App/></Router>,document.getElementById("root"));

