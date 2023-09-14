import {DataTypes} from "sequelize";
import {Post} from "@models/posts";
import {sequelize} from '@/index';

export const User = sequelize.define('User', {
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  nickName: DataTypes.STRING,
  age: DataTypes.INTEGER,
});
User.hasMany(Post, {as: 'userId', foreignKey: 'userId'});
User.hasOne(Post, {as: 'post', sourceKey: 'id', foreignKey: 'userId'});