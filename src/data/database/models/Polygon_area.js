import { Model, DataTypes } from 'sequelize';

export class Polygon_area extends Model {
  static init(sequelize) {
    super.init(
      {
        id_polygon_area: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nu_latidude_vertice: DataTypes.CHAR(20),
        nu_longitude_vertice: DataTypes.CHAR(20),
        dt_created_at: DataTypes.DATE,
        dt_updated_at: DataTypes.DATE,
      },
      {
        tableName: 'polygon_area',
        sequelize,
      }
    );

    return Polygon_area;
  }

  static associate(models) {
    Polygon_area.belongsTo(models.Location, {
      foreignKey: 'id_location',
      as: 'location',
    });
  }
}
