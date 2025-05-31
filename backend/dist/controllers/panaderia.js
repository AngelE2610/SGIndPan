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
exports.getPanaderia = exports.crearPanaderia = void 0;
const panaderia_1 = require("../models/panaderia");
const crearPanaderia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, userId } = req.body;
    try {
        // Validar que el nombre esté presente
        if (!nombre || !userId) {
            return res.status(400).json({ error: 'Faltan datos necesarios' });
        }
        // Crear la panadería
        const nuevaPanaderia = yield panaderia_1.Panaderia.create({ nombre: nombre, userId: userId });
        // Responder con la panadería creada
        res.status(201).json(nuevaPanaderia);
    }
    catch (error) {
        res.status(500).json({ msg: 'Error al crear panaderia' });
    }
});
exports.crearPanaderia = crearPanaderia;
const getPanaderia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const panaderiaConDetalles = yield panaderia_1.Panaderia.findOne({ where: { userId: id } });
    if (!panaderiaConDetalles) {
        return res.status(404).json({ msg: "Panaderia no encontrada" });
    }
    return res.json(panaderiaConDetalles);
});
exports.getPanaderia = getPanaderia;
