import { Model, DataTypes } from 'sequelize';

export class Phase_status extends Model {
  static init(sequelize) {
    super.init(
      {
        id_status: {
          type: DataTypes.SMALLINT,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        ds_status: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        dt_created_at: {
          type: DataTypes.DATE,
        },
        dt_updated_at: {
          type: DataTypes.DATE,
        },
      },
      {
        tableName: 'phase_status',
        sequelize,
      }
    );

    return Phase_status;
  }
}