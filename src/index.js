import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";

import App from "./containers/App";
import BoilerplateTheme from "./theme";
import "./index.css";
import store from './store'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={BoilerplateTheme}>
      <App />
    </ThemeProvider>
  </Provider>
);
