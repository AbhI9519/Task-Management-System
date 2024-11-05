import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { logger } from '../utils/logger';

export class AuthController {
    static async register(req: Request, res: Response) {
        const { username, password, role } = req.body;
        try {
            const user = await AuthService.register(username, password, role);
            logger.log(`User registered: ${username}`);
            res.status(201).json({ message: 'User registered successfully', userId: user.id });
        } catch (error) {
            res.status(500).json({ message: 'Registration failed', error });
        }
    }

    static async login(req: Request, res: Response) {
        const { username, password } = req.body;
        try {
            const token = await AuthService.login(username, password);
            if (token) {
                logger.log(`User logged in: ${username}`);
                res.json({ token });
            } else {
                res.status(401).json({ message: 'Invalid username or password' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Login failed', error });
        }
    }
}