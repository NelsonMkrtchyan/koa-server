import {sequelize} from '@/index';
import {DataTypes} from "sequelize";

export const EventVibes = sequelize.define('EventVibes', {
  EventId: DataTypes.INTEGER,
  VibeId: DataTypes.INTEGER

}, {
  tableName: 'EventVibes',
  timestamps: true,
  paranoid: true,
});

