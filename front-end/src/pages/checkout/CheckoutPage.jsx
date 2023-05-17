import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import DeliveryInfoForm from '../../components/DeliveryInfoForm/DeliveryInfoForm';
import CartTable from '../../components/CartTable/CartTable';
import Navbar from '../../components/Navbar/Navbar';

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

  const fetchUserId = async (name, email) => {
    try {
      const response = await axios.put('http://localhost:3001/customer', {
        name,
        email,
      });

      return response.data.userId;
    } catch (error) {
      console.error('Erro ao buscar o ID do usuário:', error);
      throw new Error('Failed to fetch user ID');
    }
  };

  const sendOrder = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = await fetchUserId(user.name, user.email);

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
    <>
      <Navbar />
      <div>
        <h1>Checkout</h1>
        <div>
          <h2>Informações do Carrinho</h2>
          <CartTable cart={ cart } handleRemoveFromCart={ handleRemoveFromCart } />
          <div>
            Valor Total: R$
            {' '}
            <span data-testid="customer_checkout__element-order-total-price">
              {totalPrice.toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>
        <div>
          <h2>Informações de Entrega</h2>
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
    </>
  );
}

export default CheckoutPage;
