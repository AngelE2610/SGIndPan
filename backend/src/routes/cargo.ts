import { Router } from "express"
import { crearCargo, deleteCargo } from "../controllers/cargo";

const router = Router();

router.post("/",crearCargo);
router.delete('/:id',deleteCargo);


export default router;