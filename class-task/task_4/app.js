// app.js
const getSystemInfo = require('./systemInfo');
const logData = require('./logger');

setInterval(() => {
    const info = getSystemInfo();
    logData(info);
}, 5000);

console.log('System Monitor & Logger running... Logging every 5 seconds.');
