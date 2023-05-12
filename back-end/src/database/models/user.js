module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
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
