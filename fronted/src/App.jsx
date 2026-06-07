import "./App.css"; 
import { useEffect, useState } from "react";
import axios from "axios";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; 
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; // 1. IMPORTAMOS TU NUEVA PÁGINA

function App() {
  const [Data, setData] = useState([])
  
  useEffect(() => {
    const getUsers = async () => {
      const resp = await axios.get("http://localhost:8080/api/users/")
      const data = resp.data;
      setData(data.data)
    }
    // getUsers() // Descomentar cuando el backend esté encendido
  }, [])

  if (Data.length === 0) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          
          {/* 2. AGREGAMOS LA RUTA PARA EL DASHBOARD VALI ADMIN */}
          <Route path="/dashboard" element={<Dashboard />} />
          
        </Routes>
      </Router>
    )
  }

  return (
    <>
      hola mundo
      {
        Data.map(name => ( 
          <li key={name}>{name}</li>  
        ))
      }
    </>
  )
}

export default App;