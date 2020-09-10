import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const firebaseConfig = {
  apiKey: "AIzaSyDNE_0Vq9CCpVb3LLox2ciFND_w-0yjVKM",
  authDomain: "snappy-bucksaw-289000.firebaseapp.com",
  databaseURL: "https://snappy-bucksaw-289000.firebaseio.com",
  projectId: "snappy-bucksaw-289000",
  storageBucket: "snappy-bucksaw-289000.appspot.com",
  messagingSenderId: "254081515281",
  appId: "1:254081515281:web:c3be4052df2b275eba16b0",
  measurementId: "G-CH8WB8CB4M",
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
