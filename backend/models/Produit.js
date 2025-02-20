const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le nom est requis'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'description est requis'],
    trim: true,
  },
  price: {  
    type: Number,  
    required: [true, 'Le prix est requis'],
  },
  stock: {
    type: Number,  
    required: [true, 'Le stock est requis'],
  },
  image: {
    type: String, 
    required: false
  }
});

module.exports = mongoose.model('Produit', produitSchema);
