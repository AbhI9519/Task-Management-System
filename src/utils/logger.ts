import EventEmitter from 'events';
import fs from 'fs';
import path from 'path';

class Logger extends EventEmitter {
    private logFile: string;

    constructor() {
        super();
        this.logFile = path.join(__dirname, `../../logs/daily_log_${new Date().toISOString().split('T')[0]}.log`);
    }

    log(message: string) {
        this.emit('log', message);
    }

    init() {
        this.on('log', (message: string) => {
            const logMessage = `${new Date().toISOString()} - ${message}\n`;
            fs.appendFile(this.logFile, logMessage, (err) => {
                if (err) console.error('Log error:', err);
            });
        });
    }
}

export const logger = new Logger();
logger.init();