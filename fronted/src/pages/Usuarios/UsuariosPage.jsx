import React, { useState, useContext } from "react";
import { DataContext } from "../../context/DataContext";
import UsuarioTabla from "./UsuarioTabla";
import UsuarioForm from "./UsuarioForm";
import Swal from "sweetalert2";
import axios from "axios";

const UsuariosPage = () => {
  const { usuarios, setUsuarios, loading, fetchUsuarios } =
    useContext(DataContext);
  const [showForm, setShowForm] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleSave = async (nuevoUsuario) => {
    try {
      let mensaje = "Usuario registrado correctamente.";
      const formatearFechaSegura = (fecha) => {
        if (!fecha) return null;
        return fecha.includes("T") ? fecha.split("T")[0] : fecha;
      };
      if (selectedUsuario) {
        const idParaEditar = selectedUsuario.idUsuario;
        const datosLimpios = {
          nombre: nuevoUsuario.nombre,
          paterno: nuevoUsuario.paterno,
          materno: nuevoUsuario.materno,
          ci: nuevoUsuario.ci,
          fechaNacimiento: formatearFechaSegura(nuevoUsuario.fechaNacimiento), 
          genero: nuevoUsuario.genero,
          celular: nuevoUsuario.celular,
          password: nuevoUsuario.password,
          estado:
            nuevoUsuario.estado === "Inactivo" || nuevoUsuario.estado === 0
              ? 0
              : 1,
        };
        console.log(
          "📡 ENVIANDO A PUT:",
          `http://localhost:8080/api/usuarios/${idParaEditar}`,
        );
        console.log("DATOS ENVIADOS EN EL BODY:", datosLimpios);
        const respuesta = await axios.put(
          `http://localhost:8080/api/usuarios/${idParaEditar}`,
          datosLimpios,
        );
        console.log("RESPUESTA DEL SERVIDOR (PUT):", respuesta);
        if (respuesta.status === 200 || respuesta.data.ok) {
          mensaje = "Datos Actualizados correctamente.";
          await fetchUsuarios();
          setShowForm(false);
          setSelectedUsuario(null);
        } else {
          throw new Error("El servidor no retornó confirmación de éxito");
        }
      } else {
        const registroLimpio = {
          ...nuevoUsuario,
          estado:
            nuevoUsuario.estado === "Inactivo" || nuevoUsuario.estado === 0
              ? 0
              : 1,
        };

        const respuesta = await axios.post(
          "http://localhost:8080/api/usuarios/",
          registroLimpio,
        );

        if (respuesta.status === 201 || respuesta.status === 200) {
          await fetchUsuarios();
          setShowForm(false);
        }
      }
      Swal.fire({
        title: "Usuarios",
        text: mensaje,
        icon: "success",
        confirmButtonColor: "#009688",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error detallado al guardar:", error);

      Swal.fire({
        title: "Error al procesar",
        text:
          error.response?.data?.mensaje ||
          "Hubo un problema al interactuar con la base de datos.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };
  const handleDelete = (usuario) => {
    const idUsuario = usuario.idUsuario;
    const tipoUsuario = usuario.tipoUsuario || "Administrador";
    Swal.fire({
      title: "Eliminar Usuario",
      text: `¿Realmente quiere eliminar al usuario ${usuario.nombre}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#009688",
      cancelButtonColor: "#bcbcbc",
      confirmButtonText: "Sí, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const respuesta = await axios.delete(
            `http://localhost:8080/api/usuarios/${idUsuario}?tipo=${tipoUsuario}`,
          );
          if (respuesta.status === 200 || respuesta.data.ok) {
            await fetchUsuarios();
            Swal.fire(
              "Eliminado",
              "El usuario ha sido eliminado permanentemente de la base de datos.",
              "success",
            );
          }
        } catch (error) {
          console.error("Error al eliminar usuario:", error);
          Swal.fire(
            "Error",
            "No se pudo eliminar el usuario porque tiene registros asociados en el sistema.",
            "error",
          );
        }
      }
    });
  };
  const handleEdit = (usuario) => {
    setSelectedUsuario(usuario);
    setShowForm(true);
  };

  const handleView = (usuario) => {
    setSelectedUsuario(usuario);
    setShowModal(true);
  };

  if (loading) {
    return <div className="d-flex justify-content-center p-5">Cargando...</div>;
  }

  return (
    <>
      <div className="app-title">
        <div>
          <h1>
            <i className="bi bi-people"></i> Gestión de Usuarios
          </h1>
          <p>Administración del personal</p>
        </div>
        {!showForm && (
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            <i className="bi bi-plus-lg me-1"></i> Agregar Usuario
          </button>
        )}
      </div>

      <div className="row">
        <div className="col-md-12">
          {showForm ? (
            <UsuarioForm
              usuarioData={selectedUsuario}
              onSave={handleSave}
              onCancel={() => {
                setShowForm(false);
                setSelectedUsuario(null);
              }}
            />
          ) : (
            <UsuarioTabla
              usuarios={usuarios}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          )}
        </div>
      </div>

      {showModal && selectedUsuario && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-light">
                <h5 className="modal-title fw-bold">Datos del usuario</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th className="bg-light">C.I.:</th>
                      <td>{selectedUsuario.ci}</td>
                    </tr>
                    <tr>
                      <th className="bg-light">Nombres:</th>
                      <td>{selectedUsuario.nombre}</td>
                    </tr>
                    <tr>
                      <th className="bg-light">Apellidos:</th>
                      <td>
                        {selectedUsuario.paterno} {selectedUsuario.materno}
                      </td>
                    </tr>
                    <tr>
                      <th className="bg-light">Teléfono:</th>
                      <td>{selectedUsuario.celular}</td>
                    </tr>

                    <tr>
                      <th className="bg-light">Estado:</th>
                      <td>
                        <span
                          className={`badge ${selectedUsuario.estado === 0 ? "bg-danger" : "bg-success"}`}
                        >
                          {selectedUsuario.estado === 0 ? "Inactivo" : "Activo"}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
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

export default UsuariosPage;
