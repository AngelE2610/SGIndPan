import { Router } from "express";
import { crearTrabajador, deleteTrabajador, getTrabajadorPanaderia, updateTrabajador } from "../controllers/trabajador";
import validateToken from "../login/validate-token";



const router = Router();

router.post('/',crearTrabajador);
router.get('/:id',validateToken,getTrabajadorPanaderia);
router.put('/:id',updateTrabajador);
router.delete('/:id',deleteTrabajador);

export default router;