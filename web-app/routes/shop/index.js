const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');
const Category = require('../../models/Category');

// Shop page route with pagination
router.get('/shop', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await Product.find().populate('category').skip(skip).limit(limit);

    res.render('shop/index', { 
      title: 'Our Shop',
      products,
      currentPage: page,
      totalPages
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Category products route
router.get('/shop/category/:slug', async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      req.flash('error', 'Category not found');
      return res.redirect('/shop');
    }

    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    const totalProducts = await Product.countDocuments({ category: category._id });
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await Product.find({ category: category._id }).populate('category').skip(skip).limit(limit);

    res.render('shop/index', { 
      title: `Category: ${category.name}`,
      products,
      categoryName: category.name,
      currentPage: page,
      totalPages,
      categorySlug: category.slug
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Product details route
router.get('/product/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate('category');
    if (!product) {
      return res.status(404).render('index', { 
        title: 'Product Not Found',
        description: 'The product you are looking for does not exist.'
      });
    }
    res.render('shop/product', { 
      title: product.name,
      product 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
