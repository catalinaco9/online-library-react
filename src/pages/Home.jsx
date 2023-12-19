import { useState, useEffect } from "react";
import ProductCard from "../components/Products/ProductCard";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const Home = () => {
  const [products, setProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [minPrice, setMinPrice] = useState(-1);
  const [maxPrice, setMaxPrice] = useState(-1);
  const [maxPriceAbsolute, setMaxPriceAbsolute] = useState(-1);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "https://657ad1a9394ca9e4af12bec4.mockapi.io/products"
      );
      const _products = await response.json();
      setProducts(_products);
      setFilteredProducts(_products);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const getMaxPrice = () => {
      // console.log("Home page: products -> ", products);
      let _maxPrice = Math.max(...products.map((_product) => _product.price));
      setMaxPriceAbsolute(Math.ceil(_maxPrice));
    };

    if (products !== null) getMaxPrice();
  }, [products]);

  useEffect(() => {
    setMinPrice(0);
    setMaxPrice(maxPriceAbsolute);
  }, [maxPriceAbsolute]);

  const filterProductsByPrice = (startPrice, endPrice) => {
    const filteredProductsByPrice = products.filter(
      (product) => product.price >= startPrice && product.price <= endPrice
    );
    setFilteredProducts(filteredProductsByPrice);
  };

  const handleSortByPriceRange = (e) => {
    e.preventDefault();
    filterProductsByPrice(minPrice, maxPrice);
  };

  const handleSortReset = (e) => {
    e.preventDefault();
    // show all books
    filterProductsByPrice(0, maxPriceAbsolute);
    // set text box values
    setMinPrice(0);
    setMaxPrice(maxPriceAbsolute);
  };

  const handlePriceChange = (e) => {
    // console.log("Home page: e ->", e);
    // set min value
    setMinPrice(e[0]);
    // set max value
    setMaxPrice(e[1]);
  };

  return filteredProducts && maxPriceAbsolute !== -1 ? (
    <div className="bg-purpleBackground ">
      <div className="flex item-center justify-center gap-4 p-5 text-center text-2xl">
        <div
          style={{
            width: "50%",
          }}
        >
          <p className="text-purple-dark">
            Filter by Price Range:
            <br />
          </p>
          <RangeSlider
            id="range-slider-gradient"
            style={{ background: "purple" }}
            className="margin-lg"
            defaultValue={[0, { maxPriceAbsolute }]}
            value={[minPrice, maxPrice]}
            max={maxPriceAbsolute}
            onInput={(e) => handlePriceChange(e)}
          />
          <div className="flex trasnparent justify-between items-center">
            Min:{" "}
            <input
              className="price-filter bg-transparent"
              type="number"
              value={minPrice}
              disabled={true}
             
            />
            Max:{" "}
            <input
              className="price-filter bg-transparent"
              type="number"
              value={maxPrice}
              disabled={true}
            />
          </div>
          <div className="flex">
            <button
              className="price-filter justify-start rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-large hover:bg-purple-dark hover:text-purple-light bg-purple-light text-purple-dark focus:outline-none focus:ring-4 focus:ring-purple"
              onClick={(e) => handleSortByPriceRange(e)}
            >
              sort
            </button>
            <button
              className="price-filter reset justify-end rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-large hover:bg-purple-dark hover:text-purple-light bg-purple-light text-purple-dark focus:outline-none focus:ring-4 focus:ring-purple"
              onClick={(e) => handleSortReset(e)}
            >
              reset
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(1, 1fr)",
              gap: "2px",
            }}
            key={product.id}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div>Loading ...</div>
  );
};

export default Home;
