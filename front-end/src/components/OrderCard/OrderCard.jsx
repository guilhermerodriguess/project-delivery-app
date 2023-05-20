import PropTypes from 'prop-types';
import moment from 'moment';

function OrderCard({ order }) {
  const { id, status, saleDate, totalPrice } = order;

  const formattedDate = moment(saleDate).format('DD/MM/YYYY');
  return (
    <div key={ id }>
      <div>
        <h1
          data-testid={
            `customer_orders__element-order-id-${id}`
          }
        >
          {id}
        </h1>
      </div>
      <div>
        <h1
          data-testid={
            `customer_orders__element-delivery-status-${id}`
          }
        >
          {status}

        </h1>
      </div>
      <div>
        <div>
          <h1 data-testid={ `customer_orders__element-order-date-${id}` }>
            {formattedDate}
          </h1>
        </div>
        <div>
          <h1
            data-testid={
              `customer_orders__element-card-price-${id}`
            }
          >
            {totalPrice.replace(/\./, ',')}

          </h1>
        </div>
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
  }).isRequired,
};

export default OrderCard;
