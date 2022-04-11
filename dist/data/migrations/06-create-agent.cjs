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

// src/data/migrations/06-create-agent.js
var create_agent_exports = {};
__export(create_agent_exports, {
  default: () => create_agent_default
});
module.exports = __toCommonJS(create_agent_exports);

// src/data/models/agent.model.js
var import_sequelize = require("sequelize");
var agentAttributes = {
  id: { allowNull: false, autoIncrement: true, primaryKey: true, type: import_sequelize.DataTypes.INTEGER },
  name: import_sequelize.DataTypes.STRING,
  min: import_sequelize.DataTypes.DECIMAL(10, 2),
  max: import_sequelize.DataTypes.DECIMAL(10, 2),
  ResourceId: { type: import_sequelize.DataTypes.INTEGER, references: { model: "Resources", key: "id" } },
  deletedAt: import_sequelize.DataTypes.DATE,
  createdAt: { allowNull: false, type: import_sequelize.DataTypes.DATE },
  updatedAt: { allowNull: false, type: import_sequelize.DataTypes.DATE }
};

// src/data/migrations/06-create-agent.js
var create_agent_default = {
  up: (queryInterface) => {
    return queryInterface.createTable("Agents", agentAttributes);
  },
  down: (queryInterface) => {
    return queryInterface.dropTable("Agents");
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
