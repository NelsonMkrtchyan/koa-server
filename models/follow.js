import {sequelize} from '@/index';
import {DataTypes} from "sequelize";
import {User} from "@models/user";
import {Venue} from "@models/venue";

export const Follow = sequelize.define('Follow', {
  userId: DataTypes.INTEGER,
  venueId: DataTypes.INTEGER

}, {
  tableName: 'Follow',
  timestamps: true,
  paranoid: true,
});

Follow.belongsTo(User, {foreignKey: "userId", as: "user"});
Follow.belongsTo(Venue, {foreignKey: "venueId", as: "venue"});

