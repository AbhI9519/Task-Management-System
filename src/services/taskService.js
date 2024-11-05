"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const uuid_1 = require("uuid");
const tasks = [];
class TaskService {
    static createTask(userId, description) {
        const task = { id: (0, uuid_1.v4)(), userId, description, completed: false };
        tasks.push(task);
        return task;
    }
    static getUserTasks(userId) {
        return tasks.filter(task => task.userId === userId);
    }
    static completeTask(taskId, userId) {
        const task = tasks.find(t => t.id === taskId && t.userId === userId);
        if (task) {
            task.completed = true;
            return true;
        }
        return false;
    }
}
exports.TaskService = TaskService;
