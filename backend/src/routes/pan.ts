import { Router } from "express";
import { crearTipoPan } from "../controllers/tipo-pan";


const router = Router();

router.post('/',crearTipoPan);

export default router;