import { Model, DataTypes } from 'sequelize';

export class Program extends Model {
  static init(sequelize) {
    super.init(
      {
        ID_PROGRAM: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        NM_PROGRAM: DataTypes.STRING,
        DT_CREATED_AT: DataTypes.DATE,
        DT_UPDATED_AT: DataTypes.DATE,
      },
      {
        sequelize,
      }
    );

    return Program;
  }
}
