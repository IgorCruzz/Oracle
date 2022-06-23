import { Model, DataTypes } from 'sequelize';

export class Timelapse_Coordinates extends Model {
  static init(sequelize) {
    super.init(
      {
        id_timelapse_coordinates: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        ds_coordinates: {
          type: DataTypes.STRING(255),
        },
        tp_media: DataTypes.TINYINT(4),
        nu_latitude: DataTypes.CHAR(20),
        nu_longitude: DataTypes.CHAR(20),

        dt_created_at: DataTypes.DATE,
        dt_updated_at: DataTypes.DATE,
      },
      {
        tableName: 'timelapse_coordinates',
        sequelize,
      }
    );

    return Timelapse_Coordinates;
  }

  static associate(models) {
    Timelapse_Coordinates.hasMany(models.Media_timelapse, {
      foreignKey: 'id_timelapse_coordinates',
      as: 'media_timelapse',
    });

    Timelapse_Coordinates.belongsTo(models.Project_phase, {
      foreignKey: 'id_project_phase',
      as: 'project_phase',
    });
  }
}
