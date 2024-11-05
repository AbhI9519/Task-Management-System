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
exports.UserController = void 0;
const userService_1 = require("../services/userService");
const logger_1 = require("../utils/logger");
class UserController {
    // Fetch user profile details
    static getUserProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const user = yield userService_1.UserService.getUserById(userId);
                if (user) {
                    res.status(200).json(user);
                }
                else {
                    res.status(404).json({ message: 'User not found' });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to fetch user profile', error });
            }
        });
    }
    // Update user details
    static updateUserProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const updatedData = req.body;
                const updatedUser = yield userService_1.UserService.updateUser(userId, updatedData);
                if (updatedUser) {
                    logger_1.logger.log(`User profile updated for userId: ${userId}`);
                    res.status(200).json({ message: 'User profile updated successfully', updatedUser });
                }
                else {
                    res.status(404).json({ message: 'User not found' });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to update user profile', error });
            }
        });
    }
    // Delete user account
    static deleteUserAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const isDeleted = yield userService_1.UserService.deleteUser(userId);
                if (isDeleted) {
                    logger_1.logger.log(`User account deleted for userId: ${userId}`);
                    res.status(200).json({ message: 'User account deleted successfully' });
                }
                else {
                    res.status(404).json({ message: 'User not found' });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to delete user account', error });
            }
        });
    }
}
exports.UserController = UserController;
