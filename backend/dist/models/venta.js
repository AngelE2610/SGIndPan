"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Venta = void 0;
// models/Venta.js
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
exports.Venta = connection_1.default.define('Venta', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    fechaVenta: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    productoId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    turnoId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
});
