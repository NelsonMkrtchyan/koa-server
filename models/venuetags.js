import {sequelize} from '@/index';
import {DataTypes} from "sequelize";

export const VenueTags = sequelize.define('VenueTags', {
  VenueId: DataTypes.INTEGER,
  TagId: DataTypes.INTEGER

}, {
  tableName: 'VenueTags',
  timestamps: true,
  paranoid: true,
});



