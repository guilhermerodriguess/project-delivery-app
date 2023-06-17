import PropTypes from 'prop-types';
import moment from 'moment';
import './OrderCard.css';

function OrderCard({ order, showAddress }) {
  const { id, status, saleDate, totalPrice, deliveryAddress } = order;

  const ORDER_ID_LENGTH = 4;

  function formatOrderId(idOrder) {
    return idOrder.toString().padStart(ORDER_ID_LENGTH, '0');
  }

  const formattedDate = moment(saleDate).format('DD/MM/YYYY');

  let statusClass = '';

  switch (status) {
  case 'Pendente':
    statusClass = 'order-card-status-pending';
    break;
  case 'Preparando':
    statusClass = 'order-card-status-preparing';
    break;
  case 'Entregue':
    statusClass = 'order-card-status-delivered';
    break;
  default:
    break;
  }

  return (
    <div className="order-card" key={ id }>
      <div className="order-card-id">
        <h1
          className="order-card-id-text"
          data-testid={ `customer_orders__element-order-id-${id}` }
        >
          <span>Pedido</span>
          {`\n${formatOrderId(id)}`}
        </h1>
      </div>
      <div className="order-card-status-details-adress">
        <div className="order-card-status-details">
          <div className={ `order-card-status ${statusClass}` }>
            <h1
              className="order-card-status-text"
              data-testid={ `customer_orders__element-delivery-status-${id}` }
            >
              {status}
            </h1>
          </div>
          <div className="order-card-details">
            <div className="order-card-date">
              <h1
                className="order-card-date-text"
                data-testid={ `customer_orders__element-order-date-${id}` }
              >
                {formattedDate}
              </h1>
            </div>
            <div className="order-card-price">
              <h1
                className="order-card-price-text"
                data-testid={ `customer_orders__element-card-price-${id}` }
              >
                R$
                {' '}
                {totalPrice.replace(/\./, ',')}
              </h1>
            </div>
          </div>
        </div>
        {showAddress && (
          <div className="order-card-address">
            <p
              className="order-card-address-text"
              data-testid={ `customer_orders__element-card-address-${id}` }
            >
              {deliveryAddress}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    totalPrice: PropTypes.string.isRequired,
    saleDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    deliveryAddress: PropTypes.string.isRequired,
  }).isRequired,
  showAddress: PropTypes.bool,
};

OrderCard.defaultProps = {
  showAddress: false,
};

export default OrderCard;
