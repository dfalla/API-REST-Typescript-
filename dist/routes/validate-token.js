"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    const headerToken = req.headers['authorization'];
    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        // Tiene token
        const bearerToken = headerToken.slice(7);
        try {
            const tokenValido = jsonwebtoken_1.default.verify(bearerToken, process.env.KEY_SECRET || '=?2{s>%qGmnG?5t)');
            console.log(tokenValido);
            next();
        }
        catch (error) {
            res.status(400).json({
                error: 'token no válido'
            });
        }
    }
    else {
        res.status(400).json({
            error: 'Acceso denegado'
        });
    }
    console.log(headerToken);
};
exports.default = validateToken;
