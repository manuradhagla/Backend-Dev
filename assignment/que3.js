// systemLogger.js
const os = require('os');
const fs = require('fs');

function logSystemInfo() {
    const info = `
Platform: ${os.platform()}
CPU: ${os.cpus()[0].model}
Memory: ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB
Free Memory: ${(os.freemem() / 1024 / 1024).toFixed(2)} MB
Timestamp: ${new Date().toISOString()}
---------------------------
`;
    fs.appendFile('systemLog.txt', info, (err) => {
        if (err) throw err;
        console.log('System info logged');
    });
}

setInterval(logSystemInfo, 5000);
