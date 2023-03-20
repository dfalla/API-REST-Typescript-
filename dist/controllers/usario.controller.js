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
exports.loginUser = exports.addUsuario = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const addUsuario = (req, res) => {
    const { nombre, password } = req.body;
    connection_1.default.query('SELECT * FROM usuarios WHERE nombre = ' + connection_1.default.escape(nombre), (err, data) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.log(err);
        }
        else {
            if (data.length === 0) {
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                connection_1.default.query('INSERT INTO usuarios SET ?', { nombre, password: hashedPassword }, (err, data) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.json({
                            msg: 'Add Usuario',
                        });
                    }
                });
            }
            else {
                res.json({
                    msg: 'El usuario ya está registrado, por favor pruebe con otro usuario',
                });
            }
            console.log(data);
        }
    }));
};
exports.addUsuario = addUsuario;
const loginUser = (req, res) => {
    const { nombre, password } = req.body;
    connection_1.default.query('SELECT * FROM usuarios WHERE nombre = ' + connection_1.default.escape(nombre), (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            if (data.length === 0) {
                // No existe el usuario en la base de datos
                res.json({
                    msg: 'No existe el usuario en la base de datos'
                });
            }
            else {
                // Existe
                const userPassword = data[0].password;
                console.log(userPassword);
                // Comparamos el password
                bcrypt_1.default.compare(password, userPassword).then(result => {
                    if (result) {
                        // Login exitoso -- Generamos el token
                        const token = jsonwebtoken_1.default.sign({
                            nombre: nombre
                        }, process.env.KEY_SECRET || '=?2{s>%qGmnG?5t)', {
                            expiresIn: '2h'
                        });
                        res.json({
                            usuario: nombre,
                            token: token
                        });
                    }
                    else {
                        // Password incorrecto
                        res.json({
                            msg: 'Password incorrecto'
                        });
                    }
                });
            }
            console.log(data);
        }
    });
};
exports.loginUser = loginUser;
