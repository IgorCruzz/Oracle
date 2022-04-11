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

// src/data/database/migrations/10-create-group.js
var create_group_exports = {};
__export(create_group_exports, {
  default: () => create_group_default
});
module.exports = __toCommonJS(create_group_exports);

// src/data/database/models/group.model.js
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

// src/data/database/migrations/10-create-group.js
var create_group_default = {
  up: (queryInterface) => {
    return queryInterface.createTable("Groups", groupAttributes);
  },
  down: (queryInterface) => {
    return queryInterface.dropTable("Groups");
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
