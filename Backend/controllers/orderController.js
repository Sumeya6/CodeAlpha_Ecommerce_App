const Order = require("../models/Order");


// CREATE ORDER
const createOrder = async (req, res,next) => {

  try {

    const { user, products, totalPrice } = req.body;

    const order = await Order.create({
      user,
      products,
      totalPrice
    });

    res.status(201).json({message:"order sucessful"});

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


// GET USER ORDERS
const getUserOrders = async (req, res,next) => {

  try {

    const orders = await Order.find({
      user: req.params.userId
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