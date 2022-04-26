import { Model, DataTypes } from 'sequelize';

export class Technical_manager extends Model {
  static init(sequelize) {
    super.init(
      {
        id_technical_manager: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nm_technical_manager: DataTypes.STRING(255),
        nu_crea: DataTypes.CHAR(20),
        nu_rrt_art: DataTypes.CHAR(20),
        tp_responsability: DataTypes.TINYINT,
        dt_created_at: DataTypes.DATE,
        dt_updated_at: DataTypes.DATE,
      },
      {
        sequelize,
      }
    );

    return Technical_manager;
  }

  static associate(models) {
    Technical_manager.belongsTo(models.Project, {
      foreignKey: 'id_project',
      as: 'project',
    });
  }
}
