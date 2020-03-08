import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const client = new ApolloClient({
  uri: "https://api.graphql.jobs"
});

const AppProvider = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
ReactDOM.render(<AppProvider />, document.getElementById("root"));

serviceWorker.unregister();
