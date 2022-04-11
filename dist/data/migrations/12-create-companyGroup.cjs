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

// src/data/migrations/12-create-companyGroup.js
var create_companyGroup_exports = {};
__export(create_companyGroup_exports, {
  default: () => create_companyGroup_default
});
module.exports = __toCommonJS(create_companyGroup_exports);

// src/data/models/companyGroup.model.js
var import_sequelize = require("sequelize");
var companyGroupAttributes = {
  id: { allowNull: false, autoIncrement: true, primaryKey: true, type: import_sequelize.DataTypes.INTEGER },
  CompanyId: { type: import_sequelize.DataTypes.INTEGER, references: { model: "Companies", key: "id" } },
  GroupId: { type: import_sequelize.DataTypes.INTEGER, references: { model: "Groups", key: "id" } },
  deletedAt: import_sequelize.DataTypes.DATE,
  createdAt: { allowNull: false, type: import_sequelize.DataTypes.DATE },
  updatedAt: { allowNull: false, type: import_sequelize.DataTypes.DATE }
};

// src/data/migrations/12-create-companyGroup.js
var create_companyGroup_default = {
  up: (queryInterface) => {
    return queryInterface.createTable("CompanyGroups", companyGroupAttributes);
  },
  down: (queryInterface) => {
    return queryInterface.dropTable("CompanyGroups");
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
