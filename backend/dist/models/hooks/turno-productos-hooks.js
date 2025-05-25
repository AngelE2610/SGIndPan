"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTurnoProductoHooks = registerTurnoProductoHooks;
function registerTurnoProductoHooks(TurnoProducto) {
    TurnoProducto.afterCreate((turnoProducto, options) => __awaiter(this, void 0, void 0, function* () {
        const producto = yield turnoProducto.getProducto({
            transaction: options.transaction
        });
        if (producto.existencias < turnoProducto.cantidadUsada) {
            throw new Error(`No hay suficiente stock del producto ${producto.nombre}`);
        }
        yield producto.decrement('existencias', {
            by: turnoProducto.cantidadUsada,
            transaction: options.transaction
        });
    }));
}
