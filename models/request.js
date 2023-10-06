import {sequelize} from '@/index';
import {DataTypes} from "sequelize";
import {User} from "@models/user";

export const Request = sequelize.define('Request', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  requestId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  requestType: {
    type: DataTypes.ENUM('friend'),
    allowNull: false,
  },
  seeFirstTime: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },

}, {
  tableName: 'Request',
  timestamps: true,
  paranoid: true,
});
Request.belongsTo(User, {foreignKey: 'userId', as: 'user'});
Request.belongsTo(User, {foreignKey: 'requestId', as: 'request'});

