import { Model, DataTypes } from 'sequelize';
import { User } from './User';

export class Password_recovery extends Model {
  static init(sequelize) {
    super.init(
      {
        id_user: {
          type: DataTypes.INTEGER,
          references: {
            model: User,
            key: 'id_user',
          },
          primaryKey: true,
        },
        cd_recovery: DataTypes.STRING(10),
        dt_created_at: DataTypes.DATE,
        dt_updated_at: DataTypes.DATE,
      },
      {
        sequelize,
      }
    );

    return Password_recovery;
  }

  static associate(models) {
    // Password_recovery.belongsTo(models.User, {
    //   foreignKey: 'id_user',
    // });
  }
}
