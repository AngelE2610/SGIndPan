import { Router } from "express";
import { crearventa, getAllVenta, getAllVentasTurno, getPromedioVentasPorMes, getVentasMes } from "../controllers/venta";



const route= Router();

route.post('/',crearventa);
route.get('/:id',getAllVenta);
route.get('/promedio/:panaderiaId',getPromedioVentasPorMes);
route.get('/resumen/:panaderiaId/:mes',getVentasMes);
route.get('/:panaderiaId/:id',getAllVentasTurno);



export default route;