import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CartTable from '../../components/CartTable/CartTable';

function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [seller, setSellerId] = useState({});

  useEffect(() => {
    const getOrder = async () => {
      const response = await axios.get(`http://localhost:3001/customer/orders/${id}`);
      setOrder(response.data.order[0]);

      const orderProducts = response.data.order[0].products;

      // Transformar os dados antes de passá-los para o componente CartTable
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

  const { id: oId } = order;

  return (
    <div>
      <h3>Detalhes do pedido</h3>
      <div>
        <div>
          <h3
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            {order.id}
          </h3>
          <h3
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            {seller.name}
          </h3>
          <h3
            data-testid="customer_order_details__element-order-details-label-order-date"
          >
            {order.saleDate}

          </h3>
          <h3
            data-testid={
              `customer_order_details__element-order-details-label-delivery-status-${oId}`
            }
          >
            {order.status}
          </h3>
          <button
            data-testid="customer_order_details__button-delivery-check"
            type="button"
          >
            MARCAR COMO ENTREGUE
          </button>
        </div>
        <div>
          <CartTable cart={ products } />
          <h3>
            Total: R$
            {' '}
            <span data-testid="customer_order_details__element-order-total-price">
              {totalPrice}
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailPage;
