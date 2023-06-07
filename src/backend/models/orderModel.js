const mongoose = require("mongoose");

const orderSchemma = new mongoose.Schema({
  orderItems: [
    {
      name: { type: String, reqired: true },
      price: { type: Number, reqired: true },
      quantity: { type: Number, reqired: true },
      image: { type: String, reqired: true },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  shippingInfo: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pinCode: { type: Number, required: true },
    phoneNo: { type: Number, require: true },
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInfo: {
    id: { type: String, require: true },
    status: { type: String, require: true },
    paidAt: { type: Date, require: true },
    id: { type: String, require: true },
    itemPrice: { type: Number, require: true, default: 0 },
    taxPrice: { type: Number, require: true, default: 0 },
    shippingPrice: { type: Number, require: true, default: 0 },
    totalPrice: { type: Number, require: true, default: 0 },
  },
  orderStatus: { type: String, required: true, default: "Processing" },
  deliveredAt: Date,
  creatdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchemma);
