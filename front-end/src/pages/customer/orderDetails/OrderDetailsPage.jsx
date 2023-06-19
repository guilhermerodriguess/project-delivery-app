import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import ProductTable from '../../../components/ProductTable/ProductTable';
import './OrderDetailsPage.css';

function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [seller, setSellerId] = useState({});

  useEffect(() => {
    const getOrder = async () => {
      const response = await axios.get(`https://cheerful-teaching-production.up.railway.app/customer/order/${id}`);
      setOrder(response.data.order);

      const orderProducts = response.data.order.products;

      const transformedProducts = orderProducts.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        id: item.product.id,
      }));

      setProducts(transformedProducts);
      setTotalPrice(response.data.order.totalPrice);
      setSellerId(response.data.order.seller);
    };
    getOrder();
  }, [id]);

  const isDelivered = order.status !== 'Em Trânsito';

  const handleDeliveryCheck = async () => {
    try {
      await axios.put(`https://cheerful-teaching-production.up.railway.app/customer/orders/${id}`, { status: 'Entregue' });
      setOrder((prevOrder) => ({
        ...prevOrder,
        status: 'Entregue',
      }));
    } catch (error) {
      console.log('Erro ao marcar como entregue:', error);
    }
  };

  const formattedDate = moment(order.saleDate).format('DD/MM/YYYY');
  const testIdName = 'customer_order_details__element-order-details-label-seller-name';
  const testStatu = 'customer_order_details__element-order-details-label-delivery-status';

  if (!order || !totalPrice) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div className="order-details-container">
      <h3 className="order-details-title">Detalhes do pedido</h3>
      <div className="order-details-content">
        <div className="order-details-info">
          <h3
            className="order-id"
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            {order && order.id}
          </h3>
          <h3 className="seller-name" data-testid={ testIdName }>
            {seller.name}
          </h3>
          <h3
            className="order-date"
            data-testid="customer_order_details__element-order-details-label-order-date"
          >
            {formattedDate}
          </h3>
          <h3 className="order-status" data-testid={ testStatu }>
            {order.status}
          </h3>
          <button
            className="delivery-check-button"
            data-testid="customer_order_details__button-delivery-check"
            type="button"
            onClick={ handleDeliveryCheck }
            disabled={ isDelivered }
          >
            MARCAR COMO ENTREGUE
          </button>
        </div>
        <div className="order-details-products">
          <ProductTable className="product-table" cart={ products } />
          <h3
            className="order-total-price"
            data-testid="customer_order_details__element-order-total-price"
          >
            {totalPrice.replace(/\./, ',')}
          </h3>
        </div>
      </div>
    </div>

  );
}

export default OrderDetailPage;
