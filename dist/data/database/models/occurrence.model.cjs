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

// src/data/database/models/occurrence.model.js
var occurrence_model_exports = {};
__export(occurrence_model_exports, {
  default: () => occurrence_model_default,
  occurrenceAttributes: () => occurrenceAttributes
});
module.exports = __toCommonJS(occurrence_model_exports);
var import_sequelize = require("sequelize");
var occurrenceAttributes = {
  id: { allowNull: false, autoIncrement: true, primaryKey: true, type: import_sequelize.DataTypes.INTEGER },
  name: import_sequelize.DataTypes.STRING,
  value: import_sequelize.DataTypes.DECIMAL(10, 2),
  message: import_sequelize.DataTypes.STRING,
  ResourceId: { type: import_sequelize.DataTypes.INTEGER, references: { model: "Resources", key: "id" } },
  MetricId: { type: import_sequelize.DataTypes.INTEGER, references: { model: "Metrics", key: "id" } },
  deletedAt: import_sequelize.DataTypes.DATE,
  createdAt: { allowNull: false, type: import_sequelize.DataTypes.DATE },
  updatedAt: { allowNull: false, type: import_sequelize.DataTypes.DATE }
};
var occurrenceModel = (sequelize) => {
  const Model = sequelize.define("Occurrence", occurrenceAttributes, { paranoid: true });
  Model.associate = (models) => {
    Model.belongsTo(models.Resource, { foreignKey: { allowNull: true } });
  };
  return Model;
};
var occurrence_model_default = occurrenceModel;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  occurrenceAttributes
});
