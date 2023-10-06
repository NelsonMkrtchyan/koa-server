import {sequelize} from '@/index';
import {DataTypes} from "sequelize";
import {User} from "@models/user";
import {Venue} from "@models/venue";

export const BusynessScore = sequelize.define('BusynessScore', {
  score: DataTypes.INTEGER,
  isReliable: DataTypes.BOOLEAN,

}, {
  tableName: 'BusynessScores'
});
BusynessScore.belongsTo(User, {as: 'user', foreignKey: 'UserId'});
BusynessScore.belongsTo(Venue, {as: 'venue', foreignKey: 'VenueId'});