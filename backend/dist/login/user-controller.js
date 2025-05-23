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
exports.login = exports.newUser = void 0;
const user_model_1 = require("./user-model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield user_model_1.User.findOne({ where: { username: username } });
    if (user) {
        return res.status(400).json({
            msg: `Ya existe el usuario ${username}`
        });
    }
    const passwordCifrada = yield bcrypt_1.default.hash(password, 10);
    try {
        yield user_model_1.User.create({
            username: username,
            password: passwordCifrada
        });
        res.json({
            msg: `Usuario ${username} creado con exito`,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error'
        });
    }
});
exports.newUser = newUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield user_model_1.User.findOne({ where: { username: username } });
    if (!user) {
        return res.status(400).json({
            msg: `No existe el usuario ${username} en la BD`
        });
    }
    const passwordAceptada = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordAceptada) {
        return res.status(400).json({
            msg: `La contraseña introducida es incorrecta`
        });
    }
    const token = jsonwebtoken_1.default.sign({
        username: username
    }, process.env.SECRET_KEY || 'ares123');
    res.json({ token, userId: user.id });
});
exports.login = login;
