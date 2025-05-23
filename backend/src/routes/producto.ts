import { Router } from "express"
import { crearProducto, deleteProducto, getAllProducto, getProductoPanaderia, updateProducto } from "../controllers/producto";

const router = Router();

router.post("/",crearProducto);
router.get('/:id',getProductoPanaderia);
router.get('/',getAllProducto);
router.put('/:id',updateProducto);
router.delete('/:id',deleteProducto);


export default router;