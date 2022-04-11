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

// src/data/database/models/companyGroup.model.js
var companyGroup_model_exports = {};
__export(companyGroup_model_exports, {
  companyGroupAttributes: () => companyGroupAttributes,
  default: () => companyGroup_model_default
});
module.exports = __toCommonJS(companyGroup_model_exports);
var import_sequelize = require("sequelize");
var companyGroupAttributes = {
  id: { allowNull: false, autoIncrement: true, primaryKey: true, type: import_sequelize.DataTypes.INTEGER },
  CompanyId: { type: import_sequelize.DataTypes.INTEGER, references: { model: "Companies", key: "id" } },
  GroupId: { type: import_sequelize.DataTypes.INTEGER, references: { model: "Groups", key: "id" } },
  deletedAt: import_sequelize.DataTypes.DATE,
  createdAt: { allowNull: false, type: import_sequelize.DataTypes.DATE },
  updatedAt: { allowNull: false, type: import_sequelize.DataTypes.DATE }
};
var companyGroupModel = (sequelize) => {
  const Model = sequelize.define("CompanyGroup", companyGroupAttributes, { paranoid: true });
  Model.associate = (models) => {
    Model.belongsTo(models.Company, { foreignKey: { allowNull: false } });
    Model.belongsTo(models.Group, { foreignKey: { allowNull: false } });
  };
  return Model;
};
var companyGroup_model_default = companyGroupModel;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  companyGroupAttributes
});
