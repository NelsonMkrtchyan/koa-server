import {Model} from 'sequelize';

module.exports = (sequelize: any, DataTypes: { STRING: any; }) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        // @ts-ignore
        static associate(models) {
            // define association here
        }
    }

    User.init({
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};