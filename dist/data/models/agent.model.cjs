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

// src/data/database/models/agent.model.js
var agent_model_exports = {};
__export(agent_model_exports, {
  agentAttributes: () => agentAttributes,
  default: () => agent_model_default
});
module.exports = __toCommonJS(agent_model_exports);
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
var agentModel = (sequelize) => {
  const Model = sequelize.define("Agent", agentAttributes, { paranoid: true });
  Model.associate = (models) => {
    Model.belongsTo(models.Resource, { foreignKey: { allowNull: true } });
  };
  return Model;
};
var agent_model_default = agentModel;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  agentAttributes
});
