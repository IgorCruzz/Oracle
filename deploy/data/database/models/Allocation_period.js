"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _moment = require('moment'); var _moment2 = _interopRequireDefault(_moment);

 class Allocation_period extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id_allocation_period: {
          type: _sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        dt_start_allocation: {
          type: _sequelize.DataTypes.DATEONLY,
          get() {
            const value = this.getDataValue('dt_start_allocation');

            return value === null
              ? null
              : _moment2.default
                  .utc(this.getDataValue('dt_start_allocation'))
                  .format('YYYY-MM-DD');
          },
        },
        dt_end_allocation: {
          type: _sequelize.DataTypes.DATEONLY,
          get() {
            const value = this.getDataValue('dt_end_allocation');

            return value === null
              ? null
              : _moment2.default
                  .utc(this.getDataValue('dt_end_allocation'))
                  .format('YYYY-MM-DD');
          },
        },
        qt_business_hours: _sequelize.DataTypes.SMALLINT,

        dt_created_at: _sequelize.DataTypes.DATE,
        dt_updated_at: _sequelize.DataTypes.DATE,
      },
      {
        tableName: 'allocation_period',
        sequelize,
      }
    );

    return Allocation_period;
  }
} exports.Allocation_period = Allocation_period;
