import { Router } from "express";
import { crearTrabajador, deleteTrabajador, getTrabajadorPanaderia, updateTrabajador } from "../controllers/trabajador";
import validateToken from "../login/validate-token";



const router = Router();

router.post('/',validateToken,crearTrabajador);
router.get('/:id',validateToken,getTrabajadorPanaderia);
router.put('/:id',validateToken,updateTrabajador);
router.delete('/:id',validateToken,deleteTrabajador);

export default router;