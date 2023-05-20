import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import './CartTable.css';

function CartTable({ cart, handleRemoveFromCart }) {
  CartTable.defaultProps = {
    handleRemoveFromCart: () => {},
  };

  const location = useLocation();
  const isOrderDetailsPage = location.pathname.includes('/customer/orders/');

  const getTestId = (baseTestId, index) => {
    if (isOrderDetailsPage) {
      return `customer_order_details__${baseTestId}-${index}`;
    }
    return `customer_checkout__${baseTestId}-${index}`;
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
          {!isOrderDetailsPage && <th>Remover Item</th>}
        </tr>
      </thead>
      <tbody>
        {cart.map((item, index) => (
          <tr key={ index }>
            <td data-testid={ getTestId('element-order-table-item-number', index) }>
              {index + 1}
            </td>
            <td
              className="description-column"
              data-testid={ getTestId('element-order-table-name', index) }
            >
              {item.name}
            </td>
            <td data-testid={ getTestId('element-order-table-quantity', index) }>
              {item.quantity}
            </td>
            <td>
              <span>R$</span>
              {' '}
              <span data-testid={ getTestId('element-order-table-unit-price', index) }>
                {parseFloat(item.price).toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                })}
              </span>
            </td>
            <td>
              <span>R$</span>
              {' '}
              <span data-testid={ getTestId('element-order-table-sub-total', index) }>
                {(
                  parseFloat(item.price) * item.quantity
                ).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </td>
            {!isOrderDetailsPage && (
              <td>
                <button
                  type="button"
                  data-testid={ getTestId('element-order-table-remove', index) }
                  onClick={ () => handleRemoveFromCart(item.id) }
                >
                  Remover
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

CartTable.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  handleRemoveFromCart: PropTypes.func,
};

export default CartTable;
