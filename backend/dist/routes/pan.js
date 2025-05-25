"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipo_pan_1 = require("../controllers/tipo-pan");
const router = (0, express_1.Router)();
router.post('/', tipo_pan_1.crearTipoPan);
exports.default = router;
