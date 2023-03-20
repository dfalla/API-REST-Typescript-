"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("mysql");
const connection = (0, mysql_1.createConnection)({
    host: 'localhost',
    user: 'root',
    password: '16falladapeta03',
    database: 'inventario'
});
exports.default = connection;
