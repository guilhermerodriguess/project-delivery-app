module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    userId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: DataTypes.DATE,
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
      foreignKey: 'userId',
      as: 'user',
    });

    // Associação: Uma venda pertence a um vendedor (User)
    Sale.belongsTo(models.User, {
      foreignKey: 'sellerId',
      as: 'seller',
    });

    // Associação: Uma venda possui muitos produtos de venda (SalesProduct)
    Sale.associate = (models) => {
      Sale.hasMany(models.SalesProduct, {
        foreignKey: 'saleId',
        as: 'salesProducts',
      });
    };  
  };

  return Sale;
};
