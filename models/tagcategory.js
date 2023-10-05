// DeviceTokenUser
import {sequelize} from '@/index';
import {DataTypes} from "sequelize";
import {Tag} from "@models/tag";

export const TagCategory = sequelize.define('TagCategory', {
  name: DataTypes.STRING,
  scope: DataTypes.INTEGER,
}, {
  tableName: 'TagCategories',
  timestamps: true,
  unique: true,
  paranoid: true,
});
TagCategory.hasMany(Tag, {foreignKey: 'categoryId', onDelete: 'CASCADE'});

