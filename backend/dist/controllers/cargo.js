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
exports.getAllCargo = exports.deleteCargo = exports.crearCargo = void 0;
const cargo_1 = require("../models/cargo");
const crearCargo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre } = req.body;
        if (!nombre) {
            return res.status(400).json({ msg: "El nombre del cargo es obligatorio" });
        }
        const nuevoCargo = yield cargo_1.Cargo.create({ nombre });
        return res.status(201).json({
            msg: "Cargo creado exitosamente",
            cargo: nuevoCargo,
        });
    }
    catch (error) {
        console.error("Error al crear cargo:", error);
        return res.status(500).json({
            msg: "Error interno al crear cargo",
            error: error.message,
        });
    }
});
exports.crearCargo = crearCargo;
const deleteCargo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const resultado = yield cargo_1.Cargo.destroy({ where: { id } });
        if (resultado === 0) {
            return res.status(404).json({ message: 'Cargo no encontrado' });
        }
        res.status(200).json({ message: 'Cargo eliminado correctamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar el Cargo' });
    }
});
exports.deleteCargo = deleteCargo;
const getAllCargo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cargoConDetalles = yield cargo_1.Cargo.findAll();
    return res.json(cargoConDetalles);
});
exports.getAllCargo = getAllCargo;
