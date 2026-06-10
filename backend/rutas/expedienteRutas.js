import express from "express";
import { 
    obtenerExpedientes, 
    registrarExpediente, 
    actualizarExpediente, 
    eliminarExpediente 
} from "../controladores/expedienteControlador.js";
import { verificarDispositivoUnico, verificarToken } from "../config/authMiddleware.js";

const router = express.Router();

router.get("/", verificarToken, obtenerExpedientes);
router.post("/", verificarDispositivoUnico, registrarExpediente);
router.put("/:id", verificarToken, actualizarExpediente);
router.delete("/:id", verificarToken, eliminarExpediente);

export default router;

