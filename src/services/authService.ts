import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { User } from '../models/user';

const users: User[] = [];

export class AuthService {
    static async register(username: string, password: string, role: string = 'user'): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { id: Date.now().toString(), username, password: hashedPassword, role };
        users.push(user);
        return user;
    }

    static async login(username: string, password: string): Promise<string | null> {
        const user = users.find(u => u.username === username);
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id, role: user.role }, config.secretKey, { expiresIn: '1h' });
            return token;
        }
        return null;
    }

    static verifyToken(token: string) {
        try {
            return jwt.verify(token, config.secretKey);
        } catch {
            return null;
        }
    }
}