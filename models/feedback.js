import {sequelize} from "@/index";
import {DataTypes} from "sequelize";
import {User} from "@models/user";

export const Feedback = sequelize.define('Feedback', {
  feedback: DataTypes.STRING(500),
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

}, {
  tableName: 'Feedbacks',
  timestamps: true,
  paranoid: true,
});

Feedback.belongsTo(User, {as: 'user', foreignKey: 'userId'});
