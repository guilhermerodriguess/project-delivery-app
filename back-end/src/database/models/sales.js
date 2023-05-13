module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    user_id: DataTypes.INTEGER,
    seller_id: DataTypes.INTEGER,
    total_price: DataTypes.DECIMAL,
    delivery_address: DataTypes.STRING,
    delivery_number: DataTypes.STRING,
    sale_date: DataTypes.DATE,
    status: DataTypes.STRING
  },
  {
    timestamps: false,
    tableName: 'sales',
    underscored: true,
  });

  // Associação: Uma venda pertence a um usuário (User)
  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });

    // Associação: Uma venda pertence a um vendedor (User)
    Sale.belongsTo(models.User, {
      foreignKey: 'seller_id',
      as: 'seller',
    });

    // Associação: Uma venda possui muitos produtos de venda (SalesProduct)
    Sale.associate = (models) => {
      Sale.hasMany(models.SalesProduct, {
        foreignKey: 'sale_id',
        as: 'sales_products',
      });
    };  
  };

  return Sale;
};
