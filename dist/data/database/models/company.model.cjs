var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/data/database/models/company.model.js
var company_model_exports = {};
__export(company_model_exports, {
  companyAttributes: () => companyAttributes,
  default: () => company_model_default
});
module.exports = __toCommonJS(company_model_exports);
var import_sequelize = require("sequelize");
var companyAttributes = {
  id: { allowNull: false, autoIncrement: true, primaryKey: true, type: import_sequelize.DataTypes.INTEGER },
  uuid: import_sequelize.DataTypes.STRING,
  name: import_sequelize.DataTypes.STRING,
  corporateName: import_sequelize.DataTypes.STRING,
  cnpj: import_sequelize.DataTypes.STRING,
  uf: import_sequelize.DataTypes.STRING,
  maxNsu: import_sequelize.DataTypes.STRING,
  lastNsu: import_sequelize.DataTypes.STRING,
  lastQueryAt: import_sequelize.DataTypes.DATE,
  lastQueryStatus: import_sequelize.DataTypes.STRING,
  lastQueryMessage: import_sequelize.DataTypes.STRING,
  deletedAt: import_sequelize.DataTypes.DATE,
  createdAt: { allowNull: false, type: import_sequelize.DataTypes.DATE },
  updatedAt: { allowNull: false, type: import_sequelize.DataTypes.DATE }
};
var companyModel = (sequelize) => {
  const Model = sequelize.define("Company", companyAttributes, { paranoid: true });
  Model.associate = (models) => {
    Model.belongsToMany(models.Group, { through: models.CompanyGroup, as: "Groups" });
  };
  return Model;
};
var company_model_default = companyModel;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  companyAttributes
});
