const express = require('express');
const router = express.Router();
const Produit = require('../models/Produit.js');  

// Créer un produit
router.post('/', async (req, res) => {
  try {
    const { title, description, prix, stock} = req.body;
    const newProduit = await Produit.create({ title, description, prix, stock }); 
    res.status(201).json({ success: true, data: newProduit});
  } catch (error) {
    res.status(400).json({ success: false, error: error.produit });
  }
});

// Obtenir tout les produit
router.get('/', async (req, res) => {
  try {
    const products = await Produit.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(400).json({ success: false, error: error.produit });
  }
});

// Supprimer un produit
router.delete('/:id', async (req, res) => {
  try {
    const produit = await Produit.findByIdAndDelete(req.params.id); 
    if (!produit) {
      return res.status(404).json({ success: false, error: 'produit non trouvé' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.produit });
  }
});

module.exports = router;