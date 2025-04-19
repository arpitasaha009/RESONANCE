// Script to insert dummy data into MongoDB collections
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const UserInfo = require('./models/userinfo.model');
const BookingHistory = require('./models/bookinghistory.model');
const OrderHistory = require('./models/orderhistory.model');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/resonance';

async function insertData() {
  await mongoose.connect(MONGO_URI);

  // Dummy users
  const users = [
    { name: 'Alice Smith', username: 'alice', email: 'alice@email.com', role: 'musician', rank: 'Diamond', followers: 120, artistName: 'DJ Alice', status: '' },
    { name: 'Bob Lee', username: 'bob', email: 'bob@email.com', role: 'musician', rank: 'Gold', followers: 80, artistName: 'Bobby Beats', status: '' },
    { name: 'Carol Tan', username: 'carol', email: 'carol@email.com', role: 'musician', rank: 'Silver', followers: 30, artistName: 'Carol T', status: '' },
    { name: 'David Kim', username: 'david', email: 'david@email.com', role: 'musician', rank: 'Gold', followers: 55, artistName: 'KIMusic', status: '' },
    { name: 'Eve Lin', username: 'eve', email: 'eve@email.com', role: 'musician', rank: 'Diamond', followers: 200, artistName: 'EveLyn', status: '' },
  ];

  // Dummy bookings
  const bookings = [
    { user: 'Alice Smith', studio: 'Studio A', date: '2025-04-17', time: '2:00 PM' },
    { user: 'Bob Lee', studio: 'Studio B', date: '2025-04-18', time: '5:00 PM' },
    { user: 'Carol Tan', studio: 'Studio C', date: '2025-04-19', time: '11:00 AM' },
  ];

  // Dummy orders
  const orders = [
    { user: 'David Kim', instrument: 'Electric Guitar', date: '2025-04-15', status: 'Delivered' },
    { user: 'Eve Lin', instrument: 'Drum Set', date: '2025-04-16', status: 'Processing' },
    { user: 'Frank Wu', instrument: 'Keyboard', date: '2025-04-17', status: 'Shipped' },
  ];

  await UserInfo.deleteMany({});
  await BookingHistory.deleteMany({});
  await OrderHistory.deleteMany({});

  await UserInfo.insertMany(users);
  await BookingHistory.insertMany(bookings);
  await OrderHistory.insertMany(orders);

  console.log('Dummy data inserted!');
  await mongoose.disconnect();
}

insertData();
