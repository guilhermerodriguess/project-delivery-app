import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import OrderCard from '../../../components/OrderCard/OrderCard';
import './OrdersPage.css';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const isSellerPage = window.location.pathname.includes('/seller/orders');

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = JSON.parse(localStorage.getItem('userId'));
      try {
        const endpoint = process.env.NODE_ENV === 'development'
          ? process.env.REACT_APP_LOCAL_ENDPOINT
          : process.env.REACT_APP_PRODUCTION_ENDPOINT;

        let response;
        if (isSellerPage) {
          response = await axios.get(`${endpoint}/seller/orders/${userId}`);
        } else {
          response = await axios.get(`${endpoint}/customer/orders/${userId}`);
        }
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [isSellerPage]);

  return (
    <div>
      <div className="orders">
        {orders.map((order) => (
          <Link
            key={ order.id }
            to={
              `${isSellerPage ? '/seller' : '/customer'}/orders/${order.id}`
            }
          >
            <OrderCard order={ order } showAddress={ isSellerPage } />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;
