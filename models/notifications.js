import {sequelize} from '@/index';
import {DataTypes} from "sequelize";
import {User} from "@models/user";
import {Invitations} from "@models/invitations";

export const Notifications = sequelize.define('Notifications', {
  sendingUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  receivingUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  invitationId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  type: {
    type: DataTypes.ENUM('FriendRequest', 'FriendRequestAccept', 'Invitation', 'InvitationAccept', 'InvitationCancel', 'InvitationEdit'),
    allowNull: false,
  },
  read: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },

}, {
  tableName: 'Notifications',
  timestamps: true,
  paranoid: true,
});

Notifications.belongsTo(User, {
  foreignKey: 'sendingUserId',
  as: 'sendingUser',
});
Notifications.belongsTo(User, {
  foreignKey: 'receivingUserId',
  as: 'receivingUser',
});
Notifications.belongsTo(Invitations, {
  foreignKey: 'invitationId',
  as: 'invitation',
});

