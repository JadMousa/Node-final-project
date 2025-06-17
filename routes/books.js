import express from 'express';
import pgclient from '../db.js';
import checkAdmin from '../middleware/checkAdmin.js';

const bookRoutes = express.Router();

// GET all books
bookRoutes.get('/', async (req, res) => {
    const result = await pgclient.query("SELECT * FROM books");
    res.json(result.rows);
});

// POST: add book (admin only)
bookRoutes.post('/', checkAdmin, async (req, res) => {
    const { title, author, genre, image_url, description, published } = req.body;
    const result = await pgclient.query(
        `INSERT INTO books (title, author, genre, image_url, description, published)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [title, author, genre, image_url, description, published]
    );
    res.status(201).json(result.rows[0]);
});

// PUT: edit book
bookRoutes.put('/:id', checkAdmin, async (req, res) => {
    const { title, author, genre, image_url, description, published } = req.body;
    const result = await pgclient.query(
        `UPDATE books
         SET title=$1, author=$2, genre=$3, image_url=$4, description=$5, published=$6
         WHERE id=$7 RETURNING *`,
        [title, author, genre, image_url, description, published, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Book not found' });
    res.json(result.rows[0]);
});

// DELETE: remove book
bookRoutes.delete('/:id', checkAdmin, async (req, res) => {
    const result = await pgclient.query("DELETE FROM books WHERE id=$1 RETURNING *", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
});

export default bookRoutes;
