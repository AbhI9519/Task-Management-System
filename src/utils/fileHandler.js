"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rotateLogs = rotateLogs;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logDirectory = path_1.default.join(__dirname, '../../logs');
const archiveDirectory = path_1.default.join(logDirectory, 'archive');
function rotateLogs() {
    if (!fs_1.default.existsSync(archiveDirectory)) {
        fs_1.default.mkdirSync(archiveDirectory, { recursive: true });
    }
    const files = fs_1.default.readdirSync(logDirectory);
    files.forEach(file => {
        const filePath = path_1.default.join(logDirectory, file);
        const stats = fs_1.default.statSync(filePath);
        const now = new Date().getTime();
        const endTime = new Date(stats.mtime).getTime() + 24 * 60 * 60 * 1000;
        if (endTime < now) {
            const archivePath = path_1.default.join(archiveDirectory, file);
            fs_1.default.renameSync(filePath, archivePath);
        }
    });
}
// Call this function at the start of the application
rotateLogs();
