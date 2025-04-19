import React from "react";
import { useParams } from "react-router-dom";
import { products } from "../../assets/index.js";
import Navbar from "../../Components/Navbar";
import { useCart } from "../../context/CartContext.jsx";
// import { products } from '../data/products'; // Update path if needed

const ViewProduct = () => {
  const { dispatch } = useCart();
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const {
    name,
    description,
    features,
    images,
    image,
    price,
    originalPrice,
    discount,
    rating,
  } = product;
  const desc = description;

  const handlePayment = () => {
    const options = {
      key: "rzp_test_lBdUkVLTM5UgqK", // Replace with your actual Razorpay key
      amount: price * 100, // amount in paisa
      currency: "INR",
      name: name,
      description: desc,
      image: image,
      handler: function (response) {
        alert("Payment Successful!");
        console.log("Payment ID:", response.razorpay_payment_id);
        // you can store the payment info in your DB here if needed
      },
      prefill: {
        name: "Indu",
        email: "customer@example.com", // Optional
        contact: "9999999999", // Optional
      },
      theme: {
        color: "#000000",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (!product) return <div className="p-10">Product not found.</div>;

  return (
    <div className="min-h-[80vh] px-6 py-10 md:px-10 lg:px-20 flex flex-col lg:flex-row items-center justify-center lg:items-start gap-10">
      {/* Image Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center">
        <img
          src={image}
          alt={product.name}
          className="w-full max-w-[300px] sm:max-w-[400px] rounded-lg shadow-md"
        />
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Product ${index}`}
              className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded cursor-pointer border border-gray-300 hover:border-black"
            />
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="w-full lg:w-1/2">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">{name}</h1>
        <p className="text-gray-600 mb-4 text-sm sm:text-base">{description}</p>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-lg sm:text-xl font-bold text-green-600">
            ₹{price}
          </span>
          <span className="text-sm sm:text-base text-gray-400 line-through">
            ₹{originalPrice}
          </span>
          <span className="text-sm sm:text-base text-red-500">
            ({discount}% OFF)
          </span>
        </div>

        <p className="text-yellow-600 mb-4 text-sm sm:text-base">
          ⭐ {rating} / 5
        </p>

        <ul className="mb-6 list-disc list-inside text-gray-700 text-sm sm:text-base">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="w-full sm:w-auto bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
            onClick={() =>
              dispatch({ type: "ADD_TO_CART", payload: { id, name, image, desc } })
            }
          >
            Add to Cart
          </button>
          <button
            className="w-full sm:w-auto bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
            onClick={handlePayment}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
