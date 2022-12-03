import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";

import App from "../src/containers/App";
import BoilerplateTheme from "./theme";
import './index.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={BoilerplateTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
