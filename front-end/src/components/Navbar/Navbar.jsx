import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import './Navbar.css';

const handleLogout = () => {
  // Remove os dados da pessoa usuária do localStorage
  localStorage.removeItem('user');
};

function Navbar() {
  const [activeLink, setActiveLink] = useState('products');

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  // Obtém os dados da pessoa usuária armazenados no localStorage
  const userData = JSON.parse(localStorage.getItem('user'));

  const isSeller = userData?.role === 'seller';
  const isAdmin = userData?.role === 'administrator';
  const isCustomer = userData?.role === 'customer';

  // Extrai o nome da pessoa usuária dos dados obtidos
  const userName = userData?.name || 'Nome do Usuário';

  return (
    <div className="navbar">
      <div className="navbar-left">
        {isSeller && (
          <Link
            to="/seller/orders"
            data-testid="customer_products__element-navbar-link-orders"
            className="nav-item active"
            onClick={ () => handleLinkClick('orders') }
          >
            PEDIDOS
          </Link>
        )}
        {isCustomer && (
          <>
            <Link
              to="/customer/products"
              data-testid="customer_products__element-navbar-link-products"
              className={ `nav-item ${activeLink === 'products' ? 'active' : ''}` }
              onClick={ () => handleLinkClick('products') }
            >
              PRODUTOS
            </Link>
            <Link
              to="/customer/orders"
              data-testid="customer_products__element-navbar-link-orders"
              className={ `nav-item ${activeLink === 'orders' ? 'active' : ''}` }
              onClick={ () => handleLinkClick('orders') }
            >
              MEUS PEDIDOS
            </Link>
          </>
        )}
        {isAdmin && (
          <Link
            to="/admin/users"
            data-testid="admin_users__element-navbar-link-users"
            className="nav-item active"
            onClick={ () => handleLinkClick('users') }
          >
            GERENCIAR USUÁRIOS
          </Link>
        )}
      </div>
      <div className="navbar-right">
        <div
          data-testid="customer_products__element-navbar-user-full-name"
          className="username nav-item"
        >
          {userName}
        </div>
        <Link
          onClick={ handleLogout }
          to="/login"
          data-testid="customer_products__element-navbar-link-logout"
          className="logout nav-item "
        >
          Sair
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
