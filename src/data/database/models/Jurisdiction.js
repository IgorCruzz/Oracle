import { Model, DataTypes } from 'sequelize';

export class Jurisdiction extends Model {
  static init(sequelize) {
    super.init(
      {
        id_jurisdiction: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nm_jurisdiction: DataTypes.STRING,
        dt_created_at: DataTypes.DATE,
        dt_updated_at: DataTypes.DATE,
      },
      {
        tableName: 'jurisdiction',
        sequelize,
      }
    );

    return Jurisdiction;
  }
}
