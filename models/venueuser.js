import {sequelize} from '@/index';
import {DataTypes} from "sequelize";
import {User} from "@models/user";
import {Venue} from "@models/venue";

export const VenueUser = sequelize.define('VenueUser', {
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  expirationDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  location: DataTypes.JSON,
  notificationId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  isDraft: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  venueId: DataTypes.INTEGER,
  userId: DataTypes.INTEGER,
}, {
  tableName: 'VenueUser',
  timestamps: true,
  paranoid: true,
});

VenueUser.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});
VenueUser.belongsTo(User, {
  foreignKey: 'userId',
  as: 'self',
});
VenueUser.belongsTo(Venue, {
  foreignKey: 'venueId',
  as: 'venueUser',
});


