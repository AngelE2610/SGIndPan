"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trabajador_1 = require("../controllers/trabajador");
const validate_token_1 = __importDefault(require("../login/validate-token"));
const router = (0, express_1.Router)();
router.post('/', trabajador_1.crearTrabajador);
router.get('/:id', validate_token_1.default, trabajador_1.getTrabajadorPanaderia);
router.put('/:id', trabajador_1.updateTrabajador);
router.delete('/:id', trabajador_1.deleteTrabajador);
exports.default = router;
