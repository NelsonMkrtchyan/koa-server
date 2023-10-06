import {sequelize} from '@/index';
import {DataTypes} from "sequelize";
import {User} from "@models/user";
import {Venue} from "@models/venue";
import {Event} from "@models/event";
import {InvitationsUsers} from "@models/invitationsusers";

export const Invitations = sequelize.define('Invitations', {
  hostId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  venueId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },

}, {
  tableName: 'Invitations',
  timestamps: true,
  paranoid: true,
});

Invitations.belongsTo(User, {foreignKey: 'hostId', as: 'hostUser'});
Invitations.belongsTo(Event, {foreignKey: 'eventId', as: 'event'});
Invitations.belongsTo(Venue, {foreignKey: 'venueId', as: 'venue'});
Invitations.hasMany(InvitationsUsers, {
  foreignKey: 'invitationId',
  as: 'invitationUsers',
});

