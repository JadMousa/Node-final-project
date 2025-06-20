import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/users.js';
import bookRoutes from './routes/books.js';
import reservationRoutes from './routes/reservations.js';
import pgclient from './db.js';

const app = express();
dotenv.config();

const allowedOrigins = [
    'https://react-final-project-production-2603.up.railway.app',
    'http://localhost:3000'
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log('Blocked by CORS:', origin); // Helpful for debugging
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Explicit methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Explicit headers
}));

app.use(express.json());

// Register your routes here:
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reservations', reservationRoutes);

const PORT = process.env.PORT || 3002;

// Default and test
app.get('/', (req, res) => res.send('Library Home Route'));
app.get('/test', (req, res) => res.send('Test route works!'));

// 404 handler
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// Start server
pgclient.connect()
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to PostgreSQL:', err);
  });
