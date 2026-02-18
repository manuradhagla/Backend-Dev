const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to log response time
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.originalUrl} - ${duration}ms`);
    });
    next();
});

// Example routes
app.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
});

app.get('/about', (req, res) => {
    res.send('About page');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
