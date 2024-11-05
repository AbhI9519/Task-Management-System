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
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const users = [];
class AuthService {
    static register(username_1, password_1) {
        return __awaiter(this, arguments, void 0, function* (username, password, role = 'user') {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const user = { id: Date.now().toString(), username, password: hashedPassword, role };
            users.push(user);
            return user;
        });
    }
    static login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = users.find(u => u.username === username);
            if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
                const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, config_1.config.secretKey, { expiresIn: '1h' });
                return token;
            }
            return null;
        });
    }
    static verifyToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, config_1.config.secretKey);
        }
        catch (_a) {
            return null;
        }
    }
}
exports.AuthService = AuthService;
