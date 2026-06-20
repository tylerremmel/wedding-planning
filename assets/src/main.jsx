import React from "react";
import ReactDOM from "react-dom/client";
import { globalStyles } from "./styles/stitches";
import AirtableInterface from "./components/AirtableInterface";

globalStyles();

const root = ReactDOM.createRoot(
  document.getElementById("airtable-interface-root"),
);
root.render(<AirtableInterface />);
