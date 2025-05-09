import React, { useState } from "react";
import { bookingImages } from './bookingImages';

const initialBookings = [
  { id: 1, date: "2025-04-17", time: "2:00 PM", user: "Alice Smith", studio: "Studio A" },
  { id: 2, date: "2025-04-18", time: "5:00 PM", user: "Bob Lee", studio: "Studio B" },
  { id: 3, date: "2025-04-19", time: "11:00 AM", user: "Carol Tan", studio: "Studio C" },
];
const initialOrders = [
  { id: 1, date: "2025-04-15", instrument: "Electric Guitar", user: "David Kim", status: "Delivered" },
  { id: 2, date: "2025-04-16", instrument: "Drum Set", user: "Eve Lin", status: "Processing" },
  { id: 3, date: "2025-04-17", instrument: "Keyboard", user: "Frank Wu", status: "Shipped" },
];

export default function BookingHistory() {
  const [bookings, setBookings] = useState(initialBookings);
  const [orders, setOrders] = useState(initialOrders);

  const cancelBooking = id => setBookings(bookings.filter(b => b.id !== id));
  const cancelOrder = id => setOrders(orders.filter(o => o.id !== id));

  return (
    <div className="bg-white min-h-screen text-black p-8">
      <h2 className="text-3xl font-bold mb-8">Booking & Order History</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Booking History */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Studio Bookings</h3>
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-1 gap-4 text-black">
              {bookings.length === 0 && <div className="text-gray-400">No bookings.</div>}
              {bookings.map(b => (
                <div key={b.id} className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <div>
                    <div className="font-medium">{b.user} - {b.studio}</div>
                    <div className="text-gray-700 text-sm">{b.date} at {b.time}</div>
                  </div>
                  <button className="text-red-500 hover:underline" onClick={() => cancelBooking(b.id)}>Cancel</button>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Order History */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Instrument Orders</h3>
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-1 gap-4 text-black">
              {orders.length === 0 && <div className="text-gray-400">No orders.</div>}
              {orders.map(o => (
                <div key={o.id} className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <div className="flex items-center gap-3">
                    {bookingImages[o.instrument] && (
                      <img src={bookingImages[o.instrument]} alt={o.instrument} className="w-12 h-12 object-cover rounded shadow" />
                    )}
                    <div>
                      <div className="font-medium">{o.instrument}</div>
                      <div className="text-gray-700 text-sm">{o.user} • {o.date} • <span className={
  o.status === 'Delivered' ? 'bg-green-500 text-white px-2 py-1 rounded font-semibold' :
  o.status === 'Processing' ? 'bg-yellow-300 text-black px-2 py-1 rounded font-semibold' :
  o.status === 'Shipped' ? 'bg-blue-500 text-white px-2 py-1 rounded font-semibold' :
  ''
}>{o.status}</span></div>
                    </div>
                  </div>
                  <button className="text-red-500 hover:underline" onClick={() => cancelOrder(o.id)}>Cancel</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
