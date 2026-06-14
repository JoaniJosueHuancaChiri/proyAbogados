import React, { useState, useEffect } from "react";
import ClientesTabla from "./ClientesTabla";
import ClienteForm from "./ClienteForm";
import ExpedienteForm from "./ExpedienteForm";
import ExpedientesTabla from "./ExpedientesTabla";
import EtapaEscritaForm from "./EtapaEscritaForm";
import EtapaEscritaTabla from "./EtapaEscritaTabla";
// etapa oral
import EtapaOralForm from "./EtapaOralForm";
import EtapaOralTabla from "./EtapaOralTabla";
import EtapaDecisoriaForm from "./EtapaDecisoriaForm";
import EtapaDecisoriaTabla from "./EtapaDecisoriaTabla";
// etapa impugnativa
import EtapaImpugnativaForm from "./EtapaImpugnativaForm";
import EtapaImpugnativaTabla from "./EtapaImpugnativaTabla";
// ----------------------------
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
  const [etapasOrales, setEtapasOrales] = useState([]);
  const [etapasDecisorias, setEtapasDecisorias] = useState([]);
  const [etapasImpugnativas, setEtapasImpugnativas] = useState([]);
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

  // 🔍 1. CORRECCIÓN: Obtener la Etapa Escrita de la BD con la URL unificada
  const obtenerEtapasEscritas = async (idExpediente) => {
    try {
      // 🌟 Ajustamos la ruta para que coincida con el backend (/api/etapas/escrita/:id)
      const respuesta = await axios.get(
        `http://localhost:8080/api/etapas/escrita/${idExpediente}`,
      );

      if (respuesta.data.ok && respuesta.data.datos) {
        // Ponemos el objeto de la etapa dentro de un array para que la Tabla lo recorra sin problemas
        setEtapasEscritas([respuesta.data.datos]);
        setVista("listaEtapas");
      } else {
        // Si el backend responde ok pero datos es null, significa que no hay registros aún
        setEtapasEscritas([]);
        setVista("listaEtapas");
        Swal.fire(
          "Atención",
          "Este expediente no cuenta con documentos en la Etapa Escrita todavía. ¡Puedes crear uno nuevo!",
          "info",
        );
      }
    } catch (error) {
      console.error("Error al traer etapas:", error);
      Swal.fire(
        "Error",
        "No se pudieron obtener los documentos de la etapa.",
        "error",
      );
    }
  };

  // 💾 2. NUEVA FUNCIÓN: Guardar o actualizar la Etapa Escrita (PDFs) en el Servidor
  const handleSaveEtapaEscrita = async (formDataDeReact) => {
    console.log("Enviando archivos multipartes al Backend...");

    try {
      // Mandamos el FormData directo con su cabecera binaria
      const respuesta = await axios.post(
        "http://localhost:8080/api/etapas/escrita",
        formDataDeReact,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (respuesta.data.ok) {
        Swal.fire({
          title: "¡Éxito!",
          text: "Los archivos PDF de la etapa escrita han sido guardados en el servidor.",
          icon: "success",
          confirmButtonColor: "#009688",
        });

        // Refrescamos la tabla con los nuevos datos guardados
        if (idExpedienteSeleccionado) {
          obtenerEtapasEscritas(idExpedienteSeleccionado);
        } else {
          setVista("expedientes"); // Si no hay id seleccionado, volvemos a la lista de expedientes
        }
      }
    } catch (error) {
      console.error("Error crítico al subir archivos a la etapa:", error);
      Swal.fire({
        title: "Error de Subida",
        text:
          error.response?.data?.mensaje ||
          "No se pudo conectar con el servidor para almacenar los PDFs.",
        icon: "error",
        confirmButtonColor: "#009688",
      });
    }
  };
  // etapa oral
  const obtenerEtapasOrales = async (idExpediente) => {
    try {
      const respuesta = await axios.get(
        `http://localhost:8080/api/etapas/oral/${idExpediente}`,
      );
      if (respuesta.data.ok) {
        setEtapasOrales(respuesta.data.datos ? [respuesta.data.datos] : []);
        setVista("listaEtapasOral");
      }
    } catch (error) {
      Swal.fire("Error", "No se pudieron cargar las etapas orales", "error");
    }
  };

  const handleSaveEtapaOral = async (formData) => {
    try {
      await axios.post("http://localhost:8080/api/etapas/oral", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Swal.fire("Éxito", "Etapa oral guardada correctamente", "success");
      setVista("listaExpedientes");
    } catch (error) {
      Swal.fire("Error", "No se pudo guardar la etapa oral", "error");
    }
  };
  // ⚖️ 3ra Etapa: Decisoria (Sentencia)
  const obtenerEtapasDecisorias = async (idExpediente) => {
    try {
      const respuesta = await axios.get(
        `http://localhost:8080/api/etapas/decisoria/${idExpediente}`,
      );
      if (respuesta.data.ok) {
        // Al igual que en la oral, si viene un objeto lo metemos en un array [datos] para la tabla
        setEtapasDecisorias(respuesta.data.datos ? [respuesta.data.datos] : []);
        setVista("listaEtapasDecisoria");
      }
    } catch (error) {
      console.error("Error al obtener etapa decisoria:", error);
      Swal.fire(
        "Error",
        "No se pudo cargar la resolución de la etapa decisoria",
        "error",
      );
    }
  };

  const handleSaveEtapaDecisoria = async (formData) => {
    try {
      await axios.post("http://localhost:8080/api/etapas/decisoria", formData, {
        headers: { "Content-Type": "multipart/form-data" }, // 🌟 Crucial para que viaje el PDF de la sentencia
      });
      Swal.fire(
        "Éxito",
        "Resolución de sentencia guardada correctamente",
        "success",
      );
      obtenerEtapasDecisorias(idExpedienteSeleccionado);
      // Una vez guardado, lo lógico es regresar al historial de etapas orales o expedientes
      setVista("listaEtapasDecisoria");
    } catch (error) {
      console.error("Error al guardar etapa decisoria:", error);
      Swal.fire("Error", "No se pudo guardar la etapa decisoria", "error");
    }
  };

  // 4ta Etapa: Impugnativa (Apelaciones y Recursos)
  const obtenerEtapasImpugnativas = async (idExpediente) => {
    try {
      const respuesta = await axios.get(
        `http://localhost:8080/api/etapas/impugnativa/${idExpediente}`,
      );
      if (respuesta.data.ok) {
        // Homologamos guardando en un array [datos] para que las estructuras iteren limpio
        setEtapasImpugnativas(
          respuesta.data.datos ? [respuesta.data.datos] : [],
        );
        setVista("listaEtapasImpugnativa");
      }
    } catch (error) {
      console.error("Error al obtener etapa impugnativa:", error);
      Swal.fire(
        "Error",
        "No se pudo cargar la información de la etapa impugnativa",
        "error",
      );
    }
  };

  const handleSaveEtapaImpugnativa = async (formData) => {
    try {
      await axios.post(
        "http://localhost:8080/api/etapas/impugnativa",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }, // Crucial para los archivos de impugnación
        },
      );
      Swal.fire(
        "Éxito",
        "Recursos de impugnación guardados correctamente",
        "success",
      );

      // Una vez guardado, actualizamos datos y regresamos a la tabla de control decisorio
      obtenerEtapasDecisorias(idExpedienteSeleccionado);
      setVista("listaEtapasDecisoria");
    } catch (error) {
      console.error("Error al guardar etapa impugnativa:", error);
      Swal.fire("Error", "No se pudo guardar la etapa impugnativa", "error");
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
          onSave={handleSaveEtapaEscrita} // 🌟 CORREGIDO: Ahora sí se comunica de verdad con Axios y tu Backend
          onCancel={() => setVista("listaExpedientes")}
        />
      ) : vista === "formEtapaOral" ? ( // etapa oral
        <EtapaOralForm
          idExpediente={idExpedienteSeleccionado}
          onSave={handleSaveEtapaOral}
          onCancel={() => setVista("listaEtapas")}
        />
      ) : vista === "listaEtapasOral" ? (
        <EtapaOralTabla
          lista={etapasOrales}
          onVolver={() => setVista("listaEtapas")}
          onEditar={(etapa) => setVista("formEtapaOral")}
          onEliminar={(id) => console.log("Eliminar")}
          onCrearEtapaOral={(etapa) => {
            setIdExpedienteSeleccionado(etapa.idexpediente);
            setVista("formEtapaDecisoria");
          }}
          onListarEtapaOral={(etapa) => {
            setIdExpedienteSeleccionado(etapa.idexpediente);
            obtenerEtapasDecisorias(etapa.idexpediente);
            setVista("listaEtapasDecisoria");
          }}
        />
      ) : vista === "formEtapaDecisoria" ? (
        <EtapaDecisoriaForm
          idExpediente={idExpedienteSeleccionado}
          onSave={handleSaveEtapaDecisoria}
          // Si quieres que al cancelar vaya a la tabla de sentencias:
          onCancel={() => setVista("listaEtapasOral")}
        />
      ) : // NUEVO BLOQUE: Manejo de la tabla de la 3ra Etapa (Sentencia)
      vista === "listaEtapasDecisoria" ? (
        <EtapaDecisoriaTabla
          lista={etapasDecisorias} // Tu estado que guarda la respuesta de obtenerEtapasDecisorias
          onVolver={() => setVista("listaEtapasOral")}
          onEditar={(etapa) => setVista("formEtapaDecisoria")}
          onEliminar={(id) => console.log("Eliminar sentencia:", id)}
          //  ENLACE DE BOTONES CLAVE:
          onCrearEtapaInpugnativa={(etapa) => {
            setIdExpedienteSeleccionado(etapa.idexpediente);
            setVista("formEtapaImpugnativa"); // Cambia al formulario de subida
          }}
          onListarEtapaInpugnativa={(etapa) => {
            setIdExpedienteSeleccionado(etapa.idexpediente);
            obtenerEtapasImpugnativas(etapa.idexpediente); // Carga y cambia a vista historial
          }}
        />
      ) : vista === "formEtapaImpugnativa" ? (
        <EtapaImpugnativaForm
          idExpediente={idExpedienteSeleccionado}
          onSave={handleSaveEtapaImpugnativa}
          onCancel={() => setVista("listaEtapasDecisoria")} // Regresa sin cambios
        />
      ) : vista === "listaEtapasImpugnativa" ? (
        <EtapaImpugnativaTabla
          lista={etapasImpugnativas}
          onVolver={() => setVista("listaEtapasDecisoria")}
          onEditar={(etapa) => setVista("formEtapaImpugnativa")}
          onEliminar={(id) => console.log("Eliminar impugnación id:", id)}
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
          onCancel={() => {
            setExpedienteEditando(null);
            setVista("listaExpedientes"); // Corregido: regresa a la lista, no a la tabla principal
          }}
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
                  "Actualizado correctamente.",
                  "success",
                );
              } else {
                await apiCrearExpediente(nuevoExp);
                Swal.fire("Expedientes", "Creado correctamente.", "success");
              }
              const data = await apiGetExpedientes();
              setExpedientes(data);
              setExpedienteEditando(null);
              setVista("listaExpedientes");
            } catch (error) {
              console.error("Error guardando expediente:", error);
              Swal.fire("Error", "No se pudo guardar expediente.", "error");
            }
          }}
        />
      ) : vista === "listaEtapas" ? (
        <EtapaEscritaTabla
          lista={etapasEscritas}
          onVolver={() => setVista("listaExpedientes")}
          onVer={(etapa) => setEtapaViendo(etapa)}
          onEditar={(etapa) => {
            //
            setIdExpedienteSeleccionado(etapa.idexpediente);
            setVista("formEtapa");
          }}
          onEliminar={(id) =>
            console.log("Eliminar etapa escrita para exp:", id)
          }
          onCrearEtapaOral={(etapa) => {
            setIdExpedienteSeleccionado(etapa.idexpediente);
            setVista("formEtapaOral"); // Cambia a la vista del formulario
          }}
          onListarEtapaOral={(etapa) => {
            setIdExpedienteSeleccionado(etapa.idexpediente);
            obtenerEtapasOrales(etapa.idexpediente); // Lógica de carga
            setVista("listaEtapasOral"); // Cambia a la vista de la tabla
          }}
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
