"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const turno_1 = require("../controllers/turno");
const validate_token_1 = __importDefault(require("../login/validate-token"));
const router = (0, express_1.Router)();
router.post("/", turno_1.crearTurno);
router.get("/detalles/:id", validate_token_1.default, turno_1.getTurno);
router.get("/:id", validate_token_1.default, turno_1.getAllTurno);
router.delete("/:id", validate_token_1.default, turno_1.deleteTurno);
exports.default = router;
