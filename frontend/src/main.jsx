import React from 'react';
import { StrictMode } from 'react'
import './index.css'
import { Provider } from "react-redux";
import { store } from "./redux/Store";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <BrowserRouter>
   
    <Provider store={store}>
      <App />
    </Provider>
     </BrowserRouter>
  </React.StrictMode>
);
