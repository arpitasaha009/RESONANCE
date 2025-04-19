// backend/routes/userRoutes.js
import express from 'express';
import * as userController from '../controllers/userinfo.controller.js';

const router = express.Router();

// Get all users
router.get('/users', userController.getAllUsers);

// Update user by ID
router.put('/users/:id', userController.updateUser);

// Delete user by ID
router.delete('/users/:id', userController.deleteUser);

// Update user rank by ID
router.put('/users/:id/rank', userController.updateUserRank);

export default router;