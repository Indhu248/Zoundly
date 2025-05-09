import React, { useContext, useEffect, useState } from "react";
import { logoImage, VectorImage } from "../assets";
import { Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
// import { link } from 'fs';
// import { link } from 'fs';

const Navbar = () => {
  // const [count, setCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart } = useCart();
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

        {/* Cart & Toggle */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Cart */}
          <div className="relative" onClick={() => navigate("/cart")}>
            <img src={VectorImage} alt="Cart" className="w-6" />
            <p className="absolute top-[-8px] right-[-8px] bg-black text-[#F1FFC1] text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
              {count}
            </p>
          </div>

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
        <ul className="md:hidden px-6 py-4 flex flex-col gap-4 bg-white shadow-sm">
          {nav_links.map((link, index) => (
            <li
              >
              <button
      onClick={() => navigate(link.link)}
      className="text-sm text-black hover:text-[#C3FF6A] cursor-pointer transition bg-transparent border-none"
    >
      {link.name}
    </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Navbar;
