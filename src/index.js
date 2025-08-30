import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import client from "./apolloClient";
import { LanguageProvider } from "./context/LanguageContext";
import "./styles/ui.css";
import "./styles/vibestrings.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <LanguageProvider>
        <App />

      </LanguageProvider>
    </BrowserRouter>
  </ApolloProvider>
);