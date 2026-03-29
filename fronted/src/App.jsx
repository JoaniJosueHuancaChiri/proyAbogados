import { useEffect,useState } from "react"
import axios from "axios"
function App() {
  const [Data, setData] = useState([])
  useEffect(() => {
    const getUsers = async () => {
      const resp = await axios.get("http://localhost:8080/api/users/")
      const data = resp.data;
      data.data
      setData(data.data)
    }
    getUsers()
  }, [])
  if (Data.length === 0) {
    return (
      <>
        cargando data ...
      </>
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
