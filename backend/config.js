const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./Routes/routes');

const app = express();

// Middleware
app.use(cors()); 
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/stock')
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB Atlas connection error:', err));

// Routes
app.use('/api/products', routes); 

const PORT = 300;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});