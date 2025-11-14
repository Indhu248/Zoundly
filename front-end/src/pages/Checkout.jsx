import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { api } from "../utils/api";
import { ArrowLeft, ShoppingBag } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart();
  const { isAuthenticated, user } = useAuth();
  
  // Get checkout type: 'buy-now' (single product) or 'cart' (multiple items)
  const checkoutType = location.state?.type || 'cart';
  const productId = location.state?.productId;
  
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    loadCheckoutItems();
  }, [checkoutType, productId, cart, isAuthenticated, navigate]);

  const loadCheckoutItems = async () => {
    try {
      setLoading(true);
      if (checkoutType === 'buy-now' && productId) {
        // Single product checkout
        const response = await api.getProduct(productId);
        const product = response.data.product;
        setCheckoutItems([{
          id: product._id || product.id,
          productId: product._id || product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: 1
        }]);
      } else if (checkoutType === 'cart') {
        // Cart checkout
        if (cart.length === 0) {
          navigate("/cart");
          return;
        }
        const itemsWithPrices = cart.map(cartItem => {
          const product = cartItem.product || cartItem;
          return {
            id: product._id || product.id,
            productId: product._id || product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            quantity: cartItem.quantity || 1
          };
        });
        setCheckoutItems(itemsWithPrices);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to load checkout items:", error);
      navigate("/products");
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = checkoutItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = totalAmount > 0 ? 50 : 0;
  const finalAmount = totalAmount + shipping;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = async () => {
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.pincode) {
      alert("Please fill in all the required fields");
      return;
    }

    try {
      setProcessing(true);

      // Prepare items for backend
      const items = checkoutItems.map(item => ({
        productId: item.productId || item.id,
        quantity: item.quantity || 1
      }));

      // Initiate checkout with backend
      const response = await api.initiateCheckout({
        items,
        shippingAddress: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          pincode: formData.pincode,
        }
      });

      const { razorpayOrderId, razorpayKeyId, order } = response.data;

      // Prepare Razorpay options
      const options = {
        key: razorpayKeyId,
        amount: order.finalAmount * 100,
        currency: "INR",
        name: "Zoundly",
        description: checkoutItems.length === 1 
          ? checkoutItems[0].name 
          : `Order for ${checkoutItems.length} items`,
        image: checkoutItems[0]?.image || "/logo.png",
        order_id: razorpayOrderId,
        handler: async function (response) {
          try {
            // Verify payment with backend
            await api.verifyCheckout({
              orderId: order.id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              razorpayOrderId: razorpayOrderId
            });

            alert("Payment Successful!");
            navigate("/", { state: { paymentSuccess: true, orderNumber: order.orderNumber } });
          } catch (error) {
            console.error("Payment verification failed:", error);
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#000000",
        },
        modal: {
          ondismiss: function() {
            console.log("Payment cancelled");
            setProcessing(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Checkout failed:", error);
      alert(error.message || "Failed to initiate checkout. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading checkout...</p>
      </div>
    );
  }

  if (checkoutItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">No items to checkout</p>
          <button
            onClick={() => navigate("/products")}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-black mb-4"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Summary */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Order Items</h2>
              <div className="space-y-4">
                {checkoutItems.map((item) => (
                  <div key={item.id || item.cartItemId} className="flex gap-4 pb-4 border-b last:border-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-lg font-semibold mt-1">₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <ShoppingBag size={20} />
                Order Summary
              </h2>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>₹{shipping}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{finalAmount}</span>
                </div>
              </div>
              <button
                onClick={handlePayment}
                disabled={processing}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? "Processing..." : "Proceed to Payment"}
              </button>
              <p className="text-xs text-gray-500 mt-4 text-center">
                You will be redirected to Razorpay for secure payment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

