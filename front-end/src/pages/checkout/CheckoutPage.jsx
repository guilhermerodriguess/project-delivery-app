import React, { useState, useEffect } from 'react';
import DeliveryInfoForm from '../../components/DeliveryInfoForm/DeliveryInfoForm';
import CartTable from '../../components/CartTable/CartTable';
import Navbar from '../../components/Navbar/Navbar';

function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedSeller, setSelectedSeller] = useState('');
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');

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

  const handleSubmitOrder = () => {
  };

  return (
    <>
      <Navbar />
      <div>
        <h1>Checkout</h1>
        <div>
          <h2>Informações do Carrinho</h2>
          <CartTable cart={ cart } />
          <div>
            <p data-testid="customer_checkout__element-order-total-price">
              Valor Total: R$
              {' '}
              {totalPrice.toFixed(2)}
            </p>
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
            handleSubmitOrder={ handleSubmitOrder }
          />
        </div>
      </div>
    </>

  );
}

export default CheckoutPage;
