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
exports.AuthController = void 0;
const authService_1 = require("../services/authService");
const logger_1 = require("../utils/logger");
class AuthController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, role } = req.body;
            try {
                const user = yield authService_1.AuthService.register(username, password, role);
                logger_1.logger.log(`User registered: ${username}`);
                res.status(201).json({ message: 'User registered successfully', userId: user.id });
            }
            catch (error) {
                res.status(500).json({ message: 'Registration failed', error });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            try {
                const token = yield authService_1.AuthService.login(username, password);
                if (token) {
                    logger_1.logger.log(`User logged in: ${username}`);
                    res.json({ token });
                }
                else {
                    res.status(401).json({ message: 'Invalid username or password' });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Login failed', error });
            }
        });
    }
}
exports.AuthController = AuthController;
