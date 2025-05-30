import { Router } from "express";
import { crearventa, getAllVenta, getAllVentasTurno, getPromedioVentasPorMes, getVentasMes } from "../controllers/venta";
import validateToken from "../login/validate-token";



const route= Router();

route.post('/',validateToken,crearventa);
route.get('/:id',validateToken,getAllVenta);
route.get('/promedio/:panaderiaId',validateToken,getPromedioVentasPorMes);
route.get('/resumen/:panaderiaId/:mes',validateToken,getVentasMes);
route.get('/:panaderiaId/:id',validateToken,getAllVentasTurno);



export default route;