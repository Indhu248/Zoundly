import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Products from './pages/Products'
import Cart from "./pages/cart-components/Cart";
import Template from "./pages/Template";
import Products from "./pages/product-components/Products";
import ViewProduct from "./pages/product-components/ViewProduct";
import MiniLayout from "./Components/MiniLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Template />} />
        <Route element={<MiniLayout />}>
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<ViewProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
