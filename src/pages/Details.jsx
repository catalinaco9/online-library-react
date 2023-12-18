import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Details = (props) => {
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
      key={props.id}
      className="relative m-10 flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
    >
      <Link to={`/product/${props.id}`}>
        <img src={props.imageURL} alt={props.name} />
      </Link>

      <div className="mt-4 px-5 pb-5">
        <Link to={`/details/${props.id}`}>
          <h5 className="text-xl tracking-tight text-slate-900">
            {props.name}
          </h5>
        </Link>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900">
              {props.price} RON
            </span>
          </p>
        </div>
        <button
          id={props.id}
          className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          onClick={addProductToCart}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
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
