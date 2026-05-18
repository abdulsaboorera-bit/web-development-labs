const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
	name: { type: String, required: true, trim: true },
	email: { type: String, required: true, unique: true, lowercase: true, trim: true },
	password: { type: String, required: true, minlength: 6 },
	role: { type: String, default: "customer", enum: ["customer", "admin"] },
});

UserSchema.pre("save", async function () {
	if (!this.isModified("password")) {
		return;
	}
	this.password = await bcrypt.hash(this.password, 10);
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;