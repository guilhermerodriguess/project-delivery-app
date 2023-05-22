import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

function SellerOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:3001/seller/orders/${userId}`);
        console.log(response.data.orders);
        setOrders(response.data.orders);
      } catch (error) {
        console.log('Erro ao buscar os pedidos:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Pedidos do Vendedor</h1>
      {orders.map((order) => (
        <div key={ order.id } className="order-card">
          <h3 data-testid={ `seller_orders__element-order-id-${order.id}` }>
            ID do Pedido:
            {' '}
            {order.id}
          </h3>
          <h4 data-testid={ `seller_orders__element-delivery-status-${order.id}` }>
            Status de Entrega:
            {' '}
            {order.status}
          </h4>
          <p data-testid={ `seller_orders__element-order-date-${order.id}` }>
            Data do Pedido:
            {' '}
            {moment(order.saleDate).format('DD/MM/YYYY')}
          </p>
          <p data-testid={ `seller_orders__element-card-price-${order.id}` }>
            Preço do Pedido: R$
            {' '}
            {order.totalPrice}
          </p>
          <p data-testid={ `seller_orders__element-card-address-${order.id}` }>
            Endereço de Entrega:
            {' '}
            {order.deliveryAddress}
          </p>
        </div>
      ))}
    </div>
  );
}

export default SellerOrdersPage;
