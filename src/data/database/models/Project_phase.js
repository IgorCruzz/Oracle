import { Model, DataTypes } from 'sequelize';
import moment from 'moment';

export class Project_phase extends Model {
  static init(sequelize) {
    super.init(
      {
        id_project_phase: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nu_order: DataTypes.SMALLINT(6),
        nm_project_phase: DataTypes.STRING(20),
        dt_planned_start: {
          type: DataTypes.DATEONLY,
          get() {
            const value = this.getDataValue('dt_planned_start');

            return value === null
              ? null
              : moment
                  .utc(this.getDataValue('dt_planned_start'))
                  .format('YYYY-MM-DD');
          },
        },
        tp_project_phase: DataTypes.SMALLINT,
        dt_planned_end: {
          type: DataTypes.DATEONLY,
          get() {
            const value = this.getDataValue('dt_planned_end');

            return value === null
              ? null
              : moment
                  .utc(this.getDataValue('dt_planned_end'))
                  .format('YYYY-MM-DD');
          },
        },
        vl_phase: DataTypes.DECIMAL(20, 2),
        dt_created_at: DataTypes.DATE,
        dt_updated_at: DataTypes.DATE,
      },
      {
        tableName: 'project_phase',
        sequelize,
      }
    );

    return Project_phase;
  }

  static associate(models) {
    Project_phase.belongsTo(models.Project, {
      foreignKey: 'id_project',
      as: 'project',
    });
    Project_phase.hasMany(models.Product, {
      foreignKey: 'id_project_phase',
      as: 'product',
    });
    Project_phase.hasMany(models.Inspection, {
      foreignKey: 'id_project_phase',
      as: 'inspection',
    });
    Project_phase.hasMany(models.Timelapse_Coordinates, {
      foreignKey: 'id_project_phase',
      as: 'timelapse',
    });
  }
}
