import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { ToastContainer } from 'react-toastify';
import 'semantic-ui-css/semantic.min.css'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <BrowserRouter>
    <ToastContainer autoClose={1500}  />
    <App />
  </BrowserRouter>
  // </React.StrictMode>
);
