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

// src/data/database/models/visitor.model.js
var visitor_model_exports = {};
__export(visitor_model_exports, {
  default: () => visitor_model_default,
  visitorAttributes: () => visitorAttributes
});
module.exports = __toCommonJS(visitor_model_exports);
var import_sequelize = require("sequelize");
var visitorAttributes = {
  id: { allowNull: false, autoIncrement: true, primaryKey: true, type: import_sequelize.DataTypes.INTEGER },
  email: import_sequelize.DataTypes.STRING,
  displayName: import_sequelize.DataTypes.STRING,
  lastIP: import_sequelize.DataTypes.STRING,
  lastUserAgent: import_sequelize.DataTypes.STRING,
  deletedAt: import_sequelize.DataTypes.DATE,
  createdAt: { allowNull: false, type: import_sequelize.DataTypes.DATE },
  updatedAt: { allowNull: false, type: import_sequelize.DataTypes.DATE }
};
var visitorModel = (sequelize) => {
  const Model = sequelize.define("Visitor", visitorAttributes, { paranoid: true });
  Model.associate = (models) => {
    Model.hasMany(models.Request, { foreignKey: { allowNull: true } });
  };
  return Model;
};
var visitor_model_default = visitorModel;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  visitorAttributes
});
