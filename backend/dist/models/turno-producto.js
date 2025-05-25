"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurnoProducto = void 0;
// models/TurnoProducto.js
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
exports.TurnoProducto = connection_1.default.define('TurnoProducto', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    turnoId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    productoId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    cantidadUsada: { type: sequelize_1.DataTypes.INTEGER, allowNull: false }
    // Puedes agregar otros campos si quieres, como observaciones, etc.
});
