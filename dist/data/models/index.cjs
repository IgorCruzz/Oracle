var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/data/database/models/index.js
var models_exports = {};
__export(models_exports, {
  Sequelize: () => import_sequelize13.default,
  models: () => models
});
module.exports = __toCommonJS(models_exports);
var import_dotenv2 = __toESM(require("dotenv"), 1);
var import_sequelize13 = __toESM(require("sequelize"), 1);

// src/data/database/config/index.js
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var env = process.env;
var config = {
  development: {
    dialect: env.DATABASE_DIALECT,
    database: env.DATABASE_NAME,
    username: env.DATABASE_USER || "root",
    password: env.DATABASE_PASSWORD || "",
    host: env.DATABASE_HOST || "127.0.0.1",
    port: env.DATABASE_PORT,
    define: {
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  },
  production: {
    dialect: env.DATABASE_DIALECT,
    database: env.DATABASE_NAME,
    username: env.DATABASE_USER || "root",
    password: env.DATABASE_PASSWORD || "",
    host: env.DATABASE_HOST || "127.0.0.1",
    port: env.DATABASE_PORT,
    define: {
      charset: "utf8",
      collate: "utf8_general_ci"
    },
    logging: false
  }
};
var config_default = config;

// src/data/database/models/account.model.js
var import_sequelize = require("sequelize");
var accountAttributes = {
  id: { allowNull: false, autoIncrement: true, primaryKey: true, type: import_sequelize.DataTypes.INTEGER },
  name: import_sequelize.DataTypes.STRING,
  deletedAt: import_sequelize.DataTypes.DATE,
  createdAt: { allowNull: false, type: import_sequelize.DataTypes.DATE },
  updatedAt: { allowNull: false, type: import_sequelize.DataTypes.DATE }
};
var accountModel = (sequelize2) => {
  const Model = sequelize2.define("Account", accountAttributes, { paranoid: true });
  Model.associate = (models2) => {
    Model.hasMany(models2.User);
  };
  return Model;
};
var account_model_default = accountModel;

// src/data/database/models/user.model.js
var import_sequelize2 = require("sequelize");
var import_bcryptjs = __toESM(require("bcryptjs"), 1);
var import_uuid = require("uuid");
var userAttributes = {
  id: { allowNull: false, autoIncrement: true, primaryKey: true, type: import_sequelize2.DataTypes.INTEGER },
  sub: { type: import_sequelize2.DataTypes.STRING, allowNull: false, unique: true, validate: { notEmpty: true } },
  email: { type: import_sequelize2.DataTypes.STRING },
  password: { type: import_sequelize2.DataTypes.STRING },
  name: import_sequelize2.DataTypes.STRING,
  cellPhoneNumber: import_sequelize2.DataTypes.STRING,
  role: import_sequelize2.DataTypes.STRING,
  resetPasswordToken: import_sequelize2.DataTypes.STRING,
  resetPasswordTokenSentAt: import_sequelize2.DataTypes.DATE,
  passwordUpdatedAt: import_sequelize2.DataTypes.DATE,
  emailValidatedAt: import_sequelize2.DataTypes.DATE,
  emailValidationCode: import_sequelize2.DataTypes.STRING,
  cellPhoneNumberValidatedAt: import_sequelize2.DataTypes.DATE,
  gender: import_sequelize2.DataTypes.STRING,
  AccountId: { type: import_sequelize2.DataTypes.INTEGER, references: { model: "Accounts", key: "id" } },
  deletedAt: import_sequelize2.DataTypes.DATE,
  createdAt: { allowNull: false, type: import_sequelize2.DataTypes.DATE },
  updatedAt: { allowNull: false, type: import_sequelize2.DataTypes.DATE }
};
var userModel = (sequelize2) => {
  const Model = sequelize2.define("User", userAttributes, { paranoid: true });
  Model.prototype.validatePassword = async function(password) {
    const result = await import_bcryptjs.default.compare(password, this.password);
    return result;
  };
  Model.associate = (models2) => {
    Model.belongsTo(models2.Account, { foreignKey: { allowNull: true } });
  };
  Model.beforeValidate(async (user) => {
    user.sub = (0, import_uuid.v4)();
  });
  Model.beforeCreate(async (user) => {
    const hashedPassword = await import_bcryptjs.default.hash(user.password, 10);
    user.password = hashedPassword;
  });
  return Model;
};
var user_model_default = userModel;

// src/data/database/models/resource.model.js
var import_sequelize3 = require("sequelize");
var resourceAttributes = {
  id: { allowNull: false, autoIncrement: true, primaryKey: true, type: import_sequelize3.DataTypes.INTEGER },
  name: import_sequelize3.DataTypes.STRING,
  deletedAt: import_sequelize3.DataTypes.DATE,
  createdAt: { allowNull: false, type: import_sequelize3.DataTypes.DATE },
  updatedAt: { allowNull: false, type: import_sequelize3.DataTypes.DATE }
};
var resourceModel = (sequelize2) => {
  const Model = sequelize2.define("Resource", resourceAttributes, { paranoid: true });
  Model.associate = (models2) => {
    Model.hasMany(models2.Metric, { foreignKey: { allowNull: true } });
    Model.hasMany(models2.Agent, { foreignKey: { allowNull: true } });
    Model.hasMany(models2.Occurrence, { foreignKey: { allowNull: true } });
  };
  return Model;
};
var resource_model_default = resourceModel;

// src/data/database/models/metric.model.js
var import_sequelize4 = require("sequelize");
var metricAttributes = {
  id: { allowNull: false, autoIncrement: true, primaryKey: true, type: import_sequelize4.DataTypes.INTEGER },
  name: import_sequelize4.DataTypes.STRING,
  value: import_sequelize4.DataTypes.DECIMAL(10, 2),
  ResourceId: { type: import_sequelize4.DataTypes.INTEGER, references: { model: "Resources", key: "id" } },
  deletedAt: import_sequelize4.DataTypes.DATE,
  createdAt: { allowNull: false, type: import_sequelize4.DataTypes.DATE },
  updatedAt: { allowNull: false, type: import_sequelize4.DataTypes.DATE }
};
var metricModel = (sequelize2) => {
  const Model = sequelize2.define("Metric", metricAttributes, { paranoid: true });
  Model.associate = (models2) => {
    Model.belongsTo(models2.Resource, { foreignKey: { allowNull: true } });
  };
  return Model;
};
var metric_model_default = metricModel;

// src/data/database/models/occurrence.model.js
var import_sequelize5 = require("sequelize");
var occurrenceAttributes = {
  id: { allowNull: false, autoIncrement: true, primaryKey: true, type: import_sequelize5.DataTypes.INTEGER },
  name: import_sequelize5.DataTypes.STRING,
  value: import_sequelize5.DataTypes.DECIMAL(10, 2),
  message: import_sequelize5.DataTypes.STRING,
  ResourceId: { type: import_sequelize5.DataTypes.INTEGER, references: { model: "Resources", key: "id" } },
  MetricId: { type: import_sequelize5.DataTypes.INTEGER, references: { model: "Metrics", key: "id" } },
  deletedAt: import_sequelize5.DataTypes.DATE,
  createdAt: { allowNull: false, type: import_sequelize5.DataTypes.DATE },
  updatedAt: { allowNull: false, type: import_sequelize5.DataTypes.DATE }
};
var occurrenceModel = (sequelize2) => {
  const Model = sequelize2.define("Occurrence", occurrenceAttributes, { paranoid: true });
  Model.associate = (models2) => {
    Model.belongsTo(models2.Resource, { foreignKey: { allowNull: true } });
  };
  return Model;
};
var occurrence_model_default = occurrenceModel;

// src/data/database/models/agent.model.js
var import_sequelize6 = require("sequelize");
var agentAttributes = {
  id: { allowNull: false, autoIncrement: true, primaryKey: true, type: import_sequelize6.DataTypes.INTEGER },
  name: import_sequelize6.DataTypes.STRING,
  min: import_sequelize6.DataTypes.DECIMAL(10, 2),
  max: import_sequelize6.DataTypes.DECIMAL(10, 2),
  ResourceId: { type: import_sequelize6.DataTypes.INTEGER, references: { model: "Resources", key: "id" } },
  deletedAt: import_sequelize6.DataTypes.DATE,
  createdAt: { allowNull: false, type: import_sequelize6.DataTypes.DATE },
  updatedAt: { allowNull: false, type: import_sequelize6.DataTypes.DATE }
};
var agentModel = (sequelize2) => {
  const Model = sequelize2.define("Agent", agentAttributes, { paranoid: true });
  Model.associate = (models2) => {
    Model.belongsTo(models2.Resource, { foreignKey: { allowNull: true } });
  };
  return Model;
};
var agent_model_default = agentModel;

// src/data/database/models/visitor.model.js
var import_sequelize7 = require("sequelize");
var visitorAttributes = {
  id: { allowNull: false, autoIncrement: true, primaryKey: true, type: import_sequelize7.DataTypes.INTEGER },
  email: import_sequelize7.DataTypes.STRING,
  displayName: import_sequelize7.DataTypes.STRING,
  lastIP: import_sequelize7.DataTypes.STRING,
  lastUserAgent: import_sequelize7.DataTypes.STRING,
  deletedAt: import_sequelize7.DataTypes.DATE,
  createdAt: { allowNull: false, type: import_sequelize7.DataTypes.DATE },
  updatedAt: { allowNull: false, type: import_sequelize7.DataTypes.DATE }
};
var visitorModel = (sequelize2) => {
  const Model = sequelize2.define("Visitor", visitorAttributes, { paranoid: true });
  Model.associate = (models2) => {
    Model.hasMany(models2.Request, { foreignKey: { allowNull: true } });
  };
  return Model;
};
var visitor_model_default = visitorModel;

// src/data/database/models/page.model.js
var import_sequelize8 = require("sequelize");
var pageAttributes = {
  id: { allowNull: false, autoIncrement: true, primaryKey: true, type: import_sequelize8.DataTypes.INTEGER },
  url: import_sequelize8.DataTypes.STRING,
  deletedAt: import_sequelize8.DataTypes.DATE,
  createdAt: { allowNull: false, type: import_sequelize8.DataTypes.DATE },
  updatedAt: { allowNull: false, type: import_sequelize8.DataTypes.DATE }
};
var pageModel = (sequelize2) => {
  const Model = sequelize2.define("Page", pageAttributes, { paranoid: true });
  Model.associate = (models2) => {
    Model.hasMany(models2.Request, { foreignKey: { allowNull: true } });
  };
  return Model;
};
var page_model_default = pageModel;

// src/data/database/models/request.model.js
var import_sequelize9 = require("sequelize");
var requestAttributes = {
  id: { allowNull: false, autoIncrement: true, primaryKey: true, type: import_sequelize9.DataTypes.INTEGER },
  name: import_sequelize9.DataTypes.STRING,
  userAgent: import_sequelize9.DataTypes.STRING,
  IP: import_sequelize9.DataTypes.STRING,
  referer: import_sequelize9.DataTypes.STRING,
  url: import_sequelize9.DataTypes.STRING,
  duration: import_sequelize9.DataTypes.INTEGER,
  VisitorId: { type: import_sequelize9.DataTypes.INTEGER, references: { model: "Visitors", key: "id" } },
  PageId: { type: import_sequelize9.DataTypes.INTEGER, references: { model: "Pages", key: "id" } },
  deletedAt: import_sequelize9.DataTypes.DATE,
  createdAt: { allowNull: false, type: import_sequelize9.DataTypes.DATE },
  updatedAt: { allowNull: false, type: import_sequelize9.DataTypes.DATE }
};
var requestModel = (sequelize2) => {
  const Model = sequelize2.define("Request", requestAttributes, { paranoid: true });
  Model.associate = (models2) => {
    Model.belongsTo(models2.Visitor, { foreignKey: { allowNull: true } });
    Model.belongsTo(models2.Page, { foreignKey: { allowNull: true } });
  };
  return Model;
};
var request_model_default = requestModel;

// src/data/database/models/company.model.js
var import_sequelize10 = require("sequelize");
var companyAttributes = {
  id: { allowNull: false, autoIncrement: true, primaryKey: true, type: import_sequelize10.DataTypes.INTEGER },
  uuid: import_sequelize10.DataTypes.STRING,
  name: import_sequelize10.DataTypes.STRING,
  corporateName: import_sequelize10.DataTypes.STRING,
  cnpj: import_sequelize10.DataTypes.STRING,
  uf: import_sequelize10.DataTypes.STRING,
  maxNsu: import_sequelize10.DataTypes.STRING,
  lastNsu: import_sequelize10.DataTypes.STRING,
  lastQueryAt: import_sequelize10.DataTypes.DATE,
  lastQueryStatus: import_sequelize10.DataTypes.STRING,
  lastQueryMessage: import_sequelize10.DataTypes.STRING,
  deletedAt: import_sequelize10.DataTypes.DATE,
  createdAt: { allowNull: false, type: import_sequelize10.DataTypes.DATE },
  updatedAt: { allowNull: false, type: import_sequelize10.DataTypes.DATE }
};
var companyModel = (sequelize2) => {
  const Model = sequelize2.define("Company", companyAttributes, { paranoid: true });
  Model.associate = (models2) => {
    Model.belongsToMany(models2.Group, { through: models2.CompanyGroup, as: "Groups" });
  };
  return Model;
};
var company_model_default = companyModel;

// src/data/database/models/group.model.js
var import_sequelize11 = require("sequelize");
var groupAttributes = {
  id: { allowNull: false, autoIncrement: true, primaryKey: true, type: import_sequelize11.DataTypes.INTEGER },
  uuid: import_sequelize11.DataTypes.STRING,
  name: import_sequelize11.DataTypes.STRING,
  description: import_sequelize11.DataTypes.STRING,
  deletedAt: import_sequelize11.DataTypes.DATE,
  createdAt: { allowNull: false, type: import_sequelize11.DataTypes.DATE },
  updatedAt: { allowNull: false, type: import_sequelize11.DataTypes.DATE }
};
var groupModel = (sequelize2) => {
  const Model = sequelize2.define("Group", groupAttributes, { paranoid: true });
  Model.associate = (models2) => {
    Model.belongsToMany(models2.Company, { through: models2.CompanyGroup, as: "Companies" });
  };
  return Model;
};
var group_model_default = groupModel;

// src/data/database/models/companyGroup.model.js
var import_sequelize12 = require("sequelize");
var companyGroupAttributes = {
  id: { allowNull: false, autoIncrement: true, primaryKey: true, type: import_sequelize12.DataTypes.INTEGER },
  CompanyId: { type: import_sequelize12.DataTypes.INTEGER, references: { model: "Companies", key: "id" } },
  GroupId: { type: import_sequelize12.DataTypes.INTEGER, references: { model: "Groups", key: "id" } },
  deletedAt: import_sequelize12.DataTypes.DATE,
  createdAt: { allowNull: false, type: import_sequelize12.DataTypes.DATE },
  updatedAt: { allowNull: false, type: import_sequelize12.DataTypes.DATE }
};
var companyGroupModel = (sequelize2) => {
  const Model = sequelize2.define("CompanyGroup", companyGroupAttributes, { paranoid: true });
  Model.associate = (models2) => {
    Model.belongsTo(models2.Company, { foreignKey: { allowNull: false } });
    Model.belongsTo(models2.Group, { foreignKey: { allowNull: false } });
  };
  return Model;
};
var companyGroup_model_default = companyGroupModel;

// src/data/database/models/index.js
import_dotenv2.default.config();
var env2 = process.env.NODE_ENV || "development";
var sequelizeConfig = config_default[env2];
var sequelize = new import_sequelize13.default(sequelizeConfig.database, sequelizeConfig.username, sequelizeConfig.password, { dialect: sequelizeConfig.dialect, host: sequelizeConfig.host, logging: sequelizeConfig.logging, define: sequelizeConfig.define });
account_model_default(sequelize);
user_model_default(sequelize);
resource_model_default(sequelize);
metric_model_default(sequelize);
occurrence_model_default(sequelize);
agent_model_default(sequelize);
visitor_model_default(sequelize);
page_model_default(sequelize);
request_model_default(sequelize);
company_model_default(sequelize);
group_model_default(sequelize);
companyGroup_model_default(sequelize);
sequelize.models.Account.associate(sequelize.models);
sequelize.models.User.associate(sequelize.models);
sequelize.models.Resource.associate(sequelize.models);
sequelize.models.Metric.associate(sequelize.models);
sequelize.models.Occurrence.associate(sequelize.models);
sequelize.models.Agent.associate(sequelize.models);
sequelize.models.Visitor.associate(sequelize.models);
sequelize.models.Page.associate(sequelize.models);
sequelize.models.Request.associate(sequelize.models);
sequelize.models.Group.associate(sequelize.models);
sequelize.models.Company.associate(sequelize.models);
var models = {
  Account: sequelize.models.Account,
  User: sequelize.models.User,
  Resource: sequelize.models.Resource,
  Metric: sequelize.models.Metric,
  Occurrence: sequelize.models.Occurrence,
  Agent: sequelize.models.Agent,
  Visitor: sequelize.models.Visitor,
  Page: sequelize.models.Page,
  Request: sequelize.models.Request,
  Group: sequelize.models.Group,
  Company: sequelize.models.Company
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Sequelize,
  models
});
