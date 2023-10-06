import {sequelize} from '@/index';
import {DataTypes} from "sequelize";
import {Venue} from "@models/venue";
import {Event} from "@models/event";

export const Media = sequelize.define('Media', {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  venueId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

}, {
  tableName: 'Media'
});


Media.belongsTo(Venue, {foreignKey: 'venueId', as: 'venue'});
Media.belongsTo(Event, {foreignKey: 'eventId', as: 'event'});
