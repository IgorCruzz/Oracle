import { Model, DataTypes } from 'sequelize';

export class Grade extends Model {
  static init(sequelize) {
    super.init(
      {
        id_grade: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nm_grade: DataTypes.STRING,
        dt_created_at: DataTypes.DATE,
        dt_updated_at: DataTypes.DATE,
      },
      {
        sequelize,
      }
    );

    return Grade;
  }
}
