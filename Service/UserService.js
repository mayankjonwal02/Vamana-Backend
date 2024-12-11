const User = require('../Models/Users');

// Create a new user
const createUser = async (req, res) => {
  try {
    const { userID, contact, password, role, powers } = req.body;

    const user = new User({
      userID,
      contact,
      password,
      role,
      powers,
    });

    const savedUser = await user.save();
    res.status(201).json({message : "User created successfully",executed : true});
  } catch (error) {
    res.status(500).json({ message: error.message  , executed : false});
  }
};


const signinUser = async (req, res) => {
    try {
      const { userID, password ,role } = req.body;
  
      // Find user by userID
      const user = await User.findOne({ userID });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' , executed : false});
      }
  
      // Compare password
      const isMatch = (password === user.password);
      const roleMatch = (role === user.role);
      if (isMatch && roleMatch) {
        res.status(200).json({ message: 'Sign-in successful' , executed : true});
      } else {
        res.status(401).json({ message: 'Invalid credentials' , executed : false});
      }
    } catch (error) {
      res.status(500).json({ message: error.message , executed : false});
    }
  };

// Get all users
const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json({users : users , executed : true});
    } catch (error) {
      res.status(500).json({ message: error.message , executed : false});
    }
  };

  

// Get a single user by ID
const getUserByID = async (req, res) => {
    try {
    
        const userID = req.params.id;
      const user = await User.findOne({ userID });
      if (user) {
        res.status(200).json({user : user , executed : true});
      } else {
        res.status(404).json({ message: "User not found" , executed : false});
      }
    } catch (error) {
      res.status(500).json({ message: error.message , executed : false});
    }
  };


// Update user by ID
const updateUser = async (req, res) => {
    try {
        const userID = req.params.id;
      const { contact, password, role, powers } = req.body;
  
      const updatedUser = await User.findOneAndUpdate(
        { userID },
        { contact, password, role, powers },
        { new: true }
      )
  
      if (updatedUser) {
        res.status(200).json({message : "User updated successfully",executed : true});
      } else {
        res.status(404).json({ message: "User not found" , executed : false});
      }
    } catch (error) {
      res.status(500).json({ message: error.message   , executed : false});
    }
  };
  
  
// Delete user by ID
const deleteUser = async (req, res) => {
    try {

        const userID = req.params.id;
      const deletedUser = await User.findOneAndDelete({ userID });
  
      if (deletedUser) {
        res.status(200).json({ message: "User deleted successfully" , executed : true});
      } else {
        res.status(404).json({ message: "User not found" , executed : false});
      }
    } catch (error) {
      res.status(500).json({ message: error.message, executed : false});
    }
  };
  

  module.exports = {
    createUser,
    signinUser,
    getAllUsers,
    getUserByID,
    updateUser,
    deleteUser,
  };
  