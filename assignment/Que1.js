// fileOps.js
const fs = require('fs');
fs.writeFileSync("./input.txt","hello");

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) throw err;
    const wordCount = data.trim().split(/\s+/).length;
    fs.writeFile('wordCount.txt', `Word count: ${wordCount}`, (err) => {
        if (err) throw err;
        console.log('Word count written to wordCount.txt');
    });
});
