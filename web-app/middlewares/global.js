const Category = require('../models/Category');

module.exports = async (req, res, next) => {
  // 1. Custom Flash Middleware
  // Initialize flash arrays if they don't exist
  if (!req.session.flash) {
    req.session.flash = { success: [], error: [] };
  }

  // Provide a req.flash() function
  req.flash = function (type, message) {
    if (message) {
      if (!req.session.flash[type]) {
        req.session.flash[type] = [];
      }
      req.session.flash[type].push(message);
    } else {
      const messages = req.session.flash[type] || [];
      req.session.flash[type] = [];
      return messages;
    }
  };

  // Pass current flash messages to locals for rendering, then clear them
  res.locals.success_msg = req.flash('success');
  res.locals.error_msg = req.flash('error');

  // 2. Pass Current User to locals
  res.locals.user = req.session.user || null;

  // 3. Load Categories for dropdown
  try {
    const categories = await Category.find().sort('name');
    res.locals.categories = categories;
  } catch (err) {
    res.locals.categories = [];
  }

  // 4. Load Cart items count
  const cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
  res.locals.cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  next();
};
