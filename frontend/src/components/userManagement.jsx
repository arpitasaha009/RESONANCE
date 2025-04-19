import React, { useState } from 'react';
import { ChevronDown, MoreVertical, Shield, Ban, Trash2, Save, Edit3 } from 'lucide-react';

const initialUsers = [
  { 
    _id: '1', 
    name: 'Mustafiz ahsan', 
    username: 'musta123', 
    email: 'example@gmail.com', 
    avatar: '/path/to/avatar1.jpg', 
    role: 'musician', 
    rank: 'Bronze', 
    followers: 120, 
    artistName: 'DJ Alice', 
    profileImage: '/path/to/profile1.jpg', 
    albumCover: '/path/to/album1.jpg',
    albumTitle: 'Life in a bubble',
    status: 'New Artist'
  },
  { 
    _id: '2', 
    name: 'Anik', 
    username: 'anik1', 
    email: 'example@gmail.com', 
    avatar: '/path/to/avatar2.jpg', 
    role: 'musician', 
    rank: 'Gold', 
    followers: 80, 
    artistName: 'Bobby Beats', 
    profileImage: '/path/to/profile2.jpg',
    albumCover: '/path/to/album2.jpg',
    albumTitle: 'Everything\'s black',
    status: ''
  },
  { 
    _id: '3', 
    name: 'GigaChad', 
    username: 'gigachad2', 
    email: 'example@gmail.com', 
    avatar: '/path/to/avatar3.jpg', 
    role: 'musician', 
    rank: 'Platinum', 
    followers: 30, 
    artistName: 'Carol T', 
    profileImage: '/path/to/profile3.jpg',
    albumCover: '/path/to/album3.jpg',
    albumTitle: 'Cancelled',
    status: 'New Artist'
  },
];

const rankColors = {
  'Diamond': 'bg-blue-500 text-white',
  'Platinum': 'bg-purple-500 text-white',
  'Gold': 'bg-yellow-500 text-black',
  'Silver': 'bg-gray-400 text-white',
  'Bronze': 'bg-amber-700 text-white'
};

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [error, setError] = useState(null);
  const [openDropdowns, setOpenDropdowns] = useState({ rank: {}, manage: {} });

  const toggleDropdown = (type, userId) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [userId]: !prev[type][userId]
      }
    }));
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user._id !== userId));
    }
  };

  const handleRankChange = (userId, newRank) => {
    setUsers(users.map(user => 
      user._id === userId ? { ...user, rank: newRank } : user
    ));
    toggleDropdown('rank', userId);
  };

  const handleSaveChanges = (userId) => {
    alert('Changes saved successfully!');
    toggleDropdown('manage', userId);
  };

  const handleBanUser = (userId) => {
    setUsers(users.map(user => 
      user._id === userId ? { ...user, status: user.status === 'Banned' ? '' : 'Banned' } : user
    ));
    toggleDropdown('manage', userId);
  };

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="w-full bg-black text-white min-h-screen">
      <div className="flex justify-between items-center mb-6 p-4">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          User Management
        </h2>
      </div>

      {/* Users Table */}
      <div className="mb-8 overflow-hidden rounded-lg shadow-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800 text-left">
              <th className="px-6 py-3 text-gray-300">User ID</th>
              <th className="px-6 py-3 text-gray-300">User Name</th>
              <th className="px-6 py-3 text-gray-300">Email</th>
              <th className="px-6 py-3 text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-gray-800 hover:bg-gray-900/50">
                <td className="px-6 py-4">{user._id}</td>
                <td className="px-6 py-4 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500">
                    <img 
                      src={user.avatar || "/api/placeholder/40/40"} 
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div>{user.name}</div>
                    <div className="text-gray-500">@{user.username}</div>
                  </div>
                </td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4 text-right">
                  <div className="relative inline-block">
                    <button 
                      onClick={() => toggleDropdown('manage', user._id)}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all duration-200 flex items-center space-x-2"
                    >
                      <span>Manage</span>
                      <MoreVertical size={16} />
                    </button>
                    {openDropdowns.manage[user._id] && (
                      <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl z-50 border border-gray-700">
                        <button 
                          onClick={() => handleSaveChanges(user._id)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center space-x-2"
                        >
                          <Save size={16} />
                          <span>Save Changes</span>
                        </button>
                        <button 
                          onClick={() => handleBanUser(user._id)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center space-x-2 text-yellow-500"
                        >
                          <Ban size={16} />
                          <span>{user.status === 'Banned' ? 'Unban User' : 'Ban User'}</span>
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user._id)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center space-x-2 text-red-500"
                        >
                          <Trash2 size={16} />
                          <span>Delete User</span>
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Musician Profiles */}
      <div className="px-4">
        <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Musician Profiles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((musician) => (
            <div key={musician._id} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-800">
              <div className="p-4">
                <div className="rounded-lg overflow-hidden mb-4 aspect-video bg-gray-800">
                  <img 
                    src={musician.albumCover || "/api/placeholder/400/400"} 
                    alt={musician.albumTitle}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mb-2">
                  <span className={`px-3 py-1 rounded text-sm font-medium ${rankColors[musician.rank]}`}>
                    {musician.rank}
                  </span>
                  {musician.status === 'Banned' && (
                    <span className="ml-2 px-3 py-1 rounded text-sm font-medium bg-red-500 text-white">
                      Banned
                    </span>
                  )}
                </div>
                <div className="mb-4">
                  <p className="text-lg font-medium text-gray-100">{musician.albumTitle}</p>
                  <p className="text-sm text-gray-400">{musician.followers} followers</p>
                  {musician.status && musician.status !== 'Banned' && (
                    <p className="text-sm text-gray-400">{musician.status}</p>
                  )}
                </div>
                <div className="space-y-3">
                  <div className="relative">
                    <button 
                      onClick={() => toggleDropdown('rank', musician._id)}
                      className="flex items-center justify-between w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-sm hover:bg-gray-700 transition-colors duration-200"
                    >
                      <span>Select Rank</span>
                      <ChevronDown size={16} className="ml-2" />
                    </button>
                    {openDropdowns.rank[musician._id] && (
                      <div className="absolute w-full mt-2 bg-gray-800 rounded-lg shadow-xl z-50 border border-gray-700">
                        {Object.entries(rankColors).map(([rank, colorClass]) => (
                          <button
                            key={rank}
                            onClick={() => handleRankChange(musician._id, rank)}
                            className={`w-full px-4 py-2 text-left hover:bg-gray-700 ${
                              musician.rank === rank ? colorClass : ''
                            }`}
                          >
                            {rank}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => handleBanUser(musician._id)}
                      className="flex items-center justify-center gap-2 w-full py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors duration-200"
                    >
                      <Ban size={16} />
                      <span>{musician.status === 'Banned' ? 'Unban' : 'Ban'}</span>
                    </button>
                    <button 
                      onClick={() => handleDeleteUser(musician._id)}
                      className="flex items-center justify-center gap-2 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                    >
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </button>
                  </div>
                  <button 
                    onClick={() => handleSaveChanges(musician._id)}
                    className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <Save size={16} />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;