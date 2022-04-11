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

// src/data/database/models/page.model.js
var page_model_exports = {};
__export(page_model_exports, {
  default: () => page_model_default,
  pageAttributes: () => pageAttributes
});
module.exports = __toCommonJS(page_model_exports);
var import_sequelize = require("sequelize");
var pageAttributes = {
  id: { allowNull: false, autoIncrement: true, primaryKey: true, type: import_sequelize.DataTypes.INTEGER },
  url: import_sequelize.DataTypes.STRING,
  deletedAt: import_sequelize.DataTypes.DATE,
  createdAt: { allowNull: false, type: import_sequelize.DataTypes.DATE },
  updatedAt: { allowNull: false, type: import_sequelize.DataTypes.DATE }
};
var pageModel = (sequelize) => {
  const Model = sequelize.define("Page", pageAttributes, { paranoid: true });
  Model.associate = (models) => {
    Model.hasMany(models.Request, { foreignKey: { allowNull: true } });
  };
  return Model;
};
var page_model_default = pageModel;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pageAttributes
});
