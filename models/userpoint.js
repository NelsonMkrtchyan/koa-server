// UserPoint
import {sequelize} from "@/index";
import {DataTypes} from "sequelize";
import {UserPointsPurposeEnum} from "@/constants/enums";
import {User} from "@models/user";

export const UserPoint = sequelize.define('UserPoint', {
  score: DataTypes.INTEGER,
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  purpose: {
    type: DataTypes.ENUM(...UserPointsPurposeEnum),
    allowNull: false,
  },

}, {
  tableName: 'UserPoints',
});

UserPoint.belongsTo(User, {as: 'user', foreignKey: 'userId'});

