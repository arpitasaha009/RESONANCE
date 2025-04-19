import express from 'express';
import OrderHistory from '../models/orderhistory.model.js';

const router = express.Router();

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await OrderHistory.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add an order (for dummy data)
router.post('/', async (req, res) => {
  try {
    const order = new OrderHistory(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
