import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
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

  return (
    <div
      key={props.product.id}
      className="relative m-10 transparent overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md hover:shadow-lg shadow-purple-dark transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
    >
      <div
        className="image-wrapper max-w-screen-md mx-auto overflow-hidden "
        // style={{
        //   height: "200px",
        //   width: "100%",
        // }}
      >
        <img
          // style={{
          //   objectFit: "fill",
          //   height: "100%",
          //   width: "100%",
          // }}
          className="w-full h-full object-cover "
          src={props.product.imageURL}
          alt={props.product.name}
        />
      </div>

      <div className="mt-4 px-5 pb-5 sans font-bold">
        <a href="#">
          <h5 className="text-xl tracking-tight text-slate-900 text-purple-dark">
            {props.product.name}
          </h5>
        </a>
        <div>
          <h6 className="mt-2 text-purple justify-end">
            {props.product.author}
          </h6>
        </div>
        <div className="mt-2 mb-5 flex items-center justify-center">
          <p>
            <span className="text-2xl font-bold text-slate-900">
              {props.product.price} RON
            </span>
          </p>
        </div>
        <div className="flex item-center space-x-4 justify-between">
          <button
            id={props.product.id}
            className="rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-large bg-purple-dark text-purple-light hover:bg-purple-light hover:text-purple-dark focus:outline-none focus:ring-4 focus:ring-purple"
            onClick={addProductToCart}
          >
            Add to cart
          </button>
          <Link to={`/details/${props.product.id}`}>
            <button className="rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-large hover:bg-purple-dark hover:text-purple-light bg-purple-light text-purple-dark focus:outline-none focus:ring-4 focus:ring-purple">
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;
