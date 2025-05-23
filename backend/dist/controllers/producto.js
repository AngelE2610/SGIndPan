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
exports.deleteProducto = exports.getAllProducto = exports.getProductoPanaderia = exports.updateProducto = exports.crearProducto = void 0;
const models_1 = require("../models");
const crearProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, existencias, fechaAdquisicion, panaderiaId } = req.body;
        // Validar campos obligatorios
        if (!nombre || existencias == null || !fechaAdquisicion) {
            return res.status(400).json({ msg: "Faltan datos obligatorios" });
        }
        const fecha = new Date(fechaAdquisicion);
        // Crear producto en la base de datos
        const nuevoProducto = yield models_1.Producto.create({
            nombre,
            existencias,
            fechaAdquisicion: fecha,
            panaderiaId
        });
        return res.status(201).json({
            msg: "Producto creado exitosamente",
            producto: nuevoProducto
        });
    }
    catch (error) {
        console.error("Error al crear producto:", error);
        return res.status(500).json({
            msg: "Error interno al crear producto",
        });
    }
});
exports.crearProducto = crearProducto;
const updateProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { existencias } = req.body;
    const { id } = req.params;
    try {
        const producto = yield models_1.Producto.findByPk(id);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        const nuevasExistencias = producto.existencias + Number(existencias);
        yield producto.update({
            existencias: nuevasExistencias,
        });
        res.status(200).json(producto);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto' });
    }
});
exports.updateProducto = updateProducto;
const getProductoPanaderia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const productoConDetalles = yield models_1.Producto.findAll({ where: { panaderiaId: id } });
    if (!productoConDetalles) {
        return res.status(404).json({ msg: "Producto no encontrado" });
    }
    return res.json(productoConDetalles);
});
exports.getProductoPanaderia = getProductoPanaderia;
const getAllProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productoConDetalles = yield models_1.Producto.findAll();
    return res.json(productoConDetalles);
});
exports.getAllProducto = getAllProducto;
const deleteProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const resultado = yield models_1.Producto.destroy({ where: { id } });
        if (resultado === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto' });
    }
});
exports.deleteProducto = deleteProducto;
