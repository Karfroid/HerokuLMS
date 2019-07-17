module.exports = (sequelize, DataTypes) => {
  const CourseProgress = sequelize.define(
    "courseprogress",
    {
      CourseID: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false
      },
      CourseName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      AssignedBy: {
        type: DataTypes.STRING,
        allowNull: false
      },
      AsignedTo: {
        type: DataTypes.DATE
      },
      Grade: {
        type: DataTypes.DATE
      },
      AssignedDate: {
        type: DataTypes.BOOLEAN
      },
      CompletedDate: {
        type: DataTypes.BOOLEAN
      },
      CourseStatus: {
        type: DataTypes.BOOLEAN
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "COURSE_PROGRESS_STATUS"
    }
  );
  return CourseProgress;
};
