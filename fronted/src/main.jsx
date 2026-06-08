import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 1. Iconos de Bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css';

// 2. CAMBIA ESTA LÍNEA (Usando punto y barra)
import './assets/css/main.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);