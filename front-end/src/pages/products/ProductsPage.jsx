import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import './ProductsPage.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartValue, setCartValue] = useState(0);

  const NOT_FOUND = -1;

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
    const calculateCartValue = () => {
      if (cart.length === 0) {
        return 0;
      }

      let totalValue = 0;
      cart.forEach((item) => {
        const product = products.find((p) => p.id === item.productId);
        totalValue += product.price * item.quantity;
      });
      return totalValue;
    };

    const value = calculateCartValue();
    setCartValue(value);
  }, [cart, products]);

  const handleAddQuantity = (productId) => {
    // Lógica para adicionar quantidade do produto com o ID especificado
    const updatedCart = [...cart];
    const itemIndex = updatedCart.findIndex((item) => item.productId === productId);

    if (itemIndex !== NOT_FOUND) {
      updatedCart[itemIndex].quantity += 1;
      setCart(updatedCart);
    }
  };

  const handleRemoveQuantity = (productId) => {
    // Lógica para remover quantidade do produto com o ID especificado
    const updatedCart = [...cart];
    const itemIndex = updatedCart.findIndex((item) => item.productId === productId);

    if (itemIndex !== NOT_FOUND) {
      updatedCart[itemIndex].quantity -= 1;
      if (updatedCart[itemIndex].quantity === 0) {
        updatedCart.splice(itemIndex, 1);
      }
      setCart(updatedCart);
    }
  };

  const handleQuantityChange = (event, productId) => {
    // Lógica para atualizar a quantidade do produto com o ID especificado
    const quantity = parseInt(event.target.value, 10);

    if (!Number.isNaN(quantity)) {
      const updatedCart = [...cart];
      const itemIndex = updatedCart.findIndex((item) => item.productId === productId);

      if (itemIndex !== NOT_FOUND) {
        updatedCart[itemIndex].quantity = quantity;
        setCart(updatedCart);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="product-list">
        <ul>
          {products.map((product) => (
            <li key={ product.id }>
              <h3
                data-testid={ `customer_products__element-card-title-${product.id}` }
              >
                {product.name}
              </h3>
              <p data-testid={ `customer_products__element-card-price-${product.id}` }>
                {product.price}
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
                  data-testid={
                    `customer_products__button-card-rm-item-${product.id}`
                  }
                >
                  -
                </button>
                <input
                  type="number"
                  onChange={ (event) => handleQuantityChange(event, product.id) }
                  data-testid={
                    `customer_products__input-card-quantity-${product.id}`
                  }
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="floating-button">
        Ver carrinho: R$
        {cartValue.toFixed(2)}
      </div>
    </>
  );
}

export default ProductList;
