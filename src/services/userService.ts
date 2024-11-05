import { User } from '../models/user';

// In-memory user store for demonstration (replace with database in production)
const users: User[] = [];

export class UserService {
    static async getUserById(userId: string): Promise<User | null> {
        return users.find(user => user.id === userId) || null;
    }

    static async updateUser(userId: string, updatedData: Partial<User>): Promise<User | null> {
        const user = users.find(user => user.id === userId);
        if (user) {
            Object.assign(user, updatedData);
            return user;
        }
        return null;
    }

    static async deleteUser(userId: string): Promise<boolean> {
        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex !== -1) {
            users.splice(userIndex, 1);
            return true;
        }
        return false;
    }
}