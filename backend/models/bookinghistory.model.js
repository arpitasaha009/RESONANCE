import mongoose from 'mongoose';

const BookingHistorySchema = new mongoose.Schema({
  user: { type: String, required: true },
  studio: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

export default mongoose.model('BookingHistory', BookingHistorySchema);
