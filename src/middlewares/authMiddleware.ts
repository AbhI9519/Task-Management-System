import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';

// Define a custom request interface that includes 'user'
interface AuthenticatedRequest extends Request {
    user?: any;
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.sendStatus(401);
        return; // Explicit return to ensure void
    }

    jwt.verify(token, config.secretKey, (err, user) => {
        if (err) {
            res.sendStatus(403);
            return; // Explicit return to ensure void
        }
        
        req.user = user;  // Attach user info to the request
        next(); // Explicit next() call when token is valid
    });
};