import {sequelize} from "@/index";
import {DataTypes} from "sequelize";
import {User} from "@models/user";
import {deleteInvitationUser} from "@/utils/modelUtils";

export const Friends = sequelize.define('Friends', {
  totp: DataTypes.INTEGER,
  totpSecret: DataTypes.STRING,
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  friendId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

}, {
  tableName: 'Friends',
  timestamps: true,
  paranoid: true,
  hooks: {
    afterDestroy: deleteInvitationUser,
  },
});

Friends.belongsTo(User, {foreignKey: 'userId', as: 'user'});
Friends.belongsTo(User, {foreignKey: 'friendId', as: 'friend'});
