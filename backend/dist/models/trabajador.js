"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trabajador = void 0;
// models/Trabajador.js
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const cargo_1 = require("./cargo");
exports.Trabajador = connection_1.default.define('Trabajador', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    salario: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    cargoId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: cargo_1.Cargo,
            key: 'id'
        }
    },
    numeroTurno: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    panaderiaId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
});
