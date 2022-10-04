"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

 class User extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id_user: {
          type: _sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        ds_email_login: _sequelize.DataTypes.STRING(100),
        nm_user: _sequelize.DataTypes.STRING(255),
        password: _sequelize.DataTypes.VIRTUAL,
        ds_password: _sequelize.DataTypes.STRING(100),
        tp_profile: _sequelize.DataTypes.TINYINT,
        dt_created_at: _sequelize.DataTypes.DATE,
        dt_updated_at: _sequelize.DataTypes.DATE,
        in_active: _sequelize.DataTypes.CHAR(1),
        in_temporary_password: _sequelize.DataTypes.CHAR(1),
      },
      {
        tableName: 'user',
        sequelize,
      }
    );

    User.addHook('beforeCreate', user => {
      if (user.password) {
        user.ds_password = _bcryptjs2.default.hashSync(user.password, 12);
      }
    });

    User.addHook('beforeUpdate', user => {
      if (user.password) {
        user.ds_password = _bcryptjs2.default.hashSync(user.password, 12);
      }
    });

    return User;
  }

  static associate(models) {
    User.hasOne(models.Professional, {
      foreignKey: 'id_user',
      as: 'professional',
    });
  }

  checkPassword(password) {
    return _bcryptjs2.default.compare(password, this.ds_password);
  }
} exports.User = User;
