"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    const headerToken = req.headers['authorization'];
    if (headerToken != undefined && headerToken.startsWith('Bearer')) {
        //tiene token 
        try {
            //quitandole los primeros 7 caracteres que no interesan
            const barerToken = headerToken.slice(7);
            jsonwebtoken_1.default.verify(barerToken, process.env.SECRET_KEY || 'ares123');
            next();
        }
        catch (error) {
            res.status(401).json({
                msg: 'token invalido'
            });
        }
    }
    else {
        res.status(401).json({
            msg: 'Acceso denegado'
        });
    }
};
exports.default = validateToken;
