const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const bcrypt = require("bcryptjs");
const UserModel = require("./Models/users");
const Product = require("./Models/Product");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

mongoose
	.connect("mongodb://127.0.0.1:27017/users")
	.then(() => {
		console.log("MongoDB connected");
	})
	.catch((err) => {
		console.error("MongoDB connection error:", err);
	});

app.use(
	session({
		secret: process.env.SESSION_SECRET || "lab3-session-secret",
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({
			mongoUrl: "mongodb://127.0.0.1:27017/users",
		}),
		cookie: { maxAge: 1000 * 60 * 60 * 24 },
	})
);
app.use(flash());

app.use((req, res, next) => {
	res.locals.currentUser = req.session.user || null;
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	next();
});

const isLoggedIn = (req, res, next) => {
	if (!req.session.user) {
		req.flash("error", "Please log in to continue.");
		return res.redirect("/login");
	}
	return next();
};

const isAdmin = (req, res, next) => {
	if (!req.session.user) {
		req.flash("error", "Please log in to continue.");
		return res.redirect("/login");
	}
	if (req.session.user.role !== "admin") {
		req.flash("error", "Access denied.");
		return res.redirect("/products");
	}
	return next();
};


app.post("/api/signin", (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({ message: "Email and password are required." });
	}
	return UserModel.findOne({ email: email.toLowerCase().trim() })
		.then(async (user) => {
			if (!user) {
				return res.status(401).json({ message: "Invalid email or password." });
			}
			const matches = await bcrypt.compare(password, user.password);
			if (!matches) {
				return res.status(401).json({ message: "Invalid email or password." });
			}
			req.session.user = {
				id: user._id.toString(),
				name: user.name,
				email: user.email,
				role: user.role,
			};
			return res.json({ message: "Signed in", user: req.session.user });
		})
		.catch((err) => res.status(500).json({ message: "Login failed", error: err.message }));
});


app.post("/api/signup", (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		return res.status(400).json({ message: "Name, email, and password are required." });
	}
	if (password.length < 6) {
		return res.status(400).json({ message: "Password must be at least 6 characters." });
	}
	return UserModel.findOne({ email: email.toLowerCase().trim() })
		.then((existing) => {
			if (existing) {
				return res.status(409).json({ message: "Email already in use." });
			}
			return UserModel.create({ name, email, password });
		})
		.then((user) => {
			if (!user) return null;
			req.session.user = {
				id: user._id.toString(),
				name: user.name,
				email: user.email,
				role: user.role,
			};
			return res.status(201).json({ message: "Registered", user: req.session.user });
		})
		.catch((err) => res.status(500).json({ message: "Signup failed", error: err.message }));
});

app.get("/login", (req, res) => {
	res.render("login");
});

app.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			req.flash("error", "Email and password are required.");
			return res.redirect("/login");
		}
		const user = await UserModel.findOne({ email: email.toLowerCase().trim() });
		if (!user) {
			req.flash("error", "Invalid email or password.");
			return res.redirect("/login");
		}
		const bcrypt = require("bcryptjs");
		const matches = await bcrypt.compare(password, user.password);
		if (!matches) {
			req.flash("error", "Invalid email or password.");
			return res.redirect("/login");
		}
		req.session.user = {
			id: user._id.toString(),
			name: user.name,
			email: user.email,
			role: user.role,
		};
		req.flash("success", `Welcome back, ${user.name}!`);
		req.session.save((err) => {
			if (err) {
				req.flash("error", "Session error.");
				return res.redirect("/login");
			}
			return res.redirect("/products");
		});
	} catch (err) {
		console.error("Login error:", err.message);
		req.flash("error", "Login failed.");
		return res.redirect("/login");
	}
});

app.get("/register", (req, res) => {
	res.render("register");
});

app.post("/register", async (req, res) => {
	try {
		const { name, email, password } = req.body;
		console.log("Register attempt:", { name, email });
		if (!name || !email || !password) {
			req.flash("error", "Name, email, and password are required.");
			return res.redirect("/register");
		}
		if (password.length < 6) {
			req.flash("error", "Password must be at least 6 characters.");
			return res.redirect("/register");
		}
		const existing = await UserModel.findOne({ email: email.toLowerCase().trim() });
		if (existing) {
			console.log("Email already exists");
			req.flash("error", "Email already in use.");
			return res.redirect("/register");
		}
		console.log("Creating user with email:", email.toLowerCase().trim());
		const user = await UserModel.create({ 
			name, 
			email: email.toLowerCase().trim(), 
			password,
			role: "customer"
		});
		console.log("User created:", user._id);
		req.session.user = {
			id: user._id.toString(),
			name: user.name,
			email: user.email,
			role: user.role,
		};
		req.flash("success", `Welcome, ${user.name}!`);
		req.session.save((err) => {
			if (err) {
				console.error("Session save error:", err.message);
				req.flash("error", "Session error.");
				return res.redirect("/register");
			}
			return res.redirect("/products");
		});
	} catch (err) {
		console.error("Registration error full:", err);
		req.flash("error", "Registration failed.");
		return res.redirect("/register");
	}
});

app.post("/logout", (req, res) => {
	req.session.user = null;
	req.flash("success", "You have successfully logged out.");
	req.session.save(() => {
		res.clearCookie("connect.sid");
		res.redirect("/login");
	});
});






app.get("/profile", isLoggedIn, (req, res) => {
	res.render("profile");
});

app.get("/checkout", isLoggedIn, (req, res) => {
	res.render("checkout");
});

app.get("/admin", isAdmin, (req, res) => {
	res.render("admin");
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

app.get("/", (req, res) => {
	res.redirect("/products");
});

app.listen(3001, () => {
  console.log("Server is running");
});