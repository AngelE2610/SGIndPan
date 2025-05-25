import { Router } from "express"
import { crearTurno, deleteTurno, getAllTurno, getTurno } from "../controllers/turno";
import validateToken from "../login/validate-token";


const router = Router();

router.post("/",crearTurno);
router.get("/detalles/:id",validateToken,getTurno);
router.get("/:id",validateToken,getAllTurno);
router.delete("/:id",validateToken,deleteTurno);


export default router;