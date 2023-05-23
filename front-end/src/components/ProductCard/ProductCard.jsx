import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ProductCard.css';

function ProductCard({ product, handleAddToCart, handleRemoveFromCart }) {
  const [quantity, setQuantity] = useState(0);

  const handleAddQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    handleAddToCart(product.id, newQuantity);
  };

  const handleRemoveQuantity = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      handleRemoveFromCart(product.id, newQuantity);
    }
  };

  const handleQuantityChange = ({ target }) => {
    setQuantity(target.value);
    handleAddToCart(product.id, target.value);
  };

  return (
    <div className="product-card">
      <img
        className="product-card-img"
        src={ product.urlImage }
        alt={ product.name }
        data-testid={ `customer_products__img-card-bg-image-${product.id}` }
      />
      <div className="product-card-price">
        <p>R$</p>
        <p
          data-testid={ `customer_products__element-card-price-${product.id}` }
        >
          {product.price.replace(/\./, ',')}
        </p>
      </div>
      <div className="product-card-info">
        <h3
          className="product-card-name"
          data-testid={ `customer_products__element-card-title-${product.id}` }
        >
          {product.name}

        </h3>
        <div className="product-card-controls">
          <button
            className="button-add"
            type="button"
            onClick={ handleAddQuantity }
            data-testid={ `customer_products__button-card-add-item-${product.id}` }
          >
            +
          </button>
          <input
            type="text"
            value={ quantity }
            onChange={ handleQuantityChange }
            data-testid={ `customer_products__input-card-quantity-${product.id}` }
          />
          <button
            className="button-rm"
            type="button"
            onClick={ handleRemoveQuantity }
            data-testid={ `customer_products__button-card-rm-item-${product.id}` }
          >
            -
          </button>
        </div>
      </div>
    </div>

  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    urlImage: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    quantity: PropTypes.number,
  }).isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  handleRemoveFromCart: PropTypes.func.isRequired,
};

export default ProductCard;
