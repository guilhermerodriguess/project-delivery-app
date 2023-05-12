module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales_products', {
      saleId: { type: Sequelize.INTEGER,
        allowNull: false, 
        references: { model: 'sales', key: 'id' },
        primaryKey: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      productId: {
        type: Sequelize.INTEGER, 
        allowNull: false, 
        primaryKey: true, 
        references: { model: 'products', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      quantity: { type: Sequelize.INTEGER, allowNull: false },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('sales_products');
  },
};
