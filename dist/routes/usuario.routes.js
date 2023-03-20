"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usario_controller_1 = require("../controllers/usario.controller");
const router = (0, express_1.Router)();
router.post('/', usario_controller_1.addUsuario);
router.post('/login', usario_controller_1.loginUser);
exports.default = router;
