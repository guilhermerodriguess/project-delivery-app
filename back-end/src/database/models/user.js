module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: { type: DataTypes.STRING, defaultValue: 'customer' }
  },
  {
    timestamps: false,
    tableName: 'users',
    underscored: true,
  });

  // Associação: Um usuário possui muitas vendas (Sale)
  User.associate = (models) => {
    User.hasMany(models.Sale, {
      foreignKey: 'id',
      as: 'sales',
    });
  };

  return User;
};
