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

// src/data/database/models/group.model.js
var group_model_exports = {};
__export(group_model_exports, {
  default: () => group_model_default,
  groupAttributes: () => groupAttributes
});
module.exports = __toCommonJS(group_model_exports);
var import_sequelize = require("sequelize");
var groupAttributes = {
  id: { allowNull: false, autoIncrement: true, primaryKey: true, type: import_sequelize.DataTypes.INTEGER },
  uuid: import_sequelize.DataTypes.STRING,
  name: import_sequelize.DataTypes.STRING,
  description: import_sequelize.DataTypes.STRING,
  deletedAt: import_sequelize.DataTypes.DATE,
  createdAt: { allowNull: false, type: import_sequelize.DataTypes.DATE },
  updatedAt: { allowNull: false, type: import_sequelize.DataTypes.DATE }
};
var groupModel = (sequelize) => {
  const Model = sequelize.define("Group", groupAttributes, { paranoid: true });
  Model.associate = (models) => {
    Model.belongsToMany(models.Company, { through: models.CompanyGroup, as: "Companies" });
  };
  return Model;
};
var group_model_default = groupModel;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  groupAttributes
});
