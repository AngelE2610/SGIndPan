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
exports.crearTipoPan = void 0;
const turno_1 = require("../models/turno");
const models_1 = require("../models");
const crearTipoPan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, turnoId, cantidad } = req.body;
        if (!nombre || !turnoId) {
            return res.status(400).json({ msg: "Faltan datos obligatorios" });
        }
        // Validar que el turno exista (opcional)
        if (turnoId) {
            const turno = yield turno_1.Turno.findByPk(turnoId);
            if (!turno) {
                return res.status(404).json({ msg: "Turno no encontrado" });
            }
        }
        const nuevoPan = yield models_1.TipoPan.create({
            nombre,
            cantidad: cantidad,
            turnoId: turnoId,
        });
        return res.status(201).json({
            msg: "Nuevo pan  creado exitosamente",
            TipoPan: nuevoPan,
        });
    }
    catch (error) {
        console.error("Error al crear pan:", error);
        return res.status(500).json({
            msg: "Error interno al crear pan",
            error: error.message,
        });
    }
});
exports.crearTipoPan = crearTipoPan;
