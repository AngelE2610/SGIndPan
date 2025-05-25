"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cargo_1 = require("../controllers/cargo");
const router = (0, express_1.Router)();
router.post("/", cargo_1.crearCargo);
router.delete('/:id', cargo_1.deleteCargo);
router.get('/', cargo_1.getAllCargo);
exports.default = router;
