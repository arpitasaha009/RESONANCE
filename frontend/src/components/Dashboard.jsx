import React, { useState } from "react";
import UserManagement from "./userManagement";
import BookingHistory from "./BookingHistory";
import Blog from "./Blog";

const SidebarOptions = [
  { key: "user", label: "User Management", color: "from-purple-500 to-pink-500" },
  { key: "inventory", label: "Inventory", color: "from-blue-500 to-cyan-500" },
  { key: "profile", label: "Profile Setting", color: "from-green-500 to-emerald-500" },
  { key: "booking", label: "Booking History", color: "from-orange-500 to-red-500" },
  { key: "blog", label: "Music Blog", color: "from-yellow-500 to-orange-500" }
];

export default function Dashboard() {
  const [page, setPage] = useState("user");

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Sidebar - Now fixed to left */}
      <div className="fixed left-0 h-full w-64 bg-gradient-to-b from-gray-800 to-gray-900 border-r border-gray-700 p-6 shadow-lg z-10">
        <div className="mb-12">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Resonance
          </h1>
        </div>
        <nav className="space-y-4">
          {SidebarOptions.map(opt => (
            <button
              key={opt.key}
              className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                page === opt.key
                  ? `bg-gradient-to-r ${opt.color} text-white shadow-xl`
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white"
              }`}
              onClick={() => setPage(opt.key)}
            >
              {opt.label}
            </button>
          ))}
        </nav>
      </div>
      {/* Main Content - Adjusted margin to accommodate fixed sidebar */}
      <div className="flex-1 ml-64 overflow-auto p-8 bg-gray-900">
        {page === "user" && <UserManagement />}
        {page === "booking" && <BookingHistory />}
        {page === "blog" && <Blog />}
        {page !== "user" && page !== "booking" && page !== "blog" && (
          <div className="text-2xl text-gray-400 mt-20 text-center">
            {SidebarOptions.find(o => o.key === page)?.label} coming soon...
          </div>
        )}
      </div>
    </div>
  );
}