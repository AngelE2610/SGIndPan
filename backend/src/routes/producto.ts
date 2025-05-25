import { Router } from "express"
import { crearProducto, deleteProducto, getAllProducto, getProductoPanaderia, updateProducto } from "../controllers/producto";
import validateToken from "../login/validate-token";

const router = Router();

router.post("/",validateToken,crearProducto);
router.get('/:id',validateToken,getProductoPanaderia);
router.get('/',validateToken,getAllProducto);
router.put('/:id',validateToken,updateProducto);
router.delete('/:id',validateToken,deleteProducto);


export default router;