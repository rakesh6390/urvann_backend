// const mongoose = require('mongoose');
// const Admin = require('../models/Admin');
// const connectDB = require('../config/db');

// const adminData = {
//   username: 'admin',
//   password: 'admin123' // Change this in production
// };

// const seedAdmin = async () => {
//   try {
//     await connectDB();
    
//     // Check if admin already exists
//     const existingAdmin = await Admin.findOne({ username: adminData.username });
//     if (existingAdmin) {
//       console.log('Admin user already exists');
//       process.exit();
//     }
    
//     // Create new admin
//     await Admin.create(adminData);
//     console.log('Admin user created successfully');
//     // console.log('Username: admin');
//     // console.log('Password: admin123');
//     process.exit();
//   } catch (error) {
//     console.error(error.message);
//     process.exit(1);
//   }
// };

// seedAdmin();