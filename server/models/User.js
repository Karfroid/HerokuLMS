const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
  "Users",
  {
    EmployeeID: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    LastName: {
      type: Sequelize.STRING
    },
    FirstName: {
      type: Sequelize.STRING
    },
    EmailID: {
      type: Sequelize.STRING
    },
    Functions: {
      type: Sequelize.STRING
    },
    Project: {
      type: Sequelize.STRING
    },
    Division: {
      type: Sequelize.STRING
    },
    Role: {
      type: Sequelize.STRING
    },
    CreatedDate: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    CreatedbyID: {
      type: Sequelize.INTEGER
    },
    Image: {
      type: Sequelize.STRING
    },
    Active: {
      type: Sequelize.BOOLEAN
    },
    LastUpdatedate: {
      type: Sequelize.DATE
    },
    Flag: {
      type: Sequelize.BOOLEAN
    },
    Passwd: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "USER_DETAILS"
  }
);
