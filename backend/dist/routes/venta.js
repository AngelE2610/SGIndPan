"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const venta_1 = require("../controllers/venta");
const route = (0, express_1.Router)();
route.post('/', venta_1.crearventa);
route.get('/:id', venta_1.getAllVenta);
route.get('/:panaderiaId/:id', venta_1.getAllVentasTurno);
exports.default = route;
