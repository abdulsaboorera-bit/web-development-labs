const mongoose = require('mongoose');
const config = require('config');
const Category = require('./models/Category');
const Product = require('./models/Product');

const User = require('./models/User');
const bcrypt = require('bcryptjs');

const MONGO_URI = config.get('mongoURI');

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to DB for seeding...');

    await Category.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password123', salt);

    await User.create([
      { name: 'Admin User', email: 'admin@example.com', password, role: 'admin' },
      { name: 'Normal User', email: 'user@example.com', password, role: 'user' }
    ]);

    const electronics = await Category.create({ name: 'Electronics', description: 'Gadgets and devices' });
    const clothing = await Category.create({ name: 'Clothing', description: 'Apparel and accessories' });

    await Product.create([
      {
        name: 'Smartphone Pro Max',
        description: 'The latest smartphone with amazing features.',
        price: 999.99,
        category: electronics._id,
        image: 'https://picsum.photos/400/300?random=1',
        isOnSale: true
      },
      {
        name: 'Wireless Headphones',
        description: 'Noise-cancelling over-ear headphones.',
        price: 199.99,
        category: electronics._id,
        image: 'https://picsum.photos/400/300?random=2',
        isOnSale: true
      },
      {
        name: 'Cotton T-Shirt',
        description: 'Comfortable 100% cotton t-shirt.',
        price: 19.99,
        category: clothing._id,
        image: 'https://picsum.photos/400/300?random=3',
        isOnSale: false
      },
      {
        name: 'Laptop Pro',
        description: 'High-performance laptop for professionals.',
        price: 1299.99,
        category: electronics._id,
        image: 'https://picsum.photos/400/300?random=4',
        isOnSale: true
      },
      {
        name: 'Denim Jeans',
        description: 'Classic blue denim jeans.',
        price: 49.99,
        category: clothing._id,
        image: 'https://picsum.photos/400/300?random=5',
        isOnSale: true
      },
      {
        name: 'USB-C Cable',
        description: 'Durable USB-C charging cable.',
        price: 9.99,
        category: electronics._id,
        image: 'https://picsum.photos/400/300?random=6',
        isOnSale: true
      },
      {
        name: 'Running Shoes',
        description: 'Comfortable running shoes for daily wear.',
        price: 79.99,
        category: clothing._id,
        image: 'https://picsum.photos/400/300?random=7',
        isOnSale: true
      },
      {
        name: 'Tablet Device',
        description: 'Portable tablet with stunning display.',
        price: 499.99,
        category: electronics._id,
        image: 'https://picsum.photos/400/300?random=8',
        isOnSale: true
      },
      {
        name: 'Winter Jacket',
        description: 'Warm and stylish winter jacket.',
        price: 89.99,
        category: clothing._id,
        image: 'https://picsum.photos/400/300?random=9',
        isOnSale: false
      },
      {
        name: 'Smart Watch',
        description: 'Feature-rich smartwatch with fitness tracking.',
        price: 299.99,
        category: electronics._id,
        image: 'https://picsum.photos/400/300?random=10',
        isOnSale: true
      },
      {
        name: 'Leather Belt',
        description: 'Premium leather belt with metal buckle.',
        price: 39.99,
        category: clothing._id,
        image: 'https://picsum.photos/400/300?random=11',
        isOnSale: true
      },
      {
        name: 'Portable Speaker',
        description: 'Wireless portable Bluetooth speaker.',
        price: 129.99,
        category: electronics._id,
        image: 'https://picsum.photos/400/300?random=12',
        isOnSale: true
      }
    ]);

    console.log('Data seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
