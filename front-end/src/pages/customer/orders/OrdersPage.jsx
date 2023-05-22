import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import OrderCard from '../../../components/OrderCard/OrderCard';
import './OrdersPage.css';

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = JSON.parse(localStorage.getItem('userId'));
      try {
        const response = await axios.get(`http://localhost:3001/customer/orders/${userId}`);
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <div className="orders">
          {orders.map((order) => (
            <Link key={ order.id } to={ `/customer/orders/${order.id}` }>
              <OrderCard order={ order } />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default OrdersPage;
