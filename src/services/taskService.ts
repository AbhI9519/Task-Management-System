import { Task } from '../models/task';
import { v4 as uuidv4 } from 'uuid';

const tasks: Task[] = [];

export class TaskService {
    static createTask(userId: string, description: string): Task {
        const task = { id: uuidv4(), userId, description, completed: false };
        tasks.push(task);
        return task;
    }

    static getUserTasks(userId: string): Task[] {
        return tasks.filter(task => task.userId === userId);
    }

    static completeTask(taskId: string, userId: string): boolean {
        const task = tasks.find(t => t.id === taskId && t.userId === userId);
        if (task) {
            task.completed = true;
            return true;
        }
        return false;
    }
}