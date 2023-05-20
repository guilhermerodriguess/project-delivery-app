module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
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
    underscored: true,
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  
    Sale.belongsTo(models.User, {
      foreignKey: 'sellerId',
      as:'seller',
    });
  
    Sale.hasMany(models.SalesProduct, {
      foreignKey: 'saleId',
      as: 'products',
    });
  };

  return Sale;
};
