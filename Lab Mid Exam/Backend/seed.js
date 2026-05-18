const mongoose = require("mongoose");
const Product = require("./Models/Product");

const sampleProducts = [
  { name: "Glow Facewash", price: 1999, category: "Body", rating: 4.3, stock: 60 },
  { name: "Glow Body Wash", price: 2999, category: "Body", rating: 4.3, stock: 60 },
  { name: "Glow Bundle", price: 3999, category: "Body", rating: 4.4, stock: 45 },
  { name: "Sunge Perfume", price: 4999, category: "Body", rating: 4.2, stock: 30 },
  { name: "De-Tan Sunscreen", price: 1999, category: "Face", rating: 4.5, stock: 50 },
  { name: "Lip Lightener Balm", price: 2999, category: "Face", rating: 4.2, stock: 40 },
  { name: "Under Eye Balm", price: 4999, category: "Face", rating: 4.4, stock: 25 },
  { name: "Hair Hold Cream", price: 1099, category: "Hair", rating: 4.1, stock: 55 },
  { name: "Anti-Hairfall Shampoo", price: 1099, category: "Hair", rating: 4.2, stock: 70 },
  { name: "Anti-Hairfall Bundle (Complete Hair Loss Solution)", price: 1978, category: "Hair", rating: 4.3, stock: 35 },
  { name: "Ultimate Skin and Hair Care Bundle", price: 2499, category: "Hair", rating: 4.4, stock: 30 },
  { name: "Beard Growth Kit", price: 3799, category: "Beard", rating: 4.5, stock: 28 },
  { name: "De Tan Body Wash", price: 2999, category: "Body", rating: 4.2, stock: 45 },
  { name: "Charcoal Body Wash", price: 699, category: "Body", rating: 4.1, stock: 80 },
  { name: "Lip Balm", price: 3999, category: "Body", rating: 4.3, stock: 40 },
];

async function seed() {
  await mongoose.connect("mongodb://127.0.0.1:27017/users");

  await Product.deleteMany({});
  await Product.insertMany(sampleProducts);
  console.log("Seeded products:", sampleProducts.length);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  mongoose.disconnect();
});
