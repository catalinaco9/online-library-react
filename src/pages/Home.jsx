import { useState, useEffect } from "react";
import ProductCard from "../components/products/ProductCard";

const Home = () => {
  const [products, setProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);

  useEffect(() => {
    const fetchPProducts = async () => {
      const response = await fetch(
        "https://652bdb7dd0d1df5273eecee2.mockapi.io/products"
      );
      const products = await response.json();
      setProducts(products);
      setFilteredProducts(products);
    };

    fetchPProducts();
  }, []);

  const filterProductsByPrice = (startPrice, endPrice) => {
    const filterProductsByPrice = products.filter(
      (product) => product.price >= startPrice && product.price <= endPrice
    );
    setFilteredProducts(filterProductsByPrice);
  };

  return filteredProducts ? (
    <div>
      <div className="flex gap-4 p-5 text-center text-2xl ">
        <div>
          <input
            className="h-6 w-6"
            type="checkbox"
            id="filter1"
            onChange={(e) => {
              if (e.target.checked) {
                filterProductsByPrice(0, 499);
              }
            }}
          />
          <label htmlFor="filter1">0-499 lei</label>
        </div>
        <div>
          <input className="h-6 w-6" type="checkbox" id="filter2" />
          <label htmlFor="filter2"> mai mare de 500 lei</label>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filterProductsByPrice.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div> LOADING....</div>
  );
};

export default Home;
