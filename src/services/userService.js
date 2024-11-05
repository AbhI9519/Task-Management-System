"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
// In-memory user store for demonstration (replace with database in production)
const users = [];
class UserService {
    static getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return users.find(user => user.id === userId) || null;
        });
    }
    static updateUser(userId, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = users.find(user => user.id === userId);
            if (user) {
                Object.assign(user, updatedData);
                return user;
            }
            return null;
        });
    }
    static deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userIndex = users.findIndex(user => user.id === userId);
            if (userIndex !== -1) {
                users.splice(userIndex, 1);
                return true;
            }
            return false;
        });
    }
}
exports.UserService = UserService;
