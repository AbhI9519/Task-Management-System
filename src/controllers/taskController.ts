import { Request, Response } from 'express';
import { TaskService } from '../services/taskService';
import { logger } from '../utils/logger';

export class TaskController {
    static createTask(req: Request, res: Response) {
        const userId = (req as any).user.id;
        const { description } = req.body;
        const task = TaskService.createTask(userId, description);
        logger.log(`Task created by user ${userId}`);
        res.status(201).json(task);
    }

    static getUserTasks(req: Request, res: Response) {
        const userId = (req as any).user.id;
        const tasks = TaskService.getUserTasks(userId);
        res.status(200).json(tasks);
    }

    static completeTask(req: Request, res: Response) {
        const userId = (req as any).user.id;
        const { taskId } = req.params;
        const completed = TaskService.completeTask(taskId, userId);
        if (completed) {
            logger.log(`Task ${taskId} completed by user ${userId}`);
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    }
}