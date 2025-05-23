"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Panaderia = void 0;
// models/Panaderia.js
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
exports.Panaderia = connection_1.default.define('Panaderia', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
});
