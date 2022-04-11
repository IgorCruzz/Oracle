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

// src/data/database/models/request.model.js
var request_model_exports = {};
__export(request_model_exports, {
  default: () => request_model_default,
  requestAttributes: () => requestAttributes
});
module.exports = __toCommonJS(request_model_exports);
var import_sequelize = require("sequelize");
var requestAttributes = {
  id: { allowNull: false, autoIncrement: true, primaryKey: true, type: import_sequelize.DataTypes.INTEGER },
  name: import_sequelize.DataTypes.STRING,
  userAgent: import_sequelize.DataTypes.STRING,
  IP: import_sequelize.DataTypes.STRING,
  referer: import_sequelize.DataTypes.STRING,
  url: import_sequelize.DataTypes.STRING,
  duration: import_sequelize.DataTypes.INTEGER,
  VisitorId: { type: import_sequelize.DataTypes.INTEGER, references: { model: "Visitors", key: "id" } },
  PageId: { type: import_sequelize.DataTypes.INTEGER, references: { model: "Pages", key: "id" } },
  deletedAt: import_sequelize.DataTypes.DATE,
  createdAt: { allowNull: false, type: import_sequelize.DataTypes.DATE },
  updatedAt: { allowNull: false, type: import_sequelize.DataTypes.DATE }
};
var requestModel = (sequelize) => {
  const Model = sequelize.define("Request", requestAttributes, { paranoid: true });
  Model.associate = (models) => {
    Model.belongsTo(models.Visitor, { foreignKey: { allowNull: true } });
    Model.belongsTo(models.Page, { foreignKey: { allowNull: true } });
  };
  return Model;
};
var request_model_default = requestModel;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  requestAttributes
});
