const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const Plant = require('../models/Plant');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide username and password' });
    }

    const admin = await Admin.findOne({ username });

    if (admin && (await admin.correctPassword(password, admin.password))) {
      res.json({
        _id: admin._id,
        username: admin.username,
        token: generateToken(admin._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
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