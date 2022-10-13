import { Model, DataTypes } from 'sequelize';
import { format } from 'date-fns';

export class Inspection extends Model {
  static init(sequelize) {
    super.init(
      {
        id_inspection: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        dt_inspection: {
          type: DataTypes.DATEONLY,
          get() {
            const value = this.getDataValue('dt_inspection');

            return value === null
              ? null
              : format(new Date(value), 'yyyy-MM-dd');
          },
        },
        tp_inspection: DataTypes.TINYINT(4),
        dt_new_end: {
          type: DataTypes.DATEONLY,
          get() {
            const value = this.getDataValue('dt_new_end');

            return value === null
              ? null
              : format(new Date(value), 'yyyy-MM-dd');
          },
        },
        vl_new_cost: DataTypes.DECIMAL(20, 2),
        dt_created_at: DataTypes.DATE,
        dt_updated_at: DataTypes.DATE,
      },
      {
        tableName: 'inspection',
        sequelize,
      }
    );

    return Inspection;
  }

  static associate(models) {
    Inspection.hasMany(models.Inspection_document, {
      foreignKey: 'id_inspection',
      as: 'inspection_document',
    });
    Inspection.belongsTo(models.Project_phase, {
      foreignKey: 'id_project_phase',
      as: 'project_phase',
    });
    Inspection.belongsTo(models.Professional, {
      foreignKey: 'id_professional',
      as: 'professional',
    });
  }
}
