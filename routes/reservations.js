import express from 'express';
import pgclient from '../db.js';
import checkAdmin from '../middleware/checkAdmin.js';

const reservationRoutes = express.Router();

reservationRoutes.post('/', async (req, res) => {
    const { user_email, user_name, book_id, start_time, end_time } = req.body;

    try {
        const result = await pgclient.query(
            `INSERT INTO reservations 
             (user_email, user_name, book_id, start_time, end_time)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [user_email, user_name, book_id, start_time, end_time]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Reservation failed" });
    }
});

// GET: reservations by email
reservationRoutes.get('/all', checkAdmin, async (req, res) => {
    try {
      const result = await pgclient.query("SELECT * FROM reservations");
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch reservations' });
    }
  });

  reservationRoutes.get('/', async (req, res) => {
    const { user_email } = req.query;
  
    try {
      const result = await pgclient.query(
        "SELECT * FROM reservations WHERE user_email = $1",
        [user_email]
      );
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch user reservations' });
    }
  });

  // PUT: Update reservation by ID
reservationRoutes.put('/:id', async (req, res) => {
    const { start_time, end_time } = req.body;
  
    if (!start_time || !end_time) {
      return res.status(400).json({ message: "Start and end time are required." });
    }
  
    try {
      const result = await pgclient.query(
        `UPDATE reservations 
         SET start_time = $1, end_time = $2 
         WHERE id = $3 RETURNING *`,
        [start_time, end_time, req.params.id]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Reservation not found" });
      }
  
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: "Failed to update reservation" });
    }
  });
  
 // DELETE: User cancels their own reservation
reservationRoutes.delete('/:id', async (req, res) => {
    const userEmail = req.headers['user-email'];
  
    if (!userEmail) {
      return res.status(400).json({ message: "Missing user-email in headers" });
    }
  
    try {
      // First, check if this reservation belongs to the user
      const check = await pgclient.query(
        "SELECT * FROM reservations WHERE id = $1 AND user_email = $2",
        [req.params.id, userEmail]
      );
  
      if (check.rows.length === 0) {
        return res.status(403).json({ message: "Not allowed to delete this reservation" });
      }
  
      // Proceed with delete
      const result = await pgclient.query(
        "DELETE FROM reservations WHERE id = $1 RETURNING *",
        [req.params.id]
      );
  
      res.json({ message: "Reservation deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete reservation" });
    }
  });
  
  

export default reservationRoutes;
