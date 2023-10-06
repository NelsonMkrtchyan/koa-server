import {sequelize} from '@/index';
import {DataTypes} from "sequelize";
import {Friends} from "@models/friends";
import {Invitations} from "@models/invitations";
import {User} from "@models/user";
import {Request} from "@models/request";

export const InvitationsUsers = sequelize.define('InvitationsUsers', {
  invitationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  seeFirstTime: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  status: {
    type: DataTypes.ENUM('Sent', 'Going', 'Declined', 'Canceled'),
    allowNull: false,
  },

}, {
  tableName: 'InvitationsUsers',
  timestamps: true,
  paranoid: true,
});

InvitationsUsers.belongsTo(Invitations, {
  foreignKey: 'invitationId',
  as: 'invitation',
});
InvitationsUsers.belongsTo(Friends, {
  foreignKey: 'userId',
  targetKey: 'friendId',
  as: 'friend',
});
InvitationsUsers.belongsTo(Request, {
  foreignKey: 'userId',
  targetKey: 'userId',
  as: 'requestFromMe',
});
InvitationsUsers.belongsTo(Request, {
  foreignKey: 'userId',
  targetKey: 'requestId',
  as: 'requestToMe',
});
InvitationsUsers.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

