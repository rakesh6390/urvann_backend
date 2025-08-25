const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const Plant = require('../models/Plant');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const ADMIN_USER = {
  username: "admin",
  password: "admin123", // should be hashed in real apps!
};

// Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide username and password' });
    }

    if(username !== ADMIN_USER.username || password !== ADMIN_USER.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    return res.status(200).json({ token: generateToken(username) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new plant (protected)
const addPlant = async (req, res) => {
  try {
    const { name, price, categories, availability, imageUrl } = req.body;
    
    const plant = new Plant({
      name,
      price,
      categories: Array.isArray(categories) ? categories : [categories],
      availability,
      imageUrl
    });

    const savedPlant = await plant.save();
    res.status(201).json(savedPlant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { loginAdmin, addPlant };