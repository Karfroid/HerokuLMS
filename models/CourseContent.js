/* const Sequelize = require("sequelize");
const db = require("../database/db");
const course = require("./CourseDetail"); */

module.exports = (sequelize, DataTypes) => {
  const CourseContents = sequelize.define(
    "coursecontents",
    {
      /* module.exports = db.DataTypes.define(
  "coursecontents",
  { */
      CourseID: {
        type: DataTypes.INTEGER,
        foreignKey: true
      },
      TopicID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      CourseTopics: {
        type: DataTypes.STRING,
        allowNull: false
      },
      TopicsType: {
        type: DataTypes.STRING,
        allowNull: false
      },
      CreatedDate: {
        type: DataTypes.DATE
      },
      LastUpdatedate: {
        type: DataTypes.DATE
      },
      IsActive: {
        type: DataTypes.BOOLEAN
      },
      TopicStatus: {
        type: DataTypes.BOOLEAN
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "COURSE_CONTENT"
    }
  );
  return CourseContents;
};
