const Order = require("../models/Order");
const Cart = require("../models/Cart");

// CREATE ORDER
const createOrder = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("products.product");

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalPrice = cart.products.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);

    const order = await Order.create({
      user: req.user._id,
      products: cart.products.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      totalPrice,
    });

    cart.products = [];
    await cart.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET USER ORDERS
const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).populate("products.product");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("products.product");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // security check
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createOrder,
  getUserOrders,
  getSingleOrder
};