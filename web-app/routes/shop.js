const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Shop page route
router.get('/shop', async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.render('shop', { 
      title: 'Our Shop',
      products 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
