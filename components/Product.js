import React, { Component } from "react";
import PropTypes from "prop-types";

class Product extends Component {
  handleClick = () => {
    const { id } = this.props;
  };

  render() {
    const { name, price, image } = this.props;

    return (
      <div className="product thumbnail">
        <img src={image} alt="product" />
        <div className="caption">
          <h3>{name}</h3>
          <div className="product__price">${price}</div>
          <div className="product__button-wrap">
            <button
              className={isInCart ? "btn btn-danger" : "btn btn-primary"}
              onClick={this.handleClick}
            >
              {isClicked ? "More Information" : "Close"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Product.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number,
  image: PropTypes.string
};

export default Product;
