const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const UserModel = require("./Models/users");
const Product = require("./Models/Product");
const Order = require("./Models/Order");

const app = express();
app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const JWT_SECRET = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	const token = authHeader.split(" ")[1];

	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		req.user = decoded;
		next();
	} catch (err) {
		return res.status(403).json({ message: "Forbidden" });
	}
}

mongoose
	.connect("mongodb://127.0.0.1:27017/users")
	.then(() => {
		console.log("MongoDB connected");
	})
	.catch((err) => {
		console.error("MongoDB connection error:", err);
	});


app.post("/api/signin", (req, res) => {
	res.status(501).json({ message: "Not implemented" });
});


app.post("/api/v1/auth/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await UserModel.findOne({ email, password });

		if (!user) {
			return res.status(401).json({ message: "Invalid email or password" });
		}

		if (!JWT_SECRET) {
			return res.status(500).json({ message: "JWT secret not configured" });
		}

		const token = jwt.sign(
			{ user_id: user._id, role: user.role },
			JWT_SECRET,
			{ expiresIn: "1h" }
		);

		res.json({ token });
	} catch (err) {
		res.status(500).json({ message: "Login failed" });
	}
});


app.post("/api/signup", (req, res) => {
	UserModel.create(req.body)
		.then((user) => res.json(user))
		.catch((err) => res.status(500).json(err));
});

app.get("/api/v1/products", async (req, res) => {
	const pageSize = 8;
	const page = Math.max(parseInt(req.query.page, 10) || 1, 1);

	const search = (req.query.search || "").trim();
	const category = (req.query.category || "").trim();
	const minPrice = parseFloat(req.query.minPrice);
	const maxPrice = parseFloat(req.query.maxPrice);
	const sort = (req.query.sort || "").trim();

	const filter = {};
	if (search) {
		filter.name = { $regex: search, $options: "i" };
	}
	if (category) {
		filter.category = category;
	}
	if (!Number.isNaN(minPrice) || !Number.isNaN(maxPrice)) {
		filter.price = {};
		if (!Number.isNaN(minPrice)) {
			filter.price.$gte = minPrice;
		}
		if (!Number.isNaN(maxPrice)) {
			filter.price.$lte = maxPrice;
		}
	}

	let sortSpec = { name: 1 };
	if (sort === "price-asc") sortSpec = { price: 1 };
	if (sort === "price-desc") sortSpec = { price: -1 };
	if (sort === "rating-desc") sortSpec = { rating: -1 };

	try {
		const total = await Product.countDocuments(filter);
		const totalPages = Math.max(Math.ceil(total / pageSize), 1);
		const safePage = Math.min(page, totalPages);

		const products = await Product.find(filter)
			.sort(sortSpec)
			.skip((safePage - 1) * pageSize)
			.limit(pageSize)
			.lean();

		res.json({
			products,
			page: safePage,
			totalPages,
			total,
		});
	} catch (err) {
		res.status(500).json({ message: "Failed to load products" });
	}
});

app.get("/api/v1/products/:id", async (req, res) => {
	try {
		const product = await Product.findById(req.params.id).lean();
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		res.json(product);
	} catch (err) {
		res.status(500).json({ message: "Failed to load product" });
	}
});

app.post("/api/v1/orders", verifyToken, async (req, res) => {
	try {
		const order = await Order.create({
			userId: req.user.user_id,
			items: req.body.items,
			total: req.body.total || 0,
		});

		res.status(201).json(order);
	} catch (err) {
		res.status(500).json({ message: "Failed to create order" });
	}
});

app.get("/api/v1/user/profile", verifyToken, async (req, res) => {
	try {
		const user = await UserModel.findById(req.user.user_id).select("-password").lean();
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.json(user);
	} catch (err) {
		res.status(500).json({ message: "Failed to load profile" });
	}
});

app.get("/products", async (req, res) => {
	const pageSize = 8;
	const page = Math.max(parseInt(req.query.page, 10) || 1, 1);

	const search = (req.query.search || "").trim();
	const category = (req.query.category || "").trim();
	const minPrice = parseFloat(req.query.minPrice);
	const maxPrice = parseFloat(req.query.maxPrice);
	const sort = (req.query.sort || "").trim();

	const filter = {};
	if (search) {
		filter.name = { $regex: search, $options: "i" };
	}
	if (category) {
		filter.category = category;
	}
	if (!Number.isNaN(minPrice) || !Number.isNaN(maxPrice)) {
		filter.price = {};
		if (!Number.isNaN(minPrice)) {
			filter.price.$gte = minPrice;
		}
		if (!Number.isNaN(maxPrice)) {
			filter.price.$lte = maxPrice;
		}
	}

	let sortSpec = { name: 1 };
	if (sort === "price-asc") sortSpec = { price: 1 };
	if (sort === "price-desc") sortSpec = { price: -1 };
	if (sort === "rating-desc") sortSpec = { rating: -1 };

	try {
		const total = await Product.countDocuments(filter);
		const totalPages = Math.max(Math.ceil(total / pageSize), 1);
		const safePage = Math.min(page, totalPages);

		const products = await Product.find(filter)
			.sort(sortSpec)
			.skip((safePage - 1) * pageSize)
			.limit(pageSize)
			.lean();

		const categories = await Product.distinct("category");

		const queryString = new URLSearchParams({
			search: search || undefined,
			category: category || undefined,
			minPrice: Number.isNaN(minPrice) ? undefined : String(minPrice),
			maxPrice: Number.isNaN(maxPrice) ? undefined : String(maxPrice),
			sort: sort || undefined,
		}).toString();

		res.render("products", {
			products,
			categories,
			page: safePage,
			totalPages,
			total,
			search,
			category,
			minPrice: Number.isNaN(minPrice) ? "" : minPrice,
			maxPrice: Number.isNaN(maxPrice) ? "" : maxPrice,
			sort,
			queryString,
		});
	} catch (err) {
		console.error("Failed to load products:", err);
		res.status(500).send("Failed to load products.");
	}
});




app.listen(3001, () => {
  console.log("Server is running");
});