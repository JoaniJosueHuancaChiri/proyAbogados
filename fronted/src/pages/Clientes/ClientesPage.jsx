import React, { useState, useEffect } from "react";
import ClientesTabla from "./ClientesTabla";
import ClienteForm from "./ClienteForm";
import ExpedienteForm from "./ExpedienteForm";
import ExpedientesTabla from "./ExpedientesTabla";
import EtapaEscritaForm from "./EtapaEscritaForm";
import EtapaEscritaTabla from "./EtapaEscritaTabla";
import Swal from "sweetalert2";
import axios from "axios";
import {
  getExpedientes as apiGetExpedientes,
  crearExpediente as apiCrearExpediente,
  actualizarExpediente as apiActualizarExpediente,
  eliminarExpediente as apiEliminarExpediente,
} from "../../api/expedientes";

const ClientesPage = () => {
  const [formularioAbierto, setFormularioAbierto] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [clienteViendo, setClienteViendo] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);

  const [vista, setVista] = useState("tabla");
  const [idClienteSeleccionado, setIdClienteSeleccionado] = useState(null);
  const [expedientes, setExpedientes] = useState([]);
  const [expedienteViendo, setExpedienteViendo] = useState(null);
  const [expedienteEditando, setExpedienteEditando] = useState(null);

  const [expedienteParaEtapa, setExpedienteParaEtapa] = useState(null);
  const [idExpedienteSeleccionado, setIdExpedienteSeleccionado] =
    useState(null);

  // listar etapa 1
  // ... dentro de tu componente ClientesPage
  const [etapasEscritas, setEtapasEscritas] = useState([]); // Para guardar las etapas del expediente
  const [etapaViendo, setEtapaViendo] = useState(null); // Para el modal de ver

  // 1. CARGAR LISTA DE CLIENTES DESDE EL BACKEND (Misma lógica que Abogados)
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
    // Cargar expedientes al montar
    (async () => {
      try {
        const data = await apiGetExpedientes();
        setExpedientes(data);
      } catch (err) {
        console.error("No se pudieron cargar expedientes:", err);
      }
    })();
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

  const obtenerEtapasEscritas = async (idExpediente) => {
    try {
      // Fíjate que ahora la URL es correcta para el backend: /api/etapas/7
      const respuesta = await axios.get(
        `http://localhost:8080/api/etapas/${idExpediente}`,
      );

      // El backend responde con { ok: true, datos: ... }
      if (respuesta.data.ok) {
        setEtapasEscritas([respuesta.data.datos]); // Ponemos en un array para que la tabla lo recorra
        setVista("listaEtapas");
      } else {
        Swal.fire("Info", respuesta.data.mensaje, "info");
      }
    } catch (error) {
      console.error("Error al traer etapas:", error);
      Swal.fire("Error", "No se pudieron obtener los documentos", "error");
    }
  };

  return (
    <>
      <div className="app-title">
        <div>
          <h1>
            <i className="bi bi-people"></i> Gestión de Clientes
          </h1>
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
      ) : vista === "formEtapa" ? (
        <EtapaEscritaForm
          idExpediente={idExpedienteSeleccionado}
          onSave={(data) => {
            // Aquí manejarás el envío del FormData al backend
            console.log("Guardando datos...", data);
            setVista("listaExpedientes");
          }}
          onCancel={() => setVista("listaExpedientes")}
        />
      ) : vista === "listaExpedientes" ? (
        <ExpedientesTabla
          lista={expedientes.filter(
            (e) => e.idCliente === idClienteSeleccionado,
          )}
          onVolver={() => setVista("tabla")}
          onVer={(exp) => setExpedienteViendo(exp)}
          onEditar={(exp) => {
            setExpedienteEditando(exp);
            setIdClienteSeleccionado(exp.idCliente);
            setVista("formExpediente");
          }}
          onEliminar={(idExp) => {
            Swal.fire({
              title: "¿Eliminar expediente?",
              text: "Esta acción eliminará el expediente permanentemente.",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#009688",
              cancelButtonColor: "#bcbcbc",
              confirmButtonText: "Sí, eliminar",
            }).then(async (result) => {
              if (result.isConfirmed) {
                try {
                  await apiEliminarExpediente(idExp);
                  Swal.fire("Eliminado", "Expediente eliminado.", "success");
                  const data = await apiGetExpedientes();
                  setExpedientes(data);
                } catch (err) {
                  console.error("Error eliminando expediente:", err);
                  Swal.fire(
                    "Error",
                    "No se pudo eliminar el expediente.",
                    "error",
                  );
                }
              }
            });
          }}
          onCrearEtapa={(exp) => {
            setIdExpedienteSeleccionado(exp.idexpediente || exp.idExpediente);
            setVista("formEtapa");
          }}
          onListarEtapa={(exp) => {
            setIdExpedienteSeleccionado(exp.idexpediente || exp.idExpediente);
            obtenerEtapasEscritas(exp.idexpediente || exp.idExpediente); // Llama a la nueva función
          }}
        />
      ) : vista === "formExpediente" ? (
        <ExpedienteForm
          idCliente={idClienteSeleccionado}
          expedienteData={expedienteEditando}
          onSave={async (nuevoExp) => {
            try {
              if (expedienteEditando) {
                await apiActualizarExpediente(
                  expedienteEditando.idexpediente ||
                    expedienteEditando.idExpediente,
                  nuevoExp,
                );
                Swal.fire(
                  "Expedientes",
                  "Expediente actualizado correctamente.",
                  "success",
                );
              } else {
                await apiCrearExpediente(nuevoExp);
                Swal.fire(
                  "Expedientes",
                  "Expediente creado correctamente.",
                  "success",
                );
              }
              const data = await apiGetExpedientes();
              setExpedientes(data);
              setExpedienteEditando(null);
              setVista("tabla");
            } catch (error) {
              console.error("Error guardando expediente:", error);
              Swal.fire(
                "Error",
                error.response?.data?.mensaje ||
                  "No se pudo guardar expediente.",
                "error",
              );
            }
          }}
          onCancel={() => {
            setExpedienteEditando(null);
            setVista("tabla");
          }}
          onSave={async (data) => {
            try {
              // Ejemplo de cómo deberías enviarlo (ajusta según tu endpoint de backend)
              await axios.post("http://localhost:8080/api/etapas", data, {
                headers: { "Content-Type": "multipart/form-data" },
              });
              Swal.fire("Éxito", "Etapa guardada correctamente", "success");
              setVista("listaExpedientes");
            } catch (error) {
              Swal.fire("Error", "No se pudo guardar la etapa", "error");
            }
          }}
        />
      ) : vista === "listaEtapas" ? (
        <EtapaEscritaTabla
          lista={etapasEscritas}
          onVolver={() => setVista("listaExpedientes")}
          onVer={(etapa) => setEtapaViendo(etapa)}
          // ... agrega el resto de props necesarios
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
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title">
                  <i className="bi bi-person-bounding-box me-2"></i> Ficha del
                  Cliente
                </h5>
                <button
                  className="btn-close btn-close-white"
                  onClick={() => setClienteViendo(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Nombre Completo:</strong> {clienteViendo.nombre}{" "}
                  {clienteViendo.paterno} {clienteViendo.materno}
                </p>
                <p>
                  <strong>C.I.:</strong> {clienteViendo.ci}
                </p>
                <p>
                  <strong>Celular:</strong>{" "}
                  {clienteViendo.celular || "Sin registrar"}
                </p>
                <p>
                  <strong>Dirección:</strong>{" "}
                  {clienteViendo.direccion || "Sin registrar"}
                </p>
                <p>
                  <strong>Ocupación:</strong>{" "}
                  {clienteViendo.ocupacion || "Sin registrar"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para expediente */}
      {expedienteViendo && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title">
                  <i className="bi bi-file-earmark-text me-2"></i> Detalle del
                  Expediente
                </h5>
                <button
                  className="btn-close btn-close-white"
                  onClick={() => setExpedienteViendo(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>NUREJ:</strong> {expedienteViendo.nurej}
                </p>
                <p>
                  <strong>Nro. Expediente:</strong>{" "}
                  {expedienteViendo.nroExpediente}
                </p>
                <p>
                  <strong>Tipo de Proceso:</strong>{" "}
                  {expedienteViendo.tipoProceso}
                </p>
                <p>
                  <strong>Juzgado:</strong> {expedienteViendo.juzgado}
                </p>
                <p>
                  <strong>Estado:</strong> {expedienteViendo.estado}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClientesPage;
