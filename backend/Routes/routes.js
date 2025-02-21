const express = require('express');
const multer = require('multer');
const path = require('path');
const Produit = require('../models/Produit.js');

const router = express.Router();

// Configurer multer pour stocker les images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage });

// ajouter un produit avec une image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, price, stock } = req.body;
    const imagePath = req.file ? `uploads/${req.file.filename}` : null;

    const newProduit = await Produit.create({ title, description, price, stock, image: imagePath });
    
    res.status(201).json({ success: true, data: newProduit });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// afficher les produits
router.get('/', async (req, res) => {
  try {
    const products = await Produit.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// modifier un produit
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Produit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ success: false, message: "Produit non trouvé" });
    res.json({ success: true, data: updatedProduct });
  } catch (err) {
    res.status(500).json({ success: false, message: "Erreur serveur" });
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
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;