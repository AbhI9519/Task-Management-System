"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const taskService_1 = require("../services/taskService");
const logger_1 = require("../utils/logger");
class TaskController {
    static createTask(req, res) {
        const userId = req.user.id;
        const { description } = req.body;
        const task = taskService_1.TaskService.createTask(userId, description);
        logger_1.logger.log(`Task created by user ${userId}`);
        res.status(201).json(task);
    }
    static getUserTasks(req, res) {
        const userId = req.user.id;
        const tasks = taskService_1.TaskService.getUserTasks(userId);
        res.status(200).json(tasks);
    }
    static completeTask(req, res) {
        const userId = req.user.id;
        const { taskId } = req.params;
        const completed = taskService_1.TaskService.completeTask(taskId, userId);
        if (completed) {
            logger_1.logger.log(`Task ${taskId} completed by user ${userId}`);
            res.sendStatus(204);
        }
        else {
            res.sendStatus(404);
        }
    }
}
exports.TaskController = TaskController;
