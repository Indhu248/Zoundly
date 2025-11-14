import express from 'express';
import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';
import Product from '../models/Product.js';
import { verifyWebhookSignature } from '../utils/razorpay.js';
import { sendOrderConfirmationEmail } from '../utils/email.js';

const router = express.Router();

router.post('/razorpay', async (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const payload = req.body;

    if (!verifyWebhookSignature(payload, signature)) {
      return res.status(400).json({ success: false, message: 'Invalid signature' });
    }

    const event = payload.event;

    if (event === 'payment.captured') {
      const payment = payload.payload.payment.entity;
      const orderId = payment.order_id;

      const order = await Order.findOne({ razorpayOrderId: orderId });

      if (order && order.paymentStatus !== 'paid') {
        order.paymentStatus = 'paid';
        order.status = 'processing';
        order.razorpayPaymentId = payment.id;
        await order.save();

        const orderItems = await OrderItem.find({ order: order._id }).populate('product');

        for (const item of orderItems) {
          await Product.findByIdAndUpdate(item.product._id, {
            $inc: { stockQuantity: -item.quantity },
          });
        }

        if (order.user) {
          const user = await order.populate('user');
          await sendOrderConfirmationEmail(order, user.user.email);
        } else if (order.shippingAddress.email) {
          await sendOrderConfirmationEmail(order, order.shippingAddress.email);
        }
      }
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ success: false, message: 'Webhook processing failed' });
  }
});

export default router;

