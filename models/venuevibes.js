import {sequelize} from '@/index';
import {DataTypes} from "sequelize";

export const VenueVibes = sequelize.define('VenueVibes', {
  VenueId: DataTypes.INTEGER,
  VibeId: DataTypes.INTEGER

}, {
  tableName: 'VenueVibes',
  timestamps: true,
  paranoid: true,
});

