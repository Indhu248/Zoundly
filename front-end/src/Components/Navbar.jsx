import React, { useEffect, useState } from "react";
import { logoImage, VectorImage } from "../assets";
import { Menu, X, User } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const count = cart.length;

  const nav_links = [
    { name: "Home", link: "/" },
    { name: "Products", link: "/products" },
    { name: "New Arrivals", link: "/products" },
    // { name: 'Categories' },
    { name: "About" },
    { name: "Contact" },
  ];

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 70);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`z-50 w-full transition-all duration-300 ${
        isScrolled ? "fixed top-0 bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center px-4 py-0 md:px-16">
        {/* Logo */}
        <img
          src={logoImage}
          alt="Logo"
          className="w-[100px] h-[80px] object-contain"
        />

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-6">
          {nav_links.map((link, index) => (
            <li>
              <button
                onClick={() => navigate(link.link)}
                className="text-sm text-black hover:text-[#C3FF6A] cursor-pointer transition bg-transparent border-none"
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>

        {/* Cart & Auth & Toggle */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Cart */}
          <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
            <img src={VectorImage} alt="Cart" className="w-6" />
            {count > 0 && (
              <p className="absolute top-[-8px] right-[-8px] bg-black text-[#F1FFC1] text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                {count}
              </p>
            )}
          </div>

          {/* Auth Section */}
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/settings')}
                className="hidden md:flex items-center gap-2 text-sm text-gray-700 hover:text-black transition-colors"
              >
                {user?.profilePhoto ? (
                  <img
                    src={user.profilePhoto}
                    alt={user?.name || 'Profile'}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                )}
                <span>{user?.name || user?.email}</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/login")}
                className="text-sm text-black hover:text-gray-600 transition px-3 py-1"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="text-sm bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-black"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden px-6 py-4 bg-white shadow-sm">
          <ul className="flex flex-col gap-4 mb-4">
            {nav_links.map((link, index) => (
              <li key={index}>
                <button
                  onClick={() => navigate(link.link)}
                  className="text-sm text-black hover:text-[#C3FF6A] cursor-pointer transition bg-transparent border-none"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
          {isAuthenticated && (
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  navigate('/settings');
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 text-sm text-black hover:text-[#C3FF6A] transition"
              >
                {user?.profilePhoto ? (
                  <img
                    src={user.profilePhoto}
                    alt={user?.name || 'Profile'}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5" />
                )}
                <span>{user?.name || user?.email}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
