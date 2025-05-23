import { Router } from "express"
import { crearTurno, getTurno } from "../controllers/turno";
import validateToken from "../login/validate-token";


const router = Router();

router.post("/",crearTurno);
router.get("/:id",validateToken,getTurno)


export default router;