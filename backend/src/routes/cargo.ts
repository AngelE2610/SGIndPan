import { Router } from "express"
import { crearCargo, deleteCargo, getAllCargo } from "../controllers/cargo";

const router = Router();

router.post("/",crearCargo);
router.delete('/:id',deleteCargo);
router.get('/',getAllCargo);


export default router;