import {sequelize} from "@/index";
import {DataTypes} from "sequelize";
import {User} from "@models/user";

export const UserTotp = sequelize.define('UserTotp', {
  totp: DataTypes.INTEGER,
  totpSecret: DataTypes.STRING,
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

}, {
  tableName: 'UserTotp',
  timestamps: true,
  paranoid: true,
});

UserTotp.belongsTo(User, {as: 'user', foreignKey: 'userId'});
