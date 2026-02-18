const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Dummy employee data
const employees = [
    { id: 1, name: "Alice", department: "HR" },
    { id: 2, name: "Bob", department: "Finance" },
    { id: 3, name: "Charlie", department: "Sales" },
    { id: 4, name: "Salman", department: "Engineering" }
];

// Route with query parameter for filtering by name
app.get('/users', (req, res) => {
    const { name } = req.query;
    let filtered = employees;

    if (name) {
        filtered = employees.filter(emp =>
            emp.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    res.render('users', { employees: filtered });
});

// Home route
app.get('/', (req, res) => {
    res.send("Welcome to Employee Payroll System");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
