import {sequelize} from '@/index';
import {DataTypes} from "sequelize";
import {deleteVibesFromES, vibesHandler} from "@/utils/modelHooks";
import {Venue} from "@models/venue";
import {Event} from "@models/event";

export const Vibes = sequelize.define('Vibes', {
  name: {
    type: DataTypes.STRING,
    unique: true,
  },
  scope: DataTypes.STRING,
  orderIndex: DataTypes.INTEGER,

}, {
  tableName: 'Vibes',
  timestamps: true,
  paranoid: true,
  hooks: {
    afterCreate: vibesHandler,
    afterUpdate: vibesHandler,
    afterDestroy: deleteVibesFromES,
  },
});

Vibes.belongsToMany(Venue, {through: 'VenueVibes'});
Vibes.belongsToMany(Event, {through: 'EventVibes'});
