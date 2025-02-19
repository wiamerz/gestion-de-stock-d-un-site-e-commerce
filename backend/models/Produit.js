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
  prix: {
    type: String,
    required: [true, 'Le prix est requis'],
    trim: true,
  },
  stock: {
    type: String,
    required: [true, 'Le stock est requis'],
    trim: true,
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('Produit', produitSchema);