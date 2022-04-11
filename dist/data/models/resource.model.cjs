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

// src/data/database/models/resource.model.js
var resource_model_exports = {};
__export(resource_model_exports, {
  default: () => resource_model_default,
  resourceAttributes: () => resourceAttributes
});
module.exports = __toCommonJS(resource_model_exports);
var import_sequelize = require("sequelize");
var resourceAttributes = {
  id: { allowNull: false, autoIncrement: true, primaryKey: true, type: import_sequelize.DataTypes.INTEGER },
  name: import_sequelize.DataTypes.STRING,
  deletedAt: import_sequelize.DataTypes.DATE,
  createdAt: { allowNull: false, type: import_sequelize.DataTypes.DATE },
  updatedAt: { allowNull: false, type: import_sequelize.DataTypes.DATE }
};
var resourceModel = (sequelize) => {
  const Model = sequelize.define("Resource", resourceAttributes, { paranoid: true });
  Model.associate = (models) => {
    Model.hasMany(models.Metric, { foreignKey: { allowNull: true } });
    Model.hasMany(models.Agent, { foreignKey: { allowNull: true } });
    Model.hasMany(models.Occurrence, { foreignKey: { allowNull: true } });
  };
  return Model;
};
var resource_model_default = resourceModel;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  resourceAttributes
});
