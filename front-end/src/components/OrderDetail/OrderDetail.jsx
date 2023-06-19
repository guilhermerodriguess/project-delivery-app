import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import ProductTable from '../ProductTable/ProductTable';
import './OrderDetail.css';

function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [seller, setSellerId] = useState({});

  const location = useLocation();
  const isSeller = location.pathname.includes('/seller/orders/');
  const isDelivered = order.status === 'Entregue';
  const isPreparing = order.status === 'Preparando';
  const isDelivery = order.status === 'Em Trânsito';
  const isPending = order.status === 'Pendente';

  const ORDER_ID_LENGTH = 4;

  const getTestId = (baseTestId) => {
    if (isSeller) {
      return `seller_order_details__${baseTestId}`;
    }
    return `customer_order_details__${baseTestId}`;
  };

  useEffect(() => {
    const getOrder = async () => {
      let response;
      if (isSeller) {
        response = await axios.get(`https://cheerful-teaching-production.up.railway.app/seller/order/${id}`);
      } else {
        response = await axios.get(`https://cheerful-teaching-production.up.railway.app/customer/order/${id}`);
      }
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
  }, [id, isSeller]);

  const handleDeliveryStatus = async (newStatus) => {
    try {
      await axios.put(`https://cheerful-teaching-production.up.railway.app/customer/orders/${id}`, { status: newStatus });
      setOrder((prevOrder) => ({
        ...prevOrder,
        status: newStatus,
      }));
    } catch (error) {
      console.log('Erro ao atualizar status do pedido:', error);
    }
  };

  if (!order || !totalPrice) {
    return (
      <div>Loading...</div>
    );
  }

  function formatOrderId(idOrder) {
    return idOrder.toString().padStart(ORDER_ID_LENGTH, '0');
  }

  let statusClass = '';

  switch (order.status) {
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
    <div className="order-details-container">
      <h3 className="order-details-title">Detalhes do pedido</h3>
      <div className="order-details-content">
        <div className="order-details-info">
          <h3
            className="order-id"
            data-testid={ getTestId('element-order-details-label-order-id') }
          >
            Pedido
            {' '}
            {formatOrderId(id)}
            ;
          </h3>
          {!isSeller && (
            <h3
              className="seller-name"
              data-testid={ getTestId('element-order-details-label-seller-name') }
            >
              P.Vendedora:
              {' '}
              {seller.name}
            </h3>
          )}
          <h3
            className="order-date"
            data-testid={ getTestId('element-order-details-label-order-date') }
          >
            {moment(order.saleDate).format('DD/MM/YYYY')}
          </h3>
          <h3
            className={ `delivery-status ${statusClass}` }
            data-testid={ getTestId('element-order-details-label-delivery-status') }
          >
            {order.status}
          </h3>
          {!isSeller && (
            <button
              className="delivery-check-button"
              data-testid="customer_order_details__button-delivery-check"
              type="button"
              onClick={ () => handleDeliveryStatus('Entregue') }
              disabled={ !isDelivery }
            >
              MARCAR COMO ENTREGUE
            </button>
          )}
          {isSeller && (
            <>
              <button
                className="preparing-check-button"
                data-testid="seller_order_details__button-preparing-check"
                type="button"
                onClick={ () => handleDeliveryStatus('Preparando') }
                disabled={ isPreparing || isDelivered || isDelivery }
              >
                PREPARAR PEDIDO
              </button>
              <button
                className="dispatch-check-button"
                data-testid="seller_order_details__button-dispatch-check"
                type="button"
                onClick={ () => handleDeliveryStatus('Em Trânsito') }
                disabled={ isPending || isDelivery || isDelivered }
              >
                SAIU PARA ENTREGA
              </button>
            </>
          )}
        </div>
        <div className="order-details-products">
          <ProductTable className="product-table" cart={ products } />
          <h3
            className="order-total-price"
            data-testid={ getTestId('element-order-total-price') }
          >
            Total: R$
            {' '}
            {totalPrice.replace(/\./, ',')}
          </h3>
        </div>
      </div>
    </div>

  );
}

export default OrderDetailPage;
