import { Model, DataTypes } from 'sequelize';

export class Region extends Model {
  static init(sequelize) {
    super.init(
      {
        id_region: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nm_region: DataTypes.STRING,
        dt_created_at: DataTypes.DATE,
        dt_updated_at: DataTypes.DATE,
      },
      {
        tableName: 'region',
        sequelize,
      }
    );

    return Region;
  }
}
