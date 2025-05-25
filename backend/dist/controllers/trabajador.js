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
exports.deleteTrabajador = exports.getTrabajadorPanaderia = exports.updateTrabajador = exports.crearTrabajador = void 0;
const trabajador_1 = require("../models/trabajador");
const cargo_1 = require("../models/cargo");
const turno_1 = require("../models/turno");
const crearTrabajador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, salario, cargoId, numeroTurno, panaderiaId } = req.body;
        if (!nombre || salario == null || !cargoId || !numeroTurno) {
            return res.status(400).json({ msg: "Faltan datos obligatorios (nombre, salario, cargoId)" });
        }
        // Validar que el cargo exista
        const cargo = yield cargo_1.Cargo.findByPk(cargoId);
        if (!cargo) {
            return res.status(404).json({ msg: "Cargo no encontrado" });
        }
        const turno = yield turno_1.Turno.findOne({ where: { numero: numeroTurno } });
        if (!turno) {
            return res.status(404).json({ msg: "Turno no encontrado" });
        }
        const nuevoTrabajador = yield trabajador_1.Trabajador.create({
            nombre,
            salario,
            cargoId,
            numeroTurno: numeroTurno,
            panaderiaId: panaderiaId
        });
        return res.status(201).json({
            msg: "Trabajador creado exitosamente",
            trabajador: nuevoTrabajador,
        });
    }
    catch (error) {
        console.error("Error al crear trabajador:", error);
        return res.status(500).json({
            msg: "Error interno al crear trabajador",
            error: error.message,
        });
    }
});
exports.crearTrabajador = crearTrabajador;
const updateTrabajador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { salario, cargoId, numeroTurno } = req.body;
    try {
        const trabajador = yield trabajador_1.Trabajador.findByPk(id);
        if (!trabajador) {
            return res.status(404).json({ message: 'Trabajador no encontrado' });
        }
        yield trabajador.update({ salario: salario, cargoId: cargoId, numeroTurno: numeroTurno });
        res.status(200).json(trabajador);
    }
    catch (error) {
        res.status(500).json({ msg: 'Error al actualizar trabajador' });
    }
});
exports.updateTrabajador = updateTrabajador;
const getTrabajadorPanaderia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const trabajadorConDetalles = yield trabajador_1.Trabajador.findAll({ where: { panaderiaId: id }, include: [
            { model: cargo_1.Cargo },
        ] });
    if (!trabajadorConDetalles) {
        return res.status(404).json({ msg: "Trabajador no encontrado" });
    }
    return res.json(trabajadorConDetalles);
});
exports.getTrabajadorPanaderia = getTrabajadorPanaderia;
const deleteTrabajador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const resultado = yield trabajador_1.Trabajador.destroy({ where: { id } });
        if (resultado === 0) {
            return res.status(404).json({ message: 'Trabajador no encontrado' });
        }
        res.status(200).json({ message: 'Trabajador eliminado correctamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar el Trabajador' });
    }
});
exports.deleteTrabajador = deleteTrabajador;
