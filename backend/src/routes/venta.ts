import { Router } from "express";
import { crearventa, getAllVenta, getAllVentasTurno } from "../controllers/venta";



const route= Router();

route.post('/',crearventa);
route.get('/:id',getAllVenta);
route.get('/:panaderiaId/:id',getAllVentasTurno);


export default route;