const express = require('express');
const mongoose = require('mongoose');
const formRoutes = require('./routes/formRoutes');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
// Middleware to parse JSON request bodies
app.use(express.json());
const mongoURI = process.env.MONGO_URI;
// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use(formRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
