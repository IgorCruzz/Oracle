import { Model, DataTypes } from 'sequelize';

export class Sector extends Model {
  static init(sequelize) {
    super.init(
      {
        id_sector: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nm_sector: DataTypes.STRING,
        dt_created_at: DataTypes.DATE,
        dt_updated_at: DataTypes.DATE,
      },
      {
        sequelize,
      }
    );

    return Sector;
  }
}
