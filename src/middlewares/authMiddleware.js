"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const authenticateToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.sendStatus(401);
        return; // Explicit return to ensure void
    }
    jsonwebtoken_1.default.verify(token, config_1.config.secretKey, (err, user) => {
        if (err) {
            res.sendStatus(403);
            return; // Explicit return to ensure void
        }
        req.user = user; // Attach user info to the request
        next(); // Explicit next() call when token is valid
    });
};
exports.authenticateToken = authenticateToken;
