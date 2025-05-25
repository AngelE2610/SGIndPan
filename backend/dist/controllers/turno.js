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
exports.deleteTurno = exports.getAllTurno = exports.getTurno = exports.crearTurno = void 0;
const index_1 = require("../models/index");
const crearTurno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { numero, panaderiaId, Productos, fecha } = req.body; // productos = [{ productoId, cantidadUsada }]
    try {
        const turno = yield index_1.Turno.create({ numero, panaderiaId, fecha });
        for (const { productoId, cantidadUsada } of Productos) {
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
        res.status(500).json({ msg: 'Error al crear el turno', error });
    }
});
exports.crearTurno = crearTurno;
const getTurno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const turno = yield index_1.Turno.findByPk(id, {
        include: [
            { model: index_1.Producto, through: { attributes: ['cantidadUsada'] } },
        ]
    });
    if (!turno) {
        return res.status(404).json({ msg: "Turno perdido" });
    }
    const trabajadores = yield index_1.Trabajador.findAll({
        where: { numeroTurno: turno.numero }
    });
    return res.json(Object.assign(Object.assign({}, turno.toJSON()), { trabajadores }));
});
exports.getTurno = getTurno;
const getAllTurno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const turno = yield index_1.Turno.findAll({ where: { panaderiaId: id }
    });
    if (!turno) {
        return res.status(404).json({ msg: "Turno perdido" });
    }
    const turnosConTrabajadores = yield Promise.all(turno.map((turno) => __awaiter(void 0, void 0, void 0, function* () {
        const trabajadores = yield index_1.Trabajador.findAll({
            where: { numeroTurno: turno.numero }
        });
        return Object.assign(Object.assign({}, turno.toJSON()), { trabajadores });
    })));
    return res.json(turnosConTrabajadores);
});
exports.getAllTurno = getAllTurno;
const deleteTurno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const resultado = yield index_1.Turno.destroy({ where: { id } });
        if (resultado === 0) {
            return res.status(404).json({ message: 'Turno no encontrado' });
        }
        res.status(200).json({ message: 'Turno eliminado correctamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar el Turno' });
    }
});
exports.deleteTurno = deleteTurno;
