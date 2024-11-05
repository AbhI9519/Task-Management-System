import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { logger } from '../utils/logger';

export class UserController {
    // Fetch user profile details
    static async getUserProfile(req: Request, res: Response) {
        try {
            const userId = (req as any).user.id;
            const user = await UserService.getUserById(userId);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch user profile', error });
        }
    }

    // Update user details
    static async updateUserProfile(req: Request, res: Response) {
        try {
            const userId = (req as any).user.id;
            const updatedData = req.body;
            const updatedUser = await UserService.updateUser(userId, updatedData);
            if (updatedUser) {
                logger.log(`User profile updated for userId: ${userId}`);
                res.status(200).json({ message: 'User profile updated successfully', updatedUser });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Failed to update user profile', error });
        }
    }

    // Delete user account
    static async deleteUserAccount(req: Request, res: Response) {
        try {
            const userId = (req as any).user.id;
            const isDeleted = await UserService.deleteUser(userId);
            if (isDeleted) {
                logger.log(`User account deleted for userId: ${userId}`);
                res.status(200).json({ message: 'User account deleted successfully' });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete user account', error });
        }
    }
}