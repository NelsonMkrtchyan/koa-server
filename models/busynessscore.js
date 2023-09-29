// BusynessScore
import {sequelize} from '@/index';
import {DataTypes} from "sequelize";
import {User} from "@models/user";

export const BusynessScore = sequelize.define('User', {
  score: DataTypes.INTEGER,
  isReliable: DataTypes.BOOLEAN,

}, {});
BusynessScore.belongsTo(User, {as: 'user', foreignKey: 'UserId'});
BusynessScore.belongsTo(Venue, {as: 'venue', foreignKey: 'VenueId'});