module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    { 
      id: { type: DataTypes.INTEGER, primaryKey: true },
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
      foreignKey: 'productId',
      as: 'salesProducts',
    });
  };

  return Product;
};
