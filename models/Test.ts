import { Model } from 'sequelize';

export class Test extends Model {}

export default function (sequelize: any, DataTypes: any) {
    Test.init(
        {
            type: DataTypes.STRING,
            config: DataTypes.JSON
        },
        { sequelize }
    );

    return Test;
}