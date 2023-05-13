module.exports = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define('SalesProduct', {
    sale_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  },
  {
    timestamps: false,
    tableName: 'sales_products',
    underscored: true,
  });

  // Associação: Uma venda de produto pertence a uma venda (Sale)
  SalesProduct.associate = (models) => {
    SalesProduct.belongsTo(models.Sale, {
      foreignKey: 'sale_id',
      as: 'sale',
    });
  };

  return SalesProduct;
};
