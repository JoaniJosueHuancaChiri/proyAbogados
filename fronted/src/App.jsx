import "./App.css"; 
import { useEffect,useState } from "react"
import axios from "axios"

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; // página actual
import Login from './pages/Login'

function App() {
  const [Data, setData] = useState([])
  useEffect(() => {
    const getUsers = async () => {
      const resp = await axios.get("http://localhost:8080/api/users/")
      const data = resp.data;
      data.data
      setData(data.data)
    }
    //getUsers()
  }, [])
  if (Data.length === 0) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    )
  }
  return (
    <>
      hola mundo
      {
        Data.map(name => (     // ← Corregido: arrow function con =>
          <li key={name}>{name}</li>  
        ))
      }
    </>
  )
}
  export default App
