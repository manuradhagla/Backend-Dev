const os = require('os');

function getSystemInfo() {
    return {
        cpuCount: os.cpus().length,
        freeMemory: (os.freemem() / 1024 / 1024).toFixed(2) + ' MB',
        totalMemory: (os.totalmem() / 1024 / 1024).toFixed(2) + ' MB',
        platform: os.platform(),
        timestamp: new Date().toISOString()
    };
}

module.exports = getSystemInfo;
