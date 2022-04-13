import { Model, DataTypes } from 'sequelize';

export class Jurisdiction extends Model {
  static init(sequelize) {
    super.init(
      {
        ID_JURISDICTION: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        NM_JURISDICTION: DataTypes.STRING,
        DT_CREATED_AT: DataTypes.DATE,
        DT_UPDATED_AT: DataTypes.DATE,
      },
      {
        sequelize,
      }
    );

    return Jurisdiction;
  }
}
