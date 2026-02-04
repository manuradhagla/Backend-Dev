const http = require('http');
const fs = require('fs');
const url = require('url');

let students = [
    { id: 1, name: 'Alice', branch: 'CSE' },
    { id: 2, name: 'Bob', branch: 'ECE' }
];
function logRequest(req) {
    const log = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
    fs.appendFile('log.txt', log, (err) => {
        if (err) console.error('Logging failed:', err);
    });
}
const server = http.createServer((req, res) => {
    logRequest(req);

    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;

    res.setHeader('Content-Type', 'application/json');

    // GET /students → return all students 
    if (method === 'GET' && path === '/students') {
        res.writeHead(200);
        res.end(JSON.stringify(students));
    }
    // GET /students/:id → return only one student
    else if (method === 'GET' && path.startsWith('/students/')) {
        const id = parseInt(path.split('/')[2]);
        const student = students.find(s => s.id === id);
        if (student) {
            res.writeHead(200);
            res.end(JSON.stringify(student));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Student not found' }));
        }
    }

    // POST /students → adding  new student
    else if (method === 'POST' && path === '/students') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const newStudent = JSON.parse(body);
                newStudent.id = students.length ? students[students.length - 1].id + 1 : 1;
                students.push(newStudent);
                res.writeHead(201);
                res.end(JSON.stringify(newStudent));
            } catch (err) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
    }

    // DELETE /students/:id → removing~ student
    else if (method === 'DELETE' && path.startsWith('/students/')) {
        const id = parseInt(path.split('/')[2]);
        const index = students.findIndex(s => s.id === id);
        if (index !== -1) {
            const removed = students.splice(index, 1);
            res.writeHead(200);
            res.end(JSON.stringify({ message: 'Deleted', student: removed[0] }));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Student not found' }));
        }
    }

    // Handle 404 routes
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Route not found' }));
    }
});

server.listen(3000, () => {
    console.log('Campus Placement Student API running on port 3000');
});
