import mongoose from 'mongoose';

const OrderHistorySchema = new mongoose.Schema({
  user: { type: String, required: true },
  instrument: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, required: true },
});

export default mongoose.model('OrderHistory', OrderHistorySchema);
