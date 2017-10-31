import React from "react";
import PropTypes from "prop-types";
import Product from "../components/Product";

const ProductList = ({ products }) => {
  return (
    <div>
      <h4>New Products</h4>
      <ul className="product-list">
        {products.map(product => (
          <li key={product.id} className="product-list__item">
            <Product {...product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array
};

export default ProductList;
