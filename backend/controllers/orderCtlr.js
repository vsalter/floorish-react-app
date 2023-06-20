import asyncHandler from '../middleware/asyncHandler.js';
import order from '../models/order.js';


const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const Order = new order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await Order.save();

    res.status(201).json(createdOrder);
  }
});

const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await order.find({ user: req.user._id});
    res.status(200).json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
    const Order = await order.findById(req.params.id).populate('user', 'name email');

    if (Order) {
        res.status(200).json(Order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
    const Order = await order.findById(req.params.id);

    if (Order){
      Order.isPaid = true;
      Order.paidAt = Date.now();
      Order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      const updatedOrder = await Order.save();

      res.status(200).json(updatedOrder);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const Order = await order.findById(req.params.id);

    if (Order) {
      Order.isDelivered = true;
      Order.deliveredAt = Date.now();

      const updatedOrder = await Order.save();

      res.status(200).json(updatedOrder);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
});

const getOrders = asyncHandler(async (req, res) => {
    const orders = await order.find({}).populate('user', 'id name');
    res.status(200).json(orders);
});


export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders,
};