import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './demo/App';
import './index.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

const Root = ReactDOM.createRoot(document.getElementById('root'));

Root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
