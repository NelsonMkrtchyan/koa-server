import {sequelize} from '@/index';
import {DataTypes} from "sequelize";
import {Tag} from "@models/tag";
import {BusynessScore} from "@models/busynessscore";
import {Event} from "@models/event";

export const Venue = sequelize.define('Venue', {
  name: DataTypes.STRING,
  location: DataTypes.JSON,
  address: DataTypes.STRING,
  busynessScore: DataTypes.JSONB,
  currentBusynessScore: DataTypes.JSONB,
  lastScore: DataTypes.FLOAT,
  lastScoreTime: DataTypes.DATE,
  openHours: DataTypes.JSON,
  isSponsored: DataTypes.BOOLEAN,
  isAlwaysHot: DataTypes.BOOLEAN

}, {
  tableName: 'Venues',
  timestamps: true,
  paranoid: true,
});

Venue.belongsToMany(Tag, {through: 'VenueTags'});
Venue.hasMany(Event, {as: 'events'});
Venue.hasMany(BusynessScore);
// Venue.hasMany(Follow, {
//   foreignKey: 'venueId',
//   as: 'followId',
// });
// Venue.belongsToMany(Vibes, {
//   as: 'vibesCategories',
//   through: 'VenueVibes',
// });
// Venue.hasMany(Invites, {
//   foreignKey: 'venueId',
//   as: 'invitedVenue',
// });
// Venue.hasMany(Media, {
//   foreignKey: 'venueId',
//   as: 'mediasVenue',
// });
// Venue.hasMany(Media, {
//   foreignKey: 'venueId',
//   as: 'media',
// });
// Venue.hasMany(VenueUser, {
//   foreignKey: 'venueId',
//   as: 'venueUser',
// });
// Venue.hasMany(VenueUser, {
//   foreignKey: 'venueId',
//   as: 'venueUserSelf',
// });
// Venue.hasMany(Invitations, {
//   foreignKey: 'venueId',
//   as: 'invitation',
// });
