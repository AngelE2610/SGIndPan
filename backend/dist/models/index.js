"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurnoProducto = exports.User = exports.Panaderia = exports.Venta = exports.Turno = exports.Producto = exports.TipoPan = exports.Trabajador = exports.Cargo = exports.sequelize = void 0;
const connection_1 = __importDefault(require("../database/connection"));
exports.sequelize = connection_1.default;
const cargo_1 = require("./cargo");
Object.defineProperty(exports, "Cargo", { enumerable: true, get: function () { return cargo_1.Cargo; } });
const trabajador_1 = require("./trabajador");
Object.defineProperty(exports, "Trabajador", { enumerable: true, get: function () { return trabajador_1.Trabajador; } });
const tipo_pan_1 = require("./tipo-pan");
Object.defineProperty(exports, "TipoPan", { enumerable: true, get: function () { return tipo_pan_1.TipoPan; } });
const producto_1 = require("./producto");
Object.defineProperty(exports, "Producto", { enumerable: true, get: function () { return producto_1.Producto; } });
const turno_1 = require("./turno");
Object.defineProperty(exports, "Turno", { enumerable: true, get: function () { return turno_1.Turno; } });
const venta_1 = require("./venta");
Object.defineProperty(exports, "Venta", { enumerable: true, get: function () { return venta_1.Venta; } });
const turno_producto_1 = require("./turno-producto");
Object.defineProperty(exports, "TurnoProducto", { enumerable: true, get: function () { return turno_producto_1.TurnoProducto; } });
const panaderia_1 = require("./panaderia");
Object.defineProperty(exports, "Panaderia", { enumerable: true, get: function () { return panaderia_1.Panaderia; } });
const user_model_1 = require("../login/user-model");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_model_1.User; } });
// Definir asociaciones
//Panaderia 1:N Turno
panaderia_1.Panaderia.hasMany(turno_1.Turno, { foreignKey: 'panaderiaId' });
turno_1.Turno.belongsTo(panaderia_1.Panaderia, { foreignKey: 'panaderiaId' });
//Panaderia 1:N Producto
panaderia_1.Panaderia.hasMany(producto_1.Producto, { foreignKey: 'panaderiaId' });
producto_1.Producto.belongsTo(panaderia_1.Panaderia, { foreignKey: 'panaderiaId' });
//Panaderia 1:N Trabajador
panaderia_1.Panaderia.hasMany(trabajador_1.Trabajador, { foreignKey: 'panaderiaId' });
trabajador_1.Trabajador.belongsTo(panaderia_1.Panaderia, { foreignKey: 'panaderiaId' });
//user 1:N panaderia
user_model_1.User.hasMany(panaderia_1.Panaderia, { foreignKey: 'userId' });
panaderia_1.Panaderia.belongsTo(user_model_1.User, { foreignKey: 'userId' });
// Trabajador N:1 Cargo
cargo_1.Cargo.hasMany(trabajador_1.Trabajador, { foreignKey: 'cargoId' });
trabajador_1.Trabajador.belongsTo(cargo_1.Cargo, { foreignKey: 'cargoId' });
// Turno N:M Producto
turno_1.Turno.belongsToMany(producto_1.Producto, { through: turno_producto_1.TurnoProducto, foreignKey: 'turnoId' });
producto_1.Producto.belongsToMany(turno_1.Turno, { through: turno_producto_1.TurnoProducto, foreignKey: 'productoId' });
