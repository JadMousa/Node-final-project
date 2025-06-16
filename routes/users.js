import express from 'express';
import pgclient from '../db.js';
import checkAdmin from '../middleware/checkAdmin.js';


const userRoutes = express.Router();

// GET: All users (admin-only)
userRoutes.get('/', checkAdmin, async (req, res) => {
    try {
        const result = await pgclient.query("SELECT * FROM users");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// GET: Single user by ID (admin-only)
userRoutes.get('/:id', checkAdmin, async (req, res) => {
    try {
        const result = await pgclient.query("SELECT * FROM users WHERE id = $1", [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// POST: Add new user
userRoutes.post('/', async (req, res) => {
    const { name, email, age } = req.body;
    try {
        const result = await pgclient.query(
            "INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *",
            [name, email, age]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add user' });
    }
});

// PUT: Update user by ID
userRoutes.put('/:id', async (req, res) => {
    const { name, email, age } = req.body;
    try {
        const result = await pgclient.query(
            "UPDATE users SET name = $1, email = $2, age = $3 WHERE id = $4 RETURNING *",
            [name, email, age, req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});

// DELETE: Remove user by ID
userRoutes.delete('/:id', checkAdmin, async (req, res) => {
    try {
        const result = await pgclient.query("DELETE FROM users WHERE id = $1 RETURNING *", [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

export default userRoutes;
