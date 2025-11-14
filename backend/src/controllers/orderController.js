import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { generateOrderNumber } from '../utils/orderNumber.js';
import { createOrder, verifyPayment } from '../utils/razorpay.js';
import { sendOrderConfirmationEmail } from '../utils/email.js';

export const getOrders = async (req, res, next) => {
  try {
    const query = req.user.role === 'admin' ? {} : { user: req.user.id };

    const orders = await Order.find(query)
      .populate('user', 'name email')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      data: { orders },
    });
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate({
        path: 'orderItems',
        populate: {
          path: 'product',
        },
      });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    if (req.user.role !== 'admin' && order.user._id.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this order',
      });
    }

    const orderItems = await OrderItem.find({ order: order._id }).populate('product');

    res.status(200).json({
      success: true,
      data: {
        order: {
          ...order.toObject(),
          orderItems,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const initiateCheckout = async (req, res, next) => {
  try {
    const { items, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty',
      });
    }

    if (!shippingAddress) {
      return res.status(400).json({
        success: false,
        message: 'Shipping address is required',
      });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId || item.id);
      if (!product || !product.isActive) {
        return res.status(404).json({
          success: false,
          message: `Product ${item.productId || item.id} not found`,
        });
      }

      const quantity = item.quantity || 1;
      if (product.stockQuantity < quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}`,
        });
      }

      const subtotal = product.price * quantity;
      totalAmount += subtotal;

      orderItems.push({
        product: product._id,
        quantity,
        priceAtPurchase: product.price,
        subtotal,
      });
    }

    const shippingAmount = 50;
    const finalAmount = totalAmount + shippingAmount;

    const orderNumber = generateOrderNumber();

    const razorpayOrder = await createOrder(finalAmount, 'INR', orderNumber);

    const order = await Order.create({
      orderNumber,
      user: req.user?.id || null,
      totalAmount,
      shippingAmount,
      finalAmount,
      razorpayOrderId: razorpayOrder.id,
      shippingAddress,
      status: 'pending',
      paymentStatus: 'pending',
    });

    for (const item of orderItems) {
      await OrderItem.create({
        order: order._id,
        ...item,
      });
    }

    res.status(201).json({
      success: true,
      message: 'Order initiated successfully',
      data: {
        order: {
          id: order._id,
          orderNumber: order.orderNumber,
          finalAmount: order.finalAmount,
        },
        razorpayOrderId: razorpayOrder.id,
        razorpayKeyId: process.env.RAZORPAY_KEY_ID,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const verifyCheckout = async (req, res, next) => {
  try {
    const { orderId, paymentId, signature, razorpayOrderId } = req.body;

    if (!orderId || !paymentId || !signature) {
      return res.status(400).json({
        success: false,
        message: 'Payment details are required',
      });
    }

    const order = await Order.findOne({
      $or: [{ _id: orderId }, { razorpayOrderId: razorpayOrderId || orderId }],
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    if (order.paymentStatus === 'paid') {
      return res.status(400).json({
        success: false,
        message: 'Order already paid',
      });
    }

    const isValid = verifyPayment(order.razorpayOrderId, paymentId, signature);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature',
      });
    }

    order.paymentStatus = 'paid';
    order.status = 'processing';
    order.razorpayPaymentId = paymentId;
    order.razorpaySignature = signature;
    await order.save();

    const orderItems = await OrderItem.find({ order: order._id }).populate('product');

    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { stockQuantity: -item.quantity },
      });
    }

    if (req.user) {
      await Cart.deleteMany({ user: req.user.id });
    }

    if (order.user) {
      const user = await order.populate('user');
      await sendOrderConfirmationEmail(order, user.user.email);
    } else if (order.shippingAddress.email) {
      await sendOrderConfirmationEmail(order, order.shippingAddress.email);
    }

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      data: {
        order: {
          id: order._id,
          orderNumber: order.orderNumber,
          status: order.status,
          paymentStatus: order.paymentStatus,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    order.status = status;
    await order.save();

    if (order.user) {
      const user = await order.populate('user');
      const { sendOrderStatusUpdateEmail } = await import('../utils/email.js');
      await sendOrderStatusUpdateEmail(order, user.user.email);
    }

    res.status(200).json({
      success: true,
      message: 'Order status updated',
      data: { order },
    });
  } catch (error) {
    next(error);
  }
};

export const cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    if (req.user.role !== 'admin' && order.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this order',
      });
    }

    if (order.status === 'delivered' || order.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel this order',
      });
    }

    order.status = 'cancelled';
    await order.save();

    if (order.paymentStatus === 'paid') {
      const orderItems = await OrderItem.find({ order: order._id }).populate('product');
      for (const item of orderItems) {
        await Product.findByIdAndUpdate(item.product._id, {
          $inc: { stockQuantity: item.quantity },
        });
      }
    }

    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully',
      data: { order },
    });
  } catch (error) {
    next(error);
  }
};

