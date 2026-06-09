import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsuarios = async (ciFiltro = "") => {
    try {
      setLoading(true);
      const url = ciFiltro
        ? `http://localhost:8080/api/usuarios?ci=${ciFiltro}`
        : `http://localhost:8080/api/usuarios`;

      const respuesta = await axios.get(url);
      setUsuarios(respuesta.data);
    } catch (error) {
      console.error("Error al traer usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <DataContext.Provider
      value={{ usuarios, setUsuarios, fetchUsuarios, loading }}
    >
      {children}
    </DataContext.Provider>
  );
};
