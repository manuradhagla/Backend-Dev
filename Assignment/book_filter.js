const express = require('express');
const app = express();
const PORT = 3000;

const books = [
    { id: 1, title: "Book One", author: "Alice", year: 2020 },
    { id: 2, title: "Book Two", author: "Bob", year: 2021 },
    { id: 3, title: "Book Three", author: "Alice", year: 2022 },
    { id: 4, title: "Book Four", author: "Charlie", year: 2020 },
    { id: 5, title: "Book Five", author: "David", year: 2023 },
    { id: 6, title: "Book Six", author: "Eve", year: 2024 },
    { id: 7, title: "Book Seven", author: "Frank", year: 2025 },
    { id: 8, title: "Book Eight", author: "Grace", year: 2026 },
    { id: 9, title: "Book Nine", author: "Hank", year: 2020 },
    { id: 10, title: "Book Ten", author: "Ivy", year: 2021 },
    { id: 11, title: "Book Eleven", author: "Jack", year: 2022 }
];

function validateYear(req, res, next) {
    const { year } = req.query;

    if (year) {
        const yearNum = parseInt(year, 10);

        if (isNaN(yearNum) || yearNum < 1900 || yearNum > new Date().getFullYear() + 1) {
            return res.status(400).json({
                error: "Invalid year. Please provide a number between 1900 and next year."
            });
        }
    }
    next();
}

app.get('/books', validateYear, (req, res) => {
    const { author, year, page, limit } = req.query;
    let filteredBooks = books;

    if (author) {
        filteredBooks = filteredBooks.filter(book =>
            book.author.toLowerCase().includes(author.toLowerCase())
        );
    }

    if (year) {
        filteredBooks = filteredBooks.filter(book =>
            book.year.toString() === year.toString()
        );
    }

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 5;
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;

    const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

    res.json({
        page: pageNum,
        limit: limitNum,
        totalBooks: filteredBooks.length,
        totalPages: Math.ceil(filteredBooks.length / limitNum),
        data: paginatedBooks
    });
});

app.get('/', (req, res) => {
    res.send("Welcome to the Book API with Filtering, Validation, and Pagination");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
