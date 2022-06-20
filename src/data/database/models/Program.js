import { Model, DataTypes } from 'sequelize';

export class Program extends Model {
  static init(sequelize) {
    super.init(
      {
        id_program: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nm_program: DataTypes.STRING,
        dt_created_at: DataTypes.DATE,
        dt_updated_at: DataTypes.DATE,
      },
      {
        tableName: 'program',
        sequelize,
      }
    );

    return Program;
  }
}
