import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link
          to="/customer/products"
          data-testid="customer_products__element-navbar-link-products"
          className="nav-item active"
        >
          Produtos
        </Link>
        <Link
          to="/customer/orders"
          data-testid="customer_products__element-navbar-link-orders"
          className="nav-item"
        >
          Meus Pedidos
        </Link>
      </div>
      <div className="navbar-right">
        <div
          data-testid="customer_products__element-navbar-user-full-name"
          className="username"
        >
          Nome do Usuário
        </div>
        <Link
          to="/logout"
          data-testid="customer_products__element-navbar-link-logout"
          className="nav-item"
        >
          Sair
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
