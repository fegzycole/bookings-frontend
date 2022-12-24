import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./containers/App";
import BoilerplateTheme from "./theme";
import "./index.css";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={BoilerplateTheme}>
          <App />
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  </BrowserRouter>
);
