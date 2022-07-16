import { Model, DataTypes } from 'sequelize';

export class Bi_configuration extends Model {
  static init(sequelize) {
    super.init(
      {
        id_bi_configuration: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nm_bi: DataTypes.STRING,
        cd_bi_token: DataTypes.STRING,
      },
      {
        tableName: 'bi_configuration',
        sequelize,
      }
    );

    return Bi_configuration;
  }
}
