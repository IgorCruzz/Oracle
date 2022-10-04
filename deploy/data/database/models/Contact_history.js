"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _moment = require('moment'); var _moment2 = _interopRequireDefault(_moment);

 class Contact_history extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id_contact_history: {
          type: _sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        dt_contatct: {
          type: _sequelize.DataTypes.DATEONLY,
          get() {
            const value = this.getDataValue('dt_contatct');

            return value === null
              ? null
              : _moment2.default
                  .utc(this.getDataValue('dt_contatct'))
                  .format('YYYY-MM-DD');
          },
        },
        hr_contact: _sequelize.DataTypes.TIME,
        ds_contact: _sequelize.DataTypes.STRING,
        dt_agreed_feedback: {
          type: _sequelize.DataTypes.DATEONLY,
          get() {
            const value = this.getDataValue('dt_agreed_feedback');

            return value === null
              ? null
              : _moment2.default
                  .utc(this.getDataValue('dt_agreed_feedback'))
                  .format('YYYY-MM-DD');
          },
        },
        dt_feedback: {
          type: _sequelize.DataTypes.DATEONLY,
          get() {
            const value = this.getDataValue('dt_feedback');

            return value === null
              ? null
              : _moment2.default
                  .utc(this.getDataValue('dt_feedback'))
                  .format('YYYY-MM-DD');
          },
        },

        dt_created_at: _sequelize.DataTypes.DATE,
        dt_updated_at: _sequelize.DataTypes.DATE,
      },
      {
        tableName: 'contact_history',
        sequelize,
      }
    );

    return Contact_history;
  }

  static associate(models) {
    Contact_history.belongsTo(models.Contact, {
      foreignKey: 'id_contact',
      as: 'contact',
    });
  }
} exports.Contact_history = Contact_history;
