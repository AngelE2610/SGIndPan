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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("../login/user-routes"));
const producto_1 = __importDefault(require("../routes/producto"));
const turno_1 = __importDefault(require("../routes/turno"));
const cargo_1 = __importDefault(require("../routes/cargo"));
const trabajador_1 = __importDefault(require("../routes/trabajador"));
const pan_1 = __importDefault(require("../routes/pan"));
const panaderia_1 = __importDefault(require("../routes/panaderia"));
const venta_1 = __importDefault(require("../routes/venta"));
const index_1 = require("./index");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT;
        this.listen();
        this.midleware();
        this.router();
        this.DBconnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('server escuchando peticiones en el puerto:' + this.port);
        });
    }
    midleware() {
        //parseo body
        this.app.use(express_1.default.json());
        //cors
        this.app.use((0, cors_1.default)());
    }
    router() {
        this.app.use('/SGIndPan/users', user_routes_1.default);
        this.app.use('/SGIndPan/productos', producto_1.default);
        this.app.use('/SGIndPan/turno', turno_1.default);
        this.app.use('/SGIndPan/cargo', cargo_1.default);
        this.app.use('/SGIndPan/trabajador', trabajador_1.default);
        this.app.use('/SGIndPan/pan', pan_1.default);
        this.app.use('/SGIndPan/panaderia', panaderia_1.default);
        this.app.use('/SGIndPan/ventas', venta_1.default);
    }
    DBconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield index_1.sequelize.sync({ alter: true });
            }
            catch (error) {
                console.log('error de conexion', error);
            }
        });
    }
}
exports.default = Server;
