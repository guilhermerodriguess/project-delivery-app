'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        name: 'Delivery App Admin',
        email: 'adm@deliveryapp.com',
        password: 'a4c86edecc5aee06eff8fdeda69e0d04',
        role: 'administrator'
      },
      {
        id: 2,
        name: 'Fulana Pereira',
        email: 'fulana@deliveryapp.com',
        password: '3c28d2b0881bf46457a853e0b07531c6',
        role: 'seller'
      },
      {
        id: 3,
        name: 'Cliente Zé Birita',
        email: 'zebirita@email.com',
        password: '1c37466c159755ce1fa181bd247cb925',
        role: 'customer'
      },
      {
        id: 4,
        name: 'João Silva',
        email: 'joao.silva@example.com',
        password: '8b6f1f9a1d82deab1dfb4e731dc1e69b',
        role: 'customer'
      },
      {
        id: 5,
        name: 'Maria Santos',
        email: 'maria.santos@example.com',
        password: '2e3e3a2e7dcbfcfc08ef0ac283bf1d6e',
        role: 'customer'
      },
      {
        id: 6,
        name: 'Pedro Almeida',
        email: 'pedro.almeida@example.com',
        password: '6cc6d7726c8a12e04dcd333a9c18d0b2',
        role: 'customer'
      },
      {
        id: 7,
        name: 'Ana Oliveira',
        email: 'ana.oliveira@example.com',
        password: '12bb98d05235237f27da25e6fe5e1b52',
        role: 'customer'
      },
      {
        id: 8,
        name: 'José Ferreira',
        email: 'jose.ferreira@example.com',
        password: '9d4e1e23bd5b727046a9e3b4b7db57bd',
        role: 'customer'
      },
      {
        id: 9,
        name: 'Carla Mendes',
        email: 'carla.mendes@example.com',
        password: 'e6a383bdf755a307b972d7d4f91a7489',
        role: 'customer'
      },
      {
        id: 10,
        name: 'Ricardo Castro',
        email: 'ricardo.castro@example.com',
        password: 'f4e6c92eef7985f45f7d66f705925b2d',
        role: 'customer'
      },
    ])},

  async down(queryInterface) {    
     await queryInterface.bulkDelete('users', null, {});
  },
};
