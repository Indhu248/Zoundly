import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./pages/cart-components/Cart";
import Template from "./pages/Template";
import Products from "./pages/product-components/Products";
import ViewProduct from "./pages/product-components/ViewProduct";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import DebugProducts from "./pages/DebugProducts";
import MiniLayout from "./Components/MiniLayout";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Template />} />
        <Route element={<MiniLayout />}>
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<ViewProduct />} />
        <Route path="/checkout" element={<Checkout />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/debug/products" element={<DebugProducts />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
