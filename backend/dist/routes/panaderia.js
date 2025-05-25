"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const panaderia_1 = require("../controllers/panaderia");
const router = (0, express_1.Router)();
router.post('/', panaderia_1.crearPanaderia);
router.get('/:id', panaderia_1.getPanaderia);
exports.default = router;
