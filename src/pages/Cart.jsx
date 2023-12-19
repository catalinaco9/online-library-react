import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [products, setProducts] = useState(null);
  const [totalSum, setTotalSum] = useState(0);
  const [productsInCart, setProductsInCart] = useState(
    JSON.parse(window.localStorage.getItem("cart"))
  );

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "https://657ad1a9394ca9e4af12bec4.mockapi.io/products"
      );
      const products = await response.json();
      setProducts(products);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (products && productsInCart) {
      const sum = productsInCart.reduce((acc, productInCart) => {
        const product = getProductById(productInCart.id);
        return acc + product.price * productInCart.qt;
      }, 0);

      setTotalSum(sum);
    }
  }, [productsInCart, products]);

  const getProductById = (id) => {
    const product = products.find((product) => product.id === id);
    return product;
  };

  const handleProductQuantity = (productsInCart, productId, action) => {
    const currentProduct = productsInCart.find(
      (product) => product.id === productId
    );
    const indexOfProductToBeDeleted = productsInCart.indexOf(currentProduct);

    switch (action) {
      case "decrease":
        if (currentProduct.qt > 1) currentProduct.qt = currentProduct.qt - 1;
        break;
      case "increase":
        currentProduct.qt = currentProduct.qt + 1;
        break;
      case "delete":
        productsInCart.splice(indexOfProductToBeDeleted, 1);
        break;
    }

    if (productsInCart.length === 0) {
      localStorage.removeItem("cart");
      setProductsInCart(null);
    } else {
      localStorage.setItem("cart", JSON.stringify(productsInCart));
      setProductsInCart(productsInCart);
    }
  };

  const decreaseQuantity = (e) => {
    const productsInCart =
      JSON.parse(window.localStorage.getItem("cart")) ?? [];
    handleProductQuantity(productsInCart, e.target.id, "decrease");
  };

  const increaseQuantity = (e) => {
    const productsInCart =
      JSON.parse(window.localStorage.getItem("cart")) ?? [];
    handleProductQuantity(productsInCart, e.target.id, "increase");
  };

  const deleteProductFromCart = (e) => {
    const productsInCart =
      JSON.parse(window.localStorage.getItem("cart")) ?? [];
    handleProductQuantity(productsInCart, e.target.id, "delete");
  };

  return products && productsInCart ? (
    <div className=" bg-purpleBackground p-10 gap-10 flex flex-col justify-center items-center">
      {productsInCart.map((productInCart) => {
        const product = getProductById(productInCart.id);

        return (
          <div
            className="flex flex-row gap-20 justify-around items-center "
            key={productInCart.id}
          >
            <p>{product.name}</p>
            <p>{product.author}</p>
            <img width={80} src={product.imageURL} />
            <p>{product.price}</p>
            <div className="flex gap-5 items-center">
              <button
                id={productInCart.id}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={decreaseQuantity}
              >
                -
              </button>
              <p>{productInCart.qt}</p>
              <button
                id={productInCart.id}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={increaseQuantity}
              >
                +
              </button>
              <button
                id={productInCart.id}
                className="bg-red-400 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={deleteProductFromCart}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
      <p className="text-2xl">Total: {totalSum} RON</p>
    </div>
  ) : (
    <div>
      Cosul este momentan gol, va rugam sa adaugati produse din{" "}
      <Link className="underline text-blue-600" to="/">
        pagina de produse
      </Link>
    </div>
  );
};

export default Cart;
