"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const events_1 = __importDefault(require("events"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Logger extends events_1.default {
    constructor() {
        super();
        this.logFile = path_1.default.join(__dirname, `../../logs/daily_log_${new Date().toISOString().split('T')[0]}.log`);
    }
    log(message) {
        this.emit('log', message);
    }
    init() {
        this.on('log', (message) => {
            const logMessage = `${new Date().toISOString()} - ${message}\n`;
            fs_1.default.appendFile(this.logFile, logMessage, (err) => {
                if (err)
                    console.error('Log error:', err);
            });
        });
    }
}
exports.logger = new Logger();
exports.logger.init();
