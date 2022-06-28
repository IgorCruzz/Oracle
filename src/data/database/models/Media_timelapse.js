import { Model, DataTypes } from 'sequelize';
import moment from 'moment';

export class Media_timelapse extends Model {
  static init(sequelize) {
    super.init(
      {
        id_media_timelapse: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        dt_media: {
          type: DataTypes.DATEONLY,
          get() {
            const value = this.getDataValue('dt_media');

            return value === null
              ? null
              : moment.utc(this.getDataValue('dt_media')).format('YYYY-MM-DD');
          },
        },
        nm_original_file: {
          type: DataTypes.STRING(1000),
        },
        nm_file: {
          type: DataTypes.STRING(1000),
        },
        dt_created_at: DataTypes.DATE,
        dt_updated_at: DataTypes.DATE,
      },
      {
        tableName: 'media_timelapse',        
        sequelize,
      }
    );

    return Media_timelapse;
  }

  static associate(models) {
    Media_timelapse.belongsTo(models.Timelapse_Coordinates, {
      foreignKey: 'id_timelapse_coordinates',
      as: 'timelapse_coordinates',
    });
  }
}
