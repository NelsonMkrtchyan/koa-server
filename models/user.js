import {sequelize} from '@/index';
import {DataTypes} from "sequelize";
import {BusynessScore} from "@models/busynessscore";
import {UserTotp} from "@models/usertotp";
import {Feedback} from "@models/feedback";
import {Friends} from "@models/friends";
import {VenueUser} from "@models/venueuser";

export const User = sequelize.define('User', {
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  passwordHash: DataTypes.STRING,
  username: {
    type: DataTypes.STRING,
    unique: true,
  },
  isAdmin: DataTypes.BOOLEAN,
  avatar: DataTypes.STRING(511),
  salt: DataTypes.STRING,
  birthday: DataTypes.DATE,
  gender: DataTypes.ENUM('male', 'female', 'other'),
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  facebookAccessToken: DataTypes.STRING(511),
  googleIdToken: DataTypes.TEXT,
  facebookID: DataTypes.STRING,
  googleID: DataTypes.STRING,
  appleID: DataTypes.STRING,
  appleIdToken: DataTypes.STRING,
  referralCode: DataTypes.STRING,
  isFirstLogin: DataTypes.BOOLEAN,
  isVisibleOnMap: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
  paranoid: true,
});

User.hasMany(BusynessScore); // NEED TO BE CHECKED
User.hasMany(UserTotp); // NEED TO BE CHECKED

User.hasMany(Feedback, {foreignKey: 'userId'});
// User.hasMany(Request, {
//   foreignKey: 'userId',
//   as: 'requestMe',
// });
// User.hasMany(Request, {
//   foreignKey: 'requestId',
//   as: 'request',
// });
User.hasMany(Friends, {
  foreignKey: 'friendId',
  as: 'friend',
});
User.hasMany(Friends, {
  foreignKey: 'userId',
  as: 'friendMe',
});
// User.hasMany(Invites, {
//   foreignKey: 'inviting',
//   as: 'inviting',
// });
// User.hasMany(Invites, {
//   foreignKey: 'invited',
//   as: 'invited',
// });
User.hasMany(VenueUser, {foreignKey: 'userId'});
User.hasMany(VenueUser, {
  foreignKey: 'userId',
  as: 'self',
});