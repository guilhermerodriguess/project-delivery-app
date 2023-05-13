module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      name: { type: Sequelize.STRING(100), allowNull: false, unique: true },
      price: { type: Sequelize.DECIMAL(4, 2), allowNull: false },
      url_image: { type: Sequelize.STRING(200), allowNull: false, defaultValue: '' },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('products');
  },
};
