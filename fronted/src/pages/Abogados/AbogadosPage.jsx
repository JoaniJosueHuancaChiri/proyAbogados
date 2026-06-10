import React, { useState, useEffect } from "react";
import AbogadosTabla from "./AbogadosTabla";
import AbogadoForm from "./AbogadoForm";
import Swal from "sweetalert2";
import axios from "axios"; 

const AbogadosPage = () => {
  const [formularioAbierto, setFormularioAbierto] = useState(false);
  const [abogadoEditando, setAbogadoEditando] = useState(null);
  const [abogadoViendo, setAbogadoViendo] = useState(null);
  const [abogados, setAbogados] = useState([]);
  const [loading, setLoading] = useState(false);

  const obtenerAbogados = async () => {
    try {
      setLoading(true);
      const respuesta = await axios.get(
        "http://localhost:8080/api/usuarios/abogados",
      );
      setAbogados(respuesta.data);
    } catch (error) {
      console.error("Error al traer abogados:", error);
      Swal.fire("Error", "No se pudo cargar la lista de abogados", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerAbogados();
  }, []);

  const handleSaveAbogado = async (nuevoAbogado) => {
    try {
      if (abogadoEditando) {
        await axios.put(
          `http://localhost:8080/api/usuarios/abogados/${abogadoEditando.idUsuario}`,
          nuevoAbogado,
        );
        Swal.fire({
          title: "¡Actualizado!",
          text: "Los datos del abogado se modificaron con éxito.",
          icon: "success",
          confirmButtonColor: "#009688",
        });
      } else {
        // 📥 MODO REGISTRO (POST /api/usuarios)
        const respuesta = await axios.post(
          "http://localhost:8080/api/usuarios",
          nuevoAbogado,
        );
        Swal.fire({
          title: "¡Registrado!",
          text: respuesta.data.mensaje || "Abogado registrado correctamente.",
          icon: "success",
          confirmButtonColor: "#009688",
        });
      }

      obtenerAbogados();
      setFormularioAbierto(false);
      setAbogadoEditando(null);
    } catch (error) {
      console.error("Error al guardar abogado:", error);
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

  const handleDeleteAbogado = (abg) => {
    Swal.fire({
      title: "¿Eliminar Abogado?",
      text: `¿Realmente desea eliminar al abogado ${abg.nombre} ${abg.paterno}? Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#009688",
      cancelButtonColor: "#bcbcbc",
      confirmButtonText: "Sí, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `http://localhost:8080/api/usuarios/${abg.idUsuario}?tipo=Abogado`,
          );

          Swal.fire(
            "Eliminado",
            "El abogado ha sido eliminado correctamente de todas las tablas.",
            "success",
          );
          obtenerAbogados();
        } catch (error) {
          console.error("Error al eliminar abogado:", error);
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
          <h1>
            <i className="bi bi-gavel"></i> Gestión de Abogados
          </h1>
        </div>
        {!formularioAbierto && (
          <button
            className="btn btn-primary"
            onClick={() => setFormularioAbierto(true)}
            style={{ backgroundColor: "#009688", borderColor: "#009688" }}
          >
            <i className="bi bi-plus-lg me-1"></i> Agregar Abogado
          </button>
        )}
      </div>

      {formularioAbierto ? (
        <AbogadoForm
          abogadoData={abogadoEditando}
          onSave={handleSaveAbogado}
          onCancel={() => {
            setFormularioAbierto(false);
            setAbogadoEditando(null);
          }}
        />
      ) : /* Indicador visual de carga por si la BD tarda milisegundos */
      loading ? (
        <div className="text-center my-5">
          <div
            className="spinner-border text-teal"
            role="status"
            style={{ color: "#009688" }}
          ></div>
          <p className="mt-2 text-secondary">Cargando abogados...</p>
        </div>
      ) : (
        <AbogadosTabla
          lista={abogados}
          onEditar={(a) => {
            setAbogadoEditando(a);
            setFormularioAbierto(true);
          }}
          onEliminar={handleDeleteAbogado}
          onView={setAbogadoViendo}
        />
      )}

      {abogadoViendo && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-light">
                <h5 className="modal-title fw-bold text-dark">
                  <i className="bi bi-eye-fill text-primary me-2"></i> Detalles
                  del Abogado
                </h5>
                <button
                  className="btn-close"
                  onClick={() => setAbogadoViendo(null)}
                ></button>
              </div>
              <div className="modal-body">
                <table className="table table-bordered m-0">
                  <tbody>
                    <tr>
                      <th className="bg-light" style={{ width: "35%" }}>
                        Nombre:
                      </th>
                      <td>
                        {abogadoViendo.nombre} {abogadoViendo.paterno}{" "}
                        {abogadoViendo.materno}
                      </td>
                    </tr>
                    <tr>
                      <th className="bg-light">CI:</th>
                      <td>{abogadoViendo.ci}</td>
                    </tr>
                    <tr>
                      <th className="bg-light">Celular:</th>
                      <td>{abogadoViendo.celular}</td>
                    </tr>
                    <tr>
                      <th className="bg-light">RPA:</th>
                      <td>{abogadoViendo.rpa}</td>
                    </tr>
                    <tr>
                      <th className="bg-light">Especialidad:</th>
                      <td>{abogadoViendo.especialidad}</td>
                    </tr>
                    <tr>
                      <th className="bg-light">Universidad:</th>
                      <td>{abogadoViendo.universidad}</td>
                    </tr>
                    <tr>
                      <th className="bg-light">Género:</th>
                      <td>{abogadoViendo.genero}</td>
                    </tr>
                    <tr>
                      <th className="bg-light">Estado:</th>
                      <td>
                        <span
                          className={`badge ${abogadoViendo.estado === 1 ? "bg-success" : "bg-danger"}`}
                        >
                          {abogadoViendo.estado === 1 ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setAbogadoViendo(null)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AbogadosPage;
