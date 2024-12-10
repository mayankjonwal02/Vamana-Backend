const express = require('express');
const {
  createUser,
  signinUser,
  getAllUsers,
  getUserByID,
  updateUser,
  deleteUser,
} = require('../Service/UserService');

const router = express.Router();

// Create a new user
router.post('/create', createUser);

// Sign-in a user
router.post('/signin', signinUser);

// Get all users
router.get('/all', getAllUsers);

// Get a single user by ID
router.get('/:id', getUserByID);

// Update a user by ID
router.put('/update/:id', updateUser);

// Delete a user by ID
router.delete('/delete/:id', deleteUser);

module.exports = router;
