import React, { useState, useEffect } from "react";
import ClientesTabla from "./ClientesTabla";
import ClienteForm from "./ClienteForm";
import ExpedienteForm from "./ExpedienteForm";
import ExpedientesTabla from "./ExpedientesTabla";
import Swal from "sweetalert2";
import axios from "axios";

const ClientesPage = () => {
  const [formularioAbierto, setFormularioAbierto] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [clienteViendo, setClienteViendo] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);

  const [vista, setVista] = useState("tabla");
  const [idClienteSeleccionado, setIdClienteSeleccionado] = useState(null);
  const [expedientes, setExpedientes] = useState([]);

  // 📋 1. CARGAR LISTA DE CLIENTES DESDE EL BACKEND (Misma lógica que Abogados)
  const obtenerClientes = async () => {
    try {
      setLoading(true);
      const respuesta = await axios.get(
        "http://localhost:8080/api/usuarios/clientes",
      );
      setClientes(respuesta.data);
    } catch (error) {
      console.error("Error al traer clientes:", error);
      Swal.fire("Error", "No se pudo cargar la lista de clientes", "error");
    } finally {
      setLoading(false);
    }
  };

  // Ejecutamos la carga inicial al montar el componente
  useEffect(() => {
    obtenerClientes();
  }, []);

  // 💾 2. FUNCIÓN PARA GUARDAR (CREAR O EDITAR EN BD - Calcado de Abogados)
  const handleSaveCliente = async (nuevoCliente) => {
    try {
      if (clienteEditando) {
        // 🔄 MODO EDICIÓN (PUT /api/usuarios/clientes/:id)
        await axios.put(
          `http://localhost:8080/api/usuarios/clientes/${clienteEditando.idUsuario}`,
          nuevoCliente,
        );
        Swal.fire({
          title: "¡Actualizado!",
          text: "Los datos del cliente se modificaron con éxito.",
          icon: "success",
          confirmButtonColor: "#009688",
        });
      } else {
        // 📥 MODO REGISTRO (POST /api/usuarios -> Tu ruta base global)
        const respuesta = await axios.post(
          "http://localhost:8080/api/usuarios",
          nuevoCliente,
        );
        Swal.fire({
          title: "¡Registrado!",
          text: respuesta.data.mensaje || "Cliente registrado correctamente.",
          icon: "success",
          confirmButtonColor: "#009688",
        });
      }

      // Refrescamos la lista directamente desde el servidor
      obtenerClientes();
      setFormularioAbierto(false);
      setClienteEditando(null);
    } catch (error) {
      console.error("Error al guardar cliente:", error);
      Swal.fire({
        title: "Error",
        text:
          error.response?.data?.mensaje ||
          "Hubo un error al procesar la solicitud.",
        icon: "error",
        confirmButtonColor: "#009688",
      });
    }
  };

  // 🗑️ 3. FUNCIÓN PARA ELIMINAR (DELETE /api/usuarios/:id?tipo=Cliente)
  const handleDeleteCliente = (cli) => {
    Swal.fire({
      title: "¿Eliminar Cliente?",
      text: `¿Realmente desea eliminar al cliente ${cli.nombre} ${cli.paterno}? Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#009688",
      cancelButtonColor: "#bcbcbc",
      confirmButtonText: "Sí, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Invocamos la ruta unificada pasando el id y el tipo=Cliente
          await axios.delete(
            `http://localhost:8080/api/usuarios/${cli.idUsuario}?tipo=Cliente`,
          );

          Swal.fire(
            "Eliminado",
            "El cliente ha sido eliminado correctamente.",
            "success",
          );
          obtenerClientes(); // Recargamos la lista limpia
        } catch (error) {
          console.error("Error al eliminar cliente:", error);
          Swal.fire(
            "Error",
            "No se pudo eliminar el registro en el servidor.",
            "error",
          );
        }
      }
    });
  };

  return (
    <>
      <div className="app-title">
        <div>
          <h1><i className="bi bi-people"></i> Gestión de Clientes</h1>
        </div>
        {!formularioAbierto && vista === "tabla" && (
          <button
            className="btn btn-primary"
            onClick={() => setFormularioAbierto(true)}
            style={{ backgroundColor: "#009688", borderColor: "#009688" }}
          >
            <i className="bi bi-plus-lg me-1"></i> Registrar Cliente
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : formularioAbierto ? (
        <ClienteForm
          clienteData={clienteEditando}
          onSave={handleSaveCliente}
          onCancel={() => {
            setFormularioAbierto(false);
            setClienteEditando(null);
          }}
        />
      ) : vista === "listaExpedientes" ? (
        <ExpedientesTabla
          lista={expedientes.filter((e) => e.idCliente === idClienteSeleccionado)}
          onVolver={() => setVista("tabla")}
        />
      ) : vista === "formExpediente" ? (
        <ExpedienteForm
          idCliente={idClienteSeleccionado}
          onSave={(nuevoExp) => {
            setExpedientes([...expedientes, { ...nuevoExp, id: Date.now() }]);
            Swal.fire("Expedientes", "Expediente guardado correctamente.", "success");
            setVista("tabla");
          }}
          onCancel={() => setVista("tabla")}
        />
      ) : (
        <ClientesTabla
          lista={clientes}
          onEditar={(c) => {
            setClienteEditando(c);
            setFormularioAbierto(true);
          }}
          onEliminar={handleDeleteCliente}
          onView={setClienteViendo}
          onCrearExpediente={(idUsuario) => {
            setIdClienteSeleccionado(idUsuario);
            setVista("formExpediente");
          }}
          onListarExpedientes={(idUsuario) => {
            setIdClienteSeleccionado(idUsuario);
            setVista("listaExpedientes");
          }}
        />
      )}

      {/* Modal de Visualización */}
      {clienteViendo && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title"><i className="bi bi-person-bounding-box me-2"></i> Ficha del Cliente</h5>
                <button className="btn-close btn-close-white" onClick={() => setClienteViendo(null)}></button>
              </div>
              <div className="modal-body">
                <p><strong>Nombre Completo:</strong> {clienteViendo.nombre} {clienteViendo.paterno} {clienteViendo.materno}</p>
                <p><strong>C.I.:</strong> {clienteViendo.ci}</p>
                <p><strong>Celular:</strong> {clienteViendo.celular || "Sin registrar"}</p>
                <p><strong>Dirección:</strong> {clienteViendo.direccion || "Sin registrar"}</p>
                <p><strong>Ocupación:</strong> {clienteViendo.ocupacion || "Sin registrar"}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClientesPage;