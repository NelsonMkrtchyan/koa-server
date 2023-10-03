// DeviceTokenUser
import {sequelize} from '@/index';
import {DataTypes} from "sequelize";
import {User} from "@models/user";

export const DeviceTokenUser = sequelize.define('DeviceTokenUser', {
  deviceToken: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }

}, {
  tableName: 'DeviceTokensUser',
  timestamps: true,
  paranoid: true,
});

DeviceTokenUser.belongsTo(User, {as: 'user', foreignKey: 'userId'});

