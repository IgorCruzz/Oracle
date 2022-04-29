import { Model, DataTypes } from 'sequelize';
import bcyptjs from 'bcryptjs';

export class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id_user: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        ds_email_login: DataTypes.STRING(100),
        nm_user: DataTypes.STRING(255),
        password: DataTypes.VIRTUAL,
        ds_password: DataTypes.STRING(100),
        dt_created_at: DataTypes.DATE,
        dt_updated_at: DataTypes.DATE,
      },
      {
        sequelize,
      }
    );

    User.addHook('beforeCreate', user => {
      if (user.password) {
        user.ds_password = bcyptjs.hashSync(user.password, 12);
      }
    });

    User.addHook('beforeUpdate', user => {
      if (user.password) {
        user.ds_password = bcyptjs.hashSync(user.password, 12);
      }
    });

    return User;
  }

  checkPassword(password) {
    return bcyptjs.compare(password, this.ds_password);
  }
}
