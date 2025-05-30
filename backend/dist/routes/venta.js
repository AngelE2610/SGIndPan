"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const venta_1 = require("../controllers/venta");
const validate_token_1 = __importDefault(require("../login/validate-token"));
const route = (0, express_1.Router)();
route.post('/', validate_token_1.default, venta_1.crearventa);
route.get('/:id', validate_token_1.default, venta_1.getAllVenta);
route.get('/promedio/:panaderiaId', validate_token_1.default, venta_1.getPromedioVentasPorMes);
route.get('/resumen/:panaderiaId/:mes', validate_token_1.default, venta_1.getVentasMes);
route.get('/:panaderiaId/:id', validate_token_1.default, venta_1.getAllVentasTurno);
exports.default = route;
