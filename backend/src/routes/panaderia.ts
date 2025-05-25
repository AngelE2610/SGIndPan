import { Router } from "express";
import { crearPanaderia, getPanaderia } from "../controllers/panaderia";


const router = Router();

router.post('/',crearPanaderia);
router.get('/:id',getPanaderia)

export default router;