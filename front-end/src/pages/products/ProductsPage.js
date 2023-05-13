import React from 'react';
import Navbar from '../../components/Navbar/Navbar';

function ProductsPage() {
  // Função para lidar com o logout
  const handleLogout = () => {
  };

  return (
    <div>
      <Navbar username="Nome do Usuário" handleLogout={ handleLogout } />
    </div>
  );
}

export default ProductsPage;
