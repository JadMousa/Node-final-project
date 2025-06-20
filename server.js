import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/users.js';
import bookRoutes from './routes/books.js';
import reservationRoutes from './routes/reservations.js';
import pgclient from './db.js';

const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Register your routes here:
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reservations', reservationRoutes);

const PORT = process.env.PORT;


// Default and test
app.get('/', (req, res) => res.send('Library Home Route'));
app.get('/test', (req, res) => res.send('Test route works!'));

// 404 handler
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// Start server
pgclient.connect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error connecting to PostgreSQL:', err);
    });
