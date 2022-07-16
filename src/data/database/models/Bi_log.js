import { Model, DataTypes } from 'sequelize';

export class Bi_log extends Model {
  static init(sequelize) {
    super.init(
      {
        id_bi_log: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        dt_request: DataTypes.DATE,
        nu_ip_request: DataTypes.STRING,
      },
      {
        tableName: 'bi_log',
        sequelize,
      }
    );

    return Bi_log;
  }

  static associate(models) {
    Bi_log.belongsTo(models.Bi_configuration, {
      foreignKey: 'id_bi_configuration',
      as: 'bi_configuration',
    });
  }
}
