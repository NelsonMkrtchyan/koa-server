import {sequelize} from '@/index';
import {DataTypes} from "sequelize";
import {Venue} from "@models/venue";
import {addEventToEs, deleteEventFromEs} from "@/utils/modelHooks";

export const Event = sequelize.define('Event', {
  name: DataTypes.STRING,
  date: DataTypes.DATE,
  start: DataTypes.DATE,
  end: DataTypes.DATE,
  rating: DataTypes.FLOAT,
  display: DataTypes.BOOLEAN,
  period: DataTypes.STRING,
  additionalInfo: DataTypes.TEXT,
  tickets: DataTypes.TEXT,
  VenueId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'Events',
  timestamps: true,
  paranoid: true,
  hooks: {
    afterCreate: addEventToEs,
    afterUpdate: addEventToEs,
    afterDestroy: deleteEventFromEs,
  },
});

// Event.belongsToMany(Tag, {through: 'EventTags'});
Event.belongsTo(Venue, {
  foreignKey: 'id',
  as: 'VenueId',
});
// Event.belongsToMany(Vibes, {
//   as: 'vibesCategories',
//   through: 'EventVibes',
// });
// Event.hasMany(Invites, {
//   foreignKey: 'eventId',
//   as: 'invitedEvent',
// });
// Event.hasMany(Media, {
//   foreignKey: 'eventId',
//   as: 'mediasEvent',
// });
// Event.hasMany(Media, {
//   foreignKey: 'eventId',
//   as: 'media',
// });
