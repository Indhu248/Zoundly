import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../utils/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      setCart([]);
    }
  }, [isAuthenticated]);

  const loadCart = async () => {
    try {
      setLoading(true);
      const response = await api.getCart();
      setCart(response.data.cart || []);
    } catch (error) {
      console.error("Failed to load cart:", error);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!isAuthenticated) {
      alert("Please login to add items to cart");
      return { success: false };
    }

    try {
      await api.addToCart(productId, quantity);
      await loadCart();
      return { success: true };
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert(error.message || "Failed to add item to cart");
      return { success: false, message: error.message };
    }
  };

  const removeFromCart = async (itemId) => {
    if (!isAuthenticated) return;

    try {
      await api.removeFromCart(itemId);
      await loadCart();
    } catch (error) {
      console.error("Failed to remove from cart:", error);
      alert(error.message || "Failed to remove item from cart");
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    if (!isAuthenticated) return;

    try {
      await api.updateCartItem(itemId, quantity);
      await loadCart();
    } catch (error) {
      console.error("Failed to update cart:", error);
      alert(error.message || "Failed to update cart item");
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) return;

    try {
      await api.clearCart();
      setCart([]);
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
