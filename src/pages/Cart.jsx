import { useState, useEffect } from "react";
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
    <div className="p-10">
      <table className="table-auto w-full">
        <tbody>
          {productsInCart.map((productInCart) => {
            const product = getProductById(productInCart.id);
            return (
              <tr key={productInCart.id} className="border-b">
                <td className="px-4 py-2 font-bold">{product.name}</td>
                <td className="px-4 py-2">{product.author}</td>
                <td className="px-4 py-2">
                  <img width={80} src={product.imageURL} alt={product.name} />
                </td>
                <td className="px-4 py-2">{product.price}</td>
                <td className="px-4 py-2">
                  <div className="flex gap-5 items-center">
                    <button
                      id={productInCart.id}
                      className="hover:bg-purple-dark hover:text-purple-light bg-purple-light text-purple-dark focus:outline-none focus:ring-4 focus:ring-purple text-gray-800 font-bold py-2 px-4 rounded"
                      onClick={decreaseQuantity}
                    >
                      -
                    </button>
                    <td className="px-4 py-2">{productInCart.qt}</td>
                    <button
                      id={productInCart.id}
                      className="hover:bg-purple-dark hover:text-purple-light bg-purple-light text-purple-dark focus:outline-none focus:ring-4 focus:ring-purple text-gray-800 font-bold py-2 px-4 rounded"
                      onClick={increaseQuantity}
                    >
                      +
                    </button>
                    <button
                      id={productInCart.id}
                      className="bg-red hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                      onClick={deleteProductFromCart}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-center">
        <p className="text-2xl mt-4 font-bold ">Total: {totalSum.toFixed(2)} RON</p>
      </div>
    </div>
  ) : (
    <div>
      The cart is currently empty, please add{" "}
      <Link className="underline text-blue-600" to="/">
        products
      </Link>
    </div>
  );
};

export default Cart;
