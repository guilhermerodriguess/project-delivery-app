import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const handleLogout = () => {
  // Remove os dados da pessoa usuária do localStorage
  localStorage.removeItem('user');
};

function Navbar() {
  // Obtém os dados da pessoa usuária armazenados no localStorage
  const userData = JSON.parse(localStorage.getItem('user'));

  // Extrai o nome da pessoa usuária dos dados obtidos
  const userName = userData?.name || 'Nome do Usuário';

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
          {userName}
        </div>
        <Link
          onClick={ handleLogout }
          to="/login"
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
