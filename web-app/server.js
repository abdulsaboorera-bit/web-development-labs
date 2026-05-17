

const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const config = require('config');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// Middlewares
const logger = require('./middlewares/logger');
const globalMiddleware = require('./middlewares/global');

// Routes
const indexRoutes = require('./routes/index');
const shopRoutes = require('./routes/shop/index');
const authRoutes = require('./routes/auth/index');
const cartRoutes = require('./routes/shop/cart');
const checkoutRoutes = require('./routes/shop/checkout');
const adminIndexRoutes = require('./routes/admin/index');
const adminProductRoutes = require('./routes/admin/products');
const adminCategoryRoutes = require('./routes/admin/categories');
const adminOrderRoutes = require('./routes/admin/orders');
const { ensureAdmin } = require('./middlewares/auth');

// API Routes
const apiAuthRoutes = require('./routes/api/auth');
const apiProductRoutes = require('./routes/api/products');
const apiCategoryRoutes = require('./routes/api/categories');
const apiOrderRoutes = require('./routes/api/orders');

const cors = require('cors');

const app = express();

// Core middlewares for APIs
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));







const websiteData = `
========================
DARI MOOCH ECOMMERCE STORE
========================

ABOUT:
Dari Mooch is a grooming and skincare brand for men in Pakistan.

FREE SHIPPING:
- Orders above 1999 PKR

========================
NAVIGATION / PAGES
========================

Categories:
- Ramadan Bundle
- Beard
- Face
- Hair
- De-Tan Line
- Build Your Own Bundle
- Royalty Rewards
- Best Sellers
- Deals
- Gifts
- All Products
- Blog
- Order Tracker

========================
BEST SELLING PRODUCTS
========================

Glow Facewash - 1999
Glow Body Wash - 2999
Glow Bundle - 3999
Sunge Perfume - 4999

========================
FACE PRODUCTS
========================

De-Tan Sunscreen - 1999
Lib Lightener Balm - 2999
Under Eye Balm - 4999

========================
HAIR PRODUCTS
========================

Hair Hold Cream - 1099
Anti-Hairfall Shampoo - 1099
Anti-Hairfall Bundle (Complete Hair Loss Solution) - 1978
Ultimate Skin and Hair Care Bundle - 2499

========================
BEARD PRODUCTS
========================

Beard Growth Kit - 3799

========================
BODY PRODUCTS
========================

De Tan Body Wash - 2999
Charcoal Body Wash - 699

========================
GENERAL PRODUCTS
========================

Lib-Balm - 3999
Under Eye Balm - 4999

========================
SHOP INFO
========================

Currency: PKR / $
Add to Cart feature available
Cart system enabled
Admin Panel available
User Login / Logout system

========================
NEWSLETTER
========================

Email subscription available for:
- Discounts
- Latest news
- Offers

========================
CONTACT
========================

Email: support@darimooch.com
Phone: +92 316 1115556

Store Locations:
- Shapes Executive Gym Gulberg-III, Lahore
- Lake City Mall, Lahore
- Packages Mall, Lahore
- Giga Mall Islamabad kiosk
- DHA Phase 4 Lahore Barber Shop

========================
BRAND DESCRIPTION
========================

Dari Mooch is a one stop solution for grooming needs.
We aim to style and groom every man in Pakistan.

========================
RULES FOR AI
========================

- Only answer from this data
- If not found say: "Not available on website"
- Suggest related products when possible
`;


const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});


app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const prompt = `
You are an AI assistant for an ecommerce website.

RULES:
- Only use website data below
- If not found, say "Not available on website"
- Suggest related products if possible

WEBSITE DATA:
${websiteData}

USER QUESTION:
${message}
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    res.json({ reply: response });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "AI error" });
  }
});












// Configuration
const PORT = config.has('port') ? config.get('port') : 3000;
const MONGO_URI = config.get('mongoURI');

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Set up EJS and Layouts
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout'); // default layout is views/layout.ejs

// Built-in Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// Session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Custom Middlewares
app.use(logger);
app.use(globalMiddleware);

// Set Admin Layout for admin routes
app.use('/admin', (req, res, next) => {
  res.locals.layout = 'admin-layout';
  next();
});

// Mount Routes
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/cart', cartRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/', shopRoutes); 

// Admin Routes
app.use('/admin', ensureAdmin, adminIndexRoutes);
app.use('/admin/products', ensureAdmin, adminProductRoutes);
app.use('/admin/categories', ensureAdmin, adminCategoryRoutes);
app.use('/admin/orders', ensureAdmin, adminOrderRoutes);

// API Route Registration
app.use('/api/auth', apiAuthRoutes);
app.use('/api/products', apiProductRoutes);
app.use('/api/categories', apiCategoryRoutes);
app.use('/api/orders', apiOrderRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).render('index', { 
    title: '404 - Page Not Found',
    description: 'The page you are looking for does not exist.'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
