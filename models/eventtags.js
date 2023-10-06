import {sequelize} from '@/index';
import {DataTypes} from "sequelize";

export const EventTags = sequelize.define('EventTags', {
  EventId: DataTypes.INTEGER,
  TagId: DataTypes.INTEGER

}, {
  tableName: 'EventTags',
  timestamps: true,
  paranoid: true,
});


