import React from "react";
import PropTypes from "prop-types";

const ProductCard = (props) => {
  return (
    <div
      key={props.product.id}
      className="relative m-10 flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
    >
      <img src={props.product.imageURL} alt={props.product.name} />

      <div className="mt-4 px-5 pb-5">
        <a href="#">
          <h5 className="text-xl tracking-tight text-slate-900">
            {props.product.name}
          </h5>
        </a>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900">
              {Number(props.product.price)} RON
            </span>
          </p>
        </div>
        <a
          href="#"
          className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Add to cart
        </a>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;
