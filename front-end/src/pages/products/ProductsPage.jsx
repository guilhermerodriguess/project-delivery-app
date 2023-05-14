import React, { useEffect, useState, createContext, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import './ProductsPage.css';

const CartContext = createContext();

function ProductList() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [inputQuantities, setInputQuantities] = useState({});
  const [cartValue, setCartValue] = useState(0);

  const calculateCartValue = useCallback(() => {
    if (cart.length === 0) {
      return 0;
    }

    let totalValue = 0;
    cart.forEach((item) => {
      const product = products.find((p) => p.id === parseInt(item.item, 10));
      if (product) {
        totalValue += product.price * item.quantity;
      }
    });
    return totalValue;
  }, [cart, products]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/customer/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const updateCartWithQuantities = useCallback((quantities) => {
    const updatedCart = Object.keys(quantities).reduce((cartItems, productId) => {
      const quantity = quantities[productId];
      if (quantity !== '' && quantity > 0) {
        cartItems.push({ item: productId, quantity });
      }
      return cartItems;
    }, []);

    setCart(updatedCart);

    if (updatedCart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      localStorage.removeItem('cart');
    }
  }, []);

  const handleAddQuantity = useCallback((productId) => {
    const updatedQuantities = { ...inputQuantities };
    const quantity = updatedQuantities[productId] || 0;

    updatedQuantities[productId] = quantity + 1;

    setInputQuantities(updatedQuantities);

    updateCartWithQuantities(updatedQuantities);
  }, [inputQuantities, updateCartWithQuantities]);

  const handleRemoveQuantity = useCallback((productId) => {
    const updatedQuantities = { ...inputQuantities };
    const quantity = updatedQuantities[productId] || 0;

    if (quantity > 0) {
      updatedQuantities[productId] = quantity - 1;
      setInputQuantities(updatedQuantities);

      updateCartWithQuantities(updatedQuantities);
    }
  }, [inputQuantities, updateCartWithQuantities]);

  const handleQuantityChange = useCallback((event, productId) => {
    const { value } = event.target;
    let quantity = null;

    if (value !== '') {
      quantity = parseInt(value, 10);

      if (Number.isNaN(quantity) || quantity < 0) {
        return;
      }
    }

    const updatedQuantities = { ...inputQuantities };
    updatedQuantities[productId] = quantity || '';

    setInputQuantities(updatedQuantities);

    updateCartWithQuantities(updatedQuantities);
  }, [inputQuantities, updateCartWithQuantities]);

  const handleCartCheckout = useCallback(() => {
    const totalValue = calculateCartValue();
    setCartValue(totalValue);
    console.log('Realizando checkout do carrinho:', cart);
    console.log('Valor total do carrinho:', totalValue);
  }, [cart, calculateCartValue]);

  const cartContextValue = useMemo(() => ({
    cart,
    handleAddQuantity,
    handleRemoveQuantity,
    handleQuantityChange,
  }), [cart, handleAddQuantity, handleRemoveQuantity, handleQuantityChange]);

  useEffect(() => {
    const totalValue = calculateCartValue();
    setCartValue(totalValue);
  }, [cart, products, calculateCartValue]);

  const getQuantityById = (productId) => inputQuantities[productId] || 0;

  return (
    <>
      <Navbar />
      <CartContext.Provider value={ cartContextValue }>
        <div className="product-list">
          <ul>
            {products.map((product) => (
              <li key={ product.id }>
                <h3 data-testid={ `customer_products__element-card-title-${product.id}` }>
                  {product.name}
                </h3>
                <p data-testid={ `customer_products__element-card-price-${product.id}` }>
                  {product.price.replace(/\./, ',')}
                </p>
                <img
                  src={ product.url_image }
                  alt={ product.name }
                  data-testid={ `customer_products__img-card-bg-image-${product.id}` }
                />
                <div>
                  <button
                    type="button"
                    onClick={ () => handleAddQuantity(product.id) }
                    data-testid={
                      `customer_products__button-card-add-item-${product.id}`
                    }
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={ () => handleRemoveQuantity(product.id) }
                    data-testid={ `customer_products__button-card-rm-item-${product.id}` }
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={ getQuantityById(product.id) }
                    onChange={ (event) => handleQuantityChange(event, product.id) }
                    data-testid={ `customer_products__input-card-quantity-${product.id}` }
                    min={ 0 }
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CartContext.Provider>
      <div className="floating-button">
        <Link to="/customer/checkout">
          <button
            type="submit"
            data-testid="customer_products__button-cart"
            disabled={ !cart.length }
            onClick={ handleCartCheckout }
          >
            Ver Carrinho: R$
            {' '}
            <span data-testid="customer_products__checkout-bottom-value">
              {cartValue.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).replace('R$', '')}
            </span>
          </button>
        </Link>
      </div>
    </>
  );
}

export default ProductList;
