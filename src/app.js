"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = require("./controllers/taskController");
const authController_1 = require("./controllers/authController");
const userController_1 = require("./controllers/userController");
const authMiddleware_1 = require("./middlewares/authMiddleware");
const errorHandler_1 = require("./middlewares/errorHandler");
const fileHandler_1 = require("./utils/fileHandler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Rotate logs on application start
(0, fileHandler_1.rotateLogs)();
// Auth routes
app.post('/register', authController_1.AuthController.register);
app.post('/login', authController_1.AuthController.login);
// User routes (protected by authentication middleware)
app.get('/user/profile', authMiddleware_1.authenticateToken, userController_1.UserController.getUserProfile);
app.put('/user/profile', authMiddleware_1.authenticateToken, userController_1.UserController.updateUserProfile);
app.delete('/user/delete', authMiddleware_1.authenticateToken, userController_1.UserController.deleteUserAccount);
// Task routes
app.post('/tasks', authMiddleware_1.authenticateToken, taskController_1.TaskController.createTask);
app.get('/tasks', authMiddleware_1.authenticateToken, taskController_1.TaskController.getUserTasks);
app.patch('/tasks/:taskId/complete', authMiddleware_1.authenticateToken, taskController_1.TaskController.completeTask);
// Error handling middleware
app.use(errorHandler_1.errorHandler);
exports.default = app;
