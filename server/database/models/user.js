import { hashPassword } from '../../helpers/hashPassword';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subscribe: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      hooks: {
        beforeCreate: async user => {
          user.password = await hashPassword(user.password);
        },
      },
    },
    {}
  );
  // User.associate = models => {
  //   const {} = models;
  // };
  return User;
};
