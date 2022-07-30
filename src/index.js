import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './tests/reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import AppContextProvider from "./base/contexts/AppContext";

import './static/css/base.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <AppContextProvider>
              <App/>
          </AppContextProvider>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
