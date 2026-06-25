import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { globalStyles } from "./styles/stitches";
import { muiTheme } from "./styles/muiTheme";
import AirtableInterface from "./components/AirtableInterface";

globalStyles();

const root = ReactDOM.createRoot(
  document.getElementById("airtable-interface-root"),
);
root.render(
  <ThemeProvider theme={muiTheme}>
    <AirtableInterface />
  </ThemeProvider>,
);
