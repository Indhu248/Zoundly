import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

export const getCart = async (req, res, next) => {
  try {
    const cartItems = await Cart.find({ user: req.user.id }).populate('product');

    res.status(200).json({
      success: true,
      data: { cart: cartItems },
    });
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    if (product.stockQuantity < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock',
      });
    }

    let cartItem = await Cart.findOne({
      user: req.user.id,
      product: productId,
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      if (cartItem.quantity > product.stockQuantity) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient stock',
        });
      }
      await cartItem.save();
    } else {
      cartItem = await Cart.create({
        user: req.user.id,
        product: productId,
        quantity,
      });
    }

    await cartItem.populate('product');

    res.status(201).json({
      success: true,
      message: 'Item added to cart',
      data: { cartItem },
    });
  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const cartItem = await Cart.findById(req.params.itemId).populate('product');

    if (!cartItem || cartItem.user.toString() !== req.user.id.toString()) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found',
      });
    }

    if (quantity > cartItem.product.stockQuantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock',
      });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({
      success: true,
      message: 'Cart item updated',
      data: { cartItem },
    });
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const cartItem = await Cart.findById(req.params.itemId);

    if (!cartItem || cartItem.user.toString() !== req.user.id.toString()) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found',
      });
    }

    await Cart.findByIdAndDelete(req.params.itemId);

    res.status(200).json({
      success: true,
      message: 'Item removed from cart',
    });
  } catch (error) {
    next(error);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    await Cart.deleteMany({ user: req.user.id });

    res.status(200).json({
      success: true,
      message: 'Cart cleared',
    });
  } catch (error) {
    next(error);
  }
};

