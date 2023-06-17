import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import DeliveryInfoForm from '../../../components/DeliveryInfoForm/DeliveryInfoForm';
import ProductTable from '../../../components/ProductTable/ProductTable';
import Navbar from '../../../components/Navbar/Navbar';
import './CheckoutPage.css';

function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedSeller, setSelectedSeller] = useState('');
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');

  const history = useHistory();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  useEffect(() => {
    const calculateTotalPrice = () => {
      if (cart.length === 0) {
        return 0;
      }

      let totalValue = 0;
      cart.forEach((item) => {
        totalValue += item.price * item.quantity;
      });
      return totalValue;
    };

    const updatedTotalPrice = calculateTotalPrice();
    setTotalPrice(updatedTotalPrice);
  }, [cart]);

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const sendOrder = async () => {
    try {
      const userId = localStorage.getItem('userId');

      const order = {
        userId,
        sellerId: parseInt(selectedSeller, 10),
        totalPrice,
        deliveryAddress: address,
        deliveryNumber: addressNumber,
        products: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      };

      const response = await axios.post('http://localhost:3001/customer/orders', { order });

      const { orderId } = response.data;

      history.push(`/customer/orders/${orderId}`);
    } catch (error) {
      console.error('Erro ao enviar o pedido:', error);
    }
  };

  return (
    <div className="checkout-container">
      <div className="cart-container">
        <h2 className="checkout-heading">Finalizar Pedido</h2>
        <div className="checkout-info">
          <ProductTable cart={ cart } handleRemoveFromCart={ handleRemoveFromCart } />
          <span className="total-price first">
            Total: R$
            {' '}
          </span>
          <span
            className="total-price second"
            data-testid="customer_checkout__element-order-total-price"
          >
            {totalPrice.toFixed(2).replace('.', ',')}
          </span>
        </div>
      </div>
      <div className="delivery-container">
        <h2 className="checkout-heading">Detalhes e Endereço para Entrega</h2>
        <div className="checkout-info">
          <DeliveryInfoForm
            selectedSeller={ selectedSeller }
            setSelectedSeller={ setSelectedSeller }
            address={ address }
            setAddress={ setAddress }
            addressNumber={ addressNumber }
            setAddressNumber={ setAddressNumber }
            sendOrder={ sendOrder }
          />
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
