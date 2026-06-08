import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsuarios = async () => {
    try {
      const resp = await axios.get("http://localhost:8080/api/users/");
      setUsuarios(resp.data.data || resp.data);
    } catch (error) {
      console.error("Error global al cargar usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <DataContext.Provider value={{ usuarios, setUsuarios, fetchUsuarios, loading }}>
      {children}
    </DataContext.Provider>
  );
};