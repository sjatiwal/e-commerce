const catchAsyncError = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");

// Creat New Order
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    itemPrice,
    shippingInfo,
    shippingPrice,
    orderItems,
    paymentInfo,
    taxPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    itemPrice,
    shippingInfo,
    shippingPrice,
    orderItems,
    paymentInfo,
    taxPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(200).json({ success: true, order });
});

// Single User Orders
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order Not Found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//My Orders
exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  if (!orders) {
    return next(new ErrorHandler("Order Not Found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get All Orders
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  if (!orders) {
    return next(new ErrorHandler("Order Not Found with this Id", 404));
  }
  let totalAmount = 0;
  orders.map((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// Update Order
exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order Not Found with this Id", 404));
  }
  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("Product already delivered", 404));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (order) => {
      await updateStock(order.product, order.quantity);
    });
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// Delete Orders
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order Not Found with this Id", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});
