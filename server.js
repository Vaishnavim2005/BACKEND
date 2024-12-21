const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const discussionRoutes = require('./routes/discussionRoutes'); // Discussion forum routes
const authRoutes = require('./routes/authRoutes'); // Authentication routes

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

// MongoDB Connection
const dbURI = process.env.MONGO_URI || 'mongodb+srv://vaishnavimatheswaran:efwoTnPFrgwcaecO@cluster0.luotf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Use environment variable or fallback to local DB

mongoose
    .connect(dbURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit process if DB connection fails
    });

// Routes
app.use('/api/auth', authRoutes); // Authentication routes (login, register)
app.use('/api/discussions', discussionRoutes); // Discussion forum routes (CRUD, likes, replies)

// Fallback route for undefined endpoints
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
