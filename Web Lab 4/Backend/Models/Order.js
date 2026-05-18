const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		items: {
			type: Array,
			required: true,
		},
		total: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;