import {DataTypes} from "sequelize";
import {sequelize} from '@/index';


export const Post = sequelize.define('Post', {
  title: DataTypes.STRING,
  desc: DataTypes.STRING,
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: {
        tableName: 'users'
      },
      key: 'id'
    }
  }
});