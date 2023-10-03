import {sequelize} from '@/index';
import {DataTypes} from "sequelize";

export const Config = sequelize.define('Config', {
  type: DataTypes.STRING,
  config: DataTypes.JSON,

}, {});