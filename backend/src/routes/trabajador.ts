import { Router } from "express";
import { crearTrabajador, deleteTrabajador, getTrabajadorPanaderia, updateTrabajador } from "../controllers/trabajador";



const router = Router();

router.post('/',crearTrabajador);
router.get('/:id',getTrabajadorPanaderia);
router.put('/:id',updateTrabajador);
router.delete('/:id',deleteTrabajador);

export default router;