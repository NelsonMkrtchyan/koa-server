import {sequelize} from "@/index";
import {DataTypes} from "sequelize";
import {deleteTagFromES, tagsHandler} from "@/utils/modelHooks";
import {TagCategory} from "@models/tagcategory";
import {Venue} from "@models/venue";
import {Event} from "@models/event";

export const Tag = sequelize.define('Tag', {
  name: {
    type: DataTypes.STRING,
    unique: true,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }

}, {
  tableName: 'Tags',
  timestamps: true,
  paranoid: true,
  hooks: {
    afterCreate: tagsHandler,
    afterUpdate: tagsHandler,
    afterDestroy: deleteTagFromES,
  },
});


Tag.belongsToMany(Venue, {through: 'VenueTags'});
Tag.belongsToMany(Event, {through: 'EventTags'});
Tag.belongsTo(TagCategory, {
  foreignKey: 'categoryId',
  as: 'category',
});
