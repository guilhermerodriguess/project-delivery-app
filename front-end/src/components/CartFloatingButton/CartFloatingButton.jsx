import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './CartFloatingButton.css';

function CartFloatingButton({ cartValue }) {
  return (
    <div className="floating-button">
      <Link to="/customer/checkout">
        <button
          type="submit"
          data-testid="customer_products__button-cart"
          disabled={ cartValue === 0 }
        >
          Ver Carrinho: R$
          {' '}
          <span data-testid="customer_products__checkout-bottom-value">
            {cartValue.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).replace('R$', '')}
          </span>
        </button>
      </Link>
    </div>
  );
}

CartFloatingButton.propTypes = {
  cartValue: PropTypes.number.isRequired,
};

export default CartFloatingButton;
