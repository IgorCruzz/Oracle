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

// src/data/database/migrations/09-create-request.js
var create_request_exports = {};
__export(create_request_exports, {
  default: () => create_request_default
});
module.exports = __toCommonJS(create_request_exports);

// src/data/database/models/request.model.js
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

// src/data/database/migrations/09-create-request.js
var create_request_default = {
  up: (queryInterface) => {
    return queryInterface.createTable("Requests", requestAttributes);
  },
  down: (queryInterface) => {
    return queryInterface.dropTable("Requests");
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
