import express from 'express';
import BookingHistory from '../models/bookinghistory.model.js';

const router = express.Router();

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await BookingHistory.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a booking (for dummy data)
router.post('/', async (req, res) => {
  try {
    const booking = new BookingHistory(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
