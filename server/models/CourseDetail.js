/* const Sequelize = require("sequelize");
const db = require("../database/db");
const coursecontent = require("./CourseContent"); */

module.exports = (sequelize, DataTypes) => {
  const CourseDetails = sequelize.define(
    "coursedetails",
    {
      CourseID: {
        type: DataTypes.INTEGER,
        /* autoIncrement: true, */
        primaryKey: true
      },
      CourseName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      CourseDescription: {
        type: DataTypes.STRING,
        allowNull: false
      },
      CourseType: {
        type: DataTypes.STRING,
        allowNull: false
      },
      CourseOwnerID: {
        type: DataTypes.INTEGER
      },
      Project: {
        type: DataTypes.STRING
      },
      Division: {
        type: DataTypes.STRING
      },
      Functions: {
        type: DataTypes.STRING
      },
      LastUpdatedate: {
        type: DataTypes.DATE
      },
      CreatedDate: {
        type: DataTypes.DATE
      },
      IsActive: {
        type: DataTypes.INTEGER
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "COURSE_DETAILS"
    }
  );
  return CourseDetails;
};
