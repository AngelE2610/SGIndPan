"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPromedioVentasPorMes = exports.getVentasMes = exports.getAllVentasTurno = exports.getAllVenta = exports.crearventa = void 0;
const models_1 = require("../models");
const sequelize_1 = require("sequelize");
const crearventa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cantidad, fechaVenta, numeroTurno, panaderiaId } = req.body;
    try {
        if (!cantidad || !fechaVenta || !numeroTurno || !panaderiaId) {
            return res.status(400).json({
                msg: 'Faltan datos necesarios '
            });
        }
        const panaderia = yield models_1.Panaderia.findByPk(panaderiaId);
        if (!panaderia) {
            return res.status(404).json({ msg: "panaderia no encontrada" });
        }
        const turno = yield models_1.Turno.findOne({ where: { numero: numeroTurno } });
        if (!turno) {
            return res.status(404).json({ msg: "Turno no encontrado" });
        }
        const venta = yield models_1.Venta.create({
            cantidad,
            fechaVenta,
            numeroTurno,
            panaderiaId
        });
        return res.status(200).json({
            msg: 'Venta creada correctamente ',
            venta: venta
        });
    }
    catch (error) {
        return res.status(500).json({ msg: 'Error al crear la venta', error });
    }
});
exports.crearventa = crearventa;
const getAllVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const panaderia = yield models_1.Panaderia.findByPk(id);
        if (!panaderia) {
            return res.status(404).json({ msg: "panaderia no encontrada" });
        }
        const ventas = yield models_1.Venta.findAll({ where: { panaderiaId: id } });
        return res.json(ventas);
    }
    catch (error) {
        return res.status(500).json({ msg: 'Error al bsucar ventas', error });
    }
});
exports.getAllVenta = getAllVenta;
const getAllVentasTurno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { panaderiaId, id } = req.params;
    try {
        const panaderia = yield models_1.Panaderia.findByPk(panaderiaId);
        if (!panaderia) {
            return res.status(404).json({ msg: "panaderia no encontrada" });
        }
        const turno = yield models_1.Turno.findOne({ where: { numero: id } });
        if (!turno) {
            return res.status(404).json({ msg: "Turno no encontrado" });
        }
        const ventas = yield models_1.Venta.findAll({ where: { panaderiaId: panaderiaId, numeroTurno: id } });
        return res.json(ventas);
    }
    catch (error) {
        return res.status(500).json({ msg: 'Error al buscar ventas', error });
    }
});
exports.getAllVentasTurno = getAllVentasTurno;
const getVentasMes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { panaderiaId, mes } = req.params;
    try {
        const mesNum = parseInt(mes, 10);
        if (mesNum < 1 || mesNum > 12) {
            return res.status(400).json({ msg: "Mes inválido. Debe ser entre 1 y 12" });
        }
        const panaderia = yield models_1.Panaderia.findByPk(panaderiaId);
        if (!panaderia) {
            return res.status(404).json({ msg: "panaderia no encontrada" });
        }
        // Obtener el primer y último día del mes
        const year = new Date().getFullYear(); // O el año que quieras
        const startDate = new Date(year, mesNum - 1, 1);
        const endDate = new Date(year, mesNum, 0, 23, 59, 59, 999);
        // Consulta para filtrar ventas del mes y panadería
        const ventas = yield models_1.Venta.findAll({
            where: {
                panaderiaId: panaderiaId,
                fechaVenta: {
                    [sequelize_1.Op.gte]: startDate,
                    [sequelize_1.Op.lt]: endDate
                }
            }
        });
        // Calcular suma de cantidad y cantidad de ventas
        const sumaCantidad = ventas.reduce((sum, venta) => sum + venta.cantidad, 0);
        const cantidadVentas = ventas.length;
        const promedioVentas = sumaCantidad / cantidadVentas;
        // Respuesta
        res.json({
            sumaCantidad,
            cantidadVentas,
            promedioVentas
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener las ventas del mes" });
    }
});
exports.getVentasMes = getVentasMes;
const getPromedioVentasPorMes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { panaderiaId } = req.params;
    try {
        // Validar que la panadería existe
        const panaderia = yield models_1.Panaderia.findByPk(panaderiaId);
        if (!panaderia) {
            return res.status(404).json({ msg: "Panadería no encontrada" });
        }
        const year = new Date().getFullYear();
        const mesActual = new Date().getMonth() + 1; // 1-12
        const resultados = {};
        for (let mes = 1; mes <= mesActual; mes++) {
            const startDate = new Date(year, mes - 1, 1);
            const endDate = new Date(year, mes, 0, 23, 59, 59, 999);
            const ventas = yield models_1.Venta.findAll({
                where: {
                    panaderiaId: panaderiaId,
                    fechaVenta: {
                        [sequelize_1.Op.gte]: startDate,
                        [sequelize_1.Op.lt]: endDate
                    }
                }
            });
            const sumaCantidad = ventas.reduce((sum, venta) => sum + venta.cantidad, 0);
            const cantidadVentas = ventas.length;
            const promedio = cantidadVentas > 0 ? sumaCantidad / cantidadVentas : 0;
            // Usar el nombre del mes
            const nombreMes = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'][mes - 1];
            resultados[nombreMes] = promedio;
        }
        res.json(resultados);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener los promedios por mes" });
    }
});
exports.getPromedioVentasPorMes = getPromedioVentasPorMes;
