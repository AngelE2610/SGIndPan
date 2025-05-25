"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producto = void 0;
// models/Producto.js
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
exports.Producto = connection_1.default.define('Producto', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    existencias: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    fechaAdquisicion: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    panaderiaId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
});
