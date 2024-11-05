import express from 'express';
import { TaskController } from './controllers/taskController';
import { AuthController } from './controllers/authController';
import { UserController } from './controllers/userController';
import { authenticateToken } from './middlewares/authMiddleware';
import { errorHandler } from './middlewares/errorHandler';
import { rotateLogs } from './utils/fileHandler';

const app = express();
app.use(express.json());

// Rotate logs on application start
rotateLogs();

// Auth routes
app.post('/register', AuthController.register);
app.post('/login', AuthController.login);

// User routes (protected by authentication middleware)
app.get('/user/profile', authenticateToken, UserController.getUserProfile);
app.put('/user/profile', authenticateToken, UserController.updateUserProfile);
app.delete('/user/delete', authenticateToken, UserController.deleteUserAccount);

// Task routes
app.post('/tasks', authenticateToken, TaskController.createTask);
app.get('/tasks', authenticateToken, TaskController.getUserTasks);
app.patch('/tasks/:taskId/complete', authenticateToken, TaskController.completeTask);

// Error handling middleware
app.use(errorHandler);

export default app;