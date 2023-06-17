import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../../components/Navbar/Navbar';
import ProductCard from '../../../components/ProductCard/ProductCard';
import CartFloatingButton from
  '../../../components/CartFloatingButton/CartFloatingButton';
import './ProductsPage.css';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartValue, setCartValue] = useState(0);

  const NOT_FOUND_INDEX = -1;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/customer/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const calculateCartValue = () => {
      if (cart.length === 0) {
        return 0;
      }

      let totalValue = 0;
      cart.forEach((item) => {
        const product = products.find((p) => p.id === item.id);
        if (product) {
          totalValue += product.price * item.quantity;
        }
      });
      return totalValue;
    };

    const updatedCartValue = calculateCartValue();
    setCartValue(updatedCartValue);

    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart, products]);

  const handleAddToCart = (productId, quantity) => {
    const productToAdd = products.find((product) => product.id === productId);
    if (productToAdd) {
      const existingItemIndex = cart.findIndex((item) => item.id === productToAdd.id);
      if (existingItemIndex !== NOT_FOUND_INDEX) {
        const updatedCart = [...cart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity,
        };
        setCart(updatedCart);
      } else {
        const updatedCart = [...cart, { ...productToAdd, quantity }];
        setCart(updatedCart);
      }
    }
  };

  const handleRemoveFromCart = (productId, quantity) => {
    const existingItemIndex = cart.findIndex((item) => item.id === productId);
    if (existingItemIndex !== NOT_FOUND_INDEX) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity,
      };
      if (quantity <= 0) {
        updatedCart.splice(existingItemIndex, 1);
      }
      setCart(updatedCart);
    }
  };

  return (
    <>
      <div className="product-list-container">
        <div className="product-list">
          {products.map((product) => (
            <ProductCard
              key={ product.id }
              product={ product }
              handleAddToCart={ handleAddToCart }
              handleRemoveFromCart={ handleRemoveFromCart }
            />
          ))}
        </div>
      </div>
      <CartFloatingButton cartValue={ cartValue } />
    </>
  );
}

export default ProductsPage;
