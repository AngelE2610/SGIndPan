"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const producto_1 = require("../controllers/producto");
const validate_token_1 = __importDefault(require("../login/validate-token"));
const router = (0, express_1.Router)();
router.post("/", validate_token_1.default, producto_1.crearProducto);
router.get('/:id', validate_token_1.default, producto_1.getProductoPanaderia);
router.get('/', validate_token_1.default, producto_1.getAllProducto);
router.put('/:id', validate_token_1.default, producto_1.updateProducto);
router.delete('/:id', validate_token_1.default, producto_1.deleteProducto);
exports.default = router;
