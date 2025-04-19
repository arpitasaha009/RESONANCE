import mongoose from 'mongoose';

const UserInfoSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  role: { type: String, default: 'user' },
  rank: { type: String, enum: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'], default: 'Bronze' },
  username: String,
  followers: Number,
  artistName: String,
  profileImage: String,
  status: String,
  createdAt: { type: Date, default: Date.now }
}, {
  collection: 'User info'
});

export default mongoose.model('UserInfo', UserInfoSchema);