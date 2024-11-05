import fs from 'fs';
import path from 'path';

const logDirectory = path.join(__dirname, '../../logs');
const archiveDirectory = path.join(logDirectory, 'archive');

export function rotateLogs() {
    if (!fs.existsSync(archiveDirectory)) {
        fs.mkdirSync(archiveDirectory, { recursive: true });
    }

    const files = fs.readdirSync(logDirectory);
    files.forEach(file => {
        const filePath = path.join(logDirectory, file);
        const stats = fs.statSync(filePath);
        const now = new Date().getTime();
        const endTime = new Date(stats.mtime).getTime() + 24 * 60 * 60 * 1000;

        if (endTime < now) {
            const archivePath = path.join(archiveDirectory, file);
            fs.renameSync(filePath, archivePath);
        }
    });
}

// Call this function at the start of the application
rotateLogs();