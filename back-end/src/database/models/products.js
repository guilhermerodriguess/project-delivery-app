module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      urlImage: DataTypes.STRING,
    },
    {
      timestamps: false,
      tableName: 'products',
      underscored: true,
    }
  );

  // Associação: Um produto pode ter várias vendas (SalesProduct)
  Product.associate = (models) => {
    Product.hasMany(models.SalesProduct, {
      foreignKey: 'productId',
      as: 'salesProducts',
    });
  };

  return Product;
};
