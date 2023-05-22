import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import ProductTable from '../ProductTable/ProductTable';
import Navbar from '../Navbar/Navbar';

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
        response = await axios.get(`http://localhost:3001/seller/order/${id}`);
      } else {
        response = await axios.get(`http://localhost:3001/customer/order/${id}`);
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
      await axios.put(`http://localhost:3001/customer/orders/${id}`, { status: newStatus });
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

  return (
    <>
      <Navbar />
      <div>
        <h3>Detalhes do pedido</h3>
        <div>
          <div>
            <h3 data-testid={ getTestId('element-order-details-label-order-id') }>
              {order.id}
            </h3>
            {!isSeller && (
              <h3 data-testid={ getTestId('element-order-details-label-seller-name') }>
                {seller.name}
              </h3>
            )}
            <h3 data-testid={ getTestId('element-order-details-label-order-date') }>
              {moment(order.saleDate).format('DD/MM/YYYY')}
            </h3>
            <h3 data-testid={ getTestId('element-order-details-label-delivery-status') }>
              {order.status}
            </h3>
            {!isSeller && (
              <button
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
                  data-testid="seller_order_details__button-preparing-check"
                  type="button"
                  onClick={ () => handleDeliveryStatus('Preparando') }
                  disabled={ isPreparing || isDelivered || isDelivery }
                >
                  PREPARAR PEDIDO
                </button>
                <button
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
          <div>
            <ProductTable cart={ products } />
            <h3 data-testid={ getTestId('element-order-total-price') }>
              {totalPrice.replace(/\./, ',')}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetailPage;
