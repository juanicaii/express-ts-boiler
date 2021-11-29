"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sessionController_1 = __importDefault(require("../../controllers/sessionController"));
const router = (0, express_1.default)();
router.post('/login', sessionController_1.default.login);
exports.default = router;
