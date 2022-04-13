import { Model, DataTypes } from 'sequelize';

export class Region extends Model {
  static init(sequelize) {
    super.init(
      {
        ID_REGION: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        NM_REGION: DataTypes.STRING,
        DT_CREATED_AT: DataTypes.DATE,
        DT_UPDATED_AT: DataTypes.DATE,
      },
      {
        sequelize,
      }
    );

    return Region;
  }
}
