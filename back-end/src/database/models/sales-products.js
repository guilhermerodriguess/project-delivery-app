module.exports = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define('SalesProduct', {
    saleId: { type: DataTypes.INTEGER, primaryKey: true },
    productId: { type: DataTypes.INTEGER, primaryKey: true },
    quantity: DataTypes.INTEGER,
  },
  {
    timestamps: false,
    underscored: true,
  });

  // Associação: Uma venda de produto pertence a uma venda (Sale)
  SalesProduct.associate = (models) => {
    SalesProduct.belongsTo(models.Sale, {
      foreignKey: 'saleId',
    });

    SalesProduct.belongsTo(models.Product, {
      foreignKey: 'productId',
      as: 'product',
    });
  };

  return SalesProduct;
};
