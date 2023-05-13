module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      url_image: DataTypes.STRING
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
      foreignKey: 'product_id',
      as: 'sales_products',
    });
  };

  return Product;
};
