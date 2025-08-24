require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const plantsRoutes = require('./routes/plants');
const adminRoutes = require('./routes/admin');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const app = express();
connectDB();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}))

// Routes
app.use('/api/plants', plantsRoutes);
app.use('/api/admin', adminRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));