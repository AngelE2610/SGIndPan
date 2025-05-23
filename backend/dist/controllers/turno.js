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
exports.getTurno = exports.crearTurno = void 0;
const index_1 = require("../models/index");
const crearTurno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { numero, panaderiaId, productos } = req.body; // productos = [{ productoId, cantidadUsada }]
    try {
        const turno = yield index_1.Turno.create({ numero, panaderiaId });
        for (const { productoId, cantidadUsada } of productos) {
            // Asignar producto al turno
            yield index_1.TurnoProducto.create({ turnoId: turno.id, productoId, cantidadUsada });
            // Restar cantidadUsada de las existencias
            const producto = yield index_1.Producto.findByPk(productoId);
            producto.existencias -= cantidadUsada;
            yield producto.save();
        }
        res.status(201).json(turno);
    }
    catch (error) {
        res.status(500).json({ msg: 'Error al crear el turno' });
    }
});
exports.crearTurno = crearTurno;
const getTurno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const turnoConDetalles = yield index_1.Turno.findByPk(id, {
        include: [
            { model: index_1.Producto, through: { attributes: ['cantidadUsada'] } },
            { model: index_1.Trabajador },
        ]
    });
    if (!turnoConDetalles) {
        return res.status(404).json({ msg: "Turno perdido" });
    }
    return res.json(turnoConDetalles);
});
exports.getTurno = getTurno;
