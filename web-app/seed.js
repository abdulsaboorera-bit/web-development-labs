const mongoose = require('mongoose');
const config = require('config');
const Category = require('./models/Category');
const Product = require('./models/Product');

const MONGO_URI = config.get('mongoURI');

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to DB for seeding...');

    await Category.deleteMany({});
    await Product.deleteMany({});

    const electronics = await Category.create({ name: 'Electronics', description: 'Gadgets and devices' });
    const clothing = await Category.create({ name: 'Clothing', description: 'Apparel and accessories' });

    await Product.create([
      {
        name: 'Smartphone Pro Max',
        description: 'The latest smartphone with amazing features.',
        price: 999.99,
        category: electronics._id,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop'
      },
      {
        name: 'Wireless Headphones',
        description: 'Noise-cancelling over-ear headphones.',
        price: 199.99,
        category: electronics._id,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop'
      },
      {
        name: 'Cotton T-Shirt',
        description: 'Comfortable 100% cotton t-shirt.',
        price: 19.99,
        category: clothing._id,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop'
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
