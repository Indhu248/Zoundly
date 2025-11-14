import { useCart } from "../../context/CartContext";
import { X, ShoppingBag } from "lucide-react";
import CartProductCard from "./CartProductCard";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, loading } = useCart();
  const navigate = useNavigate();

  const totalAmount = cart.reduce((sum, item) => {
    const productPrice = item.product?.price || item.price || 0;
    const quantity = item.quantity || 1;
    return sum + (productPrice * quantity);
  }, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/checkout", {
      state: {
        type: "cart",
      },
    });
  };

  return (
    <div className="min-h-screen py-10 px-4 md:px-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Cart</h2>
        {cart.length > 0 && (
          <div className="flex items-center gap-4">
            <div className="text-lg font-semibold">
              Total: ₹{totalAmount}
            </div>
            <button
              onClick={handleCheckout}
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition flex items-center gap-2"
            >
              <ShoppingBag size={20} />
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate("/products")}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Browse Products
          </button>
        </div>
      ) : loading ? (
        <div className="text-center py-20">
          <p className="text-lg">Loading cart...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
          {cart.map(item => {
            const product = item.product || item;
            const itemId = item._id || item.cartItemId;
            return (
              <div key={itemId} className="relative flex justify-between items-center mb-2">
                <CartProductCard 
                  name={product.name} 
                  image={product.image} 
                  desc={product.description || product.desc} 
                  id={product._id || product.id} 
                />
                <button
                  onClick={() => removeFromCart(itemId)}
                  className="absolute bg-red-500 top-0 right-0 px-2 py-2 rounded-full"
                >
                  <X className="size-4 text-white"/>
                </button>
              </div>
            );
          })}
        </div>
      )}
      {/* <button onClick={toggle} className="text-blue-600 mt-2">Close</button> */}
    </div>
  );
}

export default Cart;
