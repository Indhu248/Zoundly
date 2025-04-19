import ProductCard from "./ProductCard";
// import products from "../data/products"; 
import {products} from '../../assets/index.js'
// Assuming you have product data

function ProductList() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
