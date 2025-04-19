import { useCart } from "../../context/CartContext";
// import ProductCard from "../../Components/ProductCard";
import { X } from "lucide-react";
import Navbar from "../../Components/Navbar";
import Products from "../product-components/Products";
import CartProductCard from "./CartProductCard";

function Cart() {
  const { cart, dispatch} = useCart();

  return (
    <div className="min-h-screen py-10 px-4 md:px-16">
      <h2 className="text-2xl font-bold mb-2">Your Cart</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
        {cart.map(item => (
          <div key={item.cartItemId} id={item.id} className="relative flex justify-between items-center mb-2">
            <CartProductCard name={item.name} image={item.image} desc={item.desc} id={item.id} />
            <button
              onClick={() =>
                dispatch({ type: "REMOVE_FROM_CART", payload: item.cartItemId })
              }
              className=" absolute bg-red-500 top-0 right-0 px-2 py-2 rounded-full"
            >
              <X className="size-4 text-white"/>
            </button>

          </div>
        ))}
        </div>
      {/* <button onClick={toggle} className="text-blue-600 mt-2">Close</button> */}
    </div>
  );
}

export default Cart;
