import { Model, DataTypes } from 'sequelize';

export class Location extends Model {
  static init(sequelize) {
    super.init(
      {
        id_location: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        ds_address: DataTypes.STRING(255),
        nu_address: DataTypes.STRING(20),
        ds_district: DataTypes.STRING(255),
        nu_postal_code: DataTypes.CHAR(10),
        nu_latitude: DataTypes.CHAR(20),
        nu_longitude: DataTypes.CHAR(20),
        dt_created_at: DataTypes.DATE,
        dt_updated_at: DataTypes.DATE,
      },
      {
        tableName: 'location',
        sequelize,
      }
    );

    return Location;
  }

  static associate(models) {
    Location.belongsTo(models.Project, {
      foreignKey: 'id_project',
      as: 'project',
    });

    Location.hasMany(models.Polygon_area, {
      foreignKey: 'id_location',
      as: 'polygon_area',
    });
  }
}
