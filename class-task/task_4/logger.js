// logger.js
const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'system-log.txt');

function logData(data) {
    const logEntry = `
Timestamp: ${data.timestamp}
CPU Count: ${data.cpuCount}
Free Memory: ${data.freeMemory}
Total Memory: ${data.totalMemory}
Platform: ${data.platform}
-------------------------------
`;

    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) console.error('Error writing to log file:', err);
        else console.log('System info logged.');
    });
}

module.exports = logData;
