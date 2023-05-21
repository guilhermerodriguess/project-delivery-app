import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import CartTable from '../../components/CartTable/CartTable';
import Navbar from '../../components/Navbar/Navbar';

function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [seller, setSellerId] = useState({});

  useEffect(() => {
    const getOrder = async () => {
      const response = await axios.get(`http://localhost:3001/customer/orders/${id}`);
      setOrder(response.data.order[0]);
      console.log(response.data.order[0]);

      const orderProducts = response.data.order[0].products;

      const transformedProducts = orderProducts.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        id: item.product.id,
      }));

      setProducts(transformedProducts);
      setTotalPrice(response.data.order[0].totalPrice);
      setSellerId(response.data.order[0].seller);
    };
    getOrder();
  }, [id]);

  const isDelivered = order.status !== 'Em Trânsito';

  const handleDeliveryCheck = async () => {
    try {
      await axios.put(`http://localhost:3001/customer/orders/${id}`, { status: 'Entregue' });
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
  const testIdStatus = 'customer_order_details__element-order-details-label-delivery-status';

  if (!order || !totalPrice) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <>
      <Navbar />
      <div>
        <h3>Detalhes do pedido</h3>
        <div>
          <div>
            <h3
              data-testid="customer_order_details__element-order-details-label-order-id"
            >
              {order && order.id}
            </h3>
            <h3
              data-testid={ testIdName }
            >
              {seller.name}
            </h3>
            <h3
              data-testid="customer_order_details__element-order-details-label-order-date"
            >
              {formattedDate}
            </h3>
            <h3
              data-testid={ testIdStatus }
            >
              {order.status}
            </h3>
            <button
              data-testid="customer_order_details__button-delivery-check"
              type="button"
              onClick={ handleDeliveryCheck }
              disabled={ isDelivered }
            >
              MARCAR COMO ENTREGUE
            </button>
          </div>
          <div>
            <CartTable cart={ products } />
            <h3 data-testid="customer_order_details__element-order-total-price">
              {totalPrice.replace(/\./, ',')}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetailPage;
