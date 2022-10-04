"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _moment = require('moment'); var _moment2 = _interopRequireDefault(_moment);

 class Document extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id_document: {
          type: _sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        ds_document: {
          type: _sequelize.DataTypes.STRING(255),
        },
        nu_document_sei: _sequelize.DataTypes.INTEGER,
        dt_upload: {
          type: _sequelize.DataTypes.DATEONLY,
          get() {
            const value = this.getDataValue('dt_upload');

            return value === null
              ? null
              : _moment2.default.utc(this.getDataValue('dt_upload')).format('YYYY-MM-DD');
          },
        },

        nm_original_file: {
          type: _sequelize.DataTypes.STRING(1000),
        },
        nm_file: {
          type: _sequelize.DataTypes.STRING(1000),
        },
        dt_created_at: _sequelize.DataTypes.DATE,
        dt_updated_at: _sequelize.DataTypes.DATE,
      },
      {
        tableName: 'document',
        sequelize,
      }
    );

    return Document;
  }

  static associate(models) {
    Document.belongsTo(models.Product, {
      foreignKey: 'id_product',
      as: 'product',
    });
  }
} exports.Document = Document;
