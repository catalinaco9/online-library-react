import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Details = (props) => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  // console.log("Details page: id -> ", id);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "https://657ad1a9394ca9e4af12bec4.mockapi.io/products"
      );
      const products = await response.json();
      setProduct(getProductById(products, id));
    };

    const getProductById = (products, _id) => {
      const _product = products.find((product) => product.id === _id);
      return _product;
    };

    fetchProducts();
  }, [id]);

  useEffect(() => {
    // console.log("Details page: product -> ", product);
    setIsLoading(false);
  }, [product]);

  const addProductToCart = (e) => {
    let productsInCart = [];
    if (window.localStorage.getItem("cart")) {
      productsInCart = JSON.parse(window.localStorage.getItem("cart"));
    }

    const productAlreadyAdded = productsInCart.find(
      (product) => product.id === e.target.id
    );
    if (productAlreadyAdded) {
      productAlreadyAdded.qt = productAlreadyAdded.qt + 1;
    } else {
      productsInCart.push({ id: e.target.id, qt: 1 });
    }

    window.localStorage.setItem("cart", JSON.stringify(productsInCart));
  };

  if (isLoading === true) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="max-w-2x1 mx-auto p-7">
        <div className="flex flex-col md:flex-row md:space-x-8 items-center">
          <div
            key={product.id}
            className="flex flex-col md:flex-row md:space-x-10 items-center"
          >
            <Link to={`/product/${product.id}`} className="w-full md:w-1/4">
              <img
                src={product.imageURL}
                alt={product.name}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </Link>

            <div className=" bg-purpleBackground w-full md:w-1/2 bg-white rounded-lg shadow-md p-6">
              <Link to={`/details/${product.id}`}>
                <h5 className="text-3xl font-bold text-gray-800 mb-4">
                  {product.name}
                </h5>
                <h6 className="text-xl font-bold text-gray-800 mb-4">
                  {product.author}
                </h6>
              </Link>
              <div className="flex justify-between items-center">
                <p>
                  <span  className="text-2xl font-bold text-slate-900">
                    {product.price} RON
                  </span>
                </p>
              </div>
              <div className="text-gray-700 mb-4">
                <p>{product.description}</p>
              </div>
              <button
                id={product.id}
                className="rounded-md content-end bg-slate-900 px-5 py-2.5 text-center text-sm font-large bg-purple-dark text-purple-light hover:bg-purple-light hover:text-purple-dark focus:outline-none focus:ring-4 focus:ring-purple"
                onClick={addProductToCart}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

Details.propTypes = {
  props: PropTypes.shape({
    id: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default Details;
