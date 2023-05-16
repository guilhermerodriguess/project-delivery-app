import React from 'react';
import PropTypes from 'prop-types';

function CartTable({ cart, handleRemoveFromCart }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Número</th>
          <th>Nome</th>
          <th>Quantidade</th>
          <th>Preço Unitário</th>
          <th>Subtotal</th>
          <th>Remover</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((item, index) => (
          <tr key={ index }>
            <td
              data-testid={
                `customer_checkout__element-order-table-item-number-${index}`
              }
            >
              {index + 1}
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-name-${index}` }
            >
              {item.name}
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
            >
              {item.quantity}
            </td>
            <td>
              <span>
                R$
              </span>
              {' '}
              <span
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                {parseFloat(item.price)
                  .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </td>
            <td>
              <span>
                R$
              </span>
              {' '}
              <span
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                {(
                  parseFloat(item.price) * item.quantity
                ).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </td>
            <td>
              <button
                type="button"
                data-testid={ `customer_checkout__element-order-table-remove-${index}` }
                onClick={ () => handleRemoveFromCart(item.id) }
              >
                Remover
              </button>
            </td>
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
  handleRemoveFromCart: PropTypes.func.isRequired,
};

export default CartTable;
