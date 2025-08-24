const mongoose = require('mongoose');
const Plant = require('../models/Plant');
const connectDB = require('../config/db');

const plantsData = [
  {
    name: 'Snake Plant',
    price: 24.99,
    categories: ['Indoor', 'Air Purifying'],
    availability: true
  },
  // Add 49+ more realistic plant entries here
];

const seedData = async () => {
  try {
    await connectDB();
    await Plant.deleteMany();
    await Plant.insertMany(plantsData);
    console.log('Data seeded successfully');
    process.exit();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

seedData();