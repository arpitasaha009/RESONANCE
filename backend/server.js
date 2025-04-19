import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRouter from './routes/user.routes.js';
import bookingHistoryRouter from './routes/bookinghistory.routes.js';
import orderHistoryRouter from './routes/orderhistory.routes.js';
import blogRouter from './routes/blog.routes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', userRouter);
app.use('/api/bookings', bookingHistoryRouter);
app.use('/api/orders', orderHistoryRouter);
app.use('/api/blogs', blogRouter);

// Simple test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log('Press Ctrl+C to quit.');
});