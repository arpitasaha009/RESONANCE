// Import necessary modules
import express from 'express';  
import UserInfo from '../models/userinfo.model.js';

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserInfo.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user by ID
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  try {
    const updatedUser = await UserInfo.findByIdAndUpdate(
      id,
      { name, email, role },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete user by ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await UserInfo.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user rank by ID
export const updateUserRank = async (req, res) => {
  const { id } = req.params;
  const { rank } = req.body;

  // Validate rank
  const validRanks = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'];
  if (!validRanks.includes(rank)) {
    return res.status(400).json({ message: 'Invalid rank' });
  }

  try {
    const updatedUser = await UserInfo.findByIdAndUpdate(
      id,
      { rank },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};