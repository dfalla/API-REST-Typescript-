"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("../db/connection"));
const producto_routes_1 = __importDefault(require("../routes/producto.routes"));
const default_routes_1 = __importDefault(require("../routes/default.routes"));
const usuario_routes_1 = __importDefault(require("../routes/usuario.routes"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.conectDB();
        this.cors();
        this.middlewares();
        this.routes();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
    conectDB() {
        connection_1.default.connect((err) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Base de datos conectada');
            }
        });
    }
    routes() {
        this.app.use('/', default_routes_1.default);
        this.app.use('/api/productos', producto_routes_1.default);
        this.app.use('/api/usuarios', usuario_routes_1.default);
    }
    middlewares() {
        this.app.use(express_1.default.json());
    }
    cors() {
        this.app.use((0, cors_1.default)());
    }
}
exports.default = Server;
